# V43 engineering and nine-pack preparation

Date:2026-10-20, Asia/Kolkata. Official shared main; live5.6/r44 unchanged.
[Protocol](../eval/answer-completeness-v43/PROTOCOL.md) was published as `c88c6fbc`
before implementation. Frozen v42 and all historical first evidence remain intact.

## Bounded implementation

V43 owns the deferred current-guide, shortened request name, anonymous order and
fronted departure/hold forms RQ02,C09,B14,F14. New scope modes require a unique
whole-token filename prefix, an explicit current dispatch-guide heading, or a
unique applicable policy document across the corpus. Existing exact-name/ticket
scope stays intact. Unknown clauses and ambiguous/unsupported policies refuse.
Source grammar adds optional on, passive requests, bound At-entity prefixes and
two explicit hold forms. Original literal quotes and full-facet evidence binding
remain; each compound request uses independently embedded answer-free queries.
Production imports and lexical Comparison behavior are unchanged.

## Engineering correction and results

The first full engineering run recorded762 PASS/1 FAIL of763, before any model
questions. The new history validator compared complete reviewed rows; Cedar and
Bracken reviews add only review_note metadata. Work stopped. The user approved
correcting validation and rerunning checks. The corrected validator permits only
that text annotation, compares every native field unchanged and rejects changed
grades, quotes, unknown fields or invalid annotation types. Original files were
never edited; original failure and approved recheck logs are preserved verbatim.

Approved checks:764/764 unit tests, strict28/28 bundled Keyword; Node24.19.0
(darwin/arm64). Original sources/keys/configs/rubrics/scorers and all selected
historical native grades align. Read-only installed Chrome155.0.8059.85 startup
passes with three samples, r44, no page errors/failed requests, no model questions.
Constructed grammar checks are engineering evidence, not actual model quality.

## Execution freeze

[Config](../eval/v43-nine-pack-regression/run-config.json) and
[609-file freeze](../eval/v43-nine-pack-regression/freeze-manifest.json) pin source,
module, runner/scorer, input, rubric, history and environment identities. Freeze
must reach GitHub before questions. New evidence directories are exclusive.
284 distinct exposed cases: Vela32,Prism32,Lumen32,Hearth32,Morrow32,Cedar32,
Bracken32,Flint32,RetrievalQuality28;252 Hybrid/32 lexical Comparisons. Actual
q8 MiniLM WASM; Qwen off. Pair against v42 with its own independent facet queries.

Cedar/Bracken retain their original grader without the later citation amendment;
Flint and the prior five retain native citation integrity. RetrievalQuality28
uses its own unchanged exact-evidence grader and separate retrieval metrics;
its original chunking-promotion gate is not an answer-wrapper gate. Preserve any
historical/paired/production PASS; all nine native families have all-PASS history.
No retries, scoring edits after observation or historical evidence normalization.

```sh
RUN_CONFIG=eval/v43-nine-pack-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v43-nine-pack-mac/raw \
TEST_URL=http://127.0.0.1:8767/ node tests/browser-nine-pack-v43.mjs

RUN_CONFIG=eval/v43-nine-pack-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v43-nine-pack-mac/raw \
SCORE_DIR=docs/evidence/v43-nine-pack-mac/score \
node eval/v43-nine-pack-regression/score.mjs
```

Model capture/scoring NOT RUN at this preparation checkpoint. Stop and ask on any
required failure. Success still leaves384 verified cases/10packs and103 unavailable
originals/combined configuration; phase1/full regression, prospective confirmation,
integration, product qualification and release remain open. No pooled accuracy.
