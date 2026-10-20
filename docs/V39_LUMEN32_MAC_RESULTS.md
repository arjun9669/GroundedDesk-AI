# V39 — first Mac Lumen32 partial exposed regression FAIL

Date: **2026-10-20 (Asia/Kolkata)**. Phase **1 — broader regression**.
Decision: **partial gate FAIL; candidate work/integration HOLD**.
Live application: **5.6 / `2026-10-13-r44`, unchanged**.

The [preparation and freeze](V39_LUMEN32_PREPARATION.md) were published as
[`b6e62e5`](https://github.com/arjun9669/GroundedDesk-AI/commit/b6e62e5b77b08b0a34e22d52ea26af7ecd48e2a8)
before questions. Its GitHub CI and Pages passed. All 32 original now-exposed
cases completed once before the original automated criteria were applied.
The v39 gate then failed and work stopped. The user subsequently authorized
publication of this first failure and investigation of a separate fix. This
publication does not rerun, regrade or repair the failed candidate.

| Variant | PASS | PARTIAL | FAIL | Errors | False accepts | False refusals |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Unchanged r44 baseline | 13 | 4 | 15 | 0 | 6 | 0 |
| Isolated v39 fixed | **31** | **0** | **1** | **0** | **0** | **1** |
| Isolated v39 section | **31** | **0** | **1** | **0** | **0** | **1** |
| Paired v38 fixed | 32 | 0 | 0 | 0 | 0 | 0 |
| Paired v38 section | 32 | 0 | 0 | 0 | 0 | 0 |

**L04 loses a historical and paired-v38 PASS in both v39 variants.** The other
31 cases pass, including all eight unsupported Hybrid refusals and all four
lexical Comparisons. The set contains 28 actual MiniLM Hybrid questions and four
separate lexical Comparisons. Do not pool the two index variants into 64 cases
or report this exposed stress set as independent accuracy.

Original L04:

> An Oridel Map Archive dispatch request is released exactly at 12:40. When should it depart, and which hold can prevent departure?

Expected literal source context:

> A-01. Dispatch requests released before 12:40 leave on the current service day. At or after 12:40, departure moves to the following service day, unless a conservation hold is still active.

V39 returns **“I can't find this in the provided documents.”**, with zero
citations, `status: unresolved` and reason `Unaccounted requested clause or
unsupported context`. Paired v38 displays the supported departure/hold paragraph.
This is a supported false refusal, not a fabricated fact, missing source file,
model-download problem or interrupted capture. See the
[request/source grammar investigation and proposed fix](LUMEN32_V39_FAILURE_REVIEW.md).

## Evidence and verification scope

- Actual local MiniLM q8 WASM through Transformers.js 3.0.0; Qwen off. Installed
  headless Chrome **155.0.8059.80**, Apple Silicon macOS, Node **24.19.0**.
  CI targets Node 22. Public model request URLs are retained; `main` model URLs
  do not guarantee immutable remote weights for a future run.
- Original four fictional TXT sources, config/key/rubric/protocol/scorer and 20
  historical variant alignments verify against their frozen identities. All 436
  frozen code/input files remain intact. Original first v35 28/2/2 failure and
  publication qualifications, later v36–v38 results and earlier v39 captures stay
  unchanged.
- Six fixed passages, seven section passages, 55 sentence/body entries. Saved
  source and all 28 whole-question vectors are finite and 384-dimensional.
  Every instrumented production/UI source comparison passed. All 32 capture
  receipts and the original scorecard's saved-artifact hashes verify.
- L04's unresolved plan has **zero planner-facet queries/vectors**. Its existing
  whole-question vector cannot stand in for the two separately embedded facets
  required by a future successful multi-facet candidate.
- All 32 first captures completed before grading; **zero model-question retries**
  or candidate execution errors. Original scores are unchanged. Assistant review
  of every displayed v39 answer found no additional contradiction; the L04
  candidate screenshot was inspected. No automated grade was changed.
- Preparation passed 602 unit tests, strict 28/28 bundled Keyword checks and clean
  read-only r44 startup. Passing engineering checks did not prevent this model
  regression; keep those measurements separate.

The [manifest](evidence/v39-lumen32-mac/manifest.json) seals **258 original
artifacts (23,490,656 bytes)**: full raw first captures, screenshots, vectors,
receipts/ledger, module/configuration proofs and first automated scores. The
manifest is added after user-authorized publication; it does not modify originals.

- [First scorecard](evidence/v39-lumen32-mac/score/automated-scorecard.json)
- [Complete raw capture](evidence/v39-lumen32-mac/raw/Lumen32/capture.json)
- [L04 pre-candidate evidence](evidence/v39-lumen32-mac/raw/Lumen32/L04-pre-candidate.json)
- [L04 candidate and paired result](evidence/v39-lumen32-mac/raw/Lumen32/L04-candidate.json)
- [L04 screenshot](evidence/v39-lumen32-mac/raw/Lumen32/L04-candidate-lab.png)
- [Original first v35 failure](evidence/lumen32-v35/automated-scorecard.json)

## Current decision

V39 has now been tested on **96 distinct cases** in three separately reported
packs: Vela32 PASS, Prism32 PASS, **Lumen32 FAIL**. There are **572 verified cases
not yet tested with v39**, plus 103 original cases and combined-configuration/
external-adjudication dependencies unavailable. These counts are coverage, not a
pooled accuracy score. Phase 1 and the full 771-case gate remain incomplete.

Next is an isolated candidate design/implementation decision addressing both
request and literal-source grammar, followed by newly frozen revalidation of all
three exposed packs. Do not proceed to Hearth32 or fresh confirmation by treating
this failure as an accepted pass. No implementation or new model run occurs in
the authorized publication/investigation task; live adoption remains HOLD.
