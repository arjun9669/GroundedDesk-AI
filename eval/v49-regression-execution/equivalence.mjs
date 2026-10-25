// Regrade archived outputs only; no candidate, planner or model invocation.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {loadPacks} from './integrity.mjs';
import {nativeGrade,gradeAnswer} from './score.mjs';
const out='docs/evidence/v49-execution-engineering';await fs.mkdir(out);
const read=async p=>JSON.parse(await fs.readFile(p));
try{
 const packs=await loadPacks(),accepted=(await read('docs/evidence/v43-all-available-mac/score/native-scorecards.json')).results;
 const firstFresh=await read('docs/evidence/phase2-fresh64-mac/score/native-scorecard.json');
 const old38=await read('docs/evidence/coverage-v38-r44/ALL_SCORECARDS.json'),old43=(await read('docs/evidence/v43-nine-pack-mac/score/automated-scorecards.json')).results;
 const results=[];
 for(const pack of packs){
  const fresh=pack.name==='Fresh64',base=fresh?'docs/evidence/phase2-fresh64-mac/raw':'docs/evidence/v43-all-available-mac/raw';
  const capture=await read(base+'/'+pack.name+'/capture.json'),docs=(await read(base+'/'+pack.name+'/source-extraction.json')).documents;
  const expected=fresh?firstFresh:accepted.find(p=>p.name===pack.name),reference=old43.find(p=>p.name===pack.name)??old38.find(p=>p.name===pack.name);
  let rows=0;
  for(const v of ['baseline','fixed','section','paired_fixed','paired_section'])for(const [i,row] of capture.cases.entries()){
   const r=v.startsWith('paired_')?row.pairedPrevious[v.slice(7)]:row[v];const k=pack.cases[i];assert.equal(row.id,k.id);assert.equal(row.question,k.question);
   const actual=fresh?gradeAnswer(k,r,docs):nativeGrade(pack.name,k,r,docs,reference),old=expected.variants[v][i];
   assert.equal(actual.outcome,old.outcome,pack.name+'/'+v+'/'+k.id);
   assert.equal(Boolean(actual.false_acceptance),Boolean(old.false_acceptance));assert.equal(Boolean(actual.false_refusal),Boolean(old.false_refusal));rows++;
  }
  results.push({name:pack.name,cases:pack.cases.length,archived_native_rows:rows,equivalent:true});
 }
 await fs.writeFile(out+'/equivalence.json',JSON.stringify({status:'PASS',classification:'Native adapter equivalence on archived outputs only; not a new candidate score',candidate_calls:0,model_calls:0,rows:results.reduce((n,p)=>n+p.archived_native_rows,0),results},null,2)+'\n',{flag:'wx'});
 console.log('PASS: native adapters reproduce '+results.reduce((n,p)=>n+p.archived_native_rows,0)+' archived grades with no candidate/model calls.');
}catch(error){await fs.writeFile(out+'/equivalence-failure.json',JSON.stringify({status:'FAIL',error:{name:error.name,message:error.message,stack:error.stack}},null,2)+'\n',{flag:'wx'});throw error;}
