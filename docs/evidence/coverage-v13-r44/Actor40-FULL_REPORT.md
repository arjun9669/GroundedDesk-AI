# V13 prospective Actor40 — actual MiniLM

24 original externally authored supported questions; four constructed compound controls; four standard and eight actor/object/site unsupported controls. Frozen before answers. Not sealed independent accuracy, official SQuAD scoring or representative accuracy; prior public/model exposure cannot be excluded. Gold-paragraph precision is a location proxy, not semantic support. Same-session v12/v13 use identical real vectors. Production remains r44; a gate PASS permits review only.

{
  "summary": {
    "baseline": {
      "PASS": 21,
      "PARTIAL": 2,
      "FAIL": 17,
      "citations": 37,
      "valid_provenance": 37,
      "gold_paragraph_citations": 24,
      "direct_gold_span_citations": 19,
      "false_acceptances": 8,
      "false_refusals": 0,
      "uncited_refusals": 4
    },
    "fixed": {
      "PASS": 28,
      "PARTIAL": 2,
      "FAIL": 10,
      "citations": 39,
      "valid_provenance": 39,
      "gold_paragraph_citations": 31,
      "direct_gold_span_citations": 28,
      "false_acceptances": 8,
      "false_refusals": 0,
      "uncited_refusals": 4
    },
    "section": {
      "PASS": 28,
      "PARTIAL": 2,
      "FAIL": 10,
      "citations": 39,
      "valid_provenance": 39,
      "gold_paragraph_citations": 31,
      "direct_gold_span_citations": 28,
      "false_acceptances": 8,
      "false_refusals": 0,
      "uncited_refusals": 4
    },
    "paired_fixed": {
      "PASS": 28,
      "PARTIAL": 2,
      "FAIL": 10,
      "citations": 39,
      "valid_provenance": 39,
      "gold_paragraph_citations": 31,
      "direct_gold_span_citations": 28,
      "false_acceptances": 8,
      "false_refusals": 0,
      "uncited_refusals": 4
    },
    "paired_section": {
      "PASS": 28,
      "PARTIAL": 2,
      "FAIL": 10,
      "citations": 39,
      "valid_provenance": 39,
      "gold_paragraph_citations": 31,
      "direct_gold_span_citations": 28,
      "false_acceptances": 8,
      "false_refusals": 0,
      "uncited_refusals": 4
    }
  },
  "categories": {
    "externally_authored_supported": {
      "baseline": {
        "PASS": 16,
        "PARTIAL": 0,
        "FAIL": 8,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 21,
        "direct_gold_span_citations": 16,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "fixed": {
        "PASS": 22,
        "PARTIAL": 0,
        "FAIL": 2,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 24,
        "direct_gold_span_citations": 22,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "section": {
        "PASS": 22,
        "PARTIAL": 0,
        "FAIL": 2,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 24,
        "direct_gold_span_citations": 22,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_fixed": {
        "PASS": 22,
        "PARTIAL": 0,
        "FAIL": 2,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 24,
        "direct_gold_span_citations": 22,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_section": {
        "PASS": 22,
        "PARTIAL": 0,
        "FAIL": 2,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 24,
        "direct_gold_span_citations": 22,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
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
        "citations": 7,
        "valid_provenance": 7,
        "gold_paragraph_citations": 7,
        "direct_gold_span_citations": 6,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "section": {
        "PASS": 2,
        "PARTIAL": 2,
        "FAIL": 0,
        "citations": 7,
        "valid_provenance": 7,
        "gold_paragraph_citations": 7,
        "direct_gold_span_citations": 6,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_fixed": {
        "PASS": 2,
        "PARTIAL": 2,
        "FAIL": 0,
        "citations": 7,
        "valid_provenance": 7,
        "gold_paragraph_citations": 7,
        "direct_gold_span_citations": 6,
        "false_acceptances": 0,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "paired_section": {
        "PASS": 2,
        "PARTIAL": 2,
        "FAIL": 0,
        "citations": 7,
        "valid_provenance": 7,
        "gold_paragraph_citations": 7,
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
        "citations": 9,
        "valid_provenance": 9,
        "gold_paragraph_citations": 0,
        "direct_gold_span_citations": 0,
        "false_acceptances": 8,
        "false_refusals": 0,
        "uncited_refusals": 0
      },
      "fixed": {
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
      "section": {
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
      "paired_fixed": {
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
      "paired_section": {
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
      }
    }
  },
  "checks": {
    "development_gate_passed": true,
    "fixed_supported_at_least_21": true,
    "fixed_compounds_all_pass": false,
    "fixed_unsupported_all_pass": false,
    "fixed_provenance_intact": true,
    "fixed_no_false_acceptance_or_refusal": false,
    "fixed_no_production_or_prior_section_pass_loss": true,
    "section_supported_at_least_21": true,
    "section_compounds_all_pass": false,
    "section_unsupported_all_pass": false,
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

What school was Walter Camp a captain for the football team?

**baseline: PASS**

[1] Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game.

**fixed: PASS**

[1] Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

**section: PASS**

[1] Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

**paired_fixed: PASS**

[1] Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

**paired_section: PASS**

[1] Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

## F02

What was the first year that Yale and Harvard played football?

**baseline: FAIL**

[1] While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played.

{
  "required_gold_groups": [
    [
      "1875",
      "1875",
      "1875"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

{
  "required_gold_groups": [
    [
      "1875",
      "1875",
      "1875"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

{
  "required_gold_groups": [
    [
      "1875",
      "1875",
      "1875"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

{
  "required_gold_groups": [
    [
      "1875",
      "1875",
      "1875"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

{
  "required_gold_groups": [
    [
      "1875",
      "1875",
      "1875"
    ]
  ],
  "matched": [
    false
  ]
}

## F03

In what year was a set of significant rule changes introduced including the forward pass?

**baseline: FAIL**

[1] These included legalizing the forward pass, perhaps the most significant rule change in the sport's history.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> These included legalizing the forward pass, perhaps the most significant rule change in the sport's history.

{
  "required_gold_groups": [
    [
      "1906",
      "1906",
      "1906"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] So, other steps had to be taken. Camp would instead support revolutionary new rules for the 1906 season. These included legalizing the forward pass, perhaps the most significant rule change in the sport's history.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> So, other steps had to be taken. Camp would instead support revolutionary new rules for the 1906 season. These included legalizing the forward pass, perhaps the most significant rule change in the sport's history.

**section: PASS**

[1] So, other steps had to be taken. Camp would instead support revolutionary new rules for the 1906 season. These included legalizing the forward pass, perhaps the most significant rule change in the sport's history.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> So, other steps had to be taken. Camp would instead support revolutionary new rules for the 1906 season. These included legalizing the forward pass, perhaps the most significant rule change in the sport's history.

**paired_fixed: PASS**

[1] So, other steps had to be taken. Camp would instead support revolutionary new rules for the 1906 season. These included legalizing the forward pass, perhaps the most significant rule change in the sport's history.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> So, other steps had to be taken. Camp would instead support revolutionary new rules for the 1906 season. These included legalizing the forward pass, perhaps the most significant rule change in the sport's history.

**paired_section: PASS**

[1] So, other steps had to be taken. Camp would instead support revolutionary new rules for the 1906 season. These included legalizing the forward pass, perhaps the most significant rule change in the sport's history.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> So, other steps had to be taken. Camp would instead support revolutionary new rules for the 1906 season. These included legalizing the forward pass, perhaps the most significant rule change in the sport's history.

## F04

What additional benefits are there to surrounding community of expansion?

**baseline: PASS**

[1] The institution asserts that such expansion will benefit not only the school, but surrounding community, pointing to such features as the enhanced transit infrastructure, possible shuttles open to the public, and park space which will also be publicly accessible.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The institution asserts that such expansion will benefit not only the school, but surrounding community, pointing to such features as the enhanced transit infrastructure, possible shuttles open to the public, and park space which will also be publicly accessible.

**fixed: PASS**

[1] Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus. The institution asserts that such expansion will benefit not only the school, but surrounding community, pointing to such features as the enhanced transit infrastructure, possible shuttles open to the public, and park space which will also be publicly accessible.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus. The institution asserts that such expansion will benefit not only the school, but surrounding community, pointing to such features as the enhanced transit infrastructure, possible shuttles open to the public, and park space which will also be publicly accessible.

**section: PASS**

[1] Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus. The institution asserts that such expansion will benefit not only the school, but surrounding community, pointing to such features as the enhanced transit infrastructure, possible shuttles open to the public, and park space which will also be publicly accessible.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus. The institution asserts that such expansion will benefit not only the school, but surrounding community, pointing to such features as the enhanced transit infrastructure, possible shuttles open to the public, and park space which will also be publicly accessible.

**paired_fixed: PASS**

[1] Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus. The institution asserts that such expansion will benefit not only the school, but surrounding community, pointing to such features as the enhanced transit infrastructure, possible shuttles open to the public, and park space which will also be publicly accessible.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus. The institution asserts that such expansion will benefit not only the school, but surrounding community, pointing to such features as the enhanced transit infrastructure, possible shuttles open to the public, and park space which will also be publicly accessible.

**paired_section: PASS**

[1] Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus. The institution asserts that such expansion will benefit not only the school, but surrounding community, pointing to such features as the enhanced transit infrastructure, possible shuttles open to the public, and park space which will also be publicly accessible.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus. The institution asserts that such expansion will benefit not only the school, but surrounding community, pointing to such features as the enhanced transit infrastructure, possible shuttles open to the public, and park space which will also be publicly accessible.

## F05

What are some proposals to connect campuses?

**baseline: PASS**

[1] Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram.

**fixed: PASS**

[1] The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

**section: PASS**

[1] The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

**paired_fixed: PASS**

[1] The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

**paired_section: PASS**

[1] The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

## F06

How much more land does the school own in Allston than Cambridge?

**baseline: PASS**

[1] The university now owns approximately fifty percent more land in Allston than in Cambridge.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The university now owns approximately fifty percent more land in Allston than in Cambridge.

**fixed: PASS**

[1] The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

**section: PASS**

[1] The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

**paired_fixed: PASS**

[1] The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

**paired_section: PASS**

[1] The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The university now owns approximately fifty percent more land in Allston than in Cambridge. Proposals to connect the Cambridge campus with the new Allston campus include new and enlarged bridges, a shuttle service and/or a tram. Plans also call for sinking part of Storrow Drive (at Harvard's expense) for replacement with park land and pedestrian access to the Charles River, as well as the construction of bike paths, and buildings throughout the Allston campus.

## F07

What is the logic behind the cicadas prime number evolutionary strategy?

**baseline: FAIL**

[1] # Prime number

## Context 1
The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Prime number
> 
> ## Context 1
> The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

{
  "required_gold_groups": [
    [
      "make it very difficult for predators to evolve that could specialize as predators",
      "difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: FAIL**

[1] The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

{
  "required_gold_groups": [
    [
      "make it very difficult for predators to evolve that could specialize as predators",
      "difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve"
    ]
  ],
  "matched": [
    false
  ]
}

**section: FAIL**

[1] The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

{
  "required_gold_groups": [
    [
      "make it very difficult for predators to evolve that could specialize as predators",
      "difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_fixed: FAIL**

[1] The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

{
  "required_gold_groups": [
    [
      "make it very difficult for predators to evolve that could specialize as predators",
      "difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve"
    ]
  ],
  "matched": [
    false
  ]
}

**paired_section: FAIL**

[1] The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

{
  "required_gold_groups": [
    [
      "make it very difficult for predators to evolve that could specialize as predators",
      "difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve"
    ]
  ],
  "matched": [
    false
  ]
}

## F08

Other than 7 and 13, what other year interval do cicadas pupate? 

**baseline: PASS**

[1] Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

**fixed: PASS**

[1] Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

**section: PASS**

[1] Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

**paired_fixed: PASS**

[1] Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

**paired_section: PASS**

[1] Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

## F09

How much larger would cicada predator populations be if cicada outbreaks occurred at 14 and 15 year intervals?

**baseline: PASS**

[1] Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

**fixed: PASS**

[1] Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

**section: PASS**

[1] Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

**paired_fixed: PASS**

[1] Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

**paired_section: PASS**

[1] Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

## F10

What is another piece created by Olivier Messiaen?

**baseline: FAIL**

[1] The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena".

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena".

{
  "required_gold_groups": [
    [
      "Quatre études de rythme",
      "Quatre études de rythme",
      "Quatre études de rythme",
      "Quatre études de rythme"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

**section: PASS**

[1] Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

**paired_fixed: PASS**

[1] Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

**paired_section: PASS**

[1] Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

## F11

In which etude of Neumes rythmiques do the primes 41, 43, 47 and 53 appear in?

**baseline: PASS**

[1] In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques".

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques".

**fixed: PASS**

[1] Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

**section: PASS**

[1] Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

**paired_fixed: PASS**

[1] Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

**paired_section: PASS**

[1] Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

## F12

What is one work by Olivier Messiaen?

**baseline: FAIL**

[1] The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena".

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena".

{
  "required_gold_groups": [
    [
      "La Nativité du Seigneur",
      "La Nativité du Seigneur",
      "La Nativité du Seigneur",
      "La Nativité du Seigneur"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

**section: PASS**

[1] Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

**paired_fixed: PASS**

[1] Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

**paired_section: PASS**

[1] Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Prime numbers have influenced many artists and writers. The French composer Olivier Messiaen used prime numbers to create ametrical music through "natural phenomena". In works such as La Nativité du Seigneur (1935) and Quatre études de rythme (1949–50), he simultaneously employs motifs with lengths given by different prime numbers to create unpredictable rhythms: the primes 41, 43, 47 and 53 appear in the third étude, "Neumes rythmiques". According to Messiaen this way of composing was "inspired by the movements of nature, movements of free and unequal durations".

## F13

Within the 30 days how many digiboxes had been sold?

**baseline: PASS**

[1] Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

**fixed: PASS**

[1] Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

**section: PASS**

[1] Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

**paired_fixed: PASS**

[1] Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

**paired_section: PASS**

[1] Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

## F14

Who did BSkyB compete with initially?

**baseline: PASS**

[1] now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

**fixed: PASS**

[1] Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

**section: PASS**

[1] Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

**paired_fixed: PASS**

[1] Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

**paired_section: PASS**

[1] Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

## F15

When was BSkyB's digital service launched?

**baseline: FAIL**

[1] # Sky (United Kingdom)

## Context 1
BSkyB's digital service was officially launched on 1 October 1998 under the name Sky Digital, although small-scale tests were carried out before then.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Sky (United Kingdom)
> 
> ## Context 1
> BSkyB's digital service was officially launched on 1 October 1998 under the name Sky Digital, although small-scale tests were carried out before then.

{
  "required_gold_groups": [
    [
      "1 October 1998",
      "1 October 1998",
      "1 October 1998"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] BSkyB's digital service was officially launched on 1 October 1998 under the name Sky Digital, although small-scale tests were carried out before then.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> BSkyB's digital service was officially launched on 1 October 1998 under the name Sky Digital, although small-scale tests were carried out before then.

**section: PASS**

[1] BSkyB's digital service was officially launched on 1 October 1998 under the name Sky Digital, although small-scale tests were carried out before then.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> BSkyB's digital service was officially launched on 1 October 1998 under the name Sky Digital, although small-scale tests were carried out before then.

**paired_fixed: PASS**

[1] BSkyB's digital service was officially launched on 1 October 1998 under the name Sky Digital, although small-scale tests were carried out before then.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> BSkyB's digital service was officially launched on 1 October 1998 under the name Sky Digital, although small-scale tests were carried out before then.

**paired_section: PASS**

[1] BSkyB's digital service was officially launched on 1 October 1998 under the name Sky Digital, although small-scale tests were carried out before then.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> BSkyB's digital service was officially launched on 1 October 1998 under the name Sky Digital, although small-scale tests were carried out before then.

## F16

Who does BSkyB have an operating license from?

**baseline: PASS**

[1] BSkyB has no veto over the presence of channels on their EPG, with open access being an enforced part of their operating licence from Ofcom.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> BSkyB has no veto over the presence of channels on their EPG, with open access being an enforced part of their operating licence from Ofcom.

**fixed: PASS**

[1] BSkyB has no veto over the presence of channels on their EPG, with open access being an enforced part of their operating licence from Ofcom. Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> BSkyB has no veto over the presence of channels on their EPG, with open access being an enforced part of their operating licence from Ofcom. Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried.

**section: PASS**

[1] BSkyB has no veto over the presence of channels on their EPG, with open access being an enforced part of their operating licence from Ofcom. Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> BSkyB has no veto over the presence of channels on their EPG, with open access being an enforced part of their operating licence from Ofcom. Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried.

**paired_fixed: PASS**

[1] BSkyB has no veto over the presence of channels on their EPG, with open access being an enforced part of their operating licence from Ofcom. Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> BSkyB has no veto over the presence of channels on their EPG, with open access being an enforced part of their operating licence from Ofcom. Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried.

**paired_section: PASS**

[1] BSkyB has no veto over the presence of channels on their EPG, with open access being an enforced part of their operating licence from Ofcom. Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> BSkyB has no veto over the presence of channels on their EPG, with open access being an enforced part of their operating licence from Ofcom. Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried.

## F17

what is the fee range for accessing BSkyB's EPG?

**baseline: PASS**

[1] Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000.

**fixed: PASS**

[1] Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

**section: PASS**

[1] Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

**paired_fixed: PASS**

[1] Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

**paired_section: PASS**

[1] Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

## F18

Does BSkyB carry any control over the picture quality of a channel?

**baseline: PASS**

[1] However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

**fixed: PASS**

[1] Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

**section: PASS**

[1] Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

**paired_fixed: PASS**

[1] Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

**paired_section: PASS**

[1] Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Any channel which can get carriage on a suitable beam of a satellite at 28° East is entitled to access to BSkyB's EPG for a fee, ranging from £15–100,000. Third-party channels which opt for encryption receive discounts ranging from reduced price to free EPG entries, free carriage on a BSkyB leased transponder, or actual payment for being carried. However, even in this case, BSkyB does not carry any control over the channel's content or carriage issues such as picture quality.

## F19

What does NADPH store?

**baseline: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water.

**fixed: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

**section: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

**paired_fixed: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

**paired_section: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

## F20

What is the primary purpose of chloroplasts?

**baseline: FAIL**

[1] # Chloroplast

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Chloroplast

{
  "required_gold_groups": [
    [
      "to conduct photosynthesis",
      "conduct photosynthesis",
      "conduct photosynthesis"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

**section: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

**paired_fixed: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

**paired_section: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

## F21

How many chloroplasts per cell does algae have?

**baseline: PASS**

[1] The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

**fixed: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

**section: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

**paired_fixed: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

**paired_section: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

## F22

How large are granal thylakoids?

**baseline: FAIL**

[1] are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma.

{
  "required_gold_groups": [
    [
      "about 300–600 nanometers in diameter",
      "300–600 nanometers",
      "300–600 nanometers in diameter"
    ]
  ],
  "matched": [
    false
  ]
}

**fixed: PASS**

[1] There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

**section: PASS**

[1] There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

**paired_fixed: PASS**

[1] There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

**paired_section: PASS**

[1] There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

## F23

How many types of thylakoids are there?

**baseline: PASS**

[1] are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma.

**fixed: PASS**

[1] There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

**section: PASS**

[1] There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

**paired_fixed: PASS**

[1] There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

**paired_section: PASS**

[1] There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

## F24

What distinguishes stromal thylakoids?

**baseline: PASS**

[1] are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma.

**fixed: PASS**

[1] There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

**section: PASS**

[1] There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

**paired_fixed: PASS**

[1] There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

**paired_section: PASS**

[1] There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> There are two types of thylakoids—granal thylakoids, which are arranged in grana, and stromal thylakoids, which are in contact with the stroma. Granal thylakoids are pancake-shaped circular disks about 300–600 nanometers in diameter. Stromal thylakoids are helicoid sheets that spiral around grana. The flat tops and bottoms of granal thylakoids contain only the relatively flat photosystem II protein complex. This allows them to stack tightly, forming grana with many layers of tightly appressed membrane, called granal membrane, increasing stability and surface area for light capture.

## C01

What school was Walter Camp a captain for the football team? Also, What was the first year that Yale and Harvard played football?

**baseline: PARTIAL**

[1] Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game.

{
  "required_gold_groups": [
    [
      "former captain of the Yale football team",
      "Yale",
      "Yale"
    ],
    [
      "1875",
      "1875",
      "1875"
    ]
  ],
  "matched": [
    true,
    false
  ]
}

**fixed: PARTIAL**

[1] Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

[2] While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

{
  "required_gold_groups": [
    [
      "former captain of the Yale football team",
      "Yale",
      "Yale"
    ],
    [
      "1875",
      "1875",
      "1875"
    ]
  ],
  "matched": [
    true,
    false
  ]
}

**section: PARTIAL**

[1] Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

[2] While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

{
  "required_gold_groups": [
    [
      "former captain of the Yale football team",
      "Yale",
      "Yale"
    ],
    [
      "1875",
      "1875",
      "1875"
    ]
  ],
  "matched": [
    true,
    false
  ]
}

**paired_fixed: PARTIAL**

[1] Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

[2] While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

{
  "required_gold_groups": [
    [
      "former captain of the Yale football team",
      "Yale",
      "Yale"
    ],
    [
      "1875",
      "1875",
      "1875"
    ]
  ],
  "matched": [
    true,
    false
  ]
}

**paired_section: PARTIAL**

[1] Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

[2] While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Seeking to reduce the alarming number of deaths and serious injuries in the sport, Walter Camp (former captain of the Yale football team), suggested widening the field to open up the game. But the stadium was too narrow to accommodate a wider playing surface. So, other steps had to be taken.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> While Harvard's football team is no longer one of the country's best as it often was a century ago during football's early days (it won the Rose Bowl in 1920), both it and Yale have influenced the way the game is played. In 1903, Harvard Stadium introduced a new era into football with the first-ever permanent reinforced concrete stadium of its kind in the country. The stadium's structure actually played a role in the evolution of the college game.

{
  "required_gold_groups": [
    [
      "former captain of the Yale football team",
      "Yale",
      "Yale"
    ],
    [
      "1875",
      "1875",
      "1875"
    ]
  ],
  "matched": [
    true,
    false
  ]
}

## C02

What is the logic behind the cicadas prime number evolutionary strategy? Also, Other than 7 and 13, what other year interval do cicadas pupate? 

**baseline: FAIL**

[1] # Prime number

## Context 1
The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> # Prime number
> 
> ## Context 1
> The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

{
  "required_gold_groups": [
    [
      "make it very difficult for predators to evolve that could specialize as predators",
      "difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve"
    ],
    [
      "17 years",
      "17",
      "17",
      "17"
    ]
  ],
  "matched": [
    false,
    false
  ]
}

**fixed: PARTIAL**

[1] The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

[2] Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

{
  "required_gold_groups": [
    [
      "make it very difficult for predators to evolve that could specialize as predators",
      "difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve"
    ],
    [
      "17 years",
      "17",
      "17",
      "17"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**section: PARTIAL**

[1] The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

[2] Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

{
  "required_gold_groups": [
    [
      "make it very difficult for predators to evolve that could specialize as predators",
      "difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve"
    ],
    [
      "17 years",
      "17",
      "17",
      "17"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**paired_fixed: PARTIAL**

[1] The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

[2] Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

{
  "required_gold_groups": [
    [
      "make it very difficult for predators to evolve that could specialize as predators",
      "difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve"
    ],
    [
      "17 years",
      "17",
      "17",
      "17"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

**paired_section: PARTIAL**

[1] The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

[2] Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span FAIL.

> The evolutionary strategy used by cicadas of the genus Magicicada make use of prime numbers.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Over a 200-year period, average predator populations during hypothetical outbreaks of 14- and 15-year cicadas would be up to 2% higher than during outbreaks of 13- and 17-year cicadas.

{
  "required_gold_groups": [
    [
      "make it very difficult for predators to evolve that could specialize as predators",
      "difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve that could specialize as predators on Magicicadas",
      "the prime number intervals between emergences make it very difficult for predators to evolve"
    ],
    [
      "17 years",
      "17",
      "17",
      "17"
    ]
  ],
  "matched": [
    false,
    true
  ]
}

## C03

Within the 30 days how many digiboxes had been sold? Also, Who did BSkyB compete with initially?

**baseline: PARTIAL**

[1] Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

{
  "required_gold_groups": [
    [
      "100,000",
      "over 100,000",
      "100,000"
    ],
    [
      "ONdigital",
      "ONdigital",
      "ONdigital"
    ]
  ],
  "matched": [
    true,
    false
  ]
}

**fixed: PASS**

[1] Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

[2] Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

**section: PASS**

[1] Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

[2] Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

**paired_fixed: PASS**

[1] Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

[2] Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

**paired_section: PASS**

[1] Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

[2] Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Within 30 days, over 100,000 digiboxes had been sold, which help bolstered BSkyB's decision to give away free digiboxes and minidishes from May 1999.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Key selling points were the improvement in picture and sound quality, increased number of channels and an interactive service branded Open.... now called Sky Active, BSkyB competed with the ONdigital (later ITV Digital) terrestrial offering and cable services.

## C04

What does NADPH store? Also, What is the primary purpose of chloroplasts?

**baseline: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water.

**fixed: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

**section: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

**paired_fixed: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

**paired_section: PASS**

[1] Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match PASS; requested span PASS.

> Chloroplasts' main role is to conduct photosynthesis, where the photosynthetic pigment chlorophyll captures the energy from sunlight and converts it and stores it in the energy-storage molecules ATP and NADPH while freeing oxygen from water. They then use the ATP and NADPH to make organic molecules from carbon dioxide in a process known as the Calvin cycle. Chloroplasts carry out a number of other functions, including fatty acid synthesis, much amino acid synthesis, and the immune response in plants. The number of chloroplasts per cell varies from 1 in algae up to 100 in plants like Arabidopsis and wheat.

## U01

What is the exact database password used by Harvard University?

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

What is the bank account number associated with Prime number?

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

What is the date of birth of the fictional coordinator Neris Quill for Sky (United Kingdom)?

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

What is the current Bitcoin price in AED in the Chloroplast documents?

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

Who approves orbital mooring permits at the fictional Velora Annex?

**baseline: FAIL**

[1] At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: FAIL**

[1] At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**section: FAIL**

[1] At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_fixed: FAIL**

[1] At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_section: FAIL**

[1] At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

## A02

Who approves routine ledger filings at the fictional Zevrin Outpost?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: FAIL**

[1] At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**section: FAIL**

[1] At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_fixed: FAIL**

[1] At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_section: FAIL**

[1] At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings. This approval authority applies only to routine ledger filings at Velora Annex. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

## A03

Who approves cryogenic antenna licences at the fictional Nerith Hall?

**baseline: FAIL**

[1] At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: FAIL**

[1] At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**section: FAIL**

[1] At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_fixed: FAIL**

[1] At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_section: FAIL**

[1] At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

## A04

Who approves routine kit labels at the fictional Kavora Citadel?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: FAIL**

[1] At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**section: FAIL**

[1] At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_fixed: FAIL**

[1] At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_section: FAIL**

[1] At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

Source: 02_Prime_number.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Nerith Hall, it is for the Workshop Registrar to approve routine kit labels. This approval authority applies only to routine kit labels at Nerith Hall. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

## A05

Who approves interstellar transit seals at the fictional Solune Station?

**baseline: FAIL**

[1] At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: FAIL**

[1] At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**section: FAIL**

[1] At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_fixed: FAIL**

[1] At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_section: FAIL**

[1] At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

## A06

Who approves routine berth charts at the fictional Mireth Dome?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: FAIL**

[1] At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**section: FAIL**

[1] At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_fixed: FAIL**

[1] At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_section: FAIL**

[1] At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

Source: 03_Sky__United_Kingdom_.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Solune Station, it is for the Harbor Cataloguer to approve routine berth charts. This approval authority applies only to routine berth charts at Solune Station. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

## A07

Who approves lunar reactor certifications at the fictional Tavora House?

**baseline: FAIL**

[1] This approval authority applies only to routine exhibit tags at Tavora House.

[2] At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> This approval authority applies only to routine exhibit tags at Tavora House.

Source: 01_Harvard_University.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Velora Annex, it is for the Archive Steward to approve routine ledger filings.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: FAIL**

[1] At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**section: FAIL**

[1] At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_fixed: FAIL**

[1] At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_section: FAIL**

[1] At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

## A08

Who approves routine exhibit tags at the fictional Pelora Terminal?

**baseline: FAIL**

[1] ## Fictional approval appendix
At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> ## Fictional approval appendix
> At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags.

{
  "required_gold_groups": [],
  "matched": []
}

**fixed: FAIL**

[1] At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**section: FAIL**

[1] At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_fixed: FAIL**

[1] At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}

**paired_section: FAIL**

[1] At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

Source: 04_Chloroplast.md; provenance PASS; gold-paragraph match FAIL; requested span FAIL.

> At the fictional Tavora House, it is for the Gallery Clerk to approve routine exhibit tags. This approval authority applies only to routine exhibit tags at Tavora House. No other approval authority is described in this corpus.

{
  "required_gold_groups": [],
  "matched": []
}
