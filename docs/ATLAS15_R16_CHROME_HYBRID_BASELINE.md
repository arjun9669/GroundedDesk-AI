# Atlas 15 — r16 Windows Chrome Hybrid baseline for 5.3.2

**Source:** Tester-supplied `GroundedDesk-r16-Atlas15-report.md` (Chrome browser scorecard, 11 October 2026, Asia/Dubai). The raw uploaded report, JSON files referenced by it, screenshots, and original private PDF bytes are **not committed to this public repository**.

**Observed loaded retrieval build:** `2026-10-10-r16`  
**Test environment:** Windows Chrome; original Atlas PDFs already loaded; local MiniLM + BM25 RRF for D01–D08/N13–N15; **separate deterministic lexical Comparison**, *not Hybrid*, for C09–C12. No Qwen.  
**Overall result:** **12 PASS, 1 PARTIAL, 2 FAIL** — strict full-pass rate **12/15 (80%)** across **mixed workflows**, not MiniLM accuracy.  
**Hybrid-only Q&A:** 8 PASS / 1 PARTIAL / 2 FAIL = **8/11 fully passing**. Supported Hybrid direct answers: **5/8 PASS**, **1 PARTIAL**, **2 FAIL**. All three Hybrid deliberate refusals passed. Separate lexical Comparison: **4/4 PASS**.

## Failed/partial Hybrid cases

| ID | r16 verdict | Observed answer | Expected evidence |
| --- | --- | --- | --- |
| **D03** | **FAIL** | Cited prohibited-data policy and a vendor sentence about factual entailment; did **not** state the 95% provenance target, though 95% occurred within expanded retrieved evidence | Governance G-05, **at least 95% of displayed citations match the original source text** |
| **D06** | **PARTIAL** | Cited a **truncated** literal string, “Exported evidence packets are retained for 90 days in the simulated audit store, unless” | Runbook R-05, **90 days unless a longer legal hold is issued** |
| **D08** | **FAIL** | Selected the unrelated local-only abbreviated supplier-review/one-off Security Officer approval passage | Vendor V-03, **written acceptance from both Legal Counsel and Security Officer** |

Other direct questions D01, D02 and D07 had correct core answers but also displayed unrelated, source-literal secondary citations. C09–C12 comparison answers and N13–N15 refusals passed.

**Reported provenance:** 23/23 displayed quotations matched their original PDFs after whitespace normalization; 15/15 Hybrid quotations appeared in displayed excerpts; all deliberate refusals cited no source. Quotation validity does not establish factual support. The browser extension could not perform a fresh PDF upload because file-URL access was disabled, so the test reused the originally loaded PDFs. Its live Hybrid mode/status identified the method; the report did not independently inspect runtime embedding values.

## Root cause and r17 patch scope

`answerFromCandidates()` previously used a **best sentence inside a retrieved chunk** in Hybrid mode even if that chunk cut off the exception or contained the wrong clause. The r15 full-document literal-sentence selection had been conditioned on **Keyword only**. The new r17 logic permits Hybrid to choose a source-wide literal sentence when its question-term alignment is strong; otherwise the previous semantic-only excerpt behavior remains. The correction also filters low-relevance additional quotes for simple questions while keeping explicit two-document comparison queries separate.

Regressions in `tests/hybrid-atlas-evidence.test.mjs` check the exact D03, D06, D08 failure shapes with deterministic **mock Hybrid candidates/vectors**, plus refusals, citation relevance and a semantic-only paraphrase. These are *logic tests*, not an actual MiniLM accuracy test.

## Acceptance requirements

- All Node and Chromium CI checks must pass after changes to `retrieval.mjs` and the browser import cache fingerprint.
- Repeat the **unchanged original Atlas 15** in Chrome using *actual* MiniLM and build `2026-10-10-r17`; keep D03/D06/D08 and N13/N14/N15 outcomes. Do not declare r17 15/15 from synthetic test fixtures or PR checks.
- Keep the historical r16 **12 PASS / 1 PARTIAL / 2 FAIL** record available; a new result is separately dated and scored.

Related: [Original r15 offline Keyword/Comparison test](ATLAS_15_QUESTION_5_3_RETEST.md); [r16 Hybrid single-question refusal validation](HYBRID_REFUSAL_5_3_1.md); [evaluation protocol](EVALUATION_PROTOCOL.md).
