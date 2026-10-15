# GroundedDesk AI

**Ask questions about your documents, inspect the quotations, and open the original evidence—all in your browser.**

GroundedDesk is a free document intelligence portfolio project built with HTML, CSS and JavaScript. Start with Keyword search, optionally enable on-device MiniLM Hybrid retrieval, or compare documents using separate lexical tools. No account, paid inference API or application backend is required.

**[Open the live app](https://arjun9669.github.io/GroundedDesk-AI/?build=20261013-r44)** · [Engineering case study](./docs/CASE_STUDY.md) · [Security and privacy](./docs/SECURITY.md) · [Changelog](./CHANGELOG.md)

## Current status

| Area | Status |
|---|---|
| Live application | **GroundedDesk 5.6**, retrieval build **`2026-10-13-r44`** |
| Latest retrieval experiment | **v21** improves Binding64 but introduces three prior-PASS regressions; **gate FAIL**, not adopted |
| Latest recorded checks | **392 unit tests** and strict offline evaluation pass locally; actual-model regression gate fails |
| Hosting and inference | Free GitHub Pages hosting; optional models run on device after public downloads |
| Release maturity | Educational prototype; **6.0 readiness has not been established** |

Experimental v21 is a development iteration, not retrieval build r21 or a new application release. A passing development gate does not establish production readiness or independent accuracy.

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

## Latest measured results

The [v21 report](./docs/COVERAGE_V21_R44_VALIDATION.md) records **515 previously exposed questions captured once** in installed headless Chrome with actual local MiniLM, Qwen off: 487 Hybrid Q&A and 28 separate lexical Comparison. Actual production UI, isolated fixed/section v21 outputs and paired v20 are labelled separately. These are **in-sample regressions**, not new independent accuracy.

Binding64 reaches **60 PASS / 1 PARTIAL / 3 FAIL** in both variants, preserving its qualified v20 first **45/1/18**. All 12 unsupported controls now refuse with zero citations, all eight conditions pass, and all four Comparison cases pass after heading removal; their facts were already complete in v20. But three previous PASS cases regress: **V9Exposed32/F17** (Norwood false refusal), **RetrievalQuality28/RQ02** (truncated subject and irrelevant quotation filler), and **Binding64/T4A** (tagging false refusal). All original 119 and Precision48 remain all PASS. **Both gates FAIL; v21 stays experimental and live r44 is unchanged.** [Scores and selected evidence](./docs/evidence/coverage-v21-r44/).

Previous results remain preserved:

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

Next work is a separately frozen repair protocol for v21's overbroad negation handling, action morphology and mid-sentence cutoff selection, followed by preservation tests. Keep the failed v21 result and every historical first score fixed. No candidate replaces live r44 until its required gates pass and integration is reviewed.

## Explore the project

- [Engineering case study](./docs/CASE_STUDY.md) — design decisions and implementation context.
- [Evaluation protocol](./docs/EVALUATION_PROTOCOL.md) — how to interpret checks and measured claims.
- [Document readiness](./docs/DOCUMENT_READINESS_5_6.md), [PDF review](./docs/SIDE_BY_SIDE_PDF_5_6.md), [file selection](./docs/ASK_FILE_SELECTION_5_6.md) and [local workspace](./docs/LOCAL_WORKSPACE_5_6.md) — feature scope and validation.
- [Changelog](./CHANGELOG.md), [benchmark history](./docs/BROWSER_BENCHMARK_HISTORY.md) and [archived README](./docs/README_HISTORY.md) — preserved development records.

No project software license has been selected; this README does not grant a new license. Third-party dependencies and published evaluation materials retain their own licenses and attribution. [Author: Arjun](https://github.com/arjun9669).
