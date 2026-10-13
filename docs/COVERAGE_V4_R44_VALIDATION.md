# Coverage v4: original regressions repaired, public regression gate still fails

Production remains **2026-10-13-r44**. V4 is an isolated browser-module experiment, not deployed application behavior. Actual installed Chrome **154.0.8037.98** used actual local **Xenova/all-MiniLM-L6-v2**, q8 WASM, with Hybrid enabled and Qwen disabled. The completed capture contains **179 Hybrid questions and 24 separate unchanged lexical Comparison cases**. Every benchmark answer was captured once. An initial local-server failure happened before document uploads or questions; that failed attempt is preserved separately from the successful recovery run.

**All 203 cases are now exposed in-sample regressions**, including the pack still named `FreshMixed32`. No new independent or fresh accuracy was measured in this attempt. Every historical first result and original rubric remains unchanged.

## Results

Each cell is **PASS / PARTIAL / FAIL**. Different test sets use different frozen rubrics; do not pool them into one product accuracy estimate.

| Known test set | Production UI r44 | Fixed + isolated v4 | Sections + isolated v4 |
| --- | --- | --- | --- |
| Atlas15 | 15 / 0 / 0 | 15 / 0 / 0 | 15 / 0 / 0 |
| Meridian24 | 23 / 1 / 0 | 24 / 0 / 0 | 24 / 0 / 0 |
| Lantern32 | 32 / 0 / 0 | 32 / 0 / 0 | 32 / 0 / 0 |
| Aster32 | 32 / 0 / 0 | 32 / 0 / 0 | 32 / 0 / 0 |
| Cobalt16 | 16 / 0 / 0 | 16 / 0 / 0 | 16 / 0 / 0 |
| Retrieval Quality28 | 16 / 7 / 5 | 28 / 0 / 0 | 28 / 0 / 0 |
| Exposed SQuAD24 | 13 / 1 / 10 | 19 / 0 / 5 | 19 / 0 / 5 |
| Exposed Mixed32, original pack name FreshMixed32 | 22 / 3 / 7 | 29 / 0 / 3 | 28 / 0 / 4 |

The five original PASS regressions from v3 are restored. Original119 reaches **119/119** in both candidate variants, including the formerly incomplete Meridian I15. RQ28 remains **28/28**. All four exposed compound controls now PASS, using six literal citations total per variant. Exposed Mixed32 supported-only results are **21/24 fixed / 20/24 section**, with **4/4 compound** and **4/4 unsupported** controls. These are regression scores, not new confirmation.

The frozen development gate nonetheless **FAILS** because three unique public cases lose a prior PASS. The protocol therefore stops this attempt **before generating or consuming another fresh sample**. The release gate is not passed, and production r44 remains unchanged. No original 5.6 milestone completion is claimed.

## Targeted repairs verified

- **Lantern H06 / H21 and Aster H03:** numeric/time conditions retain the correct refund or cancellation branch.
- **Aster H01:** visitor entry retains the correct actor instead of staff check-in.
- **Lantern H18:** retry at 03:10 plus on-call archivist escalation before 04:00 are displayed. Its original scheduled start time is also included; the unchanged answer/citation-level rubric permits PASS, with an explicit overbroad-quotation caution.
- **Meridian I15:** the displayed quote now includes normal 60-hour lubrication, dusty-bay 30-hour lubrication and the statement that inspection is unchanged. The historical PARTIAL remains historical.
- **Exposed F10 / F23:** abbreviation-aware recovery includes the previously missing subject or parenthetical property-owner phrase.
- **Exposed C01–C04:** both requested answer groups now appear. Distant facts receive separate source-literal quotations rather than a fabricated joined quote. These are Hybrid multi-facet cases, not lexical Comparison.

Aster H16 still includes an unrequested scheduled start time but preserves all required retry/escalation facts; its scope caution remains. Atlas D05 retains P1 Incident Commander and the 30-minute target while excluding unrelated P2/examples; its literal inline numbered heading remains.

## New public regressions and outstanding failures

| Case | Expected evidence omitted | Affected variant | Outcome |
| --- | --- | --- | --- |
| Exposed E02 | Warsz owned a village; current quote gives name etymology | Fixed and section | FAIL |
| Exposed F04 | Tugh's Chinese-style name, Emperor Wenzong; current quote discusses the Phags-pa script | Section | FAIL |
| Exposed F12 | Ten-year duration; current quote gives background on military action | Fixed and section | FAIL |

These three cases constitute **five variant-level regressions** against prior PASS records. The recovery guard returns a complete existing sentence even when it is the wrong answer anchor, preventing the broader body selector from recovering the requested fact. No repair was made after seeing these outputs.

