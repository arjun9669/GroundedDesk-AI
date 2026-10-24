# GroundedDesk AI — project status

Last updated: **2026-10-24 (Asia/Kolkata)**.

This is the current development handoff. Preserve historical results in their
original reports; link them here instead of rewriting or rescoring them.

## Baseline and working branch

| Item | Current state |
| --- | --- |
| Repository | https://github.com/arjun9669/GroundedDesk-AI |
| Official Mac checkout | `/Users/arjunkumar/Projects/GroundedDesk-AI` |
| Shared development branch | `main` required on both machines; Mac tracks `origin/main` |
| Reviewed upstream baseline | `2c6457c636d636ec56b3c4d1f49a35e66d5aab44` |
| Design review baseline | `b0d4224`; review published as `bb6a8ce`; v39 protocol precommitted as `c73a8fe` |
| Live application | GroundedDesk 5.6, retrieval build `2026-10-13-r44` |
| Latest isolated candidate | v45 Stage B engineering only; 824 unit/28 Keyword PASS after approved scope fix; no actual-model run/adoption. Latest model result remains v43 Fresh64 FAIL |
| Release decision | Integration **HOLD**: first Fresh64 confirmation FAIL; quality/device/release gates remain open |
| Current change | Phase 1 COMPLETE under approved 668-case scope; phase 2 first Fresh64 confirmation FAIL: 52 PASS / 4 PARTIAL / 8 FAIL in both variants |

## V45 Stage B approved correction — engineering PASS, 2026-10-24

[Engineering report](docs/V45_STAGE_B_ENGINEERING.md) and
[protocol](eval/answer-completeness-v45/PROTOCOL.md) record isolated minimum-label,
retention-subject and coordinated ordinal-event binding. V44 and all historical
modules, Stage A/clock ownership and exact Comparison/helper exports are unchanged.
The user explicitly approved fixing the retention-scope guard after the first
22/1 failure. A sole-file fallback now requires a declared generic record-type
phrase; unknown entity prefixes cannot use that fallback simply by changing case.
Matching named scopes and genuinely unprefixed declared types remain supported.
This is a bounded grammar, not general named-entity understanding.

The original failed assertion/test bytes and draft source/log snapshots remain
preserved. Only the guard and three appended regression tests differ from the
failed engineering draft. **26/26 targeted, 824/824 full unit and 28/28 strict
Keyword checks PASS**. Separate approved logs and implementation/report bytes are
sealed in [engineering evidence](docs/evidence/v45-stage-b-approved-engineering/manifest.json).
The exact original Node failure log retains two indentation-only blank lines with
a single-path `whitespace=-blank-at-eol` attribute; code/test checks are unchanged.
New syntax, documentation links, original evidence/code/input/environment seals,
first-attempt hashes, credential review and `git diff --check` verified.

No model, Fresh64 candidate/planner/scorer call or saved-vector replay occurred.
No 668-case model preservation was run on v45; Stage C is unimplemented. The first
v43 Fresh64 52/4/8 failure remains FAIL; v45 has no measured quality score. Phase 1
revised scope, the missing 103 originals, phase 2 hold and live 5.6/r44 are unchanged.

## V45 Stage B draft — first engineering test FAIL, 2026-10-24

The user approved Stage B implementation in a new isolated v45 draft. The first
23-test targeted synthetic run records **22 PASS / 1 FAIL**. Failure:
`retention document selection does not cross filenames or guess an unscoped library`,
`tests/coverage-v45.test.mjs:71:2`; expected `answered=false`, actual `true`.
The single-document fallback incorrectly accepts a named retention request without
a matching filename identity. Question/source subjects retain the same unmatched
entity prefix and compare equal. This is a scope-guard defect, not a model result.

[First failure record](docs/evidence/v45-stage-b-first-engineering-failure/failure-record.json)
preserves exact original log, draft sources and SHA256s. Work stopped before any
fix, retry, full-suite/Keyword check, commit or push. No model, Fresh64, saved-vector
replay or scorer run occurred; live r44, v44 and all frozen evidence remain unchanged.
Latest published commit remains `d892952c`. Approval is needed to distinguish named
requests from genuinely unprefixed record types, enforce named filename scope and
rerun engineering checks without weakening the failed assertion.

## V44 Stage A implemented — 2026-10-24, engineering only

[Engineering report](docs/V44_STAGE_A_ENGINEERING.md) and
[bounded protocol](eval/answer-completeness-v44/PROTOCOL.md) record the approved
isolated Stage A implementation: purchase-range/unit/role applicability, bare
matching ticket-order approval actors and unique publication descriptors. Owned
unsupported/ambiguous requests refuse without a prior-answer fallback; supported
quotes retain exact literal identity and original containing cosine anchors.
Existing v43 clock ownership and Comparison/helper exports stay unchanged.

**798/798 unit tests PASS**, including 21 new synthetic controls; **28/28 strict
Keyword PASS**. No real model or saved-vector replay occurred. No candidate,
planner or scorer ran on Fresh64, and no actual 668-case preservation study ran
on v44. Stage
B/C are not implemented. V43 modules, live r44, original sources/keys/rubrics,
first failures and all prior evidence remain unchanged. The first Fresh64 v43
52/4/8 failure stays FAIL; there is no v44 quality score or phase 2 acceptance.
Verification also covers new syntax, links, credential review, `git diff --check`
and original code/input/environment/raw/result/review hashes. Later model testing
requires a new pre-published execution freeze and separate scope.

## Fresh64 repair design — 2026-10-24, no implementation

[Design F64-REPAIR-20261024](docs/FRESH64_REPAIR_DESIGN.md) traces the first failures
to current request ownership/fallback, asymmetric retention-subject normalization,
unrecognized recorded-minimum labels, coordinated ordinal-event parsing and missing
Comparison relation checks. Proposed isolated successor: Stage A unsupported
approval/actor/referent contracts, then Stage B supported statistic/retention/event
binding and Stage C per-document lexical Comparison completeness. It defines
positive/negative controls, evidence invariants and later frozen 668+64 exposed
regression/new prospective confirmation gates. No candidate/runtime/test code,
input or historical evidence changed. No Fresh64 candidate/planner/model/scorer
execution occurred; verification uses the existing synthetic unit suite only.
Implementation and model revalidation are not started;
phase 2 remains FAIL and integration HOLD. Verification: 777/777 unit tests PASS;
design/README/roadmap links resolve; original raw/results/review seals and execution/
input/environment freezes unchanged; credential review and `git diff --check` PASS.

## Phase 2 first Fresh64 result — FAIL, 2026-10-24

Execution freeze commit `7554249c3bd093fffc494bea50ae104687ce4c7d` was pushed and
origin/main receipt verified before questions. The Chrome .86 amendment and all
509 frozen files verified. One uninterrupted first capture completed all 64 cases:
56 actual MiniLM Hybrid submissions and eight lexical Comparisons; no retries.
The unchanged native scorer records **52 PASS / 4 PARTIAL / 8 FAIL in BOTH v43
fixed and section variants**. The strict 64/64-per-variant gate is **FAIL**.
Baseline: 35/5/24; paired v42: 52/4/8 separately in each variant. No ERROR outcomes.

