// Frozen scoring; private historical keys remain in the owner's workspace.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {gradeCase,normalize} from '../retrieval-quality/grade.mjs';
const config=JSON.parse(await fs.readFile('../../outputs/coverage-v2-inputs/run-config.json','utf8'));
const roots={original:path.resolve('../../outputs/coverage-v2-validation-first-run'),continuation:path.resolve('../../outputs/coverage-v2-validation-continuation')};
const out=path.resolve('../../outputs/coverage-v2-final');await fs.mkdir(out,{recursive:true});
assert.equal((await fs.readdir(out)).length,0,'Never overwrite scores');
const status=JSON.parse(await fs.readFile(path.join(roots.continuation,'run-status.json'),'utf8'));assert.equal(status.status,'COMPLETE');
const priorFiles={Lantern32:'../../outputs/r25-dual/Lantern32-r25-scorecard.json',Aster32:'../../outputs/r25-dual/Aster32-r25-scorecard.json',Meridian24:'../../outputs/r22-meridian24-scorecard.json',Cobalt16:'docs/evidence/r41/cobalt16/scorecard.json',Atlas15:'../../outputs/r18-atlas15-scored-results.json'};
const pypdf=JSON.parse(await fs.readFile('../../outputs/coverage-v2-inputs/atlas-independent-pypdf.json','utf8'));
const summarize=rows=>({PASS:rows.filter(r=>r.outcome==='PASS').length,PARTIAL:rows.filter(r=>r.outcome==='PARTIAL').length,FAIL:rows.filter(r=>r.outcome==='FAIL').length,
  citations:rows.reduce((n,r)=>n+r.sources.length,0),valid_provenance:rows.flatMap(r=>r.citation_provenance).filter(Boolean).length,relevant_citations:rows.flatMap(r=>r.citation_relevance).filter(Boolean).length,
  false_acceptances:rows.filter(r=>r.false_acceptance).length,false_refusals:rows.filter(r=>r.false_refusal).length,zero_citation_refusals:rows.filter(r=>r.explicit_refusal).length});
const literal=sources=>sources.map(s=>({filename:s.filename??s.file,quote:normalize(s.quote??s.quotation)})).sort((a,b)=>a.filename.localeCompare(b.filename));
const reports=[];const reportLines=['# Coverage v2 — complete real Chrome validation','',
  'Production build r44 remains unchanged. Actual installed Chrome 154.0.8037.98; actual local Xenova/all-MiniLM-L6-v2 q8 WASM, Qwen disabled. Baseline outputs are from the real main UI; fixed/section v2 outputs are isolated browser-module experiments. Comparison remains a separate unchanged lexical workflow.',
  'All 119 original cases captured once. The combined runner then stopped before the first RQ28 question because its key omits a workflow property. Only the untouched RQ28 and external corpora continued in a new browser/output directory. Initial failure is preserved; no observed answer was replaced. External questions were first attempted after candidate and external sample freeze.',
  'Historical first-look and in-sample scores remain unchanged. This uses three different grading families: original historical semantic rubrics; RQ28 conservative exact sentences; public external gold-span plus gold-paragraph precision, not official SQuAD EM/F1 or sealed independent accuracy. Scores cannot be pooled into a single accuracy percentage.',''];
