# Fresh64 repair design — proposed isolated successor to v43

Date: **24 October 2026 (Asia/Kolkata)**. Design ID: **F64-REPAIR-20261024**.
Status: **DESIGN ONLY; implementation and model revalidation not started**.

The user authorized this design after publication of the [first Fresh64 failure](PHASE2_FRESH64_FIRST_RESULTS.md)
in `2db3ea3acec4e1acdd5e7af5e7bfacb970a8cf31`. Both v43 variants remain
52 PASS / 4 PARTIAL / 8 FAIL. The original 64/64 gate remains FAIL, regardless of
future repairs. This document proposes code boundaries and verification gates;
it is not an implemented fix, a new acceptance decision or integration approval.

## Goals and scope

Repair the five unsupported non-refusals, three supported-answer failures and four
partial Comparisons through general request/source binding rules. Preserve all
existing supported behavior and the accepted 668-case historical regression scope.
No question IDs, document names, gold values or answer-key imports may appear in
answer-producing code. Fresh64 is exposed development evidence, not a new benchmark.

Use a new isolated candidate, provisionally **v44**, importing unchanged v43.
Do not edit historical candidate modules, first evidence, input texts, gold groups,
rubrics, scores, thresholds or prior manifests. Preserve the live application's
r44 module imports, Ask/Compare/Research flows, PDF/export/navigation/storage and
upload limits. Qwen, OCR, capacity expansion and live adoption are outside scope.

## Static trace and confirmed gaps

This analysis reads published source and saved diagnostics; it does not execute
v43, the Fresh64 scorer, the clock planner or a model on any fresh question.

