// Real PDF.js/IndexedDB UI controls, not independent answer accuracy.
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { chromium } from "playwright";
import { pdfFixture, pdfLayoutFixture } from "./fixtures/pdf-fixture.mjs";
import { revealControl } from "./fixtures/workspace-ui.mjs";
const dir=process.env.EVIDENCE_DIR;
if(dir)await fs.mkdir(dir,{recursive:true});
const text='Depot hooks require inspection weekly.';
const files=[
  {name:'notes.txt',mimeType:'text/plain',buffer:Buffer.from(text)},
  {name:'instructions.md',mimeType:'text/markdown',buffer:Buffer.from('# Notes\nDepot lights shut down at sunset.')},
  {name:'full.pdf',mimeType:'application/pdf',buffer:pdfFixture([text,'Depot lights shut down at sunset.'])},
  {name:'partial.pdf',mimeType:'application/pdf',buffer:pdfFixture([text,'','Depot lights shut down at sunset.'])},
  {name:'layout.pdf',mimeType:'application/pdf',buffer:pdfLayoutFixture([{items:[{text:'Day depot',x:50,y:700},{text:'Night depot',x:330,y:700},{text:'Cutoff 14:00',x:50,y:670},{text:'Cutoff 22:00',x:330,y:670}]}])},
  {name:'image-only.pdf',mimeType:'application/pdf',buffer:pdfLayoutFixture([{drawing:'q 200 0 0 200 50 500 cm BI /W 2 /H 2 /BPC 8 /CS /RGB /F /AHx ID 000000FFFFFF000000FFFFFF> EI Q\n'}])},
  {name:'damaged.pdf',mimeType:'application/pdf',buffer:Buffer.from('Deliberately damaged fictional PDF.')},
  {name:'locked-depot.pdf',mimeType:'application/pdf',buffer:await fs.readFile('tests/fixtures/locked-depot.pdf')},
];
const observed={kind:'Document-readiness feature regression; no mock vectors or accuracy claim',checks:[],hashes:Object.fromEntries(files.map(file=>[file.name,createHash('sha256').update(file.buffer).digest('hex')]))};
let browser;
try{
  browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});observed.browser=browser.version();
  const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
  await context.route('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/**',async route=>{
    await route.fulfill({path:path.resolve('node_modules/pdfjs-dist/build',new URL(route.request().url()).pathname.split('/').pop()),contentType:'text/javascript',headers:{'access-control-allow-origin':'*'}});
  });
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const url=process.env.TEST_URL||'http://127.0.0.1:8765/';
  await page.goto(url);await page.waitForFunction(()=>document.querySelector('#doc-count')?.textContent==='3');
  observed.build=await page.locator('#retrieval-build').innerText();assert.match(observed.build,/2026-10-13-r44/);
  await page.locator('#clear-docs').click();await page.locator('#file-input').setInputFiles(files);
  await page.waitForFunction(()=>document.querySelectorAll('#upload-list [data-state="ready"]').length===5&&document.querySelectorAll('#upload-list [data-state="error"]').length===3&&!document.querySelector('#file-input').disabled);
  const card=name=>page.locator('.document-card').filter({has:page.locator('strong').filter({hasText:name})});
  const readiness=name=>card(name).locator('.document-readiness');
  for(const name of ['notes.txt','instructions.md']){
    assert.equal(await readiness(name).locator('.readiness-badge').innerText(),'Text available');
    assert.doesNotMatch(await readiness(name).innerText(),/PDF page|confidence/);
  }
  assert.match(await readiness('full.pdf').innerText(),/Text available.*2 of 2 PDF pages/s);
  assert.match(await readiness('partial.pdf').innerText(),/Partial text coverage.*2 of 3 PDF pages.*pages 2.*blank or scanned.*OCR on your device/s);
  assert.match(await readiness('layout.pdf').innerText(),/Review layout.*1 of 1 PDF pages.*not reconstructed/s);
  observed.library=await page.locator('#document-list').innerText();observed.uploads=await page.locator('#upload-list').innerText();
  assert.match(observed.uploads,/image-only.pdf.*may be scanned or empty.*OCR/s);assert.match(observed.uploads,/damaged.pdf.*fresh PDF/s);assert.match(observed.uploads,/locked-depot.pdf.*Unlock a copy/s);
  assert.equal(await page.locator('input[type="password"]').count(),0);
  assert.equal(await page.locator('.upload-retry').count(),3);
  assert.equal(await page.locator('#upload-status').evaluate(el=>getComputedStyle(el).color),'rgb(255, 224, 171)');
  observed.checks.push('Real PDF.js: TXT/MD usable text, full/partial page counts, layout caution, image-only/damaged/encrypted errors and recovery controls; no fabricated scanned-page diagnosis or password entry');
  if(dir){await page.screenshot({path:path.join(dir,'01-readiness-desktop.png'),fullPage:true});for(const file of files)await fs.writeFile(path.join(dir,file.name),file.buffer);}
  await page.locator('#upload-activity > summary').click();
  await page.locator('#document-filter').fill('partial.pdf');
  if(dir)await page.screenshot({path:path.join(dir,'03-partial-pdf-readiness.png'),fullPage:true});
  await page.locator('#document-filter').fill('');
  await revealControl(page,'#save-workspace');await page.locator('#save-workspace').click();await page.waitForFunction(()=>document.querySelector('#workspace-save-status').textContent.includes('snapshot saved'));
  await page.reload();await page.waitForFunction(()=>document.querySelector('#doc-count').textContent==='3');
  await revealControl(page,'#restore-workspace');await page.waitForFunction(()=>!document.querySelector('#restore-workspace').disabled);await page.locator('#restore-workspace').click();
  await page.waitForFunction(()=>document.querySelector('#workspace-save-status').textContent.includes('Workspace restored'));
  assert.equal(await page.locator('#document-list').innerText(),observed.library,'Readiness must be freshly recomputed with identical loaded/restored extraction');
  await page.locator('#query-input').fill('When do depot lights shut down?');
  await page.locator('#ask-scope-summary').click();await page.getByRole('checkbox',{name:'All files',exact:true}).uncheck();await page.getByRole('checkbox',{name:'partial.pdf',exact:true}).check();
  await page.locator('#ask-button').click();await page.waitForFunction(()=>!document.querySelector('#ask-button').disabled&&!document.querySelector('#answer-result').hidden);
  assert.match(await page.locator('.answer-box').innerText(),/sunset/);assert.match(await page.locator('.source-location').innerText(),/PDF page 3/);
  await page.getByRole('button',{name:'Copy answer and evidence report'}).click();observed.report=await page.evaluate(()=>navigator.clipboard.readText());assert.match(observed.report,/PDF coverage.*pages 2/s);
  observed.checks.push('Snapshot restore re-extracts PDFs and reproduces readiness; partial-PDF answer keeps physical page 3 and original coverage warning in evidence export');
  // A failed replacement keeps the old document, readiness and exact answer.
  const before=await page.locator('#answer-result').innerText(),beforeReadiness=await readiness('partial.pdf').innerText();
  let chooser=page.waitForEvent('filechooser');await card('partial.pdf').getByRole('button',{name:'Replace partial.pdf',exact:true}).click();await(await chooser).setFiles({name:'failed-replacement.pdf',mimeType:'application/pdf',buffer:files.find(f=>f.name==='damaged.pdf').buffer});
  await page.waitForFunction(()=>document.querySelector('#upload-list [data-state="error"]')&&!document.querySelector('#file-input').disabled);
  assert.equal(await page.locator('#answer-result').innerText(),before);assert.equal(await readiness('partial.pdf').innerText(),beforeReadiness);
  chooser=page.waitForEvent('filechooser');await page.getByRole('button',{name:'Retry replacement for failed-replacement.pdf',exact:true}).click();await(await chooser).setFiles({name:'repaired.pdf',mimeType:'application/pdf',buffer:files.find(f=>f.name==='full.pdf').buffer});
  await page.waitForFunction(()=>document.querySelector('#upload-list [data-state="ready"]')&&!document.querySelector('#file-input').disabled);
  assert.equal(await page.locator('#doc-count').innerText(),'5');assert.match(await readiness('repaired.pdf').innerText(),/Text available.*2 of 2/s);assert.equal(await page.locator('#answer-result').isVisible(),false);
  // New-file retry adds a chosen file; no implicit removal or automatic OCR.
  await page.locator('#file-input').setInputFiles({name:'empty.txt',mimeType:'text/plain',buffer:Buffer.from(' ')});await page.waitForFunction(()=>document.querySelector('#upload-list [data-state="error"]')&&!document.querySelector('#file-input').disabled);
  chooser=page.waitForEvent('filechooser');await page.getByRole('button',{name:'Choose another file for empty.txt',exact:true}).click();await(await chooser).setFiles({name:'fixed.txt',mimeType:'text/plain',buffer:Buffer.from(text)});
  await page.waitForFunction(()=>document.querySelector('#doc-count').textContent==='6'&&!document.querySelector('#file-input').disabled);
  assert.equal(await readiness('fixed.txt').locator('.readiness-badge').innerText(),'Text available');
  observed.checks.push('Failed replacement preserves old readiness/answer; actual picker retry replaces only the intended file and clears stale results; empty-text retry adds chosen readable TXT');
  await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  assert.equal(await readiness('layout.pdf').isVisible(),true);
  if(dir)await page.screenshot({path:path.join(dir,'02-readiness-mobile.png'),fullPage:true});
  observed.checks.push('Readiness, cautions and file actions wrap at 390px without horizontal overflow');
  assert.deepEqual(errors,[]);observed.status='PASS';
}catch(error){observed.status='FAIL';observed.error=error.stack;process.exitCode=1;}
finally{if(dir)await fs.writeFile(path.join(dir,'readiness-observations.json'),JSON.stringify(observed,null,2));console.log(JSON.stringify(observed,null,2));await browser?.close();}
