// Original files stay in memory. Render only the selected page; never upload it.
import { loadPDFLibrary, pdfErrorMessage } from "./pdf-ingest.mjs?v=20261013-r42";
import { quotationRegions, highlightMessage } from "./pdf-highlight.mjs?v=20261013-r42";
let active = null;

export function closePDFPreview({ restoreFocus = true } = {}) {
  if (!active) return;
  const old = active;
  active = null;
  old.render?.cancel();
  old.pdf?.destroy().catch(() => {});
  if (old.dialog.open) old.dialog.close();
  old.dialog.remove();
  document.body.classList.remove("source-preview-open");
  old.cleanup?.();
  if (restoreFocus && old.returnFocus?.isConnected) old.returnFocus.focus({ preventScroll: true });
}

export async function openPDFPreview(file, filename, initialPage, quote = "") {
  const returnFocus = document.activeElement;
  closePDFPreview({ restoreFocus: false });
  const dialog = document.createElement("dialog");
  dialog.className = "pdf-preview";
  const title = document.createElement("h3");
  title.id = "pdf-preview-title";
  title.textContent = filename;
  dialog.setAttribute("aria-labelledby", title.id);
  const status = document.createElement("p");
  status.setAttribute("role", "status");
  status.textContent = "Loading original PDF locally…";
  const note = document.createElement("p");
  note.className = "pdf-highlight-status";
  note.setAttribute("role", "status");
  note.textContent = "Physical PDF page numbers. Scanned pages require OCR, which is not included.";
  const quotation = document.createElement("blockquote");
  quotation.className = "pdf-preview-quote";
  quotation.textContent = quote;
  quotation.hidden = !quote;
  const controls = document.createElement("div");
  controls.className = "pdf-preview-controls";
  const button = (text, handler) => {
    const el = document.createElement("button"); el.type = "button"; el.textContent = text;
    el.addEventListener("click", handler); controls.append(el); return el;
  };
  const canvas = document.createElement("canvas");
  canvas.setAttribute("role", "img");
  const overlay = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  overlay.classList.add("pdf-highlight-overlay");
  overlay.setAttribute("aria-hidden", "true");
  const stage = document.createElement("div"); stage.className = "pdf-page-stage"; stage.append(canvas, overlay);
  const scroll = document.createElement("div"); scroll.className = "pdf-page-scroll"; scroll.append(stage);
  const state = { dialog, page: initialPage, pdf: null, render: null, busy: false, returnFocus };
  active = state;
  const previous = button("Previous page", () => renderPage(state.page - 1));
  const next = button("Next page", () => renderPage(state.page + 1));
  const close = button("Close PDF", closePDFPreview);
  previous.disabled = next.disabled = true;
  const heading = document.createElement("header");
  heading.className = "pdf-preview-heading";
  const label = document.createElement("p");
  label.className = "micro-label";
  label.textContent = "ORIGINAL SOURCE";
  heading.append(label, title);
  const excerpt = document.createElement("details");
  excerpt.className = "pdf-preview-excerpt";
  excerpt.open = true;
  excerpt.hidden = !quote;
  const summary = document.createElement("summary");
  summary.textContent = "Quoted evidence";
  excerpt.append(summary, quotation);
  dialog.append(heading, controls, status, note, excerpt, scroll);
  document.body.append(dialog);
  // Desktop leaves the answer interactive alongside the source. Smaller windows
  // use the native modal dialog's focus containment and Escape behavior.
  const compact = matchMedia("(max-width: 1199px)");
  const position = () => {
    if (active !== state) return;
    if (dialog.open) dialog.close();
    document.body.classList.toggle("source-preview-open", !compact.matches);
    if (compact.matches) dialog.showModal(); else dialog.show();
    close.focus({ preventScroll: true });
  };
  const onKeyDown = event => {
    if (event.key === "Tab" && active === state && compact.matches) {
      const stops = [...dialog.querySelectorAll("button:not(:disabled), summary")].filter(el => el.getClientRects().length);
      const first = stops[0], last = stops.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    if (event.key === "Escape" && active === state && !compact.matches) {
      event.preventDefault(); closePDFPreview();
    }
  };
  compact.addEventListener("change", position);
  document.addEventListener("keydown", onKeyDown);
  state.cleanup = () => {
    compact.removeEventListener("change", position);
    document.removeEventListener("keydown", onKeyDown);
  };
  dialog.addEventListener("close", () => { if (active === state && !dialog.open) closePDFPreview(); });
  position();

  async function renderPage(number) {
    if (active !== state || state.busy || !state.pdf || number < 1 || number > state.pdf.numPages) return;
    state.busy = true;
    overlay.replaceChildren();
    note.textContent = "Locating quotation on the original page…";
    previous.disabled = next.disabled = true;
    try {
      const page = await state.pdf.getPage(number);
      if (active !== state) return;
      const natural = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: Math.min(1.5, 1000 / natural.width, 1800 / natural.height) });
      canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
      stage.style.width = `${canvas.width}px`;
      overlay.setAttribute("viewBox", `0 0 ${canvas.width} ${canvas.height}`);
      state.render = page.render({ canvasContext: canvas.getContext("2d"), viewport });
      await state.render.promise;
      if (active !== state) return;
      let match = { status: quote ? "not-found" : "none", regions: [] };
      if (quote) {
        try { match = quotationRegions(await page.getTextContent(), quote, viewport); }
        catch { /* Keep the original page usable if text matching fails. */ }
      }
      if (active !== state) return;
      for (const region of match.regions) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        for (const [key, value] of Object.entries(region)) rect.setAttribute(key, String(value));
        overlay.append(rect);
      }
      note.textContent = highlightMessage(match.status);
      note.dataset.matchStatus = match.status;
      state.page = number;
      status.textContent = `PDF page ${number} of ${state.pdf.numPages} (physical page numbers)`;
      canvas.setAttribute("aria-label", `${filename}, physical PDF page ${number}. Read the extracted quotation in source evidence.`);
      scroll.scrollTop = 0;
    } catch (error) {
      if (active === state) {
        status.textContent = "Page preview failed: " + error.message;
        note.textContent = "No highlight is shown. Review the source quotation in the evidence card.";
      }
    } finally {
      state.busy = false;
      if (active === state) {
        previous.disabled = state.page <= 1;
        next.disabled = state.page >= state.pdf.numPages;
      }
    }
  }

  try {
    const pdfjs = await loadPDFLibrary();
    if (active !== state) return;
    const data = await file.arrayBuffer();
    if (active !== state) return;
    const pdf = await pdfjs.getDocument({ data }).promise;
    if (active !== state) { await pdf.destroy(); return; }
    state.pdf = pdf;
    await renderPage(initialPage);
  } catch (error) {
    if (active === state) status.textContent = "PDF preview unavailable: " + pdfErrorMessage(error);
  }
}
