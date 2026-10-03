"""Fill empty directory records with general fund tags from a legacy investor-db checkout.

Only public, non-relationship attributes move: investor type, stages, geographies,
sectors, AUM, check size range, lead preference, and a Crunchbase link as an extra
source. Status, sentiment, contacts, next actions, interaction counts, pass reasons
and every other private key are never read into the catalog.

Only firms whose `fields` is empty are touched, and existing `scores` survive.
Migrated values are curated tags, not fetched research: the record stays
`record_level: directory` and its evidence points at the recorded reference URL
(Crunchbase when present, else the website) with the legacy `updated` date.

A second pass adds the legacy About paragraph (field `about`) and the Notable Investments
list (portfolio rows, company and short note only) to directory records that lack them.
The legacy page body is read only for those two sections; contacts, notes and logs stay out.

Usage:
  uv run python tools/migrate_legacy_fields.py ~/src/investor-db [--dry-run]
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

import yaml

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from fundraising_buddy.catalog import load, public_url, write_catalog
from tools.import_public import LEADS_MAP, clean, safe

# catalog field -> legacy frontmatter key
GENERAL = {"type": "type", "stages": "stage_focus", "geographies": "geo_focus", "sectors": "verticals",
           "aum": "aum", "check_size_min": "check_size_min", "check_size_max": "check_size_max",
           "leads_rounds": "lead_preference"}
LISTS = {"stages", "geographies", "sectors"}


def legacy_records(source: Path) -> dict[str, dict]:
    return {d: fm for d, (fm, _) in legacy_pages(source).items()}


def legacy_pages(source: Path) -> dict[str, tuple[dict, str]]:
    out = {}
    for path in sorted((source / "Investor DB/firms").glob("*.md")):
        parts = path.read_text().split("---", 2)
        if len(parts) < 3:
            continue
        try:
            fm = yaml.safe_load(parts[1])
        except yaml.YAMLError:
            continue
        if isinstance(fm, dict) and fm.get("domain"):
            out[str(fm["domain"]).strip().lower()] = (fm, parts[2])
    return out


def general_fields(fm: dict, terms: list[str]) -> tuple[dict, dict, list[str]]:
    reference = fm.get("crunchbase") if public_url(str(fm.get("crunchbase") or "")) else str(fm.get("website") or "")
    if not public_url(reference):
        return {}, {}, []
    as_of = str(fm.get("updated") or "")[:10]
    fields, evidence = {}, {}
    for key, legacy in GENERAL.items():
        value = clean(fm.get(legacy))
        if value in (None, "", [], "unknown"):
            continue
        if key in LISTS:
            value = [str(v).strip() for v in (value if isinstance(value, list) else [value]) if str(v).strip()]
            if not value:
                continue
        elif isinstance(value, list) or isinstance(value, bool):
            continue
        else:
            value = str(value).strip()
        if key == "leads_rounds":  # legacy lead_preference -> the four public options
            value = LEADS_MAP.get(value.lower())
            if value is None:
                continue
        if not safe(value, terms):
            continue
        fields[key] = value
        evidence[key] = {"url": reference, "as_of": as_of}
    extra = [fm["crunchbase"]] if fields and reference == fm.get("crunchbase") else []
    return fields, evidence, extra


def section(body: str, title: str) -> str:
    m = re.search(rf"^## {title}[ \t]*\n(.*?)(?=^## |\Z)", body, re.M | re.S)
    return m.group(1).strip() if m else ""


# Legacy bodies mix descriptions with working notes about one company's own search; keep only clean prose.
NOTES = re.compile(r"\*\*|this session|verified|flagged|F6S|\bnotes?\b|\bfit\b|imprecise|unclear|closest|[\u2014]|\(\w+, \d+/\d+\)", re.I)


def extras(f: dict, fm: dict, body: str, terms: list[str]) -> bool:
    """Add the legacy About paragraph and Notable Investments to a directory record that lacks them."""
    reference = fm.get("crunchbase") if public_url(str(fm.get("crunchbase") or "")) else str(fm.get("website") or "")
    if f["record_level"] != "directory" or not public_url(reference):
        return False
    as_of, changed = str(fm.get("updated") or "")[:10], False
    about = " ".join(clean(section(body, "About")).split())
    about = re.split(r"(?<=[a-z0-9)])\.\s", about, maxsplit=2)  # first two sentences
    about = ". ".join(about[:2]).strip()[:400]
    if len(about) > 40 and not NOTES.search(about) and "about" not in f["fields"] and safe(about, terms):
        f["fields"]["about"] = about
        f["evidence"]["about"] = {"url": reference, "as_of": as_of}
        changed = True
    if not f["portfolio"]:
        for line in section(body, "Notable Investments").splitlines():
            m = re.match(r"\s*[-*]\s+\**([^*\n]+?)\**\s*(?:[:\u2014-]+\s*(.*))?$", line)
            name = clean(m[1]).strip(" :") if m else ""
            if m and 1 < len(name) <= 50 and not NOTES.search(name) and safe(name, terms):
                f["portfolio"].append({"company": name, "sector": "", "round": "",
                                       "date": "", "url": reference, "as_of": as_of})
                changed = True
    return changed


def migrate(data: dict, legacy: dict[str, dict], terms: list[str]) -> list[str]:
    touched = []
    for f in data["firms"]:
        fm = legacy.get(f["domain"])
        if f["fields"] or fm is None:
            continue
        fields, evidence, extra = general_fields(fm, terms)
        if not fields:
            continue
        f["fields"], f["evidence"] = fields, evidence
        f["sources"] = sorted(set(f["sources"]) | set(extra))
        touched.append(f["id"])
    return touched


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("source", type=Path)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    root = Path.cwd()
    config = json.loads((root / "workspace/config.json").read_text()) if (root / "workspace/config.json").exists() else {}
    terms = [str(t) for t in config.get("private_terms", [])]
    data = load(root)
    pages = legacy_pages(args.source)
    touched = migrate(data, {d: fm for d, (fm, _) in pages.items()}, terms)
    more = [f["id"] for f in data["firms"] if f["domain"] in pages and extras(f, *pages[f["domain"]], terms)]
    print(json.dumps({"filled": len(touched), "still_empty": sum(1 for f in data["firms"] if not f["fields"]),
                      "about_or_portfolio_added": len(more)}, indent=2))
    if not args.dry_run:
        write_catalog(data, root / "data/public")
        print("Catalog written. Run validate-public, then re-run tools/jev_score.py to re-score changed firms.")


if __name__ == "__main__":
    main()
