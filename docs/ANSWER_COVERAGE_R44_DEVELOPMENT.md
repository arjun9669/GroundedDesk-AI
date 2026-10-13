# Bounded answer coverage — r44 development experiment

The isolated prototype improves answer completeness on the unchanged, known Retrieval Quality 28 fixtures. Production remains **2026-10-13-r44**. This is a self-authored, in-sample development regression, not new independent accuracy or a production feature.

| Variant | PASS | PARTIAL | FAIL |
| --- | ---: | ---: | ---: |
| Preserved fixed-window baseline | 16 | 7 | 5 |
| Fixed windows + answer coverage | 23 | 1 | 4 |
| Preserved section-window baseline | 19 | 7 | 2 |
| Section windows + answer coverage | 27 | 1 | 0 |

No original PASS case regressed in either comparison. All four unsupported requests still explicitly refused with zero citations. Each candidate has 26/26 valid quotation-provenance checks; conservative exact-evidence relevance is 22/26 for fixed windows and 26/26 for section windows. There are zero false acceptances and zero false refusals. The frozen development gate passed; production promotion remains deferred.

## What the experiment changes

The standalone wrapper keeps retrieval ranks, chunking, embeddings, lexical statistics, thresholds and refusal guards unchanged. It expands an accepted, section-anchored quote only within a local Markdown paragraph. It can select a unique applicable printed clock/event branch, include requested adjacent conditions and exceptions, or cover up to three explicitly named ranked documents separately. All returned quotations are contiguous original spans, capped at three sentences and 620 characters. It never turns a production refusal into an acceptance.

Headings, blank paragraphs and labeled commentary lines bound expansion. Unsectioned files retain their existing quote behavior. No corpus names, case IDs, benchmark values or expected sentences occur in the algorithm. Production imports none of the experimental module. Separate lexical Comparison is unchanged.

## Remaining observed problems

- **RQ13 remains PARTIAL in both candidates:** normal 70-hour and dusty-bay 35-hour lubrication appear, but unchanged 14-day inspection is absent. Inspection/inspected facet matching is a remaining limitation of the lightweight lexical folding. Expanded context is not credited.
- **Fixed-window RQ02, RQ07, RQ10 and RQ21 remain FAIL:** the original selected quote is a document title without a local section anchor, so the wrapper preserves it. RQ02's appropriate departure branch is recovered only with section-aware anchoring; all four pass with the combined candidate.

The combined candidate improves the earlier departure-condition and replacement-calibration failures, and recovers route approval, retention exceptions and both requested documents for compound controls. It still does not establish semantic entailment or generalization. No rules or expected answers were changed after observing these outputs; the remaining partial is retained.

## Capture method and infrastructure qualification

The protocol was frozen in commit `e674ff0` before implementation and any new observations. The candidate implementation was committed in `06abee7` before evaluation. All frozen protocol/input hashes were verified before capture. Actual installed Google Chrome 154.0.8037.98 loaded actual local `Xenova/all-MiniLM-L6-v2` q8 WASM; Qwen remained disabled. Only original source documents were uploaded.

Both original variants' filenames, displayed quotations and excerpts reproduced exactly before candidate execution. That replay was locked to a separate file. Candidate outputs were computed by an isolated browser module using actual locally generated query vectors, and rendered in a clearly labeled experimental observation panel for screenshots. These are not production main-Q&A UI results. The prior UI captures remain untouched. Retrieval recall is unchanged within each variant; the measured gain is in answer selection.

All 28 candidate outputs were captured once and preserved. The combined runner subsequently timed out before any Cobalt question, because clearing documents disabled Hybrid. `development/failure.json` records this blocker. A separate Cobalt recovery explicitly loaded MiniLM; it did not rerun or replace the 28 candidate outputs. The runner's future model-transition step was corrected without changing the tested coverage implementation. No mock vectors or bundled samples were substituted.

## Existing Cobalt16 controls

The separate recovery captured 12 actual-MiniLM browser-module Hybrid cases and four original lexical Comparison cases from the unchanged frozen Cobalt pack. Independently checked against its original rubric: **16 PASS / 0 PARTIAL / 0 FAIL**, 16/16 relevant and source-valid quotations, four zero-citation refusals, zero false acceptances/refusals. Every candidate source output equals its paired production source output; all 12 Hybrid answers match preserved r41 answers after whitespace normalization. H05 retains the original anaphoric `there` qualification accepted by the frozen rubric.

