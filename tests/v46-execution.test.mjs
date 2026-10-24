import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {loadPacks,verifyIdentity,assertStudyApproval,verifyFiles,sha256,protocolId} from '../eval/v46-regression-execution/integrity.mjs';
import {moduleGraph} from '../eval/v46-regression-execution/module-graph.mjs';
import {nativeGrade,preservation,familyChecks,gradeAnswer,freshGate} from '../eval/v46-regression-execution/score.mjs';
import * as original from '../eval/v43-all-available-regression/score.mjs';
import {gradeAnswer as originalFresh} from '../eval/v39-recoverable-regression/score.mjs';
import {auditPreCandidate,auditSources,auditOrder} from '../eval/v46-regression-execution/audit.mjs';
import {sealRaw} from '../eval/v46-regression-execution/seal.mjs';
const read=async p=>JSON.parse(await fs.readFile(p));
const identity=()=>({candidate:{id:'coverage-v46-comparison-relations',path:'/eval/answer-completeness-v46/coverage.mjs'},paired:{id:'coverage-v43-deferred-clock-forms',path:'/eval/answer-completeness-v43/coverage.mjs'},helper:{path:'/helper.mjs'},dependencies:[{path:'/dependency.mjs'}]});
test('v46/v43 exact identity and explicit execution approval gate reject old pairs',()=>{
 verifyIdentity(identity());assertStudyApproval(protocolId);
 for(const token of [undefined,'yes','Fresh64'])assert.throws(()=>assertStudyApproval(token));
 for(const edit of [i=>i.candidate.id='coverage-v43-deferred-clock-forms',i=>i.paired.path='/eval/answer-completeness-v42/coverage.mjs',i=>i.dependencies.push(i.helper)]){const i=identity();edit(i);assert.throws(()=>verifyIdentity(i));}
});
test('static scope load preserves all original keys, pairs and order without candidate calls',async()=>{
 const packs=await loadPacks();assert.equal(packs.length,20);assert.equal(packs.reduce((n,p)=>n+p.cases.length,0),732);
 assert.equal(packs.reduce((n,p)=>n+p.cases.filter(k=>k.workflow==='comparison').length,0),48);
 assert.deepEqual(packs.at(-1).cases,await read('eval/phase2-fresh64/fixed-answer-key.json'));
});
test('served module graph covers Stage A/B/C, core and helper transitive imports',async()=>{
 const graph=await moduleGraph(process.cwd(),['eval/answer-completeness-v46/coverage.mjs','tests/fixtures/module-identity.mjs']);
 for(const p of ['/eval/answer-completeness-v44/safety-contract.mjs','/eval/answer-completeness-v45/relation-contract.mjs','/eval/answer-completeness-v46/comparison-contract.mjs','/research.mjs'])assert.ok(graph.some(f=>f.path===p),p);
 assert.equal(new Set(graph.map(f=>f.path)).size,graph.length);assert.ok(graph.every(f=>/^[a-f0-9]{64}$/.test(f.sha256)));
});
test('native graders and gates are the unchanged original function exports',()=>{
 assert.equal(nativeGrade,original.nativeGrade);assert.equal(preservation,original.preservation);assert.equal(familyChecks,original.familyChecks);assert.equal(gradeAnswer,originalFresh);
});
test('Fresh64 native gate requires exactly64 PASS on each side and valid citations',()=>{
 const pass={outcome:'PASS',sources:[],false_acceptance:false,false_refusal:false,citation_integrity:true,provenance:[]};
 const v={fixed:Array.from({length:64},()=>({...pass})),section:Array.from({length:64},()=>({...pass}))};assert.equal(freshGate(v),true);
 for(const change of [x=>x.fixed.pop(),x=>x.section[0].outcome='PARTIAL',x=>x.fixed[0].false_acceptance=true,x=>x.section[0].citation_integrity=false]){const x=structuredClone(v);change(x);assert.equal(freshGate(x),false);}
});
function evidence(){
 const v=Array(384).fill(0);v[0]=1;const text='A copper dial is blue.',e={id:'body',documentId:'d',filename:'Dial.txt',sourceText:text,start:0,content:text,actualCosine:1};
 const extraction={documents:[{id:'d',name:'Dial.txt',text}],sentence_index:[{documentId:'d',start:0,value:text}],sentence_vectors:[v],body_vectors:[v]};
 const pre={body_evidence:[e],query_vector:v,facet_body_evidence:[],facet_query_vectors:[],clock_plan:{status:'outside_scope'},clock_facet_queries:[],clock_facet_vectors:[],clock_facet_evidence:[],paired_clock_plan:{status:'outside_scope'},paired_clock_facet_queries:[],paired_clock_facet_vectors:[],paired_clock_facet_evidence:[]};return {v,e,extraction,pre};
}
test('audit accepts synthetic arithmetic but rejects source filename/text and forged cosines',()=>{
 const {pre,extraction}=evidence();assert.equal(auditPreCandidate(pre,extraction).cosines,1);
 for(const patch of [{actualCosine:0},{filename:'Foreign.txt'},{sourceText:'Changed.'}])assert.throws(()=>auditPreCandidate({...pre,body_evidence:[{...pre.body_evidence[0],...patch}]},extraction));
});
test('clock facet evidence must align with independently recorded own plans',()=>{
 const {pre,extraction}=evidence();assert.throws(()=>auditPreCandidate({...pre,paired_clock_plan:{status:'planned',facets:[{question:'A different facet?'}]}},extraction));
});
test('selected subclause keeps original containing anchor and actual recorded cosine',()=>{
 const {e,v,extraction}=evidence();const s={citation:1,documentId:'d',filename:'Dial.txt',quote:'copper dial',start:2,end:13,actualCosine:1,cosineAnchor:{id:e.id,start:0,end:e.content.length,actualCosine:1}};
 auditSources({sources:[s]},extraction,[v]);
 for(const patch of [{actualCosine:0},{filename:'Wrong.txt'},{citation:2},{quote:'invented'},{cosineAnchor:{start:2,end:13}}])assert.throws(()=>auditSources({sources:[{...s,...patch}]},extraction,[v]));
});
test('receipt audit uses pack/ID identity and rejects duplicate or reordered submissions',()=>{
 const config={packs:[{name:'One',cases:[{id:'X',question:'A?'},{id:'C',workflow:'comparison'}]},{name:'Two',cases:[{id:'X',question:'B?'}]}]};
 const status={status:'COMPLETE',completed:[{name:'One',cases:2},{name:'Two',cases:1}]};
 const events=[{type:'submission_started',pack:'One',id:'X',original_question:'A?'},{type:'case_captured',pack:'One',id:'X'},{type:'case_captured',pack:'One',id:'C'},{type:'submission_started',pack:'Two',id:'X',original_question:'B?'},{type:'case_captured',pack:'Two',id:'X'}];
 auditOrder(config,status,events);assert.throws(()=>auditOrder(config,status,[...events,events[0]]));assert.throws(()=>auditOrder(config,{...status,status:'BLOCKED'},events));
});
test('freeze and raw seal are write-once and detect changed files, aliases and path escape',async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'v46-adapter-'));
 try{await fs.mkdir(root+'/raw');await fs.writeFile(root+'/raw/run-status.json',JSON.stringify({status:'COMPLETE'}));await fs.writeFile(root+'/raw/data','original');
  assert.equal(await sealRaw(root+'/raw'),2);await assert.rejects(sealRaw(root+'/raw'));
  const seal=await read(root+'/raw-manifest.json');await verifyFiles(root+'/raw',seal.files);
  await fs.writeFile(root+'/raw/data','changed');await assert.rejects(verifyFiles(root+'/raw',seal.files));
  await assert.rejects(verifyFiles(root,[{path:'raw/../raw/data',sha256:sha256('changed')}]));
 }finally{await fs.rm(root,{recursive:true});}
});
test('browser runner preserves pre-candidate persistence and never imports app during module proof',async()=>{
 const text=await fs.readFile('tests/browser-v46-regression.mjs','utf8');assert.ok(text.includes('await load(spec,false)'));
 assert.ok(text.indexOf('assertStudyApproval(process.env.STUDY_APPROVAL)')<text.indexOf('chromium.launch'));
 assert.ok(text.indexOf('await window.persistPreCandidate(')<text.indexOf('fixed:lab.answerWithCoverage('));
 assert.ok(text.includes('pairedClockFacetVectors.push(await lab.semantic.embedText'));
 assert.ok(text.includes('await fs.mkdir(out);'));assert.ok(!text.includes('await fs.mkdir(out,{recursive:true})'));
});

