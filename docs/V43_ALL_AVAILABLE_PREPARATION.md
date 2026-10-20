# V43 all-available combined capture — preparation

Date:2026-10-20 (Asia/Kolkata). Official main. The user requested one uninterrupted
run of every case with verified original inputs. Unchanged candidate v43 and
paired v42; live5.6/r44 stays unchanged. No model questions at this checkpoint.

## Scope and native criteria

668 cases/19 original families;628 actual q8 MiniLM WASM Hybrid questions and40
separately labelled lexical Comparisons.75 source documents and117 original input
entries are verified against the original manifests. Exact IDs, order, questions,
document pairs and native criteria stay intact. This new explicit configuration
is not the missing original private combined config or a full771-case gate.

Nine families reuse their successful native adapters. Eight gold-span/group packs
and Binding64 copy unchanged v38 grading bodies; unit checks prove byte identity
and reproduce every archived v38 grade across the384 additional cases. Cobalt16
retains its manual rubric: only identical normalized answer/filename/quote outputs
can inherit an archived native judgment, with provenance/relevance/refusal checks
reapplied. Changed manual outputs are BLOCKED for review, never auto-credited.

Known public-data FAIL rows stay FAIL: ExternalSQuAD24 fixed E08/E24 and section
E08; FreshConfirmation32 fixed F07/F09/F10 and section F09/F10. F10 is a prior
false refusal. Preserve prior PASS within the same variant and baseline, historical
native category/constructed-control gates, unsupported/provenance/direct-span
criteria and unchanged known-failure signatures. No pooled accuracy or demand for
668/668 is introduced. The full historical gate's missing-input dependency stays
unavailable; this run evaluates its explicitly available scope only.

## Engineering and freeze

The first full unit run was767 PASS/3 FAIL of770. All three share one cause:
combining input/native-reference categories caused a duplicate-protocol guard.
Work stopped and the user approved correction. Independent category verification
now retains every hash and rejects conflicting expectations. No original inputs,
scorers, evidence or candidate were edited. First and approved unit logs remain
verbatim in the [preparation evidence](evidence/v43-all-available-mac-preparation/).

Approved:771/771 units (unit count, not model count), strict28/28 Keyword, original
input/history alignment, native adapter equivalence and model resource limits.
Node24.19.0 darwin/arm64; read-only Chrome155.0.8059.85 startup, three samples,
r44, no failed requests/page errors. Prior25000b4b CI/Pages completed successfully.

[Protocol](../eval/v43-all-available-regression/PROTOCOL.md),
[config](../eval/v43-all-available-regression/run-config.json) and
[827-file freeze](../eval/v43-all-available-regression/freeze-manifest.json) pin
runner/scorers/code, original input/history/rubric bytes and observed environment.
Publish and verify GitHub receipt before questions. Never overwrite first evidence.

```sh
RUN_CONFIG=eval/v43-all-available-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v43-all-available-mac/raw \
TEST_URL=http://127.0.0.1:8767/ node tests/browser-all-available-v43.mjs

RUN_CONFIG=eval/v43-all-available-regression/run-config.json \
EVIDENCE_DIR=docs/evidence/v43-all-available-mac/raw \
SCORE_DIR=docs/evidence/v43-all-available-mac/score \
node eval/v43-all-available-regression/score.mjs
```

One capture, then one native scoring pass; no post-observation changes or retries.
The original Confirmation48/Precision48 C04 direct-span gates are also checked
independently from saved native fields before final acceptance; retain the original
v38 criterion unchanged. Scorer gates alone do not replace this final review.
Stop and ask on a required check failure. Separate native rows from acceptance
checks, review changed outputs and independently audit recorded vectors/anchors,
source identities and historical seals before publication. Qwen remains off.

103 original cases/four packs and the original combined configuration remain
unavailable. Even a successful668-case available-input gate cannot close phase1
without recovery or explicit revised acceptance approval. Fresh confirmation,
integration, product qualification and release remain open.
