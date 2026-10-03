"""Deterministic, evidence-aware matching and private shortlist snapshots.

No inference, network access, currency conversion, or relationship judgments.
"""
from __future__ import annotations

import csv
import io
import json
import math
import re
from datetime import date, datetime, timezone
from pathlib import Path

from .catalog import _safe_cell, load, md_text, public_url

VERSION = 1
STAGES = {"pre-seed", "seed", "series-a", "series-b", "series-c", "growth", "late-stage"}
CURRENCIES = {"USD", "EUR", "GBP", "CHF", "CAD", "AUD", "JPY"}
DEFAULT_CRITERIA = {"company": "", "round": "", "stage": "", "sectors": [], "geographies": [],
                    "raise_size": None, "currency": "USD", "check_size_min": None,
                    "check_size_max": None, "lead_required": False, "excluded_firm_ids": [], "competitors": []}
WEIGHTS = {"stage": 25, "sectors": 30, "geographies": 20, "check_size": 15, "lead": 10}
ALIASES = {"preseed": "pre seed", "series a": "series-a", "series b": "series-b", "series c": "series-c",
           "usa": "us", "united states": "us", "united states of america": "us", "uk": "united kingdom",
           "artificial intelligence": "ai", "machine learning": "ml", "saas": "saas"}
EUROPE = {"austria", "belgium", "denmark", "finland", "france", "germany", "ireland", "italy", "netherlands",
          "norway", "poland", "portugal", "spain", "sweden", "switzerland", "united kingdom"}


def normalized(value: str) -> str:
    text = re.sub(r"[\s_-]+", " ", value.strip().casefold())
    return ALIASES.get(text, text)


def validate_criteria(value: dict) -> dict:
    if not isinstance(value, dict) or set(value) - set(DEFAULT_CRITERIA):
        raise ValueError("Unknown company criteria fields")
    out = {**DEFAULT_CRITERIA, **value}
    for key in ("company", "round", "stage", "currency"):
        if not isinstance(out[key], str) or len(out[key]) > 500:
            raise ValueError(f"{key} must be a short string")
        out[key] = out[key].strip()
    if out["stage"] and out["stage"] not in STAGES:
        raise ValueError("stage must be one of: " + ", ".join(sorted(STAGES)))
    if out["currency"] not in CURRENCIES:
        raise ValueError("Unsupported currency; use an explicit supported ISO currency")
    for key in ("sectors", "geographies", "excluded_firm_ids", "competitors"):
        if not isinstance(out[key], list) or len(out[key]) > 100 or any(
                not isinstance(v, str) or not v.strip() or len(v) > 200 for v in out[key]):
            raise ValueError(f"{key} must be a list of nonempty short strings")
        out[key] = list(dict.fromkeys(v.strip() for v in out[key]))
    for key in ("raise_size", "check_size_min", "check_size_max"):
        n = out[key]
        if n is not None and (isinstance(n, bool) or not isinstance(n, (int, float)) or not 0 < n <= 1e15 or not math.isfinite(n)):
            raise ValueError(f"{key} must be a positive finite amount no greater than 1e15, or null")
    lo, hi = out["check_size_min"], out["check_size_max"]
    if lo is not None and hi is not None and lo > hi:
        raise ValueError("Minimum desired check exceeds maximum")
    if not isinstance(out["lead_required"], bool):
        raise ValueError("lead_required must be boolean")
    return out


def private_path(root: Path, relative: str) -> Path:
    """Reject symlinked workspace ancestors as well as an unsafe leaf."""
    base = root / "workspace"
    path = base / relative
    if not path.resolve().is_relative_to(base.resolve()):
        raise ValueError("Prospect files must stay in workspace")
    for p in (path, *path.parents):
        if p == root:
            break
        if p.is_symlink():
            raise ValueError("Symlinked prospect paths are not allowed")
    return path


