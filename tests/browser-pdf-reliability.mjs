// Fixed synthetic reliability scenarios. This is not independent answer accuracy.
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { chromium } from "playwright";
import { pdfFixture, pdfLayoutFixture } from "./fixtures/pdf-fixture.mjs";

const evidenceDir = process.env.EVIDENCE_DIR;
const cell = (text, x, y) => ({ text, x, y });
const fixtures = {
  "mixed-pages.pdf": pdfFixture(["Depot hooks require inspection weekly.", "", "Depot lights shut down at sunset."]),
  "repeated-permit.pdf": pdfFixture(["Depot permits require approval from the Shift Lead.", "Depot permits require approval from the Shift Lead."]),
  "cross-page.pdf": pdfFixture(["G-01 Release authority Depot release requires approval from", "the Shift Lead. G-02 Evidence Before release assemble a rollback plan."]),
  "two-columns.pdf": pdfLayoutFixture([{ items: [cell("Day depot", 50, 700), cell("Night depot", 330, 700), cell("Cutoff 14:00", 50, 670), cell("Cutoff 22:00", 330, 670)] }]),
  "table.pdf": pdfLayoutFixture([{ items: [cell("Parcel", 50, 700), cell("Limit", 330, 700), cell("Small box", 50, 670), cell("8 kg", 330, 670), cell("Large box", 50, 640), cell("16 kg", 330, 640)] }]),
  "image-only.pdf": pdfLayoutFixture([{ drawing: "q 200 0 0 200 50 500 cm BI /W 2 /H 2 /BPC 8 /CS /RGB /F /AHx ID 000000FFFFFF000000FFFFFF> EI Q\n" }]),
  "damaged.pdf": Buffer.from("This is intentionally not a valid PDF."),
};
const cases = [
  { id: "mixed-pages", file: "mixed-pages.pdf", question: "When do depot lights shut down?", expected: "Quote sunset on physical page 3; page 2 missing-text notice in UI/export" },
  { id: "repeated", file: "repeated-permit.pdf", question: "Who approves depot permits?", expected: "Ambiguous location, no PDF page link" },
  { id: "cross-page", file: "cross-page.pdf", question: "What approval is needed before depot release?", expected: "Lexical inventory quotation spans physical pages 1 and 2" },
  { id: "columns", file: "two-columns.pdf", expected: "Layout caution and original-page preview; column meaning/order NOT reconstructed" },
  { id: "table", file: "table.pdf", expected: "Layout caution; row/cell associations NOT guaranteed" },
  { id: "image-only", file: "image-only.pdf", expected: "No document indexed; scanned/empty OCR guidance" },
  { id: "damaged", file: "damaged.pdf", expected: "No document indexed; named-file damaged-PDF guidance" },
];
// The encrypted fixture is checked in separately; its only purpose is error-path coverage.
const lockedPath = "tests/fixtures/locked-depot.pdf";
try { fixtures["locked-depot.pdf"] = await fs.readFile(lockedPath); cases.push({ id: "locked", file: "locked-depot.pdf", expected: "No document indexed; unlock-copy guidance; no password entry" }); }
catch (error) { if (error.code !== "ENOENT") throw error; throw new Error("Missing required encrypted PDF fixture"); }
const frozen = { classification: "Synthetic feature reliability regression, not independent factual accuracy", cases,
  hashes: Object.fromEntries(Object.entries(fixtures).map(([name, bytes]) => [name, createHash("sha256").update(bytes).digest("hex")])) };
