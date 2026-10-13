# Retrieval Quality 28 — real MiniLM development comparison

Build 2026-10-13-r44; Google Chrome 154.0.8037.98. Self-authored, frozen development inputs; NOT independent accuracy. Production remains unchanged.

Baseline: 16 PASS / 7 PARTIAL / 5 FAIL. Candidate: 19 PASS / 7 PARTIAL / 2 FAIL.
Promotion gate: PASS. PASS regressions: none.

| Metric | Fixed windows | Section-aware candidate |
|---|---:|---:|
| Passages | 22 | 34 |
| Exact evidence recall@1 | 26/34 | 27/34 |
| Exact evidence recall@3 | 31/34 | 33/34 |
| Exact evidence recall@5 | 32/34 | 34/34 |
| Top-1 relevant | 18/24 | 19/24 |
| Valid quote provenance | 24/24 | 24/24 |
| Exact-evidence citation relevance | 19/24 | 22/24 |
| False acceptances / false refusals | 0 / 0 | 0 / 0 |

## Method and limitations

Main app Hybrid Q&A produced the original 28 baseline captures first. After baseline-ui.json was locked, instrumented production ranking was replayed and its source quotes/excerpts checked against UI outputs. Section-aware chunking ran only in an isolated browser-module experiment. Both used actual local Xenova/all-MiniLM-L6-v2 q8 WASM; Qwen stayed off. Candidate reused actual query vectors, not synthetic vectors. No application chunking switch was made.
The pre-frozen rubric is a conservative exact-sentence checker; shortened but semantically adequate answers may score FAIL/PARTIAL. These scores do not establish semantic entailment or independent accuracy. Expanded excerpts cannot earn answer-completeness credit. All fixtures/protocol hashes were checked before capture; no questions, documents or scoring thresholds were adjusted after outputs.
This measures 28 Hybrid questions, including two multi-document Hybrid controls. It does not evaluate the separate lexical Comparison workflow. Prior Atlas/Meridian/Lantern/Aster/Cobalt results remain unchanged.

## Timing and resource observations

{
  "enable_ms": 52664,
  "fixed_reindex_ms": 3499.7999999988824,
  "section_index_ms": 3024.300000000745,
  "fixed_query_p50_ms": 25.40000000037253,
  "fixed_query_p95_ms": 36.09999999962747,
  "section_rank_extract_p50_ms": 1.599999999627471,
  "heap_used_bytes": 12934282,
  "caveat": "One pass, fixed-first order, warm/cache effects; section timings reuse actual query vectors and omit embedding. JS heap is not whole-device peak memory. No speed-superiority claim."
}

{
  "higher_recall3": true,
  "top1_not_lower": true,
  "pass_not_lower": true,
  "no_pass_regressions": true,
  "no_new_false_acceptances": true,
  "provenance_intact": true,
  "within_passage_cap": true
}

## Exact per-case outputs

### RQ01 — direct

What is the current Orchard same-day order release cutoff?

**Baseline main UI: PASS**

[1] ## Release window Orders released before 14:20 leave the Orchard depot on the same operating day.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Release window
> Orders released before 14:20 leave the Orchard depot on the same operating day.

Expanded context (not graded as answer evidence):

> # Orchard Depot — Current Dispatch Guide
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Release window
> Orders released before 14:20 leave the Orchard depot on the same operating day. Orders released at or after 14:20 leave on the next operating day.
> Operational note: This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. This section concerns release window. Read the written in

**Candidate browser-module output: PASS**

[1] ## Release window
Orders released before 14:20 leave the Orchard depot on the same operating day.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Release window
> Orders released before 14:20 leave the Orchard depot on the same operating day.

Expanded context (not graded as answer evidence):

> # Orchard Depot — Current Dispatch Guide
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Release window
> Orders released before 14:20 leave the Orchard depot on the same operating day. Orders released at or after 14:20 leave on the next operating day.
> Operational note: This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. This section concerns release window. Read the written in

### RQ02 — paraphrase

An Orchard order is released at 15:00 under the current guide. When does it depart?

**Baseline main UI: FAIL**

[1] # Orchard Depot — Current Dispatch Guide

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance FAIL.

