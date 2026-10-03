# /// script
# requires-python = ">=3.11"
# ///
"""Fetch rungs of the firm-research source ladder into workspace/cache/vc/<slug>/ with provenance.

Every rung writes a cache file plus a manifest entry, because dossier claims must
cite a cache file and a verbatim quote. Agents never fetch by hand: they call this,
then read the cached files.

Rungs (cheapest first):
  canon <domain>              curl -sIL. FREE. Resolves redirects -> canonical host.
  st <slug>                   startupticker.ch investor profile. FREE.
  edgar "<name>"              SEC EDGAR full-text Form D search. FREE. US fund sizes.
  map <domain>                firecrawl map. ~1 credit. Site structure -> pick targets.
  scrape <url>...            firecrawl scrape -> markdown. ~1 credit/url.
  exa "<query>"               Exa neural search + query-focused summary. ~$0.01/call.
  search "<query>"            firecrawl search. ~2 credits. Fallback when Exa is down.

Usage:
  uv run --script tools/dossier_fetch.py <slug> canon momenta.vc
  uv run --script tools/dossier_fetch.py <slug> map momenta.vc --limit 60 --search team
  uv run --script tools/dossier_fetch.py <slug> scrape https://momenta.vc/team-v2
  uv run --script tools/dossier_fetch.py <slug> exa "Momenta fund size" --sq "What is the fund size?"
  uv run --script tools/dossier_fetch.py <slug> manifest
  uv run --script tools/dossier_fetch.py --self-check

Cache-first: a fresh (<14d), non-empty cache file is reused and reported as
`cached`, spending nothing. --force overrides.

The cache lives under ignored workspace/cache/vc/, private to this checkout. Run
from the project root so relative paths (including workspace/config.json) resolve.
"""
import argparse
import datetime as dt
import json
import pathlib
import re
import subprocess
import sys
import urllib.request

CACHE_ROOT = pathlib.Path("workspace/cache/vc")
CONFIG_PATH = pathlib.Path("workspace/config.json")
MAX_AGE_DAYS = 14
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
DEFAULT_RESEARCH_CONTACT = "fundraising-buddy research"


def load_config() -> dict:
    if not CONFIG_PATH.exists():
        return {}
    try:
        data = json.loads(CONFIG_PATH.read_text())
        return data if isinstance(data, dict) else {}
    except (OSError, ValueError):
        return {}


def edgar_ua() -> str:
    """EDGAR asks requesters to identify themselves; read the contact from local config."""
    contact = load_config().get("research_contact")
    if not contact:
        return DEFAULT_RESEARCH_CONTACT
    return str(contact).strip() or DEFAULT_RESEARCH_CONTACT


def now() -> str:
    return dt.datetime.now().isoformat(timespec="seconds")


def url_to_filename(url: str, ext: str = "md") -> str:
    """Stable, readable cache filename for a URL."""
    u = re.sub(r"^https?://", "", url.strip()).rstrip("/")
    u = re.sub(r"^www\.", "", u)
    parts = u.split("/", 1)
    host = parts[0].replace(":", "_")
    path = parts[1] if len(parts) > 1 else "home"
    path = re.sub(r"[^A-Za-z0-9._-]+", "-", path).strip("-") or "home"
    name = f"{host}__{path}"[:120]
    return f"{name}.{ext}"


class Cache:
    def __init__(self, slug: str):
        self.dir = CACHE_ROOT / slug
        self.dir.mkdir(parents=True, exist_ok=True)
        self.manifest_path = self.dir / "manifest.json"
        self.manifest = json.loads(self.manifest_path.read_text()) if self.manifest_path.exists() else []

    def fresh(self, path: pathlib.Path, force: bool) -> bool:
        if force or not path.exists() or path.stat().st_size == 0:
            return False
        age = dt.datetime.now() - dt.datetime.fromtimestamp(path.stat().st_mtime)
        return age.days < MAX_AGE_DAYS

    def record(self, *, file: pathlib.Path, url: str, tool: str, cost: str = "", note: str = ""):
        entry = {
            "file": str(file.relative_to(self.dir)),
            "url": url,
            "tool": tool,
            "fetched_at": now(),
            "bytes": file.stat().st_size if file.exists() else 0,
            "cost": cost,
            "note": note,
        }
        self.manifest = [m for m in self.manifest if m["file"] != entry["file"]] + [entry]
        self.manifest_path.write_text(json.dumps(self.manifest, indent=1))
        return entry


