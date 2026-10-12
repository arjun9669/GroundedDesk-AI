import { revealControl } from "./fixtures/workspace-ui.mjs";
// Synthetic feature coverage of lexical workflows, not a factual-accuracy benchmark.
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { pdfFixture } from "./fixtures/pdf-fixture.mjs";

const evidenceDir = process.env.EVIDENCE_DIR;
if (evidenceDir) await fs.mkdir(evidenceDir, { recursive: true });
const observations = { kind: "Synthetic lexical Research/Comparison page-navigation smoke", model: "These workflows use lexical retrieval; no MiniLM or Qwen", cases: [] };
let browser, page;
const errors = [], failedRequests = [];
try {
  browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
  observations.browser = browser.version();
  const context = await browser.newContext({ viewport: { width: 1400, height: 1000 }, permissions: ["clipboard-read", "clipboard-write"] });
  await context.route("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/**", async route => {
    const name = new URL(route.request().url()).pathname.split("/").pop();
    await route.fulfill({ path: path.resolve("node_modules/pdfjs-dist/build", name), contentType: "text/javascript", headers: { "access-control-allow-origin": "*" } });
  });
  page = await context.newPage();
  page.on("pageerror", error => errors.push(error.message));
  page.on("requestfailed", request => failedRequests.push({ url: request.url(), failure: request.failure()?.errorText }));
  await page.goto(process.env.TEST_URL || "http://127.0.0.1:8765/", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#doc-count")?.textContent === "3");
  observations.build = await page.locator("#retrieval-build").innerText();
  assert.match(observations.build, /2026-10-12-r36/);
  await page.locator("#clear-docs").click();
  const fixture = (name, pages) => ({ name, mimeType: "application/pdf", buffer: pdfFixture(pages) });
  const workshop = fixture("workshop-release.pdf", [
    "G-01 Release. Workshop release needs approval from the Safety Lead.",
    "G-02 Evidence. Before release, assemble a risk register and rollback plan.",
    "G-03 Privacy. Release documents must omit private identifiers.",
  ]);
  const supplier = fixture("supplier-release.pdf", ["Supplier handbook.",
    "S-01 Release. Supplier release needs approval from the Procurement Lead.",
    "S-02 Evidence. Before release, assemble supplier assessment and rollback plan."]);
  await page.locator("#file-input").setInputFiles([workshop, supplier]);
  await page.waitForFunction(() => document.querySelector("#doc-count")?.textContent === "2");
  if (evidenceDir) for (const file of [workshop, supplier]) await fs.writeFile(path.join(evidenceDir, file.name), file.buffer);

  async function capture(id) {
    await page.locator("#research-copy").click();
    const report = await page.evaluate(() => navigator.clipboard.readText());
    assert.match(report, /2026-10-12-r36/);
    const result = { id, displayed: await page.locator("#research-result-body").innerText(), report };
    observations.cases.push(result);
    if (evidenceDir) {
      await fs.writeFile(path.join(evidenceDir, id + ".md"), report);
      await page.screenshot({ path: path.join(evidenceDir, id + ".png"), fullPage: false });
    }
    return result;
  }
  async function compare(left, topic) {
    await revealControl(page, "#compare-left");
    await page.locator("#compare-left").selectOption({ label: left });
    await page.locator("#compare-right").selectOption({ label: supplier.name });
    await page.locator("#compare-topic").fill(topic);
    await page.locator("#run-comparison").click();
    await page.locator("#research-result-title").getByText("Side-by-side excerpts", { exact: true }).waitFor({ state: "visible" });
  }
  await compare(workshop.name, "Compare workshop and supplier release approval.");
  const compared = await capture("01-comparison");
  assert.match(compared.displayed, /Safety Lead/); assert.match(compared.displayed, /Procurement Lead/);
  const cards = page.locator(".research-evidence");
  assert.equal(await cards.count(), 2);
  assert.match(await cards.nth(0).innerText(), /PDF page 1/);
  assert.match(await cards.nth(1).innerText(), /PDF page 2/);
  await cards.nth(1).getByRole("button", { name: "Open supplier-release.pdf, PDF page 2", exact: true }).click();
  await page.waitForFunction(() => document.querySelector(".pdf-preview [role=status]")?.textContent.includes("PDF page 2 of 3"));
  assert.equal(await page.locator(".pdf-preview h3").innerText(), supplier.name);
  // This excerpt omits the section heading inside the same PDF text run.
  // Preserve the exact excerpt and require fallback rather than marking the heading.
  assert.equal(await page.locator(".pdf-highlight-status").getAttribute("data-match-status"), "partial-run");
  assert.equal(await page.locator(".pdf-highlight-overlay rect").count(), 0);
  assert.equal(await page.locator(".pdf-preview-quote").textContent(), await cards.nth(1).locator(".research-evidence-text").innerText());
  observations.comparisonPreview = { quote: await page.locator(".pdf-preview-quote").textContent(), message: await page.locator(".pdf-highlight-status").innerText(), regions: 0, status: "partial-run" };
  if (evidenceDir) await page.screenshot({ path: path.join(evidenceDir, "02-comparison-original-page.png") });
  await page.getByRole("button", { name: "Close PDF", exact: true }).click();
  const pending = page.waitForEvent("download");
  await page.locator("#research-download").click();
  const download = await pending;
  const downloaded = await fs.readFile(await download.path(), "utf8");
  assert.match(downloaded, /PDF page 1/); assert.match(downloaded, /PDF page 2/);
  if (evidenceDir) await download.saveAs(path.join(evidenceDir, "comparison-download.md"));

  await revealControl(page, "#research-query");
  await page.locator("#research-query").fill("Who approves release?");
  await page.locator("#run-research").click();
  const research = await capture("03-research");
  assert.match(research.report, /Quotation location/);
  assert.equal(await page.locator("#research-result-body .open-pdf-page").count(), 2);

  await revealControl(page, "#policy-document");
  await page.locator("#policy-document").selectOption({ label: workshop.name });
  await page.locator("#policy-query").fill("What is needed before workshop release?");
  await page.locator("#run-policy-research").click();
  const sections = await capture("04-policy-sections");
  assert.match(sections.report, /PDF page 1/); assert.match(sections.report, /PDF page 2/);
  assert.ok(await page.locator("#research-result-body .open-pdf-page").count() >= 2);

  await revealControl(page, "#checklist-document");
  await page.locator("#checklist-document").selectOption({ label: workshop.name });
  await page.locator("#checklist-query").fill("What is needed before workshop release?");
  await page.locator("#run-policy-checklist").click();
  const checklist = await capture("05-policy-inventory");
  assert.match(checklist.report, /PDF page 1/); assert.match(checklist.report, /PDF page 2/);
  assert.ok(await page.locator("#research-result-body .open-pdf-page").count() >= 2);

  const cross = fixture("cross-page-release.pdf", ["G-01 Release authority Workshop release requires approval from", "the Safety Lead. G-02 Evidence Before release assemble a risk register."]);
  if (evidenceDir) await fs.writeFile(path.join(evidenceDir, cross.name), cross.buffer);
  await page.locator("#file-input").setInputFiles(cross);
  await page.waitForFunction(() => document.querySelector("#doc-count")?.textContent === "3");
  assert.equal(await page.locator("#research-results").isVisible(), false);
  await revealControl(page, "#checklist-document");
  await page.locator("#checklist-document").selectOption({ label: cross.name });
  await page.locator("#checklist-query").fill("What approval is needed before release?");
  await page.locator("#run-policy-checklist").click();
  const crossPage = await capture("06-cross-page-inventory");
  assert.match(crossPage.report, /PDF pages 1, 2/);

  await compare(workshop.name, "quasar zoology");
  const unsupported = await capture("07-missing-comparison");
  assert.equal(await page.locator("#research-result-body .open-pdf-page").count(), 0);
  assert.equal(await page.locator("#research-result-body .source-location").count(), 0);
  assert.doesNotMatch(unsupported.report, /Quotation location/);
  assert.match(unsupported.report, /No matching passage/);

  const repeated = fixture("repeated-release.pdf", ["Release approval belongs to the Safety Lead.", "Release approval belongs to the Safety Lead."]);
  if (evidenceDir) await fs.writeFile(path.join(evidenceDir, repeated.name), repeated.buffer);
  await page.locator("#file-input").setInputFiles(repeated);
  await page.waitForFunction(() => document.querySelector("#doc-count")?.textContent === "4");
  await compare(repeated.name, "release approval");
  const ambiguous = await capture("08-ambiguous-comparison");
  assert.match(ambiguous.report, /ambiguous/);
  assert.equal(await page.locator(".research-evidence").nth(0).locator(".open-pdf-page").count(), 0);
  assert.equal(await page.locator(".research-evidence").nth(1).locator(".open-pdf-page").count(), 1);
  assert.equal(await page.locator("#answer-mode").inputValue(), "extractive");
  assert.deepEqual(errors, []);
  observations.status = "PASS";
  console.log(JSON.stringify(observations, null, 2));
} catch (error) {
  observations.status = "FAIL"; observations.error = error.stack;
  observations.pageErrors = errors; observations.failedRequests = failedRequests;
  if (evidenceDir && page) await page.screenshot({ path: path.join(evidenceDir, "failure.png") });
  throw error;
} finally {
  if (evidenceDir) await fs.writeFile(path.join(evidenceDir, "research-browser-observations.json"), JSON.stringify(observations, null, 2));
  await browser?.close();
}
