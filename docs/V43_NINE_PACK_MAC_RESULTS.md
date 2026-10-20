# First Mac v43 nine-pack exposed regression — PASS

Date: 2026-10-20 (Asia/Kolkata). Protocol `c88c6fbc` preceded code; 609-file freeze
`89c23ef9` and approved raw-log policy `b8f6281b` reached GitHub before questions.
Candidate `coverage-v43-deferred-clock-forms`, paired frozen v42. Node 24.19.0
darwin/arm64, Chrome 155.0.8059.85, actual local MiniLM q8 WASM, Qwen off.
Live GroundedDesk 5.6/r44 remains unchanged.

## Separate original native gates

Cells show PASS / PARTIAL / FAIL; every contemporary variant has zero ERROR.

| Exposed family | Actual r44 baseline | v43 fixed | v43 section | Paired v42 fixed / section |
| --- | --- | --- | --- | --- |
| Vela32 | 15 / 5 / 12 | **32 / 0 / 0** | **32 / 0 / 0** | 32 / 0 / 0 each |
| Prism32 | 13 / 5 / 14 | **32 / 0 / 0** | **32 / 0 / 0** | 32 / 0 / 0 each |
| Lumen32 | 13 / 4 / 15 | **32 / 0 / 0** | **32 / 0 / 0** | 32 / 0 / 0 each |
| Hearth32 | 16 / 5 / 11 | **32 / 0 / 0** | **32 / 0 / 0** | 32 / 0 / 0 each |
| Morrow32 | 17 / 4 / 11 | **32 / 0 / 0** | **32 / 0 / 0** | 32 / 0 / 0 each |
| Cedar32 | 15 / 4 / 13 | **32 / 0 / 0** | **32 / 0 / 0** | 31 / 0 / 1 each |
| Bracken32 | 15 / 1 / 16 | **32 / 0 / 0** | **32 / 0 / 0** | 31 / 0 / 1 each |
| Flint32 | 16 / 5 / 11 | **32 / 0 / 0** | **32 / 0 / 0** | 31 / 0 / 1 each |
| RetrievalQuality28 | 16 / 7 / 5 | **28 / 0 / 0** | **28 / 0 / 0** | 27 / 0 / 1 each |

All nine native gates PASS with no historical/production/paired PASS loss, candidate
false acceptance/refusal, execution error or question retry. This is 284 distinct
previously exposed cases: 252 actual MiniLM Hybrid plus 32 separate lexical
Comparisons. Two variants are not 568 independent cases; rubrics are not pooled.

Cedar/Bracken use their unchanged original group/provenance rubric without the
later citation-number amendment. Flint and the prior five families retain their
native citation integrity. RetrievalQuality28 invokes its unchanged exact-evidence
grader. Native automated grades and separate assistant review remain distinct.

## Four previously deferred forms restored

Both variants quote the full applicable original sentence, using unique scope and
independently measured body evidence. The three compound answers retain both
separately embedded departure/hold queries, even when sharing one citation.

| Case | Source identity | Literal span in normalized source | Support |
| --- | --- | --- | --- |
| RQ02 | Orchard Current Dispatch Guide; archived guide excluded | 224–290 | After14:20 means next operating day |
| C09 | Unique applicable Harbor Cartography order policy | 406–512 | Inclusive14:20, next operating day and full customs-hold exception |
| B14 | Unique Rossell prefix → Rossell Seed Library | 339–439 | Inclusive11:45, next working day and seed inspection hold still active |
| F14 | Sable Travelling Books | 346–457 | Inclusive14:20, following service day and road-closure hold in effect |

Paired v42 refuses these four supported questions in both variants. V43 restores
answers already achieved by v38 under its earlier approach; this is structured
contract preservation/recovery, not a new highest-quality or independent-accuracy
claim. B14 facet cosines are 0.588924/0.340207; they are measured corresponding
scores, not confidence guarantees or a newly tuned semantic threshold. Single-
facet RQ02 displays its whole-query anchor, as specified by the frozen contract.

## Review, vector audit and historical preservation

- All 36 original source texts match; original bytes/CRLF remain untouched. Body
  offsets are checked against the unchanged buildIndex CRLF/space-normalized
  sourceText, not Python text-mode newline conversion.
- All 568 candidate variant answer/quote signatures match prior first-v42 (five
  packs) or v38 (four packs) native cards after whitespace normalization.
- Only RQ02,C09,B14,F14 change versus paired v42: eight variant outputs change;
  the other 560 remain equal. Quotes, full requested facets, source context and
  native relevance/provenance were reviewed without changing grades.
- Offline audit validates 1,421 recorded source vectors, 252 whole-query vectors,
  22 v43/15 paired-v42 facet vectors (all finite 384D), recomputes 19,934 body
  cosines and checks 54 displayed facet anchors. No model/answer/scorer rerun.
- All 4,337 selected earlier v42/v41/v40/v39 artifact hashes remain intact, as do
  original inputs/rubrics/first failures and their unchanged native history cards.

[Evidence seal](evidence/v43-nine-pack-mac/manifest.json): **2,254 artifacts / 242,067,069 bytes**.
[Native cards](evidence/v43-nine-pack-mac/score/automated-scorecards.json),
[offline audit](evidence/v43-nine-pack-mac/score/assistant-review.json),
[review notes](evidence/v43-nine-pack-mac/score/review-notes.json),
[output comparison](evidence/v43-nine-pack-mac/score/output-comparison.json),
[prior seals](evidence/v43-nine-pack-mac/score/prior-evidence-integrity.json).

## RetrievalQuality28 metrics retain their native meaning

Fixed exact required-sentence recall@1/3/5:26/34,31/34,32/34; top1 relevant 18/24.
Section:27/34,33/34,34/34; top1 relevant 19/24. These are separately reported native
retrieval metrics, not an answer accuracy aggregate or a claim of wrapper-driven
chunking promotion. Candidate code/parameters/rubrics stayed frozen after capture.

## Engineering history and remaining gates

764/764 dependency-free units, strict 28/28 bundled Keyword,609-file/input/history
checks and read-only startup pass. Preparation CI and the approved-exception CI
have completed successfully. Results-publication CI/deployment must be checked
separately after push; GitHub receipt alone does not establish their completion.

The initial 763-test engineering run remains 762 PASS/1 FAIL (review-note equality).
After explicit approval, validation excludes only the documented review annotation
and rejects every native grade/answer/quote change;764 tests pass. Its first raw
log remains verbatim. A later whitespace check found trailing blanks at 780/2066;
the preparation command incorrectly continued to publish. This workflow error
remains documented. The approved exact-file trailing-blank exception changes no
log bytes, candidate code, native rubric or model gate. No question retry occurred.

Phase1 remains open: 384 verified cases across 10 other families have not been
tested with v43: Cobalt16,ExternalSQuAD24,FreshMixed32,FreshConfirmation32,
V9Exposed32,Actor40,Scope48,Confirmation48,Precision48,Binding64. 103 originals
across four other packs and the combined configuration remain unavailable.

Next freeze the remaining regression scope with each original rubric, then
resolve missing inputs or obtain explicit approval for a revised acceptance
protocol. Prospective confirmation, integration, product qualification and release
are still open. No live upgrade, full771-case gate or fresh-confirmation claim.
