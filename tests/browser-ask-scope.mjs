import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { revealControl } from "./fixtures/workspace-ui.mjs";
const dir=process.env.EVIDENCE_DIR;
if(dir)await fs.mkdir(dir,{recursive:true});
const observed={kind:"Ask file selection feature regression, not independent accuracy",cases:[],model:"not exercised"};
let browser, page;
try {
  browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});observed.browser=browser.version();
  const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
  page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.TEST_URL||'http://127.0.0.1:8765/');await page.waitForFunction(()=>document.querySelector('#doc-count')?.textContent==='3');
  assert.match(await page.locator('#retrieval-build').innerText(),/2026-10-13-r41/);
  await page.locator('#clear-docs').click();
  await page.locator('#file-input').setInputFiles([
    {name:'harbor.txt',mimeType:'text/plain',buffer:Buffer.from('Harbor crane operators must inspect lifting hooks every eight shifts.')},
    {name:'river.txt',mimeType:'text/plain',buffer:Buffer.from('River crane operators must inspect lifting hooks every eleven shifts.')},
    {name:'fictional-pin.txt',mimeType:'text/plain',buffer:Buffer.from('The fictional workshop door PIN code is 0482.')}
  ]);await page.waitForFunction(()=>document.querySelector('#doc-count')?.textContent==='3');
  const select=async names=>{
    if(!await page.locator('#ask-file-scope').getAttribute('open'))await page.locator('#ask-scope-summary').click();
    const height=await page.locator('#ask-scope-options input').first().evaluate(el=>el.getBoundingClientRect().height);
    assert.equal(height,16,'Checkboxes must not inherit the 44px text-field minimum height');
    await page.locator('#ask-scope-options').getByLabel('All files',{exact:true}).uncheck();
    for(const name of names)await page.locator('#ask-scope-options').getByLabel(name,{exact:true}).check();
    // Clear any prior explicit selection that is not in this request.
    for(const name of ['harbor.txt','river.txt','fictional-pin.txt'])if(!names.includes(name)) {
      const control=page.locator('#ask-scope-options').getByLabel(name,{exact:true});
      if(await control.count())await control.uncheck();
    }
    await page.locator('#ask-scope-summary').click();
  };
  const ask=async(q,id,mode)=>{
    await page.locator('#query-input').fill(q);await page.locator('#ask-button').click();await page.waitForFunction(()=>!document.querySelector('#ask-button').disabled);
    const record={id,mode,question:q,displayed:await page.locator('#answer-result').innerText(),sources:await page.locator('.source-top strong').allTextContents()};
    await page.getByRole('button',{name:'Copy answer and evidence report'}).click();record.report=await page.evaluate(()=>navigator.clipboard.readText());observed.cases.push(record);return record;
  };
  for(const mode of process.env.TEST_MINILM==='1'?['keyword','hybrid']:['keyword']) {
    if(mode==='hybrid') {await revealControl(page,'#enable-semantic');await page.locator('#enable-semantic').click();await page.waitForFunction(()=>!document.querySelector('#retrieval-mode option[value="hybrid"]').disabled,null,{timeout:240000});await page.locator('#retrieval-mode').selectOption('hybrid');observed.model='Actual Xenova/all-MiniLM-L6-v2, local WASM; Qwen off';}
    assert.equal(await page.locator('#answer-mode').inputValue(),'extractive');
    await select(['river.txt']);let r=await ask('How often must crane operators inspect lifting hooks?','river-only',mode);assert.deepEqual(r.sources,['river.txt']);assert.match(r.displayed,/eleven shifts/);assert.doesNotMatch(r.displayed,/eight shifts/);
    if(mode==='hybrid')assert.match(r.report,/Local MiniLM/);
    await select(['harbor.txt']);r=await ask('How often must crane operators inspect lifting hooks?','harbor-only',mode);assert.deepEqual(r.sources,['harbor.txt']);assert.match(r.displayed,/eight shifts/);assert.doesNotMatch(r.displayed,/eleven shifts/);
    r=await ask('What is the exact PIN code for the fictional workshop door?','excluded-fact-refusal',mode);assert.deepEqual(r.sources,[]);assert.match(r.displayed,/can't find/);assert.doesNotMatch(r.report,/0482|fictional\\-pin/);
    await select(['fictional-pin.txt']);r=await ask('What is the exact PIN code for the fictional workshop door?','included-fact',mode);assert.deepEqual(r.sources,['fictional-pin.txt']);assert.match(r.displayed,/0482/);
    await select(['harbor.txt','river.txt']);r=await ask('How often must crane operators inspect lifting hooks?','two-selected',mode);assert.ok(r.sources.length>0);assert.ok(r.sources.every(name=>['harbor.txt','river.txt'].includes(name)));assert.doesNotMatch(r.report,/0482|fictional\\-pin/);
    // Changing selection keeps the model usable and historical scope intact.
    await select(['river.txt']);assert.equal(await page.locator('#answer-result').isVisible(),false);
    await page.locator('#chat-history > summary').click();await page.locator('.history-entry').filter({hasText:'exact PIN code'}).filter({hasText:'Sources: fictional-pin.txt'}).first().click();
    assert.match(await page.locator('.answer-scope').innerText(),/fictional-pin.txt/);assert.match(await page.locator('.answer-box').innerText(),/0482/);await page.locator('#chat-history > summary').click();
    await select([]);await page.locator('#query-input').fill('How often are hooks inspected?');await page.locator('#ask-button').click();assert.match(await page.locator('#alert').innerText(),/Choose at least one/);assert.equal(await page.locator('#answer-result').isVisible(),false);
    await page.locator('#ask-scope-options').getByLabel('All files',{exact:true}).check();await page.locator('#ask-scope-summary').click();
    r=await ask('What is the exact PIN code for the fictional workshop door?','all-files-restored',mode);assert.match(r.displayed,/0482/);assert.match(r.displayed,/Searched all files/);
    if(mode==='hybrid') {
      await page.locator('#ask-scope-summary').click();
      await page.locator('#query-input').fill('How often must crane operators inspect lifting hooks?');
      // Trigger a scope change before the real async query embedding resolves.
      await page.evaluate(()=>{document.querySelector('#ask-button').click();document.querySelector('#ask-scope-options input[data-scope-id="all"]').click();});
      await page.waitForFunction(()=>!document.querySelector('#ask-button').disabled);
      assert.equal(await page.locator('#answer-result').isVisible(),false);
      assert.match(await page.locator('#alert').innerText(),/selection changed/);
      observed.cases.push({id:'changed-during-real-inference',mode,outcome:'PASS',observation:'Pending actual MiniLM result discarded when selection changed; no stale answer displayed'});
      await page.locator('#ask-scope-options').getByLabel('All files',{exact:true}).check();await page.locator('#ask-scope-summary').click();
    }
  }
  await select(['harbor.txt']);await page.locator('#file-input').setInputFiles({name:'added.txt',mimeType:'text/plain',buffer:Buffer.from('Added file describes garden watering weekly.')});await page.waitForFunction(()=>document.querySelector('#doc-count')?.textContent==='4');
  assert.match(await page.locator('#ask-scope-summary').innerText(),/1 selected/);
  await page.getByRole('button',{name:'Remove harbor.txt',exact:true}).click();assert.match(await page.locator('#ask-scope-summary').innerText(),/Choose at least one/);
  await select(['river.txt']);
  const picker=page.waitForEvent('filechooser');await page.getByRole('button',{name:'Replace river.txt',exact:true}).click();
  await (await picker).setFiles({name:'river.txt',mimeType:'text/plain',buffer:Buffer.from('River crane operators must inspect lifting hooks every twelve shifts.')});
  await page.waitForFunction(()=>document.querySelector('#ask-scope-summary').textContent.includes('Choose at least one'));
  assert.equal(await page.locator('#answer-result').isVisible(),false);
  await page.setViewportSize({width:390,height:844});await page.locator('#ask-scope-summary').click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  if(dir)await page.screenshot({path:path.join(dir,'mobile-file-selection.png'),fullPage:true});
  assert.deepEqual(errors,[]);observed.status='PASS';console.log(JSON.stringify(observed,null,2));
}catch(error){observed.status='FAIL';observed.error=error.stack;if(page){observed.failureUI=await page.evaluate(()=>({scope:document.querySelector('#ask-scope-summary')?.textContent,library:document.querySelector('#document-list')?.innerText,alert:document.querySelector('#alert')?.textContent,uploads:document.querySelector('#upload-list')?.innerText}));if(dir)await page.screenshot({path:path.join(dir,'failure.png'),fullPage:true});}throw error;}
finally{if(dir)await fs.writeFile(path.join(dir,'scope-observations.json'),JSON.stringify(observed,null,2));await browser?.close();}
