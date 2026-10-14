# V15 prospective Scope48 — actual MiniLM

24 original externally authored supported questions; four constructed compound controls; four standard and eight actor/object/site unsupported controls and eight supported actor controls. Frozen before answers. Not sealed independent accuracy, official SQuAD scoring or representative accuracy; prior public/model exposure cannot be excluded. Gold-paragraph precision is a location proxy, not semantic support. Same-session v14/v15 use identical real vectors. Production remains r44; a gate PASS permits review only.

{
  "summary": {
    "baseline": {
      "PASS": 22,
      "PARTIAL": 2,
      "FAIL": 24,
      "citations": 43,
      "valid_provenance": 43,
      "gold_paragraph_citations": 24,
      "direct_gold_span_citations": 20,
      "false_acceptances": 8,
      "false_refusals": 1,
      "uncited_refusals": 5
    },
    "fixed": {
      "PASS": 43,
      "PARTIAL": 0,
      "FAIL": 5,
      "citations": 37,
      "valid_provenance": 37,
      "gold_paragraph_citations": 33,
      "direct_gold_span_citations": 33,
      "false_acceptances": 0,
      "false_refusals": 1,
      "uncited_refusals": 13
    },
    "section": {
      "PASS": 42,
      "PARTIAL": 0,
      "FAIL": 6,
      "citations": 36,
      "valid_provenance": 36,
      "gold_paragraph_citations": 32,
      "direct_gold_span_citations": 32,
      "false_acceptances": 0,
      "false_refusals": 2,
      "uncited_refusals": 14
    },
    "paired_fixed": {
      "PASS": 43,
      "PARTIAL": 0,
      "FAIL": 5,
      "citations": 37,
      "valid_provenance": 37,
      "gold_paragraph_citations": 33,
      "direct_gold_span_citations": 33,
      "false_acceptances": 0,
      "false_refusals": 1,
      "uncited_refusals": 13
    },
    "paired_section": {
      "PASS": 42,
      "PARTIAL": 0,
      "FAIL": 6,
      "citations": 36,
      "valid_provenance": 36,
      "gold_paragraph_citations": 32,
      "direct_gold_span_citations": 32,
      "false_acceptances": 0,
      "false_refusals": 2,
      "uncited_refusals": 14
    }
  },
  "categories": {
    "externally_authored_supported": {
      "baseline": {
        "PASS": 17,
        "PARTIAL": 0,
        "FAIL": 7,
        "citations": 23,
        "valid_provenance": 23,
        "gold_paragraph_citations": 21,
        "direct_gold_span_citations": 17,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
      },
      "fixed": {
        "PASS": 23,
        "PARTIAL": 0,
        "FAIL": 1,
        "citations": 23,
        "valid_provenance": 23,
        "gold_paragraph_citations": 23,
        "direct_gold_span_citations": 23,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
      },
      "section": {
        "PASS": 22,
        "PARTIAL": 0,
        "FAIL": 2,
        "citations": 22,
        "valid_provenance": 22,
        "gold_paragraph_citations": 22,
        "direct_gold_span_citations": 22,
        "false_acceptances": 0,
        "false_refusals": 2,
        "uncited_refusals": 2
      },
      "paired_fixed": {
        "PASS": 23,
        "PARTIAL": 0,
        "FAIL": 1,
        "citations": 23,
        "valid_provenance": 23,
        "gold_paragraph_citations": 23,
        "direct_gold_span_citations": 23,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
      },
      "paired_section": {
        "PASS": 22,
        "PARTIAL": 0,
        "FAIL": 2,
        "citations": 22,
        "valid_provenance": 22,
        "gold_paragraph_citations": 22,
        "direct_gold_span_citations": 22,
        "false_acceptances": 0,
        "false_refusals": 2,
        "uncited_refusals": 2
      }
    },
    "constructed_compound": {
      "baseline": {
        "PASS": 1,
        "PARTIAL": 2,
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
        "direct_gold_span_citations": 6,
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
        "direct_gold_span_citations": 6,
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
        "direct_gold_span_citations": 6,
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
        "direct_gold_span_citations": 6,
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
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 4,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 4,
        "direct_gold_span_citations": 4,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "section": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 4,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 4,
        "direct_gold_span_citations": 4,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_fixed": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 4,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 4,
        "direct_gold_span_citations": 4,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_section": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 4,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 4,
        "direct_gold_span_citations": 4,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      }
    }
  },
  "checks": {
    "development_gate_passed": true,
    "fixed_supported_at_least_21": true,
    "fixed_supported_actor_all_pass": false,
    "fixed_compounds_all_pass": true,
    "fixed_unsupported_all_pass": true,
    "fixed_provenance_intact": true,
    "fixed_no_false_acceptance_or_refusal": false,
    "fixed_no_production_or_prior_section_pass_loss": true,
    "section_supported_at_least_21": true,
    "section_supported_actor_all_pass": false,
    "section_compounds_all_pass": true,
    "section_unsupported_all_pass": true,
    "section_provenance_intact": true,
    "section_no_false_acceptance_or_refusal": false,
    "section_no_production_or_prior_section_pass_loss": false
  },
  "gate": "FAIL",
  "regressions": {
    "fixed": [],
    "section": [
      "F23"
    ]
  }
}

