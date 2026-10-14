# Coverage v3: sentence selection improves some cases but fails the release gate

Production remains **2026-10-13-r44**. The frozen v3 candidate is an isolated evaluation module; no application or production retrieval code changed. Actual installed Chrome **154.0.8037.98** ran actual local **Xenova/all-MiniLM-L6-v2**, q8 WASM, with Hybrid enabled and Qwen disabled. All 203 cases were captured once in a completed run, without infrastructure retries, mock vectors or silent Keyword fallback. Main UI baselines and experimental browser-module answers are separately recorded. The 24 original Comparison cases remain separate, unchanged lexical workflows.

## Results

Each cell is **PASS / PARTIAL / FAIL**. These sets use different frozen rubrics and cannot be pooled into one accuracy figure.

| Test set | Production UI r44 | Fixed + isolated v3 | Sections + isolated v3 |
| --- | --- | --- | --- |
| Atlas15, known regression | 15 / 0 / 0 | 15 / 0 / 0 | 15 / 0 / 0 |
| Meridian24, known regression | 23 / 1 / 0 | 23 / 1 / 0 | 23 / 1 / 0 |
| Lantern32, known regression | 32 / 0 / 0 | 29 / 1 / 2 | 29 / 1 / 2 |
| Aster32, known regression | 32 / 0 / 0 | 30 / 0 / 2 | 30 / 0 / 2 |
| Cobalt16, known regression | 16 / 0 / 0 | 16 / 0 / 0 | 16 / 0 / 0 |
| Retrieval Quality28, known development | 16 / 7 / 5 | 28 / 0 / 0 | 28 / 0 / 0 |
| Previously exposed public SQuAD24, regression | 13 / 1 / 10 | 20 / 0 / 4 | 20 / 0 / 4 |
| Fresh 24 externally authored supported questions | 18 / 0 / 6 | 20 / 0 / 4 | 19 / 0 / 5 |
| Fresh four constructed compound controls | 0 / 3 / 1 | 0 / 4 / 0 | 0 / 4 / 0 |
| Fresh four self-authored unsupported controls | 4 / 0 / 0 | 4 / 0 / 0 | 4 / 0 / 0 |

FreshMixed32 totals: production **22 / 3 / 7**, fixed candidate **24 / 4 / 4**, section candidate **23 / 4 / 5**. It includes a public externally authored component, plus controls constructed here; it is not a sealed independent benchmark, official SQuAD EM/F1 score or representative product accuracy estimate. The model may previously have encountered public Wikipedia text. Future reruns of this pack are in-sample.

The predeclared gate required no existing PASS regressions, at least **21/24** fresh supported passes, and all eight constructed controls passing. It **FAILS** all three requirements. No production adoption or completion of the original 5.6 retrieval-quality milestone is claimed.

## Five historical PASS regressions

The same five regressions occur in both experimental index variants. Production baselines remain correct.

| Case | Observed regression | Outcome |
| --- | --- | --- |
| Lantern H06 | 18-hour cancellation receives an unrelated 72-hour full-refund quotation instead of the non-refundable branch | FAIL |
| Lantern H18 | Escalation actor/deadline present; required 03:10 retry omitted | PARTIAL |
| Lantern H21 | After-17:00 request selects the before-17:00 replacement branch | FAIL |
| Aster H01 | Ordinary visitor entry selects staff check-in instead | FAIL |
| Aster H03 | 38-hour cancellation selects the 96-hour full-refund branch | FAIL |

Material-word overlap can override a correctly selected operative rule; source authenticity does not prevent a wrong conditional answer. No code was tuned after observing these failures. Meridian I15 remains PARTIAL: normal 60-hour and dusty-bay 30-hour lubrication appear, but the unchanged inspection qualification is still missing. Its question does not activate the candidate's explicit compound/exception trigger. Atlas D05 keeps the required P1 actor and 30-minute target while removing unrelated P2/examples. Aster H16 preserves all required facts but adds an unrequested scheduled start time; its quotation-scope caution is retained under the unchanged historical rubric.

## Fresh sample failures and partials

The deterministic new sample uses Yuan dynasty, the 1973 oil crisis, steam engines and construction. All four v2 article titles were excluded. No difficulty-based resampling occurred. The candidate was committed before this sample was generated or read. Source bodies, original questions and annotated spans are unchanged; document/context headings are adapter formatting.

Section-candidate failures:

- **F08:** first oil crisis start shown instead of the second crisis year, 1979.
- **F10:** literal quotation begins after an abbreviated subject; required British identification omitted.
- **F16:** definition of engine duty shown instead of its inventor, Watt.
- **F18:** Watt/Newcomen comparison shown without the required 7-million duty value. Fixed variant passes this case.
- **F23:** quotation splits at `i.e.` and omits the property owner.

