// Installed Chrome, actual local MiniLM; production UI and isolated candidates distinguished.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
import {revealControl} from './fixtures/workspace-ui.mjs';
const configPath=path.resolve(process.env.RUN_CONFIG||'../../outputs/coverage-v5-inputs/run-config.json');
const config=JSON.parse(await fs.readFile(configPath,'utf8'));
const out=path.resolve(process.env.EVIDENCE_DIR||'../../outputs/coverage-v5-validation-first-run');
await fs.mkdir(out,{recursive:true});
assert.equal((await fs.readdir(out)).length,0,'Choose a new empty evidence directory; never overwrite');
for(const pack of config.packs)for(const file of pack.files)assert.equal(createHash('sha256').update(await fs.readFile(file.path)).digest('hex'),file.sha256,file.name);
const normalize=s=>String(s??'').replace(/\s+/g,' ').trim();
let browser,activePack,activeCase;
const completed=[];
try{
  browser=await chromium.launch({headless:true,channel:'chrome'});
  const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
  const page=await context.newPage();const requests=new Set();
  page.on('request',r=>{if(/onnx|wasm|all-MiniLM/.test(r.url())){const u=new URL(r.url());requests.add(u.origin+u.pathname);}});
  await page.goto(process.env.TEST_URL||'http://127.0.0.1:8786/');
  await page.waitForFunction(()=>document.querySelector('#doc-count').textContent==='3');
  const build=await page.locator('#retrieval-build').innerText();assert.match(build,/2026-10-13-r44/);
  for(const pack of config.packs){
    activePack=pack.name;activeCase=null;
    const dir=path.join(out,pack.name);await fs.mkdir(dir);
    await page.locator('#clear-docs').click();
    await page.locator('#file-input').setInputFiles(pack.files.map(f=>f.path));
    await page.waitForFunction(count=>document.querySelector('#doc-count').textContent===String(count)&&!document.querySelector('#file-input').disabled,pack.files.length,{timeout:120000});
    await revealControl(page,'#enable-semantic');
    await page.locator('#enable-semantic').click();
    await page.waitForFunction(()=>!document.querySelector('#retrieval-mode option[value="hybrid"]').disabled,null,{timeout:240000});
    await page.locator('#retrieval-mode').selectOption('hybrid');
    assert.equal(await page.locator('#answer-mode').inputValue(),'extractive');
    await page.screenshot({path:path.join(dir,'model-ready.png'),fullPage:true});
    const ids=await page.locator('.document-card').evaluateAll(cards=>cards.map(c=>({id:c.dataset.documentId,name:c.querySelector('strong').textContent})));
    const inputs=await Promise.all(pack.files.map(async f=>({...f,id:ids.find(i=>i.name===f.name).id,
      ...(f.name.endsWith('.pdf')?{pdf_base64:(await fs.readFile(f.path)).toString('base64')}:{text:await fs.readFile(f.path,'utf8')})})));
    const docs=await page.evaluate(async inputs=>{
      const docs=[];
      const {readPDFFile}=await import('/pdf-ingest.mjs');
      for(const input of inputs){
        if(input.pdf_base64){
          const bytes=Uint8Array.from(atob(input.pdf_base64),c=>c.charCodeAt(0));
          const extracted=await readPDFFile(new File([bytes],input.name,{type:'application/pdf'}));
          docs.push({id:input.id,name:input.name,...extracted});
        }else docs.push({id:input.id,name:input.name,text:input.text.trim()});
      }
      const retrieval=await import('/retrieval.mjs');
      const semantic=await import('/semantic.mjs?v=20261010-r13');
      const {hybridRank}=await import('/hybrid.mjs');
      const {buildSectionIndex}=await import('/eval/retrieval-quality/section-index.mjs');
      const {answerWithCoverage}=await import('/eval/answer-completeness-v5/coverage.mjs');
      const {compareDocuments}=await import('/research.mjs');
      const extractor=await semantic.loadBrowserEmbedder(),fixed=retrieval.buildIndex(docs);
      const fixedVectors=await semantic.embedChunks(extractor,fixed.chunks);
      const section=buildSectionIndex(docs),sectionVectors=await semantic.embedChunks(extractor,section.chunks);
      window.v5Lab={docs,retrieval,semantic,hybridRank,answerWithCoverage,compareDocuments,extractor,fixed,fixedVectors,section,sectionVectors};
      return {documents:docs,passages:{fixed:fixed.chunks.length,section:section.chunks.length}};
    },inputs);
    await fs.writeFile(path.join(dir,'source-extraction.json'),JSON.stringify(docs,null,2),{flag:'wx'});
    const capture={name:pack.name,classification:'Known in-sample real-model regression; all prior first results preserved',build,browser:browser.version(),model:'Actual local Xenova/all-MiniLM-L6-v2 q8 WASM; Qwen disabled',integrity:pack.integrity,files:pack.files.map(({name,sha256})=>({name,sha256})),passages:docs.passages,cases:[]};
    for(const c of pack.cases){
      activeCase=c.id;const hybrid=(c.workflow||'hybrid').toLowerCase()==='hybrid';
      let ui;
      if(hybrid){
        await revealControl(page,'#query-input');
        await page.locator('#query-input').fill(c.question);await page.locator('#ask-button').click();
        await page.waitForFunction(q=>!document.querySelector('#ask-button').disabled&&document.querySelector('.question-text')?.textContent===q,c.question,{timeout:120000});
        assert.equal(await page.locator('#retrieval-mode').inputValue(),'hybrid','Never score a Keyword fallback as MiniLM');
        const quotes=await page.locator('.answer-box .cited-answer-paragraph').allTextContents();
        const sources=await page.locator('.source-card').evaluateAll(cards=>cards.map(card=>({filename:card.querySelector('strong').textContent,excerpt:card.querySelector('.source-excerpt').textContent})));
        sources.forEach((s,i)=>s.quote=quotes[i]?.replace(/^\[\d+\]\s*/,''));
        ui={answer:await page.locator('.answer-box').innerText(),sources,displayed:await page.locator('#answer-result').innerText()};
      }else{
        const files=c.expected_documents||c.expected_files||c.source_files;
        assert.equal(files.length,2,'Preserve original comparison document pair');
        await revealControl(page,'#compare-left');
        await page.locator('#compare-left').selectOption({label:files[0]});await page.locator('#compare-right').selectOption({label:files[1]});
        await page.locator('#compare-topic').fill(c.question);await page.locator('#run-comparison').click();
        await page.locator('#research-result-title').getByText('Side-by-side excerpts',{exact:true}).waitFor({state:'visible'});
        const sources=await page.locator('.research-evidence').evaluateAll(cards=>cards.map(card=>({filename:card.querySelector('h4').textContent.replace(/^\[\d+\]\s*/,''),quote:card.querySelector('.research-evidence-text').textContent})));
        ui={answer:sources.map((s,i)=>`[${i+1}] ${s.quote}`).join('\n\n'),sources,displayed:await page.locator('#research-result-body').innerText()};
      }
      // Lock the actual UI output before any experimental candidate for this case.
      await fs.writeFile(path.join(dir,c.id+'-ui.json'),JSON.stringify({id:c.id,question:c.question,workflow:c.workflow,...ui},null,2),{flag:'wx'});
      await page.screenshot({path:path.join(dir,c.id+'-ui.png'),fullPage:true});
      const computed=await page.evaluate(async c=>{
        const lab=window.v5Lab;
        if((c.workflow||'hybrid').toLowerCase()==='hybrid'){
          const query=await lab.semantic.embedText(lab.extractor,c.question);
          const ranks=lab.hybridRank(c.question,lab.fixed,query,lab.fixedVectors);
          const sectionRanks=lab.hybridRank(c.question,lab.section,query,lab.sectionVectors);
          return {baseline:lab.retrieval.answerFromCandidates(c.question,ranks),fixed:lab.answerWithCoverage(c.question,ranks),section:lab.answerWithCoverage(c.question,sectionRanks),
            query_vector:query,top5:{fixed:ranks.slice(0,5).map(p=>({filename:p.filename,start:p.start,content:p.content})),section:sectionRanks.slice(0,5).map(p=>({filename:p.filename,start:p.start,content:p.content}))}};
        }
        const names=c.expected_documents||c.expected_files||c.source_files;
        const result=lab.compareDocuments(lab.docs.find(d=>d.name===names[0]),lab.docs.find(d=>d.name===names[1]),c.question);
        const adapted={...result,sources:result.sources.map(s=>({...s,quote:s.excerpt})),answer:result.sources.map(s=>`[${s.citation}] ${s.excerpt}`).join('\n\n')};
        return {baseline:adapted,fixed:adapted,section:adapted,method:'Separate unchanged lexical Comparison, not MiniLM'};
      },{id:c.id,question:c.question,workflow:c.workflow||'hybrid',expected_files:c.expected_documents||c.expected_files||c.source_files});
      const comparable=sources=>sources.map(s=>({filename:s.filename,quote:normalize(s.quote),...(hybrid?{excerpt:normalize(s.excerpt)}:{})}));
      assert.deepEqual(comparable(computed.baseline.sources),comparable(ui.sources),'Instrumented production must reproduce actual UI source output '+pack.name+'/'+c.id);
      const record={id:c.id,question:c.question,workflow:hybrid?'hybrid':'comparison',ui,...computed};
      await fs.writeFile(path.join(dir,c.id+'-candidate.json'),JSON.stringify(record,null,2),{flag:'wx'});capture.cases.push(record);
      if(pack.name==='RetrievalQuality28'&&c.id==='RQ13'){
        await page.evaluate(record=>{
          const panel=document.createElement('article');panel.id='v3-lab-panel';Object.assign(panel.style,{position:'absolute',top:'0',left:'0',width:'1400px',padding:'24px',background:'#fff',color:'#111',font:'18px sans-serif',whiteSpace:'pre-wrap',zIndex:99999});
          panel.textContent='V5 EXPERIMENTAL BROWSER-MODULE OUTPUT — production unchanged\nActual local MiniLM / Qwen off\n\n'+record.question+'\n\nFIXED + V5\n'+record.fixed.answer+'\n\nSECTION + V5\n'+record.section.answer;document.body.append(panel);
        },record);
        await page.locator('#v3-lab-panel').screenshot({path:path.join(dir,'RQ13-candidate-lab.png')});await page.evaluate(()=>document.querySelector('#v3-lab-panel').remove());
      }
    }
    capture.model_requests=[...requests];await fs.writeFile(path.join(dir,'capture.json'),JSON.stringify(capture,null,2),{flag:'wx'});
    completed.push({name:pack.name,cases:capture.cases.length});console.log('Captured '+pack.name+': '+capture.cases.length+' original cases; not yet graded.');
  }
  await fs.writeFile(path.join(out,'run-status.json'),JSON.stringify({status:'COMPLETE',completed,browser:browser.version(),build,production_change:'NONE'},null,2),{flag:'wx'});
}catch(error){await fs.writeFile(path.join(out,'failure.json'),JSON.stringify({status:'BLOCKED',activePack,activeCase,completed,error:error.stack},null,2),{flag:'wx'});console.error(error);process.exitCode=1;}
finally{await browser?.close();}
