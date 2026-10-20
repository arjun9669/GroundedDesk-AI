# V41 engineering and four-pack preparation

Date: 2026-10-20 (Asia/Kolkata). Official shared `main`. Protocol `72c74ad7`
preceded candidate implementation. The user authorized the isolated H04 fix and
new four-pack validation. Live 5.6/r44 and frozen v40 remain unchanged.

## Bounded implementation

[V41](../eval/answer-completeness-v41/coverage.mjs), ID
`coverage-v41-order-collection`, retains exact v40 outside-scope and lexical
Comparison behavior. Its new contract recognizes a positive named bare-order
release/clearance context only for fully accounted departure/hold facets. Unknown,
actor/password/vehicle or mixed facets in that context remain unresolved.

New literal forms cover Orders release policies, collection-day questions/units,
`Which collection day is departure` and `hold remains active`. Explicit collection
questions require collection-day evidence; another day unit cannot substitute.
The source determines the stated day, never an invented date. Existing complete
literal support, time inequalities, unique named source, finite actual anchors,
independent facet alignment, competing/negative/conditional/repeated relation
vetoes and citation limits remain. No unresolved-request fallback to old answers.

## Engineering verification

Bundled Node24.19.0 darwin/arm64:

- `node --test tests/*.test.mjs`: **667 PASS**, zero failed/skipped (633 existing,
  31 public-entry v41 controls, three four-pack runner/input/history controls).
- `node eval/run.mjs --strict`: **28/28 PASS**, Keyword only.
- New runner/preparer/scorer syntax checks PASS.
- New read-only Chrome startup: **155.0.8059.85**, r44, three bundled documents,
  no failed requests or page errors. No source upload/model questions.
- Original source/key/config/rubric identities and exact question alignment PASS;
  preserve all historical scores, v32 BLOCKED/UNGRADED, qualified v33 partial and
  first v40 failures. Native automated grader is reused unchanged.

Original H04 succeeds in a constructed public-entry fixture, with two separately
scored facets and one original literal quote. This is engineering evidence, not
an actual-model repair claim. Old v40 still plans H04 as unresolved in controls.
All old tests/candidates/runners/freezes/first results remain intact.

## Execution freeze and scope

The [configuration](../eval/v41-four-pack-regression/run-config.json) and
[500-file freeze](../eval/v41-four-pack-regression/freeze-manifest.json) pin
code, transitive imports/planners, scripts, original inputs/criteria/history and
observed environment before model questions. Publish preparation first. New
`-text` attributes protect only new v41 study files; no historical normalization.

```sh
RUN_CONFIG=eval/v41-four-pack-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v41-four-pack-mac/raw \
TEST_URL=http://127.0.0.1:8767/ node tests/browser-four-pack-v41.mjs

RUN_CONFIG=eval/v41-four-pack-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v41-four-pack-mac/raw \
SCORE_DIR=docs/evidence/v41-four-pack-mac/score \
node eval/v41-four-pack-regression/score.mjs
```

Capture128 distinct previously exposed cases across Vela32,Prism32,Lumen32,Hearth32:
112 actual MiniLM Hybrid and16 separate lexical Comparisons; Qwen off. Save actual
UI and fresh source/query/legacy-facet/v41 and independently embedded paired-v40
planner vectors before invoking adapters. Preserve module/UI identity checks and
exclusive evidence writes. Capture all before unchanged native scoring, review
full literal support, and require32/32 per pack in both variants with no historical
PASS losses, false accepts/refusals or contemporary execution errors. Paired v40
H04 FAIL is expected historical behavior, not a new required check failure.

**Actual capture/scoring NOT RUN at this preparation checkpoint.** Any required
failure stops work for user review before retries, further implementation, commit
or publication. No question retries or replay of old vectors. No live adoption.
The same540 verified cases /15 other packs and103 unavailable originals remain
outside this partial run; full regression, fresh confirmation and release gates
remain incomplete.
