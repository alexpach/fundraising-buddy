"""Mutable, private fund lists. Prospect evidence snapshots remain immutable."""
from __future__ import annotations

import fcntl
import json
import os
import uuid
from datetime import datetime, timezone
from pathlib import Path

from .catalog import load


class Conflict(ValueError):
    pass


def directory(root: Path) -> Path:
    base = root / "workspace/shortlists"
    if base.is_symlink() or not base.resolve().is_relative_to((root / "workspace").resolve()):
        raise ValueError("Invalid shortlist directory")
    return base


def read(root: Path) -> dict:
    path = directory(root) / "lists.json"
    if path.is_symlink():
        raise ValueError("Invalid shortlist file")
    if not path.exists():
        return {"revision": 0, "lists": []}
    result = json.loads(path.read_text())
    if not isinstance(result, dict) or type(result.get("revision")) is not int or not isinstance(result.get("lists"), list):
        raise ValueError("Invalid shortlist data")
    return result


def mutate(root: Path, request: dict) -> dict:
    if not isinstance(request, dict):
        raise ValueError("Expected an object")
    action = request.get("action")
    if action not in {"create", "rename", "add", "remove"}:
        raise ValueError("Unknown shortlist action")
    name = request.get("name")
    if action in {"create", "rename"}:
        if not isinstance(name, str) or not name.strip() or len(name.strip()) > 100 or any(ord(c) < 32 for c in name):
            raise ValueError("Use a shortlist name of 1 to 100 characters")
        name = name.strip()
    ids = request.get("firm_ids", [])
    if not isinstance(ids, list) or len(ids) > 10000 or any(not isinstance(i, str) for i in ids):
        raise ValueError("Invalid fund selection")
    ids = list(dict.fromkeys(ids))
    if action in {"create", "add"}:
        known = {f["id"] for f in load(root)["firms"]}
        if any(i not in known for i in ids):
            raise ValueError("A selected fund is no longer in the catalog")
    base = directory(root)
    base.mkdir(parents=True, exist_ok=True)
    lock_path = base / ".lock"
    if lock_path.is_symlink():
        raise ValueError("Invalid shortlist lock")
    with lock_path.open("a") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        data = read(root)
        if type(request.get("revision")) is not int or request["revision"] != data["revision"]:
            raise Conflict("Shortlists changed in another tab. Reload lists and try again.")
        now = datetime.now(timezone.utc).isoformat()
        if action in {"create", "rename"} and any(
            x["name"].casefold() == name.casefold() and (action == "create" or x["id"] != request.get("id"))
            for x in data["lists"]
        ):
            raise ValueError("A shortlist with that name already exists")
        if action == "create":
            item = {"id": uuid.uuid4().hex, "name": name, "firm_ids": ids, "created_at": now, "updated_at": now}
            data["lists"].append(item)
        else:
            item = next((x for x in data["lists"] if x["id"] == request.get("id")), None)
            if item is None:
                raise ValueError("Shortlist not found")
            if action == "rename":
                item["name"] = name
            elif action == "add":
                item["firm_ids"] = list(dict.fromkeys(item["firm_ids"] + ids))
            else:
                item["firm_ids"] = [i for i in item["firm_ids"] if i not in ids]
            item["updated_at"] = now
        data["revision"] += 1
        path = base / "lists.json"
        temporary = base / (uuid.uuid4().hex + ".tmp")
        with temporary.open("x") as file:
            json.dump(data, file, indent=2)
            file.write("\n")
            file.flush()
            os.fsync(file.fileno())
        os.replace(temporary, path)
        return {**data, "changed_id": item["id"]}
