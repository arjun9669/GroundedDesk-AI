# V16 literal-body recovery — actual Chrome/MiniLM

**355-case regression gate: FAIL. Confirmation48: NOT RUN per frozen stop rule. Production remains5.6/r44.**

Candidate v16 trims only leading Markdown heading lines while retaining original body substrings, offsets and excerpts. It adds constrained budget-value and place-in-country recovery for prior refusals: bounded source text, queried entity binding, actual cosine>=0.42, and production preflight on the selected quote. Budget pronouns retain the named entity within a bounded paragraph or up-to-three-sentence window and require one budget mention. Place recovery requires a literal same-clause location relation. These are narrow surface grammar checks, not a general semantic entailment model or geographic verifier.

Installed headless Chrome155.0.8059.40 used actual local Xenova/all-MiniLM-L6-v2 q8 WASM Hybrid, Qwen disabled, new source/query/facet embeddings and384 dimensions. All355 cases were captured once:331 Hybrid Q&A and24 separate unchanged lexical Comparison. Actual production UI evidence was saved before each isolated candidate calculation. Candidate outputs are labelled browser-module panels; this is not an attached visible-tab test or a deployed v16 release. No mock embeddings, saved query-vector replay or automatic question retries.

Candidate/paired/helper SHA-256 and candidate identity were verified before upload or questions, along with frozen dependency bytes. Same-session v15 and v9 use the same actual vectors. All102 original input checks and frozen code/config remain unchanged after capture;35 historical artifacts match original archives. Original Atlas hash manifest remains unavailable; current PDFs and independent source-text provenance are verified.367 unit tests and strict offline checks pass; offline checks are not MiniLM accuracy evidence.

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
| Scope48 | 47/0/1 | 47/0/1 |

All355 cases are exposed in-sample regressions. Scope48 first fixed43/0/5 and section42/0/6 remain immutable; four correct role answers originally failed the frozen heading boundary and have not been retrospectively regraded. Historical Actor40 first28/2/10, V9 first24/1/6 plus1ungraded F06, and blocked original v14 with separately qualified replay remain unchanged.

Frozen development checks:
```json
{
  "all_scope48_pass": false,
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
- Scope48/fixed/F06: FAIL; false acceptance False; false refusal True; Roughly how much is the Student Government's budget?
- Scope48/section/F06: FAIL; false acceptance False; false refusal True; Roughly how much is the Student Government's budget?

No new confirmation corpus was consumed under the frozen stop rule.

Original119 retain semantic keys with independent review of changed quotations. RQ28 retains literal criteria; public cases retain original displayed original-paragraph gold groups. No expanded-context credit. Source provenance, expected-paragraph containment and direct-span matching are separate; none proves semantic entailment. Broad contextual quotations and partial overlap can remain despite literal provenance.

All exact answers, filenames, quotations, per-citation checks and case grades are in the full report/JSON. Original private outputs remain local; licensed public captures are published. No runtime adoption; passing only permits integration/release review. Production remains r44.

[Public browser evidence](./evidence/coverage-v16-r44/) · [decision](./evidence/coverage-v16-r44/decision.json) · [hash audit](./evidence/coverage-v16-r44/integrity-audit.json).

## Scope48 targeted review

| Observation | Original v15 first result | v16 exposed regression |
|---|---|---|
| Fixed | 43 PASS / 0 PARTIAL / 5 FAIL | 47 / 0 / 1 |
| Section | 42 PASS / 0 PARTIAL / 6 FAIL | 47 / 0 / 1 |
| P02/P04/P06/P08 | Correct role facts; heading boundary FAIL | Body-only literal quotations PASS in both variants |
| F23 section | Supported country answer falsely refused | Original Normandy/France clause displayed; PASS |
| F06 both | Supported budget answer falsely refused | Still explicit zero-citation refusal; FAIL |

All37 citations in each Scope48 candidate have source provenance, original-paragraph containment and requested-span support. All12 Scope48 unsupported cases refuse without citations. Across the355 exposed cases, all59 unsupported cases refuse; each candidate still has two supported false refusals: older FreshConfirmation32/F10 and Scope48/F06. There are no historical PASS regressions. Original119 displayed quotations match the previous candidate, so the independent-review change queue is empty.

For F06, the source states `Its annual budget is greater than $2 million.` The real browser still displayed `I can't find this in the provided documents.` A read-only diagnosis using the saved actual source/cosine confirms that v16 constructs a bounded window containing Student Government and the budget clause, but its production preflight returns `Question-specific attribute was absent from the cited evidence.` This diagnosis does not submit another browser question, alter the captured answer, bypass the guard or change the FAIL. Do not infer an unobserved internal sentence-selection cause from this diagnostic alone.

Only nine candidate outputs changed relative to same-session v15: eight role/header outputs and the section F23 answer. Their displayed body facts agree with the original frozen key. No other source quotation changed. The budget route did not yield an answer; it must not be reported as a successful recovery. No Confirmation48 documents or keys were generated because the gate failed.

[Changed-answer evidence](./evidence/coverage-v16-r44/changed-answer-review.json) · [Read-only budget diagnosis](./evidence/coverage-v16-r44/budget-refusal-diagnosis.json). Original raw captures, scores and first-look archives remain unchanged.
