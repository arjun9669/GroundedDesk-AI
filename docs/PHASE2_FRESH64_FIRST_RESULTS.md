# Phase 2 — first Fresh64 confirmation FAIL

Captured and reviewed: **24 October 2026 (Asia/Kolkata)**.
**Phase 2 is not accepted. Live 5.6/r44 is unchanged; v43 is not adopted.**

The first uninterrupted capture exercised all 64 prospective author-created cases:
40 supported Hybrid, 16 unsupported Hybrid and eight separate lexical Comparisons.
Actual local MiniLM q8 WASM processed the 56 Hybrid submissions; Qwen was off.
No question was retried, input/rubric changed or candidate tuned during the study.
The user subsequently authorized offline review, documentation and publication of
this first failure only, without candidate changes or model/question reruns.

## First native result and separate review

| Variant | PASS | PARTIAL | FAIL | ERROR |
| --- | ---: | ---: | ---: | ---: |
| v43 fixed | 52 | 4 | 8 | 0 |
| v43 section | 52 | 4 | 8 | 0 |
| Paired v42 fixed, diagnostic | 52 | 4 | 8 | 0 |
| Paired v42 section, diagnostic | 52 | 4 | 8 | 0 |
| Production baseline, diagnostic | 35 | 5 | 24 | 0 |

The frozen gate requires **64/64 PASS independently in each v43 variant**. Both
variants fail. They have identical displayed answers/quotes; paired v42 also has
the same saved answer/quote signatures. These diagnostics do not substitute for
acceptance or establish an improvement over v42.

| Case category | Cases | PASS | PARTIAL | FAIL, each v43 variant |
| --- | ---: | ---: | ---: | ---: |
| Supported Hybrid | 40 | 37 | 0 | 3 |
| Unsupported Hybrid | 16 | 11 | 0 | 5 |
| Lexical Comparison | 8 | 4 | 4 | 0 |

[Original native scorecard](evidence/phase2-fresh64-mac/score/native-scorecard.json)
remains byte-for-byte unchanged, including its first `manual_binding_review:
PENDING` checkpoint. The later [separate binding review](evidence/phase2-fresh64-mac/review/binding-review.json)
records review of all 128 variant rows against all original source paragraphs and
questions. It confirms the native outcomes without changing any grade. Four saved
candidate-panel screenshots were also visually inspected; screenshot inspection
was limited to those four panels. **Final confirmation decision: FAIL.**

Each variant has 59/59 source-literal quotations and 64/64 valid citation-numbering
records. Only 49/59 quotations meet the frozen requested-context/group relevance
criteria. Authentic quotes and valid numbering do not prove requested support.
Five unsupported non-refusals and two supported false refusals remain explicit.
For ambiguous questions, quoting a paragraph that says neither title is designated
is still a failure under the frozen uncited-refusal/clarification rule; this is
not a claim that the quoted dates were fabricated.

## The eight failed questions

Both variants retain the same outcome for every row.

| Case | Required evidence or boundary | First observed answer | Finding |
| --- | --- | --- | --- |
| FC10 | Kestwick lowest recorded winter temperature: minus 6 degrees Celsius | Uncited refusal | Supported false refusal |
| FC14 | Approvals at exactly 6200; source covers only above 6200 | Quotes above-6200 approval clause | Unsupported non-refusal; equality rule not supplied |
| FC28 | Who approves a Larchfen ticket order at 09:50; source supplies no approver | Quotes next-collection-day departure/hold | Departure information does not answer an approval-actor question |
| FC33 | Brindale loan receipts: 9 months plus unresolved missing-instrument exception | Quotes acknowledgement within four business days | Wrong policy/action; neither requested retention fact appears |
| FC34 | Publication of ambiguous “large work”; neither catalogue has that designation | Quotes two catalogue titles/dates and non-designation | Required ambiguity refusal/clarification missing |
| FC42 | Approvals at exactly 7900; source covers only above 7900 | Quotes above-7900 approval clause | Unsupported non-refusal; equality rule not supplied |
| FC44 | Westrill second restoration completed in 2003 | Uncited refusal | Supported false refusal |
| FC55 | Publication of ambiguous “large book”; neither book has that designation | Quotes two titles/dates and non-designation | Required ambiguity refusal/clarification missing |

## The four partial comparisons

Both source documents were selected, but one side displays an unrelated fact.
These remain native PARTIAL outcomes, not passing comparisons or rewritten FAILs.

| Case | Correct side | Missing or substituted side |
| --- | --- | --- |
| FC58 | Bellhaven relocation, 1909 | Kestwick warehouse move, 2013, replaced by purchase approval |
| FC59 | Larchfen next collection day and screening hold | Ardmere next operating day and inspection hold replaced by cold-sample temperature |
| FC61 | Brindale highest monthly mean, 25 degrees in August | Tarrow highest monthly mean, 26 degrees in June, replaced by winter average 12 degrees |
| FC63 | Westrill counter move, 1917 | Oakenford warehouse relocation, 1987, replaced by survey-record retention |

