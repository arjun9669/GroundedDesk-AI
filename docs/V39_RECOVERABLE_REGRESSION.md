# V39 partial regression on recoverable inputs

Prepared October 20, 2026. Live 5.6/r44 is unchanged; integration remains HOLD.

**Completed follow-up:** the first actual-model Vela32 capture passed **32/32 in
both v39 variants**, with zero historical PASS loss. See the
[results and complete preserved evidence](V39_VELA32_MAC_RESULTS.md). The
preparation checkpoint below is retained as the state before questions; the
full 771-case regression and fresh confirmation remain NOT RUN. Do not rerun
over this first capture or freeze.

The original 739-case configuration was generated outside Git under
`coverage-v38-inputs`. Its expected SHA256 is recorded in the historical v38
freeze, but the configuration, input-integrity manifest and complete referenced
source pack were not found in the searched Mac folders or path history. The
Windows machine is unavailable. Do not invent a replacement and claim the
original 739-case gate.

The user authorized continuing with recoverable inputs. This preparation selects
the complete original Vela32 pack: **32 now-exposed questions, 28 actual MiniLM
Hybrid and four separate lexical Comparisons**. Other historical packs have not
been qualified in this task. Original source hashes, questions/key, rubric and
Windows configuration bytes are preserved. A new configuration maps source
locations to repository-relative paths, without changing the old configuration.

See the [new protocol](../eval/v39-recoverable-regression/PROTOCOL.md),
[runner](../tests/browser-vela32-v39.mjs),
[integrity checks](../eval/v39-recoverable-regression/integrity.mjs) and
[scorer](../eval/v39-recoverable-regression/score.mjs).

## Capture contract

The runner first verifies frozen files and the current browser/platform/Node
environment. It captures original r44 UI answers before isolated v39 fixed and
section outputs, paired with unchanged v38. Hybrid requires actual local MiniLM
q8 WASM and Qwen off. Compare remains lexical.

Source extraction includes actual fixed/section/sentence/body vectors. Before
candidate invocation, each Hybrid case saves its actual whole-query vector,
legacy `Also,` facet vectors and the planner's exact self-contained facet queries,
separately computed vectors and corresponding body cosines. The latter are passed
only through v39's `clockFacetEvidence`; v38 retains its original options.
Neither mock scores nor archived answers can supply a model capture.

Evidence is written to a new empty directory with exclusive writes, including
per-case UI/candidate JSON, screenshots, pre-candidate vectors and a recovery
ledger. Captures are ungraded until all 32 finish. Any execution failure retains
partial ungraded evidence and stops the run; there is no automatic retry.

The scorer preserves the original automated Vela32 criteria. It also checks no
loss of any historical baseline/v38/paired-v37 PASS or contemporaneous baseline/
v38 PASS. It writes each variant separately and fails unless both v39 variants
pass all 32 without PASS loss. The historical first v38 **30/0/2 FAIL** remains
unchanged. Context/group scoring is a proxy and requires contradiction review
even after an automated pass.

## Engineering verification before freeze

- Bundled Node **24.19.0**: **596 unit tests PASS**, zero failed/skipped, including
  four new integrity/scoring controls and all earlier 592 tests.
- Strict bundled Keyword evaluation: **28/28 PASS**, zero false accepts or
  citation provenance errors. This is not a model result.
- New runner/preparer syntax: PASS; integrity/scorer are imported by unit tests.
- Installed headless Chrome **155.0.8059.80**: read-only startup PASS, three sample
  documents, unchanged r44 footer, zero failed requests or page errors.
- Actual-model capture and automated model gate: **not run at preparation time**.

## Operation

The frozen configuration is specific to its recorded environment. A different
machine/browser or later code change requires a new explicit freeze in a new
location, preserving this first freeze. Do not rerun the preparer over its output.
All commands run from the official checkout. Set Node on PATH and install the
documented Playwright dependency locally; generated dependencies stay untracked.
Keep `python3 tools/serve_local.py --port 8767` running in another terminal.

Preparation (already performed for the committed freeze):

```sh
PREFLIGHT=/absolute/path/to/startup/result.json node eval/v39-recoverable-regression/prepare.mjs
```

Capture, once, with a new directory:

```sh
RUN_CONFIG=eval/v39-recoverable-regression/run-config.json \
EVIDENCE_DIR=/absolute/path/to/new-capture \
TEST_URL=http://127.0.0.1:8767/ node tests/browser-vela32-v39.mjs
```

Only after COMPLETE capture, grade once into another new directory:

```sh
RUN_CONFIG=eval/v39-recoverable-regression/run-config.json \
EVIDENCE_DIR=/absolute/path/to/new-capture \
SCORE_DIR=/absolute/path/to/new-score node eval/v39-recoverable-regression/score.mjs
```

Stop and ask after any required failure. A partial-regression pass cannot clear
the full **771-case** gate, create fresh confirmation, or authorize live adoption.
Recovering the missing 739-case inputs remains outstanding.
