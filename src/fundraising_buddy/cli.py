from __future__ import annotations

import argparse
import json
import sys
import subprocess
from datetime import datetime, timezone
from pathlib import Path

import yaml

from . import catalog, email, wiki, prospects


def main():
    ap = argparse.ArgumentParser(description="Public investors. Your private fundraising wiki.")
    commands = ap.add_subparsers(dest="command", required=True)
    for cmd in ("init", "rollup", "lint", "validate-public", "checkpoint", "prospects-init", "prospects-lists"):
        commands.add_parser(cmd)
    p = commands.add_parser("prospects-preview")
    p.add_argument("--limit", type=int, default=20)
    p = commands.add_parser("prospects-save")
    p.add_argument("list_id")
    p.add_argument("--name", required=True)
    p.add_argument("--limit", type=int, default=20)
    p.add_argument("--firm", action="append", default=[])
    p = commands.add_parser("prospects-export")
    p.add_argument("list_id")
    p.add_argument("--format", choices=["csv", "json"], default="csv")
    p = commands.add_parser("prospects-track")
    p.add_argument("list_id")
    p.add_argument("--firm", action="append", required=True)
    p = commands.add_parser("track")
    p.add_argument("firm_id")
    p = commands.add_parser("serve")
    p.add_argument("--port", type=int, default=10013)
    p.add_argument("--container", action="store_true", help="Docker only: bind inside the container; publish only to host loopback")
    for cmd in ("email-query", "email-import"):
        p = commands.add_parser(cmd)
        p.add_argument("--since", required=True)
        p.add_argument("--until", required=True, help="Exclusive end, ISO timestamp or date; UTC if no zone")
        if cmd == "email-query":
            p.add_argument("--provider", choices=["gmail", "notmuch"], required=True)
    args = ap.parse_args()
    root = Path.cwd()
    try:
        if args.command == "init":
            catalog.load(root)
            wiki.init(root)
            print("Created private workspace. Edit workspace/config.json, then run serve.")
        elif args.command == "prospects-init":
            print(prospects.init_criteria(root).relative_to(root))
        elif args.command == "prospects-preview":
            if not 1 <= args.limit <= 9000:
                raise ValueError("Preview limit must be 1 to 9000")
            print(json.dumps(prospects.match(catalog.load(root), prospects.criteria(root))[:args.limit], indent=2))
        elif args.command == "prospects-lists":
            print(json.dumps([{k: item[k] for k in ("id", "name", "created_at")} for item in prospects.lists(root)], indent=2))
        elif args.command == "prospects-save":
            item = prospects.save(root, args.list_id, args.name, args.limit, args.firm)
            print(f"Saved {len(item['rows'])} firms privately to workspace/prospects/lists/{item['id']}.json")
        elif args.command == "prospects-export":
            print(prospects.export(root, args.list_id, args.format).relative_to(root))
        elif args.command == "prospects-track":
            for path in prospects.track(root, args.list_id, args.firm):
                print(path.relative_to(root))
        elif args.command == "track":
            print(wiki.track(root, args.firm_id).relative_to(root))
        elif args.command == "rollup":
            wiki.rollup(root)
            print("Updated Index and Pipeline.")
        elif args.command in {"lint", "validate-public"}:
            errors = wiki.lint(root) if args.command == "lint" else catalog.check_exports(root)
            print("\n".join(errors) if errors else "Checks passed.")
            return int(bool(errors))
        elif args.command == "serve":
            from .server import serve
            serve(root, args.port, container=args.container)
        elif args.command == "email-query":
            print("\n\n".join(email.queries(root, args.provider, args.since, args.until)))
        elif args.command == "email-import":
            path, count = email.notmuch_import(root, args.since, args.until)
            print(f"{count} messages saved privately to {path.relative_to(root)}. Review before updating the wiki.")
        elif args.command == "checkpoint":
            errors = wiki.lint(root)
            if errors:
                raise ValueError("Checkpoint refused: " + "; ".join(errors))
            run = root / "workspace/runs/pending.json"
            pending = json.loads(run.read_text())
            if set(pending) != {"since", "until", "all_pages_read", "review_complete"} or pending["all_pages_read"] is not True or pending["review_complete"] is not True:
                raise ValueError("Checkpoint requires completed pagination and review in workspace/runs/pending.json")
            start, end = email.window(pending["since"], pending["until"])
            checkpoint = root / "workspace/runs/checkpoint.json"
            if checkpoint.exists():
                old = json.loads(checkpoint.read_text())["until"]
                previous_end = email.window("1970-01-01", old)[1]
                if end < previous_end or start > previous_end:
                    raise ValueError("Checkpoint would move backward or leave an unreviewed gap")
            wiki.rollup(root)
            now = datetime.now(timezone.utc).isoformat()
            path = root / "workspace/wiki/logs" / (now[:10] + ".md")
            existing = path.read_text() if path.exists() else f"# {now[:10]}\n"
            marker = f"<!-- daily-check-completed: {pending['until']} -->"
            if marker not in existing:
                path.write_text(existing + f"\nReviewed window {pending['since']} to {pending['until']}.\n\n{marker}\n")
            (root / "workspace/runs/checkpoint.json").write_text(json.dumps({"until": pending["until"], "completed_at": now}, indent=2))
            print("Daily check completion recorded.")
    except (ValueError, OSError, KeyError, TypeError, yaml.YAMLError, subprocess.CalledProcessError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
