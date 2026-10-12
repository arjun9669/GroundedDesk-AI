# r25 subject-aware and scoped evidence update

## Motivation and frozen baseline
The original Aster32 first-look result for r24 remains **26 PASS / 5 PARTIAL / 1 FAIL (26/32, 81.25%)**. The six observed misses comprised an excluded-subject entry-time error, four incomplete multi-clause Hybrid answers, and one incomplete two-source Comparison retention exception. The benchmark's source documents, questions, answer key, rubric, scores and report were **not modified**. Future Aster32 retests are explicitly **in-sample regressions**, not new held-out measurements.

Earlier Lantern32 independent first-look remains **16/32 PASS**; r23 and r24 Lantern32 are in-sample regressions **20/32** and **32/32**, respectively.

## General implementation
- Source sentence scoring now recognizes explicit linguistic contrasts (rather than, instead of, as opposed to) and gives requested subjects priority over excluded alternatives. Lexical normalization supports common ordinary/general/regular variants; it does not invent new source wording.
- Bounded scoped multi-fact extraction now recognizes generic comparison, conditions, exclusions, procedures and exception language beyond the narrow r24 patterns.
- Low-overlap *multi-facet* answer recovery requires at least two material lexical evidence points **and** the verbatim anchor to occur in the already-ranked chunk. This cannot authorize unsupported source-wide semantic guesses.
- Adjacent exception clauses can be included when supported by same-numbered-section evidence and literal subject continuity. The 620-character cap and prohibition on crossing unrelated intermediate clauses remain in force.
- The lexical two-document Comparison workflow continues to return original text only. Additional exception coverage is optional and evidence-gated; the result is never treated as semantic entailment.
- Retrieval build and cache-busting updated to `2026-10-12-r25`.

## Testing and release gates
New `tests/r25-generalized-evidence.test.mjs` exercises unrelated synthetic documents and question templates, not the frozen benchmark's documents or literals. The existing suite and browser smoke test must pass on GitHub Actions. **Real Chrome + MiniLM r25 Aster32 regression is pending** and must be performed after code freeze with the original Aster ZIP unchanged. Run Lantern32 as an in-sample safety regression too.

Do not merge the draft PR without reviewing: Node CI, browser smoke, source quotation provenance, unsupported zero-citation refusals, and the real MiniLM/Comparison evaluations. Even a 32/32 Aster in-sample regression would not establish independent accuracy; a new, previously unseen benchmark is required.
