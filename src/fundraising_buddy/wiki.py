"""Private Markdown workspace with safe frontmatter and generated rollups."""
from __future__ import annotations

import json
import re
from datetime import date
from pathlib import Path

import yaml

from .catalog import load, md_text

STATUSES = {"new", "target", "engaged", "committed", "passed", "paused"}


def read_page(path: Path) -> tuple[dict, str]:
    return split_frontmatter(path.read_text())


def split_frontmatter(text: str) -> tuple[dict, str]:
    if not text.startswith("---\n"):
        return {}, text
    parts = text.split("\n---\n", 1)
    if len(parts) != 2:
        raise ValueError("Unclosed YAML frontmatter")
    meta = yaml.safe_load(parts[0][4:])
    if not isinstance(meta, dict):
        raise ValueError("Frontmatter must be a mapping")
    return meta, parts[1].lstrip("\n")


def write_page(path: Path, meta: dict, body: str):
    text = "---\n" + yaml.safe_dump(meta, sort_keys=False, allow_unicode=True) + "---\n\n" + body
    path.parent.mkdir(parents=True, exist_ok=True)
    pending = path.with_suffix(".pending")
    pending.write_text(text)
    pending.replace(path)


def init(root: Path):
    base = root / "workspace"
    base.mkdir(exist_ok=True)
    for folder in ("wiki/firms", "wiki/people", "wiki/logs", "wiki/notes", "raw", "cache", "cache/vc", "runs"):
        (base / folder).mkdir(parents=True, exist_ok=True)
    files = {
        "config.json": json.dumps({"company": "Your company", "round": "Your round", "owner_emails": [],
                                   "email_provider": "none", "private_angel_emails": [], "extra_domains": [],
                                   "research_contact": "fundraising-buddy research", "private_terms": []}, indent=2) + "\n",
        "wiki/Home.md": "# Your fundraising workspace\n\n[[Index]] | [[Pipeline]] | [[Prospects]] | [[To Review]]\n\nKeep company context and round strategy here. Your agent maintains the wiki; you make relationship and outreach decisions.\n",
        "wiki/Prospects.md": "# Prospects\n\nAdd your target criteria and shortlist here. Link to public profiles or track a firm to create a private page.\n",
        "wiki/To Review.md": "# To Review\n\n## Open\n\nRecord ambiguous identities, proposed relationship changes, and your decisions here.\n\n## Resolved\n",
    }
    for name, body in files.items():
        path = base / name
        if not path.exists():
            path.write_text(body)
    rollup(root)


def track(root: Path, firm_id: str):
    f = next((f for f in load(root)["firms"] if f["id"] == firm_id), None)
    if not f:
        raise ValueError("Unknown public firm ID")
    base = root / "workspace/wiki"
    if not (root / "workspace/config.json").exists():
        raise ValueError("Run init first")
    path = base / "firms" / (firm_id + ".md")
    if path.exists():
        return path
    meta = {"id": firm_id, "name": f["name"], "domain": f["domain"], "status": "target",
            "last_contact": "", "next_action": "", "next_action_due": "", "expected_response": ""}
    body = f"# {md_text(f['name'])}\n\n[[public/firms/{firm_id}|Public research]]\n\n## Relationship Notes\n\n## Interaction Log\n\n## Materials Sent\n"
    write_page(path, meta, body)
    rollup(root)
    return path


def firm_rows(root: Path):
    rows = []
    for path in sorted((root / "workspace/wiki/firms").glob("*.md")):
        if path.is_symlink() or not path.resolve().is_relative_to((root / "workspace/wiki").resolve()):
            raise ValueError("Symlink in private firm pages")
        meta, _ = read_page(path)
        rows.append({**meta, "page": "firms/" + path.stem})
    return rows


def rollup(root: Path):
    base = root / "workspace/wiki"
    if not base.exists():
        raise ValueError("Run init first")
    rows = firm_rows(root)
    index = ["# Index", "", "Generated from private firm pages. Edit those pages, then run rollup.", ""]
    pipeline = ["# Pipeline", "", "Generated from private firm pages. Dates are explicit; no sentiment is inferred.", "",
                "| Firm | Status | Next action | Action due | Expected response | Last contact |",
                "| --- | --- | --- | --- | --- | --- |"]
    for row in rows:
        link = f"[[{row['page']}|{md_text(row.get('name', row['page']))}]]"
        index.append("- " + link)
        pipeline.append("| " + " | ".join([link] + [md_text(row.get(k, "") or "") for k in
                        ("status", "next_action", "next_action_due", "expected_response", "last_contact")]) + " |")
    if not rows:
        index.append("No firms tracked yet. Browse the public directory, then run `fundraising-buddy track <domain>`.")
    (base / "Index.md").write_text("\n".join(index) + "\n")
    (base / "Pipeline.md").write_text("\n".join(pipeline) + "\n")


def lint(root: Path) -> list[str]:
    base = root / "workspace/wiki"
    if not base.exists():
        return ["Run init first"]
    paths = sorted(base.rglob("*.md"))
    from .prospects import lists, criteria
    try:
        criteria(root)
        snapshots = lists(root)
    except (ValueError, OSError) as exc:
        return ["Invalid prospect workspace: " + str(exc)]
    ids = {str(p.relative_to(base).with_suffix("")) for p in paths}
    ids |= {"prospect-lists/" + item["id"] for item in snapshots}
    pub = load(root)
    ids |= {"public/firms/" + f["id"] for f in pub["firms"]}
    ids |= {"public/people/" + p["id"] for p in pub["people"]}
    errors = []
    for path in paths:
        if path.is_symlink():
            errors.append(f"{path.name}: symlinks are not wiki pages")
            continue
        try:
            meta, body = read_page(path)
        except (ValueError, yaml.YAMLError):
            errors.append(f"{path.name}: invalid YAML frontmatter")
            continue
        if path.parent.name == "firms":
            for field in ("id", "name", "status"):
                if not meta.get(field):
                    errors.append(f"{path.name}: missing {field}")
            if "domain" not in meta or not isinstance(meta["domain"], str):
                errors.append(f"{path.name}: domain must be a string (empty is allowed for angels)")
            if not isinstance(meta.get("status"), str) or meta["status"] not in STATUSES:
                errors.append(f"{path.name}: invalid status")
            for field in ("last_contact", "next_action_due", "expected_response"):
                if meta.get(field):
                    try:
                        date.fromisoformat(str(meta[field]))
                    except ValueError:
                        errors.append(f"{path.name}: invalid {field}")
        elif path.parent.name == "people":
            for field in ("id", "name", "firm_id"):
                if not meta.get(field):
                    errors.append(f"{path.name}: missing {field}")
            if "firms/" + str(meta.get("firm_id", "")) not in ids:
                errors.append(f"{path.name}: missing private firm association")
        for target in re.findall(r"\[\[([^\]|]+)(?:\|[^\]]+)?\]\]", body):
            if target.split("#")[0].removesuffix(".md") not in ids:
                errors.append(f"{path.name}: broken wiki link {target}")
    return errors
