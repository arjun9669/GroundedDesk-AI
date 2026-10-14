# V9 fresh public prospective32 — actual MiniLM

24 original externally authored supported questions; four constructed compound controls; four self-authored unsupported controls. Frozen before answers.31 cases captured, F06 ungraded due runner readiness timeout; no question replay. Not sealed independent accuracy, official SQuAD scoring or representative accuracy; prior public/model exposure cannot be excluded. Gold-paragraph precision is a location proxy, not semantic support. Same-session v8/v9 use identical real vectors. Production remains r44; a gate PASS permits review only.

{
  "summary": {
    "baseline": {
      "BLOCKED": 1,
      "PASS": 17,
      "PARTIAL": 2,
      "FAIL": 12,
      "citations": 28,
      "valid_provenance": 28,
      "gold_paragraph_citations": 19,
      "direct_gold_span_citations": 15,
      "false_acceptances": 0,
      "false_refusals": 1,
      "uncited_refusals": 5
    },
    "fixed": {
      "BLOCKED": 1,
      "PASS": 24,
      "PARTIAL": 1,
      "FAIL": 6,
      "citations": 28,
      "valid_provenance": 28,
      "gold_paragraph_citations": 26,
      "direct_gold_span_citations": 23,
      "false_acceptances": 0,
      "false_refusals": 1,
      "uncited_refusals": 5
    },
    "section": {
      "BLOCKED": 1,
      "PASS": 24,
      "PARTIAL": 1,
      "FAIL": 6,
      "citations": 29,
      "valid_provenance": 29,
      "gold_paragraph_citations": 26,
      "direct_gold_span_citations": 23,
      "false_acceptances": 0,
      "false_refusals": 0,
      "uncited_refusals": 4
    },
    "paired_fixed": {
      "BLOCKED": 1,
      "PASS": 24,
      "PARTIAL": 1,
      "FAIL": 6,
      "citations": 28,
      "valid_provenance": 28,
      "gold_paragraph_citations": 26,
      "direct_gold_span_citations": 23,
      "false_acceptances": 0,
      "false_refusals": 1,
      "uncited_refusals": 5
    },
    "paired_section": {
      "BLOCKED": 1,
      "PASS": 24,
      "PARTIAL": 1,
      "FAIL": 6,
      "citations": 29,
      "valid_provenance": 29,
      "gold_paragraph_citations": 26,
      "direct_gold_span_citations": 23,
      "false_acceptances": 0,
      "false_refusals": 0,
      "uncited_refusals": 4
    }
  },
  "categories": {
    "externally_authored_supported": {
      "baseline": {
        "BLOCKED": 1,
        "PASS": 13,
        "PARTIAL": 1,
        "FAIL": 9,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 17,
        "direct_gold_span_citations": 14,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
      },
      "fixed": {
        "BLOCKED": 1,
        "PASS": 18,
        "PARTIAL": 0,
        "FAIL": 5,
        "citations": 22,
        "valid_provenance": 22,
        "gold_paragraph_citations": 21,
        "direct_gold_span_citations": 18,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
      },
      "section": {
        "BLOCKED": 1,
        "PASS": 18,
        "PARTIAL": 0,
        "FAIL": 5,
        "citations": 23,
        "valid_provenance": 23,
        "gold_paragraph_citations": 21,
        "direct_gold_span_citations": 18,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_fixed": {
        "BLOCKED": 1,
        "PASS": 18,
        "PARTIAL": 0,
        "FAIL": 5,
        "citations": 22,
        "valid_provenance": 22,
        "gold_paragraph_citations": 21,
        "direct_gold_span_citations": 18,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
      },
      "paired_section": {
        "BLOCKED": 1,
        "PASS": 18,
        "PARTIAL": 0,
        "FAIL": 5,
        "citations": 23,
        "valid_provenance": 23,
        "gold_paragraph_citations": 21,
        "direct_gold_span_citations": 18,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      }
    },
    "constructed_compound": {
      "baseline": {
        "BLOCKED": 0,
        "PASS": 0,
        "PARTIAL": 1,
        "FAIL": 3,
        "citations": 4,
        "valid_provenance": 4,
        "gold_paragraph_citations": 2,
        "direct_gold_span_citations": 1,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "fixed": {
        "BLOCKED": 0,
        "PASS": 2,
        "PARTIAL": 1,
        "FAIL": 1,
        "citations": 6,
        "valid_provenance": 6,
        "gold_paragraph_citations": 5,
        "direct_gold_span_citations": 5,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "section": {
        "BLOCKED": 0,
        "PASS": 2,
        "PARTIAL": 1,
        "FAIL": 1,
        "citations": 6,
        "valid_provenance": 6,
        "gold_paragraph_citations": 5,
        "direct_gold_span_citations": 5,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_fixed": {
        "BLOCKED": 0,
        "PASS": 2,
        "PARTIAL": 1,
        "FAIL": 1,
        "citations": 6,
        "valid_provenance": 6,
        "gold_paragraph_citations": 5,
        "direct_gold_span_citations": 5,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_section": {
        "BLOCKED": 0,
        "PASS": 2,
        "PARTIAL": 1,
        "FAIL": 1,
        "citations": 6,
        "valid_provenance": 6,
        "gold_paragraph_citations": 5,
        "direct_gold_span_citations": 5,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      }
    },
    "constructed_unsupported": {
      "baseline": {
        "BLOCKED": 0,
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 0,
        "valid_provenance": 0,
        "gold_paragraph_citations": 0,
        "direct_gold_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 4
      },
      "fixed": {
        "BLOCKED": 0,
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 0,
        "valid_provenance": 0,
        "gold_paragraph_citations": 0,
        "direct_gold_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 4
      },
      "section": {
        "BLOCKED": 0,
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 0,
        "valid_provenance": 0,
        "gold_paragraph_citations": 0,
        "direct_gold_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 4
      },
      "paired_fixed": {
        "BLOCKED": 0,
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 0,
        "valid_provenance": 0,
        "gold_paragraph_citations": 0,
        "direct_gold_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 4
      },
      "paired_section": {
        "BLOCKED": 0,
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 0,
        "valid_provenance": 0,
        "gold_paragraph_citations": 0,
        "direct_gold_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 4
      }
    }
  },
  "checks": {
    "all_cases_captured": false,
    "development_gate_passed": true,
    "fresh_section_supported_at_least_21": false,
    "fresh_section_constructed_all_pass": false,
    "provenance_intact": true,
    "no_false_acceptance_or_refusal": true
  },
  "gate": "BLOCKED: F06 first-attempt output unavailable",
  "regressions": {
    "fixed": [],
    "section": [
      "F18"
    ]
  }
}

## F01

What type of bat that lives in the Amazon rainforest can spread rabies?

**baseline: PASS**

[1] Vampire bats dwell in the rainforest and can spread the rabies virus.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Vampire bats dwell in the rainforest and can spread the rabies virus.

**fixed: PASS**

[1] Vampire bats dwell in the rainforest and can spread the rabies virus.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Vampire bats dwell in the rainforest and can spread the rabies virus.

**section: PASS**

[1] Vampire bats dwell in the rainforest and can spread the rabies virus.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Vampire bats dwell in the rainforest and can spread the rabies virus.

**paired_fixed: PASS**

[1] Vampire bats dwell in the rainforest and can spread the rabies virus.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Vampire bats dwell in the rainforest and can spread the rabies virus.

**paired_section: PASS**

[1] Vampire bats dwell in the rainforest and can spread the rabies virus.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Vampire bats dwell in the rainforest and can spread the rabies virus.

## F02

Which animal that lives in the Amazon river may produce a deadly shock?

**baseline: PASS**

[1] In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

**fixed: PASS**

[1] In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

**section: PASS**

[1] In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

**paired_fixed: PASS**

[1] In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

**paired_section: PASS**

[1] In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

## F03

What fish living in the Amazon river is known to bit humans?

**baseline: PASS**

[1] In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

**fixed: PASS**

[1] In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

**section: PASS**

[1] In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

**paired_fixed: PASS**

[1] In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

**paired_section: PASS**

[1] In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the river, electric eels can produce an electric shock that can stun or kill, while piranha are known to bite and injure humans.

## F04

What is the total make up of fish species living in the Amazon?

**baseline: PASS**

[1] One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

**fixed: PASS**

[1] One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

**section: PASS**

[1] One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

**paired_fixed: PASS**

[1] One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

**paired_section: PASS**

[1] One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

## F05

What amount of bird species on earth are found in the Amazon rainforest?

**baseline: PASS**

[1] One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

**fixed: PASS**

[1] One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

**section: PASS**

[1] One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

**paired_fixed: PASS**

[1] One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

**paired_section: PASS**

[1] One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

## F06

How many invertebrate species are known in Brazil alone? 

**baseline: BLOCKED**



{
  "required_gold_groups": [
    [
      "96,660 and 128,843",
      "between 96,660 and 128,843",
      "128,843"
    ]
  ],
  "matched": []
}

**fixed: BLOCKED**



{
  "required_gold_groups": [
    [
      "96,660 and 128,843",
      "between 96,660 and 128,843",
      "128,843"
    ]
  ],
  "matched": []
}

**section: BLOCKED**



{
  "required_gold_groups": [
    [
      "96,660 and 128,843",
      "between 96,660 and 128,843",
      "128,843"
    ]
  ],
  "matched": []
}

**paired_fixed: BLOCKED**



{
  "required_gold_groups": [
    [
      "96,660 and 128,843",
      "between 96,660 and 128,843",
      "128,843"
    ]
  ],
  "matched": []
}

**paired_section: BLOCKED**



{
  "required_gold_groups": [
    [
      "96,660 and 128,843",
      "between 96,660 and 128,843",
      "128,843"
    ]
  ],
  "matched": []
}

## F07

Where does the largest part of Kenya's power come from?

**baseline: PASS**

[1] The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

**fixed: PASS**

[1] The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

**section: PASS**

[1] The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

**paired_fixed: PASS**

[1] The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

**paired_section: PASS**

[1] The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

## F08

When was Kenya Electricity Generating Company established?

**baseline: PASS**

[1] The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

**fixed: PASS**

[1] The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

**section: PASS**

[1] The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

**paired_fixed: PASS**

[1] The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

**paired_section: PASS**

[1] The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

## F09

Where are these dams located?

**baseline: PASS**

[1] The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

**fixed: PASS**

[1] The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

**section: PASS**

[1] The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

**paired_fixed: PASS**

[1] The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

**paired_section: PASS**

[1] The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

## F10

How much did enrollment increase?

**baseline: FAIL**

[1] Secondary and tertiary education enrolment has not increased proportionally because payment is still required for attendance.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Secondary and tertiary education enrolment has not increased proportionally because payment is still required for attendance.

{
  "required_gold_groups": [
    [
      "increased by about 70%.",
      "70%",
      "70%"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] As a result, primary school enrolment increased by about 70%.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result, primary school enrolment increased by about 70%.

**section: PASS**

[1] As a result, primary school enrolment increased by about 70%.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result, primary school enrolment increased by about 70%.

**paired_fixed: PASS**

[1] As a result, primary school enrolment increased by about 70%.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result, primary school enrolment increased by about 70%.

**paired_section: PASS**

[1] As a result, primary school enrolment increased by about 70%.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result, primary school enrolment increased by about 70%.

## F11

When was free primary school introduced?

**baseline: PASS**

[1] In January 2003, the Government of Kenya announced the introduction of free primary education.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In January 2003, the Government of Kenya announced the introduction of free primary education.

**fixed: PASS**

[1] In January 2003, the Government of Kenya announced the introduction of free primary education.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In January 2003, the Government of Kenya announced the introduction of free primary education.

**section: PASS**

[1] In January 2003, the Government of Kenya announced the introduction of free primary education.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In January 2003, the Government of Kenya announced the introduction of free primary education.

**paired_fixed: PASS**

[1] In January 2003, the Government of Kenya announced the introduction of free primary education.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In January 2003, the Government of Kenya announced the introduction of free primary education.

**paired_section: PASS**

[1] In January 2003, the Government of Kenya announced the introduction of free primary education.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In January 2003, the Government of Kenya announced the introduction of free primary education.

## F12

When was the 8-4-4 system launched?

**baseline: PASS**

[1] The current 8–4–4 system was launched in January 1985.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The current 8–4–4 system was launched in January 1985.

**fixed: PASS**

[1] The current 8–4–4 system was launched in January 1985.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The current 8–4–4 system was launched in January 1985.

**section: PASS**

[1] The current 8–4–4 system was launched in January 1985.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The current 8–4–4 system was launched in January 1985.

**paired_fixed: PASS**

[1] The current 8–4–4 system was launched in January 1985.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The current 8–4–4 system was launched in January 1985.

**paired_section: PASS**

[1] The current 8–4–4 system was launched in January 1985.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The current 8–4–4 system was launched in January 1985.

## F13

Who received the ball that cam Newton lost during a tackle to make it a Denver touchdown?

**baseline: PASS**

[1] A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

**fixed: PASS**

[1] A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

**section: PASS**

[1] A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

**paired_fixed: PASS**

[1] A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

**paired_section: PASS**

[1] A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

## F14

Whose pass to Jerricho Cotchery was ruled incomplete?

**baseline: FAIL**

[1] # Super Bowl 50

## Context 1
After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Super Bowl 50
> 
> ## Context 1
> After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

{
  "required_gold_groups": [
    [
      "Cam Newton",
      "Cam Newton",
      "Newton"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

**section: PASS**

[1] After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

**paired_fixed: PASS**

[1] After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

**paired_section: PASS**

[1] After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

## F15

Who received the pass that was ruled incomplete and confirmed after a challenge?

**baseline: FAIL**

[1] # Super Bowl 50

## Context 1
After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Super Bowl 50
> 
> ## Context 1
> After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

{
  "required_gold_groups": [
    [
      "Jerricho Cotchery",
      "Jerricho Cotchery",
      "Cotchery"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

**section: PASS**

[1] After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

**paired_fixed: PASS**

[1] After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

**paired_section: PASS**

[1] After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

## F16

Who ran for a Carolina touchdown to make the score 10–7?

**baseline: FAIL**

[1] A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

{
  "required_gold_groups": [
    [
      "Jonathan Stewart",
      "Jonathan Stewart",
      "Stewart"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] After a punt from both teams, Carolina got on track with a 9-play, 73-yard scoring drive.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> After a punt from both teams, Carolina got on track with a 9-play, 73-yard scoring drive.

{
  "required_gold_groups": [
    [
      "Jonathan Stewart",
      "Jonathan Stewart",
      "Stewart"
    ]
  ],
  "matched": [
    false
  ]
}

**section: PASS**

[1] Newton completed 4 of 4 passes for 51 yards and rushed twice for 25 yards, while Jonathan Stewart finished the drive with a 1-yard touchdown run, cutting the score to 10–7 with 11:28 left in the second quarter.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Newton completed 4 of 4 passes for 51 yards and rushed twice for 25 yards, while Jonathan Stewart finished the drive with a 1-yard touchdown run, cutting the score to 10–7 with 11:28 left in the second quarter.

**paired_fixed: FAIL**

[1] After a punt from both teams, Carolina got on track with a 9-play, 73-yard scoring drive.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> After a punt from both teams, Carolina got on track with a 9-play, 73-yard scoring drive.

{
  "required_gold_groups": [
    [
      "Jonathan Stewart",
      "Jonathan Stewart",
      "Stewart"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: PASS**

[1] Newton completed 4 of 4 passes for 51 yards and rushed twice for 25 yards, while Jonathan Stewart finished the drive with a 1-yard touchdown run, cutting the score to 10–7 with 11:28 left in the second quarter.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Newton completed 4 of 4 passes for 51 yards and rushed twice for 25 yards, while Jonathan Stewart finished the drive with a 1-yard touchdown run, cutting the score to 10–7 with 11:28 left in the second quarter.

## F17

How many yards did Jordan Norwood return a punt to set the Super Bowl record?

**baseline: PASS**

[1] Norwood had not done so, and with no resistance around him, he took off for a Super Bowl record 61-yard return before Mario Addison dragged him down on the Panthers 14-yard line.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Norwood had not done so, and with no resistance around him, he took off for a Super Bowl record 61-yard return before Mario Addison dragged him down on the Panthers 14-yard line.

**fixed: PASS**

[1] Norwood had not done so, and with no resistance around him, he took off for a Super Bowl record 61-yard return before Mario Addison dragged him down on the Panthers 14-yard line.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Norwood had not done so, and with no resistance around him, he took off for a Super Bowl record 61-yard return before Mario Addison dragged him down on the Panthers 14-yard line.

**section: PASS**

[1] Norwood had not done so, and with no resistance around him, he took off for a Super Bowl record 61-yard return before Mario Addison dragged him down on the Panthers 14-yard line.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Norwood had not done so, and with no resistance around him, he took off for a Super Bowl record 61-yard return before Mario Addison dragged him down on the Panthers 14-yard line.

**paired_fixed: PASS**

[1] Norwood had not done so, and with no resistance around him, he took off for a Super Bowl record 61-yard return before Mario Addison dragged him down on the Panthers 14-yard line.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Norwood had not done so, and with no resistance around him, he took off for a Super Bowl record 61-yard return before Mario Addison dragged him down on the Panthers 14-yard line.

**paired_section: PASS**

[1] Norwood had not done so, and with no resistance around him, he took off for a Super Bowl record 61-yard return before Mario Addison dragged him down on the Panthers 14-yard line.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Norwood had not done so, and with no resistance around him, he took off for a Super Bowl record 61-yard return before Mario Addison dragged him down on the Panthers 14-yard line.

## F18

Who scored the Panthers first touchdown? 

**baseline: PASS**

[1] Newton completed 4 of 4 passes for 51 yards and rushed twice for 25 yards, while Jonathan Stewart finished the drive with a 1-yard touchdown run, cutting the score to 10–7 with 11:28 left in the second quarter.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Newton completed 4 of 4 passes for 51 yards and rushed twice for 25 yards, while Jonathan Stewart finished the drive with a 1-yard touchdown run, cutting the score to 10–7 with 11:28 left in the second quarter.

**fixed: PASS**

[1] Newton completed 4 of 4 passes for 51 yards and rushed twice for 25 yards, while Jonathan Stewart finished the drive with a 1-yard touchdown run, cutting the score to 10–7 with 11:28 left in the second quarter.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Newton completed 4 of 4 passes for 51 yards and rushed twice for 25 yards, while Jonathan Stewart finished the drive with a 1-yard touchdown run, cutting the score to 10–7 with 11:28 left in the second quarter.

**section: FAIL**

[1] This was the first fumble return touchdown in a Super Bowl since Super Bowl XXVIII at the end of the 1993 season.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> This was the first fumble return touchdown in a Super Bowl since Super Bowl XXVIII at the end of the 1993 season.

{
  "required_gold_groups": [
    [
      "Jonathan Stewart",
      "Jonathan Stewart",
      "Stewart"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: PASS**

[1] Newton completed 4 of 4 passes for 51 yards and rushed twice for 25 yards, while Jonathan Stewart finished the drive with a 1-yard touchdown run, cutting the score to 10–7 with 11:28 left in the second quarter.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Newton completed 4 of 4 passes for 51 yards and rushed twice for 25 yards, while Jonathan Stewart finished the drive with a 1-yard touchdown run, cutting the score to 10–7 with 11:28 left in the second quarter.

**paired_section: FAIL**

[1] This was the first fumble return touchdown in a Super Bowl since Super Bowl XXVIII at the end of the 1993 season.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> This was the first fumble return touchdown in a Super Bowl since Super Bowl XXVIII at the end of the 1993 season.

{
  "required_gold_groups": [
    [
      "Jonathan Stewart",
      "Jonathan Stewart",
      "Stewart"
    ]
  ],
  "matched": [
    false
  ]
}

## F19

What should be the main goal of not using punishment in a just system?

**baseline: FAIL**

[1] Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

{
  "required_gold_groups": [
    [
      "would do more harm than good",
      "whether it would do more harm than good",
      "it focuses attention on the threat of punishment and not the moral reasons to follow this law",
      "whether it would do more harm than good",
      "whether it would do more harm than good."
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

{
  "required_gold_groups": [
    [
      "would do more harm than good",
      "whether it would do more harm than good",
      "it focuses attention on the threat of punishment and not the moral reasons to follow this law",
      "whether it would do more harm than good",
      "whether it would do more harm than good."
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

{
  "required_gold_groups": [
    [
      "would do more harm than good",
      "whether it would do more harm than good",
      "it focuses attention on the threat of punishment and not the moral reasons to follow this law",
      "whether it would do more harm than good",
      "whether it would do more harm than good."
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

{
  "required_gold_groups": [
    [
      "would do more harm than good",
      "whether it would do more harm than good",
      "it focuses attention on the threat of punishment and not the moral reasons to follow this law",
      "whether it would do more harm than good",
      "whether it would do more harm than good."
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

{
  "required_gold_groups": [
    [
      "would do more harm than good",
      "whether it would do more harm than good",
      "it focuses attention on the threat of punishment and not the moral reasons to follow this law",
      "whether it would do more harm than good",
      "whether it would do more harm than good."
    ]
  ],
  "matched": [
    false
  ]
}

## F20

Who decides the fate of protesters most of the time?

**baseline: FAIL**

I can't find this in the provided documents.

{
  "required_gold_groups": [
    [
      "the state",
      "judges",
      "the state (including the judges)",
      "the judges",
      "judges"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

I can't find this in the provided documents.

{
  "required_gold_groups": [
    [
      "the state",
      "judges",
      "the state (including the judges)",
      "the judges",
      "judges"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] Leonard Hubert Hoffmann writes, "In deciding whether or not to impose punishment, the most important consideration would be whether it would do more harm than good.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Leonard Hubert Hoffmann writes, "In deciding whether or not to impose punishment, the most important consideration would be whether it would do more harm than good.

{
  "required_gold_groups": [
    [
      "the state",
      "judges",
      "the state (including the judges)",
      "the judges",
      "judges"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

I can't find this in the provided documents.

{
  "required_gold_groups": [
    [
      "the state",
      "judges",
      "the state (including the judges)",
      "the judges",
      "judges"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] Leonard Hubert Hoffmann writes, "In deciding whether or not to impose punishment, the most important consideration would be whether it would do more harm than good.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Leonard Hubert Hoffmann writes, "In deciding whether or not to impose punishment, the most important consideration would be whether it would do more harm than good.

{
  "required_gold_groups": [
    [
      "the state",
      "judges",
      "the state (including the judges)",
      "the judges",
      "judges"
    ]
  ],
  "matched": [
    false
  ]
}

## F21

What should the punishment rely on instead in a just society?

**baseline: FAIL**

[1] Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

{
  "required_gold_groups": [
    [
      "moral reasons to follow this law",
      "whether it would do more harm than good",
      "whether it would do more harm than good",
      "whether it would do more harm than good",
      "whether it would do more harm than good"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

{
  "required_gold_groups": [
    [
      "moral reasons to follow this law",
      "whether it would do more harm than good",
      "whether it would do more harm than good",
      "whether it would do more harm than good",
      "whether it would do more harm than good"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

{
  "required_gold_groups": [
    [
      "moral reasons to follow this law",
      "whether it would do more harm than good",
      "whether it would do more harm than good",
      "whether it would do more harm than good",
      "whether it would do more harm than good"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

{
  "required_gold_groups": [
    [
      "moral reasons to follow this law",
      "whether it would do more harm than good",
      "whether it would do more harm than good",
      "whether it would do more harm than good",
      "whether it would do more harm than good"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

{
  "required_gold_groups": [
    [
      "moral reasons to follow this law",
      "whether it would do more harm than good",
      "whether it would do more harm than good",
      "whether it would do more harm than good",
      "whether it would do more harm than good"
    ]
  ],
  "matched": [
    false
  ]
}

## F22

What would someone who is civilly disobedient do in court?

**baseline: FAIL**

[1] # Civil disobedience

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Civil disobedience

{
  "required_gold_groups": [
    [
      "inform the jury and the public of the political circumstances",
      "plead not guilty",
      "plead not guilty",
      "inform the jury and the public",
      "plead not guilty"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] # Civil disobedience

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Civil disobedience

{
  "required_gold_groups": [
    [
      "inform the jury and the public of the political circumstances",
      "plead not guilty",
      "plead not guilty",
      "inform the jury and the public",
      "plead not guilty"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] # Civil disobedience

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Civil disobedience

{
  "required_gold_groups": [
    [
      "inform the jury and the public of the political circumstances",
      "plead not guilty",
      "plead not guilty",
      "inform the jury and the public",
      "plead not guilty"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] # Civil disobedience

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Civil disobedience

{
  "required_gold_groups": [
    [
      "inform the jury and the public of the political circumstances",
      "plead not guilty",
      "plead not guilty",
      "inform the jury and the public",
      "plead not guilty"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] # Civil disobedience

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Civil disobedience

{
  "required_gold_groups": [
    [
      "inform the jury and the public of the political circumstances",
      "plead not guilty",
      "plead not guilty",
      "inform the jury and the public",
      "plead not guilty"
    ]
  ],
  "matched": [
    false
  ]
}

## F23

What is a secondary goal of pleading not guilty?

**baseline: PARTIAL**

[1] Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience." A technical defense may enhance the chances for acquittal but make f

[2] Despite Denver's excellent field position, they could not get the ball into the end zone, so McManus kicked a 33-yard field goal that increased their lead to 13–7.

[3] Secondary and tertiary education enrolment has not increased proportionally because payment is still required for attendance.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience." A technical defense may enhance the chances for acquittal but make f

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> Despite Denver's excellent field position, they could not get the ball into the end zone, so McManus kicked a 33-yard field goal that increased their lead to 13–7.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> Secondary and tertiary education enrolment has not increased proportionally because payment is still required for attendance.

{
  "required_gold_groups": [
    [
      "use the proceedings as a forum",
      "use the proceedings as a forum to inform the jury and the public of the political circumstances",
      "win an acquittal and avoid imprisonment",
      "use the proceedings as a forum to inform the jury and the public of the political circumstances",
      "use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case"
    ]
  ],
  "matched": [
    true
  ]
}

**fixed: PASS**

[1] Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience." A technical defense may enhance the chances for acquittal but make f

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience." A technical defense may enhance the chances for acquittal but make f

**section: PASS**

[1] Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience." A technical defense may enhance the chances for acquittal but make f

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience." A technical defense may enhance the chances for acquittal but make f

**paired_fixed: PASS**

[1] Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience." A technical defense may enhance the chances for acquittal but make f

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience." A technical defense may enhance the chances for acquittal but make f

**paired_section: PASS**

[1] Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience." A technical defense may enhance the chances for acquittal but make f

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience." A technical defense may enhance the chances for acquittal but make f

## F24

What is the primary goal of pleading not guilty when arrested for Civil Disobedience?

**baseline: FAIL**

[1] # Civil disobedience

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Civil disobedience

{
  "required_gold_groups": [
    [
      "acquittal and avoid imprisonment",
      "win an acquittal and avoid imprisonment or a fine",
      "to use the proceedings as a forum",
      "win an acquittal",
      "to win an acquittal and avoid imprisonment or a fine"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience."

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience."

**section: PASS**

[1] Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience." A technical defense may enhance the chances for acquittal but make f

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience." A technical defense may enhance the chances for acquittal but make f

**paired_fixed: PASS**

[1] Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience."

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience."

**paired_section: PASS**

[1] Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience." A technical defense may enhance the chances for acquittal but make f

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Steven Barkan writes that if defendants plead not guilty, "they must decide whether their primary goal will be to win an acquittal and avoid imprisonment or a fine, or to use the proceedings as a forum to inform the jury and the public of the political circumstances surrounding the case and their reasons for breaking the law via civil disobedience." A technical defense may enhance the chances for acquittal but make f

## C01

What type of bat that lives in the Amazon rainforest can spread rabies? Also, Which animal that lives in the Amazon river may produce a deadly shock?

**baseline: FAIL**

[1] One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

{
  "required_gold_groups": [
    [
      "Vampire bats",
      "Vampire",
      "Vampire"
    ],
    [
      "electric eels",
      "electric eels",
      "electric eels"
    ]
  ],
  "matched": [
    false,
    false
  ]
}

**fixed: FAIL**

[1] One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

{
  "required_gold_groups": [
    [
      "Vampire bats",
      "Vampire",
      "Vampire"
    ],
    [
      "electric eels",
      "electric eels",
      "electric eels"
    ]
  ],
  "matched": [
    false,
    false
  ]
}

**section: FAIL**

[1] One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

{
  "required_gold_groups": [
    [
      "Vampire bats",
      "Vampire",
      "Vampire"
    ],
    [
      "electric eels",
      "electric eels",
      "electric eels"
    ]
  ],
  "matched": [
    false,
    false
  ]
}

**paired_fixed: FAIL**

[1] One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

{
  "required_gold_groups": [
    [
      "Vampire bats",
      "Vampire",
      "Vampire"
    ],
    [
      "electric eels",
      "electric eels",
      "electric eels"
    ]
  ],
  "matched": [
    false,
    false
  ]
}

**paired_section: FAIL**

[1] One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

Source: 01_Amazon_rainforest.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> One in five of all the bird species in the world live in the rainforests of the Amazon, and one in five of the fish species live in Amazonian rivers and streams.

{
  "required_gold_groups": [
    [
      "Vampire bats",
      "Vampire",
      "Vampire"
    ],
    [
      "electric eels",
      "electric eels",
      "electric eels"
    ]
  ],
  "matched": [
    false,
    false
  ]
}

## C02

Where does the largest part of Kenya's power come from? Also, When was Kenya Electricity Generating Company established?

**baseline: PARTIAL**

[1] The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

{
  "required_gold_groups": [
    [
      "hydroelectric stations at dams",
      "hydroelectric stations at dams",
      "dams"
    ],
    [
      "1997",
      "1997",
      "1997"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**fixed: PASS**

[1] The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

[2] The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

**section: PASS**

[1] The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

[2] The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

**paired_fixed: PASS**

[1] The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

[2] The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

**paired_section: PASS**

[1] The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

[2] The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The state-owned Kenya Electricity Generating Company (KenGen), established in 1997 under the name of Kenya Power Company, handles the generation of electricity, while Kenya Power handles the electricity transmission and distribution system in the country.

Source: 02_Kenya.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The largest share of Kenya's electricity supply comes from hydroelectric stations at dams along the upper Tana River, as well as the Turkwel Gorge Dam in the west.

## C03

Who received the ball that cam Newton lost during a tackle to make it a Denver touchdown? Also, Whose pass to Jerricho Cotchery was ruled incomplete?

**baseline: FAIL**

[1] # Super Bowl 50

## Context 1
After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Super Bowl 50
> 
> ## Context 1
> After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

{
  "required_gold_groups": [
    [
      "Malik Jackson",
      "Malik Jackson",
      "Jackson"
    ],
    [
      "Cam Newton",
      "Cam Newton",
      "Newton"
    ]
  ],
  "matched": [
    false,
    false
  ]
}

**fixed: PASS**

[1] After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

[2] A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

**section: PASS**

[1] After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

[2] A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

**paired_fixed: PASS**

[1] After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

[2] A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

**paired_section: PASS**

[1] After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

[2] A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After each team punted, Panthers quarterback Cam Newton appeared to complete a 24-yard pass Jerricho Cotchery, but the call was ruled an incompletion and upheld after a replay challenge.

Source: 03_Super_Bowl_50.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> A few plays later, on 3rd-and-10 from the 15-yard line, linebacker Von Miller knocked the ball out of Newton's hands while sacking him, and Malik Jackson recovered it in the end zone for a Broncos touchdown, giving the team a 10–0 lead.

## C04

What should be the main goal of not using punishment in a just system? Also, Who decides the fate of protesters most of the time?

**baseline: FAIL**

[1] Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment.

{
  "required_gold_groups": [
    [
      "would do more harm than good",
      "whether it would do more harm than good",
      "it focuses attention on the threat of punishment and not the moral reasons to follow this law",
      "whether it would do more harm than good",
      "whether it would do more harm than good."
    ],
    [
      "the state",
      "judges",
      "the state (including the judges)",
      "the judges",
      "judges"
    ]
  ],
  "matched": [
    false,
    false
  ]
}

**fixed: PARTIAL**

[1] Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment. Brownlee argues, "Bringing in deterrence at the level of justification detracts from the law’s engagement in a moral dialogue with the offender as a rational person because it focuses attention on the threat of punishment and not the moral reasons to follow this law." Leonard Hubert Hoffmann writes, "In deciding whether or not to impose punishment, the most important consideration would be whether it would do more harm than good.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment. Brownlee argues, "Bringing in deterrence at the level of justification detracts from the law’s engagement in a moral dialogue with the offender as a rational person because it focuses attention on the threat of punishment and not the moral reasons to follow this law." Leonard Hubert Hoffmann writes, "In deciding whether or not to impose punishment, the most important consideration would be whether it would do more harm than good.

{
  "required_gold_groups": [
    [
      "would do more harm than good",
      "whether it would do more harm than good",
      "it focuses attention on the threat of punishment and not the moral reasons to follow this law",
      "whether it would do more harm than good",
      "whether it would do more harm than good."
    ],
    [
      "the state",
      "judges",
      "the state (including the judges)",
      "the judges",
      "judges"
    ]
  ],
  "matched": [
    true,
    false
  ]
}

**section: PARTIAL**

[1] Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment. Brownlee argues, "Bringing in deterrence at the level of justification detracts from the law’s engagement in a moral dialogue with the offender as a rational person because it focuses attention on the threat of punishment and not the moral reasons to follow this law." Leonard Hubert Hoffmann writes, "In deciding whether or not to impose punishment, the most important consideration would be whether it would do more harm than good.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment. Brownlee argues, "Bringing in deterrence at the level of justification detracts from the law’s engagement in a moral dialogue with the offender as a rational person because it focuses attention on the threat of punishment and not the moral reasons to follow this law." Leonard Hubert Hoffmann writes, "In deciding whether or not to impose punishment, the most important consideration would be whether it would do more harm than good.

{
  "required_gold_groups": [
    [
      "would do more harm than good",
      "whether it would do more harm than good",
      "it focuses attention on the threat of punishment and not the moral reasons to follow this law",
      "whether it would do more harm than good",
      "whether it would do more harm than good."
    ],
    [
      "the state",
      "judges",
      "the state (including the judges)",
      "the judges",
      "judges"
    ]
  ],
  "matched": [
    true,
    false
  ]
}

**paired_fixed: PARTIAL**

[1] Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment. Brownlee argues, "Bringing in deterrence at the level of justification detracts from the law’s engagement in a moral dialogue with the offender as a rational person because it focuses attention on the threat of punishment and not the moral reasons to follow this law." Leonard Hubert Hoffmann writes, "In deciding whether or not to impose punishment, the most important consideration would be whether it would do more harm than good.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment. Brownlee argues, "Bringing in deterrence at the level of justification detracts from the law’s engagement in a moral dialogue with the offender as a rational person because it focuses attention on the threat of punishment and not the moral reasons to follow this law." Leonard Hubert Hoffmann writes, "In deciding whether or not to impose punishment, the most important consideration would be whether it would do more harm than good.

{
  "required_gold_groups": [
    [
      "would do more harm than good",
      "whether it would do more harm than good",
      "it focuses attention on the threat of punishment and not the moral reasons to follow this law",
      "whether it would do more harm than good",
      "whether it would do more harm than good."
    ],
    [
      "the state",
      "judges",
      "the state (including the judges)",
      "the judges",
      "judges"
    ]
  ],
  "matched": [
    true,
    false
  ]
}

**paired_section: PARTIAL**

[1] Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment. Brownlee argues, "Bringing in deterrence at the level of justification detracts from the law’s engagement in a moral dialogue with the offender as a rational person because it focuses attention on the threat of punishment and not the moral reasons to follow this law." Leonard Hubert Hoffmann writes, "In deciding whether or not to impose punishment, the most important consideration would be whether it would do more harm than good.

Source: 04_Civil_disobedience.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Along with giving the offender his "just deserts", achieving crime control via incapacitation and deterrence is a major goal of criminal punishment. Brownlee argues, "Bringing in deterrence at the level of justification detracts from the law’s engagement in a moral dialogue with the offender as a rational person because it focuses attention on the threat of punishment and not the moral reasons to follow this law." Leonard Hubert Hoffmann writes, "In deciding whether or not to impose punishment, the most important consideration would be whether it would do more harm than good.

{
  "required_gold_groups": [
    [
      "would do more harm than good",
      "whether it would do more harm than good",
      "it focuses attention on the threat of punishment and not the moral reasons to follow this law",
      "whether it would do more harm than good",
      "whether it would do more harm than good."
    ],
    [
      "the state",
      "judges",
      "the state (including the judges)",
      "the judges",
      "judges"
    ]
  ],
  "matched": [
    true,
    false
  ]
}

## U01

What is the exact database password used by Amazon rainforest?

**baseline: PASS**

I can't find this in the provided documents.

**fixed: PASS**

I can't find this in the provided documents.

**section: PASS**

I can't find this in the provided documents.

**paired_fixed: PASS**

I can't find this in the provided documents.

**paired_section: PASS**

I can't find this in the provided documents.

## U02

What is the bank account number associated with Kenya?

**baseline: PASS**

I can't find this in the provided documents.

**fixed: PASS**

I can't find this in the provided documents.

**section: PASS**

I can't find this in the provided documents.

**paired_fixed: PASS**

I can't find this in the provided documents.

**paired_section: PASS**

I can't find this in the provided documents.

## U03

What is the date of birth of the fictional coordinator Neris Quill for Super Bowl 50?

**baseline: PASS**

I can't find this in the provided documents.

**fixed: PASS**

I can't find this in the provided documents.

**section: PASS**

I can't find this in the provided documents.

**paired_fixed: PASS**

I can't find this in the provided documents.

**paired_section: PASS**

I can't find this in the provided documents.

## U04

What is the current Bitcoin price in AED in the Civil disobedience documents?

**baseline: PASS**

I can't find this in the provided documents.

**fixed: PASS**

I can't find this in the provided documents.

**section: PASS**

I can't find this in the provided documents.

**paired_fixed: PASS**

I can't find this in the provided documents.

**paired_section: PASS**

I can't find this in the provided documents.
