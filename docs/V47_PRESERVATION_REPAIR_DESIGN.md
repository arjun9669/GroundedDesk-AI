# Preservation-first repair design after v46

Design ID: **V47-PRESERVATION-20261024**. Date: **24 October 2026**.
Status: **DESIGN ONLY — implementation and new model execution not authorized**.
Evidence baseline: failed-study publication `232c9c432a91d6a0dda359118f6a5787349c1941`.

The user agreed to prepare this repair design after the
[v46 failure](V46_REGRESSION_FAILED_RESULTS.md). This document fixes the proposed
scope, ownership rules, implementation order and verification gates. It does not
promise a score, completion date, live adoption or phase 2 acceptance.

## Problem and retained decision

V46's completed exposed regression has 60 PASS / 4 PARTIAL on Fresh64 in each
variant, but only 10/19 historical family gates pass. The same 20 prior PASS
cases are lost in each variant: 13 retention, five minimum-temperature and two
approval questions. Nineteen receive native FAIL; Cobalt16 H03 remains BLOCKED
because the changed manual-family signature has no reusable native judgment.
Separate source review observes a supported-question refusal in all 20 cases;
that observation does not change the native manual grade.

The first scoring attempt's legacy-anchor block, approved post-capture audit
correction, raw capture, native outcomes and completed separate review remain
unchanged. Paired v43 matches all 668 accepted historical outputs and all 64
original Fresh64 outputs in each variant. The repair must restore preservation
while retaining the eight recorded Fresh64 improvements and closing all four
partial Comparisons. Native criteria and original question wording stay fixed.

## Candidate architecture and ownership

Use a new isolated candidate, provisionally **v47**, on existing `main`. Do not
edit v43–v46, frozen helpers, original inputs/rubrics/results or live application
imports. Preserve Ask/Compare/Research, PDF/export/storage/navigation and limits.

Use unchanged **v43 as the default answer baseline**, with new scoped contracts
for the explicitly repaired relations. This avoids inheriting the v44/v45 broad
terminal refusals as the default for formerly supported requests. Reuse unchanged
literal/provenance helpers where suitable; implement corrected contracts in new
modules. Do not monkey-patch historical exports or splice case-specific answers.

- V43's governed clock planning remains authoritative, including unresolved forms,
  independently embedded facets and typed-order/cutoff/hold rules.
- Truly outside the new declared grammar: delegate unchanged v43 and disclose that
  the new contract did not verify completeness.
- Owned request: account for its entire subject/entity/object and all requested
  facets before selecting support. Unknown extra clauses or unresolved identity
  are terminal uncited refusals; they cannot escape through an old answer.
- If a prior v43 answer independently satisfies the complete owned request, retain
  its original displayed answer/filename/quote signature where possible. Reuse
  requires literal source and full relation/facet validation, not prior `answered`.
- Within owned scope, an unsupported or incomplete request never inherits unrelated
  filler. Invalid source/vector metadata remains an engineering error.

The v44/v45/v46 supported controls remain explicit preservation requirements even
though their wrappers are no longer the default baseline. Broader grammar does not
mean arbitrary entity recognition, inference, clause dropping or blanket refusal.
Each implementation task must publish its exact bounded grammar before testing.

## Source trace and proposed changes

The trace below reads saved results and source code only. No frozen question was
submitted to a candidate/planner, no vector replay or model run was performed.

| Observed gap | Current source boundary | Required change |
| --- | --- | --- |
| 12 retention request-facet refusals | v45 `planRelationRequest` accepts only a small suffix set after kept/retained | Parse named location, normal duration and exception/claim/review clauses compositionally; consume all clauses |
| Unprefixed attendance-register refusal | v45 `scopedDocuments` requires filename prefix or a narrow single-document record grammar | Resolve a bounded record subject through unique source policy identity; preserve unknown named-prefix rejection |
| Five store/material/prop/alloy minima refused | v45 equates the whole captured entity phrase with filename entity | Separate document entity from explicitly stated subentity/location; bind metric and antecedent locally |
| Two written-approval questions refused | v44 purchase grammar does not account for the recorded fronted writing phrase and credits unit; source grammar also excludes exceeding | Preserve writing as a facet, declare units and strict-above synonyms explicitly |
| Four partial lexical Comparisons | v46 owns only a few heads ending in for ENTITY and ENTITY, with identical event objects and narrow source forms | Parse each side's entity/object/relation separately, with complete per-document validation and no filler fallback |

