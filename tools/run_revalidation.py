#!/usr/bin/env python3
"""Run resumable research and independent review jobs using GPT-6 Luna.

No catalog writes. Every job gets a fresh Codex context and a private event log.
"""
from __future__ import annotations

import argparse
import concurrent.futures
import fcntl
import json
import os
from pathlib import Path
import subprocess
import sys
import uuid

sys.path.insert(0, str(Path(__file__).resolve().parent))
import revalidate_funds as audit

MODEL = "gpt-6-luna"
BASE = Path("workspace/revalidation")


def prompt_for(worker: str, role: str, records: list[dict]) -> str:
    requirements = {
        record["fund_id"]: [{"field": item["field"], "code": item["code"]}
                            for item in audit.BENCHMARKS["spot-check-22-v1"].get(record["fund_id"], [])]
        for record in records
    }
    return f"""Execute the fb-revalidate-funds skill in skills/fb-revalidate-funds/SKILL.md.
Read its report-schema reference and AGENTS.md. Your worker ID is {worker}; role: {role}.
If workspace/revalidation/benchmark-inputs.json exists, consult only your assigned fund's
URLs as research leads. The user's assessments are not source evidence and can be wrong.
The controller has already claimed these records; do not claim or release anything:
{json.dumps(records, ensure_ascii=False)}
After researching independently, use these issue codes to record your conclusions where applicable:
{json.dumps(requirements)}
Use only public investor facts in external queries. No email or private company context.
You may write ONLY your assigned fund reports and their source cache directories under
workspace/revalidation/. Do not edit code, catalog, wiki, logs, queue, shortlists or other funds.
Do not launch subagents. Your final response must list each completed fund and unresolved gaps.
Research role: independently research from primary sources. Start with three pages per fund,
expand to at most six for named gaps. Save directly retrieved text and a manifest binding
file, URL and retrieval date. Existing reports may contain reviewer defects to fix; preserve
their source evidence, remove stale independent_review and use your worker ID in the report.
Review role: inspect every asserted field against its actual evidence, not just quote presence.
Independently retrieve the primary pages supporting identity, capital and leading activity
(normally up to three pages, shared across claims) to check the cached excerpts against the
originals. If access prevents that, state the limitation and do not invent confirmation.
Check the exact entity, capital metric/scope/date/bounds, debt versus equity, each stage/sector,
and evidence of leading versus a no-lead policy. Do not guess missing facts. You may remove
unsupported claims or fix demonstrable errors and explain each change in review notes.
Attest only with your own reviewer ID and a hash of the final report excluding independent_review.
Use accepted only for an accurate report, otherwise revise or unresolved with specific defects.
An accurate report can explicitly document unknown values or an unresolved entity relationship.
Accept that report if the uncertainty itself is accurately sourced and the disputed claims are
withheld; this does not resolve the identity or authorize a merge or catalog promotion. Use
review disposition revise for defects in the report, not merely missing public information.
Run the mechanical check; fix shape errors without inventing evidence. A researcher should
expect review.missing, since another fresh worker must independently review. Never fabricate
a reviewer or change findings merely to make the benchmark pass. Unknown is preferable to false.
"""


def execute_job(worker: str, role: str, records: list[dict], timeout: int) -> dict:
    logs = BASE / "runs"
    logs.mkdir(parents=True, exist_ok=True)
    prompt = prompt_for(worker, role, records)
    (logs / f"{worker}.prompt.txt").write_text(prompt)
    command = ["codex", "exec", "--ephemeral", "--approve-for-me", "--model", MODEL,
               "--color", "never", "--json", "-"]
    code = None
    error = ""
    with (logs / f"{worker}.jsonl").open("w") as output:
        try:
            result = subprocess.run(command, input=prompt, text=True, stdout=output,
                                    stderr=subprocess.STDOUT, timeout=timeout, check=False)
            code = result.returncode
        except (OSError, subprocess.TimeoutExpired) as exc:
            error = str(exc)
    # The queue decides the outcome from report checks, not the subprocess's narrative.
    audit.release(worker, [r["fund_id"] for r in records])
    artifact_written = True
    for record in records:
        try:
            report = json.loads((BASE / "reports" / f"{record['fund_id']}.json").read_text())
            owner = report.get("worker") if role == "research" else (report.get("independent_review") or {}).get("reviewer")
            artifact_written = artifact_written and owner == worker
        except (OSError, ValueError, AttributeError):
            artifact_written = False
    result = {"worker": worker, "role": role, "funds": [r["fund_id"] for r in records],
              "model": MODEL, "exit_code": code, "error": error, "artifact_written": artifact_written,
              "finished_at": audit.now()}
    (logs / f"{worker}.result.json").write_text(json.dumps(result, indent=2) + "\n")
    return result


