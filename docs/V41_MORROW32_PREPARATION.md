# Morrow32 v41 exposed-regression preparation

Date: 2026-10-20 (Asia/Kolkata). User authorized Morrow32 as the next phase-1 pack.
Candidate unchanged `coverage-v41-order-collection`, paired frozen v40; live5.6/r44
unchanged. Publish preparation before model questions. This is exposed regression,
not fresh confirmation or adoption.

The [new protocol](../eval/v41-morrow32-regression/PROTOCOL.md) preserves original
v30 input/key/config/scorer bytes and the original PROTOCOL.md containing the
native scoring rubric (there is no separate FROZEN_RUBRIC.md in that pack).
Keep exact question order and document pairs; map original Windows paths to verified
relative files without modifying originals. Retain first v30 30/0/2 (M11,M32),
unchanged assistant review and the recorded archive filename erratum: the original
archive name said v28 while frozen identities establish v30. Do not rename or
rewrite historical evidence. Guard all historical passes through v38.

## Engineering verification

Bundled Node24.19.0 darwin/arm64:

- `node --test tests/*.test.mjs`: **670 PASS**, zero failed/skipped (667 preserved
  tests plus three input/history/runner identity controls).
- `node eval/run.mjs --strict`: **28/28 PASS**, Keyword only.
- New browser runner/preparer/scorer syntax checks PASS.
- Read-only Chrome startup: **155.0.8059.85**, r44, three bundled documents,
  no page errors or failed requests; no model or source upload/questions.
- Original source/config/key/protocol/scorer hashes and45 historical variant arrays
  verify exact IDs/questions/order. First reviewed variants equal first native
  grades; zero historical grade changes. Original citation/provenance/context/
  group/refusal/outcome code matches the reused shared grader exactly.

The [configuration](../eval/v41-morrow32-regression/run-config.json) and
[469-file freeze](../eval/v41-morrow32-regression/freeze-manifest.json) pin current
code/imports/planners, runner/scorer, original inputs/history and startup environment.
All candidates, earlier first artifacts and existing freezes remain unchanged.
New `-text` patterns cover only new study files; no historical renormalization.

## Authorized execution

```sh
RUN_CONFIG=eval/v41-morrow32-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v41-morrow32-mac/raw \
TEST_URL=http://127.0.0.1:8767/ node tests/browser-morrow32-v41.mjs

RUN_CONFIG=eval/v41-morrow32-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v41-morrow32-mac/raw \
SCORE_DIR=docs/evidence/v41-morrow32-mac/score \
node eval/v41-morrow32-regression/score.mjs
```

Capture all32 original cases before grading:28 actual MiniLM Hybrid (20 supported/
eight required refusals), four separate lexical Comparisons, Qwen off. Independently
embed exact candidate and paired-v40 planner queries; save actual source/query/
legacy-facet/planner evidence before calls. Actual r44 UI output precedes candidate
calls and must match instrumented baseline sources. Use exclusive new evidence paths;
no question retries or saved-vector replay. Both candidate variants require32/32,
zero false accepts/refusals, all historical/production/paired passes preserved, and
no contemporary execution errors. Review full literal relevance/completeness.

**Model capture/scoring NOT RUN at this preparation checkpoint.** Any required
failure stops work for user input before retries, further implementation, commit
or publication. A pass would bring v41 to160 distinct exposed cases, with508 verified
cases /14 packs still untested and103 originals/combined configuration unavailable.
Full regression, fresh confirmation and integration/product/release gates stay open.
