import fs from 'node:fs/promises';
import path from 'node:path';
import {gradeCase,normalize} from '../retrieval-quality/grade.mjs';

const out=path.resolve(process.argv[2]||'../../outputs/answer-coverage-r44-first-experiment');
const cases=JSON.parse(await fs.readFile('eval/retrieval-quality/fixed-cases.json','utf8'));
const documents=JSON.parse(await fs.readFile('docs/evidence/retrieval-quality-r44/baseline-ui.json','utf8')).documents;
const historical=JSON.parse(await fs.readFile('docs/evidence/retrieval-quality-r44/scorecard.json','utf8'));
const capture=JSON.parse(await fs.readFile(path.join(out,'candidate.json'),'utf8'));
const summaries=rows=>({PASS:rows.filter(r=>r.outcome==='PASS').length,PARTIAL:rows.filter(r=>r.outcome==='PARTIAL').length,FAIL:rows.filter(r=>r.outcome==='FAIL').length,
  false_acceptances:rows.filter(r=>r.false_acceptance).length,false_refusals:rows.filter(r=>r.false_refusal).length,
  citations:rows.reduce((n,r)=>n+r.sources.length,0),valid_provenance:rows.flatMap(r=>r.citation_provenance).filter(Boolean).length,
  exact_evidence_relevant:rows.flatMap(r=>r.citation_relevance).filter(Boolean).length});
const fixed=capture.rows.map((r,i)=>gradeCase(cases[i],r.fixed,documents));
const section=capture.rows.map((r,i)=>gradeCase(cases[i],r.section,documents));
const regressions=(original,now)=>original.filter((r,i)=>r.outcome==='PASS'&&now[i].outcome!=='PASS').map(r=>r.id);
const fixedRegressions=regressions(historical.baseline,fixed),sectionRegressions=regressions(historical.candidate,section);
const summary={fixed:summaries(fixed),section:summaries(section)};
const checks={fixed_strict_pass_improved:summary.fixed.PASS>historical.summary.baseline.PASS,
  section_strict_pass_not_lower:summary.section.PASS>=historical.summary.candidate.PASS,
  no_original_pass_regressions:fixedRegressions.length===0&&sectionRegressions.length===0,
  no_new_false_acceptances:summary.fixed.false_acceptances===0&&summary.section.false_acceptances===0,
  no_new_false_refusals:summary.fixed.false_refusals===0&&summary.section.false_refusals===0,
  provenance_intact:summary.fixed.citations===summary.fixed.valid_provenance&&summary.section.citations===summary.section.valid_provenance};
const result={classification:'Frozen known development regression; exact-sentence rubric, not independent accuracy',build:capture.build,browser:capture.browser,model:capture.model,
  historical:{fixed:historical.summary.baseline,section:historical.summary.candidate},summary,checks,
  development_gate:Object.values(checks).every(Boolean)?'PASS':'FAIL',fixed_regressions:fixedRegressions,section_regressions:sectionRegressions,
  production_change:'NONE',retrieval_change:'NONE; both original indexes/ranks reused with actual local query embeddings',fixed,section};
