# Lantern32 — GroundedDesk AI r22 actual Chrome FIRST-LOOK benchmark

**Benchmark ID:** `LANTERN32_R22_FIRSTLOOK_V1`  
**Freeze date (UTC):** `2026-10-11T06:16:51.654687+00:00`  
**Real Chrome test:** 11 October 2026, Asia/Dubai.  
**Retrieval build:** `2026-10-11-r22` (unchanged code).  
**Provenance:** User-uploaded `Lantern32-r22-firstlook-report.md` (1,258-line report), submitted **after** the [pre-registered pack was frozen](LANTERN32_R22_FIRSTLOOK_FREEZE.md) and distributed. This GitHub document preserves the **tester-reported observations**; it does not claim a second independent Chrome execution. Supporting individual JSON files/screenshots mentioned in the Markdown were **not separately provided or inspected during this documentation update**.

**Result: 16 PASS / 12 PARTIAL / 4 FAIL out of 32 (50.0% strict full passes).** This is the **first recorded app test of the previously unseen synthetic Lantern32 corpus**. It is a materially lower result than the **23/24 Meridian r22 in-sample regression**; the two scores involve *different corpora and scoring sets* and must **never be pooled or called an accuracy drop on the same benchmark**.

## Reported real-browser setup and frozen integrity

- Live page `https://arjun9669.github.io/GroundedDesk-AI/?build=20261011-r22`. Footer and **all 26 Hybrid exports** confirmed loaded build `2026-10-11-r22`.
- Only the four frozen `01_Lantern_Visitor_Services.txt`, `02_Lantern_Collections_Care.txt`, `03_Lantern_Digital_Archive.txt`, `04_Lantern_Education_Programs.txt` files were indexed, **not** the answer key, rubric, bundled samples or manifest.
- Local browser reported `Hybrid ready: indexed 16 passages locally using Xenova/all-MiniLM-L6-v2. No document inference API calls.` Real model was enabled, **Hybrid selected, Qwen generation off**. Six Comparison tests used the distinct deterministic **lexical** workflow, not MiniLM Hybrid.
- The tester reported the frozen six SHA-256 file hashes (four sources, key and rubric) matched **before** the first app run and **after** capture. Browser UI does not expose uploaded bytes for an additional independent hash, but filenames, sizes and literal-source quotation provenance were checked.
- **26 original Hybrid H01–H26 queries** followed by **six original lexical Comparison X27–X32** with immutable source pairs. Every original question executed **once**, all outputs were captured **before** grading, with no alternative question/retrieval selection, code edits, new knowledge in application, or mock vectors.
- Chrome extension file-URL restrictions prevented automatic upload; manual upload succeeded. All 32 cases were completed and scored.

## Frozen FIRST-LOOK scores — historical baseline, not to be overwritten

| Measure | Real r22 first-look Lantern32 |
| --- | ---: |
| All workflows: PASS / PARTIAL / FAIL | **16 / 12 / 4** |
| **Strict full-pass rate** | **16/32 = 50.0%** |
| Actual MiniLM **Hybrid Q&A**: PASS / PARTIAL / FAIL | **11 / 11 / 4 (26 cases)** |
| Separate lexical **Comparison**: PASS / PARTIAL / FAIL | **5 / 1 / 0 (6 cases)** |
| Supported Hybrid: PASS / PARTIAL / FAIL | **8 / 11 / 3 (22 cases)** |
| Unsupported Hybrid: valid zero-citation refusal / false acceptance | **3 / 1 (4 cases)** |
| Supported false refusals | **0/22 Hybrid; 0/6 Comparison** |
| Source-verbatim displayed quotations | **35/35 (100%)** |
| Hybrid literal quote present in displayed retrieved excerpt | **23/23 (100%)** |
| Directly relevant displayed quotations | **31/35 (88.6%)** |
| Cases with all relevant citations or proper zero-citation refusal | **28/32** |
| Fabricated/misattributed source quotations observed | **0** |

**Interpretation:** Literal provenance remains strong but is insufficient for correct applicability or complete answers. **One unsupported question was wrongly accepted with a citation**; its answer did **not** invent a phone number, but violated the frozen requirement to explicitly refuse with zero citations. The three other unsupported questions refused correctly.