The offline integrity audit PASS includes 5,402 recomputed body/facet cosines,
original source identity and complete submission/case order. Raw first capture:
506 artifacts / 50,094,299 bytes. [First native score](docs/evidence/phase2-fresh64-mac/score/native-scorecard.json)
and [512-artifact seal](docs/evidence/phase2-fresh64-mac/manifest.json) preserve
original UI/candidate outputs, source/query/planner vectors, screenshots and logs.
The user approved offline review, documentation and publication only. The separate
[binding review](docs/evidence/phase2-fresh64-mac/review/binding-review.json) is complete
for all 128 variant rows and confirms all native outcomes; the first scorecard
retains its original PENDING annotation. No native grade or original seal is changed.
Fresh64 is now exposed for any future regression, not a
reusable unseen first confirmation. Phase 2 is not accepted; integration stays HOLD.

[Failure report](docs/PHASE2_FRESH64_FIRST_RESULTS.md) documents five unsupported
non-refusals (FC14/28/34/42/55), two supported false refusals (FC10/44), an unrelated
retention answer (FC33) and four partial comparisons (FC58/59/61/63). Both variants
have 59/59 literal citations, 49/59 frozen-group-relevant citations and valid
numbering in all 64 cases. The separate manual review finds no grade disagreement.
No candidate/model/scorer was invoked again during review. The publication has
explicit approval; candidate fixes, regression replays and a new prospective study
require separate scope. Fresh64 cannot retrospectively become a passing first run.
Live r44, v43, all frozen sources/questions/rubric and prior evidence are unchanged.
Publication verification: **777/777 unit tests PASS**, original 512/506 artifact
seals and 509-file execution freeze unchanged, complete 128-row review alignment,
document links and `git diff --check` verified. Credential review found no tokens
or signed URL queries. No model/question/scoring rerun occurred. The earlier
28 strict Keyword preparation passes remain distinct from this quality failure.

## Phase 2 execution prepared — 2026-10-24, before fresh questions

The user approved diagnosis/correction of the missing ONNX identity. The neutral
network diagnostic proved the request redirects to a content-addressed CDN URL
without an `.onnx` extension. Actual bytes were hashed, but final-URL-only presence
recognition was wrong. The recorder now keeps original/redirect request paths,
nonempty byte counts and SHA256; missing/changed bytes, inconsistent duplicates,
missing ONNX and missing WASM still fail. Query parameters are not published.
Both failed attempts and their original source hashes remain preserved.

[Successful neutral preflight](docs/evidence/phase2-fresh64-preflight-redirect-fixed/result.json)
verifies six downloaded assets, including the 22,972,370-byte ONNX and 21,649,119-byte
WASM. No fresh input/question/candidate probe occurred. **777/777 unit tests and
28/28 strict Keyword checks PASS**. New negative controls cover evicted responses,
redirect recognition, tampering/missing bytes, file escapes/duplicates and forged
cosines/source identity. New runner/scorer and independent audit are frozen with
509 files in [execution freeze](eval/phase2-fresh64/freeze-manifest.json).

Actual frozen environment is Chrome **155.0.8059.86**, Node **24.22.1**, Playwright
**1.62.1**, macOS arm64, MiniLM q8 WASM, Qwen off, r44. The reference Chrome .85
changed before the successful preflight; the explicit
[pre-question amendment](eval/phase2-fresh64/ENVIRONMENT_AMENDMENT.md) records .86
without rewriting earlier records. Node/Chrome binaries and Playwright/core trees
are hashed. Publish/verify this setup before one capture of all 64 fresh cases.
**Fresh64 model capture/scoring NOT RUN at this checkpoint**; live/candidate code,
original inputs/rubric and historical evidence unchanged. Native and separate
manual binding review must both pass before any phase 2 completion claim.

## Phase 2 execution preparation — approved retry failed, 2026-10-24

The user approved correcting dependency-byte capture while retaining the first
failure and all hash requirements. The recorder now reserves explicit Chrome CDP
response-body buffers before requests. The next neutral preflight no longer
reported the two body-eviction errors, but failed the required ONNX asset-presence
assertion: no ONNX response identity was recorded. The cause remains unconfirmed;
no asset hash was fabricated or omitted to pass the check. [Retry log and record](docs/evidence/phase2-fresh64-preparation-approved/failure-record.json)
preserve the exact failed output and attempted source snapshots. Original first
failure bytes and draft source snapshots are also preserved. Fresh documents and
questions remain unsubmitted; v43/live r44 and frozen inputs are unchanged. New
scorer/audit/unit drafts have not run. No execution freeze, commit or push exists.
Work stopped pending approval for diagnosis/correction and another neutral retry.

## Phase 2 execution preparation — first preflight failed, 2026-10-24

New draft capture/integrity/dependency-identity files are local and unpublished.
The first neutral startup/model preflight failed because Chrome evicted two
response bodies from its inspector cache before `response.body()` could hash them.
The recorder required an empty error list and correctly rejected incomplete asset
identity evidence. [First failure record](docs/evidence/phase2-fresh64-preparation/first-preflight-failure.json)
seals the attempted draft file hashes; the full assertion remains in the chat tool
output. No fresh source documents were uploaded, no fresh questions submitted,
and no candidate code or frozen inputs were changed. Node is now v24.22.1;
Chrome remains 155.0.8059.85. No execution freeze or fresh quality result exists.
Work stopped pending approval to correct dependency-byte capture while retaining
all hash checks, preserve this failure, and retry neutral preflight in a new path.

## README phase 1 handoff update — 2026-10-21

README now summarizes the approved 668-case phase 1 closure, all 19 native family
results, five retained public-data limitations, 103 excluded/untested originals,
engineering correction history and evidence links. It distinguishes phase 2 input
preparation from an unrun fresh model study and retains earlier README experiment
summaries as historical checkpoints. Documentation only; no runtime, candidate,
frozen inputs or historical evidence changed. Verification: 771/771 unit tests PASS;
62 README local links resolve; all 19 result rows match the original report and
total 668 cases. Credential-pattern review and `git diff --check` PASS. No model
study or browser rerun was needed for this documentation-only update.

## Current stage — phase 2 preparation

The user explicitly approved revising phase1 acceptance to the668 verified cases
and proceeding to fresh-confirmation preparation. [Decision PH1-668-20261021](docs/PHASE1_REVISED_ACCEPTANCE.md)
records the scope, evidence and retained limitations. CI for accepted evidence
`e2bbc626` completed successfully. **Phase1 COMPLETE under the revised scope**;
full771-case gate remains NOT RUN.103 originals/four packs and the old private
combined config stay unavailable/untested, excluded rather than marked passing.
The five known public-data case limitations and all historical failures remain.

**Phase2 PREPARATION**: [Fresh64 protocol](eval/phase2-fresh64/PROTOCOL.md) and
[input freeze](eval/phase2-fresh64/input-freeze-manifest.json) preserve8 newly
authored fictional TXT documents/64 questions:40 supported Hybrid,16 unsupported
Hybrid,8 lexical Comparisons. All input contexts/groups/pairs validate; questions
are unique and none exactly repeats an archived739/Vela32 question. Pure input
resource check:11 fixed/11 section passages, sentence upper bound151. No candidate,
planner, embedder, model or scorer was invoked on this pack; no fresh quality
result exists. This is author-created targeted confirmation, not blinded external
validation or a representative accuracy benchmark.

The prospective gate is64/64 PASS separately in both unchanged v43 variants,
including all unsupported refusals and comparisons, with no citation/provenance
errors/retries. A failed first run stays failed; a later replay is regression.
Next prepare/publish an immutable execution freeze with runner/scorer, all module
and actual environment/model identities, then perform the first once-only capture.
The input freeze alone is not execution-ready. **771 unit tests /28 strict Keyword
checks PASS**; these are separate from the still-unrun64-case study. Live5.6/r44
and candidate code stay unchanged; phase3 integration is not authorized by this
scope revision, and later product qualification/release gates remain open.

