# Coverage v9 — actual Chrome relationship eligibility validation

**Development gate PASS; fresh release-consideration gate BLOCKED: F06 first-attempt output unavailable. Production remains 5.6 / `2026-10-13-r44`.** No candidate integration or runtime release.

Known exposed v7 public32 improves v8’s25/1/6 to **30 PASS /0 PARTIAL /2 FAIL**. New prospective public32 scores **24 PASS /1 PARTIAL /6 FAIL**, plus **1 BLOCKED/ungraded**, in the section variant. These are separate test sets; never combine them as independent accuracy.

## Freeze and method

Protocol precedes implementation; manifest identifies candidate commit and source hashes. The 235-case configuration and candidate precede outputs. After the known gate passed, the new public32 source/key/attribution manifest was committed before any answers. Candidate, questions, keys, documents, rubric and thresholds were not tuned after capture. Historical v7 first22/2/8 and v8 exposed25/1/6 remain unchanged.

Actual installed Chrome155.0.8059.40, isolated headless profile/local unchanged r44; actual `Xenova/all-MiniLM-L6-v2` q8 WASM, Hybrid, Qwen off. Paired v8/v9 share identical real query/chunk/sentence/facet vectors. Every recorded sentence/facet/query vector has384 dimensions; <=512 sentence embeddings per corpus. Original24 Comparison cases remain separate unchanged lexical. Production UI answers and browser-executed experimental candidate answer strings are distinctly recorded. No mock vectors or Keyword fallback. Fresh attempt1 stops at F06 on a trailing-space readiness mismatch after5 captures; F06 original output unavailable and not replayed. Runner-only normalized readiness check captures remaining26 once in a separate continuation. All267 unique UI queries were attempted once,266 captured. Candidate F06 was not evaluated/scored. Error and all original observations preserved.

V9 wraps frozen v8, preserves refusals and operative constraints, and prioritizes literal actor predicates, between-and relations, requested list-head nouns and explicit characterization clauses within selected extracted paragraphs. Context/antecedent sentences may stay or join within620 chars per quote; max3 citations. These are structural ranking heuristics, not factual/entailment verification. Flattened PDF text may lack paragraph boundaries and allow a larger scope; no layout reconstruction is claimed. Original119 quotations exactly match v8.

## Known exposed235 results

| Set | Fixed PASS/PARTIAL/FAIL | Section PASS/PARTIAL/FAIL |
|---|---|---|
| Aster32 | 32 / 0 / 0 | 32 / 0 / 0 |
| Atlas15 | 15 / 0 / 0 | 15 / 0 / 0 |
| Cobalt16 | 16 / 0 / 0 | 16 / 0 / 0 |
| ExternalSQuAD24 | 20 / 0 / 4 | 20 / 0 / 4 |
| FreshConfirmation32 | 29 / 0 / 3 | 30 / 0 / 2 |
| FreshMixed32 | 30 / 0 / 2 | 30 / 0 / 2 |
| Lantern32 | 32 / 0 / 0 | 32 / 0 / 0 |
| Meridian24 | 24 / 0 / 0 | 24 / 0 / 0 |
| RetrievalQuality28 | 28 / 0 / 0 | 28 / 0 / 0 |

All original119, RQ28 and all8 exposed compounds PASS. No corresponding prior production/v2–v8 PASS is lost. No new false refusal or false acceptance; existing F10 false refusal remains counted. F09 wrong paragraph and F10 top5 retrieval/refusal stay FAIL, explicitly outside this candidate’s repair scope. Exposed old E08/E12/E13/E24 and F16/F18 failures remain. Prior F18 narrative erratum is not reversed.

### Relationship changes and precision review

- F04 includes the War Doctor antecedent and the actual between-Doctors sentence in one literal contiguous quotation.
- F19 includes ordination context and the explicit assisting-person sentence in one literal contiguous quotation.
- F07 adds the descriptive clause, retaining an additional subject/context quotation. That first quotation is contextual and does not directly contain the requested descriptive gold span.
- C02 contains both requested facts as separate literal quotations; both original question parts remain unchanged.
- F17 includes the requested time/storage list, but retains the adjacent unrequested other-measures list. This is an explicit precision limitation, although the frozen paragraph-plus-gold-groups rubric scores PASS.
- C01’s earlier unrequested actor-award detail remains in its preserved quote. No score or threshold was changed to conceal extras.

