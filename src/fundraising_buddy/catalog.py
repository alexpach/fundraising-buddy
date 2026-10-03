"""Allowlisted public records and deterministic, derived exports."""
from __future__ import annotations

import csv
import io
import json
import re
from pathlib import Path
from urllib.parse import urlsplit

EMAIL = re.compile(r"[\w.!#$%&'*+/=?^`{|}~-]+@[\w.-]+\.[a-zA-Z]{2,}")
SHARED_DOMAINS = {"gmail.com", "googlemail.com", "outlook.com", "hotmail.com", "live.com",
                  "yahoo.com", "icloud.com", "me.com", "aol.com", "proton.me", "protonmail.com"}
FIRM_KEYS = {"id", "name", "domain", "website", "record_level", "researched_at", "fields", "sources", "evidence", "portfolio"}
PERSON_KEYS = {"id", "name", "firm_id", "title", "profile", "sources", "researched_at", "focus"}
PUBLIC_FIELDS = {"type", "hq", "founded", "stages", "geographies", "sectors", "aum", "check_size_min", "check_size_max",
                  "legal_name", "offices", "leads_rounds", "latest_fund", "thesis_quote", "exclusions", "lps", "coinvestors", "about"}
LEADS_OPTIONS = {"yes", "no", "maybe", "unknown"}  # leads_rounds is a judgment over the recorded profile, see tools/jev_leads.py
PUBLIC_LIST_FIELDS = {"stages", "geographies", "sectors", "offices"}
PUBLIC_FLEXIBLE_LIST_FIELDS = {"lps", "coinvestors"}  # narrative string OR a plain list of names, per source
PORTFOLIO_KEYS = {"company", "sector", "round", "date", "url", "as_of"}


def domain(value: str) -> str:
    value = str(value).strip().lower().rstrip(".")
    if not re.fullmatch(r"(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}", value):
        raise ValueError("Invalid investor domain")
    if value in SHARED_DOMAINS:
        raise ValueError("Shared email providers cannot be investor domains")
    return value


def public_url(value: str) -> bool:
    try:
        u = urlsplit(value)
        return (u.scheme in {"http", "https"} and bool(u.hostname) and not u.username
                and not u.password and not u.query and not u.fragment
                and u.hostname not in {"localhost", "127.0.0.1"} and not EMAIL.search(value))
    except (ValueError, TypeError):
        return False


