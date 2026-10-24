# Fresh64 execution freeze — 24 October 2026

This execution plan supplements the original immutable input protocol and rubric.
It does not replace their criteria. No candidate/planner/model was invoked on the
fresh inputs during authoring, diagnostics, engineering checks or neutral preflight.
The unchanged candidate is v43; paired v42 and production r44 are separate diagnostics.

## Approved preflight corrections and actual environment

The first neutral attempt failed because Chrome evicted two inspector response
bodies before hashing. Its exact draft sources and failure record are archived in
`docs/evidence/phase2-fresh64-preparation/`. The user approved increasing the CDP
body buffers while keeping every hash requirement. That retry failed the ONNX
presence assertion and is preserved in `phase2-fresh64-preparation-approved`.

The user approved diagnosis/correction and another neutral preflight. A diagnostic
proved the successful ONNX request redirects to a content-addressed CDN path with
no `.onnx` extension. The bytes had been hashed, but final-URL-only recognition was
wrong. The recorder now keeps original request/redirect paths as well as final URL,
byte count and SHA256, stripping query parameters (including signed URLs). Presence
requires a nonempty response tied to an original `/onnx/*.onnx` request. Missing
bytes, changed bytes, duplicate inconsistent identities or missing WASM still fail.
All six downloaded assets must match exactly between preflight and capture.
No model files are committed and no missing asset is treated as verified.

The successful neutral preflight is recorded in
`docs/evidence/phase2-fresh64-preflight-redirect-fixed/result.json`. It used only
bundled startup documents and a neutral environment sentence, not fresh sources
or questions. Its downloaded asset hashes and model identity enter run-config.

Actual environment declared BEFORE fresh questions: Node **24.22.1**, macOS arm64,
Chrome **155.0.8059.85**, Playwright **1.62.1**, MiniLM q8 WASM, Transformers.js
3.0.0, Qwen off, live build `2026-10-13-r44`. Node differs from the input-preparation
reference 24.19.0; this is an explicit pre-question environment amendment, not a
post-result qualification. The freeze also records Node/Chrome executable and
Chrome engine hashes plus Playwright/core package-tree hashes. No Windows/Safari,
PDF, Qwen, speed/memory certification or independent-accuracy claim follows.

## Before capture

Run syntax checks, the dependency-free unit suite and strict Keyword evaluation.
Synthetic negative controls check buffer configuration, evicted/missing responses,
redirect identity, changed bytes, file tampering/duplicates/path escape and forged
body cosine/source identity. They never invoke v43 on Fresh64. Prepare verifies
original input hashes, literal groups, case counts/order and index resource limits.

Publish run-config, complete code/input/preflight/toolchain freeze and this plan to
origin/main. Verify GitHub main receipt before running. Do not run with a dirty
candidate or changed frozen file. The published run is the first Fresh64 exposure;
no smoke questions, sample answer probes or auto-retries are allowed.

## Capture, scoring and review

Use `tests/browser-phase2-fresh64.mjs` with explicit RUN_CONFIG, TEST_URL and a new
exclusive EVIDENCE_DIR. It reuses the original v43 capture workflow. Verify every
frozen file, actual toolchain and browser-served candidate/dependency identity.
Verify downloaded model/runtime identities after initialization and before cases.
Capture all 64 once: 56 actual MiniLM Hybrid submissions plus eight separate lexical
Comparison pairs. Save actual UI/receipts/screenshots, source extraction and real
finite 384D vectors. Save each body/planner/query record before candidate calls;
keep baseline, paired v42 and v43 fixed/section results separately labeled.

Only after the whole capture, run `eval/phase2-fresh64/score.mjs` with explicit
RUN_CONFIG/EVIDENCE_DIR and a new SCORE_DIR. The pinned original gradeAnswer is
unchanged. Independently verify complete case/submission order, source text,
source-vector correspondence and recomputed body/facet cosines. Save native grades
and a separate manual binding/contradiction review queue; automated PASS remains
HOLD pending manual review. Native FAIL remains FAIL. Manual review cannot change
native grades, keys, thresholds or frozen bytes. At most three citations; all
original literal groups, filenames, relevance and refusal criteria still apply.

The required outcome is 64/64 PASS in each v43 variant plus complete integrity and
manual review. Keep first evidence and stop/ask on any required failure, including
engineering, startup, execution, integrity, scoring or review. No question rerun,
candidate tuning or rubric repair follows without a separate approved task. Seal
raw evidence and retain known phase 1 failures and missing-input exclusions.
Live r44 is unchanged; integration and release remain separate decisions.
