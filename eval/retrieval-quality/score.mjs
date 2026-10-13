import fs from 'node:fs/promises';
import path from 'node:path';
import {gradeCase,retrievalMetrics} from './grade.mjs';
const dir=path.resolve(process.argv[2]||'../../outputs/retrieval-quality-r44-first-development');
const cases=JSON.parse(await fs.readFile('eval/retrieval-quality/fixed-cases.json','utf8'));
const ui=JSON.parse(await fs.readFile(path.join(dir,'baseline-ui.json'),'utf8'));
const experiment=JSON.parse(await fs.readFile(path.join(dir,'experiment.json'),'utf8'));
const baseline=ui.cases.map(row=>gradeCase(cases.find(c=>c.id===row.id),{...row,answered:row.sources.length>0},ui.documents));
const candidate=experiment.candidate.map(row=>gradeCase(cases.find(c=>c.id===row.id),row.result,ui.documents));
const summarize=rows=>({PASS:rows.filter(r=>r.outcome==='PASS').length,PARTIAL:rows.filter(r=>r.outcome==='PARTIAL').length,FAIL:rows.filter(r=>r.outcome==='FAIL').length,
  false_acceptances:rows.filter(r=>r.false_acceptance).length,false_refusals:rows.filter(r=>r.false_refusal).length,
  citations:rows.reduce((n,r)=>n+r.sources.length,0),provenance_valid:rows.flatMap(r=>r.citation_provenance).filter(Boolean).length,relevant:rows.flatMap(r=>r.citation_relevance).filter(Boolean).length});
const fixedMetrics=retrievalMetrics(experiment.baseline,cases),sectionMetrics=retrievalMetrics(experiment.candidate,cases);
const regressions=baseline.filter((r,i)=>r.outcome==='PASS'&&candidate[i].outcome!=='PASS').map(r=>r.id);
const summaries={baseline:summarize(baseline),candidate:summarize(candidate)};
const checks={higher_recall3:sectionMetrics.recall[3]>fixedMetrics.recall[3],top1_not_lower:sectionMetrics.top1_relevant>=fixedMetrics.top1_relevant,
  pass_not_lower:summaries.candidate.PASS>=summaries.baseline.PASS,no_pass_regressions:regressions.length===0,
  no_new_false_acceptances:summaries.candidate.false_acceptances<=summaries.baseline.false_acceptances,
  provenance_intact:summaries.candidate.provenance_valid===summaries.candidate.citations,within_passage_cap:experiment.section_passages<=72};
const quantile=(values,p)=>{const sorted=[...values].sort((a,b)=>a-b);return sorted[Math.max(0,Math.ceil(sorted.length*p)-1)];};
const warmTimes=experiment.baseline.map(r=>r.query_embed_ms+r.rank_extract_ms);
const result={classification:ui.classification,build:experiment.build,browser:ui.browser,summary:summaries,retrieval:{baseline:fixedMetrics,candidate:sectionMetrics},
  promotion_checks:checks,promotion_gate:Object.values(checks).every(Boolean)?'PASS':'FAIL',production_change:'NONE',regressions,
  passages:{baseline:experiment.fixed_passages,candidate:experiment.section_passages},timing:{enable_ms:ui.model_enable_ms,fixed_reindex_ms:experiment.fixed_index_ms,section_index_ms:experiment.section_index_ms,
    fixed_query_p50_ms:quantile(warmTimes,.5),fixed_query_p95_ms:quantile(warmTimes,.95),section_rank_extract_p50_ms:quantile(experiment.candidate.map(r=>r.rank_extract_ms),.5),heap_used_bytes:experiment.heap_used_bytes,
    caveat:'One pass, fixed-first order, warm/cache effects; section timings reuse actual query vectors and omit embedding. JS heap is not whole-device peak memory. No speed-superiority claim.'},baseline,candidate};
