"""Regenerate only allowlisted public artifacts from the catalog."""
from pathlib import Path
from fundraising_buddy.catalog import load, write_catalog

if __name__ == "__main__":
    root = Path.cwd()
    write_catalog(load(root), root / "data/public")
    print("Public exports regenerated. Run validate-public to detect stale or unexpected files.")
