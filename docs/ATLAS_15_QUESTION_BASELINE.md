# GroundedDesk — Atlas 15-question PDF-derived baseline

**Date:** 2026-10-10  
**Result:** **9 PASS / 4 PARTIAL / 2 FAIL** (strict displayed-evidence rubric; 15 synthetic cases)  
**Baseline commit:** `1c701a608c4f5f5aa81d8c25b058d907f770cd6a`  
**Keyword build:** `2026-10-10-r13` (unchanged by release-control 5.2)  
**Mode:** Actual repository `answerQuestion` / `verifyEvidenceResult` for 8 direct + 3 deliberate-refusal cases; actual repository `compareDocuments` for 4 cross-document cases. No embeddings, Qwen, or synthetic model outputs.  
**Corpus:** Source text extracted from the three original, user-supplied two-page Atlas PDF files (all fictional and separately held; PDF files **not committed to this public repository**). Source texts were whitespace-normalized before indexing. The answer key was read from `GroundedDesk_15_Question_Answer_Key.pdf`.  
**Execution limits:** Engine functions were evaluated from the exact `main`-branch JavaScript source in an isolated offline JS runtime. This **was not** a live iPhone/Safari/PDF.js/browser export replay. Browser ingestion, upload reliability, semantic models and interactive UI were not scored here. All outcomes below are reviewer-scored from the observed excerpts, not invented benchmark percentages.

## Source integrity / repeatability

| Original source PDF | SHA-256 |
| --- | --- |
| `01_Atlas_AI_Governance_Policy.pdf` | `a59c08f9f4b598870ca6725006722e474903f401c16abd301bd52a682ced01fc` |
| `02_Atlas_Incident_Response_Runbook.pdf` | `7badc6c82b3c02fa92414cbbf4942d1d36221fd950cc01f5f8a077bff9dcdaf4` |
| `03_Atlas_Vendor_AI_Assessment.pdf` | `804543f46914440faa56925ca70efd7ba306689fb6e83536e9da7a525ae3cad5` |
| `GroundedDesk_15_Question_Answer_Key.pdf` | `955be329ab225cb009d67d6b15463b38202b5c7d569b5813b72f4e8666ba9504` |

**Extraction:** Source PDF text, including headers/footers, was flattened to single-spaced text. The normalized document lengths were respectively **3,404**, **3,369** and **3,339** characters. Actual original PDF paragraphs and benchmark targets were compared against returned quotes and underlying excerpts.

**Strict scoring used here:** `PASS` requires the visible selected quote(s), not merely nearby invisible text, to support the requested answer and the correct document(s). `PARTIAL` means at least some relevant evidence appeared but the displayed selected quote(s) did not establish the full answer. `FAIL` means evidence was missing, unresponsive, or a claim was presented as supported although it was absent. This is a stricter *displayed-answer* measure than a source-access-only measure; notably, D03/D08 have correct facts inside the retrieved passage but the **selected answer quote is wrong**. Do not treat structural citation checks as entailment.

## Per-question observed results

| ID | Workflow | Answer-key target | Observed behavior | Outcome |
| --- | --- | --- | --- | --- |
| D01 | Keyword | G-01 — AI Release Council + Security Officer written approval | Quoted the correct high-risk approval sentence from Governance Policy | **PASS** |
| D02 | Keyword | G-02 — model card, risk register, test log, data-flow diagram, rollback plan | Quoted the complete evidence-package sentence | **PASS** |
| D03 | Keyword | G-05 — **95%** citation provenance target | Displayed the **90%** source-selection/refusal target sentence instead; 95% statement exists in retrieved excerpt but **not the selected quote** | **PARTIAL** |
| D04 | Keyword | R-02 — P1 acknowledgment within **15 minutes** | Correct on-call acknowledgment passage from Incident Runbook | **PASS** |
| D05 | Keyword | R-03 — Incident Commander initial P1 containment within **30 minutes** | Correct role and 30-minute passage | **PASS** |
| D06 | Keyword | R-05 — incident evidence packets retained **90 days**, subject to legal hold | Correct 90-day passage with exception | **PASS** |
| D07 | Keyword | V-03 — High-risk vendor scores **61–100** | Quoted correct score bands, but also appended an irrelevant Governance Policy citation | **PASS**, with citation-precision defect |
| D08 | Keyword | V-03 — High-risk supplier requires written acceptance from **Legal Counsel + Security Officer** | Returned an unrelated **local-only supplier abbreviated-review** sentence; correct approval requirement was in retrieved excerpt but not selected quote | **PARTIAL** |
| C09 | Comparison | R-03 + V-04 — internal P1 containment **30 min** vs vendor notice **2 hr** | Incident Runbook quote included both values (from R-06), while Vendor Guide quote referred to the vendor deadline **without specifying two hours** | **PARTIAL** |
| C10 | Comparison | R-05 + V-05 — incident evidence **90 days** vs vendor document copies deleted within **30 days** | Vendor Guide quote correctly gave the 30-day rule, but Incident Runbook showed unrelated R-06 containment/notification passage instead of R-05 90-day retention | **PARTIAL** |
| C11 | Comparison | G-07 + V-06 — quarterly governance review vs quarterly high-risk vendor red-team | Both documents produced relevant literal source quotes with the correct distinct quarterly obligations | **PASS** |
| C12 | Comparison | G-04 + V-07 — citation number alone does not prove factual correctness | Comparison returned **no matching excerpts from either document**; cannot verify requested distinction in displayed comparison | **FAIL** |
| N13 | Keyword refusal | CEO date of birth not present | Explicitly returned “I can't find this in the provided documents.” and no citations | **PASS** |
| N14 | Keyword refusal | Live Bitcoin price in AED not present | Explicitly returned “I can't find this in the provided documents.” and no citations | **PASS** |
| N15 | Keyword refusal | Exact Atlas database password not documented | **False acceptance:** returned three cited Atlas PDF cover/header passages rather than refusing; none contains a database password | **FAIL — unsupported answer** |

