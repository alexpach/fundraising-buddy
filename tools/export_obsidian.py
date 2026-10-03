"""Build a private Obsidian browsing snapshot, refusing to overwrite user edits."""
import hashlib
import json
from pathlib import Path

from fundraising_buddy.catalog import load, public_pages
from fundraising_buddy.prospects import lists, markdown


def export(root: Path):
    target = root / "workspace/obsidian"
    manifest = target / ".snapshot.json"
    previous = json.loads(manifest.read_text()) if manifest.exists() else {}
    files = {"public/" + k + ".md": v for k, v in public_pages(load(root)).items()}
    files.update({"prospect-lists/" + s["id"] + ".md": markdown(s) for s in lists(root)})
    base = root / "workspace/wiki"
    for path in base.rglob("*.md"):
        if path.is_symlink() or not path.resolve().is_relative_to(base.resolve()):
            raise ValueError("Symlink in private wiki")
        name = str(path.relative_to(base))
        if name in files:
            raise ValueError("Wiki page collides with a generated shortlist")
        files[name] = path.read_text()
    digest = lambda body: hashlib.sha256(body.encode()).hexdigest()
    for name in set(files) | set(previous):
        dest = target / name
        if not dest.resolve().is_relative_to(target.resolve()) or dest.is_symlink():
            raise ValueError("Unsafe snapshot path")
        if dest.exists() and digest(dest.read_text()) != previous.get(name):
            raise ValueError(f"Snapshot was edited: {name}. Move the edits to workspace/wiki first.")
        if name not in files and dest.exists():
            raise ValueError(f"Stale snapshot page: {name}. Review and move it to trash first.")
    for name, body in files.items():
        dest = target / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(body)
    manifest.write_text(json.dumps({name: digest(body) for name, body in files.items()}, indent=2))
    return len(files)


if __name__ == "__main__":
    print(f"Exported {export(Path.cwd())} pages to private workspace/obsidian/.")
