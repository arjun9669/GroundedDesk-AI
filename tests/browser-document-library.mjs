// Synthetic file lifecycle checks in real Chrome. No factual benchmark claim.
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { pdfFixture } from "./fixtures/pdf-fixture.mjs";
const dir = process.env.EVIDENCE_DIR;
if (dir) await fs.mkdir(dir, { recursive: true });
const observed = { kind: "document library feature regression; not accuracy benchmark", checks: [] };
let browser;
try {
  browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
  observed.browser = browser.version();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, permissions: ["clipboard-read", "clipboard-write"] });
  await context.route("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/**", async route => {
    await route.fulfill({ path: path.resolve("node_modules/pdfjs-dist/build", new URL(route.request().url()).pathname.split("/").pop()), contentType: "text/javascript", headers: { "access-control-allow-origin": "*" } });
  });
  const page = await context.newPage();
  const errors = []; page.on("pageerror", e => errors.push(e.message));
  await page.goto(process.env.TEST_URL || "http://127.0.0.1:8765/", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#doc-count")?.textContent === "3");
  observed.build = await page.locator("#retrieval-build").innerText(); assert.match(observed.build, /2026-10-13-r41/);
  await page.locator("#clear-docs").click();
  const name = "North-Harbor-Workshop-Operating-Notes-October-2026.md";
  const original = "Harbor lamps must be inspected every nine days.";
  const files = [
    { name, mimeType: "text/markdown", buffer: Buffer.from(original) },
    { name: "unreadable.pdf", mimeType: "application/pdf", buffer: Buffer.from("This is a deliberately damaged fictional PDF.") },
    { name: "garden.txt", mimeType: "text/plain", buffer: Buffer.from("Garden sprinklers run every six days.") }
  ];
  await page.locator("#file-input").setInputFiles(files);
  await page.waitForFunction(() => document.querySelectorAll('#upload-list [data-state="ready"]').length === 2 && document.querySelectorAll('#upload-list [data-state="error"]').length === 1 && !document.querySelector('#file-input').disabled);
  const statuses = await page.locator("#upload-list").innerText();
  assert.match(statuses, /unreadable.pdf/); assert.match(statuses, /damaged|not a valid PDF/);
  assert.equal(await page.locator("#doc-count").innerText(), "2");
  const card = page.locator(".document-card").filter({ hasText: name });
  assert.equal(await card.locator("strong").innerText(), name);
  assert.equal(await card.locator("strong").evaluate(el => getComputedStyle(el).whiteSpace), "normal");
  assert.equal(await card.locator(".doc-icon").innerText(), "MD");
  observed.mixedUpload = statuses;
  observed.checks.push("Mixed upload reports each success and damaged-file error independently; full long filename wraps and Markdown type is visible");
  const ask = async question => {
    await page.locator("#query-input").fill(question); await page.locator("#ask-button").click();
    await page.waitForFunction(() => !document.querySelector("#ask-button").disabled && !document.querySelector("#answer-result").hidden);
  };
  await ask("How often must Harbor lamps be inspected?");
  assert.match(await page.locator(".answer-box").innerText(), /nine days/);
  const oldAnswer = await page.locator("#answer-result").innerText();
  const replace = async file => {
    const pending = page.waitForEvent("filechooser");
    await card.getByRole("button", { name: `Replace ${name}`, exact: true }).click();
    await (await pending).setFiles(file);
    await page.waitForFunction(() => !document.querySelector("#file-input").disabled);
  };
  await replace({ name: "empty.txt", mimeType: "text/plain", buffer: Buffer.from("  ") });
  assert.match(await page.locator("#upload-list").innerText(), /no extractable text.*Existing file kept/);
  assert.equal(await page.locator("#answer-result").innerText(), oldAnswer);
  assert.equal(await card.count(), 1);
  assert.equal(await card.locator(".replace-doc").evaluate(el => el === document.activeElement), true);
  await replace({ name: "damaged-replacement.pdf", mimeType: "application/pdf", buffer: Buffer.from("Deliberately damaged replacement PDF.") });
  assert.match(await page.locator("#upload-list").innerText(), /damaged.*Existing file kept/);
  assert.equal(await page.locator("#answer-result").innerText(), oldAnswer);
  await replace({ name: "unsupported.exe", mimeType: "application/octet-stream", buffer: Buffer.from("fictional test data") });
  assert.match(await page.locator("#upload-list").innerText(), /Unsupported file type.*Existing file kept/);
  assert.equal(await page.locator("#answer-result").innerText(), oldAnswer);
  await replace({ name: "too-large.txt", mimeType: "text/plain", buffer: Buffer.alloc(5 * 1024 * 1024 + 1, 65) });
  assert.match(await page.locator("#upload-list").innerText(), /exceeds 5 MB.*Existing file kept/);
  assert.equal(await page.locator("#answer-result").innerText(), oldAnswer);
  observed.checks.push("Failed empty, damaged PDF, unsupported and oversized replacements retain the original document and exact displayed answer");
  const revised = "Harbor lamps must be inspected every fourteen days.";
  await replace({ name, mimeType: "text/markdown", buffer: Buffer.from(revised) });
  assert.equal(await page.locator("#doc-count").innerText(), "2");
  assert.equal(await page.locator("#answer-result").isVisible(), false);
  assert.equal(await page.locator("#history-count").innerText(), "0");
  assert.equal(await page.locator("#replace-file-input").inputValue(), "");
  assert.equal(await card.locator(".replace-doc").evaluate(el => el === document.activeElement), true);
  await ask("How often must Harbor lamps be inspected?");
  assert.match(await page.locator(".answer-box").innerText(), /fourteen days/);
  assert.equal((await page.locator("#answer-result").innerText()).includes("nine days"), false);
  observed.checks.push("Same-name replacement changes searchable content in place; document count stable, old answer/history cleared and same file can be picked again");
  if (dir) await page.screenshot({ path: path.join(dir, "01-replaced-file.png"), fullPage: true });
  // Real PDF page progress. Delay the known pinned PDF.js delivery so the clear
  // action occurs during an actual asynchronous upload, not after it finishes.
  let releasePDF;
  const gate = new Promise(resolve => { releasePDF = resolve; });
  await context.route("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.mjs", async route => {
    await gate;
    await route.fulfill({ path: path.resolve("node_modules/pdfjs-dist/build/pdf.mjs"), contentType: "text/javascript", headers: { "access-control-allow-origin": "*" } });
  });
  // A fresh page avoids a previously loaded PDF.js module from the damaged-file case.
  const uploadPage = await context.newPage();
  await uploadPage.goto(process.env.TEST_URL || "http://127.0.0.1:8765/");
  await uploadPage.waitForFunction(() => document.querySelector("#doc-count")?.textContent === "3");
  await uploadPage.locator("#clear-docs").click();
  const pdf = { name: "harbor-inspection.pdf", mimeType: "application/pdf", buffer: pdfFixture([original, "Harbor lamps are repaired on shore."]) };
  await uploadPage.locator("#file-input").setInputFiles(pdf);
  await uploadPage.waitForFunction(() => document.querySelector('#upload-list [data-state="reading"]'));
  assert.equal(await uploadPage.locator("#file-input").isDisabled(), true);
  await uploadPage.locator("#clear-docs").click(); releasePDF();
  await uploadPage.waitForFunction(() => !document.querySelector("#file-input").disabled);
  assert.equal(await uploadPage.locator("#doc-count").innerText(), "0");
  assert.match(await uploadPage.locator("#upload-list").innerText(), /Cancelled/);
  observed.checks.push("Clearing during real asynchronous PDF loading prevents a late document from restoring the cleared library");
  await uploadPage.evaluate(() => {
    window.observedProgress = [];
    new MutationObserver(() => { const p = document.querySelector('#upload-list progress'); if (p?.hasAttribute('value')) window.observedProgress.push({ value: p.value, max: p.max }); }).observe(document.querySelector('#upload-list'), { attributes: true, subtree: true });
  });
  await uploadPage.locator("#file-input").setInputFiles(pdf);
  await uploadPage.waitForFunction(() => document.querySelector('#upload-list [data-state="ready"]') && !document.querySelector('#file-input').disabled);
  assert.ok((await uploadPage.evaluate(() => window.observedProgress)).some(p => p.value === 2 && p.max === 2));
  observed.progress = await uploadPage.evaluate(() => window.observedProgress);
  assert.match(await uploadPage.locator(".doc-details small").innerText(), /2 pages/);
  assert.equal(await uploadPage.getByRole("button", { name: "View original PDF harbor-inspection.pdf", exact: true }).count(), 1);
  await uploadPage.setViewportSize({ width: 390, height: 844 });
  assert.equal(await uploadPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  if (dir) await uploadPage.screenshot({ path: path.join(dir, "02-mobile-library.png"), fullPage: true });
  observed.checks.push("Actual PDF page counts drive progress; page metadata and explicit preview/replace/remove actions render without mobile overflow");
  // Replacement must work at the existing 15-document cap.
  await page.locator("#clear-docs").click();
  await page.locator("#file-input").setInputFiles(Array.from({ length: 15 }, (_, i) => ({ name: `notes-${i}.txt`, mimeType: "text/plain", buffer: Buffer.from(`Depot ${i} inspects lamps weekly.`) })));
  await page.waitForFunction(() => document.querySelector("#doc-count")?.textContent === "15" && !document.querySelector('#file-input').disabled);
  const pending = page.waitForEvent("filechooser");
  await page.getByRole("button", { name: "Replace notes-0.txt", exact: true }).click();
  await (await pending).setFiles({ name: "updated.txt", mimeType: "text/plain", buffer: Buffer.from("Depot zero inspects lamps daily.") });
  await page.waitForFunction(() => document.querySelector('#upload-list [data-state="ready"]') && !document.querySelector('#file-input').disabled);
  assert.equal(await page.locator("#doc-count").innerText(), "15");
  assert.equal(await page.getByRole("button", { name: "Remove updated.txt", exact: true }).count(), 1);
  observed.checks.push("Replacement at the 15-document cap succeeds without adding a sixteenth file");
  let releaseSample;
  const sampleGate = new Promise(resolve => { releaseSample = resolve; });
  await context.route("**/samples/ai-governance.txt", async route => {
    await sampleGate; await route.fulfill({ path: path.resolve("samples/ai-governance.txt"), contentType: "text/plain" });
  });
  const startupPage = await context.newPage();
  await startupPage.goto(process.env.TEST_URL || "http://127.0.0.1:8765/", { waitUntil: "domcontentloaded" });
  await startupPage.waitForFunction(() => document.querySelector('#retrieval-build')?.textContent.includes('Loaded retrieval build:'));
  await startupPage.locator("#clear-docs").click();
  await startupPage.locator("#file-input").setInputFiles({ name: "own-notes.txt", mimeType: "text/plain", buffer: Buffer.from(original) });
  await startupPage.waitForFunction(() => document.querySelector('#upload-list [data-state="ready"]'));
  const sampleResponse = startupPage.waitForResponse(response => response.url().includes('/samples/ai-governance.txt'));
  releaseSample();
  await sampleResponse;
  await startupPage.locator("#query-input").fill("How often must Harbor lamps be inspected?");
  await startupPage.locator("#ask-button").click();
  await startupPage.waitForFunction(() => !document.querySelector('#ask-button').disabled && !document.querySelector('#answer-result').hidden);
  assert.equal(await startupPage.locator("#doc-count").innerText(), "1");
  assert.equal(await startupPage.getByRole("button", { name: "Remove own-notes.txt", exact: true }).count(), 1);
  observed.checks.push("Clearing/uploading during delayed startup prevents bundled examples from returning into a user-selected corpus");
  assert.deepEqual(errors, []); observed.status = "PASS";
  console.log(JSON.stringify(observed, null, 2));
} finally {
  if (dir) await fs.writeFile(path.join(dir, "library-observations.json"), JSON.stringify(observed, null, 2));
  await browser?.close();
}
