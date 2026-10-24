// Neutral preflight and static preparation only. Never calls candidates or scorers.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {sha256,loadPacks,verifyFiles,verifyIdentity,protocolId,classification,studyRoot} from './integrity.mjs';
import {moduleGraph} from './module-graph.mjs';
import {toolchainIdentity} from '../phase2-fresh64/toolchain.mjs';
import {verifyDependencies} from '../phase2-fresh64/network.mjs';
import {buildIndex} from '../../retrieval.mjs';
import {buildSectionIndex} from '../retrieval-quality/section-index.mjs';
assert.equal(process.env.PREFLIGHT,studyRoot+'/preflight/result.json','Use reserved neutral preflight path');
const base=studyRoot+'/execution/';await fs.mkdir(base);
const preflight=JSON.parse(await fs.readFile(process.env.PREFLIGHT));
assert.equal(preflight.answer_mode,'extractive');assert.equal(preflight.qwen_enabled,false);
assert.equal(preflight.passed,true);assert.equal(preflight.fresh_inputs_loaded,false);assert.equal(preflight.fresh_questions_submitted,0);
assert.equal(preflight.node,process.version);assert.equal(preflight.platform,process.platform);assert.equal(preflight.arch,process.arch);assert.equal(preflight.document_count,3);
assert.deepEqual(preflight.page_errors,[]);assert.deepEqual(preflight.request_failures,[]);assert.match(preflight.footer,/2026-10-13-r44/);
verifyDependencies(preflight.assets,preflight.assets);
assert.equal(preflight.model.id,'Xenova/all-MiniLM-L6-v2');assert.equal(preflight.model.dimensions,384);assert.equal(preflight.model.dtype,'q8');assert.equal(preflight.model.device,'wasm');assert.equal(preflight.model.finite,true);
const packs=await loadPacks();
for(const pack of packs){const docs=await Promise.all(pack.files.map(async(f,i)=>({id:String(i),name:f.name,text:(await fs.readFile(f.path,'utf8')).trim()})));
 assert.ok(docs.every(d=>d.text.length<=180000));assert.ok(buildIndex(docs).chunks.length<=72);assert.ok(buildSectionIndex(docs).chunks.length<=72);
}
const graph=await moduleGraph(process.cwd(),['app.mjs','eval/answer-completeness-v46/coverage.mjs','eval/answer-completeness-v43/coverage.mjs','eval/answer-completeness-v9/coverage.mjs','tests/fixtures/module-identity.mjs','eval/retrieval-quality/section-index.mjs']);
const named=p=>{const f=graph.find(f=>f.path==='/'+p);assert.ok(f,p);return f;};
const candidate={...named('eval/answer-completeness-v46/coverage.mjs'),id:'coverage-v46-comparison-relations'},paired={...named('eval/answer-completeness-v43/coverage.mjs'),id:'coverage-v43-deferred-clock-forms'},helper=named('tests/fixtures/module-identity.mjs');
const module_identity={candidate,paired,helper,dependencies:graph.filter(f=>![candidate.path,paired.path,helper.path].includes(f.path))};verifyIdentity(module_identity);
const environment={browser:preflight.browser,platform:process.platform,arch:process.arch,node:process.version,build:preflight.footer,preflight_sha256:sha256(await fs.readFile(process.env.PREFLIGHT))};
const config={classification,protocol_id:protocolId,preparation_head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),total_questions:732,hybrid:684,lexical_comparison:48,environment,model:preflight.model,assets:preflight.assets,toolchain:await toolchainIdentity(preflight.browser),module_identity,packs};
const protocol=JSON.parse(await fs.readFile('eval/v46-regression-study/protocol-freeze-manifest.json'));await verifyFiles(process.cwd(),protocol.files);
const paths=new Set([...protocol.files.map(f=>f.path),'eval/v46-regression-study/protocol-freeze-manifest.json',...graph.map(f=>f.path.slice(1))]);
for(const p of execFileSync('git',['ls-files','--','*.mjs','index.html','styles.css'],{encoding:'utf8'}).trim().split('\n'))paths.add(p);
for(const dir of ['eval/v46-regression-execution',studyRoot+'/preflight','docs/evidence/v46-execution-engineering'])for(const e of await fs.readdir(dir)){if(!(await fs.stat(dir+'/'+e)).isDirectory())paths.add(dir+'/'+e);}
for(const p of ['tests/browser-v46-regression.mjs','tests/browser-v46-preflight.mjs','tests/v46-execution.test.mjs','eval/v46-regression-execution/EXECUTION_PLAN.md'])paths.add(p);
const files=[];for(const p of [...paths].sort())files.push({path:p,sha256:sha256(await fs.readFile(p))});
const bytes=JSON.stringify(config,null,2)+'\n';files.push({path:base+'run-config.json',sha256:sha256(bytes)});
await fs.writeFile(base+'run-config.json',bytes,{flag:'wx'});
await fs.writeFile(base+'freeze-manifest.json',JSON.stringify({classification,protocol_id:protocolId,frozen_utc:new Date().toISOString(),environment,files},null,2)+'\n',{flag:'wx'});
console.log('Frozen 732 exposed cases and '+files.length+' files. Study NOT RUN; explicit execution approval required.');
