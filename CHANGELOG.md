# Changelog

### 5.6 / r36 — An optional first-use guide (2026-10-12)

- Added a four-step Quick guide for adding files, choosing Ask/Compare/Research, search options and checking/exporting evidence. A dismissible invitation sits in the empty answer area; header access always remains. No automatic dialog, model download or query submission.
- Native modal, keyboard containment, Escape/focus restoration, responsive layout and explicit shortcuts to files, tools or settings. Only one local dismissed-guide preference is stored; storage failure is handled. Existing answers and form state remain intact.
- 253 unit tests, offline toy evaluation and seven installed Chrome feature scripts pass, including actual MiniLM PDF replacement controls. Historical benchmark scores remain unchanged. README and [scope/evidence](docs/QUICK_GUIDE_5_6.md) updated.

### 5.6 / r35 — Clearer uploads and safe file replacement (2026-10-12)

- Full filenames, Markdown type labels, PDF page counts and explicit View PDF / Replace file / Remove actions. Per-file waiting, reading, actual PDF page progress, ready and error states; no simulated percentages.
- Replacement commits only after validation, retains old files/answers on failure, supports the 15-file cap, restores library focus and invalidates stale answers/history/workflows/preview/Hybrid vectors on success. Clearing during upload prevents late corpus restoration.
- 253 unit tests, offline toy checks and seven installed Chrome feature scripts pass. Actual local MiniLM replacement/reindex and revised physical-page quotation/highlight controls pass with Qwen off. No new independent or full benchmark score claimed. README and [evidence](docs/DOCUMENT_LIBRARY_5_6.md) updated.

### 5.6 / r34 — Review the original PDF beside its answer (2026-10-12)

- Wide windows now dock the original PDF beside the interactive answer; smaller windows use a native modal. Keep the physical page number, exact quote and conservative highlighting visible, collapse the quote, navigate pages and copy evidence without closing the desktop viewer.
- Preserve page/highlight on responsive transitions, keep mobile keyboard focus in the dialog, restore focus on close and release PDF resources/listeners. New answers, tool changes and document mutations close stale previews. Narrow library cards keep PDF actions readable.
- 253 unit tests, strict offline toy evaluation and six Chrome feature scripts pass. Actual local MiniLM Hybrid PDF citation/highlight and positive/refusal controls pass with Qwen off. No new independent or Cobalt16 score is claimed; all historical evidence remains unchanged. [Scope/evidence](docs/SIDE_BY_SIDE_PDF_5_6.md).

### 5.6 / r33 — A more distinctive research desk (2026-10-12)

- Added a dark source library, warm paper palette, editorial headings, original inline SVG illustration, refined upload cards, clearer active tabs and stronger answer/source presentation. Composer remains visible at 1440×688; mobile controls and keyboard navigation retained. No paid assets or services.
- 253 unit tests, offline toy checks and six Chrome feature scripts pass. Actual MiniLM Cobalt16 in-sample regression remains 16 PASS / 0 PARTIAL / 0 FAIL; answers, sources and reports match r32 apart from build. Historical results unchanged.
- Highlight test now awaits the loaded footer before asserting its build, resolving an initialization race. README, screenshots and [validation evidence](docs/WORKSPACE_UI_5_6.md) updated.

### 5.6 / r32 — Keep the question box within reach (2026-10-12)

- Moved the question composer above answers so short laptop windows can start a query without scrolling. DOM and visual order agree for keyboard users. Added a 1440×688 viewport check and clearer empty-state wording.
- 253 unit tests and six Chromium feature scripts pass again, including actual MiniLM controls. The unchanged Cobalt16 in-sample regression remains 16 PASS / 0 PARTIAL / 0 FAIL; source records and reports match r30 apart from build. All historical results and r31 evidence are preserved. README/current screenshots updated.

### 5.6 / r31 — A clearer document workspace (2026-10-12)

