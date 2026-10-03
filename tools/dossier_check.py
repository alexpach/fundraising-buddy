# /// script
# requires-python = ">=3.11"
# ///
"""Mechanically gate a dossier.json before it may touch the wiki.

The contract: a fact may exist only if a verbatim quote supporting it is present in
a cached source file. That makes fabrication a *detectable* error rather than a
stylistic worry, and it lets a cheap model do the research while a strict script
does the policing.

Gates (all must pass):
  G1 schema     required sections/keys present, right shapes
  G2 citations  every non-null fact has url+cache+quote; cache exists; quote IS in it
  G3 coverage   minimum useful field set + >=3 people + >=5 portfolio entries
  G4 domain     canonical_domain equals the canon rung's resolved host
  G5 neutral    no round-specific / fit-verdict language in values or notes
  G6 no-private no wiki private-state keys smuggled into the dossier

Usage:
  uv run --script tools/dossier_check.py workspace/cache/vc/<slug>/dossier.json [--json]
  uv run --script tools/dossier_check.py --self-check
Exit 0 = pass, 1 = gate failure, 2 = usage error.
"""
import json
import pathlib
import re
import sys

MIN_QUOTE = 12
CONFIG_PATH = pathlib.Path("workspace/config.json")
PRIVATE_KEYS = {"status", "state", "quality", "list", "sentiment", "last_contact",
                "next_action", "engaged_bucket", "expected_response"}
# Generic fit/round-decision language belongs to a separate fit pass, never to a
# neutral dossier. Add a user's own company name via workspace/config.json's
# `private_terms` list rather than editing this file.
FORBIDDEN = [
    "our round", "our raise", "our company", "should invest", "good fit for us",
    "we should", "pitch them", "right for us", "conflict verdict", "deprioriti",
]
REQUIRED_FACTS = [
    ("identity", "canonical_domain"), ("identity", "type"), ("identity", "hq"),
    ("mandate", "stages"), ("mandate", "geos"), ("mandate", "sectors"),
]


def load_config() -> dict:
    if not CONFIG_PATH.exists():
        return {}
    try:
        data = json.loads(CONFIG_PATH.read_text())
        return data if isinstance(data, dict) else {}
    except (OSError, ValueError):
        return {}


def forbidden_terms() -> list[str]:
    """The generic fit/round list, plus any user-supplied private terms (e.g. a company name)."""
    extra = load_config().get("private_terms") or []
    extra = [str(t).lower() for t in extra if isinstance(t, (str, int, float))]
    return FORBIDDEN + extra


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", str(s)).strip().lower()


def _exa_corpora(d: dict) -> tuple[str, str] | None:
    """Split an Exa response into (real page text, model-generated text).

    Exa returns both `text` (scraped page content) and `summary`/`highlights`
    (written by a model from that content). A quote found ONLY in the latter is
    not evidence: it is an LLM's paraphrase, and citing it launders a model's
    words into the dossier as if they were the source's.
    """
    results = d.get("results")
    if not isinstance(results, list):
        return None
    real, generated = [], []
    for r in results:
        if not isinstance(r, dict):
            continue
        for k in ("text", "title", "url", "author", "publishedDate"):
            if isinstance(r.get(k), str):
                real.append(r[k])
        for k in ("summary", "highlights"):
            v = r.get(k)
            if isinstance(v, str):
                generated.append(v)
            elif isinstance(v, list):
                generated += [x for x in v if isinstance(x, str)]
    if not real and not generated:
        return None
    return norm(" ".join(real)), norm(" ".join(generated))


def cache_text(path: pathlib.Path) -> str:
    """Readable text of a cache file: HTML de-tagged, JSON flattened, md as-is."""
    raw = path.read_bytes().decode("utf-8", "ignore")
    if path.suffix == ".html":
        raw = re.sub(r"<script.*?</script>|<style.*?</style>", " ", raw, flags=re.S | re.I)
        raw = re.sub(r"<[^>]+>", " ", raw)
    elif path.suffix == ".json":
        try:
            raw = json.dumps(json.loads(raw))
        except Exception:
            pass
    return norm(raw)