> # Orchard Depot — Current Dispatch Guide

Expanded context (not graded as answer evidence):

> # Orchard Depot — Current Dispatch Guide
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Release window
> Orders released before 14:20 leave the Orchard depot on the same operating day. Orders released at or after 14:20 leave on the next operating day.
> Operational note: This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Urgent release
> Urgent Orchard dispatch requires written approval from the Dispatch Lead and Safety Coordinator.
> Operational note: This section concerns urgent release. Read

**Candidate browser-module output: FAIL**

[1] Orders released before 14:20 leave the Orchard depot on the same operating day.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance FAIL.

> Orders released before 14:20 leave the Orchard depot on the same operating day.

Expanded context (not graded as answer evidence):

> ## Release window
> Orders released before 14:20 leave the Orchard depot on the same operating day. Orders released at or after 14:20 leave on the next operating day.
> Operational note: This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its original context. Keep the original file available for review.

### RQ03 — paraphrase

Which two people must sign off on an urgent Orchard dispatch under the current guide?

**Baseline main UI: PASS**

[1] ## Urgent release Urgent Orchard dispatch requires written approval from the Dispatch Lead and Safety Coordinator.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Urgent release
> Urgent Orchard dispatch requires written approval from the Dispatch Lead and Safety Coordinator.

Expanded context (not graded as answer evidence):

> nstruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Urgent release
> Urgent Orchard dispatch requires written approval from the Dispatch Lead and Safety Coordinator.
> Operational note: This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. This section concerns urgent release. Read the written instruction in its original context. Keep the original file available

**Candidate browser-module output: PASS**

[1] ## Urgent release
Urgent Orchard dispatch requires written approval from the Dispatch Lead and Safety Coordinator.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Urgent release
> Urgent Orchard dispatch requires written approval from the Dispatch Lead and Safety Coordinator.

Expanded context (not graded as answer evidence):

> nstruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Urgent release
> Urgent Orchard dispatch requires written approval from the Dispatch Lead and Safety Coordinator.
> Operational note: This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. This section concerns urgent release. Read the written instruction in its original context. Keep the original file available

### RQ04 — direct

What temperature range applies to Orchard cold crates under the current guide?

**Baseline main UI: PASS**

[1] Orchard cold crates must remain between 3 and 7 degrees Celsius.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> Orchard cold crates must remain between 3 and 7 degrees Celsius.

Expanded context (not graded as answer evidence):

> e Dispatch Lead and Safety Coordinator.
> Operational note: This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Cold crates
> Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.
> Operational note: This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for review. This section concerns cold crates. Read the written instruction in its original context. Keep the original

**Candidate browser-module output: PASS**

[1] Orchard cold crates must remain between 3 and 7 degrees Celsius.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> Orchard cold crates must remain between 3 and 7 degrees Celsius.

Expanded context (not graded as answer evidence):

> ## Cold crates
> Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.
> Operational note: This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for review. This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for review.

### RQ05 — conditional

What happens after a temperature excursion for an Orchard cold crate, and who permits release?

**Baseline main UI: PASS**

[1] ## Cold crates Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Cold crates
> Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.

Expanded context (not graded as answer evidence):

> nstruction in its original context. Keep the original file available for review. This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Cold crates
> Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.
> Operational note: This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for review. This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for r

**Candidate browser-module output: PASS**

[1] ## Cold crates
Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Cold crates
> Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.

Expanded context (not graded as answer evidence):

> nstruction in its original context. Keep the original file available for review. This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Cold crates
> Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.
> Operational note: This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for review. This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for r

### RQ06 — compound

If the bridge route is closed, which route do Orchard drivers use and who approves it?

**Baseline main UI: PARTIAL**

[1] ## Route closure When the bridge route is closed, Orchard drivers use the eastern bypass.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Route closure
> When the bridge route is closed, Orchard drivers use the eastern bypass.

Expanded context (not graded as answer evidence):

> n instruction in its original context. Keep the original file available for review. This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Route closure
> When the bridge route is closed, Orchard drivers use the eastern bypass. The Logistics Lead approves the revised route before departure.
> Operational note: This section concerns route closure. Read the written instruction in its original context. Keep the original file available for review. This section concerns route closure. Read the written instruc

