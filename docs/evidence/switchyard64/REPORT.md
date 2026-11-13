# Switchyard64 first-look results

This author-aware first look tested the unchanged isolated v51 candidate in Windows Google Chrome 157.0.8103.78 with real local MiniLM q8/WASM and Qwen off. Both indexes handled 56 Hybrid questions each. Eight lexical Comparison questions ran once and count toward both logical scores, giving 120 observed outputs. The live 5.6/r44 UI was outside this study. The candidate and corpus were frozen on GitHub before capture. All 131 raw files were sealed before grading.

| Index | PASS | PARTIAL | FAIL | False acceptances | False refusals | Relevant quotes | Literal provenance | Citation numbering valid | Binding audit failures |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| fixed | 39 | 4 | 21 | 16 | 1 | 42/67 | 67/67 | 64/64 | 0 |
| section | 39 | 4 | 21 | 16 | 1 | 42/67 | 67/67 | 64/64 | 0 |

Engineering target (64/64 in each index) **MISSED**. The independent 6.0 release gate and original Fresh64 failure remain open. NextConfirm64's 64/64 per index was a development-exposed regression on a different test set.

## Case-by-case results

| ID | Workflow | Category | Fixed | Section |
|---|---|---|---|---|
| SW01 | hybrid | location | PASS | PASS |
| SW02 | hybrid | capacity | FAIL | FAIL |
| SW03 | hybrid | event | PASS | PASS |
| SW04 | hybrid | retention | PASS | PASS |
| SW05 | hybrid | clock_role | PASS | PASS |
| SW06 | hybrid | wrong_location | PASS | PASS |
| SW07 | hybrid | ambiguous | FAIL | FAIL |
| SW08 | hybrid | location | PASS | PASS |
| SW09 | hybrid | duration | PASS | PASS |
| SW10 | hybrid | publication | PASS | PASS |
| SW11 | hybrid | approval | PASS | PASS |
| SW12 | hybrid | causal | PASS | PASS |
| SW13 | hybrid | policy_boundary | PASS | PASS |
| SW14 | hybrid | missing_property | FAIL | FAIL |
| SW15 | hybrid | location | PASS | PASS |
| SW16 | hybrid | capacity | PASS | PASS |
| SW17 | hybrid | event | PASS | PASS |
| SW18 | hybrid | retention | PARTIAL | PARTIAL |
| SW19 | hybrid | causal | PASS | PASS |
| SW20 | hybrid | ambiguous | FAIL | FAIL |
| SW21 | hybrid | wrong_location | PASS | PASS |
| SW22 | hybrid | location | PASS | PASS |
| SW23 | hybrid | duration | FAIL | FAIL |
| SW24 | hybrid | event | PASS | PASS |
| SW25 | hybrid | approval | PASS | PASS |
| SW26 | hybrid | causal | PASS | PASS |
| SW27 | hybrid | wrong_subject | FAIL | FAIL |
| SW28 | hybrid | wrong_subject | FAIL | FAIL |
| SW29 | hybrid | location | PASS | PASS |
| SW30 | hybrid | capacity | PASS | PASS |
| SW31 | hybrid | clock_role | PARTIAL | PARTIAL |
| SW32 | hybrid | retention | PASS | PASS |
| SW33 | hybrid | event | PASS | PASS |
| SW34 | hybrid | ambiguous | FAIL | FAIL |
| SW35 | hybrid | wrong_location | PASS | PASS |
| SW36 | hybrid | location | PASS | PASS |
| SW37 | hybrid | duration | PASS | PASS |
| SW38 | hybrid | publication | PASS | PASS |
| SW39 | hybrid | approval | PASS | PASS |
| SW40 | hybrid | causal | PASS | PASS |
| SW41 | hybrid | policy_boundary | FAIL | FAIL |
| SW42 | hybrid | missing_property | FAIL | FAIL |
| SW43 | hybrid | location | PASS | PASS |
| SW44 | hybrid | capacity | PASS | PASS |
| SW45 | hybrid | event | PASS | PASS |
| SW46 | hybrid | retention | PARTIAL | PARTIAL |
| SW47 | hybrid | causal | PASS | PASS |
| SW48 | hybrid | wrong_location | FAIL | FAIL |
| SW49 | hybrid | missing_property | FAIL | FAIL |
| SW50 | hybrid | location | PASS | PASS |
| SW51 | hybrid | duration | PASS | PASS |
| SW52 | hybrid | event | PASS | PASS |
| SW53 | hybrid | retention | FAIL | FAIL |
| SW54 | hybrid | departure | FAIL | FAIL |
| SW55 | hybrid | wrong_subject | FAIL | FAIL |
| SW56 | hybrid | missing_property | FAIL | FAIL |
| SW57 | comparison | monthly_comparison | PASS | PASS |
| SW58 | comparison | event_comparison | PASS | PASS |
| SW59 | comparison | hold_comparison | PARTIAL | PARTIAL |
| SW60 | comparison | retention_comparison | FAIL | FAIL |
| SW61 | comparison | missing_month | FAIL | FAIL |
| SW62 | comparison | missing_location | FAIL | FAIL |
| SW63 | comparison | missing_ordinal | FAIL | FAIL |
| SW64 | comparison | missing_hold | FAIL | FAIL |

