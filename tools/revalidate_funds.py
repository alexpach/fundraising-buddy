#!/usr/bin/env python3
"""Private, resumable fund revalidation queue and mechanical report checker.

This tool never writes the public catalog or private wiki. Run from project root.
"""
from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import math
import os
import re
import sys
import time
from contextlib import contextmanager
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path.cwd()
CATALOG = Path("data/public/catalog.json")
QUEUE = Path("workspace/revalidation/queue.json")
REPORTS = Path("workspace/revalidation/reports")
CACHE = Path("workspace/revalidation/cache")
MAX_WORKERS = 12
MAX_RESEARCH_ATTEMPTS = 3
LEASE_SECONDS = 6 * 60 * 60
VALID_DISPOSITIONS = {"corrected", "supported", "unknown", "conflict", "unresolved"}
DATE_RE = re.compile(r"^\d{4}(?:-\d{2}(?:-\d{2})?)?$")
CHECK_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
ID_RE = re.compile(r"^[a-z0-9][a-z0-9._-]*$")

# The benchmark encodes issue classes and expected dispositions from the owner's
# twelve-firm review. Values below are checks in the benchmark only; workers still
# research every claim from cache and sources, and the production catalog is untouched.
def _b(field: str, code: str, dispositions: tuple[str, ...] = ("corrected",), *, assertions: dict | None = None, capital_metric: str = "", allow_unresolved: bool = False) -> dict:
    return {"field": field, "code": code, "dispositions": dispositions,
            "assertions": assertions or {}, "capital_metric": capital_metric,
            "allow_unresolved": allow_unresolved}


BENCHMARK = {
    # The supplied article says fund assets, not unambiguously firm-wide AUM.
    # Test preservation of the dated observation instead of requiring that inference.
    "affinitypartners.com": [_b("classification", "classification.strategy_coverage"), _b("capital", "capital.metric_scope_date", ("corrected", "supported"), assertions={"capital.amount_gte": 6200000000, "capital.as_of_year": "2025"})],
    "anderapartners.com": [_b("stages", "stages.coverage"), _b("lead", "lead.co_lead_support", assertions={"lead.value": "yes"}), _b("capital", "capital.currency_metric", ("corrected", "supported"))],
    "bdc.ca": [_b("classification", "classification.type_strategy"), _b("stages", "stages.coverage"), _b("lead", "lead.co_lead_support", assertions={"lead.value": "yes"}), _b("capital", "capital.comparability", ("unknown", "corrected"))],
    "sagemount.com": [_b("capital", "capital.metric_scope_date", ("corrected", "supported"), capital_metric="capital_raised")],
    "htgc.com": [_b("classification", "classification.debt_vs_equity", assertions={"classification.strategies_contains": ["venture debt"]}), _b("stages", "stages.instrument_inference"), _b("sectors", "sectors.coverage")],
    "silversmith.com": [_b("lead", "lead.observed_co_lead", assertions={"lead.value": "yes"}), _b("sectors", "sectors.coverage", assertions={"sectors.contains": ["healthcare"]}), _b("capital", "capital.metric_scope_date")],
    "standardinvestments.com": [_b("identity", "identity.scope", ("corrected", "supported", "conflict", "unresolved"), allow_unresolved=True, assertions={"identity.relationship": "unresolved"}), _b("classification", "classification.strategy_coverage", assertions={"classification.strategies_min": 2}), _b("lead", "lead.observed_activity", assertions={"lead.value": "yes"}), _b("capital", "capital.unsupported", ("unknown", "corrected"))],
    "westerntech.com": [_b("classification", "classification.debt_vs_equity", assertions={"classification.instruments_contains": ["debt"]}), _b("stages", "stages.support", ("unknown", "corrected")), _b("capital", "capital.unsupported", ("unknown", "corrected"))],
    "zimmerpartners.com": [_b("identity", "identity.entity_conflict", ("conflict", "unresolved"), allow_unresolved=True, assertions={"identity.relationship": "unresolved"}), _b("classification", "classification.type_conflict", ("conflict", "unresolved"), allow_unresolved=True)],
    "algebris.com": [_b("classification", "classification.strategy_coverage", assertions={"classification.strategies_min": 2}), _b("capital", "capital.metric_scope_date", ("corrected", "supported"), capital_metric="aum")],
    "avenuecapital.com": [_b("classification", "classification.credit_strategy"), _b("capital", "capital.metric_scope_date", ("corrected", "supported", "conflict"))],
    "bvp.com": [_b("lead", "lead.observed_activity", assertions={"lead.value": "yes"}), _b("capital", "capital.metric_scope_date", ("corrected", "supported"), capital_metric="aum")],
}
SECOND_BENCHMARK = {
    "01ventures.com": [_b("sectors", "sectors.coverage", assertions={"sectors.contains": ["deep-tech"]}), _b("lead", "lead.observed_activity", assertions={"lead.value": "yes"})],
    "2bx.vc": [_b("stages", "stages.coverage", assertions={"stages.contains": ["pre-seed", "seed"]}), _b("sectors", "sectors.coverage", assertions={"sectors.contains": ["urban"]})],
    "3m.com": [_b("identity", "identity.current_name", ("corrected", "supported", "unresolved"), allow_unresolved=True, assertions={"identity.resolved_name": "3M Ventures"}), _b("classification", "classification.type_strategy", assertions={"classification.type_contains": ["corporate"]})],
    "8vc.com": [_b("stages", "stages.coverage", assertions={"stages.contains": ["seed"]}), _b("lead", "lead.observed_activity", assertions={"lead.value": "yes"}), _b("capital", "capital.source_quality", ("unknown", "corrected"))],
    "9yardscapital.com": [_b("stages", "stages.coverage", assertions={"stages.contains": ["growth"]})],
    "coatue.com": [_b("classification", "classification.strategy_coverage", assertions={"classification.strategies_min": 2}), _b("capital", "capital.metric_scope_date", ("corrected", "supported"), assertions={"capital.lower_bound_gte": 73000000000, "capital.as_of_year": "2025"}, capital_metric="aum")],
    "eclipse.capital": [_b("stages", "stages.coverage", assertions={"stages.contains_any": ["early", "seed"]}), _b("lead", "lead.observed_activity", assertions={"lead.value": "yes"})],
    "lsvp.com": [_b("stages", "stages.coverage", assertions={"stages.contains": ["seed"], "stages.contains_any": ["late", "growth", "series F"]}), _b("lead", "lead.observed_activity", assertions={"lead.value": "yes"}), _b("capital", "capital.bound_semantics", ("corrected", "supported"), assertions={"capital.lower_bound_gte": 40000000000}, capital_metric="aum")],
    "nea.com": [_b("stages", "stages.coverage", assertions={"stages.contains": ["seed", "ipo"]}), _b("lead", "lead.observed_activity", assertions={"lead.value": "yes"}), _b("capital", "capital.metric_scope_date", ("corrected", "supported"), assertions={"capital.lower_bound_gte": 27000000000, "capital.as_of_year": "2024"}, capital_metric="aum")],
    "novoholdings.dk": [_b("classification", "classification.holding_company", assertions={"classification.type_contains": ["holding"]}), _b("capital", "capital.metric_quote_mismatch", ("corrected", "supported"), assertions={"capital.amount_gte": 93000000000, "capital.currency": "EUR"}, capital_metric="total_assets")],
}
BENCHMARKS = {"spot-check-12-v1": BENCHMARK, "spot-check-22-v1": BENCHMARK | SECOND_BENCHMARK}


