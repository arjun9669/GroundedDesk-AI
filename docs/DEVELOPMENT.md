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
Current engineering suite: 630 unit tests; strict bundled Keyword suite: 28 cases.
Use the [v40 preparation instructions](COVERAGE_V40_PREPARATION.md) to understand
its frozen run; never execute into its completed first evidence directories.
Next work requires a new pack-specific freeze, starting with Hearth32. Read
PROJECT_STATUS.md for the missing-input gap and remaining release gates.