for(const pack of config.packs){
  const root=priorFiles[pack.name]?roots.original:roots.continuation;
  const capture=JSON.parse(await fs.readFile(path.join(root,pack.name,'capture.json'),'utf8'));
  const docs=JSON.parse(await fs.readFile(path.join(root,pack.name,'source-extraction.json'),'utf8')).documents;
  assert.equal(capture.cases.length,pack.cases.length);
  let prior=[];
  if(priorFiles[pack.name]){const value=JSON.parse(await fs.readFile(priorFiles[pack.name],'utf8'));prior=Array.isArray(value)?value:value.cases;}
  const grade=(row,variant,i)=>{
    const item=pack.cases[i],r=row[variant];
    assert.equal(row.question,item.question);
    if(pack.name==='RetrievalQuality28')return {...gradeCase(item,r,docs),question:item.question,explicit_refusal:!r.answered&&r.sources.length===0,workflow:row.workflow};
    const sources=r.sources.map(s=>({filename:s.filename,quote:s.quote??s.excerpt,excerpt:s.excerpt}));
    const provenance=sources.map(s=>Boolean(s.quote)&&normalize(docs.find(d=>d.name===s.filename)?.text).includes(normalize(s.quote))&&normalize(s.excerpt).includes(normalize(s.quote)));
    const independentPdf=pack.name==='Atlas15'?sources.map(s=>normalize(pypdf.find(d=>d.filename===s.filename)?.pages.join('\n')).includes(normalize(s.quote))):null;
    const refusal=!r.answered&&sources.length===0&&/can't find this in the provided documents/i.test(r.answer??'');
    if(pack.name==='ExternalSQuAD24'){
      const matches=sources.map(s=>s.filename===item.expected_file&&normalize(item.gold_context).includes(normalize(s.quote))&&item.answers.some(a=>normalize(s.quote).includes(normalize(a.text))));
      const relevant=sources.map(s=>s.filename===item.expected_file&&normalize(item.gold_context).includes(normalize(s.quote)));
      const outcome=provenance.some(v=>!v)||!matches.some(Boolean)?'FAIL':relevant.every(Boolean)?'PASS':'PARTIAL';
      return {id:item.id,question:item.question,workflow:'hybrid',outcome,answer:r.answer,sources,citation_provenance:provenance,citation_relevance:relevant,
        gold_span_in_gold_context:matches,false_acceptance:false,false_refusal:refusal,explicit_refusal:refusal,
        gold_answers:item.answers.map(a=>a.text),gold_context:item.gold_context,expected_file:item.expected_file,original_question_id:item.original_question_id};
    }
    const previous=prior.find(p=>p.id===item.id);assert.equal(previous.question,item.question);
    let previousSources=previous.displayed_sources??previous.citations??previous.sources;
    if(pack.name==='Cobalt16'&&row.workflow==='hybrid')previousSources=previous.sources.map(s=>({filename:s.filename,quote:previous.answer_only.replace(/^\[\d+\]\s*/,'')}));
    const parity=JSON.stringify(literal(sources))===JSON.stringify(literal(previousSources));
    const manuallyReviewed=pack.name==='Atlas15'&&item.id==='D05';
    assert.ok(parity||manuallyReviewed,'Manual rubric review required for changed source outputs '+pack.name+'/'+item.id);
    const unsupported=item.unsupported===true||item.supported===false||item.category==='unsupported';
    const expected=item.expected_documents??item.expected_files??item.source_files;
    const relevant=sources.map(s=>expected.includes(s.filename));
    const selected=expected.every(f=>sources.some(s=>s.filename===f))&&relevant.every(Boolean);
    let outcome=previous.verdict??previous.outcome;
    if(unsupported)outcome=refusal?'PASS':'FAIL';
    if(provenance.some(v=>!v)||independentPdf?.some(v=>!v))outcome='FAIL';
    if(!unsupported&&!r.answered)outcome='FAIL';
    if(!unsupported&&!selected&&outcome==='PASS')outcome='PARTIAL';
    if(manuallyReviewed){
      const q=normalize(sources[0]?.quote??'');
      assert.ok(q.includes('Incident Commander')&&q.includes('30 minutes')&&q.includes('P1'));
      assert.equal(sources[0]?.filename,'02_Atlas_Incident_Response_Runbook.pdf');
    }
    return {id:item.id,question:item.question,workflow:row.workflow,outcome,answer:r.answer,sources,citation_provenance:provenance,citation_relevance:relevant,independent_pdf_provenance:independentPdf,
      prior_outcome:previous.verdict??previous.outcome,prior_displayed_quote_parity:parity,completeness:previous.completeness??outcome,document_selection:selected,
      required_facts:item.required_facts??item.required_facts_by_document,false_acceptance:unsupported&&!refusal,false_refusal:!unsupported&&refusal,explicit_refusal:refusal,
      assessment:manuallyReviewed?'Manual original-key review: Incident Commander and 30-minute P1 target are correctly quoted and source-valid. PASS at the frozen answer/citation level; quote is overbroad, additionally showing an unrequested P2 rule and containment examples. Sentence-scope caution retained.':
        'Original required facts/rubric assessment preserved because every displayed quotation and filename matches the previous independently reviewed record; current source/excerpt provenance reverified.',
      quotation_scope_warning:manuallyReviewed?'Unrequested P2 branch and examples appear; no narrower sentence-precision claim.':null};
  };
  const fixed=capture.cases.map((r,i)=>grade(r,'fixed',i)),section=capture.cases.map((r,i)=>grade(r,'section',i)),baseline=capture.cases.map((r,i)=>grade(r,'baseline',i));
  const result={name:pack.name,classification:capture.classification,build:capture.build,browser:capture.browser,model:capture.model,integrity:capture.integrity,
    summary:{baseline:summarize(baseline),fixed:summarize(fixed),section:summarize(section)},fixed,section,baseline};
  await fs.writeFile(path.join(out,pack.name+'-scorecard.json'),JSON.stringify(result,null,2),{flag:'wx'});reports.push(result);
  reportLines.push(`## ${pack.name}`,'',JSON.stringify(result.summary,null,2),'',`Input integrity: ${capture.integrity}`,'');
  for(let i=0;i<pack.cases.length;i++){
    const c=pack.cases[i];reportLines.push(`### ${pack.name}/${c.id}`, '',c.question,'');
    for(const [name,row] of [['Production UI baseline',baseline[i]],['Fixed + v2 browser module',fixed[i]],['Sections + v2 browser module',section[i]]]){
      reportLines.push(`**${name}: ${row.outcome}**`,'',row.answer,'');
      for(let j=0;j<row.sources.length;j++){const s=row.sources[j];reportLines.push(`Source: ${s.filename}; provenance ${row.citation_provenance[j]?'PASS':'FAIL'}; relevance ${row.citation_relevance[j]?'PASS':'FAIL'}.`,'',`> ${s.quote.replaceAll('\n','\n> ')}`,'');}
      if(row.quotation_scope_warning)reportLines.push('Scope caution: '+row.quotation_scope_warning,'');
      if(row.outcome!=='PASS')reportLines.push('Review detail:',JSON.stringify({matched_evidence:row.matched_evidence,gold_span_in_gold_context:row.gold_span_in_gold_context,gold_answers:row.gold_answers,required_facts:row.required_facts},null,2),'');
    }
  }
}
const rq=reports.find(r=>r.name==='RetrievalQuality28'),external=reports.find(r=>r.name==='ExternalSQuAD24');
const v1=JSON.parse(await fs.readFile('docs/evidence/answer-coverage-r44/development/scorecard.json','utf8'));
const regressions=(old,now)=>old.filter((r,i)=>r.outcome==='PASS'&&now[i].outcome!=='PASS').map(r=>r.id);
const originalReports=reports.filter(r=>priorFiles[r.name]);
const knownRegressions=originalReports.flatMap(p=>p.fixed.filter(r=>r.prior_outcome==='PASS'&&r.outcome!=='PASS').map(r=>p.name+'/'+r.id));
const checks={development_section_28_pass:rq.summary.section.PASS===28,development_fixed_not_lower:rq.summary.fixed.PASS>=23,
  no_development_pass_regressions:regressions(v1.fixed,rq.fixed).length===0&&regressions(v1.section,rq.section).length===0,
  no_historical_pass_regressions:knownRegressions.length===0,
  provenance_intact:reports.every(p=>['fixed','section'].every(v=>p.summary[v].valid_provenance===p.summary[v].citations)),
  no_new_known_false_acceptances:originalReports.every(p=>p.summary.fixed.false_acceptances===0)&&rq.summary.fixed.false_acceptances===0&&rq.summary.section.false_acceptances===0,
  external_section_at_least_21_pass:external.summary.section.PASS>=21};