**Candidate browser-module output: PARTIAL**

[1] ## Route closure
When the bridge route is closed, Orchard drivers use the eastern bypass.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Route closure
> When the bridge route is closed, Orchard drivers use the eastern bypass.

Expanded context (not graded as answer evidence):

> n instruction in its original context. Keep the original file available for review. This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Route closure
> When the bridge route is closed, Orchard drivers use the eastern bypass. The Logistics Lead approves the revised route before departure.
> Operational note: This section concerns route closure. Read the written instruction in its original context. Keep the original file available for review. This section concerns route closure. Read the written instruc

### RQ07 — direct

List all items in the current Orchard dispatch packet.

**Baseline main UI: FAIL**

[1] # Orchard Depot — Current Dispatch Guide

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance FAIL.

> # Orchard Depot — Current Dispatch Guide

Expanded context (not graded as answer evidence):

> # Orchard Depot — Current Dispatch Guide
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Release window
> Orders released before 14:20 leave the Orchard depot on the same operating day. Orders released at or after 14:20 leave on the next operating day.
> Operational note: This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Urgent release
> Urgent Orchard dispatch requires written approval from the Dispatch Lead and Safety Coordinator.
> Operational note: This section concerns urgent release. Read

**Candidate browser-module output: PASS**

[1] Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.

Expanded context (not graded as answer evidence):

> ## Dispatch packet
> Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.
> Operational note: This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review. This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review.

### RQ08 — conditional

How long are current Orchard dispatch records retained, including the unresolved-claim exception?

**Baseline main UI: PARTIAL**

[1] ## Evidence retention Orchard dispatch records are retained for 120 days.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Evidence retention
> Orchard dispatch records are retained for 120 days.

Expanded context (not graded as answer evidence):

> struction in its original context. Keep the original file available for review. This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Evidence retention
> Orchard dispatch records are retained for 120 days. Records under an unresolved transport claim are kept until the claim closes.
> Operational note: This section concerns evidence retention. Read the written instruction in its original context. Keep the original file available for review. This section concerns evidence retention. R

**Candidate browser-module output: PARTIAL**

[1] ## Evidence retention
Orchard dispatch records are retained for 120 days.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Evidence retention
> Orchard dispatch records are retained for 120 days.

Expanded context (not graded as answer evidence):

> struction in its original context. Keep the original file available for review. This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Evidence retention
> Orchard dispatch records are retained for 120 days. Records under an unresolved transport claim are kept until the claim closes.
> Operational note: This section concerns evidence retention. Read the written instruction in its original context. Keep the original file available for review. This section concerns evidence retention. R

### RQ09 — compound

How quickly do Orchard delivery partners acknowledge dispatch notices, and does that guarantee delivery?

**Baseline main UI: PASS**

[1] ## Acknowledgement Orchard delivery partners acknowledge a dispatch notice within four business hours. Acknowledgement is not a delivery guarantee.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Acknowledgement
> Orchard delivery partners acknowledge a dispatch notice within four business hours. Acknowledgement is not a delivery guarantee.

Expanded context (not graded as answer evidence):

> uction in its original context. Keep the original file available for review. This section concerns evidence retention. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Acknowledgement
> Orchard delivery partners acknowledge a dispatch notice within four business hours. Acknowledgement is not a delivery guarantee.
> Operational note: This section concerns acknowledgement. Read the written instruction in its original context. Keep the original file available for review. This section concerns acknowledgement. Read the written instruction in its original context. Keep the original file availab

**Candidate browser-module output: PASS**

[1] ## Acknowledgement
Orchard delivery partners acknowledge a dispatch notice within four business hours. Acknowledgement is not a delivery guarantee.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Acknowledgement
> Orchard delivery partners acknowledge a dispatch notice within four business hours. Acknowledgement is not a delivery guarantee.

Expanded context (not graded as answer evidence):

> uction in its original context. Keep the original file available for review. This section concerns evidence retention. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Acknowledgement
> Orchard delivery partners acknowledge a dispatch notice within four business hours. Acknowledgement is not a delivery guarantee.
> Operational note: This section concerns acknowledgement. Read the written instruction in its original context. Keep the original file available for review. This section concerns acknowledgement. Read the written instruction in its original context. Keep the original file availab

