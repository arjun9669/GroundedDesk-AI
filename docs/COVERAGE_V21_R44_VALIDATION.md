# v21 clause guards — real Chrome/MiniLM in-sample regression

**Overall gate: FAIL. Historical451: FAIL. Binding64: FAIL. Live r44 unchanged.**

All 515 questions are previously exposed: 451 historical and 64 Binding64. Installed headless Chrome155.0.8059.40 used actual local Xenova/all-MiniLM-L6-v2 q8 WASM with fresh384-dimensional source/query/facet embeddings, Qwen off. There are487 Hybrid questions and28 separate lexical Comparison questions. Actual UI baseline is captured first; isolated fixed/section v21 outputs and paired v20 use the verified frozen modules. This is not an attached visible-tab test, deployed v21 release, new independent benchmark or pooled real-world accuracy estimate. No mock embeddings, saved-vector replay, question retries or post-answer tuning.

V21 layers on unchanged v20. Recognized named-actor did-count and passive number-of requests need one literal actor/predicate/count/unit clause, including checks on prior answered evidence. A narrow completed-count action-noun construction and surname references are supported. Missing recognized tuples explicitly refuse. Unrecognized grammar, ambiguous shared surnames, coordination, coreference and general entailment remain limitations. Clock handling requires explicit same-paragraph before and inclusive at-or-after rules, a single valid question time, selected-document scope, actual cosine>=0.35, and a literal span<=620 characters including trailing holds. Comparison is a separate lexical wrapper stripping complete leading ATX headings only; production Comparison stays unchanged.

The original Binding64 first attempt remains BLOCKED/ungraded before model loading/questions; its qualified v20 first-answer result45/1/18 both stays immutable. Binding64 is now an exposed development set. Precision48 first40/0/8, v19 failed gate, v20 exposed passing gate, and all prior original scores remain unchanged. Public question ambiguities, duplicate strings and original typos are retained; historical source claims are not current-world certification. Different corpora/rubrics are not pooled.

## Per-set results

| Set | Fixed PASS/PARTIAL/FAIL | Section PASS/PARTIAL/FAIL |
|---|---|---|
| Lantern32 | 32/0/0 | 32/0/0 |
| Aster32 | 32/0/0 | 32/0/0 |
| Meridian24 | 24/0/0 | 24/0/0 |
| Cobalt16 | 16/0/0 | 16/0/0 |
| Atlas15 | 15/0/0 | 15/0/0 |
| RetrievalQuality28 | 27/0/1 | 27/0/1 |
| ExternalSQuAD24 | 22/0/2 | 23/0/1 |
| FreshMixed32 | 32/0/0 | 32/0/0 |
| FreshConfirmation32 | 29/0/3 | 30/0/2 |
| V9Exposed32 | 31/0/1 | 31/0/1 |
| Actor40 | 40/0/0 | 40/0/0 |
| Scope48 | 48/0/0 | 48/0/0 |
| Confirmation48 | 48/0/0 | 48/0/0 |
| Precision48 | 48/0/0 | 48/0/0 |
| Binding64 | 60/1/3 | 60/1/3 |

## Frozen gate checks

```json
{
  "historical451": {
    "all_v9exposed32_pass": false,
    "all_precision48_pass": true,
    "precision_c04_precision": true,
    "all_83_unsupported_refuse": true,
    "all_confirmation48_pass": true,
    "confirmation_c04_precision": true,
    "all_scope48_pass": true,
    "all_actor40_pass": true,
    "all_original_119_pass": true,
    "all_rq28_pass": false,
    "no_prior_pass_regressions": false,
    "all_exposed_compound_controls_pass": true,
    "provenance_intact": true,
    "no_new_false_acceptances_or_refusals": false
  },
  "binding64": {
    "development_gate_passed": false,
    "fixed_public_at_least21": true,
    "fixed_compound_all4": false,
    "fixed_count_all12": false,
    "fixed_conditional_all8": true,
    "fixed_unsupported_all12": true,
    "fixed_comparison_all4": true,
    "fixed_every_citation_requested_span": false,
    "fixed_provenance_intact": true,
    "fixed_no_false_acceptance_or_refusal": false,
    "fixed_no_paired_or_production_pass_loss": false,
    "section_public_at_least21": true,
    "section_compound_all4": false,
    "section_count_all12": false,
    "section_conditional_all8": true,
    "section_unsupported_all12": true,
    "section_comparison_all4": true,
    "section_every_citation_requested_span": false,
    "section_provenance_intact": true,
    "section_no_false_acceptance_or_refusal": false,
    "section_no_paired_or_production_pass_loss": false
  },
  "combined": {
    "classification": "515 exposed in-sample regressions; not new independent accuracy",
    "historical451_gate": "FAIL",
    "binding64_gate": "FAIL",
    "overall_gate": "FAIL",
    "binding64_previous_pass_regressions": {
      "fixed": [
        "T4A"
      ],
      "section": [
        "T4A"
      ]
    },
    "candidate_adopted": false,
    "production_build": "2026-10-13-r44",
    "all_historical_first_results_unchanged": true,
    "no_new_sample": true
  }
}
```

## Displayed-evidence review

Binding64 improves from its preserved qualified v20 first45 PASS /1 PARTIAL /18 FAIL to60 PASS /1 PARTIAL /3 FAIL in both isolated variants. All eight swapped actor/action negatives now explicitly refuse without citations; all12 unsupported controls pass. All eight condition/exception cases and four separate lexical Comparison cases pass. Comparison gains remove headings only; both retention facts/exceptions were already complete in v20. Supported counts fall from12/12 to11/12 because T4A falsely refuses the explicit24-tray tagging run.

