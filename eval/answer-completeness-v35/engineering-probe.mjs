// Frozen engineering replay after the first benchmark seal; no browser/vector replay.
import fs from 'node:fs/promises';import assert from 'node:assert/strict';
import {localMaintenanceQuote} from './coverage.mjs';
import {localMaintenanceQuote as predecessor} from '../answer-completeness-v34/coverage.mjs';
const out='../../outputs/coverage-v35-final/';
const first=JSON.parse(await fs.readFile(out+'archive-integrity.json','utf8'));
const original=JSON.parse(await fs.readFile('docs/evidence/coverage-v34-r44/post-seal-engineering-probe.json','utf8'));
assert.equal(original.outcome,'FAIL');
const paired=predecessor(original.selected_quote,original.source,original.question);
assert.equal(paired,original.actual,'Original v34 failure must reproduce without editing it');
const actual=localMaintenanceQuote(original.selected_quote,original.source,original.question);
const pass=actual===original.expected_preserved;
const record={classification:'Frozen synthetic pure-helper engineering replay; outside675 browser cases, not model accuracy',runtime:'Node; no browser submission, mock-vector accuracy or saved-vector replay',first_benchmark_seal:first,original_v34_probe:original,paired_v34_actual:paired,v35_actual:actual,complete_quote_preserved:pass,outcome:pass?'PASS':'FAIL',native_grades_changed:false,candidate_changed_after_answers:false,benchmark_question_retries:0};
await fs.writeFile(out+'engineering-probe.json',JSON.stringify(record,null,2),{flag:'wx'});
console.log(JSON.stringify(record,null,2));
