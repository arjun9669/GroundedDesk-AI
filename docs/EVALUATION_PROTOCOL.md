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


## I. 5.3.2 r17 actual Windows Chrome MiniLM + lexical Comparison retest

The [reported real-browser Atlas 15 retest](ATLAS15_R17_CHROME_HYBRID_RETEST.md) on r17 used the same three original synthetic PDFs and unchanged questions. Chrome reported the local MiniLM model ready with 16 passages and Qwen off. The benchmark produced **15 PASS / 0 PARTIAL / 0 FAIL** under the unchanged answer-completeness rubric, comprising **11/11 actual Hybrid Q&A** and **4/4 separate lexical Comparison**. Supported Hybrid questions were **8/8 complete**; the three deliberate Hybrid refusals were **3/3 with zero citations**. The tester reported **18/18 displayed quotes** matching their original PDF text and **10/10 Hybrid quotes** within retrieved excerpts.

**Exception: D02 had two irrelevant supplemental citations** from Runbook and Vendor, despite its correct five-item answer from Governance. Consequently **15/15 complete answers does not mean 15/15 clean citation precision**; only **14/15 cases** had all quoted evidence relevant. The original `GroundedDesk-r17-Atlas15-report.md` was supplied; referenced raw JSON and screenshots were not part of this documentation update, so do not claim independent validation from them.

The historic [r16 Chrome baseline](ATLAS15_R16_CHROME_HYBRID_BASELINE.md) remains **12 PASS / 1 PARTIAL / 2 FAIL**. The prior [r15 offline Keyword/Comparison 15/15](ATLAS_15_QUESTION_5_3_RETEST.md) is a different workflow. All are **in-sample regression evaluations**, not estimates of held-out MiniLM accuracy. Next: unseen non-sensitive documents and D02 source-precision checks.


## J. 5.3.3 r18 citation-precision acceptance

The [r17 Chrome Atlas 15 retest](ATLAS15_R17_CHROME_HYBRID_RETEST.md) correctly answered all 15 questions under the unchanged answer-completeness rubric, but D02 showed **two irrelevant extra citations**: only **14/15 cases had all cited quotations relevant**. The r18 [targeted fix](HYBRID_D02_R18_PLAN.md) lowers the moderate-strength pruning gate for **Hybrid only**, conditioned on lexical coverage of at least two material question terms. It does not change the underlying MiniLM embeddings, rerank threshold, or Keyword pruning cutoff.

Regression tests using deterministic mock embedding vectors are **code-level safeguards**, not the new Chrome result. Browser acceptance must verify build r18, the three original PDFs, actual on-device MiniLM, zero D02 Runbook/Vendor citations, preserved D03/D06/D08 supporting evidence, N13–N15 refusals with zero citations and the four **separate lexical Comparison** outputs. Record all surprises rather than assuming 15/15 on r18.


## K. 5.3.3 r18 observed Windows Chrome Atlas 15 acceptance (2026-10-11)

The [actual Chrome Atlas 15 tester report](ATLAS15_R18_CHROME_HYBRID_ACCEPTANCE.md) on loaded build `2026-10-10-r18` reports **15 PASS, 0 PARTIAL, 0 FAIL** under completeness, relevance, provenance and citation-precision criteria. Eleven questions used **actual local MiniLM Hybrid Q&A** (8 supported, 3 deliberately unsupported) and **four** used the separate deterministic lexical Comparison workflow. The tester manually loaded the three original Atlas PDFs and observed MiniLM index **16 passages**, with Qwen off. D02 now yields **one correct Governance G-02 citation** without its two unrelated r17 supplements.

The report's measured claims: **16/16 displayed quotations** were literally present in the original PDFs, **8/8 Hybrid quotes** also matched displayed excerpts, **15/15 cases** had all sources relevant (including zero-source refusals), with **0/3 false acceptances** and **0/8 supported Hybrid false refusals**. A stale clipboard capture of D06 accidentally showed D05; it was rejected and D06 rerun unchanged, with the anomaly preserved by the tester. The full exported JSON evidence/screenshots were referenced but not separately provided to this repository update.

The r18 acceptance is **in-sample on the original three fictional Atlas PDFs**: do not extrapolate to production reliability, unseen PDF accuracy, or semantic entailment. The separately frozen [Meridian 24 independent evaluation](HYBRID_D02_R18_PLAN.md) is **NOT RUN**. Keep its fixed answer key and document hashes unchanged, use a new browser tab, and score the results without tuning the engine during this test.


