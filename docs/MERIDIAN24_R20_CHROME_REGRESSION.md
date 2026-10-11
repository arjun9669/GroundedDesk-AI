# GroundedDesk AI 5.4 / r20 — real Chrome Meridian 24 in-sample regression

**Date:** 11 October 2026 (Asia/Dubai).  
**Source:** User-supplied `GroundedDesk-r20-Meridian24-regression-report.md` from an actual Chrome test. This repository note faithfully preserves the **tester-reported** browser observations; the documentation commit is not a second independent run. Referenced screenshot, JSON and model-state artifacts were **not separately attached or revalidated** during the documentation update.

**Result:** **20 PASS / 4 PARTIAL / 0 FAIL (83.3% strict)**. I07 and I10 changed from FAIL to PASS. **All 18 r19 passing cases remained PASS**, including I23/I24 zero-citation refusals. The other four partials are unchanged.

**Important:** This is an **in-sample regression** on the frozen Meridian test set already evaluated and used to guide r19/r20 changes. It is **not** a new first-look held-out benchmark or production accuracy estimate.

## Actual Chrome setup reported

- Page: `https://arjun9669.github.io/GroundedDesk-AI/?build=20261011-r20`. Footer and all 20 Hybrid exports showed build `2026-10-11-r20`. The four Comparison exports retained the older 4.0 heading without a build field but were produced in the same verified tab.
- Exactly the original three Meridian fictional TXT source documents were loaded manually; no bundled samples or answer-key files were indexed. Chrome extension automatic upload was blocked by file-URL permissions; manual loading succeeded.
- Actual on-device `Xenova/all-MiniLM-L6-v2` loaded, **9 passages** indexed; Hybrid selected and Qwen disabled. No mock embeddings or offline substitutions.
- **20 Hybrid Q&A cases** I01–I16 and I21–I24, plus **4 separate deterministic lexical Comparison cases** I17–I20. The latter must never be counted as real MiniLM Hybrid retrieval performance.
- Frozen questions, grading rubric, source and answer-key hashes were checked before and after testing without edits to inputs or application code. Only whitespace was normalized for quotation provenance.

## Historical results, separately labeled

| Measure | r18 original first unseen | r19 in-sample regression | r20 in-sample regression |
| --- | ---: | ---: | ---: |
| Overall PASS / PARTIAL / FAIL | **16 / 4 / 4** | **18 / 4 / 2** | **20 / 4 / 0** |
| Actual MiniLM Hybrid PASS / PARTIAL / FAIL | 14 / 2 / 4 | 16 / 2 / 2 | **18 / 2 / 0** |
| Separate lexical Comparison PASS / PARTIAL / FAIL | 2 / 2 / 0 | 2 / 2 / 0 | **2 / 2 / 0** |
| Unsupported successful zero-citation refusals | 2/4 | 4/4 | **4/4** |
| Unsupported false acceptances | 2/4 | 0/4 | **0/4** |
| False refusals of supported Hybrid cases | 0/16 | 0/16 | **0/16** |
| Authentic displayed quotations | 26/26 | 24/24 | **24/24** |
| Relevant displayed quotations | 22/26 | 22/24 | **23/24** |
| Cases with all citations relevant / correct zero-citation refusal | 20/24 | 22/24 | **23/24** |

All **16/16 displayed Hybrid quotations** also matched the shown retrieved excerpt. The only still irrelevant quotation is I20's Purchasing retention clause instead of purchase-order packet contents. Authenticity alone does not establish relevance or completeness.

## Specific changes confirmed in this real browser run

- **I07 — PASS (r19 FAIL):** Asking *who must approve a purchase above 4000 credits* now returns the original Purchasing source sentence: `Purchases above 4000 credits require written approval from both the Finance Lead and the Operations Director.` The incorrect neighboring 800–4000 Budget Manager band is no longer selected.
- **I10 — PASS (r19 FAIL):** Asking when an outbound order released at **15:00** leaves the depot now returns the original Logistics source sentence: `Orders released after 14:20 leave on the next operating day.` The previous cutoff-only quote was incomplete.
- No other answers changed from r19 according to the submitted report. I21–I24 still all refuse with **zero citations**.

