import {createHash} from 'node:crypto';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {recordDependencies,isModelAsset} from '../eval/phase2-fresh64/network.mjs';
assert.equal(process.env.PREFLIGHT_DIR,'docs/evidence/v49-regression-732-mac-attempt2/preflight');
await fs.mkdir('docs/evidence/v49-regression-732-mac-attempt2');
await fs.mkdir(process.env.PREFLIGHT_DIR);
let browser;
try{
 browser=await chromium.launch({headless:true,channel:'chrome'});
 const page=await browser.newPage();const dependencies=await recordDependencies(page),pageErrors=[],requestFailures=[];
 page.on('pageerror',e=>pageErrors.push(String(e)));page.on('requestfailed',r=>requestFailures.push({url:new URL(r.url()).origin+new URL(r.url()).pathname,error:r.failure()?.errorText}));
 await page.goto(process.env.TEST_URL||'http://127.0.0.1:8768/');
 await page.waitForFunction(()=>document.querySelector('#doc-count')?.textContent==='3');
 assert.equal(await page.locator('#answer-mode').inputValue(),'extractive');
 const footer=await page.locator('#retrieval-build').innerText();assert.match(footer,/2026-10-13-r44/);
 const model=await page.evaluate(async()=>{const s=await import('/semantic.mjs?v=20261010-r13');const extractor=await s.loadBrowserEmbedder();const vector=await s.embedText(extractor,'GroundedDesk environment preflight.');return {id:s.MODEL_ID,cdn:s.TRANSFORMERS_CDN,dimensions:vector.length,finite:vector.every(Number.isFinite),dtype:'q8',device:'wasm'};});
 assert.equal(model.dimensions,384);assert.equal(model.finite,true);
 const served=[];
 for(const spec of JSON.parse(await fs.readFile('eval/v49-regression-study/source-identities.json')).files){
  const response=await page.request.get((process.env.TEST_URL||'http://127.0.0.1:8768/')+spec.path);assert.ok(response.ok(),'Served source '+spec.path);
  const bytes=await response.body();assert.equal(createHash('sha256').update(bytes).digest('hex'),spec.sha256,'Served source '+spec.path);served.push({path:'/'+spec.path,sha256:spec.sha256});
 }
 await fs.writeFile(process.env.PREFLIGHT_DIR+'/served-source-identities.json',JSON.stringify({before_questions:true,candidate_calls:0,files:served},null,2)+'\n',{flag:'wx'});
 assert.deepEqual(pageErrors,[]);assert.deepEqual(requestFailures,[]);
 const assets=await dependencies();assert.ok(assets.some(isModelAsset));assert.ok(assets.some(a=>/wasm/.test(a.url)));
 await fs.writeFile(process.env.PREFLIGHT_DIR+'/result.json',JSON.stringify({passed:true,utc:new Date().toISOString(),browser:browser.version(),platform:process.platform,arch:process.arch,node:process.version,footer,document_count:3,model,assets,answer_mode:'extractive',qwen_enabled:false,page_errors:pageErrors,request_failures:requestFailures,fresh_inputs_loaded:false,fresh_questions_submitted:0},null,2)+'\n',{flag:'wx'});
 console.log('PASS: startup and neutral model preflight; '+assets.length+' asset identities; no fresh inputs/questions');
}catch(error){
 await fs.writeFile(process.env.PREFLIGHT_DIR+'/failure.json',JSON.stringify({status:'FAIL',error:{name:error.name,message:error.message,stack:error.stack},fresh_inputs_loaded:false,fresh_questions_submitted:0},null,2)+'\n',{flag:'wx'});throw error;
}finally{await browser?.close();}
