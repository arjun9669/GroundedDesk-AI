# Coverage v2 — full validation and failed release gate

**Keep production r44 unchanged.** The generic inspection facet fix closes the known Markdown development case, but the external confirmation sample fails the predeclared release-consideration gate. No runtime code or model parameter was changed.

| Test set | Classification | Production UI PASS/PARTIAL/FAIL | Fixed + v2 | Sections + v2 |
| --- | --- | --- | --- | --- |
| Atlas15 | Original known regression | 15 / 0 / 0 | 15 / 0 / 0 | 15 / 0 / 0 |
| Meridian24 | Original known regression | 23 / 1 / 0 | 23 / 1 / 0 | 23 / 1 / 0 |
| Lantern32 | Original known regression | 32 / 0 / 0 | 32 / 0 / 0 | 32 / 0 / 0 |
| Aster32 | Original known regression | 32 / 0 / 0 | 32 / 0 / 0 | 32 / 0 / 0 |
| Cobalt16 | Original known regression | 16 / 0 / 0 | 16 / 0 / 0 | 16 / 0 / 0 |
| Retrieval Quality 28 | Known self-authored development | 16 / 7 / 5 | 24 / 0 / 4 | 28 / 0 / 0 |
| External SQuAD24 | Externally authored public prospective confirmation | 13 / 1 / 10 | 13 / 1 / 10 | 13 / 1 / 10 |

These sets have different frozen rubrics and cannot be pooled into one accuracy number. Original first-look scores, all prior regressions and the v1 23/1/4 fixed and 27/1/0 section results remain immutable. The new captures do not replace them.

## What changed and what did not

Only the isolated v2 wrapper's generic terminal `tion/tions` noun folding changed. It now connects inspection/inspected and calibration/calibrated while retaining the original local paragraph, heading, contiguous-span, 620-character/three-sentence, literal branch and refusal safeguards. Production imports neither coverage experiment nor section-index experiment. No new runtime dependency or paid service was added.

RQ13 now quotes the normal 70-hour lubrication, dusty-bay 35-hour lubrication and unchanged 14-day inspection interval. All prior v1 PASS cases are preserved. The combined known development set reaches 28/28; fixed-window cases RQ02/RQ07/RQ10/RQ21 remain title-only failures. The earlier baseline numbers remain unchanged.

## Original benchmark controls

All 119 original cases were run in the actual production main UI, with 95 real MiniLM Hybrid Q&A and 24 separate lexical Comparison questions. Each original question string, corpus, document pair and grading rubric was preserved. The v2 browser-module fixed outputs matched the new production baseline sources exactly for every original case; plain/numbered source files are not given invented Markdown section boundaries.

The 119 controls total 118 PASS / 1 PARTIAL / 0 FAIL under their own unchanged rubrics, with no previously passing case lost. The 19 unsupported cases explicitly refuse with zero citations. All 124 original-control citations match their named original source and retrieved excerpt; all 16 Atlas citations were independently checked against pypdf extraction of the original PDFs as well as browser PDF.js extraction.

**Meridian I15 remains PARTIAL:** standard 60 hours and dusty-bay 30 hours are shown; unchanged inspection interval is omitted. It is in larger context only, which receives no completeness credit. Fixing a Markdown facet does not fix this numbered-text limitation.

**Atlas D05 scope caution:** the P1 Incident Commander/30-minute answer remains complete, source-valid and PASS under the original answer/citation-level key. Current r44 also quotes an unrequested P2 rule and containment examples. This is overbroad extraction; no narrower sentence-precision claim is made. It is already present in the production baseline, not introduced by v2. Other 118 cases' exact displayed quotations and filenames match the previously reviewed records; current provenance was independently rechecked. H05 Cobalt retains the original anaphoric `there` qualification.

All frozen TXT-pack source/key/rubric hashes were checked. The Atlas PDFs are the original owner-supplied files: current SHA-256 was recorded, but no original historical hash manifest was available for byte-for-byte historical comparison. Atlas questions are unchanged strings from `tests/atlas15-accuracy.test.mjs`; the original user-provided expected facts were preserved. The private original key PDF was not available here. Historical keys and source packs remain outside public Git; the owner receives full local evidence.

## External first-run confirmation