def validate(data: dict) -> list[str]:
    errors = []
    if not isinstance(data, dict) or set(data) != {"schema_version", "firms", "people"} or data.get("schema_version") != 2:
        return ["Invalid catalog envelope"]
    if not isinstance(data["firms"], list) or not isinstance(data["people"], list):
        return ["firms and people must be lists"]
    ids = set()
    firm_ids = set()
    domains = set()
    for kind, keys in (("firms", FIRM_KEYS), ("people", PERSON_KEYS)):
        for item in data[kind]:
            if not isinstance(item, dict) or set(item) - {"scores"} != keys or (kind == "people" and "scores" in item):
                errors.append(f"{kind}: unexpected or missing fields")
                continue
            scores = item.get("scores")  # optional derived profile scores, e.g. {"jev-score": 87}
            if scores is not None and (not isinstance(scores, dict) or not all(
                    isinstance(k, str) and re.fullmatch(r"[a-z][a-z0-9-]*", k) and isinstance(v, (int, float))
                    and not isinstance(v, bool) and 0 <= v <= 100 for k, v in scores.items())):
                errors.append(f"{kind}: invalid scores")
                continue
            ident = item.get("id", "")
            if not isinstance(ident, str) or not re.fullmatch(r"[a-z0-9][a-z0-9._-]*", ident) or ident in ids:
                errors.append(f"{kind}: invalid or duplicate ID")
                continue
            ids.add(ident)
            strings = ["name", "researched_at", "domain", "website", "record_level"] if kind == "firms" else ["name", "researched_at", "firm_id", "title", "profile", "focus"]
            if not all(isinstance(item[k], str) for k in strings):
                errors.append(f"{ident}: invalid string fields")
                continue
            if not isinstance(item["name"], str) or not item["name"].strip():
                errors.append(f"{ident}: missing name")
            if EMAIL.search(json.dumps(item)):
                errors.append(f"{ident}: email address in public record")
            if not isinstance(item["sources"], list) or not item["sources"] or not all(public_url(x) for x in item["sources"]):
                errors.append(f"{ident}: invalid source URLs")
            if item["researched_at"] and not re.fullmatch(r"\d{4}-\d{2}(?:-\d{2})?", str(item["researched_at"])):
                errors.append(f"{ident}: invalid research date")
            if kind == "firms":
                firm_ids.add(ident)
                try:
                    d = domain(item["domain"])
                    if d in domains:
                        errors.append(f"{ident}: duplicate domain")
                    domains.add(d)
                except ValueError:
                    errors.append(f"{ident}: invalid domain")
                if not public_url(item["website"]):
                    errors.append(f"{ident}: invalid website")
                if item["record_level"] not in {"directory", "sourced"}:
                    errors.append(f"{ident}: invalid record level")
                fields, evidence = item["fields"], item["evidence"]
                if not isinstance(fields, dict) or not set(fields) <= PUBLIC_FIELDS:
                    errors.append(f"{ident}: unexpected research fields")
                elif not isinstance(evidence, dict) or set(evidence) != set(fields):
                    errors.append(f"{ident}: missing field evidence")
                else:
                    for key, value in fields.items():
                        is_list = isinstance(value, list) and all(isinstance(v, str) for v in value)
                        is_scalar = isinstance(value, (str, int, float)) and not isinstance(value, bool)
                        if key in PUBLIC_LIST_FIELDS:
                            valid = is_list
                        elif key in PUBLIC_FLEXIBLE_LIST_FIELDS:
                            valid = is_list or is_scalar
                        else:
                            valid = is_scalar
                        if not valid or (key == "leads_rounds" and value not in LEADS_OPTIONS):
                            errors.append(f"{ident}: invalid value for {key}")
                    for key, ev in evidence.items():
                        if not isinstance(ev, dict) or set(ev) != {"url", "as_of"} or not public_url(ev["url"]) or not isinstance(ev["as_of"], str):
                            errors.append(f"{ident}: invalid evidence for {key}")
                portfolio = item.get("portfolio")
                if not isinstance(portfolio, list):
                    errors.append(f"{ident}: portfolio must be a list")
                else:
                    for p in portfolio:
                        if not isinstance(p, dict) or set(p) != PORTFOLIO_KEYS or not all(isinstance(v, str) for v in p.values()):
                            errors.append(f"{ident}: invalid portfolio entry")
                            continue
                        if not p["company"].strip():
                            errors.append(f"{ident}: portfolio entry missing company")
                        if not public_url(p["url"]):
                            errors.append(f"{ident}: portfolio entry missing valid source url")
            elif item["firm_id"] not in firm_ids or (item["profile"] and not public_url(item["profile"])):
                errors.append(f"{ident}: missing firm or invalid profile")
    return errors


def load(root: Path) -> dict:
    data = json.loads((root / "data/public/catalog.json").read_text())
    errors = validate(data)
    if errors:
        raise ValueError("Invalid public catalog: " + "; ".join(errors[:10]))
    return data


def md_text(value) -> str:
    text = ", ".join(map(str, value)) if isinstance(value, list) else str(value)
    return text.replace("\n", " ").replace("|", "\\|").replace("<", "&lt;").replace(">", "&gt;")