await fs.writeFile(path.join(out,'scorecard.json'),JSON.stringify(result,null,2),{flag:'wx'});
const lines=['# Answer coverage — real MiniLM development regression','',
  'Self-authored, known frozen Retrieval Quality 28 inputs. NOT independent accuracy. Production r44 unchanged. Qwen off. Actual local MiniLM. Candidate outputs were computed in Chrome browser modules and rendered in a labeled experimental observation panel; they are not production Q&A UI results.',
  '', '| Variant | PASS | PARTIAL | FAIL |','|---|---:|---:|---:|',
  `| Original fixed windows | ${historical.summary.baseline.PASS} | ${historical.summary.baseline.PARTIAL} | ${historical.summary.baseline.FAIL} |`,
  `| Fixed windows + coverage | ${summary.fixed.PASS} | ${summary.fixed.PARTIAL} | ${summary.fixed.FAIL} |`,
  `| Original section windows | ${historical.summary.candidate.PASS} | ${historical.summary.candidate.PARTIAL} | ${historical.summary.candidate.FAIL} |`,
  `| Section windows + coverage | ${summary.section.PASS} | ${summary.section.PARTIAL} | ${summary.section.FAIL} |`,
  '',`Development gate: ${result.development_gate}. Fixed PASS regressions: ${fixedRegressions.join(', ')||'none'}. Section PASS regressions: ${sectionRegressions.join(', ')||'none'}.`,
  '', 'The original baseline source filenames, displayed quotes and excerpts were exactly reproduced in a separate replay before executing the candidate. No frozen input, scoring rule, expected answer or production module changed. The original fixed 16/7/5 and section 19/7/2 remain preserved. Candidate source selection may add an explicitly requested ranked document; it never rescues an existing refusal.',
  'Completeness and relevance require exact full expected sentences in the quotation; expanded context does not earn credit. This conservative rubric is not a semantic entailment judge. Every quote must occur in both named source text and returned excerpt. Rankings/chunking were unchanged, so this experiment measures answer selection rather than retrieval recall gains.',
  'The prototype is restricted to recognized Markdown paragraphs; unsectioned text receives original selection behavior. Max three adjacent sentences and 620 characters; headings, blank paragraphs and labeled commentary bound expansion. Printed clock/event rules remain literal, never inferred. Model/cache timing was not used to claim performance superiority.',
  '', '## Counts','', '```json',JSON.stringify(summary,null,2),'```','', '## Every exact result',''];
for(let i=0;i<cases.length;i++){
  lines.push(`### ${cases[i].id}`, '',cases[i].question,'');
  for(const [variant,row] of [['Fixed + coverage',fixed[i]],['Section + coverage',section[i]]]){
    lines.push(`**${variant}: ${row.outcome}**`,'',row.answer,'');
    for(let j=0;j<row.sources.length;j++){
      const s=row.sources[j];lines.push(`Source: ${s.filename}; provenance ${row.citation_provenance[j]?'PASS':'FAIL'}; exact-evidence relevance ${row.citation_relevance[j]?'PASS':'FAIL'}.`,'',`> ${s.quote.replaceAll('\n','\n> ')}`,'','Expanded context (not graded):','',`> ${s.excerpt.replaceAll('\n','\n> ')}`,'');
    }
    const missing=cases[i].evidence.filter((_,j)=>!row.matched_evidence[j]);
    if(missing.length)lines.push('Missing exact evidence:',...missing.map(e=>`- ${e.filename}: ${e.text}`),'');
  }
}
await fs.writeFile(path.join(out,'REPORT.md'),lines.join('\n'),{flag:'wx'});
const controlFile=process.argv[3]||path.join(out,'cobalt-control.json');
let control;
try{control=JSON.parse(await fs.readFile(controlFile,'utf8'));}
catch(error){if(error.code!=='ENOENT')throw error;console.log('Cobalt control NOT RUN here; preserve infrastructure blocker separately.');}
if(control){
const key=JSON.parse(await fs.readFile('docs/evidence/r29/cobalt16/fixed-answer-key.json','utf8'));
const previous=JSON.parse(await fs.readFile('docs/evidence/r41/cobalt16/browser-observations.json','utf8'));
const controls=control.rows.map((row,i)=>({id:row.id,workflow:row.workflow,question:row.question,required_facts:key[i].required_facts,
  expected_files:key[i].expected_files,unsupported:key[i].unsupported,
  unchanged_candidate_from_baseline:JSON.stringify(row.baseline)===JSON.stringify({...row.candidate,experiment:undefined}),
  old_r41_answer_unchanged:row.workflow==='hybrid'?normalize(row.candidate.answer)===normalize(previous.cases[i].answer_only):null,
  actual_candidate:row.candidate}));
await fs.writeFile(path.join(out,'cobalt-review.json'),JSON.stringify(controls,null,2),{flag:'wx'});
}
console.log(JSON.stringify({summary,development_gate:result.development_gate,fixedRegressions,sectionRegressions},null,2));