## Fresh prospective public32

Seed: `GroundedDesk coverage-v9 2026-10-14 external32-v1`. SHA ordering, unchanged500–1500-character eligible contexts, four articles/two contexts/three original questions per context. All12 previously used titles excluded; no resampling/difficulty filtering.24 original SQuAD v1.1 dev supported questions/spans, four constructed compounds and four self-authored unsupported controls. Only four source documents entered the app, never keys/rubric/manifest.

This is a prospective **public mixed sample**, not sealed independent accuracy, representative accuracy or official SQuAD EM/F1. Public/model exposure cannot be excluded. It is now exposed; future retests must be labeled regressions.

| Variant | PASS | PARTIAL | FAIL | BLOCKED |
|---|---:|---:|---:|---:|
| baseline | 17 | 2 | 12 | 1 |
| fixed | 24 | 1 | 6 | 1 |
| section | 24 | 1 | 6 | 1 |
| paired_fixed | 24 | 1 | 6 | 1 |
| paired_section | 24 | 1 | 6 | 1 |

Section supported:18/24; compound:2/4; unsupported:4/4. False acceptances:0; false refusals:0.

Section citation provenance:29/29; original gold-paragraph location:26/29; direct requested gold span:23/29. Paragraph location is a proxy, not semantic relevance or completeness. Scores use literal experimental answer quotations only; retrieval excerpts cannot rescue missing answer spans.

### All new section non-passes

| ID | Outcome | Missing evidence / issue |
|---|---|---|
| F06 | BLOCKED | First output unavailable; not graded |
| F18 | FAIL | Jonathan Stewart / Stewart |
| F19 | FAIL | would do more harm than good / whether it would do more harm than good / it focuses attention on the threat of punishment and not the moral reasons to follow this law / whether it would do more harm than good. |
| F20 | FAIL | the state / judges / the state (including the judges) / the judges |
| F21 | FAIL | moral reasons to follow this law / whether it would do more harm than good |
| F22 | FAIL | inform the jury and the public of the political circumstances / plead not guilty / inform the jury and the public |
| C01 | FAIL | Vampire bats / Vampire; electric eels |
| C04 | PARTIAL | the state / judges / the state (including the judges) / the judges |

Frozen release checks:

```json
{
  "all_cases_captured": false,
  "development_gate_passed": true,
  "fresh_section_supported_at_least_21": false,
  "fresh_section_constructed_all_pass": false,
  "provenance_intact": true,
  "no_false_acceptance_or_refusal": true
}
```

Fresh paired PASS regressions:{"fixed": [], "section": ["F18"]}.

## Integrity, decision and limits

78 original pre-test source/key checks passed, plus all6 fresh files. All original and new manifests/source hashes reverified after capture. Current Atlas original PDF hashes verified; original historical Atlas manifest unavailable. Prior independent pypdf extraction preserved. Production code/HTML/CSS remain identical to f570dcf.332/332 final local unit tests and strict offline evaluation pass; synthetic CI smoke is distinct from this actual MiniLM run.

Fresh confirmation is incomplete, with F06 BLOCKED/ungraded. Its observed18 supported passes could reach at most19/24 even if F06 passed, below the frozen21/24 requirement; compounds also miss the frozen4/4 target. Do not adopt. The new incomplete gate outcome is preserved before any future work. A gate PASS would permit review only, not automatic adoption or completion of5.6/5.7/6.0 quality milestones. Source-level provenance and structural eligibility do not establish reliable factual entailment. No paid service introduced.

## Evidence

[Public raw browser evidence](./evidence/coverage-v9-r44/) · [new prospective32 scorecard](./evidence/coverage-v9-r44/ProspectivePublic32-scorecard.json) · [fresh full exact report](./evidence/coverage-v9-r44/FRESH_FULL_REPORT.md) · [combined decision](./evidence/coverage-v9-r44/combined-decision.json). Owner-only original source/key packs remain in the local full ZIP. All case answers/quotes/filenames are in the full local Markdown/JSON. Licensed public SQuAD/Wikipedia excerpts carry attribution/share-alike notices.
