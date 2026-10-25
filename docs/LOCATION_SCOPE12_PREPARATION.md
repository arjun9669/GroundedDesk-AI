# LocationScope12 execution preparation

Date: 25 October 2026. Status: **READY for publication verification; NOT RUN**.

[Source-scope decision](LOCATION_SCOPE_DECISION.md) documents explicit location
requirements. [Protocol](../eval/location-scope12/PROTOCOL.md) freezes a separate,
author-aware lexical contract follow-up with twelve cases, six supported and six
unsupported, and twenty-four new fictional text sources. Candidate v50 and its
v49 Comparison implementation remain unchanged. Original FC61 source/question/key
and both original v50 native FAIL rows remain immutable.

## Engineering verification

- 22/22 synthetic harness/static-input tests PASS. No study question is sent to a
  candidate or planner during preparation. Audit controls reject altered identity,
  filename, citation, offsets, excerpt, quote, order, cosine/anchor fields, answer,
  source count, state, contract, duplicate occurrences and excessive quote lengths.
- 1066/1066 full Node unit tests PASS; 28/28 strict bundled Keyword checks PASS.
- Original native gradeAnswer is imported unchanged. Static inputs check source
  hashes, case/key order, filenames, complete source contexts and six/six split.
- Source seal includes transitive local code, data, tests, preparation logs, source
  decision and original FC61/v50 references. Actual Node path/version/binary hash
  are measured by prepare.mjs. No model or browser measurement is claimed.

[Preparation logs](evidence/location-scope12-preparation/targeted.log) are sealed
in [the execution freeze](../eval/location-scope12/freeze-manifest.json). Capture
checks every frozen byte and the actual Node identity, then requires clean main
with HEAD equal to origin/main obtained from GitHub before importing the candidate.
The evidence root must be absent; each new file uses exclusive creation. The first
execution/integrity failure stops the attempt and preserves a partial seal.

## Execution sequence

After publishing this complete freeze and verifying GitHub receipt, use the exact
Node executable recorded in freeze-manifest.json, from the official checkout:

```text
node eval/location-scope12/capture.mjs
node eval/location-scope12/score.mjs
```

These commands are separate: complete raw capture must seal before native scoring.
Capture sends only the original selected pair and exact question to the candidate.
Scoring verifies sealed raw identity/order and literal source provenance, then uses
the unchanged native grader. Native results and the separate author-aware binding
review are immutable first observations; any failure ends this attempt. Never
reuse its directory, change fixtures after outputs or silently retry questions.

Passing all twelve cases establishes this limited contract follow-up only.
Original Fresh64 remains 63 PASS/1 FAIL per variant, overall native FAIL; phase 2
and integration remain **HOLD**, with live 5.6/r44 unchanged. This is not unseen
confirmation, MiniLM/Hybrid validation, Windows/browser qualification or a
replacement acceptance gate. A separate prospective acceptance plan must retain
all original outcomes and address genuinely unseen confirmation and release gates.
