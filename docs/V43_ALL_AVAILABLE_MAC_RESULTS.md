# V43 — first combined run of all 668 available cases

Captured: 2026-10-20; publication: 2026-10-21 (Asia/Kolkata).
Freeze/protocol/runner `560e3a8b` reached GitHub
before questions. One uninterrupted capture: **668 distinct exposed cases across
19 families**, 628 actual local MiniLM Hybrid and 40 separate lexical Comparisons.
Candidate v43 and paired v42 unchanged; installed Chrome 155.0.8059.85, Node 24.19.0
darwin/arm64, MiniLM q8 WASM, Qwen off. Live 5.6/r44 remains unchanged.

**All 19 available-input native regression gates PASS. This does not mean every
answer passes:** the five fixed-variant and three section-variant public-data
FAIL rows below remain FAIL, exactly as recorded before the study. No pooled
accuracy percentage or full 771-case gate is claimed.

## Separate native results

Each cell is PASS / PARTIAL / FAIL; all variants have zero ERROR and BLOCKED.

| Family | Cases | v43 fixed | v43 section | Native regression gate |
| --- | ---: | --- | --- | --- |
| Cobalt16 | 16 | 16 / 0 / 0 | 16 / 0 / 0 | PASS |
| RetrievalQuality28 | 28 | 28 / 0 / 0 | 28 / 0 / 0 | PASS |
| ExternalSQuAD24 | 24 | 22 / 0 / 2 | 23 / 0 / 1 | PASS |
| FreshMixed32 | 32 | 32 / 0 / 0 | 32 / 0 / 0 | PASS |
| FreshConfirmation32 | 32 | 29 / 0 / 3 | 30 / 0 / 2 | PASS |
| V9Exposed32 | 32 | 32 / 0 / 0 | 32 / 0 / 0 | PASS |
| Actor40 | 40 | 40 / 0 / 0 | 40 / 0 / 0 | PASS |
| Scope48 | 48 | 48 / 0 / 0 | 48 / 0 / 0 | PASS |
| Confirmation48 | 48 | 48 / 0 / 0 | 48 / 0 / 0 | PASS |
| Precision48 | 48 | 48 / 0 / 0 | 48 / 0 / 0 | PASS |
| Binding64 | 64 | 64 / 0 / 0 | 64 / 0 / 0 | PASS |
| Cedar32 | 32 | 32 / 0 / 0 | 32 / 0 / 0 | PASS |
| Bracken32 | 32 | 32 / 0 / 0 | 32 / 0 / 0 | PASS |
| Flint32 | 32 | 32 / 0 / 0 | 32 / 0 / 0 | PASS |
| Morrow32 | 32 | 32 / 0 / 0 | 32 / 0 / 0 | PASS |
| Hearth32 | 32 | 32 / 0 / 0 | 32 / 0 / 0 | PASS |
| Lumen32 | 32 | 32 / 0 / 0 | 32 / 0 / 0 | PASS |
| Prism32 | 32 | 32 / 0 / 0 | 32 / 0 / 0 | PASS |
| Vela32 | 32 | 32 / 0 / 0 | 32 / 0 / 0 | PASS |

No prior PASS loss in either variant, no new unsupported false acceptance or new
supported false refusal, no question retries, execution errors or unadjudicated
manual outputs. F10 remains one historical supported false refusal per variant.
All constructed-control/native category gates pass, including Binding64 and the
original Confirmation48/Precision48 C04 direct-span checks.

## Known failures remain explicit

| Family / case | Fixed | Section | Preserved limitation |
| --- | --- | --- | --- |
| ExternalSQuAD24 E08 | FAIL | FAIL | Entrance crown quote misses the requested top row of windows |
| ExternalSQuAD24 E24 | FAIL | PASS | Fixed quotes compounds instead of the requested energy content |
| FreshConfirmation32 F07 | FAIL | PASS | Fixed selects a different paragraph and misses the keyed characterization |
| FreshConfirmation32 F09 | FAIL | FAIL | Selected paragraph misses the requested nobles in the revolt question |
| FreshConfirmation32 F10 | FAIL | FAIL | Supported 1543 publication date receives an uncited refusal |

These rows were frozen known limitations, not newly discovered regressions or
relabelled passes. The original public-sample native gates permit these failures
outside their constructed-control subset gates. Their displayed answers/quotes
remain unchanged; the original F10 paired-v9 qualification also remains satisfied.

