# GroundedDesk 5.6 r38 — history search and report feedback

Date: 2026-10-13. Build: `2026-10-13-r38`.

UI interaction regression using fictional feature fixtures. This is not new independent accuracy. All historical benchmark results, frozen questions, documents and scoring rules remain unchanged. Retrieval algorithms are unchanged.

## Changes

Search the last eight questions by full question text or displayed source filenames. Matching ignores case and leading/trailing spaces. Refusals match the searched file names. Search filters the display only: total count, saved answers, newest-first ordering and current answer remain intact. Clear search restores all entries and focuses the search field. Empty searches and no matches have explicit guidance. Corpus mutation resets search and clears history.

Copy and Save report now show local feedback above the answer or report. Copy success is reported only after the browser clipboard succeeds. Clipboard denial advises checking permissions or downloading; retry remains enabled. Downloads say Download requested and name the file, because the app cannot confirm completion. New answers, research reports and file changes clear stale feedback; pending copies only update feedback if their report is still current. Export content is unchanged.

## Validation

253 unit tests and the strict offline toy evaluation pass. Seven installed Google Chrome 154.0.8037.98 feature scripts pass:

| Script | Evidence in docs/evidence/r38 | Result |
| --- | --- | --- |
| Workspace UI | workspace-observations.json | PASS |
| PDF Q&A with actual local MiniLM | qa-observations.json | PASS; Qwen off |
| Document library | library-observations.json | PASS |
| Lexical Research/Comparison | research-observations.json | PASS |
| PDF reliability | reliability-observations.json | PASS |
| PDF highlight | highlight-observations.json | Seven cases and both mobile controls PASS |
| Policy workflow | policy-smoke.txt | PASS; exit 0 |

Workspace controls verify question and filename matching, whitespace/case normalization, no matches without history loss, clear-search focus, exact history replay, untouched draft, eight-entry limit, corpus invalidation, copy success and actual file download. Downloaded Markdown and clipboard reports match after accounting for Windows clipboard CRLF conversion. Clipboard-to-clipboard history replay remains exact. Denied clipboard access is explicitly simulated in a separate context; actual export and downloads still run. No embeddings or source evidence are mocked.

The first workspace run failed the new cross-channel byte equality assertion because Windows clipboard text uses CRLF while downloaded Markdown uses LF. The assertion now normalizes only CRLF for that comparison. Initial partial observations are preserved in initial-workspace-observations.json; final complete run passes. No application, report output or benchmark scoring change was made to resolve this test mismatch.

Actual Xenova/all-MiniLM-L6-v2 runs locally via WASM, with original fixture files and actual PDF.js. History replay preserves exact PDF quotations, physical page references and copied exports. Desktop and 390px mobile screenshots were visually reviewed. Mobile coverage is desktop Chrome emulation, not a physical phone.

Connected-profile file upload was previously blocked by Chrome extension permissions; file/model tests use installed headless Chrome. Connected live verification is recorded separately after publication. No frozen-corpus browser benchmark rerun or new score is claimed.

manifest.json records SHA-256 hashes of the accompanying evidence. No paid service, cloud question storage, account or follow-up context feature was added.
