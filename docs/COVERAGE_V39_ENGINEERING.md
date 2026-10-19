# V39 — isolated dispatch contract engineering validation

Date: **2026-10-20 (Asia/Kolkata)**.
Status: **implemented; synthetic engineering controls PASS; actual-model gates NOT RUN**.
Live application: **5.6 / `2026-10-13-r44`, unchanged**. Integration remains **HOLD**.

Subsequent authorized work: the [first Mac Vela32 partial exposed regression](V39_VELA32_MAC_RESULTS.md)
passed 32/32 in both v39 variants. The engineering checkpoint below predates that
run. The missing 739-case inputs still block the full regression; no adoption.

The [protocol](../eval/answer-completeness-v39/PROTOCOL.md) was committed and
pushed as `c73a8fe` before implementation. It follows the
[Vela32 design review](VELA32_REFUSAL_DESIGN_REVIEW.md). This task authorizes
isolated implementation and unit validation only, not actual-model evaluation
or live adoption.

## Implementation

The [adapter](../eval/answer-completeness-v39/coverage.mjs) identifies itself as
`coverage-v39-final-dispatch-contract`. Its
[pure contract module](../eval/answer-completeness-v39/clock-contract.mjs) owns
dispatch/release/shipping/departure questions with clock context before any old
answer function runs.

- **Outside scope:** delegate to frozen v38 unchanged, including its existing
  default-mode behavior. Lexical Comparison is the exact v38 function export.
- **Unresolved governed request:** return the established explicit refusal with
  zero citations. An unknown clause cannot become an outside-scope fallback.
- **Planned request:** select unique literal evidence for every requested facet,
  bind it to supplied finite body/facet metadata, and return complete displayed
  support or an uncited refusal. Do not call old answer selectors for this scope.

Skipping the old producer in the governed path implements the review's final
contract without an opportunity for inherited clock selection to restore a
rejected answer. A production anchor's `answered` flag, old generated text and
success diagnostics are not copied into a governed result.

The planner distinguishes contextual release time from requested departure,
hold/exception, approver and named attribute/vehicle facts. It accounts for
ordinary question conjunctions, an additional question sentence and `Also,`.
Conjunctions inside named entities remain part of the entity.

Evidence selection checks unique document scope, applicable before/equality/after
relations, complete requested holds, literal bounds, competing positive rules and
recognized competing denials/conditions, and the existing citation/quotation caps.
An approver needs its own explicit scoped approval relation; attributes require
their own literal relation/value. Neither is a forbidden-word category. Malformed
identity, bounds, finite-score or anchor metadata remains an error, not an answer
fallback. Any internal projected text used to detect a competing denial is veto
information only; it is never displayed as a source or used to authorize support.

## Bounded grammar and limitations

This is not a general entailment model. Currently recognized forms include:

- A named dispatch/shipping/departure request/order cleared or released at a valid
  24-hour time, followed by departure/day, hold/exception, approval or attribute
  questions. A `For a/an ...` context form is also recognized.
- Scoped `Who approves ... dispatch at ...?`, `What is ... dispatch ATTRIBUTE at
  ...?`, and `Which ATTRIBUTE leaves ... dispatch yard at ...?` requests.
- Literal before/after/prefix-inclusive or `At TIME or later` departure rules
  stating a current/same/next service, operating, business or working day. The
  bounded hold form is `unless ... hold is open` or `except when ... hold is open`.
- Explicit `ENTITY dispatches/dispatch requests are approved by ROLE`, active
  `ROLE approves ENTITY dispatch requests`, and `ENTITY dispatch ATTRIBUTE is
  VALUE` source relations. Shipping/departure equivalents are bounded in code.

Unknown formulations, conditional relations that cannot be reconciled, more than
three requested facets or ambiguous evidence refuse conservatively. These limits
can cause supported false refusals on unseen questions. Candidate ownership is
deliberately broader than its accepted grammar. No real-corpus preservation or
generalization claim follows from the unit results.

## Evidence API for a later actual-model runner

`planClockRequest(question)` returns `outside_scope`, `unresolved` or `planned`.
A plan exposes each facet's exact original text/span and a self-contained
`facet.question` query. The public `answerWithCoverage` signature remains
compatible with the experimental family.