### Key verbatim diagnostics

- **D03 wrong selected answer:** `The source-selection target is at least 90 percent on the supported questions, and the unsupported-question refusal` (partially cut-off quotation). **Gold evidence in same retrieved excerpt:** `At least 95 percent of displayed citations must match the original source text.`
- **D08 wrong selected answer:** `that sends no document content to a supplier may receive an abbreviated review, subject to Security Officer approval.` **Gold source sentence in V-03:** `A High vendor risk requires written acceptance by both Legal Counsel and the Security Officer.`
- **C09** Runbook returned R-06 sentence about both internal containment and vendor notification. Vendor Guide returned: `This is the vendor notification deadline and does not replace the internal 30-minute P1 containment target in the Incident Response Runbook.` The **two-hour vendor timing was not displayed in the Vendor Guide quote**.
- **C10** Runbook returned the R-06 P1 containment/vendor notification sentence instead of `Exported evidence packets are retained for 90 days`. The Vendor Guide returned V-05 30-day deletion correctly.
- **C12** Both returned comparison excerpts were empty despite relevant G-04 and V-07 sections existing.
- **N15** Three correctly attributable but wholly irrelevant document-title/header quotations were presented as an answer to a nonexistent password question.

## Category totals and meaning

| Category | PASS | PARTIAL | FAIL | Fully supported / tested |
| --- | ---: | ---: | ---: | ---: |
| Direct Q&A | 6 | 2 | 0 | **6/8** |
| Cross-document comparison | 1 | 2 | 1 | **1/4** |
| Deliberate refusals | 2 | 0 | 1 | **2/3** |
| **Combined synthetic baseline** | **9** | **4** | **2** | **9/15** |

**9/15 (60%) is a strict functional smoke-test outcome on three deliberately synthetic PDFs and cannot be described as real-world AI accuracy.** The four PARTIAL cases are not counted as full passes. It also does not establish that a generic 5.2 release-control checklist can answer these questions; the appropriate Keyword and comparison modes were intentionally tested.

**Source provenance is a distinct metric:** Retrieved nonempty quotes were literal passages from their respective loaded source texts, even for incorrect/irrelevant answers. This is a demonstration that exact citations are **not** sufficient to establish answer relevance or factual support. C12 produced no content, so “provenance passed” there cannot count as evidence.

## Prioritized follow-up defects

1. **Highest priority — N15 false acceptance:** strengthen refusal decisions for specific attributes (passwords/secrets, DOB, amounts, etc.) when the candidate quote merely mentions a named organization; ensure unrelated but legitimate credential-management questions still work and do not hardcode this benchmark question.
2. **D03 and D08 answer selection:** prefer complete sentences with the exact numeric/actor constraints in the question; avoid clipped, mis-targeted passages even when the right clause is in the excerpt.
3. **C12 and C10 comparison retrieval:** retrieve passage(s) from the correct section of each named document; do not silently present empty or unrelated excerpts as a successful comparison.
4. **C09 and D07 citation precision:** do not append unrelated citations, and ensure each selected document's visible quote supports its assigned side of a comparison.
5. **Repeat the same 15 cases after changes** on the same original source PDFs, retain negative results, and only then mark any regression fixed. Maintain Keyword, 5.1 and 5.2 workflow isolation.

## Re-run guidance

With access to the **same original PDFs** (identified by hashes above), extract selectable text locally while retaining original document names, then execute `answerQuestion(question, buildIndex(threeDocuments))` with the 8 direct questions and 3 refusal questions. For C09–C12, use `compareDocuments(documentA, documentB, question)` with the exact document pairs from the answer key. Verify source identity and displayed quotes against PDF source paragraphs, not citation syntax alone.

Run `node --test tests/*.test.mjs` as an independent regression suite. It is not a substitute for these 15 PDF-derived cases. Manual device-specific end-to-end upload/clipboard/optional-model behavior remains outside this evaluation.

**Related records:** [5.1 PDF manual smoke test](VALIDATION_5_1_PHASE1.md) · [5.2 PDF manual smoke test](VALIDATION_5_2_ATLAS.md) · [evaluation protocol](EVALUATION_PROTOCOL.md).
