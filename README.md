# Fundraising Buddy

A searchable investor database and fundraising workspace, maintained with Claude Code or Codex.

## Product direction

Build a large, well-sourced database of funds, contacts, and investment information, present it in a useful web application, and help a company generate lists of investors to approach. The linked wiki and fundraising workflows should support the work from initial research through outreach, meetings, follow-ups, and round tracking.

The core journey is: describe a company and its round, discover suitable investors, review the evidence and relevant contacts, save a prospect list, then track conversations and next actions in the private workspace.

Implementation priorities:

1. **Database and research quality:** expand fund and contact coverage, preserve sources and research dates, resolve duplicate identities, and make missing or stale information visible. Distinguish researched facts from legacy directory tags.
2. **Company-specific prospect generation:** capture stage, sectors, geography, raise size, desired check sizes, lead requirements, and exclusions. Produce saved, exportable shortlists with fit reasons, supporting sources, relevant contacts, conflicts, and uncertainties. Profile completeness is separate from investment fit; missing information does not prove a mismatch.
3. **Web application and wiki:** make funds, contacts, portfolio information, prospect lists, and private relationship pages searchable and linked. Support useful filtering and comparison, and provide a clear path from a prospect to an active fundraising conversation.
4. **Fundraising operations:** adapt the reusable workflows from `investor-db`, including daily email and meeting checks, follow-up action boards, expected replies, round reviews, unmatched-contact review, and round summaries. Generalize company-specific assumptions and keep private history in the private workspace.

The six existing `fb-*` skills provide the workflow foundation. The minimum prospect workflow now supports structured private criteria, explainable matching, named saved snapshots, exports, and explicit tracking. The app saves editable fund shortlists directly. The prospect view reviews evidence snapshots and prepares CLI save commands. The current `Prospects.md` remains an authored strategy page. Fuller action-board and round-review workflows remain future work.

Research investors, find the right people, filter your email by investor domain, and keep interactions and follow-ups in linked Markdown pages. Browse with the included local viewer or Obsidian.

Public investor research lives in `data/public/`. Your company, round, email, relationships, and notes live in a separate, ignored `workspace/`. No mailbox connection is needed to explore the directory.

## Current status

**Version 0.1.0: local first-release candidate, not yet publicly released.** The selected release scope includes the minimum company-specific prospect workflow. See the [release plan](docs/release-plan.md) for acceptance checks and outstanding release gates.

| Area | Implemented |
| --- | --- |
| Public database | 900 firm/domain records: 120 sourced profiles and 780 directory records; 608 public person-at-firm records; 1,132 public portfolio rows |
| Portable data | Canonical JSON, firm/people/portfolio CSVs, generated Markdown profiles, and a list of 900 investor domains |
| Agent workflows | Six skills shared by Codex and Claude Code for daily checks, interactions, research, review decisions, maintenance, and logging |
| Private wiki | Company context, prospects, firm and people pages, interaction history, review queue, daily logs, and generated pipeline/index |
| Company-specific prospects | Private structured criteria, deterministic evidence-aware matching, saved snapshots, CSV/JSON exports, and explicit pipeline tracking |
| Docker app | Unified funds table, configurable columns, filter rules, multiple sorts, collapsible groups, editable named shortlists, linked profiles, prospect review, and domain export |
| Email | Read-only notmuch import, domain-based query generation for notmuch and Gmail, and guidance for using an external Gmail connector |
| Obsidian | Export of a linked browsing vault, with protection against overwriting edited snapshots |
| Release tooling | Public-data validation, wiki linting, synchronized skill copies, and an explicit release file allowlist |

Latest local checks on October 2, 2026 passed **39 backend tests**, **4 browser tests** using installed Chrome, public-data validation, wiki linting, skill synchronization, frontend rebuilding, and an extracted-release smoke test. Browser tests use an isolated synthetic workspace. GitHub Actions is configured to run build, browser, and release checks; the hosted run still needs verification after commit and push. These mechanical checks do not replace the final provenance and repository-history review.

### Boundaries and remaining release work

