# Flint32 — first prospective v28 confirmation

This is an author-created stress set, not independent third-party accuracy. Actual installed headless Chrome; production UI baseline and isolated v28 fixed/section outputs are distinct. Four separate lexical Comparisons are not Hybrid. No question retries. r44 stays unchanged.

```json
{
  "summary": {
    "baseline": {
      "PASS": 16,
      "PARTIAL": 5,
      "FAIL": 11,
      "citations": 35,
      "literal": 35,
      "relevant": 23,
      "citation_integrity_cases": 32,
      "false_acceptances": 6,
      "false_refusals": 0
    },
    "fixed": {
      "PASS": 26,
      "PARTIAL": 3,
      "FAIL": 3,
      "citations": 30,
      "literal": 30,
      "relevant": 29,
      "citation_integrity_cases": 32,
      "false_acceptances": 1,
      "false_refusals": 2
    },
    "section": {
      "PASS": 26,
      "PARTIAL": 3,
      "FAIL": 3,
      "citations": 30,
      "literal": 30,
      "relevant": 29,
      "citation_integrity_cases": 32,
      "false_acceptances": 1,
      "false_refusals": 2
    },
    "paired_fixed": {
      "PASS": 24,
      "PARTIAL": 3,
      "FAIL": 5,
      "citations": 27,
      "literal": 27,
      "relevant": 26,
      "citation_integrity_cases": 32,
      "false_acceptances": 1,
      "false_refusals": 4
    },
    "paired_section": {
      "PASS": 24,
      "PARTIAL": 3,
      "FAIL": 5,
      "citations": 27,
      "literal": 27,
      "relevant": 26,
      "citation_integrity_cases": 32,
      "false_acceptances": 1,
      "false_refusals": 4
    }
  },
  "regressions": {
    "fixed": [
      "F08"
    ],
    "section": [
      "F08"
    ]
  },
  "gate": "FAIL"
}
```

## F01 — When did Flintmere Reservoir first admit visitors?

**baseline: PASS**

[1] Flintmere Reservoir opened to visitors in 1906.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Flintmere Reservoir opened to visitors in 1906.

Frozen group matches: [true]

**fixed: PASS**

[1] Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Frozen group matches: [true]

**section: PASS**

[1] Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Frozen group matches: [true]

**paired_section: PASS**

[1] Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Frozen group matches: [true]

## F02 — In which year was the second Flintmere Reservoir spillway overhaul completed?

**baseline: PASS**

[1] The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994.

Frozen group matches: [true]

**fixed: PASS**

[1] Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Frozen group matches: [true]

**section: PASS**

[1] Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Frozen group matches: [true]

**paired_section: PASS**

[1] Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Frozen group matches: [true]

## F03 — What is the highest monthly mean temperature at Flintmere Reservoir, and in which month?

**baseline: FAIL**

[1] The winter monthly mean temperatures at Flintmere Reservoir lie between 5 and 8 degrees Celsius.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant false.

> The winter monthly mean temperatures at Flintmere Reservoir lie between 5 and 8 degrees Celsius.

Frozen group matches: [false]

**fixed: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false]

**section: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false]

**paired_fixed: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false]

**paired_section: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false]

## F04 — How many water samples does Iona collect per fortnight?

**baseline: PASS**

[1] Iona collects seven water samples per fortnight.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Iona collects seven water samples per fortnight.

Frozen group matches: [true]

**fixed: PASS**

[1] Iona collects seven water samples per fortnight. Tevan checks four level gauges per morning. Iona checks two signboards per morning.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Iona collects seven water samples per fortnight. Tevan checks four level gauges per morning. Iona checks two signboards per morning.

Frozen group matches: [true]

**section: PASS**

[1] Iona collects seven water samples per fortnight. Tevan checks four level gauges per morning. Iona checks two signboards per morning.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Iona collects seven water samples per fortnight. Tevan checks four level gauges per morning. Iona checks two signboards per morning.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] Iona collects seven water samples per fortnight. Tevan checks four level gauges per morning. Iona checks two signboards per morning.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Iona collects seven water samples per fortnight. Tevan checks four level gauges per morning. Iona checks two signboards per morning.

Frozen group matches: [true]

**paired_section: PASS**

[1] Iona collects seven water samples per fortnight. Tevan checks four level gauges per morning. Iona checks two signboards per morning.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Iona collects seven water samples per fortnight. Tevan checks four level gauges per morning. Iona checks two signboards per morning.

