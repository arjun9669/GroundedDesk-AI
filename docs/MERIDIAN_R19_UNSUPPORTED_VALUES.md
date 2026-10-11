# GroundedDesk AI 5.4 r19 — concrete requested-value refusal gate

## Observed failure (first held-out Meridian24 r18)

The [preserved r18 first-look benchmark](MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md) scored **16/24 full PASS (66.7%)** across 20 genuine on-device MiniLM Hybrid Q&A cases and four separate deterministic lexical Comparison cases. Two deliberately unsupported questions produced irrelevant but literally authentic citations:

- **I23** asked for an *exact bank account number*. The response displayed only a purchasing-guide heading, with no account number.
- **I24** asked for a *required tightening torque in newton-metres*. The response displayed a tool list containing a **torque marker**, with no numerical setting.

Both required explicit refusals **with zero citations**. Neither benchmark answer fabricated an actual account/torque number; treating unrelated text as a supported answer is nonetheless a false acceptance.

## r19 change and scope

`retrieval.mjs` now recognizes explicit concrete-value questions about account identifiers or numeric torque settings and verifies that the **displayed answer quotation**, not just the retrieved chunk/source title, contains a plausible, labeled account identifier or a numerical torque accompanied by units (e.g. `N·m` or `newton-metres`). Otherwise, the answer refuses and cites nothing.

This is **conservative syntactic support checking, not general semantic entailment**. It may refuse legitimate answers using unusual formatting, and it does not protect every absent factual attribute. Test positive cases with ordinary numeric account IDs/IBANs and measured bolt torques to avoid a trivial always-refuse implementation. Normal questions about handling supplier account details or using a torque marker are exempt.

**Intentionally not fixed by this patch:** I07 wrong approval band; I10 missing next-operating-day rule; I09 missing purchase-order acknowledgement qualification; I15 lubrication condition; I18 investigation retention hold; I20 comparison packet-versus-retention mismatch. They remain priority items for later 5.4 increments.

## Evidence and validation criteria

- Added `tests/meridian-absent-values.test.mjs` with deterministic **mock vectors**, and ordinary Keyword controls. Any CI pass validates logic only; it is **not** a real MiniLM accuracy measurement.
- A genuine r19 browser retest must load exactly the same frozen three Meridian TXT files (SHA-256 values in the [r18 baseline](MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md)), activate `Xenova/all-MiniLM-L6-v2`, disable Qwen, and confirm the loaded build `2026-10-11-r19`.
- Ask the unchanged **I23** and **I24**, expecting explicit **zero-citation refusals**. Rerun all 20 Hybrid + four separate Comparison cases to detect regressions, especially the 16 original passing questions and the six still-incomplete/incorrect cases. Label r19 results **post-tuning regressions**, not a new held-out score.
- Repeat historical Atlas N13–N15 absent-attribute refusals and supported questions as regression checks.
- Independently freeze another fresh test corpus before the next claim about generalizability.

Do **not** modify the frozen r18 report or original answer key. Do **not** claim the r19 browser acceptance was completed until the real Chrome result exists.


## Observed Chrome acceptance (2026-10-11)

The [actual r19 Chrome regression report](MERIDIAN24_R19_CHROME_REGRESSION.md) confirms that I23 and I24 both returned explicit zero-citation refusals under real MiniLM Hybrid, using the unchanged frozen Meridian source documents and Qwen disabled. The overall unchanged-question regression scored **18 PASS / 4 PARTIAL / 2 FAIL**, up from first-look r18 **16/4/4**, with **no regression among 16 previously passing cases**. **I07, I10 remain failures; I09, I15, I18, I20 remain partials.** All 24 quotations were source-literal but only 22 were relevant. This is an **in-sample regression** after fixes, not a held-out accuracy gain.
