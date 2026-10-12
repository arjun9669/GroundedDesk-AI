// Real PDF.js extraction and rendering. Synthetic fixture, not a benchmark.
// TEST_MINILM=1 additionally downloads/runs the actual model; never mocks vectors.
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

import { pdfFixture } from "./fixtures/pdf-fixture.mjs";

const evidenceDir = process.env.EVIDENCE_DIR;
if (evidenceDir) await fs.mkdir(evidenceDir, { recursive: true });
const snapshot = async (page, name) => { if (evidenceDir) await page.screenshot({ path: path.join(evidenceDir, name + ".png"), fullPage: true }); };
let browser;
const observations = { kind: "synthetic feature smoke; not an accuracy benchmark", model: "not exercised", checks: [] };
try {
  browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
  observations.browser = browser.version();
  const context = await browser.newContext({ viewport: { width: 1400, height: 1000 }, permissions: ["clipboard-read", "clipboard-write"] });
  // Serve the pinned PDF.js distribution locally in CI, avoiding CDN flakiness.
  await context.route("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/**", async route => {
    const name = new URL(route.request().url()).pathname.split("/").pop();
    await route.fulfill({ path: path.resolve("node_modules/pdfjs-dist/build", name), contentType: "text/javascript", headers: { "access-control-allow-origin": "*" } });
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const modelRequests = new Set();
  page.on("request", request => {
    if (/onnx|wasm|all-MiniLM/.test(request.url())) {
      const url = new URL(request.url());
      modelRequests.add(url.origin + url.pathname); // omit ephemeral public download query strings
    }
  });
  await page.goto(process.env.TEST_URL || "http://127.0.0.1:8765/", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#doc-count")?.textContent === "3");
  observations.build = await page.locator("#retrieval-build").innerText();
  assert.match(observations.build, /2026-10-12-r30/);
  await page.locator("#clear-docs").click();
  const quote = "Harbor crane operators must inspect lifting hooks every eight shifts.";
  const fixture = pdfFixture(["Harbor workshop operates the sheltered pier.", quote, "Harbor workshop visitor hours end at sunset."]);
  if (evidenceDir) await fs.writeFile(path.join(evidenceDir, "harbor-workshop.pdf"), fixture);
  await page.locator("#file-input").setInputFiles({ name: "harbor-workshop.pdf", mimeType: "application/pdf", buffer: fixture });
  await page.waitForFunction(() => document.querySelector("#doc-count")?.textContent === "1");
  async function ask(question) {
    await page.locator("#query-input").fill(question);
    await page.locator("#ask-button").click();
    await page.waitForFunction(() => !document.querySelector("#ask-button").disabled && !document.querySelector("#answer-result").hidden);
  }
  await ask("How often must Harbor crane operators inspect lifting hooks?");
  let answer = await page.locator("#answer-result").innerText();
  assert.ok(answer.includes(quote));
  assert.match(answer, /PDF page 2 \(physical page numbers\)/);
  await page.getByRole("button", { name: "Copy answer and evidence report" }).click();
  const report = await page.evaluate(() => navigator.clipboard.readText());
  assert.match(report, /PDF page 2/); assert.match(report, /2026-10-12-r30/);
  const downloadPending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download local Markdown evidence report" }).click();
  const download = await downloadPending;
  const downloadedReport = await fs.readFile(await download.path(), "utf8");
  assert.match(downloadedReport, /PDF page 2/);
  assert.match(downloadedReport, /2026-10-12-r30/);
  if (evidenceDir) await download.saveAs(path.join(evidenceDir, "keyword-evidence-export.md"));
  observations.keywordAnswer = answer;
  observations.keywordReport = report;
  await snapshot(page, "01-keyword-pdf-page-citation");
  await page.locator(".open-pdf-page").click();
  await page.waitForFunction(() => document.querySelector(".pdf-preview [role=status]")?.textContent.includes("PDF page 2 of 3"));
  assert.ok(await page.locator(".pdf-preview canvas").evaluate(canvas => canvas.width > 0 && canvas.height > 0));
  assert.equal(await page.locator(".pdf-highlight-status").getAttribute("data-match-status"), "matched");
  assert.equal(await page.locator(".pdf-highlight-overlay rect").count(), 1);
  assert.equal(await page.locator(".pdf-preview-quote").textContent(), quote);
  await snapshot(page, "02-original-page-preview");
  await page.getByRole("button", { name: "Next page", exact: true }).click();
  await page.waitForFunction(() => document.querySelector(".pdf-preview [role=status]")?.textContent.includes("PDF page 3 of 3"));
  assert.equal(await page.locator(".pdf-highlight-overlay rect").count(), 0);
  assert.equal(await page.getByRole("button", { name: "Next page", exact: true }).isDisabled(), true);
  await page.getByRole("button", { name: "Previous page", exact: true }).click();
  await page.waitForFunction(() => document.querySelector(".pdf-preview [role=status]")?.textContent.includes("PDF page 2 of 3"));
  assert.equal(await page.locator(".pdf-highlight-overlay rect").count(), 1);
  await page.keyboard.press("Escape");
  await page.locator(".pdf-preview").waitFor({ state: "detached" });
  assert.equal(await page.locator(".pdf-preview").count(), 0);
  // Close while loading, then reopen: stale async work must not recreate a dialog.
  await page.locator(".open-pdf-page").click();
  await page.getByRole("button", { name: "Close PDF", exact: true }).click();
  await page.locator(".open-pdf-page").click();
  await page.waitForFunction(() => document.querySelector(".pdf-preview [role=status]")?.textContent.includes("PDF page 2 of 3"));
  await page.getByRole("button", { name: "Close PDF", exact: true }).click();
  observations.checks.push("Actual PDF.js upload/extraction, page 2 provenance, copy/export, original page rendering, next/previous bounds, Escape and close/reopen cleanup");

  if (process.env.TEST_MINILM === "1") {
    await page.locator("#enable-semantic").click();
    await page.waitForFunction(() => !document.querySelector('#retrieval-mode option[value="hybrid"]').disabled, null, { timeout: 240000 });
    await page.locator("#retrieval-mode").selectOption("hybrid");
    assert.equal(await page.locator("#answer-mode").inputValue(), "extractive");
    await ask("How often must Harbor crane operators inspect lifting hooks?");
    answer = await page.locator("#answer-result").innerText();
    assert.ok(answer.includes(quote)); assert.match(answer, /PDF page 2/);
    await page.getByRole("button", { name: "Copy answer and evidence report" }).click();
    const hybridReport = await page.evaluate(() => navigator.clipboard.readText());
    assert.match(hybridReport, /Local MiniLM/);
    observations.model = "Actual Xenova/all-MiniLM-L6-v2, local WASM; Qwen disabled";
    observations.hybridAnswer = answer; observations.hybridReport = hybridReport;
    observations.modelRequests = [...modelRequests];
    await snapshot(page, "03-actual-minilm-hybrid-pdf");
    await page.locator(".open-pdf-page").click();
    await page.waitForFunction(() => document.querySelector(".pdf-highlight-status")?.dataset.matchStatus === "matched");
    assert.equal(await page.locator(".pdf-highlight-overlay rect").count(), 1);
    observations.hybridPreview = { quote: await page.locator(".pdf-preview-quote").textContent(), message: await page.locator(".pdf-highlight-status").innerText(), regions: 1 };
    assert.equal(observations.hybridPreview.quote, quote);
    await snapshot(page, "04-actual-minilm-highlight");
    await page.getByRole("button", { name: "Close PDF", exact: true }).click();
  }
  await ask("What is the exact password for the Harbor crane database?");
  assert.equal(await page.locator(".source-card").count(), 0);
  assert.match(await page.locator("#answer-result").innerText(), /can't find this/);
  observations.checks.push("Unsupported question has no source cards or page citations");
  await page.locator("#clear-docs").click();
  await page.locator("#file-input").setInputFiles({ name: "workshop-notes.txt", mimeType: "text/plain", buffer: Buffer.from("Workshop notes\nHarbor crane operators must inspect lifting hooks every eight shifts.") });
  await page.waitForFunction(() => document.querySelector("#doc-count")?.textContent === "1");
  await ask("How often must Harbor crane operators inspect lifting hooks?");
  // Existing sentence extraction includes the unpunctuated heading, so the
  // exact displayed quotation spans lines 1–2. Do not change retrieval to fit UI tests.
  assert.match(await page.locator("#answer-result").innerText(), /Text lines 1–2/);
  assert.equal(await page.locator(".open-pdf-page").count(), 0);
  observations.checks.push("TXT quotation spans lines 1–2, no invented page link, document replacement invalidates Hybrid vectors");
  // Separate fictional positive controls: a PIN guard must not blanket-refuse
  // a directly disclosed value or an operational rotation question.
  await page.locator("#clear-docs").click();
  const pinText = "The fictional workshop door PIN code is 0482. The fictional workshop PIN code must be rotated every seven days.";
  await page.locator("#file-input").setInputFiles({ name: "fictional-pin-controls.txt", mimeType: "text/plain", buffer: Buffer.from(pinText) });
  await page.waitForFunction(() => document.querySelector("#doc-count")?.textContent === "1");
  observations.pinControls = [];
  for (const mode of process.env.TEST_MINILM === "1" ? ["keyword", "hybrid"] : ["keyword"]) {
    if (mode === "hybrid") {
      await page.locator("#enable-semantic").click();
      await page.waitForFunction(() => !document.querySelector('#retrieval-mode option[value="hybrid"]').disabled, null, { timeout: 240000 });
    }
    await page.locator("#retrieval-mode").selectOption(mode);
    for (const [question, expected] of [["What is the exact PIN code for the fictional workshop door?", "0482"], ["When must the fictional workshop PIN code be rotated?", "seven days"]]) {
      await ask(question);
      const displayed = await page.locator("#answer-result").innerText();
      assert.ok(displayed.includes(expected));
      assert.equal(await page.locator(".source-card").count(), 1);
      observations.pinControls.push({ mode, question, displayed, outcome: "PASS" });
    }
  }
  assert.deepEqual(errors, []);
  observations.status = "PASS";
  console.log(JSON.stringify(observations, null, 2));
} catch (error) {
  observations.status = "FAIL"; observations.error = error.stack;
  throw error;
} finally {
  if (evidenceDir) await fs.writeFile(path.join(evidenceDir, "browser-observations.json"), JSON.stringify(observations, null, 2));
  await browser?.close();
}