These are structural design findings, not proof a future implementation will pass.
Case IDs may remain in design/evidence documents; answer-producing code must not
contain case IDs, frozen document names, gold values or answer-key imports.

## Work package 1 — document scope and retention preservation

Create a shared bounded identity resolver and complete retention request/source
contract. These are repair work packages within phase 2, not additional 6.0 phases.

Separate `entity`, `record_subject`, `location` and `requested_conditions` instead
of treating the remainder of a question as an undifferentiated filename string.
Support complete named-prefix, named-location and unprefixed record requests,
normal duration plus extension questions, and explicit exception descriptions.
Examples must use new invented names/types, not copied frozen questions.

Identity can be established by an exact filename entity, a unique complete-token
alias of an established entity, or a bounded explicit source scope declaration
such as `At ENTITY, SUBJECT ...`. This last form is needed when a document's
historical filename is unrelated to its stated policy entity. Every match retains
its real document ID, filename and literal scope span. A body match in one document
must not silently confer scope on another document or on a corpus-wide pronoun.

Unprefixed record subjects need a declared record-type grammar and one unique
matching policy across the supplied corpus, rather than a sole-file shortcut.
The grammar may include record nouns, domain modifiers and participles, but must
be specified before implementation. A source-derived subject is registered only
under that grammar or an established explicit entity/scope declaration. An arbitrary
foreign name prefixed to a record type is not itself a scope declaration. Preserve
the earlier lower/title/upper-case foreign-prefix controls unchanged; do not rely
on capitalization or simply delete the record guard. Repeated/conflicting policy
identities or competing aliases require refusal.

Bind exactly the requested record type to its duration and every stated retention
extension. Support one-sentence unless/except/until forms and adjacent explicit
conditional sentences in the same numbered policy/paragraph, including open claims
or reviews. Resolve affected records/cards only to that unique local subject.
Never borrow an extension from a neighbouring policy, heading or unrelated record.
Acknowledgement/confirmation timing cannot substitute for retention. Preserve
complete existing evidence signatures when validated, particularly manual families.

## Work package 2 — minimum scope and written approvals

**Minimum temperature:** first resolve the established document entity, then a
separately evidenced room/store/material subentity. A trailing store descriptor is
not a new document name, but it is also not permission to strip arbitrary words.
Require a literal source statement binding that location to the requested metric.
Recognize an entity embedded inside `temperature in ...`, not only a leading name.
Local Its may inherit only a unique same-paragraph entity/subentity antecedent.
Competing locations, foreign entities, distant pronouns and conflicting values
must refuse. Keep recorded/absolute/minimum/winter/monthly/daily metrics distinct,
preserve signs and units, and require the precise requested relation.

**Approval:** parse `in writing` before the entity or as an explicit trailing facet,
without absorbing it into the entity or dropping it. Declare literal credit/credits
normalization and supported units; do not invent currency conversions or equate a
missing unit with a stated one. Treat an explicitly supported `exceeding` source
rule as strict greater-than, preserving the existing interval arithmetic. Require
all stated actors and the writing condition. Equality is not covered by a strict
above/exceeding rule; do not infer exemptions or missing approvers. Conflicting
rules, unsupported units, negation, unknown clauses and incomplete roles refuse.
Ticket actors stay distinct from departure facts. Preserve unsupported publication
reference and approval protections already achieved on exposed Fresh64.

## Work package 3 — Comparison completeness on both original sides

Parse full comparison questions into two side plans with independent entity,
subentity/object, event/metric and required conditions. Support bounded `A ... with
B ...`, shared relation across named sides, and explicit including-facets forms;
do not require one for/and template or equal object names. Maintain the original
selected pair and citation order even when question order differs. A requested
third entity or unparsed additional facet is not silently discarded.

- **Event/object/date:** relocation/move aliases describe the same declared event
  family, but collection, warehouse and dispatch counter remain different objects.
  Each date belongs to its own affirmative event/object; bounded local Its needs
  a unique antecedent. Opening, restoration and ramp rebuilding dates cannot
  substitute. Accept explicit coordination only through exact contiguous spans.
