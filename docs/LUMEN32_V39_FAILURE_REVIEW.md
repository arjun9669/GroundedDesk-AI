# Lumen32 L04 — v39 failure investigation and separate fix plan

Date: **2026-10-20 (Asia/Kolkata)**. Baseline: `b6e62e5` on official `main`.
Scope authorized after failure: preserve/publish first evidence and investigate.
**No candidate implementation, model rerun or live adoption in this task.**

The [first v39 Lumen32 result](V39_LUMEN32_MAC_RESULTS.md) is 31/0/1 in both
variants, with L04 a supported false refusal and paired v38 32/0/0. Unit checks
passed, but the actual-model preservation gate failed. Vela32 and Prism32 first
passes and every older first result remain unchanged.

## Confirmed request failure

The [v39 adapter](../eval/answer-completeness-v39/coverage.mjs) calls
`planClockRequest` before any inherited answer producer. L04 contains dispatch
and a clock, so v39 owns it. Its positive named release context parses, then
[parseRequest](../eval/answer-completeness-v39/clock-contract.mjs#L35) accepts
`When does/will it leave/depart/ship` but not **“When should it depart”**.

An unparsed clause returns `unresolved` at line 69. The contract immediately
refuses an unresolved plan at line 149, before evidence selection. The first
capture records exactly that reason and no planned facets. A read-only call to
the unchanged pure planner reproduces the saved plan; no answer producer or model
is invoked in this investigation.

The hold question itself fits the recognized `which hold can prevent departure`
form. The context and original time are not absent. The actual failure should not
be described as a missing MiniLM vector, citation-provenance violation or an
inclusive-boundary comparison error: the request fails before those stages.

## Independent literal-source gaps

Fixing only the request word does not establish support. The original literal
splitter exposes these two unchanged policy spans:

| Start/end | Original literal span |
| --- | --- |
| 204/277 | Dispatch requests released before 12:40 leave on the current service day. |
| 278/386 | At or after 12:40, departure moves to the following service day, unless a conservation hold is still active. |

Inspection of [timeRule](../eval/answer-completeness-v39/clock-contract.mjs#L101)
and the `DAY`/`HOLD` declarations shows three further grammar gaps:

- Prefix rules require **“departure is”**, not **“departure moves to”**.
- Day wording accepts current/next/same, not **“following service day”**.
- The bounded exception requires **“hold is open”**, not **“hold is still active”**.

`At or after` is already recognized; adding that operator is not the missing fix.
The recognized before-cutoff sentence cannot apply at equality (12:40). The
following-service-day/hold sentence is the applicable evidence, but its wording
does not match the existing rule schema. These additional limits are established
by static code/source inspection, not by a new counterfactual answer or rerun.
Do not claim that a one-word request patch has repaired L04.

## Why a fallback would reintroduce an earlier risk

Paired v38's saved answer is correct for L04. However, its own departure-intent
parser also excludes `should`; its prior-first call obtains an older result from
v36 → v35's v33 export, and its scoped policy repair does not replace that result
for this request. V33's broad dispatch/time frame can select or retain literal
clock evidence. This describes the existing call structure and captured output;
no inherited answer was recomputed in the investigation.

Letting v39 treat unparsed governed requests as outside scope, or falling back to
an earlier answer, would bypass the final whole-question contract. That is the
mechanism behind the earlier V23/V27 unsupported answers. Keep complete facet
accounting and an uncited refusal for unsupported or ambiguous requests; broaden
only positively recognized request/evidence forms.

## Proposed isolated candidate and acceptance gates

Use **v40 as a proposed next experiment**, not an edit to frozen v39. No v40 code
or first result exists in this task. Before implementation, freeze a narrow
protocol covering the intended vocabulary expansion and unchanged guards.

1. Add bounded positive departure-question support for `should` in a recognized
   named dispatch context. Preserve original clause spans, time/entity scope and
   exact self-contained facet-query strings. Do not strip negation or accept an
   unknown clause merely because it contains a departure word.
2. Recognize explicit `departure moves to`, `following ... day` and `hold is
   (still) active` policy forms without rewriting displayed quotes. Preserve the
   stated inequality and full exception. “Following service day” is source text,
   not permission to invent a calendar date. Unclear or conflicting rules refuse.
3. Exercise the complete public entry point with synthetic engineering controls:
   original L04 plus independently varied names/cutoffs; before/equal/after;
   does/will/should and recognized day/hold variants individually and combined;
   missing holds, negative/proposed/conditional relations, wrong identity,
   contradictions/repetition, citation limits, and unsupported actor/password/
   vehicle or mixed requests. Keep old controls and first results unchanged.
4. Preserve complete literal support for every requested facet and independently
   aligned body scores. The L04 first capture has **zero planner-facet vectors**;
   do not relabel its whole-query or legacy-facet vectors. Synthetic unit values
   remain engineering fixtures, never new actual-model evidence.
5. After engineering checks pass, freeze new candidate/import/planner/runner/
   scorer identities, original keys/native criteria and environment, then compute
   fresh actual source/query/planner-facet vectors in new evidence directories for
   Vela32, Prism32 and Lumen32. Require repair of L04, no loss of any historical/
   paired PASS, no new false accepts/refusals, and complete relevant literal
   citations. Report the three 32-case packs separately and retain v39's failure.

Only after those gates pass should phase 1 resume with other verified packs,
starting with Hearth32. The 103 unavailable cases, full regression, fresh
confirmation and product/integration gates remain unresolved. No study pass
alone authorizes release 6.0 or live adoption.

## Publication verification

Bundled Node 24.19.0 passed all 602 existing unit tests and the strict 28-case
Keyword evaluation. The 436-file Lumen freeze/history checks, 258 original artifact
hashes, link/diff checks and sensitive-information review passed. Investigation
invoked only the unchanged pure planner/literal splitter on captured data; no
candidate answer, model question or scorer rerun occurred. The failed first model
gate remains FAIL. Only reports/new evidence are staged; code, tests, inputs and
earlier first results remain unchanged.
