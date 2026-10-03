import io
import json
import tempfile
import unittest
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from types import SimpleNamespace

from fundraising_buddy import catalog, shortlists, wiki
from fundraising_buddy.server import make_handler


class ShortlistTests(unittest.TestCase):
    def setUp(self):
        Path("tmp/tests").mkdir(parents=True, exist_ok=True)
        self.root = Path(tempfile.mkdtemp(dir="tmp/tests")).resolve()
        self.catalog = {"schema_version": 2, "firms": [
            {"id": "fund.invalid", "name": "Example Fund", "domain": "fund.invalid", "website": "https://fund.invalid",
             "record_level": "directory", "researched_at": "", "fields": {}, "evidence": {},
             "sources": ["https://fund.invalid"], "portfolio": []}
        ], "people": []}
        catalog.write_catalog(self.catalog, self.root / "data/public")
        wiki.init(self.root)

    def test_create_add_remove_rename_and_persistence(self):
        before = (self.root / "data/public/catalog.json").read_bytes()
        data = shortlists.mutate(self.root, {"action": "create", "revision": 0, "name": "Seed funds"})
        ident = data["changed_id"]
        data = shortlists.mutate(self.root, {"action": "add", "revision": 1, "id": ident, "firm_ids": ["fund.invalid", "fund.invalid"]})
        self.assertEqual(data["lists"][0]["firm_ids"], ["fund.invalid"])
        data = shortlists.mutate(self.root, {"action": "rename", "revision": 2, "id": ident, "name": "Robotics"})
        self.assertEqual(shortlists.read(self.root)["lists"][0]["name"], "Robotics")
        data = shortlists.mutate(self.root, {"action": "create", "revision": 3, "name": "Other", "firm_ids": ["fund.invalid"]})
        data = shortlists.mutate(self.root, {"action": "remove", "revision": 4, "id": ident, "firm_ids": ["fund.invalid"]})
        self.assertEqual(data["lists"][0]["firm_ids"], [])
        self.assertEqual(data["lists"][1]["firm_ids"], ["fund.invalid"])
        self.assertEqual((self.root / "data/public/catalog.json").read_bytes(), before)
        self.assertEqual(wiki.firm_rows(self.root), [])

    def test_validation_and_conflicts_preserve_data(self):
        shortlists.mutate(self.root, {"action": "create", "revision": 0, "name": "Seed"})
        before = shortlists.read(self.root)
        for body in [
            {"action": "create", "revision": 0, "name": "Stale"},
            {"action": "create", "revision": 1, "name": "seed"},
            {"action": "create", "revision": 1, "name": " "},
            {"action": "create", "revision": 1, "name": "x" * 101},
            {"action": "create", "revision": 1, "name": "Unknown", "firm_ids": ["unknown"]},
            {"action": "add", "revision": 1, "id": "../../config.json"},
            {"action": "remove", "revision": 1, "id": "missing", "firm_ids": "bad"},
        ]:
            with self.assertRaises(ValueError):
                shortlists.mutate(self.root, body)
            self.assertEqual(shortlists.read(self.root), before)

    def test_concurrent_writers_do_not_lose_updates(self):
        def save(name):
            try:
                shortlists.mutate(self.root, {"action": "create", "revision": 0, "name": name})
                return "saved"
            except shortlists.Conflict:
                return "conflict"
        with ThreadPoolExecutor(max_workers=2) as executor:
            results = list(executor.map(save, ["First", "Second"]))
        self.assertCountEqual(results, ["saved", "conflict"])
        self.assertEqual(len(shortlists.read(self.root)["lists"]), 1)

    def test_symlink_refused(self):
        (self.root / "workspace/shortlists").symlink_to(self.root / "workspace/raw", target_is_directory=True)
        with self.assertRaises(ValueError):
            shortlists.read(self.root)

    def test_http_security_validation_and_write(self):
        Handler = make_handler(self.root)
        handler = Handler.__new__(Handler)
        handler.server = SimpleNamespace(server_port=10015)
        output = []
        handler.respond = lambda body, content_type="application/json", status=200: output.append((status, json.loads(body)))
        handler.headers = {"Host": "127.0.0.1:10015"}
        handler.path = "/api/shortlists"
        handler.do_GET()
        token = output[-1][1]["token"]
        body = json.dumps({"action": "create", "revision": 0, "name": "Browser list"}).encode()
        headers = {"Host": "127.0.0.1:10015", "Origin": "http://127.0.0.1:10015",
                   "X-Shortlist-Token": token, "Content-Type": "application/json", "Content-Length": str(len(body))}
        for key, value in [("Host", "evil.invalid"), ("Origin", "http://evil.invalid"),
                           ("X-Shortlist-Token", "bad"), ("Origin", "null"), ("Origin", "")]:
            handler.headers = {**headers, key: value}
            handler.rfile = io.BytesIO(body)
            handler.do_POST()
            self.assertEqual(output[-1][0], 403)
        handler.headers = {**headers, "Content-Length": "300000"}
        handler.do_POST()
        self.assertEqual(output[-1][0], 413)
        handler.headers = headers
        handler.rfile = io.BytesIO(body)
        handler.do_POST()
        self.assertEqual(output[-1][0], 200)
        self.assertEqual(output[-1][1]["lists"][0]["name"], "Browser list")
        handler.rfile = io.BytesIO(body)
        handler.do_POST()
        self.assertEqual(output[-1][0], 409)


if __name__ == "__main__":
    unittest.main()
