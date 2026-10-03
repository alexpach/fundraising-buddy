from __future__ import annotations

import copy
import contextlib
import io
import json
import tempfile
import unittest
from datetime import date
from pathlib import Path
from types import SimpleNamespace

from unittest.mock import Mock, patch

from fundraising_buddy import catalog, prospects, wiki
from fundraising_buddy.cli import main
from fundraising_buddy.server import make_handler, page_index, serve
from tools.export_obsidian import export as obsidian_export


def fixture():
    fields = {"stages": ["seed"], "sectors": ["robotics"], "geographies": ["europe"],
              "check_size_min": "EUR 500K", "check_size_max": "EUR 2M", "leads_rounds": "yes"}
    firm = {"id": "fund.invalid", "name": "Example Fund", "domain": "fund.invalid", "website": "https://fund.invalid",
            "record_level": "sourced", "researched_at": "2026-09-01", "fields": fields,
            "evidence": {k: {"url": "https://fund.invalid/mandate", "as_of": "2026-09-01"} for k in fields},
            "sources": ["https://fund.invalid/mandate"], "portfolio": []}
    person = {"id": "p1", "name": "Example Partner", "firm_id": "fund.invalid", "title": "Partner", "focus": "robotics",
              "profile": "", "sources": ["https://fund.invalid/team"], "researched_at": "2026-09-01"}
    return {"schema_version": 2, "firms": [firm], "people": [person]}


