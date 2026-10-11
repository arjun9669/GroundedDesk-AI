# GroundedDesk AI 5.4 / r22 — complete interval and Comparison evidence

**Status:** Candidate code merged only after automated checks; actual r22 Chrome MiniLM score **not yet measured**.

## Prior observed benchmark

The independently frozen, once-unseen Meridian24 initially scored [r18 **16 PASS / 4 PARTIAL / 4 FAIL**](MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md). Subsequent tests used the *same already-exposed* corpus: r19 [18 / 4 / 2](MERIDIAN24_R19_CHROME_REGRESSION.md), r20 [20 / 4 / 0](MERIDIAN24_R20_CHROME_REGRESSION.md), r21 [**21 / 3 / 0**](MERIDIAN24_R21_CHROME_REGRESSION.md). All scores are preserved in separate documents. **None of r19–r22 is a fresh held-out generalization estimate.**

The three still-partial questions after r21:

- **I15 (Hybrid):** Correct normal 60h and dusty-bay 30h lubrication intervals, but displayed quote omitted the explicit *inspection interval unchanged* qualification.
- **I18 (separate deterministic lexical Comparison):** Correct delivery-receipt 75 days and cargo-claim hold, plus inspection-card 240 days, but omitted the unresolved equipment-investigation hold until closure.
- **I20 (lexical Comparison):** Correct shipping packet requirements but Purchasing side quoted **P-05 retention** instead of **P-03 packet contents**, producing one irrelevant quotation.

## r22 changes

1. **Bounded Hybrid interval completion:** A fully literal quotation may span the primary interval sentence and up to two **consecutive, relevant** sentences in either direction, within the same source section and a combined maximum **620 characters**. Recognizes quantitative standard/changed intervals and an explicitly unchanged/unaffected inspection schedule. It **never jumps over unrelated sentences**, crosses a numbered section or supplies an unstated value. R20 operative approval and dispatch recovery still have priority.
2. **Comparison packet contents:** Only in the separately lexical `compareDocuments` workflow, questions explicitly about **contents/items/documents** of a packet favor verbatim enumerated requirements over similarly worded retention paragraphs. Questions asking about **retention** are not redirected to contents. The two document sides are independently selected.
3. **Comparison retention exceptions:** When a Comparison question explicitly requests **retention including exceptions**, the engine may quote the immediately neighboring source sentence containing an actual exception, hold, unresolved case or claim, provided it is **contiguous literal text**, stays in the same numbered section, and totals at most **620 characters**. If no such evidence is present, it does not fabricate one.

These are bounded lexical/extractive selection heuristics, **not semantic entailment, a complete audit, or a guarantee that every exception is captured**.

## Generalized tests

`tests/r22-complete-evidence.test.mjs` exercises:

- A primary baseline followed by a changed interval and unchanged inspection statement; other magnitudes and alternative wording.
- A guard against crossing printed source sections or bridging irrelevant intermediary sentences.
- Two distinct Comparison sources and packet-list enumeration despite competing retention paragraphs, including reordered clauses.
- Separate packet-**retention** questions that must still cite the retention clauses.
- Same-section retention durations and explicit adjacent investigation/claim holds; alternative unresolved cases and no cross-section inclusion.
- Ordinary non-comparison evidence source selection unchanged.

Hybrid RRF uses **mock deterministic vectors** in Node tests; this is **not real MiniLM inference**. Existing Atlas, Merlin/Meridian, Keyword, refusal, provenance, citation-pruning and Chromium synthetic smoke tests must also pass.

## Browser acceptance gate — mandatory before making r22 accuracy claims

1. Visit `https://arjun9669.github.io/GroundedDesk-AI/?build=20261011-r22`, verify footer and Hybrid exports identify build `2026-10-11-r22`.
2. Upload exactly the **three original frozen Meridian TXT documents** with SHA-256 values from the [r18 first-look baseline](MERIDIAN24_R18_FIRST_HELDOUT_BASELINE.md). Never load the answer key as a search document. Keep original questions, facts and scoring rubric completely unchanged.
3. Load actual `Xenova/all-MiniLM-L6-v2` and confirm it indexes the nine passages locally; enable **Hybrid**, keep Qwen **disabled**.
4. Execute **20 original Hybrid Q&A questions (I01–I16, I21–I24)** and **four separate lexical Comparison cases (I17–I20)** in the same tab. Recheck all **21 r21 passing cases**, especially I07/I09/I10 and all four zero-citation refusals.
5. Grade **I15, I18, I20** against all frozen required facts: a quotation in an expanded excerpt alone does **not** rescue incomplete displayed evidence. Count direct citation relevance, literal provenance, false refusals and false acceptances.
6. Record precise displayed answers and source quotations, report PASS/PARTIAL/FAIL and failures without altering code or retesting rewritten questions. Any result is **in-sample regression**, not another first-unseen benchmark.
7. Independently freeze a **new, substantially different non-sensitive test corpus** *before* first scoring to estimate generalization. Do not claim production-ready accuracy based on Meridian alone.

**Target 24/24 is aspirational only. Actual r22 MiniLM Chrome results are pending.**