- Replaced the marketing hero and stacked technical panels with a document sidebar and Ask / Compare / Research tabs. Model settings, experimental drafts, policy tools and developer checks use progressive disclosures. Clearer labels, progress feedback, Save report, optional search details and full filename tooltips reduce clutter.
- Added keyboard tab navigation, preserved form/answer state, correctly associated report panels and mobile file collapse with desktop restoration. Sample questions hide when examples are replaced. No paid fonts or assets added.
- 253 unit tests and six Chromium feature scripts pass, including actual MiniLM positive controls, PDF/lexical workflows and mobile-width checks. Unchanged Cobalt16 actual MiniLM in-sample UI regression: 16 PASS / 0 PARTIAL / 0 FAIL; all source records and evidence exports match r30 aside from build. Original first-look and historical scores preserved. [Scope/evidence](docs/WORKSPACE_UI_5_6.md).
- README and navigation instructions updated. Physical phones, character-level partial-run highlights, OCR and layout reconstruction remain pending.

### 5.5 / r30 — Refuse unsupported PIN value requests (2026-10-12)

- Concrete PIN/door/access-code requests require a labeled numeric value in the quoted evidence, so a document title or PIN policy cannot answer an unknown PIN. Supported fictional PIN values and procedural rotation questions remain answerable. This lexical guard does not prove entity matching or general factual correctness.
- Six guard unit tests added: 253 total pass. Actual MiniLM Cobalt16 in-sample regression: 16 PASS / 0 PARTIAL / 0 FAIL; H09 now refuses with zero citations. Other fifteen displayed answers are unchanged, with four zero-citation refusals and 16/16 valid/relevant citations.
- Preserved the r29 first-look at 15 PASS / 0 PARTIAL / 1 FAIL and all earlier benchmark scores. Browser positive controls pass in Keyword and actual MiniLM Hybrid, Qwen off; existing PDF feature workflows pass. README and [regression evidence](docs/PIN_REFUSAL_5_5.md) updated. No paid service added.

### 5.5 / r29 — Conservative PDF quotation highlighting (2026-10-12)

- Cited previews display the quotation and approximate matched text-run regions on original PDF pages; page navigation clears old highlights. Exact normalized unique matching only. Partial runs, repeated text, cross-page passages and unsupported geometry use an explicit unmarked fallback.
- 247 unit tests, seven actual PDF.js highlight scenarios, mobile-width upload/viewer checks, existing PDF reliability/lexical workflows and an actual local MiniLM Q&A smoke passed. Mobile checks are desktop Chrome emulation. [Scope and evidence](docs/PDF_HIGHLIGHTS_5_5.md).
- New self-authored frozen Cobalt16 first-look: 15 PASS / 0 PARTIAL / 1 FAIL. The unknown door-PIN question received a document title with a citation instead of refusing. The original failure is preserved, with no post-test application tuning. [Full report](docs/evidence/r29/cobalt16/FIRST_LOOK_REPORT.md). Historical benchmark scores are unchanged; this is not external or representative accuracy.
- README updated. No paid service, OCR, character-level partial-run highlighting or layout reconstruction introduced.

### 5.5 / r28 — PDF reliability notices and actionable intake errors (2026-10-12)

- Added named-file guidance for damaged, locked and non-searchable PDFs, with upload status beside the file picker. Every loaded PDF can be opened directly from the library.
- Retained blank-page boundaries and disclosed missing text coverage in library/evidence/export. Widely separated rows trigger a transparent column/table caution; extraction order is unchanged and layout/table meaning is not reconstructed.
- Parsing tasks are cleaned up on success/failure and page/text caps are checked before indexing. Added eight parser unit tests and eight real-PDF Chrome reliability scenarios with pre-test hashes/criteria. 240 unit tests and existing actual MiniLM Q&A/browser regressions pass.
- README documents recovery, limitations and resource caps. Historical frozen benchmark scores, rankings and quote/refusal heuristics are preserved. [Scope and evidence](docs/PDF_RELIABILITY_5_5.md). No paid services added.

