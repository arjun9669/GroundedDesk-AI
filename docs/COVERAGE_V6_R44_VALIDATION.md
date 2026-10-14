# Coverage v6: predicate repair verified, duration eligibility still fails

Production remains **2026-10-13-r44**. V6 is an isolated experiment, not deployed retrieval behavior. Actual installed Chrome **155.0.8059.40**, actual local **Xenova/all-MiniLM-L6-v2 q8 WASM**, Hybrid enabled, Qwen disabled. All **179 Hybrid Q&A and 24 separate unchanged lexical Comparison cases** completed once, without infrastructure retries, model-loading failures, mocks or Keyword fallback.

All203 cases are **known in-sample regressions**. The frozen gate fails on F12, so **no new public sample was generated or consumed**. Original questions, documents, keys, scoring criteria and every historical first result are unchanged.

## Results

Cells are **PASS / PARTIAL / FAIL**. Sets use different frozen rubrics; they must not be pooled into a product accuracy percentage.

| Known set | Production UI r44 | Paired v5 fixed / section | V6 fixed / section |
| --- | --- | --- | --- |
| Atlas15 | 15 / 0 / 0 | 15 / 0 / 0, both | 15 / 0 / 0, both |
| Meridian24 | 23 / 1 / 0 | 24 / 0 / 0, both | 24 / 0 / 0, both |
| Lantern32 | 32 / 0 / 0 | 32 / 0 / 0, both | 32 / 0 / 0, both |
| Aster32 | 32 / 0 / 0 | 32 / 0 / 0, both | 32 / 0 / 0, both |
| Cobalt16 | 16 / 0 / 0 | 16 / 0 / 0, both | 16 / 0 / 0, both |
| Retrieval Quality28 | 16 / 7 / 5 | 28 / 0 / 0, both | 28 / 0 / 0, both |
| Exposed SQuAD24 | 13 / 1 / 10 | 20 / 0 / 4, both | 20 / 0 / 4, both |
| Exposed Mixed32, original name FreshMixed32 | 22 / 3 / 7 | 28 / 0 / 4, both | 29 / 0 / 3, both |

Original119 stays **119/119**, RQ28 stays **28/28**, and all **four compound controls PASS** in both current variants. Exposed Mixed32 has **21/24 supported PASS**, **4/4 compound PASS**, **4/4 unsupported PASS**. These are exposed regression scores, not fresh or independent confirmation.

Every v5 PASS is preserved in the controlled same-session comparison; **F10 improves FAIL to PASS**. However, the frozen development gate must also preserve earlier production/v2/v3/v4 passes. **F12 still loses a prior PASS**, so that gate **FAILS**. Fresh confirmation is **NOT RUN** and no release consideration or original5.6 milestone completion is claimed.

## What changed and what the paired test establishes

V6 retains v5 condition/excluded-actor protection, literal recovery, numbered exception coverage and separate compound citations. Generic interrogative actor questions of the form “Which … was …” or “Who is …” favor the printed predicate. Generic duration requests favor explicit number/time-unit evidence with at least two material question matches. These are lexical/type heuristics, not general named-entity recognition or entailment verification.

Chrome was checked before questions and held at **155.0.8059.40**, the same version recorded for v5. More importantly, this run computed **v5 and v6 on the same real query/chunk vectors and indexes** after capturing the production UI. All paired v5 quotations/filenames match the previously graded v5 records. The comparison therefore does not rely solely on historical cross-run observations or the v4/v5 browser-version difference.

**F10 now quotes British Prime Minister Edward Heath “was so worried”**, correctly retaining the asked predicate/actor instead of background about the U.S. Gold evidence, literal provenance and expected document match. The quotation is long but source-literal and within the620-character bound; this is not a minimal-quotation-scope claim.

## Why F12 still fails

The displayed answer remains background about military action and omits **10 years**. The duration-containing source sentence ends with a closing quotation mark and uses future/modal wording (“would need to last”). An inherited body-eligibility filter admits only sentences ending directly in punctuation or containing its small operative-verb set. That sentence matches neither branch, so it never reaches the new duration scoring rule.

