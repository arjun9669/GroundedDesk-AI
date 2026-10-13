// Experimental only. Production imports neither this module nor this index.
import { buildIndex } from "../../retrieval.mjs";
export function buildSectionIndex(documents) {
  const chunks=[];
  for(const doc of documents){
    const sourceText=String(doc.text).replace(/\r\n?/g,"\n").replace(/[ \t]+/g," ").trim();
    const headings=[...sourceText.matchAll(/^##[ \t]+.+$/gm)].map(m=>m.index);
    if (!headings.length) { chunks.push(...buildIndex([doc]).chunks); continue; }
    const starts=[...new Set([0,...headings])];
    for(let i=0;i<starts.length;i++){
      const section=sourceText.slice(starts[i],starts[i+1]??sourceText.length).trim();
      const base=sourceText.indexOf(section,starts[i]);
      for(const chunk of buildIndex([{...doc,text:section}]).chunks){
        const offset=base+section.indexOf(chunk.content,chunk.start);
        chunks.push({...chunk,id:`${doc.id}:${offset}`,start:offset,sourceText});
      }
    }
  }
  const df=new Map();
  for(const chunk of chunks)for(const term of chunk.tf.keys())df.set(term,(df.get(term)||0)+1);
  return {chunks,df,avgLength:chunks.length?chunks.reduce((sum,c)=>sum+c.tokens.length,0)/chunks.length:1};
}
