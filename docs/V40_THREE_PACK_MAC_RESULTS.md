# First Mac v40 three-pack exposed regression — PASS

Date: 2026-10-20 (Asia/Kolkata). Protocol `894bc74` preceded implementation;
preparation/freeze `da10734` reached GitHub before questions. Official shared
`main`; bundled Node 24.19.0, macOS arm64, Chrome 155.0.8059.80, r44. Actual local
Xenova/all-MiniLM-L6-v2 q8 WASM; Qwen off. Candidate
`coverage-v40-dispatch-grammar`, paired frozen v39. Production remains 5.6/r44.

## Native results, scored separately

Each cell is **PASS / PARTIAL / FAIL**. Zero execution errors in all variants.

| Exposed pack | Actual r44 baseline | v40 fixed | v40 section | Paired v39 fixed / section |
| --- | --- | --- | --- | --- |
| Vela32 | 15 / 5 / 12 | **32 / 0 / 0** | **32 / 0 / 0** | 32 / 0 / 0 each |
| Prism32 | 13 / 5 / 14 | **32 / 0 / 0** | **32 / 0 / 0** | 32 / 0 / 0 each |
| Lumen32 | 13 / 4 / 15 | **32 / 0 / 0** | **32 / 0 / 0** | 31 / 0 / 1 each (L04) |

All three candidate gates PASS: no historical/paired PASS loss, false acceptance
or false refusal in either v40 variant. Every pack comprises 28 actual MiniLM
Hybrid questions (including eight required refusals) and four separate lexical
Comparisons. Across the run this is **96 distinct previously exposed cases**,
84 Hybrid and 12 Comparisons; two variants do not make 192 independent cases.
These native criteria are reused unchanged, not a pooled general-accuracy claim.

## L04 repaired without changing its earlier failure

Original question: “An Oridel Map Archive dispatch request is released exactly at
12:40. When should it depart, and which hold can prevent departure?”

Both v40 variants cite one unchanged literal span, offsets 278–386:

> At or after 12:40, departure moves to the following service day, unless a conservation hold is still active.

The independently embedded v40 facet queries are:

- `Oridel Map Archive dispatch at 12:40. When should it depart?`
- `Oridel Map Archive dispatch at 12:40. which hold can prevent departure?`

Their respective body-anchor cosines are **0.5263959368102634** and
**0.5589984860035815**. The two requested facets share the same literal citation
while retaining separate query/score ledger entries. This establishes the source's
following-service-day rule and full hold exception, not an invented calendar date.

Paired v39 remains unresolved, with zero planner facets and an uncited refusal.
Its measured first 31/0/1 FAIL and every earlier failure remain preserved. Vela
V23/V27 still refuse correctly. No saved whole-query vector stood in for a facet.

## Evidence and review

The [first scorecards](evidence/v40-three-pack-mac/score/automated-scorecards.json)
retain all per-case native grades and historical preservation checks. The
[offline audit and assistant review](evidence/v40-three-pack-mac/score/assistant-review.json)
changes no native grade. Review covered both variants' complete outputs against
the 12 full synthetic source documents, requested facets, literal relevance,
exceptions, negation, ambiguity and unsupported mixed requests. No contradiction
or incomplete support requiring a downgrade was found in this limited set.

Captured actual UI output precedes each experimental call; the runner verifies
instrumented production matches its displayed sources. Fresh actual vectors and
query/identity alignment are saved before candidate/paired invocation. The offline
audit verifies 84 whole-query vectors, 11 v40 and nine paired-v39 planner-facet
vectors, and independently recomputes **5,836** body cosines from captured vectors.
It checks all **20** returned facet-anchor ledger entries. No model, question,
answer producer or scorer was rerun during the offline audit.

The [SHA256 manifest](evidence/v40-three-pack-mac/manifest.json) seals **763**
original capture/score/review artifacts totaling **73,452,103 bytes**, excluding
the manifest itself. It includes source/query vectors, screenshots, per-case UI
and candidate outputs, pre-candidate evidence, module identity proof, exclusive
checkpoints, run ledger, complete status and copied freeze/config. Question
retries: **zero**. All 774 earlier v39 artifacts across the three packs still
match their original manifests; no historical file bytes changed.

Engineering verification remains **630/630 unit tests**, strict **28/28 Keyword**
evaluation, clean read-only startup and 470-file freeze verification. See
[preparation](COVERAGE_V40_PREPARATION.md) and the
[precommitted protocol](../eval/answer-completeness-v40/PROTOCOL.md).

## What remains

This completes the authorized v40 fix and three-pack revalidation. Phase 1 is
still incomplete: **572 verified cases across 16 other packs await v40 testing**;
**103 original cases and the combined configuration remain unavailable**. Next
prepare/freeze Hearth32 with its native criteria and historical preservation
checks, then continue the other verified packs. Keep the unavailable-input gap
explicit; do not reconstruct inputs from archived answers.

The full 771-case regression, separate prospective confirmation, integration,
performance/device/browser qualification and 6.0 release gates remain open.
The bounded grammar may still refuse other supported phrasings. This exposed
partial PASS does not authorize live adoption. Live r44 baseline limitations
shown in the table remain real; experimental results are not deployed behavior.
