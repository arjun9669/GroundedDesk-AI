# GroundedDesk AI 5.4 / r22 — real Chrome Meridian 24 in-sample regression

**Source:** User-uploaded `GroundedDesk-r22-Meridian24-regression-report.md` (11 October 2026, Asia/Dubai). This document preserves the **tester-reported real-browser results**, not an additional Chrome run independently executed for this GitHub update. The separate JSON scorecard, browser evidence, model state, screenshots and frozen archive referenced by the Markdown report were **not individually inspected or uploaded as part of this documentation commit**.

**Result: 23 PASS / 1 PARTIAL / 0 FAIL (95.8% strict full passes).** **I18 and I20 changed PARTIAL → PASS. I15 remains PARTIAL**, despite correct normal and dusty-bay intervals, because the displayed answer omits the unchanged inspection interval. **All 21 previous r21 passes remained PASS.**

**Benchmark classification: post-tuning IN-SAMPLE REGRESSION.** The frozen Meridian24 corpus/questions have been repeatedly exposed and used to tune r19–r22. This 23/24 is **not** independent unseen accuracy and is not proof of production readiness.

## Browser/model conditions (reported)

- Browser URL: `https://arjun9669.github.io/GroundedDesk-AI/?build=20261011-r22`; application footer and 20 Hybrid evidence exports identified retrieval build `2026-10-11-r22`.
- Only the **three original frozen Meridian TXT files** loaded; no bundled sample corpus or answer key indexed. The original file/key SHA-256 hashes and earlier frozen scorecard checksums were verified before and after.
- Actual locally loaded **`Xenova/all-MiniLM-L6-v2`**, indexed **9 passages**. Hybrid selected; Qwen off. **No mock vectors or offline answer substitution**.
- **20 Hybrid Q&A** cases I01–I16 and I21–I24; **four separate lexical Comparison** cases I17–I20. Comparison outputs retain the older 4.0 heading without build metadata but were captured from the same build-verified browser tab.
- Same frozen questions, rubric, and source documents. The tester reported one unchanged execution of every primary question, with exact exports; no edits to code or inputs during testing.

## Historic measurements, preserving the original first look

| Measure | r18 first unseen | r19 in-sample | r20 in-sample | r21 in-sample | r22 in-sample |
| --- | ---: | ---: | ---: | ---: | ---: |
| Overall PASS / PARTIAL / FAIL | **16 / 4 / 4** | **18 / 4 / 2** | **20 / 4 / 0** | **21 / 3 / 0** | **23 / 1 / 0** |
| Hybrid PASS / PARTIAL / FAIL (20) | 14 / 2 / 4 | 16 / 2 / 2 | 18 / 2 / 0 | 19 / 1 / 0 | **19 / 1 / 0** |
| Separate lexical Comparison PASS / PARTIAL / FAIL (4) | 2 / 2 / 0 | 2 / 2 / 0 | 2 / 2 / 0 | 2 / 2 / 0 | **4 / 0 / 0** |
| Correct unsupported zero-citation refusals | 2/4 | 4/4 | 4/4 | 4/4 | **4/4** |
| Supported Hybrid false refusals | 0/16 | 0/16 | 0/16 | 0/16 | **0/16** |
| Source-verbatim displayed quotes | 26/26 | 24/24 | 24/24 | 24/24 | **24/24** |
| Directly relevant displayed quotes | 22/26 | 22/24 | 23/24 | 23/24 | **24/24** |

**16/16 Hybrid quotations** also occurred within their displayed excerpts; zero unsupported false acceptances and zero unsupported citations. This is a strict content-completeness score, not merely a citation authenticity score.

## What changed in real Chrome

- **I18, Comparison: PARTIAL → PASS.** Both retention durations and both exceptions were directly quoted. The Logistics side reported signed delivery receipts **75 days after delivery** with an open **cargo claim retained until closed**. The Maintenance side quoted completed inspection cards **240 days after service** and a card associated with an **unresolved equipment investigation** kept **until the investigation closes**, even beyond 240 days.
- **I20, Comparison: PARTIAL → PASS.** The Logistics quotation listed the shipping packet's **packing list, route sheet, seal record, delivery contact card**. The Purchasing quotation correctly selected **P-03 Order packet**, listing the **purchase request, quote comparison, approval record, delivery schedule**. The previously irrelevant P-05 retention quotation was eliminated.
- **I15, Hybrid: PARTIAL → PARTIAL.** Quoted **standard lubrication 60 operating hours**, **dusty-bay lubrication 30 operating hours**. Still **does not display the unchanged inspection interval**, even though that fact is present in the expanded evidence. The unchanged rubric expressly disallows promoting missing expanded-context text into the displayed-answer completeness score.

