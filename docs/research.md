# Gathering public investor data

Use **Keenable**, **Firecrawl**, and/or **Exa** with your agent. Choose whichever you already have connected; no paid research service is required just to browse the shipped database.

- [Keenable](https://keenable.ai/) provides web search and page retrieval for source discovery.
- [Firecrawl](https://docs.firecrawl.dev/introduction) extracts website content, including pages that require rendering.
- [Exa](https://exa.ai/) is another search and retrieval option for discovering investor sources.

Start with the investor's own website, investment approach, team, and fund announcements. Use reputable reporting or public filings to resolve gaps. Distinguish a firm's website from its actual email domains. Keep provider credentials in your agent's credential store or local environment, never in a skill or dataset.

Use the `fb-research-investor` skill for the workflow. Search for the public firm identity, not your confidential company strategy. Keep caches in `workspace/cache/research/`. Capture URLs, retrieval dates, source dates, and concise supporting excerpts. Do not ship full scraped pages or third-party biographies in the release.

Cache first, research in small batches, and start with a modest page budget. Expand a search for a named uncertainty, not simply to fill every field. Missing data is preferable to an invented answer.

Watch for common errors: a fund's target versus its closed size, parent-company AUM versus venture-arm AUM, portfolio deal size versus check size, and a former employee presented as a current partner. An AI-generated search summary is not primary evidence. The existence of a quote alone does not prove that it supports the proposed claim.

Keep company fit assessments, personal preferences, competitor concerns, and relationship judgments private. Shared research describes the investor; private notes describe what that information means for your round.

## Revalidating existing records

Use `skills/fb-revalidate-funds/SKILL.md` and `tools/revalidate_funds.py` for a source-backed audit. The private queue covers every catalog firm and fingerprints each record so a changed record invalidates an older review. Research and independent review are separate jobs. The queue and source caches live under `workspace/revalidation/`, outside releases.

Record investor strategies separately from legal structure and financing instruments. Preserve the source's actual stage language when it cannot support a specific equity round. A documented lead or co-lead is evidence of leading activity; absence of an example is not evidence of a policy against leading.

Capital observations retain their metric, entity scope, original currency, amount or bounds, qualifier, source date, and source URL. Total assets, cumulative capital raised, loans committed, fund targets, and individual fund closes cannot establish firm-wide AUM. Currency conversion cannot fix a metric or identity mismatch. A lower-bound statement such as “over $40B” does not establish a $50B upper bound.

Mechanical checks verify record freshness, cached quotations, required metadata, and the independent review's report hash. They are not a substitute for reading the evidence. Benchmark coverage must distinguish confirmed corrections from unresolved cases. Identity conflicts remain quarantined for a decision; they must not trigger an automatic merge.

Run a named pilot or resume the full queue with the installed Codex CLI:

```sh
uv run python3 tools/run_revalidation.py --workers 1 --fund-id 3m.com
uv run python3 tools/revalidate_funds.py benchmark --cohort spot-check-22-v1
uv run python3 tools/run_revalidation.py --all --workers 12
uv run python3 tools/revalidate_funds.py status
```

Each job uses GPT-6 Luna in a fresh context. The controller prioritizes independent reviews and limits retries; process failures and unresolved cases remain visible. The full run requires the 22-firm benchmark to pass. Logs, prompts, and process results are private under `workspace/revalidation/runs/`. Create `workspace/revalidation/STOP` to stop dispatching jobs after current jobs finish. To resume, move that marker to trash and rerun the command. A stopped process does not erase completed reports. Accepted research remains pending a separate catalog promotion decision.

## Applying reviewed corrections

With the owner's authorization, run `uv run python3 tools/promote_revalidation.py` to prepare a private change summary, then `uv run python3 tools/promote_revalidation.py --apply` to apply eligible records. The tool rechecks reports and their original catalog fingerprints, saves before/after catalog snapshots and a field diff under `workspace/revalidation/promotion/`, validates the public schema and records promoted queue entries. It holds ambiguous identities and failed reports. Run the public exporter and validate-public afterward, then rebuild the viewer container to serve the new catalog. Reports remain tied to their pre-promotion snapshot; do not rewrite their signed fingerprints.
