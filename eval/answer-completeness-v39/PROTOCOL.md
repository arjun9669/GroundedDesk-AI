# V39 engineering protocol — final dispatch request contract

Recorded 2026-10-20 before implementation, against main `bb6a8ce` and the
[reviewed design](../../docs/VELA32_REFUSAL_DESIGN_REVIEW.md).

## Authorized scope

Implement and unit-validate an isolated candidate only. Do not modify live r44,
frozen v33–v38, original questions, scoring, evidence or first results. Do not run
actual-model questions, create a confirmation set, add a browser capture runner
or adopt the candidate in the app in this task. Vela32 first 30/0/2 FAIL and the
integration HOLD remain unchanged.

The new public adapter owns every request that the inherited clock classifier
could select. For owned requests, build a complete bounded request plan before
selecting evidence. Unknown or partially parsed requests refuse without falling
back to older answer selectors. Non-owned requests delegate unchanged to v38;
lexical Comparison remains the exact v38 export.

## Implementation contract

- Recognize affirmative named dispatch/shipping/departure request contexts with
  a valid 24-hour time, requested departure/day and hold/exception facets, scoped
  approval questions, and explicitly named dispatch attributes/vehicles.
- Account for each requested clause joined with `and`, an additional question
  sentence or `Also,`. Do not split conjunctions inside entity names. Unknown
  clauses, ambiguous scope, invalid times and unsupported context forms refuse.
- Select only matching literal relations from the unique scoped source identity.
  A time quotation cannot support an approval or arbitrary attribute. Positive
  fixtures must also support explicitly documented approvers and attributes;
  there is no forbidden-password/approver keyword list.
- Governed requests select from supplied actual body evidence rather than calling
  an inherited answer producer first. This is the reviewed final-contract design
  with the unsafe producer omitted for the governed scope: no older selector can
  restore a rejected answer. Other requests retain the frozen v38 path.
- Before/equality/after rules must match their stated inequalities and day/hold
  evidence. Repeated, conflicting, unrecognized or nonliteral relations cannot
  be promoted to answers. Keep the existing 620-character quotation bound and
  three-citation maximum.
- A successful multi-facet answer requires separately scored, explicitly aligned
  request-facet body evidence. Whole-query vectors cannot be relabelled as facet
  vectors. Expose the plan/query contract for a future separately frozen runner.
- Require finite actual cosine metadata and corresponding literal source anchors.
  Invalid evidence is an error, not a keyword or inherited-answer fallback.
  Synthetic unit values are contract fixtures, never model-quality evidence.
- Return either complete literal displayed support for every requested facet or
  the established explicit refusal with zero citations. Do not retain stale
  generated text, source cards or success diagnostics from an earlier answer.

## Engineering acceptance

Add full-entry-point controls for before/equal/after cutoff, varied cutoffs and
entities, legacy-selectable before rules, prefix/suffix inclusive forms,
unsupported actor/attribute/vehicle and mixed requests, positive supported
counterparts, conjunction variants, invalid/ambiguous rules, foreign source
identities, negation, quotation bounds, citation limits and evidence alignment.
Cover both previously answered and refused production anchors. Keep original
Vela32 questions/key bytes unchanged when using the two exposed failure questions.

Run the new tests and the complete existing unit suite; run the strict bundled
Keyword evaluation. Review the diff and verify frozen/runtime paths unchanged.
On any required test failure stop and ask before further implementation, retries,
committing or publishing. Do not relax assertions to manufacture a pass.

## Deferred gates

Engineering PASS does not establish actual MiniLM accuracy or PASS preservation
on the exposed corpus. A later authorized task must freeze code, planner,
source/query/facet vectors, runner, original keys, environment and new output
directories before a 771-input exposed run (711 Hybrid, 60 lexical Comparisons).
Retain every native historical gate and original failure; require no new PASS
loss or false acceptance/refusal, and repair V23/V27 without losing the other
Vela32 passes. Do not pool these counts into a single accuracy claim.

Only after exposed-regression and engineering gates pass may a separately
authorized prospective confirmation be prepared. Existing Vela32 is exposed and
cannot become fresh confirmation again. A fresh failure/blocker stops integration;
even a pass only qualifies a later integration and device/performance review.
