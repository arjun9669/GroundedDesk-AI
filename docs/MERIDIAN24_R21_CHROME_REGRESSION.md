# GroundedDesk AI 5.4 / r21 — real Chrome Meridian 24 in-sample regression

**Date:** 11 October 2026 (Asia/Dubai). **Source:** user-uploaded `GroundedDesk-r21-Meridian24-regression-report.md` (656-line Chrome testing report). This document preserves **reported browser observations**, not a second independently executed run. Its named raw JSON/screenshot artifacts were not separately supplied or verified during this GitHub documentation change.

**Observed result:** **21 PASS / 3 PARTIAL / 0 FAIL (87.5% strict full passes)**, up from **20/4/0 in r20**, with **I09 fixed**. I15 improved by adding the normal interval but remains partial because the unchanged inspection interval is not displayed. **All 20 prior r20 passes remained PASS**, including the approval-boundary and dispatch fixes and four unsupported zero-citation refusals. I18 and I20 Comparison partials did not change.

**Benchmark status: POST-TUNING IN-SAMPLE REGRESSION.** These original Meridian documents/questions have already been evaluated and used for iterative tuning. This result is **not** fresh held-out accuracy or proof of real-world readiness.

## Browser and freeze conditions reported by the tester

- Live app URL `https://arjun9669.github.io/GroundedDesk-AI/?build=20261011-r21`. Footer and **all 20 Hybrid evidence exports** reported retrieval build `2026-10-11-r21`. The four Comparison exports retain a legacy 4.0 heading and omit a build identifier; they were produced from the same footer-verified tab.
- **Only the three original frozen Meridian TXT sources** were loaded; the frozen answer key and bundled samples were not indexed. The tester verified original hashes before and after the run.
- Local `Xenova/all-MiniLM-L6-v2` loaded with **9 indexed passages**, Hybrid enabled and Qwen generation disabled. No simulated embeddings, offline answer substitution, new code or changed questions during scoring.
- **20 Hybrid Q&A questions** (I01–I16, I21–I24); **four separate deterministic lexical Comparison questions** (I17–I20). The four Comparison cases must not be represented as MiniLM-based answers.
- Same original fixed scoring rubric: completeness of *displayed* quoted answer, source/literal provenance, direct question relevance, correct source and explicit zero-citation refusal for absent facts. Expanded excerpts do not rescue missing facts in the displayed answer.

## Historical comparison — unchanged first-unseen baseline

| Measure | r18 FIRST UNSEEN | r19 in-sample | r20 in-sample | r21 in-sample |
| --- | ---: | ---: | ---: | ---: |
| PASS / PARTIAL / FAIL | **16 / 4 / 4** | **18 / 4 / 2** | **20 / 4 / 0** | **21 / 3 / 0** |
| Hybrid Q&A PASS / PARTIAL / FAIL | 14 / 2 / 4 | 16 / 2 / 2 | 18 / 2 / 0 | **19 / 1 / 0** |
| Lexical Comparison PASS / PARTIAL / FAIL | 2 / 2 / 0 | 2 / 2 / 0 | 2 / 2 / 0 | **2 / 2 / 0** |
| Correct unsupported refusals (zero citations) | 2/4 | 4/4 | 4/4 | **4/4** |
| Unsupported false acceptances | 2 | 0 | 0 | **0** |
| False refusals | 0 | 0 | 0 | **0** |
| Authentic displayed quotations | 26/26 | 24/24 | 24/24 | **24/24** |
| Directly relevant displayed quotations | 22/26 | 22/24 | 23/24 | **23/24** |

All **16/16 Hybrid displayed quotations** occurred inside their displayed retrieved excerpts. The tester reported **23/24 cases** having all displayed citations relevant or an appropriate zero-citation refusal. The remaining irrelevant quote is I20's Purchasing retention clause, which is authentic source text but does not answer the purchase-order packet-content question.

## The r21 change verified in Chrome

- **I09: PARTIAL → PASS.** Question: `How soon must suppliers acknowledge a purchase order?` **Verbatim displayed answer:** `P-04 Supplier acknowledgement Suppliers must acknowledge a purchase order within six business hours of receipt. This is an acknowledgement target, not a delivery guarantee.` Both required elements now appear in the quoted answer.
- **I15: PARTIAL → PARTIAL, improved completeness.** Question: `How does the dusty demonstration bay change the lubrication interval?` **Verbatim displayed answer:** `M-05 Lubrication exception The standard lubrication interval is 60 operating hours. For a conveyor running in the dusty demonstration bay, the interval is reduced to 30 operating hours.` This recovers **60 operating hours normal** and **30 operating hours in the dusty bay** but still **omits the explicitly unchanged inspection interval**. That fact was only in expanded evidence, not the displayed quote, so the original frozen rubric still scores PARTIAL. This must not be silently upgraded to PASS.

