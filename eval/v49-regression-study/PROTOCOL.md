# V49 exposed regression protocol

Protocol ID: **V49-REGRESSION-732-20261025**. Prepared 25 October 2026.
Candidate source baseline: `3debd6086d01ed1afde190fb110b9bde0958dda9`.
Status: **PROTOCOL / INPUT / CANDIDATE FREEZE ONLY — EXECUTION NOT READY, NOT RUN**.

The user approved preparing and publishing this study after v49 package3 engineering and its approved corrections.
This freezes scope and criteria before new observations. It does not authorize
running questions, change candidate code or replace any original score/protocol.
A separately published execution freeze and explicit study approval are required.

## Exact scope and ordering

Use the [scope inventory](scope.json) references without rewriting their cases.
Run the accepted 668 original cases in the original 19-family config order, then
all 64 original Fresh64 cases in order. Identity is `(pack, original case ID)`;
IDs need not be globally unique. Retain exact question strings, corpus bytes,
original Comparison pairs, keys, groups, unsupported flags and native rubrics.

| Stratum | Families | Cases | Actual MiniLM Hybrid | Lexical Comparison |
| --- | ---: | ---: | ---: | ---: |
| Accepted historical preservation | 19 | 668 | 628 | 40 |
| Exposed Fresh64 regression | 1 | 64 | 56 | 8 |
| Total workload | 20 | 732 | 684 | 48 |

These are 732 distinct case submissions, not 732 new unseen observations. Both
fixed and section candidates produce separately labeled results (732 each; 1,464
candidate rows), plus independent paired v43 and live r44 baseline diagnostics.
Do not pool them as independent accuracy samples. Hybrid facet-query counts are
additional recorded work, not extra cases. Comparison is never counted Hybrid.

Lantern32, Aster32, Meridian24 and Atlas15 remain 103 unavailable originals.
They are excluded, never reconstructed from outputs or declared PASS. Full 771-case
historical coverage remains NOT RUN. Phase 1 decision PH1-668-20261021 is unchanged.

## Candidate, pair and no-tuning boundary

Use unchanged `coverage-v49-comparison-events` from
`eval/answer-completeness-v49/coverage.mjs`. Both historical variants retain their
original fixed/section index settings, limits, ranking and thresholds. Pair with
unchanged `coverage-v43-deferred-clock-forms`, using its own independently planned
facet queries and aligned real source-body/facet evidence. Existing production
5.6/r44 UI outputs remain a separate baseline; do not wire v49 into live imports.

This protocol/input/candidate freeze is preparation only, not an execution freeze.
It deliberately does not claim adapter or runtime readiness. The existing v46 native
FAIL and its first audit failure remain unchanged. V49 synthetic engineering passed
32 targeted/972 full unit/28 Keyword checks after an immutable24/6 first failure.
No actual v49 model quality or historical repair is measured.

The protocol freeze pins existing source/input/reference bytes. Future runner and
scorer adapters must select v49/v43 explicitly, verify all transitive served-module
identities and label both variants correctly. The existing v46 execution/rescore tooling and v43/v42 runners are
reference implementations, not runnable v49 adapters. Do not alter their identity
assertions, original configs or historical evidence in place. Do not assume their
hard-coded native grading paths can be redirected merely by replacing a filename.

No candidate/planner invocation on frozen questions during adapter development,
neutral preflight or source/key validation. No saved-vector replay, sample smoke
questions, changed prompts, answer-key imports, threshold changes or model fallback.
Use synthetic independent fixtures for adapter tests. The bounded v47–v49
engineering grammar does not imply these original questions will pass; keep their
wording and score failures honestly. Any later candidate fix needs a separately
approved task and a new protocol/execution freeze before another study.

## Execution readiness required before the first question

All items below must pass and be published to origin/main, with remote SHA checked:

1. New isolated runner, native scoring/preservation adapter, integrity checks and
   audit tooling. Validate candidate/pair identity, variant labels, independent
   facets, full original pair/order accounting and write-once failure handling
   with synthetic controls. Preserve original native grade bodies byte-for-byte;
   verify adapter equivalence against archived rows without invoking candidates.
2. Node 22+ dependency-free unit suite, strict 28-case Keyword check, source/input/
   history seals, module syntax, diff and credential review. Reverify the original
   Confirmation48/Precision48 C04 direct-span gates and all other native subsets.
