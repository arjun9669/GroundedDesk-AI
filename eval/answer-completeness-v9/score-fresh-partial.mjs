// Predeclared public criteria, not official SQuAD EM/F1 or an entailment judge.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {normalize} from '../retrieval-quality/grade.mjs';
const base=path.resolve('../../outputs');
const development=JSON.parse(await fs.readFile(path.join(base,'coverage-v9-final/decision.json')));
assert.equal(development.development_gate,'PASS');
const config=JSON.parse(await fs.readFile(path.join(base,'coverage-v9-fresh-inputs/run-config.json')));
const pack=config.packs[0],root=path.join(base,'coverage-v9-fresh-first-run',pack.name);
assert.equal(JSON.parse(await fs.readFile(path.join(base,'coverage-v9-fresh-first-run/failure.json'))).activeCase,'F06');
assert.equal(JSON.parse(await fs.readFile(path.join(base,'coverage-v9-fresh-continuation-run/run-status.json'))).status,'COMPLETE');
const continuation=JSON.parse(await fs.readFile(path.join(base,'coverage-v9-fresh-continuation-run',pack.name,'capture.json')));
const rows=new Map(continuation.cases.map(r=>[r.id,r]));
for(const id of ['F01','F02','F03','F04','F05'])rows.set(id,JSON.parse(await fs.readFile(path.join(root,id+'-candidate.json'))));
assert.equal(rows.size,31);
const capture={...continuation,classification:'Incomplete prospective public confirmation; F06 first output not captured',cases:pack.cases.map(k=>rows.get(k.id)||{id:k.id,question:k.question,blocked:true})};
await fs.writeFile(path.join(base,'coverage-v9-fresh-combined-observations.json'),JSON.stringify(capture,null,2),{flag:'wx'});
const docs=JSON.parse(await fs.readFile(path.join(root,'source-extraction.json'))).documents;
const out=path.join(base,'coverage-v9-fresh-final');await fs.mkdir(out,{recursive:true});assert.equal((await fs.readdir(out)).length,0);
const summary=rows=>({BLOCKED:rows.filter(r=>r.outcome==='BLOCKED').length,PASS:rows.filter(r=>r.outcome==='PASS').length,PARTIAL:rows.filter(r=>r.outcome==='PARTIAL').length,FAIL:rows.filter(r=>r.outcome==='FAIL').length,citations:rows.flatMap(r=>r.sources).length,valid_provenance:rows.flatMap(r=>r.citation_provenance).filter(Boolean).length,gold_paragraph_citations:rows.flatMap(r=>r.gold_paragraph_precision).filter(Boolean).length,direct_gold_span_citations:rows.flatMap(r=>r.direct_gold_span_support).filter(Boolean).length,false_acceptances:rows.filter(r=>r.false_acceptance).length,false_refusals:rows.filter(r=>r.false_refusal).length,uncited_refusals:rows.filter(r=>r.refusal).length});
const variants={};
for(const variant of ['baseline','fixed','section','paired_fixed','paired_section']){
  variants[variant]=capture.cases.map((row,i)=>{
    const key=pack.cases[i];assert.equal(row.question,key.question);
    if(row.blocked)return {id:key.id,question:key.question,category:key.category,outcome:'BLOCKED',answer:null,sources:[],citation_provenance:[],gold_paragraph_precision:[],direct_gold_span_support:[],matched_answer_groups:[],gold_answer_groups:key.answer_groups.map(g=>g.map(a=>a.text)),gold_context:key.gold_context,expected_file:key.expected_file,refusal:null,false_acceptance:null,false_refusal:null,limitation:'Original UI query attempted once; readiness check failed on trailing-space trim. Output unavailable; not rerun or graded.'};
    const r=variant.startsWith('paired_')?row.pairedPrevious[variant.slice(7)]:row[variant];
    const sources=r.sources.map(s=>({filename:s.filename,quote:s.quote,excerpt:s.excerpt}));
    const provenance=sources.map(s=>Boolean(s.quote)&&normalize(docs.find(d=>d.name===s.filename)?.text).includes(normalize(s.quote))&&normalize(s.excerpt).includes(normalize(s.quote)));
    const location=sources.map(s=>s.filename===key.expected_file&&normalize(key.gold_context).includes(normalize(s.quote)));
    const direct=sources.map((s,j)=>location[j]&&key.answer_groups.some(g=>g.some(a=>normalize(s.quote).includes(normalize(a.text)))));
    const matched=key.answer_groups.map(g=>sources.some((s,j)=>location[j]&&g.some(a=>normalize(s.quote).includes(normalize(a.text)))));
    const refusal=!r.answered&&sources.length===0&&/can't find this in the provided documents/i.test(r.answer);
    const outcome=key.unsupported?(refusal?'PASS':'FAIL'):provenance.some(v=>!v)||!matched.some(Boolean)?'FAIL':matched.every(Boolean)&&location.every(Boolean)?'PASS':'PARTIAL';
    return {id:key.id,question:key.question,category:key.category,outcome,answer:r.answer,sources,citation_provenance:provenance,gold_paragraph_precision:location,direct_gold_span_support:direct,matched_answer_groups:matched,gold_answer_groups:key.answer_groups.map(g=>g.map(a=>a.text)),gold_context:key.gold_context,expected_file:key.expected_file,refusal,false_acceptance:Boolean(key.unsupported&&!refusal),false_refusal:!key.unsupported&&refusal};
  });
}
const categories=Object.fromEntries(['externally_authored_supported','constructed_compound','constructed_unsupported'].map(c=>[c,Object.fromEntries(Object.entries(variants).map(([v,rows])=>[v,summary(rows.filter(r=>r.category===c))]))]));
const checks={all_cases_captured:false,development_gate_passed:true,fresh_section_supported_at_least_21:categories.externally_authored_supported.section.PASS>=21,fresh_section_constructed_all_pass:categories.constructed_compound.section.PASS===4&&categories.constructed_unsupported.section.PASS===4,provenance_intact:variants.section.every(r=>r.citation_provenance.every(Boolean)),no_false_acceptance_or_refusal:variants.section.every(r=>!r.false_acceptance&&!r.false_refusal)};
const regressions=Object.fromEntries(['fixed','section'].map(v=>[v,variants[v].filter((r,i)=>['baseline','paired_'+v].some(old=>variants[old][i].outcome==='PASS')&&r.outcome!=='PASS').map(r=>r.id)]));
const result={name:pack.name,classification:'Incomplete mixed public prospective confirmation; 31 captured and 1 BLOCKED; not sealed independent accuracy or official SQuAD EM/F1',browser:capture.browser,build:capture.build,model:capture.model,integrity:capture.integrity,summary:Object.fromEntries(Object.entries(variants).map(([v,r])=>[v,summary(r)])),category_summary:categories,checks,release_consideration_gate:'BLOCKED: F06 first-attempt output unavailable',fresh_paired_pass_regressions:regressions,production_change:'NONE',...variants};
await fs.writeFile(path.join(out,'scorecard.json'),JSON.stringify(result,null,2),{flag:'wx'});
const lines=['# V9 fresh public prospective32 — actual MiniLM','','24 original externally authored supported questions; four constructed compound controls; four self-authored unsupported controls. Frozen before answers.31 cases captured, F06 ungraded due runner readiness timeout; no question replay. Not sealed independent accuracy, official SQuAD scoring or representative accuracy; prior public/model exposure cannot be excluded. Gold-paragraph precision is a location proxy, not semantic support. Same-session v8/v9 use identical real vectors. Production remains r44; a gate PASS permits review only.','',JSON.stringify({summary:result.summary,categories,checks,gate:result.release_consideration_gate,regressions},null,2),''];
for(let i=0;i<pack.cases.length;i++){
  lines.push(`## ${pack.cases[i].id}`,'',pack.cases[i].question,'');
  for(const [v,rows] of Object.entries(variants)){
    const r=rows[i];lines.push(`**${v}: ${r.outcome}**`,'',r.answer,'');
    r.sources.forEach((s,j)=>lines.push(`Source: ${s.filename}; provenance ${r.citation_provenance[j]?'PASS':'FAIL'}; gold-paragraph match ${r.gold_paragraph_precision[j]?'PASS':'FAIL'}; requested span ${r.direct_gold_span_support[j]?'PASS':'FAIL'}.`,'',`> ${s.quote.replaceAll('\n','\n> ')}`,''));
    if(r.outcome!=='PASS')lines.push(JSON.stringify({required_gold_groups:r.gold_answer_groups,matched:r.matched_answer_groups},null,2),'');
  }
}
await fs.writeFile(path.join(out,'FULL_REPORT.md'),lines.join('\n'),{flag:'wx'});
console.log(JSON.stringify({summary:result.summary,categories,checks,gate:result.release_consideration_gate,regressions},null,2));