- **Cutoff/day/hold:** the question may ask at each document's stated cutoff rather
  than supply one shared time. Derive each cutoff from its own explicit policy,
  prove equality is included, and retain its own day unit and complete hold. Do
  not require an unrequested before branch or force collection/operating days to
  become one unit. Exclusive above and missing/ambiguous cutoff rules refuse.
- **Monthly maximum/month:** bind monthly mean/average temperature, location,
  signed quantity, unit and month in each source. Recognize declared in/at context
  and locally scoped coordinated forms. Winter average or daily high cannot satisfy
  a monthly request, even with strong entity/token overlap.

Either every required side/facet is supported, or return an explicit uncited
incomplete candidate result. Do not retain old lexical filler within recognized
scope. Preserve the public result shape, original source identities/offsets and
existing retention, maintenance, acknowledgement, packet and capacity Comparisons.
Comparison remains lexical: no embeddings, Hybrid accounting, Qwen or hidden models.

## Shared evidence and engineering verification

Keep at most three citations, each at most 620 literal contiguous characters, with
sequential numbering and the established normalized-body offset convention. No
new quote may join noncontiguous fragments, fabricate punctuation or cross policy/
paragraph boundaries to acquire a condition. Authenticity, requested-group relevance
and complete binding remain distinct checks.

Hybrid uses actual corresponding finite, nonzero 384D body/query/facet vectors and
unchanged thresholds. Any clipped new quote explicitly retains its containing
cosine anchor. Include both legacy body-ID and explicit-anchor audit controls,
recorded query/body consistency and immutable first-failure tests in the future
execution tooling **before** questions. Do not repeat a post-capture audit surprise.

Synthetic tests must pair supported and unsupported controls for each package:
new word orders/record subjects; body-declared scope with unrelated filenames;
foreign-prefix case controls; unique versus ambiguous subjects; single/split
retention exceptions; subentity/metric swaps; signed values; both writing positions;
units and strict/inclusive boundaries; different event objects on each comparison
side; cutoff equality/day/hold; monthly metric/month; missing/wrong document sides;
additional clauses; invalid/duplicate spans, vectors and anchors. Fixtures must be
independent of frozen names/values. Preserve all earlier v43–v46 positive/refusal
controls and compound/direct-span/packet/maintenance/actor-count gates.

Run relevant package controls, full Node 22+ units and strict 28-case Keyword check;
then review source isolation, sensitive data, documentation and frozen seals.
These checks establish engineering only, never actual MiniLM quality. Stop and
ask on a required failure before fixes/retries/publication; preserve first evidence.

## Implementation and model-study approval boundaries

1. Agree each package's exact grammar and implement it in new modules. Start with
   package 1 scope/retention; preserve historical modules and commit/push only
   successful engineering work on `main`. Do not run model smoke questions.
2. Complete packages 2 and 3 with the stated preservation controls. Do not re-run
   a full model study after each small edit or change gates after observations.
3. Prepare and publish a new execution freeze for unchanged accepted 668 plus
   exposed Fresh64, original keys/order/native family criteria, paired v43, both
   candidate variants, actual toolchain/model assets and exclusive evidence paths.
   Freeze corrected audit/schema/adapter equivalence tests before any questions.
   Obtain separate model execution approval; no reuse of v46 raw vectors as new
   candidate measurements or overwrite of its failed study.
4. Require all 19 original historical family gates and variant-specific prior PASS
   preservation, no new false acceptance/refusal/ERROR/BLOCKED, plus 64/64 exposed
   Fresh64 PASS in each variant and separate source/binding review. Preserve the
   original public failures under their native subset gates. Changed Cobalt output
   still requires its native manual procedure; an assistant note cannot waive it.
5. Only after those gates pass, agree/freeze a new unseen prospective confirmation
   before its first answers. A successful exposed replay cannot replace either
   original Fresh64 failure or v46's failed preservation result. Phase 3 integration
   and later product/release qualification remain separate approvals.

No implementation, model/scorer/planner invocation, saved-vector replay or new
quality result occurs in this design task. Phase 1 remains accepted for its v43
668-case scope; 103 originals remain untested, full 771 is NOT RUN, phase 2 is
unaccepted, live 5.6/r44 remains unchanged, and integration/release stay HOLD.
