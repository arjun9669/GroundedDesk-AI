// Unrelated synthetic audit fixtures. No candidate imports or study-question calls.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {gradeAnswer} from '../eval/v39-recoverable-regression/score.mjs';
import {audit,normalize,local,records,verify,write,inputs} from '../eval/location-scope12/integrity.mjs';
const docs=[{id:'amber',name:'Amber.txt',text:'Amber sample is five grams.'},{id:'jade',name:'Jade.txt',text:'Jade sample is seven grams.'}];
const result=()=>{const sources=docs.map((d,i)=>({documentId:d.id,filename:d.name,citation:i+1,quote:d.text,excerpt:d.text,start:0,end:d.text.length,supported:true}));return {answered:true,comparison_contract:{status:'supported'},sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n')};};
const refusal=()=>({answered:false,answer:"I can't find complete comparison evidence in both provided documents.",sources:[],comparison_contract:{status:'incomplete'}});
test('lexical audit proves both ordered identities and literal offsets',()=>{assert.equal(audit(result(),docs).status,'PASS');});
test('uncited incomplete refusal passes integrity separately from native quality',()=>{assert.equal(audit(refusal(),docs).kind,'uncited_refusal');assert.equal(gradeAnswer({id:'control',question:'Synthetic unrelated question',unsupported:true,expected_sources:[]},refusal(),docs).outcome,'PASS');});
for(const [label,mutate] of Object.entries({identity:r=>r.sources[0].documentId='other',filename:r=>r.sources[0].filename='other',citation:r=>r.sources[0].citation=2,offset:r=>r.sources[0].start=1,end:r=>r.sources[0].end++,excerpt:r=>r.sources[0].excerpt='other',quote:r=>r.sources[0].quote='invented',order:r=>r.sources.reverse(),cosine:r=>r.sources[0].actualCosine=.9,anchor:r=>r.sources[0].cosineAnchor={},answer:r=>r.answer+=' unsupported',count:r=>r.sources.pop(),state:r=>r.answered=false,contract:r=>r.comparison_contract.status='incomplete'}))test('audit rejects '+label,()=>{const r=result();mutate(r);assert.throws(()=>audit(r,docs));});
test('duplicate literal occurrence is rejected',()=>{assert.throws(()=>audit(result(),[{...docs[0],text:docs[0].text+' '+docs[0].text},docs[1]]));});
test('long quotes are rejected',()=>{const r=result();r.sources[0].quote='x'.repeat(621);assert.throws(()=>audit(r,docs));});
test('normalization preserves newlines and signed units',()=>{assert.equal(normalize('  A\t -2 °F.\r\nB  '),'A -2 °F.\nB');});
test('canonical relative paths reject escapes and alternate separators',()=>{for(const p of ['../escape','/absolute','a/../b','a\\b','a//b',''])assert.throws(()=>local('/tmp',p));});
test('write-once and sealed byte verification reject overwrite and tampering',async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'grounded-location-'));
 try{await write(path.join(root,'x.json'),{ok:true});await assert.rejects(write(path.join(root,'x.json'),{ok:false}));const seal=await records(root,['x.json']);await verify(root,seal);await fs.appendFile(path.join(root,'x.json'),' ');await assert.rejects(verify(root,seal));await assert.rejects(records(root,['x.json','x.json']));}finally{await fs.rm(root,{recursive:true});}
});
test('static case/key/source hashes and six/six split agree without candidate execution',async()=>{const {cases,keys}=await inputs(process.cwd());assert.equal(cases.length,12);assert.equal(keys.filter(k=>k.unsupported).length,6);});
