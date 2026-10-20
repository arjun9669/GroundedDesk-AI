# First Mac v41 Morrow32 exposed regression — FAIL / HOLD

Date: 2026-10-20 (Asia/Kolkata). Preparation/freeze `0ffd3e11` reached GitHub before
questions. Candidate `coverage-v41-order-collection`, paired frozen v40, bundled
Node 24.19.0 darwin/arm64, Chrome 155.0.8059.85, actual local MiniLM q8 WASM; Qwen
off. Live 5.6/build r44 unchanged.

## First unchanged native result

| Variant | PASS | PARTIAL | FAIL | ERROR | False accepts | False refusals |
| --- | --- | --- | --- | --- | --- | --- |
| Actual r44 baseline | 17 | 4 | 11 | 0 | 6 | 0 |
| v41 fixed | 31 | 0 | 1 | 0 | 0 | 1 |
| v41 section | 31 | 0 | 1 | 0 | 0 | 1 |
| Paired v40 fixed | 31 | 0 | 1 | 0 | 0 | 1 |
| Paired v40 section | 31 | 0 | 1 | 0 | 0 | 1 |

Required gate: **FAIL**. M04 is the only non-PASS in each experimental variant:
a supported false refusal and loss of a historical PASS. All32 cases completed
before native grading: 28 actual MiniLM Hybrid (20 supported/eight required refusals)
and four separate lexical Comparisons. Zero execution errors or question retries.
Two variants do not create 64 independent cases.

Original M04:

> An Ashmere Funicular ticket order is released exactly at 13:35. When does it depart, and what can hold it back?

Both v41 variants and paired v40 return the uncited refusal. The saved plan is
`unresolved`, reason `Unaccounted requested clause or unsupported context`, with
zero planner facets. Original expected evidence includes next service day and the
wind-suspension hold. A 384D whole-query vector exists; it is not a facet vector.

## Preservation and explicit authorization

The first scorer exited 1 after saving its native
[scorecards](evidence/v41-morrow32-mac/score/automated-scorecards.json). Work stopped
before further implementation, retries or publication. The user explicitly approved
publishing unchanged failure evidence and investigating M04, with no candidate
changes or model reruns. The model gate stays FAIL; no grade was changed or
scorer rerun. This report does not claim an additional manual acceptance pass.

The [SHA256 manifest](evidence/v41-morrow32-mac/manifest.json) seals **258 original
artifacts / 23,363,293 bytes**, excluding the new manifest itself: source/query
vectors, per-case UI/candidate outputs and screenshots, pre-candidate evidence,
module proof, checkpoints, ledger, complete status, copied config/freeze and first
scores. Original config metadata is checked against original frozen bytes, and
the captured JSON copy's contents are compared separately. No newline normalization
or evidence rewrite occurred.

Preserve original v30 Morrow32 **30/0/2** (M11,M32), unchanged reviewed grades,
later v31–v38 passes and the archive-name qualification (old archive filename said
v28 while actual frozen candidate was v30). Existing failures and first archives
are not renamed, replaced or regraded. The v41 four-pack PASS remains intact.

## Verification and remaining gates

Bundled Node 24.19.0 passed **670 unit tests**, zero failed/skipped, and strict
**28/28 Keyword** evaluation. These are engineering checks, separate from the
failed actual-model gate. Current 469-file freeze/input/history verification,
exact case/source/query identity, finite recorded vectors, original config
identity, publication hash/link/diff/credential checks PASS. Selected prior seals
retain all **2,811** original artifact hashes (v41 four-pack, v40 Hearth/three-pack,
and three v39 archives). No model/browser capture or saved-case answer/scorer was
rerun during investigation; H04/L04 and every prior first result remain preserved.

See the [M04 investigation and proposed next experiment](MORROW32_V41_FAILURE_REVIEW.md).
V41 has now tested **160 distinct exposed cases / five packs**, separately scored:
four pack gates PASS, Morrow32 FAIL. **508 verified cases / 14 other packs remain
untested with v41**, plus 103 unavailable original cases and the combined input
configuration. Phase 1, full regression, prospective confirmation, integration and
product/release qualification remain open. No adoption or 6.0 readiness claim.
