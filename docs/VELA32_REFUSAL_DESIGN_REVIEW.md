# Vela32 refusal and fallback design review

Date: **2026-10-19 (Asia/Kolkata)**. Reviewed code: **`b0d4224`**.
Status at the October 19 review: **design complete; implementation proposed, not implemented**.

October 20 follow-up: the [isolated v39 engineering implementation](COVERAGE_V39_ENGINEERING.md)
has 19 synthetic controls passing. Actual-model studies and live adoption remain
deferred. The original review and historical results below retain their dated scope.

The requested outcome is a concrete fix plan for V23 and V27. This change does
not modify the live 5.6/r44 application, frozen candidates, benchmark inputs,
rubrics or first results. It does not introduce v39 code or run model questions.

## Evidence and scope

The preserved [Vela32 scorecard](evidence/vela32-v38/automated-scorecard.json)
records these original answers in both isolated v38 variants:

| Case | Requested fact | Recorded v38 response | Required result |
| --- | --- | --- | --- |
| V23 | Who approves a named library's dispatch at 14:34? | A quotation saying requests released before 14:35 leave on the current service day | Explicit refusal, zero citations: no dispatch approver is specified |
| V27 | When will a request released at 14:34 leave, **and what is its password**? | The same before-cutoff departure quotation | Explicit refusal, zero citations: the whole question includes an unsupported facet |

The quotations are literal and citation numbering is valid, but neither answers
the whole request. This is unsupported acceptance of nonresponsive evidence,
not observation of an invented password or approver identity.

Production r44 already failed V23 with an unrelated founding-year quotation; it
correctly refused V27. Thus V27 is a production-baseline PASS loss, while V23 is
an existing production weakness. Paired v37 also fails both. Preserve the first
v38 **30 PASS / 0 PARTIAL / 2 FAIL** and the integration **HOLD**.

Sources: [frozen key](../eval/v38-fresh-confirmation/fixed-answer-key.json),
[original assessment](evidence/vela32-v38/assistant-assessment.json),
[release decision](evidence/coverage-v38-r44/release-decision.json).
These are fictional published evaluation materials, not personal documents.

The review reads saved answers and source code. A read-only inspection also
called the existing question classifiers; it did not call answer generation,
load a model, supply embeddings, replay saved vectors or regrade cases. The
capture index references raw per-case JSON that is not present beside it in this
checkout. Therefore this review uses the committed scorecard, assessment and
screenshots as historical records; it does not claim a complete raw-capture
reconstruction or a new actual-model reproduction.

## Where the incorrect answer survives

The Hybrid call path is not a simple sequence of every numbered candidate:

```text
v38.answerWithCoverage
  -> v36.answerWithCoverage
       -> v35's re-export of v33.answerWithCoverage
            -> v25 and its earlier coverage chain
            -> v33.selectEvidence
       -> v36 quotation-precision / renewal-ambiguity checks
  -> v38.scopedPolicyRepair
```

V38 imports **v36**, not v37. V35 re-exports v33's Hybrid function directly;
its maintenance work primarily concerns separate lexical Comparison.

1. [V38 lines 79–83](../eval/answer-completeness-v38/coverage.mjs) compute
   `previous(...)` **before** checking the latest scoped policy request.
2. [V33 lines 18–26](../eval/answer-completeness-v33/coverage.mjs) recognize a
   clock frame from a dispatch/departure/shipping/release word plus a time. This
   does not establish that the requested answer is temporal, or that every
   requested facet is supported.
3. V33's clock selector, lines 221–228, can select a literal before-cutoff rule
   using the numerical time comparison. `finish`, lines 111–119, checks bounds
   and actual finite cosine metadata, then sets `answered: true`. It does not
   check that departure timing answers an approver or password request.
4. V33's compound handling, lines 237–246, splits the special `Also,` form.
   V27's ordinary `and what is its password?` remains one part. V25's displayed
   support guard covers certain event, temperature and count relations, rather
   than a general contract for these two requests.
5. [V36 lines 58–70](../eval/answer-completeness-v36/coverage.mjs) refine some
   maintenance/bullet quotations and renewal ambiguity. They do not reject this
   actor/attribute mismatch.
6. V38's strict `departureIntent` returns null for both questions. That declines
   **its own repair**. `scopedPolicyRepair`, line 68, returns the already-computed
   prior answer unchanged; it is not a final refusal or completeness check.

The code trace is consistent with the saved first-run diagnosis and answers.
The review does not claim to have observed new model execution through each
internal function.

Read-only classifier results from the frozen questions:

| Case | V33 frame | V38 departure intent | `Also,` parts |
| --- | --- | --- | --- |
| V04: supported departure plus hold | clock at 14:35 | complete departure/hold frame | 1 |
| V22: password at cutoff | clock at 14:35 | null | 1 |
| V23: approver before cutoff | clock at 14:34 | null | 1 |
| V24: vehicle after cutoff | clock at 16:00 | null | 1 |
| V27: departure plus password | clock at 14:34 | null | 1 |

## Why the existing controls did not close the gap

