# V17 prospective Confirmation48 — actual MiniLM

24 original externally authored supported questions; four constructed compound controls; four standard and eight actor/object/site unsupported controls and eight supported actor controls. Frozen before answers. Not sealed independent accuracy, official SQuAD scoring or representative accuracy; prior public/model exposure cannot be excluded. Gold-paragraph precision is a location proxy, not semantic support. Same-session v16/v17 use identical real vectors. Production remains r44; a gate PASS permits review only.

{
  "summary": {
    "baseline": {
      "PASS": 19,
      "PARTIAL": 3,
      "FAIL": 26,
      "citations": 44,
      "valid_provenance": 44,
      "gold_paragraph_citations": 25,
      "direct_gold_span_citations": 18,
      "false_acceptances": 8,
      "false_refusals": 0,
      "uncited_refusals": 4
    },
    "fixed": {
      "PASS": 45,
      "PARTIAL": 0,
      "FAIL": 3,
      "citations": 37,
      "valid_provenance": 37,
      "gold_paragraph_citations": 37,
      "direct_gold_span_citations": 34,
      "false_acceptances": 0,
      "false_refusals": 0,
      "uncited_refusals": 12
    },
    "section": {
      "PASS": 44,
      "PARTIAL": 0,
      "FAIL": 4,
      "citations": 38,
      "valid_provenance": 38,
      "gold_paragraph_citations": 38,
      "direct_gold_span_citations": 33,
      "false_acceptances": 0,
      "false_refusals": 0,
      "uncited_refusals": 12
    },
    "paired_fixed": {
      "PASS": 45,
      "PARTIAL": 0,
      "FAIL": 3,
      "citations": 37,
      "valid_provenance": 37,
      "gold_paragraph_citations": 37,
      "direct_gold_span_citations": 34,
      "false_acceptances": 0,
      "false_refusals": 0,
      "uncited_refusals": 12
    },
    "paired_section": {
      "PASS": 44,
      "PARTIAL": 0,
      "FAIL": 4,
      "citations": 38,
      "valid_provenance": 38,
      "gold_paragraph_citations": 38,
      "direct_gold_span_citations": 33,
      "false_acceptances": 0,
      "false_refusals": 0,
      "uncited_refusals": 12
    }
  },
  "categories": {
    "externally_authored_supported": {
      "baseline": {
        "PASS": 14,
        "PARTIAL": 0,
        "FAIL": 10,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 21,
        "direct_gold_span_citations": 14,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "fixed": {
        "PASS": 21,
        "PARTIAL": 0,
        "FAIL": 3,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 24,
        "direct_gold_span_citations": 21,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "section": {
        "PASS": 20,
        "PARTIAL": 0,
        "FAIL": 4,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 24,
        "direct_gold_span_citations": 20,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_fixed": {
        "PASS": 21,
        "PARTIAL": 0,
        "FAIL": 3,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 24,
        "direct_gold_span_citations": 21,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_section": {
        "PASS": 20,
        "PARTIAL": 0,
        "FAIL": 4,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 24,
        "direct_gold_span_citations": 20,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      }
    },
    "constructed_compound": {
      "baseline": {
        "PASS": 1,
        "PARTIAL": 3,
        "FAIL": 0,
        "citations": 4,
        "valid_provenance": 4,
        "gold_paragraph_citations": 4,
        "direct_gold_span_citations": 4,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "fixed": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 5,
        "valid_provenance": 5,
        "gold_paragraph_citations": 5,
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
        "citations": 5,
        "valid_provenance": 5,
        "gold_paragraph_citations": 5,
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
        "citations": 8,
        "valid_provenance": 8,
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
        "PASS": 8,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 8,
        "direct_gold_span_citations": 8,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "section": {
        "PASS": 8,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 8,
        "direct_gold_span_citations": 8,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_fixed": {
        "PASS": 8,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 8,
        "direct_gold_span_citations": 8,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_section": {
        "PASS": 8,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 8,
        "direct_gold_span_citations": 8,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      }
    }
  },
  "checks": {
    "development_gate_passed": true,
    "fixed_supported_at_least_21": true,
    "fixed_supported_actor_all_pass": true,
    "fixed_compounds_all_pass": true,
    "fixed_unsupported_all_pass": true,
    "fixed_provenance_intact": true,
    "fixed_no_false_acceptance_or_refusal": true,
    "fixed_no_production_or_prior_section_pass_loss": true,
    "section_supported_at_least_21": false,
    "section_supported_actor_all_pass": true,
    "section_compounds_all_pass": true,
    "section_unsupported_all_pass": true,
    "section_provenance_intact": true,
    "section_no_false_acceptance_or_refusal": true,
    "section_no_production_or_prior_section_pass_loss": true
  },
  "gate": "FAIL",
  "regressions": {
    "fixed": [],
    "section": []
  }
}

## F01

What is another name for the Yosemite Freeway?

**baseline: PASS**

[1] State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite.

**fixed: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

**section: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

**paired_fixed: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

**paired_section: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

## F02

State Route 180 comes from which direction via Mendota?

**baseline: PASS**

[1] State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

**fixed: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

**section: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

**paired_fixed: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

**paired_section: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

## F03

What route connects Fresno with the California Central Valley?

**baseline: FAIL**

[1] # Fresno, California

## Context 1
Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Fresno, California
> 
> ## Context 1
> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley.

{
  "required_gold_groups": [
    [
      "State Route 99",
      "State Route 99",
      "State Route 99"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

**section: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

**paired_fixed: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

**paired_section: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

## F04

In what town did Bill Aiken grow up?

**baseline: PASS**

[1] Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child.

**fixed: PASS**

[1] In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

**section: PASS**

[1] In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

**paired_fixed: PASS**

[1] In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

**paired_section: PASS**

[1] In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

## F05

Who was Bill Aiken's adopted mother?

**baseline: FAIL**

[1] In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia.

{
  "required_gold_groups": [
    [
      "Lupe Mayorga",
      "Lupe Mayorga",
      "Lupe Mayorga"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

**section: PASS**

[1] In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

**paired_fixed: PASS**

[1] In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

**paired_section: PASS**

[1] In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

## F06

Who recorded "Walking in Fresno?"

**baseline: PASS**

[1] In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio

**fixed: PASS**

[1] In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

**section: PASS**

[1] In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

**paired_fixed: PASS**

[1] In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

**paired_section: PASS**

[1] In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the 1970s, the city was the subject of a song, "Walking Into Fresno", written by Hall Of Fame guitarist Bill Aken and recorded by Bob Gallion of the world-famous "WWVA Jamboree" radio and television show in Wheeling, West Virginia. Aken, adopted by Mexican movie actress Lupe Mayorga, grew up in the neighboring town of Madera and his song chronicled the hardships faced by the migrant farm workers he saw as a child. Aken also made his first TV appearance playing guitar on the old country-western show at The Fresno Barn.

## F07

Since NASA didn't know how many attempts each test would end up requiring, what did they use instead of numbers for the trials?

**baseline: PASS**

[1] Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

**fixed: PASS**

[1] Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

**section: PASS**

[1] Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

**paired_fixed: PASS**

[1] Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

**paired_section: PASS**

[1] Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

## F08

What had to happen to each mission before they would continue on to the next mission?

**baseline: PASS**

[1] Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

**fixed: PASS**

[1] Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

**section: PASS**

[1] Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

**paired_fixed: PASS**

[1] Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

**paired_section: PASS**

[1] Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

## F09

What type of missions were approved by Mueller after the incident?

**baseline: FAIL**

[1] # Apollo program

## Context 1
In September 1967, Mueller approved a sequence of mission types which had to be successfully accomplished in order to achieve the manned lunar landing.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Apollo program
> 
> ## Context 1
> In September 1967, Mueller approved a sequence of mission types which had to be successfully accomplished in order to achieve the manned lunar landing.

{
  "required_gold_groups": [
    [
      "sequence",
      "manned lunar landing.",
      "had to be successfully accomplished",
      "sequence of mission types",
      "sequence"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] In September 1967, Mueller approved a sequence of mission types which had to be successfully accomplished in order to achieve the manned lunar landing.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In September 1967, Mueller approved a sequence of mission types which had to be successfully accomplished in order to achieve the manned lunar landing.

**section: PASS**

[1] In September 1967, Mueller approved a sequence of mission types which had to be successfully accomplished in order to achieve the manned lunar landing.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In September 1967, Mueller approved a sequence of mission types which had to be successfully accomplished in order to achieve the manned lunar landing.

**paired_fixed: PASS**

[1] In September 1967, Mueller approved a sequence of mission types which had to be successfully accomplished in order to achieve the manned lunar landing.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In September 1967, Mueller approved a sequence of mission types which had to be successfully accomplished in order to achieve the manned lunar landing.

**paired_section: PASS**

[1] In September 1967, Mueller approved a sequence of mission types which had to be successfully accomplished in order to achieve the manned lunar landing.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In September 1967, Mueller approved a sequence of mission types which had to be successfully accomplished in order to achieve the manned lunar landing.

## F10

Where was the Manned Spacecraft Center located?

**baseline: FAIL**

[1] So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC).

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC).

{
  "required_gold_groups": [
    [
      "Houston, Texas",
      "Houston",
      "Houston, Texas",
      "Houston, Texas",
      "Houston"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

**section: PASS**

[1] So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

**paired_fixed: PASS**

[1] So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

**paired_section: PASS**

[1] So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

## F11

Who originally led the Space Task Group?

**baseline: FAIL**

[1] Gilruth's Space Task Group, which had been directing the nation's manned space program from NASA's Langley Research Center.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Gilruth's Space Task Group, which had been directing the nation's manned space program from NASA's Langley Research Center.

{
  "required_gold_groups": [
    [
      "Robert R. Gilruth",
      "Robert R. Gilruth's",
      "Robert R. Gilruth's",
      "Robert R. Gilruth",
      "Robert R. Gilruth"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] Gilruth's Space Task Group, which had been directing the nation's manned space program from NASA's Langley Research Center. So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Gilruth's Space Task Group, which had been directing the nation's manned space program from NASA's Langley Research Center. So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961.

{
  "required_gold_groups": [
    [
      "Robert R. Gilruth",
      "Robert R. Gilruth's",
      "Robert R. Gilruth's",
      "Robert R. Gilruth",
      "Robert R. Gilruth"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] Gilruth's Space Task Group, which had been directing the nation's manned space program from NASA's Langley Research Center. So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Gilruth's Space Task Group, which had been directing the nation's manned space program from NASA's Langley Research Center. So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961.

{
  "required_gold_groups": [
    [
      "Robert R. Gilruth",
      "Robert R. Gilruth's",
      "Robert R. Gilruth's",
      "Robert R. Gilruth",
      "Robert R. Gilruth"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] Gilruth's Space Task Group, which had been directing the nation's manned space program from NASA's Langley Research Center. So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Gilruth's Space Task Group, which had been directing the nation's manned space program from NASA's Langley Research Center. So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961.

{
  "required_gold_groups": [
    [
      "Robert R. Gilruth",
      "Robert R. Gilruth's",
      "Robert R. Gilruth's",
      "Robert R. Gilruth",
      "Robert R. Gilruth"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] Gilruth's Space Task Group, which had been directing the nation's manned space program from NASA's Langley Research Center. So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Gilruth's Space Task Group, which had been directing the nation's manned space program from NASA's Langley Research Center. So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961.

{
  "required_gold_groups": [
    [
      "Robert R. Gilruth",
      "Robert R. Gilruth's",
      "Robert R. Gilruth's",
      "Robert R. Gilruth",
      "Robert R. Gilruth"
    ]
  ],
  "matched": [
    false
  ]
}

## F12

What university donated the land for the Manned Spacecraft Center?

**baseline: FAIL**

[1] So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC).

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC).

{
  "required_gold_groups": [
    [
      "Rice University",
      "Rice",
      "Rice University",
      "Rice University"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

**section: PASS**

[1] So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

**paired_fixed: PASS**

[1] So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

**paired_section: PASS**

[1] So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> So Gilruth was given authority to grow his organization into a new NASA center, the Manned Spacecraft Center (MSC). A site was chosen in Houston, Texas, on land donated by Rice University, and Administrator Webb announced the conversion on September 19, 1961. It was also clear NASA would soon outgrow its practice of controlling missions from its Cape Canaveral Air Force Station launch facilities in Florida, so a new Mission Control Center would be included in the MSC.

## F13

Which genus lack tentacles and sheaths?

**baseline: PASS**

[1] In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

**fixed: PASS**

[1] In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

**section: PASS**

[1] In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

**paired_fixed: PASS**

[1] In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

**paired_section: PASS**

[1] In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

## F14

Where do juvenile platyctenids live?

**baseline: PASS**

[1] In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

**fixed: PASS**

[1] In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

**section: PASS**

[1] In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

**paired_fixed: PASS**

[1] In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

**paired_section: PASS**

[1] In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

## F15

Juvenile and adult  beroe lack what?

**baseline: PASS**

[1] In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

**fixed: PASS**

[1] In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

**section: PASS**

[1] In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

**paired_fixed: PASS**

[1] In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

**paired_section: PASS**

[1] In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

## F16

What does the 9 +3 pattern of cilia thought to do?

**baseline: PASS**

[1] Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function.

**fixed: PASS**

[1] Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish.

**section: PASS**

[1] Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish.

**paired_fixed: PASS**

[1] Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish.

**paired_section: PASS**

[1] Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish.

## F17

What direction do ctenophore swim?

**baseline: PASS**

[1] Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish.

**fixed: PASS**

[1] These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish. When trying to escape predators, one species can accelerate to six times its normal speed; some other species reverse direction as part of their escape behavior, by reversing the power stroke of the comb plate cilia.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish. When trying to escape predators, one species can accelerate to six times its normal speed; some other species reverse direction as part of their escape behavior, by reversing the power stroke of the comb plate cilia.

**section: PASS**

[1] These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish. When trying to escape predators, one species can accelerate to six times its normal speed; some other species reverse direction as part of their escape behavior, by reversing the power stroke of the comb plate cilia.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish. When trying to escape predators, one species can accelerate to six times its normal speed; some other species reverse direction as part of their escape behavior, by reversing the power stroke of the comb plate cilia.

**paired_fixed: PASS**

[1] These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish. When trying to escape predators, one species can accelerate to six times its normal speed; some other species reverse direction as part of their escape behavior, by reversing the power stroke of the comb plate cilia.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish. When trying to escape predators, one species can accelerate to six times its normal speed; some other species reverse direction as part of their escape behavior, by reversing the power stroke of the comb plate cilia.

**paired_section: PASS**

[1] These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish. When trying to escape predators, one species can accelerate to six times its normal speed; some other species reverse direction as part of their escape behavior, by reversing the power stroke of the comb plate cilia.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction. Hence ctenophores usually swim in the direction in which the mouth is pointing, unlike jellyfish. When trying to escape predators, one species can accelerate to six times its normal speed; some other species reverse direction as part of their escape behavior, by reversing the power stroke of the comb plate cilia.

## F18

Cilia can g ow up too what length?

**baseline: PASS**

[1] The "combs" (also called "ctenes" or "comb plates") run across each row, and each consists of thousands of unusually long cilia, up to 2 millimeters (0.079 in).

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The "combs" (also called "ctenes" or "comb plates") run across each row, and each consists of thousands of unusually long cilia, up to 2 millimeters (0.079 in).

**fixed: PASS**

[1] The "combs" (also called "ctenes" or "comb plates") run across each row, and each consists of thousands of unusually long cilia, up to 2 millimeters (0.079 in). Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The "combs" (also called "ctenes" or "comb plates") run across each row, and each consists of thousands of unusually long cilia, up to 2 millimeters (0.079 in). Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction.

**section: PASS**

[1] The "combs" (also called "ctenes" or "comb plates") run across each row, and each consists of thousands of unusually long cilia, up to 2 millimeters (0.079 in). Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The "combs" (also called "ctenes" or "comb plates") run across each row, and each consists of thousands of unusually long cilia, up to 2 millimeters (0.079 in). Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction.

**paired_fixed: PASS**

[1] The "combs" (also called "ctenes" or "comb plates") run across each row, and each consists of thousands of unusually long cilia, up to 2 millimeters (0.079 in). Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The "combs" (also called "ctenes" or "comb plates") run across each row, and each consists of thousands of unusually long cilia, up to 2 millimeters (0.079 in). Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction.

**paired_section: PASS**

[1] The "combs" (also called "ctenes" or "comb plates") run across each row, and each consists of thousands of unusually long cilia, up to 2 millimeters (0.079 in). Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The "combs" (also called "ctenes" or "comb plates") run across each row, and each consists of thousands of unusually long cilia, up to 2 millimeters (0.079 in). Unlike conventional cilia and flagella, which has a filament structure arranged in a 9 + 2 pattern, these cilia are arranged in a 9 + 3 pattern, where the extra compact filament is suspected to have a supporting function. These normally beat so that the propulsion stroke is away from the mouth, although they can also reverse direction.

## F19

What sport attracts most tourists to Jacksonville?

**baseline: FAIL**

[1] # Jacksonville, Florida

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Jacksonville, Florida

{
  "required_gold_groups": [
    [
      "golf",
      "golf",
      "golf"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

**section: FAIL**

[1] Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

{
  "required_gold_groups": [
    [
      "golf",
      "golf",
      "golf"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: PASS**

[1] Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

**paired_section: FAIL**

[1] Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

{
  "required_gold_groups": [
    [
      "golf",
      "golf",
      "golf"
    ]
  ],
  "matched": [
    false
  ]
}

## F20

What are those from Jacksonville sometimes called?

**baseline: PASS**

[1] People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled

**fixed: PASS**

[1] Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

**section: PASS**

[1] Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

**paired_fixed: PASS**

[1] Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

**paired_section: PASS**

[1] Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

## F21

What is the ranking of the military forces in Jacksonville?

**baseline: FAIL**

[1] Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port.

{
  "required_gold_groups": [
    [
      "third largest",
      "third largest military presence",
      "third largest"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

**section: PASS**

[1] Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

**paired_fixed: PASS**

[1] Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

**paired_section: PASS**

[1] Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

## F22

In the wake of the Jacksonville fire, what did the Florida Governor do?

**baseline: FAIL**

[1] On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire.

{
  "required_gold_groups": [
    [
      "declare martial law",
      "declare martial law",
      "declare martial law and sent the state militia to maintain order"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

{
  "required_gold_groups": [
    [
      "declare martial law",
      "declare martial law",
      "declare martial law and sent the state militia to maintain order"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

{
  "required_gold_groups": [
    [
      "declare martial law",
      "declare martial law",
      "declare martial law and sent the state militia to maintain order"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

{
  "required_gold_groups": [
    [
      "declare martial law",
      "declare martial law",
      "declare martial law and sent the state militia to maintain order"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

{
  "required_gold_groups": [
    [
      "declare martial law",
      "declare martial law",
      "declare martial law and sent the state militia to maintain order"
    ]
  ],
  "matched": [
    false
  ]
}

## F23

What caused the spread of the Jacksonville fire in 1901?

**baseline: PASS**

[1] On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire.

**fixed: PASS**

[1] On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

**section: PASS**

[1] On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

**paired_fixed: PASS**

[1] On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

**paired_section: PASS**

[1] On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

## F24

What was the Jacksonville fire later known as?

**baseline: FAIL**

[1] On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire.

{
  "required_gold_groups": [
    [
      "Great Fire of 1901",
      "Great Fire of 1901",
      "Great Fire of 1901"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

{
  "required_gold_groups": [
    [
      "Great Fire of 1901",
      "Great Fire of 1901",
      "Great Fire of 1901"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

{
  "required_gold_groups": [
    [
      "Great Fire of 1901",
      "Great Fire of 1901",
      "Great Fire of 1901"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

{
  "required_gold_groups": [
    [
      "Great Fire of 1901",
      "Great Fire of 1901",
      "Great Fire of 1901"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> On May 3, 1901, downtown Jacksonville was ravaged by a fire that started as a kitchen fire. Spanish moss at a nearby mattress factory was quickly engulfed in flames and enabling the fire to spread rapidly. In just eight hours, it swept through 146 city blocks, destroyed over 2,000 buildings, left about 10,000 homeless and killed 7 residents.

{
  "required_gold_groups": [
    [
      "Great Fire of 1901",
      "Great Fire of 1901",
      "Great Fire of 1901"
    ]
  ],
  "matched": [
    false
  ]
}

## C01

What is another name for the Yosemite Freeway? Also, State Route 180 comes from which direction via Mendota?

**baseline: PARTIAL**

[1] State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

{
  "required_gold_groups": [
    [
      "State Route 41",
      "State Route 41"
    ],
    [
      "west",
      "west",
      "west"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**fixed: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

**section: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

**paired_fixed: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

**paired_section: PASS**

[1] Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Fresno is served by State Route 99, the main north/south freeway that connects the major population centers of the California Central Valley. State Route 168, the Sierra Freeway, heads east to the city of Clovis and Huntington Lake. State Route 41 (Yosemite Freeway/Eisenhower Freeway) comes into Fresno from Atascadero in the south, and then heads north to Yosemite. State Route 180 (Kings Canyon Freeway) comes from the west via Mendota, and from the east in Kings Canyon National Park going towards the city of Reedley.

## C02

Since NASA didn't know how many attempts each test would end up requiring, what did they use instead of numbers for the trials? Also, What had to happen to each mission before they would continue on to the next mission?

**baseline: PASS**

[1] Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

**fixed: PASS**

[1] Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

**section: PASS**

[1] Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

**paired_fixed: PASS**

[1] Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

**paired_section: PASS**

[1] Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Each step had to be successfully accomplished before the next ones could be performed, and it was unknown how many tries of each mission would be necessary; therefore letters were used instead of numbers.

## C03

Which genus lack tentacles and sheaths? Also, Where do juvenile platyctenids live?

**baseline: PARTIAL**

[1] In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

{
  "required_gold_groups": [
    [
      "Beroe",
      "Beroe",
      "Beroe"
    ],
    [
      "among the plankton",
      "among the plankton",
      "among the plankton"
    ]
  ],
  "matched": [
    true,
    false
  ]
}

**fixed: PASS**

[1] In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

[2] In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

**section: PASS**

[1] In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

[2] In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

**paired_fixed: PASS**

[1] In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

[2] In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

**paired_section: PASS**

[1] In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

[2] In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In the genus Beroe the juveniles, like the adults, lack tentacles and tentacle sheaths.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In some groups, such as the flat, bottom-dwelling platyctenids, the juveniles behave more like true larvae, as they live among the plankton and thus occupy a different ecological niche from their parents and attain the adult form by a more radical metamorphosis, after dropping to the sea-floor.

## C04

What sport attracts most tourists to Jacksonville? Also, What are those from Jacksonville sometimes called?

**baseline: PARTIAL**

[1] People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled

{
  "required_gold_groups": [
    [
      "golf",
      "golf",
      "golf"
    ],
    [
      "\"Jacksonvillians\" or \"Jaxsons\"",
      "\"Jacksonvillians\"",
      "\"Jacksonvillians\" or \"Jaxsons\""
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**fixed: PASS**

[1] Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

**section: PASS**

[1] Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

[2] Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

**paired_fixed: PASS**

[1] Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

**paired_section: PASS**

[1] Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

[2] Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Harbor improvements since the late 19th century have made Jacksonville a major military and civilian deep-water port. Its riverine location facilitates two United States Navy bases and the Port of Jacksonville, Florida's third largest seaport. The two US Navy bases, Blount Island Command and the nearby Naval Submarine Base Kings Bay form the third largest military presence in the United States.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Significant factors in the local economy include services such as banking, insurance, healthcare and logistics. As with much of Florida, tourism is also important to the Jacksonville area, particularly tourism related to golf. People from Jacksonville may be called "Jacksonvillians" or "Jaxsons" (also spelled "Jaxons").

## U01

What is the exact database password used by Fresno, California?

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

What is the bank account number associated with Apollo program?

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

What is the date of birth of the fictional coordinator Neris Quill for Ctenophora?

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

What is the current Bitcoin price in AED in the Jacksonville, Florida documents?

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

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

[1] ## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
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

## A05

Who approves asteroid docking warrants at the fictional Calorin Pier?

**baseline: FAIL**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

## P02

Who has authority to approve standard cargo schedules at Orvella Depot?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_Fresno__California.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

## P03

Who approves standard shelf indexes at the fictional Tiravel Library?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

**fixed: PASS**

[1] At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

## P04

Who has authority to approve standard shelf indexes at Tiravel Library?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

**fixed: PASS**

[1] At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

Source: 02_Apollo_program.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

## P05

Who approves standard vessel rosters at the fictional Calorin Pier?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

## P06

Who has authority to approve standard vessel rosters at Calorin Pier?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_Ctenophora.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

## P07

Who approves standard display cards at the fictional Fenora Gallery?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

## P08

Who has authority to approve standard display cards at Fenora Gallery?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Jacksonville__Florida.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.
