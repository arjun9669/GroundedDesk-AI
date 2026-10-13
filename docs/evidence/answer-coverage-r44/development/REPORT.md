# Answer coverage — real MiniLM development regression

Self-authored, known frozen Retrieval Quality 28 inputs. NOT independent accuracy. Production r44 unchanged. Qwen off. Actual local MiniLM. Candidate outputs were computed in Chrome browser modules and rendered in a labeled experimental observation panel; they are not production Q&A UI results.

| Variant | PASS | PARTIAL | FAIL |
|---|---:|---:|---:|
| Original fixed windows | 16 | 7 | 5 |
| Fixed windows + coverage | 23 | 1 | 4 |
| Original section windows | 19 | 7 | 2 |
| Section windows + coverage | 27 | 1 | 0 |

Development gate: PASS. Fixed PASS regressions: none. Section PASS regressions: none.

The original baseline source filenames, displayed quotes and excerpts were exactly reproduced in a separate replay before executing the candidate. No frozen input, scoring rule, expected answer or production module changed. The original fixed 16/7/5 and section 19/7/2 remain preserved. Candidate source selection may add an explicitly requested ranked document; it never rescues an existing refusal.
Completeness and relevance require exact full expected sentences in the quotation; expanded context does not earn credit. This conservative rubric is not a semantic entailment judge. Every quote must occur in both named source text and returned excerpt. Rankings/chunking were unchanged, so this experiment measures answer selection rather than retrieval recall gains.
The prototype is restricted to recognized Markdown paragraphs; unsectioned text receives original selection behavior. Max three adjacent sentences and 620 characters; headings, blank paragraphs and labeled commentary bound expansion. Printed clock/event rules remain literal, never inferred. Model/cache timing was not used to claim performance superiority.

## Counts

```json
{
  "fixed": {
    "PASS": 23,
    "PARTIAL": 1,
    "FAIL": 4,
    "false_acceptances": 0,
    "false_refusals": 0,
    "citations": 26,
    "valid_provenance": 26,
    "exact_evidence_relevant": 22
  },
  "section": {
    "PASS": 27,
    "PARTIAL": 1,
    "FAIL": 0,
    "false_acceptances": 0,
    "false_refusals": 0,
    "citations": 26,
    "valid_provenance": 26,
    "exact_evidence_relevant": 26
  }
}
```

## Every exact result

### RQ01

What is the current Orchard same-day order release cutoff?

**Fixed + coverage: PASS**

[1] ## Release window
Orders released before 14:20 leave the Orchard depot on the same operating day.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Release window
> Orders released before 14:20 leave the Orchard depot on the same operating day.

Expanded context (not graded):

> # Orchard Depot — Current Dispatch Guide
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Release window
> Orders released before 14:20 leave the Orchard depot on the same operating day. Orders released at or after 14:20 leave on the next operating day.
> Operational note: This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. This section concerns release window. Read the written in

**Section + coverage: PASS**

[1] ## Release window
Orders released before 14:20 leave the Orchard depot on the same operating day.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Release window
> Orders released before 14:20 leave the Orchard depot on the same operating day.

Expanded context (not graded):

> # Orchard Depot — Current Dispatch Guide
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Release window
> Orders released before 14:20 leave the Orchard depot on the same operating day. Orders released at or after 14:20 leave on the next operating day.
> Operational note: This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. This section concerns release window. Read the written in

### RQ02

An Orchard order is released at 15:00 under the current guide. When does it depart?

**Fixed + coverage: FAIL**

[1] # Orchard Depot — Current Dispatch Guide

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance FAIL.

> # Orchard Depot — Current Dispatch Guide

Expanded context (not graded):

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

Missing exact evidence:
- 01_Orchard_Depot_Current.md: Orders released at or after 14:20 leave on the next operating day.

**Section + coverage: PASS**

[1] Orders released at or after 14:20 leave on the next operating day.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> Orders released at or after 14:20 leave on the next operating day.

Expanded context (not graded):

> chard Depot — Current Dispatch Guide
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Release window
> Orders released before 14:20 leave the Orchard depot on the same operating day. Orders released at or after 14:20 leave on the next operating day.
> Operational note: This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its original context. Keep the original file available

### RQ03

Which two people must sign off on an urgent Orchard dispatch under the current guide?

**Fixed + coverage: PASS**

