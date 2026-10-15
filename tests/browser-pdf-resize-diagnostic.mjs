// Synthetic PDF geometry investigation, separate from retrieval accuracy.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
import {pdfFixture} from './fixtures/pdf-fixture.mjs';
import {readPDFGeometry} from './fixtures/pdf-geometry.mjs';
assert.ok(process.env.EVIDENCE_DIR,'Use a new explicit diagnostic directory');
const out=path.resolve(process.env.EVIDENCE_DIR);await fs.mkdir(out,{recursive:true});assert.equal((await fs.readdir(out)).length,0);
const pdf=pdfFixture(['Depot drivers inspect seals every morning.']),widths=[390,1400,1199,1200,768,390,1400];
await fs.writeFile(path.join(out,'plan.json'),JSON.stringify({classification:'Synthetic resize diagnostic, not accuracy',cycles:12,widths,original_assertion:'abs(width difference)<1 && abs(height difference)<1',fixed_settle_frames:2,pdf_sha256:createHash('sha256').update(pdf).digest('hex')},null,2),{flag:'wx'});
const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome',headless:true});
const rows=[];let failure;
const fits=s=>Boolean(s?.stage&&s?.overlay&&Math.abs(s.stage.width-s.overlay.width)<1&&Math.abs(s.stage.height-s.overlay.height)<1);
try{
 const context=await browser.newContext({viewport:{width:1400,height:1000}});
 await context.route('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/**',async route=>route.fulfill({path:path.resolve('node_modules/pdfjs-dist/build',new URL(route.request().url()).pathname.split('/').pop()),contentType:'text/javascript',headers:{'access-control-allow-origin':'*'}}));
 const page=await context.newPage();await page.goto(process.env.TEST_URL||'http://127.0.0.1:8792/');
 await page.waitForFunction(()=>document.querySelector('#doc-count')?.textContent==='3');
 await page.evaluate(async base64=>{
  const {openPDFPreview}=await import('/pdf-preview.mjs?v=20261013-r44');
  const bytes=Uint8Array.from(atob(base64),c=>c.charCodeAt(0));
  await openPDFPreview(new File([bytes],'resize.pdf',{type:'application/pdf'}),'resize.pdf',1,'Depot drivers inspect seals every morning.');
 },pdf.toString('base64'));
 for(let cycle=0;cycle<12;cycle++)for(const width of widths){
  await page.setViewportSize({width,height:width<1000?844:1000});
  const sequential={stage:await page.locator('.pdf-page-stage').boundingBox(),overlay:await page.locator('.pdf-highlight-overlay').boundingBox()};
  const immediate=await page.evaluate(()=>{
   const b=selector=>{const r=document.querySelector(selector)?.getBoundingClientRect();return r?{x:r.x,y:r.y,width:r.width,height:r.height}:null;};
   return {stage:b('.pdf-page-stage'),overlay:b('.pdf-highlight-overlay')};
  });
  const settled=await readPDFGeometry(page);
  rows.push({cycle,width,sequential,immediate,settled,sequential_matches:fits(sequential),immediate_matches:fits(immediate),settled_matches:fits(settled)});
  await fs.writeFile(path.join(out,`resize-${String(rows.length).padStart(3,'0')}.json`),JSON.stringify(rows.at(-1),null,2),{flag:'wx'});
 }
 await page.setViewportSize({width:390,height:844});
 await page.locator('.pdf-highlight-overlay').evaluate(el=>{el.style.width='calc(100% - 8px)';});
 const negative=await readPDFGeometry(page);assert.equal(fits(negative),false,'Same-task sampling must still detect an actual mismatch');
 await page.locator('.pdf-highlight-overlay').evaluate(el=>{el.style.width='';});
 const restored=await readPDFGeometry(page);assert.ok(fits(restored));
 await fs.writeFile(path.join(out,'negative-control.json'),JSON.stringify({classification:'Temporary diagnostic DOM distortion, no runtime file edit',negative,restored,original_tolerance_unchanged:true,detected:true},null,2),{flag:'wx'});
 await fs.writeFile(path.join(out,'settled-mobile.png'),await page.screenshot({fullPage:true}),{flag:'wx'});
 const result={classification:'Actual PDF.js synthetic resize reliability, not MiniLM accuracy',browser:browser.version(),samples:rows.length,sequential_mismatches:rows.filter(r=>!r.sequential_matches).length,immediate_same_task_mismatches:rows.filter(r=>!r.immediate_matches).length,settled_same_task_mismatches:rows.filter(r=>!r.settled_matches).length,negative_control_detected:true,rows};
 await fs.writeFile(path.join(out,'result.json'),JSON.stringify(result,null,2),{flag:'wx'});console.log(JSON.stringify({...result,rows:undefined}));
 assert.equal(result.settled_same_task_mismatches,0,'Do not hide stable geometry failures');
}catch(e){failure=e;await fs.writeFile(path.join(out,'failure.json'),JSON.stringify({message:e.stack,partial_rows:rows},null,2),{flag:'wx'});throw e;}
finally{await browser.close();}
