# GroundedDesk AI

**Free, browser-first document intelligence portfolio project.** Upload text, Markdown or text-based PDF documents, inspect source-backed answers, optionally enable local semantic embeddings and a local small language model, and create multi-document research reports.

**[Live GroundedDesk AI 5.0](https://arjun9669.github.io/GroundedDesk-AI/)** · [Engineering case study](./docs/CASE_STUDY.md) · [Security and privacy boundaries](./docs/SECURITY.md) · [Change history](./CHANGELOG.md) · [Author](https://github.com/arjun9669)

> This is the **dedicated source repository and live static site**, deployed through free GitHub Pages. The app runs its own [GitHub Actions CI](./.github/workflows/ci.yml) and [Pages workflow](./.github/workflows/pages.yml). The original profile-hosted demo remains available separately. Model and PDF dependencies require public downloads when enabled; no paid inference account is needed.

## Features

| Milestone | Capability | Execution |
| --- | --- | --- |
| 1.0 | Browser file intake, BM25-style passage ranking, verbatim citations, Markdown evidence reports | Local JavaScript |
| 2.0 | Optional MiniLM q8 semantic embeddings, cosine similarity and reciprocal-rank hybrid retrieval | Local WASM via Transformers.js |
| 3.0 | Optional small Qwen2.5 0.5B WebGPU generative drafts with structurally verified source IDs, fallback extracts and session conversation | Local WebGPU; device support required |
| 4.0 | Multi-document keyword research, comparison, source-coverage gaps, basic instruction-shaped-text warnings and export | Local deterministic research workflow |
| **5.0** | **Measured on-device keyword evaluation dashboard, strict citation integrity gating, stale-result prevention, detailed case study and regression tests** | **Local JavaScript and GitHub Actions** |
| **5.1 Phase 1** | **Dedicated multi-section policy evidence scanning, numbered-clause grouping, bounded quotations, coverage limitations and Markdown export** | **Separate local deterministic Research workspace; Keyword mode unchanged** |

No paid model inference, authentication, cloud database or backend is part of this educational reference implementation. Public model/CDN files must be downloaded when enabling semantic, local generation or PDF parsing; those downloads are not entirely offline. The app does not intentionally upload user document contents to a backend.

## Quick start

The app is a static ES-module website. From the repository root:

```bash
python -m http.server 8765
```

Visit **http://localhost:8765**. Sample documents are included; uploaded files stay in the current browser session's memory. Supported file types: `.txt`, `.md`, `.markdown`, and text-based `.pdf` (PDF.js from a pinned public CDN). Scanned PDFs without selectable text require separate OCR, which is not included. The app limits file and extracted-text size; mobile browsers may struggle with the large optional model.

### Demo questions

- How are AI use cases reviewed before launch?
- Where is document metadata stored?
- How can an office reduce electricity use?
- What is the capital of Mars? *(should refuse when no source covers it)*

In **Research workspace**, try research across all sample documents or compare the **AI Governance Playbook** against **Cloud Architecture Guide**.

### 5.1 Phase 1 — multi-section policy research

In the **Research workspace**, choose **5.1 · Multi-section policy research**, select a loaded policy PDF, and ask a broad question such as **“What does the AI Governance Policy require before an AI system can be released?”**. The new workflow scans printed numbered section identifiers (for example G-01 and G-02), chooses up to eight keyword-matching sections, and displays **literal per-section source passages**, section IDs, risk flags, the detected/matching section counts, and any omitted results. Copy or download the resulting Markdown report.

This is a bounded extractive evidence scan, **not** an AI-written complete policy summary, compliance audit, or guarantee that every applicable obligation was found. It currently requires recognizable numbered clause markers; unnumbered policies need a different workflow. Uploaded material remains in browser memory. The normal **Keyword** Q&A mode and its retrieval/citation heuristics are unchanged; choose the separate 5.1 workflow for broader, multi-section questions.


### Evaluate the actual retrieval

Open the **5.0 Engineering Quality Gate** and press **Run local evaluation**. It executes 28 labeled keyword queries on the original three fictional sample documents and shows top-1 source match, out-of-domain refusal rate, provenance errors, **warmed-up repeated keyword timing in microseconds**, and per-case verdicts with a JSON download. The microbenchmark times 10 representative questions in batches lasting at least 40 ms, avoids misleading 0.000 ms one-shot displays, and reports median/p95 across batch-average timings—not individual-request tail latency. If you add or remove files, reload to restore the original sample corpus before evaluating. **These scores do not test MiniLM/Qwen accuracy or real-world hallucination rates.** See the [evaluation methodology and manual real-document test protocol](./docs/EVALUATION_PROTOCOL.md) for exact measurements and limitations.

### Browser cache and evidence-report build version

GitHub Pages and iPhone in-app browsers may cache JavaScript modules across quick successive deployments. Source/CSS URLs are fingerprinted through retrieval build `2026-10-10-r13` so updated HTML loads matching app modules. Each evidence report now states its **Retrieval build** and **Retrieval mode**. The footer also displays the loaded build.

To verify an Atlas PDF regression fix, reopen [the live demo with a unique page query](https://arjun9669.github.io/GroundedDesk-AI/?build=20261010-r13), clear the original TXT samples, upload the PDFs again, select **Keyword** mode, and regenerate the report. A report missing the build field may have been copied from an earlier cached tab. Score and source matching are still heuristic; one cited exact quote does not establish that an entire answer is complete.

## Tests and evaluation

Manual QA: [GroundedDesk AI 5.1 Phase 1 Atlas single-PDF validation record](./docs/VALIDATION_5_1_PHASE1.md) — one source-inspected 2026-10-10 smoke test, **not** an exhaustive policy-audit or cross-browser benchmark.

Install **Node.js 22+** for checks (no npm dependencies needed for the local retrieval test suite):

```bash
node --test tests/*.test.mjs
node --check app.mjs
node --check quality.mjs
node --check benchmark.mjs
node --check retrieval.mjs
node --check semantic.mjs
node --check hybrid.mjs
node --check generation.mjs
node --check research.mjs
node --check report.mjs
node eval/run.mjs --strict
node eval/run.mjs --json > evaluation.json
```

The included [GitHub Actions CI](./.github/workflows/ci.yml) runs the same checks, including 5.0 provenance and dashboard integration tests, and archives the toy-corpus report. During the v4 release, **39 tests passed** in the dedicated repository ([verified Actions run](https://github.com/arjun9669/GroundedDesk-AI/actions/runs/38019249606)). The 5.0 branch adds additional tests and CI will re-run the full suite before merging. That run exercised deterministic retrieval, math with **mock embeddings**, prompt/citation structure with **mock model outputs**, research provenance and small sample documents. It did **not** run real downloaded MiniLM or Qwen weights or establish real-world answer accuracy. The browser UI contains optional device-specific model evaluations.

The small bundled evaluation corpus uses **18 supported and 10 unrelated queries** against fictional examples, not a held-out real-world benchmark. The 5.0 dashboard and CLI verify source identities, citations, and excerpts but do not assess semantic entailment. Do not present curated scores as model accuracy, prompt-injection immunity, or production reliability.

## Technical flow

```text
User's files / sample documents
       │
Browser PDF/text extraction and in-memory chunks
       │
       ├── Keyword retrieval (BM25-style, default)
       ├── Optional local MiniLM q8 embeddings → cosine ranking
       └── Optional weighted reciprocal-rank fusion
       │
Verbatim source excerpts + clickable citations
       ├── Default: extractive evidence
       ├── Optional local Qwen WebGPU cited draft
       │     (citation format checked; factual entailment NOT proved)
       └── Scripted multi-document research / comparison reports
```

## Limitations and security

This is an **educational/portfolio prototype, not a production-ready RAG or security product**. Lexical and semantic results can be irrelevant, and a valid citation ID does not prove that generated text is supported. The simple pattern-based warning for prompt-injection-like text is not a comprehensive detector. Research reports show literal document excerpts and gaps; shared words alone do not prove agreement or contradiction. Validate answers against the excerpts before using them in decisions.

Model availability, downloaded weights, memory limits, browser WebGPU/WASM support, and performance vary by device. Uploaded content is in browser memory, but downloaded/exported reports and clipboard contents can contain private data. Avoid uploading confidential material to a public demo without independently reviewing your browser and extension environment.

## Source and deployment

This standalone-ready snapshot was prepared from [the verified GroundedDesk code inside the profile repository](https://github.com/arjun9669/arjun9669/tree/main/projects/groundeddesk-ai). The dedicated repository is the active source for **https://arjun9669.github.io/GroundedDesk-AI/**. The `.github/workflows/pages.yml` workflow publishes every successful `main` push after Pages is configured to use GitHub Actions. The earlier profile-hosted Pages demo remains available but is not automatically updated by this repository.

No specific software license has been granted in this snapshot. Add an appropriate license only after the repository owner chooses one.
