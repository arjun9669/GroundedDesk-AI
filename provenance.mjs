// Coordinates refer to the same whitespace-normalized extraction used by retrieval.
// A verified location is mechanical provenance, not a judgment of factual support.
export const canonicalText = text => String(text).replace(/\r\n?/g, "\n").replace(/[ \t]+/g, " ").trim();
const normalize = text => String(text).replace(/\r\n?/g, "\n").replace(/[ \t]+/g, " ");

export function pdfPageMap(pageTexts) {
  if (!Array.isArray(pageTexts) || !pageTexts.length || !pageTexts.every(p => typeof p === "string")) {
    throw new TypeError("PDF page text is required");
  }
  const pages = pageTexts.map(normalize);
  const joined = pages.join("\n\n");
  const leading = joined.length - joined.trimStart().length;
  const text = joined.trim();
  let cursor = 0;
  const ranges = pages.map((page, index) => {
    const start = Math.min(text.length, Math.max(0, cursor - leading));
    cursor += page.length;
    const end = Math.min(text.length, Math.max(0, cursor - leading));
    cursor += 2;
    return { page: index + 1, start, end };
  });
  return { text, ranges };
}

function* occurrences(text, needle) {
  for (let start = text.indexOf(needle); start !== -1; start = text.indexOf(needle, start + 1)) yield start;
}

// Policy inventory historically collapses all whitespace, including page joins.
// Retain a reverse map so its existing quotes can locate the original extraction.
function collapsedProjection(text) {
  let projected = "";
  const starts = [], ends = [];
  for (const match of text.matchAll(/\s+|\S/gu)) {
    if (/^\s/.test(match[0])) {
      projected += " "; starts.push(match.index); ends.push(match.index + match[0].length);
    } else {
      projected += match[0];
      for (let i = 0; i < match[0].length; i++) { starts.push(match.index + i); ends.push(match.index + i + 1); }
    }
  }
  return { text: projected, starts, ends };
}

export function locateEvidence(doc, source, { collapseWhitespace = false } = {}) {
  const unavailable = reason => ({ status: "unavailable", reason });
  if (!doc || doc.id !== source?.documentId || doc.name !== source?.filename ||
      typeof source.quote !== "string" || !source.quote || typeof source.excerpt !== "string" ||
      !source.excerpt.includes(source.quote)) return unavailable("Source identity or quotation could not be verified.");
  const original = canonicalText(doc.text);
  const projection = collapseWhitespace ? collapsedProjection(original) : null;
  const text = projection?.text ?? original;
  // Context disambiguates repeated quotations; repeated context is never guessed.
  const starts = new Set();
  for (const anchor of occurrences(text, source.excerpt)) {
    for (const offset of occurrences(source.excerpt, source.quote)) {
      starts.add(anchor + offset);
      if (starts.size > 1) return { status: "ambiguous", reason: "Quotation and context occur more than once." };
    }
  }
  if (!starts.size) return unavailable("Quotation context was not found in the loaded text.");
  if (starts.size !== 1) return { status: "ambiguous", reason: "Quotation and context occur more than once." };
  const anchor = [...starts][0];
  const start = projection ? projection.starts[anchor] : anchor;
  const end = projection ? projection.ends[anchor + source.quote.length - 1] : anchor + source.quote.length;
  const normalization = collapseWhitespace ? { normalization: "collapsed-whitespace" } : {};
  if (doc.type === "pdf") {
    if (!doc.pdfPageTexts) return unavailable("PDF page metadata was not retained.");
    let map;
    try { map = pdfPageMap(doc.pdfPageTexts); } catch { return unavailable("Invalid PDF page metadata."); }
    if (map.text !== original) return unavailable("PDF page metadata does not match the loaded text.");
    const pages = map.ranges.filter(p => p.start < end && p.end > start && p.end > p.start).map(p => p.page);
    if (!pages.length) return unavailable("Quotation does not intersect extractable page text.");
    return { status: "verified", kind: "pdf", start, end, pages, ...normalization };
  }
  const lineStart = original.slice(0, start).split("\n").length;
  const lineEnd = original.slice(0, end - 1).split("\n").length;
  return { status: "verified", kind: "text", start, end, lineStart, lineEnd, ...normalization };
}

