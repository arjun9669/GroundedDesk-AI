# GroundedDesk AI 5.3.3 (r18) — Hybrid D02 precision fix

**Observed baseline:** The actual Chrome r17 [Atlas 15 retest](ATLAS15_R17_CHROME_HYBRID_RETEST.md) reported **15/15 answer-completeness passes**, **18/18 source-literal quotes**, and **14/15 cases with entirely relevant source quotations**. D02 alone had two authentic but irrelevant extra citations.

## D02 reproducer

**Question:** What must be included in the pre-release evidence package?

**Correct primary quote** (Governance G-02):

> G-02 Required evidence package Before a release review, the Model Owner assembles a model card, a risk register, a test results log, a data-flow diagram, and a rollback plan.

**Unneeded extra quotes in r17:**

> The Model Owner verifies whether source citations or draft answers must be withdrawn.

> The procuring team must record human validation examples before approving sensitive use cases.

Those second and third quotes are genuinely from Runbook and Vendor. Their literal provenance does not make them relevant to the question.

## Diagnosis and patch

`answerFromCandidates()` in r17 scored the correct G-02 answer at approximately **3.6** due to its matching material query terms. The secondary-citation pruning gate ran only if the leading sentence scored **4 or above**. As a result, two weak additional quotes survived despite having insufficient matching concepts.

The r18 code uses the earlier threshold unchanged for Keyword mode, and permits Hybrid pruning with a **moderate leading score (>=3) AND at least two material query terms matched in the displayed leading quote**. It then retains a secondary quote only if it meets the existing proportional sentence-score and query-coverage requirements. It is still a heuristic. It does not verify factual entailment or establish that one citation always suffices.

## Code-level checks

`tests/hybrid-d02-citation-precision.test.mjs` reproduces D02 with the three quoted synthetic source passages and **mock vectors** (no actual MiniLM), and includes controls for explicit multi-document intent and semantic-only paraphrase queries. The previous Atlas 15 Keyword/Comparison regressions and Hybrid refusal/evidence-selection tests must remain green.

**Do not count these automated tests as a new MiniLM benchmark.**

## Required real-browser acceptance

Using the same original three fictional Atlas PDFs, real Chrome/on-device MiniLM, Qwen disabled, and loaded retrieval build `2026-10-10-r18`:

1. Ask the exact D02 question in Hybrid Q&A. The correct Governance five-piece package must appear, without either Runbook or Vendor irrelevant quotation.
2. Repeat the **unchanged** D01–D08 and N13–N15 Hybrid Q&A, and separate C09–C12 lexical Comparison. Verify the answer content, correct document and literal source evidence.
3. Confirm all three unsupported N13–N15 questions still refuse without citations.
4. Report **answer completeness** and **all-citation relevance** separately. Preserve historic r16/r17 scores unchanged, and record regressions, partials, or unexpected citations if they occur.
5. Follow with **new non-sensitive, independently labeled PDFs**: original Atlas cases were already used to tune development, so they cannot establish generalizable MiniLM answer accuracy.

**Status (2026-10-11): Original Atlas Chrome MiniLM acceptance PASS.** The [actual r18 browser test](ATLAS15_R18_CHROME_HYBRID_ACCEPTANCE.md) reports 15/15 complete and source-relevant cases, including a single correct D02 Governance citation; all 16 displayed quotations matched their original PDF text. The frozen **independent Meridian 24 remains NOT RUN**. This is not an independent production accuracy estimate.
