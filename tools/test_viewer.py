"""Serve an isolated, synthetic private workspace for browser tests, never the user's workspace."""
from pathlib import Path
import json
import os
import tempfile

from fundraising_buddy import catalog, prospects, wiki
from fundraising_buddy.server import serve


def main():
    root = Path.cwd()
    (root / "tmp/viewer-fixtures").mkdir(parents=True, exist_ok=True)
    fixture = Path(tempfile.mkdtemp(dir=root / "tmp/viewer-fixtures"))
    # The shipped public catalog supports directory navigation tests. All private
    # company criteria, shortlist names, and relationship notes are synthetic.
    catalog.write_catalog(catalog.load(root), fixture / "data/public")
    wiki.init(fixture)
    path = prospects.init_criteria(fixture)
    path.write_text(json.dumps({"company": "Synthetic Robotics", "round": "Synthetic seed round", "stage": "seed",
                                "sectors": ["robotics"], "geographies": ["us"], "currency": "USD"}))
    prospects.save(fixture, "browser-fixture", "Synthetic saved shortlist", limit=3)
    serve(fixture, int(os.environ.get("FB_TEST_PORT", "10015")), container=True)


if __name__ == "__main__":
    main()
