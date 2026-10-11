import copy
import unittest

from fundraising_buddy import catalog
from tools import jev_leads
from tools.import_public import LEADS_MAP

FIRM = {"id": "fund.invalid", "name": "Fund", "domain": "fund.invalid", "website": "https://fund.invalid",
        "record_level": "sourced", "researched_at": "2026-10-01", "fields": {"leads_rounds": "yes"},
        "sources": ["https://fund.invalid"], "evidence": {"leads_rounds": {"url": "https://fund.invalid", "as_of": ""}},
        "portfolio": []}


class LeadsTests(unittest.TestCase):
    def errors(self, value):
        firm = copy.deepcopy(FIRM)
        firm["fields"]["leads_rounds"] = value
        return catalog.validate({"schema_version": 2, "firms": [firm], "people": []})

    def test_only_four_options_validate(self):
        for ok in ("yes", "no", "maybe", "unknown"):
            self.assertEqual(self.errors(ok), [], ok)
        for bad in ("sometimes", "lead", "follow", "Yes", "", True, ["yes"]):
            self.assertTrue(self.errors(bad), bad)

    def test_import_mapping_lands_on_the_four_options(self):
        self.assertTrue(set(LEADS_MAP.values()) <= catalog.LEADS_OPTIONS)
        self.assertEqual((LEADS_MAP["sometimes"], LEADS_MAP["follow"], LEADS_MAP["co-lead"]), ("maybe", "no", "yes"))

    def test_jev_leads_offline_check(self):
        jev_leads.self_check()


if __name__ == "__main__":
    unittest.main()