Frozen group matches: [true]

## F05 — How long should Flintmere Reservoir visitor permits be kept, and what prevents disposal?

**baseline: PARTIAL**

[1] Keep Flintmere Reservoir visitor permits for 8 years.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Keep Flintmere Reservoir visitor permits for 8 years.

Frozen group matches: [true,false]

**fixed: PASS**

[1] Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Frozen group matches: [true,true]

**section: PASS**

[1] Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Frozen group matches: [true,true]

**paired_fixed: PASS**

[1] Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Frozen group matches: [true,true]

**paired_section: PASS**

[1] Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Frozen group matches: [true,true]

## F06 — What year did the Orren Horology Collection gallery restoration take place?

**baseline: FAIL**

[1] The Orren Horology Collection gallery relocation took place in 1934.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant false.

> The Orren Horology Collection gallery relocation took place in 1934.

Frozen group matches: [false]

**fixed: PASS**

[1] The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

Frozen group matches: [true]

**section: PASS**

[1] The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

Frozen group matches: [true]

**paired_fixed: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false]

**paired_section: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false]

## F07 — What year did the Orren Horology Collection gallery relocation take place?

**baseline: PASS**

[1] The Orren Horology Collection gallery relocation took place in 1934.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> The Orren Horology Collection gallery relocation took place in 1934.

Frozen group matches: [true]

**fixed: PASS**

[1] The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

Frozen group matches: [true]

**section: PASS**

[1] The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

Frozen group matches: [true]

**paired_section: PASS**

[1] The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

Frozen group matches: [true]

## F08 — What is the Orren Horology Collection absolute minimum winter temperature?

**baseline: PASS**

[1] The Orren Horology Collection winter average temperature is 14 degrees Celsius; the absolute minimum winter temperature is 2 degrees Celsius.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> The Orren Horology Collection winter average temperature is 14 degrees Celsius; the absolute minimum winter temperature is 2 degrees Celsius.

Frozen group matches: [true]

**fixed: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false]

**section: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false]

**paired_fixed: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false]

**paired_section: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false]

## F09 — Give the normal and dusty-room lubrication intervals for the Orren Horology Collection winding rig, and say whether its inspection interval changes.

**baseline: PARTIAL**

[1] For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

Frozen group matches: [true,false,false]

**fixed: PASS**

[1] For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

[2] In a dusty room the lubrication interval is 48 operating hours.

[3] The inspection interval stays at 24 operating hours in either room.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> In a dusty room the lubrication interval is 48 operating hours.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> The inspection interval stays at 24 operating hours in either room.

Frozen group matches: [true,true,true]

**section: PASS**

[1] For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

[2] In a dusty room the lubrication interval is 48 operating hours.

[3] The inspection interval stays at 24 operating hours in either room.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> In a dusty room the lubrication interval is 48 operating hours.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> The inspection interval stays at 24 operating hours in either room.

Frozen group matches: [true,true,true]

**paired_fixed: PASS**

[1] For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

[2] In a dusty room the lubrication interval is 48 operating hours.

[3] The inspection interval stays at 24 operating hours in either room.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> In a dusty room the lubrication interval is 48 operating hours.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> The inspection interval stays at 24 operating hours in either room.

Frozen group matches: [true,true,true]

**paired_section: PASS**

[1] For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

[2] In a dusty room the lubrication interval is 48 operating hours.

[3] The inspection interval stays at 24 operating hours in either room.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> In a dusty room the lubrication interval is 48 operating hours.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> The inspection interval stays at 24 operating hours in either room.

Frozen group matches: [true,true,true]

## F10 — For a Velric Instrument Workshop purchase above 3800 credits, who must give written approval?

**baseline: PASS**

[1] Velric Instrument Workshop purchases above 3800 credits require written approval from both the Finance Custodian and the Workshop Director.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop purchases above 3800 credits require written approval from both the Finance Custodian and the Workshop Director.

Frozen group matches: [true]

**fixed: PASS**

[1] Velric Instrument Workshop purchases above 3800 credits require written approval from both the Finance Custodian and the Workshop Director.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop purchases above 3800 credits require written approval from both the Finance Custodian and the Workshop Director.

Frozen group matches: [true]

**section: PASS**

