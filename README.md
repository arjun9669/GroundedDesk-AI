# GroundedDesk AI

**Ask questions about your documents, inspect the quotations, and open the original evidence—all in your browser.**

GroundedDesk is a free document intelligence portfolio project built with HTML, CSS and JavaScript. Start with Keyword search, optionally enable on-device MiniLM Hybrid retrieval, or compare documents using separate lexical tools. No account, paid inference API or application backend is required.

**[Open the live app](https://arjun9669.github.io/GroundedDesk-AI/?build=20261013-r44)** · [Engineering case study](./docs/CASE_STUDY.md) · [Security and privacy](./docs/SECURITY.md) · [Changelog](./CHANGELOG.md)

**Development handoff:** [Current project status and decisions](./PROJECT_STATUS.md) · [macOS/Windows setup and GitHub synchronization](./docs/DEVELOPMENT.md).

## Current status

| Area | Status |
|---|---|
| Live application | **GroundedDesk 5.6**, retrieval build **`2026-10-13-r44`** |
| Latest isolated candidate | **v49 complete regression FAIL**:63 PASS/1 FAIL Fresh64 per variant;17/19 historical gates. Candidate remains unadopted |
| Phase 1 | **COMPLETE under the explicitly approved 668-case scope**, decision `PH1-668-20261021` |
| Current phase | **2 — first Fresh64 confirmation and latest v49 regression FAIL**; integration HOLD |
| Latest recorded engineering checks | **1015 unit tests / 28 strict bundled Keyword checks PASS**; separate from actual-model quality results |
| Hosting and inference | Free GitHub Pages hosting; optional models run on device after public downloads |
| Release maturity | Educational prototype; integration **HOLD** and **6.0 readiness not established** |

The [6.0 working roadmap](./docs/ROADMAP_6_0.md) has five phases. The following
phase 1 summary reflects the approved decision on **21 October 2026**; earlier
reports remain dated checkpoints and preserve their original failures and holds.

## Latest result — v49 complete regression FAIL

[Attempt3 completed all732 cases](./docs/V49_REGRESSION_FAILED_RESULTS.md):684
actual MiniLM Hybrid submissions and48 lexical Comparisons. Integrity passed with
50,074 recomputed body cosines; native scoring still failed:

- Fresh64: **63 PASS/0 PARTIAL/1 FAIL** in each variant;64/64 was required.
- Historical preservation: **17/19 family gates PASS**; five original PASS losses
  remain per variant. All prior v46 PASS rows are preserved.

The earlier startup-only and515-record partial attempts remain blocked/unscored.
A prospectively published amendment distinguishes expanded displayed quotations
from their original ranking-body cosines;40 such bindings and4 legacy bindings
are disclosed. Separate author-aware review found no native PASS contradiction.
No candidate, frozen key or native score was rewritten. Six unresolved cases
remain: current-document scope, four retention review tails, and monthly location
semantics. **Phase2/integration HOLD; live5.6/r44 unchanged.**

## Earlier result — v46 regression FAIL

One approved capture completed **732 cases**: 668 historical plus 64 exposed
Fresh64, with 684 actual MiniLM Hybrid submissions and 48 lexical Comparisons.
After preserving an initial anchor-audit block, an approved audit-only correction
scored the same unchanged capture. The integrity audit passed, but acceptance failed:

- Fresh64: **60 PASS / 4 PARTIAL / 0 FAIL** in each variant; 64/64 was required.
- Historical preservation: **10/19 family gates PASS**. The same 20 prior PASS
  cases were lost in each variant: 19 native FAIL and one manual-family BLOCKED.

Separate review confirms all four incomplete comparisons and the changed historical
refusals. Original native outcomes and both audit failures remain preserved.
No candidate changes, model reruns or scoring retries occurred during publication.
See the [failed-study report](./docs/V46_REGRESSION_FAILED_RESULTS.md) and
[separate review](./docs/evidence/v46-regression-732-mac/review/publication-review.json).
The [preservation-first repair design](./docs/V47_PRESERVATION_REPAIR_DESIGN.md)
now defines three work packages: scope/retention, minimum/approval, then Comparison.
[Package 1 scope/retention](./docs/V47_PACKAGE1_ENGINEERING.md),
[package 2 minimum/approval](./docs/V48_PACKAGE2_ENGINEERING.md) and
[package 3 Comparison/events](./docs/V49_PACKAGE3_ENGINEERING.md) now have isolated
implementations. Package 3 passes32 targeted,972 full unit and28 Keyword checks
after approved corrections; its original24/6 failure remains preserved. Those
engineering checks preceded the complete failed regression reported above. The
[v49 732-case protocol/input/candidate freeze](./docs/V49_REGRESSION_PREPARATION.md)
now retains original scope and criteria with prospective anchor-audit controls.
[V49 execution readiness](./docs/V49_EXECUTION_READY.md) now passes22 targeted
tooling controls,994 units and28 Keyword checks, with fresh neutral Chrome/MiniLM
preflight and a970-file execution freeze. The user authorized capture after verified
GitHub publication. The first capture stopped during startup with zero study
questions; a [separate attempt2 freeze](./docs/V49_STARTUP_RETRY.md) now uses a
verified loopback server. Attempt2 then stopped on its strict anchor-containment
rule after515 saved records. A [prospective attempt3 amendment](./eval/v49-expanded-anchor-regression/PROTOCOL.md)
now distinguishes expanded displayed quotes from their original ranking-body
cosines;1015 units/28 Keyword checks pass. Both incomplete attempts remain
blocked/unscored. The complete attempt3 result is reported above.
**Phase 2 and integration remain HOLD; live 5.6/r44 is unchanged.**

## Original phase 2 Fresh64 confirmation — FAIL

On **24 October 2026**, one capture completed all 64 fresh cases: 56 actual local
MiniLM Hybrid questions and eight lexical Comparisons, Qwen off. Both unchanged
v43 variants scored **52 PASS / 4 PARTIAL / 8 FAIL**, below the frozen 64/64 target.
There were no question retries or execution errors. Source/vector integrity passed;
the separate binding review confirms the first grades. Five unsupported questions
received cited answers, two supported questions were refused, one retention
question received unrelated text, and four comparisons missed one side's facts.

[Full report and remaining work](./docs/PHASE2_FRESH64_FIRST_RESULTS.md) ·
[Original scorecard](./docs/evidence/phase2-fresh64-mac/score/native-scorecard.json) ·
[Separate binding review](./docs/evidence/phase2-fresh64-mac/review/binding-review.json).
Original scores, inputs, rubrics and evidence remain unchanged. Fresh64 is now an
exposed regression set; a passing replay cannot replace this failed confirmation.
**Phase 2 remains incomplete and live 5.6/r44 stays unchanged.**

## Phase 1 — broader regression: completed under revised scope

The user approved [decision PH1-668-20261021](./docs/PHASE1_REVISED_ACCEPTANCE.md)
accepting the **668 cases with verified original inputs across 19 families**.
The [first combined v43 study](./docs/V43_ALL_AVAILABLE_MAC_RESULTS.md) captured
all of them once: **628 actual local MiniLM Hybrid questions and 40 separate
lexical Comparisons**, with Qwen off. Both fixed and section variants used the
unchanged isolated v43 candidate, with paired v42 for preservation checks.
The Mac run used Chrome 155.0.8059.85, Node 24.19.0 on Apple silicon and MiniLM
q8 WASM. This scope does not qualify Windows, Safari, optional Qwen or PDF workflows.

**All 19 native regression gates PASS; this does not mean 668/668 correct answers.**
No prior PASS was lost in either variant, and there were no new unsupported false
acceptances, supported false refusals, execution errors or question retries.
The historical public-data failures below remain failures. This is exposed
regression evidence, not fresh confirmation or independent accuracy.

### Results by family

Each variant cell is **PASS / PARTIAL / FAIL**. All families have zero ERROR and
BLOCKED results. Native gates preserve each family's original criteria; grades
from different corpora and rubrics are not pooled into one accuracy percentage.

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

### Known failed answers remain open

The original public-sample gates allow these known failures outside their
constructed-control subset gates. Passing preservation gates does not resolve them.

| Case | Fixed | Section | Remaining limitation |
| --- | --- | --- | --- |
| ExternalSQuAD24 E08 | FAIL | FAIL | Quotation omits the requested window location |
| ExternalSQuAD24 E24 | FAIL | PASS | Fixed quotes compounds instead of the requested energy content |
| FreshConfirmation32 F07 | FAIL | PASS | Fixed selects a different paragraph and misses the keyed characterization |
| FreshConfirmation32 F09 | FAIL | FAIL | Quotation omits the requested actor |
| FreshConfirmation32 F10 | FAIL | FAIL | Supported publication date receives an uncited refusal |

### Excluded inputs remain untested

| Missing original pack | Cases | Status |
| --- | ---: | --- |
| Lantern32 | 32 | Original complete bundle unavailable; untested |
| Aster32 | 32 | Original complete bundle unavailable; untested |
| Meridian24 | 24 | Original external input bundle unavailable; untested |
| Atlas15 | 15 | Original PDFs/run identities unavailable; untested |
| **Total** | **103** | **Excluded from revised acceptance; not marked PASS** |

The original private combined configuration is also unavailable. **The full
771-case historical gate is NOT RUN.** The new available-input configuration is
not a recovery of that original configuration. Missing-input recovery remains
open; archived answers, quotations or synthetic substitutes cannot replace the
original source bytes. Phase 1 closure applies only to the approved 668-case scope.

### Verification and preserved evidence

The study verified 75 original source texts, the 827-file execution freeze,
40,030 recomputed body cosines, 54 facet anchors and the original direct-span gates.
All 1,336 variant answer/quote signatures match prior recorded results after
whitespace normalization; 6,591 selected historical artifact hashes remain intact.
The [evidence manifest](./docs/evidence/v43-all-available-mac/manifest.json) seals
5,352 artifacts, with [per-family native scorecards](./docs/evidence/v43-all-available-mac/score/native-scorecards.json)
and separate integrity/manual review linked from the [full report](./docs/V43_ALL_AVAILABLE_MAC_RESULTS.md).
Accepted evidence commit: `e2bbc6266e4f69395b37afd503f82131df4e97eb`;
[its CI passed](https://github.com/arjun9669/GroundedDesk-AI/actions/runs/39475873673).

The initial engineering validation recorded **767 PASS / 3 FAIL out of 770** from
an overlapping input/native-reference check. Work stopped, and the user approved
separate category validation retaining every hash, duplicate guard and a conflicting-
hash negative control. The corrected suite passed **771/771**, alongside **28/28
strict Keyword checks**. The first failure and approved correction logs remain
unchanged. These engineering counts are not model-case counts or quality scores.
All earlier first failures, blocked runs, rubrics and original evidence remain preserved.

### Phase 2 handoff and release boundary

[Fresh64 inputs and protocol](./eval/phase2-fresh64/PROTOCOL.md) froze eight fictional
TXT documents and 64 questions: 40 supported Hybrid, 16 unsupported Hybrid and
eight lexical Comparisons. The execution setup and explicit Chrome .86 environment
amendment reached GitHub before the first capture. The
[first result](./docs/PHASE2_FRESH64_FIRST_RESULTS.md) failed the strict 64/64 target
in both variants. This is author-created targeted confirmation, not blinded external
validation or a representative accuracy benchmark.

The [repair design](./docs/FRESH64_REPAIR_DESIGN.md) proposes unsupported approval/
reference contracts first, then supported relation and Comparison repairs.
[Stage A in v44](./docs/V44_STAGE_A_ENGINEERING.md),
[Stage B in v45](./docs/V45_STAGE_B_ENGINEERING.md), and
[Stage C in v46](./docs/V46_STAGE_C_ENGINEERING.md) have isolated bounded
implementations. Their engineering checks passed, but the subsequent
[732-case study](./docs/V46_REGRESSION_FAILED_RESULTS.md) failed historical
preservation and the exposed Fresh64 gate. The original v45 scope failure,
v46 audit failures, execution freeze and approved corrections remain archived.
Current engineering evidence records 874 unit/28 Keyword checks PASS; that does
not override the model-quality failure. No candidate is adopted.
Preserve the 668-case regression scope and use Fresh64 only
as exposed regression after any fix. New prospective confirmation
requires a separately frozen unseen pack. Isolated engineering does not authorize
model reruns or live integration.

**Live GroundedDesk remains 5.6 / r44; v43 is not adopted.** Revised phase 1 acceptance
does not approve integration or a 6.0 release. Fresh confirmation, integration,
performance/memory, broader device/browser/PDF validation and release qualification
remain open. See [current project status](./PROJECT_STATUS.md) and the
[five-phase roadmap](./docs/ROADMAP_6_0.md) for the continuing plan.

## Historical development checkpoints

The following summaries preserve earlier experiments. Their dated failures and
holds remain valid historical results; the current phase 1 decision and v43 scope
are described above.

The [Prism32 first prospective v36 confirmation](./docs/PRISM32_V36_CONFIRMATION.md) records **29 PASS / 0 PARTIAL / 3 FAIL** in both variants. **Confirmation gate FAIL; integration-readiness work is stopped.** [Exact answers and JSON](./docs/evidence/prism32-v36/REVIEWED_SCORECARD.json) preserve every original result. P04 falsely refuses supported cutoff/hold evidence; P10 and P17 quote unrelated history/acknowledgement instead of packet contents and retention. All eight unsupported cases refuse uncited; citations are 28/28 literal but 26/28 relevant. P04 loses a production-baseline PASS, inherited from v35; no paired-v35 PASS is lost. This is author-created prospective stress confirmation, not externally blinded independent accuracy. No retries, input/rubric/code edits or replacement set. Live 5.6/r44 remains unchanged; capacity expansion stays deferred.

The isolated [v36 real Chrome/MiniLM regression](./docs/COVERAGE_V36_R44_VALIDATION.md) records native gate **PASS** and engineering review **PASS** across 707 exposed cases. Lumen32 records **32/0/0 fixed / 32/0/0 section** under its unchanged key and strict context-precision criteria. [Every exact answer and JSON scorecards](./docs/evidence/coverage-v36-r44/ALL_SCORECARDS.json) preserve all results. **Live 5.6/r44 remains unchanged; v36 is not adopted.**

V36 trims only uniquely anchored literal maintenance/bullet inventory quotations and refuses undifferentiated same-object renewal dates. Actual finite source-body cosine anchors remain recorded for refined Hybrid evidence; lexical Comparisons remain separate. That exposed regression qualified v36 for prospective confirmation; the later Prism32 first confirmation above failed. Integration review is stopped. Adoption, integration qualification and 6.0 readiness remain unestablished.

The 707 cases used 655 actual local MiniLM Hybrid questions and 52 lexical Comparisons, Qwen off, installed headless Chrome. All are exposed in-sample regressions, not new independent accuracy or 707/707. Older public-set failures remain visible and different rubrics are not pooled. Performance, memory, citation-navigation/export integration and 6.0 readiness remain unestablished.

[Lumen32's first 28/2/2 confirmation FAIL](./docs/LUMEN32_V35_CONFIRMATION.md), [v35 exposed 675 PASS and separate engineering PASS](./docs/COVERAGE_V35_R44_VALIDATION.md), [v34's original engineering FAIL/HOLD](./docs/COVERAGE_V34_R44_VALIDATION.md), [v33's first FAIL](./docs/COVERAGE_V33_R44_VALIDATION.md), [Hearth32's original BLOCKED/ungraded first attempt](./docs/HEARTH32_V32_CONFIRMATION.md), all older firsts, failures and explicit reporting errata remain unchanged. No first result was replaced or retrospectively rescored.

The previous [v37 isolated real Chrome/MiniLM regression](./docs/COVERAGE_V37_R44_VALIDATION.md) records 739 exposed cases gate **PASS** and engineering review **FAIL**. It targets the three preserved Prism32 failures with scoped literal policy selection. [Per-case JSON](./docs/evidence/coverage-v37-r44/ALL_SCORECARDS.json) retains all outcomes. Prism32 first 29/0/3 FAIL and every historical first result remain unchanged. Live 5.6/r44 and upload limits remain unchanged. This is an in-sample regression, not new independent accuracy. A separate post-seal synthetic intent probe found that the cutoff handler can override a justified refusal with departure information for a different question; integration is **HOLD** and fresh confirmation is **NOT RUN**.

The [isolated v38 regression](./docs/COVERAGE_V38_R44_VALIDATION.md) records 739 exposed cases with native gate **PASS** and engineering **PASS**, including the unchanged original refusal-intent controls. [Vela32 first prospective confirmation](./docs/VELA32_V38_CONFIRMATION.md) records **30/0/2 fixed and 30/0/2 section**, gate **FAIL**. These are separate test sets, not pooled or external independent accuracy. All previous first results and v37's engineering FAIL remain immutable. **Live 5.6/r44 and upload limits remain unchanged; v38 is not adopted.** Fresh confirmation failure or blocker stops integration; a pass only qualifies for later integration review.

## Try it in a few minutes

1. [Open GroundedDesk](https://arjun9669.github.io/GroundedDesk-AI/?build=20261013-r44). Try the bundled examples, or clear them and choose your own files.
2. Use **Ask** for a question, **Compare** for two selected documents, or **Research** for a broader lexical evidence scan.
3. Read every quotation and filename. Choose **Open cited PDF page** for a uniquely located PDF quote to inspect the original.
4. Copy or download the Markdown evidence report. For local Hybrid search, open **Search & answer settings** and enable MiniLM. Qwen generation can remain off.

Sample questions:

- How are AI use cases reviewed before launch?
- Where is document metadata stored?
- How can an office reduce electricity use?
- What is the capital of Mars? *(The bundled documents should not support an answer.)*

Use **Quick guide** in the app for a short walkthrough. **Ctrl/Cmd + Enter** submits a question; Enter adds a line.

## What you can do

| Capability | What it provides |
|---|---|
| Document library | TXT, Markdown and text-based PDF intake; readiness feedback, replacement and removal |
| Ask | Keyword or optional MiniLM Hybrid retrieval; search all files or selected files |
| Evidence review | Verbatim quotations, filenames, physical PDF page references and normalized text line references |
| PDF preview | Original-page navigation, desktop side-by-side review and approximate highlights for supported unique text-run matches |
| Compare and Research | Separate lexical excerpts; numbered-policy review and candidate checklists |
| Reports and history | Markdown exports and session question history with the original source selection |
| Optional workspace save | Explicit local document snapshot; restore re-extracts PDFs and starts optional models off |

Comparison, Research and policy tools do **not** use MiniLM Hybrid. Policy checklists are bounded extraction tools, not compliance audits. PDF highlights locate text; they do not verify factual support.

![Workspace interface captured during r33 validation](./docs/evidence/r33/workspace/01-desktop-start.png)

*Historical r33 interface capture. The current live build is r44; this is not a new deployment screenshot.*

## Search and answer modes

| Mode | Execution | Important boundary |
|---|---|---|
| Keyword | Local BM25-style retrieval; available immediately | Can miss paraphrases or select incomplete evidence |
| Hybrid | `Xenova/all-MiniLM-L6-v2` q8 embeddings in local WASM, combined with lexical ranking | Requires a public library/model download; ranking is not factual verification |
| Optional generated draft | Local `onnx-community/Qwen2.5-0.5B-Instruct` through WebGPU | Device support varies; citation ID checks do not prove factual support |

Extractive quotations are the default. Optional models download only when enabled. Initial model/PDF dependency downloads require network access, so the app is not fully offline from first use.

## Files, storage and limits

- **Supported:** `.txt`, `.md`, `.markdown` and PDFs with searchable text. OCR is not included.
- **Intake limits:** 15 documents per session, 5 MB per file, 75 PDF pages and 180,000 extracted characters per document.
- **MiniLM limit:** 72 indexed passages per session; memory and performance vary by device.
- Files stay in browser memory unless you explicitly choose **Keep this workspace → Save on this device**. The snapshot uses this browser's IndexedDB and is not encrypted by the app.
- Snapshots contain documents and Ask selection, not questions, answers, drafts, embeddings or enabled model settings. Save again after changes; clearing browser data may erase the snapshot.
- The app does not intentionally send document contents to a backend. Public dependency downloads, browser extensions, device security and exported reports have separate privacy boundaries. See [Security and privacy](./docs/SECURITY.md).

Readiness describes available extracted text. Blank/scanned pages, reading order, columns and table relationships still need original-document review. Repeated or unsupported quotation locations receive an explanation rather than a fabricated page match.

## Historical measured results

The [Bracken32 report](./docs/BRACKEN32_V25_CONFIRMATION.md) preserves the first **21 PASS / 1 PARTIAL / 10 FAIL** in both unchanged v25 variants on four new fictional documents:28 actual local MiniLM Hybrid questions and 4 separate lexical Comparisons, captured once. This is prospective author-created stress testing. A Chrome patch change from155.0.8059.40 to155.0.8059.80 was detected and explicitly amended/frozen before any model, uploads or questions; it qualifies comparison with older runs. All33 quotations are literal, but24 are relevant. Five unsupported controls do not refuse; two supported questions falsely refuse. All4 Comparisons pass. No prior paired-v24 PASS is lost, but two previously incorrect cited answers become false refusals. **Confirmation FAIL; performance/integration qualification stopped.** Preserve this first result; Bracken32 is now exposed for future regression.

The [v25 regression report](./docs/COVERAGE_V25_R44_VALIDATION.md) records **Cedar32 32 PASS / 0 PARTIAL / 0 FAIL** both, after its preserved [first prospective 24/2/6](./docs/CEDAR32_V24_CONFIRMATION.md). A single real headless-Chrome/MiniLM run captured547 unchanged exposed cases:515 Hybrid and32 separate lexical Comparisons. Only six Cedar32 refusals and two Comparison excerpts change; all515 older answers/quotes match paired v24. Cedar32 has29/29 source-literal/relevant citations, all103 unsupported controls refuse uncited, and no prior PASS is lost. Binding64 and historical451 gates remain PASS. Five older public-case failures remain; this is not547/547 or independent accuracy. **V25 is not adopted; live r44 stays unchanged.**

Earlier results remain preserved:

The [v24 follow-up report](./docs/COVERAGE_V24_R44_VALIDATION.md) records **64 PASS / 0 PARTIAL / 0 FAIL** on the unchanged Binding64 rubric in both isolated variants, with no lost prior PASS. It captures the same 515 exposed questions once with real local MiniLM, Qwen off: 487 Hybrid and 28 separate lexical Comparison. F05 is repaired by a unique literal-date fallback inside the selected document, retaining its actual 0.2406 cosine unchanged. F08/C02 fixes from v23 and all 95 unsupported zero-citation refusals remain correct. All 58 Binding64 citations are source-literal, expected-paragraph-contained and include a required frozen span.

Both frozen development gates **PASS**, but this is **in-sample frozen-key compliance**, not 515/515, new independent accuracy or full question entailment. Known temperature wording qualifications remain below. **v24 is not adopted; live r44 stays unchanged pending separately frozen confirmation and integration review.** [Scores and selected evidence](./docs/evidence/coverage-v24-r44/).

V23 and v24 are **two separate 515-case runs with different frozen candidates**. V23's first 63/0/1 was committed and archived before v24 implementation; it is not overwritten or relabelled as a pass:

The [v23 report](./docs/COVERAGE_V23_R44_VALIDATION.md) preserves its first **63 PASS / 0 PARTIAL / 1 FAIL** Binding64 result in both isolated variants. F08 and C02 now display the missing winter-average evidence; F05 still excludes the correct event/date sentence because its actual cosine is 0.2406, below the frozen 0.35 minimum. The same 515 exposed cases were captured once with actual local MiniLM in installed headless Chrome, Qwen off; no prior PASS was lost and all 95 unsupported controls still refuse without citations. Overall gate **FAIL**, r44 unchanged. [Scorecards and selected evidence](./docs/evidence/coverage-v23-r44/).

Frozen-key grades retain wording limits: F07/C02 ask about a monthly temperature while the source/key gives a maximum since WWII; F08/C02 give a winter-average bound, not an absolute low. These results are in-sample development evidence, not independent accuracy or a release.

The [v22 report](./docs/COVERAGE_V22_R44_VALIDATION.md) records the same **515 exposed questions captured once** with actual local MiniLM in installed headless Chrome, Qwen off: 487 Hybrid and 28 separate lexical Comparison cases. **All three v21 regressions are restored**: Norwood's 61-yard return, Orchard's complete departure sentence without filler, and the supported tagging count. Only these three cases change; their displayed quotations exactly match historical v20. No prior PASS is lost, and the historical 451-case gate returns to PASS.

Binding64 reaches **61 PASS / 1 PARTIAL / 2 FAIL** in both isolated variants. All 95 unsupported controls across the sets refuse without citations. Binding64's unchanged F05/F08 failures and C02 incomplete compound keep its strict gate—and the overall gate—at **FAIL**. This is **in-sample regression**, not new independent accuracy. **Live r44 stays unchanged; v22 is not adopted.** [Scorecards and selected browser evidence](./docs/evidence/coverage-v22-r44/).

Previous results remain preserved:

The [v21 report](./docs/COVERAGE_V21_R44_VALIDATION.md) records **515 previously exposed questions captured once** in installed headless Chrome with actual local MiniLM, Qwen off: 487 Hybrid Q&A and 28 separate lexical Comparison. Actual production UI, isolated fixed/section v21 outputs and paired v20 are labelled separately. These are **in-sample regressions**, not new independent accuracy.

Binding64 reaches **60 PASS / 1 PARTIAL / 3 FAIL** in both variants, preserving its qualified v20 first **45/1/18**. All 12 unsupported controls now refuse with zero citations, all eight conditions pass, and all four Comparison cases pass after heading removal; their facts were already complete in v20. But three previous PASS cases regress: **V9Exposed32/F17** (Norwood false refusal), **RetrievalQuality28/RQ02** (truncated subject and irrelevant quotation filler), and **Binding64/T4A** (tagging false refusal). All original 119 and Precision48 remain all PASS. **Both gates FAIL; v21 stays experimental and live r44 is unchanged.** [Scores and selected evidence](./docs/evidence/coverage-v21-r44/).

The [Binding64 confirmation report](./docs/BINDING64_V20_CONFIRMATION.md) records **45 PASS / 1 PARTIAL / 18 FAIL** in both isolated v20 variants. Its original startup attempt was **BLOCKED before model loading or questions**. A separately frozen infrastructure recovery produced the first 64 answers once in installed headless Chrome with actual local MiniLM: 60 Hybrid and four separate lexical Comparison cases. This is a qualified prospective public/constructed test, not sealed independent accuracy. Every candidate answer matches paired v19.

All 12 supported count cases pass, but all eight unsupported actor/action combinations are falsely accepted. Four exact-cutoff/exception cases fail; no supported false refusals occur. All 66 citations per variant are source-literal, which does not establish relevance or relational support. Four Comparison cases contain all requested facts but fail the unchanged body-paragraph boundary rule. **Confirmation gate FAIL: keep v20 experimental.** [Exact answers, scores and browser evidence](./docs/evidence/v20-binding64/).

The [v20 report](./docs/COVERAGE_V20_R44_VALIDATION.md) records **451 exposed cases captured once** in installed headless Chrome with real local MiniLM, Qwen off: **427 Hybrid Q&A** and **24 separate lexical Comparison** cases. Production UI answers and isolated experimental outputs are labelled separately.

| v20 check | Result in both experimental variants |
|---|---|
| Frozen regression gate | **PASS**, no historical PASS lost |
| V9Exposed32 | **32 PASS / 0 PARTIAL / 0 FAIL**, restoring the Norwood 61-yard return quotation |
| Precision48 | **48 PASS / 0 PARTIAL / 0 FAIL**, unchanged from v19; 37/37 directly relevant, source-literal citations |
| Known unsupported questions | **83 explicit refusals with zero citations** |

This is **in-sample regression, not new independent accuracy or 451/451 correct answers**. Older public failures outside the required gate sets—including a supported false refusal—remain in the report. Precision48's first **40 PASS / 0 PARTIAL / 8 FAIL** in both variants and v19's **failed** overall gate remain unchanged. Do not pool different corpora and rubrics into one accuracy claim.

The PR's first synthetic PDF UI smoke attempt failed an unchanged overlay-size assertion after viewport resizing. One unchanged CI retry and a separate local real-Chrome PDF diagnostic passed; main-branch CI then passed on its first attempt. **No benchmark question was retried.** [PR #83 and CI qualification](https://github.com/arjun9669/GroundedDesk-AI/pull/83).

A subsequent 84-resize diagnostic did not reproduce that failure and detected an intentional 8-pixel distortion. The test now samples both boxes in one browser task after two fixed animation frames, retaining the original less-than-1-pixel tolerance. The original cause remains unconfirmed; PDF runtime code is unchanged. [Diagnostic and evidence](./docs/BINDING64_V20_CONFIRMATION.md#pdf-highlight-test-investigation).

See the [v20 results and limitations](./docs/COVERAGE_V20_R44_VALIDATION.md), [public evidence and scorecards](./docs/evidence/coverage-v20-r44/) and [original Chrome benchmark history](./docs/BROWSER_BENCHMARK_HISTORY.md). The previous long-form README and its experiment links are preserved in the [development archive](./docs/README_HISTORY.md).

## Run locally

No frontend build step is needed. Clone the repository and serve it over HTTP:

```bash
git clone https://github.com/arjun9669/GroundedDesk-AI.git
cd GroundedDesk-AI
python -m http.server 8765
```

Open [localhost:8765](http://localhost:8765). Use a browser with WASM support for MiniLM and WebGPU support for optional Qwen generation. Device compatibility and model memory requirements vary; physical-phone coverage remains limited.

For a hosted build check, inspect the app footer and a newly generated evidence report. The current retrieval build is `2026-10-13-r44`; an experimental coverage version does not change it.

## Development and checks

With **Node.js 22+**, run the dependency-free unit suite and strict bundled-corpus evaluation:

```bash
node --test tests/*.test.mjs
node eval/run.mjs --strict
node eval/run.mjs --json > evaluation.json
```

[CI](./.github/workflows/ci.yml) also runs syntax checks and synthetic Chromium UI/PDF checks using separately installed Playwright/PDF.js tools. The bundled evaluation is a small fictional **Keyword** test. Unit mocks and synthetic UI checks are not real MiniLM or Qwen accuracy measurements; actual-model browser studies are reported separately.

[Pages deployment](./.github/workflows/pages.yml) publishes the exact main-branch commit that passed CI. This repository is the active source; the earlier profile-hosted demo is historical.

## Limitations and next steps

GroundedDesk is a portfolio prototype, not a production-ready RAG, compliance or security product. A source-authentic quotation can still be irrelevant or incomplete, and a correctly numbered generated citation can still fail to support a claim. Inspect the displayed evidence and original document.

OCR, reliable table/column reconstruction, character-level partial-run highlights, comprehensive prompt-injection defenses and broad browser/device validation are not provided. Model availability, performance and memory use vary by device.

Phase 1 is complete only under the [approved 668-case scope](./docs/PHASE1_REVISED_ACCEPTANCE.md).
The five known public-data case limitations remain open, 103 missing original
cases remain untested, and full 771-case coverage is not claimed. The
[first Fresh64 confirmation failed](./docs/PHASE2_FRESH64_FIRST_RESULTS.md). Repair
implementation and new prospective confirmation remain open; later integration and
product/release qualification stay on hold. The [combined v43 report](./docs/V43_ALL_AVAILABLE_MAC_RESULTS.md) and
[current project status](./PROJECT_STATUS.md) distinguish these results from
historical candidate failures. Live r44 and upload limits remain unchanged.

## Explore the project

- [Engineering case study](./docs/CASE_STUDY.md) — design decisions and implementation context.
- [Evaluation protocol](./docs/EVALUATION_PROTOCOL.md) — how to interpret checks and measured claims.
- [Document readiness](./docs/DOCUMENT_READINESS_5_6.md), [PDF review](./docs/SIDE_BY_SIDE_PDF_5_6.md), [file selection](./docs/ASK_FILE_SELECTION_5_6.md) and [local workspace](./docs/LOCAL_WORKSPACE_5_6.md) — feature scope and validation.
- [Changelog](./CHANGELOG.md), [benchmark history](./docs/BROWSER_BENCHMARK_HISTORY.md) and [archived README](./docs/README_HISTORY.md) — preserved development records.

No project software license has been selected; this README does not grant a new license. Third-party dependencies and published evaluation materials retain their own licenses and attribution. [Author: Arjun](https://github.com/arjun9669).
