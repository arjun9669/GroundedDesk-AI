# V39 Prism32 partial-regression preparation

Date: October 20, 2026. Phase **1 — broader regression** of the
[6.0 working roadmap](ROADMAP_6_0.md). Live 5.6/r44 is unchanged; no adoption.

**Completed follow-up:** the [first actual-model Prism32 run](V39_PRISM32_MAC_RESULTS.md)
passed 32/32 in both v39 variants without historical PASS loss. The checkpoint
below records preparation before questions; the original infrastructure failure
and authorized recovery remain preserved. Do not overwrite this first freeze.

This task prepares a separate first v39 capture of original exposed Prism32:
**32 cases: 20 supported Hybrid, eight unsupported Hybrid, four lexical
Comparisons**. Candidate v39, its inherited v38 path, existing tests, original
source/question/key/rubric bytes and all earlier first results remain unchanged.
Neither the original v36 29/0/3 failure nor later v37/v38 32/0/0 passes are
overwritten. This is not fresh confirmation or a complete 771-case result.

## Preparation checkpoint before questions

- **599 unit tests PASS**, zero failed/skipped: all 596 prior tests plus three
  original-input/config-scope/history-preservation controls. Tests import and
  reuse the frozen automated grading function; no new accuracy claim follows.
- Strict bundled Keyword evaluation **28/28 PASS**, zero false accepts or
  citation provenance errors. New runner/preparer syntax PASS.
- Bundled Node **24.19.0**, Apple Silicon macOS; CI uses Node 22.
- Installed headless Chrome **155.0.8059.80**: read-only startup PASS with three
  samples, r44 footer, zero failed requests and page errors. Preserve
  [startup evidence](evidence/v39-prism32-mac-preparation/result.json).
- Exact original Prism32 source/config/key/rubric/protocol/scorer hashes pass.
  The reviewed original first scorecard retains native grades unchanged.
  Fifteen historical variant arrays (first baseline/v36/paired-v35 and
  v37/v38 baseline/candidate/paired) align to original IDs/order/questions.
- Actual Prism32 model capture and grading **NOT RUN at this checkpoint**.

The initial freeze attempt stopped before any config/manifest write or model
question: Node reported `spawnSync git ENOBUFS` while reading every tracked path.
The repository file listing exceeded its default output buffer. Work stopped and
the user authorized narrowing the listing and retrying. The new preparer requests
only tracked `.mjs`, `index.html` and `styles.css`, exactly the entries the code
freeze used from that listing; source/key/history hashes are still added and
verified separately. No original freeze or check is weakened or overwritten.

The authorized recovery passed: the narrowed listing is set-equal to all **411**
previously eligible tracked code/assets. All **599** unit tests passed after the
change, and the first successful freeze records **430 code/input files** for 32
cases. This is a preparation result; no model question had been asked at freeze.

The [new protocol](../eval/v39-prism32-regression/PROTOCOL.md),
[runner](../tests/browser-prism32-v39.mjs),
[integrity checks](../eval/v39-prism32-regression/integrity.mjs), and
[scorer](../eval/v39-prism32-regression/score.mjs) are separate from the published
Vela32 files. Original Prism32 automated criteria are identical to the frozen
Vela32 grading helper, which is imported unchanged. No thresholds are relaxed.
The new scorer also retains every historical PASS; it cannot redefine the first
v36 failure as a pass. Both v39 variants must reach 32/32 without false accepts/
refusals or PASS loss. Assistant contradiction review remains required.

## Capture operation

Publish the preparation and new freeze before questions. Keep the repository
server on port 8767. Run once into a new, persistent repository evidence path:

```sh
RUN_CONFIG=eval/v39-prism32-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v39-prism32-mac/raw \
TEST_URL=http://127.0.0.1:8767/ node tests/browser-prism32-v39.mjs
```

The runner verifies frozen code/input identities and the recorded environment
before questions. Actual r44 UI sources must match the instrumented baseline.
Real MiniLM q8 WASM source/query/legacy-facet/planner-facet vectors and matching
literal-body cosines are saved before candidate use; Qwen stays off. Complete
UI/candidate JSON, screenshots, receipts, ledger and first outputs are preserved
with exclusive writes. There is no historical-output fallback or automatic retry.

Only after COMPLETE capture, score into another new directory:

```sh
RUN_CONFIG=eval/v39-prism32-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v39-prism32-mac/raw \
SCORE_DIR=docs/evidence/v39-prism32-mac/score \
node eval/v39-prism32-regression/score.mjs
```

Any required integrity, engineering, capture or scoring failure stops work;
retain raw/score artifacts and ask before changes, retries, commits or publishing
the failed result. The preparation checkpoint may already have been successfully
published, but that is not a claim the model gate passed. Do not overwrite any
first freeze/capture. On success, review and preserve the complete first evidence
with its hashes and an explicit partial-gate report.

The source inventory verifies 668 original cases; 103 cases and the old combined
configuration/adjudication inputs remain unavailable. A Prism32 pass would add
32 tested cases to the earlier Vela32's 32, while preserving distinct pack scores.
It cannot complete phase 1, authorize fresh confirmation or adopt v39 in r44.