def now() -> str:
    return dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")


def canonical_hash(obj: object) -> str:
    raw = json.dumps(obj, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode()
    return hashlib.sha256(raw).hexdigest()


def report_hash(report: dict) -> str:
    base = dict(report)
    base.pop("independent_review", None)
    return canonical_hash(base)


def read_catalog(root: Path = ROOT) -> dict:
    return json.loads((root / CATALOG).read_text())


def fund_map(root: Path = ROOT) -> dict[str, dict]:
    data = read_catalog(root)
    return {f["id"]: f for f in data.get("firms", []) if isinstance(f, dict) and isinstance(f.get("id"), str)}


def fingerprint(fund_id: str, root: Path = ROOT) -> str:
    funds = fund_map(root)
    if fund_id not in funds:
        raise ValueError(f"Unknown fund ID: {fund_id}")
    return canonical_hash(funds[fund_id])


def valid_id(value: str) -> bool:
    return bool(ID_RE.fullmatch(value))


@contextmanager
def locked(root: Path = ROOT):
    import fcntl
    lock_path = root / "workspace/revalidation/.queue.lock"
    lock_path.parent.mkdir(parents=True, exist_ok=True)
    with lock_path.open("a+") as fp:
        fcntl.flock(fp.fileno(), fcntl.LOCK_EX)
        try:
            yield
        finally:
            fcntl.flock(fp.fileno(), fcntl.LOCK_UN)


def load_queue(root: Path = ROOT) -> dict:
    path = root / QUEUE
    if not path.exists():
        return {"schema_version": 1, "records": {}}
    data = json.loads(path.read_text())
    if data.get("schema_version") != 1 or not isinstance(data.get("records"), dict):
        raise ValueError("Invalid revalidation queue")
    return data


def save_queue(data: dict, root: Path = ROOT) -> None:
    path = root / QUEUE
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    os.replace(tmp, path)


def init_queue(root: Path = ROOT) -> dict:
    with locked(root):
        queue = load_queue(root)
        funds = fund_map(root)
        records = queue["records"]
        added = 0
        for ident, fund in funds.items():
            current = canonical_hash(fund)
            rec = records.get(ident)
            if rec is None:
                records[ident] = {"fund_id": ident, "name": fund.get("name", ""), "fingerprint": current,
                                  "status": "queued", "worker": "", "lease_until": 0, "attempts": 0, "research_attempts": 0, "review_attempts": 0,
                                  "created_at": now(), "updated_at": now()}
                added += 1
            else:
                rec["name"] = fund.get("name", "")
                if rec.get("fingerprint") != current:
                    rec.update(fingerprint=current, status="stale", worker="", lease_until=0,
                               attempts=0, research_attempts=0, review_attempts=0, updated_at=now())
        for ident, rec in records.items():
            if ident not in funds:
                rec.update(status="retired", worker="", lease_until=0, updated_at=now())
        save_queue(queue, root)
        return {"total": len(records), "added": added}


def claim(worker: str, limit: int, role: str = "research", fund_ids: list[str] | None = None, root: Path = ROOT) -> list[dict]:
    if not worker.strip():
        raise ValueError("worker ID is required")
    if limit < 1 or limit > 100:
        raise ValueError("claim limit must be between 1 and 100")
    if role not in {"research", "review"}:
        raise ValueError("role must be research or review")
    with locked(root):
        queue = load_queue(root)
        records = queue["records"]
        ts = time.time()
        active = {r.get("worker") for r in records.values() if r.get("status") == "claimed" and r.get("lease_until", 0) > ts}
        for r in records.values():
            if r.get("status") == "claimed" and r.get("lease_until", 0) <= ts:
                expired_status = "review_pending" if r.get("role") == "review" else "queued"
                r.update(status=expired_status, worker="", role="", lease_until=0, updated_at=now())
        if worker not in active and len(active) >= MAX_WORKERS:
            raise ValueError(f"maximum {MAX_WORKERS} active workers reached")
        # A retry by the same worker is idempotent and returns its extant claims first.
        existing = [r for r in records.values() if r.get("status") == "claimed" and r.get("worker") == worker and r.get("role", "research") == role]
        if existing:
            return [{"fund_id": r["fund_id"], "name": r["name"], "fingerprint": r["fingerprint"]} for r in existing]
        eligible = {"queued", "stale", "revise"} if role == "research" else {"review_pending"}
        selected = set(fund_ids or [])
        if any(not valid_id(ident) for ident in selected):
            raise ValueError("invalid fund ID filter")
        candidates = [r for ident, r in records.items() if r.get("status") in eligible
                      and (role != "research" or int(r.get("research_attempts", 0)) < MAX_RESEARCH_ATTEMPTS)
                      and (not selected or ident in selected)]
        claimed = []
        for rec in candidates[:limit]:
            rec.update(status="claimed", worker=worker, role=role, lease_until=ts + LEASE_SECONDS,
                       attempts=int(rec.get("attempts", 0)) + 1, updated_at=now())
            attempt_key = "research_attempts" if role == "research" else "review_attempts"
            rec[attempt_key] = int(rec.get(attempt_key, 0)) + 1
            claimed.append({"fund_id": rec["fund_id"], "name": rec["name"], "fingerprint": rec["fingerprint"]})
        save_queue(queue, root)
        return claimed


def release(worker: str, fund_ids: list[str] | None = None, root: Path = ROOT) -> int:
    with locked(root):
        queue = load_queue(root)
        wanted = set(fund_ids or [])
        count = 0
        for ident, rec in queue["records"].items():
            if rec.get("status") == "claimed" and rec.get("worker") == worker and (not wanted or ident in wanted):
                report_path = root / REPORTS / f"{ident}.json"
                try:
                    report = json.loads(report_path.read_text())
                    if not isinstance(report, dict):
                        report = {}
                except (OSError, ValueError):
                    report = {}
                if rec.get("role", "research") == "research":
                    if report.get("worker") == worker:
                        status = "review_pending"
                    else:
                        status = "blocked" if int(rec.get("research_attempts", 0)) >= MAX_RESEARCH_ATTEMPTS else "queued"
                else:
                    result = check_report(ident, root) if report_path.exists() else {"verdict": "fail"}
                    review = report.get("independent_review") or {}
                    if result.get("verdict") == "pass" and isinstance(review, dict) and review.get("reviewer") == worker:
                        status = "human_review_pending"
                    else:
                        status = "revise" if int(rec.get("research_attempts", 0)) < MAX_RESEARCH_ATTEMPTS else "blocked"
                rec.update(status=status, worker="", role="", lease_until=0, updated_at=now())
                count += 1
        save_queue(queue, root)
        return count


def evidence_issues(evidence: object, fund_id: str, root: Path, field: str) -> list[dict]:
    issues = []
    if not isinstance(evidence, dict):
        return [{"field": field, "code": "evidence.missing", "detail": "Evidence object is required"}]
    url, as_of, cache, quote = (evidence.get(k) for k in ("url", "as_of", "cache", "quote"))
    if not isinstance(url, str) or urlsplit(url).scheme not in {"http", "https"} or not urlsplit(url).hostname:
        issues.append({"field": field, "code": "evidence.url_invalid", "detail": "Valid HTTP(S) source URL required"})
    if not isinstance(as_of, str) or (as_of and not DATE_RE.fullmatch(as_of)):
        issues.append({"field": field, "code": "evidence.date_invalid", "detail": "Source as_of must be YYYY, YYYY-MM, YYYY-MM-DD, or empty"})
    elif not as_of:
        issues.append({"field": field, "code": "evidence.date_missing", "detail": "Source date is not recorded", "severity": "warning"})
    if isinstance(as_of, str) and as_of and DATE_RE.fullmatch(as_of):
        try:
            if int(as_of[:4]) < dt.date.today().year - 3:
                issues.append({"field": field, "code": "evidence.date_old", "detail": "Source evidence is more than three years old", "severity": "warning"})
        except ValueError:
            pass
    if not isinstance(cache, str):
        issues.append({"field": field, "code": "evidence.cache_missing", "detail": "Cached source path required"})
        return issues
    p = Path(cache)
    expected = (Path("workspace/revalidation/cache") / fund_id)
    try:
        if p.is_absolute() or ".." in p.parts or p.parts[:len(expected.parts)] != expected.parts:
            raise ValueError
        full = (root / p).resolve(strict=True)
        workspace_root = (root / "workspace").resolve(strict=True)
        managed_root = (root / "workspace/revalidation").resolve(strict=True)
        managed_root.relative_to(workspace_root)
        cache_root = (root / CACHE).resolve(strict=True)
        cache_root.relative_to(managed_root)
        safe_root = (root / expected).resolve(strict=True)
        safe_root.relative_to(cache_root)
        full.relative_to(safe_root)
        if not full.is_file():
            raise ValueError
        rel = full.relative_to(safe_root).as_posix()
        manifest_path = safe_root / "manifest.json"
        manifest = json.loads(manifest_path.read_text())
        entries = manifest if isinstance(manifest, list) else manifest.get("sources", [])
        common_retrieved = manifest.get("retrieved_at", "") if isinstance(manifest, dict) else ""
        mapped = [entry for entry in entries if isinstance(entry, dict) and entry.get("file") == rel and entry.get("url") == url]
        retrieved = any(entry.get("retrieved_at", entry.get("fetched_at", common_retrieved)) for entry in mapped)
        if not retrieved:
            issues.append({"field": field, "code": "evidence.manifest_mapping_missing", "detail": "Cache manifest must map this file to the cited URL and retrieval date"})
        content = full.read_text(errors="replace")
    except (ValueError, OSError, RuntimeError, TypeError, AttributeError):
        issues.append({"field": field, "code": "evidence.cache_unsafe_or_missing", "detail": "Cache must be an existing file beneath this fund's cache directory"})
        return issues
    if not isinstance(quote, str) or len(quote.strip()) < 12:
        issues.append({"field": field, "code": "evidence.quote_missing", "detail": "A direct quote of at least 12 characters is required"})
    elif quote not in content:
        issues.append({"field": field, "code": "evidence.quote_not_found", "detail": "Quote is not present verbatim in the cached source"})
    return issues


def _check_supported_list(values: object, evidence: object, field: str, fund_id: str, root: Path) -> list[dict]:
    issues = []
    if not isinstance(values, list) or any(not isinstance(x, str) or not x.strip() for x in values):
        return [{"field": field, "code": f"{field}.shape", "detail": "Expected a list of non-empty strings"}]
    if values and (not isinstance(evidence, list) or not evidence):
        return [{"field": field, "code": f"{field}.item_evidence_missing", "detail": "Each listed item must be supported by the supplied source evidence"}]
    supported = set()
    for ev in evidence or []:
        if not isinstance(ev, dict) or not isinstance(ev.get("supports"), list):
            issues.append({"field": field, "code": f"{field}.support_mapping_missing", "detail": "Evidence must name the exact list items it supports"})
        else:
            supported.update(str(x) for x in ev["supports"])
        issues.extend(evidence_issues(ev, fund_id, root, field))
    for item in values:
        if item not in supported:
            issues.append({"field": field, "code": f"{field}.item_unsupported", "detail": f"No evidence is mapped to listed item {item!r}"})
    return issues


def _check_sectors(value: object, fund_id: str, root: Path) -> list[dict]:
    issues = []
    if not isinstance(value, list):
        return [{"field": "sectors", "code": "sectors.shape", "detail": "Expected a list"}]
    for idx, item in enumerate(value):
        label = f"sectors[{idx}]"
        if not isinstance(item, dict) or not isinstance(item.get("value"), str) or not item["value"].strip():
            issues.append({"field": label, "code": "sectors.item_invalid", "detail": "Sector item needs a value and evidence"})
            continue
        evidence = item.get("evidence")
        if not isinstance(evidence, list) or not evidence:
            issues.append({"field": label, "code": "sectors.item_evidence_missing", "detail": "Every sector label needs its own supporting evidence"})
            continue
        for ev in evidence:
            if not isinstance(ev, dict) or item["value"] not in (ev.get("supports") or []):
                issues.append({"field": label, "code": "sectors.item_support_mapping_missing", "detail": "Sector evidence must explicitly map to this label"})
            issues.extend(evidence_issues(ev, fund_id, root, label))
    return issues


def check_report(fund_id: str, root: Path = ROOT) -> dict:
    try:
        return _check_report(fund_id, root)
    except (TypeError, AttributeError, KeyError, ValueError) as exc:
        return {"fund_id": fund_id, "verdict": "fail", "issues": [
            {"field": "report", "code": "report.invalid_structure", "detail": str(exc)}]}


def _check_report(fund_id: str, root: Path = ROOT) -> dict:
    if not valid_id(fund_id):
        return {"fund_id": fund_id, "verdict": "fail", "issues": [{"field": "fund_id", "code": "report.id_invalid", "detail": "Invalid fund ID"}]}
    path = root / REPORTS / f"{fund_id}.json"
    try:
        report_root = (root / REPORTS).resolve(strict=True)
        report_root.relative_to((root / "workspace/revalidation").resolve(strict=True))
        path = (report_root / f"{fund_id}.json").resolve(strict=True)
        path.relative_to(report_root)
    except (ValueError, OSError, RuntimeError):
        return {"fund_id": fund_id, "verdict": "fail", "issues": [{"field": "report", "code": "report.path_unsafe", "detail": "Report must remain under workspace/revalidation/reports"}]}
    issues = []
    def add(field, code, detail):
        issues.append({"field": field, "code": code, "detail": detail})
    try:
        report = json.loads(path.read_text())
    except (OSError, ValueError) as exc:
        return {"fund_id": fund_id, "verdict": "fail", "issues": [{"field": "report", "code": "report.unreadable", "detail": str(exc)}]}
    try:
        current = fingerprint(fund_id, root)
    except (OSError, ValueError, KeyError) as exc:
        add("fund_id", "catalog.unavailable", str(exc))
        current = ""
    if report.get("schema_version") != 1 or report.get("fund_id") != fund_id:
        add("report", "report.schema_or_id", "schema_version must be 1 and fund_id must match file name")
    if report.get("fingerprint") != current:
        add("fingerprint", "report.stale_fingerprint", "Catalog record changed since this report was started")
    worker = report.get("worker")
    if not isinstance(worker, str) or not worker.strip():
        add("worker", "report.worker_missing", "Worker ID required")
    if not isinstance(report.get("checked_at"), str) or not CHECK_DATE_RE.fullmatch(report["checked_at"]):
        add("checked_at", "report.date_invalid", "checked_at must use YYYY-MM-DD")
    identity = report.get("identity") or {}
    if identity.get("relationship") not in {"same_entity", "rebrand", "affiliate", "distinct", "unresolved"}:
        add("identity.relationship", "identity.relationship_missing", "Resolve relationship or explicitly mark unresolved")
    if not identity.get("resolved_name") or not identity.get("resolved_domain"):
        add("identity", "identity.resolution_missing", "Resolved name and domain are required, or mark unresolved with the best-known candidate")
    elif identity.get("relationship") not in {"unresolved", "distinct"}:
        ident_tokens = {t.lower() for t in re.findall(r"[a-zA-Z]{4,}", identity["resolved_name"])}
        evs = identity.get("evidence", [])
        corpus = " ".join([str(e.get("quote", "")) + " " + str(e.get("url", "")) for e in evs if isinstance(e, dict)]).lower()
        if ident_tokens and not any(t in corpus for t in ident_tokens):
            add("identity", "identity.quote_name_mismatch", "Identity evidence does not visibly mention the resolved firm; verify entity match")
    stage = report.get("stages") or {}
    issues.extend(_check_supported_list(stage.get("value"), stage.get("evidence"), "stages", fund_id, root))
    classification = report.get("classification") or {}
    for key in ("type", "strategies", "structure", "instruments"):
        issues.extend(_check_supported_list(classification.get(key), classification.get("evidence"), f"classification.{key}", fund_id, root))
    issues.extend(_check_sectors(report.get("sectors"), fund_id, root))
    for section in ("identity", "classification"):
        evidence = (report.get(section) or {}).get("evidence", [])
        if not evidence:
            add(section, "evidence.section_missing", "Section needs evidence")
        for ev in evidence:
            issues.extend(evidence_issues(ev, fund_id, root, section))
    lead = report.get("lead") or {}
    if lead.get("value") not in {"yes", "no", "maybe", "unknown"} or lead.get("meaning") not in {"sole", "co-lead", "either", "preference", "observed_activity", "unknown"} or lead.get("basis") not in {"explicit_policy", "observed_activity", "no_support", "unknown"}:
        add("lead", "lead.semantics_missing", "Lead value, meaning, and basis must be explicit")
    if lead.get("value") == "no" and lead.get("basis") != "explicit_policy":
        add("lead", "lead.negative_inference", "No requires explicit source evidence that the firm does not lead")
    lead_evidence = lead.get("evidence", [])
    if lead.get("value") != "unknown" and not lead_evidence:
        add("lead", "lead.evidence_missing", "Non-unknown lead assessment requires evidence")
    for ev in lead_evidence:
        issues.extend(evidence_issues(ev, fund_id, root, "lead"))
    lead_quotes = " ".join(str(ev.get("quote", "")) for ev in lead_evidence if isinstance(ev, dict)).lower()
    if ("co-led" in lead_quotes or "co-lead" in lead_quotes) and lead.get("value") != "yes":
        add("lead", "lead.co_lead_not_affirmative", "Documented co-leading is affirmative lead activity")
    capital = report.get("capital")
    if not isinstance(capital, list):
        add("capital", "capital.shape", "Capital is a list of separately sourced measures")
        capital = []
    allowed_metrics = {"aum", "fund_size", "capital_raised", "dry_powder", "check_size", "total_assets", "other", "unknown"}
    allowed_scopes = {"firm", "vehicle", "fund", "strategy", "unknown"}
    allowed_qualifiers = {"approximately", "over", "under", "target", "closed", "cumulative", "reported", "exact", "unknown"}
    for i, item in enumerate(capital):
        f = f"capital[{i}]"
        if not isinstance(item, dict):
            add(f, "capital.item_invalid", "Capital entry must be an object")
            continue
        for key in ("metric", "scope", "currency", "qualifier"):

            if item.get(key) in (None, ""):
                add(f, "capital.metadata_missing", f"{key} must be explicit or explicitly 'unknown'")
        if item.get("metric") not in allowed_metrics:
            add(f, "capital.metric_invalid", "metric must use the documented vocabulary")
        if item.get("scope") not in allowed_scopes:
            add(f, "capital.scope_invalid", "scope must use the documented vocabulary")
        if item.get("qualifier") not in allowed_qualifiers:
            add(f, "capital.qualifier_invalid", "qualifier must use the documented vocabulary")
        if not (item.get("currency") == "unknown" or re.fullmatch(r"[A-Z]{3}", str(item.get("currency", "")))):
            add(f, "capital.currency_invalid", "currency must be an ISO-style code or unknown")
        amount_values = [item.get(k) for k in ("amount", "lower_bound", "upper_bound") if item.get(k) is not None]
        if not amount_values or any(isinstance(v, bool) or not isinstance(v, (int, float)) or not math.isfinite(v) or v < 0 for v in amount_values):
            add(f, "capital.amount_invalid", "Provide a non-negative amount or bound")
        if item.get("lower_bound") is not None and item.get("upper_bound") is not None and item["lower_bound"] > item["upper_bound"]:
            add(f, "capital.bounds_invalid", "lower_bound cannot exceed upper_bound")
        if "as_of" not in item or not isinstance(item.get("as_of"), str):
            add(f, "capital.date_missing", "Include source as_of, use empty string when the page is undated")
        ev = item.get("evidence")
        issues.extend(evidence_issues(ev, fund_id, root, f))
        quote = str((ev or {}).get("quote", "")).lower()
        if item.get("as_of") != (ev or {}).get("as_of"):
            add(f, "capital.date_mismatch", "Capital as_of must match its evidence source date")
        metric = str(item.get("metric", "")).lower().replace(" ", "_")
        if metric == "aum" and any(term in quote for term in ("cumulative capital raised", "capital raised to date", "funds raised since inception", "total assets")):
            add(f, "capital.metric_quote_mismatch", "Quote describes cumulative capital raised, not AUM")
        if metric == "fund_size" and "aum" in quote and "fund" not in quote:
            add(f, "capital.metric_quote_mismatch", "Quote appears to describe AUM, not an individual fund size")
    findings = report.get("findings", [])
    if not isinstance(findings, list):
        add("findings", "findings.shape", "findings must be a list")
        findings = []
    for i, finding in enumerate(findings):
        field = f"findings[{i}]"
        if finding.get("disposition") not in VALID_DISPOSITIONS:
            add(field, "finding.disposition_invalid", "Finding needs a recognized disposition")
        if finding.get("disposition") == "corrected" and finding.get("proposed_value") in (None, "", [], {}):
            add(field, "finding.proposed_value_missing", "Corrected finding needs a proposed value")
        evs = finding.get("evidence", [])
        if finding.get("disposition") in {"corrected", "supported", "conflict"} and not evs:
            add(field, "finding.evidence_missing", "This disposition needs evidence")
        for ev in evs:
            issues.extend(evidence_issues(ev, fund_id, root, field))
    review = report.get("independent_review") or {}
    if review:
        if not isinstance(review.get("reviewer"), str) or not review.get("reviewer"):
            add("independent_review", "review.reviewer_missing", "Reviewer ID is required")
        if review.get("reviewer") == worker:
            add("independent_review", "review.not_independent", "Reviewer must be a different worker")
        if review.get("report_sha256") != report_hash(report):
            add("independent_review", "review.stale_hash", "Reviewer attestation is not bound to the current report")
        if review.get("disposition") not in {"accepted", "revise", "unresolved"}:
            add("independent_review", "review.disposition_invalid", "Independent disposition required")
        elif review.get("disposition") != "accepted":
            add("independent_review", "review.not_accepted", "Independent reviewer did not accept this report")
        if not isinstance(review.get("checked_at"), str) or not CHECK_DATE_RE.fullmatch(review["checked_at"]):
            add("independent_review", "review.date_invalid", "Reviewer checked_at must use YYYY-MM-DD")
        reviewed = review.get("findings_reviewed", [])
        reviewed_by_code = {str(item.get("code", "")): item for item in reviewed if isinstance(item, dict)} if isinstance(reviewed, list) else {}
        missing = {str(f.get("code", "")) for f in findings} - set(reviewed_by_code)
        if missing:
            add("independent_review", "review.findings_incomplete", f"Reviewer did not disposition findings: {sorted(missing)}")
        unaccepted = [code for code, item in reviewed_by_code.items() if item.get("disposition") != "accepted"]
        if unaccepted:
            add("independent_review", "review.findings_unaccepted", f"Reviewer did not accept findings: {sorted(unaccepted)}")
    else:
        add("independent_review", "review.missing", "A separate worker must review and attest to this exact report")
    warnings = [i for i in issues if i.get("severity") == "warning"]
    blocking = [i for i in issues if i.get("severity") != "warning"]
    return {"fund_id": fund_id, "verdict": "pass" if not blocking else "fail", "issues": blocking, "warnings": warnings,
            "fingerprint": current, "report_sha256": report_hash(report)}


def _capital_assertion(item: dict, assertion: str, expected: object) -> bool:
    if assertion == "capital.currency":
        return item.get("currency") == expected
    if assertion == "capital.as_of_year":
        return str(item.get("as_of", "")).startswith(str(expected))
    key = "lower_bound" if assertion.startswith("capital.lower_bound") else "amount"
    value = item.get(key)
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value):
        return False
    if assertion.endswith("_gte"):
        return value >= float(expected)
    if assertion.endswith("_gt"):
        return value > float(expected)
    return False


