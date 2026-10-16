// Original per-pack grades plus frozen preservation gates. No new answer criteria.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const b=path.resolve('../../outputs'),out=path.join(b,'coverage-v28-final');
const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const config=await read(path.join(b,'coverage-v28-inputs/run-config.json'));
const old26=await read(path.join(b,'coverage-v26-final/ALL_SCORECARDS.json'));
const old27=await read(path.join(b,'coverage-v27-final/ALL_SCORECARDS.json'));
const cards=[];
for(const pack of config.packs){
 let c;
 if(pack.name==='Binding64')c=await read(path.join(b,'coverage-v28-binding64-final/scorecard.json'));
 else if(['Cedar32','Bracken32'].includes(pack.name)){
  const raw=await read(path.join(b,'coverage-v28-'+pack.name.toLowerCase()+'-final/automated-scorecard.json'));
  c={name:pack.name,...raw,...raw.variants};
 }else c=await read(path.join(out,pack.name+'-scorecard.json'));
 cards.push(c);
}
const losses=[],newFA=[],newFF=[];
for(const card of cards){
 let old25;
 if(card.name==='Binding64')old25=await read(path.join(b,'coverage-v25-binding64-final/scorecard.json'));
 else if(card.name==='Cedar32')old25=(await read(path.join(b,'coverage-v25-cedar32-final/automated-scorecard.json'))).variants;
 else if(card.name==='Bracken32')old25=(await read(path.join(b,'bracken32-v25-final/automated-scorecard.json'))).variants;
 else old25=await read(path.join(b,'coverage-v25-final',card.name+'-scorecard.json'));
 const previous26=old26.find(c=>c.name===card.name),previous27=old27.find(c=>c.name===card.name);assert.ok(previous26&&previous27);
 for(const v of ['fixed','section'])for(const [i,g] of card[v].entries()){
  const priors=[old25[v][i],previous26[v][i],previous27[v][i],card.baseline[i]];
  assert.ok(priors.every(p=>p.id===g.id));
  if(g.outcome!=='PASS'&&priors.some(p=>p.outcome==='PASS'))losses.push({pack:card.name,id:g.id,variant:v,outcome:g.outcome});
  if(g.false_acceptance&&[old25[v][i],previous26[v][i],previous27[v][i]].some(p=>!p.false_acceptance))newFA.push({pack:card.name,id:g.id,variant:v});
  if(g.false_refusal&&[old25[v][i],previous26[v][i],previous27[v][i]].some(p=>!p.false_refusal))newFF.push({pack:card.name,id:g.id,variant:v});
 }
}
const hist=await read(path.join(out,'decision.json')),binding=cards.find(c=>c.name==='Binding64'),cedar=cards.find(c=>c.name==='Cedar32'),bracken=cards.find(c=>c.name==='Bracken32');
const checks={historical451_original_gate:hist.development_gate==='PASS',Binding64_original_gate:binding.confirmation_gate==='PASS',Cedar32_all32:cedar.gate==='PASS',Bracken32_all32:bracken.gate==='PASS',no_production_v25_v26_v27_PASS_loss:losses.length===0,no_new_false_acceptance:newFA.length===0,no_new_supported_false_refusal:newFF.length===0};
const decision={classification:'579 exposed in-sample v28 regressions; not independent accuracy',checks,overall_gate:Object.values(checks).every(Boolean)?'PASS':'FAIL',prior_pass_regressions:losses,new_false_acceptances:newFA,new_supported_false_refusals:newFF,first_Bracken32_preserved:'21 PASS /1 PARTIAL /10 FAIL both',v26_Bracken32_preserved:'31/0/1 both; failed gate and ten prior PASS regressions',first_Cedar32_preserved:'24/2/6 both',v25_Cedar32_preserved:'32/0/0 both',v26_Cedar32_preserved:'31/0/1 both',v27_first_preserved:'Bracken32 32/0/0, Cedar32 30/0/2 both; combined FAIL',candidate_adopted:false,production_build:'2026-10-13-r44',production_change:'NONE',question_retries:0};
await fs.writeFile(path.join(out,'ALL_SCORECARDS.json'),JSON.stringify(cards,null,2),{flag:'wx'});
await fs.writeFile(path.join(out,'combined-decision.json'),JSON.stringify(decision,null,2),{flag:'wx'});
console.log(JSON.stringify({decision,summaries:cards.map(c=>({name:c.name,summary:c.summary}))},null,2));
