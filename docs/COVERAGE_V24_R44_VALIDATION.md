# v24 unique literal-date follow-up — real Chrome/MiniLM in-sample regression

**Overall gate: PASS. Historical451: PASS. Binding64: PASS. Live r44 unchanged.**

All 515 questions are previously exposed: 451 historical and 64 Binding64. Installed headless Chrome155.0.8059.40 used actual local Xenova/all-MiniLM-L6-v2 q8 WASM with fresh384-dimensional source/query/facet embeddings, Qwen off. There are487 Hybrid questions and28 separate lexical Comparison questions. Actual UI baseline is captured first; isolated fixed/section v24 outputs and paired v23 use the verified frozen modules. This is not an attached visible-tab test, deployed v24 release, new independent benchmark or pooled real-world accuracy estimate. No mock embeddings, saved-vector replay, question retries or post-answer tuning.

V24 is a separately frozen follow-up after the complete v23 first result63/0/1 was committed and archived. It wraps unchanged v23 with one unique literal event/date fallback inside already selected documents. Exact noun/positive dated relation/source substring, exactly one distinct candidate and finite actual cosine are required. The real cosine is retained unchanged and is not used as a factual threshold for this fallback; no fabricated scores/vectors or model-only gain. Existing semantic Hybrid still ranks documents. Temperature/compound fixes and separate lexical Comparison remain v23. Prior refusals, ambiguity, source bounds and unknown grammar are preserved. This is a limited surface relation rule, not general antecedent resolution or entailment.

V23 and v24 each capture515 cases once with different frozen candidates: two separate exposed in-sample runs, not one run or a retry of v23. The first v23 wrong-paragraph F05 result and its0.2406 model cosine remain immutable. No new corpus or changed scoring rule is used. Full original v23 evidence SHA256 eef417f0ab5936899a1beb0197c0c3880635fa8248cd773b360876ab0e71bde0 remains verified.

