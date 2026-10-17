// Pure function engineering controls. Synthetic finite cosine is a contract fixture,
// NOT an embedding, Chrome observation or model-accuracy result. No benchmark rerun.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {scopedPolicyRepair} from './eval/answer-completeness-v37/coverage.mjs';
const out='../../outputs/coverage-v37-final';await fs.access(out+'/archive-integrity.json');
const source='At 13:40 or later, departure is the next operating day, unless a storm hold is open.';
const body={id:'synthetic-contract-body',documentId:'elm',filename:'01_Elm_Depot.txt',content:source,sourceText:source,start:0,actualCosine:.43};
const prior={answered:false,answer:"I can't find this in the provided documents.",sources:[]};
const inputs=[
 {id:'positive-cutoff-control',question:'An Elm Depot dispatch request is cleared at 13:40. When does it leave and what hold applies?',expected_answered:true},
 {id:'unsupported-password-intent',question:'What is the Elm Depot dispatch password at 13:40?',expected_answered:false},
 {id:'unsupported-approver-intent',question:'Who approves an Elm Depot dispatch at 13:40?',expected_answered:false},
 {id:'unsupported-vehicle-intent',question:'Which vehicle leaves the Elm Depot dispatch yard at 13:40?',expected_answered:false}
];
const controls=inputs.map(c=>{const observed=scopedPolicyRepair(c.question,prior,[body]);return {...c,prior,observed,outcome:observed.answered===c.expected_answered?'PASS':'FAIL'};});
const result={classification:'Separate post-seal pure-function engineering probe; synthetic contract fixture, not browser/model accuracy, no question/model rerun or native grade change',source,body,controls,engineering_outcome:controls.every(c=>c.outcome==='PASS')?'PASS':'FAIL',production_change:'NONE',candidate_edited:false};
await fs.writeFile(out+'/post-seal-intent-probe.json',JSON.stringify(result,null,2),{flag:'wx'});
console.log(JSON.stringify(result,null,2));
