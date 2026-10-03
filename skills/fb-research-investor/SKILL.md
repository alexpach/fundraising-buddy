---
name: fb-research-investor
description: Research investor firms and public team members with cited sources, or refresh public research without altering private relationships.
---

Read `AGENTS.md`, `docs/data.md`, and `docs/research.md`. Establish the exact firm identity before researching: similarly named funds, investing arms, and rebrands are not interchangeable.

Recommend Keenable for source discovery, Firecrawl for page extraction, or Exa for search and retrieval. Use the user's available provider. Start from the firm's own site and team page. Reuse relevant cached public sources in `workspace/cache/research/`; keep source URL, retrieval date, and a short supporting excerpt. Do not upload email, company strategy, or private relationship context to research providers.

Work in small batches. Start with a three-page budget per firm and expand only for a concrete unresolved question. Never fill investment amounts or current team roles from memory. Leave unknown fields blank. Keep the source's own date separate from the retrieval date. A fund target is not a closed fund, and fund size is not AUM or check size.

Record public findings in `workspace/wiki/notes/` by default. Updating your own research does not require publishing it. When explicitly contributing to the shared catalog, edit only the documented public schema; each field needs evidence. Omit all individual email addresses, private preferences, inferred relationships, and round-specific fit judgments. Public people records require a public name/role source and a firm ID.

Do not copy source-page prose or evidence dumps into the release. Keep factual values and source links. Do not claim a search snippet or AI-generated summary is a primary-source quote. Keep fit assessments and competitor concerns in private notes.

After a public catalog change run `uv run python tools/export_public.py` and `uv run fundraising-buddy validate-public`. After private wiki changes run rollup and lint, and append a daily log entry. Research must never overwrite private statuses, notes, or interaction history.

## Batch dossier pipeline

For firms worth a decision-grade profile (not a quick field lookup), use the citation-gated batch pipeline. It rests on one rule: **a fact may exist only if a verbatim quote supporting it sits in a cached source file**, which turns fabrication into a mechanically detectable error and lets a cheap model do the research while a strict script polices it.

```
queue -> [dossier-researcher agent, isolated context] -> workspace/cache/vc/<slug>/dossier.json
      -> tools/dossier_check.py         (mechanical gate: schema/citations/coverage/domain/neutrality)
      -> [dossier-validator agent, isolated context, read-only] -> score + defect list
      -> gate pass & no critical defects? yes -> tools/import_public.py promotes it into the public catalog
                                          no  -> fresh researcher with the defect list (max 1 revise round) -> else flag for human review
```

Researcher and validator run as **separate agents with separate contexts** on purpose: the validator must judge what is on disk, not be talked into agreeing by the reasoning that produced it. Both use `.claude/agents/dossier-researcher.md` and `.claude/agents/dossier-validator.md`, both on a cost-efficient model (Sonnet is sufficient for both roles; an expensive validator model is not needed once its sampling budget is tight).

**Run it:**

1. Pick the batch: up to **10 firms per run**. A spend interruption then costs at most 10 firms of progress, not 40.
2. Dispatch one `dossier-researcher` agent per firm (a few in parallel is fine). It writes `workspace/cache/vc/<slug>/dossier.json` and must never touch `workspace/wiki/`.
3. For each finished dossier, dispatch a fresh `dossier-validator` agent. It writes `workspace/cache/vc/<slug>/validation.json`: its own text reply cannot reach the orchestrator once it is running as a subagent, so the report must land on disk.
4. Act on the verdict:
   - `gate: "pass"` and no `critical_defects` -> importable, even if the overall `verdict` is `revise`. Run `uv run python tools/import_public.py .` to promote it (fields named in the validator's defects are dropped automatically; the rest of the firm still lands).
   - gate fail or a critical defect -> dispatch **one** fresh researcher (not the original, so a new context reads the defects without defending its earlier choices) with the defect list appended to the prompt. **Max one revise round**, then stop and flag it for a human.
5. Re-run `uv run python tools/export_public.py` and `uv run fundraising-buddy validate-public` once at the end of the batch, not per firm.

**Cache-first, always.** `tools/dossier_fetch.py` reuses any cache file younger than 14 days at zero cost; only a missing, empty, or forced fetch spends anything. Check `workspace/cache/vc/<slug>/manifest.json` before re-fetching.

**Per-firm budgets** (enforced by `tools/dossier_fetch.py --cap`, guidance beyond that): firecrawl ≤6 credits (≤4 scrapes), Exa ≤4 calls, keenable ≤3 searches plus ≤2 `fetch_page_content` fallbacks at `max_chars: 8000`. The validator samples exactly 6 facts, reads cache files only with `rg -n -C2`, never a whole file, and finishes inside ~12 tool calls.

**Cost lessons from the pipeline this was ported from**, already encoded in the tooling so you don't have to relearn them:

- Reading a fetched page into the model's context and then re-emitting it into the cache (input + output tokens for the same text) was the single largest cost. `dossier_fetch.py scrape` writes straight to the cache script-side instead; keenable search is for finding URLs, not reading pages, and its `fetch_page_content` is a fallback of last resort.
- An unbounded validator can run for hours; a capped one (6 samples, no full-file reads, write the report before composing prose) finishes in minutes with the same rigor.
- Quoting Exa's `summary`/`highlights` fields launders a model's paraphrase into a dossier as if the source said it: only `results[].text` counts as evidence, and `tools/dossier_check.py` enforces this.
- One revise round is enough when the defect list is specific; a second round mostly repeats the first.

A user's own company name (or anything else private) never belongs in `tools/dossier_check.py`'s neutrality gate by default: add it to a `private_terms` list in `workspace/config.json` instead, and set `research_contact` there to a real contact string before running SEC EDGAR lookups, which require one.
