# V14 scope-binding and narrative experiment — actual Chrome/MiniLM

**Original capture gate: BLOCKED. Qualified replay checks: FAIL. Scope48: NOT RUN per frozen stop rule. Production remains r44.**

FIRST CAPTURE BLOCKED: the frozen original driver imported v13 as candidate and v12 as paired module. The grading assertion caught this; all original raw outputs and partial aborted grading remain preserved and are not v14 scores. This report uses a separately frozen qualified browser-module replay. It uploaded the same sources, loaded actual MiniLM and regenerated source embeddings, reused saved actual query/facet vectors, and did not resubmit any UI questions. Original UI screenshots were copied byte-for-byte and labelled as originating from the first capture. New candidate screenshots show verified actual v14 execution. The original end-to-end first-capture gate remains BLOCKED regardless of replay checks; no fresh sample is consumed.

V14 wraps v13 with literal action/object/site checks within explicit for-actor-to-verb frames, plus first-year origin and bounded paragraph rationale selection. These are structural heuristics, not semantic entailment. Protocol committed before implementation; candidate, runner, scoring and307 unchanged exposed inputs frozen before answers. All355 unit tests and strict offline evaluation pass.

Installed headless Chrome155.0.8059.40 on local HTTP used actual Xenova/all-MiniLM-L6-v2 q8 WASM, Qwen disabled. Production UI and isolated fixed/section candidate outputs are separately labelled; candidate scores are not a deployed-app score.Original UI capture:283 Hybrid Q&A and24 separate unchanged lexical Comparison. Qualified replay:283 Hybrid module cases and24 lexical cases using recorded UI evidence, with zero UI question resubmissions. No simulated vectors, post-answer candidate tuning or paid services.

All94 input/source/key/manifest checks, frozen candidate and config remain unchanged after capture. Twenty-five authoritative v9/v10/v11/v12/v13 files match their immutable archives. Current Atlas PDFs verified; original historical Atlas manifest unavailable. V9 first24/1/6 plus1ungraded F06 and Actor40 first28/2/10 remain unchanged. Actor40 is now exposed in-sample data.

## Known regression results

| Set | Fixed PASS/PARTIAL/FAIL | Section PASS/PARTIAL/FAIL |
|---|---|---|
| Lantern32 | 32/0/0 | 32/0/0 |
| Aster32 | 32/0/0 | 32/0/0 |
| Meridian24 | 24/0/0 | 24/0/0 |
| Cobalt16 | 16/0/0 | 16/0/0 |
| Atlas15 | 15/0/0 | 15/0/0 |
| RetrievalQuality28 | 28/0/0 | 28/0/0 |
| ExternalSQuAD24 | 22/0/2 | 23/0/1 |
| FreshMixed32 | 32/0/0 | 32/0/0 |
| FreshConfirmation32 | 29/0/3 | 30/0/2 |
| V9Exposed32 | 30/0/2 | 30/0/2 |
| Actor40 | 40/0/0 | 40/0/0 |

Frozen gate checks:
```json
{
  "all_actor40_pass": true,
  "all_original_119_pass": true,
  "all_rq28_pass": true,
  "no_prior_pass_regressions": false,
  "all_exposed_compound_controls_pass": false,
  "provenance_intact": true,
  "no_new_false_acceptances_or_refusals": false
}
```

Prior-PASS regressions:
```json
[
  {
    "pack": "V9Exposed32",
    "id": "F20",
    "variant": "section",
    "prior": "coverage-v11-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "C04",
    "variant": "section",
    "prior": "coverage-v11-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F20",
    "variant": "fixed",
    "prior": "coverage-v12-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "C04",
    "variant": "fixed",
    "prior": "coverage-v12-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F20",
    "variant": "section",
    "prior": "coverage-v12-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "C04",
    "variant": "section",
    "prior": "coverage-v12-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F20",
    "variant": "fixed",
    "prior": "coverage-v13-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "C04",
    "variant": "fixed",
    "prior": "coverage-v13-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F20",
    "variant": "section",
    "prior": "coverage-v13-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "C04",
    "variant": "section",
    "prior": "coverage-v13-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F20",
    "variant": "section",
    "prior": "coverage-v11-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "C04",
    "variant": "section",
    "prior": "coverage-v11-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F20",
    "variant": "fixed",
    "prior": "coverage-v12-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "C04",
    "variant": "fixed",
    "prior": "coverage-v12-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "F20",
    "variant": "section",
    "prior": "coverage-v12-final",
    "outcome": "FAIL"
  },
  {
    "pack": "V9Exposed32",
    "id": "C04",
    "variant": "section",
    "prior": "coverage-v12-final",
    "outcome": "FAIL"
  }
]
```