test('approved audit rejects the exact preserved first-review anchor mismatch',async()=>{
 const probe=await read('docs/evidence/v46-execution-review-failure/probe.json');assert.equal(probe.status,'FAIL');
 assert.throws(()=>auditSources({sources:[probe.source]},probe.extraction,[probe.query_vector]),/anchor cosine/i);
 const source=structuredClone(probe.source);source.cosineAnchor.actualCosine=source.actualCosine;
 auditSources({sources:[source]},probe.extraction,[probe.query_vector]);
});
test('anchor metadata cannot bypass finite consistency by omitting or corrupting top-level cosine',()=>{
 const {v,e,extraction}=evidence();const s={citation:1,documentId:'d',filename:'Dial.txt',quote:e.content,start:0,end:e.content.length,actualCosine:1,cosineAnchor:{id:e.id,start:0,end:e.content.length,actualCosine:1}};
 auditSources({sources:[s]},extraction,[v]);
 for(const value of [NaN,Infinity,-Infinity,undefined,'1',0])assert.throws(()=>auditSources({sources:[{...s,cosineAnchor:{...s.cosineAnchor,actualCosine:value}}]},extraction,[v]),/cosine/i);
 for(const value of [undefined,NaN,Infinity])assert.throws(()=>auditSources({sources:[{...s,actualCosine:value}]},extraction,[v]),/cosine/i);
 for(const value of [null,'anchor'])assert.throws(()=>auditSources({sources:[{...s,cosineAnchor:value}]},extraction,[v]),/anchor/i);
});
test('source and anchor agreement still requires the independent arithmetic check',()=>{
 const {v,e,extraction}=evidence();
 const source={citation:1,documentId:'d',filename:'Dial.txt',quote:e.content,start:0,end:e.content.length,actualCosine:0,cosineAnchor:{id:e.id,start:0,end:e.content.length,actualCosine:0}};
 assert.throws(()=>auditSources({sources:[source]},extraction,[v]),/Selected cosine/);
});
test('amendment preserves original freeze and snapshots and rejects masked or unauthorized replacements',async()=>{
 const {applyAmendment,replacements}=await import('../eval/v46-regression-execution/amendment.mjs');
 const base='docs/evidence/v46-regression-732-mac/execution/';
 const freeze={files:[...replacements.map(path=>({path,sha256:'old-'+path})),{path:'candidate.mjs',sha256:'unchanged'}]};
 const a={id:'V46-ANCHOR-AUDIT-20261024',protocol_id:protocolId,study_cases_run:0,candidate_changed:false,original_freeze:{path:base+'freeze-manifest.json',sha256:'original-freeze'},original_config:{path:base+'run-config.json',sha256:'original-config'},replacements:replacements.map(path=>({path,sha256:'new-'+path,previous_sha256:'old-'+path,original_snapshot:{path:'docs/evidence/v46-execution-review-failure/attempt-sources/'+path,sha256:'old-'+path}})),added_files:[{path:'eval/v46-regression-execution/amendment.mjs',sha256:'new'},{path:base+'AMENDMENT.md',sha256:'explanation'}]};
 const ids={freeze_sha256:'original-freeze',config_sha256:'original-config'},before=structuredClone(freeze),effective=applyAmendment(freeze,a,ids);
 assert.deepEqual(freeze,before);assert.equal(effective.snapshots.length,3);assert.equal(effective.files.find(f=>f.path==='candidate.mjs').sha256,'unchanged');
 for(const edit of [x=>x.original_freeze.sha256='changed',x=>x.original_config.sha256='changed',x=>x.replacements.pop(),x=>x.replacements[0].path='candidate.mjs',x=>x.replacements[0].previous_sha256='changed',x=>x.replacements[0].original_snapshot.sha256='changed',x=>x.added_files.push({path:'candidate.mjs',sha256:'changed'}),x=>x.candidate_changed=true]){const x=structuredClone(a);edit(x);assert.throws(()=>applyAmendment(freeze,x,ids));}
});
