# NextConfirm64 input protocol

Protocol ID: **NEXTCONFIRM64-INPUT-20261025**. Date: **25 October 2026**.
Parent: [PH2-PLAN-20261025](../../docs/PHASE2_ACCEPTANCE_PLAN.md).
Baseline: `d041126392b7166da0b6e3875ccea3c3df0c7448`.
Status: **Input design published; corpus/key NOT PREPARED; review NOT COMPLETE;
input freeze absent; execution NOT READY / NOT RUN**.

## Purpose and retained limits

Prepare a separately reviewed 64-question confirmation for unchanged isolated
`coverage-v50-versioned-retention`, using eight new English TXT documents. This
protocol fixes input design before authoring, not an actual input or execution
freeze. No candidate, planner, model, browser, embedding or saved-vector replay
is part of this step. Never put expected answers or key imports in candidate code.

Original Fresh64 FC61 remains native FAIL; v50 exposed Fresh64 remains 63 PASS /
1 FAIL per variant and overall FAIL. LocationScope12's 12/12 lexical PASS is
supporting author-aware evidence only. The old 64/64 gate remains failed. A separate
explicit prospective acceptance-policy decision addressing that failure is still
required for Phase 2 closure. This pack does not silently replace the old gate.
Live 5.6/r44, integration HOLD, 103 exclusions/full 771 NOT RUN and later device/
product/release requirements remain unchanged. The parent plan controls these holds.

## Corpus and authorship

Author eight original fictional documents with stable IDs D01–D08 and unique
filenames under a future source_docs/ directory. Use new facts and entities,
coherent full documents and realistic surrounding context. Do not recycle benchmark
paragraphs, paraphrase FC61, substitute entity names into old quotations, or copy
LocationScope12. No personal documents, credentials, answer-key markings or test
instructions belong in sources. Record UTF-8 raw byte length and SHA-256 per file;
preserve bytes across Mac/Windows checkout. Each document must be within the
existing 180,000-character Comparison input limit; do not truncate during capture.

All Hybrid cases search the same full eight-document corpus in D01–D08 order.
Each Comparison selects exactly two distinct original IDs and filenames in an
explicit left/right order. Choose and record pairs while authoring, never from
retrieved answers. No runtime fallback or automatic pair substitution is allowed.

Authors know this category design and earlier limitations. Disclose their access
to candidate code, keys and previous outputs. Unseen means these exact inputs have
never produced candidate/planner/model outputs; it does not mean blinded authorship,
representative sampling or independently established general accuracy. Follow
[the input review checklist](INPUT_REVIEW.md); do not assert independent review
until a distinct qualified reviewer has actually completed it.

## Fixed case inventory and order

Use exact IDs NC01–NC64 in the following order; unique full question strings.

| IDs | Workflow | Category | Supported | Unsupported |
| --- | --- | --- | ---: | ---: |
| NC01–NC06 | Hybrid | Object/location binding | 6 | 0 |
| NC07–NC12 | Hybrid | Causal explanation | 6 | 0 |
| NC13–NC20 | Hybrid | Event/date/actor or publication binding | 8 | 0 |
| NC21–NC28 | Hybrid | Retention/approval/condition completeness | 8 | 0 |
| NC29–NC34 | Hybrid | Clock/ticket roles | 6 | 0 |
| NC35–NC40 | Hybrid | Numeric/metric/unit binding | 6 | 0 |
| NC41–NC44 | Hybrid | Missing facts | 0 | 4 |
| NC45–NC48 | Hybrid | Wrong object/location premise | 0 | 4 |
| NC49–NC52 | Hybrid | Ambiguous reference | 0 | 4 |
| NC53–NC56 | Hybrid | Unsupported policy boundary | 0 | 4 |
| NC57–NC58 | Comparison | Explicitly located monthly temperatures | 2 | 0 |
| NC59 | Comparison | Ordinal event/object | 1 | 0 |
| NC60 | Comparison | Departure/cutoff/hold | 1 | 0 |
| NC61 | Comparison | Missing location | 0 | 1 |
| NC62 | Comparison | Missing month | 0 | 1 |
| NC63 | Comparison | Wrong event/object | 0 | 1 |
| NC64 | Comparison | Missing requested hold | 0 | 1 |
| Total | 56 Hybrid / 8 Comparison | 64 unique questions | 44 | 20 |