### RQ10 — near-duplicate/subject

When can Orchard visitors enter under the current guide?

**Baseline main UI: FAIL**

[1] # Orchard Depot — Current Dispatch Guide

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance FAIL.

> # Orchard Depot — Current Dispatch Guide

Expanded context (not graded as answer evidence):

> # Orchard Depot — Current Dispatch Guide
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Release window
> Orders released before 14:20 leave the Orchard depot on the same operating day. Orders released at or after 14:20 leave on the next operating day.
> Operational note: This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Urgent release
> Urgent Orchard dispatch requires written approval from the Dispatch Lead and Safety Coordinator.
> Operational note: This section concerns urgent release. Read

**Candidate browser-module output: PASS**

[1] Orchard visitors enter after 10:10.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> Orchard visitors enter after 10:10.

Expanded context (not graded as answer evidence):

> ## Visitor access
> Orchard visitors enter after 10:10. Orchard staff complete their morning checks by 08:40.
> Operational note: This section concerns visitor access. Read the written instruction in its original context. Keep the original file available for review. This section concerns visitor access. Read the written instruction in its original context. Keep the original file available for review.

### RQ11 — near-duplicate/version

What was the order release cutoff under the archived Orchard guide?

**Baseline main UI: PASS**

[1] ## Release window Under the archived Orchard guide, orders released before 13:00 left the depot on the same operating day.

Source 1: 02_Orchard_Depot_Archived.md; provenance PASS; exact-evidence relevance PASS.

> ## Release window
> Under the archived Orchard guide, orders released before 13:00 left the depot on the same operating day.

Expanded context (not graded as answer evidence):

> # Orchard Depot — Archived Dispatch Guide (superseded)
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Release window
> Under the archived Orchard guide, orders released before 13:00 left the depot on the same operating day. Later orders left on the next operating day.
> Operational note: This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its origi

**Candidate browser-module output: PASS**

[1] ## Release window
Under the archived Orchard guide, orders released before 13:00 left the depot on the same operating day.

Source 1: 02_Orchard_Depot_Archived.md; provenance PASS; exact-evidence relevance PASS.

> ## Release window
> Under the archived Orchard guide, orders released before 13:00 left the depot on the same operating day.

Expanded context (not graded as answer evidence):

> # Orchard Depot — Archived Dispatch Guide (superseded)
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Release window
> Under the archived Orchard guide, orders released before 13:00 left the depot on the same operating day. Later orders left on the next operating day.
> Operational note: This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its origi

### RQ12 — near-duplicate/version

Who approved urgent dispatch under the archived Orchard guide?

**Baseline main UI: PASS**

[1] ## Urgent release Under the archived Orchard guide, urgent dispatch required approval from the Depot Manager.

Source 1: 02_Orchard_Depot_Archived.md; provenance PASS; exact-evidence relevance PASS.

> ## Urgent release
> Under the archived Orchard guide, urgent dispatch required approval from the Depot Manager.

Expanded context (not graded as answer evidence):

> nstruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Urgent release
> Under the archived Orchard guide, urgent dispatch required approval from the Depot Manager.
> Operational note: This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. This section concerns urgent release. Read the written instruction in its original context. Keep the original file available

**Candidate browser-module output: PASS**

[1] ## Urgent release
Under the archived Orchard guide, urgent dispatch required approval from the Depot Manager.

Source 1: 02_Orchard_Depot_Archived.md; provenance PASS; exact-evidence relevance PASS.

> ## Urgent release
> Under the archived Orchard guide, urgent dispatch required approval from the Depot Manager.

Expanded context (not graded as answer evidence):

> nstruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Urgent release
> Under the archived Orchard guide, urgent dispatch required approval from the Depot Manager.
> Operational note: This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. This section concerns urgent release. Read the written instruction in its original context. Keep the original file available

### RQ13 — compound

How often are Hilltop conveyor bearings lubricated normally, in a dusty bay, and how often are they inspected?

**Baseline main UI: PARTIAL**

[1] ## Lubrication Hilltop conveyor bearings are lubricated every 70 operating hours.

