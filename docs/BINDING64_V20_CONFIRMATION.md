# Binding64 v20 confirmation and PDF resize investigation

**Original browser attempt: BLOCKED before model loading or questions. Qualified first-answer capture:45 PASS /1 PARTIAL /18 FAIL in both v20 variants. Confirmation gate FAIL; do not integrate. Live r44 unchanged.**

The local server returned premature HTTP responses; the original loading-state DOM, screenshot and zero-submission ledger remain immutable. A separate infrastructure-recovery protocol was frozen before any answers. File-logged serving on port8793 passed seven runtime-byte checks and a read-only Chrome initialization test. The precise old server logging/pipe cause is unconfirmed. The recovered64 outputs are first question answers after documented startup recovery, not an unqualified clean first browser run. No question was retried.

## Frozen test and actual browser capture

Four source files were prepared once using the predeclared SHA256 seed, original dataset hash and32 prior article exclusions. Public topics selected were Huguenot, Victoria(Australia), Geology and Packet switching.24 original public QA and4 joined compounds retain exact strings/annotations, including source typos, trailing spaces, deictic wording and duplicates. Newly authored audio/sky-map/geological-imaging/specimen appendices add12 supported count questions,8 conditional/exception questions,8 unsupported actor/action combinations and4 two-document lexical Comparisons. Four standard unsupported questions complete64 cases. Sources/key/rubric/config/module hashes were committed before first answers; only four sources were uploaded. No resampling, expected-answer changes, threshold changes or post-answer tuning occurred.

Installed headless Chrome155.0.8059.40 used actual local Xenova/all-MiniLM-L6-v2 q8 WASM, Qwen off, new384-dimensional source/query/facet vectors:60 Hybrid and4 separate lexical Comparison. Candidate/paired/helper identities and dependencies were checked before upload/questions. Production UI answers were saved before isolated v20 outputs. Every v20 answer/quotation matches same-session v19 exactly in both variants; no fresh causal gain is attributed to the count repair. This is prospective public/constructed testing, not sealed independent accuracy, representative sampling or official SQuAD scoring. Constructed stress tests are not external third-party validation.

## Case outcomes

| Category | Cases | Fixed PASS/PARTIAL/FAIL | Section PASS/PARTIAL/FAIL |
|---|---:|---|---|
| public_supported | 24 | 22/0/2 | 22/0/2 |
| public_compound | 4 | 3/1/0 | 3/1/0 |
| count_supported | 12 | 12/0/0 | 12/0/0 |
| conditional_supported | 8 | 4/0/4 | 4/0/4 |
| unsupported_actor_action | 8 | 0/0/8 | 0/0/8 |
| unsupported_standard | 4 | 4/0/0 | 4/0/0 |
| lexical_comparison | 4 | 0/0/4 | 0/0/4 |

| Variant | PASS | PARTIAL | FAIL | Unsupported false acceptances | Supported false refusals | Source provenance | Paragraph proxy | Requested-span proxy |
|---|---:|---:|---:|---:|---:|---|---|---|
| baseline | 24 | 1 | 39 | 8 | 0 | 64/64 | 24/64 | 21/64 |
| fixed | 45 | 1 | 18 | 8 | 0 | 66/66 | 49/66 | 43/66 |
| section | 45 | 1 | 18 | 8 | 0 | 66/66 | 49/66 | 43/66 |
| paired_fixed | 45 | 1 | 18 | 8 | 0 | 66/66 | 49/66 | 43/66 |
| paired_section | 45 | 1 | 18 | 8 | 0 | 66/66 | 49/66 | 43/66 |

The original startup attempt has no score. These aggregate case counts cover different frozen category rubrics and are not a pooled real-world accuracy estimate.

## Independent evidence review