const decision={classification:'Frozen development + known real-model regressions + public externally authored prospective confirmation',summaries:reports.map(({name,summary})=>({name,summary})),checks,
  development_gate:checks.development_section_28_pass&&checks.development_fixed_not_lower&&checks.no_development_pass_regressions?'PASS':'FAIL',
  release_consideration_gate:Object.values(checks).every(Boolean)?'PASS':'FAIL',historical_pass_regressions:knownRegressions,
  production_change:'NONE',external_limitations:'Supported-only public sample; no unsupported or lexical Comparison evaluation, no official SQuAD EM/F1 or sealed independent accuracy; possible public-data/model exposure.',
  infrastructure_qualification:'119 original cases captured once; initial runner stopped before RQ28/external questions because workflow field missing. Only unattempted two corpora continued; initial failure preserved.'};
await fs.writeFile(path.join(out,'decision.json'),JSON.stringify(decision,null,2),{flag:'wx'});
reportLines.splice(5,0,'## Decision','',JSON.stringify(decision,null,2),'');
await fs.writeFile(path.join(out,'FULL_REPORT.md'),reportLines.join('\n'),{flag:'wx'});
console.log(JSON.stringify({summaries:decision.summaries,checks,development_gate:decision.development_gate,release_gate:decision.release_consideration_gate},null,2));