[1] ## Urgent release
Urgent Orchard dispatch requires written approval from the Dispatch Lead and Safety Coordinator.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Urgent release
> Urgent Orchard dispatch requires written approval from the Dispatch Lead and Safety Coordinator.

Expanded context (not graded):

> nstruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Urgent release
> Urgent Orchard dispatch requires written approval from the Dispatch Lead and Safety Coordinator.
> Operational note: This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. This section concerns urgent release. Read the written instruction in its original context. Keep the original file available

**Section + coverage: PASS**

[1] ## Urgent release
Urgent Orchard dispatch requires written approval from the Dispatch Lead and Safety Coordinator.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Urgent release
> Urgent Orchard dispatch requires written approval from the Dispatch Lead and Safety Coordinator.

Expanded context (not graded):

> nstruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Urgent release
> Urgent Orchard dispatch requires written approval from the Dispatch Lead and Safety Coordinator.
> Operational note: This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. This section concerns urgent release. Read the written instruction in its original context. Keep the original file available

### RQ04

What temperature range applies to Orchard cold crates under the current guide?

**Fixed + coverage: PASS**

[1] Orchard cold crates must remain between 3 and 7 degrees Celsius.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> Orchard cold crates must remain between 3 and 7 degrees Celsius.

Expanded context (not graded):

> e Dispatch Lead and Safety Coordinator.
> Operational note: This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Cold crates
> Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.
> Operational note: This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for review. This section concerns cold crates. Read the written instruction in its original context. Keep the original

**Section + coverage: PASS**

[1] Orchard cold crates must remain between 3 and 7 degrees Celsius.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> Orchard cold crates must remain between 3 and 7 degrees Celsius.

Expanded context (not graded):

> ## Cold crates
> Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.
> Operational note: This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for review. This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for review.

### RQ05

What happens after a temperature excursion for an Orchard cold crate, and who permits release?

**Fixed + coverage: PASS**

[1] ## Cold crates
Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Cold crates
> Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.

Expanded context (not graded):

> nstruction in its original context. Keep the original file available for review. This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Cold crates
> Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.
> Operational note: This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for review. This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for r

**Section + coverage: PASS**

[1] ## Cold crates
Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Cold crates
> Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.

Expanded context (not graded):

> nstruction in its original context. Keep the original file available for review. This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Cold crates
> Orchard cold crates must remain between 3 and 7 degrees Celsius. A temperature excursion requires quarantine until the Quality Lead authorizes release.
> Operational note: This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for review. This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for r

### RQ06

If the bridge route is closed, which route do Orchard drivers use and who approves it?

**Fixed + coverage: PASS**

[1] When the bridge route is closed, Orchard drivers use the eastern bypass. The Logistics Lead approves the revised route before departure.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> When the bridge route is closed, Orchard drivers use the eastern bypass. The Logistics Lead approves the revised route before departure.

Expanded context (not graded):

> its original context. Keep the original file available for review. This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Route closure
> When the bridge route is closed, Orchard drivers use the eastern bypass. The Logistics Lead approves the revised route before departure.
> Operational note: This section concerns route closure. Read the written instruction in its original context. Keep the original file available for review. This section concerns route closure. Read the written instruction in its original context. Keep the original file available f

**Section + coverage: PASS**

[1] When the bridge route is closed, Orchard drivers use the eastern bypass. The Logistics Lead approves the revised route before departure.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> When the bridge route is closed, Orchard drivers use the eastern bypass. The Logistics Lead approves the revised route before departure.

Expanded context (not graded):

> its original context. Keep the original file available for review. This section concerns cold crates. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Route closure
> When the bridge route is closed, Orchard drivers use the eastern bypass. The Logistics Lead approves the revised route before departure.
> Operational note: This section concerns route closure. Read the written instruction in its original context. Keep the original file available for review. This section concerns route closure. Read the written instruction in its original context. Keep the original file available f

### RQ07

List all items in the current Orchard dispatch packet.

**Fixed + coverage: FAIL**

[1] # Orchard Depot — Current Dispatch Guide

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance FAIL.

> # Orchard Depot — Current Dispatch Guide

Expanded context (not graded):

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

Missing exact evidence:
- 01_Orchard_Depot_Current.md: Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.

**Section + coverage: PASS**

[1] Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.

Expanded context (not graded):

