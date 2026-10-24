import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {recordDependencies} from '../eval/phase2-fresh64/network.mjs';
assert.ok(process.env.PREFLIGHT_DIR);await fs.mkdir(process.env.PREFLIGHT_DIR);
const browser=await chromium.launch({headless:true,channel:'chrome'});
try{
 const page=await browser.newPage();const dependencies=await recordDependencies(page),pageErrors=[],requestFailures=[];
 page.on('pageerror',e=>pageErrors.push(String(e)));page.on('requestfailed',r=>requestFailures.push({url:new URL(r.url()).origin+new URL(r.url()).pathname,error:r.failure()?.errorText}));
 await page.goto(process.env.TEST_URL||'http://127.0.0.1:8767/');
 await page.waitForFunction(()=>document.querySelector('#doc-count')?.textContent==='3');
 const footer=await page.locator('#retrieval-build').innerText();assert.match(footer,/2026-10-13-r44/);
 const model=await page.evaluate(async()=>{const s=await import('/semantic.mjs?v=20261010-r13');const extractor=await s.loadBrowserEmbedder();const vector=await s.embedText(extractor,'GroundedDesk environment preflight.');return {id:s.MODEL_ID,cdn:s.TRANSFORMERS_CDN,dimensions:vector.length,finite:vector.every(Number.isFinite),dtype:'q8',device:'wasm'};});
 assert.equal(model.dimensions,384);assert.equal(model.finite,true);assert.deepEqual(pageErrors,[]);assert.deepEqual(requestFailures,[]);
 const assets=await dependencies();assert.ok(assets.some(a=>/onnx/.test(a.url)));assert.ok(assets.some(a=>/wasm/.test(a.url)));
 await fs.writeFile(process.env.PREFLIGHT_DIR+'/result.json',JSON.stringify({passed:true,utc:new Date().toISOString(),browser:browser.version(),platform:process.platform,arch:process.arch,node:process.version,footer,document_count:3,model,assets,page_errors:pageErrors,request_failures:requestFailures,fresh_inputs_loaded:false,fresh_questions_submitted:0},null,2)+'\n',{flag:'wx'});
 console.log('PASS: startup and neutral model preflight; '+assets.length+' asset identities; no fresh inputs/questions');
}finally{await browser.close();}
