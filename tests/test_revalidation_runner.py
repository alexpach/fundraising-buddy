import asyncio
import copy
import io
import types
import unittest
import tempfile
from pathlib import Path
from unittest.mock import AsyncMock, patch

from tools import run_revalidation as runner
from tools import jev_leads


class RunnerTests(unittest.TestCase):
    def test_fresh_worker_prompt_is_scoped_and_demands_independent_review(self):
        prompt = runner.prompt_for("review-2", "review", [{"fund_id": "fund.invalid"}])
        self.assertIn("review-2", prompt)
        self.assertIn("fund.invalid", prompt)
        self.assertIn("Do not edit code, catalog", prompt)
        self.assertIn("Never fabricate", prompt)
        self.assertEqual(runner.MODEL, "gpt-6-luna")

    def test_attempt_cap_preserves_completed_reports_and_active_claims(self):
        queue = {"records": {
            "bad": {"status": "revise", "attempts": 4},
            "good": {"status": "human_review_pending", "attempts": 4},
            "active": {"status": "claimed", "attempts": 4},
        }}
        with patch.object(runner.audit, "locked"), patch.object(runner.audit, "load_queue", return_value=queue), patch.object(runner.audit, "save_queue") as save:
            runner.cap_retries()
        self.assertEqual(queue["records"]["bad"]["status"], "blocked")
        self.assertEqual(queue["records"]["good"]["status"], "human_review_pending")
        self.assertEqual(queue["records"]["active"]["status"], "claimed")
        save.assert_called_once_with(queue)

    def test_successful_process_without_report_is_not_successful_work(self):
        Path("tmp/tests").mkdir(parents=True, exist_ok=True)
        base = Path(tempfile.mkdtemp(dir="tmp/tests"))
        with patch.object(runner, "BASE", base), patch.object(runner.subprocess, "run", return_value=types.SimpleNamespace(returncode=0)), patch.object(runner.audit, "release") as release:
            result = runner.execute_job("worker-01", "research", [{"fund_id": "fund.invalid"}], 10)
        self.assertEqual(result["exit_code"], 0)
        self.assertFalse(result["artifact_written"])
        release.assert_called_once_with("worker-01", ["fund.invalid"])

    def test_legacy_lead_judgments_do_not_mutate_or_write_catalog(self):
        data = {"firms": [{"id": "fund.invalid", "fields": {"leads_rounds": "yes"}}], "people": []}
        original = copy.deepcopy(data)

        class Client:
            async def __aenter__(self):
                return self

            async def __aexit__(self, *args):
                return False

        module = types.ModuleType("typesafe_sdk")
        module.AsyncTypeSafeClient = Client
        with patch.dict("sys.modules", {"typesafe_sdk": module}), patch.object(jev_leads, "load", return_value=data), patch.object(jev_leads, "judge", new=AsyncMock(return_value={"label": "no"})), patch.object(jev_leads, "write_catalog") as write, patch.object(jev_leads, "CACHE"), patch("sys.stdout", new=io.StringIO()), patch("sys.stderr", new=io.StringIO()):
            asyncio.run(jev_leads.run(None, 1))
        self.assertEqual(data, original)
        write.assert_not_called()


if __name__ == "__main__":
    unittest.main()
