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

Public fetches do not require authentication, but terminal pushes do. The October
19 Mac setup has no command-line HTTPS credentials; initial publication uses the
connected GitHub account. Before terminal pushes, sign in through a Git credential
manager or GitHub CLI (`gh auth login`, then `gh auth setup-git` if GitHub CLI is
installed). Do not put access tokens in remote URLs or committed files.

Before first synchronizing Windows, inspect its current branch and local changes.
Commit wanted work on its existing branch or preserve it separately before
switching. The new Mac branch does not prove Windows has no unpublished work.
If Windows already has a different `mac-work-oct2026`, compare it with GitHub
before setting tracking or pulling; do not overwrite it.

For an existing checkout where the intended branch is not yet local:

```sh
git status --short --branch
git fetch origin
git switch --track origin/mac-work-oct2026
```

At the start of a session on either machine, with a clean working tree:

```sh
git switch mac-work-oct2026
git pull --ff-only
```

After work, update `PROJECT_STATUS.md`, review the diff, stage intended paths,
commit and push:

```sh
git diff --check
git diff
git status --short
git add PROJECT_STATUS.md
# Also stage each intended source/documentation path explicitly.
git commit -m "Describe the completed change"
git push
```

Pull on the other machine before continuing. A failed fast-forward means the
histories need review; preserve both sets of commits and resolve deliberately.
Do not force-push or reset away existing work. Configure author identity locally
per checkout with `git config --local user.name` and `user.email` as needed.

Preserve `.gitattributes` and frozen evidence bytes. Review `git config --get
core.autocrlf` on Windows before changing newline behavior. Current attributes
do not explicitly protect every newer frozen pack; do not run bulk normalization
or resave evidence to make a hash mismatch disappear.

CI runs on pull requests and pushes to `main`; a work-branch push alone does not
trigger the existing push workflow. Pages deploys only after successful main CI.
Use a pull request for integration and verify its checks before merging.