[1] Velric Instrument Workshop purchases above 3800 credits require written approval from both the Finance Custodian and the Workshop Director.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop purchases above 3800 credits require written approval from both the Finance Custodian and the Workshop Director.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] Velric Instrument Workshop purchases above 3800 credits require written approval from both the Finance Custodian and the Workshop Director.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop purchases above 3800 credits require written approval from both the Finance Custodian and the Workshop Director.

Frozen group matches: [true]

**paired_section: PASS**

[1] Velric Instrument Workshop purchases above 3800 credits require written approval from both the Finance Custodian and the Workshop Director.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop purchases above 3800 credits require written approval from both the Finance Custodian and the Workshop Director.

Frozen group matches: [true]

## F11 — What are all five contents of the Velric Instrument Workshop purchasing packet?

**baseline: FAIL**

[1] Velric Instrument Workshop was founded in 1981.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant false.

> Velric Instrument Workshop was founded in 1981.

Frozen group matches: [false,false,false,false,false]

**fixed: PASS**

[1] The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

Frozen group matches: [true,true,true,true,true]

**section: PASS**

[1] The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

Frozen group matches: [true,true,true,true,true]

**paired_fixed: PASS**

[1] The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

Frozen group matches: [true,true,true,true,true]

**paired_section: PASS**

[1] The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

Frozen group matches: [true,true,true,true,true]

## F12 — In which year did Sable Travelling Books move its packing office?

**baseline: PASS**

[1] Sable Travelling Books moved its packing office in 2012.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books moved its packing office in 2012.

Frozen group matches: [true]

**fixed: PASS**

[1] Sable Travelling Books moved its packing office in 2012. Its loading ramp was rebuilt in 2021. The public reading desk opened in 2007.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books moved its packing office in 2012. Its loading ramp was rebuilt in 2021. The public reading desk opened in 2007.

Frozen group matches: [true]

**section: PASS**

[1] Sable Travelling Books moved its packing office in 2012. Its loading ramp was rebuilt in 2021. The public reading desk opened in 2007.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books moved its packing office in 2012. Its loading ramp was rebuilt in 2021. The public reading desk opened in 2007.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] Sable Travelling Books moved its packing office in 2012. Its loading ramp was rebuilt in 2021. The public reading desk opened in 2007.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books moved its packing office in 2012. Its loading ramp was rebuilt in 2021. The public reading desk opened in 2007.

Frozen group matches: [true]

**paired_section: PASS**

[1] Sable Travelling Books moved its packing office in 2012. Its loading ramp was rebuilt in 2021. The public reading desk opened in 2007.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books moved its packing office in 2012. Its loading ramp was rebuilt in 2021. The public reading desk opened in 2007.

Frozen group matches: [true]

## F13 — How many return bins does Mina sort per day?

**baseline: PASS**

[1] Mina sorts five return bins per day.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Mina sorts five return bins per day.

Frozen group matches: [true]

**fixed: PASS**

[1] Mina sorts five return bins per day. Jules labels eight book bundles per day. Mina labels three route envelopes per day.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Mina sorts five return bins per day. Jules labels eight book bundles per day. Mina labels three route envelopes per day.

Frozen group matches: [true]

**section: PASS**

[1] Mina sorts five return bins per day. Jules labels eight book bundles per day. Mina labels three route envelopes per day.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Mina sorts five return bins per day. Jules labels eight book bundles per day. Mina labels three route envelopes per day.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] Mina sorts five return bins per day. Jules labels eight book bundles per day. Mina labels three route envelopes per day.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Mina sorts five return bins per day. Jules labels eight book bundles per day. Mina labels three route envelopes per day.

Frozen group matches: [true]

**paired_section: PASS**

[1] Mina sorts five return bins per day. Jules labels eight book bundles per day. Mina labels three route envelopes per day.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Mina sorts five return bins per day. Jules labels eight book bundles per day. Mina labels three route envelopes per day.

Frozen group matches: [true]

## F14 — When does a Sable Travelling Books order released exactly at 14:20 depart, and which hold overrides departure?

**baseline: FAIL**

[1] At Sable Travelling Books, orders released before 14:20 depart on the same service day.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant false.

> At Sable Travelling Books, orders released before 14:20 depart on the same service day.

Frozen group matches: [false,false]

**fixed: PASS**

[1] Orders released at or after 14:20 depart on the following service day, unless a road-closure hold is in effect.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Orders released at or after 14:20 depart on the following service day, unless a road-closure hold is in effect.

Frozen group matches: [true,true]

**section: PASS**