### 5.5 / r27 — Research and Comparison page navigation (2026-10-12)

- Comparison, multi-document Research, policy-section research and candidate inventories now show verified physical PDF page locations, original-page previews and library navigation. Copied/downloaded reports identify the current retrieval build and quotation location.
- Research citations and locations are verified before display and again on export. Missing comparisons get no location link; repeated passages remain ambiguous. Policy inventory whitespace projection maps unchanged cross-page quotes to original page offsets.
- README now documents current features, navigation steps, lexical versus Hybrid behavior, free architecture, validation boundaries and remaining roadmap. Ranking, quotation/refusal heuristics and all frozen benchmark results are unchanged.
- 232 unit tests, strict offline toy evaluation, synthetic installed-Chrome Research/Comparison PDF checks and actual local MiniLM Q&A smoke pass. These are feature/regression checks, not new independent accuracy. [Scope and evidence](docs/RESEARCH_PAGE_CITATIONS_5_5.md).

### 5.5 / r26 — PDF page provenance and local preview (2026-10-12)

- Main Keyword/Hybrid Q&A now preserves physical PDF page metadata, displays verified quotation locations and opens the original cited page locally. TXT/MD show normalized line ranges. Ambiguous repeated passages do not receive guessed page numbers.
- Evidence guards and Markdown exports recompute locations from loaded source text. Retrieval ranking, quotation heuristics and refusal logic are unchanged; historical benchmark scores remain preserved.
- Added provenance unit tests and an actual PDF.js browser smoke to CI. Local installed-Chrome testing also exercises real MiniLM/WASM with Qwen off. This is a synthetic feature smoke, not new independent accuracy.
- First 5.5 slice only: Research/Comparison navigation, text highlighting, OCR and table/layout parsing remain pending. [Scope and validation](docs/PAGE_PROVENANCE_5_5.md).

### r23 — Temporal condition and contact-evidence safeguards (2026-10-11)

- Candidate fixes after the independent Lantern32 r22 first-look **16 PASS / 12 PARTIAL / 4 FAIL**; frozen score is immutable. **No real Chrome r23 benchmark result yet.**
- Relative-time cancellation conditions now choose source-literal applicable hours/days-before ranges, honoring strict/inclusive bounds. Clock-time conditions require correct `before`/`after` cutoff direction and topical evidence; absent matches decline instead of citing an opposing rule.
- Named personal mobile/phone-number questions require printed contact-number digits, with the named holder in the same quotation when specified, rather than an unrelated numeric approval.
- Failed-operation retry and repeat-failure escalation can be combined as two consecutive source-literal sentences in the same section; heading-only output becomes refusal rather than a spurious answer.
- Synthetic mock-Hybrid and Keyword controls cover different numeric values, cutoff times, contact examples, exact boundaries, heading-only negatives, and older approval/dispatch behavior. Browser cache imports advanced to `2026-10-11-r23`.
- Eleven known Hybrid incomplete-answer cases and one lexical Comparison partial remain open; **no new r23 accuracy claim**. [Scope and real-Chrome acceptance](docs/LANTERN_R23_SAFETY_GATES.md).


### r22 — Lantern32 first-look browser evaluation (2026-10-11)

- The independently pre-frozen Lantern32 32-case fictional museum-policy pack was scored for the **first time** on unchanged browser build `2026-10-11-r22` with actual local MiniLM and Qwen off.
- **16 PASS / 12 PARTIAL / 4 FAIL (50% strict)**: 26 Hybrid Q&A cases **11/11/4** and six separate lexical Comparison cases **5/1/0**.
- Four FAIL cases: **H06 wrong refund band**, **H18 heading-only response**, **H21 incorrect earlier/later cancellation branch**, **H24 absent personal mobile number incorrectly accepted with unrelated source citation**.
- Only **3/4** unsupported questions refused without citations; **35/35** displayed quotations were source-literal but only **31/35** directly relevant. Eleven supported Hybrid cases were PARTIAL due mainly to missing adjacent conditions.
- [Permanent Lantern32 first-look results](docs/LANTERN32_R22_FIRSTLOOK_RESULTS.md); the [pre-test freeze](docs/LANTERN32_R22_FIRSTLOOK_FREEZE.md) remains immutable. Original Meridian first-look r18 **16/24** and Meridian r22 **23/24 post-tuning** are separate benchmarks.
- Documentation-only, no app code changes. Future Lantern32 tests are **in-sample regression** rather than fresh held-out accuracy.

