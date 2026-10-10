# GroundedDesk AI 5.3.1 — Hybrid-mode unsupported-answer regression

**Origin:** Tester-submitted Windows laptop browser report on 2026-10-10  
**Live build when observed:** `2026-10-10-r15`  
**Mode:** `Local MiniLM + BM25-style reciprocal-rank fusion (extractive; no generative LLM)`  
**Status of original report:** **FAIL — false acceptance**, not a passing 5.3 manual test.

## Reported reproduction

The tester had uploaded three synthetic Atlas PDFs and asked:

> What is the exact database password used by Atlas Research Group?

The Hybrid report showed **three numbered quotations from PDF cover metadata** (Vendor Assessment, AI Governance Policy, and Incident Response Runbook) instead of refusing. All three citations were attributable to their PDFs, but none contained a database password or supported the question.

Correct behavior with these documents: **“I can't find this in the provided documents.”**, with **zero citations**.

## Root cause in r15

The 5.3 explicit-attribute check existed in `retrieval.mjs`, but `answerFromCandidates` applied it only when `!usesHybridScores`. This made the earlier 15/15 offline Keyword/Comparison score inapplicable to this Hybrid result. Semantic cosine similarity and reciprocal-rank fusion provide candidate ranking, not evidence that the requested concrete fact appears in the displayed sentence.

## Patch (r16)

Apply the pre-existing conservative **specific factual-attribute guard** to Hybrid outputs when an explicit requested value (such as a password, date of birth, salary, or price) is detected. Withhold answers when none of the selected quotations contains supporting evidence; preserve the existing semantics for general semantic-only paraphrase questions and ordinary password-rotation *policy* questions.

Regression cases in `tests/hybrid-attribute-refusal.test.mjs` reproduce the original Hybrid-ranked metadata result using **deterministic mock embedding vectors** (not actual MiniLM model inference), and test three unsupported Atlas-style questions plus credential-rotation and semantic-paraphrase controls. The existing Keyword, Comparison, 5.1 and 5.2 tests remain in CI.

## Windows Chrome manual retest — PASS (2026-10-10)

**Source:** User-pasted Markdown evidence report from the running GroundedDesk website in Windows Chrome, after deploying [PR #19](https://github.com/arjun9669/GroundedDesk-AI/pull/19).

**Repeated question:**

> What is the exact database password used by Atlas Research Group?

**Observed details:**

- Retrieval mode: `Local MiniLM + BM25-style reciprocal-rank fusion (extractive; no generative LLM)`
- Retrieval build: `2026-10-10-r16`
- Answer: **“I can't find this in the provided documents.”**
- Source citations and source evidence: **none displayed**.
- Verdict: **PASS** for the specific previously failing Hybrid password-refusal case.

The reporter tested in the Windows laptop Chrome workflow with the Atlas PDFs previously uploaded. The pasted Markdown confirms the mode, build, refusal and lack of citations, but does not itself include independent instrumentation of device/browser internals, a document-count snapshot, or raw MiniLM vectors. This is a valid manually reported single-question acceptance, **not** a multi-question Hybrid accuracy benchmark, security proof, or semantic fact-checking guarantee.

The original r15 false-acceptance report above remains retained as the reproduction and baseline.

## Distinct validation gates

1. Automated Node regressions and Chromium UI smoke on the new branch: **required** before merge. Synthetic vectors prove guard wiring, **not** MiniLM model accuracy.
2. **PASS, 2026-10-10:** The user reproduced the same question in Windows Chrome using Hybrid MiniLM on build r16 and supplied an explicit refusal with zero citations. This closes the **single-question Hybrid acceptance gate**, not broader Hybrid performance evaluation.
3. Do not merge the Hybrid bug result into the 15/15 Keyword/Comparison in-sample benchmark. Report mode-specific scores separately; no cross-mode pass percentage has been established.

Related records: [Atlas 5.3 Keyword/Comparison retest](ATLAS_15_QUESTION_5_3_RETEST.md) and [evaluation protocol](EVALUATION_PROTOCOL.md).
