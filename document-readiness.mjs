import { pdfWarnings } from "./pdf-ingest.mjs?v=20261013-r44";

// Describes extraction only: readable text is not a correctness/confidence score.
export function documentReadiness(doc) {
  if (!doc || typeof doc.text !== "string" || !doc.text.trim()) return {
    state:"unavailable", label:"No readable text", detail:"This file has no loaded text to search.", warnings:[],
    guidance:"Choose a file containing text, or use OCR on your device for a scanned PDF." };
  if (doc.type !== "pdf") return { state:"ready", label:"Text available", detail:"Loaded text is ready to search.", warnings:[], guidance:"" };
  const pages = doc.pdfPageTexts, d = doc.pdfDiagnostics;
  const validList = list => Array.isArray(list) && new Set(list).size === list.length
    && list.every(page => Number.isInteger(page) && page >= 1 && page <= pages.length);
  if (!Array.isArray(pages) || !pages.length || !pages.every(page => typeof page === "string")
      || !d || d.pageCount !== pages.length || pages.join("\n\n").trim() !== doc.text.trim()
      || !validList(d.emptyPages) || !validList(d.separatedRowsPages)) return {
    state:"unknown", label:"Coverage not checked", detail:"PDF extraction details are unavailable or inconsistent.", warnings:[],
    guidance:"Review the original PDF or replace this file to check its text coverage." };
  const missing = pages.map((text, i) => text.trim() ? null : i + 1).filter(Boolean);
  const searchable = pages.length - missing.length;
  if (d.searchablePages !== searchable || missing.length !== d.emptyPages.length
      || missing.some(page => !d.emptyPages.includes(page))) return {
    state:"unknown", label:"Coverage not checked", detail:"PDF extraction details are unavailable or inconsistent.", warnings:[],
    guidance:"Review the original PDF or replace this file to check its text coverage." };
  const limited = missing.length > 0 || d.separatedRowsPages.length > 0;
  return { state:limited ? "limited" : "ready",
    label:missing.length ? "Partial text coverage" : d.separatedRowsPages.length ? "Review layout" : "Text available",
    detail:`${searchable} of ${pages.length} PDF pages contain searchable text.`, warnings:pdfWarnings(d),
    guidance:missing.length ? "Review the original PDF. If text is missing, use OCR on your device or replace it with a searchable PDF or text version."
      : d.separatedRowsPages.length ? "Check the original PDF before relying on columns or table rows." : "Text extraction does not verify reading order or factual accuracy." };
}