def cap_retries() -> None:
    # One initial research/review pair and one revision/review pair. A failed
    # process also counts as an attempt; repeated access failures must not spin.
    with audit.locked():
        queue = audit.load_queue()
        for rec in queue["records"].values():
            if rec.get("status") in {"queued", "stale", "revise", "review_pending"} and rec.get("attempts", 0) >= 4:
                rec.update(status="blocked", updated_at=audit.now(),
                           reason="Attempt limit reached; inspect worker logs and review defects before retrying.")
        audit.save_queue(queue)


def run(workers: int, fund_ids: list[str], max_jobs: int | None, timeout: int) -> dict:
    BASE.mkdir(parents=True, exist_ok=True)
    with (BASE / ".runner.lock").open("a+") as lock:
        fcntl.flock(lock.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
        audit.init_queue()
        (BASE / "runner.json").write_text(json.dumps({"pid": os.getpid(), "model": MODEL,
            "workers": workers, "started_at": audit.now(), "fund_ids": fund_ids}, indent=2) + "\n")
        launched = 0
        failures = 0
        stop = BASE / "STOP"
        with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as pool:
            pending = {}
            while True:
                cap_retries()
                while len(pending) < workers and not stop.exists() and failures < 3 and (max_jobs is None or launched < max_jobs):
                    worker = f"luna-{uuid.uuid4().hex[:12]}"
                    role = "review"
                    try:
                        records = audit.claim(worker, 1, role, fund_ids)
                        if not records:
                            role = "research"
                            records = audit.claim(worker, 1, role, fund_ids)
                    except ValueError as exc:
                        if "active workers" not in str(exc):
                            raise
                        break
                    if not records:
                        break
                    future = pool.submit(execute_job, worker, role, records, timeout)
                    pending[future] = worker
                    launched += 1
                    print(json.dumps({"started": worker, "role": role, "fund": records[0]["fund_id"]}), flush=True)
                if not pending:
                    break
                done, _ = concurrent.futures.wait(pending, timeout=1,
                    return_when=concurrent.futures.FIRST_COMPLETED)
                for future in done:
                    pending.pop(future)
                    result = future.result()
                    failures = failures + 1 if result["exit_code"] != 0 or not result["artifact_written"] else 0
                    print(json.dumps(result), flush=True)
        result = {"jobs": launched, "stopped": stop.exists(), "consecutive_process_failures": failures,
                  **audit.status()}
        (BASE / "runner-result.json").write_text(json.dumps(result, indent=2) + "\n")
        return result


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workers", type=int, choices=range(1, audit.MAX_WORKERS + 1), default=3)
    parser.add_argument("--fund-id", action="append", default=[])
    parser.add_argument("--max-jobs", type=int, help="Optional limit on research/review invocations")
    parser.add_argument("--timeout", type=int, default=1800, help="Seconds allowed per fund job")
    parser.add_argument("--all", action="store_true", help="Process the catalog after the pilot benchmark passes")
    args = parser.parse_args()
    if not args.fund_id and not args.all:
        parser.error("select pilot funds with --fund-id, or use --all after the benchmark passes")
    if args.fund_id and args.all:
        parser.error("--fund-id and --all are mutually exclusive")
    if args.timeout < 1 or (args.max_jobs is not None and args.max_jobs < 1):
        parser.error("timeout and max-jobs must be positive")
    if args.all:
        benchmark = audit.benchmark(cohort="spot-check-22-v1")
        if not benchmark["pass"]:
            print(json.dumps({"error": "Pilot benchmark has unresolved requirements", "benchmark": benchmark}, indent=2))
            return 1
    print(json.dumps(run(args.workers, args.fund_id, args.max_jobs, args.timeout), indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
