# Approved pre-question anchor-audit amendment

Amendment **V46-ANCHOR-AUDIT-20261024**, 24 October 2026.
Study protocol **V46-REGRESSION-732-20261024**. Study cases run: **0**.

The original 877-file execution freeze and original run-config remain unchanged.
The first final-review probe found the audit accepted source/recomputed cosine1
with recorded anchor cosine0. Its FAIL record, exact probe and draft-source/
config/freeze snapshots remain preserved under `v46-execution-review-failure`.
The user approved correcting this audit, adding controls, rerunning engineering
checks and publishing an immutable amendment (“okay go ahead” after that proposal).
This approval does not authorize the 732-case study.

The audit now rejects an explicit anchor unless it is an object and both its
cosine and the source cosine are finite and exactly equal. The existing independent
recorded-query/sentence-vector cosine check still runs afterwards. Matching
fabricated values therefore still fail. No similarity threshold, candidate,
planner, source text, key, native rubric or original failing assertion changed.

The separate `amendment.json` binds the original freeze/config SHA256s and only
three replacements: audit, integrity loader and tests. Each replacement pins its
original SHA256 and exact archived source snapshot. A new bounded amendment
verifier applies these replacements in memory, verifies snapshots and all effective
file hashes, and rejects unauthorized replacements or attempts to mask existing
frozen files. The runner and scorer already use the integrity loader, so both
honor this amendment without changing their original bytes or the config.
The amendment's added-file list seals its verifier, this explanation, approved
passing logs and original review-failure evidence. Original manifests are never
rewritten to match modified code. A missing/changed amendment fails readiness.

Original tests remain an unchanged byte prefix with four regression groups added.
Approved checks: **15/15 targeted, 863/863 full unit, 28/28 strict Keyword PASS**.
The exact preserved probe is now rejected; corrected metadata is accepted, and
NaN/infinity/missing metadata and consistently forged cosines are rejected.
Amendment controls cover original identity binding, unauthorized replacements,
snapshot identity and masking/duplicate paths. Prior native equivalence remains
3,660 archived grade rows with unchanged grader functions; it is not a new score.

No model study, candidate-on-frozen-question call or saved-vector replay occurred.
The previous successful neutral preflight is retained unchanged; there is no new
model-preflight run. Current actual toolchain must still match before capture.
The 732-case capture requires separate human approval, a clean published main,
module/asset/toolchain checks and the original explicit approval token. Raw,
score, audit and review study directories remain absent. Original Fresh64 FAIL,
103 excluded originals, phase2 HOLD and live5.6/r44 remain unchanged.
