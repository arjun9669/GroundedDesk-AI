# V49 execution tooling — first engineering failure

Date: **25 October 2026 (Asia/Kolkata)**.
Baseline: published `dc68303b` protocol/input/candidate freeze.
Status: **STOPPED; correction and retry awaiting user approval**.

The user authorized v49 capture/scoring/audit tooling, synthetic verification, a
fresh neutral Chrome/MiniLM preflight and eventual execution-freeze publication.
No study questions were authorized. New isolated adapters and the pre-test
execution plan were prepared without changing candidates or historical files.

First targeted engineering run: **21 tests,20 PASS,1 FAIL**, exit1.
Failed group: explicit_anchor_nonfinite_or_missing never falls back to legacy
lookup. At tests/v49-execution.test.mjs:36 the expected /anchor/i error instead
reported Explicit/direct original body correspondence.

The exact [first log](evidence/v49-execution-first-engineering-failure/first-targeted.log),
[failure details](evidence/v49-execution-first-engineering-failure/failure.json) and
[source/test/browser/plan snapshots](evidence/v49-execution-first-engineering-failure/manifest.json)
are preserved unchanged. No fixes or retries followed the failure. No full units,
Keyword, archived equivalence, browser/neutral preflight, execution freeze, model
questions or saved-vector candidate replay followed. No commit or push occurred.
The reserved study evidence root remains absent.

## Static diagnosis and concrete correction

The new audit selects s.cosineAnchor ?? s before validating the explicit anchor.
An explicitly present null therefore substitutes the selected source object and
passes the intended early shape guard. The supplied clipped-quote fixture is
rejected later at original-body correspondence; it does not pass the intended
explicit-anchor rejection test. This diagnosis uses source inspection only.

Proposed correction: establish explicit presence with !== undefined, validate the
actual explicit anchor as a non-null object first, then select the explicit/direct
anchor. Retain the original failing assertion and add full-sentence/null/primitive
shape controls. Keep finite/equal cosine checks, original body-ID containment,
own-query/context correspondence and independent vector arithmetic unchanged.
No relaxation of assertions, source evidence or native criteria is proposed.

The standing user/repository workflow requires approval after a required check
fails. After approval, retain this first attempt unchanged, apply the reviewed
correction and guards, rerun targeted checks, then if passing continue full units,
Keyword, archived native equivalence and neutral preflight before freeze/review/
commit/push. Actual study questions still require separate run approval.

This is a synthetic tooling failure, not a model result. The published protocol,
v49 candidate, prior native FAIL/BLOCKED, original evidence,103 exclusions/full771
NOT RUN, phase2/integration HOLD and live5.6/r44 remain unchanged.
