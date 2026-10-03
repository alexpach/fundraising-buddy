"""Private viewer with narrowly scoped shortlist writes and indexed Markdown reads."""
from __future__ import annotations

import html
import json
import re
import secrets
from datetime import date
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, quote, urlsplit

import bleach
import markdown
import yaml

from . import prospects, shortlists
from .catalog import load, public_pages
from .wiki import firm_rows, read_page, split_frontmatter

STATIC = Path(__file__).parent / "static"


def render(body: str):
    def link(match):
        target, _, label = match.group(1).partition("|")
        target = target.removesuffix(".md")
        key = target if target.startswith("public/") else "private/" + target
        return f"[{label or target}](#page={quote(key, safe='')})"
    body = re.sub(r"\[\[([^\]]+)\]\]", link, body)
    rendered = markdown.markdown(body, extensions=["tables", "fenced_code", "nl2br"])
    # No images, scripts, style, embeds, event handlers or remote asset requests.
    return bleach.clean(rendered, tags={"p", "br", "hr", "h1", "h2", "h3", "h4", "ul", "ol", "li",
        "strong", "em", "a", "blockquote", "pre", "code", "table", "thead", "tbody", "tr", "th", "td"},
        attributes={"a": ["href", "title"]}, protocols={"http", "https"}, strip=True)


def page_index(root: Path):
    data = load(root)
    def with_properties(meta, body):
        if meta:
            body += "\n\n## Properties\n\n" + "\n".join(
                f"- **{html.escape(str(k))}:** {html.escape(str(v))}" for k, v in meta.items())
        return body
    pages = {"public/" + k: with_properties(*split_frontmatter(v)) for k, v in public_pages(data).items()}
    pages.update({"private/prospect-lists/" + s["id"]: prospects.markdown(s) for s in prospects.lists(root)})
    base = root / "workspace/wiki"
    for path in base.rglob("*.md"):
        if path.is_symlink() or not path.resolve().is_relative_to(base.resolve()):
            continue
        key = "private/" + str(path.relative_to(base).with_suffix(""))
        if key in pages:
            raise ValueError("Private wiki page collides with generated shortlist")
        pages[key] = with_properties(*read_page(path))
    return data, pages


def make_handler(root: Path):
    csrf_token = secrets.token_urlsafe(32)
    class Handler(BaseHTTPRequestHandler):
        def log_message(self, *_):
            pass  # Avoid writing private page names to a request log.

        def respond(self, body, content_type="application/json", status=200):
            nonce = secrets.token_urlsafe(24)
            if content_type == "text/html":
                body = body.replace("{{STYLE_NONCE}}", nonce)
            payload = body.encode()
            self.send_response(status)
            self.send_header("Content-Type", content_type + "; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("Referrer-Policy", "no-referrer")
            self.send_header("Content-Security-Policy", f"default-src 'self'; script-src 'self'; style-src 'self' 'nonce-{nonce}'; img-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'")
            try:
                self.end_headers()
                self.wfile.write(payload)
            except (BrokenPipeError, ConnectionResetError):
                pass  # Navigation may cancel a response; never try a second response.

        def do_GET(self):
            allowed = {f"127.0.0.1:{self.server.server_port}", f"localhost:{self.server.server_port}"}
            if self.headers.get("Host") not in allowed:
                return self.respond('{"error":"Local requests only"}', status=403)
            u = urlsplit(self.path)
            static = {"/": "index.html", "/app.js": "app.js", "/style.css": "style.css", "/favicon.svg": "favicon.svg"}
            if u.path in static:
                name = static[u.path]
                mime = {"html": "text/html", "js": "text/javascript", "css": "text/css", "svg": "image/svg+xml"}[name.split(".")[-1]]
                return self.respond((STATIC / name).read_text(), mime)
            try:
                if u.path == "/api/shortlists":
                    return self.respond(json.dumps({**shortlists.read(root), "token": csrf_token}))
                if u.path == "/api/prospects":
                    profile = prospects.criteria(root)
                    try:
                        rows = prospects.match(load(root), profile)
                        message = ""
                    except ValueError as exc:
                        rows, message = [], str(exc)
                    return self.respond(json.dumps({"criteria": profile, "rows": rows,
                                                    "lists": prospects.lists(root), "message": message}))
                data, pages = page_index(root)
                if u.path == "/api/catalog":
                    return self.respond(json.dumps({**data, "private_firms": firm_rows(root),
                        "pages": [{"id": k, "title": next((x[2:] for x in v.splitlines() if x.startswith("# ")), k)} for k, v in pages.items()],
                        "today": date.today().isoformat()}, default=str))
                if u.path == "/api/page":
                    key = parse_qs(u.query).get("id", [""])[0]
                    if key in pages:
                        return self.respond(json.dumps({"html": render(pages[key])}))
                    return self.respond('{"error":"Page not found"}', status=404)
            except (ValueError, OSError, yaml.YAMLError):
                return self.respond('{"error":"Cannot load wiki. Run lint in the terminal."}', status=500)
            return self.respond('{"error":"Not found"}', status=404)
        def do_POST(self):
            host = self.headers.get("Host", "")
            allowed = {f"127.0.0.1:{self.server.server_port}", f"localhost:{self.server.server_port}"}
            if (host not in allowed or self.headers.get("Origin") != f"http://{host}"
                    or not secrets.compare_digest(self.headers.get("X-Shortlist-Token", ""), csrf_token)):
                return self.respond('{"error":"Invalid request origin or session. Reload the page."}', status=403)
            if self.path != "/api/shortlists":
                return self.respond('{"error":"Not found"}', status=404)
            if self.headers.get("Content-Type", "").split(";")[0] != "application/json":
                return self.respond('{"error":"Expected JSON"}', status=415)
            try:
                length = int(self.headers.get("Content-Length", "0"))
                if length <= 0 or length > 262144:
                    return self.respond('{"error":"Invalid request size"}', status=413)
                body = json.loads(self.rfile.read(length))
                result = shortlists.mutate(root, body)
                return self.respond(json.dumps({**result, "token": csrf_token}))
            except shortlists.Conflict as exc:
                return self.respond(json.dumps({"error": str(exc)}), status=409)
            except (ValueError, UnicodeError) as exc:
                return self.respond(json.dumps({"error": str(exc)}), status=400)
            except OSError:
                return self.respond('{"error":"Cannot save shortlist. Check the writable shortlist mount."}', status=500)

    return Handler


def serve(root: Path, port=10013, container=False):
    if container and not Path("/.dockerenv").is_file():
        raise ValueError("--container is only allowed inside Docker; use the localhost default on the host")
    # Docker must listen on its network interface; Compose publishes only host loopback.
    host = "0.0.0.0" if container else "127.0.0.1"
    server = ThreadingHTTPServer((host, port), make_handler(root))
    print(f"Fundraising Buddy: http://127.0.0.1:{server.server_port}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
