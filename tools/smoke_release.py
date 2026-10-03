"""Package and test an extracted release, with a new synthetic workspace.

Temporary files stay under tmp/. Nothing is published. npm ci rebuilds the
frontend from the distributed sources rather than borrowing checkout files.
"""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import zipfile

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from tools.package_release import package


def smoke(root: Path):
    archive, count = package(root)
    parent = root / "tmp/release-smoke"
    parent.mkdir(parents=True, exist_ok=True)
    target = Path(tempfile.mkdtemp(dir=parent))
    with zipfile.ZipFile(archive) as z:
        for name in z.namelist():
            parts = Path(name).parts
            if not parts or parts[0] != "fundraising-buddy" or ".." in parts or any(
                    part in {"workspace", ".env", ".git", "node_modules", "tmp"} for part in parts):
                raise ValueError("Unexpected archive path")
        z.extractall(target)
    checkout = target / "fundraising-buddy"
    manifest = json.loads((checkout / "RELEASE-MANIFEST.json").read_text())
    for name, digest in manifest.items():
        if hashlib.sha256((checkout / name).read_bytes()).hexdigest() != digest:
            raise ValueError("Release manifest mismatch: " + name)
    env = {**os.environ, "PYTHONPATH": str(checkout / "src")}
    def run(*args):
        subprocess.run(args, cwd=checkout, env=env, check=True)
    run(sys.executable, "-m", "unittest", "discover", "-s", "tests", "-v")
    for command in ("init", "validate-public", "lint", "prospects-init"):
        run(sys.executable, "-m", "fundraising_buddy.cli", command)
    profile = checkout / "workspace/prospects/criteria.json"
    profile.write_text(json.dumps({"company": "Synthetic release smoke", "stage": "seed", "sectors": ["robotics"]}))
    run(sys.executable, "-m", "fundraising_buddy.cli", "prospects-save", "smoke", "--name", "Synthetic shortlist", "--limit", "3")
    run(sys.executable, "-m", "fundraising_buddy.cli", "prospects-export", "smoke", "--format", "csv")
    snapshot = json.loads((checkout / "workspace/prospects/lists/smoke.json").read_text())
    if not snapshot["rows"]:
        raise ValueError("Smoke shortlist unexpectedly empty")
    run(sys.executable, "-m", "fundraising_buddy.cli", "prospects-track", "smoke", "--firm", snapshot["rows"][0]["firm_id"])
    run(sys.executable, "-m", "fundraising_buddy.cli", "lint")
    run(sys.executable, "tools/install_skills.py", "--check")
    before = {name: (checkout / "src/fundraising_buddy/static" / name).read_bytes() for name in ("app.js", "style.css")}
    run("npm", "ci")
    run("npm", "run", "build")
    for name, body in before.items():
        if (checkout / "src/fundraising_buddy/static" / name).read_bytes() != body:
            raise ValueError("Release frontend is not reproducible: " + name)
    print(f"Extracted release smoke passed: {count} files. Fixture: {checkout.relative_to(root)}")


if __name__ == "__main__":
    smoke(Path.cwd())