## Latest combined available-input result — 19 native gates PASS

Freeze `560e3a8b` preceded one uninterrupted capture of all 668 available original
cases / 19 families: 628 actual MiniLM Hybrid plus 40 lexical Comparisons. Candidate
v43 and paired v42 unchanged. All 19 original available-input native regression/
preservation gates PASS; no prior PASS loss, new false acceptance/refusal,
execution errors, manual-review blockers or retries. This is NOT 668/668 answers
passing: ExternalSQuAD24 fixed 22/24, section 23/24; FreshConfirmation32 fixed 29/32,
section 30/32 retain their historical FAIL rows, including F10's false refusal.
All other native candidate cases PASS. No pooled accuracy claim.

[Results](docs/V43_ALL_AVAILABLE_MAC_RESULTS.md) seal 5,352 artifacts/587,220,023 bytes.
All 1,336 normalized answer/quote signatures match prior first-v43/v38 native cards;
75 source texts match. Offline audit recomputes 40,030 body cosines/checks 54 facet
anchors and original C04 direct-span gates; 6,591 selected earlier artifact hashes
remain intact. Native grades and separate review are unchanged. 771 unit/28 Keyword,
827-file freeze/input/history/adapter checks PASS; first 767/3 engineering failure
and approved correction remain recorded below. Live 5.6/r44 is unchanged.

No verified available family remains untested with v43. The subsequent explicitly
approved [revised acceptance](docs/PHASE1_REVISED_ACCEPTANCE.md) closes phase1 for
this668-case scope;103 missing originals/the private combined config stay untested.
The original combined study/report remains unchanged as its dated checkpoint.
The known public failures stay visible. No full771-case gate, fresh-confirmation
result, production adoption or6.0 release claim follows from that revision.

## All-available combined run — preparation

The user requested all cases in one shot and approved correcting an overlapping
input-reference validator. The new [protocol](eval/v43-all-available-regression/PROTOCOL.md)
and [preparation](docs/V43_ALL_AVAILABLE_PREPARATION.md) define668 original cases
across19 families:628 actual MiniLM Hybrid plus40 lexical Comparisons. This is
an explicit NEW available-input config, not recovery of the missing original
combined config. V43, v42, live5.6/r44 and all historical evidence remain unchanged.

The first engineering check recorded767 PASS/3 FAIL of770, all from one protocol
listed in both input and native-reference categories. Work stopped; user approved
the correction. Each category now retains independent complete hash verification
and its own duplicate guard; conflicting cross-category hashes still fail.
**771/771 unit tests**, strict **28/28 Keyword**, clean Chrome155.0.8059.85 startup,
original input/history/adapter-equivalence/resource checks PASS. The771 unit count
is not771 model cases. The original failed log and approved passing log are
preserved verbatim. **827-file freeze** prepared; model capture/scoring NOT RUN
at this checkpoint. Publish before questions.

Native gates remain separate. Known public failures (ExternalSQuAD24 E08/E24;
FreshConfirmation32 F07/F09/F10, variant-specific) retain FAIL outcomes. No new
failure/PASS loss or changed known-failure signature is allowed. Changed Cobalt
manual answers require adjudication; no new automatic semantic grade is invented.
103 unavailable originals and phase1/full-gate/fresh-confirmation/adoption holds
remain. Previous nine-pack results below stay preserved.

## Latest v43 result — nine separate exposed gates PASS

Protocol `c88c6fbc` preceded coding; freeze `89c23ef9` and approved exact-log policy
`b8f6281b` preceded questions. Vela32,Prism32,Lumen32,Hearth32,Morrow32,Cedar32,
Bracken32,Flint32 pass 32/32 each; RetrievalQuality28 passes 28/28, separately, in
both v43 variants. No historical PASS loss, candidate false accepts/refusals,
execution errors or question retries. RQ02,C09,B14,F14 restore earlier v38 answers
under the structured contract; paired v42 retains their supported refusals.

[Results](docs/V43_NINE_PACK_MAC_RESULTS.md) seal 2,254 artifacts/242,067,069 bytes.
All 36 source texts match; 19,934 body cosines and 54 displayed facet anchors audit
successfully. All 568 answer/quote variant signatures match prior passing v42/v38
history after whitespace normalization; only the four target cases change versus
paired v42. All 4,337 selected older sealed artifacts remain unchanged. Native
rubrics/automated grades and separate review remain distinct. 764 unit/28 Keyword,
609-file freeze/input/history and approved whitespace checks PASS.

These are 284 distinct exposed cases (252 Hybrid/32 lexical Comparisons), not fresh
confirmation or a full 771-case gate. **384 verified cases/10 other families** remain
untested with v43, plus 103 unavailable originals/combined configuration. Next
freeze the remaining regression scope/native rubrics and resolve the missing-input
acceptance decision. Phase 1, full regression and later release/adoption holds stay
open; live 5.6/r44 remains unchanged. All original failures and the engineering/
whitespace workflow errors below remain preserved and explicitly qualified.

## Approved raw-log whitespace exception

The user approved preserving the first failed engineering log verbatim and a
whitespace exception limited to trailing blanks in that exact file. The final
check on preparation `89c23ef9` had flagged log lines780/2066; the command sequence
incorrectly continued to commit/push before that output was handled. This is
recorded as a workflow error, not a clean check. No model questions had run.
The exception changes only Git's whitespace policy for this archived log; original
bytes, native rubrics, candidate code and the609-file freeze remain unchanged.
Reverification PASS:764/764 units, strict28/28 Keyword,609-file freeze/native
histories and all five preparation artifact hashes. Both current diff and the
preparation commit whitespace check pass under the approved exact-file policy.
Publish this correction/confirm remote receipt before once-only model capture.

## V43 engineering and nine-pack freeze

Protocol `c88c6fbc` preceded implementation. Isolated v43 accounts for RQ02,C09,
B14,F14 using bounded new forms, unique prefix/current-heading/anonymous scopes
and complete literal clock policies. [Preparation](docs/COVERAGE_V43_PREPARATION.md).
**764/764 unit tests**, strict **28/28 Keyword**, clean Chrome155.0.8059.85 startup,
original input/history checks and **609-file freeze** PASS. Model capture/native
scoring **NOT RUN at this checkpoint**; publish this freeze before questions.

The first engineering run was **762 PASS/1 FAIL of763**: a new validator compared
review annotations as native grade fields. Work stopped and the user authorized a
correction/recheck. Only the reviewed `review_note` annotation is excluded from
native equality; every grade/answer/quote/other field remains checked. Both original
files remain byte-for-byte unchanged. First failure and approved passing logs are
preserved in [engineering evidence](docs/evidence/v43-nine-pack-mac-preparation/engineering-checks.json).
No model retry occurred. All historical first failures remain recorded.

This freezes284 exposed cases/nine packs (252 actual MiniLM Hybrid,32 separately
labelled lexical Comparisons), with each family's original native rubric. Success
would leave384 verified cases/10packs untested with v43;103 originals and the
combined configuration remain unavailable. No full regression/fresh confirmation/
quality/adoption claim; live5.6/r44 and phase1/integration HOLD stay unchanged.

## Authorized v43 — deferred clock protocol

