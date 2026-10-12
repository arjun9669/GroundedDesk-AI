# 5.5 / r27 — source navigation across research workflows

Build: `2026-10-12-r27`. This extends r26 main-Q&A page navigation to the existing lexical workflows. It does not change retrieval rankings, answer selection, refusal rules, policy categories, scan/output caps or frozen benchmark inputs.

## Behavior

Two-document Comparison, multi-document Research, 5.1 policy-section research and 5.2 candidate release-control inventory show verified physical PDF page references alongside their displayed quotations. Evidence cards can open the original file at the cited page or locate its library entry. TXT/Markdown use normalized extraction line ranges. Source locations and the current retrieval build accompany copied/downloaded Markdown reports.

Comparison location checks use exactly the displayed excerpt from each selected file. An unmatched file retains its existing missing-match message without invented quotes, page numbers or navigation links. Several policy citations may refer to the same document; the separate main-Q&A guard still prohibits duplicate document citations. Research verifies document identity, sequential citation numbers, quote-in-excerpt and excerpt-in-source before display, and checks asserted locations again on export. Missing or stale documents, forged quotations and forged page numbers are rejected.

The 5.2 inventory has historically collapsed all whitespace in its extraction, including page separators. A reversible whitespace projection maps those unchanged quotations back to offsets in the retained original extraction. Thus one inventory quotation can accurately identify both physical pages without changing the quote, policy parser or rubric. Source location verifies extraction provenance, not semantic relevance, entailment or complete obligations. Repeated quotation/context remains explicitly ambiguous, and absent/corrupt page metadata is unavailable.

## Validation

- **232 Node tests pass**, including eight new workflow-provenance tests and the prior eleven page-provenance tests. Cases include both selected Comparison files, missing matches, unchanged Research quotes/coverage, multiple policy citations to one PDF, cross-page whitespace projection, Unicode/TXT line mapping, rejected forged/stale exports, and ambiguous/missing page metadata.
- The **strict offline toy evaluation** passes with zero false acceptances and zero citation-provenance errors. It is not MiniLM accuracy.
- Installed **Google Chrome 154.0.8037.98**, headless, passes synthetic PDF feature checks for Comparison, multi-document Research, policy sections, policy inventory, a two-page inventory quotation, missing comparisons and repeated-passage ambiguity. The original supplier PDF opens at physical page 2. Clipboard and actual downloaded Comparison reports contain both documents' correct page references and r27 build. Adding files clears old Research results.
- Main-Q&A PDF smoke passes with **actual `Xenova/all-MiniLM-L6-v2` in local WASM**, Qwen off, including original-page preview and a zero-citation unsupported password refusal. Existing Research 5.1/5.2 browser smoke remains required. PDF.js is the actual pinned 4.10.38 distribution, served locally by browser tests to avoid CDN instability.
- CI runs all unit/offline checks and the three Chromium UI scripts. CI does not download MiniLM; the actual-model observation is from local installed Chrome.

These are synthetic feature/regression checks, **not a fresh independent benchmark or a new Atlas, Meridian, Lantern or Aster score**. Historical benchmark results remain unchanged. The initial unit run required updating a legacy formatter-wiring assertion for its new document-verifier argument. The initial browser run encountered a local HTTP-server collision and did not execute cases; its failed observation is retained locally. Running against a clean local port succeeded. No code or expected benchmark answers were adjusted to conceal an application failure.

Supporting evidence: [Research browser observations](evidence/r27/research/research-browser-observations.json), [Comparison page preview](evidence/r27/research/02-comparison-original-page.png), [downloaded Comparison report](evidence/r27/research/comparison-download.md), [actual MiniLM Q&A observations](evidence/r27/qa/browser-observations.json), [232 unit tests](evidence/r27/unit-tests.txt), [strict offline evaluation](evidence/r27/offline-evaluation.txt), and [existing policy browser smoke](evidence/r27/policy-browser.txt).

## Scope and remaining work

The README now distinguishes Hybrid main Q&A from lexical Comparison/Research, documents the new navigation workflow, lists the current release, and states the zero-cost architecture and remaining priorities. No paid service, backend, subscription or authentication system was introduced.

Exact quotation highlighting, geometry/block metadata, OCR, tables/layout reconstruction, mobile/Safari coverage and a fresh pre-frozen held-out accuracy evaluation remain pending. Page references are physical PDF page numbers, not printed page labels. Scanned PDFs without extractable text still need external OCR. Correct source location does not establish factual support or complete answers.