Source 1: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Lubrication
> Hilltop conveyor bearings are lubricated every 70 operating hours.

Expanded context (not graded as answer evidence):

> # Hilltop Workshop — Equipment Care Notes
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Lubrication
> Hilltop conveyor bearings are lubricated every 70 operating hours. In a dusty bay, the lubrication interval is 35 operating hours. The inspection interval remains 14 days.
> Operational note: This section concerns lubrication. Read the written instruction in its original context. Keep the original file available for review. This section concerns

**Candidate browser-module output: PARTIAL**

[1] ## Lubrication
Hilltop conveyor bearings are lubricated every 70 operating hours.

Source 1: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Lubrication
> Hilltop conveyor bearings are lubricated every 70 operating hours.

Expanded context (not graded as answer evidence):

> # Hilltop Workshop — Equipment Care Notes
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Lubrication
> Hilltop conveyor bearings are lubricated every 70 operating hours. In a dusty bay, the lubrication interval is 35 operating hours. The inspection interval remains 14 days.
> Operational note: This section concerns lubrication. Read the written instruction in its original context. Keep the original file available for review. This section concerns

### RQ14 — conditional

After replacing a Hilltop pressure sensor, when is calibration required?

**Baseline main UI: FAIL**

[1] ## Calibration Hilltop pressure sensors are calibrated every 28 days.

Source 1: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance FAIL.

> ## Calibration
> Hilltop pressure sensors are calibrated every 28 days.

Expanded context (not graded as answer evidence):

> n instruction in its original context. Keep the original file available for review. This section concerns lubrication. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Calibration
> Hilltop pressure sensors are calibrated every 28 days. Following a sensor replacement, calibration is required before restarting the machine.
> Operational note: This section concerns calibration. Read the written instruction in its original context. Keep the original file available for review. This section concerns calibration. Read

**Candidate browser-module output: FAIL**

[1] ## Calibration
Hilltop pressure sensors are calibrated every 28 days.

Source 1: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance FAIL.

> ## Calibration
> Hilltop pressure sensors are calibrated every 28 days.

Expanded context (not graded as answer evidence):

> n instruction in its original context. Keep the original file available for review. This section concerns lubrication. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Calibration
> Hilltop pressure sensors are calibrated every 28 days. Following a sensor replacement, calibration is required before restarting the machine.
> Operational note: This section concerns calibration. Read the written instruction in its original context. Keep the original file available for review. This section concerns calibration. Read

### RQ15 — paraphrase

What must a technician do before clearing a jam on a Hilltop conveyor?

**Baseline main UI: PASS**

[1] ## Lockout Before clearing a Hilltop conveyor jam, the technician must isolate electrical power and attach a lockout tag.

Source 1: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Lockout
> Before clearing a Hilltop conveyor jam, the technician must isolate electrical power and attach a lockout tag.

Expanded context (not graded as answer evidence):

> n instruction in its original context. Keep the original file available for review. This section concerns calibration. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Lockout
> Before clearing a Hilltop conveyor jam, the technician must isolate electrical power and attach a lockout tag.
> Operational note: This section concerns lockout. Read the written instruction in its original context. Keep the original file available for review. This section concerns lockout. Read the written instruction in its original context. Keep the original file available for review.

**Candidate browser-module output: PASS**

[1] ## Lockout
Before clearing a Hilltop conveyor jam, the technician must isolate electrical power and attach a lockout tag.

Source 1: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Lockout
> Before clearing a Hilltop conveyor jam, the technician must isolate electrical power and attach a lockout tag.

Expanded context (not graded as answer evidence):

> n instruction in its original context. Keep the original file available for review. This section concerns calibration. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Lockout
> Before clearing a Hilltop conveyor jam, the technician must isolate electrical power and attach a lockout tag.
> Operational note: This section concerns lockout. Read the written instruction in its original context. Keep the original file available for review. This section concerns lockout. Read the written instruction in its original context. Keep the original file available for review.

### RQ16 — direct

Which person checks Hilltop replacement belts before installation?

**Baseline main UI: PASS**

[1] ## Spare parts Hilltop replacement belts must be checked by the Maintenance Lead before installation.