[1] Orders released at or after 14:20 depart on the following service day, unless a road-closure hold is in effect.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Orders released at or after 14:20 depart on the following service day, unless a road-closure hold is in effect.

Frozen group matches: [true,true]

**paired_fixed: PASS**

[1] Orders released at or after 14:20 depart on the following service day, unless a road-closure hold is in effect.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Orders released at or after 14:20 depart on the following service day, unless a road-closure hold is in effect.

Frozen group matches: [true,true]

**paired_section: PASS**

[1] Orders released at or after 14:20 depart on the following service day, unless a road-closure hold is in effect.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Orders released at or after 14:20 depart on the following service day, unless a road-closure hold is in effect.

Frozen group matches: [true,true]

## F15 — What is the Sable Travelling Books dispatch-receipt retention period, including the exception?

**baseline: PASS**

[1] Keep dispatch receipts for 10 months, unless an unresolved loss claim requires longer retention.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Keep dispatch receipts for 10 months, unless an unresolved loss claim requires longer retention.

Frozen group matches: [true,true]

**fixed: PASS**

[1] Keep dispatch receipts for 10 months, unless an unresolved loss claim requires longer retention.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Keep dispatch receipts for 10 months, unless an unresolved loss claim requires longer retention.

Frozen group matches: [true,true]

**section: PASS**

[1] Keep dispatch receipts for 10 months, unless an unresolved loss claim requires longer retention.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Keep dispatch receipts for 10 months, unless an unresolved loss claim requires longer retention.

Frozen group matches: [true,true]

**paired_fixed: PASS**

[1] Keep dispatch receipts for 10 months, unless an unresolved loss claim requires longer retention.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Keep dispatch receipts for 10 months, unless an unresolved loss claim requires longer retention.

Frozen group matches: [true,true]

**paired_section: PASS**

[1] Keep dispatch receipts for 10 months, unless an unresolved loss claim requires longer retention.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Keep dispatch receipts for 10 months, unless an unresolved loss claim requires longer retention.

Frozen group matches: [true,true]

## F16 — When was Velric Instrument Workshop founded?

**baseline: PASS**

[1] Velric Instrument Workshop was founded in 1981.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop was founded in 1981.

Frozen group matches: [true]

**fixed: PASS**

[1] Velric Instrument Workshop was founded in 1981. The tuning bench was rebuilt in 2017, while the display cabinet was restored in 2022.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop was founded in 1981. The tuning bench was rebuilt in 2017, while the display cabinet was restored in 2022.

Frozen group matches: [true]

**section: PASS**

[1] Velric Instrument Workshop was founded in 1981. The tuning bench was rebuilt in 2017, while the display cabinet was restored in 2022.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop was founded in 1981. The tuning bench was rebuilt in 2017, while the display cabinet was restored in 2022.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] Velric Instrument Workshop was founded in 1981. The tuning bench was rebuilt in 2017, while the display cabinet was restored in 2022.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop was founded in 1981. The tuning bench was rebuilt in 2017, while the display cabinet was restored in 2022.

Frozen group matches: [true]

**paired_section: PASS**

[1] Velric Instrument Workshop was founded in 1981. The tuning bench was rebuilt in 2017, while the display cabinet was restored in 2022.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop was founded in 1981. The tuning bench was rebuilt in 2017, while the display cabinet was restored in 2022.

Frozen group matches: [true]

## F17 — How soon does Velric Instrument Workshop acknowledge a service request, and does that deadline promise repair completion?

**baseline: PASS**

[1] Velric Instrument Workshop acknowledges service requests within four business hours. This acknowledgement is not a promise that the repair will be completed within four hours.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop acknowledges service requests within four business hours. This acknowledgement is not a promise that the repair will be completed within four hours.

Frozen group matches: [true,true]

**fixed: PASS**

[1] Velric Instrument Workshop acknowledges service requests within four business hours. This acknowledgement is not a promise that the repair will be completed within four hours.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop acknowledges service requests within four business hours. This acknowledgement is not a promise that the repair will be completed within four hours.

Frozen group matches: [true,true]

**section: PASS**

[1] Velric Instrument Workshop acknowledges service requests within four business hours. This acknowledgement is not a promise that the repair will be completed within four hours.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop acknowledges service requests within four business hours. This acknowledgement is not a promise that the repair will be completed within four hours.

Frozen group matches: [true,true]

**paired_fixed: PASS**

