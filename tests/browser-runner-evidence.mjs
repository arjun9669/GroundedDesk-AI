// Synthetic engineering fixture for capture reliability; not a benchmark or accuracy claim.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'playwright';
import {revealControl} from './fixtures/workspace-ui.mjs';
import {openEvidenceLedger,prepareQuestion,waitForAnswer,readUIEvidence,preserveFailure} from './fixtures/runner-evidence.mjs';
const real=process.env.REAL_MINILM==='1';
const out=path.resolve(process.env.EVIDENCE_DIR||'../../outputs/runner-evidence-ci');
const ledger=await openEvidenceLedger(out);
const fixture='The Duty Operator inspects harbor cranes at sunrise.';
let browser,page,receipt;
const result={classification:'Capture-reliability engineering fixture; no independent answer-accuracy claim',real_minilm:real,checks:[]};
try{
 browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});
 page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto(process.env.TEST_URL||'http://127.0.0.1:8765/');
 await page.waitForFunction(()=>document.querySelector('#doc-count').textContent==='3');
 await page.locator('#clear-docs').click();
 await page.locator('#file-input').setInputFiles({name:'capture-engineering.txt',mimeType:'text/plain',buffer:Buffer.from(fixture)});
 await page.waitForFunction(()=>document.querySelector('#doc-count').textContent==='1'&&!document.querySelector('#file-input').disabled);
 if(real){
  await revealControl(page,'#enable-semantic');await page.locator('#enable-semantic').click();
  await page.waitForFunction(()=>!document.querySelector('#retrieval-mode option[value="hybrid"]').disabled,null,{timeout:240000});
  await page.locator('#retrieval-mode').selectOption('hybrid');
 }
 const mode=real?'hybrid':'keyword';
 for(const [id,q] of [['whitespace',' \r\nWho inspects harbor cranes? \t'],['identical-repeat',' \r\nWho inspects harbor cranes? \t']]){
  await revealControl(page,'#query-input');receipt=await prepareQuestion(page,q);
  await ledger.writeJSON(id+'-input.json',receipt);await ledger.event('submission_started',{id,question:q});
  await page.locator('#ask-button').click();await waitForAnswer(page,receipt);
  const ui=await readUIEvidence(page,receipt);assert.equal(ui.rendered_question,'Who inspects harbor cranes?');
  assert.equal(ui.original_question,q);assert.equal(ui.retrieval_mode,mode);assert.equal(ui.answer_mode,'extractive');
  assert.equal(ui.fresh_result,true);assert.equal(ui.matches_expected,true);
  assert.ok(ui.sources.some(s=>s.quote.includes('Duty Operator')));assert.ok(ui.sources.every(s=>fixture.includes(s.quote)));
  await ledger.writeJSON(id+'-ui.json',ui);await ledger.checkpoint({status:'RUNNING',completed_case:id});
  result.checks.push({id,outcome:'PASS',original_question_preserved:true,new_result_node:true});
 }
 // Reproduce the old readiness failure after a newly rendered answer, without losing its output.
 receipt=await prepareQuestion(page,'Who inspects harbor cranes? ');
 await page.locator('#ask-button').click();await waitForAnswer(page,receipt);
 let failure;
 try{await waitForAnswer(page,{...receipt,expected_display:receipt.original_question},{timeout:150});}catch(e){failure=e;}
 assert.ok(failure);
 const saved=await preserveFailure(page,out,{prefix:'expected-readiness-failure',error:failure,receipt,context:{kind:'Deliberately reproduced old trailing-space check'}});
 const dom=JSON.parse(await fs.readFile(path.join(out,'expected-readiness-failure-dom.json')));
 assert.equal(dom.fresh_result,true);assert.equal(dom.matches_expected,true);assert.ok(dom.answer.includes('Duty Operator'));
 assert.deepEqual(saved.collection_errors,[]);assert.ok((await fs.stat(path.join(out,'expected-readiness-failure.png'))).size>1000);
 await ledger.checkpoint({status:'EXPECTED_FAILURE_PRESERVED',artifact:'expected-readiness-failure-dom.json'});
 result.checks.push({id:'failure-output-preserved',outcome:'PASS',original_answer_saved:true,screenshot_saved:true});
 // Same visible question/idle button alone cannot make an old result ready for an unsubmitted query.
 receipt=await prepareQuestion(page,'Who inspects harbor cranes? ');
 await assert.rejects(waitForAnswer(page,receipt,{timeout:150}),/Timeout/);
 await preserveFailure(page,out,{prefix:'stale-result-rejected',error:new Error('Expected stale-result rejection'),receipt});
 const stale=JSON.parse(await fs.readFile(path.join(out,'stale-result-rejected-dom.json')));
 assert.equal(stale.matches_expected,true);assert.equal(stale.fresh_result,false);
 result.checks.push({id:'stale-result-rejected',outcome:'PASS'});
 result.browser=browser.version();result.build=await page.locator('#retrieval-build').innerText();result.mode=mode;
 result.status='PASS';await ledger.writeJSON('result.json',result);console.log(JSON.stringify(result,null,2));
}catch(error){
 await preserveFailure(page,out,{error,receipt,context:{classification:result.classification,completed_checks:result.checks}});
 console.error(error);process.exitCode=1;
}finally{await browser?.close();}
