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

function occurrences(text, needle) {
  const found = [];
  for (let start = text.indexOf(needle); start !== -1; start = text.indexOf(needle, start + 1)) found.push(start);
  return found;
}

export function locateEvidence(doc, source) {
  const unavailable = reason => ({ status: "unavailable", reason });
  if (!doc || doc.id !== source?.documentId || doc.name !== source?.filename ||
      typeof source.quote !== "string" || !source.quote || typeof source.excerpt !== "string" ||
      !source.excerpt.includes(source.quote)) return unavailable("Source identity or quotation could not be verified.");
  const text = canonicalText(doc.text);
  // Context disambiguates repeated quotations; repeated context is never guessed.
  const starts = new Set();
  for (const anchor of occurrences(text, source.excerpt)) {
    for (const offset of occurrences(source.excerpt, source.quote)) starts.add(anchor + offset);
  }
  if (!starts.size) return unavailable("Quotation context was not found in the loaded text.");
  if (starts.size !== 1) return { status: "ambiguous", reason: "Quotation and context occur more than once." };
  const start = [...starts][0], end = start + source.quote.length;
  if (doc.type === "pdf") {
    if (!doc.pdfPageTexts) return unavailable("PDF page metadata was not retained.");
    let map;
    try { map = pdfPageMap(doc.pdfPageTexts); } catch { return unavailable("Invalid PDF page metadata."); }
    if (map.text !== text) return unavailable("PDF page metadata does not match the loaded text.");
    const pages = map.ranges.filter(p => p.start < end && p.end > start && p.end > p.start).map(p => p.page);
    if (!pages.length) return unavailable("Quotation does not intersect extractable page text.");
    return { status: "verified", kind: "pdf", start, end, pages };
  }
  const lineStart = text.slice(0, start).split("\n").length;
  const lineEnd = text.slice(0, end - 1).split("\n").length;
  return { status: "verified", kind: "text", start, end, lineStart, lineEnd };
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
