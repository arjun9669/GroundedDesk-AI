# GroundedDesk AI — project status

Last updated: **2026-10-20 (Asia/Kolkata)**.

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
| Latest isolated candidate | v39 Vela32 partial actual-model gate: 32/32 PASS in both variants; full 771-case gate NOT RUN; not adopted |
| Release decision | Integration **STOPPED / HOLD** after Vela32 confirmation FAIL |
| Current change | Input inventory verifies 19 packs / 668 cases; 636 additional cases await v39 testing, 103 original cases unavailable; live r44 unchanged |

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
  under precommitted protocol `c73a8fe`; no actual-model evaluation or live adoption.

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
   configuration remain unavailable. Next prepare Prism32 under a new freeze,
   then extend with native criteria. Full regression and live adoption remain blocked.
6. Require exposed-regression preservation and separate prospective confirmation
   before integration review. Then qualify navigation/export, memory, performance
   and target browsers. Passing unit tests alone does not authorize adoption.

Update this file whenever development status, decisions, blockers or verified
checks change. Record the date, commit/environment, actual command and result;
label unrun checks and distinguish observations from hypotheses. Do not store
credentials or personal uploaded documents here.
