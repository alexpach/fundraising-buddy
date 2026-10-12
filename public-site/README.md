# Public fund directory

GitHub Pages serves a static table from the same `data/public/catalog.json` used by the local app. No private workspace data or API endpoints are needed.

Run `uv run python3 tools/package_pages.py` from the project root to create `dist/github-pages.zip`. The packager uses an explicit allowlist, checks public field names and common private-data patterns, and includes the catalog without transforming it. `manifest.json` records its SHA-256 hash and fund count.

The `Publish public fund directory` workflow rebuilds and publishes the `gh-pages` branch after changes to the catalog, page assets, or packager reach `main`. It can also be run manually. GitHub Pages should use the root of `gh-pages` as its source. Only files from the packaged archive belong on that branch.

The table supports search, stage/sector/research filters, sortable optional columns, pagination, and linked fund profiles with all recorded fields, evidence dates, team members, portfolio, and sources. Missing values stay unknown. Completeness scores are separate from investment fit.
