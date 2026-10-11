# Lantern32 — Independent first-look freeze for GroundedDesk AI r22

**Status: FROZEN, FIRST-LOOK NOT YET RUN. NO SCORE OR RESULT EXISTS.**

This is a new, fully **fictional** Lantern Island Museum Network domain, separate from the previously exposed Atlas and Meridian policies. It tests whether the **unchanged deployed 2026-10-11-r22** retrieval build generalizes to new source phrasing, qualifications and workflows.

**Freeze timestamp (UTC):** `2026-10-11T06:16:51.654687+00:00`  
**Immutable benchmark ID:** `LANTERN32_R22_FIRSTLOOK_V1`

## Pre-registered evaluation design

- **4 source documents**: visitor services, collections care, digital archive, and education programs. Synthetic only, no real museum facts or private user data.
- **32 frozen cases**: 26 main **real MiniLM Hybrid Q&A** (22 supported + 4 intentionally unsupported) and 6 **separately lexical Comparison** cases with preselected document pairs.
- Cases test exact numerical/temporal boundaries, two-sided packet contents, split-sentence limitations and exceptions, data handling, collection restrictions, approvals, visitor/refund conditions, and unsupported facts.
- Frozen exact questions, facts, workflow assignments, strict rubric, and SHA-256 manifest are distributed in a separate **user-held test pack** rather than committed to this application's runtime, developer fixture directory or CI. This is deliberate to reduce pre-test contamination.
- **No app testing, scorecard evaluation, real MiniLM retrieval, mock-vector ranking or retrieval tuning against these documents has been performed as part of the freeze.** Schema/count checks and file-hash checks are not retrieval performance tests.

## Freeze SHA-256 — exact file bytes

| File inside `LANTERN32_firstlook/` | SHA-256 |
| --- | --- |
| `source_docs/01_Lantern_Visitor_Services.txt` | `7833d8dfefce7e0823bf76bbda7972d03ef09531e74300ab719ffb9ca11006ec` |
| `source_docs/02_Lantern_Collections_Care.txt` | `231afd7fb0d5b01c3f91faef1879db642b02898d7851545a0ab093de1ce5fcd4` |
| `source_docs/03_Lantern_Digital_Archive.txt` | `f82f47f9c3a557475888c84004e0f8c75b40f39bed4fa1b1dc21d241ec9657eb` |
| `source_docs/04_Lantern_Education_Programs.txt` | `d20a90965b78ab00b0b20f113460751fb9efb0826018181842a8ff66f554f046` |
| `frozen-answer-key.json` | `950709ad5938a4e8443e2527bf2d9adb09720f838a4ca73b59663741c3322f9b` |
| `FROZEN_RUBRIC.md` | `c339b1af8e1152f969b200dfc4787b28fa7f689543e6e144b265c178ebb3d77d` |

**Full distributable archive:** `Lantern32-r22-FROZEN-firstlook.zip`, SHA-256 `ef9fb1f3a42b61e13b232f217ffa42f20d36fbcb774fa8ab660a82a390508b35`. The archive is supplied to the user in the associated ChatGPT conversation; **the ZIP and hidden answer key are not hosted in this GitHub repository**. The SHA above allows later checking that the separately held pack is unchanged.

## Immutable grading protocol

1. Check all source, key and rubric hashes *before* opening GroundedDesk. If the check fails, **stop**.
2. Open `https://arjun9669.github.io/GroundedDesk-AI/?build=20261011-r22`; verify footer and exports show build `2026-10-11-r22`.
3. Clear all earlier documents; upload **only the 4 original `source_docs/*.txt`** files. Do **not** upload the answer key, rubric, manifest or this GitHub note into the application.
4. Load actual on-device `Xenova/all-MiniLM-L6-v2` and enable **Hybrid**, with Qwen generation **off**. If loading fails, report **blocked/unscored**, never substitute mock embeddings or Keyword results.
5. Run the 26 original H questions **once each** without reformulation. Then run 6 lexical Comparison questions in a separate workflow using the exact frozen source pairs.
6. Score *displayed* source quotation(s) for the complete required facts, relevance, correct originating document and literal quote-in-original provenance (and quote-in-excerpt for Hybrid). Extra source context does **not** repair an incomplete displayed answer.
7. **PASS** = complete, correct, relevant, source-verbatim answer. **PARTIAL** = partially correct but missing required facts or quoting irrelevant extra material without wrong central outcome or fabrication. **FAIL** = wrong central answer, contradiction, fabricated/misattributed quotation, false refusal of a supported case, or any unsupported answer/citation. Unsupported PASS needs an explicit no-evidence refusal and **zero citations**.
8. Report full 32-case table, exact quoted answers and sources, total PASS/PARTIAL/FAIL, separate Hybrid vs Comparison totals, 4 unsupported refusal outcomes, false acceptances/refusals, authentic and relevant citation counts, actual model readiness and any blockers.
9. **Publish and preserve the first-look scorecard before any code change or repeat test.** Repeated runs against Lantern32 after seeing the first results are **in-sample regressions**, not new held-out accuracy.

The user-held archive also contains `CODEX_FIRSTLOOK_INSTRUCTIONS.md`, `FROZEN_RUBRIC.md`, `README.md`, `frozen-answer-key.json` and `freeze-manifest.json`.

## Context and limitations

The original Meridian r18 first-unseen benchmark scored **16/24**. Later tuning on **that already-exposed set** produced an r22 **23/24 in-sample regression**. Neither number predicts a Lantern32 result. Do not present an aspirational target or an unexecuted test as confirmed accuracy.

This Lantern32 benchmark was **authored synthetically as a new fixture by the assistant**, not curated by an external audit organization. It can provide a meaningful first-look check on *this new source domain* if the immutable scoring procedure is followed, but one 32-case benchmark is not a representative estimate of production factual accuracy, safety, entailment or comprehensive document coverage.

**Next action:** Execute the held-out pack in real Chrome on the unchanged r22 deployment. Leave the known Meridian I15 deficiency open rather than introducing another Meridian-tuned patch before this first-look measurement.
