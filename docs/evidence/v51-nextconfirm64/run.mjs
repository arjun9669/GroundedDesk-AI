import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {chromium} from '../../../work/r25-checkout/node_modules/playwright/index.mjs';
const hash = data => createHash('sha256').update(data).digest('hex');
const read = async file => JSON.parse(await fs.readFile(file));
const root = process.cwd();
const phase = process.argv[2];
assert.ok(['preflight','capture','score'].includes(phase));
const manifestPath = 'execution-freeze.json';
const out = 'raw';
const write = (file, data) => fs.writeFile(file, JSON.stringify(data, null, 2)+'\n', {flag:'wx'});
const pack = 'eval/nextconfirm64';
if (phase !== 'preflight') {
  const freeze = await read(manifestPath);
  for (const {file,sha256} of freeze.files) assert.equal(hash(await fs.readFile(file)),sha256,file);
}
if (phase === 'score') {
  const seal = await read('raw-seal.json');
  for (const {file,sha256} of seal.files) assert.equal(hash(await fs.readFile(file)),sha256,file);
  const status = await read('raw/status.json'); assert.equal(status.captured,64);
  const {gradeAnswer} = await import('./eval/v39-recoverable-regression/score.mjs');
  const {auditSources,auditComparisonPair,auditPreCandidate,queryEvidence} = await import('./eval/v50-regression-execution/audit.mjs');
  const extraction = await read('raw/source-extraction.json');
  const key = await read(`${pack}/answer-key.json`);
  const rows=[];
  for (const expected of key) {
    const row=await read(`${out}/${expected.id}.json`);
    assert.equal(row.question,expected.question);
    if (row.pre) auditPreCandidate({...row.pre,paired_clock_plan:{status:'not_run'},paired_clock_facet_queries:[],paired_clock_facet_vectors:[],paired_clock_facet_evidence:[]},extraction);
    const grades={};
    for (const variant of ['fixed','section']) {
      const result=row[variant];
      const grade=gradeAnswer(expected,result,extraction.documents);
      try {
        auditSources(result,extraction,queryEvidence(row.pre,false));
        if (!row.pre) auditComparisonPair(result,{expected_files:row.filenames},extraction);
        grade.integrity_audit='PASS';
      } catch (error) { grade.integrity_audit=String(error); }
      grades[variant]=grade;
    }
    rows.push({id:expected.id,...grades});
  }
  const summary=Object.fromEntries(['fixed','section'].map(v=>[v,Object.fromEntries(['PASS','PARTIAL','FAIL'].map(label=>[label,rows.filter(r=>r[v].outcome===label).length]))]));
  await write('scorecard.json',{classification:'Author-aware exposed v51 regression',summary,rows});
  console.log(JSON.stringify(summary));
  process.exit(0);
}
const modulePaths = (await fs.readFile('module-paths.txt','utf8')).trim().split(/\r?\n/);
const server=http.createServer(async (req,res)=>{
  const file=new URL(req.url,'http://127.0.0.1').pathname.slice(1);
  if (!file) {res.setHeader('Content-Type','text/html');res.end('<title>GroundedDesk v51 evaluation</title><pre id="evidence">GroundedDesk v51 evaluation</pre>');return;}
  if (!modulePaths.includes(file)) {res.writeHead(404).end();return;}
  res.setHeader('Content-Type','text/javascript');res.end(await fs.readFile(file));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
let browser;
try {
  browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const cdp=await page.context().newCDPSession(page);
  await cdp.send('Network.enable',{maxTotalBufferSize:536870912,maxResourceBufferSize:268435456,enableDurableMessages:true});
  const assets=new Map();
  page.on('response', response=>{
    let request=response.request();
    while(request.redirectedFrom()) request=request.redirectedFrom();
    const url=request.url();
    if (!url.startsWith('http://127.0.0.1:') && response.ok()) {
      const identity=new URL(url); const name=identity.origin+identity.pathname;
      assets.set(name,response.body().then(body=>({name,bytes:body.length,sha256:hash(body)})).catch(error=>({name,error:String(error)})));
    }
  });
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  const model=await page.evaluate(async()=>{
    const semantic=await import('/semantic.mjs');
    const extractor=await semantic.loadBrowserEmbedder();
    const vector=await semantic.embedText(extractor,'Neutral calibration sentence for browser model startup.');
    return {name:semantic.MODEL_ID,dimensions:vector.length,norm:Math.hypot(...vector)};
  });
  assert.equal(model.name,'Xenova/all-MiniLM-L6-v2');assert.equal(model.dimensions,384);
  const actual={browser:browser.version(),platform:process.platform,arch:process.arch,node:process.version,model,
    assets:(await Promise.all(assets.values())).filter(Boolean).sort((a,b)=>a.name.localeCompare(b.name))};
  console.log(JSON.stringify(actual));
  assert.ok(actual.assets.every(a=>a.sha256),'Downloaded assets must have recorded bodies');
  assert.ok(actual.assets.some(a=>/\/onnx\/[^/]+\.onnx$/.test(a.name)),'ONNX download evidence required');
  assert.ok(actual.assets.some(a=>/wasm/.test(a.name)),'WASM runtime evidence required');
  if(phase==='preflight'){await write('preflight.json',actual);console.log(JSON.stringify(actual));}
  else {
    const neutral=await read('preflight.json');
    assert.deepEqual({...actual,assets:actual.assets.map(a=>[a.bytes,a.sha256]).sort()},{...neutral,assets:neutral.assets.map(a=>[a.bytes,a.sha256]).sort()});
    await fs.mkdir(out);
    await write(`${out}/runtime.json`,actual);
    const sources=await read(`${pack}/sources.json`);
    const cases=await read(`${pack}/cases.json`);
    const docs=await Promise.all(sources.map(async ({id,name,path:file,sha256})=>{
      const bytes=await fs.readFile(file);assert.equal(hash(bytes),sha256);return {id,name,text:bytes.toString('utf8').trim()};
    }));
    const extraction=await page.evaluate(async docs=>{
      const retrieval=await import('/retrieval.mjs');
      const semantic=await import('/semantic.mjs?v=20261010-r13');
      const {hybridRank,cosineSimilarity}=await import('/hybrid.mjs');
      const {buildSectionIndex}=await import('/eval/retrieval-quality/section-index.mjs');
      const {CANDIDATE_ID,answerWithCoverage,literalSentences,buildBodyIndex,compareWithCoverage,planClockRequest}=await import('/eval/answer-completeness-v51/coverage.mjs');
      if(CANDIDATE_ID!=='coverage-v51-scoped-evidence') throw new Error('Unexpected candidate: '+CANDIDATE_ID);
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
      window.lab={planClockRequest,compareWithCoverage,docs,retrieval,semantic,hybridRank,cosineSimilarity,answerWithCoverage,extractor,fixed,fixedVectors,section,sectionVectors,body,bodyVectors,sentenceIndex,sentenceVectors};
      return {documents:docs,passages:{fixed:fixed.chunks.length,section:section.chunks.length},sentence_index:sentenceIndex,sentence_vectors:sentenceVectors,fixed_vectors:fixedVectors,section_vectors:sectionVectors,body_vectors:bodyVectors};
    },docs);
    await write(`${out}/source-extraction.json`,extraction);
    for (const c of cases) {
      const filenames=c.selected_documents.map(id=>docs.find(d=>d.id===id).name);
      const output=await page.evaluate(async c=>{
        const lab=window.lab;
        if(c.workflow==='comparison'){
          const result=lab.compareWithCoverage(...c.selected_documents.map(id=>lab.docs.find(d=>d.id===id)),c.question);
          return {fixed:result,section:result,pre:null};
        }
          const query=await lab.semantic.embedText(lab.extractor,c.question);
          const clockPlan=lab.planClockRequest(c.question);
          const clockFacetQueries=clockPlan.status==='planned'?clockPlan.facets.map(f=>f.question):[];
          const clockFacetVectors=[];
          for(const q of clockFacetQueries)clockFacetVectors.push(await lab.semantic.embedText(lab.extractor,q));
          const assertVectors=vs=>{for(const v of vs)if(v.length!==384||v.some(x=>!Number.isFinite(x)))throw new Error('Expected actual finite 384-dimensional MiniLM vector');};
          const ranks=lab.hybridRank(c.question,lab.fixed,query,lab.fixedVectors);
          const sectionRanks=lab.hybridRank(c.question,lab.section,query,lab.sectionVectors);
          const parts=c.question.split(/\s+Also,\s+/i).map(s=>s.trim()).filter(Boolean);
          const facetVectors=parts.length>1?await Promise.all(parts.map(q=>lab.semantic.embedText(lab.extractor,q))):[];
          assertVectors([query,...clockFacetVectors,...lab.fixedVectors,...lab.sectionVectors,...lab.bodyVectors,...facetVectors]);
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
          const clockFacetEvidence=clockFacetQueries.map((question,j)=>({question,bodyEvidenceCandidates:lab.body.chunks.map((chunk,i)=>({...chunk,actualCosine:lab.cosineSimilarity(clockFacetVectors[j],lab.bodyVectors[i])}))}));
          const fixedOptions={productionAnchor,bodyCandidates:enriched(bodyRanks),facetCandidates:facetRanks.map(facetEnriched),bodyEvidenceCandidates,facetBodyEvidenceCandidates,facetBodyCandidates,facetProductionAnchors};
          const sectionOptions={...fixedOptions,facetCandidates:facetSectionRanks.map(facetEnriched)};

        const pre={id:c.id,question:c.question,query_vector:query,facet_query_vectors:facetVectors,body_evidence:bodyEvidenceCandidates,facet_body_evidence:facetBodyEvidenceCandidates,clock_plan:clockPlan,clock_facet_queries:clockFacetQueries,clock_facet_vectors:clockFacetVectors,clock_facet_evidence:clockFacetEvidence};
        return {pre,fixed:lab.answerWithCoverage(c.question,enriched(ranks),3,undefined,{...fixedOptions,clockFacetEvidence}),section:lab.answerWithCoverage(c.question,enriched(sectionRanks),3,undefined,{...sectionOptions,clockFacetEvidence})};
      },c);
      await write(`${out}/${c.id}.json`,{...c,filenames,...output});
      await page.locator('#evidence').evaluate((el,row)=>{el.style.whiteSpace='pre-wrap';el.textContent=`ISOLATED v51 BROWSER MODULE\n${row.c.id} ${row.c.question}\n\nFIXED\n${row.output.fixed.answer}\n\nSECTION\n${row.output.section.answer}`;},{c,output});
      await page.screenshot({path:`${out}/${c.id}.png`,fullPage:true});
      console.log(c.id);
    }
    await write(`${out}/status.json`,{captured:cases.length,logical_outputs:120});
  }
} finally { await browser?.close(); await new Promise(resolve=>server.close(resolve)); }
