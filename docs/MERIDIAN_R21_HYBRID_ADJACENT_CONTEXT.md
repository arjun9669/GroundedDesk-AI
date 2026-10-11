# GroundedDesk AI 5.4 / r21 — bounded Hybrid adjacent qualification context

**Status:** Automated regression and real Chrome MiniLM acceptance **pending**. This plan does not report an r21 Meridian score.

## Observed browser baseline

The unchanged [r20 Chrome Meridian24 in-sample regression](MERIDIAN24_R20_CHROME_REGRESSION.md) recorded **20 PASS / 4 PARTIAL / 0 FAIL**. Four remaining partials:

- **I09 (Hybrid):** The six-business-hour supplier acknowledgement was quoted, but the source's **acknowledgement is not a delivery guarantee** qualifier did not appear in the displayed answer.
- **I15 (Hybrid):** The dusty-bay **30 operating hours** was quoted, while normal **60 operating hours** and the **unchanged inspection interval** were missing.
- **I18 (lexical Comparison):** Missing an unresolved equipment-investigation retention exception.
- **I20 (lexical Comparison):** Cited Purchasing retention P-05 rather than P-03 order-packet contents.

r21 targets **I09 and I15 only**. The separate Comparison workflow is unchanged, so I18/I20 remain explicitly open.

## Implementation approach

After retrieval has picked a document, r21 can add **a maximum of one immediately preceding and one immediately following original sentence** around the leading Hybrid answer sentence, only when:

1. The question concerns a supplier acknowledgement and the neighbor explicitly negates a delivery/promise/completion guarantee with a clear reference to the acknowledgement/receipt; or
2. The question concerns a change to an interval/schedule and the neighbor states a numeric standard or baseline interval, or explicitly says an inspection/maintenance interval is unchanged.

The implementation checks that neighbors remain within the **same printed source section**, that the resulting quote is a **contiguous exact source substring**, and that the combined quote does not exceed **620 characters**. It must not reach across a different paragraph or unrelated intermediary sentence. The central sentence's original lexical strength is measured **before expansion**, so unrelated neighboring text cannot artificially make a weak Hybrid candidate eligible. r20's numeric approval-band and post-cutoff dispatch selection takes precedence and is not expanded.

This is **bounded extractive context recovery, not semantic entailment verification**. The current patterns will miss differently worded relationships and can produce larger literal quotes; broad correctness or complete document coverage are not established.

## Validation gates

- `tests/hybrid-adjacent-qualifiers.test.mjs` uses **deterministic mock semantic vectors**, exercises the real Hybrid RRF pipeline, and checks acknowledgement qualifiers, standard/changed/unchanged intervals, alternate subjects/numbers, section boundaries, extraneous neighbors, earlier r20 approval selection, Keyword isolation and unsupported refusal. These are software regression tests, **not actual MiniLM results**.
- Existing Atlas, Meridian r19/r20, Keyword, comparison, citation precision, provenance and browser smoke tests must remain passing.
- After green CI and GitHub Pages deployment, load `https://arjun9669.github.io/GroundedDesk-AI/?build=20261011-r21`, clear bundled samples, upload **only the three original frozen Meridian TXT sources** and verify their fingerprints in the [first-unseen r18 record](MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md).
- Activate the **actual on-device `Xenova/all-MiniLM-L6-v2`** Hybrid index and keep Qwen disabled. Rerun the exact original **20 Hybrid Q&A** and **four separate lexical Comparison** cases using the frozen answer key and unchanged grading.
- Inspect **I09 and I15** closely for complete original-source quotations; verify the original **20 r20 PASS** cases stay PASS, four unsupported refusals still have zero citations, and I18/I20 remain honestly scored according to observed behavior. Check **quote provenance and relevance**, not answer text alone.
- Preserve the historical **r18 first unseen 16/24**, **r19 in-sample 18/24**, and **r20 in-sample 20/24** as separate records. Any r21 Meridian retest is also an **in-sample regression**. Freeze an entirely new unseen benchmark before claiming improved generalization.

**No r21 pass count, new accuracy estimate or production-readiness claim is authorized by CI alone.**
