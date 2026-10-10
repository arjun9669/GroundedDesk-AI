# GroundedDesk evaluation protocol — no invented benchmarks

This protocol distinguishes **three different** measurements. Do not combine them into one "AI accuracy" statistic.

## A. Curated keyword regression (automated and in browser)

The project ships with three fictional sample documents and 28 hand-labeled questions (18 supported and 10 unrelated). From the app's **Engineering Quality Gate**, press **Run local evaluation**. It measures the deterministic BM25-style retrieval path and returns top-1 source matching, refusals, false accepts and exact citation provenance.

The measurements are **not** independent or held out. They do **not** test MiniLM, Qwen, RAG factual entailment or security robustness.

### Why a single 0.000 ms is not real latency

Fast document retrieval may take less time than an individual browser clock can resolve, particularly on mobile browsers with rounded `performance.now()`. A single query may appear as 0.000 ms or 1.000 ms even though it did real work.

The quality dashboard therefore runs a separate, **repeated keyword microbenchmark**:

1. Select two supported questions from each of the three fictional source documents, plus four deliberately irrelevant questions (**10 sampled questions**).
2. Warm up the keyword retrieval code with five calls per question.
3. Measure **batches of repeated keyword searches**, increasing iteration counts until each batch lasts at least **40 ms** (with an iteration cap of 131,072).
4. Divide measured batch time by the number of queries and report the **mean microseconds per query for each sampled question**.
5. Show the median and 95th percentile **across these 10 batch-mean measurements**, *not* a service's 95th percentile per-request response time.
6. If the clock cannot resolve a sufficiently long batch, report **Timer too coarse** instead of showing zero.

Timing intentionally excludes document upload, PDF parsing, vector embeddings, WebGPU model downloads, Qwen inference, browser UI rendering and network latency. It is **not** an end-to-end website speed score. Devices, browser throttling, power-saving and warm-up can change measurements.

The downloaded JSON includes both `repeated_benchmark` (the recommended timing view) and `one_shot_clock_diagnostic` (explicitly marked **untrustworthy for fast queries**). Legacy command-line single-query timings are also affected by clock resolution.

## B. Optional actual MiniLM/Qwen browser smoke tests (user initiated)

- Enable **free semantic model** and select hybrid retrieval. The **Compare modes on sample questions** control actually calls the loaded MiniLM model locally. Observe retrieval matches and whether unrelated questions are refused. Its test set is still tiny and curated.
- On a compatible WebGPU device, explicitly load **local Qwen model** and run **Check local AI drafts on 3 sample questions**. Record model loading success/failure, citation-format acceptance and source matches. That control checks neither all factual claims nor model security.
- Keep model download/setup time separate from inference times. Browser hardware and model availability matter; failure to load is a valid finding.

These optional model tests are **not** exercised by offline unit tests or the default 28-case keyword quality gate.

## C. Non-confidential document validation (manual, not yet scored)

To substantiate a job application, use **two or three permitted, public, selectable-text PDFs**, each with different facts:

1. Record filename, page count, character count, browser/device, model mode and whether extraction succeeded. Use files small enough to respect the app's PDF size/page/character limits.
2. Write **at least 12 questions**: six answerable directly, three requiring comparison of two files, and three whose answers are absent. Establish a human-checked expected source/passage *before* running queries.
3. Run each in the default keyword mode; record the actual source excerpt, whether it supports the claim, whether the app refused absent evidence, and any failure. For comparison questions, review the actual excerpts rather than asserting inferred contradictions.
4. Optionally repeat with hybrid MiniLM and local Qwen *if those modes load*. Never silently substitute keyword fallback for a successful local model.
5. Record source-precision failures, partial answers, prompt-injection artifacts, export problems and mobile usability issues. Do not delete negative cases.
6. Summarize numerator and denominator for each metric and keep the source documents or public links available to reproduce the findings.

A simple manually verified record is:

| Case | Question | Expected source/passage | Keyword result | Hybrid result (if run) | Qwen draft (if run) | Provenance valid? | Factual support? | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | *(fill after testing)* | *(human label)* | *(observed)* | *(observed)* | *(observed)* | *(yes/no)* | *(yes/no/partial)* | *(device/errors)* |

**Current status:** No manual real-document benchmark figures are claimed in this repository. Until you or a reviewer performs this procedure, present the 28-case keyword fixture only as an **internal regression test**.

Avoid private company documents, account details, employer secrets, and anything you cannot disclose safely in a public portfolio.
