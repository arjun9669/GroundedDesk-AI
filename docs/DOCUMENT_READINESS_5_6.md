# GroundedDesk 5.6 r44 — Document-readiness validation

Build: `2026-10-13-r44`. Readiness is extraction feedback, not confidence, factual verification or a new accuracy benchmark.

## Behavior

Every library card now describes loaded text: Text available for usable TXT/Markdown and supported PDFs; Partial text coverage when some PDF pages contain no searchable text; Review layout when the existing separated-row heuristic flags possible column/table ambiguity. PDFs show the number of pages containing searchable text versus total pages. Missing/inconsistent PDF extraction metadata is Coverage not checked, never a fabricated verified count.

Partial coverage retains the original warning that pages may be blank or scanned. It does not diagnose every empty page as an unreadable scan. Guidance offers original-PDF review, device-side OCR or replacement with a searchable PDF/text version. The app still does not implement OCR or reconstruct table relationships. Even all-page text availability does not verify reading order, complete extraction or factual accuracy.

Readiness is recomputed for uploaded and restored documents from current text/page metadata; it is not stored as a new snapshot field. Retrieval, PDF parsing, evidence quotations and export logic are unchanged. Existing extraction warnings remain in reports.

Failed uploads retain per-file explanations. Choose another file opens the upload picker; failed replacements offer Choose a replacement for the same original. No automatic retry, OCR, file removal or model download occurs. A failed replacement keeps the original file and answer until a valid replacement is loaded. The sidebar upload error panel now uses legible amber text on dark background.

## Validation

- 268/268 unit tests passed. Five readiness tests cover TXT/MD, actual page-count derivation, partial/layout states, corrupt metadata and unchanged document/index/answer data.
- Strict offline toy evaluation passed; not MiniLM accuracy.
- Installed Google Chrome 154.0.8037.98: real PDF.js readiness controls passed for TXT, Markdown, full and partial PDFs, separated-row layout, image-only, damaged and password-protected PDFs. No password input was requested. Test PDFs and their hashes are included in supporting evidence.
- Actual IndexedDB snapshot restore re-extracted PDFs and reproduced the library readiness exactly. Partial-PDF Q&A retained physical page 3 and the original coverage warning in the copied report.
- Actual file-picker retries passed for failed replacement and new-file upload. Failure preserved original readiness/answer; successful replacement kept document count stable and cleared stale answers. Mobile 390px had no horizontal overflow.
- Existing desktop/mobile workspace interaction controls passed, including short-laptop composer fit, history, keyboard, refusal recovery and export.
- Existing PDF feature controls ran actual `Xenova/all-MiniLM-L6-v2` in local WASM with Qwen off and passed: original page links/preview/highlighting, history/report preservation, unsupported zero-citation refusals and supported fictional PIN controls. No mock embeddings substituted.
- Initial readiness run passed. Visual review exposed a low-contrast existing upload-error panel; CSS was corrected, then final readiness run passed with an explicit color assertion. Initial observations/screenshots remain preserved.

No frozen benchmark was rerun or edited; historical first-look and in-sample results remain unchanged. This extends the original roadmap's document-processing/usability work; it does not complete its Hybrid-quality or claim-verification gates or claim 6.0 readiness.

Raw observations and exact exports: docs/evidence/r44. Supporting PNGs and fictional inputs: the evidence ZIP. CI now includes ten Chromium feature scripts; CI does not download MiniLM, so actual-model controls are recorded separately above.
