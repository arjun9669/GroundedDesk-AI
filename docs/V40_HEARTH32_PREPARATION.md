# Hearth32 v40 partial-regression preparation

Date: 2026-10-20 (Asia/Kolkata). The user authorized this next phase-1 pack after
the v40 three-pack PASS. No candidate or live-code changes. Candidate remains
`coverage-v40-dispatch-grammar`; paired v39; live 5.6/r44. Publish this checkpoint
before model questions.

The [new protocol](../eval/v40-hearth32-regression/PROTOCOL.md) requires original
Hearth32 questions, order, document pairs, source bytes and native criteria.
The first v32 attempt remains BLOCKED/UNGRADED; the v33 qualified retake remains
31 PASS / 1 PARTIAL (H30) / 0 FAIL. Preserve all later v34–v38 grades and passes.
The original blocked archive's manifest explicitly separates original local and
committed hashes; verification uses its committed hashes without changing bytes.

## Engineering checks

Bundled Node 24.19.0 darwin/arm64:

- `node --test tests/*.test.mjs`: **633 PASS**, zero failed/skipped; includes three
  new original-input/history/runner identity controls, preserving all 630 tests.
- `node eval/run.mjs --strict`: **28/28 PASS**, Keyword only.
- Syntax checks pass for the new browser runner, preparation and scorer.
- Read-only headless Chrome startup: **155.0.8059.85**, r44, three sample documents,
  no page errors or failed requests. Chrome updated since the earlier .80 study;
  the new observed version is pinned rather than assumed equivalent.
- Original source/key/config/rubric/scorer hashes, exact question alignment and
  30 historical variant arrays pass. Original Hearth citation/provenance/context/
  group/refusal/outcome scoring code matches the reused shared grader exactly.

The [configuration](../eval/v40-hearth32-regression/run-config.json) and
[456-file freeze](../eval/v40-hearth32-regression/freeze-manifest.json) pin current
code, runner/scorer, inputs, histories and fresh startup proof. Existing freezes,
first evidence, v40 candidate and live runtime remain unchanged. New `-text`
attributes apply only to new study paths; no historical renormalization.

## Authorized capture

```sh
RUN_CONFIG=eval/v40-hearth32-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v40-hearth32-mac/raw \
TEST_URL=http://127.0.0.1:8767/ node tests/browser-hearth32-v40.mjs

RUN_CONFIG=eval/v40-hearth32-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v40-hearth32-mac/raw \
SCORE_DIR=docs/evidence/v40-hearth32-mac/score \
node eval/v40-hearth32-regression/score.mjs
```

Capture all32 before scoring:28 actual MiniLM Hybrid (20 supported/eight required
refusals) and four separate lexical Comparisons, Qwen off. Independently embed
exact v40 and paired-v39 planner queries; save source/query/facet evidence before
calls. Preserve actual UI-first capture and module/UI reproduction checks.
Both candidate variants must pass32/32, preserve every historical/paired PASS and
have zero false accepts/refusals; all contemporary variants must execute without
ERROR. Use new exclusive evidence paths; question retries zero. Stop and ask after
any required failure before further implementation, retries, commit or publication.

**Model capture/scoring NOT RUN at this preparation checkpoint.** This is exposed
regression, not fresh confirmation. The full771-case gate, missing103 originals,
integration and product/release gates remain unresolved. A pass would bring v40
to128 distinct exposed cases with540 verified cases still untested. No adoption.
