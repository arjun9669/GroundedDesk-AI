// Frozen displayed-evidence criteria; no entailment judge or context-only credit.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {normalize} from '../retrieval-quality/grade.mjs';
const base=path.resolve('../../outputs'),root=path.join(base,'coverage-v25-first-run');
const config=JSON.parse(await fs.readFile(path.join(base,'coverage-v25-inputs/run-config.json'))),pack=config.packs.find(p=>p.name==='Binding64');
const historicalGate=JSON.parse(await fs.readFile(path.join(base,'coverage-v25-final/decision.json'))).development_gate;
assert.equal(JSON.parse(await fs.readFile(path.join(root,'run-status.json'))).status,'COMPLETE');
const freeze=JSON.parse(await fs.readFile('eval/answer-completeness-v25/freeze-manifest.json'));
const sha=b=>createHash('sha256').update(b).digest('hex');
assert.equal(sha(await fs.readFile(path.join(base,'coverage-v25-inputs/run-config.json'))),freeze.private_config_sha256);
for(const f of freeze.files)assert.equal(sha(await fs.readFile(f.path)),f.sha256);
const proof=JSON.parse(await fs.readFile(path.join(root,'module-proof.json')));
assert.equal(proof.candidate.id,'coverage-v25-claim-support-guards');assert.equal(proof.candidate.sha256,config.module_identity.candidate.sha256);assert.ok(proof.before_questions);
const capture=JSON.parse(await fs.readFile(path.join(root,pack.name,'capture.json'))),docs=JSON.parse(await fs.readFile(path.join(root,pack.name,'source-extraction.json'))).documents;
assert.equal(capture.cases.length,64);assert.deepEqual(capture.module_identity,proof);
const out=path.join(base,'coverage-v25-binding64-final');await fs.mkdir(out,{recursive:true});assert.equal((await fs.readdir(out)).length,0);
const summarize=rows=>({PASS:rows.filter(r=>r.outcome==='PASS').length,PARTIAL:rows.filter(r=>r.outcome==='PARTIAL').length,FAIL:rows.filter(r=>r.outcome==='FAIL').length,citations:rows.flatMap(r=>r.sources).length,valid_provenance:rows.flatMap(r=>r.citation_provenance).filter(Boolean).length,gold_paragraph_citations:rows.flatMap(r=>r.gold_paragraph_precision).filter(Boolean).length,direct_span_citations:rows.flatMap(r=>r.direct_gold_span_support).filter(Boolean).length,false_acceptances:rows.filter(r=>r.false_acceptance).length,false_refusals:rows.filter(r=>r.false_refusal).length,zero_citation_refusals:rows.filter(r=>r.refusal).length});
const variants={};
for(const v of ['baseline','fixed','section','paired_fixed','paired_section']){
 variants[v]=capture.cases.map((row,i)=>{
  const key=pack.cases[i];assert.equal(row.question,key.question);assert.equal(row.id,key.id);assert.equal(row.workflow,key.workflow);
  const r=v.startsWith('paired_')?row.pairedPrevious[v.slice(7)]:row[v];
  const sources=r.sources.map(s=>({filename:s.filename,quote:s.quote,excerpt:s.excerpt}));
  const provenance=sources.map(s=>Boolean(s.quote)&&normalize(docs.find(d=>d.name===s.filename)?.text).includes(normalize(s.quote))&&normalize(s.excerpt).includes(normalize(s.quote)));
  const location=sources.map(s=>key.expected_sources.some(e=>e.filename===s.filename&&normalize(e.context).includes(normalize(s.quote))));
  const direct=sources.map((s,j)=>location[j]&&key.expected_sources.some(e=>e.filename===s.filename&&e.groups.some(g=>g.some(a=>normalize(s.quote).includes(normalize(a))))));
  const groups=key.expected_sources.flatMap(e=>e.groups.map(g=>({filename:e.filename,alternatives:g})));
  const matched=groups.map(g=>sources.some((s,j)=>location[j]&&g.filename===s.filename&&g.alternatives.some(a=>normalize(s.quote).includes(normalize(a)))));
  const refusal=!r.answered&&sources.length===0&&/can't find this in the provided documents/i.test(r.answer);
  const outcome=key.unsupported?(refusal?'PASS':'FAIL'):provenance.some(x=>!x)||!matched.some(Boolean)?'FAIL':matched.every(Boolean)&&location.every(Boolean)?'PASS':'PARTIAL';
  return {id:key.id,question:key.question,workflow:key.workflow,category:key.category,outcome,answer:r.answer,sources,citation_provenance:provenance,gold_paragraph_precision:location,direct_gold_span_support:direct,matched_answer_groups:matched,required_groups:groups,expected_sources:key.expected_sources,refusal,false_acceptance:Boolean(key.unsupported&&!refusal),false_refusal:!key.unsupported&&refusal};
 });
}
const cats=['public_supported','public_compound','count_supported','conditional_supported','unsupported_actor_action','unsupported_standard','lexical_comparison'];
const categories=Object.fromEntries(cats.map(c=>[c,Object.fromEntries(Object.entries(variants).map(([v,rows])=>[v,summarize(rows.filter(r=>r.category===c))]))]));
const regressions=Object.fromEntries(['fixed','section'].map(v=>[v,variants[v].filter((r,i)=>['baseline','paired_fixed','paired_section'].some(p=>variants[p][i].outcome==='PASS')&&r.outcome!=='PASS').map(r=>r.id)]));
const checks={development_gate_passed:historicalGate==='PASS'};
for(const v of ['fixed','section']){
 checks[v+'_public_at_least21']=categories.public_supported[v].PASS>=21;
 checks[v+'_compound_all4']=categories.public_compound[v].PASS===4;
 checks[v+'_count_all12']=categories.count_supported[v].PASS===12;
 checks[v+'_conditional_all8']=categories.conditional_supported[v].PASS===8;
 checks[v+'_unsupported_all12']=categories.unsupported_actor_action[v].PASS===8&&categories.unsupported_standard[v].PASS===4;
 checks[v+'_comparison_all4']=categories.lexical_comparison[v].PASS===4;
 checks[v+'_every_citation_requested_span']=variants[v].every(r=>r.direct_gold_span_support.every(Boolean));
 checks[v+'_provenance_intact']=variants[v].every(r=>r.citation_provenance.every(Boolean));
 checks[v+'_no_false_acceptance_or_refusal']=variants[v].every(r=>!r.false_acceptance&&!r.false_refusal);
 checks[v+'_no_paired_or_production_pass_loss']=regressions[v].length===0;
}
const result={name:'Binding64',original_binding64_first_result_preserved:'Qualified v20 45/1/18 both; original startup BLOCKED remains immutable',question_retries:0,classification:'Exposed Binding64 in-sample v25 regression; not new independent accuracy',browser:capture.browser,build:capture.build,model:capture.model,module_identity:proof,summary:Object.fromEntries(Object.entries(variants).map(([v,rows])=>[v,summarize(rows)])),category_summary:categories,checks,confirmation_gate:Object.values(checks).every(Boolean)?'PASS':'FAIL',same_session_pass_regressions:regressions,production_change:'NONE',...variants};
await fs.writeFile(path.join(out,'scorecard.json'),JSON.stringify(result,null,2),{flag:'wx'});
const lines=['# Binding64 — exposed v25 in-sample regression','','60 actual MiniLM Hybrid Q&A and4 separate lexical Comparison cases. Production baseline and isolated v25 fixed/section and paired v23 are distinct. Original sources/questions/key/rubric unchanged; zero question retries. Preserve the original v20 qualified 45/1/18 and original blocked startup. All questions are now exposed in-sample regression, not new independent accuracy. Public/model exposure may exist; constructed controls are author-created stress tests. No pooled independent accuracy or official SQuAD claim.','','```json',JSON.stringify({summary:result.summary,categories,checks,gate:result.confirmation_gate,regressions},null,2),'```',''];
for(let i=0;i<pack.cases.length;i++){
 lines.push(`## ${pack.cases[i].id} — ${pack.cases[i].workflow==='comparison'?'Separate lexical Comparison':'Actual MiniLM Hybrid'}`,'',pack.cases[i].question,'');
 for(const [v,rows] of Object.entries(variants)){
  const r=rows[i];lines.push(`**${v}: ${r.outcome}**`,'',r.answer,'');
  r.sources.forEach((s,j)=>lines.push(`Source: ${s.filename}; provenance ${r.citation_provenance[j]?'PASS':'FAIL'}; paragraph proxy ${r.gold_paragraph_precision[j]?'PASS':'FAIL'}; requested span ${r.direct_gold_span_support[j]?'PASS':'FAIL'}.`,'',`> ${s.quote.replaceAll('\n','\n> ')}`,''));
  if(r.outcome!=='PASS')lines.push('Frozen required groups / matches:','```json',JSON.stringify({required:r.required_groups,matched:r.matched_answer_groups},null,2),'```','');
 }
}
await fs.writeFile(path.join(out,'FULL_REPORT.md'),lines.join('\n'),{flag:'wx'});
console.log(JSON.stringify({summary:result.summary,categories,checks,gate:result.confirmation_gate,regressions},null,2));
