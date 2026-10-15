# v23 evidence completeness — real Chrome/MiniLM in-sample regression

**Overall gate: FAIL. Historical451: PASS. Binding64: FAIL. Live r44 unchanged.**

All 515 questions are previously exposed: 451 historical and 64 Binding64. Installed headless Chrome155.0.8059.40 used actual local Xenova/all-MiniLM-L6-v2 q8 WASM with fresh384-dimensional source/query/facet embeddings, Qwen off. There are487 Hybrid questions and28 separate lexical Comparison questions. Actual UI baseline is captured first; isolated fixed/section v23 outputs and paired v22 use the verified frozen modules. This is not an attached visible-tab test, deployed v23 release, new independent benchmark or pooled real-world accuracy estimate. No mock embeddings, saved-vector replay, question retries or post-answer tuning.

V23 wraps unchanged v22. Recognized event-year queries require the exact event noun and an explicit dated relation in a literal sentence, searched only within selected documents. Cold/warm temperature slots require numeric C/F units and temperature/season/extremum language; missing evidence can be selected only in the already cited paragraph. Deictic questions may retain the adjacent literal subject sentence. Different eligible dates or measurements preserve prior output. Existing refusals, operative questions, cosine>=0.35 and620-character limits remain. Successfully repaired compound facets are reassembled only if every facet is answered. No question token rewriting, answer-key lookup, hardcoded case names/values or general entailment claim; lexical Comparison remains unchanged and separate from Hybrid.

The original Binding64 first attempt remains BLOCKED/ungraded before model loading/questions; its qualified v20 first-answer result45/1/18 both stays immutable. Binding64 is now an exposed development set. Precision48 first40/0/8, v19 failed gate, v20 exposed passing gate, v21 failed gate and exposed Binding64 60/1/3, v22 historical PASS/overall FAIL and Binding64 61/1/2, and all prior original scores remain unchanged. Public question ambiguities, duplicate strings and original typos are retained; historical source claims are not current-world certification. Different corpora/rubrics are not pooled.

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
| Binding64 | 63/0/1 | 63/0/1 |

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
    "fixed_compound_all4": true,
    "fixed_count_all12": true,
    "fixed_conditional_all8": true,
    "fixed_unsupported_all12": true,
    "fixed_comparison_all4": true,
    "fixed_every_citation_requested_span": false,
    "fixed_provenance_intact": true,
    "fixed_no_false_acceptance_or_refusal": true,
    "fixed_no_paired_or_production_pass_loss": true,
    "section_public_at_least21": true,
    "section_compound_all4": true,
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
    "preservation_and_evidence_targets": {
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
      },
      "Binding64/F05": {
        "fixed": "FAIL",
        "section": "FAIL"
      },
      "Binding64/F08": {
        "fixed": "PASS",
        "section": "PASS"
      },
      "Binding64/C02": {
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

V23 first result is63 PASS /0 PARTIAL /1 FAIL in both isolated variants. F08 now displays the literal named-region climate sentence and15 degreesC winter-average bound; C02 displays both frozen temperature groups in two relevant same-paragraph quotations. Only those two cases/four outputs change. Other513 outputs per variant retain exact paired-v22 answer/quote parity and prior explicit review. No prior PASS is lost. All95 unsupported controls remain uncited refusals; only the old supported FreshConfirmation32/F10 false refusal remains.

F05 remains FAIL. The actual MiniLM cosine for the correct occupation/date sentence is0.24062062825660308, below the frozen0.35 eligibility threshold. The literal occupation/1806-07 relation is present, but v23 excludes it and preserves the old wrong-paragraph quotation. This first v23 failure is preserved, without modifying v23 or retrying a question.

All58 citations per variant are source-literal;57 satisfy expected body paragraph and requested span checks. The historical451 gate PASS remains, but Binding64 and overall gates FAIL because F05 is still unsupported by its displayed citation. Original119, RQ28, V9Exposed32, Actor40, Scope48, Confirmation48 and Precision48 required passes are preserved. Older public failures outside the required gate remain recorded; this is not515/515.

Independent wording review qualifies frozen PASS cases rather than rewriting the key: F07/C02 ask highest monthly temperature while their source/key supplies a maximum since WWII. F08/C02 cite averages exceeding15 degreesC in winter, not a minimum temperature. The winner typo, deictic references, duplicate F19/F20 strings and repeated C04 facet remain unchanged. Literal provenance and frozen answer-span compliance do not establish full semantic entailment or independent accuracy. All515 questions are exposed in-sample regression. All402 unit checks and strict offline checks pass separately. No candidate adoption, new sample, mock vectors or saved-query replay.


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
- Binding64/section/F05: FAIL; false acceptance False; false refusal False; What years did this occupation take place?

402 unit tests and strict offline checks pass; these checks are not MiniLM accuracy. All124 original input hashes and76 sealed historical artifact members match. Actual module identity was checked before uploads/questions. The original historical Atlas hash manifest is unavailable; current PDFs and independent PDF text provenance are verified. Source provenance, expected body paragraph, requested span and independent relevance remain separate checks. Literal text is not entailment.

No candidate runtime adoption follows this run, regardless of gate. Live production stays GroundedDesk5.6/retrieval2026-10-13-r44. No new sample is consumed. Complete raw per-case JSON, screenshots, vectors and ledgers are preserved in the local full evidence archive. Public evidence contains scorecards, derived capture indexes with hashes of complete raw files, and selected changed/target screenshots. Complete raw captures, vectors, source extraction and all historical PDF evidence stay in the local full archive; derived indexes are not replacements for raw evidence.

[Public scorecards and selected browser evidence](./evidence/coverage-v23-r44/) · [Combined decision](./evidence/coverage-v23-r44/combined-decision.json).
