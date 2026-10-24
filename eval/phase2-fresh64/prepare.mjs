// Publish this complete execution freeze before uploading fresh sources/questions.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {sha256,verifyFiles} from './integrity.mjs';
import {toolchainIdentity} from './toolchain.mjs';
import {buildIndex} from '../../retrieval.mjs';
import {buildSectionIndex} from '../retrieval-quality/section-index.mjs';
const base='eval/phase2-fresh64/';
assert.ok(process.env.PREFLIGHT,'Explicit approved neutral preflight required');
for(const f of ['run-config.json','freeze-manifest.json'])assert.equal(await fs.access(base+f).then(()=>true,()=>false),false,'Never overwrite execution freeze');
const input=JSON.parse(await fs.readFile(base+'input-freeze-manifest.json'));await verifyFiles(process.cwd(),input.files);
const preflight=JSON.parse(await fs.readFile(process.env.PREFLIGHT));
assert.equal(preflight.passed,true);assert.equal(preflight.fresh_questions_submitted,0);assert.equal(preflight.fresh_inputs_loaded,false);
assert.equal(preflight.node,process.version);assert.equal(preflight.platform,process.platform);assert.equal(preflight.arch,process.arch);
assert.deepEqual(preflight.page_errors,[]);assert.deepEqual(preflight.request_failures,[]);
const key=JSON.parse(await fs.readFile(base+'fixed-answer-key.json'));
assert.equal(key.length,64);assert.equal(new Set(key.map(k=>k.id)).size,64);assert.equal(new Set(key.map(k=>k.question)).size,64);
assert.equal(key.filter(k=>k.workflow==='hybrid').length,56);assert.equal(key.filter(k=>k.unsupported).length,16);
const files=input.files.filter(f=>f.path.includes('/source_docs/')).map(f=>({...f,name:f.path.split('/').at(-1)}));assert.equal(files.length,8);
const docs=await Promise.all(files.map(async(f,i)=>({id:'static-'+i,name:f.name,text:await fs.readFile(f.path,'utf8')})));
for(const k of key){assert.deepEqual(k.expected_documents,k.expected_sources.map(s=>s.filename));for(const e of k.expected_sources){const d=docs.find(d=>d.name===e.filename);assert.ok(d.text.includes(e.context));for(const g of e.groups)assert.ok(g.length&&g.every(a=>e.context.includes(a)));}}
const fixed=buildIndex(docs),section=buildSectionIndex(docs);assert.ok(fixed.chunks.length<=72&&section.chunks.length<=72);
assert.ok(docs.every(d=>d.text.length<=180000));
const prior=JSON.parse(await fs.readFile('eval/v43-all-available-regression/run-config.json'));
const environment={browser:preflight.browser,platform:process.platform,arch:process.arch,node:process.version,build:preflight.footer,preflight_sha256:sha256(await fs.readFile(process.env.PREFLIGHT))};
const config={classification:'Fresh64 first prospective author-created confirmation; not independent accuracy',preparation_head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),total_questions:64,hybrid:56,lexical_comparison:8,environment,model:preflight.model,assets:preflight.assets,toolchain:await toolchainIdentity(preflight.browser),module_identity:prior.module_identity,packs:[{name:'Fresh64',files,cases:key,integrity:'Original prospective input bytes; no candidate tuning or fresh probing before this freeze'}]};
const specs=new Map();for(const f of [config.module_identity.candidate,config.module_identity.paired,config.module_identity.helper,...config.module_identity.dependencies]){if(specs.has(f.path))assert.equal(specs.get(f.path).sha256,f.sha256,'Conflicting module identity');specs.set(f.path,f);}await verifyFiles(process.cwd(),[...specs.values()]);
const tracked=execFileSync('git',['ls-files','--','*.mjs','index.html','styles.css'],{encoding:'utf8'}).trim().split('\n');
const paths=new Set([...tracked,...input.files.map(f=>f.path),base+'input-freeze-manifest.json',process.env.PREFLIGHT,base+'EXECUTION_PLAN.md',base+'integrity.mjs',base+'network.mjs',base+'prepare.mjs',base+'score.mjs',base+'audit.mjs',base+'toolchain.mjs','tests/browser-phase2-preflight.mjs','tests/browser-phase2-fresh64.mjs','tests/phase2-fresh64.test.mjs']);
async function archive(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=dir+'/'+e.name;if(e.isDirectory())await archive(p);else paths.add(p);}}
for(const d of ['docs/evidence/phase2-fresh64-preparation','docs/evidence/phase2-fresh64-preparation-approved','docs/evidence/phase2-fresh64-network-diagnostic','docs/evidence/phase2-fresh64-preflight-redirect-fixed'])await archive(d);
const frozen=[];for(const p of [...paths].sort())frozen.push({path:p,sha256:sha256(await fs.readFile(p))});
const bytes=JSON.stringify(config,null,2)+'\n';frozen.push({path:base+'run-config.json',sha256:sha256(bytes)});
await fs.writeFile(base+'run-config.json',bytes,{flag:'wx'});
await fs.writeFile(base+'freeze-manifest.json',JSON.stringify({classification:config.classification,frozen_utc:new Date().toISOString(),environment,files:frozen},null,2)+'\n',{flag:'wx'});
console.log('Frozen 64 prospective cases and '+frozen.length+' files; models not invoked on fresh inputs.');