> ## Dispatch packet
> Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.
> Operational note: This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review. This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review.

### RQ08

How long are current Orchard dispatch records retained, including the unresolved-claim exception?

**Fixed + coverage: PASS**

[1] Orchard dispatch records are retained for 120 days. Records under an unresolved transport claim are kept until the claim closes.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> Orchard dispatch records are retained for 120 days. Records under an unresolved transport claim are kept until the claim closes.

Expanded context (not graded):

> nal context. Keep the original file available for review. This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Evidence retention
> Orchard dispatch records are retained for 120 days. Records under an unresolved transport claim are kept until the claim closes.
> Operational note: This section concerns evidence retention. Read the written instruction in its original context. Keep the original file available for review. This section concerns evidence retention. Read the written instruction in its original context. Keep the original file a

**Section + coverage: PASS**

[1] Orchard dispatch records are retained for 120 days. Records under an unresolved transport claim are kept until the claim closes.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> Orchard dispatch records are retained for 120 days. Records under an unresolved transport claim are kept until the claim closes.

Expanded context (not graded):

> nal context. Keep the original file available for review. This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Evidence retention
> Orchard dispatch records are retained for 120 days. Records under an unresolved transport claim are kept until the claim closes.
> Operational note: This section concerns evidence retention. Read the written instruction in its original context. Keep the original file available for review. This section concerns evidence retention. Read the written instruction in its original context. Keep the original file a

### RQ09

How quickly do Orchard delivery partners acknowledge dispatch notices, and does that guarantee delivery?

**Fixed + coverage: PASS**

[1] ## Acknowledgement
Orchard delivery partners acknowledge a dispatch notice within four business hours. Acknowledgement is not a delivery guarantee.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Acknowledgement
> Orchard delivery partners acknowledge a dispatch notice within four business hours. Acknowledgement is not a delivery guarantee.

Expanded context (not graded):

> uction in its original context. Keep the original file available for review. This section concerns evidence retention. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Acknowledgement
> Orchard delivery partners acknowledge a dispatch notice within four business hours. Acknowledgement is not a delivery guarantee.
> Operational note: This section concerns acknowledgement. Read the written instruction in its original context. Keep the original file available for review. This section concerns acknowledgement. Read the written instruction in its original context. Keep the original file availab

**Section + coverage: PASS**

[1] ## Acknowledgement
Orchard delivery partners acknowledge a dispatch notice within four business hours. Acknowledgement is not a delivery guarantee.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Acknowledgement
> Orchard delivery partners acknowledge a dispatch notice within four business hours. Acknowledgement is not a delivery guarantee.

Expanded context (not graded):

> uction in its original context. Keep the original file available for review. This section concerns evidence retention. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Acknowledgement
> Orchard delivery partners acknowledge a dispatch notice within four business hours. Acknowledgement is not a delivery guarantee.
> Operational note: This section concerns acknowledgement. Read the written instruction in its original context. Keep the original file available for review. This section concerns acknowledgement. Read the written instruction in its original context. Keep the original file availab

### RQ10

When can Orchard visitors enter under the current guide?

**Fixed + coverage: FAIL**

[1] # Orchard Depot — Current Dispatch Guide

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance FAIL.

> # Orchard Depot — Current Dispatch Guide

Expanded context (not graded):

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

Missing exact evidence:
- 01_Orchard_Depot_Current.md: Orchard visitors enter after 10:10.

**Section + coverage: PASS**

[1] Orchard visitors enter after 10:10.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> Orchard visitors enter after 10:10.

Expanded context (not graded):

> ## Visitor access
> Orchard visitors enter after 10:10. Orchard staff complete their morning checks by 08:40.
> Operational note: This section concerns visitor access. Read the written instruction in its original context. Keep the original file available for review. This section concerns visitor access. Read the written instruction in its original context. Keep the original file available for review.

### RQ11

What was the order release cutoff under the archived Orchard guide?

**Fixed + coverage: PASS**

[1] ## Release window
Under the archived Orchard guide, orders released before 13:00 left the depot on the same operating day.

Source: 02_Orchard_Depot_Archived.md; provenance PASS; exact-evidence relevance PASS.

> ## Release window
> Under the archived Orchard guide, orders released before 13:00 left the depot on the same operating day.

Expanded context (not graded):

