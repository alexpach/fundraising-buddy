# Privacy and releases

Fundraising Buddy separates a shared catalog from the user's working fundraiser.

The release contains public firm identities, domains, selected sourced facts, public portfolio rows, public people names, roles, and focus areas, generic skills, code, and documentation. Investor records exclude individual email addresses, biographies, and addresses. The release excludes company/round information, correspondence, introductions, relationship notes, meeting transcripts, attachments, credentials, and private source archives.

Company criteria, matching assessments, saved prospect lists, and their CSV/JSON exports are private under `workspace/prospects/`. They never enter the public catalog or release allowlist. Public investor facts appearing inside a company-specific assessment do not make that assessment public.

`workspace/`, `tmp/`, `.env` files, caches, and local agent settings are ignored by Git. This prevents ordinary accidental commits, but it is not encryption or access control. Your agent and anyone with filesystem access can still read your workspace. Back it up using a private destination. Force-adding an ignored file bypasses Git's protection.

The viewer runs in Docker with the provided Compose loopback-only port mapping. The `--container` flag is rejected outside Docker. Compose runs a non-root viewer with a read-only filesystem, dropped capabilities, and a read-only workspace mount with a separate writable mount for `workspace/shortlists/`. The Docker build context is allowlisted and excludes private workspace files, credentials, and caches. Docker's daemon can read mounted private files, so use only a trusted local Docker installation. Do not change the mapping to a public interface.

Editable fund shortlists are stored in `workspace/shortlists/lists.json`, outside the public catalog and release allowlist. Shortlist writes require a matching local Origin, a session token, JSON input, and the current revision. Updates are locked and atomic; stale browser revisions cannot overwrite another tab's changes.

The viewer serves an explicit page index, rejects unrelated Host headers, and does not expose raw mail, config files, or arbitrary filesystem paths. It has no login or public hosting mode. Do not put it behind a public tunnel or reverse proxy. Reading a private workspace through a cloud agent or email connector subjects that content to the provider you chose; local storage does not mean all analysis is offline.

## Release checks

Run:

```sh
uv run fundraising-buddy validate-public
uv run python3 -m unittest discover -s tests -v
uv run python3 tools/package_release.py
uv run python3 tools/smoke_release.py
```

The public validator enforces allowed fields, source links, domain constraints, no email addresses, and exact derived exports. The packager uses an explicit list of project paths rather than archiving the repository. It rejects symlinks, unapproved files within the public dataset, personal email patterns outside synthetic examples, and obvious private-path or credential markers.

The extracted-release smoke test creates only synthetic private criteria and lists under `tmp/`, runs backend and CLI checks, and installs locked frontend dependencies to rebuild the distributed sources. It does not publish anything. Browser checks also use an isolated synthetic private workspace.

The resulting archive is under ignored `dist/`. Inspect its file list and content before publishing. There is no automatic upload, push, or deployment. Structural checks cannot determine whether every factual sentence is public, accurate, or current; human review remains necessary for contributions.

The one-way migration tool reads a legacy source project without copying its Git history, raw archives, or pages. It reconstructs records from selected fields. Migration reports stay under ignored `tmp/`; never add them to release notes. Private relationship pages never become release inputs.

Third-party software licenses retain their original public author attribution, including an author contact in the clsx license. The packager permits only the exact reviewed dependency-notice file, checked by SHA-256. This exception does not apply to investor records or any other file.