[The v38 unit file](../tests/coverage-v38.test.mjs) contains useful controls, but
their scope differs from the failing source/question combination:

- Lines 56–62 exercise the full wrapper for unsupported single requests using a
  single `At ... or later` rule at the exact boundary. V33's clock branch handles
  `before`, `after` and `at or after` forms, but does not recognize that suffix
  form as an inclusive match. An inherited refusal can therefore survive without
  exercising the successful before-cutoff repair that causes these failures.
- Lines 75–78 test mixed requests against `scopedPolicyRepair` with a supplied
  refusal, rather than the full wrapper with an inherited answered response.
- Lines 82–84 replay the saved engineering controls against that helper only.

Passing these controls does not imply that the full exported answer function
will refuse before-cutoff mixed or non-temporal requests. Tests need both the
correct entry point and source grammar that actually activates legacy selection.

## Recommended implementation: one final request/evidence contract

Create a **new isolated candidate**, tentatively v39. Keep v33–v38 frozen. Reuse
v38 as a candidate producer where appropriate, but do not treat its `answered`
flag or a valid quotation as authorization to return an answer.

The public v39 answer function must own the following sequence on **every**
return path, including compound questions and inherited results:

```text
whole question -> bounded request plan -> candidate evidence
               -> support for every requested facet -> answer OR uncited refusal
```

### 1. Separate context from requested facts

Introduce a pure planner with explicit outcomes:

- `outside_scope`: no governed dispatch/time request; delegate unchanged to v38.
- `planned`: scoped entity, contextual time, requested relations/facets and their
  text spans are accounted for.
- `unresolved`: a governed request contains ambiguity or unaccounted requested
  text. It cannot be authorized by a departure quotation alone.

Time plus dispatch vocabulary determines where closer inspection is needed,
not what answer type is justified. Parse the **whole** request: the release-time
sentence is context; “who approves” asks for an actor relation; “what is its
password” asks for an attribute. Distinguish conjunctions joining requested facts
from conjunctions inside names, lists or source conditions. Handle the existing
`Also,` form, ordinary question conjunctions and additional question sentences.

Use a conservative ownership check before parsing. Once time/dispatch context is
detected, a null or partial parse is `unresolved`, never `outside_scope`; otherwise
an unfamiliar password/approver phrasing would re-enter the same unsafe fallback.
At minimum, every question classified as `clock` by the inherited v33 classifier
must be owned by this contract. Make that coverage invariant an explicit control.

Use a bounded, documented grammar with explicit unresolved outcomes, not a claim
of universal language understanding. No case IDs, entity names, cutoff constants
or expected answers may influence runtime decisions.

### 2. Treat inherited answers as untrusted candidate evidence

For a governed request, collect evidence using the existing real-ranked sources
and validate it against the complete plan before exposing the result. Every
selected quotation must bind to the requested document/entity and relation:

- A departure facet needs the applicable literal timing rule and correct
  comparison, including equality. Required hold/exception facets must be shown.
- An approver facet needs an explicit actor/approval relation for that dispatch;
  a founding date, unrelated purchase approval or departure time is insufficient.
- An attribute facet needs its own explicit relation/value. A literal time clause
  does not support a password or vehicle. Do not use a blacklist of those words:
  positive synthetic controls must show that genuinely documented attributes and
  approvers can still be supported by the corresponding bounded validator.

An unrecognized facet is not proof that the fact is absent. It means this bounded
candidate cannot justify a complete answer. Return the established refusal when
the whole-question contract cannot be met, and measure resulting false refusals
explicitly. If supported positive controls cannot pass without broad heuristics,
stop and revisit the design before qualifying a candidate.

Preserve source-literal bounds, document identity, ambiguity checks, citation
limits and real corresponding body/facet cosine anchors. Do not manufacture
scores, lower thresholds or promote unrelated excerpts merely because they are
authentic. Inference/metadata errors remain errors, not fallback successes.

### 3. Make incomplete support terminal for this answer

Only return `answered: true` when all requested facets have justified displayed
evidence. Otherwise return the established explicit refusal with `sources: []`.
Do not retain stale answer text, citations or a success diagnostic from a prior
result. Do not subsequently call a permissive fallback that can restore it.

This differs from v38's repair-admission check: the contract validates **what is
returned**, regardless of which inherited selector produced it. An `Also,` early
return must not bypass it. A producer's self-reported experiment/frame label is
diagnostic information, not proof of support.

Keep lexical Comparison an exact alias of v38's current Comparison implementation.
Do not import this candidate into `app.mjs`, change the retrieval build or deploy
it as live behavior during isolated validation.

### 4. Keep the implementation small and reviewable

Proposed new paths, not created by this review:

| Path | Responsibility |
| --- | --- |
| `eval/answer-completeness-v39/clock-contract.mjs` | Pure request planning and bounded displayed-support validation |
| `eval/answer-completeness-v39/coverage.mjs` | Public adapter around frozen v38; final contract on every governed result; unchanged Comparison alias |
| `eval/answer-completeness-v39/PROTOCOL.md` | Freeze scope, expected behavior, preserved gates and stop conditions before implementation/model answers |
| `tests/coverage-v39.test.mjs` | Full-entry-point positive/negative contracts and preservation controls |
| `tests/browser-coverage-v39.mjs` | Separately frozen actual-model capture runner after engineering checks pass |

