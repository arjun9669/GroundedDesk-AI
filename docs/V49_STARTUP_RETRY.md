# V49 startup failure and second-attempt freeze

Date:25 October2026. Protocol: V49-REGRESSION-732-20261025.
The user’s [standing authorization](DEVELOPMENT_AUTHORIZATION.md) permits correction
and a new prospective attempt without another permission prompt.

The first capture attempt, frozen/published in cae9a06f, stopped during startup
before module proof, source upload, model initialization or any study question.
The document count stayed0 and the build stayed loading. Its raw failure/DOM/PNG,
config/freeze and log remain unchanged under docs/evidence/v49-regression-732-mac/.
[First-startup seal](evidence/v49-regression-732-mac/startup-failure-manifest.json)
pins all8 failure files. It is not a complete capture or model-quality result.

A separate neutral startup-only probe with the same context reproduced missing
local modules with net::ERR_CONNECTION_RESET and no page exception. This shows a
local file-serving transport failure; it does not establish the lower-level cause.
[Diagnostic evidence](evidence/v49-startup-diagnosis/neutral-startup-probe.json)
preserves those observations. No study/model queries were used for diagnosis.

A loopback-only Node static server now preserves exact file bytes/MIME with
backlog512 and no per-request output stream. Synthetic48-request concurrency and
escaping-symlink controls pass. Its first3-group test was2 PASS/1 FAIL because macOS
/var temp paths resolve through /private/var; canonicalizing both sides corrects
the containment check. That failure/source/test/log is preserved separately under
[server-first-engineering-failure](evidence/v49-startup-diagnosis/server-first-engineering-failure/manifest.json).
Original assertions are unchanged. Corrected3/3 targeted,997/997 full units and
28/28 strict Keyword PASS. No production/candidate/native-grade code changed.

Attempt2 uses new isolated root docs/evidence/v49-regression-732-mac-attempt2/
and explicit http://127.0.0.1:8768/ backed by the new server. Separate runner/
integrity/scorer/seal/prepare adapters retain the same source selection, pre-candidate
persistence, own-query audit and original native exports; only attempt paths,
frozen server identity/URL and startup diagnostics differ. No original attempt is
overwritten or retried in place. No question was submitted in attempt1.

Fresh neutral attempt2 preflight PASS: Chrome155.0.8059.86,Node24.22.1,darwin/arm64,
MiniLM q8 WASM finite384D, Qwen off; six downloaded assets and64 served modules
measured again. [New execution freeze](evidence/v49-regression-732-mac-attempt2/execution/freeze-manifest.json)
pins original protocol/candidate/native references, new server/adapters/tests,
current environment/assets and first-failure identity before questions.
Publish and verify clean remote main before capture under standing authorization.
Seal raw before native scoring and separate review. First failures, native gates,
103 exclusions/full771 NOT RUN, phase2/integration HOLD and live r44 remain unchanged.
