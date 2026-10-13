import { revealControl } from "./fixtures/workspace-ui.mjs";
// Capture unchanged Cobalt16 inputs as an in-sample regression; preserve first-look.
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { chromium } from "playwright";
const pack=path.resolve(process.env.COBALT_PACK || "docs/evidence/r29/cobalt16");
const manifest=JSON.parse(await fs.readFile(path.join(pack,"freeze-manifest.json"),"utf8"));
for(const entry of manifest.files) assert.equal(createHash("sha256").update(await fs.readFile(path.join(pack,entry.path))).digest("hex"),entry.sha256,entry.path);
const key=JSON.parse(await fs.readFile(path.join(pack,"fixed-answer-key.json"),"utf8"));
assert.equal(key.length,16);
// Refuse accidental reruns over an already preserved first-look result.
const evidence=path.resolve(process.env.EVIDENCE_DIR || "../../outputs/5.6-r41-cobalt16-regression");
assert.notEqual(evidence,pack,"Never overwrite the original first-look directory");
await fs.mkdir(evidence,{recursive:true});
const output=path.join(evidence,"browser-observations.json");
try { await fs.access(output); throw Error("Regression observations already exist. Do not overwrite."); }
catch(error) { if(error.code!=="ENOENT") throw error; }
const result={classification:"Cobalt16 in-sample UI regression against unchanged r29 frozen inputs; not independent accuracy",hash_verification:"PASS",cases:[],modelRequests:[]};
let browser;
try {
  browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||"chrome"});
  result.browser=browser.version();
  const context=await browser.newContext({viewport:{width:1400,height:1000},permissions:["clipboard-read","clipboard-write"]});
  const page=await context.newPage();
  const requests=new Set();
  page.on("request",req=>{if(/onnx|wasm|all-MiniLM/.test(req.url())){const u=new URL(req.url());requests.add(u.origin+u.pathname);}});
  await page.goto(process.env.TEST_URL||"http://127.0.0.1:8765/",{waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>document.querySelector("#doc-count")?.textContent==="3");
  result.build=await page.locator("#retrieval-build").innerText(); assert.match(result.build,/2026-10-13-r41/);
  await page.locator("#clear-docs").click();
  await page.locator("#file-input").setInputFiles(manifest.files.filter(f=>f.path.startsWith("source_docs/")).map(f=>path.join(pack,f.path)));
  await page.waitForFunction(()=>document.querySelector("#doc-count")?.textContent==="3");
  result.library=await page.locator("#document-list").innerText();
  await revealControl(page,"#enable-semantic");
  await page.locator("#enable-semantic").click();
  await page.waitForFunction(()=>!document.querySelector('#retrieval-mode option[value="hybrid"]').disabled,null,{timeout:240000});
  await page.locator("#retrieval-mode").selectOption("hybrid");
  assert.equal(await page.locator("#answer-mode").inputValue(),"extractive");
  result.model="Actual Xenova/all-MiniLM-L6-v2, local WASM; Qwen disabled";
  for(const c of key) {
    let displayed,report,sources,answer_only;
    if(c.workflow==="hybrid") {
      await revealControl(page,"#query-input");
      await page.locator("#query-input").fill(c.question);
      await page.locator("#ask-button").click();
      await page.waitForFunction(()=>!document.querySelector("#ask-button").disabled && !document.querySelector("#answer-result").hidden);
      displayed=await page.locator("#answer-result").innerText();
      answer_only=await page.locator(".answer-box").innerText();
      sources=await page.locator(".source-card").evaluateAll(cards=>cards.map(card=>({filename:card.querySelector("strong")?.textContent,quotation:card.querySelector("p:not(.source-location):not(.pdf-notice)")?.textContent,location:card.querySelector(".source-location")?.textContent})));
      await page.getByRole("button",{name:"Copy answer and evidence report"}).click();
    } else {
      await revealControl(page,"#compare-left");
      await page.locator("#compare-left").selectOption({label:c.expected_files[0]});
      await page.locator("#compare-right").selectOption({label:c.expected_files[1]});
      await page.locator("#compare-topic").fill(c.question);
      await page.locator("#run-comparison").click();
      await page.locator("#research-result-title").getByText("Side-by-side excerpts",{exact:true}).waitFor({state:"visible"});
      displayed=await page.locator("#research-result-body").innerText();
      answer_only=displayed;
      sources=await page.locator(".research-evidence").evaluateAll(cards=>cards.map(card=>({filename:card.querySelector("h4")?.textContent.replace(/^\[\d+\]\s*/,""),quotation:card.querySelector(".research-evidence-text")?.textContent,location:card.querySelector(".source-location")?.textContent})));
      await page.locator("#research-copy").click();
    }
    report=await page.evaluate(()=>navigator.clipboard.readText());
    result.cases.push({id:c.id,workflow:c.workflow,question:c.question,displayed,answer_only,sources,report});
    await fs.writeFile(path.join(evidence,c.id+"-report.md"),report);
    await page.screenshot({path:path.join(evidence,c.id+".png"),fullPage:true});
    result.modelRequests=[...requests];
    await fs.writeFile(output,JSON.stringify(result,null,2));
  }
  result.capture_status="COMPLETE";
  await fs.writeFile(output,JSON.stringify(result,null,2));
  console.log("Captured all 16 unchanged regression cases; not yet graded.");
} catch(error) {
  result.blocker=error.message; result.capture_status="BLOCKED";
  await fs.writeFile(output,JSON.stringify(result,null,2)); throw error;
} finally {await browser?.close();}