Do not invoke the candidate/planner to choose wording it can answer. Independent
review must judge source-supported meaning, not candidate grammar. A valid hard
case stays in scope even if the candidate may refuse. Fix genuine input defects
before freeze with recorded findings. A necessary design/count change needs a
new published protocol revision before any candidate observation.

## Required future input records

These are file specifications, not existing data or completed reviews:

| Future file | Required content |
| --- | --- |
| sources.json | Eight records: id, name, repository-relative path, raw byte length, sha256; original author/provenance record |
| cases.json | Exact order; id, question, workflow (hybrid or comparison), category, selected_documents (ordered original IDs; all eight for Hybrid, exact pair for Comparison) |
| answer-key.json | Same order/id/question/workflow/category; boolean unsupported, expected_documents (required evidence filenames), expected_sources using the native fields below |
| input-review.json | Distinct reviewer identity/disclosures; exact reviewed file hashes; all 64 completed rows and eight source reviews; findings/corrections and sign-off |
| input-freeze-manifest.json | Protocol/checklist, source/case/key/review bytes, pinned unchanged candidate/native references and all input-validation artifacts |

Each supported expected_sources item has filename, context and groups, matching
the unchanged [native gradeAnswer](../v39-recoverable-regression/score.mjs).
Context is a complete original literal paragraph or bounded contiguous source
block, not a constructed answer. Each group is a nonempty list of literal
alternatives for one required facet; all groups must match on the proper source.
Include every requested entity/object/location/metric/value/unit/month, role,
condition and exception as applicable. Alternatives cannot drop a sign/unit,
convert values, treat mean/average as interchangeable, or discard scope. Independent
review checks semantic bindings in addition to the native substring criteria.

Supported Comparison keys require evidence from both selected filenames; Hybrid
keys identify all documents needed for the requested facts. Unsupported keys have
expected_documents: [] and expected_sources: []; selected_documents still records
the full searched corpus or pair. Record the missing/conflicting facet and full
corpus/pair absence review separately in input-review.json, not as answer evidence.
Contradictory or genuinely underspecified supported cases must be resolved or
correctly labelled unsupported before freeze, with their correction history.

## Pre-exposure validation and rubric

Validate schema/types, 8 unique original sources, 64 exact IDs/questions/order,
category totals, 40/16 Hybrid and 4/4 Comparison split, selected-document membership/
order, raw file hashes, all required literal contexts/groups and complete binding.
Check both a raw-byte identity and the candidate's declared normalized-body offset
contract; never rewrite raw files to match normalized quotes. No candidate imports,
planner calls, embeddings, model probes or saved-vector replay in input validation.
Future harness checks use unrelated synthetic fixtures, never these questions.

Use unchanged native grading. Supported outputs require complete literal-context
and group coverage and relevant sequential citations; unsupported cases require
answered=false, explicit native-recognized refusal/clarification and zero sources.
At most three citations for Hybrid; supported Comparison requires exactly two
ordered original sources. Require separate complete source/binding review and
prospectively frozen integrity checks; a native PASS cannot override a contradictory
binding. Keep native grades and review findings distinct without silent regrading.

Strict prospective target: **64/64 native PASS independently in each logical
variant**, no PARTIAL/FAIL/ERROR/BLOCKED counted as PASS, zero false acceptances/
refusals or unresolved integrity/review failures. Plan 56 actual MiniLM Hybrid
outputs per fixed/section variant and eight lexical outputs captured once, shared
only for logical gate calculation: 112 + 8 = 120 outputs, 64 unique questions.
Never claim 128 independent observations or call lexical results Hybrid.

## Publication and execution boundary

Complete independent review and static validation before creating the input freeze.
Publish/verify the reviewed freeze on main before execution preparation. Then a
separate isolated runner/scorer/audit package, actual neutral MiniLM/browser startup
preflight, measured Node/Chrome/platform/runtime/model assets, fresh full unit/
Keyword checks and complete published execution freeze are required. Input
publication alone is not readiness or permission to submit questions.

The parent plan defines once-only capture, exclusive new evidence paths, raw seal
before scoring, actual vector/cosine/anchor proof, first-failure preservation,
separate all-output review and the still-unresolved acceptance-policy condition.
No execution command or current measurement is supplied here. No new corpus,
key, reviewer sign-off or study result exists at this protocol checkpoint.
