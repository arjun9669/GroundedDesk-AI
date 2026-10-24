# V46 — failed 732-case exposed regression

Captured and reviewed: **24 October 2026 (Asia/Kolkata)**.
Decision: **FAIL — preservation and Fresh64 repair gates not met; no adoption**.

The user approved documenting, reviewing and publishing this failure. One capture
ran all **732 original cases**: accepted historical 668 plus exposed Fresh64,684 actual
MiniLM Hybrid submissions and 48 separate lexical Comparisons. Both v46 variants
use unchanged candidate code, with independently planned paired v43 and live r44
baselines. There were no question retries or candidate/model reruns.

## Native results — variants and families remain separate

Each result is **PASS / PARTIAL / FAIL / BLOCKED**. All variants have zero ERROR.
Native regression gates differ from per-answer correctness; known public failures
remain FAIL even in a historical family whose preservation gate passes.

| Family | Cases | v46 fixed | v46 section | Native gate |
| --- | ---: | --- | --- | --- |
| Cobalt16 | 16 | 15 / 0 / 0 / 1 | 15 / 0 / 0 / 1 | FAIL |
| RetrievalQuality28 | 28 | 27 / 0 / 1 / 0 | 27 / 0 / 1 / 0 | FAIL |
| ExternalSQuAD24 | 24 | 22 / 0 / 2 / 0 | 23 / 0 / 1 / 0 | PASS |
| FreshMixed32 | 32 | 32 / 0 / 0 / 0 | 32 / 0 / 0 / 0 | PASS |
| FreshConfirmation32 | 32 | 29 / 0 / 3 / 0 | 30 / 0 / 2 / 0 | PASS |
| V9Exposed32 | 32 | 32 / 0 / 0 / 0 | 32 / 0 / 0 / 0 | PASS |
| Actor40 | 40 | 40 / 0 / 0 / 0 | 40 / 0 / 0 / 0 | PASS |
| Scope48 | 48 | 48 / 0 / 0 / 0 | 48 / 0 / 0 / 0 | PASS |
| Confirmation48 | 48 | 48 / 0 / 0 / 0 | 48 / 0 / 0 / 0 | PASS |
| Precision48 | 48 | 48 / 0 / 0 / 0 | 48 / 0 / 0 / 0 | PASS |
| Binding64 | 64 | 60 / 0 / 4 / 0 | 60 / 0 / 4 / 0 | FAIL |
| Cedar32 | 32 | 32 / 0 / 0 / 0 | 32 / 0 / 0 / 0 | PASS |
| Bracken32 | 32 | 31 / 0 / 1 / 0 | 31 / 0 / 1 / 0 | FAIL |
| Flint32 | 32 | 32 / 0 / 0 / 0 | 32 / 0 / 0 / 0 | PASS |
| Morrow32 | 32 | 30 / 0 / 2 / 0 | 30 / 0 / 2 / 0 | FAIL |
| Hearth32 | 32 | 30 / 0 / 2 / 0 | 30 / 0 / 2 / 0 | FAIL |
| Lumen32 | 32 | 31 / 0 / 1 / 0 | 31 / 0 / 1 / 0 | FAIL |
| Prism32 | 32 | 28 / 0 / 4 / 0 | 28 / 0 / 4 / 0 | FAIL |
| Vela32 | 32 | 28 / 0 / 4 / 0 | 28 / 0 / 4 / 0 | FAIL |
| Fresh64 | 64 | 60 / 4 / 0 / 0 | 60 / 4 / 0 / 0 | FAIL |

**Historical gate: 10/19 families PASS.** Both variants lose the same 20 distinct
previously passing cases: 19 native FAIL plus one Cobalt16 manual-family BLOCKED
row (40 affected rows across variants). No new native false acceptance is recorded.
The original five public-data failures remain unchanged; do not pool a quality
percentage across families/variants.

**Exposed Fresh64: 60 PASS /4 PARTIAL /0 FAIL in each v46 variant**, below the
unchanged 64/64 requirement. Paired v43 remains52/4/8 in both; production remains
35/5/24. The eight previously failed Fresh64 cases now receive native PASS,
confirmed in the separate binding review, but the four Comparisons remain partial
and historical preservation fails. This is exposed regression evidence, not a new
prospective confirmation, independent accuracy or completion of phase2.

## Preserved first audit failure and approved separate scoring

The published execution freeze/amendment reached GitHub in `00ba9315` before
cases. Actual environment: Node24.22.1, Chrome155.0.8059.86, macOS arm64,
Transformers.js3.0.0, MiniLM q8 WASM384D, Qwen off, live build2026-10-13-r44.
Six downloaded model/runtime asset identities and toolchain hashes matched the
neutral preflight; source/vector receipts were saved before candidate calls.

