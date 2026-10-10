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
| **5.2 prototype** | **Candidate release-control inventory: rule-tagged, literal source sentences grouped by gate, conditional, related governance and unclassified categories** | **Optional numbered-policy Research workflow; not semantic synthesis or compliance verification** |
| **5.3** | **Precise source-sentence evidence selection, stronger missing-fact refusals and two-document comparison quote recovery** | **Deterministic Keyword/Comparison refinement, no LLM or paid API** |

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


### 5.2 — Candidate release-control inventory (prototype)

In **Research workspace**, select **5.2 · Candidate release-control inventory**, upload/select a numbered policy, and ask: **“What does the AI Governance Policy require before an AI system can be released?”**. Press **Build source-linked checklist** and copy the Research results report. The implementation scans up to **64 numbered sections**, extracts up to **24 literal rule-shaped sentences** (no more than five per section), applies transparent regular-expression categories, and identifies skipped sections, output caps, and instruction-shaped content excluded from checklist generation.

This **does not** verify whether a control has been satisfied, infer exception conditions, assess legal compliance, or guarantee complete requirement recall. The categories are heuristics rather than semantic analysis; some advisory/operational controls can be included and some obligations can be missed. The form only supports **release/deployment/launch/readiness** prompts, not arbitrary policy question answering. Documents without recognizable numbered clauses have no supported result. Keep the full original document alongside every exported report. No paid API, server, vector DB, or LLM is involved.

**QA status:** Source-code, unit and Chromium UI checks passed in GitHub CI. The tester's original Atlas PDF 5.2 export has been [manually reviewed and recorded](./docs/VALIDATION_5_2_ATLAS.md) as **one single-PDF smoke-test pass**, not a complete or independently instrumented browser test. The [15-question Atlas baseline](./docs/ATLAS_15_QUESTION_BASELINE.md) has now been run using the separate Keyword/Comparison workflows, **not** using the 5.2 release-control checklist; the results must not be presented as 5.2 answer accuracy. See [evaluation protocol](./docs/EVALUATION_PROTOCOL.md).

### 5.3 — evidence precision and refusal reliability

The default Keyword engine now favors whole source sentences from retrieved documents, and separate Comparison mode searches literal passages within both selected files rather than discarding evidence due to full-question BM25 chunk thresholds. Explicit missing-attribute requests are conservatively refused; this is **not** guaranteed claim-level semantic checking. Multi-part questions may include bounded, contiguous source statements rather than unsupported paraphrases. Existing 5.1 multi-section and 5.2 release-control workflows remain opt-in and unchanged in purpose.

The [Atlas 15-question original-PDF-text retest](./docs/ATLAS_15_QUESTION_5_3_RETEST.md) found **15/15 evidence-supported or appropriately refused** under the test-set's strict rubric, compared with the [previous 9 PASS / 4 PARTIAL / 2 FAIL](./docs/ATLAS_15_QUESTION_BASELINE.md) baseline. **This is an in-sample synthetic regression result, not independent real-world accuracy, production readiness, or a mobile PDF upload test.** The feature code was iteratively tuned using these failure cases; new unseen documents require separately labeled evaluation.

### 5.3.1 — Hybrid unsupported-attribute refusal patch

The Windows Chrome manual test identified a **Hybrid-mode false acceptance** when a missing database password was answered with three unrelated Atlas PDF cover citations.

**Manual retest result (2026-10-10): PASS for the original password-refusal case.** On build `2026-10-10-r16`, Windows Chrome Hybrid MiniLM + BM25 returned an explicit refusal with **zero cited sources**. The [validation record](./docs/HYBRID_REFUSAL_5_3_1.md) preserves both the r15 failure and r16 success. This does **not** establish reliable refusal behavior across other Hybrid questions. The r15 **15/15** Atlas baseline tested **Keyword and document comparison only**, not Hybrid. In r16, the conservative specific-attribute evidence guard also applies to Hybrid RRF results. This is not a full semantic entailment verifier.

See the [observed failure and successful Chrome retest](./docs/HYBRID_REFUSAL_5_3_1.md). Automated regression tests still use mock vectors and cannot establish actual MiniLM accuracy.

### 5.3.2 — Hybrid complete-source evidence correction (r17)

A **separate actual Windows Chrome test on r16** of the original Atlas 15 questions found **12 PASS / 1 PARTIAL / 2 FAIL** across Hybrid Q&A (8/11 full passes) and lexical Comparison (4/4 passes). The observed Hybrid defects were **D03** (missed 95% provenance target), **D06** (lost legal-hold exception after `unless`) and **D08** (incorrect high-risk vendor approval). Other answers carried irrelevant but source-literal quotes. See the [preserved r16 test baseline](./docs/ATLAS15_R16_CHROME_HYBRID_BASELINE.md). This real-browser baseline supersedes any inference that the earlier **offline Keyword 15/15** score also applied to Hybrid.

In r17, Hybrid can recover a **complete exact source sentence** from a retrieved document when a strong lexical match exists, instead of relying on a potentially truncated MiniLM-ranked chunk. Weak extra citations in non-comparison questions are pruned conservatively; explicit multi-document workflows remain separate. Semantic-only paraphrases fall back to existing chunk extraction. All relevance measures remain heuristics, **not entailment verification**.

