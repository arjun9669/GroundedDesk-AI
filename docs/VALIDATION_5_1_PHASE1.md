# GroundedDesk AI 5.1 Phase 1 — Atlas policy manual validation

**Date:** 2026-10-10  
**Result:** **PASS — one manually inspected, single-PDF test case only**  
**Feature:** 5.1 Phase 1, dedicated multi-section policy research  
**Retrieval/build identifier:** `2026-10-10-r13`  
**Implementation baseline:** `53add697802486c91249d9e8befc9f237e4b41d4` (PR #13 merge)  
**Source:** `01_Atlas_AI_Governance_Policy.pdf` (fictional Atlas benchmark policy provided separately; **not bundled with this repository**)  
**Observation:** A tester pasted the exported *5.1 research* Markdown report into the project review conversation. The passages were compared against the supplied benchmark PDF's source text. No automated mobile-browser instrumentation or independent end-to-end replay was performed.

## Test prompt

> What does the AI Governance Policy require before an AI system can be released?

**Procedure:** Load the Atlas PDF; open **Research workspace → 5.1 · Multi-section policy research**; select the Atlas PDF; paste the prompt; click **Gather evidence across sections**; copy the **Research results → Copy Markdown report** output. Do **not** use the ordinary Keyword Q&A export; it is a different workflow.

## Observed outcome and assessment

| Check | Observed | Assessment |
| --- | --- | --- |
| Correct workflow/export header | `GroundedDesk AI 5.1 — multi-section policy evidence` | PASS |
| Detected numbered policy sections | 8 (G-01 through G-08) | PASS for this PDF |
| Lexically matching sections | 5 of 8 | Recorded, not a recall metric |
| Quoted sections | G-01, G-02, G-04, G-05, G-07 | PASS for section-level retrieval and labeling |
| Quotation provenance | Passages match source text after whitespace normalization | PASS by manual text comparison |
| Bounded evidence | 5 results under limit of 8; 0 matching sections omitted by cap | PASS |
| Partial quote disclosure | G-05 is explicitly marked as an excerpt | PASS |
| Coverage limitations | Explicitly warns about missed sections and non-exhaustiveness | PASS |
| Comprehensive release-requirement synthesis | Not offered by this deterministic workflow | **NOT TESTED / NOT SUPPORTED** |
| Generalization to other PDFs or production compliance | Not tested by this sample | **NOT ESTABLISHED** |

**Observed gap:** The scan did not return G-03 (privacy boundary), G-06 (rollback/escalation), or G-08 (untrusted-text example). G-03 and G-06 may be relevant to broader governance/release questions even though lexical matching did not select them. Consequently, **5/8 is section count, not recall, accuracy, or completeness**. The answer is supported but not a definitive list of all release gates.

**Verdict:** Mark the *single-PDF Atlas Phase 1 smoke test* as passed. It verifies that this exported report enumerated multiple numbered sections with source-matching excerpts and clear limits. It does not validate factual synthesis, exhaustive recall, arbitrary documents, iPhone cross-browser compatibility, prompt-injection immunity, or operational deployment readiness.

## Exported report snapshot (tester submission)

The snapshot below preserves the substantive Markdown exported by the tester, with Markdown punctuation/filename escaping normalized for legibility. It is **observed test output**, not generated anew by this validation record.

~~~markdown
# GroundedDesk AI 5.1 — multi-section policy evidence

**Method:** Local deterministic scan of numbered policy sections (no LLM).
**Question:** What does the AI Governance Policy require before an AI system can be released?
**Document:** 01_Atlas_AI_Governance_Policy.pdf
**Scope:** 5 quoted sections from 5 lexically matched of 8 detected sections (maximum 8).

## Section-by-section evidence

### [1] G-01 — 01_Atlas_AI_Governance_Policy.pdf

> G-01 Release authority Every AI release has a Model Owner, a Product Sponsor, and a named Security Officer. High-risk releases require written approval from both the AI Release Council and the Security Officer before deployment. The Product Sponsor cannot substitute for either approval.

### [2] G-02 — 01_Atlas_AI_Governance_Policy.pdf

> G-02 Required evidence package Before a release review, the Model Owner assembles a model card, a risk register, a test results log, a data-flow diagram, and a rollback plan. The Security Officer checks access controls and assesses whether sensitive records could leave the allowed processing boundary.

### [3] G-04 — 01_Atlas_AI_Governance_Policy.pdf

> G-04 Citation and factual support A valid source citation must identify the correct document and contain a quotation that occurs in its source excerpt. Source-number validation is a structural check only; it does not prove that an AI-generated sentence is factually supported. Human reviewers must confirm factual support before a claim enters a release report.

### [4] G-05 — 01_Atlas_AI_Governance_Policy.pdf

> G-05 Pre-release evaluation gate The Model Owner runs a forty-question pilot: thirty supported questions and ten deliberately unsupported questions. At least 95 percent of displayed citations must match the original source text. The source-selection target is at least 90 percent on the supported questions, and the unsupported-question refusal target is at least 90 percent.

*Excerpt only; review the full section for additional conditions.*

### [5] G-07 — 01_Atlas_AI_Governance_Policy.pdf

> G-07 Scheduled reviews The AI Release Council performs a quarterly governance review. A separate vendor review is required when a newly proposed hosted model could receive document text. Evaluations should include refusal tests, provenance tests, and reviewer-verified examples.

## Coverage and limitations

No additional keyword-matching numbered sections were omitted by the evidence cap.
Other sections can contain relevant facts that keyword overlap missed. This is not an exhaustive policy summary or compliance determination.

---

*All quotations are exact substrings of the loaded document after whitespace normalization. Read the complete source before making decisions.*
~~~

## Follow-up tests before expanding the milestone

1. Re-run the same 5.1 prompt against the actual PDF after future changes and compare section IDs and quote provenance.
2. Check the 15-question Atlas benchmark separately, including comparisons and deliberate refusals. Do not report a pass rate until those questions have been executed and evaluated.
3. Add tests for semantically related sections that lack keyword overlap, unnumbered section headings, and PDF extraction artifacts.
4. Keep ordinary Keyword Q&A behavior isolated from 5.1; retain its own regression suite and user workflow.

**Related:** [Implementation PR #13](https://github.com/arjun9669/GroundedDesk-AI/pull/13) · [Evaluation methodology](EVALUATION_PROTOCOL.md).