## Non-passing cases and audit findings

### SW02 · fixed · FAIL

Does the guide count toward the visitor basin limit at Orchid Weir Station, and what is the limit?

[1] The Orchid Weir Station uses a green depth wand for the visitor basin. Staff park the wand upright in the rubber sleeve beneath the eastern rail. The yellow measuring pole stays in a separate pump locker.

- 01_Orchid_Weir_Station.txt · relevant False · provenance True
  > The Orchid Weir Station uses a green depth wand for the visitor basin. Staff park the wand upright in the rubber sleeve beneath the eastern rail. The yellow measuring pole stays in a separate pump locker.

Missing evidence groups — 18 people, including the guide

### SW02 · section · FAIL

Does the guide count toward the visitor basin limit at Orchid Weir Station, and what is the limit?

[1] The Orchid Weir Station uses a green depth wand for the visitor basin. Staff park the wand upright in the rubber sleeve beneath the eastern rail. The yellow measuring pole stays in a separate pump locker.

- 01_Orchid_Weir_Station.txt · relevant False · provenance True
  > The Orchid Weir Station uses a green depth wand for the visitor basin. Staff park the wand upright in the rubber sleeve beneath the eastern rail. The yellow measuring pole stays in a separate pump locker.

Missing evidence groups — 18 people, including the guide

### SW07 · fixed · FAIL

At Orchid Weir Station, how long do they keep the records?

[1] Orchid Weir Station retains repair invoices for three years. That schedule applies only to invoices.

- 01_Orchid_Weir_Station.txt · relevant False · provenance True
  > Orchid Weir Station retains repair invoices for three years. That schedule applies only to invoices.

Expected an explicit refusal with zero citations.

### SW07 · section · FAIL

At Orchid Weir Station, how long do they keep the records?

[1] Orchid Weir Station retains repair invoices for three years. That schedule applies only to invoices.

- 01_Orchid_Weir_Station.txt · relevant False · provenance True
  > Orchid Weir Station retains repair invoices for three years. That schedule applies only to invoices.

Expected an explicit refusal with zero citations.

### SW14 · fixed · FAIL

What wood species is the handle of the ink roller at Basalt Print Studio?

[1] The inking bench has a red rubber mat because wet roller handles can slide on bare wood.

- 02_Basalt_Print_Studio.txt · relevant False · provenance True
  > The inking bench has a red rubber mat because wet roller handles can slide on bare wood.

Expected an explicit refusal with zero citations.

### SW14 · section · FAIL

What wood species is the handle of the ink roller at Basalt Print Studio?

[1] The inking bench has a red rubber mat because wet roller handles can slide on bare wood.

- 02_Basalt_Print_Studio.txt · relevant False · provenance True
  > The inking bench has a red rubber mat because wet roller handles can slide on bare wood.