def run(cmd: list[str]) -> tuple[int, str, str]:
    p = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
    return p.returncode, p.stdout, p.stderr


def fetch_url(url: str, ua: str = UA) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": ua})
    with urllib.request.urlopen(req, timeout=45) as r:
        return r.read()


def exa_key() -> str | None:
    p = pathlib.Path.home() / ".my-exa-api-key"
    if not p.exists():
        return None
    # file holds a shell export line, not a bare key
    m = re.findall(r"[A-Za-z0-9_-]{20,}", p.read_text())
    return m[-1] if m else None


# ------------------------------------------------------------------ rungs
def rung_canon(c: Cache, domain: str, force: bool) -> int:
    out = c.dir / "canonical-domain.json"
    if c.fresh(out, force):
        print(f"cached  {out}")
        return 0
    url = domain if domain.startswith("http") else f"https://{domain}"
    code, so, _ = run(["curl", "-sIL", "-o", "/dev/null", "-w", "%{http_code} %{url_effective}", "--max-time", "45", url])
    status, _, effective = (so.strip() + "  ").partition(" ")
    host = re.sub(r"^https?://(www\.)?", "", effective.strip()).rstrip("/").split("/")[0]
    if status in ("000", "") or not host:
        print(f"FAIL   canon: no HTTP response from {url} (status {status!r}); do not record a canonical domain from a dead fetch", file=sys.stderr)
        return 1
    data = {"input": domain, "http_status": status, "final_url": effective.strip(), "canonical_host": host,
            "redirected": host.lower() != re.sub(r"^www\.", "", domain.lower()), "checked_at": now()}
    out.write_text(json.dumps(data, indent=1))
    c.record(file=out, url=url, tool="curl -sIL", note="domain canonicalization")
    print(json.dumps(data, indent=1))
    return 0


def rung_startupticker(c: Cache, st_slug: str, force: bool) -> int:
    url = f"https://www.startupticker.ch/en/investors/{st_slug}"
    out = c.dir / f"startupticker__{st_slug}.html"
    if c.fresh(out, force):
        print(f"cached  {out}")
        return 0
    try:
        body = fetch_url(url)
    except Exception as e:
        print(f"MISS   startupticker {st_slug}: {e}")
        return 1
    out.write_bytes(body)
    c.record(file=out, url=url, tool="curl", note="startupticker investor profile")
    print(f"wrote   {out}  ({len(body)} bytes)")
    return 0


def rung_edgar(c: Cache, name: str, force: bool) -> int:
    q = urllib.request.quote(f'"{name}"')
    url = f"https://efts.sec.gov/LATEST/search-index?q={q}&forms=D"
    out = c.dir / f"edgar__{re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')}.json"
    if c.fresh(out, force):
        print(f"cached  {out}")
        return 0
    try:
        raw = fetch_url(url, ua=edgar_ua())
    except Exception as e:
        print(f"MISS   edgar {name}: {e}")
        return 1
    out.write_bytes(raw)
    c.record(file=out, url=url, tool="sec-edgar-fts", note="Form D full-text search")
    try:
        d = json.loads(raw)
        total = d.get("hits", {}).get("total", {}).get("value", 0)
        names = [h["_source"].get("display_names", []) for h in d.get("hits", {}).get("hits", [])[:8]]
        print(f"wrote   {out}  hits={total}")
        for n in names:
            print("   ", "; ".join(n))
    except Exception:
        print(f"wrote   {out} (unparsed)")
    return 0


