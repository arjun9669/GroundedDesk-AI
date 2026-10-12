# GroundedDesk 5.6 r37 — question history validation

Date: 2026-10-13. Build: `2026-10-13-r37`.

Presentation and interaction regression using fictional feature fixtures; not a new independent accuracy evaluation. All historical benchmark scores and frozen inputs remain unchanged. Retrieval algorithms and scoring rules are unchanged.

## Changes

Full questions, evidence/refusal status, original search method, source filenames and an Open now marker replace truncated labels. Refusals list searched filenames instead of inventing sources. Newest-first history remains limited to eight questions and memory in this tab. File changes clear history. Reopening preserves exact answers and exports, leaves an unfinished composer question intact and focuses the answer heading. No model auto-load, paid dependency or persistent question storage was added.

## Validation

| Check | Result | Evidence in docs/evidence/r37 |
| --- | --- | --- |
| Unit tests | 253 PASS, 0 FAIL | unit-tests.txt |
| Strict offline toy evaluation | PASS; not model accuracy | offline.txt |
| Workspace Chrome | PASS | workspace-observations.json |
| Actual MiniLM PDF/history Chrome | PASS; Qwen off | qa-observations.json |
| Document library Chrome | PASS | library-observations.json |
| Lexical Research/Comparison Chrome | PASS | research-observations.json |
| PDF reliability Chrome | PASS | reliability-observations.json |
| PDF highlight Chrome | Seven cases and both mobile controls PASS | highlight-observations.json |
| Policy workflow Chrome | PASS, exit 0 | policy-smoke.txt |

Installed Google Chrome 154.0.8037.98. Real Xenova/all-MiniLM-L6-v2 runs locally through WASM, with actual PDF.js and original fixture files. No mock vectors. Both Fast search and Hybrid history reopen byte-identical reports and preserve displayed quotations and physical PDF page references. Refusal reopening has zero citations. Tests cover keyboard activation/focus, unfinished drafts, mobile wrapping, newest-first ordering, the eight-entry cap and corpus invalidation.

Desktop and 390px mobile screenshots were visually reviewed. Mobile is desktop Chrome emulation; physical-phone testing remains pending. Connected user Chrome previously blocks automated file uploads through extension permissions. File/model checks here use installed headless Google Chrome; live connected-profile verification is recorded separately after deployment. No frozen benchmark upload or new benchmark score is claimed.

## Evidence integrity

manifest.json records SHA-256 hashes of accompanying evidence. Quotes and raw reports are preserved. No answer key, document or scoring rule changed.
