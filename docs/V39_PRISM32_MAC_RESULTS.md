# V39 — first Mac Prism32 partial exposed regression

Date: **2026-10-20 (Asia/Kolkata)**. Phase **1 — broader regression**.
Decision: **Prism32 partial gate PASS; full 771-case gate NOT RUN; adoption HOLD**.
Live application: **5.6 / `2026-10-13-r44`, unchanged**.

The [working 6.0 roadmap](ROADMAP_6_0.md),
[Prism32 protocol](../eval/v39-prism32-regression/PROTOCOL.md), runner, scorer
and freeze were published as
[`49c836f`](https://github.com/arjun9669/GroundedDesk-AI/commit/49c836f725a2bdaed89e7c09dab82ae7854b9344)
before model questions. This is the original now-exposed Prism32 pack, not a
new prospective confirmation. Its first v36 **29/0/3 FAIL** and subsequent
v37/v38 exposed passes remain unchanged.

## First results

| Variant | PASS | PARTIAL | FAIL | Errors | False accepts | False refusals |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Unchanged r44 baseline | 13 | 5 | 14 | 0 | 6 | 0 |
| Isolated v39 fixed | **32** | **0** | **0** | **0** | **0** | **0** |
| Isolated v39 section | **32** | **0** | **0** | **0** | **0** | **0** |
| Paired v38 fixed | 32 | 0 | 0 | 0 | 0 | 0 |
| Paired v38 section | 32 | 0 | 0 | 0 | 0 | 0 |

Both v39 variants pass all **28 actual MiniLM Hybrid** questions (20 supported,
eight unsupported) and **four separate lexical Comparisons**. Every historical
PASS in the original first baseline/v36/paired-v35, v37/v38 and contemporaneous
baseline/v38 is preserved. The fixed/section displayed answers match on all 32
cases; they are alternative index paths, not 64 independent examples.

P04 retains the complete next-service-day and optical-safety-hold rule exactly
at 16:20. P10 retains the full touring-packet inventory; P17 retains loading-record
retention and its weighing-dispute exception. These preserve repairs already
present in v38; they do not retrospectively change the first v36 failures.
All eight unsupported questions refuse with zero citations.

The scorer imports the unchanged frozen Vela32 grading helper because its
automated rules are identical to Prism32's original literal-context/fact-group,
provenance, citation-order and refusal criteria. No criterion or threshold was
relaxed. Assistant review compared all 32 v39 displayed answers with their
original questions and evidence: no additional contradiction was observed and
no automated grade was changed. P04's candidate screenshot was inspected.
Context/group scoring and this review do not establish general entailment.

## Capture and engineering qualification

- Apple Silicon macOS, bundled Node **24.19.0**, installed headless Chrome
  **155.0.8059.80**, viewport 1440×1000. CI targets Node 22.
- Actual local `Xenova/all-MiniLM-L6-v2`, q8 WASM via Transformers.js 3.0.0;
  Qwen disabled. Public model request URLs are recorded in the raw capture.
  Model URLs resolve through `main`; future remote-byte immutability is not proven.
- Four original fictional TXT files, original config/key/rubric/protocol/scorer,
  exact question IDs/order/strings and fifteen historical variant arrays verify.
  All **430 frozen code/input files** pass integrity checks. Original Windows
  configuration paths and the published Vela32 freeze are unchanged.
- Six fixed passages, seven section passages, 56 sentence/body entries. Every
  persisted source vector is finite and 384-dimensional. The instrumented
  production sources match unchanged r44 UI sources for every case.
- Real query, legacy-facet and exact planner-facet vectors/body scores are saved
  before candidate use. P04's two planner facets have separately computed vectors;
  offline recomputation of every facet/body cosine matches within `1e-10`.
- All 32 captures completed before grading. **Zero model-question retries**, no
  capture/candidate errors and no production-code changes.
- Preparation passed **599 unit tests**, strict **28/28 bundled Keyword** checks,
  syntax, original-input/history verification and clean read-only r44 startup.
  These are distinct from the actual-model result above.

The initial preparation failed before any config/manifest write or model question:
`spawnSync git ENOBUFS` while listing all tracked paths. Work stopped and the user
authorized a narrower listing and retry. Recovery selects exactly the same **411**
eligible tracked code/assets, excludes unused evidence paths, and passes all tests
before the first successful freeze. No original check or frozen file was weakened
or overwritten. This infrastructure failure is not a failed or retried model case.

## Preserved evidence and next gate

The [SHA256 manifest](evidence/v39-prism32-mac/manifest.json) seals **258 artifacts**
(24,031,274 bytes), including all first UI/candidate JSON, screenshots, query/
source/facet vectors, recovery ledger, module proof, frozen configuration and
first automated scores. The full evidence is preserved in the repository.

- [First automated scorecard](evidence/v39-prism32-mac/score/automated-scorecard.json)
- [Complete raw capture](evidence/v39-prism32-mac/raw/Prism32/capture.json)
- [P04 pre-candidate facet evidence](evidence/v39-prism32-mac/raw/Prism32/P04-pre-candidate.json)
- [P10 candidate output](evidence/v39-prism32-mac/raw/Prism32/P10-candidate.json)
- [P17 candidate output](evidence/v39-prism32-mac/raw/Prism32/P17-candidate.json)
- [Original first v36 failure](evidence/prism32-v36/automated-scorecard.json)

Vela32 and Prism32 now account for **64 distinct v39-tested cases** across two
separately reported exposed packs. Of the 668 verified inputs, **604 remain
untested with v39**. The other **103** original cases and combined-configuration/
external-adjudication dependencies remain unavailable. This is not a pooled
accuracy claim or completion of phase 1. Next prepare Lumen32 under a new freeze,
then Hearth32, preserving native criteria and every first result. Full regression,
fresh confirmation, integration and product qualification remain separate gates.
