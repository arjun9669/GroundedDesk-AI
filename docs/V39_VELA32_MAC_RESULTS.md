# V39 — first Mac Vela32 partial exposed regression

Date: **2026-10-20 (Asia/Kolkata)**.
Decision: **partial Vela32 gate PASS; full regression NOT RUN; integration HOLD**.
Live application: **5.6 / `2026-10-13-r44`, unchanged**.

The user authorized evaluating recoverable inputs while the Windows machine is
unavailable. The original external 739-case configuration and complete input
pack cannot be recovered here. This run covers only the complete original,
now-exposed **Vela32: 28 Hybrid questions and four lexical Comparisons**.
It is not fresh confirmation, the full 771-case gate, or independent accuracy.

The [protocol](../eval/v39-recoverable-regression/PROTOCOL.md), runner, scorer and
32-question/input/code freeze were published in commit
[`2453826`](https://github.com/arjun9669/GroundedDesk-AI/commit/2453826879399660afbf3d935c704287f01d0926)
before asking any model questions. All original sources, questions/key, rubric,
frozen candidates and first historical results remain unchanged.

## Results

| Variant | PASS | PARTIAL | FAIL | Execution errors | False accepts | False refusals |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Current unchanged r44 baseline | 15 | 5 | 12 | 0 | 4 | 0 |
| Isolated v39 fixed | **32** | **0** | **0** | **0** | **0** | **0** |
| Isolated v39 section | **32** | **0** | **0** | **0** | **0** | **0** |
| Paired v38 fixed | 30 | 0 | 2 | 0 | 2 | 0 |
| Paired v38 section | 30 | 0 | 2 | 0 | 2 | 0 |

Both v39 variants pass all 28 Hybrid and four lexical Comparison cases, including
all eight unsupported Hybrid refusals. No historical baseline/v38/paired-v37 PASS
or contemporaneous baseline/v38 PASS was lost. The two variants are alternative
index paths over the same questions; do not count them as 64 distinct examples.
The first historical v38 30/0/2 FAIL is preserved; the paired run reproduces its
V23 and V27 failures rather than replacing the original record.

- **V23**, asking who approves dispatch at 14:34: v39 explicitly refuses with
  zero citations. Paired v38 still returns a nonresponsive departure-time quote.
- **V27**, asking for departure and an undocumented password at 14:34: v39
  explicitly refuses the whole request with zero citations. Paired v38 still
  answers only the departure facet.
- **V04**, requesting departure and the applicable hold exactly at 14:35:
  v39 retains the next-service-day rule and its phytosanitary hold in one literal
  quotation. Two separately embedded facets retain their own cosine anchors.

The unchanged automated rubric checks source literalness, expected-context
containment, fact-group coverage, relevance, sequential citations and uncited
refusals. Assistant review compared every v39 answer with its original question
and displayed support: no additional contradiction was observed, and no automated
grade was changed. Representative V04 and V27 candidate screenshots were inspected.
This review and the bounded criteria do not establish general entailment.

## Environment and capture integrity

- Apple Silicon macOS (`darwin`, `arm64`), bundled Node **24.19.0**; CI targets
  Node 22. Installed headless Chrome **155.0.8059.80**, 1440×1000 viewport.
- Actual local `Xenova/all-MiniLM-L6-v2`, q8 WASM through Transformers.js 3.0.0;
  Qwen disabled. Public asset request URLs are retained in the raw capture.
  Model URLs resolve through `main`; this is not a guarantee of immutable remote
  model bytes for future reruns.
- Four original fictional TXT documents passed their original SHA256 checks.
  Original key/config/rubric checks passed before freeze, capture and scoring.
  The original Windows configuration was not edited; a new relative-path config
  was frozen. All 422 frozen code/input files passed verification.
- Seven fixed passages, eight section passages and 57 sentence/body entries.
  All saved source vectors are finite and 384-dimensional. Original r44 UI
  sources matched the instrumented baseline for every case.
- Before each Hybrid candidate call, actual whole-query, legacy-facet and exact
  planner-facet vectors/body scores were persisted. Planned clock queries occur
  in V04, V22, V23, V24 and V27. An independent offline calculation recomputed
  every persisted planner-facet/body cosine within `1e-10` of its recorded value.
- All 32 cases finished before scoring. Zero question retries, candidate errors,
  or production-code changes. The raw ledger and first scores are preserved.

Engineering preparation passed **596 unit tests**, the strict **28/28 Keyword**
evaluation, syntax/integrity checks and read-only startup with no failed requests
or page errors. These checks are distinct from the actual-model result above.

## Preserved evidence and remaining work

The [artifact manifest](evidence/v39-vela32-mac/manifest.json) seals **258 files**
(24,750,223 bytes), including the complete raw capture and first scorecard. Each
file has its byte count and SHA256, so this capture can travel through GitHub
without depending on temporary output folders.

- [First automated scorecard](evidence/v39-vela32-mac/score/automated-scorecard.json)
- [Complete raw capture](evidence/v39-vela32-mac/raw/Vela32/capture.json)
- [Pre-candidate V04 facet evidence](evidence/v39-vela32-mac/raw/Vela32/V04-pre-candidate.json)
- [V23 candidate capture](evidence/v39-vela32-mac/raw/Vela32/V23-candidate.json)
- [V27 candidate capture](evidence/v39-vela32-mac/raw/Vela32/V27-candidate.json)
- [Original first v38 failure](evidence/vela32-v38/automated-scorecard.json)

Next, inventory other recoverable historical packs and verify exact sources,
questions and native criteria before extending exposed coverage. Missing original
inputs must remain explicit exclusions. No reconstructed pack may silently stand
in for the original 739-case regression. A separately designed prospective set
can add evidence but cannot erase the missing regression or historical failures.
Fresh confirmation, device/performance/navigation/export qualification and any
live adoption remain separate tasks; this subset does not authorize adoption.
