# V18 narrative-clause selection — actual Chrome/MiniLM

**403-case regression gate: PASS. Precision48: FAIL. Production remains5.6/r44.**

V18 layers on unchanged v17. It extends leading surname quotes over adjacent literal initials and selects bounded sport/action/quoted-alias clauses only within already cited paragraphs of already answered questions. Sport uses actual cosine>=0.50, top gap>=0.12 and two query-form bridges; action uses explicit queried subject-role binding and cosine>=0.32; alias uses literal quoted naming, proper-name paragraph binding and cosine>=0.42. Numeric/temporal/exception questions are protected. Exact selected clauses pass the production guard; narrative display stays source-literal,<=620 characters and max3 sources. Successfully repaired compound facets are reassembled and deduplicated. These narrow surface/coreference heuristics do not certify entailment, factuality or all question quantifiers. All old refusal, budget, location and scope safeguards remain.

Installed headless Chrome155.0.8059.40 used actual local Xenova/all-MiniLM-L6-v2 q8 WASM Hybrid, Qwen disabled, new source/query/facet embeddings and384 dimensions. All403 cases were captured once:379 Hybrid Q&A and24 separate unchanged lexical Comparison. Actual production UI evidence was saved before each isolated candidate calculation. Candidate outputs are labelled browser-module panels; this is not an attached visible-tab test or a deployed v18 release. No mock embeddings, saved query-vector replay or automatic question retries.

Candidate/paired/helper SHA-256 and candidate identity were verified before upload or questions, along with frozen dependency bytes. Same-session v17 and v9 use the same actual vectors. All110 original input checks and frozen code/config remain unchanged after capture;45 historical artifacts match original archives. Original Atlas hash manifest remains unavailable; current PDFs and independent source-text provenance are verified.376 unit tests and strict offline checks pass; offline checks are not MiniLM accuracy evidence.

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
| Confirmation48 | 48/0/0 | 48/0/0 |

All403 cases are exposed in-sample regressions. Scope48 first fixed43/0/5 and section42/0/6 and Confirmation48 first fixed45/0/3 and section44/0/4 remain immutable; four correct role answers originally failed the frozen heading boundary and have not been retrospectively regraded. Historical Actor40 first28/2/10, V9 first24/1/6 plus1ungraded F06, and blocked original v14 with separately qualified replay remain unchanged.

