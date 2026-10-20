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

The [first v41 four-pack exposed regression](V41_FOUR_PACK_MAC_RESULTS.md) passes
Vela32, Prism32, Lumen32, Hearth32 separately 32/32 in both variants. H04 is repaired;
original v40 Hearth32 31/0/1, v39 Lumen32 31/0/1, v32 BLOCKED/UNGRADED and all
historical first results remain preserved. V41 is implemented but not integrated.
At that earlier checkpoint there were 128 distinct exposed v41-tested cases and 540
verified cases awaiting testing. Morrow32 subsequently fails, as recorded below.

The [subsequent v41 Morrow32 first run](V41_MORROW32_MAC_RESULTS.md) FAILS 31/0/1
in both variants on supported question M04; its first evidence is preserved after
a stop and explicit publication approval. There are 160 distinct exposed v41-tested
cases across five packs, 508 verified cases untested and 103 originals/combined
configuration unavailable. The earlier four pack gates PASS remain valid, not full
regression acceptance. Live 5.6/r44 and all first results stay unchanged.

Next decision: a separately precommitted structured v42 grammar fix and new
five-pack revalidation, as proposed in the [M04 investigation](MORROW32_V41_FAILURE_REVIEW.md),
before broader regression. No v42 implementation/model rerun is authorized by
this publication. Phase 1 exit still requires agreed regression preservation and
explicit missing-input resolution; no phase 2 or adoption claim. Any required
check failure stops work for user input before implementation, retries, commits
or publication. Preserve original source bytes, questions, native rubrics,
frozen candidates and historical failures.

See [project status](../PROJECT_STATUS.md), [verified inputs](RECOVERABLE_INPUT_INVENTORY.md)
and [v39 Vela32 results](V39_VELA32_MAC_RESULTS.md). Use the recorded `main`
commit/push/verify workflow across Mac and Windows; browser workspaces remain local.
