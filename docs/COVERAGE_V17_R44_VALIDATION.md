# V17 budget-clause preflight — actual Chrome/MiniLM

**355-case regression gate: PASS. Confirmation48: FAIL. Production remains5.6/r44.**

V17 changes only budget preflight: the unchanged production guard must retain the exact eligible budget body clause, after which the candidate displays the validated literal entity-bound window. V16 heading cleanup, country recovery, cosine>=0.42, numeric value eligibility, one-budget paragraph, up-to-three-sentence window,620-character bound and unsupported safeguards remain unchanged. Entity/coreference binding is a narrow structural heuristic, not semantic entailment certification. No application runtime changes.

Installed headless Chrome155.0.8059.40 used actual local Xenova/all-MiniLM-L6-v2 q8 WASM Hybrid, Qwen disabled, new source/query/facet embeddings and384 dimensions. All355 cases were captured once:331 Hybrid Q&A and24 separate unchanged lexical Comparison. Actual production UI evidence was saved before each isolated candidate calculation. Candidate outputs are labelled browser-module panels; this is not an attached visible-tab test or a deployed v17 release. No mock embeddings, saved query-vector replay or automatic question retries.

Candidate/paired/helper SHA-256 and candidate identity were verified before upload or questions, along with frozen dependency bytes. Same-session v16 and v9 use the same actual vectors. All102 original input checks and frozen code/config remain unchanged after capture;40 historical artifacts match original archives. Original Atlas hash manifest remains unavailable; current PDFs and independent source-text provenance are verified.371 unit tests and strict offline checks pass; offline checks are not MiniLM accuracy evidence.

## Exposed regression sets

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

All355 cases are exposed in-sample regressions. Scope48 first fixed43/0/5 and section42/0/6, and v16 regression47/0/1 both, remain immutable; four correct role answers originally failed the frozen heading boundary and have not been retrospectively regraded. Historical Actor40 first28/2/10, V9 first24/1/6 plus1ungraded F06, and blocked original v14 with separately qualified replay remain unchanged.

