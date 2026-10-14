# Browser evidence recovery — r44

The future-run capture driver now survives the failure class that lost V9 F06's first output. Production remains 5.6 / retrieval build `2026-10-13-r44`. No retrieval experiment or new benchmark is run here; all historical questions, keys, documents, scores and runners remain intact.

## What changed

- Original question strings stay verbatim. Readiness follows the app's boundary trimming and browser textarea line-ending behavior; internal wording and spaces are preserved.
- Completion requires a newly rendered question node, visible output and an idle button. Repeating the same question cannot accept the previous result.
- Evidence directories must be empty. JSON, screenshots and checkpoints use exclusive writes; checkpoints and ordered JSONL events accumulate rather than overwrite.
- UI evidence is saved before candidate computation. A failure saves DOM answers, source quotations, active input, retrieval/generation modes, build, Comparison evidence, a screenshot, completed case records and progress before browser closure.
- Browser disconnects or screenshot failures are recorded separately without hiding the original error. Snapshots warn against automatic scoring: verify question identity, freshness and actual mode.
- Empty questions are rejected before submission. The new driver requires explicit configuration/output paths; it has no historical corpus defaults and no automatic retry.

The historical V9 runners are preserved. Use `tests/browser-coverage-capture.mjs` for future explicitly configured runs; it currently instruments the unchanged v9/v8 evaluation candidates. The reusable helper is `tests/fixtures/runner-evidence.mjs`. Source files alone enter the app; configuration and expected annotations do not.

## Validation

335/335 unit tests and strict offline evaluation PASS. Installed Chrome **155.0.8059.40** tested four engineering checks in Keyword and in actual **Xenova/all-MiniLM-L6-v2 q8 WASM Hybrid**, Qwen off: whitespace preservation, fresh repeated-question output, answer/screenshot preservation after a deliberately reproduced old timeout, and stale-result rejection. These are synthetic text engineering fixtures using real browser/model behavior, not mock-vector accuracy tests or independent answer accuracy.

The hardened driver also captured two unrelated fixture cases with actual MiniLM. A separate deliberately invalid second input exited with its expected error after one captured case, preserving `capture-partial.json`, checkpoints, original input/error, DOM and screenshot. The visible previous answer was explicitly marked non-fresh and not attributed to the failed case. That process failure is an expected recovery test, not a successful benchmark.

CI adds the capture-recovery engineering test in pinned Chromium/Keyword mode and uploads its evidence even on failure. CI does not silently substitute Keyword for the local actual-MiniLM test. No application code, HTML/CSS, model selection or retrieval threshold changed. V9 candidate/protocol/fresh-pack hashes are reverified.

## Diagnosis of the preserved V9 sample

This is read-only inspection of exposed actual outputs. No questions were replayed or scores recalculated. Gold-string rank presence is a proxy, not a causal proof or semantic entailment judge.

| Case | Existing outcome | Evidence finding |
|---|---|---|
| F06 | BLOCKED/ungraded | No saved first output; remains ungraded |
| F18 | FAIL | Gold appears at recorded rank2; candidate moves outside expected paragraph. Production PASS, both v8/v9 section FAIL |
| F19 | FAIL | Gold at rank1; displayed quotation omits requested fact |
| F20 | FAIL | Gold absent from recorded top five; ranking/coverage investigation needed |
| F21 | FAIL | Gold at rank1; displayed quotation omits requested fact |
| F22 | FAIL | Gold absent from recorded top five; answer is only a Markdown heading |
| C01 | FAIL | Both gold groups at rank1; selected quotation comes from wrong paragraph |
| C04 | PARTIAL | Both gold groups at rank1; second requested fact omitted |

F18 is the new V9 prospective sample's football case, distinct from historical exposed F18. The unchanged V9 sample remains 24 PASS /1 PARTIAL /6 FAIL /1 ungraded. The first-attempt blocker, six failures and partial are not erased by repairing the runner.

## Next experiment boundary

The evidence points to **paragraph selection and compound-facet retrieval**, rather than another local relationship regex. The next candidate should first preserve complete production anchors such as F18, compare separately retrieved compound parts such as C01/C04, and investigate why the F20/F22 evidence is outside recorded top five. Heading-only output must not be treated as factual support; changing it to a refusal would still be a false refusal for a supported case and cannot count as a fix.

No next retrieval candidate is implemented or frozen in this runner-repair change. Its design and numerical rules need a separate freeze before any regression outputs; the same exposed sets remain in-sample. A future qualified F06 rerun must not overwrite its ungraded first attempt or be called a new first look. Production stays r44 while the release criteria remain unmet. No paid dependency or service introduced.

## Evidence

The first PR CI attempt (38571015057) failed: pinned Chromium handled raw CR/LF input differently from installed Chrome, and artifact upload rejected a relative parent-directory path. The follow-up explicitly submits canonical textarea line endings while retaining the untouched raw question in evidence, and uploads from the absolute runner temporary directory. The first local follow-up attempts hit a stopped HTTP server; their connection-error logs are retained separately. After restarting the server, both Keyword and actual MiniLM engineering checks passed again in fresh evidence directories, with all 335 unit tests and strict offline evaluation passing. These retries are engineering validation, not repeated benchmark sampling. Original captures and V9 scores remain unchanged.

[Recovery checks and exact captures](./evidence/runner-recovery-r44/) · [machine-readable validation](./evidence/runner-recovery-r44/validation.json) · [full per-case diagnosis](./evidence/runner-recovery-r44/runner-hardening-diagnosis/DIAGNOSIS.md) · [diagnosis JSON](./evidence/runner-recovery-r44/runner-hardening-diagnosis/v9-diagnosis.json). Public diagnostic quotations are attributed under the existing SQuAD/Wikipedia share-alike notices. Engineering documents contain fictional, non-sensitive fixture text.