## All 32 case outcomes

| Cases | Workflow | Outcome | Description |
| --- | --- | --- | --- |
| H01–H05 | Hybrid | PASS | General admission, early school entry, tour entry, found-property deadline, 80-hour refund |
| **H06** | Hybrid | **FAIL** | 18-hour ticket cancellation improperly quotes **72-hour full refund**, not **no refund** |
| H07 | Hybrid | PARTIAL | Separated child: missing coordinator, reunification log and no public child-name announcement |
| H08–H09 | Hybrid | PASS | Textile humidity range and sustained-breach isolation |
| H10 | Hybrid | PARTIAL | Vault timing present; emergency opening **does not reset counters** omitted |
| H11 | Hybrid | PARTIAL | Harbor vent 40h present; standard 80h and unchanged monthly calibration omitted |
| H12 | Hybrid | PARTIAL | Mold containment and photograph present; conservator's isolation decision omitted |
| H13 | Hybrid | PASS | Treatment above 2600 tokens: written dual approval |
| H14 | Hybrid | PARTIAL | Object-loan packet list present; registrar check omitted |
| H15 | Hybrid | PARTIAL | Digitization intake records present; digital archivist signature omitted |
| H16 | Hybrid | PARTIAL | Two reviewers present; original scanned catalog never overwritten omitted |
| H17 | Hybrid | PARTIAL | Embargo duration present; early-release authority and both prerequisite records omitted |
| **H18** | Hybrid | **FAIL** | Snapshot failure question gets **only D-04 section heading**, no 03:10 retry or before-04:00 incident ticket |
| H19 | Hybrid | PARTIAL | OCR working-file 28 days present; dispute hold and deletion resumption omitted |
| H20 | Hybrid | PARTIAL | Export's four included fields present; two excluded personal/internal categories omitted |
| **H21** | Hybrid | **FAIL** | After-17:00 instructor cancellation wrongly selects **before-17:00** replacement rule instead of next-day 10:00 notice |
| H22 | Hybrid | PARTIAL | Event-specific written photo consent present; guardian under 16 and no verbal agreement omitted |
| H23 | Hybrid | PASS | Unsupported administrator password: refusal with zero citations |
| **H24** | Hybrid | **FAIL** | Unsupported Chief Conservator personal mobile number gets irrelevant **treatment approval** citation, not refusal |
| H25–H26 | Hybrid | PASS | Missing current market price and guest Wi-Fi code: refuse, zero citations |
| X27–X30 | Lexical Comparison | PASS | Retention exceptions, package content, and scheduling contrasts |
| **X31** | Lexical Comparison | **PARTIAL** | Harbor-vent 40h and classroom check 30 min included, but normal 80h, unchanged calibration 30 days, and obstructed-exit hold missing |
| X32 | Lexical Comparison | PASS | Dual-approval thresholds across conservation and education |

## Root-cause themes visible from exact captured answers

**A. Wrong conditional branch (direct factual FAIL):** H06 cites a true full-refund rule applying to **72+ hours** instead of **18 hours** (which is nonrefundable). H21 selects a *before 17:00* replacement rule for a question explicitly asking about *after 17:00* notice. Both are wrong applicability even though the quotations are literal and from the correct documents.

**B. Missing source evidence despite available expanded context (11 Hybrid PARTIAL):** H07, H10, H11, H12, H14, H15, H16, H17, H19, H20, H22. In each case the displayed quotation contains at least one required fact but does not cover an adjacent qualification, obligation, exception, actor or restriction. The reported expanded excerpts often contain the missing sentence. The pre-frozen rubric counts **displayed answer facts only**; hidden expanded excerpts do not rescue completeness.

**C. Heading-only answer (FAIL):** H18 returns `D-04 Overnight archive snapshot` instead of an actionable retry schedule and escalation. A source heading being present is not sufficient evidence.

**D. Unsupported-attribute false acceptance (FAIL):** H24 asks for a personal mobile number absent from the corpus and receives an unrelated Chief Conservator approval sentence. **No phone number is fabricated**, but a citation and substantive unrelated answer still violate the mandatory zero-citation refusal rule.

