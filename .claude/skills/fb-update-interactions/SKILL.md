---
name: fb-update-interactions
description: Add investor email or meeting interactions to the private wiki with source IDs, dates, next actions, and deduplication. Use after reading a thread or receiving meeting notes.
---

Read `AGENTS.md` and `docs/wiki.md`. Read the firm's current private page before editing. If it is a public directory firm without a private page, run `uv run fundraising-buddy track <firm-id>`.

For a new private-only investor or angel, create a private firm page using the documented schema; do not add their address or relationship to the public catalog. Use a stable unique ID. Match firm identity on known domains plus context, not display name alone. Employment changes and shared corporate domains require review; do not move historical interactions to a new employer.

Append a concise, substantive entry under Interaction Log with the event date and `<!-- source-id: provider:message-or-meeting-id -->`. Search all relevant private pages for this ID first. Summarize new messages in a continuing thread; a thread ID alone must not suppress later replies. Include an outcome, materials mentioned, and who owes the next step. Keep raw transcripts private and link to a private note when necessary. Preserve prior entries.

Update `last_contact` only from an actual interaction, taking the latest event date. Set `next_action` and `next_action_due` only when supported. Use `expected_response` for an explicit expected reply date, clearing it when that reply arrives. An explicit pass can set `status: passed`; a positive tone cannot set `committed`. Distinguish the founder's action from the investor's action. Avoid downgrading a more recent state when processing older messages.

Optional private people pages live under `workspace/wiki/people/`, with `id`, `name`, and `firm_id` frontmatter. Link them from the firm. Personal addresses stay on these pages or private config. Do not guess addresses or publish email-signature facts as public research.

Preserve Relationship Notes and Materials Sent. Use a YAML parser for structural frontmatter edits. Quote dates and wiki-link values. Run rollup and lint, then append a daily log entry. Leave sending or drafting outreach to a separate user request.
