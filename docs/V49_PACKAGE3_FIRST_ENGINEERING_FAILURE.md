# V49 package3 — first engineering failure

Date: **25 October2026 (Asia/Kolkata)**. Baseline: `c4e187ac`.
Status: **STOPPED; correction and retry awaiting user approval**.

A new isolated v49 implementation and pre-test protocol were prepared under the
user’s package3 authorization. The first targeted run returned **30 tests,24 PASS,
6 FAIL**, exit1. No edits to the attempted candidate, protocol or tests followed
that failure. No broader unit, Keyword, model, browser, frozen-question, scorer
or saved-vector candidate runs followed. Nothing was committed or pushed.

[Exact first log](evidence/v49-package3-first-engineering-failure/first-targeted.log),
[failure details](evidence/v49-package3-first-engineering-failure/failure.json) and
[byte manifest](evidence/v49-package3-first-engineering-failure/manifest.json) preserve
the first attempt, including complete candidate/protocol/test snapshots.

## Static diagnosis and proposed correction

Four positive event groups fail: independent objects/aliases, question-side order,
unique entity aliases and normalized offsets. Static inspection identifies a
greedy object boundary in passive sources: warehouse was moved can parse object
as warehouse was and verb as moved. Prefer the full passive production and add
explicit auxiliary/object boundary controls. This diagnosis is not yet verified
by a permitted rerun.

One negative cutoff group accidentally retains its positive source: its removal
looks for remains active while the source says is still active. Remove the actual
literal hold and explicitly assert a changed/missing-hold fixture. Keep refusal
requirements for exclusive cutoffs, missing holds, wrong types and qualifications.

The last group expects uncited incomplete evidence for an oversized query, while
unchanged compareDocuments throws Comparison topic exceeds600 characters. Preserve
that existing public size rejection, explicitly clarify it in the new protocol
and assert the error separately from oversized quotation refusal. No truncation
or relaxation of either bound is proposed.

The standing repository/user workflow requires approval before corrections or
retries after a required test failure. After approval: retain this attempt unchanged,
apply only the reviewed corrections/new guards, rerun targeted engineering and,
only if passing, full units/strict Keyword, review and commit/push.

Production5.6/r44, v48/v47 and every earlier candidate/evidence file remain intact.
This failed synthetic check is not an actual-model result. V46 native FAIL, Cobalt
BLOCKED,103 exclusions/full771 NOT RUN and phase2/integration HOLD are unchanged.
