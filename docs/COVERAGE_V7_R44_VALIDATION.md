# Coverage v7 — r44 real Chrome validation

**Decision: development gate PASS; fresh public confirmation gate FAIL. Production remains 5.6 / `2026-10-13-r44`.** V7 is isolated evaluation code, not imported by the app. No production retrieval or UI change is released.

## Frozen method

Protocol commit `4dd6dff`, candidate commit `232d8878174355eb46c25948b1a381bd8aef1bbb`, fresh-pack commit `7916917` all precede their respective answers. V7 changes sentence eligibility for punctuation followed by closing quotes/brackets; all other v6 rules stay fixed. Questions, keys, source documents, scoring rules and thresholds were not tuned after capture.

Actual installed Chrome **155.0.8059.40**, isolated headless profile, local HTTP serving of the unchanged r44 app. Actual `Xenova/all-MiniLM-L6-v2` q8 WASM Hybrid embeddings; Qwen disabled. Production UI outputs are captured separately from browser-executed v6/v7 candidates. Paired candidates share identical real query/chunk vectors, with fixed and experimental section indexes. Original Comparison cases stay lexical; no Hybrid Comparison claim. The owner's existing Chrome workspace is not used or changed. All 235 cases completed without benchmark retries or synthetic vector fallback.

Stage 1 contains 203 already-known cases. Stage 2 contains 24 externally authored SQuAD v1.1 questions, four constructed compound and four unsupported controls, deterministically sampled with previously used article titles excluded. The fresh documents/key were frozen before observing answers; only source documents entered the app. This is a prospective **public mixed sample**, not sealed independent accuracy, representative accuracy or official SQuAD EM/F1. Public/model exposure cannot be excluded. It is now exposed and future uses must be called regression tests.

## Stage 1: known regression

| Set | Fixed PASS/PARTIAL/FAIL | Section PASS/PARTIAL/FAIL |
|---|---|---|
| Aster32 | 32 / 0 / 0 | 32 / 0 / 0 |
| Atlas15 | 15 / 0 / 0 | 15 / 0 / 0 |
| Cobalt16 | 16 / 0 / 0 | 16 / 0 / 0 |
| ExternalSQuAD24 | 20 / 0 / 4 | 20 / 0 / 4 |
| FreshMixed32 | 30 / 0 / 2 | 30 / 0 / 2 |
| Lantern32 | 32 / 0 / 0 | 32 / 0 / 0 |
| Meridian24 | 24 / 0 / 0 | 24 / 0 / 0 |
| RetrievalQuality28 | 28 / 0 / 0 | 28 / 0 / 0 |

All original119, RQ28 and exposed compound4 pass. F12 is repaired; no prior passing case is lost under the frozen corresponding-variant comparisons. Exposed E08/E12/E13/E24 and F16/F18 remain failures. Current original-control passes do not replace any historical first-look score. The earlier v3/v4 F18 narrative erratum remains in force: its preserved scorecard is FAIL.

## Stage 2: fresh confirmation

| Variant | PASS | PARTIAL | FAIL |
|---|---:|---:|---:|
| baseline | 19 | 2 | 11 |
| fixed | 22 | 2 | 8 |
| section | 22 | 2 | 8 |
| paired_fixed | 22 | 2 | 8 |
| paired_section | 22 | 2 | 8 |

V7 scores **16/24** externally authored supported passes, **2/4** compound passes (two partial), and **4/4** uncited unsupported refusals. It misses the frozen supported threshold of 21/24 and all-compound requirement. There is **one false refusal (F10)** and **zero false acceptances**. Paired v6 and v7 scores are identical on this sample; no paired PASS regresses.

All 27/27 section citations have valid normalized source provenance. **26/27** are wholly in the correct gold paragraph; this is a location proxy, not semantic relevance. Only **20/27** directly contain at least one requested gold span. Fixed: provenance27/27, paragraph25/27, direct-span20/27. This distinction explains why intact citations do not establish complete or relevant answers. Grades use displayed quotations only; expanded retrieval context cannot rescue a failure.

### All fresh non-passes (section)

| ID | Outcome | Missing frozen evidence / issue |
|---|---|---|
| F01 | FAIL | over a hundred |
| F02 | FAIL | The Waters of Mars |
| F04 | FAIL | McGann and Eccleston's Doctors / McGann and Eccleston / McGann and Eccleston's |
| F07 | FAIL | the devil's work / devil's work / devil's work, |
| F09 | FAIL | the nobles / nobles |
| F10 | FAIL | 1543 — false refusal |
| F17 | FAIL | time and storage |
| F19 | FAIL | Dr. Thomas Coke |
| C01 | PARTIAL | over a hundred |
| C02 | PARTIAL | the devil's work / devil's work / devil's work, |

F09 selects a different paragraph concerning historical antisemitism, unrelated to the requested revolt; the raw historical quotation is preserved as evidence, not endorsed. F01/F02/F04/F07/F17/F19 select nearby sentences without the requested facts. C01 omits the overall award count; C02 omits the requested description.

## Integrity and limitations

All configured source SHA-256 hashes and all v7 protocol/candidate/fresh-pack manifest hashes were reverified after capture. Every Hybrid query has a captured 384-dimensional real vector. Atlas hashes establish identity of current original PDFs; an original historical Atlas hash manifest was not supplied. Original PDF extraction was independently checked with pypdf; source normalization is not a claim of byte-identical layout. All keys stay outside application ingestion.

321 existing unit tests passed before fresh capture; the added post-capture frozen-pack integrity guard passed after correcting its array-schema assumption (no inputs, scores or candidate changed). The final local complete suite passed 322/322, and strict offline evaluation passed; CI runs these and synthetic UI smoke tests separately. Synthetic CI smoke is not this MiniLM benchmark.

The sentence eligibility repair passes development checks but does not resolve general sentence selection, ambiguous pronouns, numeric counts, list relationships or compound coverage. Preserve this failed confirmation before further design. Any subsequent change needs a new frozen candidate, all exposed regressions and a fresh prospective sample; no tuning and rebranding this sample as unseen. This does not complete phase5.6, 5.7 or6.0 quality gates.

## Evidence

Public raw screenshots, exact UI answers/quotes, real vectors, candidate outputs and extraction: [evidence directory](./evidence/coverage-v7-r44/). [Fresh exact case-by-case scorecard](./evidence/coverage-v7-r44/FreshConfirmation32-scorecard.json), [fresh full report](./evidence/coverage-v7-r44/FRESH_FULL_REPORT.md), [combined decision](./evidence/coverage-v7-r44/combined-decision.json). Original owner-only inputs and full combined reports are in the local evidence ZIP, not newly published.

Source attribution and share-alike notices accompany public SQuAD-derived excerpts. See the fresh pack's [attribution](../eval/answer-completeness-v7/fresh32/ATTRIBUTION.md).

## Runtime status

The experimental files and documentation may be merged after CI, but production imports remain unchanged at r44. A merged evidence PR is not an adoption of v7 or a successful release gate.
