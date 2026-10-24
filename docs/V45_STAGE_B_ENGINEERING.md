# V45 Stage B — supported relation engineering

Date: **24 October 2026 (Asia/Kolkata)**.
Candidate: **`coverage-v45-supported-relations`**.
Status: **Engineering PASS after approved scope correction; model revalidation NOT RUN.**

The [new wrapper](../eval/answer-completeness-v45/coverage.mjs) imports unchanged v44.
Its [relation contract](../eval/answer-completeness-v45/relation-contract.mjs) implements
only Stage B of the [published design](FRESH64_REPAIR_DESIGN.md). The
[protocol](../eval/answer-completeness-v45/PROTOCOL.md) specifies owned/source grammar,
limitations, first failure and later verification boundary. No historical module
or application import changed.

## Implemented behavior

| Area | Supported relation | Refusal/preservation boundary |
| --- | --- | --- |
| Minimum temperature | Each explicit minimum label binds its own signed value/unit and winter scope | No average/daily-high substitution; specific absolute/recorded labels remain distinct; missing/conflicting/qualified quantities refuse |
| Retention | Normalize the same exact entity prefix on question/source subjects, select the same record type and preserve duration plus full stated exception | No acknowledgement substitute, foreign filename fallback, missing requested exception or conflicting policy |
| Ordinal events | Split explicit coordinated ordinal/date clauses as contiguous original spans; match event, ordinal and scoped entity | No first/second date swap, unrelated event/object, negated completion or cross-paragraph/ambiguous pronoun inheritance |

A retained subclause keeps the containing body's original cosine and anchor; no new
clause embedding or score is invented. Literal offsets, unique source spans,
finite metadata, current bounds and sequential citation numbers remain required.
Stage A/clock ownership and exact Comparison/helper exports are unchanged. Other
metrics, nonordinal event questions and existing compound assembly delegate to v44.

## First failure and approved correction

The first targeted run recorded **22 PASS / 1 FAIL out of 23**. The failing test,
`retention document selection does not cross filenames or guess an unscoped library`,
expected `answered=false` but received `true` at `tests/coverage-v45.test.mjs:71:2`.
The sole-document fallback accepted an explicit named subject with no matching
filename, because the same foreign prefix remained in both question/source strings.
[Original failure record, log and source snapshots](evidence/v45-stage-b-first-engineering-failure/failure-record.json)
preserve that attempt. Work stopped before fixes/retries/publication.

The user explicitly approved: “Approved—fix the scope guard and rerun engineering
checks”. The correction restricts the fallback to a small declared record-type
grammar rather than a capitalization test. A named filename match still supports
arbitrary explicit record types; a genuinely unprefixed declared type still works
in a single document. An unscoped multi-file library or unrecognized named prefix
refuses. The original failing assertion and entire original test file remain an
unchanged byte prefix; three new regression tests were appended.

This grammar is intentionally conservative. Unlisted unprefixed record types refuse,
and a phrase identical to a declared generic type is interpreted as that type;
this is not arbitrary named-entity understanding. Local pronoun/coreference and
source-form handling are similarly bounded. Model preservation remains unverified.

## Engineering verification

- **26/26 targeted synthetic tests PASS** after the approved guard correction.
- **824/824 full unit tests PASS**, including the 26 new Stage B tests.
- **28/28 strict bundled Keyword checks PASS**, zero false accept/provenance errors.
- New module syntax, documentation links, original input/code/environment and raw/
  result/review seals, first-attempt snapshot hashes and credential review verified.
- `git diff --check` uses one exact archived-log whitespace exception: the original
  Node failure log has two indentation-only blank lines, retained byte-for-byte.
  Source/test whitespace rules and the failing assertion are unchanged.

[Approved engineering evidence](evidence/v45-stage-b-approved-engineering/manifest.json)
seals separate targeted/full-unit/Keyword passing logs alongside original first
failure references and the resulting implementation/test/protocol/report bytes.
Fixtures are synthetic; their finite cosine metadata does not prove MiniLM inference.
No browser/model study was run, and no frozen question, vector replay or Fresh64
scorer was invoked. Live app/UI code is unchanged; browser/model qualification
belongs to the future separately frozen study.

## Remaining work

Stage C per-document lexical Comparison completeness is not implemented. After
agreeing that scope, actual accepted-668 plus exposed-Fresh64 preservation needs
a new published execution freeze, paired-candidate diagnostics, original native
rubrics and separate manual review. A successful exposed replay cannot replace
[Fresh64's first failed confirmation](PHASE2_FRESH64_FIRST_RESULTS.md).

There is no v45 model score or claim that a specific Fresh64 case is repaired.
Phase 1 remains accepted only for 668 verified cases, 103 originals remain untested,
phase 2 remains unaccepted and live GroundedDesk stays 5.6/r44.
