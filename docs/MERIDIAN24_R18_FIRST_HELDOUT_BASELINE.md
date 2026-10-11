# GroundedDesk AI r18 — Meridian 24 first held-out Chrome benchmark

**Test date:** 2026-10-11 (Asia/Dubai). **Source:** user-uploaded `GroundedDesk-r18-Meridian24-report.md`, prepared from an actual Chrome browser test. This document preserves **reported** results, not a second independent execution by GitHub CI. Report-referenced JSON, screenshot, frozen source files, and zip were not attached to this repository update.

**First frozen, previously unseen corpus:** 3 fictional, non-sensitive Meridian TXT documents about logistics, maintenance, and purchasing. Frozen before testing at `2026-10-10T22:33:42.410815+00:00`; the tester verified source and answer-key hashes before and after testing and did **not** edit questions, scoring, source files, or code.

**Live engine:** `2026-10-10-r18`, on-device `Xenova/all-MiniLM-L6-v2`, **9 indexed passages**, Qwen off. **20 Hybrid Q&A cases** (I01–I16, I21–I24); **4 distinct lexical Comparison cases** (I17–I20). The built-in 28-question evaluation was not substituted.

## Result: held-out acceptance gate FAIL

| Measure | Value |
| --- | ---: |
| Overall strict full passes | **16/24 (66.7%)** |
| Partial | **4/24** |
| Fail | **4/24** |
| Hybrid Q&A | **14 PASS / 2 PARTIAL / 4 FAIL** |
| Separate lexical Comparison | **2 PASS / 2 PARTIAL / 0 FAIL** |
| Unsupported refusals | **2/4 correct** |
| **False acceptance of unsupported questions** | **2/4** (I23 bank account number; I24 numeric torque) |
| False refusals on 16 supported Hybrid questions | **0/16** |
| Displayed quotes literally present in correct original source | **26/26** |
| Displayed Hybrid quotes also inside retrieved excerpts | **18/18** |
| Relevant displayed quotes | **22/26 (84.6%)** |
| Cases with only relevant quotations or proper zero-citation refusal | **20/24** |

**Provenance is not correctness:** A source-true citation still fails if it doesn't answer the requested value. I23 and I24 cited irrelevant sentences but did not hallucinate any actual bank number or torque measurement.

## Unchanged per-question outcomes

| Case | Workflow | Verdict | What passed or failed |
| --- | --- | --- | --- |
| I01 | Hybrid | PASS | Same-day dispatch cutoff: 14:20 depot time |
| I02 | Hybrid | PASS | Shipment packet: four required documents |
| I03 | Hybrid | PASS | Cooling crates: 3–7°C |
| I04 | Hybrid | PASS | Inspection cadence: 180 operating hours or 21 calendar days, whichever first |
| I05 | Hybrid | PASS | Maintenance Lead authorizes return after recorded unloaded test |
| I06 | Hybrid | PASS | Replacement belt code ZB-42 |
| **I07** | **Hybrid** | **FAIL** | Wrong approval band: cited Budget Manager for above 800 to 4000, instead of **written Finance Lead + Operations Director approval for above 4000 credits** |
| I08 | Hybrid | PASS | Buyer packet: purchase request, quote comparison, approval record, delivery schedule |
| **I09** | **Hybrid** | **PARTIAL** | Correct six-business-hour supplier acknowledgement, but omitted **not a delivery guarantee** |
| **I10** | **Hybrid** | **FAIL** | Cited 14:20 same-day cutoff instead of saying a 15:00 release leaves **next operating day** |
| I11 | Hybrid | PASS | Shift technician isolates damaged conveyor within 10 minutes |
| I12 | Hybrid | PASS | Exactly 800 credits: Team Coordinator approval |
| I13 | Hybrid | PASS | Route review every six weeks |
| I14 | Hybrid | PASS | After-cutoff urgent kits: written Depot Supervisor approval plus confirmed carrier slot |
| **I15** | **Hybrid** | **PARTIAL** | Cited dusty-bay **30 hours** but omitted standard **60 hours** and unchanged inspection interval |
| I16 | Hybrid | PASS | Sole-source exception: Engineering Lead justification and Budget Manager approval |
| I17 | Comparison | PASS | Carrier damage notice 45 minutes vs conveyor isolation 10 minutes |
| **I18** | **Comparison** | **PARTIAL** | Correct 75-day delivery receipts and 240-day inspection cards, but missed equipment investigation hold exception |
| I19 | Comparison | PASS | Six-week route and supplier-performance reviews |
| **I20** | **Comparison** | **PARTIAL** | Correct shipping packet, but cited purchasing **record retention P-05**, not the **order packet P-03** four-item contents |
| I21 | Hybrid | PASS | Missing personal mobile number: refused with zero citations |
| I22 | Hybrid | PASS | Missing current copper price: refused with zero citations |
| **I23** | **Hybrid** | **FAIL (false acceptance)** | Asked exact bank account number: app quoted `MERIDIAN FIELD SERVICES - FICTIONAL PURCHASING GUIDE` and should have refused with zero citations |
| **I24** | **Hybrid** | **FAIL (false acceptance)** | Asked numeric torque in newton-metres: app cited a **torque marker** tool list, not a torque specification; should have refused with zero citations |

