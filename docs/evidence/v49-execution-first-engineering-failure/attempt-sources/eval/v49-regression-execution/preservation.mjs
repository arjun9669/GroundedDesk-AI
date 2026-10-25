import assert from 'node:assert/strict';
// Additional prospective preservation; original native family gates are untouched.
export function priorPassPreservation(current,prior){
 const losses=[];let protectedRows=0;
 for(const variant of ['fixed','section']){
  assert.ok(Array.isArray(prior[variant])&&Array.isArray(current[variant]));
  const rows=new Map(current[variant].map(r=>[r.id,r]));assert.equal(rows.size,current[variant].length,'Unique native result IDs required');
  for(const old of prior[variant])if(old.outcome==='PASS'){
   protectedRows++;const row=rows.get(old.id);
   if(!row||row.outcome!=='PASS'||row.false_acceptance||row.false_refusal||row.citation_integrity===false)losses.push({variant,id:old.id,previous:'PASS',current:row?.outcome??'MISSING'});
  }
 }
 return {passed:losses.length===0,protected_rows:protectedRows,losses};
}