The 24 original questions and gold answer spans come from [SQuAD v1.1 dev data](https://rajpurkar.github.io/SQuAD-explorer/dataset/dev-v1.1.json), whose questions were written by external crowdworkers on Wikipedia contexts. [Official project and license](https://rajpurkar.github.io/SQuAD-explorer/). Candidate implementation commit `e314894` preceded dataset sampling and any inspection of its question strings. The SHA-ordered four-article/two-paragraph/three-question adapter, seed, dataset hash, immutable original bodies/question IDs/spans and six file hashes were saved before capture. No difficulty-based resampling was used. Added document/paragraph headings are formatting only.

This is an externally authored **public** confirmation sample. It is not a sealed independent benchmark, official SQuAD EM/F1, or statistically representative accuracy. The public data may overlap model training; that cannot be excluded. There are no unsupported or Comparison cases in this sample, so external refusal/false-acceptance performance is **not measured**. Existing known refusal controls cannot fill that gap.

The frozen criterion requires the gold answer in a literal quote entirely within the original annotated context; all added citations must also match that context. It is a gold-span/context proxy, not semantic entailment verification. The primary score stays **13 PASS / 1 PARTIAL / 10 FAIL** for all three variants, below the required 21/24 threshold. Larger source context is not credited.

- **Fact omissions:** E02 ownership, E08 window location, E12 collection date range, E13 preserved energy and E24 energy-content characteristic. A related sentence from the correct paragraph can still omit the requested fact.
- **Adapter/context-scope failures:** E01, E06, E07, E14 and E15 contain a gold span but include document/paragraph headings outside the original annotated paragraph. They remain FAIL under the predeclared criterion. These are not all factual errors; the failure type is separately recorded.
- **E23 PARTIAL:** dioxygen is quoted correctly, but an unrelated museum-architecture citation is added. This is a clear citation-precision problem.

All 25 external citations remain source-literal. That does not establish relevance or completeness: strict gold-paragraph match is 18/25 fixed and 19/25 sections, and all-case scores remain unchanged. A post-capture diagnosis identifies five heading/context failures; it does not change the criterion or primary score. No tuning was done after observing external answers. Future use of this exposed sample is in-sample regression.

## Capture qualification and validation

Installed Google Chrome 154.0.8037.98 ran actual local `Xenova/all-MiniLM-L6-v2` q8 WASM with Qwen off. Only source documents were uploaded. No key, manifest or rubric was ingested into the document library or retrieval index. Scoring annotations in the original evaluator callback were not used by retrieval or coverage functions: those receive only question text and ranked source passages. The future runner now minimizes callback arguments to question/workflow/document-pair metadata; captured outputs were not regenerated. Every real production UI quote/excerpt was saved before its candidate computation; instrumented production matched UI output before scoring. Candidate outputs are isolated browser-module computations using actual locally generated vectors, not a production UI feature. Separate Comparison stayed lexical.

All 119 original cases captured once. The initial runner then stopped before attempting RQ01 because the development key omits a workflow field. The failure log is preserved. A runner-only default-workflow correction continued the 28 development and 24 external cases in a new directory, with none of the 119 answers rerun/replaced. External and RQ28 questions were each attempted once. No model-loading failure, mock vectors or silent Keyword fallback occurred.

The full 283-test suite and strict offline toy check passed. A further frozen v2/external hash/span integrity test passed separately (284 CI tests). Existing ten Chromium feature smoke scripts remain in CI. The offline toy check is separate from actual MiniLM evidence.

## Decision and next experiment

Development gate: **PASS**. Release-consideration gate: **FAIL** because external strict passes are 13/24, below 21/24. Keep r44 unchanged. The next separately frozen experiment should address source-heading handling, complete literal sentence selection and secondary-citation precision, while also covering numbered-text exceptions. The exposed external failure cases are now regression material; they cannot be reused as unseen evidence. A new prospective external pack, including unsupported and compound cases, is required before further generalization claims.

## Evidence

[Machine-readable decision and all summaries](./evidence/coverage-v2-r44/decision.json) · [RQ28 per-case JSON](./evidence/coverage-v2-r44/RetrievalQuality28/scorecard.json) · [External per-case JSON](./evidence/coverage-v2-r44/ExternalSQuAD24/scorecard.json) · [Frozen protocol](../eval/answer-completeness-v2/PROTOCOL.md) · [External frozen hashes](../eval/answer-completeness-v2/external24/freeze-manifest.json) · [CC BY-SA attribution and adapter](../eval/answer-completeness-v2/external24/ATTRIBUTION.md).

The public evidence directory holds both source extractions, all 52 production-UI screenshots/case records, isolated candidate outputs/query vectors, model-ready screenshots, RQ13 candidate panel, initial runner diagnostic and test logs. The owner-only local `coverage-v2-final/FULL_REPORT.md`, seven scorecards, full capture folders and verified ZIP retain every original benchmark answer/quotation/screenshot plus source/key hashes. Keys were never uploaded to the app. No private benchmark pack is newly published here.

Reproduction requires the original owner files. Run `python eval/answer-completeness-v2/prepare.py`, serve the repo at port 8786, and use `node tests/browser-coverage-v2-validation.mjs` with `RUN_CONFIG` and an empty `EVIDENCE_DIR`. The preserved continuation used a config containing only the two unattempted corpora. The scorer expects the documented first-run/continuation paths and writes a new empty `coverage-v2-final` directory. Never overwrite captured outputs; any repeat is a regression, not another first result.