[Raw seal](evidence/v46-regression-732-mac/raw-manifest.json) preserves **5,865
artifacts /629,456,716 bytes**. The first scoring attempt stopped on
`Original selected cosine anchor`; it produced no native scores. The exact
[failure record](evidence/v46-regression-732-mac/first-score-failure.json) and
[log](evidence/v46-regression-732-mac/first-score.log) remain unchanged. Read-only
[diagnosis](evidence/v46-regression-732-mac/anchor-diagnosis.json) identifies Flint32
F08 fixed: selected subclause231–292 retains the containing body ID151–292,
without an explicit cosineAnchor. The saved ID/document/filename/body cosine
uniquely match; the frozen audit expected a full sentence at the selected start.

The user approved an **audit-only post-capture correction and separate scoring
attempt**. The [correction protocol](../eval/v46-regression-rescore/PROTOCOL.md)
and [correction freeze](../eval/v46-regression-rescore/correction-freeze.json)
disclose that timing; no pre-question status is claimed for that correction.
A separate adapter validates retained body ID, source identity, full literal
containment, unique saved sentence/vector and recorded query/body cosine before
using a temporary audit view. No captured result/source/vector is rewritten.
Explicit-anchor checks and native grade/preservation functions stay unchanged.

The separate `rescore-01` audit passes: **50,074 body cosines recomputed** and
four legacy-anchor bindings recorded (Flint32 F08 in fixed/section and both paired labels). Native results remain FAIL. The original
execution config,877-file freeze, pre-question amendment, candidate modules, first
failure and raw bytes are unchanged. Engineering logs show **11 new synthetic
tests,874 full units and28 strict Keyword checks PASS**; those are prior engineering
checks, not model-quality or new publication-time test runs.

## Separate binding and historical-change review

[Publication review](evidence/v46-regression-732-mac/review/publication-review.json)
records completed assistant review of **128 Fresh64 rows** and **40 changed
historical rows**. All64 Fresh64 fixed/section answer/filename/quote signatures
are identical, so the shared displayed evidence was inspected together and each
variant recorded separately. This is developer/author-aware assistant review,
not blinded human/external adjudication. No native PASS contradiction was found.
The review confirms the four incomplete comparisons below and20 historical
supported-question refusals; no native outcome was edited.

| Fresh64 case | Relevant side | Incomplete/wrong side |
| --- | --- | --- |
| FC58 | Museum collection relocation1909 | Workshop purchase-approval quote instead of warehouse move2013 |
| FC59 | Seed-depot next collection day/hold | River-station cold-sample temperature instead of cutoff departure/hold |
| FC61 | Library monthly mean25°C/August | Laboratory winter average12°C instead of monthly mean26°C/June |
| FC63 | Canal dispatch-counter move1917 | Survey-store retention instead of warehouse relocation1987 |

Changed historical cases are13 retention, five minimum-temperature and two approval
questions. All20 new outputs are uncited refusals despite supported original
evidence. Cobalt16 H03 remains **BLOCKED**, because its changed signature cannot
reuse an archived manual judgment. The separate source review observes the missing
two-year/safeguarding-exception answer; it does not invent a native manual PASS/FAIL
adjudication or erase the block.

Recorded refusal diagnostics show12 retention requests rejected as unaccounted
facets and Cobalt H03 rejected for scope; all five store/material/prop/alloy
minimum requests fail unique-document scope; the two purchase questions fail
complete-request parsing. These are saved diagnostics, not rerun planner probes.
The four Comparison question forms fall outside the current bounded Stage C
templates and inherit lexical selection. No source/candidate fix was made here.

Paired v43 provides a stable diagnostic: **668/668 historical displayed signatures
and native outcomes** match the accepted v43 run independently in each variant;
**64/64 Fresh64 paired signatures** match the original v43 first run. Current
v46 changes, rather than an observed paired-baseline drift, account for the
recorded differences. This comparison uses saved outputs only.

Original `manual_review:PENDING`/queue labels remain dated scoring checkpoints.
The separate completed review records reconcile required rows without modifying
that queue or score seal. Cobalt native adjudication remains BLOCKED.

## Publication, limitations and next priorities

[Completed native score seal](evidence/v46-regression-732-mac/rescore-01-manifest.json)
and the separate [review/publication seal](evidence/v46-regression-732-mac/review/manifest.json)
preserve raw/result/correction/first-failure references and new review/report bytes.
The approved publication makes no candidate change, model rerun, scorer retry or
native regrade. Original protocols, inputs, first results and source bytes remain.

Next agree a preservation-first repair design: restore supported retention forms
without removing scope guards, restore document/subentity minimum binding, preserve
supported approval wording/roles/units, then address complete original Comparison
relations per document. Protect those behaviors with general synthetic controls.
Implementation and any later model regression need separate approval/new freezes.
Do not repair by editing cases, keys or native gates or treating these exposed
inputs as unseen. A new prospective confirmation follows only after preservation
and exposed regression succeed.

Phase1 remains accepted for its original668-case v43 scope;103 original cases
remain excluded/untested and full771 is NOT RUN. First v43 Fresh64 confirmation
remains52/4/8 FAIL. Phase2 remains unaccepted, integration/release HOLD, and live
GroundedDesk remains5.6/r44.
