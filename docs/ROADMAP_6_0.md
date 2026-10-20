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

The [first v43 nine-pack exposed regression](V43_NINE_PACK_MAC_RESULTS.md) passes
eight 32-case families 32/32 each and RetrievalQuality28 28/28 in both variants.
Four deferred clock forms now restore earlier v38 answers under the structured
contract; all first v42/v41/v40/v39 and earlier evidence remains unchanged.
V43 is not integrated. There are 284 distinct exposed v43-tested cases, 384 verified
cases awaiting testing across 10 families and 103 originals/combined configuration
unavailable. No full-regression/fresh-confirmation gate claim.

Next freeze the remaining verified scoring families with their original native
criteria. Phase 1 exit still requires broader agreed regression/preservation and
an explicit missing-input decision. No phase 2/adoption authorization follows from
nine partial exposed regression gates.
Any required failure stops work for user input before retries, implementation,
committing or publication. Preserve original inputs, rubrics, frozen candidates
and first evidence.

See [project status](../PROJECT_STATUS.md), [verified inputs](RECOVERABLE_INPUT_INVENTORY.md)
and [v39 Vela32 results](V39_VELA32_MAC_RESULTS.md). Use the recorded `main`
commit/push/verify workflow across Mac and Windows; browser workspaces remain local.