Frozen development checks:
```json
{
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

## Remaining exposed cases below PASS

- ExternalSQuAD24/fixed/E08: FAIL; false acceptance False; false refusal False; Statues of British artists adorn which part of the tower above the main entrance?
- ExternalSQuAD24/fixed/E24: FAIL; false acceptance False; false refusal False; What characteristic of oxygen makes it necessary to life?
- ExternalSQuAD24/section/E08: FAIL; false acceptance False; false refusal False; Statues of British artists adorn which part of the tower above the main entrance?
- FreshConfirmation32/fixed/F07: FAIL; false acceptance False; false refusal False; How did Luther express the destruction?
- FreshConfirmation32/fixed/F09: FAIL; false acceptance False; false refusal False; Who did Luther call on to stop the revolt?
- FreshConfirmation32/fixed/F10: FAIL; false acceptance False; false refusal True; When was the large work published?
- FreshConfirmation32/section/F09: FAIL; false acceptance False; false refusal False; Who did Luther call on to stop the revolt?
- FreshConfirmation32/section/F10: FAIL; false acceptance False; false refusal True; When was the large work published?

## Precision48 — prospective public/adversarial first result

Prepared only after the403-case gate passed, using the predeclared v18 seed, unchanged SHA-ordering/eligibility/control templates and all28 previously consumed article exclusions. Frozen and committed sources, key, manifest and config hash before first answers; only the four sources were uploaded.48 Hybrid questions:24 externally authored public supported QA,4 compounds,4 standard unsupported,8 actor/object/site negatives,8 supported actor controls. No resampling or tuning after answers.

This is prospective to this candidate, not sealed independent accuracy, representative sampling or official SQuAD scoring. Public/model exposure may exist; constructed controls are self-authored. It is a separate test set and must not be pooled with exposed regression scores.

| Variant | PASS | PARTIAL | FAIL | False acceptances | False refusals | Source provenance |
|---|---:|---:|---:|---:|---:|---|
| baseline | 18 | 1 | 29 | 8 | 1 | 45/45 |
| fixed | 40 | 0 | 8 | 0 | 1 | 37/37 |
| section | 40 | 0 | 8 | 0 | 1 | 37/37 |
| paired_fixed | 40 | 0 | 8 | 0 | 1 | 37/37 |
| paired_section | 40 | 0 | 8 | 0 | 1 | 37/37 |

Frozen confirmation checks:
```json
{
  "development_gate_passed": true,
  "fixed_supported_at_least_21": false,
  "fixed_supported_actor_all_pass": false,
  "fixed_compounds_all_pass": true,
  "fixed_unsupported_all_pass": true,
  "fixed_every_citation_has_requested_span": false,
  "fixed_provenance_intact": true,
  "fixed_no_false_acceptance_or_refusal": false,
  "fixed_no_production_or_prior_section_pass_loss": true,
  "section_supported_at_least_21": false,
  "section_supported_actor_all_pass": false,
  "section_compounds_all_pass": true,
  "section_unsupported_all_pass": true,
  "section_every_citation_has_requested_span": false,
  "section_provenance_intact": true,
  "section_no_false_acceptance_or_refusal": false,
  "section_no_production_or_prior_section_pass_loss": true
}
```

Candidate cases below PASS:
- fixed/F04: FAIL; How many Medieval Warm Period reconstructions were used?; matched groups [False]; false acceptance False; false refusal False.
- fixed/F15: FAIL; How many general questions are available to opposition leaders?; matched groups [False]; false acceptance False; false refusal False.
- fixed/F20: FAIL; Which country today is a remnant of the Ottoman empire?; matched groups [False]; false acceptance False; false refusal False.
- fixed/F21: FAIL; Who did the Ottoman empire ally with in WW I?; matched groups [False]; false acceptance False; false refusal False.
- fixed/F22: FAIL; What was thought to decide a person's behavior?; matched groups [False]; false acceptance False; false refusal True.
- fixed/F24: FAIL; What were the two forms of environmental determinism?; matched groups [False]; false acceptance False; false refusal False.
- fixed/P03: FAIL; Who approves standard shelf indexes at the fictional Tiravel Library?; matched groups [False]; false acceptance False; false refusal False.
- fixed/P04: FAIL; Who has authority to approve standard shelf indexes at Tiravel Library?; matched groups [False]; false acceptance False; false refusal False.
- section/F04: FAIL; How many Medieval Warm Period reconstructions were used?; matched groups [False]; false acceptance False; false refusal False.
- section/F15: FAIL; How many general questions are available to opposition leaders?; matched groups [False]; false acceptance False; false refusal False.
- section/F20: FAIL; Which country today is a remnant of the Ottoman empire?; matched groups [False]; false acceptance False; false refusal False.
- section/F21: FAIL; Who did the Ottoman empire ally with in WW I?; matched groups [False]; false acceptance False; false refusal False.
- section/F22: FAIL; What was thought to decide a person's behavior?; matched groups [False]; false acceptance False; false refusal True.
- section/F24: FAIL; What were the two forms of environmental determinism?; matched groups [False]; false acceptance False; false refusal False.
- section/P03: FAIL; Who approves standard shelf indexes at the fictional Tiravel Library?; matched groups [False]; false acceptance False; false refusal False.
- section/P04: FAIL; Who has authority to approve standard shelf indexes at Tiravel Library?; matched groups [False]; false acceptance False; false refusal False.

## Independent displayed-evidence review

### Exposed Confirmation48 repairs

Both candidates now score48/0/0 on this exposed set. Its immutable first result remains fixed45/0/3 and section44/0/4. Exactly eight candidate outputs changed: F11/F22/F24 in both variants, and F19/C04 in section. Full source name Robert R. Gilruth, governor martial-law/militia action and Great Fire of 1901 are now displayed. Section F19 displays golf tourism, while C04 removes the unrelated military excerpt and retains both requested facts in one quotation. All changed quotations are source-literal, in the expected paragraph and directly support their frozen groups. Both variants have37/37 source-literal, paragraph-contained, requested-span citations on exposed Confirmation48.

Original119 quotations are unchanged (empty independent-review queue). All71 unsupported cases in403 exposed regressions explicitly refuse without citations; old supported false refusals outside the required sets remain disclosed. The regression gate is not403/403 overall accuracy: older ExternalSQuAD24/FreshConfirmation32 failures remain listed. This review re-examines the eight changed answers rather than claiming a new human re-annotation of every unchanged case.

Some quotations retain broad neighboring context. The original F09 annotations are broad; F19/C04 ask most tourists while the source only says particularly golf. Frozen per-case grades and these wording limitations are both preserved. Scope/coreference rules, paragraph containment and literal spans do not certify general entailment.


### Precision48 first result and independent relevance

First scores are40 PASS /0 PARTIAL /8 FAIL in both variants; gate FAIL. External supported questions score18/24, supported role controls6/8, compounds4/4, unsupported12/12. All37 citations per candidate are source-literal,34 are wholly in expected gold paragraphs and29 contain a requested span under the boundary-conditioned metric. There are0 unsupported false acceptances and1 supported false refusal (F22) per candidate. All answers and quotations exactly match paired v17, so these fresh weaknesses were measured, not introduced by v18. No same-session production/prior-section PASS loss was observed.

Failures in both: F04 omits the reconstruction count; F20 omits Turkey; F21 omits Germany; F22 falsely refuses the source belief about environment; F24 omits orientalism and tropicality. F15 displays the correct four but crosses an internal Context heading; P03/P04 display correct role/action/object/site facts but include a preceding unrelated colon line and internal approval heading. Those three are frozen quotation-boundary FAILs, not missing/wrong role or count facts. Do not rescore them or treat the direct-span proxy as proof their answer words are absent.

Independent per-citation relevance per candidate:29 DIRECT,3 DIRECT_WITH_BOUNDARY_CONTAMINATION,5 OFF_TOPIC_FOR_REQUESTED_FACT. Four off-topic citations belong to F04/F20/F21/F24; the fifth is C04 citation2. C04 keeps its original paragraph-proxy PASS because citation1 already contains both frozen groups, but citation2 supports neither facet. The additional predeclared precision gate correctly FAILS it. Source provenance alone does not establish relevance or entailment. Broad neighboring context also remains within some DIRECT quotations.

Original reconstruction annotations mix14 and Ten; F05 actually displays the correct Ten-of14 relation, while F04 displays neither count. Frozen annotations and scores are unchanged. Historic source claims and discredited colonial ideologies are evaluated as attributed passage content, not endorsed as facts or current advice. Saved answers preserve the original Unicode en dashes; the apparent replacement characters in shell display are not in the evidence files. Full case notes are in independent-assessment.json.

No tuning, retries, additional samples or runtime adoption follow this first outcome. Production remains r44.


Original119 retain semantic keys with independent review of changed quotations. RQ28 retains literal criteria; public cases retain original displayed original-paragraph gold groups. No expanded-context credit. Source provenance, expected-paragraph containment and direct-span matching are separate; none proves semantic entailment. Broad contextual quotations and partial overlap can remain despite literal provenance.

All exact answers, filenames, quotations, per-citation checks and case grades are in the full report/JSON. Original private outputs remain local; licensed public captures are published. No runtime adoption; passing only permits integration/release review. Production remains r44.

[Public browser evidence](./evidence/coverage-v18-r44/) · [decision](./evidence/coverage-v18-r44/decision.json) · [hash audit](./evidence/coverage-v18-r44/integrity-audit.json).
