# V46 regression execution freeze

Prepared 24 October 2026 for protocol **V46-REGRESSION-732-20261024**.
State: **execution tooling and neutral preflight prepared; study NOT RUN**.
The immutable [study protocol](../v46-regression-study/PROTOCOL.md) and original
native criteria remain authoritative. No candidate source, question or rubric changed.

## Actual pre-question environment

Successful neutral installed-Chrome preflight used the three bundled documents
and only `GroundedDesk environment preflight.` as an embedding input. No study
source was uploaded and no study question/planner/candidate was invoked.
Observed: Node24.22.1, Chrome155.0.8059.86, macOS darwin/arm64, Transformers.js3.0.0,
Xenova/all-MiniLM-L6-v2 q8 WASM, finite384D, Qwen off / extractive UI, live r44.
Six downloaded assets have byte counts, SHA256s and sanitized request/redirect
aliases. Missing/evicted/changed bytes remain failures. Node/Chrome executables,
Chrome engine and actual Playwright/core package trees are measured by preparation.

The new execution config/freeze under
`docs/evidence/v46-regression-732-mac/execution/` records these actual measurements,
source hashes, original scope and all transitive served local module identities.
The neutral preflight is not a model-quality result or Windows qualification.

## New tooling and preserved grading

- `integrity.mjs`: original scope/key/config/hash checks; exact v46/v43 identity;
  canonical paths, duplicate/tampered/symlink-escape checks; study approval guard;
  clean main and remote HEAD receipt before capture.
- `module-graph.mjs`: transitive static local import graph. Browser proof fetches
  dependency bytes without executing `app.mjs` a second time. Candidate/pair/helper
  are separately imported and checked before questions. Runtime CDN bytes have
  their own neutral/capture recorder and must match exactly.
- `tests/browser-v46-regression.mjs`: preserves the established UI-first capture,
  actual independent v46/v43 clock-facet queries, original body vectors, fixed/
  section labels, original Comparison pairs and write-once failure collection.
- `score.mjs`: imports original native grade/preservation/family functions unchanged;
  adds the accepted combined v43 histories within each variant. Fresh64 uses the
  original gradeAnswer, independently requiring64/64 in each v46 variant. Manual
  review stays PENDING; automated success cannot become final acceptance alone.
- `audit.mjs`: independent384D nonzero/finite arithmetic, own planner-facet alignment,
  body/source identity, selected literal quote/anchor bounds, citation numbering
  and complete pack-qualified UI receipt/order checks. The pre-existing arithmetic
  audit is reused unchanged before the additional identity checks.
- `seal.mjs`: exclusively seals complete raw files before scoring. Native scores
  and a separate review queue are written only into a new score directory.
- `equivalence.mjs`: grades archived outputs only; reproduces3,660 original native
  outcomes/false-acceptance/refusal flags across20 packs and5 labels. It never calls
  a candidate, planner or model and is not a saved-vector candidate replay.

Synthetic adapter checks pass11/11; full Node suite859/859 and strict Keyword28/28
pass. Original C04/native adapter preservation controls remain in the full suite.
Independent figures and original outcome labels are retained; no pooled accuracy.

## Exclusive stage paths and approval

The reserved study root was created exactly once at the start of neutral
preparation; only `preflight/` and `execution/` exist before approval. In the protocol,
“must not exist at execution start” applies to that first study-root allocation;
raw capture begins later and requires `raw/` to be absent. No raw, score, audit or
review result placeholder is created in preparation. This staging permits the
required pre-question publication of preflight/execution bytes inside the root.
Existing first failures and all historical freezes remain untouched.

Human approval is still required before running cases. `STUDY_APPROVAL` must equal
`V46-REGRESSION-732-20261024`, but setting a token is a technical guard, not a
substitute for the user's explicit approval. The runner also requires clean main,
local/remote HEAD equality, matching config/freeze, actual toolchain and served/
network assets before cases. A runtime change stops before questions and needs a
separate pre-question amendment; never edit a published freeze after observations.

After approval, capture once with explicit variables:

```sh
STUDY_APPROVAL=V46-REGRESSION-732-20261024 \
RUN_CONFIG=docs/evidence/v46-regression-732-mac/execution/run-config.json \
EVIDENCE_DIR=docs/evidence/v46-regression-732-mac/raw \
TEST_URL=http://127.0.0.1:8767/ node tests/browser-v46-regression.mjs
```

Only after complete capture, seal first raw evidence:

```sh
EVIDENCE_DIR=docs/evidence/v46-regression-732-mac/raw \
node eval/v46-regression-execution/seal.mjs
```

Only after that seal, grade/audit once:

```sh
RUN_CONFIG=docs/evidence/v46-regression-732-mac/execution/run-config.json \
EVIDENCE_DIR=docs/evidence/v46-regression-732-mac/raw \
SCORE_DIR=docs/evidence/v46-regression-732-mac/score \
node eval/v46-regression-execution/score.mjs
```

Use the same frozen Node executable, not a different PATH runtime. Finish a separate
manual binding/contradiction review of all Fresh64 variants and changed/ambiguous
historical outputs before any repair gate acceptance. The generated queue includes
all candidate rows so it can cover every required review. A missing review remains
HOLD; native failures remain FAIL. Review cannot silently alter native scores.

Any required engineering, execution, integrity, native gate or review failure
stops work for user approval before fixes, retries or publishing the failed study.
Preserve failed evidence with a new attempt root on any later approved retry.
No case retries, tuning, live integration or unseen confirmation is authorized here.
Original Fresh64 remains FAIL; phase2 and live integration remain HOLD.
