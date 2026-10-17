# Prism32 — first prospective confirmation of unchanged v36

**First result: 29 PASS / 0 PARTIAL / 3 FAIL in both fixed and section variants. Confirmation gate: FAIL. Conditional integration-readiness work STOPPED. Live 5.6/build 2026-10-13-r44 and capacity limits remain unchanged.**

This newly authored stress confirmation was prospectively frozen; it is not externally blinded independent accuracy or representative sampling. The same assistant authored and reviewed it with knowledge of the code and earlier failures. Protocol bca14a4 preceded authoring; preparation ea91d12 and pre-freeze archive-label correction 9060e46 preceded freeze 5472e999b3121d3caaf0adaffb1cb247051a06d4 and every answer. No dry-run answers, filtering, resampling, source simplification, replacement set or retries. Candidate v36 and paired v35 are unchanged from merged bba4e2479f16baa98c4cc5d41293213fef7ddd2f.

Only four fictional TXT documents were uploaded. 28 Hybrid cases used actual local Xenova/all-MiniLM-L6-v2 q8 WASM, Qwen off; 4 separate lexical two-document Comparisons were not Hybrid. Installed headless Chrome 155.0.8059.80 on local unchanged r44 captured production UI before isolated v36 fixed/section and paired v35 outputs. This is not an attached visible tab or deployed-candidate accuracy. Fresh finite unit 384D source/query/facet vectors were saved before candidate use. No mock-vector accuracy or saved-vector replay.

Publication date 2026-10-18 follows the client date. Raw machine receipts retain their original timestamp/timezone notation; none is rewritten.

## First native scorecard

|Workflow|Fixed PASS/PARTIAL/FAIL|Section PASS/PARTIAL/FAIL|
|---|---|---|
|28 Hybrid|25 / 0 / 3|25 / 0 / 3|
|4 lexical Comparison|4 / 0 / 0|4 / 0 / 0|
|Prism32 total|29 / 0 / 3|29 / 0 / 3|

|Variant|PASS|PARTIAL|FAIL|Literal citations|Relevant citations|False acceptance|False refusal|
|---|---:|---:|---:|---:|---:|---:|---:|
|baseline|13|5|14|36/36|19/36|6|0|
|fixed|29|0|3|28/28|26/28|0|1|
|section|29|0|3|28/28|26/28|0|1|
|paired_fixed|25|2|5|29/29|23/29|1|1|
|paired_section|25|2|5|29/29|23/29|1|1|

Both candidate variants: 28/28 citations literal, 26/28 relevant under frozen expected-context precision; 32/32 citation-number integrity. All 8 unsupported/ambiguity cases explicitly refuse with zero citations. Zero unsupported non-refusal false acceptances; one supported false refusal (P04) and two supported nonresponsive answers (P10/P17). The latter are recorded separately, not hidden by the zero false-acceptance count. No fabricated affirmative fact was observed in assistant review; authentic wrong-section text still fails factual support.

## Failures and expected evidence

### P04 — FAIL

A Liraven Planetarium dispatch request is cleared exactly at 16:20. When does it leave, and what hold can prevent departure?

FAIL: explicit no-evidence refusal despite the source saying At 16:20 or later means next service day, unless optical-safety hold is open. One supported false refusal. Actual source/key retain spaces in the exact evidence below. Production baseline PASS is lost in both v36 variants; paired v35 also refuses, so this is inherited from v35 rather than a new v36-versus-v35 loss. Saved actual lab screenshot inspected.

Expected literal source evidence:

01_Liraven_Planetarium.txt

> D-01. Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open.

Observed fixed and identical section answer:

I can't find this in the provided documents.

### P10 — FAIL

Which documents belong in the Osvik Puppet Theatre touring packet?

FAIL: cited Osvik history about the 1939 move, 1986 restoration and rejected 2017 closure plan does not list any touring-packet item. Correct file but wrong section; all four requested groups absent. Literal/nonresponsive supported answer, not unsupported false acceptance or fabricated history. Saved screenshot inspected.

Expected literal source evidence:

02_Osvik_Puppet_Theatre.txt

> T-03. The touring packet must contain:
> - a puppet inventory
> - a condition sheet
> - a transport permit
> - a return record

Observed fixed and identical section answer:

[1] The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

02_Osvik_Puppet_Theatre.txt

> The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

### P17 — FAIL

How long are Yalara Grain Exchange completed loading records kept, and what dispute can extend that time?

FAIL: cited Yalara acknowledgement within six working hours does not answer loading-record retention. Expected 8 months plus unresolved weighing-dispute exception are absent. Correct file but wrong section; nonresponsive supported answer, not a false refusal or fabricated duration. Saved screenshot inspected.

Expected literal source evidence:

04_Yalara_Grain_Exchange.txt

> GX-04. Completed loading records are kept for 8 months, unless an unresolved weighing dispute requires longer retention.

Observed fixed and identical section answer:

[1] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

04_Yalara_Grain_Exchange.txt

> A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

## Preservation and paired comparison

P04 is a production-r44-baseline PASS lost in both candidate variants, violating the frozen preservation gate. Paired v35 also refuses P04: this is an inherited candidate loss against production, not a new v36-versus-v35 PASS regression. No paired-v35 PASS was lost.

On this same new corpus, paired v35 records 25/2/5 both; v36 records 29/0/3 both. P14,P21,P30,P32 improve to PASS. Other 28 cases have 56 exact case/variant answer-filename-quotation matches. Fixed/section outputs match in all 32 cases. All four lexical Comparisons pass, including the two durations/exceptions, complete 90/45/15 and 132/66/33 maintenance groups, acknowledgement limits and all 4+5 packet items. These are paired results on Prism32, not historical Lumen32 scores.

## Case-by-case review

|Case|Workflow|Fixed|Section|Review|
|---|---|---|---|---|
|P01|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P02|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P03|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P04|hybrid|FAIL|FAIL|FAIL: explicit no-evidence refusal despite the source saying At 16:20 or later means next service day, unless optical-safety hold is open. One supported false refusal. Actual source/key retain spaces in the exact evidence below. Production baseline PASS is lost in both v36 variants; paired v35 also refuses, so this is inherited from v35 rather than a new v36-versus-v35 loss. Saved actual lab screenshot inspected.|
|P05|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P06|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P07|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P08|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P09|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P10|hybrid|FAIL|FAIL|FAIL: cited Osvik history about the 1939 move, 1986 restoration and rejected 2017 closure plan does not list any touring-packet item. Correct file but wrong section; all four requested groups absent. Literal/nonresponsive supported answer, not unsupported false acceptance or fabricated history. Saved screenshot inspected.|
|P11|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P12|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P13|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P14|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P15|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P16|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P17|hybrid|FAIL|FAIL|FAIL: cited Yalara acknowledgement within six working hours does not answer loading-record retention. Expected 8 months plus unresolved weighing-dispute exception are absent. Correct file but wrong section; nonresponsive supported answer, not a false refusal or fabricated duration. Saved screenshot inspected.|
|P18|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P19|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P20|hybrid|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P21|hybrid|PASS|PASS|Explicit standard no-evidence refusal with zero citations, as required by original unsupported/ambiguity rubric.|
|P22|hybrid|PASS|PASS|Explicit standard no-evidence refusal with zero citations, as required by original unsupported/ambiguity rubric.|
|P23|hybrid|PASS|PASS|Explicit standard no-evidence refusal with zero citations, as required by original unsupported/ambiguity rubric.|
|P24|hybrid|PASS|PASS|Explicit standard no-evidence refusal with zero citations, as required by original unsupported/ambiguity rubric.|
|P25|hybrid|PASS|PASS|Explicit standard no-evidence refusal with zero citations, as required by original unsupported/ambiguity rubric.|
|P26|hybrid|PASS|PASS|Explicit standard no-evidence refusal with zero citations, as required by original unsupported/ambiguity rubric.|
|P27|hybrid|PASS|PASS|Explicit standard no-evidence refusal with zero citations, as required by original unsupported/ambiguity rubric.|
|P28|hybrid|PASS|PASS|Explicit standard no-evidence refusal with zero citations, as required by original unsupported/ambiguity rubric.|
|P29|comparison|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P30|comparison|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P31|comparison|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|
|P32|comparison|PASS|PASS|Read displayed quotations against original literal groups and expected source/context; all groups covered with valid citation numbering and provenance. No contradiction found; no inferred or expanded-context credit.|

## Different test sets and immutable history

|Record|Preserved result|Classification|
|---|---|---|
|V36 exposed 707 regression|Native and engineering PASS; Lumen32 retake32/0/0 both|Exposed regression with original per-pack criteria, not 707/707 accuracy|
|Lumen32 original first v35 confirmation|28/2/2 both; FAIL|Earlier prospective author-created stress set, not rescored|
|Prism32 first v36 confirmation|29/0/3 both; FAIL|New prospective author-created stress set, not external blind accuracy|

Do not pool these different sets or replace earlier first results. All 18 earlier first archives rehashed unchanged, including v36 first regression, Lumen32 first, v35/v34 records and Hearth32 original BLOCKED/ungraded. All earlier failed gates and explicit reporting errata remain immutable. Prior Atlas historical-manifest availability and Binding64 key-wording qualifications remain unchanged.

## Integrity, environment and limits

Frozen files: 67; 68 served hashes verified before questions. 551 existing unit controls and strict bundled checks pass separately from accuracy. Capture audit:

```json
{
  "status": "COMPLETE",
  "cases_once": 32,
  "hybrid": 28,
  "lexical_comparison": 4,
  "source_vectors": 56,
  "query_vectors": 28,
  "facet_vectors": 2,
  "finite_unit384": true,
  "citation_checks": 160,
  "literal_citation_checks": 150,
  "paired_errors": [],
  "native_gate": "FAIL"
}
```

