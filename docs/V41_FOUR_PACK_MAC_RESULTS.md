# First Mac v41 four-pack exposed regression — PASS

Date: 2026-10-20 (Asia/Kolkata). Protocol `72c74ad7` preceded implementation;
preparation/freeze `d3b854f4` reached GitHub before model questions. Candidate
`coverage-v41-order-collection`, paired frozen v40. Bundled Node 24.19.0,
darwin/arm64, Chrome 155.0.8059.85, actual local MiniLM q8 WASM; Qwen off.
Live 5.6/build r44 remains unchanged; this candidate is not integrated.

## Native results, separately scored

Cells show **PASS / PARTIAL / FAIL**. All contemporary variants have zero ERROR.

| Exposed pack | Actual r44 baseline | v41 fixed | v41 section | Paired v40 fixed / section |
| --- | --- | --- | --- | --- |
| Vela32 | 15 / 5 / 12 | **32 / 0 / 0** | **32 / 0 / 0** | 32 / 0 / 0 each |
| Prism32 | 13 / 5 / 14 | **32 / 0 / 0** | **32 / 0 / 0** | 32 / 0 / 0 each |
| Lumen32 | 13 / 4 / 15 | **32 / 0 / 0** | **32 / 0 / 0** | 32 / 0 / 0 each |
| Hearth32 | 16 / 5 / 11 | **32 / 0 / 0** | **32 / 0 / 0** | 31 / 0 / 1 each (H04) |

All four v41 native gates PASS. No historical/production/paired PASS loss, candidate
false acceptance/refusal or question retry. Each pack has 28 actual MiniLM Hybrid
questions (20 supported/eight required refusals) and four separate lexical
Comparisons. This is **128 distinct previously exposed cases**, 112 Hybrid / 16 lexical
Comparisons, not 256 independent cases or a general accuracy estimate. Native
criteria are unchanged; preserve all older public failures outside this subset.

## H04 repaired with separate actual facet evidence

Original question:

> A Veylan Seed Conservatory order is released exactly at 14:10. Which collection day is departure, and what hold can prevent it?

Both v41 variants cite one original literal span at 268–366:

> At or after 14:10, departure is the next collection day, unless a seed-health hold remains active.

The two exact freshly embedded planner queries and corresponding body cosines:

| Query | Actual cosine |
| --- | --- |
| `Veylan Seed Conservatory dispatch at 14:10. Which collection day is departure?` | 0.6887125718961535 |
| `Veylan Seed Conservatory dispatch at 14:10. what hold can prevent it?` | 0.4043336087365623 |

They share a literal citation while retaining separate query/score ledger entries.
The normalized query prefix follows the contract's existing dispatch-query format;
it is not a new source quotation. No calendar date or day-unit substitution is
inferred. Paired v40 remains unresolved with zero planner facets and an uncited
refusal; its first 31/0/1 FAIL and prior v32 BLOCKED/UNGRADED/v33 qualified H30 PARTIAL
remain unchanged. L04 and V23/V27 preservation controls remain successful.

## Capture, review and integrity

The [first native scorecards](evidence/v41-four-pack-mac/score/automated-scorecards.json)
retain every variant and historical preservation check. The
[assistant review/offline audit](evidence/v41-four-pack-mac/score/assistant-review.json)
changes no native grade. Review covered complete candidate outputs, original full
source context, all requested facets, exceptions, ambiguity and negative controls;
no contradiction or incomplete literal support requiring downgrade was found.
Fixed/section answers are identical per case, with original source-literal quotes.

[Comparison against first v40 outputs](evidence/v41-four-pack-mac/score/first-v40-output-comparison.json)
finds only H04's two variant answers/quotes changed; 254 other variant outputs
(127 distinct cases) remain identical. All 16 source-document texts are identical
to the earlier captures. This comparison is offline, not a candidate/model rerun.

The runner saved r44 UI outputs before experiments and checked instrumented
production source output against actual UI. Source/query and both planners' exact
facet vectors were captured before invocation, not replayed from old evidence.
The offline audit validates 112 whole-query, 13 v41 and 11 paired-v40 planner-facet
vectors, independently recomputes **7,536 body cosines**, and checks all **28**
returned facet-anchor entries. The run/score config hash matches the original
frozen file; the captured config JSON has the same parsed contents. No newline
normalization or historical rewriting occurred. No scorer was rerun.

The [SHA256 manifest](evidence/v41-four-pack-mac/manifest.json) seals **1,016 original
capture/score/review artifacts / 97,119,958 bytes**, excluding the manifest itself.
These include original actual vectors, per-case UI and candidate screenshots,
pre-candidate evidence, module proof, original freeze/config copies, checkpoints,
ledger and complete status. Question retries: **zero**. Prior v40 archives retain
all 1,021 sealed artifacts; prior v39 archives retain all 774. Original v32 blocked
archive and older scoring/history identities also pass their existing checks.

Engineering checks remain **667 unit tests PASS**, strict **28/28 Keyword PASS**,
clean read-only startup, syntax/diff/sensitive-information checks, and **500 frozen
files verified**. Engineering success is separate from actual-model results.
See [preparation](COVERAGE_V41_PREPARATION.md) and
[precommitted protocol](../eval/answer-completeness-v41/PROTOCOL.md).

## Next gates

The authorized v41 fix and four-pack revalidation are complete. Phase 1 remains
incomplete: **540 verified cases / 15 other packs await v41 testing** and **103
original cases plus the combined configuration remain unavailable**. Recommend
Morrow32 next, with a separate original-input freeze, native criteria and historical
preservation checks, then the other verified packs. Do not replace missing original
inputs with archived answers or silently waive the full regression gate.

This partial exposed PASS does not authorize phase 2 fresh confirmation, live
integration or 6.0 release. The bounded grammar may still refuse other supported
phrasing. Full regression and the missing-input decision, prospective confirmation,
integration and product/performance/device/release qualification remain open.