Expected an explicit refusal with zero citations.

### SW18 · fixed · PARTIAL

What is the ordinary life of the Cinder Kite School equipment issue logs and when can a log held for an open loss claim be cleared?

[1] Cinder Kite School keeps equipment issue logs for 19 months.

- 03_Cinder_Kite_School.txt · relevant True · provenance True
  > Cinder Kite School keeps equipment issue logs for 19 months.

Missing evidence groups — loss claim is still open, until the claim closes

### SW18 · section · PARTIAL

What is the ordinary life of the Cinder Kite School equipment issue logs and when can a log held for an open loss claim be cleared?

[1] Cinder Kite School keeps equipment issue logs for 19 months.

- 03_Cinder_Kite_School.txt · relevant True · provenance True
  > Cinder Kite School keeps equipment issue logs for 19 months.

Missing evidence groups — loss claim is still open, until the claim closes

### SW20 · fixed · FAIL

On which date did the launch facilities at Cinder Kite School open?

[1] Cinder Kite School opened the indoor practice lane on 2 May 2015. The outdoor launch area opened on 12 July 2017.

- 03_Cinder_Kite_School.txt · relevant False · provenance True
  > Cinder Kite School opened the indoor practice lane on 2 May 2015. The outdoor launch area opened on 12 July 2017.

Expected an explicit refusal with zero citations.

### SW20 · section · FAIL

On which date did the launch facilities at Cinder Kite School open?

[1] Cinder Kite School opened the indoor practice lane on 2 May 2015. The outdoor launch area opened on 12 July 2017.

- 03_Cinder_Kite_School.txt · relevant False · provenance True
  > Cinder Kite School opened the indoor practice lane on 2 May 2015. The outdoor launch area opened on 12 July 2017.

Expected an explicit refusal with zero citations.

### SW23 · fixed · FAIL

What is the total clinic duration at Flax Loom Annex, and how much of it is the loom reset?

[1] Flax Loom Annex keeps its ivory reed comb on a peg inside the side cupboard. The brass threading hook lies on the cutting bench.

- 04_Flax_Loom_Annex.txt · relevant False · provenance True
  > Flax Loom Annex keeps its ivory reed comb on a peg inside the side cupboard. The brass threading hook lies on the cutting bench.

Missing evidence groups — 42 minutes, seven-minute loom reset

### SW23 · section · FAIL

What is the total clinic duration at Flax Loom Annex, and how much of it is the loom reset?

[1] Flax Loom Annex keeps its ivory reed comb on a peg inside the side cupboard. The brass threading hook lies on the cutting bench.

- 04_Flax_Loom_Annex.txt · relevant False · provenance True
  > Flax Loom Annex keeps its ivory reed comb on a peg inside the side cupboard. The brass threading hook lies on the cutting bench.

Missing evidence groups — 42 minutes, seven-minute loom reset

### SW27 · fixed · FAIL

Which two people approve borrowing 40 threading hooks from Flax Loom Annex?

[1] Flax Loom Annex keeps its ivory reed comb on a peg inside the side cupboard. The brass threading hook lies on the cutting bench.

- 04_Flax_Loom_Annex.txt · relevant False · provenance True
  > Flax Loom Annex keeps its ivory reed comb on a peg inside the side cupboard. The brass threading hook lies on the cutting bench.

Expected an explicit refusal with zero citations.

### SW27 · section · FAIL

Which two people approve borrowing 40 threading hooks from Flax Loom Annex?

[1] Flax Loom Annex keeps its ivory reed comb on a peg inside the side cupboard. The brass threading hook lies on the cutting bench.

- 04_Flax_Loom_Annex.txt · relevant False · provenance True
  > Flax Loom Annex keeps its ivory reed comb on a peg inside the side cupboard. The brass threading hook lies on the cutting bench.

Expected an explicit refusal with zero citations.

### SW28 · fixed · FAIL

How long does it take Flax Loom Annex to reset the automatic warping frame?

