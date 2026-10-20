# V39 Lumen32 partial-regression preparation

Date: October 20, 2026. Phase **1 — broader regression** of the
[6.0 working roadmap](ROADMAP_6_0.md). Live 5.6/r44 is unchanged; no adoption.

**Completed follow-up:** the [first actual-model Lumen32 run](V39_LUMEN32_MAC_RESULTS.md)
failed **31/0/1 in both v39 variants**, with L04 a supported false refusal and
paired v38 32/0/0. Work stopped; the user later authorized preserving/publicizing
the first failure and investigation. The preparation checkpoint below predates
questions and remains unchanged. Do not overwrite this freeze or retry this first
v39 capture.

Prepare the complete original now-exposed Lumen32 pack: **20 supported Hybrid,
eight unsupported Hybrid and four lexical Comparisons**. Candidate v39 and paired
v38 remain unchanged. Preserve every original input, first v35 **28/2/2 FAIL**,
its [publication/measurement qualifications](LUMEN32_V35_CONFIRMATION.md), later
v36–v38 results and earlier v39 Vela32/Prism32 captures. No source simplification,
new question selection or threshold tuning is authorized.

## Preparation checkpoint before questions

- Original config/key/rubric/protocol/scorer and all four source hashes pass.
  Original Windows paths remain unchanged; the new config uses relative paths.
- The native Lumen32 automated grading body is byte-identical to the original
  Vela32 body. Import the frozen shared helper unchanged; do not alter expected
  context/fact-group/citation-order/refusal criteria.
- Twenty historical variant arrays align to exact original case IDs/order/
  question strings: first baseline/v35/paired-v34 and v36–v38 variants. Reviewed
  first native grades remain unchanged. Retain later repairs as required passes.
- **602 unit tests PASS**, zero failed/skipped, including all 599 earlier tests
  plus three input/config-scope/history-preservation controls. New runner/preparer
  syntax PASS. Strict bundled Keyword evaluation **28/28 PASS**, zero false
  accepts or citation provenance errors. These are not model measurements.
- Bundled Node **24.19.0**, Apple Silicon macOS; CI targets Node 22. Installed
  headless Chrome **155.0.8059.80** read-only startup PASS: three samples, r44
  footer, no failed requests/page errors. Preserve the
  [startup result](evidence/v39-lumen32-mac-preparation/result.json).
- Actual Lumen32 model capture/scoring **NOT RUN at this preparation checkpoint**.

The successful freeze records **436 code/input files**; verification of every
entry and original/historical alignment passes. Documentation links, diff
whitespace and sensitive-information review pass before preparation publication.

The [new protocol](../eval/v39-lumen32-regression/PROTOCOL.md),
[runner](../tests/browser-lumen32-v39.mjs),
[integrity checks](../eval/v39-lumen32-regression/integrity.mjs), and
[scorer](../eval/v39-lumen32-regression/score.mjs) occupy new paths; all previous
runners/freezes stay untouched. The preparer uses the successfully qualified
narrow Git code-path listing, retaining all eligible code/assets without listing
unrelated evidence images. No input/history hash check is removed.

## Run once after publication

Publish the tested preparation/freeze before questions. Keep the repository
server running on port 8767. With Node on PATH, use new persistent evidence paths:

```sh
RUN_CONFIG=eval/v39-lumen32-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v39-lumen32-mac/raw \
TEST_URL=http://127.0.0.1:8767/ node tests/browser-lumen32-v39.mjs
```

Capture unchanged r44 UI before isolated v39 fixed/section and paired v38. Actual
local MiniLM q8 WASM is required, Qwen off. Persist real source/query/legacy-facet/
exact planner-facet vectors and corresponding literal-body cosines before each
candidate call. Instrumented baseline/UI sources must match. Keep all first
JSON/screenshots/receipts/ledger/module proof with exclusive writes; no overwrite,
saved-vector replay, mock-score accuracy or automatic retries.

Only after all 32 capture successfully, grade into another new directory:

```sh
RUN_CONFIG=eval/v39-lumen32-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v39-lumen32-mac/raw \
SCORE_DIR=docs/evidence/v39-lumen32-mac/score \
node eval/v39-lumen32-regression/score.mjs
```

Both v39 variants must pass 32/32, with zero false acceptance/refusal or loss of
any original/later/contemporaneous PASS. Review every answer for contradictions;
keep any downgrade separate from first automated grades. On any required failure,
retain evidence and stop before changes, retries, committing or publishing.
Interrupted captures remain ungraded.

A subset pass cannot complete phase 1 or satisfy the full 771-case gate. Vela32
and Prism32 account for 64 tested cases; 604 verified cases await v39 testing at
this checkpoint and 103 originals remain unavailable. Fresh confirmation, live
integration and product qualification require separate gates and authorization.
