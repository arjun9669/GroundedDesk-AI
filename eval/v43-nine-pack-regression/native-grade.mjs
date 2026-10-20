// Original Cedar32/Bracken32 native grading body, unchanged. No citation-number amendment.
const norm=s=>String(s??'').replace(/\s+/g,' ').trim();
export function gradeEarlyGroup(k,r,docs) {
 const sources=r.sources.map(s=>({filename:s.filename,quote:s.quote,excerpt:s.excerpt}));
 const provenance=sources.map(s=>Boolean(s.quote)&&norm(docs.find(d=>d.name===s.filename)?.text).includes(norm(s.quote)));
 const paragraph=sources.map(s=>k.expected_sources.some(e=>e.filename===s.filename&&norm(e.context).includes(norm(s.quote))));
 const relevant=sources.map((s,j)=>paragraph[j]&&k.expected_sources.some(e=>e.filename===s.filename&&e.groups.some(g=>g.some(a=>norm(s.quote).includes(norm(a))))));
 const groups=k.expected_sources.flatMap(e=>e.groups.map(g=>({filename:e.filename,alternatives:g})));
 const matched=groups.map(g=>sources.some((s,j)=>paragraph[j]&&s.filename===g.filename&&g.alternatives.some(a=>norm(s.quote).includes(norm(a)))));
 const refusal=!r.answered&&sources.length===0&&/can't find|cannot find|not (?:in|provided|specified)|clarif|which restoration/i.test(r.answer);
 const outcome=k.unsupported?(refusal?'PASS':'FAIL'):provenance.some(x=>!x)||!matched.some(Boolean)?'FAIL':matched.every(Boolean)&&relevant.every(Boolean)?'PASS':'PARTIAL';
 return {id:k.id,question:k.question,workflow:k.workflow,category:k.category,outcome,answer:r.answer,sources,provenance,paragraph_precision:paragraph,citation_relevance:relevant,matched_groups:matched,required_groups:groups,refusal,false_acceptance:k.unsupported&&!refusal,false_refusal:!k.unsupported&&refusal};
}