export function locationLabel(location) {
  if (location?.status !== "verified") return `Location ${location?.status || "unavailable"}: ${location?.reason || "No metadata recorded."}`;
  if (location.kind === "pdf") return "PDF page" + (location.pages.length > 1 ? "s " : " ") + location.pages.join(", ") + " (physical page numbers)";
  return "Text line" + (location.lineStart === location.lineEnd ? ` ${location.lineStart}` : `s ${location.lineStart}–${location.lineEnd}`) + " (normalized extraction)";
}

export function attachLocations(result, documents) {
  const byId = new Map(documents.map(doc => [doc.id, doc]));
  return { ...result, sources: result.sources.map(source => ({ ...source, location: locateEvidence(byId.get(source.documentId), source) })) };
}

const workflowSource = (result, source) => result.kind === "comparison" ? { ...source, quote: source.excerpt } : source;
const workflowOptions = result => ({ collapseWhitespace: result.kind === "policy-checklist" });

export function attachWorkflowLocations(result, documents) {
  const byId = new Map(documents.map(doc => [doc.id, doc]));
  return { ...result, sources: result.sources.map(source => {
    if (result.kind === "comparison" && source.supported === false && source.excerpt === "") return { ...source };
    return { ...source, location: locateEvidence(byId.get(source.documentId), workflowSource(result, source), workflowOptions(result)) };
  }) };
}

// Research permits several numbered passages from one document. Its guard must
// not relax main Q&A's separate one-citation-per-document rule.
export function verifyWorkflowEvidence(result, documents) {
  const limits = { research: 6, comparison: 2, "policy-research": 8, "policy-checklist": 24 };
  if (!result || !Array.isArray(result.sources) || !Array.isArray(documents) ||
      !Object.hasOwn(limits, result.kind) || result.sources.length > limits[result.kind]) return { ok: false, reason: "Invalid research evidence collection" };
  const byId = new Map(documents.map(doc => [doc.id, doc]));
  for (const [i, source] of result.sources.entries()) {
    const doc = byId.get(source?.documentId);
    if (!source || source.citation !== i + 1 || !doc || typeof doc.text !== "string" || doc.name !== source.filename) return { ok: false, reason: "Research source identity or citation numbering mismatch" };
    if (result.kind === "comparison" && source.supported === false && source.excerpt === "") {
      if (source.location) return { ok: false, reason: "Missing comparison evidence cannot have a source location" };
      continue;
    }
    const evidence = workflowSource(result, source);
    const original = result.kind === "policy-checklist" ? canonicalText(doc.text).replace(/\s+/g, " ") : canonicalText(doc.text);
    if (typeof evidence.quote !== "string" || !evidence.quote || typeof evidence.excerpt !== "string" ||
        !evidence.excerpt.includes(evidence.quote) || !original.includes(evidence.excerpt) ||
        (result.kind === "comparison" && source.supported !== true)) return { ok: false, reason: "Research quotation cannot be verified in the loaded document" };
    if (source.location && JSON.stringify(source.location) !== JSON.stringify(locateEvidence(doc, evidence, workflowOptions(result)))) return { ok: false, reason: "Research source location does not match the loaded document" };
  }
  return { ok: true, reason: "Research quotations and asserted locations match loaded documents" };
}

// Legacy callers without location metadata keep the existing formatter API.
// Once locations are asserted, export requires the loaded document collection.
export function assertWorkflowExport(result, documents) {
  if (documents === undefined && !result.sources.some(source => source.location)) return;
  const check = verifyWorkflowEvidence(result, documents);
  if (!check.ok) throw new Error(check.reason);
}