The user approved reviewing/fixing RQ02,C09,B14,F14 with affected-pack and five-pack
revalidation. [Protocol](eval/answer-completeness-v43/PROTOCOL.md) precedes code.
Scope:284 exposed cases/nine packs,252 Hybrid/32 lexical Comparisons. Native
RetrievalQuality28 exact-evidence grading stays separate from the 32-case group
rubrics and its original chunking-promotion gate. All nine families have all-PASS
v38 history to preserve. No v43 implementation/model result at this checkpoint.
Protocol checkpoint verification:710 unit tests and strict28 Keyword PASS; full
diff reviewed and `git diff --check` clean. Live5.6/r44, v42 and all first evidence
remain unchanged; phase1/adoption HOLD.

## Latest v42 result — five partial gates PASS

Protocol/inventory `7ed219e1` preceded coding; freeze `8970bd5c` reached GitHub before
questions. Vela32, Prism32, Lumen32, Hearth32, Morrow32 each pass **32/32** in both
v42 variants. M04 binds the correct entity/ticket type and full literal next-day/
wind-suspension-hold relation. Paired v41 retains its 31/0/1 Morrow32 FAIL. No
historical PASS loss, false accepts/refusals, execution errors or question retries.
These are 160 distinct exposed cases (140 Hybrid / 20 lexical Comparisons), not
fresh confirmation or the full regression gate.

[Results/evidence](docs/V42_FIVE_PACK_MAC_RESULTS.md) preserve native grades,
assistant review and a seal of 1,268 artifacts (120,959,783 bytes). Only M04's two
variant answers/quotes change versus first v41; all 20 source texts and 159 other
case outputs stay unchanged. Offline audit recomputes 9,202 body cosines and checks
36 facet anchors. All 3,069 selected previous v41/v40/v39 artifact hashes and original
input/history identities remain intact. Engineering: **710 unit tests**, strict
**28/28 Keyword**, clean Chrome 155.0.8059.85 startup and 529-file freeze PASS.
Live 5.6/r44 remains unchanged; no runtime integration.

Next review/freeze the four deliberately deferred clock forms RQ02,C09,B14,F14
and native pack criteria before expanding affected regressions. **508 verified
cases / 14 other packs** remain untested with v42; 103 originals/combined configuration
remain unavailable. Phase 1, full regression, missing-input decision, prospective
confirmation and product/integration/release gates remain open.

## Authorized v42 — protocol checkpoint

The user approved the structured v42 fix and five-pack revalidation. A read-only
inventory verifies668 cases/117 input entries: v41 owns13 clock questions,8 planned
and5 unresolved. Planning is not support. M04 is in scope; RQ02,C09,B14,F14 remain
explicit deferred gaps. [Protocol](eval/answer-completeness-v42/PROTOCOL.md) precedes
implementation; [inventory](docs/evidence/v42-grammar-inventory/forms.json) invokes
only the unchanged pure planner/literal splitter, no answers/models/scoring.
Current baseline670 unit/28 Keyword checks passed in the previous review. No v42
code/model result exists at this protocol checkpoint; all first failures remain.

## V42 engineering/preparation checkpoint

Protocol/inventory `7ed219e1` preceded implementation. Typed ticket entity/order
roles, scoped hold idiom and declarative/imperative ticket relations are implemented
in isolated v42. **710 unit tests**, strict **28/28 Keyword**, clean Chrome155.0.8059.85
startup and original input/history checks PASS. A **529-file freeze** pins160
exposed cases and exact independently embedded candidate/paired-v41 facet queries.
[Preparation](docs/COVERAGE_V42_PREPARATION.md). Actual capture/scoring **NOT RUN at
this checkpoint**; publish freeze before questions. Four deferred clock forms and
508 untested verified cases remain explicit. No live integration or adoption.

## Preserved first v41 Morrow32 result — FAIL / HOLD

Freeze `0ffd3e11` preceded model questions. First Morrow32 actual-model capture
completed 32 cases: **31 PASS / 0 PARTIAL / 1 FAIL** in both v41 variants and paired
v40, with M04 a supported false refusal and historical PASS loss. Zero execution
errors or question retries. Work stopped; user explicitly approved unchanged failure
publication and investigation. The required gate remains **FAIL**.

[First results](docs/V41_MORROW32_MAC_RESULTS.md) preserve 258 original artifacts
(23,363,293 bytes) under a SHA256 manifest. [Investigation](docs/MORROW32_V41_FAILURE_REVIEW.md)
confirms the ticket-order entity boundary, hold-question idiom and independent
source grammar gaps. Only the unchanged pure planner/regex/literal splitter were
used on M04; no candidate change, model rerun or scorer re-execution. Original
v30 M11/M32 failures, archive-name qualification and all later results remain intact.

**670 unit tests**, strict **28/28 Keyword**, 469-file freeze/input/history and
publication checks PASS. Prior selected v41/v40/v39 seals retain 2,811 artifact
hashes. These engineering/integrity passes do not override the actual-model FAIL.
Live 5.6/r44 and all candidates/first evidence remain unchanged.

V41 now has **160 distinct exposed tested cases / five packs**, separately scored:
four gates PASS, Morrow32 FAIL. **508 verified cases / 14 other packs** remain
untested with v41; 103 originals/combined configuration are unavailable. At that
checkpoint the next decision was separate v42 design/five-pack revalidation; it
has since passed above. Phase 1, full regression, fresh confirmation and live
integration/product/release gates remain open.

## Morrow32 v41 preparation checkpoint

User authorized the next exposed Morrow32 regression. A new **469-file freeze**
pins unchanged v41/paired v40, original sources/key/protocol/native criteria,
45 historical variant arrays and Chrome155.0.8059.85 startup. **670 unit tests**,
strict **28/28 Keyword**, original criteria/input/history and clean startup checks
PASS. Preserve first v30 30/0/2 and archive-name qualification unchanged.
[Preparation](docs/V41_MORROW32_PREPARATION.md). Actual capture/scoring **NOT RUN at
this checkpoint**; publish freeze before questions. Live5.6/r44 unchanged.

## Earlier v41 result — four partial gates PASS

Protocol `72c74ad7` preceded implementation; freeze `d3b854f4` reached GitHub before
questions. Both v41 variants pass Vela32, Prism32, Lumen32, Hearth32 **32/32 each**.
H04 now cites the next collection day and full seed-health-hold exception. Paired
v40 still fails H04; its first 31/0/1 and every older first result remain preserved.
No historical PASS loss, false accepts/refusals, execution errors or question retries
in v41. These are 128 distinct exposed cases (112 Hybrid / 16 lexical Comparisons),
not fresh confirmation or a full regression gate.

[Results/evidence](docs/V41_FOUR_PACK_MAC_RESULTS.md) include unchanged native grades,
assistant review and a SHA256 seal of 1,016 artifacts (97,119,958 bytes). Only H04's
answers/quotes change versus first v40; all 16 source texts and other 127 case outputs
remain unchanged. Offline audit independently recomputes 7,536 body cosines and checks
28 facet-anchor entries. Prior v40/v39 seals and original inputs/history remain intact.
Engineering checks: **667 unit tests**, strict **28/28 Keyword**, clean Chrome
155.0.8059.85 startup and 500-file freeze PASS. Live 5.6/r44 unchanged.

At that earlier checkpoint Morrow32 was next among **540 verified cases / 15 packs
untested with v41**. Morrow32 has since failed; see the latest result above. The
103 unavailable original cases/combined configuration,
full regression, prospective confirmation and integration/product/release gates
remain open. Still phase 1; no live adoption.

## Authorized v41 — protocol checkpoint

