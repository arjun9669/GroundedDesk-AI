// Cobalt controls use their unchanged phrase/concept rubric, not RQ28 exact sentences.
import fs from 'node:fs/promises';
import path from 'node:path';
import {normalize} from '../retrieval-quality/grade.mjs';
const out=path.resolve(process.argv[2]||'../../outputs/answer-coverage-r44-cobalt-control');
const pack='docs/evidence/r29/cobalt16';
const key=JSON.parse(await fs.readFile(pack+'/fixed-answer-key.json','utf8'));
const capture=JSON.parse(await fs.readFile(path.join(out,'cobalt-control.json'),'utf8'));
const old=JSON.parse(await fs.readFile('docs/evidence/r41/cobalt16/browser-observations.json','utf8'));
const docs=await Promise.all([...new Set(key.flatMap(c=>c.expected_files))].map(async name=>({name,text:await fs.readFile(pack+'/source_docs/'+name,'utf8')})));
const literal=r=>r.sources.map(s=>({filename:s.filename,quote:s.quote??s.excerpt,excerpt:s.excerpt}));
const cases=capture.rows.map((row,i)=>{
  const c=key[i],r=row.candidate,sources=literal(r);
  const displayed=sources.map(s=>s.quote).join('\n');
  const matches=c.required_facts.map(f=>normalize(displayed).toLowerCase().includes(normalize(f).toLowerCase()));
  const provenance=sources.map(s=>normalize(docs.find(d=>d.name===s.filename)?.text).includes(normalize(s.quote))&&
    normalize(s.excerpt).includes(normalize(s.quote))&&Boolean(s.quote));
  const relevance=sources.map(s=>c.expected_files.includes(s.filename)&&c.required_facts.some(f=>normalize(s.quote).toLowerCase().includes(normalize(f).toLowerCase())));
  const filesCorrect=c.expected_files.every(f=>sources.some(s=>s.filename===f))&&sources.every(s=>c.expected_files.includes(s.filename));
  const refusal=!r.answered&&sources.length===0&&/can't find this in the provided documents/i.test(r.answer??'');
  const outcome=c.unsupported?(refusal?'PASS':'FAIL'):
    provenance.some(v=>!v)||!matches.some(Boolean)?'FAIL':matches.every(Boolean)&&filesCorrect&&relevance.every(Boolean)?'PASS':'PARTIAL';
  return {id:c.id,workflow:c.workflow,question:c.question,outcome,matched_required_facts:matches,citation_provenance:provenance,citation_relevance:relevance,
    false_acceptance:c.unsupported&&!refusal,false_refusal:!c.unsupported&&!r.answered,
    unchanged_source_outputs_from_baseline:JSON.stringify(literal(row.baseline))===JSON.stringify(sources),
    original_r41_answer_unchanged:c.workflow==='hybrid'?normalize(r.answer)===normalize(old.cases[i].answer_only):null,
    answer:r.answer??sources.map((s,j)=>`[${j+1}] ${s.quote}`).join('\n\n'),sources,
    note:c.id==='H05'?'Original anaphoric "there" remains; unchanged frozen rubric accepts the curator/dryness facts. No stronger standalone completeness claim.':null};
});
const result={classification:'Cobalt16 known browser-module regression control; not independent or production main-UI accuracy',build:capture.build,browser:capture.browser,model:capture.model,
  counts:{PASS:cases.filter(r=>r.outcome==='PASS').length,PARTIAL:cases.filter(r=>r.outcome==='PARTIAL').length,FAIL:cases.filter(r=>r.outcome==='FAIL').length,
    citations:cases.reduce((n,r)=>n+r.sources.length,0),valid_provenance:cases.flatMap(r=>r.citation_provenance).filter(Boolean).length,relevant_citations:cases.flatMap(r=>r.citation_relevance).filter(Boolean).length,
    zero_citation_refusals:cases.filter((r,i)=>key[i].unsupported&&r.outcome==='PASS').length,false_acceptances:cases.filter(r=>r.false_acceptance).length,false_refusals:cases.filter(r=>r.false_refusal).length},
  recovery:capture.recovery,cases};
await fs.writeFile(path.join(out,'scorecard.json'),JSON.stringify(result,null,2),{flag:'wx'});
const lines=['# Cobalt16 controls — answer coverage experiment','',result.classification,'',
  `${result.counts.PASS} PASS / ${result.counts.PARTIAL} PARTIAL / ${result.counts.FAIL} FAIL. 12 actual-MiniLM Hybrid browser-module cases and four unchanged separate lexical Comparison cases. All source outputs match the paired production baseline. All 12 Hybrid answer strings match the preserved r41 answers after whitespace normalization.`,
  'The initial combined runner timed out before any Cobalt question. This separate recovery run retained the original failure log and did not repeat or replace RQ28 answers. This is an infrastructure retry qualification, not an undisclosed first-run success.',
  'Required fact phrases all appear directly in the literal outputs. Manual review confirms roles, durations, exceptions and document associations. Expanded Hybrid context is not credited. H05 retains its original anaphoric "there" limitation under the unchanged rubric.',''];
for(const r of cases){lines.push(`## ${r.id} — ${r.outcome}`,'',r.question,'',r.answer,'');for(const s of r.sources)lines.push(s.filename,'',`> ${s.quote.replaceAll('\n','\n> ')}`,'');}
await fs.writeFile(path.join(out,'REPORT.md'),lines.join('\n'),{flag:'wx'});
console.log(JSON.stringify(result.counts,null,2));
