"""Package only the static public directory and canonical public JSON for Pages."""
from pathlib import Path
import hashlib
import json
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]
INPUTS = {
    "index.html": "public-site/index.html",
    "style.css": "public-site/style.css",
    "app.js": "public-site/app.js",
    "data/public/catalog.json": "data/public/catalog.json",
}


def package_pages():
    files = {}
    for output, source in INPUTS.items():
        path = ROOT / source
        if any(p.is_symlink() for p in (path, *path.parents) if p.is_relative_to(ROOT)):
            raise ValueError(f"Symlinked public input: {source}")
        files[output] = path.read_bytes()
    catalog = json.loads(files["data/public/catalog.json"])
    if set(catalog) != {"schema_version", "firms", "people"} or catalog["schema_version"] != 2:
        raise ValueError("Unexpected public catalog schema")
    from fundraising_buddy.catalog import EMAIL, FIRM_KEYS, PERSON_KEYS, PUBLIC_FIELDS
    for kind, keys in (("firms", FIRM_KEYS), ("people", PERSON_KEYS)):
        for item in catalog[kind]:
            if set(item) - {"scores"} != keys:
                raise ValueError(f"Unexpected public {kind} fields")
            if kind == "firms" and not set(item["fields"]) <= PUBLIC_FIELDS:
                raise ValueError("Unexpected fund research fields")
    for name, body in files.items():
        content = body.decode()
        if EMAIL.search(content) or re.search(r"-----BEGIN .*PRIVATE KEY-----|(?<![A-Za-z0-9])/(?:Users|home)/[A-Za-z0-9_-]+/|\bsk-[A-Za-z0-9]{20,}", content):
            raise ValueError(f"Potential private material in {name}")
    files[".nojekyll"] = b""
    files["manifest.json"] = (json.dumps({"funds": len(catalog["firms"]), "sha256": {name: hashlib.sha256(body).hexdigest() for name, body in files.items()}}, indent=2)+"\n").encode()
    target = ROOT / "dist/github-pages.zip"
    target.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as archive:
        for name, body in files.items():
            archive.writestr(name, body)
    print(f"Packaged {len(catalog['firms'])} funds into {target.relative_to(ROOT)}")
    return target


if __name__ == "__main__":
    package_pages()
