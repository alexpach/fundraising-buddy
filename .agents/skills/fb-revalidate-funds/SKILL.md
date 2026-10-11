---
name: fb-revalidate-funds
description: Revalidate public fund records with cached source evidence, resumable worker claims, and independent review without changing the catalog.
---

# Revalidate fund records

Use this workflow when reviewing whether public fund records are accurate or when running the spot-check benchmark. Read `AGENTS.md`, `docs/data.md`, `docs/research.md`, and `skills/fb-revalidate-funds/references/report-schema.md` first. This work produces private reports under `workspace/revalidation/`. It never edits `data/public/catalog.json`, `workspace/wiki/`, shortlists, or interaction history. Do not publish report contents.

## Queue and claims

From the project root:

```sh
uv run python3 tools/revalidate_funds.py init
uv run python3 tools/revalidate_funds.py status
uv run python3 tools/revalidate_funds.py claim luna-worker-01 --role research --limit 1 --fund-id example.com
uv run python3 tools/revalidate_funds.py fingerprint example.com
```

`init` queues all current catalog firms and refreshes changed fingerprints as stale. Each report is tied to the exact current fund object. Claims are idempotent per worker and expire after six hours. At most twelve worker IDs can hold active claims at once. Use one fund per worker claim for the pilot. After writing a report, release the research claim so it enters independent review:

```sh
uv run python3 tools/revalidate_funds.py release luna-worker-01 example.com
```

A separate worker claims review work with `--role review`. The reviewer must inspect cached evidence and the report independently, record a different worker ID, record `{code, disposition: "accepted"}` for every accepted finding, and bind the attestation to `report_sha256`. Compute the hash as SHA-256 over canonical JSON (UTF-8, sorted keys, compact separators) after removing `independent_review` from the report. Release the review claim only after writing the attestation. A report enters `human_review_pending` only if the mechanical gate passes and the independent review is accepted. Otherwise it returns to revision or, after retries, `blocked`.

## Worker instructions

Use GPT-6 Luna for each research and validation worker. Use three workers for a pilot and up to twelve workers for a full run. Research and validation are separate assignments with separate worker IDs and context. A validator must not rely on the researcher's narrative; inspect the current report, cited cache files, identity, metrics, and exact quotations. Do not promote a report to accepted merely because its JSON is valid.

Independently retrieve the primary pages supporting identity, capital and leading activity, normally up to three pages shared across claims, to compare the cached excerpts with the originals. State any access limitations. An accurate report may retain unknown values and unresolved identity relationships. Accepting that report acknowledges its accuracy, not resolution of those gaps or permission to merge entities. Use `revise` for report defects, not merely missing public information.

For each claimed firm:

1. Resolve the exact legal/operating entity and domain. Treat similarly named managers, affiliates, funds, and rebrands as distinct until sourced evidence resolves their relationship.
2. Save directly retrieved public source text under `workspace/revalidation/cache/<fund-id>/` and record source URL, retrieval date, and cache path in a manifest. Cache quotes must be contiguous text from the saved page, not an AI summary or search snippet.
3. Distinguish manager strategy, legal structure, instrument, and actual round activity. Venture debt does not become equity just because it finances a company at a named stage. Record co-lead separately; co-leading is affirmative lead activity. Mark unknown when evidence is absent. A negative lead value requires explicit source evidence of a no-lead policy.
4. For every capital claim, record the metric, scope, numeric amount or bounds, currency, qualifier, source date, and evidence. AUM, individual fund size, cumulative capital raised, target size, and dry powder are separate measures. Never infer one from another. A genuinely undated page uses an empty source `as_of` and a separate retrieval date in the manifest.
5. Map source evidence to every stage and classification item with `supports`. Give each sector its own evidence list. Leave unsupported items out and state consequential gaps in `unknowns`.
6. Write the report at `workspace/revalidation/reports/<fund-id>.json` according to the schema reference. Add field-specific findings with a code, severity, disposition, proposed value for corrections, and supporting evidence. Use `unresolved` when identity or interpretation needs a human decision.
7. Run `uv run python3 tools/revalidate_funds.py check <fund-id>`. Fix mechanical failures. A pass only means the report is structurally reviewable, not semantically true. Undated and old sources appear as warnings.

## Benchmark

The `spot-check-22-v1` benchmark combines issue classes from the owner's initial twelve-firm review and a ten-firm follow-up. `spot-check-12-v1` remains available for the initial pilot. Expected results are test assertions, never evidence for a report. A case is covered only when each expected field and issue code has an allowed disposition, required typed assertions, direct cached evidence, and an accepted independent review tied to the exact report hash. Expected entity conflicts count as detected conflicts and remain out of the correction count. Other unresolved cases remain uncovered. The summary separates corrected, supported, and detected conflict cases.

```sh
uv run python3 tools/revalidate_funds.py benchmark --cohort spot-check-22-v1
```

The checker blocks unsafe paths, missing/invalid citations, quote mismatches, missing item support, ambiguous capital semantics, negative inference, catalog fingerprint drift, and self-review. It does not verify that a source is authoritative or that a semantic interpretation is true. Those require independent human/model review and, for unresolved identity, a person.

## Resumable worker runner

`uv run python3 tools/run_revalidation.py --workers 12 --all` runs the full queue after the 22-firm benchmark passes. For a pilot, use repeated `--fund-id` arguments instead of `--all`. Each job launches a fresh GPT-6 Luna context, saves a private event log, and releases its claim through the checker. Do not claim or release jobs yourself when the controller already owns those operations. Inspect status with `tools/revalidate_funds.py status`. Create `workspace/revalidation/STOP` to stop new jobs after current jobs finish. Move the marker to trash before resuming.
