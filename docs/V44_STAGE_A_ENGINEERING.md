# V44 Stage A — approval/reference engineering only

Date: **24 October 2026 (Asia/Kolkata)**.
Candidate: **`coverage-v44-approval-reference-contracts`**.
Status: **Engineering PASS; actual-model revalidation NOT RUN; integration HOLD.**

The user approved implementing Stage A of the [published repair design](FRESH64_REPAIR_DESIGN.md).
The new [coverage wrapper](../eval/answer-completeness-v44/coverage.mjs) imports
unchanged v43 and applies a [bounded safety contract](../eval/answer-completeness-v44/safety-contract.mjs)
only to purchase approvals, bare ticket-order approvers and publication descriptors.
The [engineering protocol](../eval/answer-completeness-v44/PROTOCOL.md) records the
precise grammar, limitations and future test boundary. No historical code was edited.

## Behavior implemented

| Request | Supported behavior | Unsupported/ambiguous behavior |
| --- | --- | --- |
| Purchase approval | Source operator/range covers the entire requested point or range; units match; all quoted roles/written conditions remain literal | Equality outside a strict range, mismatched units, missing written condition or conflicting/conditional rule produces an uncited refusal |
| Ticket-order approver | A unique explicit matching entity/ticket-order actor relation, in active or passive form | Departure/hold, generic order, acknowledgement, foreign entity or ambiguous actor cannot be substituted |
| Publication descriptor | A unique explicit large/big book/work/catalogue/manual designation/date within the named document | Competing dates/titles, explicit non-designation or no designation produces an uncited refusal |

Purchase values are compared as integer hundredths rather than binary floating
point. Source conditions and applicability are distinct from semantic similarity.
An owned request is handled without calling the older answer producer; a rejected
relation cannot be replaced by its unrelated cited prior. Unknown requested tails
are not silently dropped. The implementation imports no answer keys or model APIs
and embeds no benchmark question IDs, document identities or answer values.

Supported answers retain exact literal quotations, offsets, document identity,
sequential citations and the existing corresponding containing-body cosine anchors.
Malformed/nonfinite/inconsistent body metadata throws. No new threshold, vectors,
network call, generated answer or production UI behavior is introduced.

## Preserved paths and explicit limitations

The v43 clock planner retains ownership of existing departure/approval/attribute
clock forms, including unresolved cases and independent facet evidence. The new
wrapper's Comparison, clock and source-binding helper exports are the exact prior
function objects. Outside the new grammar, execution delegates unchanged to v43.
Named-title questions, retention, temperature, ordinal events and Comparison are
not repaired in this stage. The live app does not import v44.

Role phrases and source grammar are deliberately bounded. Conditional/unknown
forms can conservatively refuse even when a reader could resolve them; later
actual-model preservation is still required. The approval contract is document
extraction, not an audit or financial/legal approval recommendation. Synthetic
fixture cosines prove only control behavior; they are not observed MiniLM vectors.

## Verification

- **798/798 unit tests PASS**, including **21 new synthetic Stage A tests**.
- **28/28 strict bundled Keyword checks PASS**, no false accept/provenance errors.
- New module syntax, original execution/input/environment seals, original raw/
  result/review evidence seals, credential review and `git diff --check` verified.
- Positive and negative controls cover range equality/inclusion, decimal boundaries,
  unit agreement, both approval roles and written requirements, explicit ticket
  actors, unrelated departure facts, time-qualified actors, unknown extra facets,
  competing publication references, positive explicit descriptors, named-title
  delegation, v43 clock parity, provenance/metadata/citation/offset checks and scope.

The first targeted 20-test suite passed. Review added a timing-condition control;
the subsequent complete 798-test suite passed. There was no failed engineering
check, hidden model rerun or replacement of first-result evidence in this task.
No new browser or model study was run: app/UI code is unchanged, and runtime model
qualification requires the later separately frozen execution protocol.

## Next scope and retained decision

Stage B supported statistic/retention/ordinal bindings and Stage C per-document
Comparison completeness remain unimplemented. Agree the next scoped change before
implementing them; do not claim that all Fresh64 issues are repaired by Stage A.
After the selected repairs, publish a new accepted-668 plus exposed-Fresh64
preservation protocol/freeze before one capture. Keep every family/native rubric
and require variant-specific preservation/manual review. A future exposed replay
is regression, not a retroactive first confirmation.

The [first Fresh64 result](PHASE2_FRESH64_FIRST_RESULTS.md) remains **52 PASS /
4 PARTIAL / 8 FAIL in both v43 variants**. V44 has no actual-model score or claim
of restoring any particular Fresh64 case. Phase 1 remains complete only under the
approved 668-case scope; missing 103 originals remain untested. Phase 2 remains
unaccepted, live 5.6/r44 unchanged and v44 unadopted.