For governed requests, pass `options.bodyEvidenceCandidates` using existing
body identity, source-text, literal content/start and `actualCosine` fields.
Successful multi-facet answers additionally require:

```text
options.clockFacetEvidence = [
  { question: plan.facets[0].question, bodyEvidenceCandidates: separatelyScoredBodies0 },
  { question: plan.facets[1].question, bodyEvidenceCandidates: separatelyScoredBodies1 }
]
```

Ordering, exact query text and document identity must match the plan. The original
whole-query body collection establishes the source universe; each facet collection
must refer to those same identities/texts. Source quotations and per-facet ledger
entries retain corresponding literal cosine anchors. Shared quotations can use
one displayed citation while retaining each facet's separate score/anchor.

The code cannot certify that a caller actually ran MiniLM; that is a later
runner/evidence-capture obligation. Finite values in unit fixtures are explicitly
synthetic. An old `Also,`-only runner or whole-query scores cannot silently supply
the new multi-facet contract. No browser runner was created or model loaded in
this task.

Scoped `-text` attributes preserve the new v39 protocol/code and test bytes across
Mac/Windows checkouts. No older evidence or pack is renormalized; existing older
attribute gaps remain a separate issue.

## Verification

Environment: official Mac checkout, bundled **Node 24.19.0**. CI uses Node 22;
local results are not a separate local Node 22 qualification.

| Check | Result and meaning |
| --- | --- |
| New full-entry-point contract tests | **19 PASS**; synthetic evidence/metadata only |
| Complete unit suite | **592 PASS / 0 FAIL / 0 skipped**; includes all 573 prior tests |
| Strict bundled Keyword evaluation | **28/28 PASS**, zero false accepts or provenance errors; unchanged small curated fixture |
| New-module/test syntax | PASS; also imported by the full unit suite |
| Diff/link/sensitive-information review | Completed before publication |
| Actual local MiniLM / 771-input regression | **NOT RUN** |
| Fresh confirmation / live integration | **NOT RUN / HOLD** |

Commands:

```sh
node --check eval/answer-completeness-v39/clock-contract.mjs
node --check eval/answer-completeness-v39/coverage.mjs
node --check tests/coverage-v39.test.mjs
node --test tests/coverage-v39.test.mjs
node --test tests/*.test.mjs
node eval/run.mjs --strict
```

The focused suite initially passed 18 controls. Self-review added competing
denial/condition coverage; the final full suite passed all 19 new controls and
all prior tests. No required test failed or was weakened. The broader suite was
repeated after the additional review change, not as a retry of a failed run.

The tests include:

- Before, equality and after cutoffs, prefix/suffix forms, varied times/entities
  and an entity containing `and`.
- A full v38 control that actually returns the incorrect before-cutoff quotation,
  paired with the new wrapper's refusal.
- Unsupported approver/attribute/vehicle requests and mixed questions through all
  supported conjunction forms, plus genuine supported counterparts.
- Literal bounds, wrong/duplicate scope, conflicting and qualified evidence,
  incomplete holds, malformed anchors, citation caps and stale answered priors.
- Rejection of missing/misaligned request-facet scoring metadata.
- Original V23/V27 questions with constructed literal-body fixtures. **Both refuse
  in these synthetic controls**; this is not a new real-model Vela32 score.

## Preservation and next gate

Live modules, UI, existing tests, v33–v38 code, original inputs/rubrics and archived
evidence remain unchanged. The first Vela32 **30/0/2 FAIL** and every earlier first
result remain historical facts. Existing actual-model regression/confirmation
results still describe their original candidates, not v39.

Next is a separately authorized actual-model preparation/capture task: recover and
verify original source packs, freeze candidate/imports/planner/runner/scorer and
environment, then capture the **771 exposed inputs (711 Hybrid, 60 lexical
Comparisons)** with actual source/query/facet vectors and unchanged native criteria.
Preserve earlier failures outside native gates; require no prior PASS loss or new
false acceptance/refusal and repair the exposed failures. Only a successful gate
can qualify a later separately frozen prospective confirmation. Neither these
unit results nor publication on `main` adopts v39 into the live application.