**E. Comparison robustness relative to Hybrid:** 5/6 lexical comparisons passed. X31 still omitted required baseline and condition/exception information on both sides. The lexical Comparison workflow must be measured **separately**, never counted as MiniLM Hybrid success.

Across all 35 displayed quotations, **35/35 literally matched the named original sources**, **31/35 directly supported requested facts**, and four irrelevant citations occurred in **H06, H18, H21, H24**. All **23 Hybrid displayed quotations** appeared in their retrieved excerpt. These measures are **not equivalent to answer completeness**.

## Freeze integrity and provenance

The [pre-test freeze attestation](LANTERN32_R22_FIRSTLOOK_FREEZE.md) registered the SHA-256 values *before* the first Chrome run, and the tester reported that all six matched at the start and end:

| Source/key/rubric | SHA-256 |
| --- | --- |
| `source_docs/01_Lantern_Visitor_Services.txt` | `7833d8dfefce7e0823bf76bbda7972d03ef09531e74300ab719ffb9ca11006ec` |
| `source_docs/02_Lantern_Collections_Care.txt` | `231afd7fb0d5b01c3f91faef1879db642b02898d7851545a0ab093de1ce5fcd4` |
| `source_docs/03_Lantern_Digital_Archive.txt` | `f82f47f9c3a557475888c84004e0f8c75b40f39bed4fa1b1dc21d241ec9657eb` |
| `source_docs/04_Lantern_Education_Programs.txt` | `d20a90965b78ab00b0b20f113460751fb9efb0826018181842a8ff66f554f046` |
| `frozen-answer-key.json` | `950709ad5938a4e8443e2527bf2d9adb09720f838a4ca73b59663741c3322f9b` |
| `FROZEN_RUBRIC.md` | `c339b1af8e1152f969b200dfc4787b28fa7f689543e6e144b265c178ebb3d77d` |

**No scorecard/report hash was supplied with this particular Markdown upload.** The underlying screenshots, JSON scorecard, browser evidence, model state and original source ZIP were mentioned in the report but not individually inspected for this repository documentation update; retain the original user-submitted Markdown as the primary evidence for the figures above. The separate source/key ZIP remains held outside the application's repository and indexed corpus.

## Prior scores kept separate (different sets, distinct histories)

- **Atlas15 r18:** 15/15 in-sample Chrome acceptance on an earlier known-corpus demo; not a production estimate.
- **Meridian24 r18:** **16/24** original first-unseen. Later development on *that same exposed set* gave r19 **18/24**, r20 **20/24**, r21 **21/24**, r22 **23/24** **in-sample regression**.
- **Lantern32 r22:** **16/32 FIRST-LOOK** on a newly frozen fictional museum-policy corpus. This becomes the immutable historical baseline for Lantern-specific improvements, and **cannot** be retroactively changed if retrieval is tuned.

One 32-case assistant-authored synthetic benchmark does not establish real-world production accuracy or safety. The value is a genuine *first-look* counterpoint to the high Meridian post-tuning regression and a concrete prioritized set of failure modes.

## Next engineering gates — after first-look preservation

1. Prioritize **unsupported personal-identifier refusal (H24)** and **wrong conditional branch safeguards (H06/H21)**, ahead of answer-length optimization. Design generalized, negative and boundary controls rather than strings keyed to Lantern questions/numbers or file names.
2. Then address **heading-only quotes (H18)** and **multi-sentence answer completeness** across H07/H10/H11/H12/H14–H17/H19/H20/H22. Require source-literal, relevant, same-section, bounded context; check correct placement in the displayed answer, not just the expanded excerpt.
3. Improve **two-sided Comparison completeness (X31)** separately from Hybrid and preserve its strong 5/6 baseline.
4. Safeguard prior r19–r22 refusal, numerical approval, temporal dispatch, quote provenance and Comparison regressions in synthetic automated tests; test real local MiniLM, keep Qwen off and preserve the first-look 16/32 intact.
5. Label any subsequent Lantern32 browser run **in-sample regression**; freeze an additional never-before-scored external or independently authored corpus before extrapolating a new generalization estimate.

**This document is documentation-only; it does not change or validate the app's retrieval implementation.**
