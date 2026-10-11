# Fund revalidation report schema, version 1

Write one UTF-8 JSON file to `workspace/revalidation/reports/<fund-id>.json`. The fund ID must exactly match the catalog. `fingerprint` is the SHA-256 of canonical JSON for that fund's current catalog object (UTF-8, sorted keys, compact separators). The tool prints it with `revalidate_funds.py fingerprint <fund-id>`.

```json
{
  "schema_version": 1,
  "fund_id": "example.com",
  "fingerprint": "64 lowercase hex characters",
  "worker": "stable-worker-id",
  "checked_at": "2026-10-03",
  "identity": {
    "resolved_name": "Example Capital",
    "resolved_domain": "example.com",
    "relationship": "same_entity | rebrand | affiliate | distinct | unresolved",
    "confidence": "high | medium | low",
    "evidence": [{"url": "https://example.com/about", "as_of": "2026-10", "cache": "workspace/revalidation/cache/example.com/about.md", "quote": "Verbatim text from the cached page.", "supports": ["Example Capital"]}]
  },
  "classification": {
    "type": ["venture capital", "venture debt"],
    "strategies": ["growth equity"],
    "structure": ["business development company"],
    "instruments": ["equity", "debt"],
    "evidence": [{"url": "https://example.com/strategy", "as_of": "2026-10", "cache": "workspace/revalidation/cache/example.com/strategy.md", "quote": "Verbatim text from the cached page.", "supports": ["venture capital", "growth equity", "business development company", "equity", "debt"]}]
  },
  "stages": {"value": ["seed", "series A"], "evidence": [{"url": "https://example.com/strategy", "as_of": "2026-10", "cache": "workspace/revalidation/cache/example.com/strategy.md", "quote": "Verbatim text supporting the listed stages.", "supports": ["seed", "series A"]}]},
  "lead": {"value": "yes | no | maybe | unknown", "meaning": "sole | co-lead | either | preference | observed_activity | unknown", "basis": "explicit_policy | observed_activity | no_support | unknown", "evidence": [{"url": "https://example.com/news", "as_of": "2026-10", "cache": "workspace/revalidation/cache/example.com/news.md", "quote": "Verbatim text supporting lead activity or preference."}]},
  "capital": [
    {"metric": "aum | fund_size | capital_raised | dry_powder | check_size | total_assets | other", "scope": "firm | vehicle | fund | strategy | unknown", "currency": "USD", "amount": 11000000000, "lower_bound": null, "upper_bound": null, "qualifier": "approximately | over | under | target | closed | cumulative | reported | exact | unknown", "as_of": "2026-03", "evidence": {"url": "https://example.com/news", "as_of": "2026-03", "cache": "workspace/revalidation/cache/example.com/news.md", "quote": "Verbatim text from the cached page."}}
  ],
  "sectors": [
    {"value": "Healthcare", "evidence": [{"url": "https://example.com/strategy", "as_of": "2026-10", "cache": "workspace/revalidation/cache/example.com/strategy.md", "quote": "Verbatim text from the cached page."}]}
  ],
  "unknowns": ["Current firm AUM was not established."],
  "findings": [
    {"field": "lead", "code": "lead.co_lead_support", "severity": "high", "disposition": "corrected | supported | unknown | conflict | unresolved", "proposed_value": "yes", "evidence": []}
  ],
  "independent_review": {
    "reviewer": "different-stable-worker-id",
    "checked_at": "2026-10-03",
    "report_sha256": "SHA-256 of this report with independent_review omitted",
    "disposition": "accepted | revise | unresolved",
    "findings_reviewed": [{"code": "lead.co_lead_support", "disposition": "accepted"}],
    "notes": ""
  }
}
```

Evidence quotes must be direct, contiguous source text and must occur in the named cache file. Each cache path must be a relative path under `workspace/revalidation/cache/<fund-id>/`; absolute paths, `..`, symlinks that escape the cache root, missing files, and URLs that do not use HTTP(S) are rejected. `as_of` is the source's publication/effective date when known, not the fetch date. Use an empty string only when the page gives no date, and record a retrieval date separately in the cache manifest. An empty source date is recorded as a warning, not treated as a fabricated date. Each stage and classification evidence object must include a `supports` list naming the exact list items it proves. Each sector item has its own evidence list and the evidence object must include `supports` with that sector label. Do not cite one generic quote for an unsupported full list.

Capital values are not comparable unless metric, scope, currency, date, and bound/qualifier semantics are explicit. A valid quote that says cumulative fundraising does not support an AUM value. Amounts must be numeric and non-negative; currency is an ISO-style three-letter code or `unknown`. Never convert a fund target, a closed fund, cumulative capital raised, a manager's AUM, or a vehicle's assets into another metric. Distinguish the manager, investment strategy, vehicle, and individual fund.

For a capital observation, `as_of` is the financial figure's effective date. If a March article reports December assets, use the December date in both the capital observation and its evidence `as_of`; keep the article date separately as optional evidence `published_at`. Retrieval dates remain in the manifest. Do not replace a missing effective date with publication or retrieval date. For `over` or `under`, populate the corresponding bound and preserve the qualifier. `total_assets` is a separate supported metric; an `other` observation must retain the source's actual metric description in the finding or an optional `metric_label`.

The report fingerprint must match the current catalog record. Independent review must use a different worker ID and bind to the exact report hash. The checker only verifies shape, local quote presence, dates/paths, and mechanical consistency. A passing report is not proof that interpretation is true. Ambiguous identity or contradictory evidence remains unresolved for a person.
