# GroundedDesk 5.6 r39 — question keyboard shortcuts

Date: 2026-10-13. Retrieval build: `2026-10-13-r39`.

Presentation/interaction regression using fictional feature fixtures. Retrieval algorithms, frozen benchmark inputs and historical scores remain unchanged. This is not a new independent accuracy benchmark.

## Behavior

- Ctrl/Cmd + Enter submits the question through the existing form. Plain Enter remains a newline. Submission ignores composition, held-key repeats, Alt/Shift combinations, already-handled events and open dialogs; a disabled submission button cannot be bypassed.
- / focuses the question box and opens Ask from Compare or Research. It does nothing while editing input/textarea/select/contenteditable or textbox/searchbox/combobox controls, during composition/repeat, with modifier keys, after another handler prevented the event or while any dialog is open.
- A small Ctrl/Command/Enter and slash hint sits beside the question action, linked to the textarea for accessibility. No new model download, storage, paid service or follow-up context behavior.

## Validation

253 unit tests, syntax checks and the strict offline toy evaluation pass. All seven installed Google Chrome 154.0.8037.98 feature scripts pass. Actual Xenova/all-MiniLM-L6-v2 WASM/PDF/history checks pass with Qwen off and no mock vectors.

| Script | Evidence in docs/evidence/r39 | Outcome |
| --- | --- | --- |
| Workspace | workspace-observations.json | PASS |
| PDF Q&A / actual MiniLM | qa-observations.json | PASS |
| Document library | library-observations.json | PASS |
| Lexical Research/Comparison | research-observations.json | PASS |
| PDF reliability | reliability-observations.json | PASS |
| PDF highlighting | highlight-observations.json | Seven cases and both mobile controls PASS |
| Policy | policy-smoke.txt | PASS, exit 0 |

Real browser keyboard checks cover slash from Compare/Research, preserved normal slash/Enter typing, document-filter typing, modified slash, guide-modal focus, Ctrl submission once and Meta submission of a zero-citation refusal. Composition and repeat key events are explicit simulated event controls, not physical IME/device testing. Existing history search/replay, export feedback, actual downloads, clipboard denial, PDF navigation and replacement remain covered.

The first Workspace and PDF Q&A runs timed out at initial sample-document readiness before shortcut or model checks. Their records are preserved in initial-workspace-timeout.json and initial-qa-timeout.json. Entire scripts were rerun without application/test-input changes and passed. Cause was not established; no success is attributed to those initial runs.

The composer and hint fit a 1440x688 laptop viewport. Screenshots visually reviewed; 390px mobile is desktop Chrome emulation, not a physical phone. File/model tests use installed headless Chrome; connected-profile live verification is recorded separately after deployment. The previously observed connected-extension file-upload limitation remains; no frozen benchmark corpus upload is claimed.

manifest.json contains SHA-256 hashes of accompanying raw evidence.
