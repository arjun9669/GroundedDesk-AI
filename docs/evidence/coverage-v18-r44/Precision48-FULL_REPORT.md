# V18 prospective Precision48 — actual MiniLM

24 original externally authored supported questions; four constructed compound controls; four standard and eight actor/object/site unsupported controls and eight supported actor controls. Frozen before answers. Not sealed independent accuracy, official SQuAD scoring or representative accuracy; prior public/model exposure cannot be excluded. Gold-paragraph precision is a location proxy, not semantic support. Same-session v17/v18 use identical real vectors. Production remains r44; a gate PASS permits review only.

{
  "summary": {
    "baseline": {
      "PASS": 18,
      "PARTIAL": 1,
      "FAIL": 29,
      "citations": 45,
      "valid_provenance": 45,
      "gold_paragraph_citations": 20,
      "direct_gold_span_citations": 15,
      "false_acceptances": 8,
      "false_refusals": 1,
      "uncited_refusals": 5
    },
    "fixed": {
      "PASS": 40,
      "PARTIAL": 0,
      "FAIL": 8,
      "citations": 37,
      "valid_provenance": 37,
      "gold_paragraph_citations": 34,
      "direct_gold_span_citations": 29,
      "false_acceptances": 0,
      "false_refusals": 1,
      "uncited_refusals": 13
    },
    "section": {
      "PASS": 40,
      "PARTIAL": 0,
      "FAIL": 8,
      "citations": 37,
      "valid_provenance": 37,
      "gold_paragraph_citations": 34,
      "direct_gold_span_citations": 29,
      "false_acceptances": 0,
      "false_refusals": 1,
      "uncited_refusals": 13
    },
    "paired_fixed": {
      "PASS": 40,
      "PARTIAL": 0,
      "FAIL": 8,
      "citations": 37,
      "valid_provenance": 37,
      "gold_paragraph_citations": 34,
      "direct_gold_span_citations": 29,
      "false_acceptances": 0,
      "false_refusals": 1,
      "uncited_refusals": 13
    },
    "paired_section": {
      "PASS": 40,
      "PARTIAL": 0,
      "FAIL": 8,
      "citations": 37,
      "valid_provenance": 37,
      "gold_paragraph_citations": 34,
      "direct_gold_span_citations": 29,
      "false_acceptances": 0,
      "false_refusals": 1,
      "uncited_refusals": 13
    }
  },
  "categories": {
    "externally_authored_supported": {
      "baseline": {
        "PASS": 12,
        "PARTIAL": 0,
        "FAIL": 12,
        "citations": 23,
        "valid_provenance": 23,
        "gold_paragraph_citations": 17,
        "direct_gold_span_citations": 12,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
      },
      "fixed": {
        "PASS": 18,
        "PARTIAL": 0,
        "FAIL": 6,
        "citations": 23,
        "valid_provenance": 23,
        "gold_paragraph_citations": 22,
        "direct_gold_span_citations": 18,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
      },
      "section": {
        "PASS": 18,
        "PARTIAL": 0,
        "FAIL": 6,
        "citations": 23,
        "valid_provenance": 23,
        "gold_paragraph_citations": 22,
        "direct_gold_span_citations": 18,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
      },
      "paired_fixed": {
        "PASS": 18,
        "PARTIAL": 0,
        "FAIL": 6,
        "citations": 23,
        "valid_provenance": 23,
        "gold_paragraph_citations": 22,
        "direct_gold_span_citations": 18,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
      },
      "paired_section": {
        "PASS": 18,
        "PARTIAL": 0,
        "FAIL": 6,
        "citations": 23,
        "valid_provenance": 23,
        "gold_paragraph_citations": 22,
        "direct_gold_span_citations": 18,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
      }
    },
    "constructed_compound": {
      "baseline": {
        "PASS": 2,
        "PARTIAL": 1,
        "FAIL": 1,
        "citations": 4,
        "valid_provenance": 4,
        "gold_paragraph_citations": 3,
        "direct_gold_span_citations": 3,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "fixed": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 6,
        "valid_provenance": 6,
        "gold_paragraph_citations": 6,
        "direct_gold_span_citations": 5,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "section": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 6,
        "valid_provenance": 6,
        "gold_paragraph_citations": 6,
        "direct_gold_span_citations": 5,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_fixed": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 6,
        "valid_provenance": 6,
        "gold_paragraph_citations": 6,
        "direct_gold_span_citations": 5,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_section": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 6,
        "valid_provenance": 6,
        "gold_paragraph_citations": 6,
        "direct_gold_span_citations": 5,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      }
    },
    "constructed_unsupported": {
      "baseline": {
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
    },
    "constructed_unsupported_actor": {
      "baseline": {
        "PASS": 0,
        "PARTIAL": 0,
        "FAIL": 8,
        "citations": 10,
        "valid_provenance": 10,
        "gold_paragraph_citations": 0,
        "direct_gold_span_citations": 0,
        "false_acceptances": 8,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "fixed": {
        "PASS": 8,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 0,
        "valid_provenance": 0,
        "gold_paragraph_citations": 0,
        "direct_gold_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 8
      },
      "section": {
        "PASS": 8,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 0,
        "valid_provenance": 0,
        "gold_paragraph_citations": 0,
        "direct_gold_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 8
      },
      "paired_fixed": {
        "PASS": 8,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 0,
        "valid_provenance": 0,
        "gold_paragraph_citations": 0,
        "direct_gold_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 8
      },
      "paired_section": {
        "PASS": 8,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 0,
        "valid_provenance": 0,
        "gold_paragraph_citations": 0,
        "direct_gold_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 8
      }
    },
    "constructed_actor_supported": {
      "baseline": {
        "PASS": 0,
        "PARTIAL": 0,
        "FAIL": 8,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 0,
        "direct_gold_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "fixed": {
        "PASS": 6,
        "PARTIAL": 0,
        "FAIL": 2,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 6,
        "direct_gold_span_citations": 6,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "section": {
        "PASS": 6,
        "PARTIAL": 0,
        "FAIL": 2,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 6,
        "direct_gold_span_citations": 6,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_fixed": {
        "PASS": 6,
        "PARTIAL": 0,
        "FAIL": 2,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 6,
        "direct_gold_span_citations": 6,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_section": {
        "PASS": 6,
        "PARTIAL": 0,
        "FAIL": 2,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 6,
        "direct_gold_span_citations": 6,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      }
    }
  },
  "checks": {
    "development_gate_passed": true,
    "fixed_supported_at_least_21": false,
    "fixed_supported_actor_all_pass": false,
    "fixed_compounds_all_pass": true,
    "fixed_unsupported_all_pass": true,
    "fixed_every_citation_has_requested_span": false,
    "fixed_provenance_intact": true,
    "fixed_no_false_acceptance_or_refusal": false,
    "fixed_no_production_or_prior_section_pass_loss": true,
    "section_supported_at_least_21": false,
    "section_supported_actor_all_pass": false,
    "section_compounds_all_pass": true,
    "section_unsupported_all_pass": true,
    "section_every_citation_has_requested_span": false,
    "section_provenance_intact": true,
    "section_no_false_acceptance_or_refusal": false,
    "section_no_production_or_prior_section_pass_loss": true
  },
  "gate": "FAIL",
  "regressions": {
    "fixed": [],
    "section": []
  }
}

## F01

What is the UN's climate change treaty?

**baseline: PASS**

[1] The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change.

**fixed: PASS**

[1] The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

**section: PASS**

[1] The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

**paired_fixed: PASS**

[1] The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

**paired_section: PASS**

[1] The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

## F02

What does the UN want to stabilize?

**baseline: FAIL**

[1] # Intergovernmental Panel on Climate Change

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Intergovernmental Panel on Climate Change

{
  "required_gold_groups": [
    [
      "greenhouse gas concentrations in the atmosphere",
      "greenhouse gas concentrations in the atmosphere",
      "stabilize greenhouse gas concentrations in the atmosphere"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

**section: PASS**

[1] The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

**paired_fixed: PASS**

[1] The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

**paired_section: PASS**

[1] The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

## F03

What organization is the IPCC a part of?

**baseline: PASS**

[1] The Intergovernmental Panel on Climate Change (IPCC) is a scientific intergovernmental body under the auspices of the United Nations, set up at the request of member governments.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Intergovernmental Panel on Climate Change (IPCC) is a scientific intergovernmental body under the auspices of the United Nations, set up at the request of member governments.

**fixed: PASS**

[1] The Intergovernmental Panel on Climate Change (IPCC) is a scientific intergovernmental body under the auspices of the United Nations, set up at the request of member governments. It was first established in 1988 by two United Nations organizations, the World Meteorological Organization (WMO) and the United Nations Environment Programme (UNEP), and later endorsed by the United Nations General Assembly through Resolution 43/53. Membership of the IPCC is open to all members of the WMO and UNEP.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Intergovernmental Panel on Climate Change (IPCC) is a scientific intergovernmental body under the auspices of the United Nations, set up at the request of member governments. It was first established in 1988 by two United Nations organizations, the World Meteorological Organization (WMO) and the United Nations Environment Programme (UNEP), and later endorsed by the United Nations General Assembly through Resolution 43/53. Membership of the IPCC is open to all members of the WMO and UNEP.

**section: PASS**

[1] The Intergovernmental Panel on Climate Change (IPCC) is a scientific intergovernmental body under the auspices of the United Nations, set up at the request of member governments. It was first established in 1988 by two United Nations organizations, the World Meteorological Organization (WMO) and the United Nations Environment Programme (UNEP), and later endorsed by the United Nations General Assembly through Resolution 43/53. Membership of the IPCC is open to all members of the WMO and UNEP.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Intergovernmental Panel on Climate Change (IPCC) is a scientific intergovernmental body under the auspices of the United Nations, set up at the request of member governments. It was first established in 1988 by two United Nations organizations, the World Meteorological Organization (WMO) and the United Nations Environment Programme (UNEP), and later endorsed by the United Nations General Assembly through Resolution 43/53. Membership of the IPCC is open to all members of the WMO and UNEP.

**paired_fixed: PASS**

[1] The Intergovernmental Panel on Climate Change (IPCC) is a scientific intergovernmental body under the auspices of the United Nations, set up at the request of member governments. It was first established in 1988 by two United Nations organizations, the World Meteorological Organization (WMO) and the United Nations Environment Programme (UNEP), and later endorsed by the United Nations General Assembly through Resolution 43/53. Membership of the IPCC is open to all members of the WMO and UNEP.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Intergovernmental Panel on Climate Change (IPCC) is a scientific intergovernmental body under the auspices of the United Nations, set up at the request of member governments. It was first established in 1988 by two United Nations organizations, the World Meteorological Organization (WMO) and the United Nations Environment Programme (UNEP), and later endorsed by the United Nations General Assembly through Resolution 43/53. Membership of the IPCC is open to all members of the WMO and UNEP.

**paired_section: PASS**

[1] The Intergovernmental Panel on Climate Change (IPCC) is a scientific intergovernmental body under the auspices of the United Nations, set up at the request of member governments. It was first established in 1988 by two United Nations organizations, the World Meteorological Organization (WMO) and the United Nations Environment Programme (UNEP), and later endorsed by the United Nations General Assembly through Resolution 43/53. Membership of the IPCC is open to all members of the WMO and UNEP.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Intergovernmental Panel on Climate Change (IPCC) is a scientific intergovernmental body under the auspices of the United Nations, set up at the request of member governments. It was first established in 1988 by two United Nations organizations, the World Meteorological Organization (WMO) and the United Nations Environment Programme (UNEP), and later endorsed by the United Nations General Assembly through Resolution 43/53. Membership of the IPCC is open to all members of the WMO and UNEP.

## F04

How many Medieval Warm Period reconstructions were used?

**baseline: FAIL**

[1] In addition, analysis of the Medieval Warm Period cited reconstructions by Crowley & Lowery 2000 (as cited in the TAR) and Osborn & Briffa 2006.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> In addition, analysis of the Medieval Warm Period cited reconstructions by Crowley & Lowery 2000 (as cited in the TAR) and Osborn & Briffa 2006.

{
  "required_gold_groups": [
    [
      "14",
      "Ten",
      "14"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] In addition, analysis of the Medieval Warm Period cited reconstructions by Crowley & Lowery 2000 (as cited in the TAR) and Osborn & Briffa 2006.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> In addition, analysis of the Medieval Warm Period cited reconstructions by Crowley & Lowery 2000 (as cited in the TAR) and Osborn & Briffa 2006.

{
  "required_gold_groups": [
    [
      "14",
      "Ten",
      "14"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] In addition, analysis of the Medieval Warm Period cited reconstructions by Crowley & Lowery 2000 (as cited in the TAR) and Osborn & Briffa 2006.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> In addition, analysis of the Medieval Warm Period cited reconstructions by Crowley & Lowery 2000 (as cited in the TAR) and Osborn & Briffa 2006.

{
  "required_gold_groups": [
    [
      "14",
      "Ten",
      "14"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] In addition, analysis of the Medieval Warm Period cited reconstructions by Crowley & Lowery 2000 (as cited in the TAR) and Osborn & Briffa 2006.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> In addition, analysis of the Medieval Warm Period cited reconstructions by Crowley & Lowery 2000 (as cited in the TAR) and Osborn & Briffa 2006.

{
  "required_gold_groups": [
    [
      "14",
      "Ten",
      "14"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] In addition, analysis of the Medieval Warm Period cited reconstructions by Crowley & Lowery 2000 (as cited in the TAR) and Osborn & Briffa 2006.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> In addition, analysis of the Medieval Warm Period cited reconstructions by Crowley & Lowery 2000 (as cited in the TAR) and Osborn & Briffa 2006.

{
  "required_gold_groups": [
    [
      "14",
      "Ten",
      "14"
    ]
  ],
  "matched": [
    false
  ]
}

## F05

How many Medieval Warm Period reconstructions covered 1,000+ years?

**baseline: PASS**

[1] Ten of these 14 reconstructions covered 1,000 years or longer.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Ten of these 14 reconstructions covered 1,000 years or longer.

**fixed: PASS**

[1] Ten of these 14 reconstructions covered 1,000 years or longer.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Ten of these 14 reconstructions covered 1,000 years or longer.

**section: PASS**

[1] Ten of these 14 reconstructions covered 1,000 years or longer.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Ten of these 14 reconstructions covered 1,000 years or longer.

**paired_fixed: PASS**

[1] Ten of these 14 reconstructions covered 1,000 years or longer.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Ten of these 14 reconstructions covered 1,000 years or longer.

**paired_section: PASS**

[1] Ten of these 14 reconstructions covered 1,000 years or longer.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Ten of these 14 reconstructions covered 1,000 years or longer.

## F06

When was the IPCC Third Assessment Report published?

**baseline: FAIL**

[1] "

## Context 2
The IPCC Fourth Assessment Report (AR4) published in 2007 featured a graph showing 12 proxy based temperature reconstructions, including the three highlighted in the 2001 Third Assessment Report (TAR); Mann, Bradley & Hughes 1999 as before, Jones et al.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> "
> 
> ## Context 2
> The IPCC Fourth Assessment Report (AR4) published in 2007 featured a graph showing 12 proxy based temperature reconstructions, including the three highlighted in the 2001 Third Assessment Report (TAR); Mann, Bradley & Hughes 1999 as before, Jones et al.

{
  "required_gold_groups": [
    [
      "2001",
      "2001",
      "2001"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] The IPCC Fourth Assessment Report (AR4) published in 2007 featured a graph showing 12 proxy based temperature reconstructions, including the three highlighted in the 2001 Third Assessment Report (TAR); Mann, Bradley & Hughes 1999 as before, Jones et al. 1998 and Briffa 2000 had both been calibrated by newer studies.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC Fourth Assessment Report (AR4) published in 2007 featured a graph showing 12 proxy based temperature reconstructions, including the three highlighted in the 2001 Third Assessment Report (TAR); Mann, Bradley & Hughes 1999 as before, Jones et al. 1998 and Briffa 2000 had both been calibrated by newer studies.

**section: PASS**

[1] The IPCC Fourth Assessment Report (AR4) published in 2007 featured a graph showing 12 proxy based temperature reconstructions, including the three highlighted in the 2001 Third Assessment Report (TAR); Mann, Bradley & Hughes 1999 as before, Jones et al. 1998 and Briffa 2000 had both been calibrated by newer studies.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC Fourth Assessment Report (AR4) published in 2007 featured a graph showing 12 proxy based temperature reconstructions, including the three highlighted in the 2001 Third Assessment Report (TAR); Mann, Bradley & Hughes 1999 as before, Jones et al. 1998 and Briffa 2000 had both been calibrated by newer studies.

**paired_fixed: PASS**

[1] The IPCC Fourth Assessment Report (AR4) published in 2007 featured a graph showing 12 proxy based temperature reconstructions, including the three highlighted in the 2001 Third Assessment Report (TAR); Mann, Bradley & Hughes 1999 as before, Jones et al. 1998 and Briffa 2000 had both been calibrated by newer studies.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC Fourth Assessment Report (AR4) published in 2007 featured a graph showing 12 proxy based temperature reconstructions, including the three highlighted in the 2001 Third Assessment Report (TAR); Mann, Bradley & Hughes 1999 as before, Jones et al. 1998 and Briffa 2000 had both been calibrated by newer studies.

**paired_section: PASS**

[1] The IPCC Fourth Assessment Report (AR4) published in 2007 featured a graph showing 12 proxy based temperature reconstructions, including the three highlighted in the 2001 Third Assessment Report (TAR); Mann, Bradley & Hughes 1999 as before, Jones et al. 1998 and Briffa 2000 had both been calibrated by newer studies.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC Fourth Assessment Report (AR4) published in 2007 featured a graph showing 12 proxy based temperature reconstructions, including the three highlighted in the 2001 Third Assessment Report (TAR); Mann, Bradley & Hughes 1999 as before, Jones et al. 1998 and Briffa 2000 had both been calibrated by newer studies.

## F07

What does political pressure push to extend to compensate for stagnating purchasing power?

**baseline: PASS**

[1] To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low.

**fixed: PASS**

[1] To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

**section: PASS**

[1] To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

**paired_fixed: PASS**

[1] To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

**paired_section: PASS**

[1] To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

## F08

What has given the American economy a tendency to go "from bubble to bubble"?

**baseline: FAIL**

[1] This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

{
  "required_gold_groups": [
    [
      "easier credit",
      "easier credit",
      "easier credit"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

**section: PASS**

[1] To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

**paired_fixed: PASS**

[1] To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

**paired_section: PASS**

[1] To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

## F09

What does Rajan feel has created deep financial fault lines?

**baseline: FAIL**

[1] # Economic inequality

## Context 1
Central Banking economist Raghuram Rajan argues that "systematic economic inequalities, within the United States and around the world, have created deep financial 'fault lines' that have made [financial] crises more likely to happen than in the past" – the Financial crisis of 2007–08 being the most recent example.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Economic inequality
> 
> ## Context 1
> Central Banking economist Raghuram Rajan argues that "systematic economic inequalities, within the United States and around the world, have created deep financial 'fault lines' that have made [financial] crises more likely to happen than in the past" – the Financial crisis of 2007–08 being the most recent example.

{
  "required_gold_groups": [
    [
      "systematic economic inequalities",
      "systematic economic inequalities",
      "systematic economic inequalities"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] Central Banking economist Raghuram Rajan argues that "systematic economic inequalities, within the United States and around the world, have created deep financial 'fault lines' that have made [financial] crises more likely to happen than in the past" – the Financial crisis of 2007–08 being the most recent example. To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Central Banking economist Raghuram Rajan argues that "systematic economic inequalities, within the United States and around the world, have created deep financial 'fault lines' that have made [financial] crises more likely to happen than in the past" – the Financial crisis of 2007–08 being the most recent example. To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low.

**section: PASS**

[1] Central Banking economist Raghuram Rajan argues that "systematic economic inequalities, within the United States and around the world, have created deep financial 'fault lines' that have made [financial] crises more likely to happen than in the past" – the Financial crisis of 2007–08 being the most recent example. To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Central Banking economist Raghuram Rajan argues that "systematic economic inequalities, within the United States and around the world, have created deep financial 'fault lines' that have made [financial] crises more likely to happen than in the past" – the Financial crisis of 2007–08 being the most recent example. To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low.

**paired_fixed: PASS**

[1] Central Banking economist Raghuram Rajan argues that "systematic economic inequalities, within the United States and around the world, have created deep financial 'fault lines' that have made [financial] crises more likely to happen than in the past" – the Financial crisis of 2007–08 being the most recent example. To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Central Banking economist Raghuram Rajan argues that "systematic economic inequalities, within the United States and around the world, have created deep financial 'fault lines' that have made [financial] crises more likely to happen than in the past" – the Financial crisis of 2007–08 being the most recent example. To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low.

**paired_section: PASS**

[1] Central Banking economist Raghuram Rajan argues that "systematic economic inequalities, within the United States and around the world, have created deep financial 'fault lines' that have made [financial] crises more likely to happen than in the past" – the Financial crisis of 2007–08 being the most recent example. To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Central Banking economist Raghuram Rajan argues that "systematic economic inequalities, within the United States and around the world, have created deep financial 'fault lines' that have made [financial] crises more likely to happen than in the past" – the Financial crisis of 2007–08 being the most recent example. To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low.

## F10

What is it estimated that about half of all variation in homicide rates can be accounted for by?

**baseline: PASS**

[1] They estimated that about half of all variation in homicide rates can be accounted for by differences in the amount of inequality in each province or state.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> They estimated that about half of all variation in homicide rates can be accounted for by differences in the amount of inequality in each province or state.

**fixed: PASS**

[1] They estimated that about half of all variation in homicide rates can be accounted for by differences in the amount of inequality in each province or state. Fajnzylber et al. (2002) found a similar relationship worldwide. Among comments in academic literature on the relationship between homicides and inequality are:

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> They estimated that about half of all variation in homicide rates can be accounted for by differences in the amount of inequality in each province or state. Fajnzylber et al. (2002) found a similar relationship worldwide. Among comments in academic literature on the relationship between homicides and inequality are:

**section: PASS**

[1] They estimated that about half of all variation in homicide rates can be accounted for by differences in the amount of inequality in each province or state. Fajnzylber et al. (2002) found a similar relationship worldwide. Among comments in academic literature on the relationship between homicides and inequality are:

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> They estimated that about half of all variation in homicide rates can be accounted for by differences in the amount of inequality in each province or state. Fajnzylber et al. (2002) found a similar relationship worldwide. Among comments in academic literature on the relationship between homicides and inequality are:

**paired_fixed: PASS**

[1] They estimated that about half of all variation in homicide rates can be accounted for by differences in the amount of inequality in each province or state. Fajnzylber et al. (2002) found a similar relationship worldwide. Among comments in academic literature on the relationship between homicides and inequality are:

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> They estimated that about half of all variation in homicide rates can be accounted for by differences in the amount of inequality in each province or state. Fajnzylber et al. (2002) found a similar relationship worldwide. Among comments in academic literature on the relationship between homicides and inequality are:

**paired_section: PASS**

[1] They estimated that about half of all variation in homicide rates can be accounted for by differences in the amount of inequality in each province or state. Fajnzylber et al. (2002) found a similar relationship worldwide. Among comments in academic literature on the relationship between homicides and inequality are:

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> They estimated that about half of all variation in homicide rates can be accounted for by differences in the amount of inequality in each province or state. Fajnzylber et al. (2002) found a similar relationship worldwide. Among comments in academic literature on the relationship between homicides and inequality are:

## F11

Over how many studies have shown that violence is more common in societies with income differences?

**baseline: PASS**

[1] There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger.

**fixed: PASS**

[1] There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries. Daly et al. 2001 found that among U.S States and Canadian Provinces there is a tenfold difference in homicide rates related to inequality.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries. Daly et al. 2001 found that among U.S States and Canadian Provinces there is a tenfold difference in homicide rates related to inequality.

**section: PASS**

[1] There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries. Daly et al. 2001 found that among U.S States and Canadian Provinces there is a tenfold difference in homicide rates related to inequality.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries. Daly et al. 2001 found that among U.S States and Canadian Provinces there is a tenfold difference in homicide rates related to inequality.

**paired_fixed: PASS**

[1] There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries. Daly et al. 2001 found that among U.S States and Canadian Provinces there is a tenfold difference in homicide rates related to inequality.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries. Daly et al. 2001 found that among U.S States and Canadian Provinces there is a tenfold difference in homicide rates related to inequality.

**paired_section: PASS**

[1] There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries. Daly et al. 2001 found that among U.S States and Canadian Provinces there is a tenfold difference in homicide rates related to inequality.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries. Daly et al. 2001 found that among U.S States and Canadian Provinces there is a tenfold difference in homicide rates related to inequality.

## F12

What is almost identical across all nations and jurisdictions?

**baseline: PASS**

[1] Most studies looking into the relationship have concentrated on homicides – since homicides are almost identically defined across all nations and jurisdictions.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Most studies looking into the relationship have concentrated on homicides – since homicides are almost identically defined across all nations and jurisdictions.

**fixed: PASS**

[1] Most studies looking into the relationship have concentrated on homicides – since homicides are almost identically defined across all nations and jurisdictions. There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Most studies looking into the relationship have concentrated on homicides – since homicides are almost identically defined across all nations and jurisdictions. There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries.

**section: PASS**

[1] Most studies looking into the relationship have concentrated on homicides – since homicides are almost identically defined across all nations and jurisdictions. There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Most studies looking into the relationship have concentrated on homicides – since homicides are almost identically defined across all nations and jurisdictions. There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries.

**paired_fixed: PASS**

[1] Most studies looking into the relationship have concentrated on homicides – since homicides are almost identically defined across all nations and jurisdictions. There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Most studies looking into the relationship have concentrated on homicides – since homicides are almost identically defined across all nations and jurisdictions. There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries.

**paired_section: PASS**

[1] Most studies looking into the relationship have concentrated on homicides – since homicides are almost identically defined across all nations and jurisdictions. There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Most studies looking into the relationship have concentrated on homicides – since homicides are almost identically defined across all nations and jurisdictions. There have been over fifty studies showing tendencies for violence to be more common in societies where income differences are larger. Research has been conducted comparing developed countries with undeveloped countries, as well as studying areas within countries.

## F13

What is set aside for question periods in the debating chamber?

**baseline: FAIL**

[1] # Scottish Parliament

## Context 1
Parliamentary time is also set aside for question periods in the debating chamber.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Scottish Parliament
> 
> ## Context 1
> Parliamentary time is also set aside for question periods in the debating chamber.

{
  "required_gold_groups": [
    [
      "Parliamentary time",
      "Parliamentary time",
      "Parliamentary time"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

**section: PASS**

[1] Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

**paired_fixed: PASS**

[1] Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

**paired_section: PASS**

[1] Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

## F14

What may members question the First Minister about directly during First Minister's Question Time?

**baseline: PASS**

[1] This gives members an opportunity to question the First Minister directly on issues under their jurisdiction.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> This gives members an opportunity to question the First Minister directly on issues under their jurisdiction.

**fixed: PASS**

[1] This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

**section: PASS**

[1] This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

**paired_fixed: PASS**

[1] This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

**paired_section: PASS**

[1] This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

## F15

How many general questions are available to opposition leaders?

**baseline: FAIL**

[1] The four general questions available to opposition leaders are:

## Context 2
The Presiding Officer (or Deputy Presiding Officer) decides who speaks in chamber debates and the amount of time for which they are allowed to speak.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> The four general questions available to opposition leaders are:
> 
> ## Context 2
> The Presiding Officer (or Deputy Presiding Officer) decides who speaks in chamber debates and the amount of time for which they are allowed to speak.

{
  "required_gold_groups": [
    [
      "four",
      "four",
      "four"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] The four general questions available to opposition leaders are:

## Context 2
The Presiding Officer (or Deputy Presiding Officer) decides who speaks in chamber debates and the amount of time for which they are allowed to speak.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> The four general questions available to opposition leaders are:
> 
> ## Context 2
> The Presiding Officer (or Deputy Presiding Officer) decides who speaks in chamber debates and the amount of time for which they are allowed to speak.

{
  "required_gold_groups": [
    [
      "four",
      "four",
      "four"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] The four general questions available to opposition leaders are:

## Context 2
The Presiding Officer (or Deputy Presiding Officer) decides who speaks in chamber debates and the amount of time for which they are allowed to speak.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> The four general questions available to opposition leaders are:
> 
> ## Context 2
> The Presiding Officer (or Deputy Presiding Officer) decides who speaks in chamber debates and the amount of time for which they are allowed to speak.

{
  "required_gold_groups": [
    [
      "four",
      "four",
      "four"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] The four general questions available to opposition leaders are:

## Context 2
The Presiding Officer (or Deputy Presiding Officer) decides who speaks in chamber debates and the amount of time for which they are allowed to speak.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> The four general questions available to opposition leaders are:
> 
> ## Context 2
> The Presiding Officer (or Deputy Presiding Officer) decides who speaks in chamber debates and the amount of time for which they are allowed to speak.

{
  "required_gold_groups": [
    [
      "four",
      "four",
      "four"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] The four general questions available to opposition leaders are:

## Context 2
The Presiding Officer (or Deputy Presiding Officer) decides who speaks in chamber debates and the amount of time for which they are allowed to speak.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> The four general questions available to opposition leaders are:
> 
> ## Context 2
> The Presiding Officer (or Deputy Presiding Officer) decides who speaks in chamber debates and the amount of time for which they are allowed to speak.

{
  "required_gold_groups": [
    [
      "four",
      "four",
      "four"
    ]
  ],
  "matched": [
    false
  ]
}

## F16

What language other than English has the Scottish Parliament had meetings in?

**baseline: PASS**

[1] Speeches to the chamber are normally delivered in English, but members may use Scots, Gaelic, or any other language with the agreement of the Presiding Officer.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Speeches to the chamber are normally delivered in English, but members may use Scots, Gaelic, or any other language with the agreement of the Presiding Officer.

**fixed: PASS**

[1] Speeches to the chamber are normally delivered in English, but members may use Scots, Gaelic, or any other language with the agreement of the Presiding Officer.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Speeches to the chamber are normally delivered in English, but members may use Scots, Gaelic, or any other language with the agreement of the Presiding Officer.

**section: PASS**

[1] Speeches to the chamber are normally delivered in English, but members may use Scots, Gaelic, or any other language with the agreement of the Presiding Officer.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Speeches to the chamber are normally delivered in English, but members may use Scots, Gaelic, or any other language with the agreement of the Presiding Officer.

**paired_fixed: PASS**

[1] Speeches to the chamber are normally delivered in English, but members may use Scots, Gaelic, or any other language with the agreement of the Presiding Officer.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Speeches to the chamber are normally delivered in English, but members may use Scots, Gaelic, or any other language with the agreement of the Presiding Officer.

**paired_section: PASS**

[1] Speeches to the chamber are normally delivered in English, but members may use Scots, Gaelic, or any other language with the agreement of the Presiding Officer.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Speeches to the chamber are normally delivered in English, but members may use Scots, Gaelic, or any other language with the agreement of the Presiding Officer.

## F17

What members typically open debates?

**baseline: PASS**

[1] Typically, ministers or party leaders open debates, with opening speakers

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Typically, ministers or party leaders open debates, with opening speakers

**fixed: PASS**

[1] Typically, ministers or party leaders open debates, with opening speakers given between 5 and 20 minutes, and succeeding speakers allocated less time.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Typically, ministers or party leaders open debates, with opening speakers given between 5 and 20 minutes, and succeeding speakers allocated less time.

**section: PASS**

[1] Typically, ministers or party leaders open debates, with opening speakers given between 5 and 20 minutes, and succeeding speakers allocated less time.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Typically, ministers or party leaders open debates, with opening speakers given between 5 and 20 minutes, and succeeding speakers allocated less time.

**paired_fixed: PASS**

[1] Typically, ministers or party leaders open debates, with opening speakers given between 5 and 20 minutes, and succeeding speakers allocated less time.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Typically, ministers or party leaders open debates, with opening speakers given between 5 and 20 minutes, and succeeding speakers allocated less time.

**paired_section: PASS**

[1] Typically, ministers or party leaders open debates, with opening speakers given between 5 and 20 minutes, and succeeding speakers allocated less time.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Typically, ministers or party leaders open debates, with opening speakers given between 5 and 20 minutes, and succeeding speakers allocated less time.

## F18

What does the Presiding Officer try to achieve a balance of between speakers?

**baseline: PASS**

[1] Normally, the Presiding Officer tries to achieve a balance between different viewpoints and political parties when selecting members to speak.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Normally, the Presiding Officer tries to achieve a balance between different viewpoints and political parties when selecting members to speak.

**fixed: PASS**

[1] Normally, the Presiding Officer tries to achieve a balance between different viewpoints and political parties when selecting members to speak.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Normally, the Presiding Officer tries to achieve a balance between different viewpoints and political parties when selecting members to speak.

**section: PASS**

[1] Normally, the Presiding Officer tries to achieve a balance between different viewpoints and political parties when selecting members to speak.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Normally, the Presiding Officer tries to achieve a balance between different viewpoints and political parties when selecting members to speak.

**paired_fixed: PASS**

[1] Normally, the Presiding Officer tries to achieve a balance between different viewpoints and political parties when selecting members to speak.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Normally, the Presiding Officer tries to achieve a balance between different viewpoints and political parties when selecting members to speak.

**paired_section: PASS**

[1] Normally, the Presiding Officer tries to achieve a balance between different viewpoints and political parties when selecting members to speak.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Normally, the Presiding Officer tries to achieve a balance between different viewpoints and political parties when selecting members to speak.

## F19

What ended Turkish imperial Ambitions?

**baseline: PASS**

[1] The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

**fixed: PASS**

[1] Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

**section: PASS**

[1] Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

**paired_fixed: PASS**

[1] Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

**paired_section: PASS**

[1] Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

## F20

Which country today is a remnant of the Ottoman empire?

**baseline: FAIL**

[1] With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries.

{
  "required_gold_groups": [
    [
      "Turkey",
      "Turkey",
      "Turkey",
      "Turkey",
      "Turkey"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

{
  "required_gold_groups": [
    [
      "Turkey",
      "Turkey",
      "Turkey",
      "Turkey",
      "Turkey"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

{
  "required_gold_groups": [
    [
      "Turkey",
      "Turkey",
      "Turkey",
      "Turkey",
      "Turkey"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

{
  "required_gold_groups": [
    [
      "Turkey",
      "Turkey",
      "Turkey",
      "Turkey",
      "Turkey"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

{
  "required_gold_groups": [
    [
      "Turkey",
      "Turkey",
      "Turkey",
      "Turkey",
      "Turkey"
    ]
  ],
  "matched": [
    false
  ]
}

## F21

Who did the Ottoman empire ally with in WW I?

**baseline: FAIL**

[1] With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries.

{
  "required_gold_groups": [
    [
      "Germany",
      "Germany",
      "Germany",
      "Germany",
      "Germany"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

{
  "required_gold_groups": [
    [
      "Germany",
      "Germany",
      "Germany",
      "Germany",
      "Germany"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

{
  "required_gold_groups": [
    [
      "Germany",
      "Germany",
      "Germany",
      "Germany",
      "Germany"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

{
  "required_gold_groups": [
    [
      "Germany",
      "Germany",
      "Germany",
      "Germany",
      "Germany"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

{
  "required_gold_groups": [
    [
      "Germany",
      "Germany",
      "Germany",
      "Germany",
      "Germany"
    ]
  ],
  "matched": [
    false
  ]
}

## F22

What was thought to decide a person's behavior?

**baseline: FAIL**

I can't find this in the provided documents.

{
  "required_gold_groups": [
    [
      "the environment in which they lived",
      "environment in which they lived",
      "environment",
      "the environment in which they lived",
      "environment"
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
      "the environment in which they lived",
      "environment in which they lived",
      "environment",
      "the environment in which they lived",
      "environment"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

I can't find this in the provided documents.

{
  "required_gold_groups": [
    [
      "the environment in which they lived",
      "environment in which they lived",
      "environment",
      "the environment in which they lived",
      "environment"
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
      "the environment in which they lived",
      "environment in which they lived",
      "environment",
      "the environment in which they lived",
      "environment"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

I can't find this in the provided documents.

{
  "required_gold_groups": [
    [
      "the environment in which they lived",
      "environment in which they lived",
      "environment",
      "the environment in which they lived",
      "environment"
    ]
  ],
  "matched": [
    false
  ]
}

## F23

What served as a justification for imposing imperialistic policies on certain peoples or regions?

**baseline: FAIL**

[1] ## Context 2
The concept environmental determinism served as a moral justification for domination of certain territories and peoples.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Context 2
> The concept environmental determinism served as a moral justification for domination of certain territories and peoples.

{
  "required_gold_groups": [
    [
      "environmental determinism",
      "environmental determinism",
      "environmental determinism",
      "environmental determinism",
      "environmental determinism"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

**section: PASS**

[1] The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

**paired_fixed: PASS**

[1] The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

**paired_section: PASS**

[1] The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

## F24

What were the two forms of environmental determinism?

**baseline: FAIL**

[1] The concept environmental determinism served as a moral justification for domination of certain territories and peoples.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The concept environmental determinism served as a moral justification for domination of certain territories and peoples.

{
  "required_gold_groups": [
    [
      "orientalism and tropicality",
      "orientalism and tropicality",
      "orientalism and tropicality",
      "orientalism and tropicality",
      "orientalism and tropicality."
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

{
  "required_gold_groups": [
    [
      "orientalism and tropicality",
      "orientalism and tropicality",
      "orientalism and tropicality",
      "orientalism and tropicality",
      "orientalism and tropicality."
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

{
  "required_gold_groups": [
    [
      "orientalism and tropicality",
      "orientalism and tropicality",
      "orientalism and tropicality",
      "orientalism and tropicality",
      "orientalism and tropicality."
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

{
  "required_gold_groups": [
    [
      "orientalism and tropicality",
      "orientalism and tropicality",
      "orientalism and tropicality",
      "orientalism and tropicality",
      "orientalism and tropicality."
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The concept environmental determinism served as a moral justification for domination of certain territories and peoples. It was believed that a certain person's behaviours were determined by the environment in which they lived and thus validated their domination. For example, people living in tropical environments were seen as "less civilized" therefore justifying colonial control as a civilizing mission.

{
  "required_gold_groups": [
    [
      "orientalism and tropicality",
      "orientalism and tropicality",
      "orientalism and tropicality",
      "orientalism and tropicality",
      "orientalism and tropicality."
    ]
  ],
  "matched": [
    false
  ]
}

## C01

What is the UN's climate change treaty? Also, What does the UN want to stabilize?

**baseline: PARTIAL**

[1] The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change.

{
  "required_gold_groups": [
    [
      "United Nations Framework Convention on Climate Change",
      "United Nations Framework Convention on Climate Change (UNFCCC)",
      "the United Nations Framework Convention on Climate Change (UNFCCC),"
    ],
    [
      "greenhouse gas concentrations in the atmosphere",
      "greenhouse gas concentrations in the atmosphere",
      "stabilize greenhouse gas concentrations in the atmosphere"
    ]
  ],
  "matched": [
    true,
    false
  ]
}

**fixed: PASS**

[1] The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

**section: PASS**

[1] The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

**paired_fixed: PASS**

[1] The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

**paired_section: PASS**

[1] The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The IPCC produces reports that support the United Nations Framework Convention on Climate Change (UNFCCC), which is the main international treaty on climate change. The ultimate objective of the UNFCCC is to "stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic [i.e., human-induced] interference with the climate system". IPCC reports cover "the scientific, technical and socio-economic information relevant to understanding the scientific basis of risk of human-induced climate change, its potential impacts and options for adaptation and mitigation."

## C02

What does political pressure push to extend to compensate for stagnating purchasing power? Also, What has given the American economy a tendency to go "from bubble to bubble"?

**baseline: PASS**

[1] To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low.

**fixed: PASS**

[1] To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

**section: PASS**

[1] To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

**paired_fixed: PASS**

[1] To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

**paired_section: PASS**

[1] To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> To compensate for stagnating and declining purchasing power, political pressure has developed to extend easier credit to the lower and middle income earners – particularly to buy homes – and easier credit in general to keep unemployment rates low. This has given the American economy a tendency to go "from bubble to bubble" fueled by unsustainable monetary stimulation.

## C03

What is set aside for question periods in the debating chamber? Also, What may members question the First Minister about directly during First Minister's Question Time?

**baseline: FAIL**

[1] # Scottish Parliament

## Context 1
Parliamentary time is also set aside for question periods in the debating chamber.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Scottish Parliament
> 
> ## Context 1
> Parliamentary time is also set aside for question periods in the debating chamber.

{
  "required_gold_groups": [
    [
      "Parliamentary time",
      "Parliamentary time",
      "Parliamentary time"
    ],
    [
      "issues under their jurisdiction",
      "issues under their jurisdiction",
      "the First Minister"
    ]
  ],
  "matched": [
    false,
    false
  ]
}

**fixed: PASS**

[1] Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

[2] This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

**section: PASS**

[1] Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

[2] This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

**paired_fixed: PASS**

[1] Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

[2] This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

**paired_section: PASS**

[1] Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

[2] This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Parliamentary time is also set aside for question periods in the debating chamber. A "General Question Time" takes place on a Thursday between 11:40 a.m. and 12 p.m. where members can direct questions to any member of the Scottish Government. At 2.30pm, a 40-minute long themed "Question Time" takes place, where members can ask questions of ministers in departments that are selected for questioning that sitting day, such as health and justice or education and transport.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> This gives members an opportunity to question the First Minister directly on issues under their jurisdiction. Opposition leaders ask a general question of the First Minister and then supplementary questions. Such a practice enables a "lead-in" to the questioner, who then uses their supplementary question to ask the First Minister any issue.

## C04

What ended Turkish imperial Ambitions? Also, Which country today is a remnant of the Ottoman empire?

**baseline: PASS**

[1] The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

**fixed: PASS**

[1] Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

[2] With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

**section: PASS**

[1] Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

[2] With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

**paired_fixed: PASS**

[1] Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

[2] With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

**paired_section: PASS**

[1] Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

[2] With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century. The empire allied with Germany in the early 20th century, with the imperial ambition of recovering its lost territories, but it dissolved in the aftermath of World War I, leading to the emergence of the new state of Turkey in the Ottoman Anatolian heartland, as well as the creation of modern Balkan and Middle Eastern states, thus ending Turkish colonial ambitions.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> With Istanbul as its capital and control of lands around the Mediterranean basin, the Ottoman Empire was at the center of interactions between the Eastern and Western worlds for six centuries. Following a long period of military setbacks against European powers, the Ottoman Empire gradually declined into the late nineteenth century.

## U01

What is the exact database password used by Intergovernmental Panel on Climate Change?

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

What is the bank account number associated with Economic inequality?

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

What is the date of birth of the fictional coordinator Neris Quill for Scottish Parliament?

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

What is the current Bitcoin price in AED in the Imperialism documents?

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

## A01

Who approves suborbital beacon charters at the fictional Orvella Depot?

**baseline: FAIL**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: PASS**

I can't find this in the provided documents.

**section: PASS**

I can't find this in the provided documents.

**paired_fixed: PASS**

I can't find this in the provided documents.

**paired_section: PASS**

I can't find this in the provided documents.

## A02

Who has authority to approve standard cargo schedules at the fictional Ulvera Base?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: PASS**

I can't find this in the provided documents.

**section: PASS**

I can't find this in the provided documents.

**paired_fixed: PASS**

I can't find this in the provided documents.

**paired_section: PASS**

I can't find this in the provided documents.

## A03

Who approves plasma telescope permissions at the fictional Tiravel Library?

**baseline: FAIL**

[1] At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: PASS**

I can't find this in the provided documents.

**section: PASS**

I can't find this in the provided documents.

**paired_fixed: PASS**

I can't find this in the provided documents.

**paired_section: PASS**

I can't find this in the provided documents.

## A04

Who has authority to approve standard shelf indexes at the fictional Dovarin Spire?

**baseline: FAIL**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules.

[2] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards.

[3] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: PASS**

I can't find this in the provided documents.

**section: PASS**

I can't find this in the provided documents.

**paired_fixed: PASS**

I can't find this in the provided documents.

**paired_section: PASS**

I can't find this in the provided documents.

## A05

Who approves asteroid docking warrants at the fictional Calorin Pier?

**baseline: FAIL**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: PASS**

I can't find this in the provided documents.

**section: PASS**

I can't find this in the provided documents.

**paired_fixed: PASS**

I can't find this in the provided documents.

**paired_section: PASS**

I can't find this in the provided documents.

## A06

Who has authority to approve standard vessel rosters at the fictional Serolan Vault?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: PASS**

I can't find this in the provided documents.

**section: PASS**

I can't find this in the provided documents.

**paired_fixed: PASS**

I can't find this in the provided documents.

**paired_section: PASS**

I can't find this in the provided documents.

## A07

Who approves fusion capsule clearances at the fictional Fenora Gallery?

**baseline: FAIL**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: PASS**

I can't find this in the provided documents.

**section: PASS**

I can't find this in the provided documents.

**paired_fixed: PASS**

I can't find this in the provided documents.

**paired_section: PASS**

I can't find this in the provided documents.

## A08

Who has authority to approve standard display cards at the fictional Naviren Lab?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: PASS**

I can't find this in the provided documents.

**section: PASS**

I can't find this in the provided documents.

**paired_fixed: PASS**

I can't find this in the provided documents.

**paired_section: PASS**

I can't find this in the provided documents.

## P01

Who approves standard cargo schedules at the fictional Orvella Depot?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules.

{
  "required_gold_groups": [
    [
      "Freight Registrar"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

## P02

Who has authority to approve standard cargo schedules at Orvella Depot?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules.

{
  "required_gold_groups": [
    [
      "Freight Registrar"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_Intergovernmental_Panel_on_Climate_Change.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

## P03

Who approves standard shelf indexes at the fictional Tiravel Library?

**baseline: FAIL**

[1] Among comments in academic literature on the relationship between homicides and inequality are:

## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> Among comments in academic literature on the relationship between homicides and inequality are:
> 
> ## Fictional approval appendix
> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes.

{
  "required_gold_groups": [
    [
      "Reference Steward"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] Among comments in academic literature on the relationship between homicides and inequality are:

## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> Among comments in academic literature on the relationship between homicides and inequality are:
> 
> ## Fictional approval appendix
> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

{
  "required_gold_groups": [
    [
      "Reference Steward"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] Among comments in academic literature on the relationship between homicides and inequality are:

## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> Among comments in academic literature on the relationship between homicides and inequality are:
> 
> ## Fictional approval appendix
> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

{
  "required_gold_groups": [
    [
      "Reference Steward"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] Among comments in academic literature on the relationship between homicides and inequality are:

## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> Among comments in academic literature on the relationship between homicides and inequality are:
> 
> ## Fictional approval appendix
> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

{
  "required_gold_groups": [
    [
      "Reference Steward"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] Among comments in academic literature on the relationship between homicides and inequality are:

## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> Among comments in academic literature on the relationship between homicides and inequality are:
> 
> ## Fictional approval appendix
> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

{
  "required_gold_groups": [
    [
      "Reference Steward"
    ]
  ],
  "matched": [
    false
  ]
}

## P04

Who has authority to approve standard shelf indexes at Tiravel Library?

**baseline: FAIL**

[1] Among comments in academic literature on the relationship between homicides and inequality are:

## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> Among comments in academic literature on the relationship between homicides and inequality are:
> 
> ## Fictional approval appendix
> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes.

{
  "required_gold_groups": [
    [
      "Reference Steward"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] Among comments in academic literature on the relationship between homicides and inequality are:

## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> Among comments in academic literature on the relationship between homicides and inequality are:
> 
> ## Fictional approval appendix
> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

{
  "required_gold_groups": [
    [
      "Reference Steward"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] Among comments in academic literature on the relationship between homicides and inequality are:

## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> Among comments in academic literature on the relationship between homicides and inequality are:
> 
> ## Fictional approval appendix
> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

{
  "required_gold_groups": [
    [
      "Reference Steward"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] Among comments in academic literature on the relationship between homicides and inequality are:

## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> Among comments in academic literature on the relationship between homicides and inequality are:
> 
> ## Fictional approval appendix
> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

{
  "required_gold_groups": [
    [
      "Reference Steward"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] Among comments in academic literature on the relationship between homicides and inequality are:

## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

Source: 02_Economic_inequality.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> Among comments in academic literature on the relationship between homicides and inequality are:
> 
> ## Fictional approval appendix
> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library.

{
  "required_gold_groups": [
    [
      "Reference Steward"
    ]
  ],
  "matched": [
    false
  ]
}

## P05

Who approves standard vessel rosters at the fictional Calorin Pier?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters.

{
  "required_gold_groups": [
    [
      "Berth Recorder"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

## P06

Who has authority to approve standard vessel rosters at Calorin Pier?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters.

{
  "required_gold_groups": [
    [
      "Berth Recorder"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_Scottish_Parliament.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

## P07

Who approves standard display cards at the fictional Fenora Gallery?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards.

{
  "required_gold_groups": [
    [
      "Display Custodian"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

## P08

Who has authority to approve standard display cards at Fenora Gallery?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards.

{
  "required_gold_groups": [
    [
      "Display Custodian"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Imperialism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.
