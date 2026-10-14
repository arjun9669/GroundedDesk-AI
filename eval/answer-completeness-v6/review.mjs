import fs from 'node:fs/promises';
import path from 'node:path';
const base=path.resolve('../../outputs');
const config=JSON.parse(await fs.readFile(path.join(base,'coverage-v6-inputs/run-config.json')));
const norm=s=>String(s??'').replace(/\s+/g,' ').trim();
const literal=r=>JSON.stringify(r.sources.map(s=>({filename:s.filename,quote:norm(s.quote)})).sort((a,b)=>a.filename.localeCompare(b.filename)));
const rows=[];
for(const pack of config.packs.slice(0,5)){
  const prior=JSON.parse(await fs.readFile(path.join(base,'coverage-v2-final',pack.name+'-scorecard.json')));
  const capture=JSON.parse(await fs.readFile(path.join(base,'coverage-v6-validation-first-run',pack.name,'capture.json')));
  for(const [i,row] of capture.cases.entries())for(const variant of ['baseline','fixed','section']){
    const old=prior[variant][i];
    if(literal(row[variant])===literal(old))continue;
    const key=pack.cases[i];
    rows.push({key:pack.name+'/'+row.id+'/'+variant,question:row.question,required_facts:key.required_facts??key.required_facts_by_document,expected_files:key.expected_documents??key.expected_files??key.source_files,scoring_notes:key.scoring_notes,prior_outcome:old.outcome,prior_answer:old.answer,answer:row[variant].answer,sources:row[variant].sources.map(s=>({filename:s.filename,quote:s.quote}))});
  }
}
await fs.writeFile(path.join(base,'coverage-v6-inputs/manual-review-queue.json'),JSON.stringify(rows,null,2),{flag:'wx'});
console.log(JSON.stringify(rows,null,2));
