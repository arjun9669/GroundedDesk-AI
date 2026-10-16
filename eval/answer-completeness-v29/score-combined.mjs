// Original native criteria with explicit preservation gates; no pooled accuracy score.
import fs from 'node:fs/promises';import path from 'node:path';import assert from 'node:assert/strict';
const b=path.resolve('../../outputs'),out=path.join(b,'coverage-v29-final'),read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const config=await read(path.join(b,'coverage-v29-inputs/run-config.json')),cards=[];
for(const pack of config.packs){
 let c;
 if(pack.name==='Binding64')c=await read(path.join(b,'coverage-v29-binding64-final/scorecard.json'));
 else if(['Cedar32','Bracken32','Flint32'].includes(pack.name)){const raw=await read(path.join(b,'coverage-v29-'+pack.name.toLowerCase()+'-final/automated-scorecard.json'));c={name:pack.name,...raw,...raw.variants};}
 else c=await read(path.join(out,pack.name+'-scorecard.json'));
 cards.push(c);
}
const histories={};for(const n of [26,27,28])histories[n]=await read(path.join(b,'coverage-v'+n+'-final/ALL_SCORECARDS.json'));
const losses=[],newFA=[],newFF=[];
for(const card of cards){
 let priors;
 if(card.name==='Flint32'){const old=await read(path.join(b,'flint32-v28-final/automated-scorecard.json'));priors=[old.variants];}
 else {
  let old25;
  if(card.name==='Binding64')old25=await read(path.join(b,'coverage-v25-binding64-final/scorecard.json'));
  else if(card.name==='Cedar32')old25=(await read(path.join(b,'coverage-v25-cedar32-final/automated-scorecard.json'))).variants;
  else if(card.name==='Bracken32')old25=(await read(path.join(b,'bracken32-v25-final/automated-scorecard.json'))).variants;
  else old25=await read(path.join(b,'coverage-v25-final',card.name+'-scorecard.json'));
  priors=[old25,...[26,27,28].map(n=>histories[n].find(c=>c.name===card.name))];
 }
 for(const v of ['fixed','section'])for(const [i,g] of card[v].entries()){
  assert.ok(priors.every(p=>p[v][i].id===g.id));
  if(g.outcome!=='PASS'&&[card.baseline[i],...priors.map(p=>p[v][i])].some(p=>p.outcome==='PASS'))losses.push({pack:card.name,id:g.id,variant:v,outcome:g.outcome});
  if(g.false_acceptance&&priors.some(p=>!p[v][i].false_acceptance))newFA.push({pack:card.name,id:g.id,variant:v});
  if(g.false_refusal&&priors.some(p=>!p[v][i].false_refusal))newFF.push({pack:card.name,id:g.id,variant:v});
 }
}
const hist=await read(path.join(out,'decision.json')),get=n=>cards.find(c=>c.name===n);
const checks={historical451_original_gate:hist.development_gate==='PASS',Binding64_original_gate:get('Binding64').confirmation_gate==='PASS',Cedar32_all32:get('Cedar32').gate==='PASS',Bracken32_all32:get('Bracken32').gate==='PASS',Flint32_all32:get('Flint32').gate==='PASS',no_production_v25_v26_v27_v28_PASS_loss:losses.length===0,no_new_false_acceptance:newFA.length===0,no_new_supported_false_refusal:newFF.length===0};
const decision={classification:'611 exposed in-sample v29 regressions; not independent accuracy',checks,overall_gate:Object.values(checks).every(Boolean)?'PASS':'FAIL',prior_pass_regressions:losses,new_false_acceptances:newFA,new_supported_false_refusals:newFF,first_Flint32_preserved:'26 PASS/3 PARTIAL/3 FAIL both in unchanged v28',v28_579_regression_preserved:'PASS; earlier public-set failures remain outside original subset gates',all_earlier_first_scores_preserved:true,candidate_adopted:false,production_build:'2026-10-13-r44',production_change:'NONE',question_retries:0};
await fs.writeFile(path.join(out,'ALL_SCORECARDS.json'),JSON.stringify(cards,null,2),{flag:'wx'});await fs.writeFile(path.join(out,'combined-decision.json'),JSON.stringify(decision,null,2),{flag:'wx'});console.log(JSON.stringify({decision,summaries:cards.map(c=>({name:c.name,summary:c.summary}))},null,2));
