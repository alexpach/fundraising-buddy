---
name: fb-wiki-maintain
description: Validate the fundraising wiki, regenerate the pipeline and index, and review stale follow-ups or missing next actions. Use for weekly maintenance or wiki cleanup.
---

Read `AGENTS.md` and `docs/wiki.md`. Run `uv run fundraising-buddy lint` before making changes, then inspect affected pages.

The command checks YAML, required firm fields, statuses, dates, and wiki links. Separately inspect engaged pages for missing next actions, overdue `next_action_due` or `expected_response`, and long gaps since `last_contact`. These are review prompts, not reasons to infer a pass or send a follow-up. Report the relevant dates and let the user decide.

Repair clear structural problems. Place uncertain identity corrections, merges, employment changes, and relationship decisions in To Review. Do not delete a person merely because they lack an inbound link; they may be intentionally retained.

Run `uv run fundraising-buddy rollup` to regenerate Index and Pipeline from firm pages. Home, Prospects, To Review, relationship notes, and logs are authored content and must be preserved. The viewer reads current files on Refresh.

Rerun lint and append a brief daily log entry after substantive changes. Report remaining issues without changing the email checkpoint; maintenance does not mean email was reviewed.
