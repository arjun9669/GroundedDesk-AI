# 5.5 / r28 — PDF intake and reliability checks

Build: `2026-10-12-r28`. This is a PDF intake/navigation feature regression, not a new independent answer-accuracy benchmark. Historical Atlas, Meridian, Lantern and Aster scores remain unchanged.

## Delivered

- PDF errors now identify the filename and distinguish damaged/invalid files, locked files and files with no searchable text. Messages suggest exporting a fresh copy, unlocking a copy locally, or using OCR/TXT/Markdown. The app does not request or store PDF passwords and does not implement OCR.
- Upload success/errors appear beside the upload control as well as the existing status area. Failed PDFs are not partially indexed.
- Mixed PDFs retain physical page boundaries, including blank pages. Library cards and evidence exports disclose pages without searchable text. They may be blank, scanned or otherwise unextractable; the app does not guess which.
- A bounded geometry heuristic flags pages with at least two rows containing text separated by more than 40 PDF points. This warns that column order or table associations may be ambiguous. It is not a layout classifier or reconstruction algorithm, and can have false positives and false negatives. Absence of a notice is not a guarantee of correct reading order.
- Every loaded PDF has a **View PDF** library button, enabling original-page inspection even without an answer. Existing verified source-page links remain available.
- PDF parsing is isolated in `pdf-ingest.mjs`; loading tasks are destroyed on success and parse failures. Limits remain 75 pages, 180,000 extracted characters including separators, and the existing 5 MB upload cap. Successful ordinary extraction retains the existing content-item join and page joins; rankings, quote selection and refusal rules are unchanged.

## Fixed synthetic Chrome scenarios

The script writes its question/expected-behavior set and SHA-256 hashes before observing outputs. Fixtures are known engineering inputs, not an unseen factual benchmark. The original eight-case set and criteria were preserved.

| Case | Observed result | Meaning of PASS |
| --- | --- | --- |
| Mixed text/blank PDF | PASS | Page 2 coverage notice; sunset quotation correctly located on physical page 3; notice retained in report |
| Repeated passage | PASS | Location marked ambiguous; no guessed page link |
| Cross-page quotation | PASS | Existing separate lexical inventory locates its unchanged quote on pages 1 and 2 |
| Two columns | PASS for notice/navigation | Geometry caution and original-page rendering; **reading order/column interpretation unsupported** |
| Table | PASS for notice/navigation | Geometry caution and original-page rendering; **cell associations/table reasoning unsupported** |
| Image-only PDF | PASS | Synthetic embedded raster has no searchable text; rejected with scanned/empty OCR guidance |
| Damaged PDF | PASS | Invalid bytes rejected, filename and fresh-copy guidance shown |
| Locked PDF | PASS | Actual encrypted PDF rejected with unlock-copy guidance, without a password-entry flow |

The locked fixture was generated from public synthetic text with pypdf 6.10.0 and a disposable fixture-only password. It contains no real credentials. The image-only fixture is a tiny synthetic inline raster, not a scanned-text OCR-quality test.

All eight cases passed in installed Google Chrome 154.0.8037.98, headless, using actual PDF.js 4.10.38. The pinned distribution is served locally by browser scripts to avoid CDN instability. The existing Q&A PDF smoke also passed with actual `Xenova/all-MiniLM-L6-v2` in local WASM and Qwen off; separate Research/Comparison and policy browser scripts passed. **240 unit tests** and strict offline toy evaluation pass. Parser unit tests use explicit stubs to cover failure/cleanup paths; they are not evidence of real model accuracy. CI runs actual Chromium/PDF.js for all four browser scripts, without MiniLM downloads.

Supporting evidence is under `docs/evidence/r28/`: original fixtures, pre-test manifest, exact observations, screenshots, actual MiniLM Q&A evidence and raw checks. The reliability suite does not claim factual completeness, table interpretation, OCR accuracy, production security or a new benchmark score.

[Pre-test cases and SHA-256 hashes](evidence/r28/reliability/pre-test-manifest.json) · [Exact reliability observations](evidence/r28/reliability/reliability-observations.json) · [Image-only error screenshot](evidence/r28/reliability/image-only.png) · [Original column page](evidence/r28/reliability/columns-original.png) · [Actual MiniLM Q&A observations](evidence/r28/qa/browser-observations.json) · [240 unit tests](evidence/r28/unit-tests.txt) · [Research browser observations](evidence/r28/research/research-browser-observations.json)

## Remaining work

Reliable quotation highlighting, geometry/block reconstruction, reading-order recovery, table parsing, OCR, broader fonts/layout coverage, mobile/Safari testing and fresh pre-frozen held-out factual evaluation remain pending. These changes add transparency and recovery paths; they do not make complex PDF content semantically reliable. No paid service, backend or subscription was introduced.
