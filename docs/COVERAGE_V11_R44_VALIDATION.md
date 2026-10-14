# V11 body-evidence experiment — real Chrome regression

**Decision: FAIL. Production remains r44.** The section variant repairs the targeted exposed V9 cases, but the frozen gate requires both variants. Fixed C04 still omits its second requested fact. No candidate adoption, post-capture tuning, automatic benchmark retry or new unseen sample.

Protocol committed before implementation; candidate/config freeze committed before answers. Installed headless Chrome 155.0.8059.40 captured all 267 unchanged exposed cases once, using actual Xenova/all-MiniLM-L6-v2 q8 WASM Hybrid with Qwen disabled. 243 Hybrid cases and 24 separate unchanged lexical Comparison cases. Actual candidate modules execute in the browser and their visibly labelled screenshots are separate from unchanged production UI. This is in-sample regression, not independent accuracy or official SQuAD scoring.

All 342 unit tests and strict offline evaluation pass. All 88 source/key/manifest checks, frozen candidate and config remain identical afterward. Ten authoritative v9/v10 artifacts are byte-identical to their immutable delivery archives. Historical Atlas manifest remains unavailable; current PDFs and independent text provenance checks are disclosed.

| Exposed test set | Fixed PASS/PARTIAL/FAIL | Section PASS/PARTIAL/FAIL |
|---|---|---|
| Lantern32 | 32/0/0 | 32/0/0 |
| Aster32 | 32/0/0 | 32/0/0 |
| Meridian24 | 24/0/0 | 24/0/0 |
| Cobalt16 | 16/0/0 | 16/0/0 |
| Atlas15 | 15/0/0 | 15/0/0 |
| RetrievalQuality28 | 28/0/0 | 28/0/0 |
| ExternalSQuAD24 | 22/0/2 | 23/0/1 |
| FreshMixed32 | 32/0/0 | 32/0/0 |
| FreshConfirmation32 | 29/0/3 | 30/0/2 |
| V9Exposed32 | 29/1/2 | 32/0/0 |

Original 119 and RQ28 remain all PASS. The original 119 literal answer/source outputs match v10 exactly; no changed-original review was required, and earlier quotation-scope cautions remain. No prior production or candidate PASS is lost through v10. All 35 unsupported controls retain explicit zero-citation refusals. No new false refusals relative to either paired v9 or v10. Existing supported false refusals remain: one in section (older public F10), two in fixed (older F10 and V9Exposed32 F20).

V9Exposed32 section reaches 32/0/0 from v10 28/1/3. Its immutable first v9 result remains 24/1/6 plus one ungraded F06. F06 is a later regression observation; first v9 output remains unavailable/ungraded. On the 31 cases captured in both first v9 and v11, section is 31/0/0. This perfect exposed-set score is not new independent evidence. Fixed is 29/1/2 from v10 28/1/3, with different remaining failures.

Section F18 restores the production Jonathan Stewart quotation instead of the deictic fumble-return sentence. Section F20 displays the state/including-judges sentence in a forward literal window, and section F22 replaces a heading with the Barkan body quotation. The older public compound C02 fixed recovers PASS by retaining whole-query body evidence when a facet has only a heading. Expanded duplicates are removed after expansion.

Fixed F16 still quotes only the Carolina scoring-drive setup without naming Jonathan Stewart. Fixed F20 remains an explicit supported false refusal because v9 itself refuses and the frozen rule preserves it. Fixed C04 PARTIAL includes the punishment-goal fact but omits state/judges; its second facet refuses, so whole-query evidence is retained. The fixed variant passes 11/12 compound controls; section passes 12/12. Requiring both makes the development gate FAIL. Do not drop the fixed variant post hoc to claim a gate PASS.

All final citations pass source/quoted-excerpt provenance. Heading-only, exact duplicate and contained redundant citations are zero under the frozen structural checks. Those checks do not prove factual entailment; nonresponsive context can still remain. Public relevance is expected-original-paragraph containment, with direct gold-span support reported separately. Different set rubrics are not pooled into one independent accuracy figure. Exact answers, missing groups, filenames, literal quotations, screenshots, model requests and real vectors are preserved.

Next design work should investigate why fixed-index actor facets refuse despite available paragraph evidence, without relaxing unsupported protections or removing the frozen gate requirement. No next candidate is implemented here. No paid service introduced.

[Public scorecards and browser evidence](./evidence/coverage-v11-r44/) · [gate decision](./evidence/coverage-v11-r44/decision.json) · [citation diagnostics](./evidence/coverage-v11-r44/citation-diagnostics.json) · [hash audit](./evidence/coverage-v11-r44/integrity-audit.json). Full private original captures and the complete per-case Markdown report remain in the local delivery archive. Public quotations retain the existing SQuAD/Wikipedia attribution.