## Complete 24-case status

| Case(s) | Workflow | r21 result | Notes |
| --- | --- | --- | --- |
| I01–I08 | Hybrid Q&A | PASS | Eight unchanged passing cases, including r20 numerical approval I07 |
| **I09** | Hybrid Q&A | **PASS** | Six business hours **and no delivery guarantee** |
| I10–I14 | Hybrid Q&A | PASS | Five unchanged passing cases, including next-operating-day I10 |
| **I15** | Hybrid Q&A | **PARTIAL** | Standard 60h, dusty 30h; **missing unchanged inspection interval** |
| I16 | Hybrid Q&A | PASS | Sole-source quote exception |
| I17 | Lexical Comparison | PASS | Carrier notification vs conveyor isolation |
| **I18** | Lexical Comparison | **PARTIAL** | 75-day receipts + cargo claim; 240-day inspection cards, but missing **unresolved equipment-investigation hold until closed** |
| I19 | Lexical Comparison | PASS | Six-week route vs supplier review |
| **I20** | Lexical Comparison | **PARTIAL** | Correct shipping packet; Purchasing side cites **P-05 purchasing records retention** rather than **P-03 order packet contents** |
| I21–I24 | Hybrid Q&A | PASS | All four deliberately unsupported requests refused **without any citations** |

No regression among 20 previous passes and no fabricated quotation/source misattribution was reported. **These facts are test-report observations, not claims about other unseen documents.**

## Frozen SHA-256 evidence, as reported

| File | SHA-256 |
| --- | --- |
| `01_Meridian_Logistics.txt` | `f389c52a1ee62c2f9f122edf5b7c58ac0440025c8936d07a970d32c57b2886b2` |
| `02_Meridian_Maintenance.txt` | `fd3196657d0c015c23429cfc6463c31b6304fae9f9bb348e25c4aab6f870af5d` |
| `03_Meridian_Purchasing.txt` | `4c2b3f2c55a0e71108d96e2a9048f6072aefc7acf3679e9e1c82e486d8363d96` |
| `fixed-answer-key.json` | `5984910de2fe1d0ac8513e15285ff4dc84e0588f193b9a29bb811d9972134a96` |

Previously frozen scorecard hashes retained by the tester: `meridian24-scorecard.json` r18 `bf27850906db0dccf5cc4c091c130d877d5030631d9369106b04f2643bf99957`; r19 `cfd06963b7f422bafd959cdb6b3ed932c754cd6c5bdc70dd8caf9bf110af7702`; r20 `4783847ba04f5e10fd1eb2a590402ee6bfc454d34a489232459de9d34e1cfd9b`.

The submitted Markdown named raw artifacts `r21-meridian24-scorecard.json`, `r21-meridian-browser-evidence.json`, `r21-meridian-model-state.txt`, `r21-I09.png`, `r21-I15.png` and `r21-meridian-freeze-verification.json`, but those were **not separately uploaded or inspected** as part of this documentation-only update.

## Engineering follow-up and release gate

1. **I15 (Hybrid)**: Recover the missing *unchanged inspection interval* from immediate, contiguous, same-section source context without pulling unrelated clauses or exceeding an appropriate quote limit. Check why r21's two-sentence expansion stopped before that fact; avoid brand/answer-key-specific rules.
2. **I18 (lexical Comparison)**: Include the explicit unresolved-equipment-investigation retention exception for completed inspection cards alongside 240 days, while retaining the delivery-receipt cargo-claim exception.
3. **I20 (lexical Comparison)**: Prefer purchase-order **packet contents P-03** over purchase-record **retention P-05**, checking both sides of the comparison independently.
4. Protect the 21 currently passing cases with generalized automated tests and all previous Atlas regressions. Run actual Chrome MiniLM again after a code change. **Any rerun on this Meridian pack remains in-sample regression.**
5. Independently freeze and evaluate **new unseen** synthetic, non-sensitive source documents and fixed questions before making any further generalization claim.

Related documents: [r18 first-unseen negative baseline](MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md), [r19 Chrome regression](MERIDIAN24_R19_CHROME_REGRESSION.md), [r20 Chrome regression](MERIDIAN24_R20_CHROME_REGRESSION.md), [r21 engineering plan](MERIDIAN_R21_HYBRID_ADJACENT_CONTEXT.md), [evaluation protocol](EVALUATION_PROTOCOL.md).
