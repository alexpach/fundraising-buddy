import unittest

from tools.migrate_legacy_fields import extras, section

BODY = """
## About

Inovia is a venture firm founded in 2007.

## Notable Investments

- **Hopper** — travel-booking app
- League

## Notes

- **Source**: F6S, private fit commentary
"""


class ExtrasTests(unittest.TestCase):
    def firm(self, level="directory"):
        return {"record_level": level, "fields": {}, "evidence": {}, "portfolio": []}

    def test_section_stops_at_next_heading(self):
        self.assertNotIn("Hopper", section(BODY, "About"))
        self.assertNotIn("F6S", section(BODY, "Notable Investments"))

    def test_adds_about_and_portfolio_to_directory_only(self):
        fm = {"website": "https://inovia.vc", "updated": "2026-04-20"}
        f = self.firm()
        self.assertTrue(extras(f, fm, BODY, []))
        self.assertEqual([p["company"] for p in f["portfolio"]], ["Hopper", "League"])
        self.assertEqual(f["evidence"]["about"], {"url": "https://inovia.vc", "as_of": "2026-04-20"})
        self.assertFalse(extras(self.firm("sourced"), fm, BODY, []))

    def test_private_terms_are_dropped(self):
        f = self.firm()
        extras(f, {"website": "https://inovia.vc"}, BODY, ["founded in 2007"])
        self.assertNotIn("about", f["fields"])


if __name__ == "__main__":
    unittest.main()