## Complete case outcome list

| Cases | Workflow | r20 | Comment |
| --- | --- | --- | --- |
| I01–I06 | Hybrid | PASS | Dispatch cutoff, shipping packet, cold cargo, inspection, return, belt code |
| **I07** | **Hybrid** | **PASS** | Applicable above-4000 approval actors and written sign-off |
| I08 | Hybrid | PASS | Four-order-document packet |
| **I09** | Hybrid | **PARTIAL** | Six business hours correct, but missing **acknowledgement is not a delivery guarantee** |
| **I10** | **Hybrid** | **PASS** | 15:00 release leaves **next operating day** |
| I11–I14 | Hybrid | PASS | Belt isolation, exactly 800 approval, route reviews, urgent exception |
| **I15** | Hybrid | **PARTIAL** | Dusty-bay **30 operating hours** correct; missing normal **60 operating hours** and unchanged inspection interval |
| I16 | Hybrid | PASS | Sole-source exception |
| I17 | Comparison | PASS | Carrier notice vs conveyor isolation |
| **I18** | Comparison | **PARTIAL** | 75-day and 240-day retention and cargo exception correct; missing unresolved equipment-investigation hold |
| I19 | Comparison | PASS | Route vs supplier review |
| **I20** | Comparison | **PARTIAL** | Shipping packet right; Purchasing citation incorrectly gives **P-05 retention**, not **P-03 order-packet contents** |
| I21–I24 | Hybrid | PASS | Four absent facts properly refused, no citations |

There are **0 FAIL cases** under the unchanged frozen scoring rules, but **four incomplete answers and one irrelevant displayed quotation remain**. Do not describe the test as “24/24 accurate” or ready for unrestricted factual QA.

## Frozen input integrity, as reported

| Original frozen file | SHA-256 |
| --- | --- |
| `01_Meridian_Logistics.txt` | `f389c52a1ee62c2f9f122edf5b7c58ac0440025c8936d07a970d32c57b2886b2` |
| `02_Meridian_Maintenance.txt` | `fd3196657d0c015c23429cfc6463c31b6304fae9f9bb348e25c4aab6f870af5d` |
| `03_Meridian_Purchasing.txt` | `4c2b3f2c55a0e71108d96e2a9048f6072aefc7acf3679e9e1c82e486d8363d96` |
| `fixed-answer-key.json` | `5984910de2fe1d0ac8513e15285ff4dc84e0588f193b9a29bb811d9972134a96` |

Historic scorecard SHA-256 identifiers reported by the tester: r18 `bf27850906db0dccf5cc4c091c130d877d5030631d9369106b04f2643bf99957`, r19 `cfd06963b7f422bafd959cdb6b3ed932c754cd6c5bdc70dd8caf9bf110af7702`.

Tester-referenced raw evidence (not uploaded alongside this Markdown report): `r20-meridian24-scorecard.json`, `r20-meridian-browser-evidence.json`, `r20-meridian-model-state.txt`, `r20-I07.png`, `r20-I10.png`, and `r20-meridian-freeze-verification.json`.

## Next gates

1. Prioritize a bounded **multi-sentence evidence** change for I09 and I15. Preserve exact-source provenance, and avoid assuming one matching sentence covers qualifiers or exceptions.
2. Improve the **separate lexical Comparison** pathway for I18 and I20. Prefer complete applicable exception context and topic-specific packet clauses instead of unrelated retention.
3. Add generic synthetic tests, protect the 20 current passes and prior Atlas results, then retest **all 24** original Meridian cases with real MiniLM. Such a retest remains an **in-sample regression**, not new held-out generalization.
4. Freeze and score **new previously unseen, non-sensitive documents and questions** independently before making a new reliability claim.

Related: [r18 first-look baseline](MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md) · [r19 Chrome regression](MERIDIAN24_R19_CHROME_REGRESSION.md) · [r20 engineering scope](MERIDIAN_R20_OPERATIVE_CONDITIONS.md) · [evaluation protocol](EVALUATION_PROTOCOL.md).
