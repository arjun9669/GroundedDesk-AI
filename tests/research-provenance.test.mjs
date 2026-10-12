import test from "node:test";
import assert from "node:assert/strict";
import { attachWorkflowLocations, verifyWorkflowEvidence } from "../provenance.mjs";
import { compareDocuments, buildResearchResult, buildPolicyResearchResult, formatResearchMarkdown } from "../research.mjs";
import { buildPolicyChecklist, formatPolicyChecklistMarkdown } from "../policy-synthesis.mjs";
import { verifyEvidenceResult } from "../quality.mjs";

const pdf = (id, pages) => ({ id, name: id + ".pdf", type: "pdf", text: pages.join("\n\n"), pdfPageTexts: pages });
const workshop = pdf("workshop", [
  "G-01 Release. Workshop release needs approval from the Safety Lead.",
  "G-02 Evidence. Before release, assemble a risk register and rollback plan.",
  "G-03 Privacy. Release documents must omit private identifiers.",
]);
const supplier = pdf("supplier", ["Supplier handbook.",
  "S-01 Release. Supplier release needs approval from the Procurement Lead.",
  "S-02 Evidence. Before release, assemble supplier assessment and rollback plan."]);
const docs = [workshop, supplier];
const enrich = result => attachWorkflowLocations({ ...result, retrievalBuild: "test-r27" }, docs);

test("Comparison locations use the displayed excerpts from the two selected files", () => {
  const original = compareDocuments(...docs, "Compare workshop and supplier release approval.");
  const result = enrich(original);
  assert.equal(verifyWorkflowEvidence(result, docs).ok, true);
  assert.deepEqual(result.sources.map(source => source.location.pages), [[1], [2]]);
  assert.deepEqual(result.sources.map(source => source.excerpt), original.sources.map(source => source.excerpt));
  const report = formatResearchMarkdown(result, docs);
  assert.match(report, /PDF page 1/); assert.match(report, /PDF page 2/); assert.match(report, /`test-r27`/);
});

test("missing Comparison matches keep no location or invented quotation", () => {
  const result = enrich(compareDocuments(...docs, "quasar zoology"));
  assert.ok(result.sources.every(source => !source.supported && !source.location && !source.excerpt));
  assert.equal(verifyWorkflowEvidence(result, docs).ok, true);
  assert.doesNotMatch(formatResearchMarkdown(result, docs), /PDF page|Quotation location/);
  result.sources[0].location = { status: "verified", kind: "pdf", pages: [1] };
  assert.equal(verifyWorkflowEvidence(result, docs).ok, false);
});

test("Research adds locations without changing quotations or coverage", () => {
  const original = buildResearchResult("Who approves release?", docs);
  const result = enrich(original);
  assert.equal(verifyWorkflowEvidence(result, docs).ok, true);
  assert.ok(result.sources.length);
  assert.deepEqual(result.sources.map(source => source.quote), original.sources.map(source => source.quote));
  assert.equal(result.matchedDocuments, original.matchedDocuments);
  assert.match(formatResearchMarkdown(result, docs), /Quotation location/);
});

test("multi-section policy and checklist may cite the same document repeatedly", () => {
  for (const original of [buildPolicyResearchResult("What is needed before workshop release?", workshop), buildPolicyChecklist("What is needed before workshop release?", workshop)]) {
    const result = enrich(original);
    assert.ok(result.sources.length >= 2);
    assert.equal(verifyWorkflowEvidence(result, docs).ok, true);
    const report = result.kind === "policy-checklist" ? formatPolicyChecklistMarkdown(result, docs) : formatResearchMarkdown(result, docs);
    assert.match(report, /PDF page 1/); assert.match(report, /PDF page 2/);
    // Ordinary Q&A retains its stricter duplicate-document safeguard.
    assert.equal(verifyEvidenceResult(result, docs).ok, false);
  }
});

test("checklist collapsed whitespace maps a cross-page quote back to both original pages", () => {
  const doc = pdf("cross-page", ["G-01 Release authority Workshop release requires approval from", "the Safety Lead. G-02 Evidence Before release assemble a risk register."]);
  const original = buildPolicyChecklist("What approval is needed before release?", doc);
  const result = attachWorkflowLocations(original, [doc]);
  const quote = result.sources.find(source => source.quote.includes("Safety Lead"));
  assert.ok(quote); assert.deepEqual(quote.location.pages, [1, 2]);
  assert.equal(quote.location.normalization, "collapsed-whitespace");
  assert.equal(verifyWorkflowEvidence(result, [doc]).ok, true);
  assert.match(formatPolicyChecklistMarkdown(result, [doc]), /PDF pages 1, 2/);
  assert.deepEqual(result.sources.map(source => source.quote), original.sources.map(source => source.quote));
});

test("collapsed whitespace handles Unicode and maps TXT original normalized lines", () => {
  const doc = { id: "unicode", name: "unicode.md", type: "txt", text: "G-01 Release authority 🏗 requires approval from\n\nthe Safety Lead." };
  const result = attachWorkflowLocations(buildPolicyChecklist("release approval", doc), [doc]);
  assert.equal(result.sources[0].location.lineStart, 1); assert.equal(result.sources[0].location.lineEnd, 3);
  assert.equal(verifyWorkflowEvidence(result, [doc]).ok, true);
});

test("Research exports refuse forged locations, lost documents, changed source text and missing verifier input", () => {
  const result = enrich(compareDocuments(...docs, "release approval"));
  assert.throws(() => formatResearchMarkdown(result), /Invalid research evidence/);
  assert.throws(() => formatResearchMarkdown(result, [supplier]), /identity/);
  assert.throws(() => formatResearchMarkdown(result, [{ ...workshop, text: "Changed content." }, supplier]), /quotation/);
  const forged = structuredClone(result); forged.sources[0].location.pages = [3];
  assert.throws(() => formatResearchMarkdown(forged, docs), /location/);
  const inventory = enrich(buildPolicyChecklist("release approval", workshop));
  inventory.sources[0].location.pages = [3];
  assert.throws(() => formatPolicyChecklistMarkdown(inventory, docs), /location/);
});

test("repeated comparison passages remain ambiguous, while missing page metadata is unavailable", () => {
  const repeated = pdf("repeat", ["Release approval belongs to the Safety Lead.", "Release approval belongs to the Safety Lead."]);
  const result = attachWorkflowLocations(compareDocuments(repeated, supplier, "release approval"), [repeated, supplier]);
  assert.equal(result.sources[0].location.status, "ambiguous");
  assert.match(formatResearchMarkdown(result, [repeated, supplier]), /ambiguous/);
  const noPages = { ...workshop }; delete noPages.pdfPageTexts;
  const unavailable = attachWorkflowLocations(compareDocuments(noPages, supplier, "release approval"), [noPages, supplier]);
  assert.equal(unavailable.sources[0].location.status, "unavailable");
  assert.equal(verifyWorkflowEvidence(unavailable, [noPages, supplier]).ok, true);
});
