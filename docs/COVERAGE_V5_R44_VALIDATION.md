# Coverage v5: selective replacement helps, regression gate still fails

Production remains **2026-10-13-r44**. V5 is an isolated experimental module; application/runtime retrieval code is unchanged. Actual installed Chrome **155.0.8059.40**, actual local **Xenova/all-MiniLM-L6-v2 q8 WASM**, Hybrid enabled, Qwen disabled. The completed run captured **179 Hybrid Q&A cases and 24 separate lexical Comparison cases**, once each, with no infrastructure retry, model-loading failure, mock vectors or Keyword fallback.

**Every case is an in-sample regression.** No new public sample was generated or consumed because the frozen Stage1 development gate failed. Previous first-look results, documents, questions and scoring rules remain unchanged.

## Results

Cells are **PASS / PARTIAL / FAIL**. Different frozen rubrics must not be pooled into a single accuracy estimate.

| Known set | Production UI r44 | Fixed + isolated v5 | Sections + isolated v5 |
| --- | --- | --- | --- |
| Atlas15 | 15 / 0 / 0 | 15 / 0 / 0 | 15 / 0 / 0 |
| Meridian24 | 23 / 1 / 0 | 24 / 0 / 0 | 24 / 0 / 0 |
| Lantern32 | 32 / 0 / 0 | 32 / 0 / 0 | 32 / 0 / 0 |
| Aster32 | 32 / 0 / 0 | 32 / 0 / 0 | 32 / 0 / 0 |
| Cobalt16 | 16 / 0 / 0 | 16 / 0 / 0 | 16 / 0 / 0 |
| Retrieval Quality28 | 16 / 7 / 5 | 28 / 0 / 0 | 28 / 0 / 0 |
| Exposed SQuAD24 | 13 / 1 / 10 | 20 / 0 / 4 | 20 / 0 / 4 |
| Exposed Mixed32, original name FreshMixed32 | 22 / 3 / 7 | 28 / 0 / 4 | 28 / 0 / 4 |

Original119 remains **119/119**, RQ28 remains **28/28**, and all four exposed compound controls remain PASS in both candidate variants. Mixed32 consists of **20/24 supported PASS**, **4/4 compound PASS**, **4/4 unsupported PASS** in either variant. These are known-data scores, not independent confirmation.

The gate checks every corresponding fixed/section PASS from production, v2, v3 and v4. **F12 still loses its v3 PASS; F10 loses its v4 PASS.** Those two unique cases affect both current variants. Because any prior PASS loss fails Stage1, the fresh-sample stage is **NOT RUN**. No production adoption or original 5.6 milestone completion is claimed.

## Repairs and remaining regressions

V5 separates genuine fragment recovery from blanket protection of a complete sentence. Operative numeric/time anchors and explicit excluded-actor answers remain protected; ordinary irrelevant sentences may yield to materially stronger body evidence.

- **Exposed E02 restored:** quotation includes the village owned by Warsz rather than name etymology.
- **Exposed F04 restored in the section variant:** quotation includes Emperor Wenzong rather than discussion of the Phags-pa script. Fixed F04 remains PASS.
- All original conditional repairs, Meridian I15's unchanged-inspection qualification and four compound repairs from v4 remain intact.
- **F12 remains FAIL:** the displayed military-action background omits the required **10 years**.
- **F10 regresses to FAIL:** replacing its repaired subject-bearing sentence selects background about the U.S., omitting the required **British / British Prime Minister Edward Heath** identification.

Stronger lexical overlap is not enough to distinguish the entity the question asks about from another entity mentioned nearby, or to ensure a duration answer contains a duration. No candidate repair was made after capture.

Other outstanding failures: **E08** tower-window location; **E12** Japanese collection date range; **E13** net mechanical energy; **E24** oxygen energy content; **F16** Watt; **F18** 7-million duty value. Both candidate variants fail these cases. Exact answers, gold groups, filenames and quotations are retained in the per-case scorecards.

Original quotation cautions remain: Lantern H18 and Aster H16 show complete required retry/escalation facts plus an unrequested scheduled start time; Atlas D05 removes P2/examples but retains its inline numbered heading. These PASS under unchanged historical answer/citation-level rules, with scope cautions. Do not equate those passes with minimal quotation scope.

## Citation checks and refusals