All **C01–C04 compound controls are PARTIAL**: the first required answer appears, the second is omitted. These controls join two original questions sharing a source paragraph with ` Also, `; the algorithm recognizes multi-source intent but does not recover both requested facets. All **U01–U04** explicitly refuse with zero citations. Constructed missing password/account/DOB/price controls have audited source absence; four successful controls do not establish broad refusal accuracy.

Exposed SQuAD24 still fails E08, E12, E13 and E24: missing tower-window location, Japanese collection date range, net mechanical energy and oxygen energy content respectively. Its original 13/1/10 result is preserved; the new 20/0/4 is an in-sample regression only.

## Provenance, relevance and scoring qualifications

Each candidate variant has **202/202 source-literal quotations**, including original PDF quotes independently matched against pypdf extraction. There are **27 zero-citation refusals** per variant across the known/fresh unsupported controls, with **zero unsupported false acceptances and zero false refusals**. Those counts do not erase the wrong accepted answers on supported conditional questions.

Original 119 controls: **120/124 citations relevant** per candidate; the four wrong conditional/excluded-actor citations are irrelevant. RQ28: **26/26** exact-evidence citations relevant per candidate.

Public-data `citation_relevance` fields use the frozen **gold paragraph containment proxy**, not a semantic entailment judge. Exposed24: fixed **23/24**, sections **24/24** in the gold paragraph; only **20** quotations in either variant contain a requested gold span. FreshMixed32: **28/28** candidate citations are within the expected gold paragraph, but only **24 fixed / 23 section** contain any requested gold span. A quotation can therefore be source-valid and in the correct paragraph while failing to answer the question. Separate [post-capture diagnostics](evidence/coverage-v3-r44/post-capture-direct-span-diagnostics.json) expose this distinction without changing frozen primary scores.

All 94 changed historical variant records were reviewed: 80 remove only standalone headings while retaining the complete previously graded body text; 14 records cover seven distinct substantive changes, explicitly adjudicated against the original required facts. The five regressions, unchanged Meridian partial, narrower Atlas quote and overbroad Aster H16 quotation are preserved. Expanded retrieval context receives no missing-fact credit.

## Reproducibility and evidence

- [Frozen protocol](../eval/answer-completeness-v3/PROTOCOL.md), commit `d1fedcf`.
- [Isolated candidate](../eval/answer-completeness-v3/coverage.mjs), frozen commit `19af977` before fresh sampling.
- [Fresh key](../eval/answer-completeness-v3/fresh32/fixed-answer-key.json), [manifest](../eval/answer-completeness-v3/fresh32/freeze-manifest.json), [attribution/license](../eval/answer-completeness-v3/fresh32/ATTRIBUTION.md), freeze commit `4c3b61d`.
- [Actual Chrome runner](../tests/browser-coverage-v3-validation.mjs), [grader](../eval/answer-completeness-v3/score.mjs), [decision/score summaries](evidence/coverage-v3-r44/decision.json).
- Public per-case records, exact answers/quotations, source extraction, query vectors, model readiness and screenshots: [RQ28](evidence/coverage-v3-r44/RetrievalQuality28/capture.json), [exposed24](evidence/coverage-v3-r44/ExternalSQuAD24/capture.json), [fresh32](evidence/coverage-v3-r44/FreshMixed32/capture.json).
- Public machine-readable scorecards: [RQ28](evidence/coverage-v3-r44/RetrievalQuality28-scorecard.json), [exposed24](evidence/coverage-v3-r44/ExternalSQuAD24-scorecard.json), [fresh32](evidence/coverage-v3-r44/FreshMixed32-scorecard.json).

All original frozen source/key manifests and fresh sample hashes were checked (68 file checks). Atlas original owner PDF hashes were recorded before testing and reverified; an original historical Atlas hash manifest is unavailable, so its integrity claim is weaker. Original private keys/source packs, all 203 case captures and the complete report are delivered locally to the owner, not newly published to Git. Runtime modules and candidate bytes were rechecked against their pre-test commits. The primary reports and captures remain immutable.

Unit and frozen-integrity checks pass; these checks are not actual-MiniLM accuracy evidence. Real-model results above come from the separate Chrome run. No paid service, backend or runtime release was added.

## Next experiment suggested by the preserved failures

A separately frozen successor should preserve the operative conditional anchor before refining quotations, split sentences without treating abbreviations as boundaries, and collect explicitly requested facets within the same source paragraph. Exception coverage must handle an implicit change question without requiring the word “exception.” These are recommendations for a new attempt; this candidate was not repaired after capture.


## Narrative correction — 14 October 2026

The earlier prose claiming that fixed F18 passes is incorrect. The immutable original per-case scorecards show **F18 FAIL in both fixed and section variants**. V3’s fixed/section difference is F08; v4’s difference is F04. Original aggregate scores, source documents, keys, raw captures and evidence ZIPs remain unchanged. [Verified per-case correction](evidence/coverage-v5-r44/F18-narrative-correction.json).