### 5.4 / r22 — Chrome Meridian24 in-sample acceptance (2026-10-11)

- User-supplied real Chrome report of retrieval build `2026-10-11-r22` on the three unchanged frozen Meridian TXT sources reports **23 PASS / 1 PARTIAL / 0 FAIL (95.8% strict)**. It ran **20 real MiniLM Hybrid Q&A cases and four separate lexical Comparisons**, with Qwen disabled.
- **I18 and I20 now PASS**: Comparison includes both retention hold exceptions and correctly selects Purchasing packet contents instead of an irrelevant retention rule. **I15 stays PARTIAL** despite quoting both lubrication intervals because the unchanged inspection interval remains absent from the displayed answer.
- All 21 r21 PASS cases preserved; 4/4 unsupported zero-citation refusals, 0/16 false refusals, 24/24 literal source quotations, and 24/24 directly relevant quotations.
- [Full r22 Chrome record](docs/MERIDIAN24_R22_CHROME_REGRESSION.md). Historical [r18 first unseen](docs/MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md), [r19](docs/MERIDIAN24_R19_CHROME_REGRESSION.md), [r20](docs/MERIDIAN24_R20_CHROME_REGRESSION.md), [r21](docs/MERIDIAN24_R21_CHROME_REGRESSION.md) scores remain unchanged.
- **Post-tuning in-sample regression only, NOT new held-out generalization.** Documentation-only update; prioritize new independently frozen documents over continued tuning to Meridian.


### 5.4 / r22 — Bounded Hybrid interval and lexical Comparison completeness (2026-10-11)

- Target r21's three remaining Meridian24 PARTIAL cases **I15, I18, I20** with original-source-only, section-bounded evidence extraction.
- For interval-change Hybrid Q&A, inspect up to two consecutive **related** sentences each side of the primary evidence, with 620-character max quote; never leap across unrelated text.
- In the separately lexical Comparison workflow, prefer enumerated **packet contents** over retention clauses when explicitly asked about contents, without changing packet-retention questions. Include an immediately neighboring literal **retention exception** when the topic asks for exceptions.
- Add generalized synthetic tests for alternative values, order, section boundaries, unrelated neighbors and negative counterexamples, plus existing CI/Chromium regression gates.
- Browser retrieval build/fingerprints set to `2026-10-11-r22`. **Real Chrome MiniLM r22 acceptance is pending**; target 24/24 is not measured. Preserve original first-unseen r18 **16/24** and later in-sample r19 **18/24**, r20 **20/24**, r21 **21/24** scores.


### 5.4 / r21 — Actual MiniLM Chrome Meridian24 regression (2026-10-11)

- User-supplied real Chrome report on build `2026-10-11-r21` shows **21 PASS / 3 PARTIAL / 0 FAIL (87.5% strict)** with the unchanged frozen Meridian sources, 20 actual MiniLM Hybrid Q&A and four separate lexical Comparison questions.
- **I09 now PASS:** displayed quotation includes both supplier acknowledgement within six business hours and that acknowledgement does not guarantee delivery. **I15 improved but remains PARTIAL:** normal 60h and dusty 30h are shown; unchanged inspection interval is omitted from the displayed answer.
- **I18 and I20 Comparison remain PARTIAL**, including one Purchasing retention quote irrelevant to the packet-contents question. All previous r20 20 PASS cases remain PASS.
- **24/24 quotations source-literal, 23/24 directly relevant**; zero unsupported false acceptances, 4/4 correct zero-citation refusals.
- Added [r21 real Chrome acceptance record](docs/MERIDIAN24_R21_CHROME_REGRESSION.md), preserving r18 original first unseen 16/24 and r19/r20 regression 18/24 and 20/24. **In-sample, post-tuning regression only.** Documentation-only; no app code modifications.


