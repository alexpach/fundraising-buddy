# Email integration

The domain list is a discovery filter. It narrows email review to likely investor conversations without publishing anyone's individual address. A corporate investor domain can also send customer, vendor, newsletter, and automated traffic; classify the content before creating an interaction.

## Shared contract

`data/public/investor-domains.txt` contains one firm domain per line. `workspace/config.json` adds your private `extra_domains` and `private_angel_emails`. Never add a shared provider such as gmail.com as an investor domain. Add an angel's exact address privately instead.

Use explicit UTC timestamps for a fixed `[since, until)` window. Every generated query batch must be executed. Follow every result-page token, fetch the messages, and deduplicate by provider message ID across batches. Match parsed From/To/Cc/Bcc addresses by exact domain or exact private angel address. Do not treat `firm.com.attacker.invalid` as `firm.com`. This implementation does not automatically include subdomains; add known email domains explicitly.

Keep incoming and outgoing messages, excluding drafts. Verify sent status when an archive has ambiguous draft snapshots. A thread can gain new replies, so deduplication must use message IDs, not only thread IDs. Keep timestamps and provenance; store messages only under `workspace/raw/`.

The daily workflow uses a one-day overlap to catch delayed indexing. Periodically review a larger window for late imports. A failed provider call, incomplete pagination, or truncated results means partial completion, not an empty mailbox. Do not advance the checkpoint.

## Local archive with notmuch

Use an existing Maildir archive indexed by [notmuch](https://notmuchmail.org/). Its normal account and indexing setup stays outside this repository. Set `email_provider` to `notmuch` and populate `owner_emails` with your own aliases in private config. `notmuch` must be on PATH and able to read the intended index.

Inspect the generated queries first:

```sh
uv run fundraising-buddy email-query --provider notmuch --since 2026-09-01T00:00:00Z --until 2026-09-02T00:00:00Z
```

Then extract matching messages:

```sh
uv run fundraising-buddy email-import --since 2026-09-01T00:00:00Z --until 2026-09-02T00:00:00Z
```

This executes bounded searches and writes `workspace/raw/email-review.json` only after every query succeeds. It uses notmuch's JSON output, deduplicates IDs, filters exact header domains and timestamps, and extracts plain-text body parts. It does not modify the mailbox, create a completed daily checkpoint, infer sentiment, or update the wiki automatically. The daily-check agent reviews this private file next.

The adapter uses `from:` and `to:` search terms and epoch date ranges as documented in [notmuch search terms](https://notmuchmail.org/manpages/notmuch-search-terms-7/). `to:` also covers Cc/Bcc recipients. Archives without plain-text MIME parts need the agent to read HTML safely through the provider; do not count an empty extraction as reviewed content.

## Gmail connector

Connect an authenticated Gmail tool in Claude Code or Codex that can search messages and retrieve full message content. The connector must support pagination or an equivalent complete-result mechanism. Availability and authentication steps depend on your agent and chosen connector; there is no hardcoded connector name or bundled OAuth client here.

1. Authorize access to the intended account through the connector's own setup. Prefer read-only mail access. Keep tokens and credentials outside public files.
2. Set `email_provider` to `gmail` and record your owner aliases privately.
3. Generate Gmail query batches with the same CLI command, using `--provider gmail`.
4. Ask your agent to execute all batches with the Gmail connector, retrieve each matching message, and apply the shared contract above. Save a private normalized review file if useful.
5. Verify sent/draft labels and exact header addresses. Classify relevance, update the private wiki, and only then checkpoint.

The queries include both directions and Cc, exclude drafts, and use epoch seconds. Gmail date strings otherwise use PST, as described in [Google's filtering guide](https://developers.google.com/workspace/gmail/api/guides/filtering). For an API-backed connector, `messages.list` returns IDs; follow `nextPageToken` and call `messages.get` for content. See [Google's message listing guide](https://developers.google.com/workspace/gmail/api/guides/list-messages). The `gmail.metadata` scope does not support the `q` search parameter; see the [API reference](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/list).

If your connector cannot accept these queries or expose all pages, stop and document that limitation. Do not silently replace an investor filter with an unrestricted inbox dump. A domain-filtered search will miss new investors outside the list; review user-provided introductions separately.

## Completion

The agent records the reviewed window and completeness assertions in `workspace/runs/pending.json`:

```json
{
  "since": "2026-09-01T00:00:00Z",
  "until": "2026-09-02T00:00:00Z",
  "all_pages_read": true,
  "review_complete": true
}
```

Then `uv run fundraising-buddy checkpoint` validates the wiki, rebuilds rollups, and records the window end in the private daily log and checkpoint file. The tool cannot prove that an external connector was fully read; the agent must make those assertions truthfully. Never set them on partial work.
