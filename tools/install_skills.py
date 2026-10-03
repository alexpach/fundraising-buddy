"""Install canonical skills into project-local discovery folders for both agents."""
from pathlib import Path
import argparse


def install(root: Path, check=False):
    changed = []
    for source in sorted((root / "skills").glob("*/SKILL.md")):
        body = source.read_text()
        for agent in (".agents", ".claude"):
            dest = root / agent / "skills" / source.parent.name / "SKILL.md"
            old = dest.read_text() if dest.exists() else None
            if old != body:
                changed.append(str(dest.relative_to(root)))
                if not check:
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    dest.write_text(body)
    return changed


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    changed = install(Path.cwd(), args.check)
    print(f"{len(changed)} skill copies {'out of sync' if args.check else 'updated'}.")
    raise SystemExit(1 if args.check and changed else 0)