### 5.4 / r21 — Bounded Hybrid qualifier context (2026-10-11)

- Candidate-stage Hybrid extraction can include **immediately adjacent same-section sentences** only for explicit supplier acknowledgement disclaimers or standard/changed/unchanged interval context. The quotation stays a **contiguous literal substring** of the source (at most 620 characters).
- Intended to address Meridian **I09** (acknowledgement is not delivery guarantee) and **I15** (normal vs dusty lubrication; unchanged inspection interval). **Comparison I18/I20 remain open**.
- Generalized mock-vector tests cover positive cases, different figures/subjects, scope boundaries, unrelated sentences, unsupported refusal, r20 approval regression and Keyword isolation.
- Browser module fingerprints advanced to `2026-10-11-r21`. **Actual real-MiniLM Chrome retest is pending.** Historical first-look r18 **16/24**, in-sample r19 **18/24** and r20 **20/24** remain unchanged. This is not a general entailment verifier.


### 5.4 / r20 — Actual Chrome Meridian 24 regression (2026-10-11)

- The user-submitted real Chrome test of build `2026-10-11-r20` with the three unchanged frozen Meridian sources and actual MiniLM reported **20 PASS / 4 PARTIAL / 0 FAIL**, versus r19's **18 / 4 / 2**.
- **I07 and I10 now PASS:** correct above-4000 written dual approval and next-operating-day dispatch. **All 18 r19 PASS cases remain PASS**. Four deliberately unsupported questions still refuse with zero citations.
- **24/24 quotes were source-literal**; **23/24 were relevant**. Open partials: I09 acknowledgement vs delivery guarantee, I15 standard vs dusty lubrication plus inspection, I18 equipment-investigation retention exception, I20 wrong Purchasing packet citation.
- Recorded [r20 actual Chrome regression](docs/MERIDIAN24_R20_CHROME_REGRESSION.md), preserving [r19](docs/MERIDIAN24_R19_CHROME_REGRESSION.md) and original [r18 first-look](docs/MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md). This is a **post-tuning in-sample regression**, not new independent held-out accuracy. Documentation-only.


## 5.4 / r20 — operative numeric band and dispatch clauses

- Target the two remaining incorrect Meridian r19 Hybrid answers without changing the historical **18/24 r19 in-sample regression** or **16/24 r18 first-unseen baseline**.
- When a question explicitly requests purchase/spend approval at a numerical boundary, prefer the original **applicable approval-band clause**, not a neighboring range that happens to mention the same number.
- When an outbound order's stated release time is later than a documented cutoff, prefer an **explicit, original next-operating-day departure sentence** rather than merely the cutoff. Never fabricate next-day behavior when not stated.
- Regression cases include different thresholds, times, exact boundaries and non-applicable questions with **mock Hybrid vectors**, not real MiniLM inference.
- Bump browser import fingerprints to `2026-10-11-r20`. **Real Chrome acceptance and the four incomplete Meridian cases remain pending.**


### 5.4 / r19 — Real MiniLM Meridian24 Chrome regression (2026-10-11)