- F05 selects the wrong historical paragraph/date; its original this-occupation wording is context-dependent. F08 preserves the original winner typo and omits the15degreesC winter fact. C02 is PARTIAL because its second temperature fact is absent.
- All12 supported count tuples are literally present, but in broad paragraphs containing other counts. All8 swapped actor/action negatives are falsely accepted with cited paragraphs. Those paragraphs include a generic no-other-counts statement and no invented number, but the application marks answered and fails the frozen explicit uncited-refusal contract. Supported counts passing does not establish relational binding.
- E1B/E2B/E3B/E4B quote the before-cutoff same-day branch at the exact cutoff, where next operating day is required; all omit the unresolved-review hold. These are wrong branches and missing exceptions.
- X01–X04 select both correct documents and display both durations and both exceptions. Their frozen FAIL is a strict quotation-boundary failure: leading Markdown headings lie outside the gold body paragraphs. Factual completeness is4/4 while strict grades remain0/4. Do not misstate these as missing retention facts or silently regrade them.
- Per candidate66 citations are genuine. Independent labels:42 DIRECT,1 DIRECT_PER_KEY_WORDING_LIMIT,3 missing requested fact/wrong paragraph,4 wrong temporal branch,8 no requested actor/action tuple,8 direct facts with heading-boundary failure. Paragraph/spans are proxies, not entailment.
- F07 asks monthly temperature but source/key gives maximum sinceWWII; preserve its frozen PASS with the wording limitation. F19/F20 are exact duplicate question strings sampled from distinct original IDs; C04 repeats them. Keep these sampling weaknesses visible, without resampling or claiming independent facets. Historical source claims are not current world facts/advice.

Frozen checks:
```json
{
  "development_gate_passed": true,
  "fixed_public_at_least21": true,
  "fixed_compound_all4": false,
  "fixed_count_all12": true,
  "fixed_conditional_all8": false,
  "fixed_unsupported_all12": false,
  "fixed_comparison_all4": false,
  "fixed_every_citation_requested_span": false,
  "fixed_provenance_intact": true,
  "fixed_no_false_acceptance_or_refusal": false,
  "fixed_no_paired_or_production_pass_loss": true,
  "section_public_at_least21": true,
  "section_compound_all4": false,
  "section_count_all12": true,
  "section_conditional_all8": false,
  "section_unsupported_all12": false,
  "section_comparison_all4": false,
  "section_every_citation_requested_span": false,
  "section_provenance_intact": true,
  "section_no_false_acceptance_or_refusal": false,
  "section_no_paired_or_production_pass_loss": true
}
```

Every one of64 fixed/section answers was reviewed against the frozen paragraphs/key, with exact paired-v19 parity checked. Full exact answers, filenames, quotations, groups, per-citation checks and five-variant scorecards are in the accompanying full report/JSON. No expanded-context credit or grade overrides.

## PDF highlight test investigation

The earlier v20 CI failure is retained separately.84 desktop/mobile/media-query-boundary resize samples with actual PDF.js in Chrome155 produced0 sequential-read mismatches and0 same-task/stabilized mismatches. An intentionally introduced8px overlay distortion was detected and restored. The original CI141 failure was not reproduced; a cross-frame measurement race is plausible, not proven.

Only the synthetic test was hardened: read both boxes in one browser task after two fixed animation frames, without waiting until the assertion passes. Original viewport and<1px width/height tolerance remain unchanged. The updated seven-scenario PDF highlight test and mobile upload check pass in real Chrome;387 unit tests and strict offline checks pass. This is reliability evidence, not retrieval accuracy. No PDF/app runtime files changed.

## Decision and preserved history

Do not integrate v20: qualified confirmation FAILS despite the passing451-case exposed development gate. Those sets have different questions/rubrics and are not an independent before/after comparison. Precision48 first40/0/8, its exposed48/0/0, v19 FAIL, v20 exposed PASS, original Lantern/Aster/Meridian results and all old archives remain unchanged. No additional sample or retrieval fix follows this result. Next work requires a separately frozen development protocol for all-answer actor/action validation, exact-cutoff selection and quotation boundaries, followed by preservation tests. Keep r44 live.

[Full answers and case scorecards](./evidence/v20-binding64/FULL_REPORT.md) · [JSON scorecard](./evidence/v20-binding64/scorecard.json) · [Integrity audit](./evidence/v20-binding64/integrity-audit.json).