[1] Velric Instrument Workshop acknowledges service requests within four business hours. This acknowledgement is not a promise that the repair will be completed within four hours.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop acknowledges service requests within four business hours. This acknowledgement is not a promise that the repair will be completed within four hours.

Frozen group matches: [true,true]

**paired_section: PASS**

[1] Velric Instrument Workshop acknowledges service requests within four business hours. This acknowledgement is not a promise that the repair will be completed within four hours.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop acknowledges service requests within four business hours. This acknowledgement is not a promise that the repair will be completed within four hours.

Frozen group matches: [true,true]

## F18 — What is the Velric Instrument Workshop highest monthly mean temperature?

**baseline: PASS**

[1] Velric Instrument Workshop has a highest monthly mean temperature of 27 degrees Celsius and a highest recorded daily temperature of 39 degrees Celsius.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop has a highest monthly mean temperature of 27 degrees Celsius and a highest recorded daily temperature of 39 degrees Celsius.

Frozen group matches: [true]

**fixed: PASS**

[1] Velric Instrument Workshop has a highest monthly mean temperature of 27 degrees Celsius and a highest recorded daily temperature of 39 degrees Celsius.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop has a highest monthly mean temperature of 27 degrees Celsius and a highest recorded daily temperature of 39 degrees Celsius.

Frozen group matches: [true]

**section: PASS**

[1] Velric Instrument Workshop has a highest monthly mean temperature of 27 degrees Celsius and a highest recorded daily temperature of 39 degrees Celsius.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop has a highest monthly mean temperature of 27 degrees Celsius and a highest recorded daily temperature of 39 degrees Celsius.

Frozen group matches: [true]

**paired_fixed: PASS**

[1] Velric Instrument Workshop has a highest monthly mean temperature of 27 degrees Celsius and a highest recorded daily temperature of 39 degrees Celsius.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop has a highest monthly mean temperature of 27 degrees Celsius and a highest recorded daily temperature of 39 degrees Celsius.

Frozen group matches: [true]

**paired_section: PASS**

[1] Velric Instrument Workshop has a highest monthly mean temperature of 27 degrees Celsius and a highest recorded daily temperature of 39 degrees Celsius.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop has a highest monthly mean temperature of 27 degrees Celsius and a highest recorded daily temperature of 39 degrees Celsius.

Frozen group matches: [true]

## F19 — List the contents of a Sable Travelling Books dispatch packet.

**baseline: PASS**

[1] Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Frozen group matches: [true,true,true,true]

**fixed: PASS**

[1] Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Frozen group matches: [true,true,true,true]

**section: PASS**

[1] Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Frozen group matches: [true,true,true,true]

**paired_fixed: PASS**

[1] Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Frozen group matches: [true,true,true,true]

**paired_section: PASS**

[1] Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Frozen group matches: [true,true,true,true]

## F20 — What year did the Orren Horology Collection gallery restoration take place? Also, when did Flintmere Reservoir open to visitors?

**baseline: FAIL**

[1] Orren Horology Collection loan receipts are retained for 6 years, except that an open ownership claim requires retention until the claim is settled.

[2] Keep Flintmere Reservoir visitor permits for 8 years.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant false.

> Orren Horology Collection loan receipts are retained for 6 years, except that an open ownership claim requires retention until the claim is settled.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant false.

> Keep Flintmere Reservoir visitor permits for 8 years.

Frozen group matches: [false,false]

**fixed: PASS**

[1] The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

[2] Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Frozen group matches: [true,true]

**section: PASS**

[1] The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

[2] Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.

Frozen group matches: [true,true]

**paired_fixed: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false,false]

**paired_section: FAIL**

I can't find this in the provided documents.

Frozen group matches: [false,false]

## F21 — What year was the Flintmere Reservoir spillway overhauled?

**baseline: FAIL**

[1] Keep Flintmere Reservoir visitor permits for 8 years.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant false.

> Keep Flintmere Reservoir visitor permits for 8 years.

Frozen group matches: []

**fixed: FAIL**

[1] Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant false.

> Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Frozen group matches: []

**section: FAIL**

[1] Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant false.

> Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Frozen group matches: []

**paired_fixed: FAIL**

[1] Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant false.

> Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Frozen group matches: []

**paired_section: FAIL**

[1] Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant false.

> Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.

Frozen group matches: []

## F22 — In what year did the Flintmere Reservoir visitor path close?

**baseline: FAIL**

[1] Keep Flintmere Reservoir visitor permits for 8 years.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant false.