There are three distinct prior-PASS regressions in both variants. Binding64/T4A rejects tagging because the suffix stem becomes tagg versus query tag. V9Exposed32/F17 falsely refuses Norwood's supported61-yard record return: the old narrative contains earlier negation and an indirect action construction outside the new guard's narrow grammar. RetrievalQuality28/RQ02 still displays next operating day but truncates Orders released and includes irrelevant Operational note filler. That case fails its unchanged evidence/relevance rule; do not misreport it as the wrong departure day.

Binding64's57 citations per variant are all source-literal;56 satisfy expected body-paragraph containment and54 the direct requested-span proxy. Independent relevance labels:53 DIRECT,1 DIRECT_PER_KEY_WORDING_LIMIT,3 missing requested fact/wrong paragraph. F05/F08 remain FAIL and C02 PARTIAL. The unchanged F07 question asks monthly temperature while source/key supplies maximum since WWII; its frozen PASS remains qualified. F19/F20 duplicate original question strings and C04 repeats them. No resampling or regrading.

Exactly19 cases change in both variants,38 displayed outputs total. All19 changed cases were reviewed against actual source/key text and saved quotations. The other496 outputs per variant retain exact answer/filename/quote parity with same-session v20 and carry forward their previous explicit evidence review. All original119 quotations are unchanged and all119 still PASS. Actor40, Scope48, Confirmation48 and Precision48 retain all PASS; Precision48's37 citations retain previous per-case relevance notes. All83 historical unsupported controls remain uncited refusals, plus12 Binding64 controls. Supported false refusals are old FreshConfirmation32/F10 and new V9Exposed32/F17 and Binding64/T4A, each variant. Zero unsupported false acceptances occur in the isolated candidates; production UI baseline is reported separately.

Both historical451 and Binding64 gates FAIL. The raw historical regression list repeats the same lost cases across prior versions; the independent list deduplicates to three case IDs without altering frozen scores. Unit392/392 and offline checks passed but did not expose these semantic/grammar losses. No post-answer candidate tuning, test rerun, fresh sample or production adoption follows this result. Live5.6/r44 stays unchanged. This is exposed development evidence, not a successful release or independent accuracy claim.


## All cases below PASS

- RetrievalQuality28/fixed/RQ02: FAIL; false acceptance False; false refusal False; An Orchard order is released at 15:00 under the current guide. When does it depart?
- RetrievalQuality28/section/RQ02: FAIL; false acceptance False; false refusal False; An Orchard order is released at 15:00 under the current guide. When does it depart?
- ExternalSQuAD24/fixed/E08: FAIL; false acceptance False; false refusal False; Statues of British artists adorn which part of the tower above the main entrance?
- ExternalSQuAD24/fixed/E24: FAIL; false acceptance False; false refusal False; What characteristic of oxygen makes it necessary to life?
- ExternalSQuAD24/section/E08: FAIL; false acceptance False; false refusal False; Statues of British artists adorn which part of the tower above the main entrance?
- FreshConfirmation32/fixed/F07: FAIL; false acceptance False; false refusal False; How did Luther express the destruction?
- FreshConfirmation32/fixed/F09: FAIL; false acceptance False; false refusal False; Who did Luther call on to stop the revolt?
- FreshConfirmation32/fixed/F10: FAIL; false acceptance False; false refusal True; When was the large work published?
- FreshConfirmation32/section/F09: FAIL; false acceptance False; false refusal False; Who did Luther call on to stop the revolt?
- FreshConfirmation32/section/F10: FAIL; false acceptance False; false refusal True; When was the large work published?
- V9Exposed32/fixed/F17: FAIL; false acceptance False; false refusal True; How many yards did Jordan Norwood return a punt to set the Super Bowl record?
- V9Exposed32/section/F17: FAIL; false acceptance False; false refusal True; How many yards did Jordan Norwood return a punt to set the Super Bowl record?
- Binding64/fixed/F05: FAIL; false acceptance False; false refusal False; What years did this occupation take place?
- Binding64/fixed/F08: FAIL; false acceptance False; false refusal False; How cold does this region of Victoria get in the winner?
- Binding64/fixed/C02: PARTIAL; false acceptance False; false refusal False; What is Victoria's highest monthly temperature? Also, How cold does this region of Victoria get in the winner?
- Binding64/fixed/T4A: FAIL; false acceptance False; false refusal True; How many trays did Vera Linven tag at Soravin Specimen Studio?
- Binding64/section/F05: FAIL; false acceptance False; false refusal False; What years did this occupation take place?
- Binding64/section/F08: FAIL; false acceptance False; false refusal False; How cold does this region of Victoria get in the winner?
- Binding64/section/C02: PARTIAL; false acceptance False; false refusal False; What is Victoria's highest monthly temperature? Also, How cold does this region of Victoria get in the winner?
- Binding64/section/T4A: FAIL; false acceptance False; false refusal True; How many trays did Vera Linven tag at Soravin Specimen Studio?

392 unit tests and strict offline checks pass; these checks are not MiniLM accuracy. All124 original input hashes and64 sealed historical artifact members match. Actual module identity was checked before uploads/questions. The original historical Atlas hash manifest is unavailable; current PDFs and independent PDF text provenance are verified. Source provenance, expected body paragraph, requested span and independent relevance remain separate checks. Literal text is not entailment.

No candidate runtime adoption follows this run, regardless of gate. Live production stays GroundedDesk5.6/retrieval2026-10-13-r44. No new sample is consumed. Complete raw per-case JSON, screenshots, vectors and ledgers are preserved in the local full evidence archive. Public evidence contains licensed public-pack captures, source extraction, scorecards and selected changed/target screenshots; private historical PDF captures stay local.

[Public scorecards and selected browser evidence](./evidence/coverage-v21-r44/) · [Combined decision](./evidence/coverage-v21-r44/combined-decision.json).
