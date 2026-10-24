# Development on macOS and Windows

Current project state and decisions: [PROJECT_STATUS.md](../PROJECT_STATUS.md).
The application is static; it needs no frontend build, backend or API key.

## Prerequisites

- Git.
- Node.js **22** to match CI; `.nvmrc` records that major version. The October 19
  Mac audit used bundled Node 24.19.0, separately identified in project status.
- Python **3.10+** for local serving and historical Python capture tools.
- A current Chromium browser for automated smoke tests. Safari requires separate
  manual validation; WebGPU availability must be checked for optional Qwen.

Check the executables before running commands:

```sh
git --version
node --version
python3 --version
```

On Windows use `py -3 --version` if `python3` is unavailable. If Node is missing
from PATH, install/configure a Node 22 runtime before using the Node commands.
With an existing nvm installation on macOS, `nvm install` and `nvm use` read
`.nvmrc`; `.nvmrc` itself does not install Node.

## Serve the app

From the repository root on macOS:

```sh
python3 tools/serve_local.py
```

Windows PowerShell:

```powershell
py -3 tools/serve_local.py
```

Open http://127.0.0.1:8765/. Stop with Ctrl+C. Use `--port 8766` if needed.
The server binds to loopback, serves the repository root regardless of the
terminal's current directory, and uses a larger connection queue for parallel
module requests. It is a development server; existing hosting is unchanged.

Do not open `index.html` as a `file://` URL: module and sample fetching require
HTTP. If the footer stays at “loading” with zero samples, inspect browser console
and failed requests before diagnosing retrieval. A working startup shows r44
and three bundled documents.

## Unit tests and bundled evaluation

macOS/zsh or Windows Git Bash:

```sh
node --test tests/*.test.mjs
node eval/run.mjs --strict
```

Windows PowerShell (explicitly expand test paths):

```powershell
$testFiles = Get-ChildItem tests -Filter '*.test.mjs' | ForEach-Object { $_.FullName }
node --test @testFiles
node eval/run.mjs --strict
```

The reviewed baseline has 573 unit tests. The strict bundled evaluation uses
28 curated Keyword questions; it does not test actual MiniLM/Qwen accuracy.
Clone the full tree for verification: newer unit tests read historical JSON
fixtures under `docs/evidence/`. An incomplete sparse checkout can cause ENOENT
failures even when application code is intact.

An optional coverage run uses `--experimental-test-coverage` with the same explicit
test-file list. Its coverage excludes browser-only execution.

## Synthetic browser tests

Use npm supplied with your chosen Node installation. Install the exact CI tools
locally; these commands do not change dependency manifests or lockfiles:

```sh
npm install --no-save --no-package-lock playwright@1.56.1 pdfjs-dist@4.10.38
npx playwright install chromium
```

Keep the local server running in one terminal. In a second terminal run:

```sh
node tests/browser-policy-smoke.mjs
node tests/browser-pdf-smoke.mjs
node tests/browser-research-pages-smoke.mjs
node tests/browser-pdf-reliability.mjs
node tests/browser-pdf-highlight.mjs
node tests/browser-workspace-ui.mjs
node tests/browser-document-library.mjs
node tests/browser-ask-scope.mjs
node tests/browser-local-workspace.mjs
node tests/browser-document-readiness.mjs
```

The evidence-ledger recovery check needs a new output directory. On macOS:

```sh
EVIDENCE_DIR="$(mktemp -d)/runner-evidence" node tests/browser-runner-evidence.mjs
```

On PowerShell:

```powershell
$env:EVIDENCE_DIR = Join-Path ([System.IO.Path]::GetTempPath()) ("groundeddesk-" + [guid]::NewGuid())
node tests/browser-runner-evidence.mjs
Remove-Item Env:EVIDENCE_DIR
```

Optional variables: `TEST_URL` selects a different server URL; `BROWSER_CHANNEL=chrome`
selects installed Chrome; `EVIDENCE_DIR` saves observations outside historical
archives. In PowerShell set variables with `$env:BROWSER_CHANNEL = 'chrome'`.
Keep `TEST_MINILM` unset for ordinary synthetic smoke tests.

Do not run historical `browser-coverage-v*` or confirmation scripts as a generic
test sweep. They require their frozen configuration, original source/key bytes,
actual-model prerequisites and new evidence directories. Historical first results
must never be overwritten. See [evaluation protocol](EVALUATION_PROTOCOL.md).

## Synchronize Mac and Windows

The shared source is https://github.com/arjun9669/GroundedDesk-AI. Browser
snapshots, model caches, local environment settings and uncommitted files are not
transferred by GitHub.

The official Mac checkout is `/Users/arjunkumar/Projects/GroundedDesk-AI`. The
earlier chat workspace is a separate repository, not a linked worktree. Verify
`git rev-parse --show-toplevel` before editing, committing or pushing; use the
official checkout for Mac development.