if (evidenceDir) {
  await fs.mkdir(evidenceDir, { recursive: true });
  await fs.writeFile(path.join(evidenceDir, "pre-test-manifest.json"), JSON.stringify(frozen, null, 2));
  for (const [name, bytes] of Object.entries(fixtures)) await fs.writeFile(path.join(evidenceDir, name), bytes);
}
let browser, page;
const observed = { classification: frozen.classification, cases: [] };
const errors = [];
try {
  browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
  observed.browser = browser.version();
  const context = await browser.newContext({ viewport: { width: 1400, height: 1000 }, permissions: ["clipboard-read", "clipboard-write"] });
  await context.route("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/**", async route => {
    await route.fulfill({ path: path.resolve("node_modules/pdfjs-dist/build", new URL(route.request().url()).pathname.split("/").pop()), contentType: "text/javascript", headers: { "access-control-allow-origin": "*" } });
  });
  page = await context.newPage(); page.on("pageerror", error => errors.push(error.message));
  await page.goto(process.env.TEST_URL || "http://127.0.0.1:8765/", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#doc-count")?.textContent === "3");
  observed.build = await page.locator("#retrieval-build").innerText(); assert.match(observed.build, /2026-10-12-r30/);
  for (const test of cases) {
    await page.locator("#clear-docs").click();
    await page.locator("#file-input").setInputFiles({ name: test.file, mimeType: "application/pdf", buffer: fixtures[test.file] });
    await page.waitForFunction(() => /^\d file\(s\) added\./.test(document.querySelector("#alert")?.textContent));
    const record = { ...test, alert: await page.locator("#alert").innerText(), library: await page.locator("#document-list").innerText() };
    assert.equal(await page.locator("#upload-status").innerText(), record.alert);
    if (["image-only", "damaged", "locked"].includes(test.id)) {
      assert.equal(await page.locator("#doc-count").innerText(), "0");
      assert.ok(record.alert.includes(test.file));
      assert.match(record.alert, test.id === "image-only" ? /may be scanned or empty.*OCR/ : test.id === "damaged" ? /damaged.*fresh PDF/ : /password-protected.*Unlock a copy/);
    } else {
      assert.equal(await page.locator("#doc-count").innerText(), "1");
      if (test.id === "cross-page") {
        await page.locator("#checklist-query").fill(test.question);
        await page.locator("#run-policy-checklist").click();
        record.displayed = await page.locator("#research-result-body").innerText();
        assert.match(record.displayed, /PDF pages 1, 2/);
      } else if (test.question) {
        await page.locator("#query-input").fill(test.question); await page.locator("#ask-button").click();
        record.displayed = await page.locator("#answer-result").innerText();
        if (test.id === "mixed-pages") {
          assert.match(record.displayed, /sunset/); assert.match(record.displayed, /PDF page 3/);
          assert.match(record.library, /pages 2 have no searchable text/);
          await page.getByRole("button", { name: "Copy answer and evidence report" }).click();
          record.report = await page.evaluate(() => navigator.clipboard.readText()); assert.match(record.report, /PDF coverage/);
        } else {
          assert.match(record.displayed, /ambiguous/); assert.equal(await page.locator(".open-pdf-page").count(), 0);
        }
      } else {
        assert.match(record.library, /layout caution.*pages 1.*not reconstructed/);
        // Original inspection is available even when retrieval cannot answer.
        // No column interpretation or table association is asserted or graded.
        await page.getByRole("button", { name: `View original PDF ${test.file}`, exact: true }).click();
        await page.waitForFunction(() => document.querySelector(".pdf-preview [role=status]")?.textContent.includes("PDF page 1 of 1"));
        if (evidenceDir) await page.screenshot({ path: path.join(evidenceDir, test.id + "-original.png") });
        await page.getByRole("button", { name: "Close PDF", exact: true }).click();
        record.layoutInterpretation = "Not supported; extraction follows content-stream order. Original PDF inspection is required.";
      }
    }
    record.status = "PASS"; observed.cases.push(record);
    if (evidenceDir) {
      await page.locator("#file-input").evaluate(input => input.closest(".library").scrollIntoView({ block: "start" }));
      await page.screenshot({ path: path.join(evidenceDir, test.id + ".png") });
    }
  }
  assert.deepEqual(errors, []); observed.status = "PASS"; console.log(JSON.stringify(observed, null, 2));
} catch (error) {
  observed.status = "FAIL"; observed.error = error.stack; observed.pageErrors = errors;
  if (page && evidenceDir) await page.screenshot({ path: path.join(evidenceDir, "failure.png") });
  throw error;
} finally {
  if (evidenceDir) await fs.writeFile(path.join(evidenceDir, "reliability-observations.json"), JSON.stringify(observed, null, 2));
  await browser?.close();
}
