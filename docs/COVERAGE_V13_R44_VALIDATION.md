# V13 repair-gating experiment — actual Chrome/MiniLM

**Regression gate: PASS. Actor40 confirmation: FAIL. Production remains r44.**

V13 preserves v11 whole-compound evidence unless a facet has a successful v12 actor/numeric repair preflight. No application runtime changes. Protocol committed before implementation; candidate, runner and unchanged267 inputs frozen before browser answers. All347 unit tests and strict offline checks pass.

Installed headless Chrome155.0.8059.40 on local HTTP used actual Xenova/all-MiniLM-L6-v2 q8 WASM. Qwen was disabled. Production UI outputs and isolated browser-executed candidate outputs are separately labelled; candidate scores are not a deployed-app score. Regression capture:243 Hybrid Q&A and24 unchanged separate lexical Comparison. No mock vectors, post-answer tuning, benchmark retries or paid services.

All88 source/key/manifest checks and frozen candidate/config remain unchanged. Twenty authoritative v9/v10/v11/v12 artifacts match their immutable archives. Historical Atlas manifest remains unavailable; current PDFs and independent PDF quotation checks are disclosed. Historical first scores remain unchanged, including V9 first24/1/6 plus1ungraded F06.

## Known in-sample regression sets

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
| V9Exposed32 | 32/0/0 | 32/0/0 |

Frozen regression checks:
```json
{
  "all_original_119_pass": true,
  "all_rq28_pass": true,
  "no_prior_pass_regressions": true,
  "all_exposed_compound_controls_pass": true,
  "provenance_intact": true,
  "no_new_false_acceptances_or_refusals": true
}
```

Previously passing cases and12 compound controls are checked across historical variants. Original119 use their unchanged semantic keys and independently reviewed quotation parity; RQ28 uses literal evidence; public questions require displayed gold groups in their original paragraph. Expanded retrieval context receives no credit. Different rubrics are not pooled into an accuracy claim.

## Actor40 — prospective public/adversarial first result

Created only after the regression gate passed. Four new article titles exclude all16 previously used public articles. Original SQuAD dataset hash verified; fixed SHA ordering/eligibility selected24 unchanged external questions,4 constructed compounds,4 standard unsupported controls and8 deliberately adversarial Who actor/object/site controls. Each source has a fictional approval appendix explicitly restricted to its own object and site. Six source/key/attribution hashes and the original questions are checked after capture. Questions, sources, key and rubric were committed before any Actor40 answers. No answer key was uploaded. All40 Hybrid cases captured once; no separate Comparison cases in this prospective pack.

This is prospective to the app, not sealed independent accuracy, representative sampling, official SQuAD EM/F1 or proof of entailment. Public/model exposure cannot be excluded;12 controls are self-authored. Its first result remains immutable.

| Variant | PASS | PARTIAL | FAIL | False acceptances | False refusals | Provenance |
|---|---:|---:|---:|---:|---:|---|
| baseline | 21 | 2 | 17 | 8 | 0 | 37/37 |
| fixed | 28 | 2 | 10 | 8 | 0 | 39/39 |
| section | 28 | 2 | 10 | 8 | 0 | 39/39 |
| paired_fixed | 28 | 2 | 10 | 8 | 0 | 39/39 |
| paired_section | 28 | 2 | 10 | 8 | 0 | 39/39 |

Both candidate variants pass22/24 original supported questions and2/4 compounds. Standard unsupported controls pass4/4 with zero citations; actor/object/site controls fail8/8. F02 omits the requested1875 year and F07 omits the predator-specialisation rationale; C01/C02 inherit those missing facts. All39 candidate citations are source-literal, but8 approval citations address a different object or site.31/39 are in the expected original paragraph; only28/39 contain a required answer span. Paragraph containment and literal provenance therefore overstate factual response quality if treated as entailment.

The same-session v12 fixed and section outputs match v13 answers/quotations exactly on all40 cases. The approval false acceptances also occur in the production UI baseline. This is an existing weakness exposed by new controls, not evidence that the v13 gating change introduced it. Baseline21/2/17 and candidate28/2/10 are results on this separate constructed test, not pooled historical accuracy.

Frozen confirmation checks:
```json
{
  "development_gate_passed": true,
  "fixed_supported_at_least_21": true,
  "fixed_compounds_all_pass": false,
  "fixed_unsupported_all_pass": false,
  "fixed_provenance_intact": true,
  "fixed_no_false_acceptance_or_refusal": false,
  "fixed_no_production_or_prior_section_pass_loss": true,
  "section_supported_at_least_21": true,
  "section_compounds_all_pass": false,
  "section_unsupported_all_pass": false,
  "section_provenance_intact": true,
  "section_no_false_acceptance_or_refusal": false,
  "section_no_production_or_prior_section_pass_loss": true
}
```

