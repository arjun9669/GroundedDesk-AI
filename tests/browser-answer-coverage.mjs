// Actual installed Chrome / MiniLM experiment; no production UI switch.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {revealControl} from './fixtures/workspace-ui.mjs';

const pack=path.resolve('eval/retrieval-quality');
const coveragePack=path.resolve('eval/answer-completeness');
const original=JSON.parse(await fs.readFile('docs/evidence/retrieval-quality-r44/experiment.json','utf8'));
const ui=JSON.parse(await fs.readFile('docs/evidence/retrieval-quality-r44/baseline-ui.json','utf8'));
const check=async(dir,name)=>{
  const manifest=JSON.parse(await fs.readFile(path.join(dir,name),'utf8'));
  for(const item of manifest.files)assert.equal(createHash('sha256').update(await fs.readFile(path.join(dir,item.path))).digest('hex'),item.sha256,item.path);
  return manifest;
};
const frozen=await check(pack,'freeze-manifest.json');
const coverageFrozen=await check(coveragePack,'freeze-manifest.json');
assert.equal(createHash('sha256').update(await fs.readFile(path.join(pack,'freeze-manifest.json'))).digest('hex'),coverageFrozen.inputs_manifest_sha256);
const cases=JSON.parse(await fs.readFile(path.join(pack,'fixed-cases.json'),'utf8'));
const cobaltPack=path.resolve('docs/evidence/r29/cobalt16');
const cobaltFrozen=await check(cobaltPack,'freeze-manifest.json');
const cobaltKey=JSON.parse(await fs.readFile(path.join(cobaltPack,'fixed-answer-key.json'),'utf8'));
const cobaltDocs=await Promise.all(cobaltFrozen.files.filter(f=>f.path.startsWith('source_docs/')).map(async f=>({id:path.basename(f.path),name:path.basename(f.path),text:await fs.readFile(path.join(cobaltPack,f.path),'utf8')})));
const out=path.resolve(process.env.EVIDENCE_DIR||'../../outputs/answer-coverage-r44-first-experiment');
await fs.mkdir(out,{recursive:true});
for(const name of ['baseline-replay.json','candidate.json','cobalt-control.json','failure.json']){
  try{await fs.access(path.join(out,name));throw Error('Never overwrite original observations: '+name);}catch(e){if(e.code!=='ENOENT')throw e;}
}
const metadata={classification:'Known development regression; browser-module outputs, not production UI accuracy or independent evaluation',frozen,coverageFrozen,cobaltFrozen};
let browser;
try{
  browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'chrome'});
  metadata.browser=browser.version();
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const requests=new Set();page.on('request',r=>{if(/onnx|wasm|all-MiniLM/.test(r.url())){const u=new URL(r.url());requests.add(u.origin+u.pathname);}});
  await page.goto(process.env.TEST_URL||'http://127.0.0.1:8786/');
  await page.waitForFunction(()=>document.querySelector('#doc-count').textContent==='3');
  metadata.build=await page.locator('#retrieval-build').innerText();assert.match(metadata.build,/2026-10-13-r44/);
  await page.locator('#clear-docs').click();
  await page.locator('#file-input').setInputFiles(frozen.files.filter(f=>f.path.startsWith('source_docs/')).map(f=>path.join(pack,f.path)));
  await page.waitForFunction(()=>document.querySelector('#doc-count').textContent==='4'&&!document.querySelector('#file-input').disabled);
  await revealControl(page,'#enable-semantic');
  await page.locator('#enable-semantic').click();
  await page.waitForFunction(()=>!document.querySelector('#retrieval-mode option[value="hybrid"]').disabled,null,{timeout:240000});
  await page.locator('#retrieval-mode').selectOption('hybrid');
  assert.equal(await page.locator('#answer-mode').inputValue(),'extractive');
  metadata.model='Actual local Xenova/all-MiniLM-L6-v2 q8 WASM, Qwen disabled';
  const replay=await page.evaluate(async({docs,cases})=>{
    const retrieval=await import('/retrieval.mjs');
    const {hybridRank}=await import('/hybrid.mjs');
    const semantic=await import('/semantic.mjs?v=20261010-r13');
    const {buildSectionIndex}=await import('/eval/retrieval-quality/section-index.mjs');
    const extractor=await semantic.loadBrowserEmbedder();
    const fixed=retrieval.buildIndex(docs),section=buildSectionIndex(docs);
    const fixedVectors=await semantic.embedChunks(extractor,fixed.chunks);
    const sectionVectors=await semantic.embedChunks(extractor,section.chunks);
    const rows=[],state=[];
    for(const c of cases){
      const vector=await semantic.embedText(extractor,c.question);
      const fixedRanks=hybridRank(c.question,fixed,vector,fixedVectors);
      const sectionRanks=hybridRank(c.question,section,vector,sectionVectors);
      state.push({c,fixedRanks,sectionRanks});
      rows.push({id:c.id,question:c.question,fixed:retrieval.answerFromCandidates(c.question,fixedRanks),section:retrieval.answerFromCandidates(c.question,sectionRanks)});
    }
    window.coverageLab={state,extractor,retrieval,semantic,hybridRank};
    return {rows,passages:{fixed:fixed.chunks.length,section:section.chunks.length}};
  },{docs:ui.documents,cases});
  const comparable=r=>r.sources.map(s=>({filename:s.filename,quote:s.quote,excerpt:s.excerpt}));
  for(let i=0;i<cases.length;i++){
    assert.deepEqual(comparable(replay.rows[i].fixed),comparable(original.baseline[i].result),'Fixed original replay '+cases[i].id);
    assert.deepEqual(comparable(replay.rows[i].section),comparable(original.candidate[i].result),'Section original replay '+cases[i].id);
  }
  await fs.writeFile(path.join(out,'baseline-replay.json'),JSON.stringify({...metadata,...replay},null,2),{flag:'wx'});
  const candidate=await page.evaluate(async()=>{
    const {answerWithCoverage}=await import('/eval/answer-completeness/coverage.mjs');
    window.coverageLab.answerWithCoverage=answerWithCoverage;
    return window.coverageLab.state.map(({c,fixedRanks,sectionRanks})=>({id:c.id,question:c.question,
      fixed:answerWithCoverage(c.question,fixedRanks),section:answerWithCoverage(c.question,sectionRanks),
      ranked_top5:{fixed:fixedRanks.slice(0,5).map(p=>({filename:p.filename,start:p.start,content:p.content})),section:sectionRanks.slice(0,5).map(p=>({filename:p.filename,start:p.start,content:p.content}))}}));
  });
  metadata.model_requests=[...requests];
  await fs.writeFile(path.join(out,'candidate.json'),JSON.stringify({...metadata,rows:candidate},null,2),{flag:'wx'});
  for(const row of candidate){
    await page.evaluate(row=>{
      document.querySelector('#coverage-lab-view')?.remove();
      const view=document.createElement('article');view.id='coverage-lab-view';
      Object.assign(view.style,{position:'absolute',left:'0',top:'0',width:'1400px',background:'#fff',color:'#111',padding:'24px',zIndex:'99999',font:'16px sans-serif',whiteSpace:'pre-wrap'});
      view.textContent=`EXPERIMENTAL BROWSER-MODULE OUTPUT — not the production Q&A UI\nActual local MiniLM / Qwen off / production r44 unchanged\n\n${row.id}: ${row.question}\n\n`+['fixed','section'].map(name=>`${name.toUpperCase()} + COVERAGE\n${row[name].answer}\n`+row[name].sources.map(s=>`SOURCE: ${s.filename}\nDISPLAYED QUOTE: ${s.quote}`).join('\n\n')).join('\n\n');
      document.body.append(view);
    },row);
    await page.locator('#coverage-lab-view').screenshot({path:path.join(out,row.id+'-lab.png')});
  }
  await page.evaluate(()=>document.querySelector('#coverage-lab-view')?.remove());
  // Separate unchanged original Cobalt source files; never ingest its key.
  await page.locator('#clear-docs').click();
  await page.locator('#file-input').setInputFiles(cobaltFrozen.files.filter(f=>f.path.startsWith('source_docs/')).map(f=>path.join(cobaltPack,f.path)));
  await page.waitForFunction(()=>document.querySelector('#doc-count').textContent==='3'&&!document.querySelector('#file-input').disabled);
  if(await page.locator('#retrieval-mode option[value="hybrid"]').isDisabled()){
    await revealControl(page,'#enable-semantic');
    await page.locator('#enable-semantic').click();
    await page.waitForFunction(()=>!document.querySelector('#retrieval-mode option[value="hybrid"]').disabled,null,{timeout:240000});
  }
  await page.locator('#retrieval-mode').selectOption('hybrid');
  const cobalt=await page.evaluate(async({docs,key})=>{
    const lab=window.coverageLab;
    const {compareDocuments}=await import('/research.mjs');
    const index=lab.retrieval.buildIndex(docs),vectors=await lab.semantic.embedChunks(lab.extractor,index.chunks);
    const rows=[];
    for(const c of key){
      if(c.workflow==='hybrid'){
        const vector=await lab.semantic.embedText(lab.extractor,c.question);
        const ranks=lab.hybridRank(c.question,index,vector,vectors);
        rows.push({id:c.id,workflow:c.workflow,question:c.question,baseline:lab.retrieval.answerFromCandidates(c.question,ranks),candidate:lab.answerWithCoverage(c.question,ranks)});
      }else{
        const result=compareDocuments(docs.find(d=>d.name===c.expected_files[0]),docs.find(d=>d.name===c.expected_files[1]),c.question);
        rows.push({id:c.id,workflow:'comparison',question:c.question,baseline:result,candidate:result,method:'Separate unchanged lexical Comparison; not Hybrid'});
      }
    }
    return {rows,passages:index.chunks.length};
  },{docs:cobaltDocs,key:cobaltKey});
  await fs.writeFile(path.join(out,'cobalt-control.json'),JSON.stringify({...metadata,...cobalt},null,2),{flag:'wx'});
  console.log(JSON.stringify({status:'CAPTURED',browser:metadata.browser,development_cases:cases.length,cobalt_controls:cobalt.rows.length,out}));
}catch(error){await fs.writeFile(path.join(out,'failure.json'),JSON.stringify({...metadata,error:error.stack},null,2),{flag:'wx'});console.error(error);process.exitCode=1;}
finally{await browser?.close();}
