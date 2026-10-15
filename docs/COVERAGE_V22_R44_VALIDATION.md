# v22 preservation repairs — real Chrome/MiniLM in-sample regression

**Overall gate: FAIL. Historical451: PASS. Binding64: FAIL. Live r44 unchanged.**

All 515 questions are previously exposed: 451 historical and 64 Binding64. Installed headless Chrome155.0.8059.40 used actual local Xenova/all-MiniLM-L6-v2 q8 WASM with fresh384-dimensional source/query/facet embeddings, Qwen off. There are487 Hybrid questions and28 separate lexical Comparison questions. Actual UI baseline is captured first; isolated fixed/section v22 outputs and paired v21 use the verified frozen modules. This is not an attached visible-tab test, deployed v22 release, new independent benchmark or pooled real-world accuracy estimate. No mock embeddings, saved-vector replay, question retries or post-answer tuning.

V22 copies the isolated v21 wrapper over unchanged v20, changing only three observed mechanisms. Action-form alternatives retain original stems and handle doubled consonants after ing/ed. A narrow affirmative pronoun movement/count-action construction can survive earlier unrelated negation, with explicit initial actor, no intervening named actor, affirmative predicate and literal numeric-unit/action phrase. This is not general negation/coreference/entailment. Clock branches use complete literal sentence offsets and only contiguous trailing conditional holds, excluding operational filler. Existing cosine/site/document/620-character limits and separate lexical Comparison heading handling remain. Production runtime is unchanged.

The original Binding64 first attempt remains BLOCKED/ungraded before model loading/questions; its qualified v20 first-answer result45/1/18 both stays immutable. Binding64 is now an exposed development set. Precision48 first40/0/8, v19 failed gate, v20 exposed passing gate, v21 failed gate and exposed Binding64 60/1/3, and all prior original scores remain unchanged. Public question ambiguities, duplicate strings and original typos are retained; historical source claims are not current-world certification. Different corpora/rubrics are not pooled.

## Per-set results

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
| Binding64 | 61/1/2 | 61/1/2 |

## Frozen gate checks

```json
{
  "historical451": {
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
  },
  "binding64": {
    "development_gate_passed": true,
    "fixed_public_at_least21": true,
    "fixed_compound_all4": false,
    "fixed_count_all12": true,
    "fixed_conditional_all8": true,
    "fixed_unsupported_all12": true,
    "fixed_comparison_all4": true,
    "fixed_every_citation_requested_span": false,
    "fixed_provenance_intact": true,
    "fixed_no_false_acceptance_or_refusal": true,
    "fixed_no_paired_or_production_pass_loss": true,
    "section_public_at_least21": true,
    "section_compound_all4": false,
    "section_count_all12": true,
    "section_conditional_all8": true,
    "section_unsupported_all12": true,
    "section_comparison_all4": true,
    "section_every_citation_requested_span": false,
    "section_provenance_intact": true,
    "section_no_false_acceptance_or_refusal": true,
    "section_no_paired_or_production_pass_loss": true
  },
  "combined": {
    "classification": "515 exposed in-sample regressions; not new independent accuracy",
    "historical451_gate": "PASS",
    "binding64_gate": "FAIL",
    "three_target_repairs": {
      "V9Exposed32/F17": {
        "fixed": "PASS",
        "section": "PASS"
      },
      "RetrievalQuality28/RQ02": {
        "fixed": "PASS",
        "section": "PASS"
      },
      "Binding64/T4A": {
        "fixed": "PASS",
        "section": "PASS"
      }
    },
    "overall_gate": "FAIL",
    "binding64_previous_pass_regressions": {
      "fixed": [],
      "section": []
    },
    "candidate_adopted": false,
    "production_build": "2026-10-13-r44",
    "all_historical_first_results_unchanged": true,
    "no_new_sample": true
  }
}
```

## Displayed-evidence review

All three targeted v21 regressions return to PASS in both isolated variants: V9Exposed32/F17 displays Norwood's literal61-yard record return; RetrievalQuality28/RQ02 displays the complete Orders released at or after14:20 next-operating-day sentence without operational filler; Binding64/T4A displays Vera Linven's24-tray tagging run. Each exact answer/filename/quotation matches the historical v20 output. The gains restore preservation, not new fact discovery.

Only three cases change versus same-session v21, six outputs total. All six were reviewed against the original source/key and displayed evidence. The other512 outputs per variant retain exact answer/quote parity and their prior explicit relevance review. Original119 quotations are unchanged and all119 pass. V9Exposed32, RQ28, Actor40, Scope48, Confirmation48 and Precision48 remain or return to all PASS. Precision48 retains its37 directly relevant source-literal citations and previous48-case notes.

