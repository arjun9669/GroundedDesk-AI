import test from "node:test";
import assert from "node:assert/strict";
import { canonicalText, pdfPageMap, locateEvidence, attachLocations, locationLabel } from "../provenance.mjs";
import { verifyEvidenceResult } from "../quality.mjs";
import { createEvidenceReport } from "../report.mjs";
import { buildIndex, answerQuestion } from "../retrieval.mjs";

const pdf = pages => ({ id: "p", name: "workshop.pdf", type: "pdf", text: pages.join("\n\n").trim(), pdfPageTexts: pages });
const source = (quote, excerpt = quote) => ({ documentId: "p", filename: "workshop.pdf", quote, excerpt, citation: 1, score: 2 });

test("page maps preserve existing retrieval normalization including blank pages", () => {
  const pages = ["  Start  here.\r\n", "", "  Final\tchapter.  "];
  const map = pdfPageMap(pages);
  assert.equal(map.text, canonicalText(pages.join("\n\n")));
  const doc = pdf(pages);
  assert.deepEqual(locateEvidence(doc, source("Final chapter.")).pages, [3]);
  assert.deepEqual(locateEvidence(doc, source("Start here.")).pages, [1]);
});

test("quotations spanning page boundaries list both physical pages", () => {
  const loc = locateEvidence(pdf(["Start", "finish."]), source("Start\n\nfinish."));
  assert.deepEqual(loc.pages, [1, 2]);
  assert.equal(loc.start, 0); assert.equal(loc.end, 14);
});

test("repeated quote is ambiguous rather than choosing the first page", () => {
  assert.equal(locateEvidence(pdf(["Repeat.", "Repeat."]), source("Repeat.")).status, "ambiguous");
});

test("unique surrounding excerpt disambiguates a repeated quotation", () => {
  const loc = locateEvidence(pdf(["Morning. Repeat.", "Evening. Repeat."]), source("Repeat.", "Evening. Repeat."));
  assert.deepEqual(loc.pages, [2]);
});

test("repeated quotations inside a unique excerpt remain ambiguous", () => {
  assert.equal(locateEvidence(pdf(["Repeat. Repeat. End."]), source("Repeat.", "Repeat. Repeat. End.")).status, "ambiguous");
});

test("inconsistent or missing page metadata cannot invent page numbers", () => {
  const doc = pdf(["Actual sentence."]); doc.pdfPageTexts = ["Other sentence."];
  assert.equal(locateEvidence(doc, source("Actual sentence.")).status, "unavailable");
  delete doc.pdfPageTexts;
  assert.equal(locateEvidence(doc, source("Actual sentence.")).status, "unavailable");
});

test("filename, document identity and quote context must all match", () => {
  const doc = pdf(["Actual sentence."]);
  for (const forged of [{ ...source("Actual sentence."), filename: "other.pdf" }, source("Made up."), { ...source("Actual sentence."), documentId: "other" }]) {
    assert.equal(locateEvidence(doc, forged).status, "unavailable");
  }
});

test("TXT uses normalized text lines, never PDF pages", () => {
  const doc = { id: "p", name: "workshop.pdf", type: "txt", text: "Heading\r\nStart\r\nfinish." };
  const loc = locateEvidence(doc, source("Start\nfinish."));
  assert.equal(loc.kind, "text"); assert.equal(loc.lineStart, 2); assert.equal(loc.lineEnd, 3);
  assert.ok(!("pages" in loc));
  assert.match(locationLabel(loc), /Text lines 2–3/);
});

test("new metadata leaves retrieval answers, ranking and index contents unchanged", () => {
  const doc = pdf(["Workshop cranes require inspection every eight shifts.", "Workshop cranes must stop during a lightning alert."]);
  const without = { ...doc }; delete without.pdfPageTexts;
  assert.deepEqual(buildIndex([doc]), buildIndex([without]));
  assert.deepEqual(answerQuestion("When must workshop cranes stop?", buildIndex([doc])), answerQuestion("When must workshop cranes stop?", buildIndex([without])));
});

test("page metadata is verified for UI and portable reports; forged page rejected", () => {
  const doc = pdf(["Heading.", "Workshop cranes must stop during a lightning alert."]);
  const original = { answered: true, sources: [source(doc.pdfPageTexts[1])], mode: "test", retrievalBuild: "test" };
  const result = attachLocations(original, [doc]);
  assert.ok(!original.sources[0].location);
  assert.equal(verifyEvidenceResult(result, [doc]).ok, true);
  assert.match(createEvidenceReport("When must cranes stop?", result, [doc]), /PDF page 2/);
  result.sources[0].location.pages = [1];
  assert.equal(verifyEvidenceResult(result, [doc]).ok, false);
  assert.throws(() => createEvidenceReport("When?", result, [doc]), /location could not be verified/);
});

test("refusals remain citation-free after metadata attachment", () => {
  const result = attachLocations({ answered: false, sources: [], answer: "No evidence." }, []);
  assert.deepEqual(result.sources, []);
  assert.equal(verifyEvidenceResult(result, []).ok, true);
});