The original Binding64 first attempt remains BLOCKED/ungraded before model loading/questions; its qualified v20 first-answer result45/1/18 both stays immutable. Binding64 is now an exposed development set. Precision48 first40/0/8, v19 failed gate, v20 exposed passing gate, v21 failed gate and exposed Binding64 60/1/3, v22 historical PASS/overall FAIL and Binding64 61/1/2, v23 historical PASS/overall FAIL and Binding64 first63/0/1, and all prior original scores remain unchanged. Public question ambiguities, duplicate strings and original typos are retained; historical source claims are not current-world certification. Different corpora/rubrics are not pooled.

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
| Binding64 | 64/0/0 | 64/0/0 |

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
    "fixed_every_citation_requested_span": true,
    "fixed_provenance_intact": true,
    "fixed_no_false_acceptance_or_refusal": true,
    "fixed_no_paired_or_production_pass_loss": true,
    "section_public_at_least21": true,
    "section_compound_all4": true,
    "section_count_all12": true,
    "section_conditional_all8": true,
    "section_unsupported_all12": true,
    "section_comparison_all4": true,
    "section_every_citation_requested_span": true,
    "section_provenance_intact": true,
    "section_no_false_acceptance_or_refusal": true,
    "section_no_paired_or_production_pass_loss": true
  },
  "combined": {
    "classification": "515 exposed in-sample regressions; not new independent accuracy",
    "historical451_gate": "PASS",
    "binding64_gate": "PASS",
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
        "fixed": "PASS",
        "section": "PASS"
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
    "overall_gate": "PASS",
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

V24 reaches64 PASS /0 PARTIAL /0 FAIL on the unchanged frozen Binding64 rubric in both isolated variants. Historical451 and overall development gates PASS. Only F05 changes versus same-session frozen v23, two outputs total; its displayed sentence now explicitly gives the occupation of Prussia by Napoleon in1806-07 from the correct original paragraph. The actual cosine remains0.24062062825660308, below0.35, and is preserved without alteration. The gain is caused by an explicit unique literal-date fallback in an already selected document, not a model-only semantic improvement.

V23's complete first63/0/1 and overall FAIL were committed and sealed before v24 implementation and remain immutable. These are two separate515-case exposed regression captures with different frozen candidates, not one run or a retry/replacement of v23. No question, key, source, rubric, vector or historical score is modified. No new sample is consumed. Every current raw vector is generated by actual local MiniLM; unit scalar fixtures are separate synthetic controls.

All other514 displayed outputs per variant retain exact paired-v23 answer/filename/quote parity and prior explicit relevance review. No prior PASS is lost. The original119, RQ28, V9Exposed32, Actor40, Scope48, Confirmation48 and Precision48 required passes remain correct; all95 unsupported controls explicitly refuse without citations. The pre-existing supported FreshConfirmation32/F10 false refusal and older public failures outside required gate sets remain. Gate PASS is not515/515 correct answers or independent accuracy.

All58 Binding64 citations per variant are source-literal, expected-body-paragraph-contained and include at least one requested frozen span. Independent labels are54 DIRECT,2 DIRECT_PER_KEY_WORDING_LIMIT and2 DIRECT_PER_KEY_AVERAGE_BOUND_LIMIT. Frozen64/64 is not unqualified semantic entailment: F07 and C02 ask highest monthly temperature but quote a maximum since WWII; F08 and C02 quote winter averages exceeding15 degreesC, not an absolute low. Keep the original winner typo, deictic F05 wording, duplicate F19/F20 strings and repeated C04 facet visible. These qualifications were predeclared, not used to rewrite grades after observation.

All405 unit checks and strict offline checks pass separately. The typed fallback is narrow and not general temporal/coreference/negation/entailment verification. No post-answer v24 tuning, retries, additional sample or production adoption follows this result. Production stays GroundedDesk5.6/retrieval2026-10-13-r44. A separately frozen confirmation and integration review are needed before any runtime change.


## All cases below PASS

- ExternalSQuAD24/fixed/E08: FAIL; false acceptance False; false refusal False; Statues of British artists adorn which part of the tower above the main entrance?
- ExternalSQuAD24/fixed/E24: FAIL; false acceptance False; false refusal False; What characteristic of oxygen makes it necessary to life?
- ExternalSQuAD24/section/E08: FAIL; false acceptance False; false refusal False; Statues of British artists adorn which part of the tower above the main entrance?
- FreshConfirmation32/fixed/F07: FAIL; false acceptance False; false refusal False; How did Luther express the destruction?
- FreshConfirmation32/fixed/F09: FAIL; false acceptance False; false refusal False; Who did Luther call on to stop the revolt?
- FreshConfirmation32/fixed/F10: FAIL; false acceptance False; false refusal True; When was the large work published?
- FreshConfirmation32/section/F09: FAIL; false acceptance False; false refusal False; Who did Luther call on to stop the revolt?
- FreshConfirmation32/section/F10: FAIL; false acceptance False; false refusal True; When was the large work published?

405 unit tests and strict offline checks pass; these checks are not MiniLM accuracy. All124 original input hashes and82 sealed historical artifact members match. Actual module identity was checked before uploads/questions. The original historical Atlas hash manifest is unavailable; current PDFs and independent PDF text provenance are verified. Source provenance, expected body paragraph, requested span and independent relevance remain separate checks. Literal text is not entailment.

No candidate runtime adoption follows this run, regardless of gate. Live production stays GroundedDesk5.6/retrieval2026-10-13-r44. No new sample is consumed. Complete raw per-case JSON, screenshots, vectors and ledgers are preserved in the local full evidence archive. Public evidence contains scorecards, derived capture indexes with hashes of complete raw files, and selected changed/target screenshots. Complete raw captures, vectors, source extraction and all historical PDF evidence stay in the local full archive; derived indexes are not replacements for raw evidence.

[Public scorecards and selected browser evidence](./evidence/coverage-v24-r44/) · [Combined decision](./evidence/coverage-v24-r44/combined-decision.json).
