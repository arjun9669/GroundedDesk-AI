# GroundedDesk 5.5 / r30 — Unsupported PIN refusal regression

The r29 Cobalt16 first-look found that an unknown planetarium door PIN received the document title with a citation instead of an explicit refusal. Build `2026-10-12-r30` adds a concrete-value evidence guard for recognized PIN/door/access-code requests. A matching title, policy mention or unrelated time does not disclose that value: the cited quotation must contain a directly labeled numeric value of 4–12 digits.

This is a lexical guard with limited recognized phrasing and format support, not semantic factual verification, general entity matching or a security guarantee. Operational questions about PIN rotation/handling/format are distinct from requesting the code itself. Supported fictional PIN values and rotation questions remain answerable. No actual credential was introduced in tests; `0482` is a disposable fictional fixture.

## Preserved first-look and regression

| Test set | Classification | PASS | PARTIAL | FAIL |
|---|---|---:|---:|---:|
| Cobalt16 r29 | Small self-authored first-look, immutable | 15 | 0 | 1 |
| Cobalt16 r30 | In-sample regression, same inputs and rubric | 16 | 0 | 0 |

All five original source/key/rubric SHA-256 hashes were checked before the run and again after capture. Only the original three TXT sources were uploaded. Twelve unchanged questions ran with actual local `Xenova/all-MiniLM-L6-v2` Hybrid Q&A, Qwen off. Four unchanged questions ran through the separate lexical Comparison workflow. Installed Google Chrome 154.0.8037.98 ran headless against the local r30 candidate. Footer and all sixteen copied evidence exports identify r30. All outputs were captured before grading; no input or grading threshold changed.

H09 now says **“I can't find this in the provided documents.”** with zero source citations. The other fifteen displayed outputs are byte-for-byte identical to r29. Four unsupported cases refused with zero citations. False acceptances: zero; false refusals: zero. Citation provenance: 16/16; citation relevance: 16/16. The original r29 failure and raw outputs remain untouched.

H05 still uses the anaphor “there”; it passes the frozen required facts, but self-contained wording remains a limitation. This previously seen, small self-authored set is not new independent or representative accuracy. Historical Atlas, Meridian, Lantern and Aster scores remain unchanged; no full real-model rerun of those sets is claimed.

[All exact answers, quotations and case scores](evidence/r30/cobalt16/REGRESSION_REPORT.md) · [JSON scorecard](evidence/r30/cobalt16/scorecard.json) · [Raw browser observations and model request URLs](evidence/r30/cobalt16/browser-observations.json) · [Original frozen inputs and first-look](evidence/r29/cobalt16/FIRST_LOOK_REPORT.md)

## Other validation

- **253 unit tests pass.** Six new synthetic candidate tests cover unknown titles, policy/time distractions, supported fictional PIN values, access-code wording, operational rotation and physical retaining-pin questions. These unit scores are synthetic and do not measure MiniLM accuracy.
- Actual installed-Chrome positive controls pass in Keyword and real MiniLM Hybrid: the fictional supported PIN and rotation question still answer. Qwen stayed disabled. [Exact controls and model observations](evidence/r30/qa/browser-observations.json).
- The five existing Chromium scripts pass: Q&A/PDF, lexical Research/Comparison, policy workflows, eight PDF intake scenarios and seven highlight scenarios plus mobile-width checks. [Research](evidence/r30/research/research-browser-observations.json), [intake](evidence/r30/reliability/reliability-observations.json), [highlights](evidence/r30/highlight/highlight-observations.json).
- Strict offline toy evaluation passes; it is not real-model accuracy. [Unit log](evidence/r30/unit-tests.txt), [offline toy log](evidence/r30/offline-evaluation.txt), [policy browser log](evidence/r30/policy-browser.txt).

No mock vectors were substituted in actual browser model tests. Mobile checks use desktop viewport emulation, not physical phones. No paid service, backend or OCR was added.
