from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from tools import revalidate_funds as rv


class RevalidationTests(unittest.TestCase):
    def setUp(self):
        Path("tmp/tests").mkdir(parents=True, exist_ok=True)
        self.root = Path(tempfile.mkdtemp(dir="tmp/tests")).resolve()
        self.ident = "example.invalid"
        firm = {"id": self.ident, "name": "Example Capital", "domain": self.ident,
                "website": f"https://{self.ident}", "record_level": "sourced",
                "researched_at": "2026-10-03", "fields": {}, "sources": [f"https://{self.ident}"],
                "evidence": {}, "portfolio": []}
        (self.root / "data/public").mkdir(parents=True)
        (self.root / "data/public/catalog.json").write_text(json.dumps({"schema_version": 2, "firms": [firm], "people": []}))
        self.cache = self.root / rv.CACHE / self.ident
        self.cache.mkdir(parents=True)
        self.quote = "Example Capital invests seed in healthcare companies."
        (self.cache / "identity.md").write_text(self.quote)
        (self.cache / "capital.md").write_text("Example Capital reports cumulative capital raised of USD 400 million.")
        (self.cache / "lead.md").write_text("Example Capital co-led its Series B financing round.")
        (self.cache / "manifest.json").write_text(json.dumps({"retrieved_at": "2026-10-03", "sources": [
            {"file": "identity.md", "url": f"https://{self.ident}/about"},
            {"file": "capital.md", "url": f"https://{self.ident}/capital"},
            {"file": "lead.md", "url": f"https://{self.ident}/news"}
        ]}))
        evidence = {"url": f"https://{self.ident}/about", "as_of": "2026-10", "cache": f"workspace/revalidation/cache/{self.ident}/identity.md", "quote": self.quote, "supports": ["Example Capital", "venture capital", "seed", "Healthcare"]}
        cap_evidence = {"url": f"https://{self.ident}/capital", "as_of": "2026-10", "cache": f"workspace/revalidation/cache/{self.ident}/capital.md", "quote": "Example Capital reports cumulative capital raised of USD 400 million."}
        lead_evidence = {"url": f"https://{self.ident}/news", "as_of": "2026-10", "cache": f"workspace/revalidation/cache/{self.ident}/lead.md", "quote": "Example Capital co-led its Series B financing round."}
        self.report = {
            "schema_version": 1, "fund_id": self.ident, "fingerprint": rv.fingerprint(self.ident, self.root),
            "worker": "research-01", "checked_at": "2026-10-03",
            "identity": {"resolved_name": "Example Capital", "resolved_domain": self.ident, "relationship": "same_entity", "confidence": "high", "evidence": [evidence]},
            "classification": {"type": ["venture capital"], "strategies": [], "structure": [], "instruments": [], "evidence": [evidence]},
            "stages": {"value": ["seed"], "evidence": [evidence]},
            "lead": {"value": "yes", "meaning": "co-lead", "basis": "observed_activity", "evidence": [lead_evidence]},
            "capital": [{"metric": "capital_raised", "scope": "firm", "currency": "USD", "amount": 400000000, "lower_bound": None, "upper_bound": None, "qualifier": "cumulative", "as_of": "2026-10", "evidence": cap_evidence}],
            "sectors": [{"value": "Healthcare", "evidence": [{**evidence, "supports": ["Healthcare"]}]}],
            "unknowns": [], "findings": [], "independent_review": {}
        }
        self.path = self.root / rv.REPORTS / f"{self.ident}.json"
        self.path.parent.mkdir(parents=True)
        self.write_report()

    def write_report(self):
        self.path.write_text(json.dumps(self.report, indent=2))

    def accepted_review(self):
        self.report["independent_review"] = {
            "reviewer": "validator-01", "checked_at": "2026-10-03",
            "report_sha256": rv.report_hash(self.report), "disposition": "accepted",
            "findings_reviewed": [{"code": f["code"], "disposition": "accepted"} for f in self.report.get("findings", [])], "notes": ""}
        self.write_report()

    def issue_codes(self):
        return {x["code"] for x in rv.check_report(self.ident, self.root)["issues"]}

    def test_valid_co_lead_is_affirmative_and_wrong_capital_metric_is_caught(self):
        self.accepted_review()
        self.assertEqual(rv.check_report(self.ident, self.root)["verdict"], "pass")
        self.assertEqual(self.report["lead"]["value"], "yes")
        self.report["capital"][0]["metric"] = "aum"
        self.write_report()
        self.assertIn("capital.metric_quote_mismatch", self.issue_codes())

    def test_total_assets_quote_cannot_be_labeled_aum(self):
        self.accepted_review()
        text = "Example Capital reports total assets of EUR 93 billion."
        (self.cache / "capital.md").write_text(text)
        self.report["capital"][0]["metric"] = "aum"
        self.report["capital"][0]["currency"] = "EUR"
        self.report["capital"][0]["amount"] = 93000000000
        self.report["capital"][0]["evidence"]["quote"] = text
        self.write_report()
        self.assertIn("capital.metric_quote_mismatch", self.issue_codes())

    def test_wrong_entity_evidence_is_flagged(self):
        self.accepted_review()
        self.report["identity"]["resolved_name"] = "Wrong Manager"
        self.write_report()
        self.assertIn("identity.quote_name_mismatch", self.issue_codes())

    def test_missing_and_old_dates_are_warnings_not_invented_source_dates(self):
        self.accepted_review()
        self.report["identity"]["evidence"][0]["as_of"] = ""
        self.report["identity"]["evidence"][0]["quote"] = self.quote
        self.report["independent_review"] = {}
        self.accepted_review()
        result = rv.check_report(self.ident, self.root)
        self.assertEqual(result["verdict"], "pass")
        self.assertIn("evidence.date_missing", {x["code"] for x in result["warnings"]})

    def test_every_listed_stage_and_sector_needs_mapped_evidence(self):
        self.accepted_review()
        self.report["stages"]["value"].append("growth")
        self.report["sectors"].append({"value": "Robotics", "evidence": []})
        self.write_report()
        codes = self.issue_codes()
        self.assertIn("stages.item_unsupported", codes)
        self.assertIn("sectors.item_evidence_missing", codes)

    def test_cache_path_traversal_is_rejected(self):
        self.accepted_review()
        self.report["capital"][0]["evidence"]["cache"] = f"workspace/revalidation/cache/{self.ident}/../../secret.md"
        self.write_report()
        self.assertIn("evidence.cache_unsafe_or_missing", self.issue_codes())

    def test_cache_symlink_escape_and_manifest_url_mismatch_are_rejected(self):
        self.accepted_review()
        cache_rel = f"workspace/revalidation/cache/{self.ident}/identity.md"
        manifest_path = self.cache / "manifest.json"
        manifest = json.loads(manifest_path.read_text())
        manifest["sources"][0]["url"] = f"https://other.invalid/about"
        manifest_path.write_text(json.dumps(manifest))
        result = rv.check_report(self.ident, self.root)
        self.assertIn("evidence.manifest_mapping_missing", {x["code"] for x in result["issues"]})
        manifest["sources"][0]["url"] = f"https://{self.ident}/about"
        manifest_path.write_text(json.dumps(manifest))
        outside = self.root / "outside-cache"
        self.cache.rename(outside)
        self.cache.symlink_to(outside, target_is_directory=True)
        self.write_report()
        self.assertIn("evidence.cache_unsafe_or_missing", self.issue_codes())

    def test_stale_fingerprint_and_reviewer_hash_are_rejected(self):
        self.accepted_review()
        catalog_path = self.root / "data/public/catalog.json"
        catalog = json.loads(catalog_path.read_text())
        catalog["firms"][0]["name"] = "Changed Capital"
        catalog_path.write_text(json.dumps(catalog))
        self.report["identity"]["resolved_name"] = "Changed Capital"
        self.write_report()
        codes = self.issue_codes()
        self.assertIn("report.stale_fingerprint", codes)
        self.assertIn("review.stale_hash", codes)

    def test_queue_is_resumable_idempotent_and_caps_workers(self):
        result = rv.init_queue(self.root)
        self.assertEqual(result["added"], 1)
        first = rv.claim("luna-1", 1, root=self.root)
        self.assertEqual(first, rv.claim("luna-1", 1, root=self.root))
        # Exercise the full shared worker limit and reject one extra claim.
        q = rv.load_queue(self.root)
        for n in range(2, rv.MAX_WORKERS + 2):
            ident = f"fund{n}.invalid"
            q["records"][ident] = {"fund_id": ident, "name": ident, "fingerprint": "x", "status": "queued", "worker": "", "role": "", "lease_until": 0, "attempts": 0}
        rv.save_queue(q, self.root)
        for n in range(2, rv.MAX_WORKERS + 1):
            rv.claim(f"luna-{n}", 1, root=self.root)
        with self.assertRaises(ValueError):
            rv.claim("luna-over-limit", 1, root=self.root)

    def test_review_release_moves_to_human_review_without_certifying(self):
        rv.init_queue(self.root)
        rv.claim("research-01", 1, root=self.root, fund_ids=[self.ident])
        self.assertEqual(rv.release("research-01", [self.ident], self.root), 1)
        q = rv.load_queue(self.root)
        self.assertEqual(q["records"][self.ident]["status"], "review_pending")
        rv.claim("validator-01", 1, role="review", root=self.root, fund_ids=[self.ident])
        self.accepted_review()
        self.assertEqual(rv.release("validator-01", [self.ident], self.root), 1)
        q = rv.load_queue(self.root)
        self.assertEqual(q["records"][self.ident]["status"], "human_review_pending")

    def test_benchmark_does_not_count_unresolved_or_unreviewed_cases(self):
        expanded = rv.benchmark(self.root, "spot-check-22-v1")
        self.assertEqual(expanded["total_cases"], 22)
        self.assertFalse(expanded["pass"])
        self.assertIn("detected_conflict_cases", expanded)
        result = rv.benchmark(self.root)
        self.assertFalse(result["pass"])
        case = next(x for x in result["cases"] if x["fund_id"] == "bvp.com")
        self.assertFalse(case["covered"])

    def test_invalid_json_shapes_and_nonfinite_capital_fail_closed(self):
        self.path.write_text("[]")
        self.assertEqual(rv.check_report(self.ident, self.root)["verdict"], "fail")
        self.report["capital"][0]["amount"] = float("nan")
        self.accepted_review()
        self.assertIn("capital.amount_invalid", self.issue_codes())
        self.assertFalse(rv._capital_assertion({"lower_bound": None}, "capital.lower_bound_gte", 10))

    def test_release_cannot_reuse_another_workers_attestation(self):
        rv.init_queue(self.root)
        rv.claim("research-01", 1, root=self.root)
        rv.release("research-01", root=self.root)
        rv.claim("different-validator", 1, role="review", root=self.root)
        self.accepted_review()  # Signed by validator-01, not the actual claimant.
        rv.release("different-validator", root=self.root)
        self.assertEqual(rv.load_queue(self.root)["records"][self.ident]["status"], "revise")

    def test_changed_catalog_resets_retry_budget(self):
        rv.init_queue(self.root)
        queue = rv.load_queue(self.root)
        queue["records"][self.ident].update(status="blocked", attempts=4, research_attempts=3)
        rv.save_queue(queue, self.root)
        path = self.root / rv.CATALOG
        catalog = json.loads(path.read_text())
        catalog["firms"][0]["name"] = "New name"
        path.write_text(json.dumps(catalog))
        rv.init_queue(self.root)
        record = rv.load_queue(self.root)["records"][self.ident]
        self.assertEqual(record["status"], "stale")
        self.assertEqual(record["attempts"], 0)


if __name__ == "__main__":
    unittest.main()