[1] The weaving clinic lasts 42 minutes, which includes a seven-minute loom reset. Visitors can watch the reset from the side aisle.

- 04_Flax_Loom_Annex.txt · relevant False · provenance True
  > The weaving clinic lasts 42 minutes, which includes a seven-minute loom reset. Visitors can watch the reset from the side aisle.

Expected an explicit refusal with zero citations.

### SW28 · section · FAIL

How long does it take Flax Loom Annex to reset the automatic warping frame?

[1] The weaving clinic lasts 42 minutes, which includes a seven-minute loom reset. Visitors can watch the reset from the side aisle.

- 04_Flax_Loom_Annex.txt · relevant False · provenance True
  > The weaving clinic lasts 42 minutes, which includes a seven-minute loom reset. Visitors can watch the reset from the side aisle.

Expected an explicit refusal with zero citations.

### SW31 · fixed · PARTIAL

Which timepiece sets passenger ticket time at Juniper Tram Shed, and what is the reading?

[1] Juniper Tram Shed uses a square clock on the dispatch wall for passenger ticket reference.

- 05_Juniper_Tram_Shed.txt · relevant True · provenance True
  > Juniper Tram Shed uses a square clock on the dispatch wall for passenger ticket reference.

Missing evidence groups — 11:03

### SW31 · section · PARTIAL

Which timepiece sets passenger ticket time at Juniper Tram Shed, and what is the reading?

[1] Juniper Tram Shed uses a square clock on the dispatch wall for passenger ticket reference.

- 05_Juniper_Tram_Shed.txt · relevant True · provenance True
  > Juniper Tram Shed uses a square clock on the dispatch wall for passenger ticket reference.

Missing evidence groups — 11:03

### SW34 · fixed · FAIL

At Juniper Tram Shed, what time is on the clock?

[1] Juniper Tram Shed uses a square clock on the dispatch wall for passenger ticket reference.

- 05_Juniper_Tram_Shed.txt · relevant False · provenance True
  > Juniper Tram Shed uses a square clock on the dispatch wall for passenger ticket reference.

Expected an explicit refusal with zero citations.

### SW34 · section · FAIL

At Juniper Tram Shed, what time is on the clock?

[1] Juniper Tram Shed uses a square clock on the dispatch wall for passenger ticket reference.

- 05_Juniper_Tram_Shed.txt · relevant False · provenance True
  > Juniper Tram Shed uses a square clock on the dispatch wall for passenger ticket reference.

Expected an explicit refusal with zero citations.

### SW41 · fixed · FAIL

What approval does Larch Rope Centre require for a purchase order worth 9,000 credits?

[1] Larch Rope Centre purchase orders above 9,300 credits require written authorization from both the Safety Coordinator and the Cash Custodian.

- 06_Larch_Rope_Centre.txt · relevant False · provenance True
  > Larch Rope Centre purchase orders above 9,300 credits require written authorization from both the Safety Coordinator and the Cash Custodian.

Expected an explicit refusal with zero citations.

### SW41 · section · FAIL

What approval does Larch Rope Centre require for a purchase order worth 9,000 credits?

[1] Larch Rope Centre purchase orders above 9,300 credits require written authorization from both the Safety Coordinator and the Cash Custodian.

- 06_Larch_Rope_Centre.txt · relevant False · provenance True
  > Larch Rope Centre purchase orders above 9,300 credits require written authorization from both the Safety Coordinator and the Cash Custodian.

Expected an explicit refusal with zero citations.

### SW42 · fixed · FAIL

What is the breaking strength of the blue tension ring at Larch Rope Centre?

[1] Larch Rope Centre puts the blue tension ring in a felt pocket on the east frame. The aluminium hoop is hung from the west frame.

- 06_Larch_Rope_Centre.txt · relevant False · provenance True
  > Larch Rope Centre puts the blue tension ring in a felt pocket on the east frame. The aluminium hoop is hung from the west frame.

Expected an explicit refusal with zero citations.

