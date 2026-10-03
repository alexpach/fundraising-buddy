# /// script
# requires-python = ">=3.11"
# dependencies = ["typesafe-sdk>=0.7,<1"]
# ///
"""Judge whether each firm leads rounds (yes / no / maybe / unknown) with TypeSafe's Jev model.

Jev answers one Choice question per firm from the firm's recorded profile only (fields,
portfolio, people), never from outside knowledge. The label is written to the firm's
`leads_rounds` field. Raw answers (label, probabilities) are cached privately under
workspace/cache/jev-leads/ keyed by a hash of the judged state, so reruns only pay for
firms whose profile changed.

Provenance: a leads_rounds value that did not come from an earlier run of this tool is a
source-stated preference. It is shown to Jev as `stated_lead_preference` (strong evidence).
The raw statement and its evidence entry are saved in the private cache (`stated_value`,
`stated_evidence`) so later runs keep seeing them after the field holds Jev's label. Jev's own
earlier answer is never fed back in. A label whose top probability is below MIN_P becomes "unknown".

Usage:
  uv run --script tools/jev_leads.py              # judge every firm, write catalog
  uv run --script tools/jev_leads.py --limit 5    # first N firms only
  uv run --script tools/jev_leads.py --dry-run    # print one state + question, no API call
  uv run --script tools/jev_leads.py --self-check # offline test
Requires TYPESAFE_API_KEY unless --dry-run/--self-check.
"""
from __future__ import annotations

import argparse
import asyncio
import hashlib
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from jev_score import MAX_PORTFOLIO, state_for  # noqa: E402,F401  (also puts src/ on sys.path)
from fundraising_buddy.catalog import LEADS_OPTIONS, load, write_catalog  # noqa: E402

CACHE = Path("workspace/cache/jev-leads")
MIN_P = 0.5  # ponytail: one global confidence floor; tune from the cached probabilities if too many unknowns

INSTRUCTIONS = (
    "Does this investor lead investment rounds, meaning it sets the terms and typically takes the largest "
    "allocation, as opposed to only following other investors? Judge ONLY from the recorded facts in the state; "
    "do not use outside knowledge of the firm. If `stated_lead_preference` is present, treat it as a direct "
    "statement. Otherwise rely only on clear signals such as explicit lead or follow statements, or portfolio "
    "rounds described as led by this firm. Check size or fund size alone is not enough."
)
CRITERIA = {
    "yes": "The recorded facts state or clearly show that the firm usually leads rounds.",
    "no": "The recorded facts state that the firm does not lead, or invests only as a follower or co-investor.",
    "maybe": "Signals conflict, or suggest the firm sometimes leads or co-leads (for example only some stages or sizes).",
    "unknown": "The recorded facts do not say whether the firm leads rounds.",
}
assert set(CRITERIA) == LEADS_OPTIONS


def stated_from(firm: dict, prev: dict | None) -> tuple[object, dict | None]:
    """The source-stated lead preference (and its evidence) for a firm, or (None, None)."""
    prev = prev or {}
    existing = firm["fields"].get("leads_rounds")
    if existing in (None, "") or existing == prev.get("label"):  # empty, or our own earlier answer
        return prev.get("stated_value"), prev.get("stated_evidence")
    return existing, firm["evidence"].get("leads_rounds")  # a new source statement (import or edit)


def judged_state(firm: dict, people: list[dict], prev: dict | None) -> dict:
    state = state_for(firm, people, "")
    state.pop("today", None)  # keep the cache key stable across days
    fields = dict(state["fields"])
    fields.pop("leads_rounds", None)
    state["fields"] = fields
    state["evidence_as_of"].pop("leads_rounds", None)
    stated, _ = stated_from(firm, prev)
    if stated is not None:
        state["stated_lead_preference"] = stated
    return state