The user approved the isolated v41 fix and four-pack validation on October20.
[Protocol](eval/answer-completeness-v41/PROTOCOL.md) precedes implementation:
bounded order/collection-day/active-hold grammar, engineering controls, then a
published new freeze and128 exposed cases with fresh candidate/paired-v40 vectors.
At this checkpoint no v41 code or model result exists. Preserve v40 Hearth32 FAIL,
all first evidence and live 5.6/r44. Current engineering baseline633 unit/28 Keyword
checks passed in the prior review; this protocol adds no executable code.

## V41 engineering/preparation checkpoint

The isolated v41 implementation and four-pack runner are prepared under protocol
`72c74ad7`. **667 unit tests** and strict **28/28 Keyword** checks PASS; clean
read-only Chrome 155.0.8059.85 startup and original input/history checks PASS.
A new **500-file freeze** covers128 exposed cases and independently embedded v41/
paired-v40 planner queries. Actual model capture/scoring **NOT RUN at this
preparation checkpoint**. Publish freeze before questions. See
[engineering and execution scope](docs/COVERAGE_V41_PREPARATION.md).

## Preserved first v40 Hearth32 result — FAIL / HOLD

Freeze `ba2ccb1e` preceded questions. First actual-model Hearth32 capture is complete:
**31 PASS / 0 PARTIAL / 1 FAIL** in both v40 variants and paired v39. H04 incorrectly
refuses a supported next-collection-day/seed-health-hold request, losing a v33–v38
PASS. Zero execution errors or question retries. The gate remains **FAIL**.
Work stopped; the user explicitly approved unchanged failure publication and
investigation, then approved correcting a separate publication-validation assumption.

[First results](docs/V40_HEARTH32_MAC_RESULTS.md) preserve all 258 original artifacts
(23,337,052 bytes) under a SHA256 manifest. [Investigation](docs/HEARTH32_V40_FAILURE_REVIEW.md)
confirms bare-order context and collection-day question/source/hold grammar gaps.
No candidate edit, model rerun or regrading. The original frozen config hash matches
run/score metadata; its ledger copy has identical JSON but omits a final newline.
The approved check correction changes no evidence bytes; both the initial check
failure and correction remain recorded. All earlier first results remain intact.

Engineering verification: 633 unit tests and strict 28/28 Keyword checks PASS on
bundled Node 24.19.0 at unchanged baseline; 456-file freeze/input/history and corrected
publication validation PASS. Prior v40 three-pack 763 and v39 archives 774 artifact
hashes remain unchanged. These engineering passes do not override the model FAIL.

There are now **128 distinct exposed v40-tested cases / four packs**, separately
scored: three pack gates PASS, Hearth32 FAIL. **540 verified cases / 15 packs remain
untested with v40**, plus 103 unavailable originals. At that checkpoint the next
decision was a separate v41 fix/four-pack validation; it has since passed above.
Full regression, prospective confirmation and live integration remain blocked.

## Hearth32 v40 preparation checkpoint

User authorized the next exposed Hearth32 regression. A new **456-file freeze**
pins original inputs/native criteria, unchanged v40, paired v39 and Chrome
**155.0.8059.85** (updated since the earlier .80 study). All **633 unit tests**,
strict **28/28 Keyword** evaluation, clean startup and original input/history checks
pass. Original v32 BLOCKED/UNGRADED and v33 qualified 31/1/0 remain preserved.
[Preparation and protocol](docs/V40_HEARTH32_PREPARATION.md). Actual model capture/
scoring **NOT RUN at this preparation checkpoint**; publish freeze before questions.

## Earlier v40 result — three partial gates PASS

Protocol `894bc74` preceded implementation; freeze `da10734` was published before
questions. First actual MiniLM capture: **Vela32 32/0/0, Prism32 32/0/0, Lumen32
32/0/0**, each in both v40 variants. Paired v39 remains 32/0/0, 32/0/0, 31/0/1;
L04's old failure is preserved. No historical PASS loss, false accepts/refusals,
execution errors or question retries in v40. These are 96 distinct **exposed**
cases (84 Hybrid / 12 lexical Comparisons), not fresh confirmation or a full gate.

[Results and evidence](docs/V40_THREE_PACK_MAC_RESULTS.md) include unchanged native
scorecards, assistant review, independently recomputed facet cosines and a seal of
763 original artifacts (73,452,103 bytes). All 774 prior v39 artifacts retain their
hashes. Engineering checks: **630 unit tests PASS**, strict **28/28 Keyword PASS**,
clean Chrome startup and **470 frozen files verified**. Live 5.6/r44 unchanged.

At that earlier checkpoint: next Hearth32, with **572 verified cases / 16 packs
untested with v40**. Hearth32 has since failed; see the latest result above. The 103
unavailable cases, full regression, prospective
confirmation, integration and product/release gates remain blockers.

## Authorized v40 work — preparation checkpoint

User approved the [v40 protocol](eval/answer-completeness-v40/PROTOCOL.md) on
October 20: bounded grammar changes followed by engineering checks and a new
96-case exposed regression with fresh actual MiniLM and paired v39 facet vectors.
This checkpoint precedes implementation and model questions. V39 Lumen32 remains
FAIL/HOLD; all historical evidence and production 5.6/r44 remain unchanged.
Protocol checkpoint verification: bundled Node 24.19.0 passed `node --test
tests/*.test.mjs` (602/602) and `node eval/run.mjs --strict` (28/28);
`git diff --check` and review passed. No model questions were run.

The isolated v40 implementation and new three-pack runner are now prepared:
**630/630 unit tests** and strict **28/28 Keyword** checks pass; clean read-only
Chrome 155.0.8059.80 startup confirms r44. A new **470-file freeze** covers 96
exposed cases and separately embedded candidate/paired planner queries. Actual
model capture/scoring is **NOT RUN at this preparation checkpoint**. Publish the
freeze before execution. See [engineering/preparation](docs/COVERAGE_V40_PREPARATION.md).

## Working roadmap for 6.0

The user accepted a [five-phase working sequence](docs/ROADMAP_6_0.md):
broader regression → fresh confirmation → integration → product qualification →
release preparation. We are in **phase 1**. User-facing product promises and
quantitative release criteria are not yet frozen. This plan does not waive the
missing-input gap, authorize integration or establish production readiness.

The Mac folder was initially an empty Git repository. The initial setup commit
`a883e28` was published on `mac-work-oct2026` and merged into `main` through PR
#111 (`a47780e`). The Mac checkout now uses the existing shared `main` branch.
The original chat checkout was `/Users/arjunkumar/Documents/ChatGPT/GroundDesk AI 3`,
a separate repository, not a linked worktree. Commit `b0d4224` was transferred to
the official checkout by local fetch and fast-forward, then pushed from the
official checkout and verified on GitHub. Use the official path above for future
Mac work. Historical branches and the other repositories remain preserved.
This does not establish whether Windows has unpublished local work; inspect and
preserve it before switching branches.

## Architecture and delivered functionality

The application is a static HTML/CSS/ES-module site hosted on GitHub Pages.
There is no application backend, required account or paid inference API.

