# Wiki structure and maintenance

```text
data/public/
  catalog.json                 canonical shared public records
  investor-domains.txt          derived email-discovery list
  firms.csv, people.csv         derived portable exports
  wiki/firms/, wiki/people/     derived Markdown profiles
workspace/                     private, ignored by Git
  config.json                  company, round, owner aliases, email settings
  wiki/
    Home.md                    context and strategy, user-authored
    Index.md                   generated private firm index
    Pipeline.md                generated pipeline and follow-up dates
    Prospects.md                user-authored shortlist
    To Review.md               unresolved items and recorded decisions
    firms/, people/            private relationship pages
    notes/                     private synthesis and meeting summaries
    logs/YYYY-MM-DD.md         append-only daily activity
  prospects/
    criteria.json              structured private company and round criteria
    lists/<id>.json            immutable named shortlist snapshots
    exports/<id>.csv, .json     private derived exports
  raw/                         private source messages and meeting notes
  cache/                       research and provider caches
  runs/                        review windows and completion checkpoints
```

## Firm pages

Use a stable ID rather than a person's display name as the filename. For a shared firm, the ID is its catalog ID. A private-only investor can use a stable descriptive slug. Keep domain empty for an angel without a verified website; do not use a shared mailbox provider as their domain.

```yaml
---
id: example-fund
name: Example Fund
domain: example.invalid
status: target
last_contact: ""
next_action: ""
next_action_due: ""
expected_response: ""
---
```

Use sections for Relationship Notes, Interaction Log, and Materials Sent. `status` is one of `new`, `target`, `engaged`, `committed`, `passed`, or `paused`. Status changes need an actual interaction or owner decision. Enthusiasm does not mean a commitment. Dates use `YYYY-MM-DD`; quote them in YAML. `next_action_due` is your action date; `expected_response` is when the other side owes a reply. Clear expected response when that reply arrives.

Append interactions chronologically, preserving old entries and stable source markers such as `<!-- source-id: gmail:message-123 -->`. Do not deduplicate an entire thread in a way that drops new replies. A person changing employers does not change the firm associated with their old interactions.

Private people pages use `id`, `name`, and `firm_id` frontmatter, with optional private addresses and notes. Their public counterparts contain only public identity, role, firm association, and sources. Never automatically synchronize private person fields to public data.

## Links and rollups

Private links use vault-root paths, for example `[[firms/example-fund|Example Fund]]`. Public links use `[[public/firms/firm-domain|Firm name]]`. Names are labels, not identity keys. The local viewer resolves these links against its explicit page index. It does not serve arbitrary files.

Index and Pipeline are generated from private firm frontmatter. Edit firm pages, then run `uv run fundraising-buddy rollup`. Keep strategy and narrative on Home and Prospects; generated pages are overwritten. The read-only viewer refreshes from Markdown and uses sanitized rendering without Dataview or executable plugins.

Saved prospect snapshots also have generated, read-only wiki pages at `prospect-lists/<id>`. Link to them from authored pages, for example `[[prospect-lists/seed-list-01|Seed shortlist]]`. These pages are rendered from the private JSON snapshots and included in Obsidian exports, not stored as authored Markdown. Do not create a colliding page under `workspace/wiki/prospect-lists/`.

`uv run fundraising-buddy lint` checks YAML, required firm fields, statuses, dates, and wiki links. The maintenance skill additionally reviews overdue actions, missing next steps, and stale relationships. These are prompts for judgment, not automatic passes.

## Obsidian

Create a self-contained, private Obsidian vault using:

```sh
uv run python tools/export_obsidian.py
```

Open `workspace/obsidian/` in Obsidian. It contains both the public profiles under `public/` and private wiki pages, so links resolve without Dataview. This is a generated browsing snapshot: make authoritative edits in `workspace/wiki/`, then regenerate. The exporter refuses to overwrite snapshot files that you have edited, so it cannot silently discard Obsidian edits. Move those edits back to the source wiki before refreshing. Never publish this vault.