> # Orchard Depot — Archived Dispatch Guide (superseded)
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Release window
> Under the archived Orchard guide, orders released before 13:00 left the depot on the same operating day. Later orders left on the next operating day.
> Operational note: This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its origi

**Section + coverage: PASS**

[1] ## Release window
Under the archived Orchard guide, orders released before 13:00 left the depot on the same operating day.

Source: 02_Orchard_Depot_Archived.md; provenance PASS; exact-evidence relevance PASS.

> ## Release window
> Under the archived Orchard guide, orders released before 13:00 left the depot on the same operating day.

Expanded context (not graded):

> # Orchard Depot — Archived Dispatch Guide (superseded)
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Release window
> Under the archived Orchard guide, orders released before 13:00 left the depot on the same operating day. Later orders left on the next operating day.
> Operational note: This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its origi

### RQ12

Who approved urgent dispatch under the archived Orchard guide?

**Fixed + coverage: PASS**

[1] ## Urgent release
Under the archived Orchard guide, urgent dispatch required approval from the Depot Manager.

Source: 02_Orchard_Depot_Archived.md; provenance PASS; exact-evidence relevance PASS.

> ## Urgent release
> Under the archived Orchard guide, urgent dispatch required approval from the Depot Manager.

Expanded context (not graded):

> nstruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Urgent release
> Under the archived Orchard guide, urgent dispatch required approval from the Depot Manager.
> Operational note: This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. This section concerns urgent release. Read the written instruction in its original context. Keep the original file available

**Section + coverage: PASS**

[1] ## Urgent release
Under the archived Orchard guide, urgent dispatch required approval from the Depot Manager.

Source: 02_Orchard_Depot_Archived.md; provenance PASS; exact-evidence relevance PASS.

> ## Urgent release
> Under the archived Orchard guide, urgent dispatch required approval from the Depot Manager.

Expanded context (not graded):

> nstruction in its original context. Keep the original file available for review. This section concerns release window. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Urgent release
> Under the archived Orchard guide, urgent dispatch required approval from the Depot Manager.
> Operational note: This section concerns urgent release. Read the written instruction in its original context. Keep the original file available for review. This section concerns urgent release. Read the written instruction in its original context. Keep the original file available

### RQ13

How often are Hilltop conveyor bearings lubricated normally, in a dusty bay, and how often are they inspected?

**Fixed + coverage: PARTIAL**

[1] Hilltop conveyor bearings are lubricated every 70 operating hours. In a dusty bay, the lubrication interval is 35 operating hours.

Source: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> Hilltop conveyor bearings are lubricated every 70 operating hours. In a dusty bay, the lubrication interval is 35 operating hours.

Expanded context (not graded):

> # Hilltop Workshop — Equipment Care Notes
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Lubrication
> Hilltop conveyor bearings are lubricated every 70 operating hours. In a dusty bay, the lubrication interval is 35 operating hours. The inspection interval remains 14 days.
> Operational note: This section concerns lubrication. Read the written instruction in its original context. Keep the original file available for review. This section concerns lubrication. Read the written instruction in its original contex

Missing exact evidence:
- 03_Hilltop_Equipment.md: The inspection interval remains 14 days.

**Section + coverage: PARTIAL**

[1] Hilltop conveyor bearings are lubricated every 70 operating hours. In a dusty bay, the lubrication interval is 35 operating hours.

Source: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> Hilltop conveyor bearings are lubricated every 70 operating hours. In a dusty bay, the lubrication interval is 35 operating hours.

Expanded context (not graded):

> # Hilltop Workshop — Equipment Care Notes
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Lubrication
> Hilltop conveyor bearings are lubricated every 70 operating hours. In a dusty bay, the lubrication interval is 35 operating hours. The inspection interval remains 14 days.
> Operational note: This section concerns lubrication. Read the written instruction in its original context. Keep the original file available for review. This section concerns lubrication. Read the written instruction in its original contex

Missing exact evidence:
- 03_Hilltop_Equipment.md: The inspection interval remains 14 days.

### RQ14

After replacing a Hilltop pressure sensor, when is calibration required?

**Fixed + coverage: PASS**

[1] Following a sensor replacement, calibration is required before restarting the machine.

Source: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> Following a sensor replacement, calibration is required before restarting the machine.

Expanded context (not graded):

