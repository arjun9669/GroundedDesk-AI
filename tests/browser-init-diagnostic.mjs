// Read-only application readiness; never upload sources or ask questions.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import {chromium} from 'playwright';
const out=path.resolve(process.env.EVIDENCE_DIR);await fs.mkdir(out,{recursive:true});assert.equal((await fs.readdir(out)).length,0);
const browser=await chromium.launch({channel:'chrome',headless:true});
const failures=[],errors=[];let page;
try{
 page=await browser.newPage({viewport:{width:1440,height:1000}});
 page.on('requestfailed',r=>failures.push({url:r.url(),error:r.failure()?.errorText}));page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.TEST_URL);await page.waitForFunction(()=>document.querySelector('#doc-count')?.textContent==='3');
 const footer=await page.locator('#retrieval-build').innerText();assert.match(footer,/2026-10-13-r44/);
 const result={classification:'Read-only startup diagnostic; no model, source upload or questions',url:page.url(),browser:browser.version(),footer,document_count:3,request_failures:failures,page_errors:errors,passed:true};
 await fs.writeFile(path.join(out,'result.json'),JSON.stringify(result,null,2),{flag:'wx'});await fs.writeFile(path.join(out,'ready.png'),await page.screenshot({fullPage:true}),{flag:'wx'});console.log(JSON.stringify(result));
}catch(e){await fs.writeFile(path.join(out,'failure.json'),JSON.stringify({message:e.stack,failures,errors},null,2),{flag:'wx'});throw e;}finally{await browser.close();}