### SW42 · section · FAIL

What is the breaking strength of the blue tension ring at Larch Rope Centre?

[1] Larch Rope Centre puts the blue tension ring in a felt pocket on the east frame. The aluminium hoop is hung from the west frame.

- 06_Larch_Rope_Centre.txt · relevant False · provenance True
  > Larch Rope Centre puts the blue tension ring in a felt pocket on the east frame. The aluminium hoop is hung from the west frame.

Expected an explicit refusal with zero citations.

### SW46 · fixed · PARTIAL

How long does Mica Glass Workshop retain furnace checklists, including the rule for an open temperature dispute?

[1] Mica Glass Workshop retains furnace checklists for 29 months.

- 07_Mica_Glass_Workshop.txt · relevant True · provenance True
  > Mica Glass Workshop retains furnace checklists for 29 months.

Missing evidence groups — temperature dispute is open, until the dispute is resolved

### SW46 · section · PARTIAL

How long does Mica Glass Workshop retain furnace checklists, including the rule for an open temperature dispute?

[1] Mica Glass Workshop retains furnace checklists for 29 months.

- 07_Mica_Glass_Workshop.txt · relevant True · provenance True
  > Mica Glass Workshop retains furnace checklists for 29 months.

Missing evidence groups — temperature dispute is open, until the dispute is resolved

### SW48 · fixed · FAIL

Where at the entrance to Mica Glass Workshop is the pink calibration bead displayed?

[1] The pink calibration bead at Mica Glass Workshop sits in the first tray of the annealing cabinet. Clear demonstration beads are displayed at the entrance.

- 07_Mica_Glass_Workshop.txt · relevant False · provenance True
  > The pink calibration bead at Mica Glass Workshop sits in the first tray of the annealing cabinet. Clear demonstration beads are displayed at the entrance.

Expected an explicit refusal with zero citations.

### SW48 · section · FAIL

Where at the entrance to Mica Glass Workshop is the pink calibration bead displayed?

[1] The pink calibration bead at Mica Glass Workshop sits in the first tray of the annealing cabinet. Clear demonstration beads are displayed at the entrance.

- 07_Mica_Glass_Workshop.txt · relevant False · provenance True
  > The pink calibration bead at Mica Glass Workshop sits in the first tray of the annealing cabinet. Clear demonstration beads are displayed at the entrance.

Expected an explicit refusal with zero citations.

### SW49 · fixed · FAIL

What furnace temperature caused the most recent dispute at Mica Glass Workshop?

[1] Mica Glass Workshop retains furnace checklists for 29 months.

- 07_Mica_Glass_Workshop.txt · relevant False · provenance True
  > Mica Glass Workshop retains furnace checklists for 29 months.

Expected an explicit refusal with zero citations.

### SW49 · section · FAIL

What furnace temperature caused the most recent dispute at Mica Glass Workshop?

[1] Mica Glass Workshop retains furnace checklists for 29 months.

- 07_Mica_Glass_Workshop.txt · relevant False · provenance True
  > Mica Glass Workshop retains furnace checklists for 29 months.

Expected an explicit refusal with zero citations.

### SW53 · fixed · FAIL

How long are Saffron Signal Pier passenger tallies kept when there is no claim, and what happens if a landing claim is unresolved?

I can't find this in the provided documents.

Missing evidence groups — 15 months, unresolved landing claim, until the claim is settled

Refused a supported question.

### SW53 · section · FAIL

How long are Saffron Signal Pier passenger tallies kept when there is no claim, and what happens if a landing claim is unresolved?

I can't find this in the provided documents.

Missing evidence groups — 15 months, unresolved landing claim, until the claim is settled

Refused a supported question.

### SW54 · fixed · FAIL

For a passenger punt leaving early at Saffron Signal Pier, where is it held and until what time?

[1] The Saffron Signal Pier passenger punt has a 12:15 ticket cutoff.

- 08_Saffron_Signal_Pier.txt · relevant False · provenance True
  > The Saffron Signal Pier passenger punt has a 12:15 ticket cutoff.