These are in-sample controls, not a new first look. Original Atlas/Meridian/Lantern/Aster/Cobalt scores remain unchanged. Full real-model Atlas, Meridian, Lantern and Aster packs were not rerun in this experiment; their existing unit controls passed with the rest of the suite. No wider real-model validation is claimed.

## Every development case

| Case | Original fixed | Fixed + coverage | Original sections | Sections + coverage |
| --- | --- | --- | --- | --- |
| RQ01 | PASS | PASS | PASS | PASS |
| RQ02 | FAIL | FAIL | FAIL | PASS |
| RQ03 | PASS | PASS | PASS | PASS |
| RQ04 | PASS | PASS | PASS | PASS |
| RQ05 | PASS | PASS | PASS | PASS |
| RQ06 | PARTIAL | PASS | PARTIAL | PASS |
| RQ07 | FAIL | FAIL | PASS | PASS |
| RQ08 | PARTIAL | PASS | PARTIAL | PASS |
| RQ09 | PASS | PASS | PASS | PASS |
| RQ10 | FAIL | FAIL | PASS | PASS |
| RQ11 | PASS | PASS | PASS | PASS |
| RQ12 | PASS | PASS | PASS | PASS |
| RQ13 | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| RQ14 | FAIL | PASS | FAIL | PASS |
| RQ15 | PASS | PASS | PASS | PASS |
| RQ16 | PASS | PASS | PASS | PASS |
| RQ17 | PARTIAL | PASS | PARTIAL | PASS |
| RQ18 | PASS | PASS | PASS | PASS |
| RQ19 | PASS | PASS | PASS | PASS |
| RQ20 | PASS | PASS | PASS | PASS |
| RQ21 | FAIL | FAIL | PASS | PASS |
| RQ22 | PARTIAL | PASS | PARTIAL | PASS |
| RQ23 | PARTIAL | PASS | PARTIAL | PASS |
| RQ24 | PARTIAL | PASS | PARTIAL | PASS |
| RQ25 | PASS | PASS | PASS | PASS |
| RQ26 | PASS | PASS | PASS | PASS |
| RQ27 | PASS | PASS | PASS | PASS |
| RQ28 | PASS | PASS | PASS | PASS |

## Validation and next gate

The full 280-test unit suite passed, as did the strict offline toy evaluation. A further frozen-protocol hash guard passed separately (281 tests in CI). Focused checks cover clock equality and either side, replacement triggers, exact span provenance, paragraph boundaries, unchanged unsectioned/refusal behavior and named current-document coverage. CI also retains the existing ten Chromium feature scripts; those are separate from the actual MiniLM evidence.

The next separately frozen experiment should address the inspection facet and broader section formats, followed by full exposed-benchmark regressions. Before production adoption or independent accuracy claims, require a genuinely unseen externally controlled test pack. This self-authored suite and new self-authored fixtures cannot meet that independent gate. No paid service or production runtime dependency was added.

## Evidence and reproducibility

[Complete exact outputs, missing evidence and source context](./evidence/answer-coverage-r44/development/REPORT.md) · [Development JSON scorecard](./evidence/answer-coverage-r44/development/scorecard.json) · [Locked original replay](./evidence/answer-coverage-r44/development/baseline-replay.json) · [Raw candidate and ranks](./evidence/answer-coverage-r44/development/candidate.json) · [Initial infrastructure failure](./evidence/answer-coverage-r44/development/failure.json) · [Cobalt exact outputs](./evidence/answer-coverage-r44/cobalt-control/REPORT.md) · [Cobalt JSON scorecard](./evidence/answer-coverage-r44/cobalt-control/scorecard.json) · [Frozen protocol](../eval/answer-completeness/PROTOCOL.md)

Serve the repo with `python -m http.server 8786 --bind 127.0.0.1`. Set `TEST_URL` to that local URL and `EVIDENCE_DIR` to a new directory, then run `node tests/browser-answer-coverage.mjs`. Score with `node eval/answer-completeness/score.mjs <new-directory>`. A separate recovery, if necessary, uses `node tests/browser-answer-coverage-control.mjs` with a different directory and `node eval/answer-completeness/grade-controls.mjs <control-directory>`. Runners/scorers reject overwriting preserved outputs. Repeats are regressions, not additional first results. Installed Chrome and pinned Playwright are required; model loading requires public downloads.
