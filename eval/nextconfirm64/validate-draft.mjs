// Static draft input audit only. No candidate/planner/native grader imports or calls.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fileURLToPath,pathToFileURL} from 'node:url';
export const base='eval/nextconfirm64';
export const sha=b=>createHash('sha256').update(b).digest('hex');
const ranges=[
 [1,6,'object_location'],[7,12,'causal_explanation'],[13,20,'event_actor_publication'],
 [21,28,'policy_completeness'],[29,34,'clock_ticket_roles'],[35,40,'numeric_metric_unit'],
 [41,44,'missing_fact'],[45,48,'wrong_object_location'],[49,52,'ambiguous_reference'],
 [53,56,'unsupported_policy_boundary'],[57,58,'monthly_explicit_location'],
 [59,59,'ordinal_event_object'],[60,60,'departure_cutoff_hold'],[61,61,'comparison_missing_location'],
 [62,62,'comparison_missing_month'],[63,63,'comparison_wrong_event_object'],[64,64,'comparison_missing_hold']
];
const norm=s=>s.replace(/\s+/g,' ').trim();
const normalizedBody=s=>s.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
const text=s=>assert.ok(typeof s==='string'&&s.trim().length>0,'Nonempty text required');
const open=r=>{assert.equal(r.outcome,'OPEN');assert.equal(r.reviewer,null);assert.equal(r.reviewed_at,null);assert.deepEqual(r.findings,[]);};
export function validateDraft({sources,cases,keys,notes,review,authorship,key_file_sha256},texts){
 assert.equal(sources.length,8);assert.equal(cases.length,64);assert.equal(keys.length,64);assert.equal(notes.length,64);
 assert.equal(new Set(sources.map(s=>s.name)).size,8);
 const ids=sources.map(s=>s.id);assert.deepEqual(ids,Array.from({length:8},(_,i)=>'D'+String(i+1).padStart(2,'0')));
 let normalizedBodiesChanged=0;
 for(const [i,s] of sources.entries()){
  assert.equal(s.id,'D'+String(i+1).padStart(2,'0'));assert.match(s.name,new RegExp('^'+String(i+1).padStart(2,'0')+'_[A-Za-z_]+\\.txt$'));
  assert.equal(s.path,base+'/source_docs/'+s.name);text(s.author);text(s.provenance);
  const body=texts[s.id];text(body);assert.ok(body.length<=180000);assert.equal(Buffer.byteLength(body),s.bytes);assert.equal(sha(body),s.sha256);
  assert.ok(!body.includes('\r')&&!body.includes('\0'));assert.ok(!body.includes('\uFFFD'));assert.ok(body.endsWith('\n'));
  if(normalizedBody(body)!==body)normalizedBodiesChanged++;
 }
 assert.equal(new Set(cases.map(c=>c.question)).size,64);
 assert.equal(review.checklist_id,'NEXTCONFIRM64-REVIEW-20261025');assert.equal(review.status,'PENDING_INDEPENDENT_REVIEW');
 assert.equal(review.reviewer,null);assert.equal(review.reviewed_at,null);assert.equal(review.signed_off_commit,null);assert.equal(review.sign_off,null);assert.deepEqual(review.findings,[]);
 assert.equal(review.source_reviews.length,8);assert.equal(review.cases.length,64);
 for(let i=0;i<8;i++){const r=review.source_reviews[i],s=sources[i];assert.equal(r.id,s.id);assert.equal(r.name,s.name);assert.equal(r.sha256,s.sha256);open(r);}
 for(let i=0;i<64;i++){
  const c=cases[i],k=keys[i],n=notes[i],r=review.cases[i],number=i+1,id='NC'+String(number).padStart(2,'0');
  assert.equal(c.id,id);text(c.question);assert.equal(c.question,c.question.trim());assert.equal(c.category,ranges.find(([a,b])=>number>=a&&number<=b)[2]);assert.equal(c.workflow,number<=56?'hybrid':'comparison');
  for(const field of ['id','question','category','workflow'])assert.equal(k[field],c[field]);
  assert.equal(typeof k.unsupported,'boolean');assert.equal(k.unsupported,(number>=41&&number<=56)||number>=61);
  const selected=c.selected_documents;assert.ok(Array.isArray(selected));assert.equal(new Set(selected).size,selected.length);assert.ok(selected.every(d=>ids.includes(d)));
  if(c.workflow==='hybrid')assert.deepEqual(selected,ids);else assert.equal(selected.length,2);
  assert.ok(Array.isArray(k.expected_sources)&&Array.isArray(k.expected_documents));
  if(k.unsupported){assert.deepEqual(k.expected_sources,[]);assert.deepEqual(k.expected_documents,[]);}
  else{
   assert.ok(k.expected_sources.length>0);const names=k.expected_sources.map(e=>e.filename);assert.equal(new Set(names).size,names.length);assert.deepEqual(k.expected_documents,names);
   if(c.workflow==='comparison')assert.deepEqual(names,selected.map(d=>sources.find(s=>s.id===d).name));
   for(const e of k.expected_sources){
    const s=sources.find(s=>s.name===e.filename);assert.ok(s&&selected.includes(s.id));text(e.context);assert.ok(texts[s.id].includes(e.context),'Literal complete context missing');
    assert.ok(texts[s.id].trim().split(/\n\s*\n/).includes(e.context),'Context must be an original complete paragraph');
    assert.ok(Array.isArray(e.groups)&&e.groups.length>0);
    for(const g of e.groups){assert.ok(Array.isArray(g)&&g.length>0);for(const a of g){text(a);assert.ok(norm(e.context).includes(norm(a)),'Gold alternative absent from own context');}}
   }
  }
  assert.equal(n.id,id);assert.equal(n.answerability,k.unsupported?'unsupported':'supported');text(n.rationale);text(n.author);assert.deepEqual(n.selected_documents,selected);assert.equal(n.review_status,'PENDING_INDEPENDENT_REVIEW');
  assert.equal(r.id,id);assert.equal(r.question_sha256,sha(c.question));assert.equal(r.key_file_sha256,key_file_sha256);assert.equal(r.key_index,i);
  assert.deepEqual(r.selected_documents,selected.map(d=>{const s=sources.find(s=>s.id===d);return {id:s.id,name:s.name,sha256:s.sha256};}));
  for(const field of ['answerability','requested_facets','expected_sources_review','absence_review'])assert.equal(r[field],null);open(r);
 }
 assert.equal(authorship.protocol_id,'NEXTCONFIRM64-INPUT-20261025');assert.equal(authorship.independent_reviewer,null);assert.equal(authorship.independent_input_review,'PENDING');assert.equal(authorship.candidate_or_planner_invocations_on_pack,0);
 assert.equal(authorship.input_freeze,'ABSENT');assert.equal(authorship.execution_readiness,'NOT READY');assert.equal(authorship.phase2,'HOLD');
 return {static_validation:'PASS',sources:8,cases:64,hybrid:{supported:40,unsupported:16},comparison:{supported:4,unsupported:4},planned_unique_outputs:120,normalized_bodies_changed:normalizedBodiesChanged,independent_review:'PENDING; 8 source and 64 case rows OPEN',semantic_binding_and_absence:'AUTHOR DRAFT ONLY; independent verification pending',candidate_planner_model_calls_in_this_validator:0,input_freeze:'ABSENT',execution:'NOT READY / NOT RUN',phase2:'HOLD'};
}
export async function loadDraft(root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..')){
 const data={},bytes={};
 for(const [field,name] of Object.entries({sources:'sources.json',cases:'cases.json',keys:'answer-key.json',notes:'author-notes.json',review:'input-review.json',authorship:'authorship.json'})){
  const b=await fs.readFile(path.join(root,base,name));assert.ok(Buffer.from(b.toString('utf8'),'utf8').equals(b),'UTF-8 roundtrip');bytes[name]=b;data[field]=JSON.parse(b);
 }
 data.key_file_sha256=sha(bytes['answer-key.json']);
 const expected=['sources.json','cases.json','answer-key.json','author-notes.json','authorship.json'];assert.deepEqual(Object.keys(data.review.file_hashes).sort(),expected.map(n=>base+'/'+n).sort());
 for(const name of expected)assert.equal(data.review.file_hashes[base+'/'+name],sha(bytes[name]));
 const texts={};for(const s of data.sources){
  assert.ok(!s.name.includes('/')&&!s.name.includes('\\')&&s.path===base+'/source_docs/'+s.name,'Canonical source path required');
  const p=path.join(root,s.path);assert.ok((await fs.realpath(p)).startsWith((await fs.realpath(root))+path.sep),'Source symlink escape');
  const b=await fs.readFile(p);assert.equal(sha(b),s.sha256);assert.ok(Buffer.from(b.toString('utf8'),'utf8').equals(b));texts[s.id]=b.toString('utf8');
 }
 return {data,texts};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const {data,texts}=await loadDraft();console.log(JSON.stringify(validateDraft(data,texts),null,2));
}
