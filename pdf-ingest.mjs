// Parsing and coverage diagnostics, not OCR or layout reconstruction.
export async function loadPDFLibrary() {
  try {
    const library = await import("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.mjs");
    library.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.mjs";
    return library;
  } catch {
    throw new Error("PDF support could not download. Check your connection, reload this tab, or upload a TXT/Markdown version.");
  }
}

export function pdfErrorMessage(error) {
  if (error?.name === "PasswordException") return "This PDF is password-protected. Unlock a copy on your device, then upload it. No password is requested or stored here.";
  if (error?.name === "InvalidPDFException") return "This PDF is damaged or is not a valid PDF. Export a fresh PDF or use a TXT/Markdown version.";
  return error instanceof Error ? error.message : "The PDF could not be read. Try exporting a fresh copy or uploading its text.";
}

export function hasSeparatedRows(items) {
  const positioned = items.filter(item => typeof item.str === "string" && item.str.trim() &&
    Array.isArray(item.transform) && Number.isFinite(item.transform[4]) && Number.isFinite(item.transform[5]) && Number.isFinite(item.width));
  const rows = new Map();
  for (const item of positioned) {
    const y = item.transform[5];
    const key = Math.round(y / 3);
    let row = [rows.get(key), rows.get(key - 1), rows.get(key + 1)].find(row => row && Math.abs(row.y - y) < 3);
    if (!row) { row = { y, cells: [] }; rows.set(key, row); }
    row.cells.push({ x: item.transform[4], end: item.transform[4] + item.width });
  }
  // Two distinct rows with gaps reduce false alarms from a title/page label.
  return [...rows.values()].filter(row => {
    const cells = row.cells.sort((a, b) => a.x - b.x);
    return cells.some((cell, i) => i > 0 && cell.x - cells[i - 1].end > 40);
  }).length >= 2;
}

export function pdfWarnings(diagnostics, selectedPages) {
  if (!diagnostics) return [];
  const warnings = [];
  if (diagnostics.emptyPages?.length) warnings.push(`PDF coverage: pages ${diagnostics.emptyPages.join(", ")} have no searchable text. They may be blank or scanned; review the original. OCR is not included.`);
  const layout = diagnostics.separatedRowsPages?.filter(page => !selectedPages || selectedPages.includes(page)) || [];
  if (layout.length) warnings.push(`PDF layout caution: pages ${layout.join(", ")} contain widely separated text rows. Column order or table associations may be ambiguous. Check the original; layout is not reconstructed.`);
  return warnings;
}

export async function readPDFFile(file, { loadLibrary = loadPDFLibrary, maxPages = 75, maxChars = 180000, onProgress } = {}) {
  const library = await loadLibrary();
  let task;
  try {
    task = library.getDocument({ data: await file.arrayBuffer() });
    const pdf = await task.promise;
    if (pdf.numPages > maxPages) throw new Error(`PDFs are limited to ${maxPages} pages. Split this file and upload smaller parts.`);
    const pages = [], emptyPages = [], separatedRowsPages = [];
    let total = 0;
    for (let number = 1; number <= pdf.numPages; number++) {
      const page = await pdf.getPage(number);
      const content = await page.getTextContent();
      const text = content.items.map(item => typeof item.str === "string" ? item.str : "").join(" ");
      total += text.length;
      if (total + Math.max(0, number - 1) * 2 > maxChars) throw new Error(`Extracted PDF text exceeds ${maxChars.toLocaleString("en-US")} characters. Split the document or upload a shorter text version.`);
      if (!text.trim()) emptyPages.push(number);
      if (hasSeparatedRows(content.items)) separatedRowsPages.push(number);
      pages.push(text);
      page.cleanup?.();
      onProgress?.(number, pdf.numPages);
    }
    if (!pages.some(page => page.trim())) throw new Error("No searchable text was found in this PDF. It may be scanned or empty. Use OCR on your device or upload a TXT/Markdown version. OCR is not included here.");
    return { text: pages.join("\n\n"), pdfPageTexts: pages,
      pdfDiagnostics: { pageCount: pages.length, searchablePages: pages.length - emptyPages.length, emptyPages, separatedRowsPages } };
  } catch (error) {
    throw new Error(pdfErrorMessage(error));
  } finally {
    await task?.destroy();
  }
}