- The app can create, rename, and update private fund shortlists. Wiki pages and public research remain read-only in the browser. Edit Markdown or ask your agent to maintain it, then refresh. Skills guide your agent; the application does not run an autonomous LLM or send email.
- Gmail setup uses a separately authorized connector. There is no bundled Gmail OAuth application or direct Gmail import adapter.
- Research dates and source links are retained, but the directory has not been mass re-verified. Directory seeds need identity checks; people records are firm associations, not necessarily unique individuals.
- Investor records contain no individual email addresses, including publicly listed ones. Angel addresses and any additional email domains belong in private config.
- Matching uses recorded evidence, not live investor appetite or an LLM recommendation. Unknown data is not a mismatch, legacy tags are unverified, and completeness scores do not influence fit. Save commands and tracking require explicit user action.
- Before publishing, review the source archive, repository history, and retained data provenance, approve repository visibility, and create the initial release. Packaging does not publish or upload anything.

## Get started

Install Docker and [uv](https://docs.astral.sh/uv/getting-started/installation/), then run from this checkout:

```sh
uv sync --locked
uv run fundraising-buddy init
mkdir -p workspace/shortlists
docker compose up -d --build --wait viewer
```

Open **http://127.0.0.1:10013**. The app always runs in Docker. Compose publishes only host loopback and mounts the workspace read-only, except for the private `workspace/shortlists/` directory used by browser saves. Private workspace files and credentials are excluded from the image build context. Use `docker compose up -d --build viewer` after changing code or public data; Refresh picks up workspace edits. Stop with `docker compose down`.

On Linux, give the container the host user's IDs so it can write the shortlist directory: prefix the Compose command with `FB_UID=$(id -u) FB_GID=$(id -g)`.

Edit `workspace/config.json` for your company, round, and email aliases. Read the [getting started guide](docs/getting-started.md) to connect your agent and email.

Docker binds inside its container and publishes only **127.0.0.1:10013** through Compose. Never publish it to all host interfaces or a public proxy. Its prebuilt frontend is included, so Node.js is only needed when changing the UI. Python 3.11 or newer is required; `uv` manages the project environment.

## What is included

- An attributed investor directory, firm profiles, public people records, JSON/CSV exports, and an investor-domain list. No personal email addresses.
- Skills for daily checks, investor research, interaction updates, pipeline rollups, review decisions, and wiki maintenance.
- A local Spectrum UI viewer with searchable, sortable tables, linked profiles, domain export, and a private pipeline.
- A notmuch email adapter and provider-neutral Gmail connector instructions.
- A public-data validator and an explicit release packager that excludes private workspaces.

The directory is a research starting point, not a live or exhaustive investor registry. Read [data provenance](docs/data.md) for coverage, dates, and limitations.

For new research, use **Keenable**, **Firecrawl**, and/or **Exa** through your agent. Keep source URLs and dates with public facts, and keep company fit assessments private. See the [research guide](docs/research.md) for the workflow.

## Guides

- [Getting started](docs/getting-started.md)
- [Company-specific prospects](docs/prospects.md)
- [Release plan](docs/release-plan.md)
- [Email setup](docs/email.md)
- [Wiki structure and maintenance](docs/wiki.md)
- [Public research with Keenable, Firecrawl, or Exa](docs/research.md)
- [Privacy and releases](docs/privacy.md)
- [Viewer development](docs/ui.md)
- [Contributing](CONTRIBUTING.md)

## Development

```sh
uv run python3 -m unittest discover -s tests -v
uv run fundraising-buddy validate-public
uv run fundraising-buddy lint
uv run python3 tools/install_skills.py --check
uv run python3 tools/package_release.py
uv run python3 tools/smoke_release.py
```

To rebuild the frontend, use Node.js 22.12 or newer:

```sh
npm ci
npm run build
```

The browser checks start their own isolated Docker test server on port 10015 (override with `FB_TEST_PORT`); do not run a manual viewer for them:

```sh
npx playwright install chromium
npm run test:ui
```

The release packager writes `dist/fundraising-buddy-0.1.0.zip`. It includes the public dataset, application, prebuilt UI, frontend sources, skills, guides, tests, and third-party notices. It excludes `workspace/`, raw correspondence, caches, credentials, and the original project's Git history. See [privacy and releases](docs/privacy.md) for the checks and their limits.

The application is MIT licensed. Spectrum UI components retain their Apache 2.0 license and attribution. See [LICENSE](LICENSE), [component notices](frontend/NOTICE.md), and [viewer development](docs/ui.md). Investor source material is not relicensed.