Exposed SQuAD24 also continues to fail **E08, E12, E13 and E24**, omitting the tower-window location, Japanese collection date range, net mechanical energy and oxygen energy content respectively. Exposed Mixed32 continues to fail **F16** (Watt) in both variants and **F18** (7-million duty value) in the section variant; fixed F18 passes. The earlier public first scores and v3 results remain immutable.

## Provenance and relevance

Each candidate variant has **204/204 source-literal citations**. Original119 has **124/124** relevant citations, and RQ28 has **26/26** exact-evidence relevant citations. Original PDF quotes independently match pypdf extraction as well as the browser's PDF.js extraction. All **27 unsupported controls explicitly refuse with zero citations**, with **zero unsupported false acceptances and zero false refusals**. Those counts do not mean every supported answer is correct.

Public rubric `citation_relevance` fields retain their frozen **gold-paragraph containment proxy**, which is not semantic support. Exposed24: fixed **23/24**, sections **24/24** in the expected paragraph, but only **19/24** quotations contain a requested gold span. Exposed Mixed32: **30/30** candidate citations are in the gold paragraph, but only **27 fixed / 26 section** contain any requested span. [Separate diagnostics](evidence/coverage-v4-r44/post-capture-direct-span-diagnostics.json) expose the difference without altering primary scores. Correct paragraph selection and literal provenance do not rescue a missing answer.

All **86 changed original variant records** were reviewed: 78 preserve the old body words after heading removal and/or terminal-punctuation recovery; eight substantive records cover four cases in both variants. Original required facts were used for the manual adjudications. Expanded retrieval context is never credited for missing displayed facts.

## Freeze, infrastructure and reproducibility

- [Protocol](../eval/answer-completeness-v4/PROTOCOL.md), frozen commit `1d90029`.
- [Candidate](../eval/answer-completeness-v4/coverage.mjs), content frozen commit `14ff709`; [original raw byte manifest](../eval/answer-completeness-v4/freeze-manifest.json).
- [Input preparation](../eval/answer-completeness-v4/prepare.py) and [Chrome runner](../tests/browser-coverage-v4-validation.mjs), frozen before capture in `4193a7f`.
- [Grader](../eval/answer-completeness-v4/score.mjs), [gate decision](evidence/coverage-v4-r44/decision.json), [initial pre-question failure](evidence/coverage-v4-r44/initial-pre-question-failure.json).
- Public per-case scorecards: [RQ28](evidence/coverage-v4-r44/RetrievalQuality28-scorecard.json), [exposed24](evidence/coverage-v4-r44/ExternalSQuAD24-scorecard.json), [exposed32](evidence/coverage-v4-r44/FreshMixed32-scorecard.json).
- Exact captures, vectors, screenshots, source extraction and model readiness: [RQ28](evidence/coverage-v4-r44/RetrievalQuality28/capture.json), [exposed24](evidence/coverage-v4-r44/ExternalSQuAD24/capture.json), [exposed32](evidence/coverage-v4-r44/FreshMixed32/capture.json). [Public source attribution/license](evidence/coverage-v4-r44/ATTRIBUTION.md).

All original and public frozen source/key manifests were verified (68 file checks). Atlas current owner original-PDF hashes were recorded before testing and reverified; no original historical Atlas manifest is available. All 179 real query embeddings have 384 dimensions. Candidate quotes remain within 620 characters. Original private source/key files and the complete 203-case report are delivered locally to the owner, not newly published to Git.

The initial local server returned incomplete responses, so the app's pre-question startup wait expired. A new server and empty recovery directory were used; no answer was retried or replaced, no MiniLM download failed, and no simulated vectors were substituted. The original failure record remains intact. The code was not tuned after capture.

Byte-preservation qualification: the first candidate commit normalized its Git blob to LF, while the tested Windows working copy used CRLF. Algorithm content is identical after line-ending normalization. Its **original frozen raw SHA-256 matches the actual tested file**; the evidence commit preserves those same raw bytes with `-text` and `git add --renormalize`. No frozen hash, test input, algorithm or score was changed to hide a mismatch. Production modules remain byte-identical in Git to the previous release.

The unit suite and an additional frozen-byte/isolation check pass; CI also checks syntax and browser feature smokes. These are separate from actual-MiniLM accuracy evidence. No paid service, backend or runtime release was added.

The next separately frozen attempt should distinguish recovery of a truncated correct anchor from preservation of an already complete but irrelevant sentence. Keep the verified conditional/compound repairs while permitting evidence-backed replacement of wrong anchors. This is a recommendation, not a post-capture modification.
