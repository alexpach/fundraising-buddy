# Spectrum UI

The data table, navigation card, and button in `components/` come from
[Spectrum UI](https://ui.spectrumhq.in), by Arihant Jain and contributors.

Source: https://github.com/arihantcodes/spectrum-ui
Revision: cdb32064c2d9843dfc7f55da71282fa0ffc719d3

Original paths: `components/spectrumui/data-table.tsx`,
`components/spectrumui/nav-list-card.tsx`, `components/ui/button.tsx`.
These files retain the Apache 2.0 license in `SPECTRUM-LICENSE`.
Modifications: relative imports, typography, navigation active-page semantics and metadata, checkbox hit targets, and incremental scroll loading in place of pagination.

The following additional components were installed through the Spectrum UI MCP
registry on 2026-10-02 and retain the same Apache 2.0 attribution:

| Local file | Registry source |
| --- | --- |
| `components/spectrumui/charts/chart-engine.tsx` | https://ui.spectrumhq.in/r/stat-cards.json |
| `components/spectrumui/charts/stat-cards.tsx` | https://ui.spectrumhq.in/r/stat-cards.json |
| `components/spectrumui/status-badge.tsx` | https://ui.spectrumhq.in/r/status-badge.json |
| `components/spectrumui/blocks/ai-assistants/code-block.tsx` | https://ui.spectrumhq.in/r/code-block.json |

Original upstream paths for these components are `app/registry/charts/chart-engine.tsx`,
`app/registry/charts/stat-cards.tsx`, `app/registry/status-badge/statusdemo.tsx`, and
`components/spectrumui/blocks/ai-assistants/code-block.tsx`. Registry-installed files
are recorded by retrieval date, not claimed to share the older revision above.
Modifications: frontend-local placement, nonce-safe chart styles, removal of demo
stat-card series, reusable badge tones, semantic command markup, wrapping, and
accessible clipboard labels, and wrapping metric captions included in accessible labels.
No fabricated historical trends are displayed.

Fundraising Buddy's surrounding application is MIT licensed. Runtime dependency
licenses are retained in `DEPENDENCY-LICENSES.txt`.

The funds explorer in `funds.tsx` and `funds.css` is original application code.
Its visual grouping was informed by the user-provided
[Kobra grouped-table preview](https://kobra.systems/components/grouped-table).
No Kobra source code or licensed component was copied.

The application mark and favicon use the user-supplied Apple SF Symbols `figure.socialdance` SVG. This artwork is separate from the MIT-licensed application code and remains subject to its original terms.