Source 1: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Spare parts
> Hilltop replacement belts must be checked by the Maintenance Lead before installation.

Expanded context (not graded as answer evidence):

> itten instruction in its original context. Keep the original file available for review. This section concerns lockout. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Spare parts
> Hilltop replacement belts must be checked by the Maintenance Lead before installation.
> Operational note: This section concerns spare parts. Read the written instruction in its original context. Keep the original file available for review. This section concerns spare parts. Read the written instruction in its original context. Keep the original file available for r

**Candidate browser-module output: PASS**

[1] ## Spare parts
Hilltop replacement belts must be checked by the Maintenance Lead before installation.

Source 1: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Spare parts
> Hilltop replacement belts must be checked by the Maintenance Lead before installation.

Expanded context (not graded as answer evidence):

> itten instruction in its original context. Keep the original file available for review. This section concerns lockout. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Spare parts
> Hilltop replacement belts must be checked by the Maintenance Lead before installation.
> Operational note: This section concerns spare parts. Read the written instruction in its original context. Keep the original file available for review. This section concerns spare parts. Read the written instruction in its original context. Keep the original file available for r

### RQ17 — conditional

What is the Hilltop service-record retention period and its warranty-dispute exception?

**Baseline main UI: PARTIAL**

[1] ## Records Hilltop service records are retained for 18 months.

Source 1: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Records
> Hilltop service records are retained for 18 months.

Expanded context (not graded as answer evidence):

> n instruction in its original context. Keep the original file available for review. This section concerns spare parts. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Records
> Hilltop service records are retained for 18 months. Records involved in an unresolved warranty dispute are kept until the dispute closes.
> Operational note: This section concerns records. Read the written instruction in its original context. Keep the original file available for review. This section concerns records. Read the writt

**Candidate browser-module output: PARTIAL**

[1] ## Records
Hilltop service records are retained for 18 months.

Source 1: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Records
> Hilltop service records are retained for 18 months.

Expanded context (not graded as answer evidence):

> n instruction in its original context. Keep the original file available for review. This section concerns spare parts. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Records
> Hilltop service records are retained for 18 months. Records involved in an unresolved warranty dispute are kept until the dispute closes.
> Operational note: This section concerns records. Read the written instruction in its original context. Keep the original file available for review. This section concerns records. Read the writt

### RQ18 — paraphrase

Which actions are required when a Hilltop coolant leak occurs?

**Baseline main UI: PASS**

[1] ## Leak response A Hilltop coolant leak requires the technician to stop the pump and notify the Maintenance Lead immediately.

Source 1: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Leak response
> A Hilltop coolant leak requires the technician to stop the pump and notify the Maintenance Lead immediately.

Expanded context (not graded as answer evidence):

> nstruction in its original context. Keep the original file available for review. This section concerns restart packet. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Leak response
> A Hilltop coolant leak requires the technician to stop the pump and notify the Maintenance Lead immediately.
> Operational note: This section concerns leak response. Read the written instruction in its original context. Keep the original file available for review. This section concerns leak response. Read the written instruction in its original context. Keep the original file available f

**Candidate browser-module output: PASS**

[1] ## Leak response
A Hilltop coolant leak requires the technician to stop the pump and notify the Maintenance Lead immediately.

Source 1: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Leak response
> A Hilltop coolant leak requires the technician to stop the pump and notify the Maintenance Lead immediately.

Expanded context (not graded as answer evidence):

> nstruction in its original context. Keep the original file available for review. This section concerns restart packet. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Leak response
> A Hilltop coolant leak requires the technician to stop the pump and notify the Maintenance Lead immediately.
> Operational note: This section concerns leak response. Read the written instruction in its original context. Keep the original file available for review. This section concerns leak response. Read the written instruction in its original context. Keep the original file available f

### RQ19 — direct

Which written approvals are required for a Lakeside purchase above 5200 credits?

**Baseline main UI: PASS**

[1] ## Purchase approval Lakeside purchases above 5200 credits require written approval from the Finance Lead and Studio Director.

Source 1: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> ## Purchase approval
> Lakeside purchases above 5200 credits require written approval from the Finance Lead and Studio Director.

Expanded context (not graded as answer evidence):

