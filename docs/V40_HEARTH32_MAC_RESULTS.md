# First Mac v40 Hearth32 exposed regression — FAIL / HOLD

Date: 2026-10-20 (Asia/Kolkata). Preparation/freeze `ba2ccb1e` reached GitHub
before model questions. Candidate `coverage-v40-dispatch-grammar`, paired frozen
v39, actual local MiniLM q8 WASM, Qwen off. Bundled Node 24.19.0 darwin/arm64,
Chrome 155.0.8059.85, live 5.6/build r44 unchanged.

## First native result

| Variant | PASS | PARTIAL | FAIL | ERROR | False accepts | False refusals |
| --- | --- | --- | --- | --- | --- | --- |
| Actual r44 baseline | 16 | 5 | 11 | 0 | 6 | 0 |
| v40 fixed | 31 | 0 | 1 | 0 | 0 | 1 |
| v40 section | 31 | 0 | 1 | 0 | 0 | 1 |
| Paired v39 fixed | 31 | 0 | 1 | 0 | 0 | 1 |
| Paired v39 section | 31 | 0 | 1 | 0 | 0 | 1 |

The required gate is **FAIL**. H04 is the only non-PASS in each experimental
variant and loses a historical PASS (v33 through v38). This is a supported false
refusal. No execution error occurred. All32 original cases completed before
scoring:28 actual MiniLM Hybrid (20 supported/eight unsupported), four separate
lexical Comparisons. Two variants do not create 64 independent cases.

Original H04:

> A Veylan Seed Conservatory order is released exactly at 14:10. Which collection day is departure, and what hold can prevent it?

V40 and paired v39 both return the uncited refusal. Original expected evidence
includes the next collection day and seed-health hold. The saved planner is
`unresolved`, reason `Unaccounted requested clause or unsupported context`, with
zero facets. A 384D whole-query vector exists; it is not a planner-facet vector.

## Preservation, stop and explicit publication approval

The scorer exited 1 after writing its original
[scorecards](evidence/v40-hearth32-mac/score/automated-scorecards.json). Work
stopped before retries, candidate changes or publication. The user then authorized
preservation/publication and investigation, with no candidate edits or model
reruns. Original v32 BLOCKED/UNGRADED and v33 qualified 31/1/0 (H30 incomplete)
remain intact, as do every later result and the v40 three-pack PASS.

A separate publication check initially failed because it incorrectly compared the
original frozen config's byte hash to a ledger JSON copy. Read-only inspection
showed the copy omits only the final newline. Work stopped again; the user
explicitly approved correcting this check. The corrected validation checks run/
score metadata against the original frozen bytes, then compares parsed copied
JSON separately. Neither file is rewritten. This corrects an audit assumption;
it does not change or waive the failed model gate. The initial assertion and
approved correction are retained in the
[publication validation](evidence/v40-hearth32-mac/publication-validation.json).

The [SHA256 manifest](evidence/v40-hearth32-mac/manifest.json) seals all **258
original artifacts / 23,337,052 bytes**, excluding the new manifest and publication
validation record. It preserves source/query vectors, UI/candidate screenshots,
pre-candidate evidence, module proof, checkpoints, ledger, complete run status and
first scores. Question retries: **zero**. No model, answer producer or scorer was
rerun on captured cases during this publication/investigation task.

## Verification and limits

The unchanged-code engineering review passed **633 unit tests** and strict
**28/28 Keyword** evaluation on bundled Node 24.19.0. These engineering checks are
separate from the failed actual-model gate. Current publication checks verify all
456 frozen files, original inputs/history, exact case alignment, source extraction,
finite recorded query/planner vectors, original config identity, all first-artifact
hashes and documentation/diff/credential review. All763 artifacts in the prior
v40 three-pack seal and774 in the three prior v39 seals retain their hashes.
No browser/model check was rerun for this publication-only task.

See the [H04 investigation and proposed next experiment](HEARTH32_V40_FAILURE_REVIEW.md).
V40 has now been evaluated on **128 distinct exposed cases across four packs**,
with scores kept separate. **540 verified cases / 15 packs remain untested with
v40**, plus 103 unavailable original cases and the missing combined configuration.
Phase 1 remains held. Full regression, prospective confirmation, integration and
product/release gates remain open. This failure publication is not adoption.
