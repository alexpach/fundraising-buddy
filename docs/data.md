# Public data and provenance

The catalog contains public firm profiles, people associated with those firms, and portfolio entries. Counts come from `data/public/catalog.json` and are displayed in the app. People records represent firm associations, not necessarily unique individuals.

## Coverage levels

**Directory** records began as name/domain entries or legacy tags. They may now include reviewed corrections alongside unaudited fields. The label is retained when only part of a profile has been reviewed.

**Sourced** records came from public research with source references and a stored review. This label does not guarantee that every field is accurate or current.

The October 2026 revalidation reviewed the catalog and applied supported corrections to 658 records. Ambiguous identities and blocked reports were held back. People and portfolio entries were outside that audit. Source dates describe individual claims; research dates do not establish that every fact on a profile was rechecked. See the research guide for the repeatable validation and promotion workflow.

## Schema

`data/public/catalog.json` is the source of truth. It contains `schema_version: 2`, a `firms` list, and a `people` list.

Each firm has exactly these fields:

| Field | Meaning |
| --- | --- |
| `id` | Stable, safe identifier, initially the canonical domain |
| `name` | Public firm name |
| `domain` | Investor domain, excluding shared mailbox providers |
| `website` | Public website URL |
| `record_level` | `directory` or `sourced` |
| `researched_at` | Recorded research date, or empty |
| `fields` | Selected public facts |
| `evidence` | One `{url, as_of}` entry for each selected fact |
| `sources` | Public reference URLs |
| `portfolio` | Selected public portfolio rows for this firm |
| `scores` | Optional derived profile scores, for example `{"jev-score": 73}`; 0 to 100, never a research claim |

Allowed `fields` keys are `type`, `hq`, `founded`, `stages`, `geographies`, `sectors`, `aum`, `check_size_min`, `check_size_max`, `legal_name`, `offices`, `leads_rounds`, `latest_fund`, `thesis_quote`, `exclusions`, `lps`, `coinvestors`, `investment_strategies`, `legal_structure`, `investment_instruments`, and `about` (a short descriptive paragraph, only carried over from the legacy list for directory records and marked unverified by their record level). Preserve uncertainty and units. Do not turn a target or a historical filing amount into current AUM. `stages`, `geographies`, `sectors`, `offices`, `investment_strategies`, `legal_structure`, and `investment_instruments` are always lists of strings. `lps` and `coinvestors` are either a short narrative string or a list of names, depending on how the source stated them. The remaining facts are scalar values.

A `directory` record may still carry `fields`: curated tags (type, stages, geographies, sectors, AUM, check sizes, lead preference) carried over from a legacy list by `tools/migrate_legacy_fields.py`. Their evidence points at the recorded reference URL (Crunchbase or the website) with the legacy update date, and the exported page labels them as not independently sourced. Only records with empty `fields` are filled, and no relationship state moves.

`scores.jev-score` is a completeness score from `tools/jev_score.py`: seven weighted dimensions (mandate 25, capital 15, portfolio 15, provenance 15, identity 10, thesis 10, people 10) judged by TypeSafe's Jev model against fixed ordered levels, composed in code. Per-dimension answers are cached privately under `workspace/cache/jev/`. It needs `TYPESAFE_API_KEY`; other keys under `scores` are left untouched so later scoring methods can be compared side by side.

`leads_rounds` is always one of `yes`, `no`, `maybe`, or `unknown`. A sourced lead or co-lead event supports `yes`; `no` requires an explicit policy, not a lack of examples. Existing labels may be legacy model judgments and need revalidation. `tools/jev_leads.py` now writes private proposals only under `workspace/cache/jev-leads/` and cannot overwrite the catalog. It needs `TYPESAFE_API_KEY`. Use the independent source-review workflow in `skills/fb-revalidate-funds/SKILL.md` before promoting corrections. Treat `maybe` and `unknown` as not established, and never as a mismatch.

Each `portfolio` entry has exactly `company`, `sector`, `round`, `date`, `url`, and `as_of`, all strings, empty when unknown except `company` and `url`, which are required. `url` must be a public source link for that specific investment.

Each person has exactly `id`, `name`, `firm_id`, `title`, `focus`, `profile`, `sources`, and `researched_at`. A nonempty `firm_id` links the person to a firm record. An empty `firm_id` represents an independently investing individual whose firm affiliation is not established. `focus` is a short sourced description of the person's investment focus, empty when unknown. An optional public profile URL is an empty string when not established. Public-source links must use HTTP(S) and cannot include credentials, query strings, fragments, or email addresses. No email, biography, or address field is supported in this release, including publicly listed addresses.

The validator rejects unexpected keys, email patterns, duplicate identities/domains, invalid nonempty firm associations, malformed domains, missing evidence, and malformed portfolio entries. Generated Markdown, CSV, and domain lists must exactly match the canonical catalog. A firm's exported page includes its portfolio as a table, and `data/public/portfolio.csv` lists every portfolio row across all firms. It does not perform live web research or replace factual review.

## Updating and exporting

```sh
uv run python3 tools/export_public.py
uv run fundraising-buddy validate-public
```

When removing records, inspect any stale derived pages and move them to trash; the validator flags them until removed. Do not import a whole private wiki or sanitize arbitrary pages by deleting only known private headings.

The reusable legacy extraction tool is `tools/import_public.py`. It accepts an explicit source directory and repeatable `--exclude-term` arguments for private identifiers. It reads legacy firm frontmatter and public-research caches, reconstructs allowed fields, and writes rejected-item diagnostics only to ignored `tmp/`. It does not need to be run by ordinary users and does not connect to email.

## Attribution

Every record retains public reference URLs. The distributed catalog contains selected factual values and our generated structure, not scraped pages, copied biographies, or long excerpts. MIT covers the project's code, documentation, and original compilation; third-party material at linked sources retains its own terms.

## Reviewed catalog updates

The revalidation promotion tool replaces type, stages, sectors, lead activity and firm AUM only after an accepted independent review and a fresh evidence/fingerprint check. High-confidence same-entity or rebrand matches must retain the same domain. Other identities remain pending resolution. Additional list fields `investment_strategies`, `legal_structure`, and `investment_instruments` preserve these distinctions. Each field retains a public source reference; the complete per-item evidence and review remain private. Unsupported audited values are removed, not replaced by guesses.

AUM retains currency, qualifier and effective date (or an explicit missing-date label). Fund sizes, capital raised, total assets and strategy/vehicle assets are not imported as firm AUM. Conflicting capital findings are withheld. Bounds and ranges use explicit labels and remain in the Unknown size group because they do not establish a unique bucket. Unreviewed fields, people and portfolios retain their existing provenance and coverage labels; a partial audit does not promote an entire directory profile to sourced. Old Jev completeness scores are cleared on updated records.
