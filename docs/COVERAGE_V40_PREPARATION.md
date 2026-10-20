# V40 engineering and three-pack freeze

Date: 2026-10-20 (Asia/Kolkata). Official checkout: shared `main`.
The user authorized implementation and one separately frozen three-pack run after
the Lumen32 investigation. Protocol `894bc74` preceded candidate coding.

## Implementation

The isolated [v40 adapter](../eval/answer-completeness-v40/coverage.mjs) retains
v39 for outside-scope requests and its exact lexical Comparison export. The new
bounded contract accepts positive `should` departure questions, `departure moves
to`, `following` day and `hold is (still) active`. It preserves literal spans,
entity/time scope, cutoff inequalities, complete facet accounting, finite actual
body anchors and independent aligned facet evidence. A bounded `does not move to`
projection only vetoes a conflicting relation; it cannot authorize a quotation.
Governed unresolved requests still refuse without an inherited fallback.

All frozen v39 code/tests/first evidence and live 5.6/r44 remain unchanged. This
candidate has no live imports. The original L04 question/source now succeeds in a
constructed engineering fixture; that is **not an actual-model result**.

## Verification before model questions

Bundled Node 24.19.0 on darwin/arm64 passed:

- `node --test tests/*.test.mjs`: **630 PASS**, zero failed/skipped (602 preserved
  tests, 25 v40 public-entry controls, three runner/input/history controls).
- `node eval/run.mjs --strict`: **28/28 PASS**, Keyword only.
- Syntax checks for the new browser runner/preparer/scorer and diff review.
- New read-only headless Chrome startup: **155.0.8059.80**, r44, three sample
  documents, no page errors or failed requests. No source upload/model questions.
- Preparation verifies original frozen sources, keys/order/questions/native rubric
  identities and aligned historical first/later grades across all three packs.

The [run configuration](../eval/v40-three-pack-regression/run-config.json) and
[470-file freeze](../eval/v40-three-pack-regression/freeze-manifest.json) pin the
candidate/planner, imports, scripts, inputs, history and startup proof. Original
file bytes and every historical freeze are preserved. New `-text` attributes
protect only new v40 artifacts; no archived evidence is renormalized.

## Execution and interpretation

Publish preparation before executing:

```sh
RUN_CONFIG=eval/v40-three-pack-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v40-three-pack-mac/raw \
TEST_URL=http://127.0.0.1:8767/ node tests/browser-three-pack-v40.mjs

RUN_CONFIG=eval/v40-three-pack-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v40-three-pack-mac/raw \
SCORE_DIR=docs/evidence/v40-three-pack-mac/score \
node eval/v40-three-pack-regression/score.mjs
```

The browser runner records r44 UI results, fresh actual source/query/legacy-facet
and v40 planner-facet vectors. Paired v39 uses separately embedded exact v39
planner queries, also saved before invocation; L04's unresolved v39 planner has
zero facets. Both adapters use the same freshly captured source corpus, not old
saved vectors. Qwen is off. Comparison remains lexical and is reported separately.

Capture 96 distinct exposed cases (84 Hybrid / 12 Comparisons), then apply unchanged
native automated criteria per 32-case pack. Review relevant literal completeness,
paired execution errors and facet cosine alignment before acceptance. Any required
failure stops work for user review. No question retry or first-evidence overwrite.

**Actual model capture and scoring NOT RUN at this checkpoint.** V39's first
Lumen32 result remains 31/0/1 FAIL in both variants. Full 771-case regression,
103 unavailable original cases, prospective confirmation and integration/product/
release gates remain unresolved. This partial regression cannot authorize adoption.
