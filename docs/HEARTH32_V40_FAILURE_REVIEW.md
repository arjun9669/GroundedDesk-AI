# Hearth32 H04 — v40 failure investigation and proposed next experiment

Date: 2026-10-20 (Asia/Kolkata). Baseline `ba2ccb1e` on official shared `main`.
Authorized scope: publish unchanged first failure and investigate. **No candidate
implementation, model-question rerun, regrading or live adoption.**

The [first v40 Hearth32 gate](V40_HEARTH32_MAC_RESULTS.md) is 31/0/1 in both
variants. Paired v39 also31/0/1; H04 loses a historical PASS. Earlier first
failures and the v40 Vela32/Prism32/Lumen32 passes remain unchanged.

## Confirmed request failure

The [v40 adapter](../eval/answer-completeness-v40/coverage.mjs) calls the final
planner before an inherited answer producer for governed requests. H04 contains
`released`, `departure` and 14:10, so clock ownership applies. However,
[contextAndTail](../eval/answer-completeness-v40/clock-contract.mjs) requires a
named **dispatch/shipping/departure request/order**. The original context says
only **“A Veylan Seed Conservatory order is released exactly at 14:10.”**
The missing qualifier means the context is not recognized. The first clause
cannot parse as a standalone request; the planner returns `unresolved` with
`Unaccounted requested clause or unsupported context`. `answerClockPlan` refuses
immediately, before document/evidence selection. The saved capture records this
plan. A read-only call to the unchanged pure planner reproduced the identical
plan during investigation; no answer producer or model question was invoked.

There is a second, independent request grammar gap: **“Which collection day is
departure”** is not an accepted modal `day does/will/should it leave/depart/ship`
form, and `collection` is absent from its allowed day words. Static inspection
establishes this gap; no modified-question counterfactual was answered.
**“What hold can prevent it” already fits the hold-request grammar.** Do not
report it as another missing question form.

## Independent original-source gaps

The unchanged literal splitter yields these exact spans:

| Start/end | Original literal text |
| --- | --- |
| 205/267 | Orders released before 14:10 leave on the same collection day. |
| 268/366 | At or after 14:10, departure is the next collection day, unless a seed-health hold remains active. |

The source grammar independently excludes:

- `collection day`: `DAY` allows service/operating/business/working days.
- `hold remains active`: `HOLD` requires `hold is open/active/still active`.
- Bare `Orders released ...`: the request-style source schema requires
  `Dispatch requests cleared/released ...`.

At equality 14:10, the before-cutoff sentence is inapplicable. The inclusive
next-collection-day/hold span is required. `At or after`, `departure is` and `next`
are already recognized; these are not missing operators. Supporting only the
bare-order context would still leave both request and source grammar gaps.
The before-cutoff Orders form matters for a general bounded extension, but cannot
supply H04's equality answer. Do not turn collection days into invented dates or
silently equate them with service days.

## Why this is not an embedding or citation failure

The capture contains fresh actual source vectors: 5 fixed, 6 section and 53
sentence/body vectors. H04 has a 384D whole-query vector, but both v40 and paired
v39 planned **zero facets**, so both have zero planner-facet queries/vectors.
There is no missing-vector exception: parsing refused before evidence binding.
Any later expanded planner must embed its exact newly planned queries separately;
old whole-query/legacy vectors cannot be relabeled as those facet vectors.

The saved v38 answer includes both original policy sentences and was graded PASS.
V38 calls its predecessor before scoped repair; its own qualified dispatch context
also does not match this bare-order question. Its inherited chain runs through
v36 and v35's v33 answer export, whose broad clock frame can retain literal policy
evidence. This describes saved output and static call structure, not a rerun.
Falling back to an inherited answer for unresolved governed questions risks the
Vela V23 unsupported-approver/V27 incomplete-mixed-answer failures. Keep complete
whole-question accounting and terminal refusals for unresolved requests.

## Proposed isolated v41 scope — not implemented or authorized here

Before coding a new candidate, commit a narrow protocol. Preserve v40 and its
failed first run. A proposed experiment should:

1. Add bounded positive named bare-order release context only with fully accounted
   departure/hold requests and unique source identity. Avoid treating every order,
   purchase, payment or release-time question as a supported dispatch request.
2. Add an explicit `Which collection day is departure` request form and literal
   collection-day source units; add `hold remains active` and scoped Orders policy
   forms while preserving exact spans, inequalities and the full exception.
3. Preserve entity scope, complete requested facets, finite actual body anchors,
   independent facet query/identity alignment, ambiguity/negation/conditional/
   competing/repeated-evidence vetoes and citation limits. Unknown clauses and
   unsupported actor/password/vehicle or mixed requests must still refuse.
4. Exercise the public entry point with original H04 and varied names/cutoffs;
   before/equal/after; old and new forms independently/composed; missing holds,
   non-dispatch order contexts, invalid/negated contexts, contradictory/repeated/
   wrong-entity evidence and malformed/misaligned facet vectors. Preserve all
   existing controls, including L04 and V23/V27. Synthetic tests remain synthetic.
5. After engineering checks pass, freeze/publish new candidate/planner/import/
   runner/scorer/environment identities and original criteria before fresh actual
   MiniLM capture on all four exposed packs: Vela32, Prism32, Lumen32, Hearth32
   (**128 distinct cases**,112 Hybrid / 16 lexical Comparisons). Compute separate
   fresh candidate and paired-v40 planner vectors; no saved-vector replay or
   question retries. Require H04 repair and every historical/paired PASS preserved;
   report four native pack gates separately. Stop after any required failure.

Only after those gates pass should broader phase 1 regression resume on the other
verified packs. Missing 103 cases, full regression, separate prospective
confirmation and integration/product/release decisions remain open. No v41 code,
freeze or accuracy result exists in this task; live 5.6/r44 remains unchanged.