Fixed/section non-PASS cases:
- fixed/F02: FAIL; question: What was the first year that Yale and Harvard played football? Required groups matched [False]; false acceptance False; false refusal False.
- fixed/F07: FAIL; question: What is the logic behind the cicadas prime number evolutionary strategy? Required groups matched [False]; false acceptance False; false refusal False.
- fixed/C01: PARTIAL; question: What school was Walter Camp a captain for the football team? Also, What was the first year that Yale and Harvard played football? Required groups matched [True, False]; false acceptance False; false refusal False.
- fixed/C02: PARTIAL; question: What is the logic behind the cicadas prime number evolutionary strategy? Also, Other than 7 and 13, what other year interval do cicadas pupate?  Required groups matched [False, True]; false acceptance False; false refusal False.
- fixed/A01: FAIL; question: Who approves orbital mooring permits at the fictional Velora Annex? Required groups matched []; false acceptance True; false refusal False.
- fixed/A02: FAIL; question: Who approves routine ledger filings at the fictional Zevrin Outpost? Required groups matched []; false acceptance True; false refusal False.
- fixed/A03: FAIL; question: Who approves cryogenic antenna licences at the fictional Nerith Hall? Required groups matched []; false acceptance True; false refusal False.
- fixed/A04: FAIL; question: Who approves routine kit labels at the fictional Kavora Citadel? Required groups matched []; false acceptance True; false refusal False.
- fixed/A05: FAIL; question: Who approves interstellar transit seals at the fictional Solune Station? Required groups matched []; false acceptance True; false refusal False.
- fixed/A06: FAIL; question: Who approves routine berth charts at the fictional Mireth Dome? Required groups matched []; false acceptance True; false refusal False.
- fixed/A07: FAIL; question: Who approves lunar reactor certifications at the fictional Tavora House? Required groups matched []; false acceptance True; false refusal False.
- fixed/A08: FAIL; question: Who approves routine exhibit tags at the fictional Pelora Terminal? Required groups matched []; false acceptance True; false refusal False.
- section/F02: FAIL; question: What was the first year that Yale and Harvard played football? Required groups matched [False]; false acceptance False; false refusal False.
- section/F07: FAIL; question: What is the logic behind the cicadas prime number evolutionary strategy? Required groups matched [False]; false acceptance False; false refusal False.
- section/C01: PARTIAL; question: What school was Walter Camp a captain for the football team? Also, What was the first year that Yale and Harvard played football? Required groups matched [True, False]; false acceptance False; false refusal False.
- section/C02: PARTIAL; question: What is the logic behind the cicadas prime number evolutionary strategy? Also, Other than 7 and 13, what other year interval do cicadas pupate?  Required groups matched [False, True]; false acceptance False; false refusal False.
- section/A01: FAIL; question: Who approves orbital mooring permits at the fictional Velora Annex? Required groups matched []; false acceptance True; false refusal False.
- section/A02: FAIL; question: Who approves routine ledger filings at the fictional Zevrin Outpost? Required groups matched []; false acceptance True; false refusal False.
- section/A03: FAIL; question: Who approves cryogenic antenna licences at the fictional Nerith Hall? Required groups matched []; false acceptance True; false refusal False.
- section/A04: FAIL; question: Who approves routine kit labels at the fictional Kavora Citadel? Required groups matched []; false acceptance True; false refusal False.
- section/A05: FAIL; question: Who approves interstellar transit seals at the fictional Solune Station? Required groups matched []; false acceptance True; false refusal False.
- section/A06: FAIL; question: Who approves routine berth charts at the fictional Mireth Dome? Required groups matched []; false acceptance True; false refusal False.
- section/A07: FAIL; question: Who approves lunar reactor certifications at the fictional Tavora House? Required groups matched []; false acceptance True; false refusal False.
- section/A08: FAIL; question: Who approves routine exhibit tags at the fictional Pelora Terminal? Required groups matched []; false acceptance True; false refusal False.

See the complete Actor40 case report for exact answer strings, original displayed quotations, filenames and per-citation checks. Any unsupported case with a citation fails even if the quoted source itself is literal and includes a scope restriction. A source-literal quote does not establish that it answers the requested actor/object/site. No post-answer modifications, rescoring thresholds, retries or further sample are permitted by this protocol.

Citation provenance checks match source and quoted excerpt; public relevance is original-paragraph containment and direct-span matching, not semantic certification. Some PASS quotations retain broad surrounding context within the allowed paragraph. Heading-only, exact duplicate and contained redundant citation counts are separately audited; partial overlaps may remain. Actor recovery is a structural heuristic with actual cosine ordering, not an entailment model. A regression PASS only permits confirmation/review; production remains r44 during this task.

Next proposed work: require evidence to bind the requested actor, action, object and site before accepting an approval answer, while preserving supported controls. Treat Actor40 as exposed from now on and retain its first score. This task does not implement that change or consume another sample.

[Public scorecards and browser evidence](./evidence/coverage-v13-r44/) · [regression decision](./evidence/coverage-v13-r44/decision.json) · [citation diagnostics](./evidence/coverage-v13-r44/citation-diagnostics.json) · [hash audit](./evidence/coverage-v13-r44/integrity-audit.json). Full private regression outputs remain in the local evidence archive. Public source quotations retain SQuAD/Wikipedia attribution.
