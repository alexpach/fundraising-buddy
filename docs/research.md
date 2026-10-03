# Gathering public investor data

Use **Keenable**, **Firecrawl**, and/or **Exa** with your agent. Choose whichever you already have connected; no paid research service is required just to browse the shipped database.

- [Keenable](https://keenable.ai/) provides web search and page retrieval for source discovery.
- [Firecrawl](https://docs.firecrawl.dev/introduction) extracts website content, including pages that require rendering.
- [Exa](https://exa.ai/) is another search and retrieval option for discovering investor sources.

Start with the investor's own website, investment approach, team, and fund announcements. Use reputable reporting or public filings to resolve gaps. Distinguish a firm's website from its actual email domains. Keep provider credentials in your agent's credential store or local environment, never in a skill or dataset.

Use the `fb-research-investor` skill for the workflow. Search for the public firm identity, not your confidential company strategy. Keep caches in `workspace/cache/research/`. Capture URLs, retrieval dates, source dates, and concise supporting excerpts. Do not ship full scraped pages or third-party biographies in the release.

Cache first, research in small batches, and start with a modest page budget. Expand a search for a named uncertainty, not simply to fill every field. Missing data is preferable to an invented answer.

Watch for common errors: a fund's target versus its closed size, parent-company AUM versus venture-arm AUM, portfolio deal size versus check size, and a former employee presented as a current partner. An AI-generated search summary is not primary evidence. The existence of a quote alone does not prove that it supports the proposed claim.

Keep company fit assessments, personal preferences, competitor concerns, and relationship judgments private. Shared research describes the investor; private notes describe what that information means for your round.