First archive `GroundedDesk-Prism32-v36-first-evidence.zip`; SHA-256 `1ce3190329a8a4e9dce518147dab63bb782c0de295d050aa2b44d5c22ace9317`; 333 verified members. First answers/native grades sealed before broader review; no grade changed.

Read-only post-seal audit verifies actual pre-candidate body-cosine anchors and exact literal offsets for the two refined Hybrid sources (P14 fixed/section). This is capture verification, not a new question, saved-vector replay or extra accuracy case.

Source hashes:

- `01_Liraven_Planetarium.txt`: `213860cc493d77a40a50b1d78ebdcded62c4f797027ddcd826969745d1adb9d9`
- `02_Osvik_Puppet_Theatre.txt`: `7ecd2c2d5805aa1aade87d9a7a684a9cc744a7a9ce6584005ba0ce4cf55b325e`
- `03_Tavren_Ferry_Workshop.txt`: `009c2b55a2d38200a3f51723181617eefa409f61730fb8b1286e7f39046ce447`
- `04_Yalara_Grain_Exchange.txt`: `22da6d53a1b9a94dc0d71a138fb673126cf486180015672f7acee4e5a2e19134`

Author-created prospective stress set with knowledge of prior failures/code; not externally blinded independent accuracy or representative sampling. Installed headless Chrome/local unchanged r44 with isolated candidate modules, not attached visible tab or deployed-candidate accuracy. Original strict expected-context rubric unchanged. No performance/memory/navigation/export or 6.0 readiness qualification.

## Decision and next work

STOPPED: first prospective confirmation FAIL. No integration measurements or code changes.
A later separately frozen repair should address cutoff paraphrases, packet-question intent and retention-section selection. Preserve this first 29/0/3 result; no repair, benchmark retry or replacement set in this task.

Capacity expansion stays deferred. No runtime/memory, citation-navigation or export measurements were begun; no candidate code or application changes, live adoption or 6.0-readiness claim.


## Exact native answers and displayed quotations

# Prism32 — first prospective v36 confirmation

This is an author-created stress set, not independent third-party accuracy. Actual installed headless Chrome; production UI baseline and isolated v36 fixed/section outputs are distinct. Four separate lexical Comparisons are not Hybrid. No question retries. r44 stays unchanged.

```json
{
  "summary": {
    "baseline": {
      "ERROR": 0,
      "PASS": 13,
      "PARTIAL": 5,
      "FAIL": 14,
      "citations": 36,
      "literal": 36,
      "relevant": 19,
      "citation_integrity_cases": 32,
      "false_acceptances": 6,
      "false_refusals": 0
    },
    "fixed": {
      "ERROR": 0,
      "PASS": 29,
      "PARTIAL": 0,
      "FAIL": 3,
      "citations": 28,
      "literal": 28,
      "relevant": 26,
      "citation_integrity_cases": 32,
      "false_acceptances": 0,
      "false_refusals": 1
    },
    "section": {
      "ERROR": 0,
      "PASS": 29,
      "PARTIAL": 0,
      "FAIL": 3,
      "citations": 28,
      "literal": 28,
      "relevant": 26,
      "citation_integrity_cases": 32,
      "false_acceptances": 0,
      "false_refusals": 1
    },
    "paired_fixed": {
      "ERROR": 0,
      "PASS": 25,
      "PARTIAL": 2,
      "FAIL": 5,
      "citations": 29,
      "literal": 29,
      "relevant": 23,
      "citation_integrity_cases": 32,
      "false_acceptances": 1,
      "false_refusals": 1
    },
    "paired_section": {
      "ERROR": 0,
      "PASS": 25,
      "PARTIAL": 2,
      "FAIL": 5,
      "citations": 29,
      "literal": 29,
      "relevant": 23,
      "citation_integrity_cases": 32,
      "false_acceptances": 1,
      "false_refusals": 1
    }
  },
  "regressions": {
    "fixed": [
      "P04"
    ],
    "section": [
      "P04"
    ]
  },
  "gate": "FAIL"
}
```

## P01 — In what year did public dome shows begin at Liraven Planetarium?

**baseline: PASS**

[1] Liraven Planetarium began public dome shows in 1967.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Liraven Planetarium began public dome shows in 1967.

Frozen group matches: [true]

**fixed: PASS**

[1] Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Frozen group matches: [true]

**section: PASS**

[1] Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Frozen group matches: [true]

**paired_section: PASS**

[1] Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Frozen group matches: [true]

## P02 — What year was the second projector lens renewal at Liraven Planetarium completed?

**baseline: PASS**

[1] The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Frozen group matches: [true]

**fixed: PASS**

[1] Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Frozen group matches: [true]

**section: PASS**

[1] Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Frozen group matches: [true]

**paired_section: PASS**

[1] Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Frozen group matches: [true]

## P03 — Who must approve in writing a Yalara Grain Exchange purchase above 7400 credits?

**baseline: PASS**

[1] Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.

Frozen group matches: [true]

**fixed: PASS**

[1] Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.

Frozen group matches: [true]

**section: PASS**

[1] Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.

Frozen group matches: [true]

**paired_section: PASS**

[1] Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.

Frozen group matches: [true]

## P04 — A Liraven Planetarium dispatch request is cleared exactly at 16:20. When does it leave, and what hold can prevent departure?

**baseline: PASS**

[1] Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open.

Frozen group matches: [true,true]

**fixed: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false,false]

**section: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false,false]

**paired_fixed: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false,false]

**paired_section: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false,false]

## P05 — How many projector filters does Eris check per morning?

**baseline: PASS**

[1] Eris checks five projector filters per morning.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Eris checks five projector filters per morning.

Frozen group matches: [true]

**fixed: PASS**

[1] Eris checks five projector filters per morning.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Eris checks five projector filters per morning.

Frozen group matches: [true]

**section: PASS**

[1] Eris checks five projector filters per morning.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Eris checks five projector filters per morning.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] Eris checks five projector filters per morning.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Eris checks five projector filters per morning.

Frozen group matches: [true]

**paired_section: PASS**

[1] Eris checks five projector filters per morning.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Eris checks five projector filters per morning.

Frozen group matches: [true]

## P06 — When was the Osvik Puppet Theatre rehearsal room restoration completed?

**baseline: FAIL**

[1] The Osvik Puppet Theatre rehearsal room moved in 1939.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant false.

> The Osvik Puppet Theatre rehearsal room moved in 1939.

Frozen group matches: [false]

**fixed: PASS**

[1] The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Frozen group matches: [true]

**section: PASS**

[1] The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Frozen group matches: [true]

**paired_section: PASS**

[1] The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Frozen group matches: [true]

## P07 — How long are Osvik Puppet Theatre signed touring records kept, including the exception for an unresolved ownership claim?

**baseline: PASS**

[1] Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Frozen group matches: [true,true]

**fixed: PASS**

[1] Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Frozen group matches: [true,true]

**section: PASS**

[1] Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Frozen group matches: [true,true]

**paired_fixed: PASS**

[1] Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Frozen group matches: [true,true]

**paired_section: PASS**

[1] Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Frozen group matches: [true,true]

## P08 — What is the absolute minimum winter temperature in the Osvik Puppet Theatre prop store?

**baseline: FAIL**

[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant false.

> The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Frozen group matches: [false]

**fixed: PASS**

[1] Its absolute minimum winter temperature is 1 degree Celsius.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> Its absolute minimum winter temperature is 1 degree Celsius.

Frozen group matches: [true]

**section: PASS**

[1] Its absolute minimum winter temperature is 1 degree Celsius.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> Its absolute minimum winter temperature is 1 degree Celsius.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] Its absolute minimum winter temperature is 1 degree Celsius.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> Its absolute minimum winter temperature is 1 degree Celsius.

Frozen group matches: [true]

**paired_section: PASS**

[1] Its absolute minimum winter temperature is 1 degree Celsius.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> Its absolute minimum winter temperature is 1 degree Celsius.

Frozen group matches: [true]

## P09 — Give the highest monthly mean temperature in the Osvik Puppet Theatre prop store and the month it occurs.

**baseline: FAIL**

[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant false.

> The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Frozen group matches: [false]

**fixed: PASS**

[1] The highest monthly mean temperature is 27 degrees Celsius in September.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The highest monthly mean temperature is 27 degrees Celsius in September.

Frozen group matches: [true]

**section: PASS**

[1] The highest monthly mean temperature is 27 degrees Celsius in September.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The highest monthly mean temperature is 27 degrees Celsius in September.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] The highest monthly mean temperature is 27 degrees Celsius in September.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The highest monthly mean temperature is 27 degrees Celsius in September.

Frozen group matches: [true]

**paired_section: PASS**

[1] The highest monthly mean temperature is 27 degrees Celsius in September.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The highest monthly mean temperature is 27 degrees Celsius in September.

Frozen group matches: [true]

## P10 — Which documents belong in the Osvik Puppet Theatre touring packet?

**baseline: FAIL**

[1] The Osvik Puppet Theatre rehearsal room moved in 1939.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant false.

> The Osvik Puppet Theatre rehearsal room moved in 1939.

Frozen group matches: [false,false,false,false]

**fixed: FAIL**

[1] The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant false.

> The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Frozen group matches: [false,false,false,false]

**section: FAIL**

[1] The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant false.

> The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Frozen group matches: [false,false,false,false]

**paired_fixed: FAIL**

[1] The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant false.

> The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Frozen group matches: [false,false,false,false]

**paired_section: FAIL**

[1] The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant false.

> The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Frozen group matches: [false,false,false,false]

## P11 — When was the Tavren Ferry Workshop cable tower rebuilt?

**baseline: FAIL**

[1] ## Workshop operating notes
At Tavren Ferry Workshop, the cable tower was rebuilt in 1994.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant false.

> ## Workshop operating notes
> At Tavren Ferry Workshop, the cable tower was rebuilt in 1994.