Missing evidence groups — outer landing, until 12:15

### SW54 · section · FAIL

For a passenger punt leaving early at Saffron Signal Pier, where is it held and until what time?

[1] The Saffron Signal Pier passenger punt has a 12:15 ticket cutoff.

- 08_Saffron_Signal_Pier.txt · relevant False · provenance True
  > The Saffron Signal Pier passenger punt has a 12:15 ticket cutoff.

Missing evidence groups — outer landing, until 12:15

### SW55 · fixed · FAIL

Where does the cargo punt wait when it departs early from Saffron Signal Pier?

[1] The Saffron Signal Pier cargo punt has a 14:25 ticket cutoff and a planned departure at 14:10. Its notice is silent about early-departure holds.

- 08_Saffron_Signal_Pier.txt · relevant False · provenance True
  > The Saffron Signal Pier cargo punt has a 14:25 ticket cutoff and a planned departure at 14:10. Its notice is silent about early-departure holds.

Expected an explicit refusal with zero citations.

### SW55 · section · FAIL

Where does the cargo punt wait when it departs early from Saffron Signal Pier?

[1] The Saffron Signal Pier cargo punt has a 14:25 ticket cutoff and a planned departure at 14:10. Its notice is silent about early-departure holds.

- 08_Saffron_Signal_Pier.txt · relevant False · provenance True
  > The Saffron Signal Pier cargo punt has a 14:25 ticket cutoff and a planned departure at 14:10. Its notice is silent about early-departure holds.

Expected an explicit refusal with zero citations.

### SW56 · fixed · FAIL

What is the emergency channel on the Saffron Signal Pier handheld radio?

[1] Saffron Signal Pier keeps the white message paddle in a wooden rack beside the pilot stairs. The blue paddle is stored in the booking office.

- 08_Saffron_Signal_Pier.txt · relevant False · provenance True
  > Saffron Signal Pier keeps the white message paddle in a wooden rack beside the pilot stairs. The blue paddle is stored in the booking office.

Expected an explicit refusal with zero citations.

### SW56 · section · FAIL

What is the emergency channel on the Saffron Signal Pier handheld radio?

[1] Saffron Signal Pier keeps the white message paddle in a wooden rack beside the pilot stairs. The blue paddle is stored in the booking office.

- 08_Saffron_Signal_Pier.txt · relevant False · provenance True
  > Saffron Signal Pier keeps the white message paddle in a wooden rack beside the pilot stairs. The blue paddle is stored in the booking office.

Expected an explicit refusal with zero citations.

### SW59 · fixed · PARTIAL

Compare passenger ticket cutoffs and required early holds for the skiff at Orchid Weir Station and the tram at Juniper Tram Shed.

[1] The Orchid Weir Station passenger skiff has a 08:40 ticket cutoff.

[2] The Juniper Tram Shed passenger tram has a 11:28 ticket cutoff.

- 01_Orchid_Weir_Station.txt · relevant True · provenance True
  > The Orchid Weir Station passenger skiff has a 08:40 ticket cutoff.

- 05_Juniper_Tram_Shed.txt · relevant True · provenance True
  > The Juniper Tram Shed passenger tram has a 11:28 ticket cutoff.

Missing evidence groups — lower pier until 08:40, covered stop until 11:28

### SW59 · section · PARTIAL

Compare passenger ticket cutoffs and required early holds for the skiff at Orchid Weir Station and the tram at Juniper Tram Shed.

[1] The Orchid Weir Station passenger skiff has a 08:40 ticket cutoff.

[2] The Juniper Tram Shed passenger tram has a 11:28 ticket cutoff.

- 01_Orchid_Weir_Station.txt · relevant True · provenance True
  > The Orchid Weir Station passenger skiff has a 08:40 ticket cutoff.

- 05_Juniper_Tram_Shed.txt · relevant True · provenance True
  > The Juniper Tram Shed passenger tram has a 11:28 ticket cutoff.

Missing evidence groups — lower pier until 08:40, covered stop until 11:28

