"""Promote a batch of validated dossiers and merge seeds whose canonical domain differs.

Usage: uv run python3 tools/finish_batch.py SLUG [SLUG ...]
Reads the queue in tmp/batch-queue.json (slug -> seed domain), stages only the named
dossiers under tmp/import-src, backs up the catalog to tmp/catalog.pre-batch.json, runs
tools/import_public.py, then for each slug whose dossier canonical domain differs from
its seed domain: drops the leftover directory seed, adds the seed domain to
workspace/config.json extra_domains (so email matching keeps working) and trashes the
seed's public wiki page. Run export_public, validate-public, jev_leads and jev_score after.
"""
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))
from fundraising_buddy.catalog import load, write_catalog  # noqa: E402

ROOT = Path.cwd()
STAGE = ROOT / "tmp/import-src"


def canonical(slug: str) -> str | None:
    try:
        dossier = json.loads((ROOT / f"workspace/cache/vc/{slug}/dossier.json").read_text())
        return re.sub(r":(?:80|443)$", "", dossier["identity"]["canonical_domain"]["value"].strip().lower())
    except (OSError, KeyError, TypeError, ValueError):
        return None


def main(slugs: list[str]) -> None:
    seeds = {q["slug"]: q["domain"] for q in json.loads((ROOT / "tmp/batch-queue.json").read_text())}
    if STAGE.exists():
        subprocess.run(["trash", str(STAGE)], check=True)
    (STAGE / "workspace/cache/vc").mkdir(parents=True)
    for s in slugs:
        (STAGE / "workspace/cache/vc" / s).symlink_to(ROOT / "workspace/cache/vc" / s)
    shutil.copy(ROOT / "data/public/catalog.json", ROOT / "tmp/catalog.pre-batch.json")
    config = json.loads((ROOT / "workspace/config.json").read_text())
    terms = [x for t in config["private_terms"] for x in ("--exclude-term", t)]
    out = subprocess.run(["uv", "run", "python", "tools/import_public.py", str(STAGE), *terms], capture_output=True, text=True)
    if out.returncode:
        sys.exit(out.stderr)
    data = load(ROOT)
    by_id = {f["id"]: f for f in data["firms"]}
    dropped, missing = [], []
    for s in slugs:
        canon, seed = canonical(s), seeds.get(s)
        if canon not in by_id or by_id[canon]["record_level"] != "sourced":
            missing.append(s)
        elif seed and seed != canon and seed in by_id and by_id[seed]["record_level"] == "directory":
            del by_id[seed]
            dropped.append(seed)
            if seed not in config["extra_domains"]:
                config["extra_domains"].append(seed)
    if dropped:
        data["firms"] = [f for f in data["firms"] if f["id"] not in dropped]
        data["people"] = [p for p in data["people"] if p["firm_id"] not in dropped]
        write_catalog(data, ROOT / "data/public")
        (ROOT / "workspace/config.json").write_text(json.dumps(config, indent=2, ensure_ascii=False) + "\n")
        for seed in dropped:
            page = ROOT / f"data/public/wiki/firms/{seed}.md"
            if page.exists():
                subprocess.run(["trash", str(page)], check=True)
    print(json.dumps({"imported": [s for s in slugs if s not in missing], "not_sourced_after_import": missing,
                      "merged_seed_domains": dropped, "firms": len(data["firms"]), "people": len(data["people"])}, indent=1))


if __name__ == "__main__":
    main(sys.argv[1:])
