// Real PDF.js extraction and rendering. Synthetic fixture, not a benchmark.
// TEST_MINILM=1 additionally downloads/runs the actual model; never mocks vectors.
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

function pdfFixture(lines) {
  const objects = ["<< /Type /Catalog /Pages 2 0 R >>", "", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"];
  const pages = [];
  for (const line of lines) {
    const page = objects.length + 1, stream = page + 1;
    pages.push(`${page} 0 R`);
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${stream} 0 R >>`);
    const data = `BT /F1 12 Tf 50 700 Td (${line.replace(/[\\()]/g, "\\$&")}) Tj ET\n`;
    objects.push(`<< /Length ${Buffer.byteLength(data)} >>\nstream\n${data}endstream`);
  }
  objects[1] = `<< /Type /Pages /Kids [${pages.join(" ")}] /Count ${pages.length} >>`;
  let pdf = "%PDF-1.4\n", offsets = [0];
  objects.forEach((object, index) => { offsets.push(Buffer.byteLength(pdf)); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  pdf += offsets.slice(1).map(offset => String(offset).padStart(10, "0") + " 00000 n \n").join("");
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf);
}

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
  assert.match(observations.build, /2026-10-12-r26/);
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
  assert.match(report, /PDF page 2/); assert.match(report, /2026-10-12-r26/);
  const downloadPending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download local Markdown evidence report" }).click();
  const download = await downloadPending;
  const downloadedReport = await fs.readFile(await download.path(), "utf8");
  assert.match(downloadedReport, /PDF page 2/);
  assert.match(downloadedReport, /2026-10-12-r26/);
  if (evidenceDir) await download.saveAs(path.join(evidenceDir, "keyword-evidence-export.md"));
  observations.keywordAnswer = answer;
  observations.keywordReport = report;
  await snapshot(page, "01-keyword-pdf-page-citation");
  await page.locator(".open-pdf-page").click();
  await page.waitForFunction(() => document.querySelector(".pdf-preview [role=status]")?.textContent.includes("PDF page 2 of 3"));
  assert.ok(await page.locator(".pdf-preview canvas").evaluate(canvas => canvas.width > 0 && canvas.height > 0));
  await snapshot(page, "02-original-page-preview");
  await page.getByRole("button", { name: "Next page", exact: true }).click();
  await page.waitForFunction(() => document.querySelector(".pdf-preview [role=status]")?.textContent.includes("PDF page 3 of 3"));
  assert.equal(await page.getByRole("button", { name: "Next page", exact: true }).isDisabled(), true);
  await page.getByRole("button", { name: "Previous page", exact: true }).click();
  await page.waitForFunction(() => document.querySelector(".pdf-preview [role=status]")?.textContent.includes("PDF page 2 of 3"));
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
