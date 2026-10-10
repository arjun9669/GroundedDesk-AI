# GroundedDesk AI 5.3.3 / r18 — Windows Chrome Atlas 15 acceptance

**Test date:** 2026-10-11 (Asia/Dubai).  
**Source:** Tester-supplied `GroundedDesk-r18-Atlas15-report.md` from the user's real Chrome workflow. This is a permanent record of the **reported browser results**, not an additional independent browser or MiniLM run by the repository CI. The referenced raw JSON and screenshots were not supplied during this documentation update.  
**Loaded build:** `2026-10-10-r18`.  
**Overall:** **15 PASS / 0 PARTIAL / 0 FAIL** under the stated **completeness, relevance, provenance, and citation-precision** criteria. This is in-sample acceptance on the unchanged fictional Atlas corpus, **not** an independent estimate of production accuracy.

## Browser conditions

- Chrome site: `https://arjun9669.github.io/GroundedDesk-AI/?build=20261010-r18`; the loaded footer and all Hybrid evidence reports confirmed `2026-10-10-r18`.
- Exactly three original Atlas PDFs, each ~3.4k extracted characters, were **manually uploaded** after the Chrome extension's automated file upload had been blocked by missing file-URL permission. No bundled samples remained.
- Actual on-device `Xenova/all-MiniLM-L6-v2` loaded after upload. Browser status showed `Embedding document passages: 9/16` then `Hybrid ready: indexed 16 passages locally using Xenova/all-MiniLM-L6-v2. No document inference API calls.`
- Qwen was off; all Q&A responses were extractive. No mock vectors or substituted synthetic source text were used for this Chrome evaluation.
- **11 Hybrid cases:** D01–D08 supported Q&A plus N13–N15 deliberate refusals. **4 separate lexical Comparison cases:** C09–C12. The latter are **not Hybrid/MiniLM accuracy**.
- The original question strings and expected clauses were unchanged; the report states questions were checked against the saved manifest. The separate built-in 28-case Keyword evaluation was not used.

## Historical comparison (no rescoring)

| Measure | r16 real Chrome | r17 real Chrome | r18 real Chrome |
| --- | ---: | ---: | ---: |
| Mixed-workflow answer-completeness passes | 12/15; 1 PARTIAL, 2 FAIL | 15/15 | **15/15** |
| Cases with all citations relevant | Defects observed | 14/15 | **15/15** |
| Supported Hybrid Q&A passes | 5/8 | 8/8 | **8/8** |
| Hybrid deliberate refusals | 3/3 | 3/3 | **3/3** |
| Separate lexical Comparison | 4/4 | 4/4 | **4/4** |
| Relevant source quotes / all source quotes | Additional irrelevant quotes | 16/18 | **16/16** |
| Source-literal quote provenance | 23/23 | 18/18 | **16/16** |

The **r18 improvement relative to r17 is citation precision**, not new answer completeness. The previous r16 and r17 results are preserved without modification.

## Every case

