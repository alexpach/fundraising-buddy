# /// script
# requires-python = ">=3.11"
# dependencies = ["typesafe-sdk>=0.7,<1"]
# ///
"""Score public firm profile completeness (0-100) with TypeSafe's Jev model.

Criteria were designed by Claude (Fable 5.1); Jev only judges each dimension against
the ordered levels below. Weights and composition live here in code, so raw
per-dimension answers (cached under workspace/cache/jev/) can be re-weighted
without re-running inference.

The composite is written to each firm's optional `scores["jev-score"]` in
data/public/catalog.json and surfaces as `jev-score:` frontmatter on the derived
public wiki pages. Other keys under `scores` are never touched.

Usage:
  uv run --script tools/jev_score.py                # score every firm, write catalog
  uv run --script tools/jev_score.py --limit 5      # first N firms only
  uv run --script tools/jev_score.py --dry-run      # print state+questions for one firm, no API call
  uv run --script tools/jev_score.py --self-check   # offline test of composition
Requires TYPESAFE_API_KEY unless --dry-run/--self-check.
"""
from __future__ import annotations

import argparse
import asyncio
import hashlib
import json
import sys
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))
from fundraising_buddy.catalog import load, write_catalog  # noqa: E402

SCORE_KEY = "jev-score"
CACHE = Path("workspace/cache/jev")
MAX_PORTFOLIO = 40  # ponytail: cap state size; count is passed separately so depth is still judged

# (weight, instructions, ordered levels low -> high). Weights sum to 100.
DIMENSIONS = {
    "identity": (10, "How complete is the firm's basic identity (type, headquarters, founding year, legal name)?", [
        "Only a name and website domain are known; no type, headquarters, founding year, or legal name.",
        "Investor type or headquarters is known, but not both.",
        "Investor type and headquarters are both known; founding year or legal name is missing.",
        "Investor type, headquarters (a city, not just a country), founding year, and legal name are all present.",
    ]),
    "mandate": (25, "How well do the recorded stages, sectors, and geographies let a founder screen whether their startup fits this investor?", [
        "No stages, sectors, or geographies are recorded.",
        "Only one of stages, sectors, geographies is recorded, or the values are so generic they would not narrow any search (for example just 'technology').",
        "Two of the three are recorded with usable specificity.",
        "Stages, sectors, and geographies are all recorded and specific enough to judge fit.",
        "All three are recorded, and at least one of check size, leads_rounds, or exclusions is also present, so fit and expected role are clear without further research.",
    ]),
    "capital": (15, "How complete are the capital facts (assets under management, latest fund, check size)?", [
        "No assets under management, latest fund, or check size information.",
        "One vague capital fact, for example a fund exists but has no size or date.",
        "Fund size or assets under management with a date, or a check size range.",
        "Assets under management or latest fund size with a date, plus a check size range.",
    ]),
    "thesis": (10, "How informative is the recorded thesis quote?", [
        "No thesis statement.",
        "A thesis statement that is generic marketing language and could describe most investors.",
        "A thesis statement specific enough to tell what the firm does and does not back.",
    ]),
    "portfolio": (15, "How deep is the recorded portfolio (see `portfolio` and `portfolio_count`)?", [
        "No portfolio companies listed.",
        "Fewer than five companies, names only.",
        "Five or more companies, names only.",
        "Five or more companies with sector, round, or date on some entries.",
        "Ten or more companies with sector, round, or date on most entries.",
    ]),
    "people": (10, "How complete is the coverage of the firm's team?", [
        "No people listed.",
        "One or two people, or people without titles.",
        "Three or more people with titles.",
        "Three or more people with titles, and an investment focus recorded for at least one.",
    ]),
    "provenance": (15, "How well sourced and how fresh is the research (see `sources`, `evidence_as_of`, `researched_at`, `today`)?", [
        "The only source is the firm homepage and there is no research date.",
        "A research date or a few sources, but evidence entries lack as-of dates.",
        "Several sources and most evidence entries carry as-of dates.",
        "Several sources including a primary or third-party source (regulatory filing, press release, news), evidence dates mostly within two years of today, research date within one year of today.",
    ]),
}
assert sum(w for w, _, _ in DIMENSIONS.values()) == 100


def state_for(firm: dict, people: list[dict], today: str) -> dict:
    return {
        "today": today,
        "name": firm["name"], "domain": firm["domain"], "record_level": firm["record_level"],
        "researched_at": firm["researched_at"] or None,
        "fields": firm["fields"],
        "evidence_as_of": {k: v["as_of"] or None for k, v in firm["evidence"].items()},
        "sources": firm["sources"],
        "portfolio_count": len(firm["portfolio"]),
        "portfolio": [{k: p[k] for k in ("company", "sector", "round", "date") if p[k]} for p in firm["portfolio"][:MAX_PORTFOLIO]],
        "people": [{k: p[k] for k in ("name", "title", "focus") if p[k]} for p in people if p["firm_id"] == firm["id"]],
    }