- The user-submitted real Chrome MiniLM retest of the original frozen Meridian 24 recorded **18 PASS / 4 PARTIAL / 2 FAIL**, compared with the preserved original r18 **16 PASS / 4 PARTIAL / 4 FAIL**.
- The targeted I23 and I24 absent-value cases now correctly refuse with **zero citations**. All 16 prior passes remained PASS. Supported Hybrid false refusals were 0/16; unsupported false acceptances fell to 0/4.
- **24/24 quoted source passages authentic; 22/24 relevant.** Outstanding: wrong approval band I07 and missing next-day answer I10; partial I09/I15/I18/I20.
- Preserve [r19 actual Chrome regression](docs/MERIDIAN24_R19_CHROME_REGRESSION.md) and [r18 first unseen baseline](docs/MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md) separately. r19 is **post-tuning in-sample regression, not a new held-out estimate**. Documentation-only update.


## 5.4 — r19 unsupported-value evidence guard (2026-10-11)

- Narrowly address the first [Meridian 24 unseen-benchmark failures](docs/MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md) **I23** and **I24**: a requested bank account number must have a labeled numeric account/IBAN value in the answer quotation; a requested torque setting must have an explicit numeric setting with units. Document headings, approval numbers, torque-marker tool names and retrieval scores are not proof of those values.
- Preserve legitimate supported numeric answers and routine account/torque handling guidance, with new deterministic **mock-vector** Hybrid and Keyword regressions.
- Fingerprint the browser retrieval scripts as build `2026-10-11-r19`.
- **Limits:** This is not an entailment checker. The other six Meridian defects remain open, and no actual MiniLM Chrome r19 score is claimed. Preserve the first unseen r18 16/24 score; r19 retest is regression.


### r18 — First held-out Meridian 24 Chrome evaluation (2026-10-11)

