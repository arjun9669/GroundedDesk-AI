# V20 — count units and actor/action binding

**451-case exposed regression gate: PASS. Production remains GroundedDesk5.6 / retrieval2026-10-13-r44.**

This is an isolated in-sample development candidate. No application runtime files changed. All original questions, documents, scoring rules, first-look scores and previous archives remain unchanged. The v19 gate remains FAIL; this separate attempt does not rewrite it. No fresh confirmation corpus was sampled; a separate protocol must be frozen before that next step.

Installed headless Chrome 155.0.8059.40 ran actual local Xenova/all-MiniLM-L6-v2 q8 WASM with new 384-dimensional source/query/facet embeddings and Qwen off. All 451 cases were captured once: 427 Hybrid Q&A and 24 separate unchanged lexical Comparison. Production UI answers were saved before isolated candidate calculations; candidate panels are labelled. This is not a visible attached-Chrome-tab test or a deployed v20 release. No mocks, saved-query-vector replay, fallback accuracy or automatic retries.

Candidate, paired v19, helper and dependencies were hash-checked before upload/questions. Same-session v19/v9 shared actual vectors. All 118 original input hashes and frozen code/config remain unchanged after capture; 55 historical artifacts match their original archives. Historical original Atlas manifest remains unavailable; current PDFs and independent source text provenance are verified. 387 unit tests and strict offline checks pass; these are separate from real MiniLM accuracy evidence.

V20 copies v19 with its actual v18 base unchanged, altering only count recognition and selection. It recognizes spaced and hyphenated number-unit relations and preserves prior answered count evidence. New active do/does/did count selection requires the queried capitalized actor final name and action stem in the displayed literal clause; unbound active requests keep prior evidence. Other v19 boundary/list/country/alliance/belief/compound safeguards remain. Actual clause cosine>=0.32 and cited-paragraph/query bridges are unchanged. Display stays within 620 characters and 3 citations; protected temporal/numeric/exception requests keep previous routing. These limited surface heuristics are not general coreference or entailment.

## Case scores by unchanged rubric

| Set | Fixed PASS/PARTIAL/FAIL | Section PASS/PARTIAL/FAIL |
|---|---|---|
| Lantern32 | 32/0/0 | 32/0/0 |
| Aster32 | 32/0/0 | 32/0/0 |
| Meridian24 | 24/0/0 | 24/0/0 |
| Cobalt16 | 16/0/0 | 16/0/0 |
| Atlas15 | 15/0/0 | 15/0/0 |
| RetrievalQuality28 | 28/0/0 | 28/0/0 |
| ExternalSQuAD24 | 22/0/2 | 23/0/1 |
| FreshMixed32 | 32/0/0 | 32/0/0 |
| FreshConfirmation32 | 29/0/3 | 30/0/2 |
| V9Exposed32 | 32/0/0 | 32/0/0 |
| Actor40 | 40/0/0 | 40/0/0 |
| Scope48 | 48/0/0 | 48/0/0 |
| Confirmation48 | 48/0/0 | 48/0/0 |
| Precision48 | 48/0/0 | 48/0/0 |

Different sets/rubrics must not be pooled into an independent accuracy claim. Precision48 first40/0/8 both, Confirmation48 first45/0/3 fixed and44/0/4 section, Scope48 first43/0/5 and42/0/6, Actor40 first28/2/10, and V9 first24/1/6 plus1ungraded remain immutable. The original blocked v14 run and its separate qualified replay remain distinct.

## Frozen development checks

```json
{
  "all_v9exposed32_pass": true,
  "all_precision48_pass": true,
  "precision_c04_precision": true,
  "all_83_unsupported_refuse": true,
  "all_confirmation48_pass": true,
  "confirmation_c04_precision": true,
  "all_scope48_pass": true,
  "all_actor40_pass": true,
  "all_original_119_pass": true,
  "all_rq28_pass": true,
  "no_prior_pass_regressions": true,
  "all_exposed_compound_controls_pass": true,
  "provenance_intact": true,
  "no_new_false_acceptances_or_refusals": true
}
```