Frozen development checks:
```json
{
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

## Remaining exposed cases below PASS

- ExternalSQuAD24/fixed/E08: FAIL; false acceptance False; false refusal False; Statues of British artists adorn which part of the tower above the main entrance?
- ExternalSQuAD24/fixed/E24: FAIL; false acceptance False; false refusal False; What characteristic of oxygen makes it necessary to life?
- ExternalSQuAD24/section/E08: FAIL; false acceptance False; false refusal False; Statues of British artists adorn which part of the tower above the main entrance?
- FreshConfirmation32/fixed/F07: FAIL; false acceptance False; false refusal False; How did Luther express the destruction?
- FreshConfirmation32/fixed/F09: FAIL; false acceptance False; false refusal False; Who did Luther call on to stop the revolt?
- FreshConfirmation32/fixed/F10: FAIL; false acceptance False; false refusal True; When was the large work published?
- FreshConfirmation32/section/F09: FAIL; false acceptance False; false refusal False; Who did Luther call on to stop the revolt?
- FreshConfirmation32/section/F10: FAIL; false acceptance False; false refusal True; When was the large work published?

## Targeted Scope48 repair

Both candidate variants now score48/0/0 on exposed Scope48, with38/38 source-literal, original-paragraph, direct-span citations each. Only the fixed/section F06 answers changed relative to same-session v16. The displayed quotation binds Student Government to its annual budget greater than $2 million; the qualifying phrase greater than is retained. All59 unsupported cases in the355-case regression still refuse without citations. Older FreshConfirmation32/F10 remains a supported false refusal in each variant; other older public failures are listed above. A regression-gate PASS does not mean all355 answers are correct.


## Confirmation48 — prospective public/adversarial first result

Prepared only after the355-case gate passed, using the original unexecuted v16 seed, unchanged SHA-ordering/eligibility/control templates and all24 previously consumed article exclusions. Frozen and committed sources, key, manifest and config hash before first answers; only the four sources were uploaded.48 Hybrid questions:24 externally authored public supported QA,4 compounds,4 standard unsupported,8 actor/object/site negatives,8 supported actor controls. No resampling or tuning after answers.

This is prospective to this candidate, not sealed independent accuracy, representative sampling or official SQuAD scoring. Public/model exposure may exist; constructed controls are self-authored. It is a separate test set and must not be pooled with exposed regression scores.

| Variant | PASS | PARTIAL | FAIL | False acceptances | False refusals | Source provenance |
|---|---:|---:|---:|---:|---:|---|
| baseline | 19 | 3 | 26 | 8 | 0 | 44/44 |
| fixed | 45 | 0 | 3 | 0 | 0 | 37/37 |
| section | 44 | 0 | 4 | 0 | 0 | 38/38 |
| paired_fixed | 45 | 0 | 3 | 0 | 0 | 37/37 |
| paired_section | 44 | 0 | 4 | 0 | 0 | 38/38 |

Frozen confirmation checks:
```json
{
  "development_gate_passed": true,
  "fixed_supported_at_least_21": true,
  "fixed_supported_actor_all_pass": true,
  "fixed_compounds_all_pass": true,
  "fixed_unsupported_all_pass": true,
  "fixed_provenance_intact": true,
  "fixed_no_false_acceptance_or_refusal": true,
  "fixed_no_production_or_prior_section_pass_loss": true,
  "section_supported_at_least_21": false,
  "section_supported_actor_all_pass": true,
  "section_compounds_all_pass": true,
  "section_unsupported_all_pass": true,
  "section_provenance_intact": true,
  "section_no_false_acceptance_or_refusal": true,
  "section_no_production_or_prior_section_pass_loss": true
}
```

Candidate cases below PASS:
- fixed/F11: FAIL; Who originally led the Space Task Group?; matched groups [False]; false acceptance False; false refusal False.
- fixed/F22: FAIL; In the wake of the Jacksonville fire, what did the Florida Governor do?; matched groups [False]; false acceptance False; false refusal False.
- fixed/F24: FAIL; What was the Jacksonville fire later known as?; matched groups [False]; false acceptance False; false refusal False.
- section/F11: FAIL; Who originally led the Space Task Group?; matched groups [False]; false acceptance False; false refusal False.
- section/F19: FAIL; What sport attracts most tourists to Jacksonville?; matched groups [False]; false acceptance False; false refusal False.
- section/F22: FAIL; In the wake of the Jacksonville fire, what did the Florida Governor do?; matched groups [False]; false acceptance False; false refusal False.
- section/F24: FAIL; What was the Jacksonville fire later known as?; matched groups [False]; false acceptance False; false refusal False.

### Independent displayed-evidence review

All candidate answers and quotes exactly match paired v16 on this fresh set. The new budget change fixed the exposed Scope48 failure; no fresh-set improvement can be attributed to it. F11 displays only Gilruth rather than Robert R. Gilruth and keeps its strict full-name FAIL. F22 omits the governor martial-law action; F24 omits Great Fire of 1901. Section F19 gives military/port facts instead of golf tourism. No candidate false acceptances or false refusals occur under the frozen unsupported-question definitions; supported wrong-topic answers are still FAIL.

All37 fixed and38 section citations have source provenance and original-paragraph containment, but those metrics do not establish answer relevance. Independent direct-answer relevance counts are:
```json
{
  "fixed": {
    "DIRECT": 34,
    "PARTIAL_NAME": 1,
    "OFF_TOPIC_FOR_REQUESTED_FACT": 2
  },
  "section": {
    "DIRECT": 33,
    "PARTIAL_NAME": 1,
    "OFF_TOPIC_FOR_REQUESTED_FACT": 4
  }
}
```

Fixed:34 direct,1 surname-only partial,2 off-topic for the requested fact. Section:33 direct,1 surname-only partial,4 off-topic. Section C04 retains frozen PASS because both quotes are in the key paragraph, but its military/port excerpt supports neither the golf nor resident-name facet and is independently flagged. This does not change the first scorecard or frozen rubric. F09 has broad original mission-type gold annotations; F19 asks most tourists while the source only says particularly golf. Those wording limits remain disclosed. Broad neighboring context also remains in some otherwise directly relevant quotes.

The confirmation gate FAILS because section external supported questions score20/24 below21; fixed external questions score21/24. All4 compounds,8 supported role controls and12 unsupported controls pass under the frozen rules. No same-session production or paired-section PASS losses. Stop before tuning, retries, extra sampling or runtime adoption.


Original119 retain semantic keys with independent review of changed quotations. RQ28 retains literal criteria; public cases retain original displayed original-paragraph gold groups. No expanded-context credit. Source provenance, expected-paragraph containment and direct-span matching are separate; none proves semantic entailment. Broad contextual quotations and partial overlap can remain despite literal provenance.

All exact answers, filenames, quotations, per-citation checks and case grades are in the full report/JSON. Original private outputs remain local; licensed public captures are published. No runtime adoption; passing only permits integration/release review. Production remains r44.

[Public browser evidence](./evidence/coverage-v17-r44/) · [decision](./evidence/coverage-v17-r44/decision.json) · [hash audit](./evidence/coverage-v17-r44/integrity-audit.json).
