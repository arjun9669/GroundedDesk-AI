# V7 fresh public prospective32 — actual MiniLM

24 original externally authored supported questions; four constructed compound controls; four self-authored unsupported controls. Frozen before answers. Not sealed independent accuracy, official SQuAD scoring or representative accuracy; prior public/model exposure cannot be excluded. Gold-paragraph precision is a location proxy, not semantic support. Same-session v6/v7 use identical real vectors. Production remains r44; a gate PASS permits review only.

{
  "summary": {
    "baseline": {
      "PASS": 19,
      "PARTIAL": 2,
      "FAIL": 11,
      "citations": 27,
      "valid_provenance": 27,
      "gold_paragraph_citations": 21,
      "direct_gold_span_citations": 17,
      "false_acceptances": 0,
      "false_refusals": 1,
      "uncited_refusals": 5
    },
    "fixed": {
      "PASS": 22,
      "PARTIAL": 2,
      "FAIL": 8,
      "citations": 27,
      "valid_provenance": 27,
      "gold_paragraph_citations": 25,
      "direct_gold_span_citations": 20,
      "false_acceptances": 0,
      "false_refusals": 1,
      "uncited_refusals": 5
    },
    "section": {
      "PASS": 22,
      "PARTIAL": 2,
      "FAIL": 8,
      "citations": 27,
      "valid_provenance": 27,
      "gold_paragraph_citations": 26,
      "direct_gold_span_citations": 20,
      "false_acceptances": 0,
      "false_refusals": 1,
      "uncited_refusals": 5
    },
    "paired_fixed": {
      "PASS": 22,
      "PARTIAL": 2,
      "FAIL": 8,
      "citations": 27,
      "valid_provenance": 27,
      "gold_paragraph_citations": 25,
      "direct_gold_span_citations": 20,
      "false_acceptances": 0,
      "false_refusals": 1,
      "uncited_refusals": 5
    },
    "paired_section": {
      "PASS": 22,
      "PARTIAL": 2,
      "FAIL": 8,
      "citations": 27,
      "valid_provenance": 27,
      "gold_paragraph_citations": 26,
      "direct_gold_span_citations": 20,
      "false_acceptances": 0,
      "false_refusals": 1,
      "uncited_refusals": 5
    }
  },
  "categories": {
    "externally_authored_supported": {
      "baseline": {
        "PASS": 14,
        "PARTIAL": 0,
        "FAIL": 10,
        "citations": 23,
        "valid_provenance": 23,
        "gold_paragraph_citations": 18,
        "direct_gold_span_citations": 14,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
      },
      "fixed": {
        "PASS": 16,
        "PARTIAL": 0,
        "FAIL": 8,
        "citations": 23,
        "valid_provenance": 23,
        "gold_paragraph_citations": 21,
        "direct_gold_span_citations": 16,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
      },
      "section": {
        "PASS": 16,
        "PARTIAL": 0,
        "FAIL": 8,
        "citations": 23,
        "valid_provenance": 23,
        "gold_paragraph_citations": 22,
        "direct_gold_span_citations": 16,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
      },
      "paired_fixed": {
        "PASS": 16,
        "PARTIAL": 0,
        "FAIL": 8,
        "citations": 23,
        "valid_provenance": 23,
        "gold_paragraph_citations": 21,
        "direct_gold_span_citations": 16,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
      },
      "paired_section": {
        "PASS": 16,
        "PARTIAL": 0,
        "FAIL": 8,
        "citations": 23,
        "valid_provenance": 23,
        "gold_paragraph_citations": 22,
        "direct_gold_span_citations": 16,
        "false_acceptances": 0,
        "false_refusals": 1,
        "uncited_refusals": 1
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
        "PASS": 2,
        "PARTIAL": 2,
        "FAIL": 0,
        "citations": 4,
        "valid_provenance": 4,
        "gold_paragraph_citations": 4,
        "direct_gold_span_citations": 4,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "section": {
        "PASS": 2,
        "PARTIAL": 2,
        "FAIL": 0,
        "citations": 4,
        "valid_provenance": 4,
        "gold_paragraph_citations": 4,
        "direct_gold_span_citations": 4,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_fixed": {
        "PASS": 2,
        "PARTIAL": 2,
        "FAIL": 0,
        "citations": 4,
        "valid_provenance": 4,
        "gold_paragraph_citations": 4,
        "direct_gold_span_citations": 4,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_section": {
        "PASS": 2,
        "PARTIAL": 2,
        "FAIL": 0,
        "citations": 4,
        "valid_provenance": 4,
        "gold_paragraph_citations": 4,
        "direct_gold_span_citations": 4,
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
    }
  },
  "checks": {
    "development_gate_passed": true,
    "fresh_section_supported_at_least_21": false,
    "fresh_section_constructed_all_pass": false,
    "provenance_intact": true,
    "no_false_acceptance_or_refusal": false
  },
  "gate": "FAIL",
  "regressions": {
    "fixed": [],
    "section": []
  }
}

## F01

How many awards has Doctor Who won?

**baseline: FAIL**

[1] Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

{
  "required_gold_groups": [
    [
      "over a hundred",
      "over a hundred",
      "over a hundred"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

{
  "required_gold_groups": [
    [
      "over a hundred",
      "over a hundred",
      "over a hundred"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

{
  "required_gold_groups": [
    [
      "over a hundred",
      "over a hundred",
      "over a hundred"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

{
  "required_gold_groups": [
    [
      "over a hundred",
      "over a hundred",
      "over a hundred"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

{
  "required_gold_groups": [
    [
      "over a hundred",
      "over a hundred",
      "over a hundred"
    ]
  ],
  "matched": [
    false
  ]
}

## F02

What Doctor Who episode won a Hugo Award in 2010?

**baseline: FAIL**

[1] # Doctor Who

## Context 1
It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Doctor Who
> 
> ## Context 1
> It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

{
  "required_gold_groups": [
    [
      "The Waters of Mars",
      "The Waters of Mars",
      "The Waters of Mars"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

{
  "required_gold_groups": [
    [
      "The Waters of Mars",
      "The Waters of Mars",
      "The Waters of Mars"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

{
  "required_gold_groups": [
    [
      "The Waters of Mars",
      "The Waters of Mars",
      "The Waters of Mars"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

{
  "required_gold_groups": [
    [
      "The Waters of Mars",
      "The Waters of Mars",
      "The Waters of Mars"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

{
  "required_gold_groups": [
    [
      "The Waters of Mars",
      "The Waters of Mars",
      "The Waters of Mars"
    ]
  ],
  "matched": [
    false
  ]
}

## F03

How many times has Doctor Who won the Hugo for Best Dramatic Presentation?

**baseline: FAIL**

[1] # Doctor Who

## Context 1
It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Doctor Who
> 
> ## Context 1
> It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

{
  "required_gold_groups": [
    [
      "six",
      "six",
      "six"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

**section: PASS**

[1] It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

**paired_fixed: PASS**

[1] It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

**paired_section: PASS**

[1] It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

## F04

What two Doctors does the War Doctor exist between?

**baseline: FAIL**

[1] Notably, in 2013, John Hurt guest-starred as a hitherto unknown incarnation of the Doctor known as the War Doctor in the run-up to the show's 50th anniversary special "The Day of the Doctor".

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Notably, in 2013, John Hurt guest-starred as a hitherto unknown incarnation of the Doctor known as the War Doctor in the run-up to the show's 50th anniversary special "The Day of the Doctor".

{
  "required_gold_groups": [
    [
      "McGann and Eccleston's Doctors",
      "McGann and Eccleston",
      "McGann and Eccleston's"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] Notably, in 2013, John Hurt guest-starred as a hitherto unknown incarnation of the Doctor known as the War Doctor in the run-up to the show's 50th anniversary special "The Day of the Doctor".

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Notably, in 2013, John Hurt guest-starred as a hitherto unknown incarnation of the Doctor known as the War Doctor in the run-up to the show's 50th anniversary special "The Day of the Doctor".

{
  "required_gold_groups": [
    [
      "McGann and Eccleston's Doctors",
      "McGann and Eccleston",
      "McGann and Eccleston's"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] Notably, in 2013, John Hurt guest-starred as a hitherto unknown incarnation of the Doctor known as the War Doctor in the run-up to the show's 50th anniversary special "The Day of the Doctor".

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Notably, in 2013, John Hurt guest-starred as a hitherto unknown incarnation of the Doctor known as the War Doctor in the run-up to the show's 50th anniversary special "The Day of the Doctor".

{
  "required_gold_groups": [
    [
      "McGann and Eccleston's Doctors",
      "McGann and Eccleston",
      "McGann and Eccleston's"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] Notably, in 2013, John Hurt guest-starred as a hitherto unknown incarnation of the Doctor known as the War Doctor in the run-up to the show's 50th anniversary special "The Day of the Doctor".

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Notably, in 2013, John Hurt guest-starred as a hitherto unknown incarnation of the Doctor known as the War Doctor in the run-up to the show's 50th anniversary special "The Day of the Doctor".

{
  "required_gold_groups": [
    [
      "McGann and Eccleston's Doctors",
      "McGann and Eccleston",
      "McGann and Eccleston's"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] Notably, in 2013, John Hurt guest-starred as a hitherto unknown incarnation of the Doctor known as the War Doctor in the run-up to the show's 50th anniversary special "The Day of the Doctor".

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Notably, in 2013, John Hurt guest-starred as a hitherto unknown incarnation of the Doctor known as the War Doctor in the run-up to the show's 50th anniversary special "The Day of the Doctor".

{
  "required_gold_groups": [
    [
      "McGann and Eccleston's Doctors",
      "McGann and Eccleston",
      "McGann and Eccleston's"
    ]
  ],
  "matched": [
    false
  ]
}

## F05

What actor played the Valeyard?

**baseline: PASS**

[1] Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

**fixed: PASS**

[1] Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

**section: PASS**

[1] Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

**paired_fixed: PASS**

[1] Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

**paired_section: PASS**

[1] Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

## F06

What was the name of the serial where the Valeyard appears?

**baseline: PASS**

[1] Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

**fixed: PASS**

[1] Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

**section: PASS**

[1] Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

**paired_fixed: PASS**

[1] Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

**paired_section: PASS**

[1] Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Another example is from the 1986 serial The Trial of a Time Lord, where Michael Jayston portrayed the Valeyard, who is described as an amalgamation of the darker sides of the Doctor's nature, somewhere between his twelfth and final incarnation.

## F07

How did Luther express the destruction?

**baseline: FAIL**

[1] # Martin Luther

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Martin Luther

{
  "required_gold_groups": [
    [
      "the devil's work",
      "devil's work",
      "devil's work,"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] # Martin Luther

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Martin Luther

{
  "required_gold_groups": [
    [
      "the devil's work",
      "devil's work",
      "devil's work,"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

{
  "required_gold_groups": [
    [
      "the devil's work",
      "devil's work",
      "devil's work,"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] # Martin Luther

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Martin Luther

{
  "required_gold_groups": [
    [
      "the devil's work",
      "devil's work",
      "devil's work,"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

{
  "required_gold_groups": [
    [
      "the devil's work",
      "devil's work",
      "devil's work,"
    ]
  ],
  "matched": [
    false
  ]
}

## F08

Who did Luther remind the peasants to obey?

**baseline: PASS**

[1] Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

**fixed: PASS**

[1] Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

**section: PASS**

[1] Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

**paired_fixed: PASS**

[1] Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

**paired_section: PASS**

[1] Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

## F09

Who did Luther call on to stop the revolt?

**baseline: FAIL**

[1] # Martin Luther

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Martin Luther

{
  "required_gold_groups": [
    [
      "the nobles",
      "nobles",
      "nobles"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] Citing Deuteronomy 13, wherein Moses commands the killing of idolaters and the burning of their cities and property as an offering to God, Luther called for a "scharfe Barmherzigkeit" ("sharp mercy") against the Jews "to see whether we might save at least a few from the glowing flames."

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> Citing Deuteronomy 13, wherein Moses commands the killing of idolaters and the burning of their cities and property as an offering to God, Luther called for a "scharfe Barmherzigkeit" ("sharp mercy") against the Jews "to see whether we might save at least a few from the glowing flames."

{
  "required_gold_groups": [
    [
      "the nobles",
      "nobles",
      "nobles"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] Citing Deuteronomy 13, wherein Moses commands the killing of idolaters and the burning of their cities and property as an offering to God, Luther called for a "scharfe Barmherzigkeit" ("sharp mercy") against the Jews "to see whether we might save at least a few from the glowing flames."

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> Citing Deuteronomy 13, wherein Moses commands the killing of idolaters and the burning of their cities and property as an offering to God, Luther called for a "scharfe Barmherzigkeit" ("sharp mercy") against the Jews "to see whether we might save at least a few from the glowing flames."

{
  "required_gold_groups": [
    [
      "the nobles",
      "nobles",
      "nobles"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] # Martin Luther

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Martin Luther

{
  "required_gold_groups": [
    [
      "the nobles",
      "nobles",
      "nobles"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] # Martin Luther

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Martin Luther

{
  "required_gold_groups": [
    [
      "the nobles",
      "nobles",
      "nobles"
    ]
  ],
  "matched": [
    false
  ]
}

## F10

When was the large work published?

**baseline: FAIL**

I can't find this in the provided documents.

{
  "required_gold_groups": [
    [
      "1543",
      "1543",
      "1543"
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
      "1543",
      "1543",
      "1543"
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
      "1543",
      "1543",
      "1543"
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
      "1543",
      "1543",
      "1543"
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
      "1543",
      "1543",
      "1543"
    ]
  ],
  "matched": [
    false
  ]
}

## F11

How near to his death was the work published?

**baseline: PASS**

[1] Luther's other major works on the Jews were his 60,000-word treatise Von den Juden und Ihren Lügen (On the Jews and Their Lies), and Vom Schem Hamphoras und vom Geschlecht Christi (On the Holy Name and the Lineage of Christ), both published in 1543, three years before his death.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther's other major works on the Jews were his 60,000-word treatise Von den Juden und Ihren Lügen (On the Jews and Their Lies), and Vom Schem Hamphoras und vom Geschlecht Christi (On the Holy Name and the Lineage of Christ), both published in 1543, three years before his death.

**fixed: PASS**

[1] Luther's other major works on the Jews were his 60,000-word treatise Von den Juden und Ihren Lügen (On the Jews and Their Lies), and Vom Schem Hamphoras und vom Geschlecht Christi (On the Holy Name and the Lineage of Christ), both published in 1543, three years before his death.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther's other major works on the Jews were his 60,000-word treatise Von den Juden und Ihren Lügen (On the Jews and Their Lies), and Vom Schem Hamphoras und vom Geschlecht Christi (On the Holy Name and the Lineage of Christ), both published in 1543, three years before his death.

**section: PASS**

[1] Luther's other major works on the Jews were his 60,000-word treatise Von den Juden und Ihren Lügen (On the Jews and Their Lies), and Vom Schem Hamphoras und vom Geschlecht Christi (On the Holy Name and the Lineage of Christ), both published in 1543, three years before his death.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther's other major works on the Jews were his 60,000-word treatise Von den Juden und Ihren Lügen (On the Jews and Their Lies), and Vom Schem Hamphoras und vom Geschlecht Christi (On the Holy Name and the Lineage of Christ), both published in 1543, three years before his death.

**paired_fixed: PASS**

[1] Luther's other major works on the Jews were his 60,000-word treatise Von den Juden und Ihren Lügen (On the Jews and Their Lies), and Vom Schem Hamphoras und vom Geschlecht Christi (On the Holy Name and the Lineage of Christ), both published in 1543, three years before his death.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther's other major works on the Jews were his 60,000-word treatise Von den Juden und Ihren Lügen (On the Jews and Their Lies), and Vom Schem Hamphoras und vom Geschlecht Christi (On the Holy Name and the Lineage of Christ), both published in 1543, three years before his death.

**paired_section: PASS**

[1] Luther's other major works on the Jews were his 60,000-word treatise Von den Juden und Ihren Lügen (On the Jews and Their Lies), and Vom Schem Hamphoras und vom Geschlecht Christi (On the Holy Name and the Lineage of Christ), both published in 1543, three years before his death.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther's other major works on the Jews were his 60,000-word treatise Von den Juden und Ihren Lügen (On the Jews and Their Lies), and Vom Schem Hamphoras und vom Geschlecht Christi (On the Holy Name and the Lineage of Christ), both published in 1543, three years before his death.

## F12

What did Luther contend the Jews to be?

**baseline: PASS**

[1] Luther argued that the Jews were no longer the chosen people but "the devil's people", and referred to them with violent, vile language.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther argued that the Jews were no longer the chosen people but "the devil's people", and referred to them with violent, vile language.

**fixed: PASS**

[1] Luther argued that the Jews were no longer the chosen people but "the devil's people", and referred to them with violent, vile language.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther argued that the Jews were no longer the chosen people but "the devil's people", and referred to them with violent, vile language.

**section: PASS**

[1] Luther argued that the Jews were no longer the chosen people but "the devil's people", and referred to them with violent, vile language.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther argued that the Jews were no longer the chosen people but "the devil's people", and referred to them with violent, vile language.

**paired_fixed: PASS**

[1] Luther argued that the Jews were no longer the chosen people but "the devil's people", and referred to them with violent, vile language.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther argued that the Jews were no longer the chosen people but "the devil's people", and referred to them with violent, vile language.

**paired_section: PASS**

[1] Luther argued that the Jews were no longer the chosen people but "the devil's people", and referred to them with violent, vile language.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther argued that the Jews were no longer the chosen people but "the devil's people", and referred to them with violent, vile language.

## F13

A non-deterministic Turing machine has the ability to capture what facet of useful analysis?

**baseline: PASS**

[1] The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

**fixed: PASS**

[1] The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

**section: PASS**

[1] The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

**paired_fixed: PASS**

[1] The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

**paired_section: PASS**

[1] The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

## F14

What type of Turing machine can be characterized by checking multiple possibilities at the same time?

**baseline: PASS**

[1] For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once.

**fixed: PASS**

[1] For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once.

**section: PASS**

[1] For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once.

**paired_fixed: PASS**

[1] For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once.

**paired_section: PASS**

[1] For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once.

## F15

What is the most critical resource in the analysis of computational problems associated with non-deterministic Turing machines?

**baseline: PASS**

[1] The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

**fixed: PASS**

[1] The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

**section: PASS**

[1] The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

**paired_fixed: PASS**

[1] The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

**paired_section: PASS**

[1] The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

## F16

What method is used to intuitively assess or quantify the amount of resources required to solve a computational problem?

**baseline: FAIL**

[1] ## Context 2
A problem is regarded as inherently difficult if its solution requires significant resources, whatever the algorithm used.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Context 2
> A problem is regarded as inherently difficult if its solution requires significant resources, whatever the algorithm used.

{
  "required_gold_groups": [
    [
      "mathematical models of computation",
      "mathematical models of computation",
      "mathematical models of computation"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] The theory formalizes this intuition, by introducing mathematical models of computation to study these problems and quantifying the amount of resources needed to solve them, such as time and storage.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The theory formalizes this intuition, by introducing mathematical models of computation to study these problems and quantifying the amount of resources needed to solve them, such as time and storage.

**section: PASS**

[1] The theory formalizes this intuition, by introducing mathematical models of computation to study these problems and quantifying the amount of resources needed to solve them, such as time and storage.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The theory formalizes this intuition, by introducing mathematical models of computation to study these problems and quantifying the amount of resources needed to solve them, such as time and storage.

**paired_fixed: PASS**

[1] The theory formalizes this intuition, by introducing mathematical models of computation to study these problems and quantifying the amount of resources needed to solve them, such as time and storage.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The theory formalizes this intuition, by introducing mathematical models of computation to study these problems and quantifying the amount of resources needed to solve them, such as time and storage.

**paired_section: PASS**

[1] The theory formalizes this intuition, by introducing mathematical models of computation to study these problems and quantifying the amount of resources needed to solve them, such as time and storage.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The theory formalizes this intuition, by introducing mathematical models of computation to study these problems and quantifying the amount of resources needed to solve them, such as time and storage.

## F17

What are two basic primary resources used to guage complexity?

**baseline: FAIL**

[1] A problem is regarded as inherently difficult if its solution requires significant resources, whatever the algorithm used.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> A problem is regarded as inherently difficult if its solution requires significant resources, whatever the algorithm used.

{
  "required_gold_groups": [
    [
      "time and storage",
      "time and storage",
      "time and storage"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] A problem is regarded as inherently difficult if its solution requires significant resources, whatever the algorithm used.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> A problem is regarded as inherently difficult if its solution requires significant resources, whatever the algorithm used.

{
  "required_gold_groups": [
    [
      "time and storage",
      "time and storage",
      "time and storage"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] A problem is regarded as inherently difficult if its solution requires significant resources, whatever the algorithm used.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> A problem is regarded as inherently difficult if its solution requires significant resources, whatever the algorithm used.

{
  "required_gold_groups": [
    [
      "time and storage",
      "time and storage",
      "time and storage"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] A problem is regarded as inherently difficult if its solution requires significant resources, whatever the algorithm used.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> A problem is regarded as inherently difficult if its solution requires significant resources, whatever the algorithm used.

{
  "required_gold_groups": [
    [
      "time and storage",
      "time and storage",
      "time and storage"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] A problem is regarded as inherently difficult if its solution requires significant resources, whatever the algorithm used.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> A problem is regarded as inherently difficult if its solution requires significant resources, whatever the algorithm used.

{
  "required_gold_groups": [
    [
      "time and storage",
      "time and storage",
      "time and storage"
    ]
  ],
  "matched": [
    false
  ]
}

## F18

What practical role does defining the complexity of problems play in everyday computing?

**baseline: PASS**

[1] One of the roles of computational complexity theory is to determine the practical limits on what computers can and cannot do.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> One of the roles of computational complexity theory is to determine the practical limits on what computers can and cannot do.

**fixed: PASS**

[1] One of the roles of computational complexity theory is to determine the practical limits on what computers can and cannot do.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> One of the roles of computational complexity theory is to determine the practical limits on what computers can and cannot do.

**section: PASS**

[1] One of the roles of computational complexity theory is to determine the practical limits on what computers can and cannot do.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> One of the roles of computational complexity theory is to determine the practical limits on what computers can and cannot do.

**paired_fixed: PASS**

[1] One of the roles of computational complexity theory is to determine the practical limits on what computers can and cannot do.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> One of the roles of computational complexity theory is to determine the practical limits on what computers can and cannot do.

**paired_section: PASS**

[1] One of the roles of computational complexity theory is to determine the practical limits on what computers can and cannot do.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> One of the roles of computational complexity theory is to determine the practical limits on what computers can and cannot do.

## F19

Who assisted Wesley with ordaining Whatcoat and Vasey as presbyters?

**baseline: FAIL**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

{
  "required_gold_groups": [
    [
      "Dr. Thomas Coke",
      "Dr. Thomas Coke",
      "Dr. Thomas Coke"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

{
  "required_gold_groups": [
    [
      "Dr. Thomas Coke",
      "Dr. Thomas Coke",
      "Dr. Thomas Coke"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

{
  "required_gold_groups": [
    [
      "Dr. Thomas Coke",
      "Dr. Thomas Coke",
      "Dr. Thomas Coke"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

{
  "required_gold_groups": [
    [
      "Dr. Thomas Coke",
      "Dr. Thomas Coke",
      "Dr. Thomas Coke"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

{
  "required_gold_groups": [
    [
      "Dr. Thomas Coke",
      "Dr. Thomas Coke",
      "Dr. Thomas Coke"
    ]
  ],
  "matched": [
    false
  ]
}

## F20

Who were the two lay preachers that Wesley ordained as presbyters?

**baseline: PASS**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

**fixed: PASS**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

**section: PASS**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

**paired_fixed: PASS**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

**paired_section: PASS**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

## F21

Why was Wesley compelled to break with standard practice and ordain two of his lay preachers as presbyters?

**baseline: PASS**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

**fixed: PASS**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

**section: PASS**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

**paired_fixed: PASS**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

**paired_section: PASS**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

## F22

What is the governing committee  that voted in favor of a proposal that would permit ministers to officiate same-sex weddings?

**baseline: PASS**

[1] For example, the Connectional Table, a governing committee, has voted in favor of a proposal that calls for a localized option, which would permit ministers to officiate same-sex weddings, and it would allow conferences to ordain gay clergy.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> For example, the Connectional Table, a governing committee, has voted in favor of a proposal that calls for a localized option, which would permit ministers to officiate same-sex weddings, and it would allow conferences to ordain gay clergy.

**fixed: PASS**

[1] For example, the Connectional Table, a governing committee, has voted in favor of a proposal that calls for a localized option, which would permit ministers to officiate same-sex weddings, and it would allow conferences to ordain gay clergy.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> For example, the Connectional Table, a governing committee, has voted in favor of a proposal that calls for a localized option, which would permit ministers to officiate same-sex weddings, and it would allow conferences to ordain gay clergy.

**section: PASS**

[1] For example, the Connectional Table, a governing committee, has voted in favor of a proposal that calls for a localized option, which would permit ministers to officiate same-sex weddings, and it would allow conferences to ordain gay clergy.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> For example, the Connectional Table, a governing committee, has voted in favor of a proposal that calls for a localized option, which would permit ministers to officiate same-sex weddings, and it would allow conferences to ordain gay clergy.

**paired_fixed: PASS**

[1] For example, the Connectional Table, a governing committee, has voted in favor of a proposal that calls for a localized option, which would permit ministers to officiate same-sex weddings, and it would allow conferences to ordain gay clergy.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> For example, the Connectional Table, a governing committee, has voted in favor of a proposal that calls for a localized option, which would permit ministers to officiate same-sex weddings, and it would allow conferences to ordain gay clergy.

**paired_section: PASS**

[1] For example, the Connectional Table, a governing committee, has voted in favor of a proposal that calls for a localized option, which would permit ministers to officiate same-sex weddings, and it would allow conferences to ordain gay clergy.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> For example, the Connectional Table, a governing committee, has voted in favor of a proposal that calls for a localized option, which would permit ministers to officiate same-sex weddings, and it would allow conferences to ordain gay clergy.

## F23

Many conferences have taking a position by voting in favor of what?

**baseline: PASS**

[1] Moreover, many conferences have taken a position by voting in favor of same-gender marriages with resolutions.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Moreover, many conferences have taken a position by voting in favor of same-gender marriages with resolutions.

**fixed: PASS**

[1] Moreover, many conferences have taken a position by voting in favor of same-gender marriages with resolutions.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Moreover, many conferences have taken a position by voting in favor of same-gender marriages with resolutions.

**section: PASS**

[1] Moreover, many conferences have taken a position by voting in favor of same-gender marriages with resolutions.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Moreover, many conferences have taken a position by voting in favor of same-gender marriages with resolutions.

**paired_fixed: PASS**

[1] Moreover, many conferences have taken a position by voting in favor of same-gender marriages with resolutions.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Moreover, many conferences have taken a position by voting in favor of same-gender marriages with resolutions.

**paired_section: PASS**

[1] Moreover, many conferences have taken a position by voting in favor of same-gender marriages with resolutions.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Moreover, many conferences have taken a position by voting in favor of same-gender marriages with resolutions.

## F24

Many organizations have recently called for broader acceptance of which community?

**baseline: PASS**

[1] Additionally, many organizations, conferences, and congregations have recently called for broader acceptance of the LGBT community within the UMC.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Additionally, many organizations, conferences, and congregations have recently called for broader acceptance of the LGBT community within the UMC.

**fixed: PASS**

[1] Additionally, many organizations, conferences, and congregations have recently called for broader acceptance of the LGBT community within the UMC.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Additionally, many organizations, conferences, and congregations have recently called for broader acceptance of the LGBT community within the UMC.

**section: PASS**

[1] Additionally, many organizations, conferences, and congregations have recently called for broader acceptance of the LGBT community within the UMC.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Additionally, many organizations, conferences, and congregations have recently called for broader acceptance of the LGBT community within the UMC.

**paired_fixed: PASS**

[1] Additionally, many organizations, conferences, and congregations have recently called for broader acceptance of the LGBT community within the UMC.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Additionally, many organizations, conferences, and congregations have recently called for broader acceptance of the LGBT community within the UMC.

**paired_section: PASS**

[1] Additionally, many organizations, conferences, and congregations have recently called for broader acceptance of the LGBT community within the UMC.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Additionally, many organizations, conferences, and congregations have recently called for broader acceptance of the LGBT community within the UMC.

## C01

How many awards has Doctor Who won? Also, What Doctor Who episode won a Hugo Award in 2010?

**baseline: FAIL**

[1] # Doctor Who

## Context 1
It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Doctor Who
> 
> ## Context 1
> It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014).

{
  "required_gold_groups": [
    [
      "over a hundred",
      "over a hundred",
      "over a hundred"
    ],
    [
      "The Waters of Mars",
      "The Waters of Mars",
      "The Waters of Mars"
    ]
  ],
  "matched": [
    false,
    false
  ]
}

**fixed: PARTIAL**

[1] It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014). The winning episodes were "The Empty Child"/"The Doctor Dances" (2006), "The Girl in the Fireplace" (2007), "Blink" (2008), "The Waters of Mars" (2010), "The Pandorica Opens"/"The Big Bang" (2011), and "The Doctor's Wife" (2012). Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014). The winning episodes were "The Empty Child"/"The Doctor Dances" (2006), "The Girl in the Fireplace" (2007), "Blink" (2008), "The Waters of Mars" (2010), "The Pandorica Opens"/"The Big Bang" (2011), and "The Doctor's Wife" (2012). Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

{
  "required_gold_groups": [
    [
      "over a hundred",
      "over a hundred",
      "over a hundred"
    ],
    [
      "The Waters of Mars",
      "The Waters of Mars",
      "The Waters of Mars"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**section: PARTIAL**

[1] It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014). The winning episodes were "The Empty Child"/"The Doctor Dances" (2006), "The Girl in the Fireplace" (2007), "Blink" (2008), "The Waters of Mars" (2010), "The Pandorica Opens"/"The Big Bang" (2011), and "The Doctor's Wife" (2012). Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014). The winning episodes were "The Empty Child"/"The Doctor Dances" (2006), "The Girl in the Fireplace" (2007), "Blink" (2008), "The Waters of Mars" (2010), "The Pandorica Opens"/"The Big Bang" (2011), and "The Doctor's Wife" (2012). Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

{
  "required_gold_groups": [
    [
      "over a hundred",
      "over a hundred",
      "over a hundred"
    ],
    [
      "The Waters of Mars",
      "The Waters of Mars",
      "The Waters of Mars"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**paired_fixed: PARTIAL**

[1] It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014). The winning episodes were "The Empty Child"/"The Doctor Dances" (2006), "The Girl in the Fireplace" (2007), "Blink" (2008), "The Waters of Mars" (2010), "The Pandorica Opens"/"The Big Bang" (2011), and "The Doctor's Wife" (2012). Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014). The winning episodes were "The Empty Child"/"The Doctor Dances" (2006), "The Girl in the Fireplace" (2007), "Blink" (2008), "The Waters of Mars" (2010), "The Pandorica Opens"/"The Big Bang" (2011), and "The Doctor's Wife" (2012). Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

{
  "required_gold_groups": [
    [
      "over a hundred",
      "over a hundred",
      "over a hundred"
    ],
    [
      "The Waters of Mars",
      "The Waters of Mars",
      "The Waters of Mars"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**paired_section: PARTIAL**

[1] It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014). The winning episodes were "The Empty Child"/"The Doctor Dances" (2006), "The Girl in the Fireplace" (2007), "Blink" (2008), "The Waters of Mars" (2010), "The Pandorica Opens"/"The Big Bang" (2011), and "The Doctor's Wife" (2012). Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

Source: 01_Doctor_Who.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> It has won the Short Form of the Hugo Award for Best Dramatic Presentation, the oldest science fiction/fantasy award for films and series, six times (every year since 2006, except for 2009, 2013 and 2014). The winning episodes were "The Empty Child"/"The Doctor Dances" (2006), "The Girl in the Fireplace" (2007), "Blink" (2008), "The Waters of Mars" (2010), "The Pandorica Opens"/"The Big Bang" (2011), and "The Doctor's Wife" (2012). Doctor Who star Matt Smith won Best Actor in the 2012 National Television awards alongside Karen Gillan who won Best Actress.

{
  "required_gold_groups": [
    [
      "over a hundred",
      "over a hundred",
      "over a hundred"
    ],
    [
      "The Waters of Mars",
      "The Waters of Mars",
      "The Waters of Mars"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

## C02

How did Luther express the destruction? Also, Who did Luther remind the peasants to obey?

**baseline: PARTIAL**

[1] Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

{
  "required_gold_groups": [
    [
      "the devil's work",
      "devil's work",
      "devil's work,"
    ],
    [
      "temporal authorities",
      "temporal authorities",
      "temporal authorities"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**fixed: PARTIAL**

[1] Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

{
  "required_gold_groups": [
    [
      "the devil's work",
      "devil's work",
      "devil's work,"
    ],
    [
      "temporal authorities",
      "temporal authorities",
      "temporal authorities"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**section: PARTIAL**

[1] Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

{
  "required_gold_groups": [
    [
      "the devil's work",
      "devil's work",
      "devil's work,"
    ],
    [
      "temporal authorities",
      "temporal authorities",
      "temporal authorities"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**paired_fixed: PARTIAL**

[1] Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

{
  "required_gold_groups": [
    [
      "the devil's work",
      "devil's work",
      "devil's work,"
    ],
    [
      "temporal authorities",
      "temporal authorities",
      "temporal authorities"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**paired_section: PARTIAL**

[1] Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

Source: 02_Martin_Luther.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Luther sympathised with some of the peasants' grievances, as he showed in his response to the Twelve Articles in May 1525, but he reminded the aggrieved to obey the temporal authorities.

{
  "required_gold_groups": [
    [
      "the devil's work",
      "devil's work",
      "devil's work,"
    ],
    [
      "temporal authorities",
      "temporal authorities",
      "temporal authorities"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

## C03

A non-deterministic Turing machine has the ability to capture what facet of useful analysis? Also, What type of Turing machine can be characterized by checking multiple possibilities at the same time?

**baseline: PASS**

[1] The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

**fixed: PASS**

[1] For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once. The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once. The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

**section: PASS**

[1] For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once. The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once. The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

**paired_fixed: PASS**

[1] For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once. The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once. The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

**paired_section: PASS**

[1] For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once. The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

Source: 03_Computational_complexity_theory.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> For example, a non-deterministic Turing machine is a computational model that is allowed to branch out to check many different possibilities at once. The non-deterministic Turing machine has very little to do with how we physically want to compute algorithms, but its branching exactly captures many of the mathematical models we want to analyze, so that non-deterministic time is a very important resource in analyzing computational problems.

## C04

Who assisted Wesley with ordaining Whatcoat and Vasey as presbyters? Also, Who were the two lay preachers that Wesley ordained as presbyters?

**baseline: PARTIAL**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat.

{
  "required_gold_groups": [
    [
      "Dr. Thomas Coke",
      "Dr. Thomas Coke",
      "Dr. Thomas Coke"
    ],
    [
      "Thomas Vasey and Richard Whatcoat.",
      "Thomas Vasey and Richard Whatcoat",
      "Thomas Vasey and Richard Whatcoat"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**fixed: PASS**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat. Dr. Thomas Coke, already an Anglican priest, assisted Wesley in this action.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat. Dr. Thomas Coke, already an Anglican priest, assisted Wesley in this action.

**section: PASS**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat. Dr. Thomas Coke, already an Anglican priest, assisted Wesley in this action.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat. Dr. Thomas Coke, already an Anglican priest, assisted Wesley in this action.

**paired_fixed: PASS**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat. Dr. Thomas Coke, already an Anglican priest, assisted Wesley in this action.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat. Dr. Thomas Coke, already an Anglican priest, assisted Wesley in this action.

**paired_section: PASS**

[1] As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat. Dr. Thomas Coke, already an Anglican priest, assisted Wesley in this action.

Source: 04_United_Methodist_Church.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> As a result of the American Revolution, John Wesley was compelled in 1784 to break with standard practice and ordain two of his lay preachers as presbyters, Thomas Vasey and Richard Whatcoat. Dr. Thomas Coke, already an Anglican priest, assisted Wesley in this action.

## U01

What is the exact database password used by Doctor Who?

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

What is the bank account number associated with Martin Luther?

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

What is the date of birth of the fictional coordinator Neris Quill for Computational complexity theory?

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

What is the current Bitcoin price in AED in the United Methodist Church documents?

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