Public fetches do not require authentication, but terminal pushes do. Initial
setup used the connected GitHub account because terminal Git in the chat checkout
could not authenticate. The official checkout subsequently pushed `b0d4224`
successfully. For a checkout without credentials, sign in through a Git credential
manager or GitHub CLI (`gh auth login`, then `gh auth setup-git` if installed).
Do not put access tokens in remote URLs or committed files.

Use the existing **`main`** branch on both machines. The initial Mac setup branch
was merged through PR #111; it is retained as history, not the active workflow.
Standing agent instructions are in [AGENTS.md](../AGENTS.md).

Before first synchronizing Windows, inspect its current branch and local changes.
Commit wanted work on its existing branch or preserve it separately before
switching. Do not overwrite an existing divergent `main` or unpublished work.

At the start of every task, inspect the working tree first. If it contains work,
preserve and account for that work before switching branches or pulling. With a
clean working tree:

```sh
git status --short --branch
git fetch origin main
git switch main
git pull --ff-only origin main
```

If an existing checkout has no local `main` yet, create its tracking checkout
with `git switch --track origin/main`, then use the same workflow. Do not create
a new feature branch for routine tasks.

Implement the requested change while preserving existing functionality. Run the
relevant checks from this guide. **If a required test fails, stop and ask the
user before proceeding.** Do not silently retry, alter grading or commit failures.

Update `PROJECT_STATUS.md`, then review the changes for errors, regressions,
credentials, sensitive document content and unintended files:

```sh
git diff --check
git diff
git status --short
```

Stage the intended paths explicitly, review the staged diff, commit successful
changes using the approved identity, and push directly to `origin/main`:

```sh
git add PROJECT_STATUS.md
# Also stage each intended source/documentation path explicitly.
git diff --cached --check
git diff --cached
git commit -m "Describe the completed change"
git push origin main
```

**Verify upload; an edited file or local commit is not synchronization.** Compare
the local commit SHA with the SHA returned for GitHub's `refs/heads/main`:

```sh
git rev-parse HEAD
git ls-remote --heads origin main
```

They should match immediately after a successful push. If another machine has
advanced `main` in the meantime, fetch and inspect the remote history to confirm
the published commit is an ancestor; do not overwrite the newer commit.

Pull on the other machine before continuing, and avoid simultaneous editing of
the same work on both machines. A rejected push or failed fast-forward requires
history inspection. **Ask the user before resolving conflicts. Never force-push,
reset away work or overwrite another machine's changes.** If authentication or
permissions prevent pushing, retain the local commit and explicitly report that
GitHub has not received it. Do not replace the approved commit identity with a
connector's account-default identity without permission.

Configure author identity locally per checkout with `git config --local user.name`
and `user.email` as needed. Historical branches need not be deleted.

Preserve `.gitattributes` and frozen evidence bytes. Review `git config --get
core.autocrlf` on Windows before changing newline behavior. Current attributes
do not explicitly protect every newer frozen pack; do not run bulk normalization
or resave evidence to make a hash mismatch disappear.

Every direct push to `main` triggers the existing CI workflow. Pages deploys only
after successful main CI. Confirm receipt separately from CI/deployment completion;
do not claim checks passed while they are still running. If CI fails, stop and ask
before further changes. A pull request is not required for the user's current
direct-to-main workflow.

## Latest isolated v40 checkpoint

The [first Mac three-pack result](V40_THREE_PACK_MAC_RESULTS.md) records a native
PASS on Vela32, Prism32 and Lumen32, separately 32/32 for both v40 variants. These
are exposed studies (84 actual MiniLM Hybrid / 12 lexical Comparisons), not a live
upgrade or fresh confirmation. All earlier first failures remain recorded.
Current engineering suite: 633 unit tests; strict bundled Keyword suite: 28 cases.
Use the [v40 preparation instructions](COVERAGE_V40_PREPARATION.md) to understand
its frozen run; never execute into its completed first evidence directories.
The [subsequent Hearth32 first run](V40_HEARTH32_MAC_RESULTS.md) FAILS 31/0/1 in
both v40 variants on H04; its first evidence and all older results remain unchanged.
The [investigation](HEARTH32_V40_FAILURE_REVIEW.md) proposes a separate v41
protocol/four-pack revalidation, with no implementation or rerun in publication
work. Read PROJECT_STATUS.md for the hold, missing-input gap and release gates.

## Latest isolated v41 checkpoint

