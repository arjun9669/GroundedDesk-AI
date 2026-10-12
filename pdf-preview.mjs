// Original files stay in memory. Render only the selected page; never upload it.
import { loadPDFLibrary, pdfErrorMessage } from "./pdf-ingest.mjs?v=20261012-r28";
let active = null;

export function closePDFPreview() {
  if (!active) return;
  const old = active;
  active = null;
  old.render?.cancel();
  old.pdf?.destroy().catch(() => {});
  if (old.dialog.open) old.dialog.close();
  old.dialog.remove();
}

export async function openPDFPreview(file, filename, initialPage) {
  closePDFPreview();
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
  note.textContent = "Physical PDF page numbers. Quotations are not highlighted. Scanned pages require OCR, which is not included.";
  const controls = document.createElement("div");
  controls.className = "pdf-preview-controls";
  const button = (text, handler) => {
    const el = document.createElement("button"); el.type = "button"; el.textContent = text;
    el.addEventListener("click", handler); controls.append(el); return el;
  };
  const canvas = document.createElement("canvas");
  canvas.setAttribute("role", "img");
  const scroll = document.createElement("div"); scroll.className = "pdf-page-scroll"; scroll.append(canvas);
  const state = { dialog, page: initialPage, pdf: null, render: null, busy: false };
  active = state;
  const previous = button("Previous page", () => renderPage(state.page - 1));
  const next = button("Next page", () => renderPage(state.page + 1));
  button("Close PDF", closePDFPreview);
  previous.disabled = next.disabled = true;
  dialog.append(title, controls, status, note, scroll);
  document.body.append(dialog);
  dialog.addEventListener("close", () => { if (active === state) closePDFPreview(); });
  dialog.showModal();

  async function renderPage(number) {
    if (active !== state || state.busy || !state.pdf || number < 1 || number > state.pdf.numPages) return;
    state.busy = true;
    previous.disabled = next.disabled = true;
    try {
      const page = await state.pdf.getPage(number);
      if (active !== state) return;
      const natural = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: Math.min(1.5, 1000 / natural.width, 1800 / natural.height) });
      canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
      state.render = page.render({ canvasContext: canvas.getContext("2d"), viewport });
      await state.render.promise;
      if (active !== state) return;
      state.page = number;
      status.textContent = `PDF page ${number} of ${state.pdf.numPages} (physical page numbers)`;
      canvas.setAttribute("aria-label", `${filename}, physical PDF page ${number}. Read the extracted quotation in source evidence.`);
      scroll.scrollTop = 0;
    } catch (error) {
      if (active === state) status.textContent = "Page preview failed: " + error.message;
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
