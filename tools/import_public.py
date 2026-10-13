"""Read-only extraction of validated investor research into the public catalog.

Run with uv run python tools/import_public.py SOURCE --exclude-term COMPANY.
Detailed output and rejected-record reasons stay in ignored tmp/import-report.json.

SOURCE may be a legacy investor-wiki checkout (directory frontmatter under
"Investor DB/firms", dossiers under "tmp/vc/<slug>/") or this project's own
checkout (dossiers researched locally under "workspace/cache/vc/<slug>/",
via the batch dossier pipeline in skills/fb-research-investor). Either way,
only dossiers whose validation.json has gate == "pass" and no critical_defects
are promoted; the overall verdict may still be "revise".

When data/public/catalog.json already exists, the newly extracted records are
merged into it by firm domain / person ID rather than replacing it outright:
for each ID present in both, whichever record has the newer (or equal)
researched_at wins. Existing records absent from this run's source are kept.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
from collections import Counter
from pathlib import Path
from urllib.parse import urlsplit

import yaml

from fundraising_buddy.catalog import EMAIL, domain, public_url, write_catalog

LEADS_MAP = {"yes": "yes", "true": "yes", "lead": "yes", "no": "no", "follow": "no", "cannot-lead": "no",
             "maybe": "maybe", "sometimes": "maybe", "co-lead": "yes", "unknown": "unknown"}


def clean(value):
    if isinstance(value, str):
        return value.replace(chr(0x2014), ", ").strip()
    if isinstance(value, list):
        return [clean(v) for v in value if isinstance(v, (str, int, float))]
    return value


def text(value):
    """Coerce an optional dossier scalar to a clean string, empty when unknown."""
    if value is None:
        return ""
    return clean(value) if isinstance(value, str) else str(clean(value))


def slug(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def safe(value, terms):
    text = json.dumps(value, ensure_ascii=False).lower()
    return not EMAIL.search(text) and not any(t.lower() in text for t in terms) and not re.search(
        r"our (?:round|raise|company)|warm intro|cap.table|last.contact|next.action|email-id|/users/", text)


def evidence(fact, cache):
    if not isinstance(fact, dict) or not public_url(fact.get("url", "")):
        return False
    name, quote = fact.get("cache"), fact.get("quote")
    if not isinstance(name, str) or not isinstance(quote, str) or len(quote.strip()) < 8:
        return False
    path = (cache / name).resolve()
    if not path.is_relative_to(cache.resolve()) or not path.is_file():
        return False
    text = path.read_text(errors="replace")
    if path.suffix == ".json":
        try:
            data = json.loads(text)
            if isinstance(data, dict) and isinstance(data.get("results"), list):
                text = "\n".join(str(v.get("text", "")) for v in data["results"] if isinstance(v, dict))
        except ValueError:
            return False
    norm = lambda x: re.sub(r"\s+", " ", x).lower()
    return norm(quote) in norm(text)


def migrate(source, terms):
    firms, people, report = {}, {}, []
    # Directory identities only. A website is a recorded reference, not proof of
    # a fetched or current identity; the UI and docs explicitly retain that distinction.
    for path in sorted((source / "Investor DB/firms").glob("*.md")):
        try:
            parts = path.read_text().split("---", 2)
            fm = yaml.safe_load(parts[1])
            if not isinstance(fm, dict) or fm.get("type") == "angel":
                continue
            d = domain(fm.get("domain", ""))
            website = str(fm.get("website", ""))
            name = clean(fm.get("name", ""))
            # Legacy parenthetical labels can encode private disambiguation.
            # Retain the neutral base name; sourced dossiers can restore public names.
            name = re.sub(r"\s*\([^)]*\)", "", name).strip() if isinstance(name, str) else ""
            if not name or not public_url(website) or urlsplit(website).hostname.removeprefix("www.") != d.removeprefix("www."):
                continue
            if not safe([name, d, website], terms):
                continue
            record = {"id": d, "name": name, "domain": d, "website": website,
                      "record_level": "directory", "researched_at": "", "fields": {},
                      "sources": [website], "evidence": {}, "portfolio": []}
            if d in firms and firms[d]["name"] != name:
                report.append({"file": path.name, "reason": "duplicate domain, retained first directory identity"})
                continue
            firms[d] = record
        except (ValueError, TypeError, AttributeError, IndexError, yaml.YAMLError) as exc:
            report.append({"file": path.name, "reason": type(exc).__name__})
    mappings = {"type": ("identity", "type"), "hq": ("identity", "hq"),
                "founded": ("identity", "founded_year"), "stages": ("mandate", "stages"),
                "geographies": ("mandate", "geos"), "sectors": ("mandate", "sectors"),
                "aum": ("capital", "aum"), "check_size_min": ("capital", "check_size_min"),
                "check_size_max": ("capital", "check_size_max"),
                "legal_name": ("identity", "legal_name"), "offices": ("identity", "offices"),
                "leads_rounds": ("capital", "leads_rounds"), "latest_fund": ("activity", "latest_fund_close"),
                "thesis_quote": ("mandate", "thesis_quote"), "exclusions": ("mandate", "exclusions"),
                "lps": (None, "lps"), "coinvestors": (None, "coinvestors")}
    dossier_paths = []
    for layout in ("tmp/vc", "workspace/cache/vc"):
        dossier_paths += sorted((source / layout).glob("*/dossier.json"))
    for path in dossier_paths:
        doss = json.loads(path.read_text())
        cache = path.parent
        vp = cache / "validation-r2.json"
        if not vp.exists():
            vp = cache / "validation.json"
        if not vp.exists():
            report.append({"file": str(path.relative_to(source)), "reason": "no validation"})
            continue
        verdict = json.loads(vp.read_text())
        if verdict.get("critical_defects") or verdict.get("gate") != "pass":
            report.append({"file": str(path.relative_to(source)), "reason": "validation needs revision"})
            continue
        identity = doss.get("identity", {})
        canonical = identity.get("canonical_domain") or {}
        try:
            d = domain(re.sub(r":(?:80|443)$", "", str(canonical.get("value", "")).strip()))  # canon rung can record "host:443"
        except ValueError:
            continue
        name = clean(doss.get("name", ""))
        if not name or not evidence(canonical, cache) or not safe([name, d], terms):
            continue
        # Match defects on their `field` target only. Problem text names people and fields
        # incidentally ("only 3 of 8 partners listed: A, B, C"), which must not drop A, B, C.
        defects = " | ".join(str(x.get("field", "")) for x in verdict.get("defects", []) if isinstance(x, dict)).lower()
        f = {"id": d, "name": name, "domain": d, "website": "https://" + d,
             "record_level": "sourced", "researched_at": str(doss.get("researched_at", ""))[:10],
             "fields": {}, "sources": [canonical["url"]], "evidence": {}, "portfolio": []}
        for key, (section, field) in mappings.items():
            fact = doss.get(section, {}).get(field) if section else doss.get(field)
            marker = f"{section}.{field}" if section else field
            if field.lower() in defects or marker.lower() in defects or key.lower() in defects:
                continue
            if not isinstance(fact, dict) or fact.get("value") in (None, "", [], {}) or not evidence(fact, cache):
                continue
            value = clean(fact["value"])
            if key == "offices" and isinstance(value, str):
                value = [v.strip() for v in value.split(",") if v.strip()]
            elif key in ("stages", "geographies", "sectors") and isinstance(value, str):
                value = [value]  # a source may give a single phrase where the schema wants a list
            if isinstance(value, bool):
                value = "yes" if value else "no"
            if key == "leads_rounds":  # normalise to the four public options; tools/jev_leads.py rejudges afterwards
                value = LEADS_MAP.get(str(value).strip().lower())
                if value is None:
                    continue
            if not isinstance(value, (str, int, float, list)) or isinstance(value, bool) or not safe(value, terms):
                continue
            f["fields"][key] = value
            f["evidence"][key] = {"url": fact["url"], "as_of": clean(str(fact.get("as_of", "")))}
            f["sources"].append(fact["url"])
        for item in doss.get("portfolio", []) or []:
            if not isinstance(item, dict):
                continue
            company = text(item.get("company"))
            pev = item.get("evidence") or {}
            if not company or not evidence(pev, cache):
                continue
            sector, round_, date_ = text(item.get("sector")), text(item.get("round")), text(item.get("date"))
            if not safe([company, sector, round_], terms):
                continue
            url = pev.get("url", "")
            if not public_url(url):
                continue
            f["portfolio"].append({"company": company, "sector": sector, "round": round_, "date": date_,
                                    "url": url, "as_of": text(pev.get("as_of"))})
            f["sources"].append(url)
        f["sources"] = sorted(set(f["sources"]))
        firms[d] = f
        for person in doss.get("people", []):
            ev = person.get("evidence", {})
            name = clean(person.get("name", ""))
            title = clean(person.get("title", ""))
            if not name or not title or not evidence(ev, cache) or not safe([name, title], terms):
                continue
            if re.fullmatch(r"(?i)ai (partner|agent|assistant|analyst)", title) or re.search(r"(?i)\b(gsc|advisory council|success council) member\b", title):
                continue  # a firm's AI persona or an advisory-council member is not an investing contact
            if name.lower() in defects:
                continue
            page_text = (cache / ev["cache"]).read_text(errors="replace").lower()
            norm = lambda s: re.sub(r"[^a-z0-9]+", " ", s.lower()).strip()
            if norm(name) not in norm(page_text) or norm(title) not in norm(page_text):
                continue
            profile = person.get("linkedin") or ""
            if not public_url(profile) or profile.lower() not in page_text:
                profile = ""
            focus = text(person.get("focus"))
            if focus and not safe([focus], terms):
                focus = ""
            pid = d + "--" + slug(name) + "-" + hashlib.sha256(name.encode()).hexdigest()[:6]
            people[pid] = {"id": pid, "name": name, "firm_id": d, "title": title, "focus": focus,
                           "profile": profile, "sources": [ev["url"]], "researched_at": f["researched_at"]}
    data = {"schema_version": 2, "firms": sorted(firms.values(), key=lambda x: x["name"].casefold()),
            "people": sorted(people.values(), key=lambda x: (x["name"].casefold(), x["firm_id"]))}
    return data, report


def merge_catalogs(existing: dict, new: dict) -> dict:
    """Union two schema-v2 catalogs by firm ID / person ID; per ID, the newer (or equal) researched_at wins.

    Records present only in `existing` are kept untouched, so re-running an import from a
    partial or narrower source never silently drops previously promoted research.
    """
    firms = {f["id"]: f for f in existing.get("firms", [])}
    for f in new.get("firms", []):
        cur = firms.get(f["id"])
        if cur is None or str(f.get("researched_at", "")) >= str(cur.get("researched_at", "")):
            if cur is not None and "scores" in cur and "scores" not in f:
                f = {**f, "scores": cur["scores"]}  # derived scores survive a re-import of the research
            firms[f["id"]] = f
    people = {p["id"]: p for p in existing.get("people", [])}
    for p in new.get("people", []):
        cur = people.get(p["id"])
        if cur is None or str(p.get("researched_at", "")) >= str(cur.get("researched_at", "")):
            people[p["id"]] = p
    people = {pid: p for pid, p in people.items() if not p["firm_id"] or p["firm_id"] in firms}
    return {"schema_version": 2, "firms": sorted(firms.values(), key=lambda x: x["name"].casefold()),
            "people": sorted(people.values(), key=lambda x: (x["name"].casefold(), x["firm_id"]))}


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("source", type=Path)
    ap.add_argument("--exclude-term", action="append", default=[])
    args = ap.parse_args()
    root = Path.cwd()
    data, report = migrate(args.source, args.exclude_term)
    catalog_path = root / "data/public/catalog.json"
    if catalog_path.exists():
        try:
            existing = json.loads(catalog_path.read_text())
        except (OSError, ValueError):
            existing = None
        if isinstance(existing, dict) and existing.get("schema_version") == 2:
            data = merge_catalogs(existing, data)
    write_catalog(data, root / "data/public")
    (root / "tmp").mkdir(exist_ok=True)
    (root / "tmp/import-report.json").write_text(json.dumps(report, indent=2))
    print(json.dumps({"firms": len(data["firms"]), "people": len(data["people"]),
                      "levels": dict(Counter(f["record_level"] for f in data["firms"])),
                      "review_items": len(report)}, indent=2))


if __name__ == "__main__":
    main()
