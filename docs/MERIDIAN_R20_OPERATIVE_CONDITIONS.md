# GroundedDesk AI 5.4 r20 — operative approval-band and dispatch-outcome fix

**Baseline:** The tester's unchanged frozen Meridian24 [r19 Chrome regression report](MERIDIAN24_R19_CHROME_REGRESSION.md) scored **18 PASS / 4 PARTIAL / 2 FAIL** with actual local MiniLM. The first, truly previously-unseen r18 run scored **16/24**; both historical scores are preserved.

## Specific observed deficiencies

- **I07 (FAIL):** Asked who must approve purchases **above 4000 credits**. The system instead quoted the adjacent **above 800 and up to 4000** Budget Manager band. The expected source clause requires **written Finance Lead and Operations Director approval**. Document-level citation provenance did not make that wrong-band sentence applicable.
- **I10 (FAIL):** Asked when an outbound order **released at 15:00** leaves the depot. The system quoted the **14:20 same-day cutoff** without the operative **next operating day** clause. That next-day wording was visible in expanded evidence but absent from the actual displayed answer.

## Change design

The r20 candidate adds a **deterministic, source-literal operative-conditions pass** *after candidate retrieval*:

1. For explicit numerical approval questions, parse the user-requested inequality and threshold, and prefer an original, bounded source sentence from the selected document whose purchasing approval band actually applies. Exclude a lower band merely containing the query's boundary as its upper limit. The same helper handles exact-boundary queries and varied numeric thresholds. It never generates a missing approver.
2. For outbound dispatch questions with an explicit clock time, compare the question's time with a **quoted cutoff from the same source**. If later, prefer a **verbatim statement explicitly saying the next/following operating, working or business day**. Do not infer that outcome from an isolated cutoff sentence.
3. Both corrections require original source text and are allowed to override a high MiniLM/RRF chunk rank only when an exact operative sentence was found. Other Hybrid semantic-only answers and the old fallback remain; all quotes remain literal substrings. This is a **narrow heuristic, not semantic entailment, a numeric-policy solver or a full temporal inference engine**.

## Regression and release gates

- `tests/meridian-operative-conditions.test.mjs` reproduces wrong neighboring approval bands and the post-cutoff answer omission with generalized synthetic source text and **deterministic mock vectors**. It also checks the exact 800 boundary, different spend threshold, different dispatch time, absent next-day clause and unrelated approval questions. Existing Atlas, refusal, D02-precision, and Keyword/Comparison tests must remain passing.
- GitHub CI checks syntax, Node test suite and a synthetic Chromium smoke workflow. Passing these **does not verify real MiniLM**.
- After deployment, open `https://arjun9669.github.io/GroundedDesk-AI/?build=20261011-r20`, load exactly the three frozen Meridian TXT files, verify their [recorded SHA-256 hashes](MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md), enable **actual** `Xenova/all-MiniLM-L6-v2`, and keep Qwen off.
- Rerun **unchanged I07 and I10**, then all 20 Hybrid Q&A cases plus the four separate lexical Comparison cases using the same fixed scorecard, including checking the 18 cases that passed r19 for regressions. Report exact quotations, any new failure and all-citation relevance.
- The other **four partial cases I09, I15, I18, I20** are deliberately *not* claimed fixed in r20; they require later quotation-context and Comparison work.
- Preserve r18's original first-look **16/24**, r19's regression **18/24**, and any future r20 outcome as separately labeled results. A new unseen test pack, frozen before its first run, remains required for an independent generalization claim.

**Observed Chrome acceptance (2026-10-11):** The [tester-submitted actual MiniLM r20 regression](MERIDIAN24_R20_CHROME_REGRESSION.md) reports **20 PASS / 4 PARTIAL / 0 FAIL** on the original frozen Meridian24 after applying the patch. I07 and I10 both now PASS with directly operative, source-literal quotes; all 18 previous r19 passes remain PASS. The four partial cases I09/I15/I18/I20 remain unchanged, and one Purchasing quote is still irrelevant. This is **post-tuning in-sample regression**, not a new independent benchmark. No changes to the original r18 first unseen baseline.