def questions():
    from typesafe_sdk import Score
    return {k: Score(instructions=ins, criteria=levels) for k, (_, ins, levels) in DIMENSIONS.items()}


def compose(answers: dict[str, float]) -> int:
    """answers: dimension -> expected score on its own level scale. Returns 0-100."""
    total = sum(w * max(0.0, min(answers[k], len(levels) - 1)) / (len(levels) - 1) for k, (w, _, levels) in DIMENSIONS.items())
    return int(round(total))


def cache_key(state: dict) -> str:
    body = json.dumps({"state": state, "dims": DIMENSIONS}, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(body.encode()).hexdigest()[:16]


async def judge(client, sem, firm_id: str, state: dict) -> dict:
    path = CACHE / f"{firm_id}.json"
    key = cache_key(state)
    if path.exists():
        cached = json.loads(path.read_text())
        if cached.get("key") == key:
            return cached
    async with sem:
        resp = await client.system_one(state=state, questions=questions())
    dims = {k: {"score": a.score, "confidence": a.confidence, "probabilities": a.probabilities}
            for k, a in resp.scores.items()}
    result = {"key": key, "model": resp.model, "dimensions": dims,
              "composite": compose({k: v["score"] for k, v in dims.items()})}
    path.write_text(json.dumps(result, indent=1))
    return result


async def run(limit: int | None, concurrency: int) -> None:
    from typesafe_sdk import AsyncTypeSafeClient
    root = Path.cwd()
    data = load(root)
    today = date.today().isoformat()
    firms = data["firms"][:limit] if limit else data["firms"]
    CACHE.mkdir(parents=True, exist_ok=True)
    sem = asyncio.Semaphore(concurrency)
    failed = []
    async with AsyncTypeSafeClient() as client:
        async def one(f):
            try:
                return f, await judge(client, sem, f["id"], state_for(f, data["people"], today))
            except Exception as e:  # keep going; report at the end
                failed.append((f["id"], f"{type(e).__name__}: {e}"))
                return f, None
        done = 0
        for coro in asyncio.as_completed([one(f) for f in firms]):
            f, result = await coro
            done += 1
            if result:
                f.setdefault("scores", {})[SCORE_KEY] = result["composite"]
            if done % 50 == 0 or done == len(firms):
                print(f"{done}/{len(firms)} scored, {len(failed)} failed", file=sys.stderr, flush=True)
    write_catalog(data, root / "data/public")
    scored = [f["scores"][SCORE_KEY] for f in firms if f.get("scores", {}).get(SCORE_KEY) is not None]
    print(json.dumps({"scored": len(scored), "failed": len(failed),
                      "mean": round(sum(scored) / len(scored), 1) if scored else None,
                      "min": min(scored, default=None), "max": max(scored, default=None)}, indent=2))
    for fid, err in failed[:20]:
        print(f"FAILED {fid}: {err}", file=sys.stderr)
    if failed:
        sys.exit(1)


def self_check() -> None:
    assert compose({k: 0 for k in DIMENSIONS}) == 0
    assert compose({k: len(levels) - 1 for k, (_, _, levels) in DIMENSIONS.items()}) == 100
    half = compose({k: (len(levels) - 1) / 2 for k, (_, _, levels) in DIMENSIONS.items()})
    assert half == 50, half
    assert compose({k: 99 for k in DIMENSIONS}) == 100  # clamps out-of-range
    firm = {"id": "x.vc", "name": "X", "domain": "x.vc", "record_level": "sourced", "researched_at": "2026-09-01",
            "fields": {"hq": "Paris"}, "evidence": {"hq": {"url": "https://x.vc", "as_of": ""}}, "sources": ["https://x.vc"],
            "portfolio": [{"company": "A", "sector": "", "round": "seed", "date": "", "url": "https://x.vc", "as_of": ""}]}
    s = state_for(firm, [{"firm_id": "x.vc", "name": "P", "title": "Partner", "focus": ""}], "2026-09-22")
    assert s["evidence_as_of"] == {"hq": None} and s["portfolio"] == [{"company": "A", "round": "seed"}]
    assert s["people"] == [{"name": "P", "title": "Partner"}]
    assert cache_key(s) == cache_key(json.loads(json.dumps(s)))
    print("self-check ok")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--limit", type=int)
    ap.add_argument("--concurrency", type=int, default=8)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--self-check", action="store_true")
    args = ap.parse_args()
    if args.self_check:
        return self_check()
    if args.dry_run:
        data = load(Path.cwd())
        firm = next((f for f in data["firms"] if f["record_level"] == "sourced"), data["firms"][0])
        print(json.dumps({"state": state_for(firm, data["people"], date.today().isoformat()),
                          "questions": {k: {"type": "score", "instructions": i, "criteria": lv}
                                        for k, (_, i, lv) in DIMENSIONS.items()}}, indent=1, ensure_ascii=False))
        return
    asyncio.run(run(args.limit, args.concurrency))


if __name__ == "__main__":
    main()