Frozen group matches: [false]

**fixed: PASS**

[1] At Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> At Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012.

Frozen group matches: [true]

**section: PASS**

[1] At Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> At Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] At Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> At Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012.

Frozen group matches: [true]

**paired_section: PASS**

[1] At Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> At Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012.

Frozen group matches: [true]

## P12 — What is the highest recorded daily temperature at Tavren Ferry Workshop?

**baseline: FAIL**

[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant false.

> The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August.

Frozen group matches: [false]

**fixed: PASS**

[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Frozen group matches: [true]

**section: PASS**

[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Frozen group matches: [true]

**paired_section: PASS**

[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Frozen group matches: [true]

## P13 — How many cable-tension readings does Varen record per shift?

**baseline: PASS**

[1] Varen records seven cable-tension readings per shift.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> Varen records seven cable-tension readings per shift.

Frozen group matches: [true]

**fixed: PASS**

[1] Varen records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> Varen records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month.

Frozen group matches: [true]

**section: PASS**

[1] Varen records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> Varen records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] Varen records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> Varen records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month.

Frozen group matches: [true]

**paired_section: PASS**

[1] Varen records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> Varen records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month.

Frozen group matches: [true]

## P14 — Give the Tavren Ferry Workshop loading winch lubrication intervals under normal and salt-spray conditions, together with its inspection interval.

**baseline: PARTIAL**

[1] The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions.

Frozen group matches: [true,false,false]

**fixed: PASS**

[1] The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter.

Frozen group matches: [true,true,true]

**section: PASS**

[1] The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter.

Frozen group matches: [true,true,true]

**paired_fixed: FAIL**

[1] The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter. The office cabinet was painted in 2021.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant false.

> The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter. The office cabinet was painted in 2021.

Frozen group matches: [false,false,false]

**paired_section: FAIL**

[1] The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter. The office cabinet was painted in 2021.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant false.

> The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter. The office cabinet was painted in 2021.

Frozen group matches: [false,false,false]

## P15 — How soon is a Yalara Grain Exchange loading request acknowledged, and does acknowledgement guarantee a loading slot?

**baseline: PASS**

[1] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Frozen group matches: [true,true]

**fixed: PASS**

[1] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Frozen group matches: [true,true]

**section: PASS**

[1] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Frozen group matches: [true,true]

**paired_fixed: PASS**

[1] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Frozen group matches: [true,true]

**paired_section: PASS**

[1] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Frozen group matches: [true,true]

## P16 — List every item in the Yalara Grain Exchange dispatch packet.

**baseline: FAIL**

[1] Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant false.

> Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions.

Frozen group matches: [false,false,false,false,false]

**fixed: PASS**

[1] The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Frozen group matches: [true,true,true,true,true]

**section: PASS**

[1] The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Frozen group matches: [true,true,true,true,true]

**paired_fixed: PASS**

[1] The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Frozen group matches: [true,true,true,true,true]

**paired_section: PASS**

[1] The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Frozen group matches: [true,true,true,true,true]

## P17 — How long are Yalara Grain Exchange completed loading records kept, and what dispute can extend that time?

**baseline: FAIL**

[1] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant false.

> A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Frozen group matches: [false,false]

**fixed: FAIL**

[1] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant false.

> A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Frozen group matches: [false,false]

**section: FAIL**

[1] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant false.

> A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Frozen group matches: [false,false]

**paired_fixed: FAIL**

[1] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant false.

> A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Frozen group matches: [false,false]

**paired_section: FAIL**

[1] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant false.

> A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Frozen group matches: [false,false]

## P18 — What is the winter average temperature in the Osvik Puppet Theatre prop store?

**baseline: PASS**

[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Frozen group matches: [true]

**fixed: PASS**

[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Frozen group matches: [true]

**section: PASS**

[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Frozen group matches: [true]

**paired_section: PASS**

[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Frozen group matches: [true]

## P19 — Which month has the highest monthly mean temperature at Tavren Ferry Workshop, and what is that mean?

**baseline: PASS**

[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August.

Frozen group matches: [true]

**fixed: PASS**

[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Frozen group matches: [true]

**section: PASS**

[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Frozen group matches: [true]

**paired_section: PASS**

[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.

Frozen group matches: [true]

## P20 — In what year did public dome shows begin at Liraven Planetarium? Also, when was the Osvik Puppet Theatre rehearsal room restoration completed?

**baseline: PARTIAL**

[1] Liraven Planetarium began public dome shows in 1967.

[2] The Osvik Puppet Theatre rehearsal room moved in 1939.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Liraven Planetarium began public dome shows in 1967.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant false.

> The Osvik Puppet Theatre rehearsal room moved in 1939.

Frozen group matches: [true,false]

**fixed: PASS**

[1] Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

[2] The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Frozen group matches: [true,true]

**section: PASS**

[1] Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

[2] The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Frozen group matches: [true,true]

**paired_fixed: PASS**

[1] Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

[2] The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Frozen group matches: [true,true]

**paired_section: PASS**

[1] Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

[2] The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.

Frozen group matches: [true,true]

## P21 — When was the Liraven Planetarium projector lens renewed?

**baseline: FAIL**

[1] Liraven Planetarium began public dome shows in 1967.

Source: 01_Liraven_Planetarium.txt; literal true; relevant false.

> Liraven Planetarium began public dome shows in 1967.

Frozen group matches: []

**fixed: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**section: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**paired_fixed: FAIL**

[1] Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Source: 01_Liraven_Planetarium.txt; literal true; relevant false.

> Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Frozen group matches: []

**paired_section: FAIL**

[1] Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Source: 01_Liraven_Planetarium.txt; literal true; relevant false.

> Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.

Frozen group matches: []

## P22 — What year did the Osvik Puppet Theatre prop annex close?

**baseline: FAIL**

[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant false.

> The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.

Frozen group matches: []

**fixed: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**section: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**paired_fixed: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**paired_section: PASS**

I can't find this in the provided documents.

Frozen group matches: []

## P23 — When was the Tavren Ferry Workshop ramp shelter rebuilt?

**baseline: FAIL**

[1] ## Workshop operating notes
At Tavren Ferry Workshop, the cable tower was rebuilt in 1994.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant false.

> ## Workshop operating notes
> At Tavren Ferry Workshop, the cable tower was rebuilt in 1994.

Frozen group matches: []

**fixed: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**section: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**paired_fixed: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**paired_section: PASS**

I can't find this in the provided documents.

Frozen group matches: []

## P24 — How many door hinges does Eris check per morning?

**baseline: FAIL**

[1] Nalo checks three door hinges per morning.

Source: 01_Liraven_Planetarium.txt; literal true; relevant false.

> Nalo checks three door hinges per morning.

Frozen group matches: []

**fixed: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**section: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**paired_fixed: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**paired_section: PASS**

I can't find this in the provided documents.

Frozen group matches: []

## P25 — What is the bank account number of Yalara Grain Exchange?

**baseline: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**fixed: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**section: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**paired_fixed: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**paired_section: PASS**

I can't find this in the provided documents.

Frozen group matches: []

## P26 — What exact torque in newton-metres is specified for Tavren Ferry Workshop winch bolts?

**baseline: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**fixed: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**section: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**paired_fixed: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**paired_section: PASS**

I can't find this in the provided documents.

Frozen group matches: []

## P27 — What is the absolute minimum winter temperature in the Liraven Planetarium dome store?

**baseline: FAIL**

[1] Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius.

Source: 01_Liraven_Planetarium.txt; literal true; relevant false.

> Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius.

Frozen group matches: []

**fixed: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**section: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**paired_fixed: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**paired_section: PASS**

I can't find this in the provided documents.

Frozen group matches: []

## P28 — What is the highest monthly mean temperature at Neskar Mirror Depot?

**baseline: FAIL**

[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August.

[2] The highest monthly mean temperature is 27 degrees Celsius in September.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant false.

> The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant false.

> The highest monthly mean temperature is 27 degrees Celsius in September.

Frozen group matches: []

**fixed: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**section: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**paired_fixed: PASS**

I can't find this in the provided documents.

Frozen group matches: []

**paired_section: PASS**

I can't find this in the provided documents.

Frozen group matches: []

## P29 — Compare movement-slip retention at Liraven Planetarium and signed-touring-record retention at Osvik Puppet Theatre, including both hold and claim exceptions.

**baseline: PASS**

[1] Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released.

[2] Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Frozen group matches: [true,true,true,true]

**fixed: PASS**

[1] Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released.

[2] Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Frozen group matches: [true,true,true,true]

**section: PASS**

[1] Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released.

[2] Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Frozen group matches: [true,true,true,true]

**paired_fixed: PASS**

[1] Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released.

[2] Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Frozen group matches: [true,true,true,true]

**paired_section: PASS**

[1] Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released.

[2] Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.

Frozen group matches: [true,true,true,true]

## P30 — Compare normal and exception lubrication or greasing plus inspection intervals for the Tavren Ferry Workshop salt-spray loading winch and Yalara Grain Exchange dust-heavy conveyor.

**baseline: PARTIAL**

[1] The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions.

[2] Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay.

Frozen group matches: [true,false,false,true,true,true]

**fixed: PASS**

[1] The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter.

[2] Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay.

Frozen group matches: [true,true,true,true,true,true]

**section: PASS**

[1] The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter.

[2] Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant true.

> The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay.

Frozen group matches: [true,true,true,true,true,true]

**paired_fixed: PARTIAL**

[1] The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter. The office cabinet was painted in 2021.

[2] Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant false.

> The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter. The office cabinet was painted in 2021.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay.

Frozen group matches: [false,false,false,true,true,true]

**paired_section: PARTIAL**

[1] The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter. The office cabinet was painted in 2021.

[2] Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay.

Source: 03_Tavren_Ferry_Workshop.txt; literal true; relevant false.

> The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter. The office cabinet was painted in 2021.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay.

Frozen group matches: [false,false,false,true,true,true]

## P31 — Compare acknowledgement deadlines and their limits for Liraven Planetarium dome-booking requests and Yalara Grain Exchange loading requests.

**baseline: PARTIAL**

[1] Acknowledge dome-booking requests within two business days.

[2] A loading request at Yalara Grain Exchange is acknowledged within six working hours.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Acknowledge dome-booking requests within two business days.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> A loading request at Yalara Grain Exchange is acknowledged within six working hours.

Frozen group matches: [true,false,true,false]

**fixed: PASS**

[1] Acknowledge dome-booking requests within two business days. An acknowledgement is not a guarantee that seats remain available.

[2] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Acknowledge dome-booking requests within two business days. An acknowledgement is not a guarantee that seats remain available.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Frozen group matches: [true,true,true,true]

**section: PASS**

[1] Acknowledge dome-booking requests within two business days. An acknowledgement is not a guarantee that seats remain available.

[2] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Acknowledge dome-booking requests within two business days. An acknowledgement is not a guarantee that seats remain available.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Frozen group matches: [true,true,true,true]

**paired_fixed: PASS**

[1] Acknowledge dome-booking requests within two business days. An acknowledgement is not a guarantee that seats remain available.

[2] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Acknowledge dome-booking requests within two business days. An acknowledgement is not a guarantee that seats remain available.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Frozen group matches: [true,true,true,true]

**paired_section: PASS**

[1] Acknowledge dome-booking requests within two business days. An acknowledgement is not a guarantee that seats remain available.

[2] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Source: 01_Liraven_Planetarium.txt; literal true; relevant true.

> Acknowledge dome-booking requests within two business days. An acknowledgement is not a guarantee that seats remain available.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.

Frozen group matches: [true,true,true,true]

## P32 — Compare all contents of the Osvik Puppet Theatre touring packet and Yalara Grain Exchange dispatch packet.

**baseline: PARTIAL**

[1] The touring packet must contain:
- a puppet inventory
- a condition sheet
- a transport permit
- a return record
T-04.

[2] The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant false.

> The touring packet must contain:
> - a puppet inventory
> - a condition sheet
> - a transport permit
> - a return record
> T-04.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Frozen group matches: [false,false,false,false,true,true,true,true,true]

**fixed: PASS**

[1] The touring packet must contain:
- a puppet inventory
- a condition sheet
- a transport permit
- a return record

[2] The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The touring packet must contain:
> - a puppet inventory
> - a condition sheet
> - a transport permit
> - a return record

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Frozen group matches: [true,true,true,true,true,true,true,true,true]

**section: PASS**

[1] The touring packet must contain:
- a puppet inventory
- a condition sheet
- a transport permit
- a return record

[2] The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant true.

> The touring packet must contain:
> - a puppet inventory
> - a condition sheet
> - a transport permit
> - a return record

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Frozen group matches: [true,true,true,true,true,true,true,true,true]

**paired_fixed: PARTIAL**

[1] The touring packet must contain:
- a puppet inventory
- a condition sheet
- a transport permit
- a return record
T-04.

[2] The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant false.

> The touring packet must contain:
> - a puppet inventory
> - a condition sheet
> - a transport permit
> - a return record
> T-04.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Frozen group matches: [false,false,false,false,true,true,true,true,true]

**paired_section: PARTIAL**

[1] The touring packet must contain:
- a puppet inventory
- a condition sheet
- a transport permit
- a return record
T-04.

[2] The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Source: 02_Osvik_Puppet_Theatre.txt; literal true; relevant false.

> The touring packet must contain:
> - a puppet inventory
> - a condition sheet
> - a transport permit
> - a return record
> T-04.

Source: 04_Yalara_Grain_Exchange.txt; literal true; relevant true.

> The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.

Frozen group matches: [false,false,false,false,true,true,true,true,true]


## Exact actual production UI observations

### P01 — In what year did public dome shows begin at Liraven Planetarium?

```json
{
  "id": "P01",
  "question": "In what year did public dome shows begin at Liraven Planetarium?",
  "workflow": "hybrid",
  "original_question": "In what year did public dome shows begin at Liraven Planetarium?",
  "expected_display": "In what year did public dome shows begin at Liraven Planetarium?",
  "rendered_question": "In what year did public dome shows begin at Liraven Planetarium?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] Liraven Planetarium began public dome shows in 1967.",
  "sources": [
    {
      "filename": "01_Liraven_Planetarium.txt",
      "excerpt": "Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.\n\n## Dome dispatch and visitors\nD-01. Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, un",
      "quote": "Liraven Planetarium began public dome shows in 1967."
    }
  ],
  "displayed": "YOUR QUESTION\nIn what year did public dome shows begin at Liraven Planetarium?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] Liraven Planetarium began public dome shows in 1967.\n\nSOURCE EVIDENCE\n[1]\n01_Liraven_Planetarium.txt\n\nText line 1 (normalized extraction)\n\nLiraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015. ## Dome dispatch and visitors D-01. Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, un\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P02 — What year was the second projector lens renewal at Liraven Planetarium completed?

```json
{
  "id": "P02",
  "question": "What year was the second projector lens renewal at Liraven Planetarium completed?",
  "workflow": "hybrid",
  "original_question": "What year was the second projector lens renewal at Liraven Planetarium completed?",
  "expected_display": "What year was the second projector lens renewal at Liraven Planetarium completed?",
  "rendered_question": "What year was the second projector lens renewal at Liraven Planetarium completed?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.",
  "sources": [
    {
      "filename": "01_Liraven_Planetarium.txt",
      "excerpt": "Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.\n\n## Dome dispatch and visitors\nD-01. Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open.\nD-02. Eris checks five projector filters per morning. Nalo checks three door",
      "quote": "The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015."
    }
  ],
  "displayed": "YOUR QUESTION\nWhat year was the second projector lens renewal at Liraven Planetarium completed?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.\n\nSOURCE EVIDENCE\n[1]\n01_Liraven_Planetarium.txt\n\nText line 1 (normalized extraction)\n\nLiraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015. ## Dome dispatch and visitors D-01. Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open. D-02. Eris checks five projector filters per morning. Nalo checks three door\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P03 — Who must approve in writing a Yalara Grain Exchange purchase above 7400 credits?

```json
{
  "id": "P03",
  "question": "Who must approve in writing a Yalara Grain Exchange purchase above 7400 credits?",
  "workflow": "hybrid",
  "original_question": "Who must approve in writing a Yalara Grain Exchange purchase above 7400 credits?",
  "expected_display": "Who must approve in writing a Yalara Grain Exchange purchase above 7400 credits?",
  "rendered_question": "Who must approve in writing a Yalara Grain Exchange purchase above 7400 credits?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.",
  "sources": [
    {
      "filename": "04_Yalara_Grain_Exchange.txt",
      "excerpt": "dged within six working hours. This acknowledgement does not guarantee a loading slot.\nGX-02. The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.\nGX-03. Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.\nGX-04. Completed loading records are kept for 8 months, unless an unresolved weighing dispute requires longer retention.\n\nThe office bell was installed in 1980. Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease",
      "quote": "Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor."
    }
  ],
  "displayed": "YOUR QUESTION\nWho must approve in writing a Yalara Grain Exchange purchase above 7400 credits?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.\n\nSOURCE EVIDENCE\n[1]\n04_Yalara_Grain_Exchange.txt\n\nText line 4 (normalized extraction)\n\ndged within six working hours. This acknowledgement does not guarantee a loading slot. GX-02. The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt. GX-03. Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor. GX-04. Completed loading records are kept for 8 months, unless an unresolved weighing dispute requires longer retention. The office bell was installed in 1980. Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P04 — A Liraven Planetarium dispatch request is cleared exactly at 16:20. When does it leave, and what hold can prevent departure?

```json
{
  "id": "P04",
  "question": "A Liraven Planetarium dispatch request is cleared exactly at 16:20. When does it leave, and what hold can prevent departure?",
  "workflow": "hybrid",
  "original_question": "A Liraven Planetarium dispatch request is cleared exactly at 16:20. When does it leave, and what hold can prevent departure?",
  "expected_display": "A Liraven Planetarium dispatch request is cleared exactly at 16:20. When does it leave, and what hold can prevent departure?",
  "rendered_question": "A Liraven Planetarium dispatch request is cleared exactly at 16:20. When does it leave, and what hold can prevent departure?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open.",
  "sources": [
    {
      "filename": "01_Liraven_Planetarium.txt",
      "excerpt": "Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.\n\n## Dome dispatch and visitors\nD-01. Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open.\nD-02. Eris checks five projector filters per morning. Nalo checks three door hinges per morning. Eris labels two transport cases per week.\nD-03. Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius. Individual winter extremes are not recorded.\nD-0",
      "quote": "Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open."
    }
  ],
  "displayed": "YOUR QUESTION\nA Liraven Planetarium dispatch request is cleared exactly at 16:20. When does it leave, and what hold can prevent departure?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open.\n\nSOURCE EVIDENCE\n[1]\n01_Liraven_Planetarium.txt\n\nText line 4 (normalized extraction)\n\nLiraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015. ## Dome dispatch and visitors D-01. Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open. D-02. Eris checks five projector filters per morning. Nalo checks three door hinges per morning. Eris labels two transport cases per week. D-03. Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius. Individual winter extremes are not recorded. D-0\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P05 — How many projector filters does Eris check per morning?

```json
{
  "id": "P05",
  "question": "How many projector filters does Eris check per morning?",
  "workflow": "hybrid",
  "original_question": "How many projector filters does Eris check per morning?",
  "expected_display": "How many projector filters does Eris check per morning?",
  "rendered_question": "How many projector filters does Eris check per morning?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] Eris checks five projector filters per morning.",
  "sources": [
    {
      "filename": "01_Liraven_Planetarium.txt",
      "excerpt": "d in 2015.\n\n## Dome dispatch and visitors\nD-01. Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open.\nD-02. Eris checks five projector filters per morning. Nalo checks three door hinges per morning. Eris labels two transport cases per week.\nD-03. Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius. Individual winter extremes are not recorded.\nD-04. Keep movement slips for 19 months. While an export-",
      "quote": "Eris checks five projector filters per morning."
    }
  ],
  "displayed": "YOUR QUESTION\nHow many projector filters does Eris check per morning?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] Eris checks five projector filters per morning.\n\nSOURCE EVIDENCE\n[1]\n01_Liraven_Planetarium.txt\n\nText line 5 (normalized extraction)\n\nd in 2015. ## Dome dispatch and visitors D-01. Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open. D-02. Eris checks five projector filters per morning. Nalo checks three door hinges per morning. Eris labels two transport cases per week. D-03. Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius. Individual winter extremes are not recorded. D-04. Keep movement slips for 19 months. While an export-\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P06 — When was the Osvik Puppet Theatre rehearsal room restoration completed?

```json
{
  "id": "P06",
  "question": "When was the Osvik Puppet Theatre rehearsal room restoration completed?",
  "workflow": "hybrid",
  "original_question": "When was the Osvik Puppet Theatre rehearsal room restoration completed?",
  "expected_display": "When was the Osvik Puppet Theatre rehearsal room restoration completed?",
  "rendered_question": "When was the Osvik Puppet Theatre rehearsal room restoration completed?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] The Osvik Puppet Theatre rehearsal room moved in 1939.",
  "sources": [
    {
      "filename": "02_Osvik_Puppet_Theatre.txt",
      "excerpt": "The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.\n\n## Prop store and touring\nT-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperatu",
      "quote": "The Osvik Puppet Theatre rehearsal room moved in 1939."
    }
  ],
  "displayed": "YOUR QUESTION\nWhen was the Osvik Puppet Theatre rehearsal room restoration completed?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] The Osvik Puppet Theatre rehearsal room moved in 1939.\n\nSOURCE EVIDENCE\n[1]\n02_Osvik_Puppet_Theatre.txt\n\nText line 1 (normalized extraction)\n\nThe Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open. ## Prop store and touring T-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperatu\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P07 — How long are Osvik Puppet Theatre signed touring records kept, including the exception for an unresolved ownership claim?

```json
{
  "id": "P07",
  "question": "How long are Osvik Puppet Theatre signed touring records kept, including the exception for an unresolved ownership claim?",
  "workflow": "hybrid",
  "original_question": "How long are Osvik Puppet Theatre signed touring records kept, including the exception for an unresolved ownership claim?",
  "expected_display": "How long are Osvik Puppet Theatre signed touring records kept, including the exception for an unresolved ownership claim?",
  "rendered_question": "How long are Osvik Puppet Theatre signed touring records kept, including the exception for an unresolved ownership claim?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.",
  "sources": [
    {
      "filename": "02_Osvik_Puppet_Theatre.txt",
      "excerpt": "erage temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 27 degrees Celsius in September.\nT-02. Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.\nT-03. The touring packet must contain:\n- a puppet inventory\n- a condition sheet\n- a transport permit\n- a return record\nT-04. The stage clock was replaced in 2023.",
      "quote": "Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled."
    }
  ],
  "displayed": "YOUR QUESTION\nHow long are Osvik Puppet Theatre signed touring records kept, including the exception for an unresolved ownership claim?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.\n\nSOURCE EVIDENCE\n[1]\n02_Osvik_Puppet_Theatre.txt\n\nText line 5 (normalized extraction)\n\nerage temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 27 degrees Celsius in September. T-02. Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled. T-03. The touring packet must contain: - a puppet inventory - a condition sheet - a transport permit - a return record T-04. The stage clock was replaced in 2023.\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P08 — What is the absolute minimum winter temperature in the Osvik Puppet Theatre prop store?

```json
{
  "id": "P08",
  "question": "What is the absolute minimum winter temperature in the Osvik Puppet Theatre prop store?",
  "workflow": "hybrid",
  "original_question": "What is the absolute minimum winter temperature in the Osvik Puppet Theatre prop store?",
  "expected_display": "What is the absolute minimum winter temperature in the Osvik Puppet Theatre prop store?",
  "rendered_question": "What is the absolute minimum winter temperature in the Osvik Puppet Theatre prop store?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.",
  "sources": [
    {
      "filename": "02_Osvik_Puppet_Theatre.txt",
      "excerpt": "The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.\n\n## Prop store and touring\nT-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 27 degrees Celsius in September.\nT-02. Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is",
      "quote": "The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius."
    }
  ],
  "displayed": "YOUR QUESTION\nWhat is the absolute minimum winter temperature in the Osvik Puppet Theatre prop store?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.\n\nSOURCE EVIDENCE\n[1]\n02_Osvik_Puppet_Theatre.txt\n\nText line 4 (normalized extraction)\n\nThe Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open. ## Prop store and touring T-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 27 degrees Celsius in September. T-02. Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P09 — Give the highest monthly mean temperature in the Osvik Puppet Theatre prop store and the month it occurs.

```json
{
  "id": "P09",
  "question": "Give the highest monthly mean temperature in the Osvik Puppet Theatre prop store and the month it occurs.",
  "workflow": "hybrid",
  "original_question": "Give the highest monthly mean temperature in the Osvik Puppet Theatre prop store and the month it occurs.",
  "expected_display": "Give the highest monthly mean temperature in the Osvik Puppet Theatre prop store and the month it occurs.",
  "rendered_question": "Give the highest monthly mean temperature in the Osvik Puppet Theatre prop store and the month it occurs.",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.",
  "sources": [
    {
      "filename": "02_Osvik_Puppet_Theatre.txt",
      "excerpt": "The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.\n\n## Prop store and touring\nT-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 27 degrees Celsius in September.\nT-02. Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is",
      "quote": "The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius."
    }
  ],
  "displayed": "YOUR QUESTION\nGive the highest monthly mean temperature in the Osvik Puppet Theatre prop store and the month it occurs.\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.\n\nSOURCE EVIDENCE\n[1]\n02_Osvik_Puppet_Theatre.txt\n\nText line 4 (normalized extraction)\n\nThe Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open. ## Prop store and touring T-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 27 degrees Celsius in September. T-02. Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P10 — Which documents belong in the Osvik Puppet Theatre touring packet?

```json
{
  "id": "P10",
  "question": "Which documents belong in the Osvik Puppet Theatre touring packet?",
  "workflow": "hybrid",
  "original_question": "Which documents belong in the Osvik Puppet Theatre touring packet?",
  "expected_display": "Which documents belong in the Osvik Puppet Theatre touring packet?",
  "rendered_question": "Which documents belong in the Osvik Puppet Theatre touring packet?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] The Osvik Puppet Theatre rehearsal room moved in 1939.",
  "sources": [
    {
      "filename": "02_Osvik_Puppet_Theatre.txt",
      "excerpt": "The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.\n\n## Prop store and touring\nT-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 27 degrees Celsius in September.\nT-02. Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.\nT-03. The touring packet must contain:\n- a puppet inventory\n- a condition sheet\n- a transport permit\n- a return record\nT-04. The stage clock was replaced in 2023.",
      "quote": "The Osvik Puppet Theatre rehearsal room moved in 1939."
    }
  ],
  "displayed": "YOUR QUESTION\nWhich documents belong in the Osvik Puppet Theatre touring packet?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] The Osvik Puppet Theatre rehearsal room moved in 1939.\n\nSOURCE EVIDENCE\n[1]\n02_Osvik_Puppet_Theatre.txt\n\nText line 1 (normalized extraction)\n\nThe Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open. ## Prop store and touring T-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 27 degrees Celsius in September. T-02. Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled. T-03. The touring packet must contain: - a puppet inventory - a condition sheet - a transport permit - a return record T-04. The stage clock was replaced in 2023.\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P11 — When was the Tavren Ferry Workshop cable tower rebuilt?

```json
{
  "id": "P11",
  "question": "When was the Tavren Ferry Workshop cable tower rebuilt?",
  "workflow": "hybrid",
  "original_question": "When was the Tavren Ferry Workshop cable tower rebuilt?",
  "expected_display": "When was the Tavren Ferry Workshop cable tower rebuilt?",
  "rendered_question": "When was the Tavren Ferry Workshop cable tower rebuilt?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] ## Workshop operating notes At Tavren Ferry Workshop, the cable tower was rebuilt in 1994.",
  "sources": [
    {
      "filename": "03_Tavren_Ferry_Workshop.txt",
      "excerpt": "## Workshop operating notes\nAt Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012.\n\nThe highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.\n\nVaren records seven cable-tension readings per shift. Tesi records five ramp tes",
      "quote": "## Workshop operating notes\nAt Tavren Ferry Workshop, the cable tower was rebuilt in 1994."
    }
  ],
  "displayed": "YOUR QUESTION\nWhen was the Tavren Ferry Workshop cable tower rebuilt?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] ## Workshop operating notes At Tavren Ferry Workshop, the cable tower was rebuilt in 1994.\n\nSOURCE EVIDENCE\n[1]\n03_Tavren_Ferry_Workshop.txt\n\nText lines 1–2 (normalized extraction)\n\n## Workshop operating notes At Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012. The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius. Varen records seven cable-tension readings per shift. Tesi records five ramp tes\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P12 — What is the highest recorded daily temperature at Tavren Ferry Workshop?

```json
{
  "id": "P12",
  "question": "What is the highest recorded daily temperature at Tavren Ferry Workshop?",
  "workflow": "hybrid",
  "original_question": "What is the highest recorded daily temperature at Tavren Ferry Workshop?",
  "expected_display": "What is the highest recorded daily temperature at Tavren Ferry Workshop?",
  "rendered_question": "What is the highest recorded daily temperature at Tavren Ferry Workshop?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August.",
  "sources": [
    {
      "filename": "03_Tavren_Ferry_Workshop.txt",
      "excerpt": "## Workshop operating notes\nAt Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012.\n\nThe highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.\n\nVaren records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month.\n\nThe Tavren Ferry Workshop loading winch needs lubrication every 90 operating hour",
      "quote": "The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August."
    }
  ],
  "displayed": "YOUR QUESTION\nWhat is the highest recorded daily temperature at Tavren Ferry Workshop?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August.\n\nSOURCE EVIDENCE\n[1]\n03_Tavren_Ferry_Workshop.txt\n\nText line 4 (normalized extraction)\n\n## Workshop operating notes At Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012. The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius. Varen records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month. The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hour\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P13 — How many cable-tension readings does Varen record per shift?

```json
{
  "id": "P13",
  "question": "How many cable-tension readings does Varen record per shift?",
  "workflow": "hybrid",
  "original_question": "How many cable-tension readings does Varen record per shift?",
  "expected_display": "How many cable-tension readings does Varen record per shift?",
  "rendered_question": "How many cable-tension readings does Varen record per shift?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] Varen records seven cable-tension readings per shift.",
  "sources": [
    {
      "filename": "03_Tavren_Ferry_Workshop.txt",
      "excerpt": "was rebuilt in 1994. The ramp shelter was repainted in 2012.\n\nThe highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.\n\nVaren records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month.\n\nThe Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch",
      "quote": "Varen records seven cable-tension readings per shift."
    }
  ],
  "displayed": "YOUR QUESTION\nHow many cable-tension readings does Varen record per shift?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] Varen records seven cable-tension readings per shift.\n\nSOURCE EVIDENCE\n[1]\n03_Tavren_Ferry_Workshop.txt\n\nText line 6 (normalized extraction)\n\nwas rebuilt in 1994. The ramp shelter was repainted in 2012. The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius. Varen records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month. The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P14 — Give the Tavren Ferry Workshop loading winch lubrication intervals under normal and salt-spray conditions, together with its inspection interval.

```json
{
  "id": "P14",
  "question": "Give the Tavren Ferry Workshop loading winch lubrication intervals under normal and salt-spray conditions, together with its inspection interval.",
  "workflow": "hybrid",
  "original_question": "Give the Tavren Ferry Workshop loading winch lubrication intervals under normal and salt-spray conditions, together with its inspection interval.",
  "expected_display": "Give the Tavren Ferry Workshop loading winch lubrication intervals under normal and salt-spray conditions, together with its inspection interval.",
  "rendered_question": "Give the Tavren Ferry Workshop loading winch lubrication intervals under normal and salt-spray conditions, together with its inspection interval.",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions.",
  "sources": [
    {
      "filename": "03_Tavren_Ferry_Workshop.txt",
      "excerpt": "es Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.\n\nVaren records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month.\n\nThe Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter. The office cabinet was painted in 2021.",
      "quote": "The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions."
    }
  ],
  "displayed": "YOUR QUESTION\nGive the Tavren Ferry Workshop loading winch lubrication intervals under normal and salt-spray conditions, together with its inspection interval.\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions.\n\nSOURCE EVIDENCE\n[1]\n03_Tavren_Ferry_Workshop.txt\n\nText line 8 (normalized extraction)\n\nes Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius. Varen records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month. The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter. The office cabinet was painted in 2021.\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P15 — How soon is a Yalara Grain Exchange loading request acknowledged, and does acknowledgement guarantee a loading slot?

```json
{
  "id": "P15",
  "question": "How soon is a Yalara Grain Exchange loading request acknowledged, and does acknowledgement guarantee a loading slot?",
  "workflow": "hybrid",
  "original_question": "How soon is a Yalara Grain Exchange loading request acknowledged, and does acknowledgement guarantee a loading slot?",
  "expected_display": "How soon is a Yalara Grain Exchange loading request acknowledged, and does acknowledgement guarantee a loading slot?",
  "rendered_question": "How soon is a Yalara Grain Exchange loading request acknowledged, and does acknowledgement guarantee a loading slot?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.",
  "sources": [
    {
      "filename": "04_Yalara_Grain_Exchange.txt",
      "excerpt": "## Exchange working rules\nGX-01. A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.\nGX-02. The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.\nGX-03. Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.\nGX-04. Completed loading records are ke",
      "quote": "A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot."
    }
  ],
  "displayed": "YOUR QUESTION\nHow soon is a Yalara Grain Exchange loading request acknowledged, and does acknowledgement guarantee a loading slot?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.\n\nSOURCE EVIDENCE\n[1]\n04_Yalara_Grain_Exchange.txt\n\nText line 2 (normalized extraction)\n\n## Exchange working rules GX-01. A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot. GX-02. The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt. GX-03. Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor. GX-04. Completed loading records are ke\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P16 — List every item in the Yalara Grain Exchange dispatch packet.

```json
{
  "id": "P16",
  "question": "List every item in the Yalara Grain Exchange dispatch packet.",
  "workflow": "hybrid",
  "original_question": "List every item in the Yalara Grain Exchange dispatch packet.",
  "expected_display": "List every item in the Yalara Grain Exchange dispatch packet.",
  "rendered_question": "List every item in the Yalara Grain Exchange dispatch packet.",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions.",
  "sources": [
    {
      "filename": "04_Yalara_Grain_Exchange.txt",
      "excerpt": "approval from the Budget Steward and Exchange Supervisor.\nGX-04. Completed loading records are kept for 8 months, unless an unresolved weighing dispute requires longer retention.\n\nThe office bell was installed in 1980. Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay.",
      "quote": "Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions."
    }
  ],
  "displayed": "YOUR QUESTION\nList every item in the Yalara Grain Exchange dispatch packet.\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions.\n\nSOURCE EVIDENCE\n[1]\n04_Yalara_Grain_Exchange.txt\n\nText line 7 (normalized extraction)\n\napproval from the Budget Steward and Exchange Supervisor. GX-04. Completed loading records are kept for 8 months, unless an unresolved weighing dispute requires longer retention. The office bell was installed in 1980. Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay.\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P17 — How long are Yalara Grain Exchange completed loading records kept, and what dispute can extend that time?

```json
{
  "id": "P17",
  "question": "How long are Yalara Grain Exchange completed loading records kept, and what dispute can extend that time?",
  "workflow": "hybrid",
  "original_question": "How long are Yalara Grain Exchange completed loading records kept, and what dispute can extend that time?",
  "expected_display": "How long are Yalara Grain Exchange completed loading records kept, and what dispute can extend that time?",
  "rendered_question": "How long are Yalara Grain Exchange completed loading records kept, and what dispute can extend that time?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.",
  "sources": [
    {
      "filename": "04_Yalara_Grain_Exchange.txt",
      "excerpt": "## Exchange working rules\nGX-01. A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.\nGX-02. The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.\nGX-03. Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.\nGX-04. Completed loading records are ke",
      "quote": "A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot."
    }
  ],
  "displayed": "YOUR QUESTION\nHow long are Yalara Grain Exchange completed loading records kept, and what dispute can extend that time?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.\n\nSOURCE EVIDENCE\n[1]\n04_Yalara_Grain_Exchange.txt\n\nText line 2 (normalized extraction)\n\n## Exchange working rules GX-01. A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot. GX-02. The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt. GX-03. Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor. GX-04. Completed loading records are ke\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P18 — What is the winter average temperature in the Osvik Puppet Theatre prop store?

```json
{
  "id": "P18",
  "question": "What is the winter average temperature in the Osvik Puppet Theatre prop store?",
  "workflow": "hybrid",
  "original_question": "What is the winter average temperature in the Osvik Puppet Theatre prop store?",
  "expected_display": "What is the winter average temperature in the Osvik Puppet Theatre prop store?",
  "rendered_question": "What is the winter average temperature in the Osvik Puppet Theatre prop store?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.",
  "sources": [
    {
      "filename": "02_Osvik_Puppet_Theatre.txt",
      "excerpt": "The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.\n\n## Prop store and touring\nT-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 27 degrees Celsius in September.\nT-02. Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is",
      "quote": "The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius."
    }
  ],
  "displayed": "YOUR QUESTION\nWhat is the winter average temperature in the Osvik Puppet Theatre prop store?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.\n\nSOURCE EVIDENCE\n[1]\n02_Osvik_Puppet_Theatre.txt\n\nText line 4 (normalized extraction)\n\nThe Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open. ## Prop store and touring T-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 27 degrees Celsius in September. T-02. Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P19 — Which month has the highest monthly mean temperature at Tavren Ferry Workshop, and what is that mean?

```json
{
  "id": "P19",
  "question": "Which month has the highest monthly mean temperature at Tavren Ferry Workshop, and what is that mean?",
  "workflow": "hybrid",
  "original_question": "Which month has the highest monthly mean temperature at Tavren Ferry Workshop, and what is that mean?",
  "expected_display": "Which month has the highest monthly mean temperature at Tavren Ferry Workshop, and what is that mean?",
  "rendered_question": "Which month has the highest monthly mean temperature at Tavren Ferry Workshop, and what is that mean?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August.",
  "sources": [
    {
      "filename": "03_Tavren_Ferry_Workshop.txt",
      "excerpt": "## Workshop operating notes\nAt Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012.\n\nThe highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.\n\nVaren records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month.\n\nThe Tavren Ferry Workshop loading winch needs lubrication every 90 operating hour",
      "quote": "The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August."
    }
  ],
  "displayed": "YOUR QUESTION\nWhich month has the highest monthly mean temperature at Tavren Ferry Workshop, and what is that mean?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August.\n\nSOURCE EVIDENCE\n[1]\n03_Tavren_Ferry_Workshop.txt\n\nText line 4 (normalized extraction)\n\n## Workshop operating notes At Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012. The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius. Varen records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month. The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hour\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P20 — In what year did public dome shows begin at Liraven Planetarium? Also, when was the Osvik Puppet Theatre rehearsal room restoration completed?

```json
{
  "id": "P20",
  "question": "In what year did public dome shows begin at Liraven Planetarium? Also, when was the Osvik Puppet Theatre rehearsal room restoration completed?",
  "workflow": "hybrid",
  "original_question": "In what year did public dome shows begin at Liraven Planetarium? Also, when was the Osvik Puppet Theatre rehearsal room restoration completed?",
  "expected_display": "In what year did public dome shows begin at Liraven Planetarium? Also, when was the Osvik Puppet Theatre rehearsal room restoration completed?",
  "rendered_question": "In what year did public dome shows begin at Liraven Planetarium? Also, when was the Osvik Puppet Theatre rehearsal room restoration completed?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] Liraven Planetarium began public dome shows in 1967.\n\n[2] The Osvik Puppet Theatre rehearsal room moved in 1939.",
  "sources": [
    {
      "filename": "01_Liraven_Planetarium.txt",
      "excerpt": "Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.\n\n## Dome dispatch and visitors\nD-01. Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, un",
      "quote": "Liraven Planetarium began public dome shows in 1967."
    },
    {
      "filename": "02_Osvik_Puppet_Theatre.txt",
      "excerpt": "The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.\n\n## Prop store and touring\nT-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperatu",
      "quote": "The Osvik Puppet Theatre rehearsal room moved in 1939."
    }
  ],
  "displayed": "YOUR QUESTION\nIn what year did public dome shows begin at Liraven Planetarium? Also, when was the Osvik Puppet Theatre rehearsal room restoration completed?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n2 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] Liraven Planetarium began public dome shows in 1967.\n\n[2] The Osvik Puppet Theatre rehearsal room moved in 1939.\n\nSOURCE EVIDENCE\n[1]\n01_Liraven_Planetarium.txt\n\nText line 1 (normalized extraction)\n\nLiraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015. ## Dome dispatch and visitors D-01. Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, un\n\nLocate in library ↗\nSearch details\n[2]\n02_Osvik_Puppet_Theatre.txt\n\nText line 1 (normalized extraction)\n\nThe Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open. ## Prop store and touring T-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperatu\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P21 — When was the Liraven Planetarium projector lens renewed?

```json
{
  "id": "P21",
  "question": "When was the Liraven Planetarium projector lens renewed?",
  "workflow": "hybrid",
  "original_question": "When was the Liraven Planetarium projector lens renewed?",
  "expected_display": "When was the Liraven Planetarium projector lens renewed?",
  "rendered_question": "When was the Liraven Planetarium projector lens renewed?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] Liraven Planetarium began public dome shows in 1967.",
  "sources": [
    {
      "filename": "01_Liraven_Planetarium.txt",
      "excerpt": "Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.\n\n## Dome dispatch and visitors\nD-01. Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open.\nD-02. Eris checks five projector filters per morning. Nalo checks three door hinges per morning. Eris labels two transport cases per week.\nD-03. Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius. Individual winter extremes are not recorded.\nD-04. Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the",
      "quote": "Liraven Planetarium began public dome shows in 1967."
    }
  ],
  "displayed": "YOUR QUESTION\nWhen was the Liraven Planetarium projector lens renewed?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] Liraven Planetarium began public dome shows in 1967.\n\nSOURCE EVIDENCE\n[1]\n01_Liraven_Planetarium.txt\n\nText line 1 (normalized extraction)\n\nLiraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015. ## Dome dispatch and visitors D-01. Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open. D-02. Eris checks five projector filters per morning. Nalo checks three door hinges per morning. Eris labels two transport cases per week. D-03. Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius. Individual winter extremes are not recorded. D-04. Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P22 — What year did the Osvik Puppet Theatre prop annex close?

```json
{
  "id": "P22",
  "question": "What year did the Osvik Puppet Theatre prop annex close?",
  "workflow": "hybrid",
  "original_question": "What year did the Osvik Puppet Theatre prop annex close?",
  "expected_display": "What year did the Osvik Puppet Theatre prop annex close?",
  "rendered_question": "What year did the Osvik Puppet Theatre prop annex close?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.",
  "sources": [
    {
      "filename": "02_Osvik_Puppet_Theatre.txt",
      "excerpt": "The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.\n\n## Prop store and touring\nT-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 27 degrees Celsius in September.\nT-02. Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is",
      "quote": "The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius."
    }
  ],
  "displayed": "YOUR QUESTION\nWhat year did the Osvik Puppet Theatre prop annex close?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius.\n\nSOURCE EVIDENCE\n[1]\n02_Osvik_Puppet_Theatre.txt\n\nText line 4 (normalized extraction)\n\nThe Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open. ## Prop store and touring T-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 27 degrees Celsius in September. T-02. Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P23 — When was the Tavren Ferry Workshop ramp shelter rebuilt?

```json
{
  "id": "P23",
  "question": "When was the Tavren Ferry Workshop ramp shelter rebuilt?",
  "workflow": "hybrid",
  "original_question": "When was the Tavren Ferry Workshop ramp shelter rebuilt?",
  "expected_display": "When was the Tavren Ferry Workshop ramp shelter rebuilt?",
  "rendered_question": "When was the Tavren Ferry Workshop ramp shelter rebuilt?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] ## Workshop operating notes At Tavren Ferry Workshop, the cable tower was rebuilt in 1994.",
  "sources": [
    {
      "filename": "03_Tavren_Ferry_Workshop.txt",
      "excerpt": "## Workshop operating notes\nAt Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012.\n\nThe highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.\n\nVaren records seven cable-tension readings per shift. Tesi records five ramp tes",
      "quote": "## Workshop operating notes\nAt Tavren Ferry Workshop, the cable tower was rebuilt in 1994."
    }
  ],
  "displayed": "YOUR QUESTION\nWhen was the Tavren Ferry Workshop ramp shelter rebuilt?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] ## Workshop operating notes At Tavren Ferry Workshop, the cable tower was rebuilt in 1994.\n\nSOURCE EVIDENCE\n[1]\n03_Tavren_Ferry_Workshop.txt\n\nText lines 1–2 (normalized extraction)\n\n## Workshop operating notes At Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012. The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius. Varen records seven cable-tension readings per shift. Tesi records five ramp tes\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P24 — How many door hinges does Eris check per morning?

```json
{
  "id": "P24",
  "question": "How many door hinges does Eris check per morning?",
  "workflow": "hybrid",
  "original_question": "How many door hinges does Eris check per morning?",
  "expected_display": "How many door hinges does Eris check per morning?",
  "rendered_question": "How many door hinges does Eris check per morning?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] Nalo checks three door hinges per morning.",
  "sources": [
    {
      "filename": "01_Liraven_Planetarium.txt",
      "excerpt": "Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open.\nD-02. Eris checks five projector filters per morning. Nalo checks three door hinges per morning. Eris labels two transport cases per week.\nD-03. Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius. Individual winter extremes are not recorded.\nD-04. Keep movement slips for 19 months. While an export-review hold is open, retain the affected sl",
      "quote": "Nalo checks three door hinges per morning."
    }
  ],
  "displayed": "YOUR QUESTION\nHow many door hinges does Eris check per morning?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] Nalo checks three door hinges per morning.\n\nSOURCE EVIDENCE\n[1]\n01_Liraven_Planetarium.txt\n\nText line 5 (normalized extraction)\n\nDispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open. D-02. Eris checks five projector filters per morning. Nalo checks three door hinges per morning. Eris labels two transport cases per week. D-03. Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius. Individual winter extremes are not recorded. D-04. Keep movement slips for 19 months. While an export-review hold is open, retain the affected sl\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P25 — What is the bank account number of Yalara Grain Exchange?

```json
{
  "id": "P25",
  "question": "What is the bank account number of Yalara Grain Exchange?",
  "workflow": "hybrid",
  "original_question": "What is the bank account number of Yalara Grain Exchange?",
  "expected_display": "What is the bank account number of Yalara Grain Exchange?",
  "rendered_question": "What is the bank account number of Yalara Grain Exchange?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "I can't find this in the provided documents.",
  "sources": [],
  "displayed": "YOUR QUESTION\nWhat is the bank account number of Yalara Grain Exchange?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nNo supporting answer\nNO SUPPORTING EVIDENCE\nCopy report\nSave report\nI can't find this in the provided documents.\n\nTry a different question or add a document containing relevant information. No answer was invented.\n\nFind a better starting point\n\nCheck the files being searched, make your question more specific, or add a file with the missing information.\n\nChoose files\nRephrase question\nAdd a file",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P26 — What exact torque in newton-metres is specified for Tavren Ferry Workshop winch bolts?

```json
{
  "id": "P26",
  "question": "What exact torque in newton-metres is specified for Tavren Ferry Workshop winch bolts?",
  "workflow": "hybrid",
  "original_question": "What exact torque in newton-metres is specified for Tavren Ferry Workshop winch bolts?",
  "expected_display": "What exact torque in newton-metres is specified for Tavren Ferry Workshop winch bolts?",
  "rendered_question": "What exact torque in newton-metres is specified for Tavren Ferry Workshop winch bolts?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "I can't find this in the provided documents.",
  "sources": [],
  "displayed": "YOUR QUESTION\nWhat exact torque in newton-metres is specified for Tavren Ferry Workshop winch bolts?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nNo supporting answer\nNO SUPPORTING EVIDENCE\nCopy report\nSave report\nI can't find this in the provided documents.\n\nTry a different question or add a document containing relevant information. No answer was invented.\n\nFind a better starting point\n\nCheck the files being searched, make your question more specific, or add a file with the missing information.\n\nChoose files\nRephrase question\nAdd a file",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P27 — What is the absolute minimum winter temperature in the Liraven Planetarium dome store?

```json
{
  "id": "P27",
  "question": "What is the absolute minimum winter temperature in the Liraven Planetarium dome store?",
  "workflow": "hybrid",
  "original_question": "What is the absolute minimum winter temperature in the Liraven Planetarium dome store?",
  "expected_display": "What is the absolute minimum winter temperature in the Liraven Planetarium dome store?",
  "rendered_question": "What is the absolute minimum winter temperature in the Liraven Planetarium dome store?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius.",
  "sources": [
    {
      "filename": "01_Liraven_Planetarium.txt",
      "excerpt": "departure is the next service day, unless an optical-safety hold is open.\nD-02. Eris checks five projector filters per morning. Nalo checks three door hinges per morning. Eris labels two transport cases per week.\nD-03. Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius. Individual winter extremes are not recorded.\nD-04. Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released.\nD-05. Acknowledge dome-booking requests within two business days. An acknowledgement is not a guarante",
      "quote": "Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius."
    }
  ],
  "displayed": "YOUR QUESTION\nWhat is the absolute minimum winter temperature in the Liraven Planetarium dome store?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n1 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius.\n\nSOURCE EVIDENCE\n[1]\n01_Liraven_Planetarium.txt\n\nText line 6 (normalized extraction)\n\ndeparture is the next service day, unless an optical-safety hold is open. D-02. Eris checks five projector filters per morning. Nalo checks three door hinges per morning. Eris labels two transport cases per week. D-03. Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius. Individual winter extremes are not recorded. D-04. Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released. D-05. Acknowledge dome-booking requests within two business days. An acknowledgement is not a guarante\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P28 — What is the highest monthly mean temperature at Neskar Mirror Depot?

```json
{
  "id": "P28",
  "question": "What is the highest monthly mean temperature at Neskar Mirror Depot?",
  "workflow": "hybrid",
  "original_question": "What is the highest monthly mean temperature at Neskar Mirror Depot?",
  "expected_display": "What is the highest monthly mean temperature at Neskar Mirror Depot?",
  "rendered_question": "What is the highest monthly mean temperature at Neskar Mirror Depot?",
  "matches_expected": true,
  "fresh_result": true,
  "result_visible": true,
  "button_disabled": false,
  "retrieval_mode": "hybrid",
  "answer_mode": "extractive",
  "build": "Loaded retrieval build: 2026-10-13-r44",
  "semantic_status": "Hybrid mode ready: semantic model remains in this browser session.",
  "answer": "[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August.\n\n[2] The highest monthly mean temperature is 27 degrees Celsius in September.",
  "sources": [
    {
      "filename": "03_Tavren_Ferry_Workshop.txt",
      "excerpt": "## Workshop operating notes\nAt Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012.\n\nThe highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.\n\nVaren records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month.\n\nThe Tavren Ferry Workshop loading winch needs lubrication every 90 operating hour",
      "quote": "The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August."
    },
    {
      "filename": "02_Osvik_Puppet_Theatre.txt",
      "excerpt": "ejected; the annex remains open.\n\n## Prop store and touring\nT-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 27 degrees Celsius in September.\nT-02. Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.\nT-03. The touring packet must contain:\n- a puppet inventory\n- a condition sheet\n- a transport permit\n- a return record\nT-04.",
      "quote": "The highest monthly mean temperature is 27 degrees Celsius in September."
    }
  ],
  "displayed": "YOUR QUESTION\nWhat is the highest monthly mean temperature at Neskar Mirror Depot?\n\nSearched all files: 01_Liraven_Planetarium.txt · 02_Osvik_Puppet_Theatre.txt · 03_Tavren_Ferry_Workshop.txt · 04_Yalara_Grain_Exchange.txt\n\nQuoted answer\n2 CITED SOURCE(S)\nCopy report\nSave report\n\n[1] The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August.\n\n[2] The highest monthly mean temperature is 27 degrees Celsius in September.\n\nSOURCE EVIDENCE\n[1]\n03_Tavren_Ferry_Workshop.txt\n\nText line 4 (normalized extraction)\n\n## Workshop operating notes At Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012. The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius. Varen records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month. The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hour\n\nLocate in library ↗\nSearch details\n[2]\n02_Osvik_Puppet_Theatre.txt\n\nText line 4 (normalized extraction)\n\nejected; the annex remains open. ## Prop store and touring T-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 27 degrees Celsius in September. T-02. Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled. T-03. The touring packet must contain: - a puppet inventory - a condition sheet - a transport permit - a return record T-04.\n\nLocate in library ↗\nSearch details\n\nScores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases.",
  "comparison": {
    "title": "Research results",
    "displayed": "",
    "sources": []
  }
}
```

### P29 — Compare movement-slip retention at Liraven Planetarium and signed-touring-record retention at Osvik Puppet Theatre, including both hold and claim exceptions.

```json
{
  "id": "P29",
  "question": "Compare movement-slip retention at Liraven Planetarium and signed-touring-record retention at Osvik Puppet Theatre, including both hold and claim exceptions.",
  "workflow": "comparison",
  "answer": "[1] Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released.\n\n[2] Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.",
  "sources": [
    {
      "filename": "01_Liraven_Planetarium.txt",
      "quote": "Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released."
    },
    {
      "filename": "02_Osvik_Puppet_Theatre.txt",
      "quote": "Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled."
    }
  ],
  "displayed": "Shared vocabulary: affected, celsius, completed, degrees, mean, monthly, open, store, transport, until, winter. Shared terms do not establish factual agreement.\n\n[1] 01_Liraven_Planetarium.txt\n\nKeep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released.\n\nText line 7 (normalized extraction)\n\nLocate in library ↗\n[2] 02_Osvik_Puppet_Theatre.txt\n\nSigned touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.\n\nText line 5 (normalized extraction)\n\nLocate in library ↗"
}
```

### P30 — Compare normal and exception lubrication or greasing plus inspection intervals for the Tavren Ferry Workshop salt-spray loading winch and Yalara Grain Exchange dust-heavy conveyor.

```json
{
  "id": "P30",
  "question": "Compare normal and exception lubrication or greasing plus inspection intervals for the Tavren Ferry Workshop salt-spray loading winch and Yalara Grain Exchange dust-heavy conveyor.",
  "workflow": "comparison",
  "answer": "[1] The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions.\n\n[2] Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay.",
  "sources": [
    {
      "filename": "03_Tavren_Ferry_Workshop.txt",
      "quote": "The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions."
    },
    {
      "filename": "04_Yalara_Grain_Exchange.txt",
      "quote": "Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay."
    }
  ],
  "displayed": "Shared vocabulary: conditions, every, hours, inspect, loading, normal, office, records, under. Shared terms do not establish factual agreement.\n\n[1] 03_Tavren_Ferry_Workshop.txt\n\nThe Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions.\n\nText line 8 (normalized extraction)\n\nLocate in library ↗\n[2] 04_Yalara_Grain_Exchange.txt\n\nGrease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay.\n\nText line 7 (normalized extraction)\n\nLocate in library ↗"
}
```

### P31 — Compare acknowledgement deadlines and their limits for Liraven Planetarium dome-booking requests and Yalara Grain Exchange loading requests.

```json
{
  "id": "P31",
  "question": "Compare acknowledgement deadlines and their limits for Liraven Planetarium dome-booking requests and Yalara Grain Exchange loading requests.",
  "workflow": "comparison",
  "answer": "[1] Acknowledge dome-booking requests within two business days.\n\n[2] A loading request at Yalara Grain Exchange is acknowledged within six working hours.",
  "sources": [
    {
      "filename": "01_Liraven_Planetarium.txt",
      "quote": "Acknowledge dome-booking requests within two business days."
    },
    {
      "filename": "04_Yalara_Grain_Exchange.txt",
      "quote": "A loading request at Yalara Grain Exchange is acknowledged within six working hours."
    }
  ],
  "displayed": "Shared vocabulary: acknowledgement, completed, dispatch, guarantee, months, service, unless, within. Shared terms do not establish factual agreement.\n\n[1] 01_Liraven_Planetarium.txt\n\nAcknowledge dome-booking requests within two business days.\n\nText line 8 (normalized extraction)\n\nLocate in library ↗\n[2] 04_Yalara_Grain_Exchange.txt\n\nA loading request at Yalara Grain Exchange is acknowledged within six working hours.\n\nText line 2 (normalized extraction)\n\nLocate in library ↗"
}
```

### P32 — Compare all contents of the Osvik Puppet Theatre touring packet and Yalara Grain Exchange dispatch packet.

```json
{
  "id": "P32",
  "question": "Compare all contents of the Osvik Puppet Theatre touring packet and Yalara Grain Exchange dispatch packet.",
  "workflow": "comparison",
  "answer": "[1] The touring packet must contain:\n- a puppet inventory\n- a condition sheet\n- a transport permit\n- a return record\nT-04.\n\n[2] The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.",
  "sources": [
    {
      "filename": "02_Osvik_Puppet_Theatre.txt",
      "quote": "The touring packet must contain:\n- a puppet inventory\n- a condition sheet\n- a transport permit\n- a return record\nT-04."
    },
    {
      "filename": "04_Yalara_Grain_Exchange.txt",
      "quote": "The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt."
    }
  ],
  "displayed": "Shared vocabulary: completed, packet, permit, records, retention, unresolved. Shared terms do not establish factual agreement.\n\n[1] 02_Osvik_Puppet_Theatre.txt\n\nThe touring packet must contain:\n- a puppet inventory\n- a condition sheet\n- a transport permit\n- a return record\nT-04.\n\nText lines 6–11 (normalized extraction)\n\nLocate in library ↗\n[2] 04_Yalara_Grain_Exchange.txt\n\nThe dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.\n\nText line 3 (normalized extraction)\n\nLocate in library ↗"
}
```
