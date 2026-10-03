# Company-specific investor prospects

The prospect workflow compares private company criteria with the recorded public catalog, saves reviewable shortlist snapshots, and hands explicitly chosen firms to relationship tracking. It is local and deterministic: no model, network call, mailbox access, or outreach is involved.

This prospect-snapshot workflow remains read-only in the browser. The separate **Funds** and **Shortlists** views support editable named lists saved directly to `workspace/shortlists/`; these contain fund IDs, not evidence snapshots. Use the CLI or your agent to edit criteria, save lists, export, and track firms. The viewer can select candidates and display the exact save command; selecting a checkbox alone writes nothing.

## 1. Set private criteria

After normal workspace initialization:

```sh
uv run fundraising-buddy prospects-init
```

Edit `workspace/prospects/criteria.json`. Initialization preserves an existing file.

```json
{
  "company": "Example Robotics",
  "round": "Seed round",
  "stage": "seed",
  "sectors": ["robotics", "hardware"],
  "geographies": ["us"],
  "raise_size": 5000000,
  "currency": "USD",
  "check_size_min": 500000,
  "check_size_max": 2000000,
  "lead_required": true,
  "excluded_firm_ids": [],
  "competitors": []
}
```

Amounts are numbers in the stated currency, not strings such as `5M`. `null` means unspecified. Raise size is context only: it is never treated as the amount an individual investor must contribute.

Supported stages: `pre-seed`, `seed`, `series-a`, `series-b`, `series-c`, `growth`, and `late-stage`. Supported currencies: USD, EUR, GBP, CHF, CAD, AUD, and JPY. Lead requirement is a boolean. Sectors and investment geographies are lists, interpreted as alternatives: any recorded overlap supports that dimension. Exclusions use exact catalog firm IDs. Competitors use company names from the portfolio; matching is case-insensitive and whitespace/hyphen normalized, not semantic identity resolution.

Choose investment geographies, not the investor's headquarters. A Germany target can overlap a recorded Europe mandate; the reverse does not establish Europe-wide support. Only a small explicit set of European countries is recognized for this convenience. Other regional hierarchies, stage ranges in prose, and sector ontologies are not inferred.

At least one matching criterion is required. A company name or raise size alone cannot determine investor fit.

## 2. Review matching results

Open **Your prospects** in the viewer, or run:

```sh
uv run fundraising-buddy prospects-preview --limit 20
```

The matcher evaluates stage (25), sectors (30), investment geography (20), investor check range (15), and lead requirement (10). Only requested dimensions enter the denominator. A dimension supported by recorded sourced facts earns its weight; missing or unverified data earns no weight. The displayed supported-fit score is weighted evidence coverage, not a probability, investor quality score, or funding recommendation. A zero can simply mean no supporting research.

Results are ordered by supported fit, then fewer recorded potential mismatches, then more unverified hints, then stable firm ID. Profile completeness scores, company name, total raise, and private relationship sentiment do not affect ranking. Candidates with uncertainties or conflicts remain visible unless explicitly excluded by the owner.

Every evaluated dimension is labeled:

- **match:** a recorded sourced fact supports overlap, not a claim about current investment appetite.
- **conflict:** no explicit overlap with recorded sourced data. This is a potential mismatch for review, not proof that the investor cannot invest.
- **unknown:** missing, broad, ambiguous, or incomparable information.
- **unverified:** legacy directory tags suggest a match or conflict, but have not established a sourced conclusion.

Expand a candidate to see source links, field evidence dates, stale or unknown date warnings, mandate exclusions requiring human interpretation, and public contacts. Contact focus overlap is only a textual hint; verify current employment and relevance. Competitor portfolio overlaps are review flags, never automatic exclusions. The absence of a flag does not establish the absence of conflicts.

Money parsing intentionally accepts only a single explicit-currency amount such as `USD 500K`, `EUR 2M`, or `US$ 1M`. Bare amounts, bare `$`, prose ranges, different currencies, missing bounds, and inconsistent ranges stay unknown. No exchange rates are used. This means many legacy check-size tags cannot establish comparable support.

## 3. Save a named shortlist

Select reviewed candidates in the viewer and run its generated terminal command, or choose IDs directly:

```sh
uv run fundraising-buddy prospects-save seed-list-01 --name "Seed shortlist" --firm a16z.com
```

Repeat `--firm` for each chosen investor. Without explicit firms, `--limit` saves the first N ranked candidates (default 20); those are a research starting point, not automatically approved outreach targets.

Snapshots live in `workspace/prospects/lists/<id>.json` and contain criteria, names, public contacts, source links, fit reasons, uncertainties, and generation metadata. Reusing an ID refuses to overwrite the previous snapshot. Changing criteria or updating the catalog does not rewrite saved lists; save a new ID after reviewing changes.

```sh
uv run fundraising-buddy prospects-lists
```

Click Refresh, then choose a saved list in **Your prospects**. Its linked wiki snapshot is also available in **Your wiki** and in the private Obsidian export. You can link to `[[prospect-lists/seed-list-01|Seed shortlist]]` from your authored `Prospects.md`. That authored page is never replaced by this workflow. `prospect-lists/` is reserved for generated snapshot pages; do not create competing pages under `workspace/wiki/prospect-lists/`.

## 4. Export and track explicitly

```sh
uv run fundraising-buddy prospects-export seed-list-01 --format csv
uv run fundraising-buddy prospects-export seed-list-01 --format json
uv run fundraising-buddy prospects-track seed-list-01 --firm a16z.com
uv run fundraising-buddy rollup
uv run fundraising-buddy lint
```

Exports stay in `workspace/prospects/exports/`. They contain private company-specific assessments, even when individual investor facts are public. Do not attach them to a public contribution or release. Re-exporting a snapshot refreshes its derived export, not its saved content.

Tracking accepts only explicitly selected firms belonging to the saved list and still present in the current catalog. It creates a private target page when needed and preserves an existing relationship page, including status, notes, and history. It never sends a message, infers a commitment, or changes public research.
