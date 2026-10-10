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


## D. 5.2 deterministic release-control candidate checks

1. Run the 5.2 **Build source-linked checklist** on `01_Atlas_AI_Governance_Policy.pdf` using the documented release question; keep the raw exported Markdown and the browser build fingerprint.
2. Verify that each quoted sentence occurs in its cited numbered section of the original PDF after whitespace normalization. Record a separate outcome for each sentence; **matching text is not evidence of correct classification**.
3. Compare detected/omitted policy sections with all numbered sections. Verify that G-03 privacy restrictions and G-06 rollback/escalation appear as candidates, G-08 instruction-shaped text is withheld, and G-01/G-02/G-04/G-05/G-07 still have supported passages.
4. Test questions outside release/readiness scope, documents without numbered sections, documents with more than 64 sections or 24 candidate excerpts, and conditional controls with exceptions.
5. Compare the ordinary Keyword answer and 5.1 evidence outputs before/after enabling 5.2; they must not change. Test exports and visibility on mobile Safari separately, as static UI tests do not execute PDF.js upload or browser clipboard operations.
6. Log misses, false positives, misclassification, incomplete sentences, and source mismatches. Do not conclude that passing smoke tests establishes all release requirements.

The separate **Atlas 15-question answer key** contains direct, cross-document and deliberate-refusal cases. The 5.2 candidate extractor is **not** a replacement for cross-document or general QA evaluation. Do not report a 15-question score until each case has been executed with the intended appropriate workflow and scored against its answer key. 

## E. Atlas 15-question PDF-derived regression baseline (2026-10-10)

The separately supplied fictional Atlas PDF corpus and human-created answer key were run through the repository's deterministic Keyword Q&A and two-document Comparison functions using text extracted from the original PDFs, without shipping them in the repository. **Results: 9 PASS / 4 PARTIAL / 2 FAIL** under a stricter *displayed-quote* scoring rule. See the [15-case report, provenance and failure details](ATLAS_15_QUESTION_BASELINE.md). A retrieved document excerpt containing the right answer is only partial if the visible selected answer quotes the wrong sentence. Comparison evidence must visibly support each side; literal source match alone is insufficient.

This is an **offline engine run**, not a Safari upload test, not a test of 5.2 release-control extraction on 15 questions, not a measurement of MiniLM/Qwen, and not an independently held-out real-world benchmark. Preserve the known failed and partial cases in all future re-runs; never silently discard or reclassify them.


## F. 5.3 Atlas baseline-to-retest comparison

See [the original-PDF-text 5.3 re-evaluation](ATLAS_15_QUESTION_5_3_RETEST.md): **15/15** supported/appropriately refused on the original known synthetic Atlas corpus versus [the prior baseline](ATLAS_15_QUESTION_BASELINE.md) of **9 PASS / 4 PARTIAL / 2 FAIL**. Preserve the original record unchanged. This is an **in-sample code-level regression**, after feature tuning against known failures: it is not independent accuracy, a 5.2 checklist test, PDF.js browser parsing, or mobile Safari validation.

Follow-up: obtain unlabeled non-sensitive third-party documents, define expected facts and refusals *before* testing, then record exact displayed quotations, false accepts, partials and failures for each engine mode separately. Replaying the same synthetic 15 questions again does not establish generalization.


## G. 5.3.1 Hybrid manual failure and separate acceptance gate

[The actual Windows Chrome Hybrid false-acceptance report](HYBRID_REFUSAL_5_3_1.md) on build r15 answered an absent database-password question with unrelated Atlas cover citations. The prior **15/15 result was Keyword/Comparison only and must not be described as a Hybrid pass**. The r16 patch applies an explicit-attribute refusal guard to Hybrid results; mock-vector unit tests verify the logic without proving the actual MiniLM model's accuracy.

Re-run the original three Atlas PDFs, with the local MiniLM actually enabled in Chrome, using the same prompt. Record the visible build and Hybrid mode, exact refusal text, and absence of citations. If any header citation reappears, record a FAIL and keep the new manual gate open.


## H. r16 actual Windows Chrome Atlas 15 mixed-workflow benchmark

The [tester-supplied Chrome evidence summary](ATLAS15_R16_CHROME_HYBRID_BASELINE.md) measured **12 PASS / 1 PARTIAL / 2 FAIL** with build r16: actual MiniLM Hybrid Q&A 8/11 full passes (5/8 supported direct questions, 3/3 refusals), and separate deterministic Comparison 4/4. This is **not** MiniLM 12/15 accuracy. Citation provenance checks were 23/23 literal source matches, but incorrect source selection (D03, D08) and an incomplete legal-hold exception (D06) still failed. Preserve this negative baseline. The browser extension's inability to re-upload files means no claim of fresh-upload reproducibility.

r17 aims to correct these three case shapes; logic-level tests use **mock Hybrid vectors**, not actual MiniLM. Re-run the unchanged 15 cases in Chrome after the deployment and report scores **by workflow**, without replacing r16 or the original r15 offline Keyword baseline.