> e for review. This section concerns lubrication. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Calibration
> Hilltop pressure sensors are calibrated every 28 days. Following a sensor replacement, calibration is required before restarting the machine.
> Operational note: This section concerns calibration. Read the written instruction in its original context. Keep the original file available for review. This section concerns calibration. Read the written instruction in its original context. Keep the original file available for r

**Section + coverage: PASS**

[1] Following a sensor replacement, calibration is required before restarting the machine.

Source: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> Following a sensor replacement, calibration is required before restarting the machine.

Expanded context (not graded):

> e for review. This section concerns lubrication. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Calibration
> Hilltop pressure sensors are calibrated every 28 days. Following a sensor replacement, calibration is required before restarting the machine.
> Operational note: This section concerns calibration. Read the written instruction in its original context. Keep the original file available for review. This section concerns calibration. Read the written instruction in its original context. Keep the original file available for r

### RQ15

What must a technician do before clearing a jam on a Hilltop conveyor?

**Fixed + coverage: PASS**

[1] ## Lockout
Before clearing a Hilltop conveyor jam, the technician must isolate electrical power and attach a lockout tag.

Source: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Lockout
> Before clearing a Hilltop conveyor jam, the technician must isolate electrical power and attach a lockout tag.

Expanded context (not graded):

> n instruction in its original context. Keep the original file available for review. This section concerns calibration. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Lockout
> Before clearing a Hilltop conveyor jam, the technician must isolate electrical power and attach a lockout tag.
> Operational note: This section concerns lockout. Read the written instruction in its original context. Keep the original file available for review. This section concerns lockout. Read the written instruction in its original context. Keep the original file available for review.

**Section + coverage: PASS**

[1] ## Lockout
Before clearing a Hilltop conveyor jam, the technician must isolate electrical power and attach a lockout tag.

Source: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Lockout
> Before clearing a Hilltop conveyor jam, the technician must isolate electrical power and attach a lockout tag.

Expanded context (not graded):

> n instruction in its original context. Keep the original file available for review. This section concerns calibration. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Lockout
> Before clearing a Hilltop conveyor jam, the technician must isolate electrical power and attach a lockout tag.
> Operational note: This section concerns lockout. Read the written instruction in its original context. Keep the original file available for review. This section concerns lockout. Read the written instruction in its original context. Keep the original file available for review.

### RQ16

Which person checks Hilltop replacement belts before installation?

**Fixed + coverage: PASS**

[1] ## Spare parts
Hilltop replacement belts must be checked by the Maintenance Lead before installation.

Source: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Spare parts
> Hilltop replacement belts must be checked by the Maintenance Lead before installation.

Expanded context (not graded):

> itten instruction in its original context. Keep the original file available for review. This section concerns lockout. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Spare parts
> Hilltop replacement belts must be checked by the Maintenance Lead before installation.
> Operational note: This section concerns spare parts. Read the written instruction in its original context. Keep the original file available for review. This section concerns spare parts. Read the written instruction in its original context. Keep the original file available for r

**Section + coverage: PASS**

[1] ## Spare parts
Hilltop replacement belts must be checked by the Maintenance Lead before installation.

Source: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Spare parts
> Hilltop replacement belts must be checked by the Maintenance Lead before installation.

Expanded context (not graded):

> itten instruction in its original context. Keep the original file available for review. This section concerns lockout. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Spare parts
> Hilltop replacement belts must be checked by the Maintenance Lead before installation.
> Operational note: This section concerns spare parts. Read the written instruction in its original context. Keep the original file available for review. This section concerns spare parts. Read the written instruction in its original context. Keep the original file available for r

### RQ17

What is the Hilltop service-record retention period and its warranty-dispute exception?

**Fixed + coverage: PASS**

[1] Hilltop service records are retained for 18 months. Records involved in an unresolved warranty dispute are kept until the dispute closes.

Source: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> Hilltop service records are retained for 18 months. Records involved in an unresolved warranty dispute are kept until the dispute closes.

Expanded context (not graded):

> on in its original context. Keep the original file available for review. This section concerns spare parts. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Records
> Hilltop service records are retained for 18 months. Records involved in an unresolved warranty dispute are kept until the dispute closes.
> Operational note: This section concerns records. Read the written instruction in its original context. Keep the original file available for review. This section concerns records. Read the written instruction in its original context. Keep the original file available for review.

**Section + coverage: PASS**