The [first four-pack v41 result](V41_FOUR_PACK_MAC_RESULTS.md) passes four native
32-case gates in both variants, including repaired H04. The first v40 Hearth32
FAIL remains preserved. Current engineering suite: 667 unit tests; strict Keyword
suite: 28 cases. [Preparation](COVERAGE_V41_PREPARATION.md) records the 500-file
freeze; never reuse its completed evidence directories. Live 5.6/r44 is unchanged.
Next prepare/freeze Morrow32; 540 verified cases remain untested with v41 and 103
originals unavailable. Phase 1, full regression and later release gates remain open.

## Latest Morrow32 v41 checkpoint

[First Morrow32](V41_MORROW32_MAC_RESULTS.md) FAILS 31/0/1 in both v41 variants
on M04. The prior four-pack passes and all first failures remain preserved.
Current engineering suite: 670 unit tests; strict Keyword: 28 cases. Original 469-file
freeze/input/history and publication integrity checks PASS, separate from the
failed model gate. [Investigation](MORROW32_V41_FAILURE_REVIEW.md) proposes a
separate structured v42 protocol and five-pack revalidation. No candidate fix or
model rerun in this publication task. 508 verified cases and 103 unavailable originals
remain; phase 1 and live-adoption holds stay in place. Read PROJECT_STATUS.md.

## Latest isolated v42 checkpoint

[First five-pack v42 results](V42_FIVE_PACK_MAC_RESULTS.md) pass 32/32 per pack in
both variants, repairing M04 while preserving its failed v41 first evidence.
Current engineering suite: 710 unit tests; strict Keyword: 28 cases; 529-file freeze
verified. [Preparation](COVERAGE_V42_PREPARATION.md) records exact scope/environment;
never reuse completed evidence directories. Live 5.6/r44 remains unchanged.

The preimplementation inventory identified four other unresolved clock forms
(RQ02,C09,B14,F14) deliberately deferred from this study. Review/freeze their
request/source grammar and native criteria before expanding affected packs.
508 verified cases / 14 packs and 103 missing originals remain; phase 1, full regression,
fresh confirmation and integration/product/release gates stay open.

## V43 nine-pack preparation checkpoint

[Preparation](COVERAGE_V43_PREPARATION.md) records the isolated deferred-clock
implementation and609-file freeze.764 unit/28 Keyword checks PASS following the
user-approved review-annotation validator correction; the first762/1 unit result
and both original scorecards remain preserved. Model study NOT RUN at this
checkpoint. Native28/32-case rubrics stay separate; never reuse the completed
historical evidence directories. Read PROJECT_STATUS.md for current holds.

## V43 first nine-pack model result

[First results](V43_NINE_PACK_MAC_RESULTS.md): eight 32-case native families each
32/32 and RetrievalQuality28 28/28 PASS in both variants, no historical PASS loss.
252 actual MiniLM Hybrid and 32 lexical Comparisons; Qwen off. Four target forms
restore historical v38 outputs under structured scope. 764 unit/28 Keyword checks
and 609-file freeze PASS. Never reuse completed first evidence directories.
384 verified cases/10 families and 103 unavailable originals remain; phase 1, fresh
confirmation and adoption holds stay open. Live5.6/r44 is unchanged.

## V43 all-available combined preparation

[Preparation](V43_ALL_AVAILABLE_PREPARATION.md) freezes one668-case run across all19
available families, with unchanged v43/native scoring and paired v42.771 unit/28
Keyword checks pass after an approved duplicate-reference validator correction;
827 files frozen. Known public failures stay visible, changed manual Cobalt output
requires review. Model study NOT RUN at this checkpoint.103 missing originals
and phase1/full-regression/adoption holds remain; never reuse first evidence paths.

## V43 first combined available-input result

[Combined results](V43_ALL_AVAILABLE_MAC_RESULTS.md): all 668 verified original cases
were captured once across 19 native families (628 Hybrid/40 lexical Comparisons),
with unchanged v43 and paired v42. All 19 native regression gates PASS; five fixed/
three section public-data FAIL rows remain unchanged. No prior PASS loss or retries.
771 units/28 Keyword and 827-file freeze PASS. No verified available family remains
untested in this scope, but 103 originals/combined config and the phase 1 acceptance
decision remain unresolved. Live 5.6/r44 and fresh-confirmation/adoption holds remain.

## Revised phase 1 acceptance and phase 2 input preparation

[Acceptance decision](PHASE1_REVISED_ACCEPTANCE.md) records explicit approval of
the668-case phase1 scope and successful accepted-evidence CI.103 original cases
remain excluded/untested; full771 gate NOT RUN and known public failures retained.
Current phase:2, preparation. [Fresh64](../eval/phase2-fresh64/PROTOCOL.md) freezes
8 new fictional TXT sources and64 cases (40 supported Hybrid,16 unsupported Hybrid,
8 lexical Comparisons), with strict64/64-per-variant prospective gates. No model/
candidate/planner probe or fresh score exists; do not consume the set during unit
checks. Input validation and771 unit/28 Keyword checks PASS. Prepare a separate
immutable execution freeze before questions. Existing v43/live5.6/r44 and all
historical evidence stay unchanged; integration/product/release gates remain open.

