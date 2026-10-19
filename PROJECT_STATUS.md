# GroundedDesk AI — project status

Last updated: **2026-10-19 (Asia/Kolkata)**.

This is the current development handoff. Preserve historical results in their
original reports; link them here instead of rewriting or rescoring them.

## Baseline and working branch

| Item | Current state |
| --- | --- |
| Repository | https://github.com/arjun9669/GroundedDesk-AI |
| Mac working branch | `mac-work-oct2026` |
| Reviewed upstream baseline | `2c6457c636d636ec56b3c4d1f49a35e66d5aab44` |
| Live application | GroundedDesk 5.6, retrieval build `2026-10-13-r44` |
| Latest isolated candidate | v38; not adopted |
| Release decision | Integration **STOPPED / HOLD** after Vela32 confirmation FAIL |
| Setup changes | Documentation, Node version guidance and a local development server; application and evaluation code unchanged |

The Mac folder was initially an empty Git repository. It is now connected to
`origin`, and the working branch starts at the reviewed upstream baseline. No
remote `mac-work-oct2026` branch existed when checked on October 19. This does
not establish whether a separate local Windows branch or uncommitted work exists.
Preserve and reconcile that work before merging divergent histories.

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
- **October 19:** Mac checkout, cross-platform handoff and setup documentation.

Mac command-line Git can fetch the public repository but currently has no HTTPS
push credentials. Setup publication uses the connected GitHub account. Configure
Git authentication before relying on terminal `git push` on this Mac.

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

## Current retrieval blocker

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

The preserved diagnosis is that v38's admission guard does not prevent inherited
fallback selection from returning clock evidence. The next design review must
consider the complete fallback chain and every requested facet, rather than only
the newest repair. No new implementation or benchmark rerun is approved by this
setup change. See the [release decision](docs/evidence/coverage-v38-r44/release-decision.json).

## Limits and unresolved work

- Intake: 15 documents, 5 MB per file, 75 PDF pages, 180,000 extracted characters
  per document. MiniLM: 72 passages per session. Capacity expansion remains deferred.
- No OCR or reliable reconstruction of tables/columns; highlights are bounded
  location aids, not factual support checks.
- Broader Safari/device, memory, performance and actual Mac-model testing remains.
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
2. Preserve live 5.6/r44, existing functionality, frozen inputs, native rubrics,
   original first scores, failures, blockers and reporting errata.
3. Reconcile any unpublished Windows work before integrating divergent changes.
   Use [the synchronization workflow](docs/DEVELOPMENT.md#synchronize-mac-and-windows).
4. Next proposed engineering task: design the end-to-end refusal/facet contract,
   then freeze a separately reviewed candidate and regression protocol before
   actual-model evaluation. Vela32's first failure remains unchanged.
5. Require exposed-regression preservation and separate prospective confirmation
   before integration review. Then qualify navigation/export, memory, performance
   and target browsers. Passing unit tests alone does not authorize adoption.

Update this file whenever development status, decisions, blockers or verified
checks change. Record the date, commit/environment, actual command and result;
label unrun checks and distinguish observations from hypotheses. Do not store
credentials or personal uploaded documents here.
