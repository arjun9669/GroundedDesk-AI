// Saved outputs only. Original native gradeAnswer remains unchanged.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {gradeAnswer} from '../v39-recoverable-regression/score.mjs';
import {base,evidence,protocol,read,write,records,verify,sha,frozen,inputs,documents,audit} from './integrity.mjs';
const root=process.cwd();await frozen(root);const {cases,keys}=await inputs(root),dir=path.join(root,evidence);
const manifest=await read(path.join(dir,'raw-manifest.json'));assert.equal(manifest.protocol,protocol);await verify(root,manifest.files);
const execution=await read(path.join(dir,'execution.json'));assert.equal(execution.freeze_sha256,sha(await fs.readFile(path.join(root,base,'freeze-manifest.json'))));
const status=await read(path.join(dir,'run-status.json'));assert.equal(status.status,'COMPLETE');assert.equal(status.question_retries,0);assert.deepEqual(status.completed,cases.map(c=>c.id));
assert.deepEqual(manifest.files.map(f=>f.path).sort(),[evidence+'/execution.json',evidence+'/run-status.json',...cases.flatMap(c=>[evidence+'/'+c.id+'.json',evidence+'/'+c.id+'-audit.json'])].sort());
const rows=[];
for(let i=0;i<cases.length;i++){
 const c=cases[i],row=await read(path.join(dir,c.id+'.json')),docs=await documents(root,c);assert.equal(row.id,c.id);assert.equal(row.question,c.question);assert.deepEqual(row.input_documents,docs);
 const proof=audit(row.result,docs);assert.deepEqual(await read(path.join(dir,c.id+'-audit.json')),proof);
 rows.push({native:gradeAnswer(keys[i],row.result,docs),audit:proof});
}
const counts=Object.fromEntries(['PASS','PARTIAL','FAIL','ERROR'].map(outcome=>[outcome,rows.filter(r=>r.native.outcome===outcome).length]));
const score={protocol,classification:'Author-aware targeted lexical contract follow-up; not unseen confirmation',raw_manifest_sha256:sha(await fs.readFile(path.join(dir,'raw-manifest.json'))),scored:new Date().toISOString(),counts,gate:counts.PASS===12?'PASS':'FAIL',original_FC61:'UNCHANGED native FAIL',phase2:'HOLD',rows};
await fs.mkdir(path.join(dir,'score'));await write(path.join(dir,'score/native-results.json'),score);
await write(path.join(dir,'score-manifest.json'),{protocol,files:await records(root,[evidence+'/score/native-results.json',evidence+'/raw-manifest.json'])});
console.log(JSON.stringify({counts,gate:score.gate}));if(score.gate!=='PASS')process.exitCode=1;