await fs.writeFile(path.join(dir,'scorecard.json'),JSON.stringify(result,null,2),{flag:'wx'});
const lines=['# Retrieval Quality 28 — real MiniLM development comparison','',`Build ${result.build}; Google Chrome ${result.browser}. Self-authored, frozen development inputs; NOT independent accuracy. Production remains unchanged.`,
  '',`Baseline: ${summaries.baseline.PASS} PASS / ${summaries.baseline.PARTIAL} PARTIAL / ${summaries.baseline.FAIL} FAIL. Candidate: ${summaries.candidate.PASS} PASS / ${summaries.candidate.PARTIAL} PARTIAL / ${summaries.candidate.FAIL} FAIL.`,
  `Promotion gate: ${result.promotion_gate}. PASS regressions: ${regressions.join(', ')||'none'}.`,
  '', '| Metric | Fixed windows | Section-aware candidate |','|---|---:|---:|',`| Passages | ${experiment.fixed_passages} | ${experiment.section_passages} |`,
  ...[1,3,5].map(k=>`| Exact evidence recall@${k} | ${fixedMetrics.recall_counts[k]}/${fixedMetrics.required_sentences} | ${sectionMetrics.recall_counts[k]}/${sectionMetrics.required_sentences} |`),
  `| Top-1 relevant | ${fixedMetrics.top1_relevant}/${fixedMetrics.supported_questions} | ${sectionMetrics.top1_relevant}/${sectionMetrics.supported_questions} |`,
  `| Valid quote provenance | ${summaries.baseline.provenance_valid}/${summaries.baseline.citations} | ${summaries.candidate.provenance_valid}/${summaries.candidate.citations} |`,
  `| Exact-evidence citation relevance | ${summaries.baseline.relevant}/${summaries.baseline.citations} | ${summaries.candidate.relevant}/${summaries.candidate.citations} |`,
  `| False acceptances / false refusals | ${summaries.baseline.false_acceptances} / ${summaries.baseline.false_refusals} | ${summaries.candidate.false_acceptances} / ${summaries.candidate.false_refusals} |`,
  '', '## Method and limitations','',
  'Main app Hybrid Q&A produced the original 28 baseline captures first. After baseline-ui.json was locked, instrumented production ranking was replayed and its source quotes/excerpts checked against UI outputs. Section-aware chunking ran only in an isolated browser-module experiment. Both used actual local Xenova/all-MiniLM-L6-v2 q8 WASM; Qwen stayed off. Candidate reused actual query vectors, not synthetic vectors. No application chunking switch was made.',
  'The pre-frozen rubric is a conservative exact-sentence checker; shortened but semantically adequate answers may score FAIL/PARTIAL. These scores do not establish semantic entailment or independent accuracy. Expanded excerpts cannot earn answer-completeness credit. All fixtures/protocol hashes were checked before capture; no questions, documents or scoring thresholds were adjusted after outputs.',
  'This measures 28 Hybrid questions, including two multi-document Hybrid controls. It does not evaluate the separate lexical Comparison workflow. Prior Atlas/Meridian/Lantern/Aster/Cobalt results remain unchanged.',
  '', '## Timing and resource observations','',JSON.stringify(result.timing,null,2),'',JSON.stringify(checks,null,2),'', '## Exact per-case outputs',''];
for(let i=0;i<cases.length;i++){
  const c=cases[i];lines.push(`### ${c.id} — ${c.category}`, '',c.question,'');
  for(const [name,row] of [['Baseline main UI',baseline[i]],['Candidate browser-module output',candidate[i]]]){
    lines.push(`**${name}: ${row.outcome}**`,'',row.answer,'');
    for(const [j,s] of row.sources.entries())lines.push(`Source ${j+1}: ${s.filename}; provenance ${row.citation_provenance[j]?'PASS':'FAIL'}; exact-evidence relevance ${row.citation_relevance[j]?'PASS':'FAIL'}.`,'',`> ${s.quote.replaceAll('\n','\n> ')}`,'','Expanded context (not graded as answer evidence):','',`> ${s.excerpt.replaceAll('\n','\n> ')}`,'');
  }
}
await fs.writeFile(path.join(dir,'REPORT.md'),lines.join('\n'),{flag:'wx'});
console.log(JSON.stringify({summary:summaries,retrieval:result.retrieval,promotion_gate:result.promotion_gate,regressions},null,2));
