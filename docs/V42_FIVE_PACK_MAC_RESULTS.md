# First Mac v42 five-pack exposed regression — PASS

Date: 2026-10-20 (Asia/Kolkata). Protocol/inventory `7ed219e1` preceded coding;
preparation/freeze `8970bd5c` reached GitHub before questions. Candidate
`coverage-v42-ticket-relations`, paired frozen v41; Node 24.19.0 darwin/arm64,
Chrome 155.0.8059.85, actual local MiniLM q8 WASM, Qwen off. Live 5.6/r44 unchanged.

## Separate native pack gates

Cells show **PASS / PARTIAL / FAIL**. All contemporary variants have zero ERROR.

| Exposed pack | Actual r44 baseline | v42 fixed | v42 section | Paired v41 fixed / section |
| --- | --- | --- | --- | --- |
| Vela32 | 15 / 5 / 12 | **32 / 0 / 0** | **32 / 0 / 0** | 32 / 0 / 0 each |
| Prism32 | 13 / 5 / 14 | **32 / 0 / 0** | **32 / 0 / 0** | 32 / 0 / 0 each |
| Lumen32 | 13 / 4 / 15 | **32 / 0 / 0** | **32 / 0 / 0** | 32 / 0 / 0 each |
| Hearth32 | 16 / 5 / 11 | **32 / 0 / 0** | **32 / 0 / 0** | 32 / 0 / 0 each |
| Morrow32 | 17 / 4 / 11 | **32 / 0 / 0** | **32 / 0 / 0** | 31 / 0 / 1 each (M04) |

All five v42 native gates PASS, with no historical/production/paired PASS loss,
false acceptance/refusal or question retry. Each pack contains 28 actual MiniLM
Hybrid questions (20 supported/eight required refusals) and four separate lexical
Comparisons: **160 distinct previously exposed cases**, 140 Hybrid / 20 Comparisons.
Two variants do not create 320 independent cases; no general accuracy/full-gate
claim or pooling of different scoring families follows from this result.

## M04 repaired with explicit ticket-role queries

Original question:

> An Ashmere Funicular ticket order is released exactly at 13:35. When does it depart, and what can hold it back?

Both v42 variants quote one original literal span at 261–379:

> Ticket orders released at or after 13:35 depart on the next service day, unless a wind-suspension hold remains active.

Entity is **Ashmere Funicular**, operational type **ticket**. `ticket` is not
silently folded into or stripped from a source name. The body universe contains
no competing bare-name `Ashmere Funicular ticket` document. The typed request
binds only to an explicit ticket-order relation and retains the complete exception.

Fresh exact facet queries, independently embedded before candidate invocation:

| Query | Actual body cosine |
| --- | --- |
| `Ashmere Funicular ticket order at 13:35. When does it depart?` | 0.6845258320798834 |
| `Ashmere Funicular ticket order at 13:35. what can hold it back?` | 0.6126032979946368 |

Two facets share one literal citation, retaining distinct score/anchor ledger
entries. No date/day-unit inference or old-vector substitution occurred. Paired
v41 remains unresolved with zero planner facets and an uncited refusal; its first
Morrow32 31/0/1 and every older first result remain unchanged. Existing H04/L04 and
Vela V23/V27 protections remain successful in the exposed subset.

## Evidence, review and publication checks

The [first scorecards](evidence/v42-five-pack-mac/score/automated-scorecards.json)
retain all native grades/variants and historical preservation checks. The
[offline audit/assistant review](evidence/v42-five-pack-mac/score/assistant-review.json)
changes no grade. Complete requested facets, literal relevance, exceptions,
contradictions/ambiguity and unsupported controls were reviewed against original
source context. No downgrade was identified in this limited set. Morrow's full
source/output review and the unchanged outputs of the other four packs support
this check; source-literal quotes alone are not general entailment verification.

[Comparison to first v41](evidence/v42-five-pack-mac/score/first-v41-output-comparison.json)
finds only M04's two variant answers/quotes changed; 318 outputs (159 distinct cases)
are identical. All 20 original source texts are unchanged. This was offline output
comparison, not a model, answer-producer or scorer rerun.

Actual r44 UI output was saved before each experiment and checked against
instrumented baseline sources. Fresh actual source/query/legacy-facet and exact
v42/paired-v41 planner evidence was saved before calls. Offline audit validates 140
whole-query vectors, 15 v42 and 13 paired-v41 planner-facet vectors, recomputes
**9,202 body cosines** and checks **36 returned facet anchors**. Config metadata
hashes match original frozen bytes; captured config JSON contents match separately.
No historical normalization/rewrite or scorer rerun occurred.

The [SHA256 manifest](evidence/v42-five-pack-mac/manifest.json) seals **1,268 original
capture/score/review artifacts / 120,959,783 bytes**, excluding the manifest. These
include source/query/facet vectors, UI/candidate screenshots and JSON, pre-candidate
records, module proof, checkpoints, run ledger, complete status and copied freeze/
config. Question retries: **zero**. Selected previous v41/v40/v39 seals retain all
**3,069** original artifact hashes; original native input/history checks pass.
Morrow v30 M11/M32 FAIL, archive-name qualification, v32 BLOCKED/UNGRADED, qualified
v33 partial and all subsequent first results stay preserved.

Engineering checks remain **710 unit tests PASS**, strict **28/28 Keyword PASS**,
clean Chrome startup, syntax/diff/credential review and **529 frozen files verified**.
These checks are separate from actual-model quality evidence. See
[preparation](COVERAGE_V42_PREPARATION.md) and
[precommitted protocol](../eval/answer-completeness-v42/PROTOCOL.md).

## Remaining scope and next priority

The authorized v42 fix and five-pack revalidation are complete. Phase 1 remains
incomplete: **508 verified cases / 14 other packs await v42 testing**, plus 103
unavailable originals and the missing combined configuration. The inventory
reverified 668 available cases but established no quality result for untested packs.

The [preimplementation grammar inventory](evidence/v42-grammar-inventory/forms.json)
records four other unresolved v41 wordings deliberately outside this study:
RQ02,C09,B14,F14. Their context/source schemas require a separate design/protocol
before expanding affected-pack tests; do not conceal them or call them repaired
by M04's PASS. Review those forms and their original acceptance criteria before
choosing the next broader regression step. Unrelated verified scoring families
also need qualified native runners/scorers rather than automatic 32/32 rules.

V42 still has bounded language coverage and conservative ambiguous-name refusals.
These 160 exposed cases do not authorize phase 2, live integration or 6.0 release.
Full regression, explicit missing-input resolution, prospective confirmation and
integration/product/browser/performance/release gates remain open. Live r44's
baseline failures in the table remain real deployed limitations.
