# Getting started

Fundraising Buddy combines a shared investor directory with your own private wiki. Claude Code or Codex does the reading, research, and wiki maintenance. You choose targets, make relationship judgments, and decide what to send.

## 1. Set up the local project

Download a release or clone the repository. Install [uv](https://docs.astral.sh/uv/getting-started/installation/), open a terminal in the project root, and run:

```sh
uv sync --locked
uv run fundraising-buddy init
mkdir -p workspace/shortlists
docker compose up -d --build --wait viewer
```

Open http://127.0.0.1:10013. The app runs in Docker and needs no account or email access. Compose publishes only host loopback. The private workspace is read-only except for `workspace/shortlists/`; private files never enter the image. Rebuild the viewer after application or public-data changes. Stop it with `docker compose down`. On Linux, prefix the Compose command with `FB_UID=$(id -u) FB_GID=$(id -g)` to allow shortlist writes as your user.

Explore the directory and people. Each profile links to its public sources. Directory seeds carry a website reference but need identity checks. Sourced profiles contain retained, dated research, not live verification. Roles and investment mandates can change.

In **Funds**, use Columns to choose and reorder fields, Filters to combine rules, Sort for multiple sort priorities, and Group for collapsible subsections. Click a fund name to open its research. The bookmark button adds an individual fund to a shortlist; checkboxes select several funds for **Add to shortlist**. Create and name lists in the dialog, then browse them from **Shortlists** or the list selector. Rename lists or remove selected members without changing investor research or pipeline status.

## 2. Describe your fundraiser

Edit `workspace/config.json` with your company, round, owner email aliases, and preferred email provider (`none`, `notmuch`, or `gmail`). Leave optional lists empty until needed. Put stage, geography, target check size, competitors, and your fundraising strategy in `workspace/wiki/Home.md`.

Everything under `workspace/` is private and ignored by Git. Back it up privately. A public GitHub fork is not a place to force-add your workspace.

To track a firm, open its public page in the viewer and use the displayed command. For example:

```sh
uv run fundraising-buddy track a16z.com
```

The command creates a private relationship page without changing public research. Repeating it preserves the existing page. Use the actual ID displayed in the directory if the firm has another domain.

## 3. Generate and save prospects

Follow [Company-specific prospects](prospects.md): run `uv run fundraising-buddy prospects-init`, edit the private criteria file, and open **Your prospects**. Review candidate reasons, sources, uncertainties, and contacts. Select investors and run the displayed save command, then Refresh to browse the saved snapshot. Export privately and explicitly track chosen firms. Unknown information is not a mismatch; completeness is not investment fit.

## 4. Connect your agent

Run this once from the project root:

```sh
uv run python tools/install_skills.py
```

It copies the same six canonical skills into `.agents/skills/` for Codex and `.claude/skills/` for Claude Code. Restart your agent session if needed and open this project. Both agents follow `AGENTS.md`; Claude also reads the short `CLAUDE.md` entrypoint. These project locations follow the [Codex skill documentation](https://learn.chatgpt.com/docs/build-skills) and [Claude Code skill documentation](https://code.claude.com/docs/en/skills).

Try these requests:

- "Read my company context and help me shortlist investors."
- "Use fb-research-investor to research this firm's current team and investment focus."
- "Use fb-daily-check to review investor email and update my wiki."
- "Use fb-wiki-maintain to show overdue follow-ups and missing next actions."
- "I added decisions to To Review. Apply them."

You can also invoke `/fb-daily-check` in Claude Code or select `fb-daily-check` in Codex. Skills are agent instructions; the CLI does not run an autonomous LLM or send email.

## 5. Connect email when ready

Follow [Email setup](email.md) for either a local notmuch archive or a Gmail connector available in your agent. Configure and authorize the connector yourself. The project does not ship mailbox credentials, a Gmail OAuth app, or a sending tool.

Start with a small date window. Check the first few matches to confirm the right account and domains, then ask the agent to summarize the interactions. Keep angel addresses only in private config or private people pages.

## 6. Your daily loop

Review email, update firm and people pages, record next actions, regenerate the pipeline, and inspect unresolved items. The daily-check skill composes this routine. After manual edits:

```sh
uv run fundraising-buddy rollup
uv run fundraising-buddy lint
```

Click Refresh in the viewer. To use Obsidian instead, run `uv run python tools/export_obsidian.py` and open the private `workspace/obsidian/` snapshot as a vault. See [Wiki structure](wiki.md) for how to preserve edits and refresh it.

No public hosting is required. The app saves private fund shortlists. Wiki editing remains in Markdown or with your agent. Public research contributions are a separate, reviewed operation.
