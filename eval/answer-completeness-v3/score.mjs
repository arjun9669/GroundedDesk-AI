import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {gradeCase,normalize} from '../retrieval-quality/grade.mjs';
const base=path.resolve('../../outputs'),root=path.join(base,'coverage-v3-validation-first-run');
const config=JSON.parse(await fs.readFile(path.join(base,'coverage-v3-inputs/run-config.json')));
assert.equal(JSON.parse(await fs.readFile(path.join(root,'run-status.json'))).status,'COMPLETE');
const reviewed=JSON.parse(await fs.readFile(path.join(base,'coverage-v3-inputs/manual-adjudication.json')));
const out=path.join(base,'coverage-v3-final');await fs.mkdir(out,{recursive:true});assert.equal((await fs.readdir(out)).length,0);
const pypdf=JSON.parse(await fs.readFile(path.join(base,'coverage-v2-inputs/atlas-independent-pypdf.json')));
const summarize=rows=>({PASS:rows.filter(r=>r.outcome==='PASS').length,PARTIAL:rows.filter(r=>r.outcome==='PARTIAL').length,FAIL:rows.filter(r=>r.outcome==='FAIL').length,citations:rows.flatMap(r=>r.sources).length,valid_provenance:rows.flatMap(r=>r.citation_provenance).filter(Boolean).length,relevant_citations:rows.flatMap(r=>r.citation_relevance).filter(Boolean).length,false_acceptances:rows.filter(r=>r.false_acceptance).length,false_refusals:rows.filter(r=>r.false_refusal).length,zero_citation_refusals:rows.filter(r=>r.explicit_refusal).length});
const literal=r=>JSON.stringify(r.sources.map(s=>({filename:s.filename,quote:normalize(s.quote)})).sort((a,b)=>a.filename.localeCompare(b.filename)));
const reports=[],lines=['# Coverage v3 — actual MiniLM sentence-selection experiment','','Production remains retrieval build 2026-10-13-r44. Production UI baselines and isolated fixed/section candidate outputs are distinct. Installed Chrome with actual local Xenova/all-MiniLM-L6-v2 q8 WASM; Qwen disabled. The 24 original lexical Comparison cases remain unchanged. All other cases use actual Hybrid embeddings. No mock-vector accuracy claims.','','Historical scores and exposed SQuAD24 first results remain immutable. FreshMixed32 is a mixed public prospective sample: 24 unchanged externally authored supported questions, four constructed compound questions and four self-authored unsupported controls. It is not sealed independent accuracy, official SQuAD scoring or representative product accuracy. Possible model training exposure cannot be excluded. Different test sets/rubrics must not be pooled into a single accuracy figure.',''];
for(const pack of config.packs){
  const capture=JSON.parse(await fs.readFile(path.join(root,pack.name,'capture.json')));
  const docs=JSON.parse(await fs.readFile(path.join(root,pack.name,'source-extraction.json'))).documents;
  assert.equal(capture.cases.length,pack.cases.length);
  const historical=config.packs.indexOf(pack)<5;
  const previous=pack.name==='FreshMixed32'?null:JSON.parse(await fs.readFile(path.join(base,'coverage-v2-final',pack.name+'-scorecard.json')));
  const grade=(row,variant,i)=>{
    const key=pack.cases[i],r=row[variant];assert.equal(row.question,key.question);
    if(pack.name==='RetrievalQuality28')return {...gradeCase(key,r,docs),question:key.question,workflow:row.workflow,explicit_refusal:!r.answered&&r.sources.length===0};
    const sources=r.sources.map(s=>({filename:s.filename,quote:s.quote??s.excerpt,excerpt:s.excerpt}));
    const provenance=sources.map(s=>Boolean(s.quote)&&normalize(docs.find(d=>d.name===s.filename)?.text).includes(normalize(s.quote))&&normalize(s.excerpt).includes(normalize(s.quote)));
    const refusal=!r.answered&&sources.length===0&&/can't find this in the provided documents/i.test(r.answer??'');
    const unsupported=key.unsupported===true||key.supported===false||key.category==='unsupported';
    if(!historical){
      const relevant=sources.map(s=>s.filename===key.expected_file&&normalize(key.gold_context).includes(normalize(s.quote)));
      const groups=key.answer_groups??[key.answers];
      const matched=unsupported?[]:groups.map(group=>sources.some((s,j)=>relevant[j]&&group.some(a=>normalize(s.quote).includes(normalize(a.text)))));
      let outcome;
      if(unsupported)outcome=refusal?'PASS':'FAIL';
      else if(provenance.some(v=>!v)||!matched.some(Boolean))outcome='FAIL';
      else if(pack.name==='ExternalSQuAD24'&&!matched.every(Boolean))outcome='FAIL';
      else outcome=matched.every(Boolean)&&relevant.every(Boolean)?'PASS':'PARTIAL';
      return {id:key.id,question:key.question,workflow:row.workflow,category:key.category??'previously_exposed_supported',outcome,answer:r.answer,sources,citation_provenance:provenance,citation_relevance:relevant,matched_answer_groups:matched,gold_answer_groups:unsupported?[]:groups.map(g=>g.map(a=>a.text)),expected_file:key.expected_file,gold_context:key.gold_context,explicit_refusal:refusal,false_acceptance:unsupported&&!refusal,false_refusal:!unsupported&&refusal};
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
  const result={name:pack.name,classification:pack.name==='FreshMixed32'?capture.classification:'Known in-sample regression; first results preserved',browser:capture.browser,model:capture.model,build:capture.build,integrity:capture.integrity,summary:Object.fromEntries(Object.entries(variants).map(([v,rows])=>[v,summarize(rows)])),...variants};
  if(pack.name==='FreshMixed32')result.category_summary=Object.fromEntries(['externally_authored_supported','constructed_compound','constructed_unsupported'].map(cat=>[cat,Object.fromEntries(Object.entries(variants).map(([v,rows])=>[v,summarize(rows.filter(r=>r.category===cat))]))]));
  result.regressions=previous?Object.fromEntries(['fixed','section'].map(v=>[v,previous[v].filter((r,i)=>r.outcome==='PASS'&&variants[v][i].outcome!=='PASS').map(r=>r.id)])):null;
  await fs.writeFile(path.join(out,pack.name+'-scorecard.json'),JSON.stringify(result,null,2),{flag:'wx'});reports.push(result);
  lines.push(`## ${pack.name}`,'',JSON.stringify(result.summary,null,2),'');
  for(let i=0;i<pack.cases.length;i++){
    lines.push(`### ${pack.name}/${pack.cases[i].id} — ${capture.cases[i].workflow==='comparison'?'Separate lexical Comparison':'Hybrid Q&A'}`,'',pack.cases[i].question,'');
    for(const [v,label] of [['baseline','Production UI baseline'],['fixed','Isolated fixed + v3'],['section','Isolated sections + v3']]){
      const r=variants[v][i];lines.push(`**${label}: ${r.outcome}**`,'',r.answer,'');
      r.sources.forEach((s,j)=>lines.push(`Source: ${s.filename}; provenance ${r.citation_provenance[j]?'PASS':'FAIL'}; relevance ${r.citation_relevance[j]?'PASS':'FAIL'}.`,'',`> ${s.quote.replaceAll('\n','\n> ')}`,''));
      if(r.assessment)lines.push(r.assessment,'');
      if(r.quotation_scope_warning)lines.push('Scope caution: '+r.quotation_scope_warning,'');
      if(r.outcome!=='PASS')lines.push('Missing-evidence diagnostics (no context-only credit):',JSON.stringify({matched_evidence:r.matched_evidence,matched_answer_groups:r.matched_answer_groups,gold_answer_groups:r.gold_answer_groups,required_facts:r.required_facts},null,2),'');
    }
  }
}
const fresh=reports.find(r=>r.name==='FreshMixed32');
const regressions=reports.flatMap(p=>p.regressions?['fixed','section'].flatMap(v=>p.regressions[v].map(id=>p.name+'/'+id+'/'+v)):[]);
const checks={no_previous_pass_regressions:regressions.length===0,provenance_intact:reports.every(p=>['fixed','section'].every(v=>p.summary[v].citations===p.summary[v].valid_provenance)),no_new_false_acceptances_or_refusals:reports.every(p=>['fixed','section'].every(v=>p.summary[v].false_acceptances===0&&p.summary[v].false_refusals===0)),fresh_section_supported_at_least_21:fresh.category_summary.externally_authored_supported.section.PASS>=21,constructed_section_controls_all_pass:fresh.category_summary.constructed_compound.section.PASS===4&&fresh.category_summary.constructed_unsupported.section.PASS===4};
const decision={candidate_commit:config.candidate_commit,classification:'Isolated evaluation; fresh mixed public prospective confirmation, known controls in-sample',summaries:reports.map(({name,summary,category_summary,regressions})=>({name,summary,category_summary,regressions})),checks,release_consideration_gate:Object.values(checks).every(Boolean)?'PASS':'FAIL',pass_regressions:regressions,production_change:'NONE',production_build:'2026-10-13-r44',limitations:'24 externally authored public supported questions; four constructed compound and four self-authored unsupported controls. Not sealed independent accuracy or representative refusal accuracy. Historical and development scores cannot be pooled.'};
await fs.writeFile(path.join(out,'decision.json'),JSON.stringify(decision,null,2),{flag:'wx'});
lines.splice(5,0,'## Frozen gate decision','',JSON.stringify(decision,null,2),'');
await fs.writeFile(path.join(out,'FULL_REPORT.md'),lines.join('\n'),{flag:'wx'});
console.log(JSON.stringify(decision,null,2));