### SW60 · fixed · FAIL

Compare how long Juniper Tram Shed keeps dispatch journals and Saffron Signal Pier keeps passenger tallies, including both extension rules.

[1] Juniper Tram Shed keeps the amber service token in a cork tray inside the dispatch hatch.

[2] The signal briefing at Saffron Signal Pier lasts 31 minutes, including a four-minute lantern check.

- 05_Juniper_Tram_Shed.txt · relevant False · provenance True
  > Juniper Tram Shed keeps the amber service token in a cork tray inside the dispatch hatch.

- 08_Saffron_Signal_Pier.txt · relevant False · provenance True
  > The signal briefing at Saffron Signal Pier lasts 31 minutes, including a four-minute lantern check.

Missing evidence groups — 22 months, transfer appeal remains open, until the appeal closes, 15 months, unresolved landing claim, until the claim is settled

### SW60 · section · FAIL

Compare how long Juniper Tram Shed keeps dispatch journals and Saffron Signal Pier keeps passenger tallies, including both extension rules.

[1] Juniper Tram Shed keeps the amber service token in a cork tray inside the dispatch hatch.

[2] The signal briefing at Saffron Signal Pier lasts 31 minutes, including a four-minute lantern check.

- 05_Juniper_Tram_Shed.txt · relevant False · provenance True
  > Juniper Tram Shed keeps the amber service token in a cork tray inside the dispatch hatch.

- 08_Saffron_Signal_Pier.txt · relevant False · provenance True
  > The signal briefing at Saffron Signal Pier lasts 31 minutes, including a four-minute lantern check.

Missing evidence groups — 22 months, transfer appeal remains open, until the appeal closes, 15 months, unresolved landing claim, until the claim is settled

### SW61 · fixed · FAIL

Which months saw the highest monthly mean temperatures in the practice halls at Cinder Kite School and Flax Loom Annex, and what were the values?

[1] The practice hall at Cinder Kite School recorded its highest monthly mean temperature of 24 degrees Celsius.

[2] The Flax Loom Annex practice hall recorded a highest monthly mean of 20 degrees Celsius in June.

- 03_Cinder_Kite_School.txt · relevant False · provenance True
  > The practice hall at Cinder Kite School recorded its highest monthly mean temperature of 24 degrees Celsius.

- 04_Flax_Loom_Annex.txt · relevant False · provenance True
  > The Flax Loom Annex practice hall recorded a highest monthly mean of 20 degrees Celsius in June.

Expected an explicit refusal with zero citations.

### SW61 · section · FAIL

Which months saw the highest monthly mean temperatures in the practice halls at Cinder Kite School and Flax Loom Annex, and what were the values?

[1] The practice hall at Cinder Kite School recorded its highest monthly mean temperature of 24 degrees Celsius.

[2] The Flax Loom Annex practice hall recorded a highest monthly mean of 20 degrees Celsius in June.

- 03_Cinder_Kite_School.txt · relevant False · provenance True
  > The practice hall at Cinder Kite School recorded its highest monthly mean temperature of 24 degrees Celsius.

- 04_Flax_Loom_Annex.txt · relevant False · provenance True
  > The Flax Loom Annex practice hall recorded a highest monthly mean of 20 degrees Celsius in June.

Expected an explicit refusal with zero citations.

### SW62 · fixed · FAIL

Give the month and value of each highest monthly mean temperature in the instrument rooms at Orchid Weir Station and Mica Glass Workshop.

[1] At the Orchid Weir Station instrument room, the highest monthly mean temperature was 26 degrees Celsius in August.

[2] Mica Glass Workshop recorded its highest monthly mean temperature as 28 degrees Celsius in September.

- 01_Orchid_Weir_Station.txt · relevant False · provenance True
  > At the Orchid Weir Station instrument room, the highest monthly mean temperature was 26 degrees Celsius in August.

- 07_Mica_Glass_Workshop.txt · relevant False · provenance True
  > Mica Glass Workshop recorded its highest monthly mean temperature as 28 degrees Celsius in September.

