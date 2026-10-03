# Public data and provenance

The current snapshot contains **900 firm/domain records**, including **120 sourced profiles** and **780 directory records**, plus **608 public people records** and **1,132 public portfolio rows**. People records describe a person at a particular firm, so they are not a guaranteed count of unique individuals. Portfolio rows describe a firm's disclosed investment in a company, sourced the same way as any other fact.

## Coverage levels

**Directory** records retain firm name, domain, and an existing website reference. The reference's hostname matches the domain. Of the 780 directory records, 776 also carry legacy general fund tags, explicitly labeled as not independently sourced. Reference links do not claim that the website was fetched, that the identity or tags are independently verified, or that the firm is currently investing. No relationships, source-import labels, or personal emails are carried over. Verify these records before using them for outreach.

**Sourced** records come from existing public-research dossiers with a stored review whose mechanical gate passed and that recorded no critical defects; the review's overall verdict may still be `revise`. Each exported research field also has a supporting excerpt present in the local source cache. Fields mentioned in unresolved review defects are omitted. Public people require a cached source containing their name and role; biographies and addresses are omitted. A passing gate is not a guarantee of current accuracy or proof that every excerpt supports every interpretation.

Existing research dates and source dates are retained. There was no mass live re-verification for this release. The release creation date must not be substituted for a research date. Directory seeds have an empty research date because it was not established.

Legacy angel records, ambiguous/missing websites, malformed entries, and unresolved detailed profiles were excluded or reduced to directory identities. Additional public records can be added through normal contributions after their evidence is checked. Selection reflects the source collection's coverage and research history, not a ranking or claim of completeness.

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

Allowed `fields` keys are `type`, `hq`, `founded`, `stages`, `geographies`, `sectors`, `aum`, `check_size_min`, `check_size_max`, `legal_name`, `offices`, `leads_rounds`, `latest_fund`, `thesis_quote`, `exclusions`, `lps`, `coinvestors`, and `about` (a short descriptive paragraph, only carried over from the legacy list for directory records and marked unverified by their record level). Preserve uncertainty and units. Do not turn a target or a historical filing amount into current AUM. `stages`, `geographies`, `sectors`, and `offices` are always lists of strings. `lps` and `coinvestors` are either a short narrative string or a list of names, depending on how the source stated them. The remaining facts are scalar values.

A `directory` record may still carry `fields`: curated tags (type, stages, geographies, sectors, AUM, check sizes, lead preference) carried over from a legacy list by `tools/migrate_legacy_fields.py`. Their evidence points at the recorded reference URL (Crunchbase or the website) with the legacy update date, and the exported page labels them as not independently sourced. Only records with empty `fields` are filled, and no relationship state moves.

`scores.jev-score` is a completeness score from `tools/jev_score.py`: seven weighted dimensions (mandate 25, capital 15, portfolio 15, provenance 15, identity 10, thesis 10, people 10) judged by TypeSafe's Jev model against fixed ordered levels, composed in code. Per-dimension answers are cached privately under `workspace/cache/jev/`. It needs `TYPESAFE_API_KEY`; other keys under `scores` are left untouched so later scoring methods can be compared side by side.

`leads_rounds` is always one of `yes`, `no`, `maybe`, or `unknown`. It is a judgment from `tools/jev_leads.py`: TypeSafe's Jev model answers one Choice question per firm from the recorded profile only (fields, portfolio, people), never from outside knowledge. A source-stated preference is passed to Jev as a direct statement and keeps its evidence entry; otherwise the evidence entry points at the firm's website and carries no date. A label whose top probability is below 0.5 becomes `unknown`. Raw answers and probabilities are cached privately under `workspace/cache/jev-leads/`, and rerunning only pays for firms whose profile changed. It needs `TYPESAFE_API_KEY`. Treat `maybe` and `unknown` as not established, and never as a mismatch.

Each `portfolio` entry has exactly `company`, `sector`, `round`, `date`, `url`, and `as_of`, all strings, empty when unknown except `company` and `url`, which are required. `url` must be a public source link for that specific investment.

Each person has exactly `id`, `name`, `firm_id`, `title`, `focus`, `profile`, `sources`, and `researched_at`. `focus` is a short sourced description of the person's investment focus, empty when unknown. An optional public profile URL is an empty string when not established. Public-source links must use HTTP(S) and cannot include credentials, query strings, fragments, or email addresses. No email, biography, or address field is supported in this release, including publicly listed addresses.

The validator rejects unexpected keys, email patterns, duplicate identities/domains, missing firm associations, malformed domains, missing evidence, and malformed portfolio entries. Generated Markdown, CSV, and domain lists must exactly match the canonical catalog. A firm's exported page includes its portfolio as a table, and `data/public/portfolio.csv` lists every portfolio row across all firms. It does not perform live web research or replace factual review.

## Updating and exporting

```sh
uv run python tools/export_public.py
uv run fundraising-buddy validate-public
```

When removing records, inspect any stale derived pages and move them to trash; the validator flags them until removed. Do not import a whole private wiki or sanitize arbitrary pages by deleting only known private headings.

The reusable legacy extraction tool is `tools/import_public.py`. It accepts an explicit source directory and repeatable `--exclude-term` arguments for private identifiers. It reads legacy firm frontmatter and public-research caches, reconstructs allowed fields, and writes rejected-item diagnostics only to ignored `tmp/`. It does not need to be run by ordinary users and does not connect to email.

## Attribution

Every record retains public reference URLs. The distributed catalog contains selected factual values and our generated structure, not scraped pages, copied biographies, or long excerpts. MIT covers the project's code, documentation, and original compilation; third-party material at linked sources retains its own terms.