> # Lakeside Studio — Purchasing Procedure
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Purchase approval
> Lakeside purchases above 5200 credits require written approval from the Finance Lead and Studio Director.
> Operational note: This section concerns purchase approval. Read the written instruction in its original context. Keep the original file available for review. This section concerns purchase approval. Read the written instruction in its original context. Keep the original file ava

**Candidate browser-module output: PASS**

[1] ## Purchase approval
Lakeside purchases above 5200 credits require written approval from the Finance Lead and Studio Director.

Source 1: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> ## Purchase approval
> Lakeside purchases above 5200 credits require written approval from the Finance Lead and Studio Director.

Expanded context (not graded as answer evidence):

> # Lakeside Studio — Purchasing Procedure
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Purchase approval
> Lakeside purchases above 5200 credits require written approval from the Finance Lead and Studio Director.
> Operational note: This section concerns purchase approval. Read the written instruction in its original context. Keep the original file available for review. This section concerns purchase approval. Read the written instruction in its original context. Keep the original file ava

### RQ20 — conditional

How many quotations does a Lakeside order of at least 1800 credits need, and what is the emergency exception?

**Baseline main UI: PASS**

[1] ## Quotations Lakeside orders of at least 1800 credits require two supplier quotations. An emergency purchase may use one quotation with written approval from the Studio Director.

Source 1: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> ## Quotations
> Lakeside orders of at least 1800 credits require two supplier quotations. An emergency purchase may use one quotation with written approval from the Studio Director.

Expanded context (not graded as answer evidence):

> ruction in its original context. Keep the original file available for review. This section concerns purchase approval. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Quotations
> Lakeside orders of at least 1800 credits require two supplier quotations. An emergency purchase may use one quotation with written approval from the Studio Director.
> Operational note: This section concerns quotations. Read the written instruction in its original context. Keep the original file available for review. This section concerns quotations. Read the written instruction in its original context. Keep the original file available for rev

**Candidate browser-module output: PASS**

[1] ## Quotations
Lakeside orders of at least 1800 credits require two supplier quotations. An emergency purchase may use one quotation with written approval from the Studio Director.

Source 1: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> ## Quotations
> Lakeside orders of at least 1800 credits require two supplier quotations. An emergency purchase may use one quotation with written approval from the Studio Director.

Expanded context (not graded as answer evidence):

> ruction in its original context. Keep the original file available for review. This section concerns purchase approval. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Quotations
> Lakeside orders of at least 1800 credits require two supplier quotations. An emergency purchase may use one quotation with written approval from the Studio Director.
> Operational note: This section concerns quotations. Read the written instruction in its original context. Keep the original file available for review. This section concerns quotations. Read the written instruction in its original context. Keep the original file available for rev

### RQ21 — direct

What are all the contents of a Lakeside receiving packet?

**Baseline main UI: FAIL**

[1] # Lakeside Studio — Purchasing Procedure

Source 1: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance FAIL.

> # Lakeside Studio — Purchasing Procedure

Expanded context (not graded as answer evidence):

> # Lakeside Studio — Purchasing Procedure
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Purchase approval
> Lakeside purchases above 5200 credits require written approval from the Finance Lead and Studio Director.
> Operational note: This section concerns purchase approval. Read the written instruction in its original context. Keep the original file available for review. This section concerns purchase approval. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Quotations
> Lakeside orders of at least 1800 credits require two supplier quotations. An emergency purchase may use one quotation with written approval from the Studio Director.
> Operational note: This

**Candidate browser-module output: PASS**

[1] Every Lakeside receiving packet contains the purchase order, supplier invoice and inspection note.

Source 1: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> Every Lakeside receiving packet contains the purchase order, supplier invoice and inspection note.

Expanded context (not graded as answer evidence):

> ## Receiving packet
> Every Lakeside receiving packet contains the purchase order, supplier invoice and inspection note.
> Operational note: This section concerns receiving packet. Read the written instruction in its original context. Keep the original file available for review. This section concerns receiving packet. Read the written instruction in its original context. Keep the original file available for review.

### RQ22 — conditional

How long after contract end are Lakeside supplier assessment copies deleted, including legal holds?

