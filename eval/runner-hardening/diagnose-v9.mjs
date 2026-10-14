// Read-only diagnosis of existing captures; never reruns a question or changes a grade.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const base=path.resolve('../../outputs');
const scores=JSON.parse(await fs.readFile(path.join(base,'coverage-v9-fresh-final/scorecard.json')));
const capture=JSON.parse(await fs.readFile(path.join(base,'coverage-v9-fresh-combined-observations.json')));
const normalize=s=>String(s??'').replace(/\s+/g,' ').trim();
const records=[];
for(const row of scores.section){
 if(row.outcome==='PASS')continue;
 const observed=capture.cases.find(r=>r.id===row.id);assert.equal(observed.question,row.question);
 if(row.outcome==='BLOCKED'){
  records.push({id:row.id,question:row.question,outcome:row.outcome,diagnosis:'No first-attempt output available; no factual assessment',limitation:row.limitation});continue;
 }
 const groups=row.gold_answer_groups;
 const rank=groups.map(g=>{
  const i=observed.top5.section.findIndex(c=>c.filename===row.expected_file&&g.some(a=>normalize(c.content).includes(normalize(a))));
  return i<0?null:i+1;
 });
 const headingOnly=row.sources.some(s=>/^#{1,6}\s+[^\n]+$/.test(s.quote));
 const location=row.gold_paragraph_precision;
 const supportedTop3=rank.every(r=>r!==null&&r<=3),supportedTop5=rank.every(r=>r!==null);
 const original=scores.baseline.find(r=>r.id===row.id),paired=scores.paired_section.find(r=>r.id===row.id);
 const diagnosis=headingOnly?'Heading selected as answer; factual body missing':
  !supportedTop5?'Missing one or more gold groups in recorded top-five passages; ranking/coverage limit':
  !location.every(Boolean)?'Candidate quotation lies outside expected original paragraph':
  !supportedTop3?'Evidence exists in top five, but not all groups occur in top three':
  'Evidence exists in recorded top-three passages; displayed quotation omits required facts';
 records.push({id:row.id,question:row.question,outcome:row.outcome,diagnosis,
  gold_group_first_top5_rank:rank,all_groups_in_top3:supportedTop3,all_groups_in_top5:supportedTop5,
  required_groups:groups,matched_groups:row.matched_answer_groups,expected_file:row.expected_file,
  candidate_answer:row.answer,sources:row.sources,citation_provenance:row.citation_provenance,
  gold_paragraph_location:location,direct_gold_span_support:row.direct_gold_span_support,
  production_outcome:original.outcome,production_answer:original.answer,paired_v8_outcome:paired.outcome,
  production_pass_lost:original.outcome==='PASS'&&row.outcome!=='PASS',paired_v8_pass_lost:paired.outcome==='PASS'&&row.outcome!=='PASS',
  candidate_diagnostics:observed.section.relationship_diagnostics,
  interpretation_limit:'Gold-string rank presence is a diagnostic proxy, not a causal counterfactual or semantic entailment test'});
}
const out=path.join(base,'runner-hardening-diagnosis');await fs.mkdir(out);assert.equal((await fs.readdir(out)).length,0);
await fs.writeFile(path.join(out,'v9-diagnosis.json'),JSON.stringify({classification:'Read-only analysis of exposed V9 first-attempt evidence; no new benchmark',records},null,2),{flag:'wx'});
const lines=['# V9 exposed fresh-sample failure diagnosis','','Read-only inspection of preserved actual Chrome/MiniLM outputs. No question rerun, key/rubric edit, new model vectors or changed score. Rank/spans are diagnostic proxies. F06 remains ungraded.',''];
for(const r of records){
 lines.push(`## ${r.id} — ${r.outcome}`,'',r.question,'',r.diagnosis,'');
 if(r.outcome==='BLOCKED'){lines.push(r.limitation,'');continue;}
 lines.push(`Gold-group first recorded top-five ranks: ${JSON.stringify(r.gold_group_first_top5_rank)}.`,'',`Production: ${r.production_outcome}; paired v8: ${r.paired_v8_outcome}.`, '',r.candidate_answer,'');
 for(const s of r.sources)lines.push(`Source: ${s.filename}`,'',`> ${s.quote.replaceAll('\n','\n> ')}`,'');
 lines.push('Missing required groups: '+JSON.stringify(r.required_groups.filter((g,i)=>!r.matched_groups[i])),'');
}
await fs.writeFile(path.join(out,'DIAGNOSIS.md'),lines.join('\n'),{flag:'wx'});
console.log(JSON.stringify(records.map(({id,outcome,diagnosis,gold_group_first_top5_rank,production_pass_lost})=>({id,outcome,diagnosis,gold_group_first_top5_rank,production_pass_lost})),null,2));
