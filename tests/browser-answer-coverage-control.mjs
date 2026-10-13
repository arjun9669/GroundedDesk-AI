// Separate Cobalt recovery after pre-question model-state timeout; never reruns RQ28.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
import {revealControl} from './fixtures/workspace-ui.mjs';
const pack=path.resolve('docs/evidence/r29/cobalt16');
const frozen=JSON.parse(await fs.readFile(path.join(pack,'freeze-manifest.json'),'utf8'));
for(const f of frozen.files)assert.equal(createHash('sha256').update(await fs.readFile(path.join(pack,f.path))).digest('hex'),f.sha256);
const key=JSON.parse(await fs.readFile(path.join(pack,'fixed-answer-key.json'),'utf8'));
const files=frozen.files.filter(f=>f.path.startsWith('source_docs/'));
const docs=await Promise.all(files.map(async f=>({id:path.basename(f.path),name:path.basename(f.path),text:await fs.readFile(path.join(pack,f.path),'utf8')})));
const out=path.resolve(process.env.EVIDENCE_DIR||'../../outputs/answer-coverage-r44-cobalt-control');
await fs.mkdir(out,{recursive:true});
for(const name of ['cobalt-control.json','failure.json']){
  try{await fs.access(path.join(out,name));throw Error('Existing observations; never overwrite');}catch(e){if(e.code!=='ENOENT')throw e;}
}
let browser;
try{
  browser=await chromium.launch({headless:true,channel:'chrome'});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.goto(process.env.TEST_URL||'http://127.0.0.1:8786/');
  await page.waitForFunction(()=>document.querySelector('#doc-count').textContent==='3');
  const build=await page.locator('#retrieval-build').innerText();assert.match(build,/2026-10-13-r44/);
  await page.locator('#clear-docs').click();await page.locator('#file-input').setInputFiles(files.map(f=>path.join(pack,f.path)));
  await page.waitForFunction(()=>document.querySelector('#doc-count').textContent==='3'&&!document.querySelector('#file-input').disabled);
  await revealControl(page,'#enable-semantic');await page.locator('#enable-semantic').click();
  await page.waitForFunction(()=>!document.querySelector('#retrieval-mode option[value="hybrid"]').disabled,null,{timeout:240000});
  await page.locator('#retrieval-mode').selectOption('hybrid');assert.equal(await page.locator('#answer-mode').inputValue(),'extractive');
  await page.screenshot({path:path.join(out,'model-ready.png'),fullPage:true});
  const rows=await page.evaluate(async({docs,key})=>{
    const {buildIndex,answerFromCandidates}=await import('/retrieval.mjs');
    const {hybridRank}=await import('/hybrid.mjs');
    const {loadBrowserEmbedder,embedChunks,embedText}=await import('/semantic.mjs?v=20261010-r13');
    const {answerWithCoverage}=await import('/eval/answer-completeness/coverage.mjs');
    const {compareDocuments}=await import('/research.mjs');
    const extractor=await loadBrowserEmbedder(),index=buildIndex(docs),vectors=await embedChunks(extractor,index.chunks);
    const rows=[];
    for(const c of key){
      if(c.workflow==='hybrid'){
        const vector=await embedText(extractor,c.question),ranks=hybridRank(c.question,index,vector,vectors);
        rows.push({id:c.id,workflow:c.workflow,question:c.question,baseline:answerFromCandidates(c.question,ranks),candidate:answerWithCoverage(c.question,ranks)});
      }else{
        const result=compareDocuments(docs.find(d=>d.name===c.expected_files[0]),docs.find(d=>d.name===c.expected_files[1]),c.question);
        rows.push({id:c.id,workflow:'comparison',question:c.question,baseline:result,candidate:result,method:'Separate unchanged lexical Comparison, not Hybrid'});
      }
    }
    return rows;
  },{docs,key});
  await fs.writeFile(path.join(out,'cobalt-control.json'),JSON.stringify({classification:'Known Cobalt16 browser-module regression control; not production main-UI or independent accuracy',recovery:'Initial combined runner timed out before any Cobalt questions; RQ28 outputs were retained without rerun',build,browser:browser.version(),model:'Actual local Xenova/all-MiniLM-L6-v2 q8 WASM, Qwen off',frozen,rows},null,2),{flag:'wx'});
  console.log('Captured 12 real-model Cobalt controls and four unchanged lexical Comparison cases.');
}catch(error){await fs.writeFile(path.join(out,'failure.json'),JSON.stringify({error:error.stack},null,2),{flag:'wx'});throw error;}
finally{await browser?.close();}
