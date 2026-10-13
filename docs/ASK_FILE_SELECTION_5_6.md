# GroundedDesk 5.6 r41 — select files for Ask

Date: 2026-10-13. Retrieval build: `2026-10-13-r41`.

This is a feature regression plus a frozen Cobalt16 in-sample regression, not a new independent accuracy benchmark. Historical first-look scores, questions, documents, keys and rubrics remain unchanged.

## Behavior

Ask has an opt-in Search in selector, defaulting to All files. Choose one or several files. Answers and reports record the actual searched filenames; history retains the original search scope. Compare/Research keep their separate file/workflow controls.

Selected retrieval rebuilds lexical statistics from only those files and maps existing real MiniLM vectors by stable chunk ID. Selecting files does not redownload or rebuild embeddings. All files uses the original full index and ranking. Empty/removed selections do not broaden the search. New uploads stay excluded from an explicit selection; removing or replacing a selected file requires choosing again. File mutations still invalidate the full semantic index as before.

Changing selection clears the current answer and closes its PDF preview; saved history may be replayed with its original searched-files label. Changing files clears history. Results pending during a corpus/selection change are discarded, rather than running an unrequested broader fallback. Citation guards and report exports reject sources outside the recorded scope. Clipboard feedback cannot label a newer answer.

## Validation

259 unit tests, syntax checks and strict offline toy evaluation pass. Eight installed Google Chrome 154.0.8037.98 feature scripts pass; CI adds the scope script as its eighth Chromium check.

| Check | Evidence in docs/evidence/r41 | Outcome |
| --- | --- | --- |
| Workspace | workspace-observations.json | PASS |
| Real MiniLM PDF/history | qa-observations.json | PASS; Qwen off |
| Ask scope, Fast search and real MiniLM | scope-observations.json | PASS |
| Document library | library-observations.json | PASS |
| Lexical Research/Comparison | research-observations.json | PASS |
| PDF reliability | reliability-observations.json | PASS |
| PDF highlight | highlight-observations.json | Seven cases and both mobile controls PASS |
| Policy | policy-smoke.txt | PASS, exit 0 |
| Frozen Cobalt16 All files regression | cobalt16/scorecard.json | 16 PASS / 0 PARTIAL / 0 FAIL |

Scope controls use conflicting eight/eleven-shift source files and a separate fictional PIN document. Both retrieval modes cite only the selected file, refuse the excluded fact with zero citations, answer it when included, support a two-file selection and restore All files. Twelve captured Q&A controls and a real-inference cancellation control pass. Additional assertions cover empty selection, original-scope history replay, excluded new uploads, removal/replacement without broadening and 390px layout. Real async MiniLM is used in the cancellation test; two synchronous UI events trigger the change before query embedding finishes. No fake vectors. Unit alignment markers test mapping only and are not model accuracy evidence.

Cobalt16 document and test-pack hashes were verified before capture. All 16 unchanged questions run once in this release: 12 actual Hybrid Q&A and four separate lexical Comparison. Answers and source records exactly match preserved r33; all required facts and expected documents are present, and every source quotation traces to original text after whitespace normalization. Four unsupported questions have zero citations. H05 retains its existing anaphoric there wording, which passes the unchanged rubric; no stronger standalone completeness claim. Original r29 first-look remains 15 PASS / 0 PARTIAL / 1 FAIL. Atlas/Meridian/Lantern/Aster were not rerun or rescored.

Nine feature reports match r40 after changing the build and removing only the new searched-files metadata. Source quotations, ranks and other report content remain unchanged in All files mode. See report-content-comparison.json.

## Preserved test failures and corrections

The initial new scope control asked a comparison question through Ask and received a refusal. Its recorded output remains in initial-scope-observations.json. The selection control now asks the supported factual question used by its other cases; comparison is separately tested and no frozen question was changed. This is not a first-look benchmark.

The extended test helper initially tried to uncheck a file it had already removed; corrected to operate on existing controls only. Replacement controls then timed out because opening a native chooser and separately changing its hidden input produced a cancellation; the app correctly retained the old file. The test now selects through the actual filechooser event. All partial/failure records remain: scope-helper-timeout.json, replacement-timeout.json and picker-cancel-observations.json. The final full feature run passes. No expected answer, source document or retrieval rule was changed to resolve these harness issues.

Desktop and 390px mobile layouts were reviewed; the collapsed selector keeps the composer inside 1440x688. Mobile is desktop Chrome emulation, not a physical phone. Actual Xenova/all-MiniLM-L6-v2 runs via local WASM with Qwen off. File/model tests use installed headless Chrome; connected-profile upload previously had an extension permission blocker, and live UI verification is recorded separately after deployment.

No paid service, persistent question/file storage or account was added. manifest.json records SHA-256 hashes of evidence.

## Final visual correction

Connected-Chrome review found the shared 44px text-input minimum height also applied to scope checkboxes, placing their glyphs below their filename labels. Scoped checkbox minimum height/padding now keep 16px controls aligned. CSS cache identifier is r41-ui2; retrieval build remains r41. The complete scope script passes in installed Chrome with a measured checkbox-height regression assertion and real Fast search controls. Actual MiniLM/Cobalt results above remain applicable because this correction only changes CSS/cache and the layout assertion. Additional layout records have their own layout-manifest.json; original evidence remains intact.
