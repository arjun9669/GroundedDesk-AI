# 5.5 / r26 — first page-provenance slice

Build: `2026-10-12-r26`. This implements the first part of the 5.5 roadmap, not the entire document-processing milestone.

## Delivered behavior

- Ordinary Keyword and MiniLM Hybrid Q&A retain text extracted from each PDF page alongside the existing flattened retrieval text. Chunking, ranking, sentence selection, refusal rules and the one-citation-per-document guard are unchanged.
- A displayed quotation receives physical PDF page numbers only when its exact quotation and retrieved context identify one unambiguous occurrence in the loaded extraction. A quote spanning pages lists each intersecting nonempty page.
- Duplicate quotations can be disambiguated by unique surrounding context. Duplicate context or multiple quote occurrences inside that context remain explicitly ambiguous. Missing or inconsistent metadata is unavailable; no page is guessed.
- A verified PDF source card opens the original file in a local PDF.js canvas preview with previous/next controls and keyboard-close support. The file stays in memory and is released from the library on removal/clear. The preview closes when documents change and discards stale async work.
- TXT/Markdown use line numbers within whitespace-normalized extraction, never synthetic page numbers. Leading/trailing blank lines removed by retrieval are not counted.
- Copy and Markdown download exports include the quotation's location. The provenance guard and report exporter independently recompute the location against loaded documents. An asserted forged location is rejected. Locations identify the **displayed quote**, not necessarily the entire expanded retrieved excerpt.

## Validation and interpretation

The 224 Node tests pass, including 11 new provenance tests: empty pages, normalization, cross-page quotes, duplicate context, unique-context disambiguation, missing/corrupt metadata, identity mismatch, TXT lines, unchanged index/answer behavior, forged-page rejection and citation-free refusals. The existing strict offline 28-case toy evaluation passes with zero false acceptances and zero provenance errors. These are regression checks, not independent accuracy.

The synthetic three-page Harbor Workshop feature smoke was executed in installed Google Chrome 154.0.8037.98, headless, against the local candidate build. It uses actual PDF.js 4.10.38 (the pinned distribution served locally by the test), actual `Xenova/all-MiniLM-L6-v2` downloaded from public hosting and inferred in local WASM, and Qwen disabled. Keyword and Hybrid displayed the original page-2 quotation:

> Harbor crane operators must inspect lifting hooks every eight shifts.

The test verifies page provenance, clipboard/export, original-page rendering, next/previous bounds, Escape, immediate close/reopen, unsupported password refusal with no citations, and TXT line ranges after document replacement. Raw observations, exported evidence, the generated PDF and screenshots accompany the local delivery. GitHub CI executes the same PDF feature test in Chromium without downloading MiniLM; it does **not** measure actual model accuracy.

Two preliminary smoke attempts failed due to test assumptions: Escape cleanup needed an event-aware wait, and the existing sentence extractor included an unpunctuated TXT heading so the quotation spans lines 1–2 instead of line 2. Those failed observations were retained locally. No retrieval change was made to satisfy either assertion. The smoke fixture is unrelated to the preserved frozen benchmarks.

The existing Research 5.1/5.2 browser smoke also remains a required check. Historical Atlas, Meridian, Lantern and Aster scores are unchanged. No frozen benchmark was rerun, and r25's 32/32 in-sample results must not be relabeled as r26 accuracy.

Supporting evidence: [exact browser observations](evidence/r26/browser-observations.json), [actual MiniLM screenshot](evidence/r26/03-actual-minilm-hybrid-pdf.png), [original page preview](evidence/r26/02-original-page-preview.png), [downloaded Markdown export](evidence/r26/keyword-evidence-export.md), [synthetic PDF](evidence/r26/harbor-workshop.pdf), [224 unit tests](evidence/r26/unit-tests.txt), [strict offline evaluation](evidence/r26/offline-evaluation.txt), and [existing Research browser smoke](evidence/r26/policy-browser.txt). The final installed-Chrome run passed all assertions; preliminary test failures remain documented above and in the local delivery.

## Remaining scope and limits

Page links currently belong to main Q&A only. Research/Comparison page navigation, exact passage highlighting, geometry/block metadata, table reconstruction, OCR, broader PDF-font/layout coverage, mobile/Safari testing and semantic entailment remain pending. Scanned PDFs without extractable text cannot be searched. Correct page provenance does not establish answer relevance, completeness or factual support.

No paid service, subscription, authentication system or backend was introduced. Initial PDF/model dependency downloads require connectivity; inference, extraction and preview run on device. This remains an educational browser application, not production security or compliance software.