V9Exposed32 F20 and C04 newly falsely refuse in both variants. F20 asks who decides the fate of protesters; the source says it is for the state, including judges, to decide whether protest is criminal. The strict object-token requirement treats that valid paraphrase as a mismatch. C04 includes F20 as a facet and consequently refuses the entire supported compound. The guard is too broad for narrative actor questions. These are two distinct case regressions, each affecting both variants; repeated historical entries above do not represent extra questions. Each variant has two new false refusals plus the previously existing older-public F10 false refusal. Exposed compound controls are15/16, not16/16. All47 deliberately unsupported controls keep zero-citation refusals, but that does not justify the supported regressions.

The original scorer and runner are unchanged. All307 original UI outputs are preserved. The replay scorer uses the unchanged key/thresholds but a new exclusive output directory and explicitly retains the original BLOCKED gate. Original119 retain their semantic keys and quotation-parity review; RQ28 retains literal criteria; public cases require all required groups in displayed original-paragraph quotations. No expanded-context credit. Paragraph containment is a location proxy; direct-span counts and source-literal provenance do not establish entailment. Some valid quotations include broad surrounding context. Do not pool different rubrics into independent accuracy.

## Actor40 — exposed regression, first result immutable

First v13 prospective/adversarial result remains28/2/10 in both candidate variants. This run is explicitly an in-sample regression. Its current case scores:

| Variant | PASS | PARTIAL | FAIL | False acceptances | False refusals | Provenance |
|---|---:|---:|---:|---:|---:|---|
| baseline | 21 | 2 | 17 | 8 | 0 | 37/37 |
| fixed | 40 | 0 | 0 | 0 | 0 | 31/31 |
| section | 40 | 0 | 0 | 0 | 0 | 31/31 |

Both qualified candidate variants now have24/24 supported,4/4 compound and12/12 explicit uncited refusals on the exposed Actor40 set, with31/31 literal, original-paragraph, direct-span quotations. F02 displays the1875 origin statement, F07 displays the predator-specialisation explanation, C01/C02 contain both required groups, and A01–A08 refuse with no citations. The first28/2/10 result remains immutable. These are qualified in-sample observations, not new independent accuracy. No new supported approval controls were run: syntactic positive scope checks are unit fixtures, and prospective Scope48 remains unconsumed.

Non-PASS Actor40 candidate cases: none.

Scope48 NOT RUN: original first capture is BLOCKED, and qualified replay checks are recorded separately. No new unseen sample consumed, no threshold/input changes, no post-answer tuning or retry.


Literal scope coverage is limited to explicit for-actor-to-verb grammar and leading At/In sites. No general semantic support certification is claimed. Next proposed work must distinguish explicit operational object/site restrictions from narrative paraphrases and verify supported scope controls. Future end-to-end runners must verify the actual module identity before the first question. This task makes no further candidate change or fresh evaluation after the failed replay checks. Exact answers, quotations, filenames, matched groups, source provenance and per-citation relevance are in the per-case report and scorecards. Runtime stays5.6/r44; no candidate adoption in this task.

[Public scorecards and browser evidence](./evidence/coverage-v14-r44/) · [regression gate](./evidence/coverage-v14-r44/decision.json) · [citation diagnostics](./evidence/coverage-v14-r44/citation-diagnostics.json) · [hash audit](./evidence/coverage-v14-r44/integrity-audit.json). Private original captures remain local; public source quotations retain SQuAD/Wikipedia attribution.