[1] Hilltop service records are retained for 18 months. Records involved in an unresolved warranty dispute are kept until the dispute closes.

Source: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> Hilltop service records are retained for 18 months. Records involved in an unresolved warranty dispute are kept until the dispute closes.

Expanded context (not graded):

> on in its original context. Keep the original file available for review. This section concerns spare parts. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Records
> Hilltop service records are retained for 18 months. Records involved in an unresolved warranty dispute are kept until the dispute closes.
> Operational note: This section concerns records. Read the written instruction in its original context. Keep the original file available for review. This section concerns records. Read the written instruction in its original context. Keep the original file available for review.

### RQ18

Which actions are required when a Hilltop coolant leak occurs?

**Fixed + coverage: PASS**

[1] ## Leak response
A Hilltop coolant leak requires the technician to stop the pump and notify the Maintenance Lead immediately.

Source: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Leak response
> A Hilltop coolant leak requires the technician to stop the pump and notify the Maintenance Lead immediately.

Expanded context (not graded):

> nstruction in its original context. Keep the original file available for review. This section concerns restart packet. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Leak response
> A Hilltop coolant leak requires the technician to stop the pump and notify the Maintenance Lead immediately.
> Operational note: This section concerns leak response. Read the written instruction in its original context. Keep the original file available for review. This section concerns leak response. Read the written instruction in its original context. Keep the original file available f

**Section + coverage: PASS**

[1] ## Leak response
A Hilltop coolant leak requires the technician to stop the pump and notify the Maintenance Lead immediately.

Source: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Leak response
> A Hilltop coolant leak requires the technician to stop the pump and notify the Maintenance Lead immediately.

Expanded context (not graded):

> nstruction in its original context. Keep the original file available for review. This section concerns restart packet. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Leak response
> A Hilltop coolant leak requires the technician to stop the pump and notify the Maintenance Lead immediately.
> Operational note: This section concerns leak response. Read the written instruction in its original context. Keep the original file available for review. This section concerns leak response. Read the written instruction in its original context. Keep the original file available f

### RQ19

Which written approvals are required for a Lakeside purchase above 5200 credits?

**Fixed + coverage: PASS**

[1] ## Purchase approval
Lakeside purchases above 5200 credits require written approval from the Finance Lead and Studio Director.

Source: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> ## Purchase approval
> Lakeside purchases above 5200 credits require written approval from the Finance Lead and Studio Director.

Expanded context (not graded):

> # Lakeside Studio — Purchasing Procedure
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Purchase approval
> Lakeside purchases above 5200 credits require written approval from the Finance Lead and Studio Director.
> Operational note: This section concerns purchase approval. Read the written instruction in its original context. Keep the original file available for review. This section concerns purchase approval. Read the written instruction in its original context. Keep the original file ava

**Section + coverage: PASS**

[1] ## Purchase approval
Lakeside purchases above 5200 credits require written approval from the Finance Lead and Studio Director.

Source: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> ## Purchase approval
> Lakeside purchases above 5200 credits require written approval from the Finance Lead and Studio Director.

Expanded context (not graded):

> # Lakeside Studio — Purchasing Procedure
> 
> Fictional development evaluation material. This is not a real organization policy.
> 
> ## Purchase approval
> Lakeside purchases above 5200 credits require written approval from the Finance Lead and Studio Director.
> Operational note: This section concerns purchase approval. Read the written instruction in its original context. Keep the original file available for review. This section concerns purchase approval. Read the written instruction in its original context. Keep the original file ava

### RQ20

How many quotations does a Lakeside order of at least 1800 credits need, and what is the emergency exception?

**Fixed + coverage: PASS**

[1] ## Quotations
Lakeside orders of at least 1800 credits require two supplier quotations. An emergency purchase may use one quotation with written approval from the Studio Director.

Source: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> ## Quotations
> Lakeside orders of at least 1800 credits require two supplier quotations. An emergency purchase may use one quotation with written approval from the Studio Director.

Expanded context (not graded):

> ruction in its original context. Keep the original file available for review. This section concerns purchase approval. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Quotations
> Lakeside orders of at least 1800 credits require two supplier quotations. An emergency purchase may use one quotation with written approval from the Studio Director.
> Operational note: This section concerns quotations. Read the written instruction in its original context. Keep the original file available for review. This section concerns quotations. Read the written instruction in its original context. Keep the original file available for rev