## Frozen corpus fingerprints, as reported

| Frozen file | SHA-256 |
| --- | --- |
| `01_Meridian_Logistics.txt` | `f389c52a1ee62c2f9f122edf5b7c58ac0440025c8936d07a970d32c57b2886b2` |
| `02_Meridian_Maintenance.txt` | `fd3196657d0c015c23429cfc6463c31b6304fae9f9bb348e25c4aab6f870af5d` |
| `03_Meridian_Purchasing.txt` | `4c2b3f2c55a0e71108d96e2a9048f6072aefc7acf3679e9e1c82e486d8363d96` |
| `fixed-answer-key.json` | `5984910de2fe1d0ac8513e15285ff4dc84e0588f193b9a29bb811d9972134a96` |

The report refers to `meridian24-scorecard.json`, `meridian-browser-evidence.json`, `meridian-model-state.txt`, `meridian-I24.png`, `r18-independent/` and `Meridian24-r18-evidence.zip`. These were **referenced but not provided for separate inspection** during this GitHub documentation change.

## Why this matters

The original Atlas [r18 Chrome acceptance](ATLAS15_R18_CHROME_HYBRID_ACCEPTANCE.md) was **15/15 full passes on an in-sample, previously tuned corpus**. Meridian is different in both question mix and difficulty, so this is **not a direct numerical regression on the same test set**; it demonstrates that the Atlas-only apparent perfection did **not** generalize. Historical Atlas scores stay unchanged.

Specific candidate root causes for follow-up investigation:
- **Missing concrete requested-value guards** for exact account identifiers and numeric engineering settings, despite valid retrieved snippets.
- **Wrong conditional/numeric band selection** for purchases over 4000; nearby numbers and approval terms are inadequate.
- **Incomplete multi-sentence source quoting** for next-day departure, supplier acknowledgement vs delivery, dusty-bay interval, and retention exceptions.
- **Comparison source sentence misselection** of P-05 retention instead of P-03 packet contents.

These are **diagnostic hypotheses**, not yet measured fixes. No application code change or post-fix performance is implied.

## Next release gate

1. Preserve this original 16/24 first-look score without rescoring, rewriting the frozen answer key, or hiding failed cases.
2. Reproduce defects with **generalized synthetic test cases**; distinguish code-level mocked-vector tests from actual MiniLM browser results.
3. Prioritize unsupported-value false acceptances I23/I24, then numeric bands I07, temporal inference I10, and completeness/comparison I09/I15/I18/I20. Avoid brittle one-off rules tied to Meridian's brand, file names or expected facts.
4. After remediation, rerun the exact frozen Meridian benchmark **as a regression**, not as a fresh held-out benchmark. Separately freeze an **additional unseen test set before running a new build** to evaluate generalization. Preserve provenance and citation precision alongside accuracy.

**Release decision:** The first held-out Meridian reliability gate **failed**. GroundedDesk remains an educational extractive research demonstration, not a verified answer-complete or production-grade fact system.
