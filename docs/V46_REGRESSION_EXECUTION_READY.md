# V46 regression execution readiness

Date: **24 October 2026 (Asia/Kolkata)**.
Protocol: **V46-REGRESSION-732-20261024**.
State: **Engineering PASS after approved audit correction; study NOT RUN**.

The user approved fixing the final-review anchor inconsistency, extending controls,
rerunning engineering checks and publishing an immutable pre-question amendment.
The audit now requires finite, identical anchor/source cosine metadata before its
existing independent arithmetic check. No candidate, native grader, original
question, source text or live application changed.

## First failure and approved result

The [original FAIL probe](evidence/v46-execution-review-failure/probe.json) accepted
anchor cosine0 while source/recomputed cosine was1. Work stopped before any fix,
retry or publication. Its [record and source snapshots](evidence/v46-execution-review-failure/failure-record.json)
remain unchanged. The exact probe now fails the corrected audit as required; a
valid anchor still passes. Invalid/missing anchor/source metadata and matching
forged cosines cannot bypass the independent arithmetic check.

[Approved correction record](evidence/v46-execution-approved-audit/correction-record.json)
and separate [targeted](evidence/v46-execution-approved-audit/targeted.log),
[unit](evidence/v46-execution-approved-audit/units.log) and
[Keyword](evidence/v46-execution-approved-audit/keyword.log) logs record:

- **15/15 targeted adapter tests PASS** (11 original groups, four appended).
- **863/863 full Node unit tests PASS**.
- **28/28 strict Keyword checks PASS**, zero false accepts/provenance errors.

The original test bytes remain an unchanged prefix. Prior native adapter equivalence
reproduces [3,660 archived grades](evidence/v46-execution-engineering/equivalence.json)
using unchanged grading functions. This is grading saved outputs, not model quality
or saved-vector candidate replay. Syntax, first-failure/snapshot preservation,
original/effective freezes, toolchain, documentation and sensitive-data review pass.

## Immutable execution freeze plus amendment

The [original config](evidence/v46-regression-732-mac/execution/run-config.json)
and [original 877-file freeze](evidence/v46-regression-732-mac/execution/freeze-manifest.json)
remain byte-for-byte intact. The [amendment](evidence/v46-regression-732-mac/execution/amendment.json)
and [explanation](evidence/v46-regression-732-mac/execution/AMENDMENT.md) bind those
original hashes, the three permitted audit/integrity/test replacements, archived
original sources and added amendment/evidence files. Every other frozen entry
must still match. Runner and scorer use the amended effective hashes; missing,
masked or unauthorized changes fail. Historical original manifests remain intact.

The execution tooling retains exact v46/v43 identity, 53 served transitive
dependencies plus candidate/pair/helper, original fixed/section settings, independent
clock-facet queries, UI-first actual vectors and original Comparison pairs. Capture
needs clean published main, exact module/network/toolchain identity and approval.
Raw capture/seal/score paths are write-once; native scores remain separate from
manual binding review. Automated PASS remains HOLD pending that review.

The previous [neutral preflight](evidence/v46-regression-732-mac/preflight/result.json)
is unchanged: Node24.22.1, Chrome155.0.8059.86, macOS arm64, Transformers.js3.0.0,
MiniLM q8 WASM384D, Qwen off and six downloaded asset hashes. It used bundled
startup documents and one neutral embedding sentence, with zero study inputs or
questions. No model preflight or study was rerun for this correction. Toolchain
identity is rechecked against that freeze; any later change stops before questions.

## Next decision

The approved engineering correction is complete. The **732-case study has not run**
and requires separate explicit approval under the [published protocol](../eval/v46-regression-study/PROTOCOL.md).
The [original execution plan](../eval/v46-regression-execution/EXECUTION_PLAN.md)
is retained as the pre-correction checkpoint; use it with the amendment. An approval
token is a technical guard, not a substitute for human approval.

If approved, capture668 accepted historical plus64 exposed Fresh64 cases once,
seal raw evidence, then score/audit and perform separate manual binding review.
No study raw/score/audit/review directory exists yet. Stop on any required failure.
A passing exposed replay cannot replace first Fresh64's52/4/8 FAIL. The103 missing
originals remain untested, full771 remains NOT RUN, phase2 remains unaccepted,
and live5.6/r44 integration/release remain HOLD. New unseen confirmation is later.
