// Frozen exact-evidence rubric; no context-only credit or semantic judge.
export const normalize = text => String(text??'').replace(/\s+/g,' ').trim();
export function gradeCase(item,result,documents){
  const sources=result.sources||[];
  const provenance=sources.map(s=>{
    const doc=documents.find(d=>d.name===s.filename);
    return Boolean(doc&&s.quote&&s.excerpt&&normalize(s.excerpt).includes(normalize(s.quote))&&normalize(doc.text).includes(normalize(s.excerpt)));
  });
  const matched=item.evidence.map(e=>sources.some(s=>s.filename===e.filename&&normalize(s.quote).includes(normalize(e.text))));
  const relevant=sources.map(s=>item.evidence.some(e=>s.filename===e.filename&&normalize(s.quote).includes(normalize(e.text))));
  const supported=item.evidence.length>0;
  const refusal=!result.answered&&sources.length===0&&/can't find this in the provided documents/i.test(result.answer);
  let outcome;
  if(!supported)outcome=refusal?'PASS':'FAIL';
  else if(provenance.some(ok=>!ok)||!matched.some(Boolean))outcome='FAIL';
  else outcome=matched.every(Boolean)&&sources.every(s=>item.evidence.some(e=>e.filename===s.filename))?'PASS':'PARTIAL';
  return {id:item.id,outcome,matched_evidence:matched,citation_provenance:provenance,citation_relevance:relevant,
    false_acceptance:!supported&&!refusal,false_refusal:supported&&!result.answered,answer:result.answer,sources};
}
export function retrievalMetrics(rows,cases){
  let units=0,top1=0;const found={1:0,3:0,5:0};
  for(const item of cases.filter(c=>c.evidence.length)){
    const row=rows.find(r=>r.id===item.id);units+=item.evidence.length;
    if(item.evidence.some(e=>row.top5[0]?.filename===e.filename&&normalize(row.top5[0].content).includes(normalize(e.text))))top1++;
    for(const k of [1,3,5])for(const e of item.evidence)
      if(row.top5.slice(0,k).some(p=>p.filename===e.filename&&normalize(p.content).includes(normalize(e.text))))found[k]++;
  }
  return {required_sentences:units,supported_questions:cases.filter(c=>c.evidence.length).length,top1_relevant:top1,
    recall_counts:found,recall:Object.fromEntries([1,3,5].map(k=>[k,found[k]/units]))};
}