**Section + coverage: PASS**

[1] ## Quotations
Lakeside orders of at least 1800 credits require two supplier quotations. An emergency purchase may use one quotation with written approval from the Studio Director.

Source: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> ## Quotations
> Lakeside orders of at least 1800 credits require two supplier quotations. An emergency purchase may use one quotation with written approval from the Studio Director.

Expanded context (not graded):

> ruction in its original context. Keep the original file available for review. This section concerns purchase approval. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Quotations
> Lakeside orders of at least 1800 credits require two supplier quotations. An emergency purchase may use one quotation with written approval from the Studio Director.
> Operational note: This section concerns quotations. Read the written instruction in its original context. Keep the original file available for review. This section concerns quotations. Read the written instruction in its original context. Keep the original file available for rev

### RQ21

What are all the contents of a Lakeside receiving packet?

**Fixed + coverage: FAIL**

[1] # Lakeside Studio — Purchasing Procedure

Source: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance FAIL.

> # Lakeside Studio — Purchasing Procedure

Expanded context (not graded):

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

Missing exact evidence:
- 04_Lakeside_Purchasing.md: Every Lakeside receiving packet contains the purchase order, supplier invoice and inspection note.

**Section + coverage: PASS**

[1] Every Lakeside receiving packet contains the purchase order, supplier invoice and inspection note.

Source: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> Every Lakeside receiving packet contains the purchase order, supplier invoice and inspection note.

Expanded context (not graded):

> ## Receiving packet
> Every Lakeside receiving packet contains the purchase order, supplier invoice and inspection note.
> Operational note: This section concerns receiving packet. Read the written instruction in its original context. Keep the original file available for review. This section concerns receiving packet. Read the written instruction in its original context. Keep the original file available for review.

### RQ22

How long after contract end are Lakeside supplier assessment copies deleted, including legal holds?

**Fixed + coverage: PASS**

[1] Lakeside supplier assessment copies are deleted within 45 days after contract end. Copies subject to a legal hold remain until the hold is lifted.

Source: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> Lakeside supplier assessment copies are deleted within 45 days after contract end. Copies subject to a legal hold remain until the hold is lifted.

Expanded context (not graded):

> its original context. Keep the original file available for review. This section concerns invoices. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Supplier records
> Lakeside supplier assessment copies are deleted within 45 days after contract end. Copies subject to a legal hold remain until the hold is lifted.
> Operational note: This section concerns supplier records. Read the written instruction in its original context. Keep the original file available for review. This section concerns supplier records. Read the written instruction in its original context. Keep the original file avail

**Section + coverage: PASS**

[1] Lakeside supplier assessment copies are deleted within 45 days after contract end. Copies subject to a legal hold remain until the hold is lifted.

Source: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> Lakeside supplier assessment copies are deleted within 45 days after contract end. Copies subject to a legal hold remain until the hold is lifted.

Expanded context (not graded):

> its original context. Keep the original file available for review. This section concerns invoices. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Supplier records
> Lakeside supplier assessment copies are deleted within 45 days after contract end. Copies subject to a legal hold remain until the hold is lifted.
> Operational note: This section concerns supplier records. Read the written instruction in its original context. Keep the original file available for review. This section concerns supplier records. Read the written instruction in its original context. Keep the original file avail

### RQ23

What do the current Orchard dispatch packet and Lakeside receiving packet each contain?

**Fixed + coverage: PASS**

[1] Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.

[2] ## Receiving packet
Every Lakeside receiving packet contains the purchase order, supplier invoice and inspection note.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.

Expanded context (not graded):

> ection concerns cold crates. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Route closure
> When the bridge route is closed, Orchard drivers use the eastern bypass. The Logistics Lead approves the revised route before departure.
> Operational note: This section concerns route closure. Read the written instruction in its original context. Keep the original file available for review. This section concerns route closure. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Dispatch packet
> Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.
> Operational note: This section concerns dispatch packet. Read the

Source: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> ## Receiving packet
> Every Lakeside receiving packet contains the purchase order, supplier invoice and inspection note.

Expanded context (not graded):