def public_pages(data: dict) -> dict[str, str]:
    pages = {}
    for f in data["firms"]:
        lines = [f"{k}: {v}" for k, v in sorted((f.get("scores") or {}).items())]
        lines = ["---", *lines, "---", ""] if lines else []
        lines += [f"# {md_text(f['name'])}", "", f"[Website]({f['website']})", "",
                 f"Domain: {f['domain']}", "", f"Coverage: {f['record_level']}", "",
                 "Research date: " + (f["researched_at"] or "Not recorded"), "",
                 "## Public research", ""]
        if not f["fields"]:
            lines += ["Directory seed only. Confirm identity and research fit before outreach.", ""]
        elif f["record_level"] == "directory":
            lines += ["Directory seed with curated tags carried over from a legacy list; not independently sourced. "
                      "Confirm identity and research fit before outreach.", ""]
        for key, value in f["fields"].items():
            ev = f["evidence"][key]
            field_label = {"aum": "AUM", "lps": "LPs", "hq": "HQ"}.get(key, key.replace('_', ' ').capitalize())
            lines += [f"- **{field_label}:** {md_text(value)} ([source]({ev['url']}), as of {md_text(ev['as_of'] or 'not recorded')})"]
        lines += ["", "## Portfolio", ""]
        if not f["portfolio"]:
            lines += ["Not recorded.", ""]
        else:
            lines += ["| Company | Sector | Round | Date | Source |", "| --- | --- | --- | --- | --- |"]
            for p in f["portfolio"]:
                source = f"[Source]({p['url']})" if p["url"] else "Not recorded"
                lines += [f"| {md_text(p['company'])} | {md_text(p['sector'] or 'Not recorded')} | {md_text(p['round'] or 'Not recorded')} | {md_text(p['date'] or 'Not recorded')} | {source} |"]
            lines += [""]
        lines += ["## People", ""]
        for p in data["people"]:
            if p["firm_id"] == f["id"]:
                lines += [f"- [[public/people/{p['id']}|{md_text(p['name'])}]]: {md_text(p['title'])}"]
        lines += ["", "## Sources", ""] + [f"- [Source]({s})" for s in f["sources"]]
        pages[f"firms/{f['id']}"] = "\n".join(lines) + "\n"
    for p in data["people"]:
        lines = [f"# {md_text(p['name'])}", "", f"[[public/firms/{p['firm_id']}|Firm profile]]", "",
                 f"Role: {md_text(p['title'])}", "", f"Focus: {md_text(p['focus'] or 'Not recorded')}", "", "## Public sources", ""]
        if p["profile"]:
            lines += [f"[Public profile]({p['profile']})", ""]
        lines += [f"- [Source]({s})" for s in p["sources"]]
        pages[f"people/{p['id']}"] = "\n".join(lines) + "\n"
    return pages


def _safe_cell(value) -> str:
    # Prevent spreadsheet formula execution when users open the export.
    return ("'" + str(value)) if str(value).startswith(("=", "+", "-", "@")) else value


def artifacts(data: dict) -> dict[str, str]:
    result = {"catalog.json": json.dumps(data, ensure_ascii=False, indent=2) + "\n",
              "investor-domains.txt": "\n".join(sorted(f["domain"] for f in data["firms"])) + "\n"}
    for kind, keys in (("firms", ["id", "name", "domain", "website", "record_level", "researched_at"]),
                       ("people", ["id", "name", "firm_id", "title", "profile", "focus", "researched_at"])):
        stream = io.StringIO(newline="")
        writer = csv.DictWriter(stream, fieldnames=keys, lineterminator="\n")
        writer.writeheader()
        for row in data[kind]:
            writer.writerow({k: _safe_cell(row[k]) for k in keys})
        result[kind + ".csv"] = stream.getvalue()
    portfolio_keys = ["firm_id", "company", "sector", "round", "date", "url", "as_of"]
    stream = io.StringIO(newline="")
    writer = csv.DictWriter(stream, fieldnames=portfolio_keys, lineterminator="\n")
    writer.writeheader()
    for f in data["firms"]:
        for p in f["portfolio"]:
            writer.writerow({k: _safe_cell(v) for k, v in {**p, "firm_id": f["id"]}.items() if k in portfolio_keys})
    result["portfolio.csv"] = stream.getvalue()
    result.update({"wiki/" + name + ".md": body for name, body in public_pages(data).items()})
    return result


def write_catalog(data: dict, dest: Path) -> None:
    errors = validate(data)
    if errors:
        raise ValueError("; ".join(errors[:20]))
    for name, body in artifacts(data).items():
        path = dest / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(body)


def check_exports(root: Path) -> list[str]:
    data = load(root)
    expected = artifacts(data)
    base = root / "data/public"
    errors = []
    actual = {str(p.relative_to(base)) for p in base.rglob("*") if p.is_file() and p.name != ".DS_Store"}  # Finder litter is not an export
    if actual != set(expected):
        errors.append("Public directory contains missing or unexpected files")
    for name, body in expected.items():
        path = base / name
        if path.is_symlink() or not path.exists() or path.read_text() != body:
            errors.append(f"Public export differs from catalog: {name}")
    return errors
