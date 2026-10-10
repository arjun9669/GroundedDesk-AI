# GroundedDesk AI 5.3.2 / r17 — Windows Chrome Atlas 15 manual retest

**Reported test date:** 2026-10-11 (Asia/Dubai)  
**Source:** User-supplied `GroundedDesk-r17-Atlas15-report.md`, generated from an actual Chrome testing workflow. This page preserves the submitted observations and scoring; it is **not** a separate browser run by the GitHub CI or this documentation update.  
**Loaded retrieval build:** `2026-10-10-r17`  
**Verdict under the unchanged r16 completeness rubric:** **15 PASS / 0 PARTIAL / 0 FAIL**. One answer (**D02**) still carries **two irrelevant but source-literal supplemental citations**.

## Test environment and methodology

- Page URL: `https://arjun9669.github.io/GroundedDesk-AI/?build=20261010-r17`; both footer and Hybrid reports confirmed build r17, although the site title still displayed 5.0.
- Three original fictional Atlas PDFs were manually uploaded and were the **only** loaded documents. No bundled example files remained. Each PDF extracted to approximately 3.4k characters.
- The Chrome test activated on-device `Xenova/all-MiniLM-L6-v2` **after** upload, and reported **16 indexed passages**. It observed actual model progress and the Hybrid-ready message. Qwen generation was off. No mock vectors or offline answer substitutions were used.
- **D01–D08 and N13–N15 (11 questions): real MiniLM + BM25-style reciprocal-rank Hybrid Q&A.** **C09–C12 (4 questions): separate deterministic lexical two-document Comparison.** The comparison cases are not tests of Hybrid.
- The exact 15 Atlas questions and original scoring criteria were reused. The separate built-in 28-question Keyword evaluation was not used.
- **PASS** required the complete expected factual answer in displayed quotations and correct source support. A missing exception is **PARTIAL**, and incorrect evidence is **FAIL**. As in the r16 baseline, extra noncontradictory but irrelevant quotations are recorded as a **separate precision defect**, not automatically marked FAIL.

## r16 (preserved) versus r17

| Measure | r16 Chrome | r17 Chrome |
| --- | ---: | ---: |
| **Combined 15, mixed workflows** | **12 PASS / 1 PARTIAL / 2 FAIL** | **15 PASS / 0 PARTIAL / 0 FAIL** |
| Actual MiniLM Hybrid Q&A | 8/11 full passes | **11/11 full passes** |
| Supported Hybrid direct questions | 5/8 full passes | **8/8 full passes** |
| Hybrid deliberate refusals | 3/3; no citations | **3/3; no citations** |
| Separate lexical Comparison | 4/4 | **4/4** |
| Quotation provenance | 23/23 source-literal | **18/18 source-literal** |
| All-quotation relevance | Extraneous quotations on several questions | **D02 still has 2 extraneous quotations** |

The combined score improved from **80% to 100% (+20 percentage points)** within this **known, in-sample, mixed-workflow synthetic corpus**. This is **not** a held-out evaluation, a measure of production MiniLM accuracy, or a guarantee of answer entailment. No r16 answers were rescored.

## Per-case results