- **Negative independent result:** 16 PASS, 4 PARTIAL, 4 FAIL across 24 pre-frozen questions on three previously unseen fictional Meridian documents (**66.7% strict**). Twenty Hybrid Q&A and four separate lexical Comparison cases; real local MiniLM loaded, Qwen off.
- **False acceptance:** 2/4 deliberately unsupported questions (exact bank account number and numeric torque) received irrelevant citations instead of an explicit zero-citation refusal; no numeric values were fabricated. **All 26 quotations were authentic**, but just 22 were relevant.
- Other defects: incorrect purchasing approval band, missing next-operating-day answer, incomplete qualifications/exception clauses and misselected Comparison purchasing packet evidence.
- Preserved [original frozen negative baseline](docs/MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md) unchanged alongside [Atlas's in-sample 15/15](docs/ATLAS15_R18_CHROME_HYBRID_ACCEPTANCE.md). Documentation-only. **Not production-ready and no remediation claim.**


### 5.3.3 — Real Chrome r18 Atlas 15 acceptance (2026-10-11)

- The user-submitted Chrome retest with actual local MiniLM on the original three Atlas PDFs reported **15/15 complete, correctly supported cases**, with **15/15 cases containing only relevant citations**. The **D02 irrelevant extras were eliminated**; 16/16 displayed quotations matched their original PDF text, and all three deliberate refusals had zero citations.
- Of 15 cases, **11** ran via real Hybrid Q&A and **4** via separate lexical Comparison; this is a **known in-sample corpus**, not held-out MiniLM accuracy or production readiness.
- Preserved [full r18 validation](docs/ATLAS15_R18_CHROME_HYBRID_ACCEPTANCE.md), with r17/r16 baselines unchanged, a stale D06 clipboard capture corrected by rerun, and the **independent Meridian 24 marked NOT RUN**. This is a documentation-only change.


## 5.3.3 — Hybrid citation precision guard (r18)

- Follow-up to the [r17 Chrome Atlas 15 report](docs/ATLAS15_R17_CHROME_HYBRID_RETEST.md): D02 answered the evidence-package question correctly but displayed two irrelevant secondary citations.
- Allow Hybrid secondary-source pruning at a moderately strong leading quote score when it matches at least two material terms; existing Keyword and explicit comparison controls remain intact.
- New deterministic mock-vector regressions target D02 and protect meaningful cross-document and purely semantic results. **Not a measured real MiniLM benchmark.**
- Update browser fingerprints to `2026-10-10-r18`. **Real Chrome retest still required**, including unrelated refusals and supported questions.
- Preserve historical results; no paid API, server or private PDF content added.


### 5.3.2 — Windows Chrome r17 manual acceptance (2026-10-11)

- User-supplied real MiniLM Chrome retest of the original Atlas 15 questions reported **15 PASS / 0 PARTIAL / 0 FAIL** under the established completeness rubric: **11/11 Hybrid Q&A and 4/4 separate lexical Comparison**. All three unsupported questions refused with zero citations; **18/18 quotes** were reported literal matches.
- **Known precision defect remains:** D02 adds two irrelevant but authentic secondary citations. This is **not** a clean 15/15 all-citation relevance result or independently held-out accuracy.
- The [r17 test record](docs/ATLAS15_R17_CHROME_HYBRID_RETEST.md) retains the [r16 failures](docs/ATLAS15_R16_CHROME_HYBRID_BASELINE.md) and test limitations. Documentation-only change; no new engine release.


## 5.3.2 — Hybrid complete-source evidence and source precision (r17)

- Preserve the **actual r16 Chrome Atlas 15** baseline: mixed workflows **12 PASS / 1 PARTIAL / 2 FAIL**, specifically Hybrid D03/D08 failing and D06 partial. Comparison 4/4 and missing-data Hybrid refusals 3/3 passed. The earlier offline Keyword 15/15 does not measure Hybrid.
- In Hybrid, allow source-wide literal sentence selection for **strongly matching** query evidence after passage retrieval, recovering a complete clause and important legal-hold exception; retain legacy chunk extraction for semantic-only paraphrases.
- Limit unrelated secondary citations in simple Hybrid questions using conservative sentence relevance and question-term coverage heuristics. Explicit comparison intent remains excluded.
- Add mock-vector and chunk-fragment regression tests. **Live r17 MiniLM + original PDFs still requires a separate browser retest.**
- Fingerprint retrieval JS modules as `2026-10-10-r17`. No paid model/backend added.


## 5.3.1 — Hybrid unsupported-answer refusal patch

- A genuine Windows Chrome Hybrid report on r15 falsely cited three irrelevant Atlas PDF headers to answer a nonexistent database-password question. **The prior 15/15 benchmark excluded Hybrid retrieval.**
- Apply conservative attribute-evidence refusal to Hybrid RRF responses (password, DOB, salary/price and other explicit attributes) while preserving semantic-only queries without such explicit attributes.
- Add mock-vector Hybrid regression tests, version modules as `2026-10-10-r16`, and preserve the manual failure record for device retesting.
- Actual MiniLM browser acceptance remains pending until the tester reruns the question; no real-world accuracy or semantic guarantee is claimed.


## 5.3 — evidence precision and refusal reliability

- Select complete literal source sentences, recover adjacent compound evidence, and retain verifiable excerpt context.
- Improve independent two-document comparison retrieval; constrain irrelevant secondary citations and specific unsupported attribute questions.
- Add 15 Atlas-scenario tests plus unrelated credential-policy regressions, preserving previous Keyword, 5.1 and 5.2 interfaces.
- Re-run actual original-PDF-derived text through the source implementation: **15/15 in-sample supported/refused outcomes** versus previous **9 PASS / 4 PARTIAL / 2 FAIL** under the strict quote-level rubric; this is **not** independent real-world accuracy or a Safari PDF-upload benchmark.
- Use 5.3 browser and module cache fingerprint `20261010-r15` and retrieval build `2026-10-10-r15`. See [evaluation record](docs/ATLAS_15_QUESTION_5_3_RETEST.md).


## 2026-10-10 — Atlas 15-question baseline documentation

- Ran the repository's Keyword and Comparison functions on text extracted from the three user-provided Atlas PDFs against the separate answer key.
- Recorded **9 PASS / 4 PARTIAL / 2 FAIL**, with an explicit failure for the nonexistent database-password question and incomplete evidence selection for several direct/comparison cases.
- Preserved source SHA-256 hashes, exact question IDs, case-level findings, and strict quote-level scoring; this is an offline synthetic regression result, **not** real-world model accuracy or full mobile/browser verification.


## 5.2.0 prototype — candidate release-control inventory (pending manual PDF acceptance)

- Added a separate numbered-policy release-readiness form and Markdown export for candidate controls grouped by rule-based categories.
- Extracts and verifies literal source sentences across bounded numbered clauses, exposes skipped/withheld evidence, and keeps suspicious instruction-like sections out of checklist items.
- Explicitly refuses out-of-scope queries or unnumbered documents; does not claim LLM reasoning, full requirement recall, or regulatory compliance.
- Added deterministic regressions and CI syntax checks; previous Keyword Q&A, 5.1 reports, and old build identification stay independent.
- Manual iPhone Atlas PDF replay and unscored 15-question multi-document benchmark are separate follow-ups.

## 5.0.2 — Atlas PDF relevance regression

- Fixed a user-reported failure where PDF header boilerplate was quoted instead of the relevant AI governance release-approval clause.
- Scored candidate sentences with lightweight inflection matching (for example, "released" and "releases") and downweighted long synthetic PDF headers.
- When a question clearly names one specific document, limited ordinary Q&A citations to that document instead of presenting unrelated vendor/incident excerpts.
- Added a regression test reproducing the reported Atlas policy question, preserving literal source provenance, and checking that multi-document questions and unrelated-query refusals still work.
- This improves extractive *relevance*, not verified claim-level entailment or generative answer truth.


## 5.0.1 — Evaluation measurement quality

- Replaced misleading rounded one-shot `0.000 ms` cards with adaptive, warmed, repeated keyword timings in microseconds.
- Distinguished median/p95 of ten sampled question batch means from individual-request tail latency; included clock-resolution failures instead of fabricated measurements.
- Marked one-shot clock readings as unreliable diagnostic values in downloadable JSON.
- Added benchmark regression tests and an explicit protocol for later manual testing on permitted real PDFs.


## 5.0.0 — Portfolio quality milestone

- Added the **on-device keyword evaluation dashboard** with independently computed 28-case per-query results, top-1 source match, unsupported refusals, citation provenance, and real local timings.
- Added JSON evaluation export; disabled the labeled evaluation when private/altered documents are loaded.
- Centralized strict **citation provenance verification** and used it in both the interactive answer renderer and CLI test harness.
- Automatically clear Q&A and evaluation panels after document-library changes to avoid stale source displays.
- Expanded deterministic tests for tampering, duplicate citations, malformed labels, negative cases, and UI integration.
- Added responsive evaluation metrics, engineering case study, security boundary documentation, and refreshed project README.

## 4.0.0 — Multi-document research

- Added scripted local retrieve → cross-check → report flow, two-document source comparison and private Markdown export.
- Flagged recognizable instruction-like content with explicit limitations.
- Added tests for source provenance, gaps, and malicious-looking input-as-data.

## 3.0.0 — Optional local Qwen

- Added explicitly opt-in Qwen2.5 0.5B WebGPU local answer drafting and per-sentence source-number checks.
- Added session-only recent questions and extraction fallback.

## 2.0.0 — Semantic retrieval

- Added optional MiniLM q8 WASM embeddings, cosine scoring and hybrid BM25-style/semantic fusion.
- Added optional on-device example evaluation.

## 1.0.0 — Extractive evidence

- Added session document ingestion, keyword retrieval, exact citations, unsupported-question refusal, and Markdown evidence exports.

## 2026-10-12 — r25 browser evidence and maintenance

- Published measured dual Chrome regression history, with first-look baselines and capture limitations preserved.
- Aligned page title/description and README with 5.4/r25.
- Made the excerpt provenance test normalize CRLF consistently with the retrieval engine; no ranking change.
