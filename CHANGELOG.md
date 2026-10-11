# Changelog

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
