# V47 package 1 — scope and retention engineering

Date: **25 October 2026 (Asia/Kolkata)**.
Candidate: **`coverage-v47-scope-retention`**.
Status: **Engineering PASS after approved fixture correction; model validation NOT RUN**.

The user approved package 1 of the [preservation-first design](V47_PRESERVATION_REPAIR_DESIGN.md),
then explicitly approved correcting its first compound test fixture and rerunning
engineering checks. No historical candidate, live import or frozen input/result changed.

## Implemented scope

The isolated [wrapper](../eval/answer-completeness-v47/coverage.mjs) uses unchanged
v43 as the default answer baseline, with exact clock/Comparison/helper exports.
New [identity helpers](../eval/answer-completeness-v47/scope.mjs) and
[retention contracts](../eval/answer-completeness-v47/retention-contract.mjs) implement
package 1 only. The [declared protocol](../eval/answer-completeness-v47/PROTOCOL.md)
records exact bounded question/source grammar before the first targeted run.

Retention requests separate typed subject, established entity/location and requested
conditions. Identity requires filename scope, a unique complete-token alias or an
explicit source `At ENTITY` declaration. A sole-file shortcut is not used; unknown
named prefixes do not gain authority by changing case. Unprefixed types require a
unique matching policy across the supplied corpus. Source declarations can establish
policy identity when an old filename describes something else.

The source contract binds duration plus inline or adjacent complete exceptions,
including condition/affected-record/until-settlement forms within one policy block.
Requested claim/review/dispute modifiers must match. Missing, conflicting, denied,
ambiguous or incompletely parsed requests refuse without prior-answer rescue.
Source spans remain contiguous and literal with exact offsets; real containing-body
cosine metadata/anchors are retained, not synthesized for a new clause. Fixtures'
finite cosine values are synthetic metadata, not measured MiniLM vectors.

Only after a complete unique policy is proved may a prior v43 result be reused.
Its displayed answer/filename/quote signature is retained only when it wholly covers
the validated policy within the same block; metadata is rebound to actual supplied
body evidence. Partial duration, acknowledgement and cross-policy quotations are
not accepted. Existing compound questions delegate whole to v43, with its original
per-facet evidence contract. V43 clock-owned requests remain authoritative.

## First failure and approved correction

The first targeted run recorded **33 PASS / 1 FAIL out of 34**. The test group
`non-retention and existing compound routes delegate exactly to v43` passed only
body evidence to its invented `Also,` compound. The unchanged inherited v15 guard
threw **Actual facet evidence required** before the equality assertion could run.
[First failure record](evidence/v47-package1-first-engineering-failure/failure-record.json),
[exact log](evidence/v47-package1-first-engineering-failure/first-targeted.log) and
original draft/test/protocol snapshots remain byte-for-byte preserved.

The user approved fixing the fixture and rerunning engineering checks. The fixture
now supplies aligned synthetic facet candidates, body evidence, body candidates and
production anchors. Its original result-equality requirement is retained. One added
test group separately verifies that both v47 and v43 reject missing or misaligned
facet arrays. No candidate or protocol byte changed after the failure; no inherited
guard was disabled. The original failure remains FAIL as a dated first attempt.

## Verification

- **35/35 targeted tests PASS** after the approved fixture correction.
- **909/909 full Node unit tests PASS** (874 existing plus 35 package-1 groups).
- **28/28 strict bundled Keyword checks PASS**, zero false accepts/provenance errors.
- Syntax, first-attempt hashes, unchanged candidate/protocol bytes, historical source/
  evidence seals, documentation links, sensitive-data review and Git diff checks PASS.

[Approved engineering evidence](evidence/v47-package1-approved-engineering/manifest.json)
seals separate passing logs, the correction record, first-failure references and
final source/test/protocol/report identities. The tests use invented names/values;
no frozen question, candidate-on-saved-vector replay, scorer, browser or model run
occurred. Passing engineering fixtures do not establish preservation on the 13
historical retention questions or a new quality score.

## Limits and next step

This is a bounded typed-record/policy grammar with conservative surrounding-clause,
identity and ambiguity handling, not arbitrary policy comprehension. New contracts
for subentity minimum temperature, written approvals and Comparison completeness
are **not implemented**. Those paths retain v43 behavior; porting the full set of
v44–v46 improvements remains a future successor preservation gate.

Next agree package 2 implementation scope/grammar for minimum-temperature and
approval binding, then package 3 Comparison completeness. A new actual-model
study requires a separately published freeze and explicit execution approval.
The original v46 failed regression, first audit failure, original v43 Fresh64 FAIL,
Cobalt native BLOCKED, 103 unavailable originals and full771 NOT RUN remain unchanged.
Phase 2/integration/release remain HOLD and live GroundedDesk stays 5.6/r44.
