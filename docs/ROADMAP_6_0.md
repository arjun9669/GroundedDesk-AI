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

The [v40 three-pack exposed regression](V40_THREE_PACK_MAC_RESULTS.md) passes
Vela32, Prism32, Lumen32 separately 32/32 in both variants; original v39 Lumen32
31/0/1 remains preserved. The [subsequent Hearth32 v40 first run](V40_HEARTH32_MAC_RESULTS.md)
FAILS 31/0/1 in both variants on H04, a supported false refusal. Its first evidence
is preserved after a stop and explicit publication approval. V40 is implemented
but not adopted. There are 128 distinct exposed v40-tested cases across four packs,
540 verified cases awaiting v40 testing and 103 originals unavailable.

Next decision: a separately precommitted v41 fix and new four-pack revalidation,
as proposed in the [H04 investigation](HEARTH32_V40_FAILURE_REVIEW.md), before
broader regression resumes. No v41 implementation or model rerun is authorized by
this report. Original source bytes, questions, native rubrics, frozen candidates
and historical failures stay preserved. Any required test/integrity/execution/
scoring failure stops work and requires user input before implementation, retries,
commits or publication. A passing subset cannot authorize phase 2 or adoption.

See [project status](../PROJECT_STATUS.md), [verified inputs](RECOVERABLE_INPUT_INVENTORY.md)
and [v39 Vela32 results](V39_VELA32_MAC_RESULTS.md). Use the recorded `main`
commit/push/verify workflow across Mac and Windows; browser workspaces remain local.
