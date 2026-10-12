# GroundedDesk 5.6 r40 — answer and source presentation

Date: 2026-10-13. Retrieval build: `2026-10-13-r40`.

UI presentation/interaction regression, not new independent accuracy. Frozen questions, source documents, answer keys, rubric and historical benchmark scores remain unchanged. Retrieval algorithms are unchanged.

## Changes

Questions have larger editorial typography and clearer spacing. Quoted answer / Local AI draft / No supporting answer headings distinguish displayed output. Answer panels have soft paper/green styling, readable spacing between cited passages and a warm refusal treatment. Source cards emphasize filenames and page/line labels, increase excerpt readability and separate optional search details from the evidence. Research/Comparison cards use matching spacing. Hover border/shadow transitions respect reduced-motion preferences and do not move cards.

Answer quotations, source excerpts, citation IDs, filename values and report generation remain unchanged. The new heading is presentation text; it does not appear in exported reports or claim factual verification.

## Validation

253 unit tests, syntax checks, strict offline toy evaluation and all seven installed Google Chrome 154.0.8037.98 feature scripts pass.

| Script | Evidence in docs/evidence/r40 | Result |
| --- | --- | --- |
| Workspace | workspace-observations.json | PASS |
| PDF Q&A / actual MiniLM | qa-observations.json | PASS; Qwen off |
| Document library | library-observations.json | PASS |
| Lexical Research/Comparison | research-observations.json | PASS |
| PDF reliability | reliability-observations.json | PASS |
| PDF highlighting | highlight-observations.json | Seven cases and both mobile controls PASS |
| Policy | policy-smoke.txt | PASS, exit 0 |

Actual Xenova/all-MiniLM-L6-v2 runs locally via WASM with actual PDF.js/files; no mock vectors. The two Q&A reports (Keyword and Hybrid) and all captured Research/Comparison/policy reports exactly match r39 after replacing only the build identifier. See report-content-comparison.json. No full frozen accuracy benchmark was rerun.

Workspace checks verify heading distinction, unchanged displayed excerpt, citation jump/focus, reduced-motion behavior, history/search/shortcuts, exact history reports, real copy/download and explicit simulated clipboard-denial recovery. Refusals retain zero source cards. PDF checks verify actual page extraction/provenance, preview/highlight, responsive docking and file replacement/reindex.

Desktop and 390px mobile screenshots were visually reviewed. The composer fits 1440x688. Mobile is desktop Chrome emulation, not a physical phone. Connected-profile file upload was previously blocked by extension permissions; file/model checks use installed headless Chrome. Connected-profile live check is recorded separately after deployment. No frozen-corpus upload or new benchmark score is claimed.

No paid asset, service, font, cloud storage or API was added. manifest.json records SHA-256 hashes of accompanying evidence.
