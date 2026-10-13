// Actual installed Chrome/MiniLM development experiment, not independent accuracy.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
import {revealControl} from './fixtures/workspace-ui.mjs';
const pack=path.resolve('eval/retrieval-quality');
const manifest=JSON.parse(await fs.readFile(path.join(pack,'freeze-manifest.json'),'utf8'));
for(const f of manifest.files)assert.equal(createHash('sha256').update(await fs.readFile(path.join(pack,f.path))).digest('hex'),f.sha256,f.path);
const cases=JSON.parse(await fs.readFile(path.join(pack,'fixed-cases.json'),'utf8'));
const inputFiles=manifest.files.filter(f=>f.path.startsWith('source_docs/'));
const docs=await Promise.all(inputFiles.map(async f=>({name:path.basename(f.path),text:(await fs.readFile(path.join(pack,f.path),'utf8')).trim()})));
const out=path.resolve(process.env.EVIDENCE_DIR||'../../outputs/retrieval-quality-r44-first-development');
await fs.mkdir(out,{recursive:true});
for(const name of ['baseline-ui.json','experiment.json','failure.json']){
  try{await fs.access(path.join(out,name));throw Error(`Existing evidence ${name}; choose a new output directory, never overwrite`);}catch(e){if(e.code!=='ENOENT')throw e;}
}
let browser;
const capture={classification:'Self-authored frozen development baseline, not independent accuracy',frozen:manifest,cases:[]};
try{
  browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'chrome'});capture.browser=browser.version();
  const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
  const page=await context.newPage();const requests=new Set();page.on('request',r=>{if(/onnx|wasm|all-MiniLM/.test(r.url())){const u=new URL(r.url());requests.add(u.origin+u.pathname);}});
  await page.goto(process.env.TEST_URL||'http://127.0.0.1:8765/');await page.waitForFunction(()=>document.querySelector('#doc-count').textContent==='3');
  capture.build=await page.locator('#retrieval-build').innerText();assert.match(capture.build,/2026-10-13-r44/);
  await page.locator('#clear-docs').click();await page.locator('#file-input').setInputFiles(inputFiles.map(f=>path.join(pack,f.path)));
  await page.waitForFunction(()=>document.querySelector('#doc-count').textContent==='4'&&!document.querySelector('#file-input').disabled);
  const ids=await page.locator('.document-card').evaluateAll(cards=>cards.map(c=>({id:c.dataset.documentId,name:c.querySelector('strong').textContent})));
  for(const d of docs)d.id=ids.find(c=>c.name===d.name).id;
  capture.documents=docs;await revealControl(page,'#enable-semantic');
  const begin=Date.now();await page.locator('#enable-semantic').click();await page.waitForFunction(()=>!document.querySelector('#retrieval-mode option[value="hybrid"]').disabled,null,{timeout:240000});
  capture.model_enable_ms=Date.now()-begin;await page.locator('#retrieval-mode').selectOption('hybrid');assert.equal(await page.locator('#answer-mode').inputValue(),'extractive');
  capture.model='Actual Xenova/all-MiniLM-L6-v2 q8 local WASM; Qwen off';
  for(const c of cases){
    await page.locator('#query-input').fill(c.question);await page.locator('#ask-button').click();
    await page.waitForFunction(q=>!document.querySelector('#ask-button').disabled&&document.querySelector('.question-text')?.textContent===q,c.question);
    assert.equal(await page.locator('#retrieval-mode').inputValue(),'hybrid','Do not score an automatic Keyword fallback as MiniLM');
    const quotes=await page.locator('.answer-box .cited-answer-paragraph').allTextContents();
    const sources=await page.locator('.source-card').evaluateAll(cards=>cards.map(c=>({filename:c.querySelector('strong').textContent,excerpt:c.querySelector('.source-excerpt').textContent})));
    sources.forEach((s,i)=>s.quote=quotes[i]?.replace(/^\[\d+\]\s*/,''));
    const row={id:c.id,question:c.question,answer:await page.locator('.answer-box').innerText(),sources,displayed:await page.locator('#answer-result').innerText()};
    capture.cases.push(row);await page.screenshot({path:path.join(out,c.id+'-baseline.png'),fullPage:true});
  }
  capture.requests=[...requests];await fs.writeFile(path.join(out,'baseline-ui.json'),JSON.stringify(capture,null,2),{flag:'wx'});
  // Only after original UI outputs are locked, instrument fixed ranks and run candidate.
  const experiment=await page.evaluate(async({docs,cases})=>{
    const {buildIndex,answerFromCandidates,RETRIEVAL_BUILD}=await import('/retrieval.mjs');
    const {hybridRank}=await import('/hybrid.mjs');
    const {loadBrowserEmbedder,embedChunks,embedText}=await import('/semantic.mjs?v=20261010-r13');
    const extractor=await loadBrowserEmbedder();
    const queries=[];const fixed=buildIndex(docs);
    const indexBegin=performance.now();const fixedVectors=await embedChunks(extractor,fixed.chunks);const fixedIndexMs=performance.now()-indexBegin;
    const run=(c,index,vectors,vector)=>{
      const started=performance.now();const ranked=hybridRank(c.question,index,vector,vectors);const result=answerFromCandidates(c.question,ranked,3,'Local MiniLM + keyword RRF (extractive)');
      return {id:c.id,result,rank_extract_ms:performance.now()-started,top5:ranked.slice(0,5).map(p=>({filename:p.filename,start:p.sourceText.indexOf(p.content,p.start),content:p.content,rrf:p.score,lexical:p.lexicalScore,semantic:p.semanticScore}))};
    };
    const baseline=[];for(const c of cases){const start=performance.now();const vector=await embedText(extractor,c.question);const embedMs=performance.now()-start;queries.push(vector);baseline.push({...run(c,fixed,fixedVectors,vector),query_embed_ms:embedMs});}
    const {buildSectionIndex}=await import('/eval/retrieval-quality/section-index.mjs');const section=buildSectionIndex(docs);
    const sectionBegin=performance.now();const sectionVectors=await embedChunks(extractor,section.chunks);const sectionIndexMs=performance.now()-sectionBegin;
    const candidate=cases.map((c,i)=>run(c,section,sectionVectors,queries[i]));
    return {build:RETRIEVAL_BUILD,baseline,candidate,fixed_passages:fixed.chunks.length,section_passages:section.chunks.length,fixed_index_ms:fixedIndexMs,section_index_ms:sectionIndexMs,query_vectors:queries,heap_used_bytes:performance.memory?.usedJSHeapSize??null,classification:'Instrumented development ranking replay and section-only candidate; real vectors; no production switch'};
  },{docs,cases});
  await fs.writeFile(path.join(out,'experiment.json'),JSON.stringify(experiment,null,2),{flag:'wx'});
  for(let i=0;i<cases.length;i++)assert.deepEqual(experiment.baseline[i].result.sources.map(s=>({filename:s.filename,quote:s.quote,excerpt:s.excerpt})),capture.cases[i].sources,'Fixed instrumentation must reproduce UI quotations/excerpts');
  console.log(JSON.stringify({status:'CAPTURED',cases:cases.length,fixed_passages:experiment.fixed_passages,section_passages:experiment.section_passages,browser:capture.browser,output:out}));
}catch(error){await fs.writeFile(path.join(out,'failure.json'),JSON.stringify({error:error.stack,capture},null,2),{flag:'wx'});process.exitCode=1;console.log(error.stack);}
finally{await browser?.close();}