def list_id(value: str) -> str:
    if not isinstance(value, str) or not re.fullmatch(r"[a-z0-9][a-z0-9-]{0,79}", value):
        raise ValueError("List ID must contain only lowercase letters, numbers, and hyphens")
    return value


def init_criteria(root: Path) -> Path:
    if not (root / "workspace/config.json").is_file():
        raise ValueError("Run init first")
    path = private_path(root, "prospects/criteria.json")
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        with path.open("x") as stream:
            stream.write(json.dumps(DEFAULT_CRITERIA, indent=2) + "\n")
    return path


def criteria(root: Path) -> dict:
    path = private_path(root, "prospects/criteria.json")
    return validate_criteria(json.loads(path.read_text())) if path.exists() else validate_criteria({})


def money(value) -> tuple[str, float] | None:
    """Parse only an explicit currency and a single amount, never prose or ranges.

    Bare dollars are ambiguous across jurisdictions and intentionally unknown.
    """
    if not isinstance(value, str):
        return None
    match = re.fullmatch(r"\s*(USD|EUR|GBP|CHF|CAD|AUD|JPY|US\$|€|£)\s*(\d+(?:,\d{3})*(?:\.\d+)?)\s*([kKmMbB]?)\s*", value)
    if not match:
        return None
    currency, amount, unit = match.groups()
    amount = float(amount.replace(",", "")) * {"": 1, "k": 1000, "m": 1000000, "b": 1000000000}[unit.lower()]
    if not math.isfinite(amount) or amount <= 0:
        return None
    return {"US$": "USD", "€": "EUR", "£": "GBP"}.get(currency, currency), amount


def freshness(value: str, today: date) -> str:
    try:
        recorded = date.fromisoformat(value + "-01" if len(value) == 7 else value)
    except ValueError:
        return "date unknown"
    if recorded > today:
        return "future date: verify"
    return "stale: over two years old" if (today - recorded).days > 730 else "dated evidence, verify current mandate"


