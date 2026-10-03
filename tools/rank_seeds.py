"""Rank directory-seed firms for research by size and tag completeness (no company fit).

Usage: uv run python3 tools/rank_seeds.py [--self-check]
Writes workspace/cache/seed-ranking.csv (private, ignored). Reads data/public/catalog.json.

score = size_pts (0-50) + tag_pts (0-50). Missing size scores 0: unknown, not a mismatch.
Tiers: A = top 130, B = next 300, C = rest (see the research plan).
"""
import csv
import json
import math
import re
import sys
from pathlib import Path

# ponytail: static FX and no vintage adjustment; swap for fit scoring once the company profile exists.
FX = {"$": 1.0, "€": 1.1, "£": 1.3, "CHF": 1.1, "EUR": 1.1, "GBP": 1.3, "USD": 1.0}
MULT = {"K": 1e3, "M": 1e6, "B": 1e9, "T": 1e12}
TAGS = ["type", "stages", "geographies", "sectors", "aum", "check_size_min", "check_size_max"]
TIER_A, TIER_B = 130, 300


def usd(text):
    """'2.5B' -> 2.5e9, '€700M' -> 7.7e8, '850K CHF' -> 9.35e5, anything unparseable -> None."""
    if not isinstance(text, str):
        return None
    m = re.search(r"(\d[\d,]*\.?\d*)\s*([KMBT])\b", text.upper().replace("USD", "$"))
    if not m:
        return None
    rate = next((v for k, v in FX.items() if k in text.upper() or k in text), 1.0)
    return float(m[1].replace(",", "")) * MULT[m[2]] * rate


def score(fields):
    aum, chk = usd(fields.get("aum")), usd(fields.get("check_size_max"))
    aum_pts = min(max((math.log10(aum) - 7) / 4 * 50, 0), 50) if aum else 0
    chk_pts = min(max((math.log10(chk) - 5) / 3 * 30, 0), 30) if chk else 0
    basis = "aum" if aum_pts >= chk_pts and aum else "check_max" if chk else ""
    have = sum(1 for t in TAGS if fields.get(t) not in (None, "", [], {}))
    size = max(aum_pts, chk_pts)
    return round(size, 1), round(have / len(TAGS) * 50, 1), have, basis, aum or chk or 0


def self_check():
    assert usd("2.5B") == 2.5e9 and usd("500K") == 5e5
    assert abs(usd("€700M") - 7.7e8) < 1 and abs(usd("850K CHF") - 9.35e5) < 1
    assert usd("n/a") is None and usd(None) is None
    assert score({})[:3] == (0, 0, 0)
    assert score({"aum": "100B"})[0] == 50 and score({"check_size_max": "100M"})[0] == 30
    print("self-check ok")


def main():
    if "--self-check" in sys.argv:
        return self_check()
    data = json.loads(Path("data/public/catalog.json").read_text())
    people = {p["firm_id"] for p in data["people"]}
    rows = []
    for f in data["firms"]:
        if f["record_level"] != "directory":
            continue
        size, tags, have, basis, value = score(f["fields"])
        rows.append({"id": f["id"], "name": f["name"], "type": f["fields"].get("type", ""), "score": round(size + tags, 1),
                     "size_pts": size, "tag_pts": tags, "tags_present": have, "size_basis": basis,
                     "size_usd": int(value), "has_people": f["id"] in people})
    rows.sort(key=lambda r: (-r["score"], r["name"].casefold()))
    for i, r in enumerate(rows, 1):
        r["rank"], r["tier"] = i, "A" if i <= TIER_A else "B" if i <= TIER_A + TIER_B else "C"
    out = Path("workspace/cache/seed-ranking.csv")
    with out.open("w", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=["rank", "tier", "id", "name", "type", "score", "size_pts", "tag_pts",
                                           "tags_present", "size_basis", "size_usd", "has_people"])
        w.writeheader()
        w.writerows(rows)
    print(f"wrote {len(rows)} rows to {out}")


if __name__ == "__main__":
    main()