Each candidate variant has **204/204 source-literal citations**. Original119 has **124/124** relevant citations; RQ28 has **26/26** exact-evidence relevant citations. Original PDF quotations independently match pypdf extraction and browser PDF.js text. All **27 unsupported controls refuse explicitly with zero citations**; zero unsupported false acceptances and zero false refusals. These refusal counts do not mean every supported answer is correct.

Public `citation_relevance` fields retain the original **gold-paragraph containment proxy**, not semantic support. Exposed24: fixed **23/24**, sections **24/24** in the expected gold paragraph; only **20/24** quotations contain a requested answer span in either variant. Exposed Mixed32: **30/30** candidate citations in the gold paragraph, but only **26/30** contain any requested gold span. [Separate direct-span diagnostics](evidence/coverage-v5-r44/post-capture-direct-span-diagnostics.json) expose the distinction without changing primary scores. Expanded retrieval context never rescues missing displayed facts.

All 86 changed original variant records exactly match the independently reviewed v4 answer text, filenames and required facts. Their judgments are preserved with current provenance reverified: 78 heading/punctuation-only changes and eight substantive records across four original cases. No hidden answer annotations enter candidate retrieval/selection.

## Explicit correction to earlier narrative

Earlier v3/v4 prose incorrectly claimed fixed F18 passed. The immutable original scorecards show **F18 FAIL in both variants in v3, v4 and v5**. V3's fixed/section difference is F08; v4's difference is F04. [Verified correction](evidence/coverage-v5-r44/F18-narrative-correction.json). Addenda were appended to those public reports; their original aggregate scores, raw captures, keys and archived evidence files remain unchanged. This corrects an explanation, not a historical result.

## Evidence and reproducibility

- [Frozen protocol](../eval/answer-completeness-v5/PROTOCOL.md), commit `3a97a30`.
- [Candidate](../eval/answer-completeness-v5/coverage.mjs), frozen commit `a53cc2e`; actual tested raw bytes match this Git blob and the [original hash manifest](../eval/answer-completeness-v5/freeze-manifest.json).
- [Verified input preparation](../eval/answer-completeness-v5/prepare.py) and [actual Chrome runner](../tests/browser-coverage-v5-validation.mjs), frozen before capture in `31502cf`.
- [Grader](../eval/answer-completeness-v5/score.mjs) and [gate decision](evidence/coverage-v5-r44/decision.json).
- Public scorecards: [RQ28](evidence/coverage-v5-r44/RetrievalQuality28-scorecard.json), [exposed24](evidence/coverage-v5-r44/ExternalSQuAD24-scorecard.json), [exposed32](evidence/coverage-v5-r44/FreshMixed32-scorecard.json).
- Exact per-case captures, query vectors, screenshots, source extraction and model readiness: [RQ28](evidence/coverage-v5-r44/RetrievalQuality28/capture.json), [exposed24](evidence/coverage-v5-r44/ExternalSQuAD24/capture.json), [exposed32](evidence/coverage-v5-r44/FreshMixed32/capture.json). [Attribution/license](evidence/coverage-v5-r44/ATTRIBUTION.md).

All 68 source/key hash checks passed; source hashes were reverified after capture. Atlas current owner original-PDF hashes are verified against the pre-run record, but an original historical Atlas manifest is unavailable. Each of the 179 real query embeddings has 384 dimensions. Candidate quotations stay within 620 characters. Private original packs/keys and the complete 203-case Markdown/JSON/evidence archive are delivered locally only.

All **301 unit tests**, strict offline toy evaluation and CI browser feature smokes pass. Those checks are separate from actual-MiniLM accuracy evidence. Production modules remain byte-identical in Git to the prior release. No paid services or runtime release were added.

Future work should preserve the requested entity when evaluating replacement quotes and check whether the answer supplies the requested attribute type, such as a duration. That needs a separately frozen experiment and cannot be credited to this run.


## Browser-version qualification

V5 was observed on Chrome **155.0.8059.40**, while v4 used **154.0.8037.98**. The candidate and production baseline were paired within the same v5 browser/model session, but cross-run v4/v5 comparisons are not a controlled browser-version ablation. Do not attribute all cross-run differences solely to algorithm changes. Actual raw captures always recorded the correct version; an initially drafted v5 summary reused the old version and was corrected before merge. Scores, questions, quotations and raw evidence are unchanged.
