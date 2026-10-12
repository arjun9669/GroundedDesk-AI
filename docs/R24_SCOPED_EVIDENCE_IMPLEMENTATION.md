# r24 — Scoped multi-fact evidence composition

**Status:** Working branch, not merged or independently benchmarked.

## Background and preserved results

Lantern32 r22 frozen first-look: **16 PASS / 12 PARTIAL / 4 FAIL (16/32)**.  
Lantern32 r23 in-sample regression: **20 PASS / 12 PARTIAL / 0 FAIL (20/32)**.  
The r23 report found 11 incomplete Hybrid answers and one incomplete Comparison answer. The existing citations were relevant and source-exact but omitted requested actors, qualifiers, conditions, or restrictions. The frozen r22 benchmark, source files, scoring key, and rubric were not changed for r24.

## Change

`retrieval.mjs` now uses `scopedMultiFactQuote()` to assemble *contiguous, literal source sentences* for explicitly multi-part questions, procedure/safeguard questions, age-conditioned consent, and comparisons asking for multiple named facets. Expansion:

- requires an existing retrieved answer anchor;
- does not cross a numbered section boundary;
- does not skip over an unrelated intervening sentence;
- includes at most two adjacent sentences in either direction;
- caps a combined literal quotation at 620 characters without truncating the extracted sentences;
- preserves an existing special-rule choice (numeric/clock/temporal/retry branch);
- preserves document/citation provenance, exact substring validation and refusal logic.

For short low-keyword-overlap procedural questions, the answer is expanded only if its source-exact primary quote appears inside the ranked chunk; weak semantic document matches are not granted unrestricted source-wide recovery.

In Comparison mode, the generic expander operates only for comparison requests explicitly containing two requested facets (for example, scheduling **and** exceptions). Existing explicit retention-exception behavior remains separate.

This is deterministic extractive evidence selection, **not** a semantic completeness or entailment guarantee.

## Tests and limits

New `tests/r24-scoped-multifact.test.mjs` uses synthetic, unrelated policy-style examples, and mocked-vector Hybrid RRF. It checks sequential actors, negative prohibitions, signatories, temporal exceptions, consent, cross-section limits, single-fact brevity, unsupported contacts and Comparison multi-fact content.

The 11 new tests plus existing r22/r23 regression files were executed in an isolated V8 JavaScript harness with module imports transformed in memory: **48 assertions/tests passed, 0 failed**. This is a local logic check; it does **not** establish that full GitHub Node CI, browser UI tests, real MiniLM or the 32-question Lantern browser regression passed.

Before merge:
1. Open a PR and run the repository's `GroundedDesk CI` workflow (Node unit tests, strict offline evaluation, Chromium browser smoke).
2. Review quotations for irrelevant same-section expansion and retained temporal/attribute refusals.
3. Run all 32 frozen Lantern questions in real Chrome with actual MiniLM and record results as **in-sample regression only**.
4. Freeze and evaluate a genuinely unseen pack before making an independent accuracy claim.

Do not relabel the r22 first-look score or use mocked semantic vectors as MiniLM validation.
