// Original v37 pure-function fixtures; not browser/model accuracy or a new benchmark.
import fs from 'node:fs/promises';import assert from 'node:assert/strict';
import {scopedPolicyRepair} from './coverage.mjs';
const out='../../outputs/coverage-v38-final';await fs.access(out+'/archive-integrity.json');
const original=JSON.parse(await fs.readFile('docs/evidence/coverage-v37-r44/post-seal-intent-probe.json','utf8'));assert.equal(original.engineering_outcome,'FAIL');
const controls=original.controls.map(c=>{const observed=scopedPolicyRepair(c.question,c.prior,[original.body]);return {id:c.id,question:c.question,prior:c.prior,expected_answered:c.expected_answered,observed,outcome:observed.answered===c.expected_answered?'PASS':'FAIL'};});
const result={classification:'Separate post-seal pure-function engineering verification; original v37 fixture source/body/questions/prior/expectations unchanged. Synthetic finite cosine is a contract fixture, not Chrome/MiniLM accuracy or vector replay.',source:original.source,body:original.body,controls,engineering_outcome:controls.every(c=>c.outcome==='PASS')?'PASS':'FAIL',production_change:'NONE',candidate_edited:false};
await fs.writeFile(out+'/original-intent-probe.json',JSON.stringify(result,null,2),{flag:'wx'});console.log(JSON.stringify(result,null,2));