def benchmark(root: Path = ROOT, cohort: str = "spot-check-12-v1") -> dict:
    if cohort not in BENCHMARKS:
        raise ValueError(f"Unknown benchmark cohort: {cohort}")
    cases, misses = [], 0
    for fund_id, expected in BENCHMARKS[cohort].items():
        path = root / REPORTS / f"{fund_id}.json"
        report = {}
        try:
            report = json.loads(path.read_text())
        except (OSError, ValueError):
            pass
        if not isinstance(report, dict):
            report = {}
        found = {(str(f.get("field")), str(f.get("code"))): f for f in report.get("findings", []) if isinstance(f, dict)}
        review = report.get("independent_review") or {}
        reviewed = review.get("findings_reviewed", [])
        reviewed_codes = {str(item.get("code", "")) for item in reviewed if isinstance(item, dict)} if isinstance(reviewed, list) else set()
        missing = []
        unresolved = []
        for requirement in expected:
            field, code = requirement["field"], requirement["code"]
            finding = found.get((field, code))
            if not finding:
                missing.append({"field": field, "code": code})
                continue
            disp = finding.get("disposition")
            if disp == "unresolved" and not requirement.get("allow_unresolved"):
                unresolved.append({"field": field, "code": code, "problem": "explicitly unresolved; not an expected detected conflict"})
            elif disp not in requirement["dispositions"]:
                unresolved.append({"field": field, "code": code, "problem": f"unexpected disposition {disp!r}"})
            if disp not in VALID_DISPOSITIONS:
                unresolved.append({"field": field, "code": code, "problem": "invalid disposition"})
            if disp in {"corrected", "unknown", "conflict"} and finding.get("proposed_value") in (None, "", [], {}):
                unresolved.append({"field": field, "code": code, "problem": f"{disp} disposition without an explicit result"})
            if disp in {"corrected", "supported", "conflict", "unresolved"} and not finding.get("evidence"):
                unresolved.append({"field": field, "code": code, "problem": "disposition lacks evidence"})
            capital_items = [c for c in report.get("capital", []) if isinstance(c, dict)] if isinstance(report.get("capital", []), list) else []
            expected_metric = requirement.get("capital_metric")
            if expected_metric:
                capital_items = [c for c in capital_items if c.get("metric") == expected_metric]
            if expected_metric and not any(c.get("metric") == expected_metric for c in capital_items):
                unresolved.append({"field": field, "code": code, "problem": f"report lacks separate capital metric {expected_metric!r}"})
            capital_assertions = {key: value for key, value in requirement.get("assertions", {}).items() if key.startswith("capital.")}
            matching_capital = [c for c in capital_items if all(_capital_assertion(c, key, value) for key, value in capital_assertions.items())]
            for assertion, expected_value in requirement.get("assertions", {}).items():
                strategies = (report.get("classification") or {})
                stage_values = [str(v).lower() for v in (report.get("stages") or {}).get("value", [])]
                sector_values = [str(v.get("value", "")).lower() for v in report.get("sectors", []) if isinstance(v, dict)]
                passed = False
                if assertion == "lead.value":
                    passed = (report.get("lead") or {}).get("value") == expected_value
                elif assertion == "identity.relationship":
                    passed = (report.get("identity") or {}).get("relationship") == expected_value
                elif assertion == "identity.resolved_name":
                    passed = (report.get("identity") or {}).get("resolved_name") == expected_value
                elif assertion == "stages.contains":
                    passed = all(any(str(token).lower() in value for value in stage_values) for token in expected_value)
                elif assertion == "stages.contains_any":
                    passed = any(token.lower() in value for token in expected_value for value in stage_values)
                elif assertion == "classification.type_contains":
                    passed = all(any(str(token).lower() in str(v).lower() for v in strategies.get("type", [])) for token in expected_value)
                elif assertion == "classification.instruments_contains":
                    passed = all(any(str(token).lower() in str(v).lower() for v in strategies.get("instruments", [])) for token in expected_value)
                elif assertion == "classification.strategies_min":
                    passed = len(strategies.get("strategies", [])) >= int(expected_value)
                elif assertion == "classification.strategies_contains":
                    passed = all(any(str(token).lower() in str(v).lower() for v in strategies.get("strategies", [])) for token in expected_value)
                elif assertion == "sectors.contains":
                    # Punctuation variants such as deep-tech/deep tech are the
                    # same label, not a substantive benchmark disagreement.
                    compact = lambda value: re.sub(r"[\s_-]+", "", str(value).lower())
                    passed = all(any(compact(token) in compact(value) for value in sector_values) for token in expected_value)
                elif assertion.startswith("capital."):
                    passed = bool(matching_capital)
                if not passed:
                    unresolved.append({"field": field, "code": code, "problem": f"benchmark assertion {assertion} failed"})
            for ev in finding.get("evidence", []):
                ev_problems = evidence_issues(ev, fund_id, root, field)
                if any(p.get("severity") != "warning" for p in ev_problems):
                    unresolved.append({"field": field, "code": code, "problem": "evidence failed mechanical check"})
                    break
            if (review.get("disposition") != "accepted" or not review.get("reviewer") or
                    review.get("reviewer") == report.get("worker") or review.get("report_sha256") != report_hash(report) or
                    code not in reviewed_codes):
                unresolved.append({"field": field, "code": code, "problem": "not accepted by independent reviewer for this report hash"})
        mechanical = check_report(fund_id, root)
        if mechanical.get("verdict") != "pass":
            unresolved.append({"field": "report", "code": "report.mechanical_gate", "problem": "full report failed mechanical checks"})
        if missing or unresolved:
            misses += 1
        dispositions = {(found.get((r["field"], r["code"])) or {}).get("disposition") for r in expected}
        outcome = "detected_conflict" if dispositions & {"unresolved", "conflict"} else ("supported" if "supported" in dispositions else "corrected")
        cases.append({"fund_id": fund_id, "requirements": len(expected), "missing": missing, "unresolved": unresolved,
                      "outcome": outcome if not missing and not unresolved else "unresolved",
                      "covered": not missing and not unresolved})
    return {"benchmark": cohort, "cases": cases, "covered_cases": sum(c["covered"] for c in cases),
            "corrected_cases": sum(c["covered"] and c["outcome"] == "corrected" for c in cases),
            "detected_conflict_cases": sum(c["covered"] and c["outcome"] == "detected_conflict" for c in cases),
            "supported_cases": sum(c["covered"] and c["outcome"] == "supported" for c in cases),
            "total_cases": len(cases), "pass": misses == 0,
            "note": "Corrected cases and explicitly detected identity conflicts are reported separately. Unresolved items outside expected identity conflicts remain uncovered. Mechanical and independent checks do not prove semantic truth."}