## Preserved criteria and review

The exact 19-family keys/questions/order, 75 source documents and 117 original
input entries were verified against original manifests. Native scoring bodies for
the eight gold-span/group packs and Binding64 are unchanged v38 bodies, verified
byte-for-byte and against all archived v38 grades for the 384 additional cases.
The other nine families reuse their unchanged successful native adapters.

Cobalt16 keeps its manual rubric. All current displayed answer/filename/quote
signatures match archived native judgments; provenance/relevance/expected-document
and refusal guards are reapplied. No changed manual answer was auto-graded.

PASS preservation is variant-specific. A section PASS is not silently substituted
for a fixed FAIL. Native grade rows and acceptance gates stay distinct, as do
original public failures, first blocked/qualified captures and all prior scores.
No model, answer-producer or scorer rerun occurred during offline review.

All **1,336 variant answer/quote signatures** match prior first-v43 nine-pack or
v38 native cards after whitespace normalization. There is no new candidate
quality-improvement claim; this run broadens verified preservation coverage.

## Independent integrity and vector audit

- All 75 original source texts and their frozen byte hashes match. Offsets use
  the unchanged buildIndex CRLF/space-normalized body sourceText; archived bytes
  and Markdown CRLF remain untouched.
- Validate 2,707 recorded source vectors, 628 whole-query vectors, 22 v43 and 15
  paired-v42 planner vectors (all finite 384D). Independently recompute **40,030
  body cosines** and check 54 displayed facet anchors against saved evidence.
- Verify the four original C04 direct-span checks separately from the scorer gate.
- Preserve all **6,591 selected earlier artifact hashes**, including first v43
  nine-pack/v42/v41/v40/v39 evidence and their original failed/blocked results.
- Exact complete ledger: 668 distinct captured cases and 628 distinct Hybrid
  submissions, 40 Comparisons, no duplicate submissions/captures or retries.

[SHA256 seal](evidence/v43-all-available-mac/manifest.json): **5,352 artifacts / 587,220,023 bytes**.
[Native scorecards](evidence/v43-all-available-mac/score/native-scorecards.json),
[vector/source audit](evidence/v43-all-available-mac/score/assistant-review.json),
[original-gate review](evidence/v43-all-available-mac/score/original-gate-review.json),
[output comparison](evidence/v43-all-available-mac/score/output-comparison.json),
[review notes](evidence/v43-all-available-mac/score/review-notes.json),
[prior seals](evidence/v43-all-available-mac/score/prior-evidence-integrity.json).

RetrievalQuality28 native required-sentence recall@1/3/5 is 26/34,31/34,32/34 fixed
and 27/34,33/34,34/34 section; top1 relevance 18/24 and 19/24 respectively. These
are original saved-ranking metrics, not pooled answer accuracy or a new chunking-
promotion claim. [Metrics](evidence/v43-all-available-mac/score/rq-native-metrics.json).

## Engineering and publication history

771/771 dependency-free unit tests (unit count, not model-case count), strict
28/28 bundled Keyword, read-only startup, 827-file/input/history freeze, native
adapter equivalence and original resource-limit checks PASS. Preparation CI has
completed successfully; its Pages job was still running at review time. Publication
CI/deployment status must be checked after the results push separately from receipt.

The first engineering run stays 767 PASS/3 FAIL of 770, all from one overlapping
protocol in input/native-reference categories. Work stopped; the user authorized
independent category checks preserving every hash and each intra-category duplicate
guard. A new negative control rejects conflicting hashes. Both first and approved
logs remain verbatim; no candidate/input/evidence correction or model retry occurred.

## Phase 1 status and next decision

All668 cases with verified original inputs have now been exercised together on
unchanged v43. No verified available family remains untested in this scope.

**Phase 1 is not formally closed.** 103 original cases across Lantern32, Aster32,
Meridian24,Atlas15 and the original private combined configuration remain missing.
This is a NEW explicitly frozen available-input study, not byte-equivalent recovery
of that configuration. Recover the originals or explicitly approve a revised
acceptance protocol before treating the broader-regression phase as complete.

The five public-data case limitations above remain known quality work. A successful
historical preservation gate does not establish general answer correctness. Fresh
confirmation on unseen inputs, live integration, product qualification and release
remain open. The live application is still 5.6/r44; v43 has not been adopted.