| Area | Implementation and behavior |
| --- | --- |
| UI coordination | `app.mjs`, `index.html`, `styles.css`, `workspace-ui.mjs`; Ask/Compare/Research, responsive layout, guide and keyboard shortcuts |
| Intake | TXT/Markdown and searchable PDFs; PDF.js extraction, readiness and recoverable file errors |
| Retrieval | `retrieval.mjs`; normalized overlapping passages, BM25-style ranking and literal extractive evidence |
| Optional Hybrid | `semantic.mjs`, `hybrid.mjs`; MiniLM q8 WASM embeddings and reciprocal-rank fusion |
| Optional generation | `generation.mjs`; local Qwen 0.5B WebGPU drafts with citation-ID checks and extractive fallback |
| Evidence inspection | `quality.mjs`, `provenance.mjs`, PDF preview/highlight modules; source identity, literal matching and physical PDF-page/text-line navigation |
| Other workflows | `research.mjs`, `policy-synthesis.mjs`; separate lexical research, comparison and bounded policy inventories |
| Session/storage | History and Ask file selection; explicit document snapshots in IndexedDB through `workspace-store.mjs` |
| Export/delivery | Markdown reports; GitHub CI followed by deployment of its exact successful main commit |

MiniLM does not power Compare or Research. Quote provenance and generated citation
syntax do not establish factual support, completeness or compliance.

## Development history

- **October 10:** import of the existing 4.0 project; 5.0 evaluation, provenance,
  standalone CI and Pages hosting.
- **October 10–12:** policy tools, refusal and evidence-completeness improvements,
  PDF provenance and original-page review.
- **October 12–13:** 5.6 workspace, file lifecycle, history/search, file-scoped Ask,
  explicit local snapshots and document readiness. Current live baseline is r44.
- **October 13–18:** isolated retrieval experiments and frozen regression/fresh
  confirmation studies. Experimental versions are not application releases.
- **October 19:** Mac checkout, cross-platform handoff and setup documentation;
  setup merged through PR #111, followed by the user's direct-to-main workflow,
  official-checkout reconciliation and Vela32 refusal design review.
- **October 20:** isolated v39 dispatch contract implemented and unit-validated
  under precommitted protocol `c73a8fe`; no model run at that initial checkpoint.
- **Later October 20:** Vela32 and Prism32 partial actual-model gates PASS;
  Lumen32 first v39 gate FAIL on L04. Work stopped, then the user authorized
  preservation/publication and investigation. No candidate fix or live adoption
  at that investigation checkpoint.
- **Subsequently October 20:** v40 implemented under precommitted protocol; all
  three 32-case exposed pack gates pass in both variants with fresh actual model
  vectors. L04 repaired; all first failures retained; live r44 unchanged.

Initial setup publication used the connected GitHub account because terminal Git
in the original chat checkout could not authenticate. Terminal publication from
the official checkout is now working: `b0d4224` reached `origin/main` with its
original noreply author identity. Authentication is not inferred from file edits
or a successful public fetch; verify every push against GitHub.

