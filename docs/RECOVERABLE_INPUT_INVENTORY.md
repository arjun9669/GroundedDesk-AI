# Recoverable historical evaluation inputs on the Mac

Date: **2026-10-20 (Asia/Kolkata)**. Baseline: `7d75820` on official `main`.
Scope: the original 739 exposed cases plus Vela32, **771 cases across 23 packs**.
This is an input-identity inventory; no model answers or new quality scores were
computed. Live 5.6/r44 and all first results remain unchanged.

Subsequent model work: [Prism32's first v39 run](V39_PRISM32_MAC_RESULTS.md) passes
32/32 in both variants, alongside Vela32. That gives 64 tested cases and 604
verified cases awaiting v39 testing. The inventory counts/statuses below and its
JSON preserve the earlier checkpoint before Prism32 questions; no original
inventory observation or input hash is rewritten.

GitHub CI for `7d75820` passed before this inventory was published.

## What is available

**19 packs / 668 cases** have original sources and keys whose bytes match their
existing frozen hashes. The audit checked **117 original input-file entries**,
including **75 source documents**, keys and available frozen protocol/rubric/
attribution files. IDs, order and exact question strings match the preserved
v38 fixed scorecard (the original first scorecard for Vela32).

The 668 cases comprise **628 Hybrid questions and 40 lexical Comparisons**.
Only Vela32's **32** have been model-tested with v39. The remaining **636** are
verified inputs, not passing model results. Neither these counts nor the unit
suite establish a pooled accuracy figure.

| Pack | Cases | Hybrid / Comparison | Native scoring family |
| --- | ---: | ---: | --- |
| Cobalt16 | 16 | 12 / 4 | Historical manual factual support |
| RetrievalQuality28 | 28 | 28 / 0 | Exact sentence development criteria |
| ExternalSQuAD24 | 24 | 24 / 0 | Gold span and gold context |
| FreshMixed32 | 32 | 32 / 0 | Gold groups and gold context |
| FreshConfirmation32 | 32 | 32 / 0 | Gold groups and gold context |
| V9Exposed32 | 32 | 32 / 0 | Gold groups and gold context |
| Actor40 | 40 | 40 / 0 | Gold groups, actor controls |
| Scope48 | 48 | 48 / 0 | Gold groups, scope controls |
| Confirmation48 | 48 | 48 / 0 | Gold groups and gold context |
| Precision48 | 48 | 48 / 0 | Gold groups and paragraph precision |
| Binding64 | 64 | 60 / 4 | Binding groups and displayed evidence |
| Cedar32 | 32 | 28 / 4 | Literal expected context and fact groups |
| Bracken32 | 32 | 28 / 4 | Literal expected context and fact groups |
| Flint32 | 32 | 28 / 4 | Literal expected context and fact groups |
| Morrow32 | 32 | 28 / 4 | Literal expected context and fact groups |
| Hearth32 | 32 | 28 / 4 | Literal expected context and fact groups |
| Lumen32 | 32 | 28 / 4 | Literal expected context and fact groups |
| Prism32 | 32 | 28 / 4 | Literal expected context and fact groups |
| Vela32 | 32 | 28 / 4 | Literal expected context and fact groups; v39 partial gate PASS |

“Fresh” in an old pack name is historical. Every pack here is now exposed and
cannot be presented as fresh confirmation again.

The [machine-readable inventory](evidence/recoverable-input-inventory-20261020/inventory.json)
lists every original key, source/criteria hash, freeze location, native scoring
reference and execution status. References to historical scorers record their
current file hashes and availability; this does not certify every archived
code dependency or make an old scorer runnable on the Mac.

## What is still missing

| Pack | Cases | Missing prerequisite |
| --- | ---: | --- |
| Lantern32 | 32 | Complete original ZIP/source/key/manifest bundle |
| Aster32 | 32 | Complete original ZIP/source/key/manifest bundle |
| Meridian24 | 24 | Original external `r18-independent` input bundle |
| Atlas15 | 15 | Original three PDFs and their recorded run-input identities; no original historical manifest was supplied |
| **Total** | **103** | Original inputs not located in the earlier Mac search |

Their archived answers, screenshots, quotations and case IDs remain available.
They are historical evidence, not replacements for missing complete source bytes
or original keys. Synthetic Atlas text used by unit tests cannot qualify the
original-PDF study. The original combined `coverage-v38-inputs/run-config.json`,
its integrity manifest and external manual-adjudication dependencies also remain
unavailable. This inventory is not a byte-equivalent reconstruction of them.

## Next development priority

Prepare a new frozen **Prism32** v39 regression first: it is the last 32-case pack
before Vela32, with an available source/key/config/rubric and preserved prior
results. Then extend through Lumen32 and Hearth32 before older scoring families.
This order reduces runner/scorer adaptation while broadening dispatch and
completeness controls. Keep this as an explicit partial exposed gate.

Input verification is only the first prerequisite. Before asking new model
questions, the next task must:

1. Add a new runner/configuration and freeze them without altering the published
   Vela32 runner/freeze or any old pack. Preserve exact questions and document pairs.
2. Port each pack's native criteria and historical PASS/false-acceptance/refusal
   preservation checks; do not apply Vela32's 32/32 rule to all older corpora.
3. Qualify environment and actual MiniLM source/query/planner-facet vectors,
   capture once to new evidence paths, then score with frozen criteria.
4. Preserve original failures, blocked captures, retake qualifications and every
   first result. Stop and ask after a required failure.

The full 771-case gate remains **NOT RUN**, fresh confirmation remains **NOT RUN**,
and live adoption remains **HOLD**. Verifying the other inputs makes progress
possible without Windows; it does not close the 103-case input gap.

Inventory-task checks: the command below passed all 117 input hashes and exact
historical alignment; bundled Node 24.19.0 passed all 596 unit tests and the
strict 28-case Keyword evaluation. Python syntax, recorded JSON accounting/
hashes, documentation links and diff whitespace checks passed. These are
engineering/input checks, not additional MiniLM measurements.

## Reproduce the inventory

From the official checkout with Python 3.10+, choose a new output file:

```sh
python3 tools/inventory_evaluation_inputs.py --output /absolute/path/to/new-inventory.json
```

On Windows use `py -3` and a Windows output path. The script checks original
hashes and question alignment before writing, never overwrites output, does not
rewrite paths in old files, and neither loads a model nor generates answers.
An unavailable or changed required input raises an error; do not normalize bytes
or regenerate a key to bypass it. The committed inventory preserves this first
observation, including its repository baseline and timestamp.