## L. First frozen unseen Meridian 24 Chrome benchmark — r18 (2026-10-11)

The [independent, pre-frozen Meridian 24 Chrome scorecard](MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md) used three new fictional TXT source documents and **actual on-device MiniLM Hybrid for 20 Q&A questions**, plus **four separate lexical Comparison questions**. Original documents, answer key, scoring criteria and hashes were frozen before answering and unchanged during execution. Qwen was off. The test passed **16/24 (66.7%)**, with **4 PARTIAL** and **4 FAIL**. Two of four deliberately unsupported questions were **false acceptances**: an absent exact bank account number was 'answered' by a file heading (I23), and an absent numeric torque value by a tool-list quotation (I24); neither displayed a fabricated numeric value. Among supported Hybrid questions, there were **0/16 false refusals**.

The tester checked **26/26 quotes** against their respective frozen original sources, but only **22/26 quotations (84.6%)** were relevant to the actual questions. Failures: I07 incorrect purchasing approval band, I10 missing next-operating-day answer, I23/I24 unsupported false acceptances. Partials: I09 supplier acknowledgement qualification, I15 standard vs dusty lubrication and unchanged inspection, I18 unresolved equipment-investigation hold, I20 wrong purchasing clause in lexical Comparison.

This first look is preserved as a **held-out negative baseline**, not overwritten after remediation. Any future rerun is **in-sample regression**; new generalization estimates require another independently frozen, unseen document-and-question set. Do not combine the **Atlas 15/15 in-sample** and **Meridian 16/24 first-unseen** scores into an undifferentiated accuracy claim. The supporting raw JSON/zip were named but were not separately attached during this documentation update.


## M. 5.4 r19 concrete requested-value regression gate

The first frozen [Meridian24 r18](MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md) unseen-browser baseline remained **16/24 (66.7%)**, including **I23/I24 false acceptances** with genuine but unrelated quotations. r19 applies a **narrow conservative answer-quote** check for requested bank account/IBAN identifiers and quantitative torque settings. It requires a labeled account number or a measured torque plus units in the displayed text; document titles, account-handling policy and torque-marker equipment names are not sufficient.

Regression cases in `tests/meridian-absent-values.test.mjs` simulate Hybrid RRF with **mock numeric vectors**, alongside Keyword controls and supported-value/non-value guidance. These do **not** measure real MiniLM results. For acceptance, rerun the originally frozen **20 Hybrid / four separate Comparison** questions in Chrome on build r19 with Qwen disabled and the unchanged three original Meridian source documents. Record I23/I24 refusals, check all previously successful answers including Atlas N13–N15 remain correct, and list remaining failed/partial cases. No fixes for I07, I09, I10, I15, I18, I20 are asserted.

**Reporting:** Preserve the r18 *first unseen* baseline intact. All Meridian r19/r20 reruns are *in-sample regression* and must never be presented as new held-out accuracy. A genuinely unseen generalization score requires fresh documents, questions and grading requirements frozen in advance.


## N. Actual r19 Chrome Meridian 24 in-sample regression (2026-10-11)

The [user-submitted real-browser r19 retest](MERIDIAN24_R19_CHROME_REGRESSION.md) of the **unchanged, previously frozen Meridian 24** reports **18 PASS, 4 PARTIAL, 2 FAIL**, compared with **16/4/4** in the original [r18 first unseen baseline](MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md). This is an **in-sample regression**, not a second first-look held-out test. The tester verified three source hashes and the fixed answer-key hash, actual on-device MiniLM Hybrid (9 indexed passages), Qwen off, all 20 main Hybrid Q&A and four separate lexical Comparisons. No source/question/code/scoring modifications or rephrasing occurred during the run.

**I23 and I24 now refuse with zero citations; all 16 previous passes remained PASS.** Unsupported refusals rose from 2/4 to 4/4; supported Hybrid false refusals stayed 0/16. All 24 source quotations were literal matches, including 16/16 Hybrid quote/excerpt matches, but only 22/24 quotes were relevant. **I07 wrong approval band and I10 missing next-day departure still FAIL; I09/I15/I18/I20 still PARTIAL.** The raw JSON and screenshots listed in the provided Markdown were not independently supplied or inspected during this doc update.

Future tests of Meridian remain **regression**, while a new generalization estimate needs a separately frozen unseen corpus and an unmodified grading rubric. Do not infer production readiness or comprehensive factual entailment from 18/24 passes.
