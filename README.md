# Fundraising Buddy

A Docker app for browsing investor funds, filtering by investment criteria, saving shortlists, and keeping private fundraising notes.

<img width="1329" height="1035" alt="Fundraising Buddy funds table" src="https://github.com/user-attachments/assets/0059f9d1-f169-4e8f-9bd7-b1094155008d" />

## Run

Install Docker and [uv](https://docs.astral.sh/uv/getting-started/installation/), then run from the project root:

```sh
uv sync --locked
uv run fundraising-buddy init
mkdir -p workspace/shortlists
docker compose up -d --build viewer
```

Open **http://127.0.0.1:10013**. On Linux, prefix the Compose command with `FB_UID=$(id -u) FB_GID=$(id -g)` so the container can save shortlists. Stop with `docker compose down`.

Rebuild the viewer after changing application code or public data. Use Refresh in the app to reload data. The app runs locally in Docker and has no login or public hosting mode.

## Features

- Funds table with configurable columns, filters, sorting, optional groups, and incremental loading.
- Named shortlists and a searchable domains table with plain-text export.
- Public firm, people, and portfolio profiles with source links and research dates.
- Private company criteria, prospect lists, relationship notes, and follow-ups.
- Markdown wiki and Obsidian export.
- Optional Codex and Claude Code workflows for research and wiki maintenance.

The public catalog is in `data/public/catalog.json`. CSVs and Markdown profiles are generated from it. Company details, email, notes, shortlists, and research caches belong in the ignored `workspace/` directory.

Research coverage varies. Some records retain unverified directory data, and unresolved identities remain. Jev scores measure profile completeness, not accuracy or investment fit. See [data provenance](docs/data.md).

## Agent setup

The seven workflows live in `skills/`. To make them available to Codex and Claude Code:

```sh
uv run python3 tools/install_skills.py
```

This generates ignored copies in `.agents/skills/` and `.claude/skills/`. Edit only `skills/`, then rerun the installer. Generated copies are not committed or included in release archives. Agent workflows are optional; browsing the app needs no model or mailbox access.

## Guides

- [Getting started](docs/getting-started.md)
- [Investor research and revalidation](docs/research.md)
- [Company-specific prospects](docs/prospects.md)
- [Email setup](docs/email.md)
- [Wiki structure](docs/wiki.md)
- [Privacy and release packaging](docs/privacy.md)
- [UI development](docs/ui.md)
- [Contributing](CONTRIBUTING.md)

## Development

Python dependencies are managed by uv. The prebuilt frontend is included; changing it requires Node.js 22.12 or newer.

```sh
uv run python3 -m unittest discover -s tests
uv run fundraising-buddy validate-public
npm ci
npm run build
docker compose up -d --build viewer
```

Browser tests start an isolated Docker container on port 10015. Override the port with `FB_TEST_PORT` if needed.

```sh
npx playwright install chromium
npm run test:ui
```

To build and verify a source archive:

```sh
uv run python3 tools/package_release.py
uv run python3 tools/smoke_release.py
```

The archive includes only allowlisted public files. Private workspace data, credentials, caches, and local agent copies are excluded.

## License

The application is [MIT licensed](LICENSE). Third-party components retain their licenses and [attribution](frontend/NOTICE.md). Investor source material is not relicensed.
