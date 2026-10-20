# Phase 1 revised acceptance — approved 668-case scope

Decision: **PH1-668-20261021**. Date:2026-10-21 (Asia/Kolkata).
The user explicitly approved the proposed revised acceptance scope and progression
to fresh-confirmation preparation: “yeah go ahead and i agree to all”.

## Decision and evidence

**Phase 1 is accepted and complete under the revised available-input scope.**
The scope is the668 original verified cases across19 families in the published
[combined v43 study](V43_ALL_AVAILABLE_MAC_RESULTS.md), not all771 historical cases.
This is an explicit acceptance revision; no missing input or failed answer is
reclassified as passing. Original inputs/rubrics/first evidence remain unchanged.

Accepted evidence commit: `e2bbc6266e4f69395b37afd503f82131df4e97eb`.
Original runner/protocol/freeze: `560e3a8bf22368d239db87a429c376f82a66704d`.
[GroundedDesk CI](https://github.com/arjun9669/GroundedDesk-AI/actions/runs/39475873673)
completed successfully before this decision was documented. Pages publication is
tracked separately and is not a claim of candidate integration or a6.0 release.

All19 available-input native regression/preservation gates pass, with no historical
PASS loss or question retries.771 dependency-free unit checks and28 strict Keyword
checks pass. The827-file execution freeze,75 original source texts, original C04
gates,40,030 body cosines/54 facet anchors and selected historical seals verify.
[Evidence manifest](evidence/v43-all-available-mac/manifest.json) preserves5,352
artifacts/587,220,023bytes. These are exposed regressions, not fresh confirmation,
independent accuracy, all answers correct, or a reconstructed private configuration.

## Explicit exclusions remain untested

| Original pack | Cases | Status under revised acceptance |
| --- | ---: | --- |
| Lantern32 | 32 | Original complete bundle unavailable; untested |
| Aster32 | 32 | Original complete bundle unavailable; untested |
| Meridian24 | 24 | Original external input bundle unavailable; untested |
| Atlas15 | 15 | Original PDFs/run identities unavailable; untested |
| Total | 103 | Excluded from this phase 1 acceptance; never marked PASS |

The original private combined configuration remains unavailable. Archived answers,
quotes/screenshots and synthetic PDF replacements cannot prove preservation on
missing source bytes. Recovery remains open as follow-up work. If originals are
recovered, validate their hashes and agree a separate run before extending coverage.
**Full771-case gate: NOT RUN.** This revision does not grant a future full-gate claim.
Historical reports saying phase1 awaited this decision remain accurate checkpoints;
this document supersedes that planning hold without rewriting their observations.

## Known quality limitations remain open

| Case | Fixed | Section | Limitation retained |
| --- | --- | --- | --- |
| ExternalSQuAD24 E08 | FAIL | FAIL | Requested window location omitted |
| ExternalSQuAD24 E24 | FAIL | PASS | Fixed selects unrelated oxygen-compound text |
| FreshConfirmation32 F07 | FAIL | PASS | Fixed selects a different historical paragraph |
| FreshConfirmation32 F09 | FAIL | FAIL | Requested actor omitted |
| FreshConfirmation32 F10 | FAIL | FAIL | Supported publication date receives a refusal |

The original native gates permit these public-sample failures outside their
constructed-control subset gates. They remain FAIL; their earlier outcomes and
F10 false-refusal qualification remain untouched. Revised regression acceptance
does not waive these quality limitations for general product or release claims.

## Authorized next stage and retained holds

Move to **phase 2 — fresh confirmation preparation** under the new
[Fresh64 protocol](../eval/phase2-fresh64/PROTOCOL.md). Do not tune the candidate on
that pack before its first run. Scope, sources/questions/key/rubric must be frozen
before observation; execution/environment/module identities must be published
before questions. Keep first results even on failure and stop on required failures.

Live GroundedDesk5.6/r44 is unchanged; v43 is not adopted. This decision authorizes
phase1 closure under the revised scope and phase2 preparation. It does not approve
integration, Qwen qualification, Windows/PDF validation, deployment of v43 or6.0
release. Those later phase gates and the missing-input register remain open.