| Cases | Existing path | Source-level finding and observation |
| --- | --- | --- |
| FC14, FC42 | [v43 delegation](../eval/answer-completeness-v43/coverage.mjs#L8), inherited evidence selection | Purchase-approval requests without a clock bypass the v43 dispatch contract. Saved actor-slot diagnostics reject support but retain a prior above-threshold quotation. There is no final requirement that the stated range covers the asked equality. |
| FC28 | [v43 clock topic gate](../eval/answer-completeness-v43/clock-contract.mjs#L8), [planner ownership](../eval/answer-completeness-v43/clock-contract.mjs#L74) | The topic gate requires departure/shipping/dispatch/release/leaving language. A bare ticket-order approver question has none, so saved plan is outside_scope. Inherited selection returns departure timing rather than an approving actor. |
| FC34, FC55 | [v33 request frames](../eval/answer-completeness-v33/coverage.mjs#L18), [v36 renewal guard](../eval/answer-completeness-v36/coverage.mjs#L58) | Current frames have no general publication-title/referring-descriptor contract; the renewal guard governs a different event/object ambiguity. The saved answer quotes competing titles/dates despite explicit non-designation. |
| FC10 | [v33 statistic bindings](../eval/answer-completeness-v33/coverage.mjs#L29) | The question is recognized as a minimum, but source labels permit lowest followed by optional winter then temperature; recorded between those words is unrecognized. Saved body evidence contains the minimum while the frame refuses. |
| FC33 | [v38 retention normalization](../eval/answer-completeness-v38/coverage.mjs#L48) | The request subject has the document name removed, but the captured source subject retains it before equality comparison. No repair quote is selected, and the prior acknowledgement answer survives. |
| FC44 | [v33 clause records](../eval/answer-completeness-v33/coverage.mjs#L41), [ordinal selection](../eval/answer-completeness-v33/coverage.mjs#L180) | One coordinated sentence carries first/1965 and second/2003. The parser takes the first year and first ordinal per record; coordination is not split into two bound events. Filtering for second consequently has no matching record. |
| FC58, FC59, FC61, FC63 | [v30 Comparison frames](../eval/answer-completeness-v30/coverage.mjs#L6), [v36 Comparison wrapper](../eval/answer-completeness-v36/coverage.mjs#L72) | Frame-aware completeness covers retention, maintenance and acknowledgement; later wrappers add packets/precision. The missing event, cutoff/hold and metric/month relations receive no corresponding per-document completeness check, leaving a lexical wrong-fact selection on one side. |

These findings explain the recorded failure paths. They do not prove that a
particular implementation will pass revalidation. The caller/module chain and
saved diagnostics must remain visible in a future implementation review.

## Proposed request contract and fallback boundary

Parse the whole question into a bounded, explicitly recognized request before
selecting evidence. Record document identity, subject/object, requested action or
metric, numeric boundary, event/ordinal and every requested condition/facet.

| Contract state | Proposed behavior |
| --- | --- |
| Outside the new recognized scope | Delegate to unchanged v43; do not claim structural verification |
| Governed and uniquely supported | Emit only uniquely located literal evidence satisfying every requested relation/facet |
| Governed but unsupported or ambiguous | Explicit uncited refusal; do not retain an unrelated prior answer |
| Governed but incomplete interpretation | Uncited refusal within the explicitly owned grammar; diagnostics identify the unresolved facet |
| Invalid body/vector/provenance metadata | Engineering error, not a semantic refusal or a passing answer |

Ownership must be narrow and explainable. Do not turn every unknown natural-language
question into a new refusal. Conversely, once a complete recognized request is
owned, do not recover it through an older fallback that ignores the failed bound
relation. Mixed clauses must be fully accounted for before claiming support; a
time token does not convert a who-approves question into a departure request.

The existing v43 clock planner remains authoritative for its governed forms.
Preserve its independent facet-vector contract, cutoff equality/before semantics,
order-type identity and no-prior-first behavior. A new approval request form must
not alias a ticket order to a dispatch actor or inherit a departure fact as approval.

## Stage A — unsupported approval and referring-subject contracts

Implement first in the isolated successor; no live wiring or model run at this stage.

**Threshold approvals:** bind the requested purchase amount and unit to the exact
source rule's operator and boundary. An above rule does not establish equality;
refuse when no applicable explicit rule exists. Do not invent a below-threshold
exemption or infer that approval is unnecessary. Preserve supported above-threshold
requests, explicit inclusive rules and both required roles/written conditions.
If several rules conflict or units cannot be aligned within declared grammar,
refuse in governed scope. Do not lower a cosine threshold to manufacture support.

**Approval actors:** require an actual approval relation with the same scoped entity
and order/purchase object. Parse the complete approver question, including bare
ticket-order forms, separately from departure timing. A valid source might explicitly
name an approver, so do not blanket-refuse all who/time/ticket questions. Missing
actor support must not fall back to day/hold, vehicle or acknowledgement evidence.

**Ambiguous publication subjects:** distinguish an explicit named title from an
unresolved descriptor such as large book/work. A date qualifies only if its title
is uniquely bound to the requested referent. Competing titles or explicit
non-designation require uncited refusal under the unchanged rubric. A neighbouring
negative designation must not suppress a supported request naming the exact title.
This is bounded reference resolution, not arbitrary world knowledge/coreference.

## Stage B — supported statistic, policy and event bindings

**Statistics:** recognize the declared minimum/lowest recorded winter labels and
bind each to its own explicit value and unit, preserving minus/negative signs in
the literal quote. Keep winter average, absolute minimum, monthly mean/month and
daily high distinct. Negation/unknown status belongs to its clause; a missing
absolute minimum must not poison an independently supported monthly mean.

**Retention:** normalize an exact matched document-entity prefix consistently on
both question and source subjects. Do not strip arbitrary substrings or borrow
another document's matching record name. Bind the requested record type to its
retention duration and all stated exceptions; keep acknowledgement/confirmation
separate. Support existing subject-without-prefix forms only within unique document
scope. Ambiguous policies or omitted exceptions do not earn a complete answer.

**Ordinal events:** represent each explicit coordinated event/ordinal/date clause
as its own source span. Resolve local Its only where the entity/antecedent is
unique within the bounded paragraph. Do not equate a dispatch-counter move with a
restoration or collapse first and second dates. Keep cancelled/proposed/negated
events distinct from affirmative completions; a rejected closure in a neighbouring
sentence must neither supply a date nor erase an affirmative restoration.

## Stage C — complete lexical Comparison per document

Add bounded Comparison frames for event/object/date, cutoff/day/hold and statistic/
month requests. Derive each document's requested facets from the original question,
not from the answer key. Validate each selected quotation against its own document
and requested relation before composing the two-document answer. Entity-name
lexical overlap alone cannot satisfy a warehouse move, monthly maximum or cutoff.

For a recognized request, either every required document/facet is supported or
return a clear unsupported/incomplete candidate result. Do not present unrelated
filler as a complete comparison. Preserve the candidate's existing public result
shape, source identity, original document pair and citation order. Keep supported
retention, maintenance, acknowledgement, packet and capacity comparisons intact.
Outside the newly owned grammar, preserve the prior comparison path with no new
claim of verified completeness. Comparison stays lexical: no embeddings, Qwen,
Hybrid accounting or hidden language-model calls.

## Evidence invariants for all stages

- Retain exact source bytes, normalized body identity and source offsets. Never
  synthesize a quotation by joining noncontiguous fragments or moving facts across
  filenames/paragraphs. Keep the existing 620-character quote and three-source bounds.
- Hybrid repairs require real corresponding finite source-body/facet cosines and
  the existing unique literal-anchor rules, including [bindFacetSource](../eval/answer-completeness-v33/coverage.mjs#L122).
  Do not treat a paragraph's score as a separately embedded new clause. A retained
  containing anchor must remain explicit, with its original span/vector/cosine.
- Keep current thresholds and resource limits. Invalid/missing/zero/nonfinite
  vectors and mismatched document identity must remain detectable failures.
- Preserve sequential citation numbers and separate requested-group relevance,
  quotation authenticity and answer completeness. A literal quote alone is not enough.
- Preserve all existing compound facets. No partial parse may silently drop an
  approval role, hold, exception, inspection condition, title or second document.

## Planned synthetic verification matrix

These are future implementation tests, not tests created or executed by this design.
Use invented names/amounts/dates independent of Fresh64 strings and crossed controls;
no purported model-generated vectors or benchmark accuracy from synthetic fixtures.

| Area | Required positive controls | Required negative/contrast controls |
| --- | --- | --- |
| Approval range | Applicable strict/inclusive rule, both roles and written requirement | Equality outside strict range; differing units, conflicting rules, absent actor |
| Actor intent | Explicit actor for matching ticket/order or purchase | Same time but departure/vehicle/acknowledgement fact; unknown extra facet |
| Title reference | Named title with its own date; unique explicit descriptor | Competing titles; explicit non-designation; nearby negative descriptor must not erase named-title support |
| Temperature | Signed recorded minimum; correctly bound monthly mean and month | Winter average/daily high distractors, missing minimum, negated metric and foreign-document value |
| Retention | Same normalization with/without exact entity prefix; full exception | Different record type, acknowledgement timing, another document's policy, missing exception |
| Event | Two coordinated ordinal dates, local unique antecedent | Negated/proposed event, conflicting dates, missing ordinal, different object and ambiguous antecedent |
| Comparison | Each document independently supplies all requested relations | One side irrelevant/missing, month/metric swap, wrong event, cutoff without hold, wrong document pair |
| Provenance | Unique bounded literal quote with actual corresponding metadata | Nonliteral span, duplicate/ambiguous location, fabricated cosine, lost facet, excessive citations |

Include preservation controls for the v43 clock forms that already pass, the
historical direct-span C04 requirements, full maintenance/packet conditions and
actor/action count bindings. Assert both successful evidence and refusal behavior;
fixing unsupported examples by refusing all questions is unacceptable.

## Implementation order and approval boundary

1. Agree the narrow implementation scope; start with Stage A and its synthetic
   controls in a new isolated candidate. This design publication does not itself
   authorize implementation, model testing or integration.
2. Complete Stage B and Stage C under separately explicit task scope, retaining
   intermediate engineering history and preserving v43. Do not run new prospective
   packs after each small patch. No Fresh64 model smoke questions during development.
3. After the selected repair scope is complete, run relevant new synthetic tests,
   the complete Node 22+ dependency-free unit suite and strict 28-case Keyword check.
   Unit checks stay separate from actual-model quality.
4. Freeze and publish one new regression execution protocol before questions:
   unchanged accepted 668 cases and exposed Fresh64, with native family rubrics,
   original first scores, actual environment/model hashes, diagnostic paired v43,
   vector/source audit and exclusive new evidence paths. Do not reuse or overwrite
   the original v43 Fresh64 execution freeze or evidence directory.
5. For a complete repair claim, require no historical PASS loss/new false acceptance/
   refusal and 64/64 exposed Fresh64 PASS in each candidate variant, plus manual
   binding review. Keep the five earlier public failures explicitly recorded. If
   only a partial repair scope is agreed, describe its limited engineering outcome
   honestly; do not relabel the original full confirmation as passing.
6. Even a successful exposed regression does not complete phase 2. Only then agree
   and freeze a new prospective pack/acceptance protocol before its first answers.
   Preserve that first result too. Phase 3 live integration remains a separate decision.

Stop on required engineering, execution, integrity, scoring or review failure and
report it before retries or publication outside an explicitly approved failure-
documentation task. Never force-push or overwrite remote/local work.

## Deliverable and current decision

This design proposes **Stage A first**, then supported relation and Comparison
repairs, then one frozen exposed-regression study, then new prospective confirmation.
There is no promised quality score or completion date. None of these changes or
runs has occurred. Phase 1 remains accepted only for 668 verified cases; 103 missing
originals remain untested and full 771-case historical coverage is NOT RUN.
Phase 2's first confirmation remains FAIL; live GroundedDesk stays 5.6/r44.
