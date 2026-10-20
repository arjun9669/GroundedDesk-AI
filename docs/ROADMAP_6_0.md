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

The [first v42 five-pack exposed regression](V42_FIVE_PACK_MAC_RESULTS.md) passes
Vela32, Prism32, Lumen32, Hearth32, Morrow32 separately 32/32 in both variants. M04 is
repaired; original v41 Morrow32, v40 Hearth32, v39 Lumen32 failures, blocked captures
and every historical first result remain unchanged. V42 is not integrated.
There are 160 distinct exposed v42-tested cases, 508 verified cases awaiting testing
and 103 originals/combined configuration unavailable. No full-regression gate claim.

Next review/freeze four deliberately deferred clock forms RQ02,C09,B14,F14 and
their source/native acceptance criteria before expanding affected packs; prepare
other verified scoring families with their original criteria. Phase 1 exit still
requires broader agreed regression/preservation and an explicit missing-input
decision. No phase 2/adoption authorization follows from five partial passes.
Any required failure stops work for user input before retries, implementation,
committing or publication. Preserve original inputs, rubrics, frozen candidates
and first evidence.

See [project status](../PROJECT_STATUS.md), [verified inputs](RECOVERABLE_INPUT_INVENTORY.md)
and [v39 Vela32 results](V39_VELA32_MAC_RESULTS.md). Use the recorded `main`
commit/push/verify workflow across Mac and Windows; browser workspaces remain local.