See [CHANGELOG](CHANGELOG.md), [commit history](https://github.com/arjun9669/GroundedDesk-AI/commits/main)
and [browser benchmark history](docs/BROWSER_BENCHMARK_HISTORY.md). Earlier Codex
conversation-only decisions and uncommitted Windows changes are not recoverable
from this repository alone.

## Verification baseline

The October 19 audit used Apple Silicon macOS, bundled Node **24.19.0**, and
installed headless Chrome **155.0.8059.80**. CI and `.nvmrc` select Node **22**;
the Mac run is not a new local Node 22 qualification.

| Check | Observed result and scope |
| --- | --- |
| Node unit suite | **573 PASS**, zero failures or skipped tests |
| Strict bundled Keyword evaluation | **28/28 PASS**: 18 supported, 10 unsupported; zero false accepts or provenance errors |
| Mac policy UI smoke | PASS |
| Mac selected-file Ask UI smoke | PASS; Keyword only |
| Mac workspace interaction smoke | PASS; synthetic desktop/mobile viewport checks |
| Latest baseline GitHub CI | PASS, including synthetic Chromium/PDF checks; [run](https://github.com/arjun9669/GroundedDesk-AI/actions/runs/39074594828) |
| Latest baseline Pages deployment | PASS at the reviewed upstream commit |
| Actual MiniLM/Qwen on this Mac | Not run during the audit |
| Complete PDF suite on this Mac | Not run during the audit |
| Safari/physical-phone acceptance | Not established by this audit |

Instrumented Node coverage was 71.90% lines and 84.29% branches for loaded modules.
It excludes browser-only execution and is not whole-product or model-accuracy
coverage. Unit mocks, synthetic UI checks and the small curated Keyword fixture
must remain separate from actual-model measurements.

Initial audit failures were setup-related: the temporary sparse copy omitted two
required archived JSON fixtures; restoring them resolved the unit failures.
Browser startup diagnostics captured connection resets while loading modules.
Increasing the temporary HTTP server's connection queue produced clean startup
and passing unchanged UI tests. `tools/serve_local.py` retains that queue setting.
This is an observed local serving qualification, not a change to application code.

The full Mac checkout subsequently passed the same unit suite and strict bundled
evaluation. The new server passed three consecutive clean Chrome startups with
all three samples, the unchanged r44 footer and no failed requests or page errors.
Python syntax, documentation links and `git diff --check` also passed.

The direct-to-main workflow documentation update was checked on upstream
`a47780e` with the same bundled Node 24.19.0 runtime: all 573 unit tests and the
strict 28-case Keyword evaluation passed. Documentation links and diff whitespace
checks passed; the intended documentation diff was reviewed for errors and
sensitive information. No application or evaluation code changed.

The Vela32 design review was verified in the official checkout on baseline
`b0d4224`: 573 existing unit tests and the strict 28-case Keyword evaluation
passed with bundled Node 24.19.0. Documentation links and diff checks passed.
The read-only classifier inspection computed no answers and loaded no model.
Runtime code, existing tests, frozen inputs and historical evidence are unchanged;
no fix or new actual-model result is claimed.

## Current retrieval blocker

### October 20 first v39 Lumen32 FAIL and authorized investigation

The [first Lumen32 actual-model result](docs/V39_LUMEN32_MAC_RESULTS.md) is
**31 PASS / 0 PARTIAL / 1 FAIL** in both v39 variants, with one supported false
refusal and historical PASS loss, **L04**. Paired v38 passes 32/32. All 32 cases
completed once before grading (28 actual MiniLM Hybrid / four lexical Comparisons,
Qwen off), with zero model-question retries or execution errors. Original first
v35 28/2/2 failure, its qualifications and later v36–v38 results remain intact.

Work stopped after the required scoring failure. The user then authorized
publishing the preserved failed run and investigating a separate fix. The
complete first raw capture/score is sealed as 258 artifacts (23,490,656 bytes)
under `docs/evidence/v39-lumen32-mac/manifest.json`; no first output or score is
rewritten, and no failing quality gate is relabelled as PASS.

The [read-only failure review](docs/LUMEN32_V39_FAILURE_REVIEW.md) confirms that
`When should it depart` leaves the v39 request unresolved. Static source inspection
also finds independent unsupported forms: `departure moves to`, `following service
day`, and `hold is still active`. Accepting the question word alone is not a
complete fix. L04 has zero planner-facet vectors; future evaluation must compute
new actual facet vectors, not relabel its saved whole-question vector.

**V40 is proposed only; not implemented.** Preserve frozen v39 and its failure.
Next agree/freeze a narrow separate protocol, implement and unit-validate the
request/source grammar change without an inherited-answer fallback, then newly
freeze and revalidate Vela32/Prism32/Lumen32 before resuming other packs. No new
model answers, candidate edits or live integration occur in this publication task.

Current coverage is **96 distinct v39-tested cases** across three separately
reported packs (Vela32 PASS, Prism32 PASS, Lumen32 FAIL); **572 verified cases**
remain untested with v39, and **103 original cases** plus combined-config/external-
adjudication inputs remain unavailable. Phase 1 and release 6.0 remain on HOLD.

Publication/review checks on bundled Node 24.19.0: all **602 unit tests PASS**,
strict `node eval/run.mjs --strict` **28/28 PASS**, unchanged 436-file freeze and
historical alignments verify. All 258 original artifact hashes, documentation
links, `git diff --check`, sensitive-information and intended-path reviews pass.
These successful preservation/engineering checks do not clear or rerun the
recorded **Lumen32 model gate FAIL**.

### October 20 Lumen32 preparation checkpoint

Latest main `9ce75c0` CI and Pages passed. The
[separate Lumen32 preparation](docs/V39_LUMEN32_PREPARATION.md) verifies original
config/key/rubric/protocol/scorer and four source hashes, exact questions/document
pairs and twenty historical variant arrays. Preserve first v35 28/2/2 FAIL,
publication/measurement qualifications and v36–v38 exposed passes. Reuse the
identical frozen grader without changing criteria; v39, paired v38, earlier
runners/freezes, original inputs and live r44 remain unchanged.

Before questions: bundled Node 24.19.0 passed **602 unit tests**, zero failed/
skipped; strict `node eval/run.mjs --strict` passed **28/28**. Syntax and original
input/history checks pass. Installed Chrome 155.0.8059.80 read-only r44 startup
has no failed requests/page errors. Actual Lumen32 capture/scoring is **NOT RUN
at this preparation checkpoint**. Publish the new freeze before one capture;
stop and ask after a required failure. Full regression/adoption remain HOLD.

The first successful Lumen32 freeze records 436 code/input files; all frozen
hashes and historical alignments verify. Documentation links, `git diff --check`
and sensitive-information/intended-path review pass before publication. No model
questions have been asked at this checkpoint.

### October 20 first Mac Prism32 result

The [first v39 Prism32 partial exposed regression](docs/V39_PRISM32_MAC_RESULTS.md)
passed **32/32 in both v39 variants**, with zero false accepts/refusals, execution
errors or historical PASS losses. Paired v38 also passed 32/32. First-v36 29/0/3
FAIL, v37/v38 history and Vela32's first v39 pass remain unchanged. All 28 Hybrid
questions used actual MiniLM q8 WASM, Qwen off; four Comparisons remained lexical.

Preparation/freeze was pushed as `49c836f` before questions. All 430 frozen files
and fifteen historical variant alignments verify. Actual source/query/planner-
facet vectors were preserved before candidate calls, every baseline/UI source
match passed, and independent facet cosine recomputation passed. Assistant
contradiction review changed no grades. Zero model-question retries. The complete
258-artifact first capture/score (24,031,274 bytes) is sealed under
`docs/evidence/v39-prism32-mac/manifest.json`.

There are now **64 distinct v39-tested cases** in two separately reported packs:
Vela32 and Prism32. **604** of the 668 verified cases await v39 testing; **103**
original cases and combined-config/external-adjudication inputs remain unavailable.
Phase 1 is incomplete. Next prepare a new Lumen32 partial regression, then Hearth32;
no full-regression, prospective-confirmation, integration or release claim.

### October 20 Prism32 preparation checkpoint

The [separate Prism32 preparation](docs/V39_PRISM32_PREPARATION.md) keeps v39,
live r44, the Vela32 runner/freeze, original Prism32 inputs and historical scores
unchanged. It selects the complete original 32-case exposed pack (28 Hybrid /
four lexical Comparisons), paired v38, with first-v36 and v37/v38 preservation
checks. Original config/key/rubric/protocol/scorer and source hashes pass.

Before new questions: **599 unit tests PASS**, zero failed/skipped; strict
`node eval/run.mjs --strict` **28/28 PASS**. Bundled Node 24.19.0, installed
Chrome 155.0.8059.80; read-only r44 startup has no failed requests/page errors.
New runner/preparer syntax and fifteen historical variant alignments pass.
Prism32 model capture/scoring is **NOT RUN at this preparation checkpoint**.
Publish the successful preparation/freeze before one capture; stop and ask after
any required failure. Full regression, fresh confirmation and adoption stay HOLD.

The initial freeze preparation failed before writing a config/manifest or asking
questions (`spawnSync git ENOBUFS`: the complete tracked-path listing exceeded
Node's buffer). Work stopped. The user then authorized limiting that listing to
the exact code/HTML/CSS inputs used by the freeze and retrying; original input/
history verification remains unchanged. This infrastructure failure is retained
separately from the unrun model gate.

Authorized recovery succeeded: the narrowed path set equals all 411 originally
eligible tracked code/assets, all 599 unit tests pass after the change, and the
first successful Prism32 freeze records 430 code/input files. No model question
was asked during preparation. Review and publish this checkpoint before capture.

### October 20 historical input inventory

GitHub CI for `7d75820` passed. A read-only
[input inventory](docs/RECOVERABLE_INPUT_INVENTORY.md) verified **117 original
input-file entries**, including 75 source documents, across **19 packs / 668
cases** (628 Hybrid / 40 lexical Comparisons). Frozen source/key/available
criteria hashes match; exact IDs, question order and strings align with preserved
historical scorecards. This is input qualification, not a new model score.

Vela32's 32 cases are already tested with v39; **636 additional cases** have
verified inputs but require new frozen runners/scorers and native preservation
gates. **103 cases** still lack original input bundles: Lantern32, Aster32,
Meridian24 and Atlas15. The original combined 739-case configuration/integrity
manifest and external manual-adjudication dependencies remain unavailable.
Archived answers and synthetic Atlas unit fixtures cannot replace those inputs.

Recommended next: prepare/freeze Prism32's original 32-case partial v39 gate,
then Lumen32 and Hearth32, preserving original criteria and all first results.
No model questions, new quality results, source edits or live-code changes occur
in this inventory task. Full regression, fresh confirmation and adoption stay HOLD.

Verification on bundled Node 24.19.0: `node --test tests/*.test.mjs` passed all
596 tests, zero failed/skipped; `node eval/run.mjs --strict` passed 28/28 with
zero false accepts/provenance errors. The Python inventory command, syntax,
recorded-hash/accounting checks, documentation links and `git diff --check`
passed. The intended tool/report diff was reviewed for errors and sensitive data.

### October 20 first Mac partial-model result

The frozen runner/configuration were committed and pushed as `2453826` before
model questions. The [first Vela32-only actual-model run](docs/V39_VELA32_MAC_RESULTS.md)
then passed **32/32 in both isolated v39 variants**, with no false acceptance/
refusal or historical PASS loss. Paired v38 reproduced **30 PASS / 0 PARTIAL /
2 FAIL**. V39 repairs exposed V23/V27 while preserving the other 30 passes.
The actual-model subset is 28 Hybrid questions and four lexical Comparisons;
do not pool variants or call it fresh confirmation or a full 771-case PASS.

All 422 frozen code/input hashes, source/key/rubric identities and actual UI/
instrumented-baseline source matches passed. Actual MiniLM q8 WASM vectors and
separately embedded planner facets were captured before candidate use. Offline
recomputation verified every planner-facet/body cosine; assistant contradiction
review changed no grades. Zero question retries or production changes.

The complete first capture and score are preserved as 258 files (24,750,223 bytes)
under `docs/evidence/v39-vela32-mac/`, sealed by a SHA256 manifest. These fictional
evaluation artifacts synchronize through GitHub; the temporary output directory
is not the only copy. Original first results remain unchanged. Full historical
regression, fresh confirmation, device/performance checks and adoption stay HOLD.

### October 20 recoverable-input preparation

GitHub CI for implementation `75a334c` passed. The original external
`coverage-v38-inputs/run-config.json` and input-integrity manifest were not found
in the searched Mac folders or path history. Windows is unavailable. The user
authorized continuing with the available inputs, without reconstructing or
claiming the missing 739-case regression.

The [partial-regression preparation](docs/V39_RECOVERABLE_REGRESSION.md) freezes
the original Vela32 pack (28 Hybrid questions / four lexical Comparisons) for
isolated v39, paired v38 and unchanged r44 UI. All four source hashes and original
key/config/rubric bytes are checked. The new runner embeds exact planner facet
queries separately and retains pre-candidate vectors and recovery evidence.
New paths do not modify the original Windows configuration or first results.

Before freeze: bundled Node 24.19.0 passed **596 unit tests** (four new integrity/
scoring controls), strict `node eval/run.mjs --strict` passed 28/28, and installed
Chrome 155.0.8059.80 passed read-only r44 startup with zero failed requests/page
errors. Actual-model capture/scoring has not run at this preparation checkpoint.
The full 771-case gate and fresh confirmation remain NOT RUN; adoption stays HOLD.
The completed actual-model subset is recorded in the subsequent result above.

### Existing engineering and historical model results

The [v39 engineering report](docs/COVERAGE_V39_ENGINEERING.md) records **592/592
unit tests PASS**, including 19 new synthetic full-entry-point controls, and a
passing strict bundled 28-case Keyword evaluation on bundled Node 24.19.0.
Governed dispatch/time requests now bypass inherited answer producers and must
have complete scoped literal support for all planned facets. Other requests and
lexical Comparison retain the frozen v38 path. Multi-facet success requires
explicitly aligned separately scored evidence; finite unit values are synthetic.

Both original V23/V27 questions refuse in the constructed body-evidence controls.
Those constructed controls are **not** real-model Vela32 measurements; the later
actual-model subset is recorded separately above. The broader 771-input model run,
fresh confirmation, performance/device/integration gates remain **NOT RUN**.
The bounded grammar can cause supported false refusals, so v39 is not adopted.
Live 5.6/r44 and every original first result remain unchanged.

The [v38 regression report](docs/COVERAGE_V38_R44_VALIDATION.md) records a native
gate PASS and engineering PASS on **739 exposed cases**: 683 actual MiniLM Hybrid
questions and 56 lexical Comparisons. This is not 739/739 accuracy; historical
public-set failures remain, and different rubric results must not be pooled.

The [first Vela32 confirmation](docs/VELA32_V38_CONFIRMATION.md) records
**30 PASS / 0 PARTIAL / 2 FAIL** in both experimental variants:

- **V23:** an unsupported approver question receives an authentic departure-time
  quotation that does not identify the approver.
- **V27:** a mixed departure/password request receives departure information while
  omitting the unsupported password facet; the frozen whole-question criterion
  requires an uncited refusal. The production baseline refused correctly.

The [completed design review](docs/VELA32_REFUSAL_DESIGN_REVIEW.md) traces v38's
prior-first call through v36 and v35's re-export of v33. The inherited clock
selector can authorize departure evidence before v38 declines its own repair.
Existing helper-only controls do not cover the two before-cutoff failures through
the complete wrapper. Recommend a new isolated full-question/displayed-support
contract, including all requested facets and every return path; no implementation
or model rerun occurred in this design task. Preserve the original
[release decision](docs/evidence/coverage-v38-r44/release-decision.json).

## Limits and unresolved work

- Intake: 15 documents, 5 MB per file, 75 PDF pages, 180,000 extracted characters
  per document. MiniLM: 72 passages per session. Capacity expansion remains deferred.
- No OCR or reliable reconstruction of tables/columns; highlights are bounded
  location aids, not factual support checks.
- Broader Safari/device, memory, performance and actual Qwen testing remains.
- Initial PDF/model downloads require network access. Model and dependency caches
  are separate from document snapshots.
- Snapshots are manual, origin/browser-specific and not encrypted by the app.
  GitHub synchronizes committed source, not browser snapshots or uncommitted files.
- Comprehensive injection defenses, factual entailment checks and production
  readiness are not established. No project software license has been selected.
- Several post-v25 frozen files lack explicit `-text` attributes. Review Windows
  newline conversion before expanding attributes; do not bulk-renormalize evidence.
- Some older roadmap prose describes superseded experiments. Use this handoff for
  current priorities and preserve old reports as historical records.

## Decisions and next acceptance gates

1. **Approved October 19:** connect the Mac checkout to GitHub, establish the
   requested branch and add this handoff plus cross-platform development guidance.
   Use the user's approved GitHub noreply identity for repository-local commits.
2. **Updated October 19:** use existing `main` for every development task on both
   machines. Preserve functionality, implement the request, run relevant tests,
   review the diff for errors and sensitive information, commit, push directly to
   `origin/main`, and verify the remote commit. File edits alone are not uploaded.
   Never force-push or overwrite conflicts. Ask before proceeding with merge
   conflicts or failing checks. [AGENTS.md](AGENTS.md) records these instructions.
3. Preserve live 5.6/r44, existing functionality, frozen inputs, native rubrics,
   original first scores, failures, blockers and reporting errata.
4. Reconcile any unpublished Windows work before integrating divergent changes.
   Use [the synchronization workflow](docs/DEVELOPMENT.md#synchronize-mac-and-windows).
5. **Implementation authorized and completed October 20:** the isolated v39
   adapter and final dispatch contract pass 19 synthetic controls, with all 573
   earlier tests passing (592 total). Protocol `c73a8fe` preceded coding. See the
   [engineering report](docs/COVERAGE_V39_ENGINEERING.md) for grammar, evidence API,
   limitations and exact verification scope. Next requires separate authorization:
   prepare/freeze the actual-model runner and original inputs for the 771-input
   exposed regression (711 Hybrid / 60 lexical Comparisons). No new accuracy
   result or adoption is claimed; Vela32's first failure remains unchanged.
   **Subsequently authorized October 20:** prepare/freeze and evaluate the
   recoverable Vela32 subset while Windows is unavailable. The first 739-case
   input configuration cannot be recovered here. This subset does not satisfy
   the full regression gate. See the preparation checkpoint above for tests
   and actual execution status; retain failures and ask before any retries.
   **Completed subset:** both v39 variants pass all 32 exposed Vela32 cases;
   all original first failures remain preserved. Next inventory and verify other
   recoverable packs before extending coverage. **Inventory completed:** 19 packs /
   668 input cases verified, including Vela32; 103 cases and the original combined
   configuration remain unavailable. **Prism32 now passes 32/32 in both v39
   variants**. **Lumen32 subsequently FAILS 31/0/1** in both v39 variants on L04;
   its first evidence is preserved after a stop and explicit publication approval.
   There are 96 tested cases across three separately scored packs; 572 verified
   cases awaited v39 testing at that checkpoint. **Subsequently authorized/
   completed:** v40 repairs L04 and passes all three
   32-case packs in both variants. Protocol and freeze were published before
   coding and questions respectively. No historical PASS losses or retries.
   Next Hearth32 among 572 remaining verified cases; full regression and adoption
   remain blocked.
6. Require exposed-regression preservation and separate prospective confirmation
   before integration review. Then qualify navigation/export, memory, performance
   and target browsers. Passing unit tests alone does not authorize adoption.

Update this file whenever development status, decisions, blockers or verified
checks change. Record the date, commit/environment, actual command and result;
label unrun checks and distinguish observations from hypotheses. Do not store
credentials or personal uploaded documents here.
