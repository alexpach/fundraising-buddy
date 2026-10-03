"""Create a source release from an explicit file allowlist. Never archive the checkout."""
from __future__ import annotations

import hashlib
import json
import re
import zipfile
from pathlib import Path

from fundraising_buddy.catalog import EMAIL, artifacts, check_exports, load

SKILLS = ["fb-daily-check", "fb-update-interactions", "fb-research-investor", "fb-wiki-maintain", "fb-review-decisions", "fb-daily-log"]
FILES = ["Dockerfile", ".dockerignore", "compose.yaml", "compose.test.yaml", "README.md", "LICENSE", "AGENTS.md", "CLAUDE.md", "CONTRIBUTING.md", ".gitignore", "pyproject.toml", "uv.lock",
         "docs/getting-started.md", "docs/email.md", "docs/wiki.md", "docs/data.md", "docs/research.md", "docs/privacy.md",
         "docs/prospects.md", "docs/release-plan.md",
         "tools/import_public.py", "tools/export_public.py", "tools/export_obsidian.py", "tools/install_skills.py", "tools/package_release.py",
         "tools/migrate_legacy_fields.py", "tools/jev_score.py", "tools/test_viewer.py", "tools/smoke_release.py",
         "tools/dossier_fetch.py", "tools/dossier_check.py",
         ".claude/agents/dossier-researcher.md", ".claude/agents/dossier-validator.md",
         "src/fundraising_buddy/__init__.py", "src/fundraising_buddy/catalog.py", "src/fundraising_buddy/wiki.py",
         "src/fundraising_buddy/email.py", "src/fundraising_buddy/server.py", "src/fundraising_buddy/cli.py", "src/fundraising_buddy/prospects.py", "src/fundraising_buddy/shortlists.py",
         "src/fundraising_buddy/static/index.html", "src/fundraising_buddy/static/style.css", "src/fundraising_buddy/static/app.js", "src/fundraising_buddy/static/favicon.svg",
         "tests/test_system.py", "tests/test_prospects.py", "tests/test_shortlists.py", ".github/workflows/check.yml",
         "components.json", "package.json", "package-lock.json", "tsconfig.json", "vite.config.ts", "playwright.config.ts",
         "tests/viewer.spec.ts", "docs/ui.md", "frontend/main.tsx", "frontend/grid.tsx", "frontend/funds.tsx", "frontend/funds.css", "frontend/theme.css", "frontend/components/infinite-rows.tsx", "frontend/prospects.tsx", "frontend/style.css", "frontend/lib/utils.ts",
         "frontend/sectors.ts", "frontend/components/data-table.tsx", "frontend/components/nav-list-card.tsx", "frontend/components/button.tsx",
         "frontend/components/spectrumui/charts/chart-engine.tsx", "frontend/components/spectrumui/charts/stat-cards.tsx",
         "frontend/components/spectrumui/status-badge.tsx", "frontend/components/spectrumui/blocks/ai-assistants/code-block.tsx",
         "frontend/NOTICE.md", "frontend/SPECTRUM-LICENSE", "frontend/DEPENDENCY-LICENSES.txt"]


def release_files(root: Path):
    errors = check_exports(root)
    if errors:
        raise ValueError("; ".join(errors))
    names = FILES + ["data/public/" + name for name in artifacts(load(root))]
    for skill in SKILLS:
        canonical = root / "skills" / skill / "SKILL.md"
        for parent in ("skills", ".agents/skills", ".claude/skills"):
            name = f"{parent}/{skill}/SKILL.md"
            if (root / name).read_text() != canonical.read_text():
                raise ValueError("Skill copies differ; run tools/install_skills.py")
            names.append(name)
    result = {}
    for name in sorted(names):
        path = root / name
        if not path.is_file() or not path.resolve().is_relative_to(root.resolve()) or any(p.is_symlink() for p in [path, *path.parents] if p.is_relative_to(root)):
            raise ValueError(f"Missing or symlinked release input: {name}")
        text = path.read_text()
        addresses = EMAIL.findall(text)
        # This exact reviewed npm license file retains its public author attribution.
        # Any changed bytes restore the ordinary email rejection.
        dependency_notice = (name == "frontend/DEPENDENCY-LICENSES.txt" and
                             hashlib.sha256(text.encode()).hexdigest() == "d6834b491e142198eec1d1476b90c0b9554f769ad60f5356ab680ef2b6f67f21")
        if not dependency_notice and any(not a.endswith(".invalid") for a in addresses):
            raise ValueError(f"Potential personal email in release file: {name}")
        if re.search(r"(?<![A-Za-z0-9])/(?:Users|home)/[A-Za-z0-9_-]+/|-----BEGIN (?:RSA |OPENSSH )?PRIVATE KEY-----|\bsk-[A-Za-z0-9]{20,}", text):
            raise ValueError(f"Potential private path or credential in: {name}")
        if chr(0x2014) in text:
            raise ValueError(f"Unexpected typography in: {name}")
        result[name] = text.encode()
    return result


def package(root: Path):
    files = release_files(root)
    target = root / "dist/fundraising-buddy-0.1.0.zip"
    target.parent.mkdir(exist_ok=True)
    hashes = {name: hashlib.sha256(body).hexdigest() for name, body in files.items()}
    with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as archive:
        for name, body in files.items():
            archive.writestr("fundraising-buddy/" + name, body)
        archive.writestr("fundraising-buddy/RELEASE-MANIFEST.json", json.dumps(hashes, indent=2) + "\n")
    return target, len(files)


if __name__ == "__main__":
    path, count = package(Path.cwd())
    print(f"Packaged {count} allowlisted files: {path.relative_to(Path.cwd())}")
