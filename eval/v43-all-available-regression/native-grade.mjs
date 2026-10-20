// Literal native grading bodies copied from original v38 scorers.
import {normalize} from '../retrieval-quality/grade.mjs';
export function gradeGold(name,key,r,docs) {
 const pack={name},row={workflow:key.workflow??'hybrid'};
    const sources=r.sources.map(s=>({filename:s.filename,quote:s.quote??s.excerpt,excerpt:s.excerpt}));
    const provenance=sources.map(s=>Boolean(s.quote)&&normalize(docs.find(d=>d.name===s.filename)?.text).includes(normalize(s.quote))&&normalize(s.excerpt).includes(normalize(s.quote)));
    const refusal=!r.answered&&sources.length===0&&/can't find this in the provided documents/i.test(r.answer??'');
    const unsupported=key.unsupported===true||key.supported===false||key.category==='unsupported';
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
export function gradeBinding(key,r,docs) {
  const sources=r.sources.map(s=>({filename:s.filename,quote:s.quote,excerpt:s.excerpt}));
  const provenance=sources.map(s=>Boolean(s.quote)&&normalize(docs.find(d=>d.name===s.filename)?.text).includes(normalize(s.quote))&&normalize(s.excerpt).includes(normalize(s.quote)));
  const location=sources.map(s=>key.expected_sources.some(e=>e.filename===s.filename&&normalize(e.context).includes(normalize(s.quote))));
  const direct=sources.map((s,j)=>location[j]&&key.expected_sources.some(e=>e.filename===s.filename&&e.groups.some(g=>g.some(a=>normalize(s.quote).includes(normalize(a))))));
  const groups=key.expected_sources.flatMap(e=>e.groups.map(g=>({filename:e.filename,alternatives:g})));
  const matched=groups.map(g=>sources.some((s,j)=>location[j]&&g.filename===s.filename&&g.alternatives.some(a=>normalize(s.quote).includes(normalize(a)))));
  const refusal=!r.answered&&sources.length===0&&/can't find this in the provided documents/i.test(r.answer);
  const outcome=key.unsupported?(refusal?'PASS':'FAIL'):provenance.some(x=>!x)||!matched.some(Boolean)?'FAIL':matched.every(Boolean)&&location.every(Boolean)?'PASS':'PARTIAL';
  return {id:key.id,question:key.question,workflow:key.workflow,category:key.category,outcome,answer:r.answer,sources,citation_provenance:provenance,gold_paragraph_precision:location,direct_gold_span_support:direct,matched_answer_groups:matched,required_groups:groups,expected_sources:key.expected_sources,refusal,false_acceptance:Boolean(key.unsupported&&!refusal),false_refusal:!key.unsupported&&refusal};
}