## What the saved diagnostics establish

The diagnostic evidence comes from the original captured JSON, not new probes.

- **FC10 and FC44:** saved body diagnostics already contain the supported source
  paragraph. Evidence-frame diagnostics nevertheless refuse with “No complete
  literal evidence for recognized request frame” and “No affirmative dated event
  relation”, respectively. This points to frame/binding recognition, rather than
  missing original source text. The exact repair still needs separate design.
- **FC14 and FC42:** relation diagnostics report unsupported actor slots/no bounded
  eligible relation, but retain the prior above-threshold quote. A high recorded
  cosine does not establish applicability at equality. A future design should
  validate threshold applicability before retaining a cited answer.
- **FC28:** the clock planner reports `outside_scope`, yet inherited selection
  retains a departure clause. A future design should preserve requested actor/action
  intent through fallback paths; broadening clock recognition alone is insufficient.
- **FC33:** inherited diagnostics retain the loan-acknowledgement paragraph. A
  future design should bind the requested record type and retention action, without
  replacing acknowledgement answers when those are actually requested.
- **FC34/FC55:** literal title/date paragraphs do not resolve the ambiguous referent.
  Future handling should require a unique supported subject or qualifying refusal.
- **FC58/59/61/63:** lexical Comparison selection supplies the wrong relation or
  statistic on one side. Future handling should verify each document's requested
  facts independently, including metric/month and event identity.

These are evidence-supported failure mechanisms and design targets, not proof of
a completed code fix or general model quality. No candidate rule was changed.

## Frozen environment, integrity and first evidence

Execution freeze commit **`7554249c3bd093fffc494bea50ae104687ce4c7d`** reached origin/main
before questions; the [publication receipt](evidence/phase2-fresh64-mac/publication.json)
records matching local/remote SHAs and a clean checkout before capture.
[Preparation CI passed](https://github.com/arjun9669/GroundedDesk-AI/actions/runs/40095976493).
The [execution plan](../eval/phase2-fresh64/EXECUTION_PLAN.md),
[509-file freeze](../eval/phase2-fresh64/freeze-manifest.json) and
[pre-question amendment](../eval/phase2-fresh64/ENVIRONMENT_AMENDMENT.md) preserve
Chrome **155.0.8059.86**, Node **24.22.1**, Playwright **1.62.1**, macOS arm64,
Transformers.js 3.0.0, MiniLM q8 WASM and Qwen off. The .85-to-.86 browser patch
change and Node reference change were declared before any fresh questions.
All six downloaded dependency identities matched the neutral preflight.

The original scorer's offline integrity audit passed: **5,402 recomputed body/facet
cosines**, source/vector correspondence and exact complete submission/capture order.
Raw capture: **506 artifacts / 50,094,299 bytes**. The [original 512-artifact seal](evidence/phase2-fresh64-mac/manifest.json)
includes first raw output, original scoring, receipts, screenshots, logs and the
publication receipt. Original score and [manual-review queue](evidence/phase2-fresh64-mac/score/manual-review-queue.json)
are preserved. Later review annotations have a separate seal; no original manifest
was extended or rewritten to include them.

Both neutral preflight failures and approved corrections also remain archived:
inspector body eviction was addressed with explicit buffers; the missing-ONNX
presence check was corrected to retain original request identity through the CDN
redirect. Neither attempt submitted Fresh64 inputs/questions. The subsequent
**777 unit tests and 28 strict Keyword preparation checks passed**; those passes
never override this actual-model confirmation failure. Publication validation is
recorded separately in current project status.

## Next work and retained holds

This publication records the failure; it does not authorize fixes or reruns.
Prioritize unsupported threshold/actor/referring-subject handling, then supported
frame/retention selection and per-document Comparison completeness. Any proposed
repair needs a separate reviewed design and scoped implementation, followed by
relevant synthetic checks and the accepted 668-case preservation study.

Fresh64 is now exposed. A later passing replay may verify a fix as regression;
it cannot replace this failed first confirmation. Phase 2 acceptance requires a
new prospective input pack/protocol after fixes, frozen before its first answers.
Phase 1 remains complete only under its [approved 668-case scope](PHASE1_REVISED_ACCEPTANCE.md).
The 103 missing originals and full 771-case historical gate remain untested/NOT RUN;
phase 1's five public-data case limitations remain open. This author-created,
text-only Mac study is not blinded external accuracy, Windows/Safari/PDF/Qwen
qualification, performance certification, live integration or a 6.0 release.
