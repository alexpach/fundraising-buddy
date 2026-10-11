# Viewer development

The viewer uses React, Tailwind CSS, and copied [Spectrum UI](https://ui.spectrumhq.in)
components. See [component provenance](../frontend/NOTICE.md) and the retained
[Apache 2.0 license](../frontend/SPECTRUM-LICENSE). The surrounding application is MIT licensed.

The prebuilt frontend is included. Run the app in Docker after initializing the workspace:

```sh
mkdir -p workspace/shortlists
docker compose up -d --build viewer
```

Open http://127.0.0.1:10013. Everything is served locally, including scripts and styles.
No runtime CDN or external fonts are used. The UI reads the existing local API and
does not write to the wiki or connect to a mailbox.

To change the frontend, install Node.js 22.12 or newer and run from the project root:

```sh
npm ci
npm run build
```

Edit `frontend/main.tsx`, `frontend/funds.tsx`, `frontend/funds.css`, `frontend/grid.tsx`, `frontend/prospects.tsx`, and `frontend/style.css`. The build replaces
`src/fundraising_buddy/static/app.js` and `style.css`; include rebuilt assets with changes.
`static/index.html` is the small HTML shell. The server only exposes these known assets.
The source release includes the frontend sources and lockfile so it can be rebuilt.

Browser checks automatically build and start an isolated Docker viewer with a synthetic workspace on port 10015 (override with `FB_TEST_PORT` if occupied):

```sh
npx playwright install chromium
npm run test:ui
```

These checks exercise read and shortlist-write APIs. Their private criteria and saved-list fixtures live in the test container's temporary filesystem; they never mount or change the user's workspace. `PW_CHANNEL=chrome npm run test:ui` can use installed Chrome when bundled Chromium is unavailable.

The prospect view reviews current matching and saved snapshots. It displays CLI commands for saving, exporting, and tracking; it has no browser write endpoint.

The Spectrum integration includes navigation cards, data tables, buttons, status badges,
metric cards, and copyable command blocks. Metric cards use actual catalog counts,
with no simulated trends. Captions wrap on mobile, reduced-motion preferences are
respected, and chart styles use the server's CSP nonce. Component origins and local
adaptations are recorded in `frontend/NOTICE.md`.

When running the Docker viewer after frontend changes, rebuild the assets first,
then refresh only the viewer container:

```sh
npm run build
docker compose up -d --build viewer
```

## Funds view and shortlists

The main Funds view replaces the directory and funds grid. Old `#firms-table` links still open Funds. It uses original table code inspired by the visual grouping in [Kobra's grouped table](https://kobra.systems/components/grouped-table), without copying its paid component.

Columns include all recorded firm fields and completeness scores. Users can show, hide, and reorder columns; combine all/any filter rules; choose several sort priorities; and group by a field. Multi-valued fields put a fund in each applicable group. Row selection is deduplicated by firm ID. Rows append in batches of 50 as you scroll, with no pagination controls. The loaded count counts group rows; the result count counts unique funds. Grouping is optional and off by default. Empty values are labeled Unknown, and numeric sorting puts them last.

View settings are retained in browser storage and the hash URL. Text and explicit-currency monetary fields use text matching; numeric comparisons apply to counts, years, and scores, without guessing currencies or converting amounts.

`GET /api/shortlists` returns private lists, revision, and a session token. `POST /api/shortlists` supports create, rename, add, and remove. Each request supplies the current revision and token, and must have the exact local Origin and JSON content type. Storage uses a process lock and atomic file replacement. On a stale revision the UI offers Reload lists before retrying.

The Compose workspace mount remains read-only; only `workspace/shortlists/` is writable. Create this directory before starting Compose. On Linux, set `FB_UID` and `FB_GID` to the host owner's numeric IDs. Browser lists do not create relationship pages or modify existing prospect snapshots.

## Themes and scrolling

The top-right sun/moon button switches day and night mode across all views and dialogs. The initial theme follows the system preference; an explicit choice is saved in browser storage. Both palettes use higher-contrast text and borders.

Funds, shortlists, people, contacts, prospects, pipeline, and wiki tables append rows when an intersection observer sees the end of the rendered list. A keyboard-accessible Load more rows button provides a fallback. Search, filtering, and sorting still operate on the complete fetched dataset, and changing the result set resets the rendered window. Selection survives appended batches. The catalog API is still fetched as one dataset; incremental rendering avoids creating every table row at once.

## Sector taxonomy

Funds use 31 sector categories plus Multi-sector and Unknown, defined in `frontend/sectors.ts`. Exact normalized aliases collapse spelling, case, and punctuation variants. Combined research labels can map to multiple categories. Pill display, sorting, filtering, and grouping all use the same categories. Original catalog labels and profile evidence are unchanged. Broad investment strategies, geographic labels, and ambiguous descriptions do not establish a sector and map to Unknown. New unrecognized aliases also map to Unknown until reviewed.

- AI
- Robotics
- Autonomy
- Hardware & electronics
- Semiconductors & computing
- Enterprise software
- Data & cloud infrastructure
- Developer tools
- Cybersecurity
- Fintech & insurance
- Crypto & Web3
- Healthcare
- Biotech & life sciences
- Climate & environment
- Energy
- Industrial & manufacturing
- Materials & chemicals
- Mobility & transportation
- Logistics & supply chain
- Space & aerospace
- Defense
- Security
- Food & agriculture
- Real estate & construction
- Consumer & retail
- Marketplaces & commerce
- Media
- Entertainment & games
- Education & work
- Telecom & connectivity
- Deep tech
- Multi-sector
- Unknown

## Domains

The Domains navigation entry combines public catalog domains, private pipeline domains, and configured `extra_domains`, deduplicated by normalized hostname. Sources remain visible. Search and source, research, sector, and domain-suffix filters apply before sorting and incremental row rendering. Clicking a domain opens its HTTPS website in a new tab. Export filtered list downloads every matching domain, one per line, in the current sort order, including rows not rendered yet. Domain view settings are retained in the URL. The global header export button was removed.

No popularity score is populated yet. Options evaluated on 2026-10-03:

- [Tranco](https://tranco-list.eu/): downloadable top-million aggregate popularity ranking, averaged over 30 days. A good credential-free baseline, but smaller fund sites may be absent. Download the list once and join locally; do not send private domains to a lookup service. Store list ID/date and rank, sort lower ranks first, and keep unranked domains separate. Do not present the rank as a visit count.
- [Cloudflare Radar](https://developers.cloudflare.com/radar/investigate/domain-ranking-datasets/): DNS-query popularity, with exact ranks for the top 100 and bands for the rest. Useful as a second signal, with limited sorting precision within bands.
- [Similarweb visits API](https://developers.similarweb.com/reference/visits): estimated desktop and mobile visits, supports worldwide monthly totals and requires an API key/subscription. This is the better candidate for traffic-based sorting, subject to testing coverage on smaller investor sites. Cache the estimate with month, source, and retrieval date; missing estimates must remain unknown.

Recommended sequence: use Tranco for an inexpensive initial ranking if partial coverage is acceptable, or evaluate Similarweb coverage before implementing estimated-monthly-visits sorting. Keep rank and visits as separate fields rather than inventing a combined score. Popularity is not a measure of investment fit.