Historical PASS regressions:
```json
[]
```

## Independent displayed-evidence review

### Count regression restored without losing existing evidence

V9Exposed32/F17 returns to PASS in both variants, displaying Norwood's literal61-yard Super Bowl record return instead of Newton's unrelated passing/rushing yardage. This quotation exactly matches the historical v18 answer and is directly relevant, source-literal and inside the expected original paragraph. The actual repair retains already answered evidence once the hyphenated unit is recognized; it does not need a newly selected count clause. The active actor/action selection guard has generic unit controls, but this exposed run does not establish general coreference or entailment accuracy.

Exactly two displayed outputs change against same-session paired v19: F17 in fixed and section. All original119 quotations remain unchanged. Precision48 remains48 PASS /0 PARTIAL /0 FAIL in both variants, with exact answer/quotation parity against v19. Its37 citations per variant retain source provenance, original-paragraph containment and direct relevance, including the one-quote C04 answer. All48 cases retain their explicit previous relevance notes after parity verification. Precision48's original first40/0/8 and v19's failed overall gate remain unchanged.

All83 unsupported cases explicitly refuse without citations in both candidates. There are no unsupported false acceptances, new supported false refusals or historical PASS losses. The old supported FreshConfirmation32/F10 false refusal remains in both variants; older ExternalSQuAD24 and FreshConfirmation32 failures outside required gate sets remain listed. A PASS gate does not mean451/451 answers passed and must not be presented as independent accuracy.

The remaining qualifications are preserved: Precision48 F04/F05 annotations mix14 and Ten, F04's short count quote omits its earlier event anchor, and some directly relevant quotations retain broad context. Source provenance, expected-paragraph containment, answer-span presence and relevance are different checks; none certifies general entailment. Historical economic, political and discredited colonial-ideology passages are evaluated as attributed contents, not current advice or endorsement. Original first scores are never regraded.

Candidate panels are isolated browser-module evidence, not a deployed v20 release or a visible attached-tab test. Screenshot labels may be clipped by page scroll; exact answers and source quotations remain in raw JSON. No model/browser failures, automatic question retries, mock vectors, saved-query replay or further sample consumption occurred. No post-answer tuning or runtime adoption follows this run. Freeze a separate prospective confirmation protocol before another sample; keep r44 live.


## Cases below PASS

- ExternalSQuAD24/fixed/E08: FAIL; false acceptance False; false refusal False; Statues of British artists adorn which part of the tower above the main entrance?
- ExternalSQuAD24/fixed/E24: FAIL; false acceptance False; false refusal False; What characteristic of oxygen makes it necessary to life?
- ExternalSQuAD24/section/E08: FAIL; false acceptance False; false refusal False; Statues of British artists adorn which part of the tower above the main entrance?
- FreshConfirmation32/fixed/F07: FAIL; false acceptance False; false refusal False; How did Luther express the destruction?
- FreshConfirmation32/fixed/F09: FAIL; false acceptance False; false refusal False; Who did Luther call on to stop the revolt?
- FreshConfirmation32/fixed/F10: FAIL; false acceptance False; false refusal True; When was the large work published?
- FreshConfirmation32/section/F09: FAIL; false acceptance False; false refusal False; Who did Luther call on to stop the revolt?
- FreshConfirmation32/section/F10: FAIL; false acceptance False; false refusal True; When was the large work published?

All exact answers, filenames, displayed quotations and per-citation grading are in the full report and JSON. Source provenance, original-paragraph containment, direct-span proxy and independent relevance are separate; a real quote is not automatically a relevant or complete answer. Original 119 retain previous semantic adjudication when unchanged; changed quotations are explicitly reviewed. No expanded retrieval context earns credit.

A failed gate preserves this attempt without tuning, retries, new sampling or runtime adoption. A passing gate permits a separately frozen confirmation/integration review; r44 remains live. Original private captures stay local; licensed public evidence is published.

[Public browser evidence](./evidence/coverage-v20-r44/) · [decision](./evidence/coverage-v20-r44/decision.json) · [hash audit](./evidence/coverage-v20-r44/integrity-audit.json).