I01–I14, I16–I17, I19, I21–I24 all remain PASS. **No r21 PASS regressions**, provenance failures or misattributed quotations were reported.

## Per-case outcome

| Cases | Workflow | r22 | Description |
| --- | --- | --- | --- |
| I01–I14 | Hybrid Q&A | PASS | All 14 earlier correct answers maintained, including I07/I09/I10 |
| **I15** | **Hybrid Q&A** | **PARTIAL** | Correct 60h standard and 30h dusty; missing unchanged inspection interval in displayed quotation |
| I16 | Hybrid Q&A | PASS | Sole-source rule |
| I17 | Lexical Comparison | PASS | Carrier damage vs conveyor isolation |
| **I18** | **Lexical Comparison** | **PASS** | Two retention periods and both hold exceptions |
| I19 | Lexical Comparison | PASS | Six-week route and vendor review |
| **I20** | **Lexical Comparison** | **PASS** | Two correct packet-content lists |
| I21–I24 | Hybrid Q&A | PASS | Four zero-citation refusals on unsupported questions |

## Input integrity, per reported SHA-256

| Original frozen file | SHA-256 |
| --- | --- |
| `01_Meridian_Logistics.txt` | `f389c52a1ee62c2f9f122edf5b7c58ac0440025c8936d07a970d32c57b2886b2` |
| `02_Meridian_Maintenance.txt` | `fd3196657d0c015c23429cfc6463c31b6304fae9f9bb348e25c4aab6f870af5d` |
| `03_Meridian_Purchasing.txt` | `4c2b3f2c55a0e71108d96e2a9048f6072aefc7acf3679e9e1c82e486d8363d96` |
| `fixed-answer-key.json` | `5984910de2fe1d0ac8513e15285ff4dc84e0588f193b9a29bb811d9972134a96` |

Previously recorded original frozen scorecard SHA-256 identifiers, as reported: r18 `bf27850906db0dccf5cc4c091c130d877d5030631d9369106b04f2643bf99957`; r19 `cfd06963b7f422bafd959cdb6b3ed932c754cd6c5bdc70dd8caf9bf110af7702`; r20 `4783847ba04f5e10fd1eb2a590402ee6bfc454d34a489232459de9d34e1cfd9b`; r21 `8da8b1e49e4e7956d1c88f8cb33e9c32a65914c71138b560764e84e6814851e0`.

The tester notes that a supporting archive contains the unchanged frozen documents/key and raw JSON, model-state text and I15/I18/I20 screenshots. **Those separate files are named in the supplied report but were not independently checked as part of this documentation-only commit.**

## Recommended next gate: unseen generalization over further Meridian tuning

**Do not change the historical r18–r21 measurements or upgrade I15 to PASS.** This is a nearly-complete in-sample regression, and repeated tuning on the same questions risks overfitting.

Recommended order:

1. **Record the r22 outcome** as an in-sample development regression (this document), with I15 explicitly left PARTIAL.
2. **Before further release-targeted tuning, freeze a genuinely different, previously unseen synthetic corpus and answer key**, including multi-sentence qualifications, packet enumeration, retention exceptions, threshold boundaries, temporal conditions, intentionally unsupported facts, cross-document comparisons and paraphrases. Keep the frozen pack out of code and document retrieval during its first evaluation.
3. Evaluate the new pack **once**, with unchanged questions/rubric and the currently deployed r22 browser build, real local MiniLM Hybrid and separately labeled lexical Comparison; capture all exact quotations, false accept/refuse outcomes, case-level completeness, direct relevance, source-literal provenance, and performance.
4. Analyze first-look failures without changing or overwriting that baseline. Investigate **why I15's unchanged inspection sentence remains absent** separately as a documented development defect; do not claim it fixed without a subsequent browser observation.

Related: [r18 original first-look](MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md) · [r19](MERIDIAN24_R19_CHROME_REGRESSION.md) · [r20](MERIDIAN24_R20_CHROME_REGRESSION.md) · [r21](MERIDIAN24_R21_CHROME_REGRESSION.md) · [r22 engineering plan](MERIDIAN_R22_COMPLETE_EVIDENCE.md) · [evaluation protocol](EVALUATION_PROTOCOL.md).
