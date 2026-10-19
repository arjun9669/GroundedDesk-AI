# GroundedDesk AI development workflow

The user develops on Mac in India and Windows in Dubai, sharing this repository
through GitHub. These are standing instructions for every development task.

## Branch and synchronization

- Work on the existing `main` branch and publish directly to `origin/main`.
  Do not create a feature branch or require a pull request unless the user asks.
- Inspect `git status`, fetch `origin/main`, and synchronize with a fast-forward
  before editing. Preserve all existing local work and remote commits.
- Never force-push, reset away work, or overwrite conflicting changes. If a
  fast-forward fails, inspect the divergence and ask before conflict resolution.
- Do not remove historical branches as part of synchronization.

## Implement, verify, review, publish

1. Implement only the requested change and preserve existing functionality.
2. Run the relevant tests. If a required check fails, stop and ask the user before
   further implementation, retries, committing or publishing; report the exact
   failure. Do not silently weaken checks or relabel a failure as a pass.
3. Review the full intended diff for errors, regressions, sensitive information,
   credentials and unintended files. Run `git diff --check`.
4. Update `PROJECT_STATUS.md` with progress, decisions, verification and blockers.
5. Stage only intended paths and commit successful changes with the approved Git
   identity. Do not substitute a connected account's default author without
   permission.
6. Push the commit to `origin/main`. Editing and committing are not uploading.
   If authentication, permissions or a rejected push prevents publication, retain
   the local commit and report the blocker; do not claim synchronization.
7. Confirm that GitHub received the commit by checking the remote `main` SHA
   against local HEAD. Report the commit, tests and any remaining limitation.

The user has authorized this normal commit-and-push workflow. Ask before proceeding
with merge conflicts or failing tests, and respect any narrower task instruction.

## Project-specific constraints

- Read `PROJECT_STATUS.md` and `docs/DEVELOPMENT.md` for current architecture,
  setup, actual verification scope and unresolved work.
- Preserve frozen inputs, rubrics, original first results and historical evidence.
  Do not rewrite archived evidence or normalize its bytes to fix hash failures.
- Keep unit/synthetic UI checks distinct from actual MiniLM/Qwen quality studies.
  Existing experimental failures and live-adoption holds remain recorded blockers;
  do not reinterpret them as successful acceptance tests.
- Run the dependency-free unit suite with Node 22+:
  `node --test tests/*.test.mjs` (expand paths explicitly in PowerShell).
  Run `node eval/run.mjs --strict` when retrieval/evaluation behavior is relevant.
- Browser-specific changes require the applicable existing browser checks. See
  `docs/DEVELOPMENT.md`; do not sweep historical confirmation scripts or overwrite
  their first evidence directories.
- Do not commit personal documents, access tokens, generated dependency folders
  or local browser snapshots.
