import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {gradeCase,normalize} from '../retrieval-quality/grade.mjs';
const base=path.resolve('../../outputs'),root=path.join(base,'coverage-v35-first-run');
const config=JSON.parse(await fs.readFile(path.join(base,'coverage-v35-inputs/run-config.json')));
assert.equal(JSON.parse(await fs.readFile(path.join(root,'run-status.json'))).status,'COMPLETE');
const proof=JSON.parse(await fs.readFile(path.join(root,'module-proof.json')));
assert.equal(proof.candidate.id,'coverage-v35-preserve-complete-maintenance');
assert.equal(proof.candidate.sha256,config.module_identity.candidate.sha256);
assert.equal(proof.paired.sha256,config.module_identity.paired.sha256);
assert.equal(proof.before_questions,true);
const reviewed=JSON.parse(await fs.readFile(path.join(base,'coverage-v35-inputs/manual-adjudication.json')));
const out=path.join(base,'coverage-v35-final');await fs.mkdir(out,{recursive:true});assert.equal((await fs.readdir(out)).length,0);
const priorPath=name=>path.join(base,'coverage-v34-final/'+name+'-scorecard.json');
const pypdf=JSON.parse(await fs.readFile(path.join(base,'coverage-v2-inputs/atlas-independent-pypdf.json')));
const summarize=rows=>({PASS:rows.filter(r=>r.outcome==='PASS').length,PARTIAL:rows.filter(r=>r.outcome==='PARTIAL').length,FAIL:rows.filter(r=>r.outcome==='FAIL').length,citations:rows.flatMap(r=>r.sources).length,valid_provenance:rows.flatMap(r=>r.citation_provenance).filter(Boolean).length,relevant_citations:rows.flatMap(r=>r.citation_relevance).filter(Boolean).length,false_acceptances:rows.filter(r=>r.false_acceptance).length,false_refusals:rows.filter(r=>r.false_refusal).length,zero_citation_refusals:rows.filter(r=>r.explicit_refusal).length});
const literal=r=>JSON.stringify(r.sources.map(s=>({filename:s.filename,quote:normalize(s.quote)})).sort((a,b)=>a.filename.localeCompare(b.filename)));
const captures=new Map();
const reports=[],lines=['# Coverage v35 — actual MiniLM sentence-selection experiment','','Production remains retrieval build 2026-10-13-r44. Production UI baselines and isolated fixed/section v35 candidate outputs are distinct. Installed Chrome with actual local Xenova/all-MiniLM-L6-v2 q8 WASM; Qwen disabled. The 24 original lexical Comparison questions retain their document pairs; isolated heading-boundary wrapper labelled separately from unchanged UI. All other cases use actual Hybrid embeddings. No mock-vector accuracy claims.','','All 451 historical cases (the separate Binding64 scorer covers 64 additional cases) are exposed in-sample regressions, including the previously prospective FreshMixed32. All original scoring criteria and first scores remain unchanged. No new independent-accuracy or official SQuAD scoring claim. Different sets/rubrics cannot be pooled into one accuracy figure.',''];
for(const pack of config.packs.filter(p=>!['Binding64','Cedar32','Bracken32','Flint32','Morrow32','Hearth32'].includes(p.name))){
  const captureText=await fs.readFile(path.join(root,pack.name,'capture.json'),'utf8');captures.set(pack.name,captureText);
  const capture=JSON.parse(captureText);
  assert.deepEqual(capture.module_identity,proof);
  const docs=JSON.parse(await fs.readFile(path.join(root,pack.name,'source-extraction.json'))).documents;
  assert.equal(capture.cases.length,pack.cases.length);
  const historical=config.packs.indexOf(pack)<5;
  const previous=JSON.parse(await fs.readFile(priorPath(pack.name)));
  const grade=(row,variant,i)=>{
    const key=pack.cases[i],r=row[variant];assert.equal(row.question,key.question);
    if(pack.name==='RetrievalQuality28')return {...gradeCase(key,r,docs),question:key.question,workflow:row.workflow,explicit_refusal:!r.answered&&r.sources.length===0};
    const sources=r.sources.map(s=>({filename:s.filename,quote:s.quote??s.excerpt,excerpt:s.excerpt}));
    const provenance=sources.map(s=>Boolean(s.quote)&&normalize(docs.find(d=>d.name===s.filename)?.text).includes(normalize(s.quote))&&normalize(s.excerpt).includes(normalize(s.quote)));
    const refusal=!r.answered&&sources.length===0&&/can't find this in the provided documents/i.test(r.answer??'');
    const unsupported=key.unsupported===true||key.supported===false||key.category==='unsupported';
    if(!historical){
      const relevant=sources.map(s=>s.filename===key.expected_file&&normalize(key.gold_context).includes(normalize(s.quote)));
      const direct=sources.map((s,j)=>relevant[j]&&(key.answer_groups??[key.answers]).some(group=>group.some(a=>normalize(s.quote).includes(normalize(a.text)))));
      const groups=key.answer_groups??[key.answers];
      const matched=unsupported?[]:groups.map(group=>sources.some((s,j)=>relevant[j]&&group.some(a=>normalize(s.quote).includes(normalize(a.text)))));
      let outcome;
      if(unsupported)outcome=refusal?'PASS':'FAIL';
      else if(provenance.some(v=>!v)||!matched.some(Boolean))outcome='FAIL';
      else if(pack.name==='ExternalSQuAD24'&&!matched.every(Boolean))outcome='FAIL';
      else outcome=matched.every(Boolean)&&relevant.every(Boolean)?'PASS':'PARTIAL';
      return {id:key.id,question:key.question,workflow:row.workflow,category:key.category??'previously_exposed_supported',outcome,answer:r.answer,sources,citation_provenance:provenance,citation_relevance:relevant,citation_relevance_method:'Expected paragraph containment proxy; direct gold span reported separately; not entailment',direct_gold_span_support:direct,matched_answer_groups:matched,gold_answer_groups:unsupported?[]:groups.map(g=>g.map(a=>a.text)),expected_file:key.expected_file,gold_context:key.gold_context,explicit_refusal:refusal,false_acceptance:unsupported&&!refusal,false_refusal:!unsupported&&refusal};
    }
    const old=previous[variant][i],parity=literal(r)===literal(old),manual=reviewed[pack.name+'/'+key.id+'/'+variant];
    assert.ok(parity||manual,'Unreviewed changed historical case '+pack.name+'/'+key.id+'/'+variant);
    const expected=key.expected_documents??key.expected_files??key.source_files;
    const relevance=manual?.citation_relevance??sources.map(s=>expected.includes(s.filename));
    assert.equal(relevance.length,sources.length);
    const pdf=pack.name==='Atlas15'?sources.map(s=>normalize(pypdf.find(d=>d.filename===s.filename)?.pages.join('\n')).includes(normalize(s.quote))):null;
    let outcome=manual?.outcome??old.outcome;
    if(unsupported)outcome=refusal?'PASS':'FAIL';
    if(provenance.some(v=>!v)||pdf?.some(v=>!v)||!unsupported&&!r.answered)outcome='FAIL';
    if(outcome==='PASS'&&(!relevance.every(Boolean)||!unsupported&&!expected.every(f=>sources.some(s=>s.filename===f))))outcome='PARTIAL';
    return {id:key.id,question:key.question,workflow:row.workflow,outcome,answer:r.answer,sources,citation_provenance:provenance,citation_relevance:relevance,independent_pdf_provenance:pdf,prior_outcome:old.outcome,prior_quote_parity:parity,required_facts:key.required_facts??key.required_facts_by_document,assessment:manual?.assessment??old.assessment,quotation_scope_warning:manual?.quotation_scope_warning??old.quotation_scope_warning,explicit_refusal:refusal,false_acceptance:unsupported&&!refusal,false_refusal:!unsupported&&refusal};
  };
  const variants=Object.fromEntries(['baseline','fixed','section'].map(v=>[v,capture.cases.map((r,i)=>grade(r,v,i))]));
  const pairedPrior=JSON.parse(await fs.readFile(priorPath(pack.name)));
  const pairedPrevious={};
  for(const v of ['fixed','section']){
    pairedPrevious[v]=capture.cases.map((row,i)=>{
      if(pairedPrior[v][i].outcome!=='BLOCKED')assert.equal(literal(row.pairedPrevious[v]),literal(pairedPrior[v][i]),'Review changed same-session v34 output '+pack.name+'/'+row.id+'/'+v);
      return {...pairedPrior[v][i],false_refusal:pairedPrior[v][i].false_refusal??false,paired_browser:capture.browser,paired_actual_vectors:true};
    });
  }
  const result={name:pack.name,classification:'Known in-sample regression; all prior first results preserved',browser:capture.browser,model:capture.model,build:capture.build,integrity:capture.integrity,paired_previous:pairedPrevious,summary:Object.fromEntries(Object.entries(variants).map(([v,rows])=>[v,summarize(rows)])),...variants};
  if(['FreshMixed32','FreshConfirmation32','V9Exposed32','Actor40','Scope48','Confirmation48','Precision48'].includes(pack.name))result.category_summary=Object.fromEntries(['externally_authored_supported','constructed_compound','constructed_unsupported','constructed_unsupported_actor'].map(cat=>[cat,Object.fromEntries(Object.entries(variants).map(([v,rows])=>[v,summarize(rows.filter(r=>r.category===cat))]))]));
  result.regressions=previous?Object.fromEntries(['fixed','section'].map(v=>[v,previous[v].filter((r,i)=>r.outcome==='PASS'&&variants[v][i].outcome!=='PASS').map(r=>r.id)])):null;
  await fs.writeFile(path.join(out,pack.name+'-scorecard.json'),JSON.stringify(result,null,2),{flag:'wx'});reports.push(result);
  lines.push(`## ${pack.name}`,'',JSON.stringify(result.summary,null,2),'');
  for(let i=0;i<pack.cases.length;i++){
    lines.push(`### ${pack.name}/${pack.cases[i].id} — ${capture.cases[i].workflow==='comparison'?'Separate lexical Comparison':'Hybrid Q&A'}`,'',pack.cases[i].question,'');
    for(const [v,label] of [['baseline','Production UI baseline'],['fixed','Isolated fixed + v35'],['section','Isolated sections + v35']]){
      const r=variants[v][i];lines.push(`**${label}: ${r.outcome}**`,'',r.answer,'');
      r.sources.forEach((s,j)=>lines.push(`Source: ${s.filename}; provenance ${r.citation_provenance[j]?'PASS':'FAIL'}; relevance ${r.citation_relevance[j]?'PASS':'FAIL'}.`,'',`> ${s.quote.replaceAll('\n','\n> ')}`,''));
      if(r.assessment)lines.push(r.assessment,'');
      if(r.quotation_scope_warning)lines.push('Scope caution: '+r.quotation_scope_warning,'');
      if(r.outcome!=='PASS')lines.push('Missing-evidence diagnostics (no context-only credit):',JSON.stringify({matched_evidence:r.matched_evidence,matched_answer_groups:r.matched_answer_groups,gold_answer_groups:r.gold_answer_groups,required_facts:r.required_facts},null,2),'');
    }
  }
}
const mixed=reports.find(r=>r.name==='FreshMixed32');
const regressions=[];
for(const p of reports){
  for(const priorVersion of ['coverage-v2-final','coverage-v3-final','coverage-v4-final','coverage-v5-final','coverage-v6-final','coverage-v7-final','coverage-v8-final','coverage-v9-final','coverage-v10-final','coverage-v11-final','coverage-v12-final','coverage-v13-final','coverage-v14-replay-final','coverage-v15-final','coverage-v16-final','coverage-v17-final','coverage-v18-final','coverage-v19-final','coverage-v20-final','coverage-v21-final','coverage-v22-final','coverage-v23-final','coverage-v24-final','coverage-v25-final','coverage-v26-final','coverage-v27-final','coverage-v28-final','coverage-v34-final']){
    const filename=path.join(base,priorVersion,p.name+'-scorecard.json');
    let old;try{old=JSON.parse(await fs.readFile(filename));}catch(e){if(e.code==='ENOENT')continue;throw e;}
    for(const variant of ['fixed','section'])for(let i=0;i<p[variant].length;i++){
      // Preserve any prior production/candidate PASS, not merely the latest failed attempt.
      if(['baseline',variant].some(v=>old[v][i].outcome==='PASS')&&p[variant][i].outcome!=='PASS')regressions.push({pack:p.name,id:p[variant][i].id,variant,prior:priorVersion,outcome:p[variant][i].outcome});
    }
  }
}
const previousFresh=JSON.parse(await fs.readFile(path.join(base,'coverage-v8-final/FreshConfirmation32-scorecard.json')));
const nowFresh=reports.find(p=>p.name==='FreshConfirmation32');
for(const variant of ['fixed','section'])for(let i=0;i<nowFresh[variant].length;i++)if(['baseline',variant].some(v=>previousFresh[v][i].outcome==='PASS')&&nowFresh[variant][i].outcome!=='PASS')regressions.push({pack:nowFresh.name,id:nowFresh[variant][i].id,variant,prior:'coverage-v8-final',outcome:nowFresh[variant][i].outcome});
const originals=reports.slice(0,5),rq=reports.find(p=>p.name==='RetrievalQuality28');
const exposed=reports.find(p=>p.name==='V9Exposed32');
const priorExposed=JSON.parse(await fs.readFile(path.join(base,'coverage-v9-fresh-final/scorecard.json')));
for(const variant of ['fixed','section'])for(let i=0;i<exposed[variant].length;i++)if(['baseline',variant].some(v=>priorExposed[v][i].outcome==='PASS')&&exposed[variant][i].outcome!=='PASS')regressions.push({pack:exposed.name,id:exposed[variant][i].id,variant,prior:'coverage-v9-fresh-final',outcome:exposed[variant][i].outcome});
const priorV10Exposed=JSON.parse(await fs.readFile(path.join(base,'coverage-v10-final/V9Exposed32-scorecard.json')));
for(const variant of ['fixed','section'])for(let i=0;i<exposed[variant].length;i++)if(['baseline',variant].some(v=>priorV10Exposed[v][i].outcome==='PASS')&&exposed[variant][i].outcome!=='PASS')regressions.push({pack:exposed.name,id:exposed[variant][i].id,variant,prior:'coverage-v10-final',outcome:exposed[variant][i].outcome});
const priorV11Exposed=JSON.parse(await fs.readFile(path.join(base,'coverage-v11-final/V9Exposed32-scorecard.json')));
for(const variant of ['fixed','section'])for(let i=0;i<exposed[variant].length;i++)if(['baseline',variant].some(v=>priorV11Exposed[v][i].outcome==='PASS')&&exposed[variant][i].outcome!=='PASS')regressions.push({pack:exposed.name,id:exposed[variant][i].id,variant,prior:'coverage-v11-final',outcome:exposed[variant][i].outcome});
const priorV12Exposed=JSON.parse(await fs.readFile(path.join(base,'coverage-v12-final/V9Exposed32-scorecard.json')));
for(const variant of ['fixed','section'])for(let i=0;i<exposed[variant].length;i++)if(['baseline',variant].some(v=>priorV12Exposed[v][i].outcome==='PASS')&&exposed[variant][i].outcome!=='PASS')regressions.push({pack:exposed.name,id:exposed[variant][i].id,variant,prior:'coverage-v12-final',outcome:exposed[variant][i].outcome});
const actor=reports.find(p=>p.name==='Actor40');
const oldActor=JSON.parse(await fs.readFile(path.join(base,'coverage-v13-fresh-final/scorecard.json')));
for(const variant of ['fixed','section'])for(let i=0;i<actor[variant].length;i++)if(['baseline',variant].some(v=>oldActor[v][i].outcome==='PASS')&&actor[variant][i].outcome!=='PASS')regressions.push({pack:'Actor40',id:actor[variant][i].id,variant,prior:'coverage-v13-fresh-final',outcome:actor[variant][i].outcome});
const scope=reports.find(p=>p.name==='Scope48');
const oldScope=JSON.parse(await fs.readFile(path.join(base,'coverage-v15-fresh-final/scorecard.json')));
for(const v of ['fixed','section'])for(let i=0;i<scope[v].length;i++)if(['baseline',v].some(old=>oldScope[old][i].outcome==='PASS')&&scope[v][i].outcome!=='PASS')regressions.push({pack:'Scope48',id:scope[v][i].id,variant:v,prior:'coverage-v15-fresh-final',outcome:scope[v][i].outcome});
const confirmation=reports.find(p=>p.name==='Confirmation48');
const oldConfirmation=JSON.parse(await fs.readFile(path.join(base,'coverage-v17-fresh-final/scorecard.json')));
for(const v of ['fixed','section'])for(let i=0;i<confirmation[v].length;i++)if(['baseline',v].some(old=>oldConfirmation[old][i].outcome==='PASS')&&confirmation[v][i].outcome!=='PASS')regressions.push({pack:'Confirmation48',id:confirmation[v][i].id,variant:v,prior:'coverage-v17-fresh-final',outcome:confirmation[v][i].outcome});
const precision=reports.find(p=>p.name==='Precision48');
const oldPrecision=JSON.parse(await fs.readFile(path.join(base,'coverage-v18-fresh-final/scorecard.json')));
for(const v of ['fixed','section'])for(let i=0;i<precision[v].length;i++)if(['baseline',v].some(old=>oldPrecision[old][i].outcome==='PASS')&&precision[v][i].outcome!=='PASS')regressions.push({pack:'Precision48',id:precision[v][i].id,variant:v,prior:'coverage-v18-fresh-final',outcome:precision[v][i].outcome});
for(const p of reports)for(const v of ['fixed','section'])for(const id of p.regressions[v])regressions.push({pack:p.name,id,variant:v,prior:'coverage-v34-final'});
const checks={all_v9exposed32_pass:['fixed','section'].every(v=>exposed.summary[v].PASS===32),all_precision48_pass:['fixed','section'].every(v=>precision.summary[v].PASS===48),precision_c04_precision:['fixed','section'].every(v=>precision[v].find(r=>r.id==='C04').direct_gold_span_support.every(Boolean)),all_83_unsupported_refuse:reports.every(p=>['fixed','section'].every(v=>p.summary[v].false_acceptances===0))&&reports.reduce((n,p)=>n+p.fixed.filter(r=>r.explicit_refusal&&!r.false_refusal).length,0)===83,all_confirmation48_pass:['fixed','section'].every(v=>confirmation.summary[v].PASS===48),confirmation_c04_precision:['fixed','section'].every(v=>confirmation[v].find(r=>r.id==='C04').direct_gold_span_support.every(Boolean)),all_scope48_pass:['fixed','section'].every(v=>scope.summary[v].PASS===48),all_actor40_pass:['fixed','section'].every(v=>actor.summary[v].PASS===40),all_original_119_pass:originals.every(p=>['fixed','section'].every(v=>p.summary[v].PASS===p[v].length)),all_rq28_pass:['fixed','section'].every(v=>rq.summary[v].PASS===28),no_prior_pass_regressions:regressions.length===0,all_exposed_compound_controls_pass:['fixed','section'].every(v=>[mixed,nowFresh,exposed,actor,scope,confirmation,precision].every(p=>p.category_summary.constructed_compound[v].PASS===4)),provenance_intact:reports.every(p=>['fixed','section'].every(v=>p.summary[v].citations===p.summary[v].valid_provenance)),no_new_false_acceptances_or_refusals:reports.every(p=>['fixed','section'].every(v=>p.summary[v].false_acceptances===0&&p[v].every((r,i)=>!r.false_refusal||(p.paired_previous[v][i].false_refusal===true&&JSON.parse(captures.get(p.name)).cases[i].pairedV9[v].answered===false))))};
const passed=Object.values(checks).every(Boolean);
const decision={candidate_commit:config.candidate_commit,classification:'Stage 1: all 451 cases known in-sample regressions; historical first scores preserved; prior v7/v9/Actor40 public samples exposed; v14 comparisons retain qualified-replay classification; original V9 F06 first attempt remains ungraded',summaries:reports.map(({name,summary,category_summary})=>({name,summary,category_summary})),checks,development_gate:passed?'PASS':'FAIL',release_consideration_gate:passed?'NOT ADOPTED: integration review required':'FAIL: development gate failed',fresh_confirmation:'NOT SCHEDULED: freeze a separate prospective protocol only after PASS; no new sample consumed',pass_regressions:regressions,infrastructure_qualification:'Candidate and paired module hashes verified before any questions. Full actual UI capture plus isolated candidates; all previous blocked/qualified v14 records preserved.',production_change:'NONE',production_build:'2026-10-13-r44',limitations:'Known public samples are now exposed. No new independent accuracy. Paragraph containment is a citation-location proxy, not factual support. Do not pool different test-set rubrics.'};
await fs.writeFile(path.join(out,'decision.json'),JSON.stringify(decision,null,2),{flag:'wx'});
lines.splice(5,0,'## Frozen development gate decision','',JSON.stringify(decision,null,2),'');
await fs.writeFile(path.join(out,'FULL_REPORT.md'),lines.join('\n'),{flag:'wx'});
console.log(JSON.stringify(decision,null,2));
