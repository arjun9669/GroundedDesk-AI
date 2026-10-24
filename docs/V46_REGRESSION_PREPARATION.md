# V46 regression protocol preparation

Date: **24 October 2026 (Asia/Kolkata)**.
Protocol: **V46-REGRESSION-732-20261024**.
Status: **Protocol/input/candidate freeze published; execution NOT READY / NOT RUN**.

The user approved preparation after isolated Stage A/B/C engineering. The
[protocol](../eval/v46-regression-study/PROTOCOL.md),
[machine-readable scope](../eval/v46-regression-study/scope.json),
[static validation](../eval/v46-regression-study/STATIC_VALIDATION.json) and
[protocol freeze](../eval/v46-regression-study/protocol-freeze-manifest.json)
fix the original case scope, immutable source/reference identities, acceptance,
execution-readiness gates and failure handling before any new model observation.

## Frozen scope and criteria

The workload is 20 families / 732 cases: 668 accepted historical cases plus
exposed Fresh64's 64. It has 684 actual-MiniLM Hybrid questions and 48 separate
lexical Comparisons, using 83 original source texts. Each case will have fixed and
section candidate results, with independently planned paired v43 diagnostics and
production r44 outputs kept separate. No pooled accuracy percentage is defined.

The 19 historical families retain their original native gates, variant-specific
PASS preservation, zero new false acceptance/refusal and five known public failure
rows. Fresh64 needs 64/64 native PASS in each v46 variant plus integrity and manual
review for a full repair regression claim. Its first v43 52/4/8 FAIL remains FAIL.
The 103 missing original cases remain excluded and untested; full 771 is NOT RUN.

Static validation confirms exact key/config equality and case order, all 117
historical original input entries, original source/native-reference hashes,
workflow counts and preserved original/later engineering seals. No question was
passed to a candidate, planner, embedder or scorer. This is static preparation,
not model validation or a successful regression study.

## Required before execution

The original runners are hard-coded for v43/v42. A v46/v43 execution adapter,
scoring/preservation adapter, synthetic controls and equivalence checks must be
implemented separately, preserving original runners and native grader bodies.
Current installed-Chrome/toolchain/model identity must be measured in a neutral
preflight, then published in a new complete execution freeze. The protocol pins
source/reference bytes now; it does not claim to freeze an unmeasured runtime or
unimplemented execution adapter. Historical environment values cannot substitute.

The future exclusive evidence root is `docs/evidence/v46-regression-732-mac/`.
It is reserved but not created. Actual capture must use write-once files, original
case order, no question retries and new raw/score/audit/review stages. Candidate
changes, lost prior PASS, invalid vectors, partial capture, manual contradictions
or other required failures stop work before fixes/retries/publication.

Preparation checks: **848 unit tests / 28 strict Keyword checks PASS**; static
hash/count/order checks, local links and diff/credential review PASS. Preparation
logs are separate under `docs/evidence/v46-regression-protocol-preparation/` and
pinned by the protocol freeze. Existing v46 source and engineering evidence are
unchanged. No browser/model/frozen-question/scorer execution occurred.

Next: implement and verify the isolated execution tooling, run neutral preflight,
publish the complete execution freeze, then obtain explicit approval for the
model study. This approval boundary comes from the
[published Stage C report](V46_STAGE_C_ENGINEERING.md), which requires: “Obtain
study approval before execution.” The current approved task prepares the protocol.
A successful exposed regression still needs a separately frozen unseen confirmation;
phase 2, live 5.6/r44 integration HOLD and release status remain unchanged.
