# Morrow32 M04 — v41 failure investigation and proposed v42

Date: 2026-10-20 (Asia/Kolkata). Baseline `0ffd3e11` on official shared `main`.
Authorized scope: unchanged failure publication and investigation. **No candidate
changes, model-question rerun, captured-answer recomputation or regrading.**
The [first v41 Morrow32 gate](V41_MORROW32_MAC_RESULTS.md) FAILS 31/0/1 in both
variants; paired v40 also 31/0/1. M04 loses an original v30 and later v31–v38 PASS.

## Confirmed request failure and identity hazard

The [v41 adapter](../eval/answer-completeness-v41/coverage.mjs) owns M04 because it
contains release/departure language and 13:35. A read-only invocation of the
unchanged pure planner reproduces the saved unresolved plan, zero facets and
`Unaccounted requested clause or unsupported context` reason.

V41's qualified context schemas do not recognize **ticket order** as a dispatch/
shipping/departure request/order. Its later bare-order regex **does match**, but
captures **`Ashmere Funicular ticket`** as the entity, time 13:35 and the original
question tail. Reapplying that exact unchanged regex to the original question
confirmed these captures. Thus this is not simply a failure to recognize any
context; `ticket` is swallowed into the entity field.

`When does it depart` matches the departure clause. The next clause,
**`what can hold it back`**, does not match the bounded hold-request grammar,
which expects `what/which hold/exception applies/can prevent/block/delay departure/it`.
The planner therefore returns unresolved, discards the partial plan and the final
contract refuses before body selection. This is the immediate failure path.

Fixing only the hold idiom would be insufficient: static inspection of the
contract's unique filename/entity match shows the captured entity with extra
`ticket` cannot match `01_Ashmere_Funicular.txt`. Do not weaken that identity guard
or remove arbitrary trailing name words. A later parser must distinguish the
operational order type from the actual named organization, preserving names that
themselves contain words such as Ticket or Order and refusing unresolved ambiguity.
Paired v40 records the same final reason, but lacks v41's bare-order context path;
do not infer identical intermediate parsing from identical final refusal messages.

## Independent source grammar gaps

The unchanged literal splitter exposes:

| Start/end | Original literal span |
| --- | --- |
| 187/260 | Release ticket orders before 13:35 for departure on the same service day. |
| 261/379 | Ticket orders released at or after 13:35 depart on the next service day, unless a wind-suspension hold remains active. |

V41's request-style source schema permits `Dispatch requests` or `Orders`, not
**`Ticket orders`**. Its other schemas require time-first `departure is/moves to`.
Neither accepts the second original span. The first original span is a separate
**imperative `Release ticket orders ... for departure on ...`** form, also outside
the schemas. Do not describe it as the already supported `Orders released ...`.

At equality 13:35, the before-cutoff sentence cannot answer. The second sentence
is the needed inclusive rule and complete hold exception. `At or after`, `depart
on the next service day` in an accepted subject schema, and `hold remains active`
are already supported by v41; those words are not the missing vocabulary. Keep
actual operators, units and original spans; no calendar-date inference.

## Evidence scope and why a fallback is inappropriate

The first capture contains 6 fixed, 7 section and 52 literal sentence/body vectors.
M04 has an actual 384D whole-query vector, but both planners have zero facets and
zero planner-facet vectors. This is a request-contract refusal, not a missing-vector
exception, citation fabrication or measured MiniLM ranking failure. Newly planned
facet queries in a future candidate must be independently embedded; no old whole-
query or legacy vector can stand in for them.

Saved v30/v31/v38 **M04** answers quote the full original policy
paragraph and were graded PASS. They are historical observations, not recomputed
answers. An unresolved-request fallback would bypass the complete contract and
risk the earlier Vela V23 unsupported-approver/V27 mixed-password failures. Retain
terminal refusal for unsupported/ambiguous requests and preserve whole-question
facet accounting. Earlier first failures and all four v41 passing packs stay intact.

## Proposed isolated v42 — a separate decision

No v42 code, freeze or model result exists in this task. Recommend a precommitted
protocol addressing request roles, entity boundaries and source relations together,
rather than only appending a hold synonym:

1. Define a bounded operational order-type/context grammar that keeps named entity
   and order type separate, requires unique source identity and refuses ambiguous
   interpretations. Add a scoped positive `what can hold it back` hold facet only
   alongside a fully accounted departure context. Unknown actor/password/payment/
   vehicle/mixed clauses must still refuse.
2. Parse complete original declarative Ticket-orders and imperative Release-ticket-
   orders policies into the existing time/exception relation. Keep exact displayed
   text, before/exclusive-after/inclusive equality and full hold support. Do not
   conflate ordinary orders, purchases, payments, invoices or unrelated ticket facts.
3. Inventory grammar forms across the remaining verified exposed questions by
   read-only analysis before finalizing the protocol. This can identify likely
   coverage gaps, not establish answer quality or recover missing original inputs.
   Do not tune using new model answers or relabel exposed packs as unseen tests.
4. Test the public entry point with M04 plus independently varied entities/order
   types/times; names containing Ticket/Order; ambiguous boundaries; old/new hold
   forms and both source forms; before/equal/after; unsupported/negative/conditional/
   conflicting/repeated/missing-hold/wrong-entity cases; literal bounds, citation
   caps and invalid/missing/misaligned facet metadata. Keep H04,L04,V23,V27 controls.
   Constructed values remain engineering fixtures, not model measurements.
5. After engineering checks pass, freeze/publish a new candidate/planner/import/
   runner/scorer/environment and unchanged original keys/criteria/history before
   a fresh five-pack capture: Vela32, Prism32, Lumen32, Hearth32, Morrow32 (**160 distinct
   exposed cases**, 140 actual MiniLM Hybrid / 20 lexical Comparisons). Compute fresh
   source/query and separate exact candidate/paired-v41 planner vectors. Require
   M04 repair, 32/32 each fixed/section pack and no historical/production/paired PASS
   losses, false accepts/refusals or execution errors. Capture once to new paths;
   no old-vector replay/question retries. Preserve every native grade and stop
   after a required failure. A review downgrade retains native scores and stops.

Only after the five partial gates pass should broader regression resume. The 508
other verified cases, 103 missing originals/combined configuration, full regression,
prospective confirmation and integration/product/release gates remain unresolved.
A proposed v42 is not authorized implementation or a waiver of phase 1's exit gate.