Binding64 reaches61 PASS /1 PARTIAL /2 FAIL both, retaining its qualified v20 first45/1/18 and exposed v21 first60/1/3. All12 supported counts,8 conditions,12 unsupported controls and4 separate lexical Comparisons pass; compound C02 remains PARTIAL and public F05/F08 remain FAIL. No previous PASS is lost. All58 citations per variant are source-literal;57 satisfy expected body-paragraph containment and55 contain a requested frozen span. Independent labels are54 DIRECT,1 DIRECT_PER_KEY_WORDING_LIMIT and3 missing requested fact/wrong paragraph. T4A's broad quotation contains other actor/task counts; the requested tuple itself is displayed. Literal provenance is not a general factual-support guarantee.

The remaining failures are unchanged: F05 selects the wrong historical occupation/date paragraph under a deictic original question; F08 omits the required winter temperature, retaining its original winner typo; C02 omits that winter facet while displaying the maximum temperature facet. F07's monthly-versus-maximum source/key wording limitation, original duplicate F19/F20 strings and repeated C04 facet remain disclosed, without regrading or resampling. All95 unsupported controls explicitly refuse without citations; no unsupported false acceptances or new supported false refusals occur. The old supported FreshConfirmation32/F10 false refusal remains in both variants.

The historical451 gate PASS is restored, but the full Binding64 and overall gates remain FAIL because the original compound and every-citation requested-support requirements are unmet. Passing repairs do not authorize adoption or establish independent accuracy. All397 unit checks and strict offline checks pass, but are separate from real-MiniLM evidence. No post-answer tuning, question retry, new sample or runtime adoption follows this result. Production stays5.6/r44.


## All cases below PASS

- ExternalSQuAD24/fixed/E08: FAIL; false acceptance False; false refusal False; Statues of British artists adorn which part of the tower above the main entrance?
- ExternalSQuAD24/fixed/E24: FAIL; false acceptance False; false refusal False; What characteristic of oxygen makes it necessary to life?
- ExternalSQuAD24/section/E08: FAIL; false acceptance False; false refusal False; Statues of British artists adorn which part of the tower above the main entrance?
- FreshConfirmation32/fixed/F07: FAIL; false acceptance False; false refusal False; How did Luther express the destruction?
- FreshConfirmation32/fixed/F09: FAIL; false acceptance False; false refusal False; Who did Luther call on to stop the revolt?
- FreshConfirmation32/fixed/F10: FAIL; false acceptance False; false refusal True; When was the large work published?
- FreshConfirmation32/section/F09: FAIL; false acceptance False; false refusal False; Who did Luther call on to stop the revolt?
- FreshConfirmation32/section/F10: FAIL; false acceptance False; false refusal True; When was the large work published?
- Binding64/fixed/F05: FAIL; false acceptance False; false refusal False; What years did this occupation take place?
- Binding64/fixed/F08: FAIL; false acceptance False; false refusal False; How cold does this region of Victoria get in the winner?
- Binding64/fixed/C02: PARTIAL; false acceptance False; false refusal False; What is Victoria's highest monthly temperature? Also, How cold does this region of Victoria get in the winner?
- Binding64/section/F05: FAIL; false acceptance False; false refusal False; What years did this occupation take place?
- Binding64/section/F08: FAIL; false acceptance False; false refusal False; How cold does this region of Victoria get in the winner?
- Binding64/section/C02: PARTIAL; false acceptance False; false refusal False; What is Victoria's highest monthly temperature? Also, How cold does this region of Victoria get in the winner?

397 unit tests and strict offline checks pass; these checks are not MiniLM accuracy. All124 original input hashes and70 sealed historical artifact members match. Actual module identity was checked before uploads/questions. The original historical Atlas hash manifest is unavailable; current PDFs and independent PDF text provenance are verified. Source provenance, expected body paragraph, requested span and independent relevance remain separate checks. Literal text is not entailment.

No candidate runtime adoption follows this run, regardless of gate. Live production stays GroundedDesk5.6/retrieval2026-10-13-r44. No new sample is consumed. Complete raw per-case JSON, screenshots, vectors and ledgers are preserved in the local full evidence archive. Public evidence contains scorecards, derived capture indexes with hashes of complete raw files, and selected changed/target screenshots. Complete raw captures, vectors, source extraction and all historical PDF evidence stay in the local full archive; derived indexes are not replacements for raw evidence.

[Public scorecards and selected browser evidence](./evidence/coverage-v22-r44/) · [Combined decision](./evidence/coverage-v22-r44/combined-decision.json).
