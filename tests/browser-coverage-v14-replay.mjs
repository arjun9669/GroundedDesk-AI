// Installed Chrome, actual local MiniLM; production UI and isolated candidates distinguished.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
import {revealControl} from './fixtures/workspace-ui.mjs';
import {openEvidenceLedger,prepareQuestion,waitForAnswer,readUIEvidence,preserveFailure} from './fixtures/runner-evidence.mjs';
assert.ok(process.env.RUN_CONFIG&&process.env.EVIDENCE_DIR,'Provide an explicit frozen RUN_CONFIG and a new EVIDENCE_DIR; no historical defaults');
const configPath=path.resolve(process.env.RUN_CONFIG||'../../outputs/coverage-v9-fresh-inputs/run-config.json');
const config=JSON.parse(await fs.readFile(configPath,'utf8'));
const out=path.resolve(process.env.EVIDENCE_DIR||'../../outputs/coverage-v9-fresh-first-run');
await fs.mkdir(out,{recursive:true});
assert.equal((await fs.readdir(out)).length,0,'Choose a new empty evidence directory; never overwrite');
for(const pack of config.packs)for(const file of pack.files)assert.equal(createHash('sha256').update(await fs.readFile(file.path)).digest('hex'),file.sha256,file.name);
const normalize=s=>String(s??'').replace(/\s+/g,' ').trim();
let browser,page,activePack,activeCase,activeQuestion,activeReceipt,activeCapture,phase='initialization';
const ledger=await openEvidenceLedger(out);
await ledger.event('run_started',{config_sha256:createHash('sha256').update(await fs.readFile(configPath)).digest('hex')});
const completed=[];
try{
  browser=await chromium.launch({headless:true,channel:'chrome'});
  const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
  page=await context.newPage();const requests=new Set();
  page.on('request',r=>{if(/onnx|wasm|all-MiniLM/.test(r.url())){const u=new URL(r.url());requests.add(u.origin+u.pathname);}});
  await page.goto(process.env.TEST_URL||'http://127.0.0.1:8792/');
  await page.waitForFunction(()=>document.querySelector('#doc-count').textContent==='3');
  assert.equal(browser.version(),'155.0.8059.40','Stop before questions if Chrome version changes');
  const build=await page.locator('#retrieval-build').innerText();assert.match(build,/2026-10-13-r44/);
  for(const pack of config.packs){
    assert.match(pack.name,/^[A-Za-z0-9_-]+$/);
    for(const c of pack.cases)assert.match(c.id,/^[A-Za-z0-9_-]+$/);
    activePack=pack.name;activeCase=null;activeReceipt=null;activeCapture=null;phase='upload_and_model';
    await ledger.event('pack_started',{pack:pack.name});
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
      const {hybridRank,cosineSimilarity}=await import('/hybrid.mjs');
      const {buildSectionIndex}=await import('/eval/retrieval-quality/section-index.mjs');
      const v14Module=await import('/eval/answer-completeness-v14/coverage.mjs');
      if(typeof v14Module.actorScope!=='function')throw new Error('Wrong candidate module: v14 scope guard missing');
      const {answerWithCoverage,literalSentences,buildBodyIndex}=v14Module;
      const {answerWithCoverage:previousCoverage}=await import('/eval/answer-completeness-v13/coverage.mjs');
      const {answerWithCoverage:v9Coverage}=await import('/eval/answer-completeness-v9/coverage.mjs');
      const {compareDocuments}=await import('/research.mjs');
      const extractor=await semantic.loadBrowserEmbedder(),fixed=retrieval.buildIndex(docs);
      const fixedVectors=await semantic.embedChunks(extractor,fixed.chunks);
      const section=buildSectionIndex(docs),sectionVectors=await semantic.embedChunks(extractor,section.chunks);
      const sentenceIndex=[];
      for(const doc of docs){
        const source=fixed.chunks.find(c=>c.documentId===doc.id)?.sourceText;
        if(!source)continue;
        for(const e of literalSentences(source))sentenceIndex.push({documentId:doc.id,...e});
      }
      if(sentenceIndex.length>512)throw new Error('512 real sentence embedding cap exceeded; no fallback');
      const sentenceVectors=[];
      for(const e of sentenceIndex)sentenceVectors.push(await semantic.embedText(extractor,e.value));
      const body=buildBodyIndex(docs,sentenceIndex),bodyVectors=body.chunks.map(c=>{
        const i=sentenceIndex.findIndex(e=>e.documentId===c.documentId&&e.start===c.start&&e.value===c.content);
        if(i<0)throw new Error('Actual corresponding body vector unavailable');return sentenceVectors[i];
      });
      window.v14Lab={docs,retrieval,semantic,hybridRank,cosineSimilarity,answerWithCoverage,previousCoverage,v9Coverage,compareDocuments,extractor,fixed,fixedVectors,section,sectionVectors,body,bodyVectors,sentenceIndex,sentenceVectors};
      return {documents:docs,passages:{fixed:fixed.chunks.length,section:section.chunks.length},sentence_index:sentenceIndex,sentence_vectors:sentenceVectors};
    },inputs);
    await fs.writeFile(path.join(dir,'source-extraction.json'),JSON.stringify(docs,null,2),{flag:'wx'});
    const capture={name:pack.name,classification:'QUALIFIED V14 browser-module replay: original UI/vector capture preserved; original candidate capture BLOCKED; no UI question resubmission',build,browser:browser.version(),model:'Actual local Xenova/all-MiniLM-L6-v2 q8 WASM; Qwen disabled',integrity:pack.integrity,files:pack.files.map(({name,sha256})=>({name,sha256})),passages:docs.passages,cases:[]};
    activeCapture=capture;
    await ledger.checkpoint({status:'RUNNING',phase,activePack,completed});
    for(const c of pack.cases){
      activeCase=c.id;activeQuestion=c.question;activeReceipt=null;phase='case_preparation';const hybrid=(c.workflow||'hybrid').toLowerCase()==='hybrid';
      const originalDir=path.resolve('../../outputs/coverage-v14-first-run',pack.name);
      const original=JSON.parse(await fs.readFile(path.join(originalDir,c.id+'-candidate.json')));
      assert.equal(original.question,c.question);
      const ui={...original.ui,evidence_origin:'Original first real Chrome UI capture; not replayed through UI'};
      if(hybrid)for(const v of [original.query_vector,...original.facet_query_vectors])assert.ok(v.length===384&&v.every(Number.isFinite),'Actual recorded query vector required');
      await ledger.event('saved_ui_replay',{pack:pack.name,id:c.id,original_question:c.question,original_ui:path.join(originalDir,c.id+'-ui.json')});
      // Lock the actual UI output before any experimental candidate for this case.
      await fs.writeFile(path.join(dir,c.id+'-ui.json'),JSON.stringify({id:c.id,question:c.question,workflow:c.workflow,...ui},null,2),{flag:'wx'});
      phase='ui_saved';
      await ledger.checkpoint({status:'RUNNING',activePack,activeCase,phase,completed,completed_cases:capture.cases.map(c=>c.id),ui_path:pack.name+'/'+c.id+'-ui.json'});
      await fs.copyFile(path.join(originalDir,c.id+'-ui.png'),path.join(dir,c.id+'-ui.png')); phase='candidate_computation';
      const computed=await page.evaluate(async c=>{
        const lab=window.v14Lab;
        if((c.workflow||'hybrid').toLowerCase()==='hybrid'){
          const query=c.recorded_query;
          const ranks=lab.hybridRank(c.question,lab.fixed,query,lab.fixedVectors);
          const sectionRanks=lab.hybridRank(c.question,lab.section,query,lab.sectionVectors);
          const parts=c.question.split(/\s+Also,\s+/i).map(s=>s.trim()).filter(Boolean);
          const facetVectors=parts.length>1?c.recorded_facets:[];
          const sentenceEvidence=lab.sentenceIndex.map((e,i)=>({...e,similarity:lab.cosineSimilarity(query,lab.sentenceVectors[i]),facetSimilarities:facetVectors.map(q=>lab.cosineSimilarity(q,lab.sentenceVectors[i]))}));
          const enriched=rs=>rs.map(r=>({...r,sentenceEvidence:sentenceEvidence.filter(e=>e.documentId===r.documentId)}));
          const productionAnchor=lab.retrieval.answerFromCandidates(c.question,ranks);
          const bodyRanks=lab.hybridRank(c.question,lab.body,query,lab.bodyVectors);
          const facetRanks=facetVectors.map((q,i)=>lab.hybridRank(parts[i],lab.fixed,q,lab.fixedVectors));
          const facetSectionRanks=facetVectors.map((q,i)=>lab.hybridRank(parts[i],lab.section,q,lab.sectionVectors));
          const facetEnriched=(rs,i)=>rs.map(r=>({...r,sentenceEvidence:sentenceEvidence.filter(e=>e.documentId===r.documentId).map(e=>({...e,similarity:e.facetSimilarities[i]}))}));
          const bodyEvidenceCandidates=lab.body.chunks.map((c,i)=>({...c,actualCosine:lab.cosineSimilarity(query,lab.bodyVectors[i])}));
          const facetBodyEvidenceCandidates=facetVectors.map(q=>lab.body.chunks.map((c,i)=>({...c,actualCosine:lab.cosineSimilarity(q,lab.bodyVectors[i])})));
          const facetBodyCandidates=facetVectors.map((q,i)=>facetEnriched(lab.hybridRank(parts[i],lab.body,q,lab.bodyVectors),i));
          const facetProductionAnchors=facetRanks.map((rs,i)=>lab.retrieval.answerFromCandidates(parts[i],rs));
          const fixedOptions={productionAnchor,bodyCandidates:enriched(bodyRanks),facetCandidates:facetRanks.map(facetEnriched),bodyEvidenceCandidates,facetBodyEvidenceCandidates,facetBodyCandidates,facetProductionAnchors};
          const sectionOptions={...fixedOptions,facetCandidates:facetSectionRanks.map(facetEnriched)};

          return {baseline:productionAnchor,fixed:lab.answerWithCoverage(c.question,enriched(ranks),3,undefined,fixedOptions),section:lab.answerWithCoverage(c.question,enriched(sectionRanks),3,undefined,sectionOptions),facet_top5:{fixed:facetRanks.map(rs=>rs.slice(0,5)),section:facetSectionRanks.map(rs=>rs.slice(0,5))},body_top5:bodyRanks.slice(0,5).map(p=>({filename:p.filename,start:p.start,content:p.content,semanticScore:p.semanticScore,lexicalScore:p.lexicalScore})),sentence_evidence:sentenceEvidence,facet_query_vectors:facetVectors,
            pairedPrevious:{fixed:lab.previousCoverage(c.question,enriched(ranks),3,undefined,fixedOptions),section:lab.previousCoverage(c.question,enriched(sectionRanks),3,undefined,sectionOptions)},pairedV9:{fixed:lab.v9Coverage(c.question,enriched(ranks)),section:lab.v9Coverage(c.question,enriched(sectionRanks))},query_vector:query,top5:{fixed:ranks.slice(0,5).map(p=>({filename:p.filename,start:p.start,content:p.content})),section:sectionRanks.slice(0,5).map(p=>({filename:p.filename,start:p.start,content:p.content}))}};
        }
        const names=c.expected_documents||c.expected_files||c.source_files;
        const result=lab.compareDocuments(lab.docs.find(d=>d.name===names[0]),lab.docs.find(d=>d.name===names[1]),c.question);
        const adapted={...result,sources:result.sources.map(s=>({...s,quote:s.excerpt})),answer:result.sources.map(s=>`[${s.citation}] ${s.excerpt}`).join('\n\n')};
        return {baseline:adapted,fixed:adapted,section:adapted,pairedPrevious:{fixed:adapted,section:adapted},method:'Separate unchanged lexical Comparison, not MiniLM'};
      },{id:c.id,question:c.question,workflow:c.workflow||'hybrid',recorded_query:original.query_vector,recorded_facets:original.facet_query_vectors,expected_files:c.expected_documents||c.expected_files||c.source_files});
      const comparable=sources=>sources.map(s=>({filename:s.filename,quote:normalize(s.quote),...(hybrid?{excerpt:normalize(s.excerpt)}:{})}));
      assert.deepEqual(comparable(computed.baseline.sources),comparable(ui.sources),'Instrumented production must reproduce actual UI source output '+pack.name+'/'+c.id);
      const record={id:c.id,question:c.question,workflow:hybrid?'hybrid':'comparison',ui,qualification:'Original UI output/vector replay; not a new end-to-end question',...computed};
      await fs.writeFile(path.join(dir,c.id+'-candidate.json'),JSON.stringify(record,null,2),{flag:'wx'});capture.cases.push(record);phase='candidate_saved';
      await page.evaluate(record=>{
        const panel=document.createElement('article');panel.id='v14-candidate-evidence';
        Object.assign(panel.style,{position:'absolute',top:'0',left:'0',width:'1380px',padding:'30px',background:'#fff',color:'#111',font:'18px sans-serif',whiteSpace:'pre-wrap',zIndex:99999});
        panel.textContent='QUALIFIED V14 BROWSER-MODULE REPLAY — saved actual query vectors; original UI not resubmitted — production remains r44\n'+(record.workflow==='hybrid'?'Actual local MiniLM Hybrid / Qwen off':'Separate unchanged lexical Comparison')+'\n\n'+record.question+'\n\nFIXED V14\n'+record.fixed.answer+'\n'+record.fixed.sources.map(s=>s.filename).join('\n')+'\n\nSECTION V14\n'+record.section.answer+'\n'+record.section.sources.map(s=>s.filename).join('\n');
        document.body.append(panel);
      },record);
      await fs.writeFile(path.join(dir,c.id+'-candidate-lab.png'),await page.locator('#v14-candidate-evidence').screenshot(),{flag:'wx'});
      await page.evaluate(()=>document.querySelector('#v14-candidate-evidence').remove());
      await ledger.event('case_captured',{pack:pack.name,id:c.id});
      await ledger.checkpoint({status:'RUNNING',activePack,activeCase,phase,completed,completed_cases:capture.cases.map(c=>c.id)});
      if(pack.name==='RetrievalQuality28'&&c.id==='RQ13'){
        await page.evaluate(record=>{
          const panel=document.createElement('article');panel.id='v3-lab-panel';Object.assign(panel.style,{position:'absolute',top:'0',left:'0',width:'1400px',padding:'24px',background:'#fff',color:'#111',font:'18px sans-serif',whiteSpace:'pre-wrap',zIndex:99999});
          panel.textContent='V14 EXPERIMENTAL BROWSER-MODULE OUTPUT — production unchanged\nActual local MiniLM / Qwen off\n\n'+record.question+'\n\nFIXED + V14\n'+record.fixed.answer+'\n\nSECTION + V14\n'+record.section.answer;document.body.append(panel);
        },record);
        await page.locator('#v3-lab-panel').screenshot({path:path.join(dir,'RQ13-candidate-lab.png')});await page.evaluate(()=>document.querySelector('#v3-lab-panel').remove());
      }
    }
    capture.model_requests=[...requests];await fs.writeFile(path.join(dir,'capture.json'),JSON.stringify(capture,null,2),{flag:'wx'});
    completed.push({name:pack.name,cases:capture.cases.length});activeCapture=null;console.log('Captured '+pack.name+': '+capture.cases.length+' original cases; not yet graded.');
  }
  await fs.writeFile(path.join(out,'run-status.json'),JSON.stringify({status:'COMPLETE',classification:'QUALIFIED browser-module replay, no UI question resubmission; first capture BLOCKED',completed,browser:browser.version(),build,production_change:'NONE'},null,2),{flag:'wx'});
}catch(error){
  const context={activePack,activeCase,original_question:activeQuestion,phase,completed,completed_cases:activeCapture?.cases.map(c=>c.id)||[]};
  try{
    await ledger.event('run_blocked',context);await ledger.checkpoint({status:'BLOCKED',...context});
    if(activeCapture)await ledger.writeJSON('capture-partial.json',{...activeCapture,status:'INCOMPLETE',failed_case:activeCase});
    await preserveFailure(page,out,{error,receipt:activeReceipt,context});
  }catch(collectionError){console.error('Evidence collection also failed:',collectionError);}
  console.error(error);process.exitCode=1;
}
finally{await browser?.close();}
