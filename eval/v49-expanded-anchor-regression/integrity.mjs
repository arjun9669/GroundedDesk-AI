import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {sha256,localPath} from '../phase2-fresh64/integrity.mjs';
export {sha256,localPath};
export const protocolId='V49-REGRESSION-732-20261025';
export const classification='V49 732-case exposed regression; 668 historical preservation plus exposed Fresh64; not prospective confirmation';
export const studyRoot='docs/evidence/v49-regression-732-mac-attempt3';
export async function verifyFiles(root,files){
 const seen=new Set();for(const f of files){
  assert.equal(f.path,path.posix.normalize(f.path));assert.ok(f.path&&f.path!=='..'&&!f.path.startsWith('../')&&!f.path.startsWith('/')&&!seen.has(f.path),'Unique repository-relative freeze paths required');seen.add(f.path);
  const p=localPath(root,f.path),real=await fs.realpath(p);assert.ok(real.startsWith(await fs.realpath(root)+path.sep),'Symlink escapes repository');
  const bytes=await fs.readFile(p);assert.equal(sha256(bytes),f.sha256,'Frozen bytes: '+f.path);
  if(f.bytes!==undefined)assert.equal(bytes.length,f.bytes,'Frozen byte count: '+f.path);
 }
}
export async function loadPacks(root=process.cwd()){
 const read=async p=>JSON.parse(await fs.readFile(localPath(root,p)));
 const scope=await read('eval/v49-regression-study/scope.json');assert.equal(scope.protocol_id,protocolId);
 const seal=await read('eval/v49-regression-study/protocol-freeze-manifest.json');await verifyFiles(root,seal.files);
 const packs=[];
 for(const item of scope.packs){
  await verifyFiles(root,[item.original_config,item.original_key]);
  const original=(await read(item.original_config.path)).packs[item.pack_index],key=await read(item.original_key.path);
  assert.equal(original.name,item.name);assert.deepEqual(original.cases,key);assert.equal(key.length,item.cases);
  assert.equal(new Set(key.map(k=>k.id)).size,key.length);
  assert.equal(sha256(JSON.stringify(key.map(k=>[k.id,k.question]))),item.case_order_sha256);
  await verifyFiles(root,original.files.map(({path,sha256})=>({path,sha256})));
  packs.push({...original,integrity:'Original immutable key/source bytes; exposed v49 regression, not fresh confirmation'});
 }
 assert.deepEqual([packs.length,packs.reduce((n,p)=>n+p.cases.length,0),packs.reduce((n,p)=>n+p.cases.filter(k=>(k.workflow??'hybrid')==='hybrid').length,0)],[20,732,684]);
 return packs;
}
export function verifyIdentity(identity){
 assert.equal(identity.candidate.id,'coverage-v49-comparison-events');assert.equal(identity.candidate.path,'/eval/answer-completeness-v49/coverage.mjs');
 assert.equal(identity.paired.id,'coverage-v43-deferred-clock-forms');assert.equal(identity.paired.path,'/eval/answer-completeness-v43/coverage.mjs');
 assert.equal(new Set([identity.candidate.path,identity.paired.path,identity.helper.path,...identity.dependencies.map(d=>d.path)]).size,identity.dependencies.length+3,'Distinct module identities required');
}
export async function verifyRun(root,config,freeze){
 assert.equal(config.classification,classification);assert.equal(config.protocol_id,protocolId);
 assert.deepEqual([config.total_questions,config.hybrid,config.lexical_comparison],[732,684,48]);verifyIdentity(config.module_identity);
 assert.deepEqual(config.environment,freeze.environment);
 assert.equal(freeze.protocol_id,protocolId);assert.equal(freeze.classification,classification);
 const base=studyRoot+'/execution/';
 assert.deepEqual(config,JSON.parse(await fs.readFile(localPath(root,base+'run-config.json'))));
 assert.deepEqual(freeze,JSON.parse(await fs.readFile(localPath(root,base+'freeze-manifest.json'))));
 const effective=freeze;await verifyFiles(root,effective.files);
 assert.deepEqual(config.packs,await loadPacks(root));
 for(const f of [config.module_identity.candidate,config.module_identity.paired,config.module_identity.helper,...config.module_identity.dependencies]){
  assert.ok(effective.files.some(s=>'/'+s.path===f.path&&s.sha256===f.sha256),'Served module absent from execution seal');
 }
}
export function assertStudyApproval(value){assert.equal(value,protocolId,'Explicit study execution approval token required');}
export function verifyPublished(root=process.cwd()){
 assert.equal(execFileSync('git',['branch','--show-current'],{cwd:root,encoding:'utf8'}).trim(),'main');
 assert.equal(execFileSync('git',['status','--porcelain'],{cwd:root,encoding:'utf8'}).trim(),'','Clean tree required before study');
 const head=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
 assert.equal(execFileSync('git',['ls-remote','origin','refs/heads/main'],{cwd:root,encoding:'utf8'}).trim().split(/\s+/)[0],head,'Publish execution freeze before study');return head;
}