[Post-capture eligibility diagnostic](evidence/coverage-v6-r44/F12-eligibility-diagnostic.json) records both filter checks as false. Its source text is diagnostic context only: it was **not displayed as the answer and receives no scoring credit**. No code or threshold was repaired after capture. Unit checks covered a plain duration sentence but did not cover this closing-quotation/modal combination;310 passing unit tests did not establish benchmark success.

Other outstanding failures remain **E08** tower-window location, **E12** Japanese collection date range, **E13** net mechanical energy, **E24** oxygen energy content, **F16** Watt and **F18** the7-million duty value. E02 and F04 repairs remain intact. F18 fails both variants, consistently with the explicitly corrected earlier narrative and immutable original scorecards.

## Citations, refusals and original-case review

Each v6 variant has **204/204 source-literal citations**. Original119 has **124/124** relevant citations; RQ28 has **26/26** exact-evidence relevant citations. Original PDF quotations independently match pypdf and browser PDF.js extraction. All **27 unsupported controls explicitly refuse with zero citations**, with zero unsupported false acceptances and zero false refusals. Those counts do not erase wrong/incomplete accepted answers on supported questions.

Public citation-relevance fields retain the frozen **gold-paragraph containment proxy**, not semantic support. Exposed24: fixed **23/24**, sections **24/24** in the expected paragraph; **20/24** contain a requested span. Exposed Mixed32: **30/30** in the paragraph; **27/30** contain a requested span. [Separate span diagnostics](evidence/coverage-v6-r44/post-capture-direct-span-diagnostics.json) preserve this distinction without changing primary scores.

All86 changed original variant records preserve the already independently reviewed v5 displayed answers, filenames and required facts; current provenance was reverified. Scope cautions remain for Lantern H18/Aster H16's extra scheduled start times and Atlas D05's inline numbered heading. All original frozen-rubric judgments and historical scores remain separate from this new regression.

## Reproduction and evidence

- [Frozen protocol](../eval/answer-completeness-v6/PROTOCOL.md), commit `aee2c2c`.
- [Candidate](../eval/answer-completeness-v6/coverage.mjs), frozen commit `1a82b4b`; [raw hash manifest](../eval/answer-completeness-v6/freeze-manifest.json).
- [Input verification](../eval/answer-completeness-v6/prepare.py) and [paired actual Chrome runner](../tests/browser-coverage-v6-validation.mjs), frozen before answers in `f83ac01`.
- [Grader](../eval/answer-completeness-v6/score.mjs) and [gate decision](evidence/coverage-v6-r44/decision.json).
- Public scorecards: [RQ28](evidence/coverage-v6-r44/RetrievalQuality28-scorecard.json), [exposed24](evidence/coverage-v6-r44/ExternalSQuAD24-scorecard.json), [exposed32](evidence/coverage-v6-r44/FreshMixed32-scorecard.json).
- Exact answers, source quotes, model readiness, screenshots, extraction and paired-v5 outputs: [RQ28 capture](evidence/coverage-v6-r44/RetrievalQuality28/capture.json), [exposed24 capture](evidence/coverage-v6-r44/ExternalSQuAD24/capture.json), [exposed32 capture](evidence/coverage-v6-r44/FreshMixed32/capture.json). [Source attribution/license](evidence/coverage-v6-r44/ATTRIBUTION.md).

All68 original/public source and key hash checks passed; source hashes were rechecked after capture. Atlas current original owner PDF hashes were verified against the pre-run record; an original historical Atlas manifest remains unavailable. All179 actual query vectors have384 dimensions. Tested raw candidate bytes match the frozen Git blob/hash, and production modules are unchanged. Private original packs/keys and the complete203-case Markdown/JSON/archive are delivered locally only.

All **310 unit tests**, strict offline toy evaluation and CI browser feature smokes pass; these are separate from actual-MiniLM accuracy evidence. Fresh-stage helpers were prepared but not executed. No paid service or runtime release was added.

The next separately frozen repair should recognize sentence-ending quotation/bracket punctuation without admitting standalone headings. Preserve this failed v6 result and test that general eligibility change before another full regression. It cannot be credited to the present attempt.
