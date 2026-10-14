# Coverage v8 — actual Chrome semantic sentence experiment

**Frozen development gate: FAIL. Production stays5.6 / retrieval build `2026-10-13-r44`. No fresh sample was generated or evaluated.**

V8 fixes F01, F02 and C01 in the previously exposed v7 public confirmation set. Both indexes improve from22 PASS /2 PARTIAL /8 FAIL to **25 PASS /1 PARTIAL /6 FAIL**. All119 original controls and28 development questions remain PASS; no prior corresponding PASS is lost. The remaining C02 compound omission fails the frozen all-compound development requirement. This improvement is an in-sample regression result, not independent accuracy.

## Frozen method and capture qualification

Protocol commit57b522a precedes implementation; candidate commit278e332 precedes any outputs. Candidate and configuration hashes are preserved in the freeze manifest.235 unchanged exposed cases, same original questions/docs/keys/rubrics and historical scores. Real installed Chrome155.0.8059.40 in an isolated headless profile, unchanged r44 served locally. Actual `Xenova/all-MiniLM-L6-v2` q8WASM Hybrid, Qwen disabled. Production UI, v7 and v8 browser-module outputs remain distinctly labeled; original24 Comparison cases use unchanged lexical Comparison. No mock-vector accuracy claims.

V7 and v8 share actual original query/chunk vectors. V8 additionally uses actual sentence embeddings and separately embedded compound facets. It reranks bounded literal sentences within selected paragraphs using cosine and generic count/date/actor/list/between/description signals; these heuristics are not entailment or factual verification. Refusals and operative constraints are preserved. Candidate receives source text and vectors, never answer-key data. No key is uploaded.

First infrastructure attempt failed **before any question** with a stale runner import (`literalSentences` undefined). Its error and model-readiness screenshot are preserved. Only runner imports/output paths were repaired, candidate and inputs unchanged; second attempt captured235 cases once. There were no question-level retries, model fallbacks or synthetic substitutions. This qualification is not erased.

## Case-set results

| Set | Fixed PASS/PARTIAL/FAIL | Section PASS/PARTIAL/FAIL |
|---|---|---|
| Aster32 | 32 / 0 / 0 | 32 / 0 / 0 |
| Atlas15 | 15 / 0 / 0 | 15 / 0 / 0 |
| Cobalt16 | 16 / 0 / 0 | 16 / 0 / 0 |
| ExternalSQuAD24 | 20 / 0 / 4 | 20 / 0 / 4 |
| FreshConfirmation32 | 25 / 1 / 6 | 25 / 1 / 6 |
| FreshMixed32 | 30 / 0 / 2 | 30 / 0 / 2 |
| Lantern32 | 32 / 0 / 0 | 32 / 0 / 0 |
| Meridian24 | 24 / 0 / 0 | 24 / 0 / 0 |
| RetrievalQuality28 | 28 / 0 / 0 | 28 / 0 / 0 |

The set named FreshConfirmation32 is the **previously consumed v7 sample**, not a new sample. Its immutable first v7 score remains22/2/8. Every original-control quotation exactly matches v7; no new original-case adjudication was necessary. Paired v7 outputs match frozen v7 displayed quotations on identical original vectors. Prior v2–v7 PASS comparisons are preserved. Different rubrics must not be pooled into an accuracy headline.

## Exposed confirmation diagnosis

| ID | V7 | V8 | Observed result |
|---|---|---|
| F01 | FAIL | PASS | Correct overall count: over a hundred awards |
| F02 | FAIL | PASS | Correct2010 episode: The Waters of Mars |
| C01 | PARTIAL | PASS | Adds separately cited count to the episode evidence |
| F04 | FAIL | FAIL | Still omits the between-Doctors relationship |
| F07 | FAIL | FAIL | Still selects sympathies/obedience instead of requested description |
| F09 | FAIL | FAIL | Stays in wrong selected paragraph, unrelated to the revolt |
| F10 | FAIL | FAIL | Preserved false refusal; gold date absent from prior top5 |
| F17 | FAIL | FAIL | Changes to other complexity measures; still omits time/storage |
| F19 | FAIL | FAIL | Keeps ordination sentence; omits assisting person |
| C02 | PARTIAL | PARTIAL | Contains obedience evidence but omits requested description |

V8 supports18/24 original public questions,3/4 compounds,4/4 unsupported controls. One existing false refusal(F10), zero false acceptances, zero new false refusals. All unsupported controls stay explicit zero-citation refusals. V8 does not claim to repair retrieval loss, ambiguous referents or every relation. Its F17 ranking change selects the wrong requested list despite structural list support; it remains a preserved FAIL rather than an improvement.

## Citation checks

Exposed confirmation section: provenance **28/28**, correct original paragraph **27/28**, direct requested gold span **23/28**. Fixed: provenance28/28; paragraph26/28; requested span23/28.

Public scorecard field `citation_relevance` is the frozen gold-paragraph location proxy. It does not assert semantic relevance. Direct-span diagnostics are separately saved; even a requested span cannot prove complete entailment. C01 retains an unrequested actor-award detail in its preserved multi-sentence quotation; frozen compound rubric treats original paragraph plus both gold groups as PASS. Record this precision limitation without changing the scoring threshold. All grades use displayed literal quotations, never expanded context.

## Integrity and decision

78 pre-test source/key checks passed; all source and original manifest hashes were reverified after capture. Sentence/facet/query vectors are384 dimensions, sentence count stays within512 per pack. Current Atlas original PDF hashes are verified, but no historical original Atlas manifest was supplied; prior independent pypdf extraction is preserved. Production runtime files are unchanged from0082a24.326/326 final local unit tests and strict offline evaluation pass; synthetic CI smoke is separate from real MiniLM evaluation.

Development gate fails only its compound-completeness requirement. No further fresh public sample is consumed. Historical first-look results remain immutable. Experimental code/reporting can be merged after CI without adopting v8 into production. This does not complete5.6,5.7 or6.0 quality gates. No paid service introduced.

The remaining work needs stronger relationship and requested-list selection, and a separately designed treatment of ambiguous questions/retrieval refusals. No thresholds, source documents, questions, keys or candidate rules were changed after seeing these outputs.

## Evidence

[Public raw browser evidence](./evidence/coverage-v8-r44/) · [exposed32 JSON scorecard](./evidence/coverage-v8-r44/FreshConfirmation32-scorecard.json) · [direct-span diagnostics](./evidence/coverage-v8-r44/direct-span-diagnostics.json) · [decision](./evidence/coverage-v8-r44/decision.json). The local full report includes every case with exact answers/quotes/filenames; owner-only original packs remain in the local ZIP. Public SQuAD-derived material includes attribution/share-alike notices.
