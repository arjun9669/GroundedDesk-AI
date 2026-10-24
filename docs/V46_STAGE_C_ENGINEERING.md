# V46 Stage C — Comparison engineering

Date: **24 October 2026 (Asia/Kolkata)**.
Candidate: **`coverage-v46-comparison-relations`**.
Status: **Engineering PASS; actual-model preservation NOT RUN**.

The user authorized Stage C after publication of the approved v45 scope correction.
The [new wrapper](../eval/answer-completeness-v46/coverage.mjs) preserves v45 Ask,
Stage A/B, clock and helper exports exactly, replacing only bounded Comparison
requests. Historical modules and live imports are unchanged.

## Resulting behavior

Each selected document independently needs a unique literal source for every
requested relation. Supported families are event/object/date, highest monthly
mean or average temperature with month, and a pair of departure cutoff/day/hold
branches. Missing or conflicting support on either side produces an uncited
incomplete answer, preventing a wrong-fact quotation from counting as complete.
The original selected pair, filenames, citation order and public metadata fields
are preserved. Other Comparison paths delegate unchanged, including retention,
maintenance, acknowledgement, packet and capacity requests.

The [protocol](../eval/answer-completeness-v46/PROTOCOL.md) defines exact question
and source grammar, refusal boundaries, normalized offsets and limitations.
Entity-name overlap alone is insufficient. This implementation is lexical, with
no embedding/model calls, fabricated cosines or answer-key references.

## Engineering evidence

- **24/24 targeted synthetic tests PASS on the first run**.
- **848/848 unit tests PASS** (824 existing plus 24 Stage C groups).
- **28/28 strict bundled Keyword checks PASS**, zero false acceptance/provenance errors.
- Module syntax, documentation links, diff/credential review and historical code,
  input and first-evidence hashes verified.

[Sealed engineering evidence](evidence/v46-stage-c-engineering/manifest.json)
contains the original passing logs and hashes of the final implementation, tests,
protocol and report. Fixtures use invented entities and values, with crossed
controls for wrong events/objects, missing months/holds, conflicting rules,
foreign/mismatched pairs, ordinal ambiguity, source boundaries and source bounds.
No model, frozen-question planner, saved-vector replay or Fresh64 scorer was run.
The original v45 failed attempt and all later approved evidence remain intact.

## Limitations and next decision

Only declared grammar is supported: explicit exact filename entities, bounded
object/event forms, matching mean/average labels, and adjacent before/inclusive-
after departure branches within one source policy. There is no general pronoun
resolution, paraphrase recognition, multi-object alignment or unseen-quality claim.
Passing fixtures do not show that v46 repairs any particular exposed case.

Stages A/B/C now have isolated bounded implementations. Next prepare and publish
one regression execution freeze for the accepted 668 cases plus exposed Fresh64,
with native rubrics, paired v43 diagnostics, real model/environment identity,
exclusive evidence paths, vector/source audits and separate manual binding review.
Obtain study approval before execution. An exposed replay cannot replace the first
failed confirmation; later prospective confirmation requires a new unseen freeze.

Phase 1 remains accepted only for 668 cases; 103 original cases remain untested.
Original Fresh64 remains 52 PASS / 4 PARTIAL / 8 FAIL in each v43 variant.
Phase 2 remains unaccepted, live integration is HOLD, and the live app is 5.6/r44.