| Case | Workflow | r16 | r17 | Observed r17 evidence |
| --- | --- | --- | --- | --- |
| D01 | Hybrid | PASS | **PASS** | G-01: Council and Security Officer written approvals, with earlier unrelated citations removed |
| D02 | Hybrid | PASS | **PASS** (precision defect) | G-02: full five-item release package; two unnecessary source-valid citations from Runbook and Vendor remain |
| D03 | Hybrid | FAIL | **PASS** | G-05: at least **95%** of displayed citations match the original text |
| D04 | Hybrid | PASS | **PASS** | R-02: acknowledge P1 alerts within **15 minutes** |
| D05 | Hybrid | PASS | **PASS** | R-03: Incident Commander directs initial P1 containment within **30 minutes** |
| D06 | Hybrid | PARTIAL | **PASS** | R-05: exported evidence retained **90 days unless longer legal hold applies** |
| D07 | Hybrid | PASS | **PASS** | V-03: High-risk supplier scores **61–100**, no extra governance quotation |
| D08 | Hybrid | FAIL | **PASS** | V-03: written acceptance by **Legal Counsel and Security Officer** |
| C09 | Comparison | PASS | **PASS** | R-06 and V-04: 30-minute internal containment vs two-hour supplier notification |
| C10 | Comparison | PASS | **PASS** | R-05 and V-05: 90-day evidence retention vs supplier copies deleted within 30 days after contract end; exceptions included |
| C11 | Comparison | PASS | **PASS** | G-07 and V-06: quarterly governance review vs quarterly high-risk vendor red-team |
| C12 | Comparison | PASS | **PASS** | G-04 and V-07: valid citation structure does not prove factual support |
| N13 | Hybrid | PASS | **PASS** | CEO birth date absent: explicit refusal, **zero citations** |
| N14 | Hybrid | PASS | **PASS** | Current Bitcoin price absent: explicit refusal, **zero citations** |
| N15 | Hybrid | PASS | **PASS** | Exact database password absent: explicit refusal, **zero citations** |

## Provenance and remaining defect

The submitted report says **18/18 displayed quotations** occurred in the corresponding original, whitespace-normalized PDFs. All **10/10 displayed Hybrid quotations** also occurred in their respective expanded evidence excerpts. Source identifiers matched the exported source entries; all refusals had **zero citations**. These numbers were reported by the browser tester, **not independently rechecked from separately uploaded JSON artifacts during this documentation update**.

**D02 — source relevance remains imperfect:** The first citation correctly lists *model card, risk register, test results log, data-flow diagram, rollback plan*, but the next two citations are unrelated:

> [2] The Model Owner verifies whether source citations or draft answers must be withdrawn.

> [3] The procuring team must record human validation examples before approving sensitive use cases.

Those additional quotes are from the Incident Response Runbook and Vendor AI Assessment, respectively. **D02 remains PASS under the previously established answer-completeness rubric but is PARTIAL for per-citation relevance.** If the stricter rule required *every displayed citation* to be relevant, **14/15 cases** would have clean all-citation relevance. Do not label the test “flawless 15/15 precision.”

## Reproducibility and boundaries

The user-provided report refers to `r17-atlas15-browser-evidence.json`, `r17-atlas15-scored-results.json`, `r17-atlas-model-state.txt`, `r17-refusal.png`, and `r17-comparison.png`. Those supporting files were **referenced but not attached to this documentation step** and are not in this public repository. This document describes the reported Chrome outcomes, not independent raw-artifact verification.

The original three Atlas PDFs and answer-key PDF are user-supplied private synthetic test materials, not checked into GitHub. Their known fingerprints match the prior [r16 benchmark record](ATLAS15_R16_CHROME_HYBRID_BASELINE.md).

This is a successful **in-sample browser acceptance for 5.3.2 answer completeness and supported refusals**, **not** unseen-document generalization, PDF security proof, prompt-injection robustness, or exhaustive end-to-end accuracy.

## Recommended next checks

1. Independently label **new non-sensitive PDF questions before running the tool**, including unsupported questions and compound exceptions, and separate results for Hybrid Q&A and lexical Comparison.
2. Investigate **D02 extra citations** by comparing sentence-level relevance, while retaining legitimate cross-document evidence and semantic-only paraphrase support.
3. Preserve this r17 success and [the original r16 failures](ATLAS15_R16_CHROME_HYBRID_BASELINE.md) as distinct records rather than overwriting either.

Related: [5.3.1 Hybrid password-refusal validation](HYBRID_REFUSAL_5_3_1.md) · [Original offline Keyword 15-question re-evaluation](ATLAS_15_QUESTION_5_3_RETEST.md) · [Evaluation protocol](EVALUATION_PROTOCOL.md).
