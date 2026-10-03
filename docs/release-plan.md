# First release plan

## Scope decision

Option B was selected on 2026-10-02: complete the minimum company-specific prospect workflow before the first public release. The release remains a local, agent-assisted application, not an autonomous fundraising or email-sending service.

## Required journey

1. Describe a company and round with structured private criteria: stage, sectors, investment geography, raise size, currency, desired investor check range, lead requirement, excluded firms, and competitors.
2. Generate a reproducible shortlist from the local catalog. Explain every evaluated criterion with its source, date, and evidence quality. Missing information is unknown, not a mismatch. Legacy tags are unverified hints, not sourced conclusions. Completeness scores do not influence investment fit.
3. Review potential conflicts, relevant public contacts, stale evidence, and uncertainties in the viewer.
4. Save named private shortlist snapshots with criteria, selected investors, reasons, contacts, and generation metadata. Preserve older lists and private relationship history.
5. Export a selected shortlist to private CSV or JSON, then explicitly track chosen firms in the private relationship pipeline.

The minimum implementation uses CLI mutations and a read-only web viewer. This keeps the existing localhost security boundary simple. No public hosting, browser write API, mailbox authorization, or outbound outreach is required.

## Acceptance checks

- [x] Private criteria validation rejects malformed, inconsistent, or unsupported values and unsafe paths.
- [x] Matching is deterministic, uses investment geography rather than headquarters, distinguishes currency and units, and never treats the total raise as an investor check.
- [x] Missing, vague, stale, or legacy data is explicitly visible. Recorded sourced matches, potential mismatches, and unknowns have distinct explanations.
- [x] Excluded firms stay out of generated candidates. Competitor portfolio overlaps are review flags, not automatic exclusions.
- [x] Named saved lists can be browsed and exported without regenerating or overwriting an earlier snapshot.
- [x] Tracking from a shortlist is explicit and preserves relationship notes and status.
- [x] All company criteria, saved lists, fit assessments, and exports stay under ignored `workspace/` and never enter public exports or release inputs.
- [x] Backend and browser tests cover the new journey, including empty criteria, legacy data, unknown fields, money parsing, persistence, and privacy boundaries.
- [ ] Owner acceptance review with a real company/round scenario.

Local validation on 2026-10-02: 39 backend tests and 4 browser tests passed. Docker Compose was also built and verified healthy on 127.0.0.1:10013, with a non-root viewer and read-only workspace mount. Browser tests used installed Chrome because bundled Chromium is not installed locally. The isolated test server uses port 10015 by default, configurable with `FB_TEST_PORT`.

## Release engineering

- [x] Include every runtime, build, test, and documented tool dependency in the release allowlist.
- [x] Smoke-test an extracted release, including a clean workspace, backend tests, shortlist save/export/tracking, and frontend rebuilding.
- [x] Configure browser tests in CI with an isolated private fixture and managed test server.
- [x] Handle disconnected browser clients without server tracebacks.
- [x] Refresh README counts and status, reconcile directory provenance documentation, and explain completeness versus fit in the UI.
- [ ] Verify the hosted CI run after the reviewed changes are committed and pushed.
- [ ] Review public data provenance, licenses, the current diff, and repository history before any visibility change.
- [ ] Build and inspect the release candidate, then publish only with explicit owner approval.

## Deferred

Mass live research refreshes, bundled Gmail OAuth, autonomous outreach, advanced action boards, round analytics, semantic/LLM matching, arbitrary currency conversion, and a writable browser UI are not first-release requirements.

## Release gate

Passing local tests does not authorize publication. Final data/history review, repository visibility, tag, release notes, and upload require an explicit owner decision.
