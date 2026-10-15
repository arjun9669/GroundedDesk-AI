# V19 — paragraph boundaries and literal relation recovery

**451-case exposed regression gate: FAIL. Production remains GroundedDesk5.6 / retrieval2026-10-13-r44.**

This is an isolated in-sample development candidate. No application runtime files changed. All original questions, documents, scoring rules, first-look scores and previous archives remain unchanged. No fresh confirmation corpus was sampled; a separate protocol must be frozen before that next step.

Installed headless Chrome155.0.8059.40 ran actual local Xenova/all-MiniLM-L6-v2 q8 WASM with new384-dimensional source/query/facet embeddings and Qwen off. All451 cases were captured once:427 Hybrid Q&A and24 separate unchanged lexical Comparison. Production UI answers were saved before isolated candidate calculations; candidate panels are labelled. This is not a visible attached-Chrome-tab test or a deployed v19 release. No mocks, saved-query-vector replay, fallback accuracy or automatic retries.

Candidate, paired v18, helper and dependencies were hash-checked before upload/questions. Same-session v18/v9 shared actual vectors. All118 original input hashes and frozen code/config remain unchanged after capture;50 historical artifacts match their original archives. Historical original Atlas manifest remains unavailable; current PDFs and independent source text provenance are verified.382 unit tests and strict offline checks pass; these are separate from real MiniLM accuracy evidence.

V19 selects a single literal body block when a quotation crosses Markdown headings, and adds narrowly bound count/list/successor/alliance selection within already cited paragraphs. Only attributed passive belief recovery may cross a prior refusal, with matching owner/object, actual cosine>=0.45, two lexical bridges and unchanged production-guard acceptance. Other repair clauses require actual cosine>=0.32 and literal relation/query bridges. Display stays within620 characters and3 citations; existing temporal/numeric/exception protections remain. Repaired compound facets are reassembled and contained quotes deduplicated. These surface heuristics are not general entailment or coreference verification.

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
| V9Exposed32 | 31/0/1 | 31/0/1 |
| Actor40 | 40/0/0 | 40/0/0 |
| Scope48 | 48/0/0 | 48/0/0 |
| Confirmation48 | 48/0/0 | 48/0/0 |
| Precision48 | 48/0/0 | 48/0/0 |

Different sets/rubrics must not be pooled into an independent accuracy claim. Precision48 first40/0/8 both, Confirmation48 first45/0/3 fixed and44/0/4 section, Scope48 first43/0/5 and42/0/6, Actor40 first28/2/10, and V9 first24/1/6 plus1ungraded remain immutable. The original blocked v14 run and its separate qualified replay remain distinct.

## Frozen development checks

```json
{
  "all_precision48_pass": true,
  "precision_c04_precision": true,
  "all_83_unsupported_refuse": true,
  "all_confirmation48_pass": true,
  "confirmation_c04_precision": true,
  "all_scope48_pass": true,
  "all_actor40_pass": true,
  "all_original_119_pass": true,
  "all_rq28_pass": true,
  "no_prior_pass_regressions": false,
  "all_exposed_compound_controls_pass": true,
  "provenance_intact": true,
  "no_new_false_acceptances_or_refusals": true
}
```

Historical PASS regressions:
```json
[
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "fixed",
    "prior": "coverage-v10-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "section",
    "prior": "coverage-v10-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "fixed",
    "prior": "coverage-v11-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "section",
    "prior": "coverage-v11-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "fixed",
    "prior": "coverage-v12-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "section",
    "prior": "coverage-v12-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "fixed",
    "prior": "coverage-v13-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "section",
    "prior": "coverage-v13-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "fixed",
    "prior": "coverage-v14-replay-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "section",
    "prior": "coverage-v14-replay-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "fixed",
    "prior": "coverage-v15-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "section",
    "prior": "coverage-v15-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "fixed",
    "prior": "coverage-v16-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "section",
    "prior": "coverage-v16-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "fixed",
    "prior": "coverage-v17-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "section",
    "prior": "coverage-v17-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "fixed",
    "prior": "coverage-v18-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "section",
    "prior": "coverage-v18-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "fixed",
    "prior": "coverage-v9-fresh-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "section",
    "prior": "coverage-v9-fresh-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "fixed",
    "prior": "coverage-v10-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "section",
    "prior": "coverage-v10-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "fixed",
    "prior": "coverage-v11-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "section",
    "prior": "coverage-v11-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "fixed",
    "prior": "coverage-v12-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F17",
    "variant": "section",
    "prior": "coverage-v12-final",
    "outcome": "FAIL"
  }
]
```

## Independent displayed-evidence review

### Precision48 repairs and the failed regression gate