def evaluate(firm: dict, profile: dict, people: list[dict], today: date) -> dict:
    fields = firm["fields"]
    reasons = []
    warnings = []

    def reason(criterion, keys, status, detail):
        evidence = [{"field": key, **firm["evidence"][key],
                     "freshness": freshness(firm["evidence"][key]["as_of"], today)}
                    for key in keys if key in firm["evidence"]]
        if status != "unknown" and (firm["record_level"] != "sourced" or not evidence):
            status = "unverified"
            detail += " Legacy tags are an unverified hint, not supporting research."
        reasons.append({"criterion": criterion, "status": status, "detail": detail, "evidence": evidence})

    for key, field in (("stage", "stages"), ("sectors", "sectors"), ("geographies", "geographies")):
        requested = [profile[key]] if key == "stage" and profile[key] else profile[key] if key != "stage" else []
        if not requested:
            continue
        recorded = fields.get(field, [])
        if not recorded:
            reason(key, [field], "unknown", "Not recorded; research needed.")
            continue
        want = {normalized(x) for x in requested}
        have = {normalized(x) for x in recorded}
        overlap = want & have
        if key == "geographies" and "europe" in have and want & EUROPE:
            overlap.add("europe")
        broad = have & ({"global", "worldwide"} if key == "geographies" else {"any", "all stages", "generalist"})
        if overlap or broad:
            detail = f"Requested: {', '.join(requested)}. Recorded: {', '.join(recorded)}."
            if broad and not overlap:
                # Generalist sectors do not prove support for a particular sector.
                status = "match" if key == "geographies" else "unknown"
                detail += " Broad mandate; verify specific fit."
            else:
                status = "match"
            reason(key, [field], status, detail)
        else:
            reason(key, [field], "conflict", f"No explicit overlap with recorded {field}: {', '.join(recorded)}. This may be an incomplete taxonomy, not a definitive rejection.")

    if profile["check_size_min"] is not None or profile["check_size_max"] is not None:
        lo, hi = money(fields.get("check_size_min")), money(fields.get("check_size_max"))
        if not lo or not hi or lo[0] != profile["currency"] or hi[0] != profile["currency"] or lo[1] > hi[1]:
            reason("check_size", ["check_size_min", "check_size_max"], "unknown", "Need an explicit, comparable investor check range in the requested currency. No currency conversion or inference from raise size.")
        else:
            minimum = profile["check_size_min"] or 0
            maximum = profile["check_size_max"] or float("inf")
            status = "match" if hi[1] >= minimum and lo[1] <= maximum else "conflict"
            reason("check_size", ["check_size_min", "check_size_max"], status,
                   f"Recorded investor checks: {lo[0]} {lo[1]:g} to {hi[1]:g}; {'overlaps' if status == 'match' else 'does not overlap'} desired range.")
    if profile["lead_required"]:
        value = normalized(str(fields.get("leads_rounds", "")))
        status = "match" if value in {"yes", "lead"} else "conflict" if value in {"no", "cannot lead", "follow"} else "unknown"
        reason("lead", ["leads_rounds"], status, "Recorded lead preference: " + (str(fields.get("leads_rounds")) if value else "not recorded") + ". Co-leading or sometimes leading does not establish a sole lead.")

    for entry in firm["portfolio"]:
        if normalized(entry["company"]) in {normalized(c) for c in profile["competitors"]}:
            warnings.append({"kind": "competitor", "detail": "Disclosed portfolio includes " + entry["company"] + "; review potential conflict, do not infer an exclusion.",
                             "url": entry["url"], "as_of": entry["as_of"]})
    for key in ("exclusions",):
        if fields.get(key):
            warnings.append({"kind": "mandate", "detail": str(fields[key]) + " (manual review required)", **firm["evidence"][key]})
    if firm["record_level"] == "directory":
        warnings.append({"kind": "coverage", "detail": "Directory identity and legacy tags need verification before outreach."})
    requested_sectors = {normalized(x) for x in profile["sectors"]}
    contacts = []
    for p in people:
        if p["firm_id"] == firm["id"]:
            contacts.append({**p, "focus_overlap": any(re.search(r"(?<!\w)" + re.escape(s) + r"(?!\w)", normalized(p["focus"])) for s in requested_sectors)})
    contacts.sort(key=lambda p: (not p["focus_overlap"], p["name"].casefold(), p["id"]))
    denominator = sum(WEIGHTS[r["criterion"]] for r in reasons)
    support = sum(WEIGHTS[r["criterion"]] for r in reasons if r["status"] == "match")
    counts = {status: sum(r["status"] == status for r in reasons) for status in ("match", "conflict", "unknown", "unverified")}
    return {"firm_id": firm["id"], "name": firm["name"], "domain": firm["domain"], "record_level": firm["record_level"],
            "researched_at": firm["researched_at"], "support_score": round(100 * support / denominator) if denominator else 0,
            "counts": counts, "reasons": reasons, "warnings": warnings, "contacts": contacts,
            "sources": firm["sources"]}


def match(data: dict, profile: dict, today: date | None = None) -> list[dict]:
    profile = validate_criteria(profile)
    if not (profile["stage"] or profile["sectors"] or profile["geographies"] or profile["check_size_min"] is not None
            or profile["check_size_max"] is not None or profile["lead_required"]):
        raise ValueError("Set at least one matching criterion; company name and raise size alone do not determine fit")
    known = {f["id"] for f in data["firms"]}
    if set(profile["excluded_firm_ids"]) - known:
        raise ValueError("Unknown excluded firm ID; use IDs from the catalog")
    rows = [evaluate(f, profile, data["people"], today or date.today()) for f in data["firms"]
            if f["id"] not in profile["excluded_firm_ids"]]
    return sorted(rows, key=lambda row: (-row["support_score"], row["counts"]["conflict"],
                                        -row["counts"]["unverified"], row["firm_id"]))


