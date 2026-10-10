# GroundedDesk AI 5.2 — Atlas manual PDF acceptance

**Test date:** 2026-10-10  
**Status:** **PASS — designated single-PDF manual smoke test**, with limitations  
**Feature:** 5.2 candidate release-control inventory  
**Implementation SHA:** `2a0958da412096fa1c15702d9606204e3ed4ea8e` (merged PR #15)  
**Document:** `01_Atlas_AI_Governance_Policy.pdf` (fictional, user-provided Atlas benchmark; not bundled with GitHub repository)  
**Method:** Tester ran 5.2 on the live GitHub Pages site using the uploaded text-based PDF and pasted the Markdown export. The review compared its quotes to the original benchmark PDF text after whitespace normalization. This is **not** an independently recorded browser session, semantic accuracy score, complete audit, or evidence that all requirements were found.

## User prompt and workflow

> What does the AI Governance Policy require before an AI system can be released?

Research workspace → **5.2 · Candidate release-control inventory** → select the Atlas PDF → **Build source-linked checklist** → **Copy Markdown report**.

## User-observed export summary

- **Export header:** `GroundedDesk AI 5.2 — candidate release-control inventory`.
- **Method:** Deterministic rule-matched source sentences (no LLM or semantic entailment).
- **Status:** Candidate controls found; human verification required.
- **Reported inspection:** **8 of 8** numbered sections; **7** containing rule-shaped candidate passages; **17** displayed quotes (cap **24**).
- **Reported evidence section IDs:** G-01, G-02, G-03, G-04, G-05, G-06, G-07.
- **Reported coverage caps:** **0** sections outside the 64-section scan cap; **0** candidate quotations omitted by the 24-item/per-section cap.
- **Reported instruction-shaped exclusion:** **1** inspected section withheld from checklist generation, corresponding to G-08's deliberately untrusted example.
- **Assessment:** All **17** displayed quotations align with the independently inspected PDF's corresponding clauses after normalization of line breaks and spacing; this is **literal provenance**, not evidence of correct interpretation.

## Acceptance checks

| Criterion | Observed evidence | Outcome |
| --- | --- | --- |
| Dedicated 5.2 workflow/export | Correct title, method and controls | PASS |
| Section detection | Eight numbered G-01 to G-08 clauses | PASS for this PDF |
| Previously missed privacy controls | G-03 quote(s) recovered | PASS |
| Previously missed rollback/escalation | G-06 quote(s) recovered | PASS |
| Central release evidence | G-01, G-02, G-04, G-05 supported quotes | PASS |
| Ongoing/related controls | G-07 surfaced separately | PASS |
| Provenance | All 17 source quotations match benchmark PDF text after whitespace normalization | PASS by manual review |
| Untrusted sample | G-08 not converted into candidate action; exclusion count 1 | PASS for this submitted output |
| Scope/coverage warnings | Rule-based category notice, 0 cap omissions, explicit non-compliance language | PASS |
| Broad generalization / semantic entailment | Not established by this smoke test | NOT TESTED |
| 15-question Atlas benchmark (direct, comparison, refusals) | Not executed/scored here | NOT TESTED |

### Material caveats

1. **Seven sections with candidate quotes is not 7/8 retrieval accuracy, recall or regulatory completeness.** G-08 is a deliberately hostile example that the workflow intentionally withheld.
2. The extracted list mixes pre-release gates, privacy restrictions, condition-triggered rollback obligations, and recurring/vendor reviews; categories are heuristic. One example is the vendor-review requirement under G-07, which applies **conditionally** when a proposed hosted model could receive document text.
3. Literal quotations do not establish that a user has **completed** any requirement or that cross-document policy conflicts have been resolved.
4. The original PDF itself is synthetic and contains invented thresholds and organizational roles. No benchmark claims for real policies, unseen PDFs, actual iPhone performance metrics, or LLM reasoning are made.
5. The browser test in PR #15 used a **synthetic text fixture in Chromium**. The pasted export is the separate manual original-PDF smoke test.

## Submitted evidence snapshot

This preserves the 17 source quotations and reported section/category labels (Markdown escaping simplified for readability), as supplied by the tester:

### [1] G-01 — Release ownership and approval

> G-01 Release authority Every AI release has a Model Owner, a Product Sponsor, and a named Security Officer.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-01. Rule-based category, not verified legal interpretation.*

### [2] G-01 — Release ownership and approval

> High-risk releases require written approval from both the AI Release Council and the Security Officer before deployment.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-01. Rule-based category, not verified legal interpretation.*

### [3] G-01 — Release ownership and approval

> The Product Sponsor cannot substitute for either approval.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-01. Rule-based category, not verified legal interpretation.*

### [4] G-02 — Required review evidence

> G-02 Required evidence package Before a release review, the Model Owner assembles a model card, a risk register, a test results log, a data-flow diagram, and a rollback plan.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-02. Rule-based category, not verified legal interpretation.*

### [5] G-02 — Privacy and security controls

> The Security Officer checks access controls and assesses whether sensitive records could leave the allowed processing boundary.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-02. Rule-based category, not verified legal interpretation.*

### [6] G-03 — Privacy and security controls

> G-03 Document privacy boundary Prototype testers may upload only public or explicitly permitted data.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-03. Rule-based category, not verified legal interpretation.*

### [7] G-03 — Privacy and security controls

> For this simulated policy, pilot teams must not use patient records, private bank statements, or employer-confidential files.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-03. Rule-based category, not verified legal interpretation.*

### [8] G-04 — Human evidence verification

> G-04 Citation and factual support A valid source citation must identify the correct document and contain a quotation that occurs in its source excerpt.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-04. Rule-based category, not verified legal interpretation.*

### [9] G-04 — Human evidence verification

> Human reviewers must confirm factual support before a claim enters a release report.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-04. Rule-based category, not verified legal interpretation.*

### [10] G-05 — Pre-release evaluation

> G-05 Pre-release evaluation gate The Model Owner runs a forty-question pilot: thirty supported questions and ten deliberately unsupported questions.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-05. Rule-based category, not verified legal interpretation.*

### [11] G-05 — Pre-release evaluation

> At least 95 percent of displayed citations must match the original source text.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-05. Rule-based category, not verified legal interpretation.*

### [12] G-05 — Pre-release evaluation

> The source-selection target is at least 90 percent on the supported questions, and the unsupported-question refusal target is at least 90 percent.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-05. Rule-based category, not verified legal interpretation.*

### [13] G-06 — Rollback and incident escalation

> G-06 Rollback and escalation If unsupported answers exceed 5 percent on a new fifty-question operational audit, the Model Owner pauses the rollout and starts a rollback review.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-06. Rule-based category, not verified legal interpretation.*

### [14] G-06 — Rollback and incident escalation

> Potential security incidents must be reported to the Incident Response Team within 60 minutes of discovery.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-06. Rule-based category, not verified legal interpretation.*

### [15] G-07 — Scheduled and vendor oversight

> G-07 Scheduled reviews The AI Release Council performs a quarterly governance review.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-07. Rule-based category, not verified legal interpretation.*

### [16] G-07 — Scheduled and vendor oversight

> A separate vendor review is required when a newly proposed hosted model could receive document text.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-07. Rule-based category, not verified legal interpretation.*

### [17] G-07 — Scheduled and vendor oversight

> Evaluations should include refusal tests, provenance tests, and reviewer-verified examples.

*Source: 01_Atlas_AI_Governance_Policy.pdf · G-07. Rule-based category, not verified legal interpretation.*

## Reported coverage and verification limits

> 0 numbered sections were not scanned due to the 64-section scan limit.  
> 0 candidate sentences were omitted by the 24-item output cap or per-section cap.  
> 1 inspected sections were withheld from checklist generation due to recognizable instruction-shaped text.

The report warns that regular expressions can miss obligations, misclassify conditions and quote exceptions without context. It is **not** a complete checklist, compliance determination, or evidence of tasks being done.

## Next evaluation gate

Execute and record the independent **15-question Atlas answer key** with the appropriate existing workflows. Record raw outputs and per-question outcomes for supported direct queries, two-document comparisons and deliberately unsupported questions. Do not invent a single global accuracy figure or force the 5.2 release-focused checklist to answer general or cross-document questions. Retain the original negative cases and compare the resulting benchmark against the human-curated answer key.

Related: [5.1 Phase 1 manual acceptance](VALIDATION_5_1_PHASE1.md), [evaluation protocol](EVALUATION_PROTOCOL.md), [5.2 implementation PR](https://github.com/arjun9669/GroundedDesk-AI/pull/15).