Precision48 now scores48 PASS /0 PARTIAL /0 FAIL in both candidates, while its first40/0/8 remains immutable. All37 citations per variant are source-literal, wholly in their expected original paragraph and directly support at least one requested answer group. All12 unsupported cases refuse without citations; no supported false refusal remains on Precision48. F04 displays the count relation, F20 Turkey, F21 Germany, F22 the attributed environment belief, F24 both forms. F15/P03/P04 retain their correct facts while removing cross-heading contamination. C04 retains both facets in one quote and removes its unrelated second quote.

The overall frozen gate is FAIL. V9Exposed32/F17 loses PASS in both variants: the question asks Jordan Norwood's Super Bowl record punt-return distance (61yards), but the candidate displays Newton's51-yard passing and25-yard rushing clause. Paired v18 correctly displayed the literal61-yard Norwood return. Both quotations are genuine and in the expected paragraph; only the old one answers the requested actor/event. The new count regex misses a hyphenated number-unit phrase and selects a numeric-noun clause without subject/action binding. Current diagnostics give count route and actual cosine0.506708. No expected answer, grade or code was changed after capture. The failure is a supported wrong answer; unsupported false-acceptance counts do not include this category.

Exactly20 candidate outputs changed: nine Precision48 cases in both variants and F17 in both. All changed answers were read against the frozen paragraphs/key, and all48 Precision48 answers/citations reviewed; fixed/section Precision48 evidence is identical. Original119 quotation-review queue is empty. All83 known unsupported cases explicitly refuse without citations in both candidates. The older supported FreshConfirmation32/F10 false refusal remains in both variants; no new false refusal appears. Other historical public failures remain listed. There are no new infrastructure/model failures or retries.

Precision48 F04/F05 annotations mix14 and Ten. The exact Ten-of14 subset/total clause is displayed, while F04's short quote omits the earlier Medieval Warm Period anchor; its frozen PASS does not resolve all annotation ambiguity. F15's trailing colon is original source text, not a fabricated completed list. Historic source claims and discredited colonial ideologies are treated as attributed passage contents, not current guidance or endorsements. DIRECT means the requested fact is present; some quotations retain broad context and surface rules do not certify entailment.

Some candidate-panel screenshots can clip their top lab label when the page is scrolled; exact question and answers remain visible and fully preserved in JSON. Panels are isolated-module outputs, not deployed v19 UI. Representative Precision48/P03 and regressed V9Exposed32/F17 screenshots were visually inspected. Frozen raw evidence is unchanged.

No further tuning, question retry, fresh sampling or runtime adoption follows this failed run. Production remains r44. Before another attempt, constrain count repair to the requested actor/action and preserve already supported hyphenated quantities; freeze that next protocol separately.


## Cases below PASS

- ExternalSQuAD24/fixed/E08: FAIL; false acceptance False; false refusal False; Statues of British artists adorn which part of the tower above the main entrance?
- ExternalSQuAD24/fixed/E24: FAIL; false acceptance False; false refusal False; What characteristic of oxygen makes it necessary to life?
- ExternalSQuAD24/section/E08: FAIL; false acceptance False; false refusal False; Statues of British artists adorn which part of the tower above the main entrance?
- FreshConfirmation32/fixed/F07: FAIL; false acceptance False; false refusal False; How did Luther express the destruction?
- FreshConfirmation32/fixed/F09: FAIL; false acceptance False; false refusal False; Who did Luther call on to stop the revolt?
- FreshConfirmation32/fixed/F10: FAIL; false acceptance False; false refusal True; When was the large work published?
- FreshConfirmation32/section/F09: FAIL; false acceptance False; false refusal False; Who did Luther call on to stop the revolt?
- FreshConfirmation32/section/F10: FAIL; false acceptance False; false refusal True; When was the large work published?
- V9Exposed32/fixed/F17: FAIL; false acceptance False; false refusal False; How many yards did Jordan Norwood return a punt to set the Super Bowl record?
- V9Exposed32/section/F17: FAIL; false acceptance False; false refusal False; How many yards did Jordan Norwood return a punt to set the Super Bowl record?

All exact answers, filenames, displayed quotations and per-citation grading are in the full report and JSON. Source provenance, original-paragraph containment, direct-span proxy and independent relevance are separate; a real quote is not automatically a relevant or complete answer. Original119 retain previous semantic adjudication when unchanged; changed quotations are explicitly reviewed. No expanded retrieval context earns credit.

A failed gate preserves this attempt without tuning, retries, new sampling or runtime adoption. A passing gate permits a separately frozen confirmation/integration review; r44 remains live. Original private captures stay local; licensed public evidence is published.

[Public browser evidence](./evidence/coverage-v19-r44/) · [decision](./evidence/coverage-v19-r44/decision.json) · [hash audit](./evidence/coverage-v19-r44/integrity-audit.json).
