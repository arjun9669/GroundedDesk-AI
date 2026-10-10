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

## Distinct validation gates

1. Automated Node regressions and Chromium UI smoke on the new branch: **required** before merge. Synthetic vectors prove guard wiring, **not** MiniLM model accuracy.
2. After release, repeat on **Windows Chrome with actual MiniLM enabled and the original three Atlas PDFs** using the same question. Confirm r16 in the report footer/build, literal refusal, and no source evidence. The user browser retest is the actual acceptance gate.
3. Do not merge the Hybrid bug result into the 15/15 Keyword/Comparison in-sample benchmark. Report mode-specific scores separately; no cross-mode pass percentage has been established.

Related records: [Atlas 5.3 Keyword/Comparison retest](ATLAS_15_QUESTION_5_3_RETEST.md) and [evaluation protocol](EVALUATION_PROTOCOL.md).