def save(root: Path, ident: str, name: str, limit: int = 20, firm_ids: list[str] | None = None) -> dict:
    ident = list_id(ident)
    if not isinstance(name, str) or not name.strip() or len(name) > 200 or any(ord(c) < 32 for c in name):
        raise ValueError("List name must be nonempty text without control characters")
    if not 1 <= limit <= 9000:
        raise ValueError("List limit must be 1 to 9000")
    profile = criteria(root)
    ranked = match(load(root), profile)
    by_id = {r["firm_id"]: r for r in ranked}
    if firm_ids:
        if set(firm_ids) - set(by_id):
            raise ValueError("Selected firms are unknown or explicitly excluded")
        selected = [by_id[i] for i in dict.fromkeys(firm_ids)]
    else:
        selected = ranked[:limit]
    snapshot = {"schema_version": 1, "matcher_version": VERSION, "id": ident, "name": name.strip(),
                "created_at": datetime.now(timezone.utc).isoformat(), "criteria": profile, "rows": selected}
    path = private_path(root, f"prospects/lists/{ident}.json")
    path.parent.mkdir(parents=True, exist_ok=True)
    # Exclusive creation: a repeated ID never destroys a previously reviewed snapshot.
    with path.open("x") as stream:
        stream.write(json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n")
    return snapshot


def saved(root: Path, ident: str) -> dict:
    path = private_path(root, f"prospects/lists/{list_id(ident)}.json")
    snapshot = json.loads(path.read_text())
    try:
        if (not isinstance(snapshot, dict) or set(snapshot) != {"schema_version", "matcher_version", "id", "name", "created_at", "criteria", "rows"}
                or snapshot["schema_version"] != 1 or snapshot["matcher_version"] != VERSION or snapshot["id"] != ident
                or not isinstance(snapshot["name"], str) or not snapshot["name"].strip() or not isinstance(snapshot["rows"], list)):
            raise ValueError("Invalid saved prospect snapshot")
        datetime.fromisoformat(snapshot["created_at"])
        validate_criteria(snapshot["criteria"])
        seen = set()
        for row in snapshot["rows"]:
            if not isinstance(row, dict) or set(row) != {"firm_id", "name", "domain", "record_level", "researched_at", "support_score", "counts", "reasons", "warnings", "contacts", "sources"}:
                raise ValueError("Invalid snapshot row")
            if (not all(isinstance(row[k], str) for k in ("firm_id", "name", "domain", "record_level", "researched_at"))
                    or not re.fullmatch(r"[a-z0-9][a-z0-9._-]*", row["firm_id"]) or row["firm_id"] in seen
                    or row["record_level"] not in {"directory", "sourced"}
                    or type(row["support_score"]) is not int or not 0 <= row["support_score"] <= 100):
                raise ValueError("Invalid snapshot identity or score")
            seen.add(row["firm_id"])
            if not all(isinstance(row[k], list) for k in ("reasons", "warnings", "contacts", "sources")) or not all(public_url(s) for s in row["sources"]):
                raise ValueError("Invalid snapshot collections")
            counts = {s: 0 for s in ("match", "conflict", "unknown", "unverified")}
            for r in row["reasons"]:
                if (not isinstance(r, dict) or set(r) != {"criterion", "status", "detail", "evidence"}
                        or r["criterion"] not in WEIGHTS or r["status"] not in counts
                        or not isinstance(r["detail"], str) or not isinstance(r["evidence"], list)):
                    raise ValueError("Invalid snapshot reason")
                counts[r["status"]] += 1
                for ev in r["evidence"]:
                    if (not isinstance(ev, dict) or set(ev) != {"field", "url", "as_of", "freshness"}
                            or not all(isinstance(v, str) for v in ev.values()) or not public_url(ev["url"])):
                        raise ValueError("Invalid snapshot evidence")
            if row["counts"] != counts:
                raise ValueError("Invalid snapshot counts")
            for warning in row["warnings"]:
                if not isinstance(warning, dict) or not isinstance(warning.get("detail"), str) or ("url" in warning and not public_url(warning["url"])):
                    raise ValueError("Invalid snapshot warning")
            for p in row["contacts"]:
                if (not isinstance(p, dict) or not all(isinstance(p[k], str) for k in ("id", "name", "title", "focus", "researched_at"))
                        or not isinstance(p["sources"], list) or not all(public_url(s) for s in p["sources"])
                        or not isinstance(p["focus_overlap"], bool)):
                    raise ValueError("Invalid snapshot contact")
    except (KeyError, TypeError, AttributeError) as exc:
        raise ValueError("Malformed saved prospect snapshot") from exc
    return snapshot


def lists(root: Path) -> list[dict]:
    folder = private_path(root, "prospects/lists")
    return [saved(root, p.stem) for p in sorted(folder.glob("*.json"))]


def export(root: Path, ident: str, fmt: str) -> Path:
    snapshot = saved(root, ident)
    path = private_path(root, f"prospects/exports/{list_id(ident)}.{fmt}")
    if fmt not in {"csv", "json"}:
        raise ValueError("Export format must be csv or json")
    path.parent.mkdir(parents=True, exist_ok=True)
    if fmt == "json":
        body = json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n"
    else:
        stream = io.StringIO(newline="")
        metadata = {"list_id": snapshot["id"], "list_name": snapshot["name"], "created_at": snapshot["created_at"],
                    "criteria": snapshot["criteria"]}
        row_columns = ["firm_id", "name", "domain", "record_level", "researched_at", "support_score", "reasons", "warnings", "contacts", "sources"]
        columns = [*metadata, *row_columns]
        writer = csv.DictWriter(stream, fieldnames=columns, lineterminator="\n")
        writer.writeheader()
        for row in snapshot["rows"]:
            values = {**metadata, **{k: row[k] for k in row_columns}}
            writer.writerow({k: _safe_cell(json.dumps(v, ensure_ascii=False) if isinstance(v, (list, dict)) else v) for k, v in values.items()})
        body = stream.getvalue()
    path.write_text(body)
    return path


def track(root: Path, ident: str, firm_ids: list[str]) -> list[Path]:
    from .wiki import track as track_firm
    snapshot = saved(root, ident)
    selected = set(firm_ids)
    if not selected or selected - {r["firm_id"] for r in snapshot["rows"]}:
        raise ValueError("Explicitly select firms from the saved list to track")
    if selected - {f["id"] for f in load(root)["firms"]}:
        raise ValueError("A selected firm is no longer in the catalog; review its identity first")
    return [track_firm(root, f) for f in dict.fromkeys(firm_ids)]


def markdown(snapshot: dict) -> str:
    """Read-only virtual wiki page; never replace the user's Prospects.md."""
    lines = ["# " + md_text(snapshot["name"]), "", "Private shortlist snapshot. Created: " + snapshot["created_at"],
             "", "Supported fit is recorded evidence coverage, not a probability or investment recommendation.",
             "", "## Criteria", "", "```json", json.dumps(snapshot["criteria"], indent=2), "```", ""]
    for row in snapshot["rows"]:
        lines += ["## " + md_text(row["name"]), "", f"[[public/firms/{row['firm_id']}|Public research]]", "",
                  f"Supported fit: {row['support_score']}/100. Coverage: {row['record_level']}.", ""]
        for r in row["reasons"]:
            lines.append(f"- **{r['criterion']} ({r['status']}):** {md_text(r['detail'])}")
            for ev in r["evidence"]:
                lines.append(f"  - [Source]({ev['url']}), as of {md_text(ev['as_of'] or 'unknown')}: {ev['freshness']}")
        for warning in row["warnings"]:
            lines.append("- **Review:** " + md_text(warning["detail"]))
        for p in row["contacts"]:
            lines.append(f"- Contact: {md_text(p['name'])}, {md_text(p['title'])}. Research date: {md_text(p['researched_at'])}.")
        lines += ["", f"Track explicitly: `uv run fundraising-buddy prospects-track {snapshot['id']} --firm {row['firm_id']}`", ""]
    return "\n".join(lines) + "\n"
