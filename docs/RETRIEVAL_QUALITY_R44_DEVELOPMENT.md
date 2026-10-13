# Retrieval Quality 28 — r44 development comparison

This self-authored development evaluation compares production fixed windows with a predeclared section-aware candidate using installed Google Chrome 154.0.8037.98 and actual local Xenova/all-MiniLM-L6-v2 q8 WASM. Qwen was disabled. It is not independent or held-out accuracy. Production remains retrieval build **2026-10-13-r44**, with no retrieval changes.

| Measure | Production fixed windows | Experimental sections |
| --- | ---: | ---: |
| Strict PASS / PARTIAL / FAIL | 16 / 7 / 5 | 19 / 7 / 2 |
| Exact evidence recall@1 | 26/34 | 27/34 |
| Exact evidence recall@3 | 31/34 | 33/34 |
| Exact evidence recall@5 | 32/34 | 34/34 |
| Relevant top-ranked passage | 18/24 | 19/24 |
| Valid quotation provenance | 24/24 | 24/24 |
| Exact-evidence citation relevance | 19/24 | 22/24 |
| False acceptances / false refusals | 0 / 0 | 0 / 0 |
| Passages | 22 | 34 |

All four unsupported questions refused with zero citations. There were no PASS-to-non-PASS regressions. The frozen development gate passed; this authorizes further study, not a production switch or completion of the original 6.0 release gate.

## Frozen method and evidence

The four fictional Markdown documents, 28 questions, full expected sentences, rubric and candidate algorithm were frozen in commit `9290b0a` before browser outputs. All six manifest entries were SHA-256 verified before testing. The initial Git commit normalized Windows line endings; a post-merge checkout check detected the mismatch and the exact original tested bytes were restored from the verified evidence archive under `-text` attributes. The frozen manifest, content, questions, scoring and measured outputs were not changed. Only source documents were uploaded. The 28 main-UI baseline answers were captured once and saved before loading the experimental section builder. Instrumented fixed ranking then reproduced the original displayed source quotations and excerpts for all 28 cases. Candidate output comes from an isolated browser-module experiment, not a production UI mode. It reused actual query embeddings, never mock vectors.

The candidate splits at Markdown level-two headings and applies unchanged 760-character / 100-overlap windows within long sections. Tokenization, global lexical statistics, hybrid ranking weights, thresholds and answer extraction are unchanged. Production imports none of this experiment.

The frozen scorer requires full exact expected sentences in the displayed quotation; whitespace is normalized. It gives no completeness credit for expanded context. This conservative metric is not a semantic entailment judge and can undercount shortened answers. In the two remaining failures here, manual inspection confirms substantive omissions, rather than merely wording differences. Citation relevance below uses the same exact-sentence criterion, not a separate human relevance label.

This suite measures 28 Hybrid questions: 24 supported, including two multi-document controls, and four unsupported. It does not test the separate lexical Comparison workflow. Historical Atlas, Meridian, Lantern, Aster and Cobalt scores are unchanged.

## Observed failures and partials

Three cases improved from FAIL to PASS: RQ07 dispatch packet contents, RQ10 current visitor access and RQ21 receiving packet contents. Each required sentence moved into the top-ranked section. This is evidence of improvement on these known development fixtures only.

- **RQ02 FAIL:** a 15:00 release receives the before-14:20 same-day rule instead of the at-or-after-14:20 next-operating-day rule. Correct evidence exists in candidate rank 2.
- **RQ14 FAIL:** sensor replacement receives the routine 28-day calibration rule and omits calibration before restarting. Correct evidence is in candidate rank 1.
- **RQ06 PARTIAL:** route quoted; approving Logistics Lead omitted.
- **RQ08 PARTIAL:** 120 days quoted; unresolved transport-claim exception omitted.
- **RQ13 PARTIAL:** normal 70 operating hours quoted; dusty-bay 35 hours and unchanged 14-day inspection omitted.
- **RQ17 PARTIAL:** 18 months quoted; warranty-dispute exception omitted.
- **RQ22 PARTIAL:** 45 days after contract end quoted; legal-hold exception omitted.
- **RQ23 PARTIAL:** Orchard packet quoted; Lakeside packet omitted despite being in candidate rank 1.
- **RQ24 PARTIAL:** Orchard retention quoted; Hilltop retention omitted despite being in candidate rank 4.

Better passage retrieval alone does not resolve conditional sentence selection or compound coverage. The next engineering experiment should target general condition/exception and multi-fact selection, freeze its protocol before observing outputs, and retain this baseline. Adoption still requires wider existing regression coverage and a genuinely unseen, externally controlled evaluation.

## Every case

| Case | Baseline UI | Section candidate |
| --- | --- | --- |
| RQ01 | PASS | PASS |
| RQ02 | FAIL | FAIL |
| RQ03 | PASS | PASS |
| RQ04 | PASS | PASS |
| RQ05 | PASS | PASS |
| RQ06 | PARTIAL | PARTIAL |
| RQ07 | FAIL | PASS |
| RQ08 | PARTIAL | PARTIAL |
| RQ09 | PASS | PASS |
| RQ10 | FAIL | PASS |
| RQ11 | PASS | PASS |
| RQ12 | PASS | PASS |
| RQ13 | PARTIAL | PARTIAL |
| RQ14 | FAIL | FAIL |
| RQ15 | PASS | PASS |
| RQ16 | PASS | PASS |
| RQ17 | PARTIAL | PARTIAL |
| RQ18 | PASS | PASS |
| RQ19 | PASS | PASS |
| RQ20 | PASS | PASS |
| RQ21 | FAIL | PASS |
| RQ22 | PARTIAL | PARTIAL |
| RQ23 | PARTIAL | PARTIAL |
| RQ24 | PARTIAL | PARTIAL |
| RQ25 | PASS | PASS |
| RQ26 | PASS | PASS |
| RQ27 | PASS | PASS |
| RQ28 | PASS | PASS |

## Validation and reproducibility

273 unit tests passed, including section offsets, long-section bounds, unchanged unsectioned indexing, context-only scoring rejection, explicit refusal requirements and altered-source provenance rejection. The strict offline toy evaluation passed separately; it is not real MiniLM benchmark evidence.

From the repository root, serve it with `python -m http.server 8765 --bind 127.0.0.1`. In PowerShell set `$env:TEST_URL="http://127.0.0.1:8765/"` and `$env:EVIDENCE_DIR="<new-output-directory>"`, then run `node tests/browser-retrieval-quality.mjs` and `node eval/retrieval-quality/score.mjs <new-output-directory>`. Installed Chrome and the pinned Playwright dependency are required; model loading needs its public downloads. Use a fresh output directory: captures and scores refuse overwrite. A repeat is an in-sample regression, not another first result.

Timing is a single fixed-first run with cache/order effects; candidate timing reuses query embeddings. JS heap excludes full-device/peak WASM memory. No speed or memory superiority is claimed.

[Exact answers, quotations and expanded context](./evidence/retrieval-quality-r44/REPORT.md) · [Machine-readable scorecard](./evidence/retrieval-quality-r44/scorecard.json) · [Original UI observations](./evidence/retrieval-quality-r44/baseline-ui.json) · [Ranked passages and browser experiment](./evidence/retrieval-quality-r44/experiment.json) · [Frozen protocol](../eval/retrieval-quality/PROTOCOL.md) · [Frozen hashes](../eval/retrieval-quality/freeze-manifest.json)

The evidence folder also preserves one baseline Chrome screenshot per question. Evidence SHA-256 hashes are in `manifest.json`. Full browser-module query vectors are retained in the raw experiment evidence.
