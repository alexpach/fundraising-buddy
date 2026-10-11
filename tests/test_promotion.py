import copy
import unittest

from tools.promote_revalidation import project, capital_text


class PromotionTests(unittest.TestCase):
    def setUp(self):
        self.ev = {'url': 'https://example.com/about', 'as_of': '2026-01'}
        self.firm = {'id': 'example.com', 'name': 'Example', 'domain': 'example.com',
                     'fields': {'aum': 'USD 9 billion', 'leads_rounds': 'no', 'hq': 'London'},
                     'evidence': {k: self.ev for k in ['aum', 'leads_rounds', 'hq']},
                     'sources': [self.ev['url']], 'record_level': 'directory',
                     'scores': {'jev-score': 80}}
        self.report = {
            'identity': {'resolved_name': 'Example', 'resolved_domain': 'example.com',
                         'relationship': 'same_entity', 'confidence': 'high', 'evidence': [self.ev]},
            'classification': {'type': ['venture debt'], 'evidence': [self.ev]},
            'stages': {'value': [], 'evidence': []}, 'sectors': [],
            'lead': {'value': 'unknown', 'evidence': []},
            'capital': [{'metric': 'capital_raised', 'scope': 'firm', 'currency': 'USD',
                         'amount': 9e9, 'qualifier': 'reported', 'as_of': '2026-01', 'evidence': self.ev}],
            'findings': [], 'checked_at': '2026-10-04'}

    def test_wrong_metric_and_unknown_lead_clear_legacy_claims(self):
        original = copy.deepcopy(self.firm)
        result, _ = project(self.firm, self.report)
        self.assertNotIn('aum', result['fields'])
        self.assertNotIn('leads_rounds', result['fields'])
        self.assertEqual(result['fields']['hq'], 'London')
        self.assertEqual(result['record_level'], 'directory')
        self.assertNotIn('jev-score', result['scores'])
        self.assertEqual(self.firm, original)

    def test_identity_ambiguity_and_domain_mismatch_hold_entire_firm(self):
        for relationship in ['unresolved', 'affiliate', 'distinct']:
            self.report['identity']['relationship'] = relationship
            self.assertIsNone(project(self.firm, self.report)[0])
        self.report['identity']['relationship'] = 'same_entity'
        self.report['identity']['resolved_domain'] = 'different.com'
        self.assertIsNone(project(self.firm, self.report)[0])

    def test_aum_retains_date_and_bounds_and_excludes_strategy_assets(self):
        item = self.report['capital'][0]
        item.update(metric='aum', amount=None, lower_bound=9e9, qualifier='over')
        result, _ = project(self.firm, self.report)
        self.assertEqual(result['fields']['aum'], 'Lower bound (over): USD 9 billion (as of 2026-01)')
        item['scope'] = 'strategy'
        self.assertNotIn('aum', project(self.firm, self.report)[0]['fields'])

    def test_conflict_withholds_field_and_equal_date_capital_disagreement(self):
        self.report['capital'][0]['metric'] = 'aum'
        self.report['capital'].append({**self.report['capital'][0], 'amount': 20e9})
        self.assertNotIn('aum', project(self.firm, self.report)[0]['fields'])
        self.report['findings'] = [{'field': 'classification', 'disposition': 'unresolved'}]
        self.assertNotIn('type', project(self.firm, self.report)[0]['fields'])


if __name__ == '__main__':
    unittest.main()