3. Read-only installed-Chrome startup and neutral model preflight using bundled
   documents and a neutral sentence only. Record actual macOS/platform/arch, Node,
   Chrome, Playwright, Transformers.js, MiniLM q8 WASM, live build and Qwen off.
   Do not reuse October20/24 or v46 browser/model-download observations as current proof.
4. Hash actual Node/Chrome engine/executables, Playwright package trees and every
   downloaded model/tokenizer/config/WASM asset. Preserve original request/redirect
   aliases and response-byte hashes; strip signed URL queries. Missing/evicted,
   zero-length, inconsistent or changed responses fail. Reuse the approved robust
   recorder only after verifying its code/identity and actual downloaded bytes.
5. Publish a new execution config and full manifest pinning adapters, all served
   transitive modules, protocol/scope freeze, original inputs/keys/native references,
   historical scores, prior v46 native scores and failures, toolchain, preflight,
   model/runtime and resource settings.
   No fake environment values or inherited historical hashes as new measurements.
6. Require a clean matching tree, served-byte proofs, toolchain/asset equivalence
   and remote publication receipt, then obtain explicit study execution approval.
   A pre-question environment change requires a new immutable amendment published
   before questions; never amend the original freeze after observing answers.

## Once-only capture and immutable evidence

Reserve `docs/evidence/v49-regression-732-mac/` for the future study. It must not
exist at execution start. Use exclusive creation; no historical default paths.
Subdirectories: `preflight/`, `execution/`, `raw/`, `score/`, `audit/`, `review/`.
The study root is absent at this protocol preparation. Its first allocation is the
neutral-preparation start; publish preflight/execution there before questions.
Raw capture starts only later and requires raw/ absent. A partial preflight failure
remains a first failure; no stage is deleted or reused. Protocol preparation logs
live separately under docs/evidence/v49-regression-protocol-preparation/.
Preflight and execution freeze publish first. Create raw/score/audit/review only
for their own stage with write-once files. A failed attempt remains archived;
retry requires approval and an entirely new attempt root, not reuse or deletion.
No result directory or first-result placeholder is created by this preparation.

After approval, make one sequential capture of all packs before scoring. Submit
each original case once; no automatic question retry. For each Hybrid question
save UI submission receipt, actual production answer/quotes/screenshots and source
extraction, then persist pre-candidate query/body/facet metadata and actual finite
384D vectors before invoking either candidate. Save original body offsets/text,
query/vector identities and complete cosine anchors. Independently plan/query
v49 and v43 facets; never borrow another candidate's facet vectors or substitute
synthetic cosines. Comparisons use the original selected pair and lexical path.
Store candidate errors and partial progress; an incomplete capture is not a pass.

Seal raw receipts/vectors/candidate records before scoring. Preserve complete case
order, count, execution statuses and original config identity. Score only after
complete capture; stop immediately on execution/integrity failures. A stopped study
may retain partial records but cannot claim the 732-case gate.

## Native grading and acceptance — fixed and section separately

**Historical 668:** retain original family graders and available-input native gates,
not a new 668/668 requirement. Preserve every historical and same-session paired/
production PASS within the same variant, with no new unsupported acceptance,
supported false refusal, ERROR or unresolved manual BLOCKED output. Retain all
constructed-control/category/compound/count/direct-span gates and unchanged native
limits; never use section PASS to rescue fixed FAIL. RetrievalQuality28 retains
exact-evidence metrics; its original index recall-promotion criterion is not a new
wrapper gate. ExternalSQuAD24 remains a local native test, not official accuracy.

Known public rows stay visible, using their original native criteria:
ExternalSQuAD24 E08 FAIL in both variants, E24 fixed FAIL/section PASS;
FreshConfirmation32 F07 fixed FAIL/section PASS, F09/F10 FAIL in both. Their
historical subset-gate treatment and F10 paired-v9 refusal qualification remain.
If v49 repairs a row, report the new grade separately; never overwrite its first
failure. An observed change that violates an original gate is a failure, not a
post-hoc waiver. No new known-failure exemption may be added after answers. Also preserve each
prior v46 native PASS in its same variant, using the frozen original native-score
reference; its FAIL/BLOCKED rows confer no exemption or automatic adjudication.
Record this prospective additional preservation comparison separately from original
family gates. Do not pool prior v46 counts with new results.