> en instruction in its original context. Keep the original file available for review. This section concerns quotations. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Receiving packet
> Every Lakeside receiving packet contains the purchase order, supplier invoice and inspection note.
> Operational note: This section concerns receiving packet. Read the written instruction in its original context. Keep the original file available for review. This section concerns receiving packet. Read the written instruction in its original context. Keep the original file avail

**Section + coverage: PASS**

[1] ## Receiving packet
Every Lakeside receiving packet contains the purchase order, supplier invoice and inspection note.

[2] Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.

Source: 04_Lakeside_Purchasing.md; provenance PASS; exact-evidence relevance PASS.

> ## Receiving packet
> Every Lakeside receiving packet contains the purchase order, supplier invoice and inspection note.

Expanded context (not graded):

> en instruction in its original context. Keep the original file available for review. This section concerns quotations. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Receiving packet
> Every Lakeside receiving packet contains the purchase order, supplier invoice and inspection note.
> Operational note: This section concerns receiving packet. Read the written instruction in its original context. Keep the original file available for review. This section concerns receiving packet. Read the written instruction in its original context. Keep the original file avail

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.

Expanded context (not graded):

> ## Dispatch packet
> Every Orchard dispatch packet includes the route sheet, crate inventory and signed handover form.
> Operational note: This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review. This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review.

### RQ24

What are the Hilltop service-record retention period and the current Orchard dispatch-record retention period?

**Fixed + coverage: PASS**

[1] ## Evidence retention
Orchard dispatch records are retained for 120 days.

[2] ## Records
Hilltop service records are retained for 18 months.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Evidence retention
> Orchard dispatch records are retained for 120 days.

Expanded context (not graded):

> struction in its original context. Keep the original file available for review. This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Evidence retention
> Orchard dispatch records are retained for 120 days. Records under an unresolved transport claim are kept until the claim closes.
> Operational note: This section concerns evidence retention. Read the written instruction in its original context. Keep the original file available for review. This section concerns evidence retention. R

Source: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Records
> Hilltop service records are retained for 18 months.

Expanded context (not graded):

> n instruction in its original context. Keep the original file available for review. This section concerns spare parts. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Records
> Hilltop service records are retained for 18 months. Records involved in an unresolved warranty dispute are kept until the dispute closes.
> Operational note: This section concerns records. Read the written instruction in its original context. Keep the original file available for review. This section concerns records. Read the writt

**Section + coverage: PASS**

[1] ## Evidence retention
Orchard dispatch records are retained for 120 days.

[2] ## Records
Hilltop service records are retained for 18 months.

Source: 01_Orchard_Depot_Current.md; provenance PASS; exact-evidence relevance PASS.

> ## Evidence retention
> Orchard dispatch records are retained for 120 days.

Expanded context (not graded):

> struction in its original context. Keep the original file available for review. This section concerns dispatch packet. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Evidence retention
> Orchard dispatch records are retained for 120 days. Records under an unresolved transport claim are kept until the claim closes.
> Operational note: This section concerns evidence retention. Read the written instruction in its original context. Keep the original file available for review. This section concerns evidence retention. R

Source: 03_Hilltop_Equipment.md; provenance PASS; exact-evidence relevance PASS.

> ## Records
> Hilltop service records are retained for 18 months.

Expanded context (not graded):

> n instruction in its original context. Keep the original file available for review. This section concerns spare parts. Read the written instruction in its original context. Keep the original file available for review. 
> 
> ## Records
> Hilltop service records are retained for 18 months. Records involved in an unresolved warranty dispute are kept until the dispute closes.
> Operational note: This section concerns records. Read the written instruction in its original context. Keep the original file available for review. This section concerns records. Read the writt

### RQ25

What is the exact password for the Orchard dispatch database?

**Fixed + coverage: PASS**

I can't find this in the provided documents.

**Section + coverage: PASS**

I can't find this in the provided documents.

### RQ26

What is the Lakeside supplier bank account number?

**Fixed + coverage: PASS**

I can't find this in the provided documents.

**Section + coverage: PASS**

I can't find this in the provided documents.

### RQ27

What is the exact torque value for the Hilltop conveyor drive bolt?

**Fixed + coverage: PASS**

I can't find this in the provided documents.

**Section + coverage: PASS**

I can't find this in the provided documents.

### RQ28

What is the current price of Bitcoin?

**Fixed + coverage: PASS**

I can't find this in the provided documents.

**Section + coverage: PASS**

I can't find this in the provided documents.