> Keep Flintmere Reservoir visitor permits for 8 years.

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

## F23 — What year did the Orren Horology Collection storehouse restoration take place?

**baseline: FAIL**

[1] Orren Horology Collection loan receipts are retained for 6 years, except that an open ownership claim requires retention until the claim is settled.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant false.

> Orren Horology Collection loan receipts are retained for 6 years, except that an open ownership claim requires retention until the claim is settled.

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

## F24 — How many flutes does Daro polish per week?

**baseline: FAIL**

[1] Daro tunes three violins per week.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant false.

> Daro tunes three violins per week.

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

## F25 — What is the bank account number for Velric Instrument Workshop?

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

## F26 — What exact torque in newton-metres should be used on the Velric Instrument Workshop drill spindle?

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

## F27 — What is the absolute minimum winter temperature at Flintmere Reservoir?

**baseline: FAIL**

[1] The winter monthly mean temperatures at Flintmere Reservoir lie between 5 and 8 degrees Celsius.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant false.

> The winter monthly mean temperatures at Flintmere Reservoir lie between 5 and 8 degrees Celsius.

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

## F28 — What is the highest monthly mean temperature at Dunvale Ferry Station?

**baseline: FAIL**

[1] Velric Instrument Workshop has a highest monthly mean temperature of 27 degrees Celsius and a highest recorded daily temperature of 39 degrees Celsius.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant false.

> Velric Instrument Workshop has a highest monthly mean temperature of 27 degrees Celsius and a highest recorded daily temperature of 39 degrees Celsius.

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

## F29 — Compare how long Flintmere Reservoir keeps visitor permits and Orren Horology Collection keeps loan receipts, including both disposal exceptions.

**baseline: PARTIAL**

[1] Keep Flintmere Reservoir visitor permits for 8 years.

[2] Orren Horology Collection loan receipts are retained for 6 years, except that an open ownership claim requires retention until the claim is settled.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Keep Flintmere Reservoir visitor permits for 8 years.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> Orren Horology Collection loan receipts are retained for 6 years, except that an open ownership claim requires retention until the claim is settled.

Frozen group matches: [true,false,true,true]

**fixed: PARTIAL**

[1] Keep Flintmere Reservoir visitor permits for 8 years.

[2] Orren Horology Collection loan receipts are retained for 6 years, except that an open ownership claim requires retention until the claim is settled.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Keep Flintmere Reservoir visitor permits for 8 years.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> Orren Horology Collection loan receipts are retained for 6 years, except that an open ownership claim requires retention until the claim is settled.

Frozen group matches: [true,false,true,true]

**section: PARTIAL**

[1] Keep Flintmere Reservoir visitor permits for 8 years.

[2] Orren Horology Collection loan receipts are retained for 6 years, except that an open ownership claim requires retention until the claim is settled.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Keep Flintmere Reservoir visitor permits for 8 years.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> Orren Horology Collection loan receipts are retained for 6 years, except that an open ownership claim requires retention until the claim is settled.

Frozen group matches: [true,false,true,true]

**paired_fixed: PARTIAL**

[1] Keep Flintmere Reservoir visitor permits for 8 years.

[2] Orren Horology Collection loan receipts are retained for 6 years, except that an open ownership claim requires retention until the claim is settled.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Keep Flintmere Reservoir visitor permits for 8 years.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> Orren Horology Collection loan receipts are retained for 6 years, except that an open ownership claim requires retention until the claim is settled.

Frozen group matches: [true,false,true,true]

**paired_section: PARTIAL**

[1] Keep Flintmere Reservoir visitor permits for 8 years.

[2] Orren Horology Collection loan receipts are retained for 6 years, except that an open ownership claim requires retention until the claim is settled.

Source: 01_Flintmere_Reservoir.txt; literal true; relevant true.

> Keep Flintmere Reservoir visitor permits for 8 years.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> Orren Horology Collection loan receipts are retained for 6 years, except that an open ownership claim requires retention until the claim is settled.

Frozen group matches: [true,false,true,true]

## F30 — Compare normal lubrication, dusty-room lubrication and inspection intervals for the Orren Horology Collection winding rig and Velric Instrument Workshop drill.

**baseline: PARTIAL**

[1] For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

[2] For the Velric Instrument Workshop drill, lubrication is due every 70 operating hours in normal conditions and every 35 operating hours in a dusty room.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> For the Velric Instrument Workshop drill, lubrication is due every 70 operating hours in normal conditions and every 35 operating hours in a dusty room.

