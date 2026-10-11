# GroundedDesk AI 5.4 / r19 — Meridian 24 Chrome regression acceptance

**Tester-supplied source:** `GroundedDesk-r19-Meridian24-regression-report.md` (actual Chrome run, 11 October 2026, Asia/Dubai). This documentation preserves the reported run, **not a second independent browser execution**. The report references raw JSON, screenshots and source files, which were not separately attached to this documentation update.

**Result:** **18 PASS / 4 PARTIAL / 2 FAIL** (18/24 = **75% strict full passes**). Previously failed unsupported requests **I23 and I24 now refuse with zero citations**. **No previously passing question regressed**; all remaining six non-passing outcomes were unchanged.

**Benchmark status:** This is a **post-tuning, in-sample regression** on the same Meridian dataset previously tested on r18. The first-look r18 **16 PASS / 4 PARTIAL / 4 FAIL** (16/24 = 66.7%) remains preserved [unaltered](MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md). **Do not call r19's score independent held-out accuracy.**

## Verified reported browser conditions

- URL: `https://arjun9669.github.io/GroundedDesk-AI/?build=20261011-r19`; footer and 20 Hybrid exports confirmed retrieval build `2026-10-11-r19`. Four Comparison reports retain an older 4.0 heading without build field, but were run in the same footer-verified r19 tab.
- The three original frozen `01_Meridian_Logistics.txt`, `02_Meridian_Maintenance.txt` and `03_Meridian_Purchasing.txt` files were manually uploaded into an otherwise empty library. The frozen source hashes and answer-key hash matched before and after testing; no Atlas files, bundled samples or answer key were loaded as searchable documents.
- Actual on-device `Xenova/all-MiniLM-L6-v2` loaded and indexed **9 passages**. Qwen generation was disabled. No mock vectors, synthetic substitutes, code edits or question reformulations were used in the browser scoring.
- **20 Hybrid Q&A** (I01–I16, I21–I24) and **four separate lexical Comparison** (I17–I20) followed the previously frozen questions, answer key and rubric.

## Result comparison

| Measure | r18 first unseen | r19 in-sample regression |
| --- | ---: | ---: |
| Combined strict PASS / PARTIAL / FAIL | **16 / 4 / 4** | **18 / 4 / 2** |
| Actual MiniLM Hybrid Q&A PASS / PARTIAL / FAIL | 14 / 2 / 4 | **16 / 2 / 2** |
| Separate lexical Comparison PASS / PARTIAL / FAIL | 2 / 2 / 0 | **2 / 2 / 0** |
| Unsupported questions refused with zero citations | 2/4 | **4/4** |
| Unsupported false acceptances | 2/4 | **0/4** |
| Supported Hybrid false refusals | 0/16 | **0/16** |
| Original-source quotation matches | 26/26 | **24/24** |
| Displayed Hybrid quote/excerpt matches | 18/18 | **16/16** |
| Relevant displayed quotations | 22/26 (84.6%) | **22/24 (91.7%)** |
| Cases with all quotations relevant or correct zero-citation refusal | 20/24 | **22/24** |

The two removed quotations were the unsupported, irrelevant r18 citations. No source text was fabricated in either build; **source-literal provenance is not equivalent to answering the question**.

## Frozen case outcomes

| Case | Workflow | r18 | r19 | Description |
| --- | --- | --- | --- | --- |
| I01–I06 | Hybrid | PASS | **PASS** | Dispatch cutoff, shipping packet, temperature, conveyor inspection, return authorization and belt part code |
| **I07** | Hybrid | FAIL | **FAIL** | Wrong purchasing approval band: above 800 through 4000 Budget Manager selected for an **above-4000** question requiring written **Finance Lead and Operations Director** approval |
| I08 | Hybrid | PASS | **PASS** | Purchasing four-document order packet |
| **I09** | Hybrid | PARTIAL | **PARTIAL** | Six business hours correct, but omitted that acknowledgement is **not** a delivery guarantee |
| **I10** | Hybrid | FAIL | **FAIL** | 15:00 dispatch answer cites 14:20 cutoff but omits **next operating day**, the sole required fact |
| I11–I14 | Hybrid | PASS | **PASS** | Damage isolation, 800-credit threshold, route review and urgent dispatch exception |
| **I15** | Hybrid | PARTIAL | **PARTIAL** | Dusty-bay lubrication **30 hours** correct; missed normal **60 hours** and unchanged inspection interval |
| I16–I17 | Hybrid / Comparison | PASS | **PASS** | Sole-source exception and distinct incident deadlines |
| **I18** | Comparison | PARTIAL | **PARTIAL** | Retention 75/240 days correct; missed unresolved equipment-investigation exception |
| I19 | Comparison | PASS | **PASS** | Six-week review frequencies |
| **I20** | Comparison | PARTIAL | **PARTIAL** | Shipping packet correct; purchasing source selected **P-05 retention** rather than **P-03 packet contents** |
| I21–I22 | Hybrid | PASS | **PASS** | Absent phone/commodity price correctly refused without citations |
| **I23** | **Hybrid** | **FAIL** | **PASS** | Missing exact bank-account number now produces explicit refusal, **zero citations** |
| **I24** | **Hybrid** | **FAIL** | **PASS** | Missing numerical conveyor bolt torque now produces explicit refusal, **zero citations** |

## Reproducibility and raw evidence caveat

The tester's reported source SHA-256 fingerprints:

- `01_Meridian_Logistics.txt`: `f389c52a1ee62c2f9f122edf5b7c58ac0440025c8936d07a970d32c57b2886b2`
- `02_Meridian_Maintenance.txt`: `fd3196657d0c015c23429cfc6463c31b6304fae9f9bb348e25c4aab6f870af5d`
- `03_Meridian_Purchasing.txt`: `4c2b3f2c55a0e71108d96e2a9048f6072aefc7acf3679e9e1c82e486d8363d96`
- `fixed-answer-key.json`: `5984910de2fe1d0ac8513e15285ff4dc84e0588f193b9a29bb811d9972134a96`

The submitted report references `r19-meridian24-scorecard.json`, `r19-meridian-browser-evidence.json`, `r19-meridian-model-state.txt`, `r19-I23.png`, `r19-I24.png` and `r19-meridian-freeze-verification.json`. **Those artifacts were named in the Markdown report but are not independently inspected in this documentation change.** The original r18 scorecard fingerprint was reported as `bf27850906db0dccf5cc4c091c130d877d5030631d9369106b04f2643bf99957`.

## Engineering priorities and release gate

The r19 requested-value refusal safeguard is **browser-verified on I23 and I24**, without regressions on the 16 previous passes. This **does not close** the broader answer-correctness gate because **I07 and I10 remain FAIL**, while **I09, I15, I18, I20 remain PARTIAL**.

Next targeted fixes should address numeric approval-boundary selection (I07) and selecting the directly operative next-day statement for temporal questions (I10), followed by source-complete qualifiers and lexical Comparison precision (I09/I15/I18/I20). Avoid brittle organization-specific or answer-key hardcoding; protect previously passing questions with regression tests.

**A future rerun on this Meridian set is a regression, not a new held-out evaluation.** Freeze a separate corpus and scoring rules before claiming improved generalization.

Related: [first unseen r18 Meridian 24](MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md), [r19 fix plan](MERIDIAN_R19_UNSUPPORTED_VALUES.md), [r18 tuned Atlas 15](ATLAS15_R18_CHROME_HYBRID_ACCEPTANCE.md), [evaluation protocol](EVALUATION_PROTOCOL.md).