def quote_status(path: pathlib.Path, quote: str) -> str:
    """'ok' | 'missing' | 'generated': where a quote actually lives in a cache file."""
    q = norm(quote)
    if path.suffix == ".json":
        try:
            corpora = _exa_corpora(json.loads(path.read_bytes().decode("utf-8", "ignore")))
        except Exception:
            corpora = None
        if corpora:
            real, generated = corpora
            if q in real:
                return "ok"
            return "generated" if q in generated else "missing"
    return "ok" if q in cache_text(path) else "missing"


def iter_facts(obj, path="") -> list[tuple[str, dict]]:
    """Yield (path, fact) for every dict that looks like a fact or has `evidence`."""
    out = []
    if isinstance(obj, dict):
        if "quote" in obj and ("cache" in obj or "url" in obj):
            out.append((path, obj))
            return out
        if isinstance(obj.get("evidence"), dict):
            out.append((path, obj["evidence"] | {"value": obj.get("name") or obj.get("company") or True}))
        for k, v in obj.items():
            if k == "evidence":
                continue
            out += iter_facts(v, f"{path}.{k}" if path else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            out += iter_facts(v, f"{path}[{i}]")
    return out


def check(dossier_path: pathlib.Path) -> dict:
    d = json.loads(dossier_path.read_text())
    cdir = dossier_path.parent
    gates, unsupported, warnings = [], [], []

    def gate(gid, ok, detail):
        gates.append({"gate": gid, "pass": bool(ok), "detail": detail})

    # G1 schema -----------------------------------------------------------
    missing_sections = [s for s in ("slug", "name", "identity", "capital", "mandate",
                                    "people", "portfolio", "activity", "budget") if s not in d]
    bad_shape = []
    for s, t in (("people", list), ("portfolio", list), ("identity", dict),
                 ("capital", dict), ("mandate", dict)):
        if s in d and not isinstance(d[s], t):
            bad_shape.append(f"{s} must be {t.__name__}")
    gate("G1-schema", not missing_sections and not bad_shape,
         f"missing={missing_sections or 'none'} shape={bad_shape or 'ok'}")

    # G2 citations --------------------------------------------------------
    facts = iter_facts(d)
    checked = 0
    for fpath, fact in facts:
        if fact.get("value") in (None, "", [], {}):
            continue
        checked += 1
        quote, cache = fact.get("quote"), fact.get("cache")
        if not quote or len(str(quote).strip()) < MIN_QUOTE:
            unsupported.append({"field": fpath, "why": f"quote missing or shorter than {MIN_QUOTE} chars"})
            continue
        if not cache:
            unsupported.append({"field": fpath, "why": "no cache file cited"})
            continue
        cpath = cdir / cache
        if not cpath.exists():
            unsupported.append({"field": fpath, "why": f"cache file not found: {cache}"})
            continue
        status = quote_status(cpath, quote)
        if status == "missing":
            unsupported.append({"field": fpath, "why": f"quote not present in {cache}"})
        elif status == "generated":
            unsupported.append({"field": fpath, "why": (
                f"quote exists only in the model-generated summary/highlights of {cache}, "
                "not in the scraped page text: cite the `text` field or scrape the page")})
    gate("G2-citations", not unsupported, f"{checked} facts checked, {len(unsupported)} unsupported")

    # G3 coverage ---------------------------------------------------------
    gaps = []
    for sec, key in REQUIRED_FACTS:
        v = (d.get(sec) or {}).get(key)
        if not v or (isinstance(v, dict) and v.get("value") in (None, "", [], {})):
            gaps.append(f"{sec}.{key}")
    cap = d.get("capital") or {}
    if not any((cap.get(k) or {}).get("value") for k in ("aum", "check_size_min", "check_size_max")) \
            and not cap.get("funds"):
        gaps.append("capital: need one of aum / check_size / funds")
    if len(d.get("people") or []) < 3:
        gaps.append(f"people: {len(d.get('people') or [])} < 3")
    if len(d.get("portfolio") or []) < 5:
        gaps.append(f"portfolio: {len(d.get('portfolio') or [])} < 5")
    gate("G3-coverage", not gaps, f"gaps={gaps or 'none'}")

    # G4 canonical domain -------------------------------------------------
    canon_file = cdir / "canonical-domain.json"
    claimed = ((d.get("identity") or {}).get("canonical_domain") or {}).get("value", "")
    if canon_file.exists():
        resolved = json.loads(canon_file.read_text()).get("canonical_host", "")
        ok = norm(claimed) == norm(resolved)
        gate("G4-domain", ok, f"claimed={claimed!r} resolved={resolved!r}")
    else:
        gate("G4-domain", False, "canonical-domain.json missing: run the canon rung")

    # G5 neutrality (values and notes only; quotes are verbatim source text) ----
    def strip_quotes(o):
        if isinstance(o, dict):
            return {k: strip_quotes(v) for k, v in o.items() if k != "quote"}
        if isinstance(o, list):
            return [strip_quotes(v) for v in o]
        return o

    body = norm(json.dumps(strip_quotes(d)))
    hits = [w for w in forbidden_terms() if w in body]
    mpath = cdir / "manifest.json"
    if mpath.exists():
        try:
            listed = {e.get("file") for e in json.loads(mpath.read_text())}
        except Exception:
            listed = set()
        cited = {f.get("cache") for f in facts if isinstance(f, dict) and f.get("cache")}
        unlisted = sorted(c for c in cited if c not in listed and (cdir / c).exists())
        gate("G7-manifest", not unlisted, f"cited cache files not in manifest: {unlisted}" if unlisted else "all cited files tracked")
    gate("G5-neutral", not hits, f"fit/round language found: {hits}" if hits else "no fit language")

    # G6 no private wiki state -------------------------------------------
    smuggled = sorted(PRIVATE_KEYS & set(re.findall(r'"([a-z_]+)":', json.dumps(d))))
    gate("G6-no-private", not smuggled, f"private keys present: {smuggled}" if smuggled else "clean")

    verdict = "pass" if all(g["pass"] for g in gates) else "fail"
    return {"dossier": str(dossier_path), "verdict": verdict, "gates": gates,
            "unsupported": unsupported, "warnings": warnings,
            "counts": {"facts_checked": checked, "people": len(d.get("people") or []),
                       "portfolio": len(d.get("portfolio") or [])},
            "budget": d.get("budget", {})}


def self_check() -> int:
    global CONFIG_PATH
    import tempfile

    with tempfile.TemporaryDirectory() as td:
        t = pathlib.Path(td)
        (t / "src.md").write_text("Momenta Ventures is  based in\nLucerne, Switzerland and invests in physical AI.")
        (t / "canonical-domain.json").write_text(json.dumps({"canonical_host": "momenta.vc"}))

        def fact(v, q):
            return {"value": v, "url": "https://momenta.vc", "cache": "src.md", "quote": q}

        good = {
            "slug": "m", "name": "Momenta", "budget": {},
            "identity": {"canonical_domain": fact("momenta.vc", "invests in physical AI"),
                         "type": fact("vc", "invests in physical AI"),
                         "hq": fact("Lucerne", "based in Lucerne, Switzerland")},
            "capital": {"aum": fact("100M", "invests in physical AI"), "funds": []},
            "mandate": {"stages": fact(["series-a"], "invests in physical AI"),
                        "geos": fact(["global"], "invests in physical AI"),
                        "sectors": fact(["industrial"], "invests in physical AI")},
            "people": [{"name": f"P{i}", "title": "Partner",
                        "evidence": {"url": "u", "cache": "src.md", "quote": "invests in physical AI"}} for i in range(3)],
            "portfolio": [{"company": f"C{i}",
                           "evidence": {"url": "u", "cache": "src.md", "quote": "invests in physical AI"}} for i in range(5)],
            "activity": {},
        }
        (t / "dossier.json").write_text(json.dumps(good))
        r = check(t / "dossier.json")
        assert r["verdict"] == "pass", r

        # quote that is not in the cache must fail G2
        bad = json.loads(json.dumps(good))
        bad["capital"]["aum"] = fact("999B", "manages 999 billion dollars")
        (t / "d2.json").write_text(json.dumps(bad))
        r2 = check(t / "d2.json")
        assert r2["verdict"] == "fail" and any("quote not present" in u["why"] for u in r2["unsupported"]), r2

        # multi-line/whitespace quotes still match after normalization
        ok2 = json.loads(json.dumps(good))
        ok2["identity"]["hq"] = fact("Lucerne", "based in   Lucerne, Switzerland")
        (t / "d5.json").write_text(json.dumps(ok2))
        assert check(t / "d5.json")["verdict"] == "pass"

        # fit language must fail G5, even though every citation is valid
        bad2 = json.loads(json.dumps(good))
        bad2["summary"] = "Great fit for us, we should pitch them for our round."
        (t / "d3.json").write_text(json.dumps(bad2))
        r3 = check(t / "d3.json")
        assert r3["verdict"] == "fail" and not [g for g in r3["gates"] if g["gate"] == "G5-neutral"][0]["pass"]

        # ...but the same words inside a verbatim quote are allowed
        ok3 = json.loads(json.dumps(good))
        (t / "q.md").write_text("we should invest only in what we understand, says the partner")
        ok3["mandate"]["thesis_quote"] = {"value": "discipline", "url": "u", "cache": "q.md",
                                          "quote": "we should invest only in what we understand"}
        (t / "d6.json").write_text(json.dumps(ok3))
        assert check(t / "d6.json")["verdict"] == "pass", check(t / "d6.json")

        # a quote that lives only in Exa's model-written summary is not evidence
        (t / "exa.json").write_text(json.dumps({"results": [
            {"url": "https://x.com", "title": "X", "text": "the firm was founded in 2011 in Bern",
             "summary": "Summary: the firm manages 400 million dollars"}]}))
        ok4 = json.loads(json.dumps(good))
        ok4["identity"]["founded_year"] = {"value": 2011, "url": "https://x.com", "cache": "exa.json",
                                           "quote": "founded in 2011 in Bern"}
        (t / "d8.json").write_text(json.dumps(ok4))
        assert check(t / "d8.json")["verdict"] == "pass", check(t / "d8.json")

        bad4 = json.loads(json.dumps(good))
        bad4["capital"]["aum"] = {"value": "400M", "url": "https://x.com", "cache": "exa.json",
                                  "quote": "manages 400 million dollars"}
        (t / "d9.json").write_text(json.dumps(bad4))
        r9 = check(t / "d9.json")
        assert r9["verdict"] == "fail" and any("model-generated summary" in u["why"] for u in r9["unsupported"]), r9

        # private wiki state must fail G6
        bad3 = json.loads(json.dumps(good))
        bad3["next_action"] = "email them"
        (t / "d4.json").write_text(json.dumps(bad3))
        assert check(t / "d4.json")["verdict"] == "fail"

        # thin dossier fails coverage
        thin = json.loads(json.dumps(good))
        thin["portfolio"] = thin["portfolio"][:2]
        (t / "d7.json").write_text(json.dumps(thin))
        assert check(t / "d7.json")["verdict"] == "fail"

        # a user's own private terms (workspace/config.json) extend G5, without hardcoding any name here
        original_config_path = CONFIG_PATH
        try:
            cfg = t / "workspace-config.json"
            cfg.write_text(json.dumps({"private_terms": ["AcmeCo"]}))
            CONFIG_PATH = cfg
            bad5 = json.loads(json.dumps(good))
            bad5["summary"] = "The team previously discussed AcmeCo."
            (t / "d10.json").write_text(json.dumps(bad5))
            r10 = check(t / "d10.json")
            assert r10["verdict"] == "fail" and not [g for g in r10["gates"] if g["gate"] == "G5-neutral"][0]["pass"], r10
        finally:
            CONFIG_PATH = original_config_path
    print("self-check OK")
    return 0


def main() -> int:
    if "--self-check" in sys.argv:
        return self_check()
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not args:
        print(__doc__)
        return 2
    rep = check(pathlib.Path(args[0]))
    if "--json" in sys.argv:
        print(json.dumps(rep, indent=1))
    else:
        print(f"verdict: {rep['verdict'].upper()}   {rep['counts']}")
        for g in rep["gates"]:
            print(f"  [{'PASS' if g['pass'] else 'FAIL'}] {g['gate']}: {g['detail']}")
        for u in rep["unsupported"]:
            print(f"    unsupported: {u['field']}: {u['why']}")
    return 0 if rep["verdict"] == "pass" else 1


if __name__ == "__main__":
    raise SystemExit(main())