def rung_map(c: Cache, domain: str, limit: int, search: str | None, force: bool) -> int:
    tag = f"__{re.sub(r'[^a-z0-9]+', '-', (search or 'all').lower())}"
    out = c.dir / f"sitemap{tag}.txt"
    if c.fresh(out, force):
        print(f"cached  {out}")
        print(out.read_text()[:2000])
        return 0
    url = domain if domain.startswith("http") else f"https://{domain}"
    cmd = ["firecrawl", "map", url, "--limit", str(limit)]
    if search:
        cmd += ["--search", search]
    code, so, se = run(cmd)
    if code != 0 or not so.strip():
        print(f"MISS   map {domain}: {se.strip()[:200]}")
        return 1
    out.write_text(so)
    c.record(file=out, url=url, tool="firecrawl map", cost="~1 credit", note=f"search={search or '-'}")
    print(so)
    return 0


def rung_scrape(c: Cache, urls: list[str], force: bool) -> int:
    todo = []
    for u in urls:
        out = c.dir / url_to_filename(u)
        if c.fresh(out, force):
            print(f"cached  {out}")
            continue
        todo.append((u, out))
    for u, out in todo:
        code, so, se = run(["firecrawl", "scrape", u, "-o", str(out)])
        if code != 0 or not out.exists() or out.stat().st_size == 0:
            print(f"MISS   scrape {u}: {(se or so).strip()[:200]}")
            continue
        c.record(file=out, url=u, tool="firecrawl scrape", cost="~1 credit")
        print(f"wrote   {out}  ({out.stat().st_size} bytes)")
    return 0


