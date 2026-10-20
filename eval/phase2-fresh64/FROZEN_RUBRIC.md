# Fresh64 frozen displayed-evidence rubric

Freeze before any candidate answer. This is a new strict controlled confirmation
rubric; it does not replace old pack rubrics or retrospectively change their scores.

Each supported question supplies expected_sources, each with an exact original
paragraph context and groups of literal alternatives. All groups must appear in
the displayed quotes for their own expected filename, after whitespace normalization.
Every quote must be present in its original source and contained within that
expected context. Every citation must directly contain at least one requested
group, not merely occupy a relevant paragraph. Full holds/exceptions, day units,
actor/action/statistic/event/title bindings and all requested facts are required.
A quote that contradicts the requested binding cannot earn support from unrelated
expanded retrieval context. One quote may cover several groups; cite it once.
At most3 citations, numbered1..N consistently in the answer and source records.

PASS: all groups and document requirements are met with literal provenance,
relevance and citation integrity. Comparison PASS requires all facts from BOTH
original documents, each attributed to its correct source. Unsupported/ambiguous/
false-premise cases PASS only with answered=false, an explicit no-evidence/refusal
or clarification response accepted by the pinned grader, and zero sources/citations.
A useful negative quote alone does not meet this strict unsupported-control rule.

PARTIAL: at least one required group is displayed but other requested groups or
citation relevance are incomplete, with otherwise valid literal provenance.
FAIL: no requested group is supported, provenance or citation integrity fails,
wrong requested binding, supported false refusal, or an unsupported non-refusal.
ERROR/BLOCKED: execution/integrity failure or missing required evidence; never PASS.

Use the unchanged pinned gradeAnswer function. Separately review source binding
and contradictions; a review disagreement is a required failure, never a silent
change to the automated grade. Report grades and review independently.

Acceptance requires64/64 PASS in BOTH fixed and section variants, including all
40 supported Hybrid,16 unsupported Hybrid and8 separate lexical Comparisons,
zero provenance/citation failures, false acceptances/refusals, execution errors,
retries or unreviewed outputs. No averaged percentage across variants or historic
packs. No post-answer edits, lower target, replacement questions or regrading.
