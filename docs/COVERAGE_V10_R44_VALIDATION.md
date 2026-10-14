# V10 paragraph/facet experiment — real Chrome regression

**Decision: FAIL. Production remains r44.** All267 cases captured once in installed headless Chrome155.0.8059.40 against the unchanged local production app. Actual Xenova/all-MiniLM-L6-v2 q8 WASM Hybrid, Qwen off; candidate modules execute in the browser using actual vectors.24 cases are separate unchanged lexical Comparison;243 are Hybrid. Candidate outputs are recorded separately from the production UI. No mocked embeddings or independent-accuracy claim.

Protocol committed before implementation; candidate/config freeze committed before answers.88 source/key/manifest checks plus candidate/config hashes remain identical afterward.338 unit tests and strict offline evaluation pass. No capture blocker or benchmark retry. All historical grades remain unchanged.

| Exposed test set | Fixed PASS/PARTIAL/FAIL | Section PASS/PARTIAL/FAIL |
|---|---|---|
| Lantern32 | 32/0/0 | 32/0/0 |
| Aster32 | 32/0/0 | 32/0/0 |
| Meridian24 | 24/0/0 | 24/0/0 |
| Cobalt16 | 16/0/0 | 16/0/0 |
| Atlas15 | 15/0/0 | 15/0/0 |
| RetrievalQuality28 | 28/0/0 | 28/0/0 |
| ExternalSQuAD24 | 22/0/2 | 22/0/2 |
| FreshMixed32 | 31/0/1 | 31/0/1 |
| FreshConfirmation32 | 28/1/3 | 30/0/2 |
| V9Exposed32 | 28/1/3 | 28/1/3 |

Original119 and RQ28 remain allPASS for both variants. All35 unsupported controls refuse explicitly with zero citations. All candidate quotations pass source/quoted-excerpt provenance checks. Different rubrics are not pooled into one accuracy estimate; full per-case files preserve each answer and quotation. Public relevance counts are expected-paragraph containment proxies, with direct requested-span checks separately reported. They are not semantic entailment measurements.

The V9 exposed32 section result is28PASS/1PARTIAL/3FAIL, compared with its immutable first24PASS/1PARTIAL/6FAIL/1ungraded. V10 F06 passes only as a qualified in-sample regression observation; original V9 F06 stays ungraded. On the31 cases captured in both runs, V10 has27PASS/1PARTIAL/3FAIL. F19/F21 and C01 gain the missing facts; C01 duplicates the expanded paragraph across two citations, reducing precision. C04 still omits a required fact.

F18 still selects the fumble-return quotation rather than the production touchdown evidence; the conservative operative-condition guard prevents restoration of that narrative paragraph. This loses a production PASS, even though pairedV9 already failed. F20 now falsely refuses: preserving the production refusal loses the pairedV9 acceptance, which itself was incorrect. F22 still quotes only a heading and fails factual support. Heading-only inherited output shows the intended heading guard is not universally enforced; this is a candidate conformance limitation, not a supported answer.

Older v7-public FreshConfirmation32 C02 fixed regresses from PASS to PARTIAL: both requested facts appear, but an added Martin Luther title citation is irrelevant. The section variant retains its prior PASS. The separate-facet path can select a title-only result and deduplicates before expansion, so identical expanded quotes can still be repeated. These defects are preserved, not patched after observation.

The release gate fails prior-PASS preservation, all12 exposed compound controls, and no-new-false-refusal checks. No unseen sample is consumed and no runtime adoption occurs. Broader quotation can also include unrequested material: all18 changed original variant answers were reviewed against unchanged keys and retain complete support, with explicit scope cautions (e.g. MeridianI13 tracking-prefix details). More context is not proof of better citation precision.

Next design work should distinguish body evidence from structural titles before facet acceptance, deduplicate final literal quotations, and revisit paragraph selection/coverage while preserving operative conditions. This report does not implement or freeze another candidate. No paid service introduced.

[Per-case public scorecards and captures](./evidence/coverage-v10-r44/) · [gate decision](./evidence/coverage-v10-r44/decision.json) · [citation diagnostics](./evidence/coverage-v10-r44/citation-diagnostics.json). Full private original captures and per-case report remain in the local evidence archive. Public source quotations retain the existing SQuAD/Wikipedia attribution.