Frozen group matches: [true,false,false,true,true,false]

**fixed: PARTIAL**

[1] For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

[2] For the Velric Instrument Workshop drill, lubrication is due every 70 operating hours in normal conditions and every 35 operating hours in a dusty room.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> For the Velric Instrument Workshop drill, lubrication is due every 70 operating hours in normal conditions and every 35 operating hours in a dusty room.

Frozen group matches: [true,false,false,true,true,false]

**section: PARTIAL**

[1] For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

[2] For the Velric Instrument Workshop drill, lubrication is due every 70 operating hours in normal conditions and every 35 operating hours in a dusty room.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> For the Velric Instrument Workshop drill, lubrication is due every 70 operating hours in normal conditions and every 35 operating hours in a dusty room.

Frozen group matches: [true,false,false,true,true,false]

**paired_fixed: PARTIAL**

[1] For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

[2] For the Velric Instrument Workshop drill, lubrication is due every 70 operating hours in normal conditions and every 35 operating hours in a dusty room.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> For the Velric Instrument Workshop drill, lubrication is due every 70 operating hours in normal conditions and every 35 operating hours in a dusty room.

Frozen group matches: [true,false,false,true,true,false]

**paired_section: PARTIAL**

[1] For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

[2] For the Velric Instrument Workshop drill, lubrication is due every 70 operating hours in normal conditions and every 35 operating hours in a dusty room.

Source: 02_Orren_Horology_Collection.txt; literal true; relevant true.

> For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> For the Velric Instrument Workshop drill, lubrication is due every 70 operating hours in normal conditions and every 35 operating hours in a dusty room.

Frozen group matches: [true,false,false,true,true,false]

## F31 — Compare all packet contents for Velric Instrument Workshop purchasing and Sable Travelling Books dispatch.

**baseline: PASS**

[1] The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

[2] Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Frozen group matches: [true,true,true,true,true,true,true,true,true]

**fixed: PASS**

[1] The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

[2] Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Frozen group matches: [true,true,true,true,true,true,true,true,true]

**section: PASS**

[1] The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

[2] Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Frozen group matches: [true,true,true,true,true,true,true,true,true]

**paired_fixed: PASS**

[1] The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

[2] Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Frozen group matches: [true,true,true,true,true,true,true,true,true]

**paired_section: PASS**

[1] The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

[2] Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip.

Frozen group matches: [true,true,true,true,true,true,true,true,true]

## F32 — Compare acknowledgement deadlines and their limits for Velric Instrument Workshop service requests and Sable Travelling Books reservations.

**baseline: PARTIAL**

[1] Velric Instrument Workshop acknowledges service requests within four business hours.

[2] Sable Travelling Books acknowledges reservation requests within two service days.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop acknowledges service requests within four business hours.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books acknowledges reservation requests within two service days.

Frozen group matches: [true,false,true,false]

**fixed: PARTIAL**

[1] Velric Instrument Workshop acknowledges service requests within four business hours.

[2] Sable Travelling Books acknowledges reservation requests within two service days.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop acknowledges service requests within four business hours.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books acknowledges reservation requests within two service days.

Frozen group matches: [true,false,true,false]

**section: PARTIAL**

[1] Velric Instrument Workshop acknowledges service requests within four business hours.

[2] Sable Travelling Books acknowledges reservation requests within two service days.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop acknowledges service requests within four business hours.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books acknowledges reservation requests within two service days.

Frozen group matches: [true,false,true,false]

**paired_fixed: PARTIAL**

[1] Velric Instrument Workshop acknowledges service requests within four business hours.

[2] Sable Travelling Books acknowledges reservation requests within two service days.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop acknowledges service requests within four business hours.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books acknowledges reservation requests within two service days.

Frozen group matches: [true,false,true,false]

**paired_section: PARTIAL**

[1] Velric Instrument Workshop acknowledges service requests within four business hours.

[2] Sable Travelling Books acknowledges reservation requests within two service days.

Source: 03_Velric_Instrument_Workshop.txt; literal true; relevant true.

> Velric Instrument Workshop acknowledges service requests within four business hours.

Source: 04_Sable_Travelling_Books.txt; literal true; relevant true.

> Sable Travelling Books acknowledges reservation requests within two service days.

Frozen group matches: [true,false,true,false]