## F01

How many quadrangles does the Main Quadrangles have?

**baseline: FAIL**

[1] The first buildings of the University of Chicago campus, which make up what is now known as the Main Quadrangles, were part of a "master plan" conceived by two University of Chicago trustees and plotted by Chicago architect Henry Ives Cobb.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The first buildings of the University of Chicago campus, which make up what is now known as the Main Quadrangles, were part of a "master plan" conceived by two University of Chicago trustees and plotted by Chicago architect Henry Ives Cobb.

{
  "required_gold_groups": [
    [
      "six",
      "six quadrangles",
      "six",
      "six"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

**section: PASS**

[1] The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

**paired_fixed: PASS**

[1] The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

**paired_section: PASS**

[1] The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

## F02

Who helped designed the Main Quadrangles?

**baseline: PASS**

[1] The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

**fixed: PASS**

[1] The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

**section: PASS**

[1] The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

**paired_fixed: PASS**

[1] The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

**paired_section: PASS**

[1] The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

## F03

Hutchinson Hall was designed to look like what Oxford hall?

**baseline: PASS**

[1] (Mitchell Tower, for example, is modeled after Oxford's Magdalen Tower, and the university Commons, Hutchinson Hall, replicates Christ Church Hall.)

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> (Mitchell Tower, for example, is modeled after Oxford's Magdalen Tower, and the university Commons, Hutchinson Hall, replicates Christ Church Hall.)

**fixed: PASS**

[1] (Mitchell Tower, for example, is modeled after Oxford's Magdalen Tower, and the university Commons, Hutchinson Hall, replicates Christ Church Hall.)

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> (Mitchell Tower, for example, is modeled after Oxford's Magdalen Tower, and the university Commons, Hutchinson Hall, replicates Christ Church Hall.)

**section: PASS**

[1] (Mitchell Tower, for example, is modeled after Oxford's Magdalen Tower, and the university Commons, Hutchinson Hall, replicates Christ Church Hall.)

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> (Mitchell Tower, for example, is modeled after Oxford's Magdalen Tower, and the university Commons, Hutchinson Hall, replicates Christ Church Hall.)

**paired_fixed: PASS**

[1] (Mitchell Tower, for example, is modeled after Oxford's Magdalen Tower, and the university Commons, Hutchinson Hall, replicates Christ Church Hall.)

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> (Mitchell Tower, for example, is modeled after Oxford's Magdalen Tower, and the university Commons, Hutchinson Hall, replicates Christ Church Hall.)

**paired_section: PASS**

[1] (Mitchell Tower, for example, is modeled after Oxford's Magdalen Tower, and the university Commons, Hutchinson Hall, replicates Christ Church Hall.)

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> (Mitchell Tower, for example, is modeled after Oxford's Magdalen Tower, and the university Commons, Hutchinson Hall, replicates Christ Church Hall.)

## F04

Who makes up the Student Government?

**baseline: PASS**

[1] Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit.

**fixed: PASS**

[1] Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

**section: PASS**

[1] Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

**paired_fixed: PASS**

[1] Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

**paired_section: PASS**

[1] Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

## F05

How many vice presidents are on the Student Board?

**baseline: PASS**

[1] It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring.

**fixed: PASS**

[1] Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

**section: PASS**

[1] Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

**paired_fixed: PASS**

[1] Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

**paired_section: PASS**

[1] Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Student Government is made up of graduate and undergraduate students elected to represent members from their respective academic unit. It is led by an Executive Committee, chaired by a President with the assistance of two Vice Presidents, one for Administration and the other for Student Life, elected together as a slate by the student body each spring. Its annual budget is greater than $2 million.

## F06

Roughly how much is the Student Government's budget?

**baseline: FAIL**

I can't find this in the provided documents.

{
  "required_gold_groups": [
    [
      "greater than $2 million",
      "$2 million",
      "greater than $2 million"
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
      "greater than $2 million",
      "$2 million",
      "greater than $2 million"
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
      "greater than $2 million",
      "$2 million",
      "greater than $2 million"
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
      "greater than $2 million",
      "$2 million",
      "greater than $2 million"
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
      "greater than $2 million",
      "$2 million",
      "greater than $2 million"
    ]
  ],
  "matched": [
    false
  ]
}

## F07

When was the Brotherhood first banned in Egypt?

**baseline: PASS**

[1] The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

**fixed: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

**section: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

**paired_fixed: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

**paired_section: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

## F08

What Egyptian president jailed thousands of members of the Brotherhood?

**baseline: PASS**

[1] The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

**fixed: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

**section: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

**paired_fixed: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

**paired_section: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

## F09

When was Al-Banna assassinated?

**baseline: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier.

**fixed: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

**section: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

**paired_fixed: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

**paired_section: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

## F10

Though Turabi proclaimed his support for the democratic process, he strictly applied what after coming into power?

**baseline: PASS**

[1] Turabi was noted for proclaiming his support for the democratic process and a liberal government before coming to power, but strict application of sharia law, torture and mass imprisonment of the opposition, and an intensification of the long-running war in southern Sudan, once in power.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Turabi was noted for proclaiming his support for the democratic process and a liberal government before coming to power, but strict application of sharia law, torture and mass imprisonment of the opposition, and an intensification of the long-running war in southern Sudan, once in power.

**fixed: PASS**

[1] Turabi was noted for proclaiming his support for the democratic process and a liberal government before coming to power, but strict application of sharia law, torture and mass imprisonment of the opposition, and an intensification of the long-running war in southern Sudan, once in power.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Turabi was noted for proclaiming his support for the democratic process and a liberal government before coming to power, but strict application of sharia law, torture and mass imprisonment of the opposition, and an intensification of the long-running war in southern Sudan, once in power.

**section: PASS**

[1] Turabi was noted for proclaiming his support for the democratic process and a liberal government before coming to power, but strict application of sharia law, torture and mass imprisonment of the opposition, and an intensification of the long-running war in southern Sudan, once in power.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Turabi was noted for proclaiming his support for the democratic process and a liberal government before coming to power, but strict application of sharia law, torture and mass imprisonment of the opposition, and an intensification of the long-running war in southern Sudan, once in power.

**paired_fixed: PASS**

[1] Turabi was noted for proclaiming his support for the democratic process and a liberal government before coming to power, but strict application of sharia law, torture and mass imprisonment of the opposition, and an intensification of the long-running war in southern Sudan, once in power.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Turabi was noted for proclaiming his support for the democratic process and a liberal government before coming to power, but strict application of sharia law, torture and mass imprisonment of the opposition, and an intensification of the long-running war in southern Sudan, once in power.

**paired_section: PASS**

[1] Turabi was noted for proclaiming his support for the democratic process and a liberal government before coming to power, but strict application of sharia law, torture and mass imprisonment of the opposition, and an intensification of the long-running war in southern Sudan, once in power.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Turabi was noted for proclaiming his support for the democratic process and a liberal government before coming to power, but strict application of sharia law, torture and mass imprisonment of the opposition, and an intensification of the long-running war in southern Sudan, once in power.

## F11

What did the NIF try to unify Islamist opposition against?

**baseline: PASS**

[1] The NIF regime also harbored Osama bin Laden for a time (before 9/11), and worked to unify Islamist opposition to the American attack on Iraq in the 1991 Gulf War.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The NIF regime also harbored Osama bin Laden for a time (before 9/11), and worked to unify Islamist opposition to the American attack on Iraq in the 1991 Gulf War.

**fixed: PASS**

[1] The NIF regime also harbored Osama bin Laden for a time (before 9/11), and worked to unify Islamist opposition to the American attack on Iraq in the 1991 Gulf War.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The NIF regime also harbored Osama bin Laden for a time (before 9/11), and worked to unify Islamist opposition to the American attack on Iraq in the 1991 Gulf War.

**section: PASS**

[1] The NIF regime also harbored Osama bin Laden for a time (before 9/11), and worked to unify Islamist opposition to the American attack on Iraq in the 1991 Gulf War.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The NIF regime also harbored Osama bin Laden for a time (before 9/11), and worked to unify Islamist opposition to the American attack on Iraq in the 1991 Gulf War.

**paired_fixed: PASS**

[1] The NIF regime also harbored Osama bin Laden for a time (before 9/11), and worked to unify Islamist opposition to the American attack on Iraq in the 1991 Gulf War.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The NIF regime also harbored Osama bin Laden for a time (before 9/11), and worked to unify Islamist opposition to the American attack on Iraq in the 1991 Gulf War.

**paired_section: PASS**

[1] The NIF regime also harbored Osama bin Laden for a time (before 9/11), and worked to unify Islamist opposition to the American attack on Iraq in the 1991 Gulf War.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The NIF regime also harbored Osama bin Laden for a time (before 9/11), and worked to unify Islamist opposition to the American attack on Iraq in the 1991 Gulf War.

## F12

How did the party overthrow the elected government in 1989?

**baseline: FAIL**

[1] ## Context 2
After al-Nimeiry was overthrown in 1985 the party did poorly in national elections, but in 1989 it was able to overthrow the elected post-al-Nimeiry government with the help of the military.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Context 2
> After al-Nimeiry was overthrown in 1985 the party did poorly in national elections, but in 1989 it was able to overthrow the elected post-al-Nimeiry government with the help of the military.

{
  "required_gold_groups": [
    [
      "with the help of the military",
      "with the help of the military",
      "military"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] After al-Nimeiry was overthrown in 1985 the party did poorly in national elections, but in 1989 it was able to overthrow the elected post-al-Nimeiry government with the help of the military.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After al-Nimeiry was overthrown in 1985 the party did poorly in national elections, but in 1989 it was able to overthrow the elected post-al-Nimeiry government with the help of the military.

**section: PASS**

[1] After al-Nimeiry was overthrown in 1985 the party did poorly in national elections, but in 1989 it was able to overthrow the elected post-al-Nimeiry government with the help of the military.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After al-Nimeiry was overthrown in 1985 the party did poorly in national elections, but in 1989 it was able to overthrow the elected post-al-Nimeiry government with the help of the military.

**paired_fixed: PASS**

[1] After al-Nimeiry was overthrown in 1985 the party did poorly in national elections, but in 1989 it was able to overthrow the elected post-al-Nimeiry government with the help of the military.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After al-Nimeiry was overthrown in 1985 the party did poorly in national elections, but in 1989 it was able to overthrow the elected post-al-Nimeiry government with the help of the military.

**paired_section: PASS**

[1] After al-Nimeiry was overthrown in 1985 the party did poorly in national elections, but in 1989 it was able to overthrow the elected post-al-Nimeiry government with the help of the military.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> After al-Nimeiry was overthrown in 1985 the party did poorly in national elections, but in 1989 it was able to overthrow the elected post-al-Nimeiry government with the help of the military.

## F13

What type of treaty was the Lisbon Treaty?

**baseline: FAIL**

[1] Instead, the Lisbon Treaty was enacted.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Instead, the Lisbon Treaty was enacted.

{
  "required_gold_groups": [
    [
      "an amending treaty",
      "an amending treaty",
      "an amending treaty",
      "an amending treaty"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

**section: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

**paired_fixed: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

**paired_section: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

## F14

What reform was attempted following the Nice Treaty?

**baseline: FAIL**

[1] # European Union law

## Context 1
Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # European Union law
> 
> ## Context 1
> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document.

{
  "required_gold_groups": [
    [
      "there was an attempt to reform the constitutional law of the European Union and make it more transparent",
      "an attempt to reform the constitutional law of the European Union and make it more transparent",
      "there was an attempt to reform the constitutional law of the European Union and make it more transparent",
      "an attempt to reform the constitutional law of the European Union and make it more transparent"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

**section: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

**paired_fixed: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

**paired_section: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

## F15

Is the Lisbon Treaty one that would alter existing treaties or replace them?

**baseline: PASS**

[1] Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

**fixed: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

**section: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

**paired_fixed: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

**paired_section: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

## F16

When did the European Council task an entity with drafting a European Charter of Human Rights?

**baseline: PASS**

[1] In 1999 the European Council set up a body tasked with drafting a European Charter of Human Rights, which could form the constitutional basis for the European Union and as such tailored specifically to apply to the European Union and its institutions.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In 1999 the European Council set up a body tasked with drafting a European Charter of Human Rights, which could form the constitutional basis for the European Union and as such tailored specifically to apply to the European Union and its institutions.

**fixed: PASS**

[1] In 1999 the European Council set up a body tasked with drafting a European Charter of Human Rights, which could form the constitutional basis for the European Union and as such tailored specifically to apply to the European Union and its institutions. The Charter of Fundamental Rights of the European Union draws a list of fundamental rights from the European Convention on Human Rights and Fundamental Freedoms, the Declaration on Fundamental Rights produced by the European Parliament in 1989 and European Union Treaties.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In 1999 the European Council set up a body tasked with drafting a European Charter of Human Rights, which could form the constitutional basis for the European Union and as such tailored specifically to apply to the European Union and its institutions. The Charter of Fundamental Rights of the European Union draws a list of fundamental rights from the European Convention on Human Rights and Fundamental Freedoms, the Declaration on Fundamental Rights produced by the European Parliament in 1989 and European Union Treaties.

**section: PASS**

[1] In 1999 the European Council set up a body tasked with drafting a European Charter of Human Rights, which could form the constitutional basis for the European Union and as such tailored specifically to apply to the European Union and its institutions. The Charter of Fundamental Rights of the European Union draws a list of fundamental rights from the European Convention on Human Rights and Fundamental Freedoms, the Declaration on Fundamental Rights produced by the European Parliament in 1989 and European Union Treaties.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In 1999 the European Council set up a body tasked with drafting a European Charter of Human Rights, which could form the constitutional basis for the European Union and as such tailored specifically to apply to the European Union and its institutions. The Charter of Fundamental Rights of the European Union draws a list of fundamental rights from the European Convention on Human Rights and Fundamental Freedoms, the Declaration on Fundamental Rights produced by the European Parliament in 1989 and European Union Treaties.

**paired_fixed: PASS**

[1] In 1999 the European Council set up a body tasked with drafting a European Charter of Human Rights, which could form the constitutional basis for the European Union and as such tailored specifically to apply to the European Union and its institutions. The Charter of Fundamental Rights of the European Union draws a list of fundamental rights from the European Convention on Human Rights and Fundamental Freedoms, the Declaration on Fundamental Rights produced by the European Parliament in 1989 and European Union Treaties.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In 1999 the European Council set up a body tasked with drafting a European Charter of Human Rights, which could form the constitutional basis for the European Union and as such tailored specifically to apply to the European Union and its institutions. The Charter of Fundamental Rights of the European Union draws a list of fundamental rights from the European Convention on Human Rights and Fundamental Freedoms, the Declaration on Fundamental Rights produced by the European Parliament in 1989 and European Union Treaties.

**paired_section: PASS**

[1] In 1999 the European Council set up a body tasked with drafting a European Charter of Human Rights, which could form the constitutional basis for the European Union and as such tailored specifically to apply to the European Union and its institutions. The Charter of Fundamental Rights of the European Union draws a list of fundamental rights from the European Convention on Human Rights and Fundamental Freedoms, the Declaration on Fundamental Rights produced by the European Parliament in 1989 and European Union Treaties.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In 1999 the European Council set up a body tasked with drafting a European Charter of Human Rights, which could form the constitutional basis for the European Union and as such tailored specifically to apply to the European Union and its institutions. The Charter of Fundamental Rights of the European Union draws a list of fundamental rights from the European Convention on Human Rights and Fundamental Freedoms, the Declaration on Fundamental Rights produced by the European Parliament in 1989 and European Union Treaties.

## F17

Which entities were originally concerned with preventing violation of human rights?

**baseline: FAIL**

[1] It was not envisaged for European Union measures, that is legislative and administrative actions by European Union institutions, to be subject to human rights.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> It was not envisaged for European Union measures, that is legislative and administrative actions by European Union institutions, to be subject to human rights.

{
  "required_gold_groups": [
    [
      "member states",
      "the European Convention on Human Rights",
      "the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

**section: PASS**

[1] At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

**paired_fixed: PASS**

[1] At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

**paired_section: PASS**

[1] At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

## F18

What other entity was established at the same time as the European Convention on Human Rights?

**baseline: PASS**

[1] At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights.

**fixed: PASS**

[1] At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

**section: PASS**

[1] At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

**paired_fixed: PASS**

[1] At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

**paired_section: PASS**

[1] At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the time the only concern was that member states should be prevented from violating human rights, hence the establishment of the European Convention on Human Rights in 1950 and the establishment of the European Court of Human Rights. The European Court of Justice recognised fundamental rights as general principle of European Union law as the need to ensure that European Union measures are compatible with the human rights enshrined in member states' constitution became ever more apparent.

## F19

Who was Guy's Rival?

**baseline: PASS**

[1] All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

**fixed: PASS**

[1] All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

**section: PASS**

[1] All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

**paired_fixed: PASS**

[1] All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

**paired_section: PASS**

[1] All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

## F20

Who led Richard's troops when Cyprus was conquered?

**baseline: FAIL**

[1] By 1 June, Richard had conquered the whole island.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> By 1 June, Richard had conquered the whole island.

{
  "required_gold_groups": [
    [
      "Guy de Lusignan",
      "Guy de Lusignan",
      "Guy de Lusignan"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

**section: PASS**

[1] Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

**paired_fixed: PASS**

[1] Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

**paired_section: PASS**

[1] Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

## F21

What were Isaac's chains made out of?

**baseline: PASS**

[1] Isaac surrendered and was confined with silver chains, because Richard had promised that he would not place him in irons.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Isaac surrendered and was confined with silver chains, because Richard had promised that he would not place him in irons.

**fixed: PASS**

[1] Isaac surrendered and was confined with silver chains, because Richard had promised that he would not place him in irons.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Isaac surrendered and was confined with silver chains, because Richard had promised that he would not place him in irons.

**section: PASS**

[1] Isaac surrendered and was confined with silver chains, because Richard had promised that he would not place him in irons.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Isaac surrendered and was confined with silver chains, because Richard had promised that he would not place him in irons.

**paired_fixed: PASS**

[1] Isaac surrendered and was confined with silver chains, because Richard had promised that he would not place him in irons.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Isaac surrendered and was confined with silver chains, because Richard had promised that he would not place him in irons.

**paired_section: PASS**

[1] Isaac surrendered and was confined with silver chains, because Richard had promised that he would not place him in irons.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Isaac surrendered and was confined with silver chains, because Richard had promised that he would not place him in irons.

## F22

When were the Normans in Normandy?

**baseline: PASS**

[1] The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France.

**fixed: PASS**

[1] The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France. They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France. They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia.

**section: PASS**

[1] The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France. They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France. They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia.

**paired_fixed: PASS**

[1] The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France. They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France. They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia.

**paired_section: PASS**

[1] The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France. They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France. They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia.

## F23

In what country is Normandy located?

**baseline: PASS**

[1] The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France.

**fixed: PASS**

[1] The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France. They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France. They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia.

**section: FAIL**

I can't find this in the provided documents.

{
  "required_gold_groups": [
    [
      "France",
      "France",
      "France",
      "France"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: PASS**

[1] The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France. They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Normans (Norman: Nourmands; French: Normands; Latin: Normanni) were the people who in the 10th and 11th centuries gave their name to Normandy, a region in France. They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia.

**paired_section: FAIL**

I can't find this in the provided documents.

{
  "required_gold_groups": [
    [
      "France",
      "France",
      "France",
      "France"
    ]
  ],
  "matched": [
    false
  ]
}

## F24

From which countries did the Norse originate?

**baseline: PASS**

[1] They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of

**fixed: PASS**

[1] They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia. The distinct cultural and ethnic identity of the Normans emerged initially in the first half of the 10th century, and it continued to evolve over the succeeding centuries.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia. The distinct cultural and ethnic identity of the Normans emerged initially in the first half of the 10th century, and it continued to evolve over the succeeding centuries.

**section: PASS**

[1] They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia. The distinct cultural and ethnic identity of the Normans emerged initially in the first half of the 10th century, and it continued to evolve over the succeeding centuries.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia. The distinct cultural and ethnic identity of the Normans emerged initially in the first half of the 10th century, and it continued to evolve over the succeeding centuries.

**paired_fixed: PASS**

[1] They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia. The distinct cultural and ethnic identity of the Normans emerged initially in the first half of the 10th century, and it continued to evolve over the succeeding centuries.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia. The distinct cultural and ethnic identity of the Normans emerged initially in the first half of the 10th century, and it continued to evolve over the succeeding centuries.

**paired_section: PASS**

[1] They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia. The distinct cultural and ethnic identity of the Normans emerged initially in the first half of the 10th century, and it continued to evolve over the succeeding centuries.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> They were descended from Norse ("Norman" comes from "Norseman") raiders and pirates from Denmark, Iceland and Norway who, under their leader Rollo, agreed to swear fealty to King Charles III of West Francia. Through generations of assimilation and mixing with the native Frankish and Roman-Gaulish populations, their descendants would gradually merge with the Carolingian-based cultures of West Francia. The distinct cultural and ethnic identity of the Normans emerged initially in the first half of the 10th century, and it continued to evolve over the succeeding centuries.

## C01

How many quadrangles does the Main Quadrangles have? Also, Who helped designed the Main Quadrangles?

**baseline: PARTIAL**

[1] The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

{
  "required_gold_groups": [
    [
      "six",
      "six quadrangles",
      "six",
      "six"
    ],
    [
      "Cobb, Shepley, Rutan and Coolidge, Holabird & Roche,",
      "Henry Ives Cobb",
      "Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms",
      "Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**fixed: PASS**

[1] The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

[2] The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

**section: PASS**

[1] The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

[2] The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

**paired_fixed: PASS**

[1] The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

[2] The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

**paired_section: PASS**

[1] The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

[2] The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Main Quadrangles consist of six quadrangles, each surrounded by buildings, bordering one larger quadrangle.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The buildings of the Main Quadrangles were designed by Cobb, Shepley, Rutan and Coolidge, Holabird & Roche, and other architectural firms in a mixture of the Victorian Gothic and Collegiate Gothic styles, patterned on the colleges of the University of Oxford.

## C02

When was the Brotherhood first banned in Egypt? Also, What Egyptian president jailed thousands of members of the Brotherhood?

**baseline: PASS**

[1] The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

**fixed: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

**section: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

**paired_fixed: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

**paired_section: PASS**

[1] Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Some elements of the Brotherhood, though perhaps against orders, did engage in violence against the government, and its founder Al-Banna was assassinated in 1949 in retaliation for the assassination of Egypt's premier Mahmud Fami Naqrashi three months earlier. The Brotherhood has suffered periodic repression in Egypt and has been banned several times, in 1948 and several years later following confrontations with Egyptian president Gamal Abdul Nasser, who jailed thousands of members for several years.

## C03

What type of treaty was the Lisbon Treaty? Also, What reform was attempted following the Nice Treaty?

**baseline: FAIL**

[1] # European Union law

## Context 1
Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # European Union law
> 
> ## Context 1
> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document.

{
  "required_gold_groups": [
    [
      "an amending treaty",
      "an amending treaty",
      "an amending treaty",
      "an amending treaty"
    ],
    [
      "there was an attempt to reform the constitutional law of the European Union and make it more transparent",
      "an attempt to reform the constitutional law of the European Union and make it more transparent",
      "there was an attempt to reform the constitutional law of the European Union and make it more transparent",
      "an attempt to reform the constitutional law of the European Union and make it more transparent"
    ]
  ],
  "matched": [
    false,
    false
  ]
}

**fixed: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

**section: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

**paired_fixed: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

**paired_section: PASS**

[1] Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Following the Nice Treaty, there was an attempt to reform the constitutional law of the European Union and make it more transparent; this would have also produced a single constitutional document. However, as a result of the referendum in France and the referendum in the Netherlands, the 2004 Treaty establishing a Constitution for Europe never came into force. Instead, the Lisbon Treaty was enacted. Its substance was very similar to the proposed constitutional treaty, but it was formally an amending treaty, and – though it significantly altered the existing treaties – it did not completely replace them.

## C04

Who was Guy's Rival? Also, Who led Richard's troops when Cyprus was conquered?

**baseline: PARTIAL**

[1] Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

{
  "required_gold_groups": [
    [
      "Conrad of Montferrat",
      "Conrad of Montferrat",
      "Conrad of Montferrat"
    ],
    [
      "Guy de Lusignan",
      "Guy de Lusignan",
      "Guy de Lusignan"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**fixed: PASS**

[1] All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

[2] Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

**section: PASS**

[1] All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

[2] Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

**paired_fixed: PASS**

[1] All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

[2] Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

**paired_section: PASS**

[1] All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

[2] Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> All declared their support for Richard provided that he support Guy against his rival Conrad of Montferrat.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Richard then proceeded to conquer the whole island, his troops being led by Guy de Lusignan.

## U01

What is the exact database password used by University of Chicago?

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

What is the bank account number associated with Islamism?

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

What is the date of birth of the fictional coordinator Neris Quill for European Union law?

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

What is the current Bitcoin price in AED in the Normans documents?

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

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 02_Islamism.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 02_Islamism.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 04_Normans.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 04_Normans.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

## P02

Who has authority to approve standard cargo schedules at Orvella Depot?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

**fixed: FAIL**

[1] ## Fictional approval appendix
At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

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

**section: FAIL**

[1] ## Fictional approval appendix
At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

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

**paired_fixed: FAIL**

[1] ## Fictional approval appendix
At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

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

**paired_section: FAIL**

[1] ## Fictional approval appendix
At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

Source: 01_University_of_Chicago.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Orvella Depot, it is for the Freight Registrar to approve standard cargo schedules. This approval authority applies only to standard cargo schedules at Orvella Depot. No other approval authority is described in this corpus.

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

## P03

Who approves standard shelf indexes at the fictional Tiravel Library?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

## P04

Who has authority to approve standard shelf indexes at Tiravel Library?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

[1] ## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

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

[1] ## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

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

[1] ## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

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

[1] ## Fictional approval appendix
At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

Source: 02_Islamism.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Tiravel Library, it is for the Reference Steward to approve standard shelf indexes. This approval authority applies only to standard shelf indexes at Tiravel Library. No other approval authority is described in this corpus.

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

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

## P06

Who has authority to approve standard vessel rosters at Calorin Pier?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

**fixed: FAIL**

[1] ## Fictional approval appendix
At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

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

**section: FAIL**

[1] ## Fictional approval appendix
At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

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

**paired_fixed: FAIL**

[1] ## Fictional approval appendix
At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

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

**paired_section: FAIL**

[1] ## Fictional approval appendix
At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

Source: 03_European_Union_law.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Calorin Pier, it is for the Berth Recorder to approve standard vessel rosters. This approval authority applies only to standard vessel rosters at Calorin Pier. No other approval authority is described in this corpus.

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

## P07

Who approves standard display cards at the fictional Fenora Gallery?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards.

Source: 04_Normans.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

**section: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

**paired_fixed: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

**paired_section: PASS**

[1] At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Normans.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

## P08

Who has authority to approve standard display cards at Fenora Gallery?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards.

Source: 04_Normans.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

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

**fixed: FAIL**

[1] ## Fictional approval appendix
At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Normans.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

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

**section: FAIL**

[1] ## Fictional approval appendix
At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Normans.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

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

**paired_fixed: FAIL**

[1] ## Fictional approval appendix
At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Normans.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

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

**paired_section: FAIL**

[1] ## Fictional approval appendix
At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

Source: 04_Normans.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Fenora Gallery, it is for the Display Custodian to approve standard display cards. This approval authority applies only to standard display cards at Fenora Gallery. No other approval authority is described in this corpus.

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
