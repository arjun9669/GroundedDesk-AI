# Phase 2 acceptance plan

Plan ID: **PH2-PLAN-20261025**. Date: **25 October 2026 (Asia/Kolkata)**.
Baseline: `c92d71fc59d6b173111011838eec49254ce8f317`.
Status: **Plan documented; Phase 2 HOLD; new confirmation NOT PREPARED / NOT RUN**.

The user authorized this planning task after reviewing the remaining phases.
Standing development authorization covers preparation, checks and normal publication;
it does not waive quality gates. This document defines the work and proposed future
study criteria. It does not declare Phase 2 accepted, enact a replacement for the
original Fresh64 gate, authorize live adoption or change any frozen artifact.

## Evidence and gate ledger

| Requirement or observation | Current state | Treatment |
| --- | --- | --- |
| Phase 1 available-input preservation | Accepted under PH1-668-20261021; 19 available families | Keep the approved 668-case scope and original public failures |
| Original first v43 Fresh64 | 52 PASS / 4 PARTIAL / 8 FAIL per variant | Immutable failed first confirmation; now exposed |
| Latest v50 exposed regression | 19/19 historical gates PASS; Fresh64 63 PASS / 1 FAIL per variant | Overall native FAIL; not a fresh confirmation |
| Original Fresh64 64/64-per-variant gate | FAIL; FC61 still native FAIL | Remains failed; no exception, rescore, exclusion or silent substitution |
| LocationScope12 | 12/12 native PASS | Author-aware lexical contract support only; not MiniLM or unseen confirmation |
| Missing historical inputs | 103 cases unavailable; full 771 NOT RUN | Remain excluded/untested under the Phase 1 decision |
| New confirmation inputs and independent review | Not prepared; separate reviewer not identified | No claim of unseen/blinded/independent evidence or execution readiness |
| Application / later phases | Live 5.6/r44; integration HOLD | No candidate integration, device qualification or 6.0 release claim |

References: [Phase 1 decision](PHASE1_REVISED_ACCEPTANCE.md),
[first confirmation](PHASE2_FRESH64_FIRST_RESULTS.md),
[v50 results](V50_REGRESSION_RESULTS.md),
[source-scope decision](LOCATION_SCOPE_DECISION.md),
[LocationScope12 results](LOCATION_SCOPE12_RESULTS.md).

## Resolve acceptance scope before a new acceptance study

FC61 requests store temperatures at both facilities. The Tarrow source gives an
unqualified laboratory monthly temperature without establishing store attribution.
The current refusal preserves the grounding contract, while the frozen key expects
the number/month and records a native FAIL. Repeating the unchanged case cannot
supply that missing fact. No source edit, relaxed location requirement or key change
is part of this plan, and the original case must never be reported as repaired.

Phase 2 closure requires a separately recorded prospective acceptance decision
that explicitly states whether and how future qualification can proceed despite
this still-failed legacy gate. It must name the legacy failure and scope rationale,
identify any changed future acceptance requirement and its effective pre-answer
commit, and preserve original results and limitations in the final release record.
This is an acceptance-policy decision, not a new test result. The current plan
proposes the strict separate study below; it does not enact a gate revision.
Until such a decision is recorded, passing that study alone cannot close Phase 2.
Preparation can proceed without representing the legacy gate as satisfied.

## Proposed separate confirmation scope

Reserve the working name **NextConfirm64**, distinct from Fresh64 and LocationScope12.
No pack, answers or execution directory is created by this planning task. Before
questions exist, publish its own protocol specifying the following design targets:

| Workflow | Supported | Unsupported | Total unique questions |
| --- | ---: | ---: | ---: |
| Actual MiniLM Hybrid | 40 | 16 | 56 |
| Lexical two-document Comparison | 4 | 4 | 8 |
| Total | 44 | 20 | 64 |

Use eight new English TXT documents with new entities and facts. No paraphrased
copy of FC61, recycled benchmark paragraphs, old quotes with swapped names, or
post-answer replacement cases. Balance coverage before candidate observation:

- Hybrid supported: 6 object/location, 6 causal explanation, 8 event/date/actor or
  publication binding, 8 retention/approval/condition completeness, 6 clock/ticket
  roles and 6 numeric/metric/unit questions. Total 40.
- Hybrid unsupported: 4 missing facts, 4 wrong object/location premises,
  4 ambiguous references and 4 unsupported policy boundaries. Total 16.
- Comparison supported: 2 explicitly located monthly-temperature pairs,
  1 ordinal-event/object pair and 1 departure/cutoff/hold pair. Unsupported:
  1 missing location, 1 missing month, 1 wrong event/object and 1 missing hold.

This is a controlled scope, not representative sampling of arbitrary documents.
Category selection is informed by known limitations; disclose that fact even if
independent authors/reviewers prepare the actual text. Do not select questions
for demonstrated candidate grammar or drop valid hard cases after model answers.
If the proposed scope cannot be represented faithfully, revise and publish the
protocol before any candidate/planner call, rather than improvising during capture.
PDF/OCR, Research synthesis, Qwen, broad world knowledge and cross-device release
claims remain outside this TXT/MiniLM confirmation.

## Independent source and key review before exposure

Record the source author, key author, reviewer identities/roles, dates and access
to candidate implementation and earlier results. A separate reviewer must check
all 64 questions against complete original source texts without seeing candidate
outputs. The review must establish the answerability label, requested entity,
object, location, time, metric, units and conditions; literal quote contexts and
all required gold groups; both selected Comparison identities/order; and genuine
missing/ambiguous evidence for each refusal. Resolve every review finding before
freezing inputs. Missing facts must be unsupported cases, never supported guesses.

