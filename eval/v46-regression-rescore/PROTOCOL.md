# Approved post-capture legacy-anchor audit correction

ID: **V46-POSTCAPTURE-ANCHOR-20261024**. Date:24 October2026.
Authorization: the user approved an audit-only correction and a separate scoring
attempt, preserving candidate/raw evidence and running no model tests.
This is a disclosed **post-capture** scoring/audit amendment, never a prospective
freeze or a replacement of the original first scoring failure.

## Preservation and exact scope

The original v46/v43 capture completed732 cases once (684 Hybrid /48 lexical).
All5,865 raw artifacts, original raw manifest, execution config877-file freeze,
pre-question amendment and first score failure/log remain unchanged. Historical
source inputs, keys, criteria, candidate modules and original audit/scorer remain
unchanged. All new logic is in this separate directory. Do not invoke a candidate,
planner, embedder or model, replay vectors through candidates, or regenerate any
raw output. Independently recomputing recorded vector cosines is an audit only.

First failure: original audit expected a selected quote at its own sentence start.
A legacy subclause instead retains its containing body's ID/cosine and moves its
selected offsets; there is no explicit cosineAnchor. The saved metadata diagnosis
identified Flint32 F08 fixed. This motivates a general ID-based correction, not a
case-specific exception. Answer-producing code and grading criteria are untouched.

For sources without an explicit anchor that do not already match a complete
original sentence, require all of:

- Nonempty retained body ID and finite selected cosine; exact selected quote offsets.
- Saved query/body evidence containing that ID; no guessed nearest/containing sentence.
- One unique original body identity/content/span across matching contexts, with
  matching document ID, filename and complete normalized source text.
- That original body exactly contains the full selected literal span and uniquely
  corresponds to a saved sentence and vector in source extraction.
- At least one matching saved query/body pair has the identical recorded cosine,
  and independent query/sentence-vector cosine agrees within the original1e-10.

Candidate and paired clock contexts stay separate; original main/compound facet
contexts remain recorded inputs. Repeated same-body identity across genuine query
contexts is not ambiguous; conflicting spans/content/identity are rejected.

The existing frozen audit runs on an ephemeral verification view with the proven
parent anchor. No source record, quote, offset, vector or candidate result is edited.
Native graders receive the original captured result. Explicit anchors retain the
finite/equal metadata checks and never use this fallback. Missing, false or ambiguous
body IDs and matching fabricated cosines must fail. Citation/bounds checks persist.
Separate legacy-anchor diagnostics disclose every reconstructed audit binding.

## Verification before the approved scoring attempt

11/11 new synthetic tests PASS;874/874 full Node units PASS;28/28 strict Keyword
checks PASS. Syntax and every original raw artifact hash verified. The native grade,
preservation, family checks and Fresh64 gate are exact original function exports.
No test invokes a candidate on study inputs. Passing engineering controls are not
model-quality outcomes. The correction freeze pins this adapter/tests/protocol,
passing logs, original raw manifest and original first-failure/log identities.

## One separately identified scoring attempt

Output directory: `docs/evidence/v46-regression-732-mac/rescore-01/`, exclusively
created at start. Verify original amended execution seal, correction freeze, original
raw hashes and complete receipts/case order before grading/auditing. Do not reuse
`score/`, overwrite first failure/log, or retry into an existing result directory.

Run once with the same approved Node executable and explicit variables:

```sh
RUN_CONFIG=docs/evidence/v46-regression-732-mac/execution/run-config.json \
EVIDENCE_DIR=docs/evidence/v46-regression-732-mac/raw \
SCORE_DIR=docs/evidence/v46-regression-732-mac/rescore-01 \
node eval/v46-regression-rescore/score.mjs
```

Native historical gates and variant-specific preservation stay unchanged, as does
Fresh64's64/64 requirement per variant. No PASS fabrication, pooled accuracy or
post-hoc exception. A required integrity/audit/native gate failure stops work before
fixes, further attempts or publishing the failed study; preserve output and report.
A separate failure.json includes pack/case/variant context if an audit fails.
If native gates pass, the result remains HOLD pending separate binding review.
First Fresh6452/4/8 failure,103 exclusions, full771 NOT RUN and live5.6/r44 remain.
