"""Read-only provider queries and exact-address filtering for notmuch."""
from __future__ import annotations

import json
import re
import subprocess
from datetime import datetime, timezone
from email.utils import getaddresses
from pathlib import Path

from .catalog import domain, load


def terms(root: Path):
    config = json.loads((root / "workspace/config.json").read_text())
    domains = {f["domain"] for f in load(root)["firms"]}
    domains.update(domain(x) for x in config.get("extra_domains", []))
    angels = config.get("private_angel_emails", [])
    for address in angels:
        if not re.fullmatch(r"[a-zA-Z0-9._+%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", address):
            raise ValueError("Invalid private angel address")
    return sorted(domains), sorted(set(x.lower() for x in angels))


def window(since: str, until: str):
    def parse(value):
        dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
        return dt.replace(tzinfo=timezone.utc) if dt.tzinfo is None else dt.astimezone(timezone.utc)
    start, end = parse(since), parse(until)
    if start >= end:
        raise ValueError("until must be later than since; end is exclusive")
    return int(start.timestamp()), int(end.timestamp())


def queries(root: Path, provider: str, since: str, until: str, batch_size=25):
    ds, angels = terms(root)
    start, end = window(since, until)
    values = ["@" + d for d in ds] + angels
    if not values:
        raise ValueError("Empty investor filter")
    result = []
    for offset in range(0, len(values), batch_size):
        group = values[offset:offset + batch_size]
        if provider == "gmail":
            clause = " ".join(f"from:({v}) to:({v}) cc:({v})" for v in group)
            # Query a small overlap, then enforce exact [start,end) on timestamps.
            result.append(f"after:{start - 1} before:{end} -in:drafts {{{clause}}}")
        else:
            clause = " OR ".join(f'from:"{v}" OR to:"{v}"' for v in group)
            result.append(f"date:@{start}..@{end} AND NOT tag:draft AND ({clause})")
    return result


def matches(headers: dict, domains: set[str], angels: set[str]):
    headers = {k.lower(): v for k, v in headers.items()}
    addresses = getaddresses([headers[k] for k in ("from", "to", "cc", "bcc") if headers.get(k)])
    return any(addr.lower() in angels or addr.lower().rpartition("@")[2] in domains for _, addr in addresses)


def flatten(node):
    if isinstance(node, dict):
        if "id" in node and "headers" in node:
            yield node
    elif isinstance(node, list):
        for child in node:
            yield from flatten(child)


def text_parts(parts):
    out = []
    for part in parts if isinstance(parts, list) else []:
        if part.get("content-type") == "text/plain" and isinstance(part.get("content"), str):
            out.append(part["content"])
        elif isinstance(part.get("content"), list):
            out.extend(text_parts(part["content"]))
    return out


def notmuch_import(root: Path, since: str, until: str):
    ds, angels = terms(root)
    start, end = window(since, until)
    messages = {}
    for query in queries(root, "notmuch", since, until):
        proc = subprocess.run(["notmuch", "show", "--format=json", "--body=true", "--entire-thread=false", query],
                              check=True, text=True, capture_output=True)
        for message in flatten(json.loads(proc.stdout)):
            if "draft" in message.get("tags", []) or not start <= message.get("timestamp", 0) < end:
                continue
            if matches(message["headers"], set(ds), set(angels)):
                messages[message["id"]] = {"id": message["id"], "timestamp": message["timestamp"],
                    "headers": message["headers"], "body": "\n\n".join(text_parts(message.get("body", [])))}
    # All subprocesses succeed before any output is written. No checkpoint here:
    # the agent commits completion only after reviewing and linting the wiki.
    target = root / "workspace/raw/email-review.json"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps({"since": since, "until": until, "complete": True,
                                  "messages": sorted(messages.values(), key=lambda m: m["timestamp"])}, indent=2))
    return target, len(messages)