def status(root: Path = ROOT) -> dict:
    queue = load_queue(root)
    counts = {}
    for r in queue["records"].values():
        counts[r.get("status", "unknown")] = counts.get(r.get("status", "unknown"), 0) + 1
    return {"total": len(queue["records"]), "statuses": counts,
            "active_workers": sorted({r.get("worker") for r in queue["records"].values()
                                       if r.get("status") == "claimed" and r.get("lease_until", 0) > time.time()})}


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("init", help="queue all catalog funds and refresh stale fingerprints")
    sub.add_parser("status", help="show queue status")
    p = sub.add_parser("claim", help="claim a batch for one actual worker")
    p.add_argument("worker")
    p.add_argument("--limit", type=int, default=10)
    p.add_argument("--role", choices=("research", "review"), default="research")
    p.add_argument("--fund-id", action="append", default=[], help="claim a specific fund ID; repeat as needed")
    p = sub.add_parser("release", help="release this worker's claims")
    p.add_argument("worker")
    p.add_argument("fund_ids", nargs="*")
    p = sub.add_parser("fingerprint", help="print current catalog record fingerprint")
    p.add_argument("fund_id")
    p = sub.add_parser("check", help="mechanically check a report")
    p.add_argument("fund_id")
    p = sub.add_parser("benchmark", help="compare reports with a review case cohort")
    p.add_argument("--cohort", default="spot-check-12-v1")
    args = parser.parse_args(argv)
    try:
        if args.command == "init":
            result = init_queue()
        elif args.command == "status":
            result = status()
        elif args.command == "claim":
            result = claim(args.worker, args.limit, args.role, args.fund_id)
        elif args.command == "release":
            result = {"released": release(args.worker, args.fund_ids)}
        elif args.command == "fingerprint":
            print(fingerprint(args.fund_id))
            return 0
        elif args.command == "check":
            result = check_report(args.fund_id)
            print(json.dumps(result, indent=2))
            return 0 if result["verdict"] == "pass" else 1
        else:
            result = benchmark(cohort=args.cohort)
            print(json.dumps(result, indent=2))
            return 0 if result["pass"] else 1
    except (OSError, ValueError, KeyError) as exc:
        print(str(exc), file=sys.stderr)
        return 2
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