**Baseline main UI: PARTIAL**

[1] ## Supplier records Lakeside supplier assessment copies are deleted within 45 days after contract end.

Source 1: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> ## Supplier records
> Lakeside supplier assessment copies are deleted within 45 days after contract end.

Expanded context (not graded as answer evidence):

> tten instruction in its original context. Keep the original file available for review. This section concerns invoices. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Supplier records
> Lakeside supplier assessment copies are deleted within 45 days after contract end. Copies subject to a legal hold remain until the hold is lifted.
> Operational note: This section concerns supplier records. Read the written instruction in its original context. Keep the original file available for review. This section concerns supplier records. Read the written i

**Candidate browser-module output: PARTIAL**

[1] ## Supplier records
Lakeside supplier assessment copies are deleted within 45 days after contract end.

Source 1: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> ## Supplier records
> Lakeside supplier assessment copies are deleted within 45 days after contract end.

Expanded context (not graded as answer evidence):

> tten instruction in its original context. Keep the original file available for review. This section concerns invoices. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Supplier records
> Lakeside supplier assessment copies are deleted within 45 days after contract end. Copies subject to a legal hold remain until the hold is lifted.
> Operational note: This section concerns supplier records. Read the written instruction in its original context. Keep the original file available for review. This section concerns supplier records. Read the written i

### RQ23 — multi-document Hybrid

What do the current Orchard dispatch packet and Lakeside receiving packet each contain?

**Baseline main UI: PARTIAL**

[1] Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.

Expanded context (not graded as answer evidence):

> ection concerns cold crates. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Route closure
> When the bridge route is closed, Orchard drivers use the eastern bypass. The Logistics Lead approves the revised route before departure.
> Operational note: This section concerns route closure. Read the written instruction in its original context. Keep the original file available for review. This section concerns route closure. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Dispatch packet
> Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.
> Operational note: This section concerns dispatch packet. Read the

**Candidate browser-module output: PARTIAL**

[1] Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.

Expanded context (not graded as answer evidence):

> ## Dispatch packet
> Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.
> Operational note: This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review. This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review.

### RQ24 — multi-document Hybrid

What are the Hilltop service-record retention period and the current Orchard dispatch-record retention period?

**Baseline main UI: PARTIAL**

[1] ## Evidence retention Orchard dispatch records are retained for 120 days.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Evidence retention
> Orchard dispatch records are retained for 120 days.

Expanded context (not graded as answer evidence):

> struction in its original context. Keep the original file available for review. This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Evidence retention
> Orchard dispatch records are retained for 120 days. Records under an unresolved transport claim are kept until the claim closes.
> Operational note: This section concerns evidence retention. Read the written instruction in its original context. Keep the original file available for review. This section concerns evidence retention. R

**Candidate browser-module output: PARTIAL**

[1] ## Evidence retention
Orchard dispatch records are retained for 120 days.

Source 1: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Evidence retention
> Orchard dispatch records are retained for 120 days.

Expanded context (not graded as answer evidence):

> struction in its original context. Keep the original file available for review. This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Evidence retention
> Orchard dispatch records are retained for 120 days. Records under an unresolved transport claim are kept until the claim closes.
> Operational note: This section concerns evidence retention. Read the written instruction in its original context. Keep the original file available for review. This section concerns evidence retention. R

### RQ25 — unsupported

What is the exact password for the Orchard dispatch database?

**Baseline main UI: PASS**

I can't find this in the provided documents.

**Candidate browser-module output: PASS**

I can't find this in the provided documents.

### RQ26 — unsupported

What is the Lakeside supplier bank account number?

**Baseline main UI: PASS**

I can't find this in the provided documents.

**Candidate browser-module output: PASS**

I can't find this in the provided documents.

### RQ27 — unsupported

What is the exact torque value for the Hilltop conveyor drive bolt?

**Baseline main UI: PASS**

I can't find this in the provided documents.

**Candidate browser-module output: PASS**

I can't find this in the provided documents.

### RQ28 — unsupported

What is the current price of Bitcoin?

**Baseline main UI: PASS**

I can't find this in the provided documents.

**Candidate browser-module output: PASS**

I can't find this in the provided documents.
