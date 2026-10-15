// Known synthetic engineering fixtures; not a factual accuracy benchmark.
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { chromium } from "playwright";
import { pdfFixture, pdfLayoutFixture } from "./fixtures/pdf-fixture.mjs";
import { readPDFGeometry } from "./fixtures/pdf-geometry.mjs";
const dir = process.env.EVIDENCE_DIR;
const cases = [
  {id:"unique",quote:"Depot drivers inspect seals every morning.",pdf:pdfFixture(["Depot drivers inspect seals every morning."]),expected:"matched",regions:1},
  {id:"wrapped",quote:"Depot drivers inspect seals every morning.",pdf:pdfLayoutFixture([{items:[{text:"Depot drivers inspect seals",x:50,y:700},{text:"every morning.",x:50,y:680}]}]),expected:"matched",regions:2},
  {id:"repeated",quote:"Inspect seals.",pdf:pdfLayoutFixture([{items:[{text:"Inspect seals.",x:50,y:700},{text:"Inspect seals.",x:50,y:680}]}]),expected:"ambiguous",regions:0},
  {id:"partial-run",quote:"Inspect seals.",pdf:pdfFixture(["Arrive at dawn. Inspect seals."]),expected:"partial-run",regions:0},
  {id:"cross-page",quote:"Inspect seals. Record damage.",pdf:pdfFixture(["Inspect seals.","Record damage."]),expected:"not-found",regions:0},
  {id:"missing",quote:"No matching statement.",pdf:pdfFixture(["Inspect seals."]),expected:"not-found",regions:0},
  {id:"ordinary-view",quote:"",pdf:pdfFixture(["Inspect seals."]),expected:"none",regions:0},
];
if(dir) {
  await fs.mkdir(dir,{recursive:true});
  await fs.writeFile(path.join(dir,"pre-test-manifest.json"),JSON.stringify(cases.map(c=>({id:c.id,quote:c.quote,expected:c.expected,regions:c.regions,sha256:createHash("sha256").update(c.pdf).digest("hex")})),null,2));
  for(const c of cases) await fs.writeFile(path.join(dir,c.id+".pdf"),c.pdf);
}
let browser;
const observations={kind:"synthetic PDF highlight feature regression; not independent accuracy",cases:[]};
try {
  browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});
  observations.browser=browser.version();
  const context=await browser.newContext({viewport:{width:1400,height:1000}});
  await context.route("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/**",async route=>{
    const name=new URL(route.request().url()).pathname.split("/").pop();
    await route.fulfill({path:path.resolve("node_modules/pdfjs-dist/build",name),contentType:"text/javascript",headers:{"access-control-allow-origin":"*"}});
  });
  const page=await context.newPage();
  await page.goto(process.env.TEST_URL||"http://127.0.0.1:8765/",{waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>document.querySelector("#retrieval-build")?.textContent.includes("Loaded retrieval build:"));
  observations.build=await page.locator("#retrieval-build").innerText();
  assert.match(observations.build,/2026-10-13-r44/);
  await page.setViewportSize({width:390,height:844});
  await page.waitForFunction(()=>document.querySelector("#doc-count")?.textContent==="3");
  await page.locator("#clear-docs").click();
  await page.locator("#file-input").setInputFiles({name:"mobile-depot.pdf",mimeType:"application/pdf",buffer:cases[0].pdf});
  await page.waitForFunction(()=>document.querySelector("#doc-count")?.textContent==="1");
  await page.locator("#query-input").fill("When do Depot drivers inspect seals?");
  await page.locator("#ask-button").click();
  await page.waitForFunction(()=>!document.querySelector("#ask-button").disabled && !document.querySelector("#answer-result").hidden);
  const mobileAnswer=await page.locator("#answer-result").innerText();
  assert.ok(mobileAnswer.includes(cases[0].quote));
  await page.locator(".open-pdf-page").click();
  await page.waitForFunction(()=>document.querySelector(".pdf-highlight-status")?.dataset.matchStatus==="matched");
  assert.equal(await page.locator(".pdf-highlight-overlay rect").count(),1);
  observations.mobileUpload={outcome:"PASS",filename:"mobile-depot.pdf",answer:mobileAnswer,scope:"upload, Keyword Q&A and cited highlight at 390x844 in desktop Chrome emulation"};
  if(dir) await page.screenshot({path:path.join(dir,"mobile-upload-qa.png"),fullPage:true});
  await page.getByRole("button",{name:"Close PDF",exact:true}).click();
  await page.setViewportSize({width:1400,height:1000});
  for(const c of cases) {
    // Exercise the viewer's public entry point with actual PDF.js, not mocked text positions.
    await page.evaluate(async ({base64,quote,id})=>{
      const {openPDFPreview}=await import("./pdf-preview.mjs?v=20261013-r44");
      const bytes=Uint8Array.from(atob(base64),ch=>ch.charCodeAt(0));
      await openPDFPreview(new File([bytes],id+".pdf",{type:"application/pdf"}),id+".pdf",1,quote);
    },{base64:c.pdf.toString("base64"),quote:c.quote,id:c.id});
    const status=await page.locator(".pdf-highlight-status").getAttribute("data-match-status");
    const regions=await page.locator(".pdf-highlight-overlay rect").count();
    const message=await page.locator(".pdf-highlight-status").innerText();
    assert.equal(status,c.expected); assert.equal(regions,c.regions);
    assert.equal(await page.locator(".pdf-preview-quote").textContent(),c.quote);
    observations.cases.push({id:c.id,quote:c.quote,status,regions,message,outcome:"PASS"});
    if(dir) await page.screenshot({path:path.join(dir,c.id+".png"),fullPage:true});
    if(c.id==="unique") {
      await page.setViewportSize({width:390,height:844});
      // One settled task avoids comparing boxes from different resize frames.
      // No wait-until-success loop and no change to the original tolerance.
      const geometry=await readPDFGeometry(page);
      const bounds=geometry.stage,overlay=geometry.overlay;
      assert.ok(bounds.x>=0 && bounds.x+bounds.width<=390);
      assert.ok(Math.abs(bounds.width-overlay.width)<1 && Math.abs(bounds.height-overlay.height)<1);
      observations.mobile={viewport:"390x844",stage:bounds,overlay,sampled_same_task:geometry.sampled_same_task,settle_frames:geometry.settle_frames,outcome:"PASS",scope:"responsive original page and highlight alignment; desktop Chrome emulation, not a physical phone"};
      if(dir) await page.screenshot({path:path.join(dir,"mobile-highlight.png"),fullPage:true});
      await page.setViewportSize({width:1400,height:1000});
    }
    if(c.id==="cross-page") {
      await page.getByRole("button",{name:"Next page",exact:true}).click();
      await page.waitForFunction(()=>document.querySelector(".pdf-preview [role=status]")?.textContent.includes("PDF page 2 of 2"));
      assert.equal(await page.locator(".pdf-highlight-overlay rect").count(),0);
    }
    await page.getByRole("button",{name:"Close PDF",exact:true}).click();
  }
  if(dir) await fs.writeFile(path.join(dir,"highlight-observations.json"),JSON.stringify(observations,null,2));
  console.log(JSON.stringify(observations,null,2));
} finally {await browser?.close();}
