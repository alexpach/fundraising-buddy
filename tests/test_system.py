from __future__ import annotations

import copy
import json
import subprocess
import tempfile
import unittest
import io
import contextlib
import os
import shutil
from types import SimpleNamespace
from pathlib import Path
from unittest.mock import patch

from fundraising_buddy import catalog, email, wiki
from fundraising_buddy.server import render, page_index, make_handler
from tools.export_obsidian import export
from tools.import_public import migrate, merge_catalogs
from tools.migrate_legacy_fields import migrate as migrate_legacy
from tools.package_release import release_files, FILES, SKILLS
from fundraising_buddy.cli import main


def fixture():
    return {"schema_version": 2, "firms": [{"id": "fund.invalid", "name": "Example Fund", "domain": "fund.invalid",
        "website": "https://fund.invalid", "record_level": "directory", "researched_at": "",
        "fields": {}, "evidence": {}, "sources": ["https://fund.invalid"], "portfolio": []}], "people": []}


class SystemTests(unittest.TestCase):
    def setUp(self):
        Path("tmp/tests").mkdir(parents=True, exist_ok=True)
        # Leave fixtures under ignored tmp for inspection; no recursive deletion.
        self.root = Path(tempfile.mkdtemp(dir="tmp/tests")).resolve()
        self.data = fixture()
        catalog.write_catalog(self.data, self.root / "data/public")
        wiki.init(self.root)

    def test_catalog_rejects_private_fields_and_addresses(self):
        for key, value in [("next_action", "Call next week"), ("email", "person@fund.invalid")]:
            d = copy.deepcopy(self.data)
            d["firms"][0][key] = value
            self.assertTrue(catalog.validate(d))
        d = copy.deepcopy(self.data)
        d["firms"][0]["name"] = "person@fund.invalid"
        self.assertTrue(catalog.validate(d))
        # Portfolio entries reject unexpected keys and email addresses.
        d = copy.deepcopy(self.data)
        d["firms"][0]["portfolio"] = [{"company": "Acme", "sector": "", "round": "", "date": "",
                                        "url": "https://fund.invalid", "as_of": "", "next_action": "call"}]
        self.assertTrue(catalog.validate(d))
        d = copy.deepcopy(self.data)
        d["firms"][0]["portfolio"] = [{"company": "Acme", "sector": "", "round": "", "date": "",
                                        "url": "https://fund.invalid", "as_of": "person@fund.invalid"}]
        self.assertTrue(catalog.validate(d))
        # New schema fields still require evidence and reject unknown field keys.
        d = copy.deepcopy(self.data)
        d["firms"][0]["fields"]["legal_name"] = "Example Fund LLC"
        self.assertTrue(catalog.validate(d))
        d = copy.deepcopy(self.data)
        d["firms"][0]["fields"]["not_a_real_field"] = "x"
        d["firms"][0]["evidence"]["not_a_real_field"] = {"url": "https://fund.invalid", "as_of": "2026-09"}
        self.assertTrue(catalog.validate(d))

    def test_domain_injection_and_shared_providers_rejected(self):
        for value in ["gmail.com", "fund.invalid OR *", "https://fund.invalid", "fund.invalid/path", "x@fund.invalid"]:
            with self.assertRaises(ValueError):
                catalog.domain(value)

    def test_no_private_data_can_enter_derived_export(self):
        path = wiki.track(self.root, "fund.invalid")
        meta, body = wiki.read_page(path)
        meta["next_action"] = "PRIVATE_SENTINEL"
        wiki.write_page(path, meta, body + "\nprivate@fund.invalid\n")
        self.assertEqual(catalog.check_exports(self.root), [])
        self.assertNotIn("PRIVATE_SENTINEL", json.dumps(catalog.artifacts(catalog.load(self.root))))
        unexpected = self.root / "data/public/accidental-email.txt"
        unexpected.write_text("private@fund.invalid")
        self.assertTrue(catalog.check_exports(self.root))

    def test_derived_page_tampering_detected(self):
        page = self.root / "data/public/wiki/firms/fund.invalid.md"
        page.write_text(page.read_text() + "PRIVATE_SENTINEL")
        self.assertTrue(catalog.check_exports(self.root))

    def test_tracking_and_rollup_preserve_private_notes(self):
        path = wiki.track(self.root, "fund.invalid")
        meta, body = wiki.read_page(path)
        meta.update(status="engaged", next_action="Share an update", next_action_due="2026-10-01")
        wiki.write_page(path, meta, body + "\nPrivate relationship context.\n")
        before = path.read_text()
        wiki.track(self.root, "fund.invalid")
        wiki.init(self.root)
        wiki.rollup(self.root)
        self.assertEqual(before, path.read_text())
        self.assertIn("Share an update", (self.root / "workspace/wiki/Pipeline.md").read_text())
        self.assertEqual(wiki.lint(self.root), [])

    def test_lint_detects_broken_links_dates_and_yaml(self):
        path = wiki.track(self.root, "fund.invalid")
        meta, body = wiki.read_page(path)
        meta["expected_response"] = "tomorrow"
        wiki.write_page(path, meta, body + "\n[[missing-page]]")
        issues = wiki.lint(self.root)
        self.assertTrue(any("expected_response" in x for x in issues))
        self.assertTrue(any("broken wiki link" in x for x in issues))
        path.write_text("---\nname: [unclosed\n---\n")
        self.assertTrue(wiki.lint(self.root))

    def test_exact_domain_matching_and_header_case(self):
        self.assertTrue(email.matches({"from": "Partner <p@fund.invalid>"}, {"fund.invalid"}, set()))
        self.assertFalse(email.matches({"From": "p@fund.invalid.attacker.invalid"}, {"fund.invalid"}, set()))
        self.assertFalse(email.matches({"From": "p@otherfund.invalid"}, {"fund.invalid"}, set()))
        self.assertTrue(email.matches({"Bcc": "angel@example.invalid"}, set(), {"angel@example.invalid"}))

    def test_query_batches_and_utc_window(self):
        with patch.object(email, "terms", return_value=([f"fund{i}.invalid" for i in range(51)], [])):
            qs = email.queries(self.root, "gmail", "2026-09-01T02:00:00+02:00", "2026-09-02T00:00:00Z")
        self.assertEqual(len(qs), 3)
        self.assertTrue(all("-in:drafts" in q for q in qs))
        self.assertEqual(email.window("2026-09-01T02:00:00+02:00", "2026-09-02T00:00:00Z"), email.window("2026-09-01", "2026-09-02"))
        with self.assertRaises(ValueError):
            email.window("2026-09-02", "2026-09-01")

    def test_import_filters_drafts_bounds_and_duplicates(self):
        start, end = email.window("2026-09-01", "2026-09-02")
        def message(ident, timestamp, sender="p@fund.invalid", tags=None):
            return {"id": ident, "timestamp": timestamp, "headers": {"From": sender}, "tags": tags or [],
                    "body": [{"content-type": "text/plain", "content": "Discussed the next meeting."}]}
        payload = [message("ok", start), message("draft", start, tags=["draft"]), message("later", end),
                   message("spoof", start, "p@fund.invalid.attacker.invalid"), message("ok", start)]
        result = subprocess.CompletedProcess([], 0, json.dumps(payload), "")
        with patch.object(email.subprocess, "run", return_value=result):
            path, count = email.notmuch_import(self.root, "2026-09-01", "2026-09-02")
        self.assertEqual(count, 1)
        self.assertEqual(json.loads(path.read_text())["messages"][0]["id"], "ok")
        self.assertFalse((self.root / "workspace/runs/checkpoint.json").exists())

    def test_failed_import_does_not_write_review_file(self):
        with patch.object(email.subprocess, "run", side_effect=subprocess.CalledProcessError(1, "notmuch")):
            with self.assertRaises(subprocess.CalledProcessError):
                email.notmuch_import(self.root, "2026-09-01", "2026-09-02")
        self.assertFalse((self.root / "workspace/raw/email-review.json").exists())

    def test_viewer_sanitizes_markdown_and_does_not_index_raw(self):
        body = render('<script>alert(1)</script><img src="https://tracker.invalid/pixel"><a href="javascript:alert(1)">bad</a>\n\n[[public/firms/fund.invalid|Fund]]')
        self.assertNotIn("<script", body)
        self.assertNotIn("<img", body)
        self.assertNotIn("javascript:", body)
        self.assertIn("#page=public%2Ffirms%2Ffund.invalid", body)
        (self.root / "workspace/raw/secret.md").write_text("PRIVATE_SENTINEL")
        _, pages = page_index(self.root)
        self.assertNotIn("PRIVATE_SENTINEL", json.dumps(pages))

    def test_obsidian_refuses_to_overwrite_edits(self):
        export(self.root)
        edited = self.root / "workspace/obsidian/Home.md"
        edited.write_text(edited.read_text() + "\nMy new notes.")
        with self.assertRaises(ValueError):
            export(self.root)
        self.assertIn("My new notes.", edited.read_text())

    def test_migration_reconstructs_identity_without_private_fields(self):
        source = self.root / "legacy"
        path = source / "Investor DB/firms/Fund.md"
        path.parent.mkdir(parents=True)
        path.write_text('---\nname: Example Fund (Private label)\ndomain: fund.invalid\nwebsite: https://fund.invalid\ntype: vc\nnext_action: PRIVATE_SENTINEL\nemail: private@fund.invalid\n---\n## Notes\nPRIVATE_SENTINEL\n')
        data, _ = migrate(source, [])
        self.assertEqual(len(data["firms"]), 1)
        self.assertEqual(data["schema_version"], 2)
        self.assertEqual(data["firms"][0]["name"], "Example Fund")
        self.assertEqual(data["firms"][0]["portfolio"], [])
        self.assertNotIn("PRIVATE_SENTINEL", json.dumps(data))
        self.assertNotIn("private@", json.dumps(data))

    def test_migration_accepts_revise_verdicts_and_builds_portfolio(self):
        source = self.root / "legacy"
        cache = source / "tmp/vc/acme"
        cache.mkdir(parents=True)
        site = ("Acme Ventures invests seed to series A in enterprise software. "
                "Offices in London, Berlin. Legal name Acme Ventures LLP. "
                "The team is not currently taking board seats. "
                "Backed by Limited Partners including State Pension Fund. "
                "Jo Smith is a Partner focused on enterprise software.")
        (cache / "site.md").write_text(site)
        (cache / "news.md").write_text("Widgetco raised a seed round backed by Acme Ventures.")

        def fact(value, quote, cache_file="site.md"):
            return {"value": value, "url": "https://acme.vc", "cache": cache_file, "quote": quote, "as_of": "2026-09"}

        dossier = {
            "slug": "acme", "name": "Acme Ventures", "researched_at": "2026-09-01",
            "identity": {
                "canonical_domain": fact("acme.vc", "Acme Ventures invests"),
                "legal_name": fact("Acme Ventures LLP", "Legal name Acme Ventures LLP"),
                "offices": fact("London, Berlin", "Offices in London, Berlin"),
                "hq": fact("London", "Offices in London, Berlin"),
                "type": fact("vc", "Acme Ventures invests"),
            },
            "capital": {"leads_rounds": fact(False, "not currently taking board seats")},
            "mandate": {"stages": fact(["seed"], "invests seed to series A")},
            "lps": fact("State Pension Fund", "Backed by Limited Partners including State Pension Fund"),
            "people": [{"name": "Jo Smith", "title": "Partner", "focus": "enterprise software",
                        "evidence": {"url": "https://acme.vc/team", "cache": "site.md",
                                     "quote": "Jo Smith is a Partner focused on enterprise software"}}],
            "portfolio": [{"company": "Widgetco", "sector": "software", "round": "seed", "date": "2026-01",
                           "evidence": {"url": "https://acme.vc/news", "cache": "news.md",
                                        "quote": "Widgetco raised a seed round backed by Acme Ventures", "as_of": "2026-01"}}],
        }
        (cache / "dossier.json").write_text(json.dumps(dossier))
        (cache / "validation.json").write_text(json.dumps({
            "slug": "acme", "gate": "pass", "verdict": "revise", "critical_defects": [],
            "defects": [{"field": "identity.hq", "problem": "registered office, not HQ", "fix": "drop"}],
        }))

        data, _ = migrate(source, [])
        self.assertEqual(catalog.validate(data), [])
        firm = next(f for f in data["firms"] if f["id"] == "acme.vc")
        self.assertEqual(firm["record_level"], "sourced")
        self.assertNotIn("hq", firm["fields"])
        self.assertEqual(firm["fields"]["legal_name"], "Acme Ventures LLP")
        self.assertEqual(firm["fields"]["offices"], ["London", "Berlin"])
        self.assertEqual(firm["fields"]["leads_rounds"], "no")
        self.assertEqual(firm["fields"]["lps"], "State Pension Fund")
        self.assertEqual(len(firm["portfolio"]), 1)
        self.assertEqual(firm["portfolio"][0]["company"], "Widgetco")
        self.assertEqual(firm["portfolio"][0]["url"], "https://acme.vc/news")
        person = next(p for p in data["people"] if p["firm_id"] == "acme.vc")
        self.assertEqual(person["name"], "Jo Smith")
        self.assertEqual(person["focus"], "enterprise software")

        # A gate failure or a critical defect still blocks the firm.
        (cache / "validation.json").write_text(json.dumps({
            "slug": "acme", "gate": "pass", "verdict": "revise",
            "critical_defects": [{"field": "capital.aum", "problem": "fabricated"}], "defects": [],
        }))
        data2, report2 = migrate(source, [])
        self.assertFalse(any(f["id"] == "acme.vc" for f in data2["firms"]))
        self.assertTrue(any("validation needs revision" in r["reason"] for r in report2))

    def test_local_dossier_layout_is_found_and_merge_keeps_existing_records(self):
        # tools/import_public.py must also read workspace/cache/vc (this project's own
        # private cache layout), not only the legacy tmp/vc investor-db layout.
        source = self.root / "checkout"
        cache = source / "workspace/cache/vc/zeta"
        cache.mkdir(parents=True)
        (cache / "site.md").write_text("Zeta Capital invests only in seed rounds in the Nordics.")

        def fact(v, q):
            return {"value": v, "url": "https://zeta.vc", "cache": "site.md", "quote": q, "as_of": "2026-09"}

        dossier = {"slug": "zeta", "name": "Zeta Capital", "researched_at": "2026-09-05",
                   "identity": {"canonical_domain": fact("zeta.vc", "Zeta Capital invests"),
                                "type": fact("vc", "Zeta Capital invests"),
                                "hq": fact("Nordics", "in the Nordics")},
                   "mandate": {"stages": fact(["seed"], "invests only in seed rounds")}}
        (cache / "dossier.json").write_text(json.dumps(dossier))
        (cache / "validation.json").write_text(json.dumps({
            "slug": "zeta", "gate": "pass", "verdict": "pass", "critical_defects": [], "defects": [],
        }))
        data, _ = migrate(source, [])
        self.assertTrue(any(f["id"] == "zeta.vc" for f in data["firms"]))

        # Merging into an existing catalog keeps records the new source doesn't mention,
        # and lets a newer researched_at win over an older one for the same ID.
        existing = {"schema_version": 2, "firms": [
            {"id": "kept.invalid", "name": "Kept Fund", "domain": "kept.invalid", "website": "https://kept.invalid",
             "record_level": "directory", "researched_at": "", "fields": {}, "evidence": {},
             "sources": ["https://kept.invalid"], "portfolio": []},
            {"id": "zeta.vc", "name": "Zeta Capital (old)", "domain": "zeta.vc", "website": "https://zeta.vc",
             "record_level": "sourced", "researched_at": "2026-01-01", "fields": {}, "evidence": {},
             "sources": ["https://zeta.vc"], "portfolio": []},
        ], "people": []}
        merged = merge_catalogs(existing, data)
        self.assertEqual(catalog.validate(merged), [])
        self.assertTrue(any(f["id"] == "kept.invalid" for f in merged["firms"]))
        zeta = next(f for f in merged["firms"] if f["id"] == "zeta.vc")
        self.assertEqual(zeta["name"], "Zeta Capital")  # the newer (2026-09-05) record won
        self.assertEqual(zeta["researched_at"], "2026-09-05")

        # An older new record must not clobber a newer existing one.
        older = copy.deepcopy(data)
        older["firms"][0]["researched_at"] = "2025-01-01"
        older["firms"][0]["name"] = "Zeta Capital (stale re-run)"
        merged2 = merge_catalogs(merged, older)
        self.assertEqual(next(f for f in merged2["firms"] if f["id"] == "zeta.vc")["name"], "Zeta Capital")

    def test_checkpoint_refuses_partial_work_and_time_regression(self):
        run = self.root / "workspace/runs/pending.json"
        pending = {"since": "2026-09-01", "until": "2026-09-02", "all_pages_read": False, "review_complete": True}
        def invoke():
            with patch("sys.argv", ["fundraising-buddy", "checkpoint"]), patch("pathlib.Path.cwd", return_value=self.root), contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
                return main()
        run.write_text(json.dumps(pending))
        self.assertEqual(invoke(), 1)
        self.assertFalse((self.root / "workspace/runs/checkpoint.json").exists())
        pending["all_pages_read"] = True
        run.write_text(json.dumps(pending))
        self.assertEqual(invoke(), 0)
        checkpoint = self.root / "workspace/runs/checkpoint.json"
        self.assertEqual(json.loads(checkpoint.read_text())["until"], "2026-09-02")
        pending.update(since="2026-08-30", until="2026-09-01")
        run.write_text(json.dumps(pending))
        self.assertEqual(invoke(), 1)
        self.assertEqual(json.loads(checkpoint.read_text())["until"], "2026-09-02")

    def test_release_allowlist_excludes_private_and_unknown_files(self):
        checkout = Path(__file__).resolve().parents[1]
        for name in FILES:
            path = self.root / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text((checkout / name).read_text())
        for skill in SKILLS:
            for parent in ("skills", ".agents/skills", ".claude/skills"):
                path = self.root / parent / skill / "SKILL.md"
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text((checkout / "skills" / skill / "SKILL.md").read_text())
        (self.root / "workspace/raw/secret.txt").write_text("PRIVATE_SENTINEL")
        (self.root / "tools/local-secret.txt").write_text("PRIVATE_SENTINEL")
        files = release_files(self.root)
        self.assertFalse(any(name.startswith("workspace/") for name in files))
        self.assertNotIn("tools/local-secret.txt", files)
        notices = self.root / "frontend/DEPENDENCY-LICENSES.txt"
        notices.write_text(notices.read_text() + "\nUnreviewed material")
        with self.assertRaisesRegex(ValueError, "Potential personal email"):
            release_files(self.root)

    def test_scores_are_optional_validated_and_surface_as_frontmatter(self):
        d = copy.deepcopy(self.data)
        d["firms"][0]["scores"] = {"jev-score": 87}
        self.assertEqual(catalog.validate(d), [])
        page = catalog.public_pages(d)["firms/fund.invalid"]
        self.assertTrue(page.startswith("---\njev-score: 87\n---\n\n# Example Fund"))
        self.assertEqual(wiki.split_frontmatter(page)[0], {"jev-score": 87})
        catalog.write_catalog(d, self.root / "data/public")
        _, pages = page_index(self.root)
        self.assertIn("**jev-score:** 87", pages["public/firms/fund.invalid"])
        for bad in ({"jev-score": 101}, {"Jev": 1}, {"jev-score": True}, {"jev-score": "87"}, [87]):
            d["firms"][0]["scores"] = bad
            self.assertTrue(catalog.validate(d), bad)
        d["firms"][0]["scores"] = {}
        d["people"] = [{"id": "p1", "name": "P", "firm_id": "fund.invalid", "title": "", "profile": "", "focus": "",
                        "sources": ["https://fund.invalid"], "researched_at": "", "scores": {"jev-score": 1}}]
        self.assertTrue(catalog.validate(d))
        # A re-import of the same firm without scores keeps the existing derived scores.
        old = copy.deepcopy(self.data)
        old["firms"][0]["scores"] = {"jev-score": 42, "other": 7}
        merged = merge_catalogs(old, self.data)
        self.assertEqual(merged["firms"][0]["scores"], {"jev-score": 42, "other": 7})

    def test_legacy_field_migration_moves_only_general_tags_into_empty_records(self):
        legacy = {"fund.invalid": {"domain": "fund.invalid", "website": "https://fund.invalid", "type": "vc",
                  "stage_focus": ["seed"], "geo_focus": "us", "verticals": ["Acme drones", "robotics"],
                  "aum": "1B", "check_size_min": "", "lead_preference": "follow", "updated": "2026-04-24",
                  "status": "engaged", "sentiment": "warm", "next_action": "call", "contacts": ["[[P]]"],
                  "crunchbase": "https://www.crunchbase.com/organization/fund"}}
        d = copy.deepcopy(self.data)
        d["firms"][0]["scores"] = {"jev-score": 3}
        self.assertEqual(migrate_legacy(d, legacy, ["Acme"]), ["fund.invalid"])
        f = d["firms"][0]
        self.assertEqual(f["fields"], {"type": "vc", "stages": ["seed"], "geographies": ["us"], "aum": "1B",
                                       "leads_rounds": "no"})  # legacy "follow" maps to "no"; sectors dropped: private term; empty min skipped
        self.assertEqual(f["evidence"]["type"], {"url": "https://www.crunchbase.com/organization/fund", "as_of": "2026-04-24"})
        self.assertIn("https://www.crunchbase.com/organization/fund", f["sources"])
        self.assertEqual(f["record_level"], "directory")
        self.assertEqual(f["scores"], {"jev-score": 3})
        self.assertEqual(catalog.validate(d), [])
        self.assertNotIn("engaged", json.dumps(d))
        # Records that already carry research are left alone.
        self.assertEqual(migrate_legacy(d, legacy, []), [])
        self.assertIn("legacy list", catalog.public_pages(d)["firms/fund.invalid"])

    def test_private_angel_without_domain_is_valid(self):
        wiki.write_page(self.root / "workspace/wiki/firms/angel.md",
                        {"id": "angel", "name": "Example Person", "domain": "", "status": "target"}, "# Example Person\n")
        self.assertEqual(wiki.lint(self.root), [])

    def test_viewer_routes_reject_traversal_and_untrusted_hosts(self):
        handler = make_handler(self.root).__new__(make_handler(self.root))
        handler.server = SimpleNamespace(server_port=8765)
        output = []
        handler.respond = lambda body, content_type="application/json", status=200: output.append((status, body))
        handler.headers = {"Host": "attacker.invalid"}
        handler.path = "/api/catalog"
        handler.do_GET()
        self.assertEqual(output[-1][0], 403)
        handler.headers = {"Host": "127.0.0.1:8765"}
        for path in ["/workspace/config.json", "/api/page?id=../../workspace/config.json"]:
            handler.path = path
            handler.do_GET()
            self.assertEqual(output[-1][0], 404)
        handler.path = "/api/page?id=public/firms/fund.invalid"
        handler.do_GET()
        self.assertEqual(output[-1][0], 200)
        self.assertIn("Example Fund", output[-1][1])

    @unittest.skipUnless(shutil.which("notmuch"), "Optional notmuch binary is not installed")
    def test_real_notmuch_on_synthetic_archive(self):
        maildir = self.root / "synthetic-mail"
        for name in ("cur", "new", "tmp"):
            (maildir / name).mkdir(parents=True)
        message = 'From: Partner <partner@fund.invalid>\nTo: Founder <founder@example.invalid>\nSubject: Synthetic investor conversation\nDate: Tue, 1 Sep 2026 10:00:00 +0000\nMessage-ID: <synthetic-1@fund.invalid>\nMIME-Version: 1.0\nContent-Type: text/plain; charset=utf-8\n\nLet us schedule a meeting.\n'
        (maildir / "new/message-1").write_text(message)
        config = self.root / "notmuch-config"
        config.write_text(f'[database]\npath={maildir}\n[user]\nname=Test Founder\nprimary_email=founder@example.invalid\n[new]\ntags=inbox;unread\n')
        with patch.dict(os.environ, {"NOTMUCH_CONFIG": str(config)}):
            subprocess.run(["notmuch", "new"], check=True, capture_output=True, text=True)
            path, count = email.notmuch_import(self.root, "2026-09-01", "2026-09-02")
        self.assertEqual(count, 1)
        record = json.loads(path.read_text())["messages"][0]
        self.assertIn("schedule a meeting", record["body"])
        self.assertIn("synthetic-1", record["id"])


if __name__ == "__main__":
    unittest.main()