def rung_exa(c: Cache, query: str, n: int, summary_q: str | None, category: str | None, force: bool) -> int:
    key = exa_key()
    if not key:
        print("SKIP   exa: no key at ~/.my-exa-api-key: fall back to `search` rung")
        return 2
    out = c.dir / f"exa__{re.sub(r'[^a-z0-9]+', '-', query.lower())[:70].strip('-')}.json"
    if c.fresh(out, force):
        print(f"cached  {out}")
        return 0
    payload = {"query": query, "numResults": n, "type": "auto",
               "contents": {"text": {"maxCharacters": 4000},
                            "summary": {"query": summary_q or query}}}
    if category:
        payload["category"] = category
    req = urllib.request.Request("https://api.exa.ai/search", method="POST",
                                 data=json.dumps(payload).encode(),
                                 headers={"x-api-key": key, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            raw = r.read()
    except Exception as e:
        print(f"MISS   exa: {e}")
        return 1
    out.write_bytes(raw)
    d = json.loads(raw)
    cost = d.get("costDollars", {}).get("total", "?")
    c.record(file=out, url="https://api.exa.ai/search", tool="exa search", cost=f"${cost}", note=query)
    print(f"wrote   {out}  cost=${cost}  results={len(d.get('results', []))}")
    for r_ in d.get("results", []):
        print(f"   - {r_.get('title')}  {r_.get('url')}")
    return 0


def rung_search(c: Cache, query: str, limit: int, force: bool) -> int:
    out = c.dir / f"fcsearch__{re.sub(r'[^a-z0-9]+', '-', query.lower())[:70].strip('-')}.json"
    if c.fresh(out, force):
        print(f"cached  {out}")
        return 0
    code, so, se = run(["firecrawl", "search", query, "--limit", str(limit), "--json", "-o", str(out)])
    if code != 0 or not out.exists():
        print(f"MISS   search: {(se or so).strip()[:200]}")
        return 1
    c.record(file=out, url="firecrawl search", tool="firecrawl search", cost="~2 credits", note=query)
    print(f"wrote   {out}")
    return 0


# ------------------------------------------------------------------ self-check
def self_check() -> int:
    assert url_to_filename("https://www.momenta.vc/team-v2") == "momenta.vc__team-v2.md"
    assert url_to_filename("https://momenta.vc/") == "momenta.vc__home.md"
    assert url_to_filename("http://a.b.co/x/y?z=1") == "a.b.co__x-y-z-1.md"
    assert url_to_filename("https://x.com", ext="json") == "x.com__home.json"
    # long paths are truncated but stay unique-ish and keep the extension
    long = url_to_filename("https://x.com/" + "a" * 300)
    assert long.endswith(".md") and len(long) <= 124, long
    assert edgar_ua() == DEFAULT_RESEARCH_CONTACT
    print("self-check OK")
    return 0


def main() -> int:
    if "--self-check" in sys.argv:
        return self_check()
    ap = argparse.ArgumentParser()
    ap.add_argument("slug")
    ap.add_argument("rung", choices=["canon", "st", "edgar", "map", "scrape", "exa", "search", "manifest", "cache"])
    ap.add_argument("args", nargs="*")
    ap.add_argument("--limit", type=int, default=60)
    ap.add_argument("--search", default=None)
    ap.add_argument("--n", type=int, default=5)
    ap.add_argument("--sq", default=None, help="query-focused summary question for exa")
    ap.add_argument("--category", default=None, help="exa category, e.g. news / linkedin profile")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--cap", type=int, default=6, help="max firecrawl-credit rungs per slug (map/scrape/search); --force overrides")
    ap.add_argument("--name", default=None, help="cache: output filename (default derived from url)")
    ap.add_argument("--tool", default="keenable", help="cache: tool that produced the stdin text")
    a = ap.parse_args()
    c = Cache(a.slug)

    if a.rung == "manifest":
        print(json.dumps(c.manifest, indent=1))
        return 0
    if not a.args:
        print(f"rung {a.rung} needs an argument", file=sys.stderr)
        return 2
    if a.rung == "cache":
        # keenable-style MCP tools cannot be called from a script, so the agent pipes
        # the returned markdown here; this makes it a citable, manifest-tracked cache file.
        url = a.args[0]
        name = a.name or url_to_filename(url)
        if not name.startswith(a.tool + "__"):
            name = f"{a.tool}__{name}"
        out = c.dir / name
        body = sys.stdin.read()
        if len(body.strip()) < 400:
            print("REFUSE  cache: stdin body under 400 chars (paywall stub / error page); not citable", file=sys.stderr)
            return 1
        out.write_text(f"source-url: {url}\nfetched-via: {a.tool}\nfetched-at: {now()}\n\n{body}")
        c.record(file=out, url=url, tool=a.tool, note="agent-supplied page text")
        print(f"wrote   {out}  ({len(body)} chars)")
        return 0
    if a.rung == "canon":
        return rung_canon(c, a.args[0], a.force)
    if a.rung == "st":
        return rung_startupticker(c, a.args[0], a.force)
    if a.rung == "edgar":
        return rung_edgar(c, " ".join(a.args), a.force)
    if a.rung in ("map", "scrape", "search") and not a.force:
        # A per-firm firecrawl cap keeps a runaway agent from blowing the whole budget on one firm.
        spent = sum(1 for e in c.manifest if "firecrawl" in str(e.get("tool", "")))
        pending = len(a.args) if a.rung == "scrape" else (2 if a.rung == "search" else 1)
        if spent + pending > a.cap:
            print(f"REFUSE  firecrawl cap: {spent} credit-rungs already in manifest, +{pending} would exceed cap {a.cap}. "
                  f"Use keenable/Exa, or --force with a reason.", file=sys.stderr)
            return 3
    if a.rung == "map":
        return rung_map(c, a.args[0], a.limit, a.search, a.force)
    if a.rung == "scrape":
        return rung_scrape(c, a.args, a.force)
    if a.rung == "exa":
        return rung_exa(c, " ".join(a.args), a.n, a.sq, a.category, a.force)
    if a.rung == "search":
        return rung_search(c, " ".join(a.args), a.limit, a.force)
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
