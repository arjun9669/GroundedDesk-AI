import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { pdfFixture } from "./fixtures/pdf-fixture.mjs";
import { revealControl } from "./fixtures/workspace-ui.mjs";
const dir=process.env.EVIDENCE_DIR;
if(dir)await fs.mkdir(dir,{recursive:true});
const observed={kind:"Local snapshot feature regression; fictional fixtures, not accuracy benchmark",checks:[],model:"not exercised"};
let browser;
const url=process.env.TEST_URL||"http://127.0.0.1:8765/";
try {
  browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});
  observed.browser=browser.version();
  const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
  await context.route('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/**',async route=>{
    await route.fulfill({path:path.resolve('node_modules/pdfjs-dist/build',new URL(route.request().url()).pathname.split('/').pop()),contentType:'text/javascript',headers:{'access-control-allow-origin':'*'}});
  });
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  async function start(){await page.goto(url);await page.waitForFunction(()=>document.querySelector('#doc-count')?.textContent==='3'&&!document.querySelector('#save-workspace').disabled);await revealControl(page,'#save-workspace');}
  async function action(id,pattern){await revealControl(page,'#'+id);await page.locator('#'+id).click();await page.waitForFunction(p=>new RegExp(p).test(document.querySelector('#workspace-save-status').textContent),pattern);}
  async function readRecord(){return page.evaluate(async()=>{const db=await new Promise((resolve,reject)=>{const r=indexedDB.open('groundeddesk-workspace-v1',1);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});try{return await new Promise((resolve,reject)=>{const r=db.transaction('snapshots').objectStore('snapshots').get('current');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}finally{db.close();}});}
  async function ask(){await page.locator('#query-input').fill('How often must Harbor crane operators inspect lifting hooks?');await page.locator('#ask-button').click();await page.waitForFunction(()=>!document.querySelector('#ask-button').disabled&&!document.querySelector('#answer-result').hidden);}
  await start();assert.equal(await page.locator('#local-workspace > summary').evaluate(el=>getComputedStyle(el).color),'rgb(238, 242, 229)');observed.build=await page.locator('#retrieval-build').innerText();assert.match(observed.build,/2026-10-13-r44/);
  await page.waitForFunction(()=>document.querySelector('#saved-workspace-summary').textContent.includes('No saved workspace'));
  assert.equal(await readRecord(),undefined,'No snapshot without explicit Save');
  await page.locator('#clear-docs').click();
  const quote='Harbor crane operators must inspect lifting hooks every eight shifts.';
  const pdf=pdfFixture(['Harbor workshop visitor hours end at sunset.',quote]);
  await page.locator('#file-input').setInputFiles([{name:'harbor.pdf',mimeType:'application/pdf',buffer:pdf},{name:'notes.md',mimeType:'text/markdown',buffer:Buffer.from('# Notes\nDock lighting inspections occur every nine days.')},{name:'other.txt',mimeType:'text/plain',buffer:Buffer.from('River crane operators inspect lifting hooks every eleven shifts.')}]);
  await page.waitForFunction(()=>document.querySelector('#doc-count').textContent==='3'&&!document.querySelector('#file-input').disabled);
  await page.locator('#ask-scope-summary').click();
  await page.getByRole('checkbox',{name:'other.txt',exact:true}).uncheck();
  if(process.env.TEST_MINILM==='1'){
    await revealControl(page,'#enable-semantic');await page.locator('#enable-semantic').click();
    await page.waitForFunction(()=>!document.querySelector('#retrieval-mode option[value="hybrid"]').disabled,null,{timeout:240000});
    await page.locator('#retrieval-mode').selectOption('hybrid');observed.model='Actual Xenova/all-MiniLM-L6-v2 local WASM before save and after restore; Qwen off';
  }
  await ask();assert.match(await page.locator('.answer-box').innerText(),/every eight shifts/);
  assert.match(await page.locator('.source-location').first().innerText(),/PDF page 2/);
  await page.getByRole('button',{name:'Copy answer and evidence report'}).click();observed.beforeReport=await page.evaluate(()=>navigator.clipboard.readText());
  await action('save-workspace','snapshot saved');
  assert.deepEqual(await page.locator('#saved-workspace-files li').allTextContents(),['harbor.pdf','notes.md','other.txt']);
  const record=await readRecord();assert.deepEqual(Object.keys(record).sort(),['files','savedAt','selectedIds','version']);assert.equal(record.selectedIds.length,2);
  const storedPDF=await page.evaluate(async()=>{const db=await new Promise(r=>{const q=indexedDB.open('groundeddesk-workspace-v1',1);q.onsuccess=()=>r(q.result);});const saved=await new Promise(r=>{const q=db.transaction('snapshots').objectStore('snapshots').get('current');q.onsuccess=()=>r(q.result);});db.close();return Array.from(new Uint8Array(await saved.files[0].originalFile.arrayBuffer()));});
  assert.deepEqual(Buffer.from(storedPDF),pdf);
  await page.locator('#query-input').fill('Unfinished private draft never saved');
  if(dir)await page.screenshot({path:path.join(dir,'01-saved-desktop.png'),fullPage:true});
  await start();assert.equal(await page.locator('#history-count').innerText(),'0');assert.equal(await page.locator('#query-input').inputValue(),'');
  assert.equal(await page.locator('.document-card strong').first().innerText(),'AI Governance Playbook','Saved files do not auto-restore');
  await page.locator('#restore-workspace').waitFor({state:'visible'});await page.waitForFunction(()=>!document.querySelector('#restore-workspace').disabled);
  await action('restore-workspace','Workspace restored');
  assert.deepEqual(await page.locator('.document-card strong').allTextContents(),['harbor.pdf','notes.md','other.txt']);
  await page.locator('#ask-scope-summary').click();
  assert.equal(await page.getByRole('checkbox',{name:'other.txt',exact:true}).isChecked(),false);
  assert.equal(await page.getByRole('checkbox',{name:'harbor.pdf',exact:true}).isChecked(),true);
  assert.equal(await page.locator('#retrieval-mode').inputValue(),'keyword');assert.equal(await page.locator('#answer-mode').inputValue(),'extractive');
  assert.equal(await page.locator('#retrieval-mode option[value="hybrid"]').isDisabled(),true);
  assert.equal(await page.locator('#history-count').innerText(),'0');assert.equal(await page.locator('#answer-result').isVisible(),false);
  await ask();assert.equal(await page.locator('.answer-box').innerText(),`[1] ${quote}`);assert.match(await page.locator('.source-location').innerText(),/PDF page 2/);
  await page.getByRole('button',{name:'Copy answer and evidence report'}).click();observed.afterReport=await page.evaluate(()=>navigator.clipboard.readText());
  await page.locator('.open-pdf-page').click();
  await page.locator('.pdf-preview canvas').waitFor({state:'visible'});
  await page.getByRole('button',{name:'Close PDF',exact:true}).click();
  observed.checks.push('Explicit snapshot only; exact original PDF bytes and Markdown/TXT text; saved filenames/selection visible; reload does not auto-restore; restored quotation and physical PDF page/preview valid; no conversation/draft/output/model activation restored');
  if(process.env.TEST_MINILM==='1'){
    await revealControl(page,'#enable-semantic');await page.locator('#enable-semantic').click();
    await page.waitForFunction(()=>!document.querySelector('#retrieval-mode option[value="hybrid"]').disabled,null,{timeout:240000});await page.locator('#retrieval-mode').selectOption('hybrid');
    await ask();assert.equal(await page.locator('.answer-box').innerText(),`[1] ${quote}`);
    await page.getByRole('button',{name:'Copy answer and evidence report'}).click();observed.hybridRestoredReport=await page.evaluate(()=>navigator.clipboard.readText());assert.match(observed.hybridRestoredReport,/Local MiniLM/);assert.equal(observed.hybridRestoredReport,observed.beforeReport,'Real Hybrid report remains exact after restoring and re-embedding');
  }
  const answerBeforeBadPDF=await page.locator('.answer-box').innerText();
  await page.evaluate(async()=>{const db=await new Promise(r=>{const q=indexedDB.open('groundeddesk-workspace-v1',1);q.onsuccess=()=>r(q.result);});const saved=await new Promise(r=>{const q=db.transaction('snapshots').objectStore('snapshots').get('current');q.onsuccess=()=>r(q.result);});saved.files[0].originalFile=new Blob(['%PDF-invalid'],{type:'application/pdf'});await new Promise((r,j)=>{const tx=db.transaction('snapshots','readwrite');tx.objectStore('snapshots').put(saved,'current');tx.oncomplete=r;tx.onabort=j;});db.close();});
  await action('restore-workspace','damaged|valid PDF');
  assert.equal(await page.locator('.answer-box').innerText(),answerBeforeBadPDF);
  assert.deepEqual(await page.locator('.document-card strong').allTextContents(),['harbor.pdf','notes.md','other.txt']);
  await action('save-workspace','snapshot saved');
  const committedAt=(await readRecord()).savedAt;
  observed.checks.push('Malformed original PDF simulation is rejected during re-extraction; restore is atomic and current files/answer remain intact; explicit save can replace a damaged snapshot');
  // An aborted real IndexedDB transaction preserves the previous committed snapshot.
  await page.evaluate(()=>{const original=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(...args){const request=original.apply(this,args);if(this.name==='snapshots')this.transaction.abort();return request;};});
  await page.locator('#ask-scope-summary').click(); // Close if open; selection remains unchanged.
  await action('save-workspace','Could not update');assert.equal((await readRecord()).savedAt,committedAt);
  assert.equal(await page.locator('#doc-count').innerText(),'3');
  observed.checks.push('Explicit abort simulation: failed real write transaction leaves prior saved snapshot and live files intact');
  // Reload removes the test-only abort override; unsaved removal must not alter the snapshot.
  await page.getByRole('button',{name:'Remove other.txt',exact:true}).click();assert.equal(await page.locator('#doc-count').innerText(),'2');
  await start();await page.waitForFunction(()=>!document.querySelector('#restore-workspace').disabled);await action('restore-workspace','Workspace restored');
  assert.equal(await page.locator('#doc-count').innerText(),'3');
  await page.locator('#ask-scope-summary').click();await page.getByRole('checkbox',{name:'harbor.pdf',exact:true}).uncheck();await page.getByRole('checkbox',{name:'notes.md',exact:true}).uncheck();
  await action('save-workspace','snapshot saved');assert.deepEqual((await readRecord()).selectedIds,[]);
  await page.locator('#clear-docs').click();await action('restore-workspace','Workspace restored');
  assert.equal(await page.locator('#ask-scope-summary').innerText(),'Search in: Choose at least one file');
  await askEmpty();
  async function askEmpty(){await page.locator('#query-input').fill('How often must Harbor crane operators inspect lifting hooks?');await page.locator('#ask-button').click();assert.equal(await page.locator('#history-count').innerText(),'0');assert.match(await page.locator('#alert').innerText(),/Choose at least one/);}
  await page.setViewportSize({width:390,height:844});
  await action('clear-saved-workspace','Saved workspace cleared');assert.equal(await readRecord(),undefined);assert.equal(await page.locator('#doc-count').innerText(),'3');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  if(dir)await page.screenshot({path:path.join(dir,'02-mobile-cleared-snapshot.png'),fullPage:true});
  observed.checks.push('Unsaved removal does not overwrite snapshot; explicit empty Ask selection survives save/restore without full-library fallback; clear removes saved record and preserves open files; 390px layout has no overflow');
  // Invalid stored data is rejected before applying any files.
  await page.evaluate(async()=>{const db=await new Promise(r=>{const q=indexedDB.open('groundeddesk-workspace-v1',1);q.onsuccess=()=>r(q.result);});await new Promise((r,j)=>{const tx=db.transaction('snapshots','readwrite');tx.objectStore('snapshots').put({version:999},'current');tx.oncomplete=r;tx.onabort=j;});db.close();});
  await start();await page.waitForFunction(()=>document.querySelector('#workspace-save-status').textContent.includes('invalid'));
  assert.equal(await page.locator('#restore-workspace').isDisabled(),true);assert.equal(await page.locator('#doc-count').innerText(),'3');
  await action('clear-saved-workspace','Saved workspace cleared');
  const blocked=await browser.newContext();await blocked.addInitScript(()=>Object.defineProperty(window,'indexedDB',{get(){throw new DOMException('Storage access blocked','SecurityError');}}));
  const blockedPage=await blocked.newPage();await blockedPage.goto(url);await blockedPage.waitForFunction(()=>document.querySelector('#doc-count').textContent==='3');
  await revealControl(blockedPage,'#save-workspace');await blockedPage.locator('#save-workspace').click();
  await blockedPage.waitForFunction(()=>document.querySelector('#workspace-save-status').classList.contains('is-error'));
  await blockedPage.locator('#query-input').fill('Where should document metadata be stored?');await blockedPage.locator('#ask-button').click();await blockedPage.waitForFunction(()=>!document.querySelector('#answer-result').hidden);
  assert.equal(await blockedPage.locator('.source-card').count()>0,true);await blocked.close();
  observed.checks.push('Explicit malformed-record and blocked-storage simulations: no partial restore, clear still available for malformed snapshot, session Q&A works without persistence');
  assert.deepEqual(errors,[]);observed.status='PASS';
}catch(error){observed.status='FAIL';observed.error=error.stack;process.exitCode=1;}
finally{if(dir)await fs.writeFile(path.join(dir,'workspace-store-observations.json'),JSON.stringify(observed,null,2));console.log(JSON.stringify(observed,null,2));await browser?.close();}