class ProspectTests(unittest.TestCase):
    def setUp(self):
        Path("tmp/tests").mkdir(parents=True, exist_ok=True)
        self.root = Path(tempfile.mkdtemp(dir="tmp/tests")).resolve()
        self.data = fixture()
        catalog.write_catalog(self.data, self.root / "data/public")
        wiki.init(self.root)
        self.profile = prospects.validate_criteria({"company": "PRIVATE_COMPANY", "round": "PRIVATE_ROUND", "stage": "seed",
            "sectors": ["robotics"], "geographies": ["Germany"], "currency": "EUR", "raise_size": 10000000,
            "check_size_min": 1000000, "check_size_max": 3000000, "lead_required": True})
        self.path = prospects.init_criteria(self.root)
        self.path.write_text(json.dumps(self.profile))

    def test_full_match_and_determinism(self):
        result = prospects.match(self.data, self.profile, date(2026, 10, 2))
        self.assertEqual(result, prospects.match(self.data, self.profile, date(2026, 10, 2)))
        self.assertEqual(result[0]["support_score"], 100)
        self.assertEqual(result[0]["counts"]["match"], 5)
        self.assertTrue(result[0]["contacts"][0]["focus_overlap"])
        self.assertEqual(result[0]["reasons"][0]["evidence"][0]["url"], "https://fund.invalid/mandate")

    def test_unknown_is_not_a_mismatch_and_hq_is_not_investment_geography(self):
        f = self.data["firms"][0]
        f["fields"], f["evidence"] = {"hq": "Germany"}, {"hq": {"url": "https://fund.invalid", "as_of": ""}}
        row = prospects.match(self.data, self.profile)[0]
        self.assertEqual(row["counts"]["unknown"], 5)
        self.assertEqual(row["counts"]["conflict"], 0)
        self.assertEqual(row["support_score"], 0)

    def test_legacy_tags_and_completeness_do_not_establish_supported_fit(self):
        f = self.data["firms"][0]
        f["record_level"] = "directory"
        f["scores"] = {"jev-score": 100}
        row = prospects.match(self.data, self.profile)[0]
        self.assertEqual(row["counts"]["unverified"], 5)
        self.assertEqual(row["support_score"], 0)
        f["scores"] = {"jev-score": 0}
        self.assertEqual(row, prospects.match(self.data, self.profile)[0])

    def test_money_is_conservative_and_raise_size_is_not_a_check(self):
        self.assertEqual(prospects.money("EUR 1.5M"), ("EUR", 1500000))
        self.assertEqual(prospects.money("USD 500,000"), ("USD", 500000))
        for value in ("1M", "$1M", "USD 1M to 5M", "around EUR 2M", 1000000, "EUR -1M"):
            self.assertIsNone(prospects.money(value))
        self.profile["currency"] = "USD"
        row = prospects.match(self.data, self.profile)[0]
        self.assertEqual(next(r for r in row["reasons"] if r["criterion"] == "check_size")["status"], "unknown")
        with self.assertRaises(ValueError):
            prospects.match(self.data, {"company": "X", "raise_size": 50000000})

    def test_exclusion_and_portfolio_overlap(self):
        self.profile["excluded_firm_ids"] = ["fund.invalid"]
        self.assertEqual(prospects.match(self.data, self.profile), [])
        self.profile["excluded_firm_ids"] = ["missing.invalid"]
        with self.assertRaises(ValueError):
            prospects.match(self.data, self.profile)
        self.profile["excluded_firm_ids"] = []
        self.profile["competitors"] = ["Widgetco"]
        self.data["firms"][0]["portfolio"] = [{"company": "Widgetco", "sector": "", "round": "", "date": "",
            "url": "https://fund.invalid/portfolio", "as_of": "2026-09"}]
        row = prospects.match(self.data, self.profile)[0]
        self.assertEqual(row["warnings"][0]["kind"], "competitor")
        self.assertEqual(row["support_score"], 100)

    def test_saved_snapshot_preserves_criteria_and_results_and_public_exports(self):
        public_before = catalog.artifacts(catalog.load(self.root))
        home_before = (self.root / "workspace/wiki/Prospects.md").read_text()
        item = prospects.save(self.root, "first-list", "My private list")
        with self.assertRaises(FileExistsError):
            prospects.save(self.root, "first-list", "Replace")
        self.path.write_text(json.dumps({"sectors": ["biotech"]}))
        self.assertEqual(prospects.saved(self.root, "first-list"), item)
        self.assertEqual(prospects.lists(self.root), [item])
        self.assertEqual(catalog.artifacts(catalog.load(self.root)), public_before)
        self.assertNotIn("PRIVATE_COMPANY", json.dumps(public_before))
        self.assertEqual(home_before, (self.root / "workspace/wiki/Prospects.md").read_text())
        self.assertIn("PRIVATE_COMPANY", prospects.export(self.root, "first-list", "json").read_text())
        self.assertIn("PRIVATE_COMPANY", prospects.export(self.root, "first-list", "csv").read_text())
        self.assertIn("Example Partner", prospects.export(self.root, "first-list", "csv").read_text())
        self.assertEqual(catalog.check_exports(self.root), [])

    def test_selected_firms_and_tracking_preserve_existing_history(self):
        with self.assertRaises(ValueError):
            prospects.save(self.root, "bad-list", "Bad", firm_ids=["unknown.invalid"])
        prospects.save(self.root, "selected", "Selected", firm_ids=["fund.invalid", "fund.invalid"])
        self.assertEqual(len(prospects.saved(self.root, "selected")["rows"]), 1)
        path = wiki.track(self.root, "fund.invalid")
        meta, body = wiki.read_page(path)
        meta["status"] = "passed"
        wiki.write_page(path, meta, body + "\nPRIVATE_HISTORY\n")
        before = path.read_text()
        prospects.track(self.root, "selected", ["fund.invalid"])
        self.assertEqual(before, path.read_text())
        for selected in ([], ["unknown.invalid"]):
            with self.assertRaises(ValueError):
                prospects.track(self.root, "selected", selected)

    def test_criteria_validation_and_paths(self):
        for bad in ({"unknown": "x"}, {"stage": "early"}, {"lead_required": "yes"}, {"sectors": "ai"},
                    {"raise_size": True}, {"check_size_min": float("nan")}, {"currency": "dollars"},
                    { "raise_size": 10 ** 400 }, {"check_size_min": 10, "check_size_max": 1}):
            with self.assertRaises(ValueError):
                prospects.validate_criteria(bad)
        for ident in ("../secret", "X", "a/b", "", "x;echo"):
            with self.assertRaises(ValueError):
                prospects.save(self.root, ident, "Bad")
        folder = self.root / "workspace/prospects/lists"
        folder.symlink_to(self.root / "data/public", target_is_directory=True)
        with self.assertRaises(ValueError):
            prospects.save(self.root, "unsafe", "Bad")

    def test_freshness_and_conflicts_are_visible(self):
        self.data["firms"][0]["fields"]["sectors"] = ["biotech"]
        self.data["firms"][0]["evidence"]["sectors"]["as_of"] = "2020-01"
        row = prospects.match(self.data, self.profile, date(2026, 10, 2))[0]
        reason = next(r for r in row["reasons"] if r["criterion"] == "sectors")
        self.assertEqual(reason["status"], "conflict")
        self.assertIn("stale", reason["evidence"][0]["freshness"])
        self.assertEqual(prospects.freshness("nonsense", date.today()), "date unknown")
        self.assertIn("future", prospects.freshness("2099-01-01", date.today()))

    def test_api_is_read_only_and_checks_host(self):
        handler = make_handler(self.root).__new__(make_handler(self.root))
        handler.server = SimpleNamespace(server_port=8765)
        output = []
        handler.respond = lambda body, content_type="application/json", status=200: output.append((status, body))
        handler.headers, handler.path = {"Host": "attacker.invalid"}, "/api/prospects"
        handler.do_GET()
        self.assertEqual(output[-1][0], 403)
        handler.headers = {"Host": "127.0.0.1:8765"}
        handler.do_GET()
        self.assertEqual(output[-1][0], 200)
        self.assertIn("PRIVATE_COMPANY", output[-1][1])
        self.assertFalse((self.root / "workspace/prospects/lists").exists())
        self.path.write_text("{}")
        handler.do_GET()
        self.assertEqual(json.loads(output[-1][1])["rows"], [])
        self.assertIn("at least one", json.loads(output[-1][1])["message"])


    def test_container_binding_requires_docker_and_preserves_local_default(self):
        with patch("fundraising_buddy.server.ThreadingHTTPServer") as factory:
            factory.return_value.server_port = 10013
            serve(self.root)
            self.assertEqual(factory.call_args.args[0], ("127.0.0.1", 10013))
        with patch("fundraising_buddy.server.Path.is_file", return_value=False), patch("fundraising_buddy.server.ThreadingHTTPServer") as factory:
            with self.assertRaises(ValueError):
                serve(self.root, container=True)
            factory.assert_not_called()
        with patch("fundraising_buddy.server.Path.is_file", return_value=True), patch("fundraising_buddy.server.ThreadingHTTPServer") as factory:
            factory.return_value.server_port = 10013
            serve(self.root, container=True)
            self.assertEqual(factory.call_args.args[0], ("0.0.0.0", 10013))

    def test_client_disconnect_does_not_retry_response(self):
        handler = make_handler(self.root).__new__(make_handler(self.root))
        handler.send_response = Mock()
        handler.send_header = Mock()
        handler.end_headers = Mock()
        handler.wfile = SimpleNamespace(write=Mock(side_effect=BrokenPipeError))
        handler.respond("{}")
        handler.send_response.assert_called_once_with(200)
        handler.wfile.write.assert_called_once()

    def test_cli_prospect_workflow(self):
        def invoke(*args):
            output = io.StringIO()
            with patch("sys.argv", ["fundraising-buddy", *args]), patch("pathlib.Path.cwd", return_value=self.root), contextlib.redirect_stdout(output), contextlib.redirect_stderr(output):
                code = main()
            return code, output.getvalue()
        self.assertEqual(invoke("prospects-preview", "--limit", "0")[0], 1)
        code, output = invoke("prospects-preview", "--limit", "1")
        self.assertEqual(code, 0)
        self.assertEqual(json.loads(output)[0]["firm_id"], "fund.invalid")
        self.assertEqual(invoke("prospects-save", "cli-list", "--name", "CLI list", "--firm", "fund.invalid")[0], 0)
        self.assertEqual(invoke("prospects-save", "cli-list", "--name", "Again")[0], 1)
        self.assertEqual(invoke("prospects-export", "cli-list", "--format", "csv")[0], 0)
        self.assertEqual(invoke("prospects-track", "cli-list", "--firm", "fund.invalid")[0], 0)
        self.assertEqual(wiki.lint(self.root), [])

    def test_snapshot_wiki_links_and_obsidian(self):
        prospects.save(self.root, "linked", "Linked list")
        home = self.root / "workspace/wiki/Prospects.md"
        home.write_text(home.read_text() + "\n[[prospect-lists/linked|Linked list]]\n")
        self.assertEqual(wiki.lint(self.root), [])
        _, pages = page_index(self.root)
        self.assertIn("PRIVATE_COMPANY", pages["private/prospect-lists/linked"])
        obsidian_export(self.root)
        path = self.root / "workspace/obsidian/prospect-lists/linked.md"
        self.assertIn("PRIVATE_COMPANY", path.read_text())
        path.write_text(path.read_text() + "\nPrivate edit\n")
        with self.assertRaises(ValueError):
            obsidian_export(self.root)

    def test_corrupt_snapshots_fail_cleanly(self):
        item = prospects.save(self.root, "corrupt", "Corrupt")
        path = self.root / "workspace/prospects/lists/corrupt.json"
        for change in (lambda s: s.pop("criteria"), lambda s: s["rows"][0].pop("reasons"),
                       lambda s: s["rows"][0].update(firm_id="../../config"),
                       lambda s: s["rows"][0].update(contacts=[None])):
            altered = copy.deepcopy(item)
            change(altered)
            path.write_text(json.dumps(altered))
            with self.assertRaises(ValueError):
                prospects.saved(self.root, "corrupt")

    def test_csv_formula_safety(self):
        self.data["firms"][0]["name"] = "=2+3"
        catalog.write_catalog(self.data, self.root / "data/public")
        prospects.save(self.root, "formula", "Formula test")
        self.assertIn("'=2+3", prospects.export(self.root, "formula", "csv").read_text())

    def test_focus_hint_does_not_match_substrings(self):
        self.profile["sectors"] = ["ai"]
        self.data["people"][0]["focus"] = "retail"
        row = prospects.match(self.data, self.profile)[0]
        self.assertFalse(row["contacts"][0]["focus_overlap"])


if __name__ == "__main__":
    unittest.main()
