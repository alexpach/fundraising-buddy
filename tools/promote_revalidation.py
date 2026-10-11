"""Promote independently reviewed public facts; default to a private dry run."""
from __future__ import annotations

import argparse
import copy
import datetime as dt
import hashlib
import json
from pathlib import Path

from fundraising_buddy.catalog import load, public_url, validate
try:
    from tools import revalidate_funds as audit
except ModuleNotFoundError:
    import revalidate_funds as audit

AUDITED = {'type', 'stages', 'sectors', 'leads_rounds', 'aum',
           'investment_strategies', 'legal_structure', 'investment_instruments'}


def capital_text(item):
    """Keep bounds ungrouped by the viewer's exact-amount parser."""
    currency = item['currency']
    def amount(n):
        for divisor, unit in ((1e12, 'trillion'), (1e9, 'billion'), (1e6, 'million')):
            if n >= divisor:
                return f'{currency} {n / divisor:g} {unit}'
        return f'{currency} {n:g}'
    lower, upper = item.get('lower_bound'), item.get('upper_bound')
    if lower is not None and upper is not None:
        value = f'Range: {amount(lower)} to {amount(upper)}'
    elif lower is not None:
        value = f'Lower bound ({item["qualifier"]}): {amount(lower)}'
    elif upper is not None:
        value = f'Upper bound ({item["qualifier"]}): {amount(upper)}'
    else:
        prefix = 'Approximately ' if item['qualifier'] == 'approximately' else ''
        value = prefix + amount(item['amount'])
    return value + (f' (as of {item["as_of"]})' if item['as_of'] else ' (date not reported)')


def project(firm, report):
    identity = report['identity']
    if (identity['relationship'] not in {'same_entity', 'rebrand'}
            or identity['confidence'] != 'high'
            or identity['resolved_domain'].removeprefix('www.') != firm['domain'].removeprefix('www.')):
        return None, 'Identity requires resolution before promotion'
    out = copy.deepcopy(firm)
    # Preserve unaudited facts and their existing coverage label. A partial audit
    # must not turn directory-derived fields/portfolio into sourced research.
    for key in AUDITED:
        out['fields'].pop(key, None)
        out['evidence'].pop(key, None)
    conflicts = {f['field'] for f in report['findings'] if f['disposition'] in {'conflict', 'unresolved'}}
    if 'identity' in conflicts:
        return None, 'Unresolved identity finding'
    sources = set(out['sources'])
    for ev in identity['evidence']:
        if public_url(ev['url']):
            sources.add(ev['url'])
    out['name'] = identity['resolved_name']

    def add(key, value, evidence):
        if not value:
            return
        usable = [ev for ev in evidence if public_url(ev['url'])]
        if len(usable) != len(evidence) or not usable:
            return
        out['fields'][key] = value
        out['evidence'][key] = {k: usable[0][k] for k in ('url', 'as_of')}
        sources.update(ev['url'] for ev in usable)

    if 'classification' not in conflicts:
        add('type', '; '.join(report['classification']['type']), report['classification']['evidence'])
        for key, source in [('investment_strategies', 'strategies'), ('legal_structure', 'structure'),
                            ('investment_instruments', 'instruments')]:
            add(key, report['classification'].get(source, []), report['classification']['evidence'])
    if 'stages' not in conflicts:
        add('stages', report['stages']['value'], report['stages']['evidence'])
    if 'sectors' not in conflicts:
        add('sectors', [s['value'] for s in report['sectors']], [ev for s in report['sectors'] for ev in s['evidence']])
    if 'lead' not in conflicts and report['lead']['value'] in {'yes', 'no'}:
        add('leads_rounds', report['lead']['value'], report['lead']['evidence'])
    if 'capital' not in conflicts:
        capital = [c for c in report['capital'] if c['metric'] == 'aum' and c['scope'] == 'firm'
                   and c['currency'] != 'unknown' and c['qualifier'] in {'exact', 'reported', 'approximately', 'over', 'under'}
                   and any(c.get(k) is not None for k in ('amount', 'lower_bound', 'upper_bound'))]
        if capital:
            latest = max(c['as_of'] for c in capital)
            choices = [c for c in capital if c['as_of'] == latest]
            distinct = {capital_text(c) for c in choices}
            if len(distinct) == 1:
                add('aum', capital_text(choices[0]), [c['evidence'] for c in choices])
    out['sources'] = sorted(sources)
    out['researched_at'] = report['checked_at']
    # Completeness scores derived from the old field set are no longer valid.
    if 'scores' in out:
        out['scores'].pop('jev-score', None)
    return out, ''


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()
    root = Path.cwd()
    path = root / 'data/public/catalog.json'
    original = path.read_bytes()
    data = load(root)
    queue = audit.load_queue(root)
    summary = {'applied': False, 'changed': [], 'held': [], 'field_changes': {}}
    for index, firm in enumerate(data['firms']):
        ident = firm['id']
        rec = queue['records'].get(ident, {})
        if rec.get('status') != 'human_review_pending':
            summary['held'].append({'id': ident, 'reason': rec.get('status', 'not reviewed')})
            continue
        check = audit.check_report(ident, root)
        if check['verdict'] != 'pass':
            summary['held'].append({'id': ident, 'reason': 'Report gate failed', 'issues': check['issues']})
            continue
        report = json.loads((root / audit.REPORTS / f'{ident}.json').read_text())
        proposed, reason = project(firm, report)
        if proposed is None:
            summary['held'].append({'id': ident, 'reason': reason})
            continue
        data['firms'][index] = proposed
        changes = {key: {'before': firm['fields'].get(key), 'after': proposed['fields'].get(key)}
                   for key in AUDITED if firm['fields'].get(key) != proposed['fields'].get(key)}
        summary['changed'].append({'id': ident, 'fields': changes, 'report_sha256': check['report_sha256']})
        for key in changes:
            summary['field_changes'][key] = summary['field_changes'].get(key, 0) + 1
    errors = validate(data)
    if errors:
        raise ValueError(errors[:20])
    base = root / 'workspace/revalidation/promotion'
    base.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now(dt.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
    summary['catalog_before_sha256'] = hashlib.sha256(original).hexdigest()
    if args.apply:
        if path.read_bytes() != original:
            raise RuntimeError('Catalog changed during preparation; rerun')
        (base / f'{stamp}-catalog-before.json').write_bytes(original)
        staged = base / f'{stamp}-catalog-after.json'
        staged.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
        # Keep the candidate for audit and replace the source catalog atomically.
        temporary = path.with_suffix('.pending')
        if temporary.exists():
            raise RuntimeError('Unexpected pending catalog file')
        temporary.write_bytes(staged.read_bytes())
        temporary.replace(path)
        summary['applied'] = True
        with audit.locked(root):
            current_queue = audit.load_queue(root)
            promoted = {entry['id'] for entry in summary['changed']}
            for firm in data['firms']:
                if firm['id'] in promoted:
                    current_queue['records'][firm['id']].update(
                        status='promoted', fingerprint=audit.canonical_hash(firm),
                        updated_at=audit.now(), promotion_summary=f'{stamp}-summary.json')
            audit.save_queue(current_queue, root)
    (base / f'{stamp}-summary.json').write_text(json.dumps(summary, indent=2) + '\n')
    print(json.dumps({'applied': summary['applied'], 'changed': len(summary['changed']),
                      'held': len(summary['held']), 'field_changes': summary['field_changes'],
                      'summary': str(base / f'{stamp}-summary.json')}, indent=2))


if __name__ == '__main__':
    main()