Also review readability, distinct facts and coverage, duplicate questions/sources,
contradictory statements, and inadvertent benchmark/key material in source text.
Require a completed finding register, including any pre-freeze corrections.
Self-review by the candidate/input author is useful but cannot fulfill this
independence requirement. A separate chat or renamed reviewer is not evidence of
independence. No separate reviewer is currently identified; this requirement is
unmet. Do not contact anyone without the user's messaging authorization.

Unseen means no candidate/planner/model output has been generated for these exact
inputs before the first published study. It does not imply developer ignorance,
external benchmark validity or general accuracy. State authorship and blinding
limits precisely. After first exposure, the pack is an exposed regression set.

## Candidate, preservation and execution readiness

Use unchanged isolated **coverage-v50-versioned-retention** as the planned
candidate; keep live 5.6/r44 separate. Freeze the exact entry point and every
transitive local module, native grader and audit adapter. Any candidate change
requires a new plan identity, relevant synthetic engineering checks, complete
668-case historical preservation plus exposed Fresh64 regression, and a new
prospective freeze before confirmation. Never tune on confirmation questions.

For unchanged code, retain the complete v50 732-case first evidence and verify
candidate/native/input identities before referencing its measured 19/19 historical
preservation. Do not rerun that study merely for this document, pool it with new
confirmation, conceal public failures, or call old outputs fresh measurements.
Any prior native PASS loss or integrity discrepancy blocks readiness.

The future execution freeze must include the reviewed inputs, key and detailed
rubric; exact case order and selected pairs; source/native/code hashes; source/key
review record; synthetic harness controls; current full unit and strict Keyword
logs; actual Node/Chrome/platform/runtime/model identities; model asset hashes;
and fresh neutral MiniLM startup preflight. No new question/source/key may be
submitted to a candidate or planner during preparation or preflight. Do not use
saved vectors as new model measurements. Publish and verify the complete execution
freeze on clean main before capture. No execution freeze is claimed by this plan.

Primary environment: Mac, installed Chrome, actual MiniLM q8 WASM, Qwen off. Capture
fixed and section Hybrid independently with their original evidence identities.
Run the eight lexical Comparisons once; apply those eight native outcomes to each
logical 64-case gate without claiming duplicate independent measurements. That
means 112 Hybrid outputs plus 8 lexical outputs: **120 captured outputs for 64
unique questions**, not 128 independent observations. The future frozen scorer
must declare and test this mapping before any answers.

Keep any live UI or paired diagnostic outputs separately identified and pinned;
they cannot replace candidate outcomes. Windows is unavailable and not required
for this Mac-only study; it remains an explicit Phase 4 blocker for Windows or
cross-device claims. Different target environments require their own qualification.

## Proposed future scoring and exit criteria

Retain the unchanged native gradeAnswer from v39-recoverable-regression. New
supported keys require every requested facet in literal source context, complete
role/condition/object/location/time binding and exact values/units; unsupported
keys require an uncited refusal. Validate that answerability and complete required
groups agree before the input freeze. PARTIAL, FAIL, ERROR or BLOCKED cannot count
as PASS. Freeze any additional checks before answers; do not alter native outcomes.

Require **64/64 native PASS in each logical variant**, zero false acceptances,
zero false refusals, zero integrity failures and no unresolved binding-review
findings. Do not average variants or use paired results to rescue a failing row.
Require original sequential citations and selected identities, unique literal
normalized-body offsets, declared source limits, and for Hybrid finite actual
384D query/body/planner vectors with independently recomputed own-query/body
cosines and prospectively declared original ranking-body/expanded-quote binding
rules. Lexical outputs carry no invented vectors or cosine scores.

Capture all frozen questions once in order into a new exclusive directory. Save
raw outputs, actual vectors, source/query/body identities and applicable browser
receipts; audit as captured, then seal complete raw before native scoring. Any
execution/integrity failure stops the attempt and preserves partial evidence.
After complete capture, preserve the first native scores and separate all-output
source/binding review. Any required quality or review failure ends acceptance for
that attempt. Never retry questions, tune thresholds or replace a failed case
inside the same study. Engineering fixes preserve their exact first failure and
attempted sources; study repair needs a new prospectively frozen attempt.

Even a strict new PASS is only evidence within this declared scope. Closing Phase
2 additionally requires the explicit acceptance-policy decision above, verified
historical preservation and published reviewed evidence. Integration remains a
separate phase with its own actual checks; no automatic candidate adoption.

## Deliverables and current readiness

| Order | Deliverable | Current status |
| --- | --- | --- |
| 1 | This acceptance plan and honest legacy gate ledger | Documented in this change |
| 2 | Explicit prospective acceptance-policy decision addressing original FC61 | Not enacted; original 64/64 gate still FAIL |
| 3 | New sources/questions/key/rubric and independent pre-output review | Not prepared; reviewer not identified |
| 4 | Published input freeze; isolated runner/scorer/audit engineering | Not prepared |
| 5 | Current neutral model/browser preflight and published execution freeze | Not prepared |
| 6 | Once-only capture, raw seal, native scores, all-output separate review | NOT RUN |
| 7 | Phase 2 acceptance record tied to exact successful evidence | HOLD; no acceptance or integration claim |

Next prepare the standalone input protocol and source/key review specification;
keep the reviewed corpus and execution readiness as separately verifiable work.
No candidate/model/browser study, source rewrite, historical regrading or live
functionality change is performed in this planning task. Product/security/PDF/
performance/Windows/release qualification and the missing-original-input register
remain open under the [five-phase roadmap](ROADMAP_6_0.md).
