# Contributing

Contribute code, reusable workflows, or public investor research. Keep your own fundraising workspace private.

For investor changes, edit `data/public/catalog.json` using the schema in [Data provenance](docs/data.md). Include public source links and dates. Omit individual email addresses and all relationship information. Do not copy third-party prose or entire source caches. Do not present a directory reference as a verified profile.

Regenerate derived exports, then validate:

```sh
uv run python tools/export_public.py
uv run fundraising-buddy validate-public
uv run python -m unittest discover -s tests -v
```

If deleting a record leaves stale generated Markdown, inspect it and move it to trash. The validator intentionally rejects stale files rather than silently deleting them.

Edit canonical skills under `skills/`, then run `uv run python tools/install_skills.py` to update both agents' project-local copies. Keep instructions provider-neutral and avoid machine-specific paths, personal configuration, and implied permission to contact anyone.

Run commands from the project root. Use uv for Python dependencies and keep `uv.lock` current. Read before editing and search callers before changing shared functions. Add tests for meaningful privacy boundaries or behavior changes. Use synthetic data in tests.

By contributing your original code and documentation, you agree to its distribution under MIT. Attribution links identify third-party sources; their underlying content is not relicensed by this project.
