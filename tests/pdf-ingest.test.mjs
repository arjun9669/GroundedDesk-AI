import test from "node:test";
import assert from "node:assert/strict";
import { readPDFFile, pdfWarnings, hasSeparatedRows, pdfErrorMessage } from "../pdf-ingest.mjs";
import { pdfPageMap } from "../provenance.mjs";
import { buildIndex, answerQuestion } from "../retrieval.mjs";

const file = { arrayBuffer: async () => new ArrayBuffer(1) };
function harness(pages, { error, cleanupError } = {}) {
  let destroyed = 0, cleaned = 0;
  return {
    loadLibrary: async () => ({ getDocument: () => ({ promise: error ? Promise.reject(error) : Promise.resolve({ numPages: pages.length,
      getPage: async n => ({ getTextContent: async () => ({ items: pages[n - 1] }), cleanup: () => cleaned++ }) }),
      destroy: async () => { destroyed++; if (cleanupError) throw cleanupError; } }) }),
    stats: () => ({ destroyed, cleaned }),
  };
}
const cell = (str, x, y, width = 65) => ({ str, width, transform: [12, 0, 0, 12, x, y] });

test("ordinary PDF extraction and retrieval stay identical to the previous join behavior", async () => {
  const pages = [[{ str: "Workshop hooks require inspection every eight shifts." }], [{ str: "Workshop lights shut down at sunset." }]];
  const fake = harness(pages);
  const result = await readPDFFile(file, fake);
  const old = pages.map(page => page.map(item => item.str).join(" ")).join("\n\n");
  assert.equal(result.text, old);
  const doc = { id: "x", name: "workshop.pdf", text: old };
  const diagnosticDoc = { ...doc, ...result };
  assert.deepEqual(buildIndex([diagnosticDoc]), buildIndex([doc]));
  assert.deepEqual(answerQuestion("When are workshop hooks inspected?", buildIndex([diagnosticDoc])), answerQuestion("When are workshop hooks inspected?", buildIndex([doc])));
  assert.deepEqual(fake.stats(), { destroyed: 1, cleaned: 2 });
});

test("mixed blank/text PDF retains physical blank-page boundaries and warns about coverage", async () => {
  const result = await readPDFFile(file, harness([[{ str: "First." }], [], [{ str: "Final." }]]));
  assert.deepEqual(result.pdfDiagnostics.emptyPages, [2]);
  assert.equal(result.pdfDiagnostics.searchablePages, 2);
  assert.equal(result.pdfPageTexts[1], "");
  assert.match(pdfWarnings(result.pdfDiagnostics).join(" "), /pages 2 have no searchable text/);
  assert.equal(pdfPageMap(result.pdfPageTexts).ranges[2].page, 3);
});

test("PDF with no searchable text is rejected with actionable, non-assumptive OCR guidance", async () => {
  const fake = harness([[], [{ str: "  " }]]);
  await assert.rejects(readPDFFile(file, fake), /may be scanned or empty.*OCR.*TXT\/Markdown/);
  assert.equal(fake.stats().destroyed, 1);
});

test("damaged and password-protected PDFs have clear messages and always release the loading task", async () => {
  for (const [name, expected] of [["InvalidPDFException", /damaged.*fresh PDF/], ["PasswordException", /password-protected.*Unlock a copy/]]) {
    const error = Object.assign(new Error("opaque parser message"), { name });
    const fake = harness([], { error });
    await assert.rejects(readPDFFile(file, fake), expected);
    assert.equal(fake.stats().destroyed, 1);
  }
  assert.equal(pdfErrorMessage(new Error("Known limit")), "Known limit");
});

test("page and text budgets reject before indexing, including page separator characters", async () => {
  const pageLimit = harness([[], []]);
  await assert.rejects(readPDFFile(file, { ...pageLimit, maxPages: 1 }), /limited to 1 pages.*Split/);
  assert.deepEqual(pageLimit.stats(), { destroyed: 1, cleaned: 0 });
  const textLimit = harness([[{ str: "abc" }], [{ str: "def" }]]);
  await assert.rejects(readPDFFile(file, { ...textLimit, maxChars: 7 }), /exceeds 7 characters/);
  assert.equal(textLimit.stats().destroyed, 1);
});

test("two separated rows flag possible columns or table cells without reordering text", async () => {
  const items = [cell("Day depot", 50, 700), cell("Night depot", 330, 700), cell("Cutoff 14:00", 50, 680), cell("Cutoff 22:00", 330, 680)];
  assert.equal(hasSeparatedRows(items), true);
  const result = await readPDFFile(file, harness([items]));
  assert.equal(result.text, "Day depot Night depot Cutoff 14:00 Cutoff 22:00");
  assert.deepEqual(result.pdfDiagnostics.separatedRowsPages, [1]);
  assert.match(pdfWarnings(result.pdfDiagnostics).join(" "), /may be ambiguous.*not reconstructed/);
  assert.deepEqual(pdfWarnings(result.pdfDiagnostics, [2]), []);
});

test("one spaced heading, adjacent words and missing/invalid geometry do not claim a layout diagnosis", () => {
  assert.equal(hasSeparatedRows([cell("Heading", 50, 700), cell("Page 1", 400, 700)]), false);
  assert.equal(hasSeparatedRows([cell("Line one", 50, 700), cell("continued", 118, 700), cell("Line two", 50, 680), cell("continued", 118, 680)]), false);
  assert.equal(hasSeparatedRows([{ str: "Unknown position" }, { str: "bad", width: NaN, transform: [1, 0, 0, 1, 0, 0] }]), false);
});

test("library and page extraction failures cannot add partial documents", async () => {
  await assert.rejects(readPDFFile(file, { loadLibrary: async () => { throw new Error("Dependency unavailable"); } }), /Dependency unavailable/);
  let destroyed = false;
  const loadLibrary = async () => ({ getDocument: () => ({ promise: Promise.resolve({ numPages: 1, getPage: async () => { throw new Error("Unreadable page"); } }), destroy: async () => { destroyed = true; } }) });
  await assert.rejects(readPDFFile(file, { loadLibrary }), /Unreadable page/);
  assert.equal(destroyed, true);
});
