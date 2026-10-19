import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {localPath,sha256,verifyFiles,verifyOriginalVela} from '../eval/v39-recoverable-regression/integrity.mjs';
import {gradeAnswer,preservationLosses} from '../eval/v39-recoverable-regression/score.mjs';

test('recoverable pack preserves original source bytes and all 32 question/key rows',async()=>{
  const {key,files}=await verifyOriginalVela(process.cwd());
  assert.equal(key.length,32);
  assert.equal(files.length,4);
  assert.equal(key.filter(c=>c.workflow==='comparison').length,4);
});

test('freeze verification detects modified bytes and rejects duplicate or escaped paths',async()=>{
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'groundeddesk-v39-integrity-'));
  const bytes=Buffer.from('frozen\n');
  await fs.writeFile(path.join(root,'input.txt'),bytes,{flag:'wx'});
  const spec={path:'input.txt',sha256:sha256(bytes)};
  await verifyFiles(root,[spec]);
  await assert.rejects(verifyFiles(root,[{...spec,sha256:sha256('different')}]),/Frozen bytes/);
  await assert.rejects(verifyFiles(root,[spec,spec]),/Duplicate/);
  for(const value of ['../input.txt','/tmp/input.txt','C:\\input.txt',''])assert.throws(()=>localPath(root,value));
});

test('frozen scoring rejects off-context literal evidence and incomplete mixed answers',()=>{
  const filename='Example.txt',context='Dispatch requests before 14:35 leave on the current service day.';
  const docs=[{name:filename,text:context+' A separate room has a password.'}];
  const answer={answered:true,answer:'[1] '+context,sources:[{citation:1,filename,quote:context}]};
  const supported={id:'control',question:'Departure?',workflow:'hybrid',expected_sources:[{filename,context,groups:[['current service day']]}]};
  assert.equal(gradeAnswer(supported,answer,docs).outcome,'PASS');
  const mixed={...supported,expected_sources:[{filename,context,groups:[['current service day'],['password']]}]};
  assert.equal(gradeAnswer(mixed,answer,docs).outcome,'PARTIAL');
  const offContext={...supported,expected_sources:[{filename,context:'An unrelated rule.',groups:[['current service day']]}]};
  assert.equal(gradeAnswer(offContext,answer,docs).outcome,'FAIL');
  const unsupported={...supported,unsupported:true,expected_sources:[]};
  assert.equal(gradeAnswer(unsupported,answer,docs).false_acceptance,true);
  assert.equal(gradeAnswer(unsupported,{answered:false,answer:"I can't find evidence.",sources:[]},docs).outcome,'PASS');
  assert.equal(gradeAnswer(supported,{execution_status:'ERROR',error:{message:'model unavailable'}},docs).outcome,'ERROR');
});

test('preservation gate retains original passes even if contemporaneous baselines fail',()=>{
  const row={id:'V27',question:'Original exact question',outcome:'FAIL'};
  const variants=Object.fromEntries(['fixed','section','baseline','paired_fixed','paired_section'].map(v=>[v,[row]]));
  const historical={variants:{baseline:[{...row,outcome:'PASS'}],fixed:[row]}};
  assert.deepEqual(preservationLosses(variants,historical),{fixed:['V27'],section:['V27']});
  const repaired={...variants,fixed:[{...row,outcome:'PASS'}],section:[{...row,outcome:'PASS'}]};
  assert.deepEqual(preservationLosses(repaired,historical),{fixed:[],section:[]});
});
