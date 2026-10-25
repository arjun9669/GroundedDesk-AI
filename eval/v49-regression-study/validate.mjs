// Static preparation only: read inputs/source text/hashes, never import a candidate.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const base='eval/v49-regression-study/',protocolId='V49-REGRESSION-732-20261025';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const local=p=>{assert.equal(p,path.posix.normalize(p));assert.ok(!p.startsWith('/')&&!p.startsWith('../'));return path.join(root,p);};
const read=p=>fs.readFile(local(p));
const json=async p=>JSON.parse(await read(p));
async function entry(p){const bytes=await read(p);return {path:p,bytes:bytes.length,sha256:hash(bytes)};}
const exists=async p=>{try{await fs.access(local(p));return true;}catch(error){if(error.code==='ENOENT')return false;throw error;}};
async function verify(f,prefix=''){
 const p=prefix?path.posix.join(prefix,f.path):f.path;
 const real=await fs.realpath(local(p));assert.ok(real.startsWith(await fs.realpath(root)+path.sep),'Repository symlink escape');
 const actual=await entry(p);assert.equal(actual.sha256,f.sha256,'Frozen SHA256: '+p);
 if(f.bytes!==undefined)assert.equal(actual.bytes,f.bytes,'Frozen byte count: '+p);
}
const scope=await json(base+'scope.json'),old=await json('eval/v46-regression-study/scope.json');
assert.equal(scope.protocol_id,protocolId);assert.equal(scope.status,'PROTOCOL_FROZEN_EXECUTION_NOT_READY');
for(const key of ['packs','variants','counts','excluded_originals','original_inventory','paired'])assert.deepEqual(scope[key],old[key],key);
await verify(scope.predecessor_scope);await verify(scope.candidate);await verify(scope.paired);await verify(scope.original_inventory);
assert.equal(scope.candidate.id,'coverage-v49-comparison-events');assert.equal(scope.candidate.path,'eval/answer-completeness-v49/coverage.mjs');
assert.equal(scope.model_runs,0);assert.equal(scope.candidate_calls,0);assert.equal(scope.planner_calls,0);assert.equal(scope.scorer_calls,0);assert.equal(scope.saved_vector_candidate_replays,0);
assert.equal(await exists(scope.future_evidence_root),false,'Future study root must remain absent in protocol preparation');
let cases=0,hybrid=0,comparisons=0,docs=0;
for(const p of scope.packs){
 await verify(p.original_config);await verify(p.original_key);
 const config=await json(p.original_config.path),key=await json(p.original_key.path),pack=config.packs[p.pack_index];
 assert.equal(pack.name,p.name);assert.deepEqual(pack.cases,key);assert.equal(key.length,p.cases);assert.equal(new Set(key.map(k=>k.id)).size,key.length);
 assert.equal(hash(JSON.stringify(key.map(k=>[k.id,k.question]))),p.case_order_sha256);
 const h=key.filter(k=>(k.workflow??'hybrid')==='hybrid').length,c=key.filter(k=>k.workflow==='comparison').length;
 assert.deepEqual([h,c,pack.files.length],[p.hybrid,p.lexical_comparison,p.source_documents],p.name);
 for(const f of pack.files)await verify(f);
 cases+=key.length;hybrid+=h;comparisons+=c;docs+=pack.files.length;
}
assert.deepEqual([scope.packs.length,cases,hybrid,comparisons,docs],[20,732,684,48,83]);
assert.equal(scope.packs.slice(0,19).reduce((n,p)=>n+p.cases,0),668);assert.equal(scope.packs.at(-1).cases,64);
assert.equal(scope.excluded_originals.reduce((n,p)=>n+p.questions,0),103);
const inventory=await json(scope.original_inventory.path);let originalEntries=0;
for(const p of inventory.available)for(const f of p.verified_original_input_files){await verify(f);originalEntries++;}
assert.equal(originalEntries,117);
const seals=[];
const manifests=['eval/v46-regression-study/protocol-freeze-manifest.json','docs/evidence/v49-package3-first-engineering-failure/manifest.json','docs/evidence/v49-package3-approved-engineering/manifest.json','docs/evidence/v48-package2-engineering/manifest.json','docs/evidence/v47-package1-approved-engineering/manifest.json','docs/evidence/v47-preservation-design/manifest.json','docs/evidence/v46-regression-732-mac/review/manifest.json','docs/evidence/v46-regression-732-mac/rescore-01-manifest.json'];
for(const p of manifests){const seal=await json(p);for(const f of seal.files)await verify(f);seals.push({manifest:await entry(p),verified_entries:seal.files.length});}
const originalRaw=await json(scope.prior_study.raw_manifest.path);
for(const f of originalRaw.files)await verify(f,'docs/evidence/v46-regression-732-mac/raw');
assert.equal(originalRaw.files.length,5865);seals.push({manifest:await entry(scope.prior_study.raw_manifest.path),verified_entries:originalRaw.files.length});
for(const key of ['report','native_scores','first_score_failure','review'])await verify(scope.prior_study[key]);
const audit=await json(scope.audit_requirements);assert.equal(audit.protocol_id,protocolId);assert.equal(audit.implemented_for_v49,false);
assert.equal(new Set(audit.required_controls.map(c=>c.id)).size,15);assert.equal(audit.cosine_tolerance,1e-10);assert.equal(audit.vector_dimensions,384);
await verify(audit.historical_reference_only);
// Collect transitive local source identities without executing any module.
const sources=new Map();
async function visit(p){
 p=path.posix.normalize(p.split('?')[0]);if(sources.has(p))return;
 assert.ok(p.endsWith('.mjs'));const bytes=await read(p);sources.set(p,await entry(p));
 for(const m of bytes.toString('utf8').matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)['"]([^'"]+)['"]/g)){
  if(!m[1].startsWith('.')&&!m[1].startsWith('/'))continue;
  await visit(m[1].startsWith('/')?m[1].slice(1):path.posix.join(path.posix.dirname(p),m[1]));
 }
}
for(const p of ['app.mjs',scope.candidate.path,scope.paired.path,'eval/answer-completeness-v9/coverage.mjs','tests/fixtures/module-identity.mjs','eval/retrieval-quality/section-index.mjs'])await visit(p);
const graph={protocol_id:protocolId,classification:'Static transitive local source identities; not served-byte or runtime/model measurement',candidate_id:scope.candidate.id,files:[...sources.values()].sort((a,b)=>a.path.localeCompare(b.path))};
const result={protocol_id:protocolId,classification:'Read-only static protocol/input/source/seal validation; no candidate/planner/model/scorer call',status:'PASS',packs:20,cases,hybrid,lexical_comparison:comparisons,source_documents:docs,historical_original_input_entries:originalEntries,excluded_original_cases:103,transitive_local_modules:graph.files.length,prospective_audit_controls:15,checks:['Exact prior scope/config/key/order/pair/rubric parity','Original source/key/native-reference SHA256s and117 inventory entries','Prior candidate/first-failure/failed-study seals unchanged','All5865 original v46 raw artifact hashes unchanged','Static transitive local import identities without module execution','Future v49 study root absent; no raw/score placeholders','Prospective explicit-anchor and legacy body-ID requirements declared before capture'],seals,execution_adapter:'V49 NOT IMPLEMENTED; V46 reference tooling only',current_environment_preflight:'NOT RUN FOR V49',candidate_calls:0,planner_calls:0,model_calls:0,scorer_calls:0,saved_vector_candidate_replays:0};
if(process.argv.includes('--write-result')){
 for(const p of [base+'STATIC_VALIDATION.json',base+'source-identities.json'])assert.equal(await exists(p),false,'Write-once preparation output exists: '+p);
 await fs.writeFile(local(base+'STATIC_VALIDATION.json'),JSON.stringify(result,null,2)+'\n',{flag:'wx'});
 await fs.writeFile(local(base+'source-identities.json'),JSON.stringify(graph,null,2)+'\n',{flag:'wx'});
}
if(await exists(base+'protocol-freeze-manifest.json')){const seal=await json(base+'protocol-freeze-manifest.json');for(const f of seal.files)await verify(f);assert.equal(seal.execution_ready,false);assert.equal(seal.model_study_run,false);}
console.log(JSON.stringify(result,null,2));