| Case | Workflow | Reported r18 verdict | Exact answer target or observed refusal |
| --- | --- | --- | --- |
| D01 | Hybrid | PASS | Governance G-01: written AI Release Council and Security Officer approvals |
| **D02** | **Hybrid** | **PASS — precision fix verified** | Governance G-02: model card, risk register, test results log, data-flow diagram, rollback plan; **only one Governance source** |
| D03 | Hybrid | PASS | Governance G-05: **at least 95%** of displayed citations must match original source |
| D04 | Hybrid | PASS | Runbook R-02: acknowledge P1 alerts within **15 minutes** |
| D05 | Hybrid | PASS | Runbook R-03: Incident Commander directs P1 containment within **30 minutes** |
| D06 | Hybrid | PASS | Runbook R-05: evidence retained **90 days unless a longer legal hold is issued** |
| D07 | Hybrid | PASS | Vendor V-03: high-risk supplier score **61–100** |
| D08 | Hybrid | PASS | Vendor V-03: written high-risk acceptance from **Legal Counsel and Security Officer** |
| C09 | Lexical Comparison | PASS | Runbook R-06 and Vendor V-04: internal **30 minutes** versus vendor notice **two hours** |
| C10 | Lexical Comparison | PASS | Runbook R-05 and Vendor V-05: 90-day retention versus deletion **within 30 days after contract end**, exceptions preserved |
| C11 | Lexical Comparison | PASS | Governance G-07 quarterly governance review versus Vendor V-06 quarterly red-team |
| C12 | Lexical Comparison | PASS | Governance G-04 and Vendor V-07: citation-number structural validity does not prove factual support |
| N13 | Hybrid | PASS | CEO date of birth not present: exact refusal; **zero citations** |
| N14 | Hybrid | PASS | Current Bitcoin price absent: exact refusal; **zero citations** |
| N15 | Hybrid | PASS | Atlas database password absent: exact refusal; **zero citations** |

## Source integrity and incident report

The report states **16/16 displayed answer quotations matched their named original PDFs** after whitespace normalization, **8/8 Hybrid quotations appeared within displayed retrieved excerpts**, and citation identifiers mapped to the correct source entries. All 8 supported Hybrid cases chose the correct primary document; 4 lexical comparisons cited both specified sources. No false acceptance was seen in the 3 unsupported cases; no false refusal in the 8 supported Hybrid cases. These are **observed test-set counts only**, not guarantees of semantic entailment on arbitrary documents.

**D02 was the final r17 precision defect.** In r17 the correct five-item governance package had been accompanied by irrelevant but literal Incident Runbook and Vendor citations. In r18 the tester observed precisely one Governance citation, with all five items. This is a successful browser observation of the 5.3.3 change.

**Clipboard capture anomaly:** One attempted D06 clipboard export contained the previous D05 answer. The tester rejected it on question-heading mismatch, reran the unchanged D06 prompt, visually confirmed the correct answer, and recaptured the report. The original stale capture was preserved by the tester in `r18-capture-anomaly.json`. No code change or expected-answer modification was made for this issue. This is a reporting/capture limitation to remember when automating future benchmarks, not a scored D06 retrieval failure.

The tester refers to `r18-atlas15-browser-evidence.json`, `r18-atlas15-scored-results.json`, `r18-atlas-model-state.txt`, `r18-D02.png`, and `r18-capture-anomaly.json`. **Only the Markdown report was supplied for this documentation update; raw evidence attachments have not been separately inspected.** The original user-supplied PDFs and answer-key PDF remain private and are not committed to the public repository.

## Release decision and next independent gate

**Accept r18 for the unchanged Atlas 15 in-sample Chrome criteria** with all completeness, relevance, and source-literal checks passing in this submitted report. Do **not** describe this as independent accuracy, a production readiness certificate, or proof of prompt-injection robustness.

**Phase 2 is NOT RUN.** The tester states that three fictional Meridian TXT documents, a frozen 24-question answer key, scoring rules and hashes were prepared in `r18-independent/`, but no Meridian question has yet been evaluated. Keep the frozen inputs unchanged and open a **separate new Chrome tab** containing only the three Meridian source documents. Do not upload the answer key as a searchable document. Enable actual MiniLM, run the 20 Hybrid Q&A cases and 4 lexical Comparison cases, and score completeness, citation relevance, provenance, false acceptance and false refusal. Preserve failures and distinguish from the already tuned Atlas benchmark.

Related: [r17 Atlas 15 actual Chrome test](ATLAS15_R17_CHROME_HYBRID_RETEST.md) · [r16 failed actual Chrome baseline](ATLAS15_R16_CHROME_HYBRID_BASELINE.md) · [r18 D02 release plan](HYBRID_D02_R18_PLAN.md) · [evaluation protocol](EVALUATION_PROTOCOL.md).