Cobalt16 preserves its manual rubric: reuse archived judgment only for an identical
normalized displayed answer and filename/quote signature, rechecking provenance,
relevance, expected documents and refusal. Changed unadjudicated signatures remain
BLOCKED pending original-rubric review; do not invent an automatic semantic grade.

**Exposed Fresh64:** unchanged `gradeAnswer`/literal-context/group/citation/refusal
criteria require **64/64 PASS independently in each v49 variant**: 40 supported
Hybrid, 16 unsupported refusals and 8 lexical Comparisons. PARTIAL, ERROR, BLOCKED,
wrong requested group and context-only credit cannot count as PASS. Paired v43
results are diagnostics; v43 failing Fresh64 is not itself a new v49 failure.
Never weaken the criteria to match the bounded implemented grammar.

A full repair regression claim needs all 19 historical family gates plus this
64/64 gate in both variants, complete integrity and separate review. Do not turn
a single aggregate count into a quality percentage or a phase 2 acceptance claim.

## Prospective anchor audit — required before capture

The [machine-readable audit requirements](audit-requirements.json) are mandatory
before the first study question. They are requirements, not a claim of completed
v49 integration or verification. New isolated adapters must prove them with only
independent synthetic fixtures, then pin their code and passing logs in the full
execution freeze. Reuse the general approved v46 legacy body-ID proof prospectively;
do not repeat its post-capture scoring correction or alter that old evidence.

For a legacy clipped quote without an explicit anchor, require a retained body ID
resolving to one unique original body identity/content/span, matching document/
filename/source text and full selected-span containment. That body must uniquely
match a saved sentence/vector. At least one of its own candidate/query/facet
contexts must have the same finite recorded cosine, independently recomputed from
real nonzero384D vectors within1e-10. Repeated identical body identities across
genuine contexts are allowed; conflicting identities and guessed containing/nearest
sentences are rejected. Use an ephemeral verification view only; native graders
receive the exact original result, and disclose every legacy binding separately.

Explicit anchors cannot use that fallback. Require finite, identical source/anchor
cosines plus independent arithmetic and exact source identity/containment. Test
selected cosine1 with anchor0, equal forged cosines, missing/nonfinite metadata,
wrong IDs/offsets/vectors and foreign paired contexts as rejections. Audit direct
sentence sources and lexical pair/citation bounds too. Retain original normalized
body offset conventions and all pre-candidate vector/receipt/order checks.

A future scoring adapter must import unchanged original native graders and gates,
prove archived-row equivalence without candidate calls, and separately enforce
variant-specific v43/v46/history/paired/production preservation. Do not copy grading
bodies with edits, auto-adjudicate Cobalt changes or redefine native FAIL as PASS.

## Independent audit, manual review and stop rule

Audit vector dimensions, finiteness, nonzero norms, independent query/facet/body
identity and recomputed cosine values against exact source/anchor spans. Validate
literal quote bounds (<=620 chars), at most three citations, sequential numbering,
correct filenames/original Comparison pair, source authenticity, requested-group
relevance, full conditions/roles/months/holds and explicit uncited refusals.

Keep native automated scores unchanged and seal them before a separate binding/
contradiction review. Review every Fresh64 output in both v49 variants and all
changed historical outputs, ambiguities, manual-family changes and integrity
exceptions. Audit paired outputs for diagnostic validity. Any contradiction with
a native PASS prevents final acceptance; manual review cannot silently regrade
native results or modify keys/thresholds. Preserve both records and explain.

Stop and report any required engineering, startup, execution, integrity, scoring,
preservation or review failure before fixes/retries/publication. Ask for approval
on the concrete failure; do not normalize or rewrite evidence. A failure-publication
task can later be separately approved. Never force-push or overwrite conflicts.

## Decision after this study

A passing exposed regression shows preservation/repair only under these original
inputs and native criteria. First v43 Fresh64 remains FAIL (52 PASS / 4 PARTIAL /
8 FAIL in each variant); it cannot become a passing confirmation by replay.
Only after regression success, separately agree/freeze a new unseen prospective
pack before its first answers. Phase 2, live integration, Windows qualification,
product/security/capacity/PDF/OCR/Qwen and 6.0 release remain separate decisions.