Expected an explicit refusal with zero citations.

### SW62 · section · FAIL

Give the month and value of each highest monthly mean temperature in the instrument rooms at Orchid Weir Station and Mica Glass Workshop.

[1] At the Orchid Weir Station instrument room, the highest monthly mean temperature was 26 degrees Celsius in August.

[2] Mica Glass Workshop recorded its highest monthly mean temperature as 28 degrees Celsius in September.

- 01_Orchid_Weir_Station.txt · relevant False · provenance True
  > At the Orchid Weir Station instrument room, the highest monthly mean temperature was 26 degrees Celsius in August.

- 07_Mica_Glass_Workshop.txt · relevant False · provenance True
  > Mica Glass Workshop recorded its highest monthly mean temperature as 28 degrees Celsius in September.

Expected an explicit refusal with zero citations.

### SW63 · fixed · FAIL

Compare the dates when Cinder Kite School commissioned its second wind gauge and Larch Rope Centre commissioned its second anchor winch.

[1] Cinder Kite School commissioned its second wind gauge on 14 October 2016.

[2] Larch Rope Centre commissioned its second capstan on 3 October 2018.

- 03_Cinder_Kite_School.txt · relevant False · provenance True
  > Cinder Kite School commissioned its second wind gauge on 14 October 2016.

- 06_Larch_Rope_Centre.txt · relevant False · provenance True
  > Larch Rope Centre commissioned its second capstan on 3 October 2018.

Expected an explicit refusal with zero citations.

### SW63 · section · FAIL

Compare the dates when Cinder Kite School commissioned its second wind gauge and Larch Rope Centre commissioned its second anchor winch.

[1] Cinder Kite School commissioned its second wind gauge on 14 October 2016.

[2] Larch Rope Centre commissioned its second capstan on 3 October 2018.

- 03_Cinder_Kite_School.txt · relevant False · provenance True
  > Cinder Kite School commissioned its second wind gauge on 14 October 2016.

- 06_Larch_Rope_Centre.txt · relevant False · provenance True
  > Larch Rope Centre commissioned its second capstan on 3 October 2018.

Expected an explicit refusal with zero citations.

### SW64 · fixed · FAIL

Compare the ticket cutoff and mandatory early-departure hold for the maintenance trolley at Juniper Tram Shed and the cargo punt at Saffron Signal Pier.

[1] The Juniper Tram Shed maintenance trolley has a 13:10 ticket cutoff.

[2] The Saffron Signal Pier cargo punt has a 14:25 ticket cutoff and a planned departure at 14:10.

- 05_Juniper_Tram_Shed.txt · relevant False · provenance True
  > The Juniper Tram Shed maintenance trolley has a 13:10 ticket cutoff.

- 08_Saffron_Signal_Pier.txt · relevant False · provenance True
  > The Saffron Signal Pier cargo punt has a 14:25 ticket cutoff and a planned departure at 14:10.

Expected an explicit refusal with zero citations.

### SW64 · section · FAIL

Compare the ticket cutoff and mandatory early-departure hold for the maintenance trolley at Juniper Tram Shed and the cargo punt at Saffron Signal Pier.

[1] The Juniper Tram Shed maintenance trolley has a 13:10 ticket cutoff.

[2] The Saffron Signal Pier cargo punt has a 14:25 ticket cutoff and a planned departure at 14:10.

- 05_Juniper_Tram_Shed.txt · relevant False · provenance True
  > The Juniper Tram Shed maintenance trolley has a 13:10 ticket cutoff.

- 08_Saffron_Signal_Pier.txt · relevant False · provenance True
  > The Saffron Signal Pier cargo punt has a 14:25 ticket cutoff and a planned departure at 14:10.

Expected an explicit refusal with zero citations.

## Evidence

The machine-readable scorecard records every exact answer, displayed quotation, filename and grading decision. The evidence ZIP contains the raw answers, screenshots, runtime receipts, frozen inputs and SHA-256 manifests.