## Fresh64 execution preparation — 24 October 2026

The [execution plan](../eval/phase2-fresh64/EXECUTION_PLAN.md), 509-file freeze and
[pre-question environment amendment](../eval/phase2-fresh64/ENVIRONMENT_AMENDMENT.md)
record the new capture/scorer/audit without modifying v43/r44 or original inputs.
Two neutral dependency-hash preflight failures remain preserved; approved fixes
reserve Chrome response-body buffers and recognize original ONNX request paths
through redirects while retaining every hash. Successful neutral preflight: six
assets; Chrome 155.0.8059.86, Node 24.22.1, Playwright 1.62.1. 777 unit/28 Keyword
checks PASS. These are preparation checks, not Fresh64 quality results. Publish
and verify the freeze before capture; use new exclusive raw/score paths and keep
the first results. Never rerun a question or change a rubric to repair a failure.

## Fresh64 first failure and offline publication review — 24 October 2026

[First results](PHASE2_FRESH64_FIRST_RESULTS.md) preserve 52 PASS/4 PARTIAL/8 FAIL
in each v43 variant from one 64-case capture. All 56 Hybrid submissions and eight
lexical Comparisons completed without retries. The first audit passed 5,402 body/
facet cosine checks. Original 512-artifact and 506-raw-artifact seals are unchanged;
a separate 128-row binding review confirms native grades. Its new seal preserves
review separately from the first scorer's PENDING checkpoint. User authorization
covers review/documentation/publication only; no candidate/model/scorer rerun or
source/key/rubric edits were made. Phase 2 is not accepted; Fresh64 is now exposed.
Use a separate approved repair task before any implementation/regression replay,
then agree a new prospective pack for confirmation. Live r44 remains unchanged.

## V44 Stage A engineering — 24 October 2026

[Report](V44_STAGE_A_ENGINEERING.md) and [protocol](../eval/answer-completeness-v44/PROTOCOL.md)
record isolated approval/reference contracts with 21 new synthetic tests. Full
798 unit/28 strict Keyword checks PASS. Existing v43 clock and lexical Comparison
exports remain unchanged; r44 imports no v44 code. Stage B/C and actual-model
668/Fresh64 preservation are NOT RUN. Do not point a historical frozen runner at
v44 or overwrite its first output: a new execution protocol/module/environment
freeze must precede any separately authorized model study. No quality or live
adoption claim follows from these engineering tests.

## V45 Stage B engineering — 24 October 2026

[Report](V45_STAGE_B_ENGINEERING.md) and [protocol](../eval/answer-completeness-v45/PROTOCOL.md)
record minimum, retention and ordinal-event contracts importing unchanged v44.
First targeted 22/1 failure is preserved; the approved sole-document scope fix
retains the original assertion and appends three controls. 26 targeted/824 full
unit and 28 Keyword checks PASS. Unprefixed record fallback is an explicit grammar,
not general entity recognition. Original Node failure-log whitespace is retained
with a single exact-path blank-at-eol exception; source/test checks remain intact.
No model/scorer/frozen-case replay occurred. Stage C and 668/Fresh64 model
revalidation need separate scope and a new pre-published execution freeze. Live
r44 remains unchanged; existing frozen v43 model runners must not be repurposed.


## V46 Stage C engineering checkpoint

The [v46 protocol](../eval/answer-completeness-v46/PROTOCOL.md) and
[engineering report](V46_STAGE_C_ENGINEERING.md) describe the isolated lexical
Comparison contracts, exact grammar and limitations. Ask/helpers remain v45;
other Comparison families delegate unchanged. First-run targeted checks pass
24/24; full Node suite passes 848/848 and strict Keyword passes 28/28.
[Evidence](evidence/v46-stage-c-engineering/manifest.json) seals passing logs and
final source/test/report hashes. No model or Fresh64 replay occurred. Next prepare
one published regression execution freeze for accepted 668 plus exposed Fresh64,
paired v43 diagnostics and native/manual audits; study execution needs approval.
The original confirmation FAIL and live integration HOLD remain unchanged.


## V46 regression protocol preparation

The [732-case protocol preparation](V46_REGRESSION_PREPARATION.md) pins the accepted
668 plus exposed Fresh64 scope. Its [protocol freeze](../eval/v46-regression-study/protocol-freeze-manifest.json)
is a source/input/reference freeze, not an executable study config. Do not point
historical v43/v42 runners at it. V46/v43 adapters, synthetic/equivalence checks,
neutral actual-environment/model preflight and a published complete execution
freeze must precede study approval and any original question submission. No model
or browser execution occurred in this preparation; original evidence stays intact.