The runner must obtain actual query/body/facet vectors for the planner's facets.
It cannot silently keep an `Also,`-only embedding decomposition while the new
planner recognizes different conjunctions. Freeze planner, runner and scorer
dependencies together. A new request plan is not itself a new scoring rubric.

## Required engineering controls before a model run

These are planned cases, **not newly executed tests** or measured outcomes.

| Dimension | Required controls |
| --- | --- |
| Time branches | Before, equal and after cutoff; both prefix/suffix inclusive forms; varied times; invalid times and unresolved competing rules |
| Non-temporal intent | Unsupported approver, attribute and vehicle requests with time context; positive counterparts with explicit matching source relations |
| Whole-question support | Departure plus unsupported facet using `and`, another question sentence and `Also,`; supported counterparts with evidence for every facet |
| Legacy activation | Before-rule source that v33 can select, after-rule source, and the old suffix-only fixture; complete public wrapper, not just a repair helper |
| Prior state | Both refused and already-answered priors; verify unrelated prior answers are not trusted solely because they are literal |
| Evidence scope | Wrong document/entity, unrelated approval, repeated/contradictory rules, negated/proposed context, missing holds, altered/ambiguous quotation bounds |
| Data integrity | Real-path metadata contracts; no fabricated finite anchor; preserve errors for absent/nonfinite/mismatched evidence and citation limits |
| Preservation | Unrelated v38 behavior unchanged; supported time/hold cases retained; all existing unit tests; Comparison function identity retained |

V23/V27 can become explicitly exposed regression fixtures with their original
questions and unchanged expected refusals. Generic synthetic controls must vary
names, times and relations. Synthetic/mock-vector contract results are never
reported as actual MiniLM accuracy. Known-bug observations are not silently
renamed passing tests; if a required implementation check fails, stop and ask the
user before further changes, retries or publication.

## Actual-model and adoption gates

1. **Preflight before answers:** verify original source/key bytes and dependency
   hashes; confirm runtime import identities and the actual installed Chrome
   version; freeze it honestly, recording Mac/platform differences from old runs.
   Stop before questions if original inputs or required raw artifacts cannot be
   recovered. Capture indexes alone are not substitutes for missing source packs.
2. **Exposed regression:** retain the 739 original cases and add the now-exposed
   Vela32 32 cases: **771 inputs = 711 Hybrid + 60 lexical Comparisons**. Preserve
   native per-pack criteria, all original first results and the distinction between
   fixed/section variants. This is not a new blind benchmark or a 771/771 claim.
3. **Pass conditions:** both variants must repair V23/V27, preserve Vela32's other
   30 PASS cases, retain the historical native regression gates, and introduce no
   production/paired PASS loss, false acceptance or supported false refusal.
   Preserve and list older failures outside those native gates. Require literal,
   relevant and complete displayed evidence, not just substring matching.
4. **Capture discipline:** actual local MiniLM q8 WASM, Qwen off; capture original
   questions once with actual finite source/query/facet vectors saved before
   candidate use; distinguish unchanged production UI from isolated outputs.
   Use new evidence directories. Seal all outcomes before diagnosis. No post-answer
   tuning, reruns disguised as first results or score/key changes.
5. **Fresh confirmation:** only after engineering and exposed gates pass, prepare
   a separately scoped, prospectively frozen fresh study. Existing Vela32 is now
   exposed and cannot serve as fresh confirmation again. Failure/blocker stops
   integration; success only qualifies later integration review.
6. **Live integration:** remains a separate decision after navigation/export,
   browser/device, performance and memory qualification. Live r44 stays unchanged
   through this review and the proposed isolated experiment.

## Review verification

On October 19 in the official Mac checkout, bundled Node 24.19.0 ran the unchanged
unit suite: **573 PASS, zero failures/skips**. `node eval/run.mjs --strict` passed
the 28 curated Keyword cases with zero false accepts or provenance errors.
Documentation local-link and diff-whitespace checks passed. The intended diff was
reviewed for errors and sensitive information; runtime files, `eval/`, `tests/`,
CI workflows and historical evidence have no changes. No new browser/model study
was run. These checks validate the documentation baseline, not the proposed fix.

## Decision and remaining risks

Recommend the final full-question support contract rather than another helper-only
intent patch, a password/approver keyword blacklist, global refusal of dispatch
queries, relaxed scoring or direct changes to frozen v33/v38.

The difficult implementation work is bounded actor/attribute support and safe
question decomposition. Conservative handling can create false refusals; broader
grammar can accidentally authorize unrelated relations. The controls above and
existing PASS-preservation gates must decide readiness, not the apparent success
of two targeted examples.

**Next step requiring separate authorization:** implement and unit-validate the isolated
candidate under this reviewed plan. That is distinct from running real-model
studies or adopting it in the live app. This document is a design proposal, not
an implementation freeze or evidence that the failures have been fixed.
