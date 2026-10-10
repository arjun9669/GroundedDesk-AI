# GroundedDesk AI 5.3 — Atlas 15-question original-PDF-text re-evaluation

**Date:** 2026-10-10 (UTC)  
**Result:** **15/15 PASS** under the existing strict displayed-source-evidence rubric  
**Build:** `2026-10-10-r15`  
**Feature branch:** `feature-5-3-evidence-precision` (PR #18)  
**Prior baseline:** [9 PASS / 4 PARTIAL / 2 FAIL](ATLAS_15_QUESTION_BASELINE.md) on retrieval build r13  
**Evaluated workflows:** Original Keyword Q&A (`answerQuestion` + independent `verifyEvidenceResult`) and separate two-document Comparison (`compareDocuments`). **Not** the 5.2 candidate-release-checklist tool.

## How this run was performed

The same **three original synthetic Atlas PDFs** and the **original 15-question answer-key PDF** used for the baseline were retrieved from the user's private file library, then text was extracted and whitespace-normalized. The current GitHub branch's unmodified source contents for `retrieval.mjs`, `research.mjs` and `quality.mjs` were evaluated directly in an offline JavaScript runtime on that PDF-derived text.

No LLM, Qwen inference, embeddings, internet retrieval, invented simulated model response, or private-file upload to GitHub was involved. This is an **engine-level test**, not an independently instrumented Safari/PDF.js upload/clipboard test. The synthetic answer key is known to development and the feature was iteratively tuned against its failures, so 15/15 is **in-sample regression success**, **not independent real-world accuracy**.

### Private source file fingerprints

| PDF (not checked into GitHub) | SHA-256 |
| --- | --- |
| `01_Atlas_AI_Governance_Policy.pdf` | `a59c08f9f4b598870ca6725006722e474903f401c16abd301bd52a682ced01fc` |
| `02_Atlas_Incident_Response_Runbook.pdf` | `7badc6c82b3c02fa92414cbbf4942d1d36221fd950cc01f5f8a077bff9dcdaf4` |
| `03_Atlas_Vendor_AI_Assessment.pdf` | `804543f46914440faa56925ca70efd7ba306689fb6e83536e9da7a525ae3cad5` |
| `GroundedDesk_15_Question_Answer_Key.pdf` | `955be329ab225cb009d67d6b15463b38202b5c7d569b5813b72f4e8666ba9504` |

**Scoring rule:** A PASS requires a literal **displayed** quote from the correct document(s) that visibly supports the answer key (or, for refusal cases, a refusal without any cited unsupported claim). Correct facts hidden in a longer retrieved excerpt are insufficient. In comparisons, each selected document must supply applicable evidence; the app does **not** generate a synthesized or verified cross-document conclusion.

## Per-case results

| Case | Expected target | Observed displayed evidence | Outcome |
| --- | --- | --- | --- |
| D01 | G-01 — written high-risk release approval, Council + Security Officer | Exact high-risk approval sentence | PASS |
| D02 | G-02 — five-piece evidence package | Model card, risk register, test log, data-flow diagram, rollback plan | PASS |
| D03 | G-05 — 95% citation provenance target | Quote identifies **95%** of displayed citations matching original source text; no longer confuses with separate 90% targets | PASS |
| D04 | R-02 — P1 alert acknowledged within 15 minutes | Correct on-call acknowledgment sentence | PASS |
| D05 | R-03 — Incident Commander directs P1 containment within 30 minutes | Correct role and time | PASS |
| D06 | R-05 — incident evidence stored for 90 days, legal-hold exception | Correct 90-day sentence and exception | PASS |
| D07 | V-03 — supplier High-risk score range 61–100 | Correct score bands; extraneous Governance Policy citation **removed** | PASS |
| D08 | V-03 — written acceptance by Legal Counsel + Security Officer | Correct high-risk vendor acceptance, not the unrelated abbreviated-review sentence | PASS |
| C09 | Internal P1 containment 30 minutes vs supplier notification 2 hours | Incident Runbook **R-06** source sentence states both 30 min and 2 hr; Vendor Guide **V-04** source states 2-hr contractual requirement | PASS |
| C10 | Incident evidence 90 days vs vendor copies deleted within 30 days of contract end | Incident Runbook R-05 and Vendor Guide V-05 quoted correctly | PASS |
| C11 | Quarterly internal governance review vs quarterly high-risk vendor red-team | G-07 + V-06 quoted correctly | PASS |
| C12 | Citation number/source identity structurally checked, not proof of factual support | G-04 structural-check caveat + V-07 lack-of-factual-entailment statement | PASS |
| N13 | CEO date of birth absent | Explicit refusal; zero sources | PASS |
| N14 | Current Bitcoin price in AED absent | Explicit refusal; zero sources | PASS |
| N15 | Database password absent | Explicit refusal; zero sources; unrelated PDF headers no longer offered as an answer | PASS |

C09's evidence used a relevant **R-06** sentence rather than the answer key's canonical **R-03** reference. It nevertheless explicitly identifies the same 30-minute internal target and the 2-hour external notice, which meets the answer-key instruction to verify the substantive comparison using both documents. This distinction is retained rather than silently claiming an exact section-ID match.

## Category totals

| Category | Baseline r13 strict passes | 5.3 r15 strict passes |
| --- | ---: | ---: |
| Direct question evidence | 6/8 | **8/8** |
| Two-document comparison evidence | 1/4 | **4/4** |
| Deliberate absent-information refusals | 2/3 | **3/3** |
| **Total** | **9/15** | **15/15** |

For both builds, there is a separate question of **source provenance** vs. factual support. Every answered 5.3 result was independently verified as quoted from its corresponding loaded text. This does not establish semantic entailment for arbitrary natural-language claims.

## What changed in 5.3

1. **Complete-source sentence selection:** After a document has been retrieved, score literal complete sentences from the original source, not cut-off chunk fragments.
2. **Compound two-part evidence:** Retain bounded, contiguous neighboring requirements when both facts are requested and evidenced in adjacent sentences.
3. **Comparison quality:** Seek relevant literal sentences separately within the two *user-selected* documents, without imposing general Keyword chunk thresholds.
4. **Specific-attribute refusals:** Withhold responses to unsupported requests for concrete credentials, birth dates, salary/price-like attributes; generic header/title overlap does not suffice.
5. **Citation precision:** Filter weak secondary quotations and surface explicit numeric bands or citation percentages without swapping similarly worded clauses.
6. **Reproducibility:** Add 15 synthetic Atlas-scenario regression tests plus extra unseen-style examples for credential-policy questions and literal provenance; run all existing CI suites.

## Further acceptance gates (not yet met by this run)

- Upload all three *actual* Atlas PDFs through **iPhone Safari** at GitHub Pages build r15, run the same keyword and comparison scenarios, and capture returned reports. This verifies PDF.js parsing, selection, browser caching, UI and clipboard behavior—not tested in the offline run.
- Evaluate against **unseen, independently authored non-sensitive PDFs** and label answers *before* feature tuning; retain false positives and unsupported queries. A perfect in-sample 15/15 score has no generalization guarantee.
- Check security and data privacy across browser environments. These regex/lexical safeguards are not robust semantic fact verification or prompt-injection immunity.
- A true 5.3 milestone acceptance requires final CI and Pages deployment success, followed by manual device verification. CI's Chromium UI smoke uses **synthetic text**, not these actual PDFs.

**Related:** [Original failed/partial baseline](ATLAS_15_QUESTION_BASELINE.md) · [Evaluation methodology](EVALUATION_PROTOCOL.md) · [5.2 PDF smoke test](VALIDATION_5_2_ATLAS.md).
