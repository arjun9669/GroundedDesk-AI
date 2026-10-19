# GroundedDesk 6.0 working roadmap

Accepted as a working sequence in the October 20, 2026 conversation. Current
phase: **1 — broader regression**. Detailed product promises and quantitative
release targets are not yet frozen; this roadmap does not declare 6.0 ready,
promise production/security certification or authorize live integration.

| Phase | Work | Exit gate |
| --- | --- | --- |
| 1. Broader regression | Validate the isolated candidate on verified historical packs; start with Prism32, then Lumen32/Hearth32; explicitly resolve the missing-input gap | Agreed native regression and preservation gates pass; missing cases are recovered or an explicit revised acceptance protocol is approved |
| 2. Fresh confirmation | Agree user-facing scope and freeze new unseen documents/questions, scoring and target environments before answers | Prospective quality gates pass without post-answer tuning, changed criteria or replacement sets |
| 3. Integration | Connect a validated candidate to the application under separate authorization; preserve Ask/Compare/Research and existing evidence/storage flows | Integration checks, evidence navigation and exports pass without loss of existing behavior |
| 4. Product qualification | Validate supported browsers/devices, PDF workflows, memory and end-to-end performance; qualify optional Qwen separately | Defined compatibility/performance targets pass; limitations and privacy boundaries are documented |
| 5. Release preparation | Final review, release documentation/changelog, CI, deployment and hosted-byte verification | Approve the release and verify that the intended successful commit is deployed |

Vela32's 32/32 v39 partial PASS is evidence within phase 1, not completion of that
phase. Inputs for 668 cases are verified; 103 original cases and the old combined
configuration remain unavailable. New tests cannot retrospectively establish
preservation on those missing originals. Do not silently replace the full gate.

Vela32 and the [first Prism32 partial exposed run](V39_PRISM32_MAC_RESULTS.md) each
pass 32/32 in both v39 variants; 64 distinct cases are tested, with pack scores
kept separate. There are 604 verified cases awaiting v39 testing and 103 original
cases unavailable. Next prepare Lumen32, then Hearth32, under new freezes using
unchanged candidates and live r44 UI. Original source bytes, questions, native
rubrics and historical failures stay preserved. Any required
test/integrity/execution/scoring failure stops work and requires user input before
implementation, retries, commits or publication. A passing subset alone cannot
authorize fresh confirmation or adoption.

See [project status](../PROJECT_STATUS.md), [verified inputs](RECOVERABLE_INPUT_INVENTORY.md)
and [v39 Vela32 results](V39_VELA32_MAC_RESULTS.md). Use the recorded `main`
commit/push/verify workflow across Mac and Windows; browser workspaces remain local.