def cache_key(state: dict) -> str:
    body = json.dumps({"state": state, "q": [INSTRUCTIONS, CRITERIA, MIN_P]}, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(body.encode()).hexdigest()[:16]


def label_from(choice: str, probabilities: dict) -> str:
    p = probabilities.get(choice)
    return choice if choice in LEADS_OPTIONS and (p is None or p >= MIN_P) else "unknown"


def previous(firm_id: str) -> dict | None:
    path = CACHE / f"{firm_id}.json"
    return json.loads(path.read_text()) if path.exists() else None


async def judge(client, sem, firm: dict, people: list[dict]) -> dict:
    from typesafe_sdk import Choice
    prev = previous(firm["id"])
    state = judged_state(firm, people, prev)
    stated, stated_evidence = stated_from(firm, prev)
    key = cache_key(state)
    path = CACHE / f"{firm['id']}.json"
    if prev and prev.get("key") == key:
        return {**prev, "stated_value": stated, "stated_evidence": stated_evidence}
    async with sem:
        resp = await client.system_one(state=state, questions={"leads": Choice(instructions=INSTRUCTIONS, criteria=CRITERIA)})
    ans = resp.choices["leads"]
    probs = dict(ans.probabilities)
    result = {"key": key, "model": resp.model, "choice": ans.choice, "confidence": ans.confidence,
              "probabilities": probs, "label": label_from(ans.choice, probs),
              "stated_value": stated, "stated_evidence": stated_evidence}
    path.write_text(json.dumps(result, indent=1))
    return result


def apply(firm: dict, result: dict) -> None:
    """Write the label. Keep a source-stated value's evidence; otherwise point at the firm website."""
    ev = result.get("stated_evidence") if result.get("stated_value") is not None else None
    firm["fields"]["leads_rounds"] = result["label"]
    firm["evidence"]["leads_rounds"] = ev or {"url": firm["website"], "as_of": ""}


async def run(limit: int | None, concurrency: int) -> None:
    from typesafe_sdk import AsyncTypeSafeClient
    root = Path.cwd()
    data = load(root)
    firms = data["firms"][:limit] if limit else data["firms"]
    CACHE.mkdir(parents=True, exist_ok=True)
    sem = asyncio.Semaphore(concurrency)
    failed, counts = [], {k: 0 for k in sorted(LEADS_OPTIONS)}
    async with AsyncTypeSafeClient() as client:
        async def one(f):
            try:
                return f, await judge(client, sem, f, data["people"])
            except Exception as e:  # keep going; report at the end
                failed.append((f["id"], f"{type(e).__name__}: {e}"))
                return f, None
        done = 0
        for coro in asyncio.as_completed([one(f) for f in firms]):
            f, result = await coro
            done += 1
            if result:
                apply(f, result)
                counts[result["label"]] += 1
            if done % 100 == 0 or done == len(firms):
                print(f"{done}/{len(firms)} judged, {len(failed)} failed", file=sys.stderr, flush=True)
    write_catalog(data, root / "data/public")
    print(json.dumps({"judged": sum(counts.values()), "failed": len(failed), "labels": counts}, indent=2))
    for fid, err in failed[:20]:
        print(f"FAILED {fid}: {err}", file=sys.stderr)
    if failed:
        sys.exit(1)


def self_check() -> None:
    assert label_from("yes", {"yes": 0.9}) == "yes" and label_from("yes", {"yes": 0.4}) == "unknown"
    assert label_from("bogus", {}) == "unknown" and label_from("no", {}) == "no"
    ev = {"url": "https://x.vc/p", "as_of": "2026-01"}
    firm = {"id": "x.vc", "name": "X", "domain": "x.vc", "record_level": "directory", "researched_at": "",
            "website": "https://x.vc", "fields": {"leads_rounds": "follow", "type": "vc"},
            "evidence": {"leads_rounds": ev, "type": {"url": "https://x.vc", "as_of": ""}},
            "sources": ["https://x.vc"], "portfolio": []}
    s = judged_state(firm, [], None)
    assert s["stated_lead_preference"] == "follow" and "leads_rounds" not in s["fields"] and "today" not in s
    # after a run the field holds our label, but the original statement keeps being passed to Jev
    prev = {"label": "no", "stated_value": "follow", "stated_evidence": ev}
    firm["fields"]["leads_rounds"] = "no"
    assert judged_state(firm, [], prev)["stated_lead_preference"] == "follow"
    assert stated_from(firm, prev) == ("follow", ev)
    # a different value means a new source statement
    firm["fields"]["leads_rounds"] = "yes"
    assert stated_from(firm, prev)[0] == "yes"
    # an own answer with no statement stays unstated
    firm["fields"]["leads_rounds"] = "unknown"
    assert "stated_lead_preference" not in judged_state(firm, [], {"label": "unknown"})
    assert cache_key(s) == cache_key(json.loads(json.dumps(s)))
    apply(firm, {"label": "no", "stated_value": "follow", "stated_evidence": ev})
    assert firm["fields"]["leads_rounds"] == "no" and firm["evidence"]["leads_rounds"] == ev
    apply(firm, {"label": "unknown", "stated_value": None, "stated_evidence": None})
    assert firm["evidence"]["leads_rounds"] == {"url": "https://x.vc", "as_of": ""}
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
        print(json.dumps({"state": judged_state(firm, data["people"], previous(firm["id"])),
                          "question": {"instructions": INSTRUCTIONS, "criteria": CRITERIA}}, indent=1, ensure_ascii=False))
        return
    asyncio.run(run(args.limit, args.concurrency))


if __name__ == "__main__":
    main()