**Actual Windows Chrome r17 retest (2026-10-11):** The [tester-submitted original Atlas 15 report](./docs/ATLAS15_R17_CHROME_HYBRID_RETEST.md) records **15 PASS / 0 PARTIAL / 0 FAIL** under the unchanged answer-completeness rubric: **11/11 Hybrid Q&A** and **4/4 separate lexical Comparison**. All three refusals cite zero sources; **18/18 quotations** are reported source-literal. **D02 still contains two irrelevant secondary citations**, so this is not clean citation precision or an independent real-world accuracy estimate. The prior r16 **12 PASS / 1 PARTIAL / 2 FAIL** record remains unchanged. Automated regression tests use deterministic mock vectors; the new result is separately labeled as a reported real-Chrome MiniLM run.

### 5.3.3 — Hybrid secondary-citation precision (r18)

The original r17 Chrome MiniLM Atlas 15 run achieved **15/15 answer-completeness passes**, but D02 showed two unnecessary Runbook/Vendor quotations alongside the correct Governance evidence-package sentence. The [r17 result](./docs/ATLAS15_R17_CHROME_HYBRID_RETEST.md) remains unchanged, including the **14/15 cases with all citations relevant**.

In r18, single-topic Hybrid answers remove extra citations when the leading literal answer quote strongly covers multiple material question terms, even if its heuristic relevance score is only moderately strong. The Keyword pruning threshold stays unchanged. Explicit comparison intent and semantic-only multi-source paraphrases remain protected. The change uses **lexical heuristics, not semantic entailment**.

**Actual Chrome r18 acceptance (2026-10-11):** The [user-supplied real MiniLM Atlas 15 report](./docs/ATLAS15_R18_CHROME_HYBRID_ACCEPTANCE.md) records **15/15 full passes**, **15/15 cases with all citations relevant**, and **16/16 literal quotations**. D02 now shows exactly one Governance citation with the complete five-item package; D03/D06/D08 and all three zero-citation refusals remain correct. The 11 Q&A cases used real MiniLM Hybrid and 4 separate comparison cases used lexical Comparison. This is **known-corpus, in-sample acceptance**, not generalizable production accuracy. **Frozen independent Meridian 24 remains untested.** [Release plan](./docs/HYBRID_D02_R18_PLAN.md).

### Evaluate the actual retrieval

Open the **5.0 Engineering Quality Gate** and press **Run local evaluation**. It executes 28 labeled keyword queries on the original three fictional sample documents and shows top-1 source match, out-of-domain refusal rate, provenance errors, **warmed-up repeated keyword timing in microseconds**, and per-case verdicts with a JSON download. The microbenchmark times 10 representative questions in batches lasting at least 40 ms, avoids misleading 0.000 ms one-shot displays, and reports median/p95 across batch-average timings—not individual-request tail latency. If you add or remove files, reload to restore the original sample corpus before evaluating. **These scores do not test MiniLM/Qwen accuracy or real-world hallucination rates.** See the [evaluation methodology and manual real-document test protocol](./docs/EVALUATION_PROTOCOL.md) for exact measurements and limitations.

### Browser cache and evidence-report build version

GitHub Pages and iPhone in-app browsers may cache JavaScript modules across quick successive deployments. The updated Keyword retrieval engine identifies itself as build `2026-10-10-r18`, and the 5.3 browser entrypoint plus its direct retrieval-related imports use fingerprint `20261010-r18`. Source/CSS URLs are fingerprinted so updated HTML loads matching app modules. Each evidence report now states its **Retrieval build** and **Retrieval mode**. The footer also displays the loaded build.

To verify an Atlas PDF regression fix, reopen [the live demo with a unique page query](https://arjun9669.github.io/GroundedDesk-AI/?build=20261010-r18), clear the original TXT samples, upload the PDFs again, select **Keyword** mode, and regenerate the report. A report missing the build field may have been copied from an earlier cached tab. Score and source matching are still heuristic; one cited exact quote does not establish that an entire answer is complete.

## Tests and evaluation

Manual QA: [GroundedDesk AI 5.1 Phase 1 Atlas single-PDF validation record](./docs/VALIDATION_5_1_PHASE1.md) — one source-inspected 2026-10-10 smoke test, **not** an exhaustive policy-audit or cross-browser benchmark.

5.2 manual QA: [Atlas single-PDF candidate-control validation](./docs/VALIDATION_5_2_ATLAS.md) — 8 sections inspected, 17 literal quotes manually compared, **not** a 15-question benchmark or release-compliance certification.

**Atlas 15-question original-PDF-text evaluation:** [5.3 retest 15/15 in-sample](./docs/ATLAS_15_QUESTION_5_3_RETEST.md), compared with [the 9 PASS / 4 PARTIAL / 2 FAIL baseline](./docs/ATLAS_15_QUESTION_BASELINE.md) — the measured *offline* Keyword/Comparison evaluation on three fictional Atlas source PDFs. This is a development regression baseline, not verified real-world accuracy or mobile-PDF ingestion testing. The baseline Keyword false acceptance was corrected in r15; an additional **Hybrid-mode false acceptance** was subsequently observed on Windows Chrome and is tracked in [the r16 fix record](./docs/HYBRID_REFUSAL_5_3_1.md).

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
node --check policy-synthesis.mjs
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
