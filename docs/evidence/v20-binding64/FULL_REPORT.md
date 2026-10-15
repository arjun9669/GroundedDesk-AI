# Binding64 — qualified first answers after startup recovery

60 actual MiniLM Hybrid Q&A and4 separate lexical Comparison cases. Production baseline and isolated v20 fixed/section and paired v19 are distinct. Fixed sources/questions/key/rubric frozen before answers, Original attempt remains BLOCKED/ungraded. These are first question answers after separately frozen startup recovery; zero question retries, not an unqualified clean first run. Public/model exposure may exist; constructed controls are author-created stress tests. No pooled independent accuracy or official SQuAD claim.

```json
{
  "summary": {
    "baseline": {
      "PASS": 24,
      "PARTIAL": 1,
      "FAIL": 39,
      "citations": 64,
      "valid_provenance": 64,
      "gold_paragraph_citations": 24,
      "direct_span_citations": 21,
      "false_acceptances": 8,
      "false_refusals": 0,
      "zero_citation_refusals": 4
    },
    "fixed": {
      "PASS": 45,
      "PARTIAL": 1,
      "FAIL": 18,
      "citations": 66,
      "valid_provenance": 66,
      "gold_paragraph_citations": 49,
      "direct_span_citations": 43,
      "false_acceptances": 8,
      "false_refusals": 0,
      "zero_citation_refusals": 4
    },
    "section": {
      "PASS": 45,
      "PARTIAL": 1,
      "FAIL": 18,
      "citations": 66,
      "valid_provenance": 66,
      "gold_paragraph_citations": 49,
      "direct_span_citations": 43,
      "false_acceptances": 8,
      "false_refusals": 0,
      "zero_citation_refusals": 4
    },
    "paired_fixed": {
      "PASS": 45,
      "PARTIAL": 1,
      "FAIL": 18,
      "citations": 66,
      "valid_provenance": 66,
      "gold_paragraph_citations": 49,
      "direct_span_citations": 43,
      "false_acceptances": 8,
      "false_refusals": 0,
      "zero_citation_refusals": 4
    },
    "paired_section": {
      "PASS": 45,
      "PARTIAL": 1,
      "FAIL": 18,
      "citations": 66,
      "valid_provenance": 66,
      "gold_paragraph_citations": 49,
      "direct_span_citations": 43,
      "false_acceptances": 8,
      "false_refusals": 0,
      "zero_citation_refusals": 4
    }
  },
  "categories": {
    "public_supported": {
      "baseline": {
        "PASS": 17,
        "PARTIAL": 0,
        "FAIL": 7,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 20,
        "direct_span_citations": 17,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "fixed": {
        "PASS": 22,
        "PARTIAL": 0,
        "FAIL": 2,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 23,
        "direct_span_citations": 22,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "section": {
        "PASS": 22,
        "PARTIAL": 0,
        "FAIL": 2,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 23,
        "direct_span_citations": 22,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "paired_fixed": {
        "PASS": 22,
        "PARTIAL": 0,
        "FAIL": 2,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 23,
        "direct_span_citations": 22,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "paired_section": {
        "PASS": 22,
        "PARTIAL": 0,
        "FAIL": 2,
        "citations": 24,
        "valid_provenance": 24,
        "gold_paragraph_citations": 23,
        "direct_span_citations": 22,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      }
    },
    "public_compound": {
      "baseline": {
        "PASS": 3,
        "PARTIAL": 1,
        "FAIL": 0,
        "citations": 4,
        "valid_provenance": 4,
        "gold_paragraph_citations": 4,
        "direct_span_citations": 4,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "fixed": {
        "PASS": 3,
        "PARTIAL": 1,
        "FAIL": 0,
        "citations": 6,
        "valid_provenance": 6,
        "gold_paragraph_citations": 6,
        "direct_span_citations": 5,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "section": {
        "PASS": 3,
        "PARTIAL": 1,
        "FAIL": 0,
        "citations": 6,
        "valid_provenance": 6,
        "gold_paragraph_citations": 6,
        "direct_span_citations": 5,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "paired_fixed": {
        "PASS": 3,
        "PARTIAL": 1,
        "FAIL": 0,
        "citations": 6,
        "valid_provenance": 6,
        "gold_paragraph_citations": 6,
        "direct_span_citations": 5,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "paired_section": {
        "PASS": 3,
        "PARTIAL": 1,
        "FAIL": 0,
        "citations": 6,
        "valid_provenance": 6,
        "gold_paragraph_citations": 6,
        "direct_span_citations": 5,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      }
    },
    "count_supported": {
      "baseline": {
        "PASS": 0,
        "PARTIAL": 0,
        "FAIL": 12,
        "citations": 12,
        "valid_provenance": 12,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "fixed": {
        "PASS": 12,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 12,
        "valid_provenance": 12,
        "gold_paragraph_citations": 12,
        "direct_span_citations": 12,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "section": {
        "PASS": 12,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 12,
        "valid_provenance": 12,
        "gold_paragraph_citations": 12,
        "direct_span_citations": 12,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "paired_fixed": {
        "PASS": 12,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 12,
        "valid_provenance": 12,
        "gold_paragraph_citations": 12,
        "direct_span_citations": 12,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "paired_section": {
        "PASS": 12,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 12,
        "valid_provenance": 12,
        "gold_paragraph_citations": 12,
        "direct_span_citations": 12,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      }
    },
    "conditional_supported": {
      "baseline": {
        "PASS": 0,
        "PARTIAL": 0,
        "FAIL": 8,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "fixed": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 4,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 8,
        "direct_span_citations": 4,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "section": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 4,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 8,
        "direct_span_citations": 4,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "paired_fixed": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 4,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 8,
        "direct_span_citations": 4,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "paired_section": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 4,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 8,
        "direct_span_citations": 4,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      }
    },
    "unsupported_actor_action": {
      "baseline": {
        "PASS": 0,
        "PARTIAL": 0,
        "FAIL": 8,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 8,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "fixed": {
        "PASS": 0,
        "PARTIAL": 0,
        "FAIL": 8,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 8,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "section": {
        "PASS": 0,
        "PARTIAL": 0,
        "FAIL": 8,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 8,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "paired_fixed": {
        "PASS": 0,
        "PARTIAL": 0,
        "FAIL": 8,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 8,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "paired_section": {
        "PASS": 0,
        "PARTIAL": 0,
        "FAIL": 8,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 8,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      }
    },
    "unsupported_standard": {
      "baseline": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 0,
        "valid_provenance": 0,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 4
      },
      "fixed": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 0,
        "valid_provenance": 0,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 4
      },
      "section": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 0,
        "valid_provenance": 0,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 4
      },
      "paired_fixed": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 0,
        "valid_provenance": 0,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 4
      },
      "paired_section": {
        "PASS": 4,
        "PARTIAL": 0,
        "FAIL": 0,
        "citations": 0,
        "valid_provenance": 0,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 4
      }
    },
    "lexical_comparison": {
      "baseline": {
        "PASS": 0,
        "PARTIAL": 0,
        "FAIL": 4,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "fixed": {
        "PASS": 0,
        "PARTIAL": 0,
        "FAIL": 4,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "section": {
        "PASS": 0,
        "PARTIAL": 0,
        "FAIL": 4,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "paired_fixed": {
        "PASS": 0,
        "PARTIAL": 0,
        "FAIL": 4,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      },
      "paired_section": {
        "PASS": 0,
        "PARTIAL": 0,
        "FAIL": 4,
        "citations": 8,
        "valid_provenance": 8,
        "gold_paragraph_citations": 0,
        "direct_span_citations": 0,
        "false_acceptances": 0,
        "false_refusals": 0,
        "zero_citation_refusals": 0
      }
    }
  },
  "checks": {
    "development_gate_passed": true,
    "fixed_public_at_least21": true,
    "fixed_compound_all4": false,
    "fixed_count_all12": true,
    "fixed_conditional_all8": false,
    "fixed_unsupported_all12": false,
    "fixed_comparison_all4": false,
    "fixed_every_citation_requested_span": false,
    "fixed_provenance_intact": true,
    "fixed_no_false_acceptance_or_refusal": false,
    "fixed_no_paired_or_production_pass_loss": true,
    "section_public_at_least21": true,
    "section_compound_all4": false,
    "section_count_all12": true,
    "section_conditional_all8": false,
    "section_unsupported_all12": false,
    "section_comparison_all4": false,
    "section_every_citation_requested_span": false,
    "section_provenance_intact": true,
    "section_no_false_acceptance_or_refusal": false,
    "section_no_paired_or_production_pass_loss": true
  },
  "gate": "FAIL",
  "regressions": {
    "fixed": [],
    "section": []
  }
}
```

## F01 — Actual MiniLM Hybrid

What was the name of France's primary colony in the New World?

**baseline: PASS**

[1] The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters.

**fixed: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

**section: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

**paired_fixed: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

**paired_section: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

## F02 — Actual MiniLM Hybrid

The French and Indian War was the New World aspect of what European conflict?

**baseline: PASS**

[1] By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

**fixed: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

**section: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

**paired_fixed: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

**paired_section: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

## F03 — Actual MiniLM Hybrid

When did the British defeat New France?

**baseline: PASS**

[1] By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

**fixed: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

**section: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

**paired_fixed: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

**paired_section: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

## F04 — Actual MiniLM Hybrid

What were the two Huguenot neighborhoods created in Berlin?

**baseline: FAIL**

[1] ## Public context 2
In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Public context 2
> In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "Dorotheenstadt and Friedrichstadt",
        "Dorotheenstadt and Friedrichstadt",
        "Dorotheenstadt and Friedrichstadt"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

**section: PASS**

[1] In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

**paired_fixed: PASS**

[1] In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

**paired_section: PASS**

[1] In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

## F05 — Actual MiniLM Hybrid

What years did this occupation take place?

**baseline: FAIL**

[1] The kingdom did not fully recover for years.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> The kingdom did not fully recover for years.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "1806-07",
        "1806-07.",
        "1806-07"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: FAIL**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "1806-07",
        "1806-07.",
        "1806-07"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**section: FAIL**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "1806-07",
        "1806-07.",
        "1806-07"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**paired_fixed: FAIL**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "1806-07",
        "1806-07.",
        "1806-07"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**paired_section: FAIL**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "1806-07",
        "1806-07.",
        "1806-07"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

## F06 — Actual MiniLM Hybrid

What other Northern European cities had Huguenot congregations?

**baseline: FAIL**

[1] # Huguenot

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> # Huguenot

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden",
        "Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden",
        "Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

**section: PASS**

[1] In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

**paired_fixed: PASS**

[1] In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

**paired_section: PASS**

[1] In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> In Berlin, the Huguenots created two new neighbourhoods: Dorotheenstadt and Friedrichstadt. By 1700, one-fifth of the city's population was French speaking. The Berlin Huguenots preserved the French language in their church services for nearly a century. They ultimately decided to switch to German in protest against the occupation of Prussia by Napoleon in 1806-07. Many of their descendents rose to positions of prominence. Several congregations were founded, such as those of Fredericia (Denmark), Berlin, Stockholm, Hamburg, Frankfurt, Helsinki, and Emden.

## F07 — Actual MiniLM Hybrid

What is Victoria's highest monthly temperature?

**baseline: PASS**

[1] Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

**fixed: PASS**

[1] Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

**section: PASS**

[1] Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

**paired_fixed: PASS**

[1] Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

**paired_section: PASS**

[1] Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

## F08 — Actual MiniLM Hybrid

How cold does this region of Victoria get in the winner?

**baseline: FAIL**

[1] The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "15 °C",
        "15 °C",
        "15 °C (59 °F)"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: FAIL**

[1] The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "15 °C",
        "15 °C",
        "15 °C (59 °F)"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**section: FAIL**

[1] The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "15 °C",
        "15 °C",
        "15 °C (59 °F)"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**paired_fixed: FAIL**

[1] The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "15 °C",
        "15 °C",
        "15 °C (59 °F)"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**paired_section: FAIL**

[1] The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "15 °C",
        "15 °C",
        "15 °C (59 °F)"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

## F09 — Actual MiniLM Hybrid

When was the heatwave in which Hopetoun recorded its highest temperature?

**baseline: PASS**

[1] Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

**fixed: PASS**

[1] Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

**section: PASS**

[1] Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

**paired_fixed: PASS**

[1] Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

**paired_section: PASS**

[1] Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

## F10 — Actual MiniLM Hybrid

How much did the gross agricultural product increase from 2003-04?

**baseline: PASS**

[1] During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion.

**fixed: PASS**

[1] During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

**section: PASS**

[1] During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

**paired_fixed: PASS**

[1] During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

**paired_section: PASS**

[1] During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

## F11 — Actual MiniLM Hybrid

How many farms are there in Victoria?

**baseline: PASS**

[1] As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land.

**fixed: PASS**

[1] During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

**section: PASS**

[1] During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

**paired_fixed: PASS**

[1] During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

**paired_section: PASS**

[1] During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

## F12 — Actual MiniLM Hybrid

How much percentage of Victoria's land is taken up by farms?

**baseline: FAIL**

[1] As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "60%",
        "60%",
        "60%"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

**section: PASS**

[1] During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

**paired_fixed: PASS**

[1] During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

**paired_section: PASS**

[1] During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> During 2003–04, the gross value of Victorian agricultural production increased by 17% to $8.7 billion. This represented 24% of national agricultural production total gross value. As of 2004, an estimated 32,463 farms occupied around 136,000 square kilometres (52,500 sq mi) of Victorian land. This comprises more than 60% of the state's total land surface. Victorian farms range from small horticultural outfits to large-scale livestock and grain productions. A quarter of farmland is used to grow consumable crops.

## F13 — Actual MiniLM Hybrid

This person proposed explanations for the origins of earthquakes and the formation of mountains, what was his name?

**baseline: PASS**

[1] Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

**fixed: PASS**

[1] Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

**section: PASS**

[1] Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

**paired_fixed: PASS**

[1] Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

**paired_section: PASS**

[1] Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

## F14 — Actual MiniLM Hybrid

Fielding H. Garrison believes that the science of geology can be traced to where?

**baseline: PASS**

[1] Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

**fixed: PASS**

[1] Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

**section: PASS**

[1] Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

**paired_fixed: PASS**

[1] Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

**paired_section: PASS**

[1] Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

## F15 — Actual MiniLM Hybrid

Living from 973–1048 CE he was one of the earliest Persian geologists, what was his name?

**baseline: PASS**

[1] Abu al-Rayhan al-Biruni (973–1048 CE) was one of the earliest Persian geologists, whose works included the earliest writings on the geology of India, hypothesizing that the Indian subcontinent was once a sea.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Abu al-Rayhan al-Biruni (973–1048 CE) was one of the earliest Persian geologists, whose works included the earliest writings on the geology of India, hypothesizing that the Indian subcontinent was once a sea.

**fixed: PASS**

[1] Abu al-Rayhan al-Biruni (973–1048 CE) was one of the earliest Persian geologists, whose works included the earliest writings on the geology of India, hypothesizing that the Indian subcontinent was once a sea.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Abu al-Rayhan al-Biruni (973–1048 CE) was one of the earliest Persian geologists, whose works included the earliest writings on the geology of India, hypothesizing that the Indian subcontinent was once a sea.

**section: PASS**

[1] Abu al-Rayhan al-Biruni (973–1048 CE) was one of the earliest Persian geologists, whose works included the earliest writings on the geology of India, hypothesizing that the Indian subcontinent was once a sea.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Abu al-Rayhan al-Biruni (973–1048 CE) was one of the earliest Persian geologists, whose works included the earliest writings on the geology of India, hypothesizing that the Indian subcontinent was once a sea.

**paired_fixed: PASS**

[1] Abu al-Rayhan al-Biruni (973–1048 CE) was one of the earliest Persian geologists, whose works included the earliest writings on the geology of India, hypothesizing that the Indian subcontinent was once a sea.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Abu al-Rayhan al-Biruni (973–1048 CE) was one of the earliest Persian geologists, whose works included the earliest writings on the geology of India, hypothesizing that the Indian subcontinent was once a sea.

**paired_section: PASS**

[1] Abu al-Rayhan al-Biruni (973–1048 CE) was one of the earliest Persian geologists, whose works included the earliest writings on the geology of India, hypothesizing that the Indian subcontinent was once a sea.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Abu al-Rayhan al-Biruni (973–1048 CE) was one of the earliest Persian geologists, whose works included the earliest writings on the geology of India, hypothesizing that the Indian subcontinent was once a sea.

## F16 — Actual MiniLM Hybrid

Recently a more detailed model of the Earth was developed. Seismologists were able to create this using images of what from the interior of the Earth? 

**baseline: PASS**

[1] More recently, seismologists have been able to create detailed images of wave speeds inside the earth in the same way a doctor images a body in a CT scan.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> More recently, seismologists have been able to create detailed images of wave speeds inside the earth in the same way a doctor images a body in a CT scan.

**fixed: PASS**

[1] More recently, seismologists have been able to create detailed images of wave speeds inside the earth in the same way a doctor images a body in a CT scan.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> More recently, seismologists have been able to create detailed images of wave speeds inside the earth in the same way a doctor images a body in a CT scan.

**section: PASS**

[1] More recently, seismologists have been able to create detailed images of wave speeds inside the earth in the same way a doctor images a body in a CT scan.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> More recently, seismologists have been able to create detailed images of wave speeds inside the earth in the same way a doctor images a body in a CT scan.

**paired_fixed: PASS**

[1] More recently, seismologists have been able to create detailed images of wave speeds inside the earth in the same way a doctor images a body in a CT scan.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> More recently, seismologists have been able to create detailed images of wave speeds inside the earth in the same way a doctor images a body in a CT scan.

**paired_section: PASS**

[1] More recently, seismologists have been able to create detailed images of wave speeds inside the earth in the same way a doctor images a body in a CT scan.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> More recently, seismologists have been able to create detailed images of wave speeds inside the earth in the same way a doctor images a body in a CT scan.

## F17 — Actual MiniLM Hybrid

In the layered model of the Earth there are seismic discontinuities in which layer? 

**baseline: PASS**

[1] These advances led to the development of a layered model of the Earth, with a crust and lithosphere on top, the mantle below (separated within itself by seismic discontinuities at 410 and 660 kilometers), and the outer core and inner core below that.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> These advances led to the development of a layered model of the Earth, with a crust and lithosphere on top, the mantle below (separated within itself by seismic discontinuities at 410 and 660 kilometers), and the outer core and inner core below that.

**fixed: PASS**

[1] These advances led to the development of a layered model of the Earth, with a crust and lithosphere on top, the mantle below (separated within itself by seismic discontinuities at 410 and 660 kilometers), and the outer core and inner core below that.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> These advances led to the development of a layered model of the Earth, with a crust and lithosphere on top, the mantle below (separated within itself by seismic discontinuities at 410 and 660 kilometers), and the outer core and inner core below that.

**section: PASS**

[1] These advances led to the development of a layered model of the Earth, with a crust and lithosphere on top, the mantle below (separated within itself by seismic discontinuities at 410 and 660 kilometers), and the outer core and inner core below that.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> These advances led to the development of a layered model of the Earth, with a crust and lithosphere on top, the mantle below (separated within itself by seismic discontinuities at 410 and 660 kilometers), and the outer core and inner core below that.

**paired_fixed: PASS**

[1] These advances led to the development of a layered model of the Earth, with a crust and lithosphere on top, the mantle below (separated within itself by seismic discontinuities at 410 and 660 kilometers), and the outer core and inner core below that.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> These advances led to the development of a layered model of the Earth, with a crust and lithosphere on top, the mantle below (separated within itself by seismic discontinuities at 410 and 660 kilometers), and the outer core and inner core below that.

**paired_section: PASS**

[1] These advances led to the development of a layered model of the Earth, with a crust and lithosphere on top, the mantle below (separated within itself by seismic discontinuities at 410 and 660 kilometers), and the outer core and inner core below that.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> These advances led to the development of a layered model of the Earth, with a crust and lithosphere on top, the mantle below (separated within itself by seismic discontinuities at 410 and 660 kilometers), and the outer core and inner core below that.

## F18 — Actual MiniLM Hybrid

What types of waves do seismologists use to image the interior of the Earth?

**baseline: FAIL**

[1] ## Public context 2
Seismologists can use the arrival times of seismic waves in reverse to image the interior of the Earth.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Public context 2
> Seismologists can use the arrival times of seismic waves in reverse to image the interior of the Earth.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "seismic waves",
        "seismic",
        "seismic",
        "seismic"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] Seismologists can use the arrival times of seismic waves in reverse to image the interior of the Earth.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Seismologists can use the arrival times of seismic waves in reverse to image the interior of the Earth.

**section: PASS**

[1] Seismologists can use the arrival times of seismic waves in reverse to image the interior of the Earth.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Seismologists can use the arrival times of seismic waves in reverse to image the interior of the Earth.

**paired_fixed: PASS**

[1] Seismologists can use the arrival times of seismic waves in reverse to image the interior of the Earth.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Seismologists can use the arrival times of seismic waves in reverse to image the interior of the Earth.

**paired_section: PASS**

[1] Seismologists can use the arrival times of seismic waves in reverse to image the interior of the Earth.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Seismologists can use the arrival times of seismic waves in reverse to image the interior of the Earth.

## F19 — Actual MiniLM Hybrid

How are packets normally forwarded

**baseline: PASS**

[1] Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket.

**fixed: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

**section: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

**paired_fixed: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

**paired_section: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

## F20 — Actual MiniLM Hybrid

How are packets normally forwarded

**baseline: PASS**

[1] Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket.

**fixed: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

**section: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

**paired_fixed: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

**paired_section: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

## F21 — Actual MiniLM Hybrid

In cases of shared physical medium how are they delivered 

**baseline: PASS**

[1] In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

**fixed: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

**section: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

**paired_fixed: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

**paired_section: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

## F22 — Actual MiniLM Hybrid

What did Paul Baran develop 

**baseline: PASS**

[1] Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense.

**fixed: PASS**

[1] Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

**section: PASS**

[1] Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

**paired_fixed: PASS**

[1] Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

**paired_section: PASS**

[1] Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

## F23 — Actual MiniLM Hybrid

What was the goal of the system 

**baseline: PASS**

[1] Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense.

**fixed: PASS**

[1] Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

**section: PASS**

[1] Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

**paired_fixed: PASS**

[1] Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

**paired_section: PASS**

[1] Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Starting in the late 1950s, American computer scientist Paul Baran developed the concept Distributed Adaptive Message Block Switching with the goal to provide a fault-tolerant, efficient routing method for telecommunication messages as part of a research program at the RAND Corporation, funded by the US Department of Defense. This concept contrasted and contradicted the theretofore established principles of pre-allocation of network bandwidth, largely fortified by the development of telecommunications in the Bell System.

## F24 — Actual MiniLM Hybrid

Who is credited with the modern name for this system 

**baseline: FAIL**

[1] Davies is credited with coining the modern name packet switching and inspiring

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> Davies is credited with coining the modern name packet switching and inspiring

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "Davies is credited with coining the modern name packet switching and inspiring numerous packet switching networks in Europe",
        "Donald Davies",
        "Donald Davies"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] The new concept found little resonance among network implementers until the independent work of Donald Davies at the National Physical Laboratory (United Kingdom) (NPL) in the late 1960s. Davies is credited with coining the modern name packet switching and inspiring numerous packet switching networks in Europe in the decade following, including the incorporation of the concept in the early ARPANET in the United States.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The new concept found little resonance among network implementers until the independent work of Donald Davies at the National Physical Laboratory (United Kingdom) (NPL) in the late 1960s. Davies is credited with coining the modern name packet switching and inspiring numerous packet switching networks in Europe in the decade following, including the incorporation of the concept in the early ARPANET in the United States.

**section: PASS**

[1] The new concept found little resonance among network implementers until the independent work of Donald Davies at the National Physical Laboratory (United Kingdom) (NPL) in the late 1960s. Davies is credited with coining the modern name packet switching and inspiring numerous packet switching networks in Europe in the decade following, including the incorporation of the concept in the early ARPANET in the United States.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The new concept found little resonance among network implementers until the independent work of Donald Davies at the National Physical Laboratory (United Kingdom) (NPL) in the late 1960s. Davies is credited with coining the modern name packet switching and inspiring numerous packet switching networks in Europe in the decade following, including the incorporation of the concept in the early ARPANET in the United States.

**paired_fixed: PASS**

[1] The new concept found little resonance among network implementers until the independent work of Donald Davies at the National Physical Laboratory (United Kingdom) (NPL) in the late 1960s. Davies is credited with coining the modern name packet switching and inspiring numerous packet switching networks in Europe in the decade following, including the incorporation of the concept in the early ARPANET in the United States.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The new concept found little resonance among network implementers until the independent work of Donald Davies at the National Physical Laboratory (United Kingdom) (NPL) in the late 1960s. Davies is credited with coining the modern name packet switching and inspiring numerous packet switching networks in Europe in the decade following, including the incorporation of the concept in the early ARPANET in the United States.

**paired_section: PASS**

[1] The new concept found little resonance among network implementers until the independent work of Donald Davies at the National Physical Laboratory (United Kingdom) (NPL) in the late 1960s. Davies is credited with coining the modern name packet switching and inspiring numerous packet switching networks in Europe in the decade following, including the incorporation of the concept in the early ARPANET in the United States.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The new concept found little resonance among network implementers until the independent work of Donald Davies at the National Physical Laboratory (United Kingdom) (NPL) in the late 1960s. Davies is credited with coining the modern name packet switching and inspiring numerous packet switching networks in Europe in the decade following, including the incorporation of the concept in the early ARPANET in the United States.

## C01 — Actual MiniLM Hybrid

What was the name of France's primary colony in the New World? Also, The French and Indian War was the New World aspect of what European conflict?

**baseline: PASS**

[1] By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

**fixed: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

**section: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

**paired_fixed: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

**paired_section: PASS**

[1] The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> The kingdom did not fully recover for years. The French crown's refusal to allow non-Catholics to settle in New France may help to explain that colony's slow rate of population growth compared to that of the neighbouring British colonies, which opened settlement to religious dissenters. By the time of the French and Indian War (the North American front of the Seven Years' War), a sizeable population of Huguenot descent lived in the British colonies, and many participated in the British defeat of New France in 1759-60.

## C02 — Actual MiniLM Hybrid

What is Victoria's highest monthly temperature? Also, How cold does this region of Victoria get in the winner?

**baseline: PARTIAL**

[1] Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "48.8 °C",
        "48.8 °C",
        "48.8 °C (119.8 °F)"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "15 °C",
        "15 °C",
        "15 °C (59 °F)"
      ]
    }
  ],
  "matched": [
    true,
    false
  ]
}
```

**fixed: PARTIAL**

[1] Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

[2] The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "48.8 °C",
        "48.8 °C",
        "48.8 °C (119.8 °F)"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "15 °C",
        "15 °C",
        "15 °C (59 °F)"
      ]
    }
  ],
  "matched": [
    true,
    false
  ]
}
```

**section: PARTIAL**

[1] Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

[2] The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "48.8 °C",
        "48.8 °C",
        "48.8 °C (119.8 °F)"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "15 °C",
        "15 °C",
        "15 °C (59 °F)"
      ]
    }
  ],
  "matched": [
    true,
    false
  ]
}
```

**paired_fixed: PARTIAL**

[1] Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

[2] The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "48.8 °C",
        "48.8 °C",
        "48.8 °C (119.8 °F)"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "15 °C",
        "15 °C",
        "15 °C (59 °F)"
      ]
    }
  ],
  "matched": [
    true,
    false
  ]
}
```

**paired_section: PARTIAL**

[1] Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

[2] The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Victoria's highest maximum temperature since World War II, of 48.8 °C (119.8 °F) was recorded in Hopetoun on 7 February 2009, during the 2009 southeastern Australia heat wave.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> The Mallee and upper Wimmera are Victoria's warmest regions with hot winds blowing from nearby semi-deserts.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "48.8 °C",
        "48.8 °C",
        "48.8 °C (119.8 °F)"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "15 °C",
        "15 °C",
        "15 °C (59 °F)"
      ]
    }
  ],
  "matched": [
    true,
    false
  ]
}
```

## C03 — Actual MiniLM Hybrid

This person proposed explanations for the origins of earthquakes and the formation of mountains, what was his name? Also, Fielding H. Garrison believes that the science of geology can be traced to where?

**baseline: PASS**

[1] Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

**fixed: PASS**

[1] Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

[2] Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

**section: PASS**

[1] Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

[2] Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

**paired_fixed: PASS**

[1] Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

[2] Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

**paired_section: PASS**

[1] Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

[2] Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Drawing from Greek and Indian scientific literature that were not destroyed by the Muslim conquests, the Persian scholar Ibn Sina (Avicenna, 981–1037) proposed detailed explanations for the formation of mountains, the origin of earthquakes, and other topics central to modern geology, which provided an essential foundation for the later development of the science.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Garrison, are of the opinion that the origin of the science of geology can be traced to Persia after the Muslim conquests had come to an end.

## C04 — Actual MiniLM Hybrid

How are packets normally forwarded Also, How are packets normally forwarded

**baseline: PASS**

[1] Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket.

**fixed: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

**section: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

**paired_fixed: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

**paired_section: PASS**

[1] Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> Packet mode communication may be implemented with or without intermediate forwarding nodes (packet switches or routers). Packets are normally forwarded by intermediate network nodes asynchronously using first-in, first-out buffering, but may be forwarded according to some scheduling discipline for fair queuing, traffic shaping, or for differentiated or guaranteed quality of service, such as weighted fair queuing or leaky bucket. In case of a shared physical medium (such as radio or 10BASE5), the packets may be delivered according to a multiple access scheme.

## T1A — Actual MiniLM Hybrid

How many segments did Mira Solven label at Velora Audio Archive?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "Mira Solven completed a 27-segment labeling run"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**section: PASS**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_fixed: PASS**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_section: PASS**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

## T1B — Actual MiniLM Hybrid

How many segments did Taro Ilven mount at Velora Audio Archive?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "Taro Ilven mounted 34 segments"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**section: PASS**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_fixed: PASS**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_section: PASS**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

## T1C — Actual MiniLM Hybrid

What was the number of segments inspected by Mira Solven at Velora Audio Archive?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "Mira Solven inspected 19 segments"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**section: PASS**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_fixed: PASS**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_section: PASS**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

## E1A — Actual MiniLM Hybrid

How long are listening cards retained at Velora Audio Archive, including the open-review exception?

**baseline: FAIL**

[1] ## Fictional retention
At Velora Audio Archive, listening cards are kept for 45 days.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Velora Audio Archive, listening cards are kept for 45 days.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "listening cards are kept for 45 days"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**fixed: PASS**

[1] At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

**section: PASS**

[1] At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

**paired_fixed: PASS**

[1] At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

**paired_section: PASS**

[1] At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

## E1B — Actual MiniLM Hybrid

A public copy request reaches Velora Audio Archive at 14:00. When is it sent, and what happens if the rights review is unresolved?

**baseline: FAIL**

[1] ## Fictional copy requests
At Velora Audio Archive, a public copy request received before 14:00 is sent the same operating day.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional copy requests
> At Velora Audio Archive, a public copy request received before 14:00 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "At or after 14:00, send it on the next operating day"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If the rights review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**fixed: FAIL**

[1] At Velora Audio Archive, a public copy request received before 14:00 is sent the same operating day.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Velora Audio Archive, a public copy request received before 14:00 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "At or after 14:00, send it on the next operating day"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If the rights review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**section: FAIL**

[1] At Velora Audio Archive, a public copy request received before 14:00 is sent the same operating day.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Velora Audio Archive, a public copy request received before 14:00 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "At or after 14:00, send it on the next operating day"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If the rights review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**paired_fixed: FAIL**

[1] At Velora Audio Archive, a public copy request received before 14:00 is sent the same operating day.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Velora Audio Archive, a public copy request received before 14:00 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "At or after 14:00, send it on the next operating day"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If the rights review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**paired_section: FAIL**

[1] At Velora Audio Archive, a public copy request received before 14:00 is sent the same operating day.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Velora Audio Archive, a public copy request received before 14:00 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "At or after 14:00, send it on the next operating day"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If the rights review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

## N11 — Actual MiniLM Hybrid

How many segments did Mira Solven mount at Velora Audio Archive?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**fixed: FAIL**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**section: FAIL**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_fixed: FAIL**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_section: FAIL**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

## N12 — Actual MiniLM Hybrid

How many segments did Taro Ilven label at Velora Audio Archive?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**fixed: FAIL**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**section: FAIL**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_fixed: FAIL**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_section: FAIL**

[1] At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Velora Audio Archive, Mira Solven completed a 27-segment labeling run. Taro Ilven mounted 34 segments. Mira Solven inspected 19 segments. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

## T2A — Actual MiniLM Hybrid

How many plates did Lena Corven number at Nerith Sky Workshop?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "Lena Corven completed a 38-plate numbering run"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**section: PASS**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_fixed: PASS**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_section: PASS**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

## T2B — Actual MiniLM Hybrid

How many plates did Ivo Darven polish at Nerith Sky Workshop?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "Ivo Darven polished 52 plates"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**section: PASS**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_fixed: PASS**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_section: PASS**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

## T2C — Actual MiniLM Hybrid

What was the number of plates photographed by Lena Corven at Nerith Sky Workshop?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "Lena Corven photographed 16 plates"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**section: PASS**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_fixed: PASS**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_section: PASS**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

## E2A — Actual MiniLM Hybrid

How long are observation cards retained at Nerith Sky Workshop, including the open-review exception?

**baseline: FAIL**

[1] ## Fictional retention
At Nerith Sky Workshop, observation cards are kept for 70 days.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Nerith Sky Workshop, observation cards are kept for 70 days.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "observation cards are kept for 70 days"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**fixed: PASS**

[1] At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

**section: PASS**

[1] At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

**paired_fixed: PASS**

[1] At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

**paired_section: PASS**

[1] At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

## E2B — Actual MiniLM Hybrid

A public copy request reaches Nerith Sky Workshop at 15:30. When is it sent, and what happens if the publication review is unresolved?

**baseline: FAIL**

[1] ## Fictional copy requests
At Nerith Sky Workshop, a public copy request received before 15:30 is sent the same operating day.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional copy requests
> At Nerith Sky Workshop, a public copy request received before 15:30 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "At or after 15:30, send it on the next operating day"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If the publication review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**fixed: FAIL**

[1] At Nerith Sky Workshop, a public copy request received before 15:30 is sent the same operating day.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Nerith Sky Workshop, a public copy request received before 15:30 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "At or after 15:30, send it on the next operating day"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If the publication review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**section: FAIL**

[1] At Nerith Sky Workshop, a public copy request received before 15:30 is sent the same operating day.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Nerith Sky Workshop, a public copy request received before 15:30 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "At or after 15:30, send it on the next operating day"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If the publication review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**paired_fixed: FAIL**

[1] At Nerith Sky Workshop, a public copy request received before 15:30 is sent the same operating day.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Nerith Sky Workshop, a public copy request received before 15:30 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "At or after 15:30, send it on the next operating day"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If the publication review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**paired_section: FAIL**

[1] At Nerith Sky Workshop, a public copy request received before 15:30 is sent the same operating day.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Nerith Sky Workshop, a public copy request received before 15:30 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "At or after 15:30, send it on the next operating day"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If the publication review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

## N21 — Actual MiniLM Hybrid

How many plates did Lena Corven polish at Nerith Sky Workshop?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**fixed: FAIL**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**section: FAIL**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_fixed: FAIL**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_section: FAIL**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

## N22 — Actual MiniLM Hybrid

How many plates did Ivo Darven number at Nerith Sky Workshop?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**fixed: FAIL**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**section: FAIL**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_fixed: FAIL**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_section: FAIL**

[1] At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Nerith Sky Workshop, Lena Corven completed a 38-plate numbering run. Ivo Darven polished 52 plates. Lena Corven photographed 16 plates. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

## T3A — Actual MiniLM Hybrid

How many frames did Nira Telven mark at Caldrin Rock Imaging Room?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "Nira Telven completed a 43-frame marking run"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**section: PASS**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_fixed: PASS**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_section: PASS**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

## T3B — Actual MiniLM Hybrid

How many frames did Olan Merven print at Caldrin Rock Imaging Room?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "Olan Merven printed 26 frames"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**section: PASS**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_fixed: PASS**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_section: PASS**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

## T3C — Actual MiniLM Hybrid

What was the number of frames checked by Nira Telven at Caldrin Rock Imaging Room?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "Nira Telven checked 31 frames"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**section: PASS**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_fixed: PASS**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_section: PASS**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

## E3A — Actual MiniLM Hybrid

How long are imaging cards retained at Caldrin Rock Imaging Room, including the open-review exception?

**baseline: FAIL**

[1] ## Fictional retention
At Caldrin Rock Imaging Room, imaging cards are kept for 55 days.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Caldrin Rock Imaging Room, imaging cards are kept for 55 days.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "imaging cards are kept for 55 days"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**fixed: PASS**

[1] At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

**section: PASS**

[1] At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

**paired_fixed: PASS**

[1] At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

**paired_section: PASS**

[1] At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

## E3B — Actual MiniLM Hybrid

A public copy request reaches Caldrin Rock Imaging Room at 13:00. When is it sent, and what happens if the ownership review is unresolved?

**baseline: FAIL**

[1] ## Fictional copy requests
At Caldrin Rock Imaging Room, a public copy request received before 13:00 is sent the same operating day.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional copy requests
> At Caldrin Rock Imaging Room, a public copy request received before 13:00 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "At or after 13:00, send it on the next operating day"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If the ownership review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**fixed: FAIL**

[1] At Caldrin Rock Imaging Room, a public copy request received before 13:00 is sent the same operating day.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Caldrin Rock Imaging Room, a public copy request received before 13:00 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "At or after 13:00, send it on the next operating day"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If the ownership review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**section: FAIL**

[1] At Caldrin Rock Imaging Room, a public copy request received before 13:00 is sent the same operating day.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Caldrin Rock Imaging Room, a public copy request received before 13:00 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "At or after 13:00, send it on the next operating day"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If the ownership review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**paired_fixed: FAIL**

[1] At Caldrin Rock Imaging Room, a public copy request received before 13:00 is sent the same operating day.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Caldrin Rock Imaging Room, a public copy request received before 13:00 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "At or after 13:00, send it on the next operating day"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If the ownership review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**paired_section: FAIL**

[1] At Caldrin Rock Imaging Room, a public copy request received before 13:00 is sent the same operating day.

Source: 03_Geology.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Caldrin Rock Imaging Room, a public copy request received before 13:00 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "At or after 13:00, send it on the next operating day"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If the ownership review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

## N31 — Actual MiniLM Hybrid

How many frames did Nira Telven print at Caldrin Rock Imaging Room?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**fixed: FAIL**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**section: FAIL**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_fixed: FAIL**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_section: FAIL**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

## N32 — Actual MiniLM Hybrid

How many frames did Olan Merven mark at Caldrin Rock Imaging Room?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**fixed: FAIL**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**section: FAIL**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_fixed: FAIL**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_section: FAIL**

[1] At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Caldrin Rock Imaging Room, Nira Telven completed a 43-frame marking run. Olan Merven printed 26 frames. Nira Telven checked 31 frames. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

## T4A — Actual MiniLM Hybrid

How many trays did Vera Linven tag at Soravin Specimen Studio?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "Vera Linven completed a 24-tray tagging run"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**section: PASS**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_fixed: PASS**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_section: PASS**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

## T4B — Actual MiniLM Hybrid

How many trays did Eran Morven clean at Soravin Specimen Studio?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "Eran Morven cleaned 41 trays"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**section: PASS**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_fixed: PASS**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_section: PASS**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

## T4C — Actual MiniLM Hybrid

What was the number of trays weighed by Vera Linven at Soravin Specimen Studio?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "Vera Linven weighed 18 trays"
      ]
    }
  ],
  "matched": [
    false
  ]
}
```

**fixed: PASS**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**section: PASS**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_fixed: PASS**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

**paired_section: PASS**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

## E4A — Actual MiniLM Hybrid

How long are conservation cards retained at Soravin Specimen Studio, including the open-review exception?

**baseline: FAIL**

[1] ## Fictional retention
At Soravin Specimen Studio, conservation cards are kept for 80 days.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Soravin Specimen Studio, conservation cards are kept for 80 days.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "conservation cards are kept for 80 days"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**fixed: PASS**

[1] At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

**section: PASS**

[1] At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

**paired_fixed: PASS**

[1] At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

**paired_section: PASS**

[1] At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span PASS.

> At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

## E4B — Actual MiniLM Hybrid

A public copy request reaches Soravin Specimen Studio at 16:00. When is it sent, and what happens if the custody review is unresolved?

**baseline: FAIL**

[1] ## Fictional copy requests
At Soravin Specimen Studio, a public copy request received before 16:00 is sent the same operating day.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional copy requests
> At Soravin Specimen Studio, a public copy request received before 16:00 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "At or after 16:00, send it on the next operating day"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If the custody review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**fixed: FAIL**

[1] At Soravin Specimen Studio, a public copy request received before 16:00 is sent the same operating day.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Soravin Specimen Studio, a public copy request received before 16:00 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "At or after 16:00, send it on the next operating day"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If the custody review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**section: FAIL**

[1] At Soravin Specimen Studio, a public copy request received before 16:00 is sent the same operating day.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Soravin Specimen Studio, a public copy request received before 16:00 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "At or after 16:00, send it on the next operating day"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If the custody review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**paired_fixed: FAIL**

[1] At Soravin Specimen Studio, a public copy request received before 16:00 is sent the same operating day.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Soravin Specimen Studio, a public copy request received before 16:00 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "At or after 16:00, send it on the next operating day"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If the custody review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

**paired_section: FAIL**

[1] At Soravin Specimen Studio, a public copy request received before 16:00 is sent the same operating day.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy PASS; requested span FAIL.

> At Soravin Specimen Studio, a public copy request received before 16:00 is sent the same operating day.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "At or after 16:00, send it on the next operating day"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If the custody review is unresolved, do not send the copy until that review closes"
      ]
    }
  ],
  "matched": [
    false,
    false
  ]
}
```

## N41 — Actual MiniLM Hybrid

How many trays did Vera Linven clean at Soravin Specimen Studio?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**fixed: FAIL**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**section: FAIL**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_fixed: FAIL**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_section: FAIL**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

## N42 — Actual MiniLM Hybrid

How many trays did Eran Morven tag at Soravin Specimen Studio?

**baseline: FAIL**

[1] ## Fictional completed tasks
At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional completed tasks
> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**fixed: FAIL**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**section: FAIL**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_fixed: FAIL**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

**paired_section: FAIL**

[1] At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> At the fictional Soravin Specimen Studio, Vera Linven completed a 24-tray tagging run. Eran Morven cleaned 41 trays. Vera Linven weighed 18 trays. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations.

Frozen required groups / matches:
```json
{
  "required": [],
  "matched": []
}
```

## X01 — Separate lexical Comparison

Compare retention of listening cards at Velora Audio Archive and observation cards at Nerith Sky Workshop, including each open-review exception.

**baseline: FAIL**

[1] ## Fictional retention
At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

[2] ## Fictional retention
At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "listening cards are kept for 45 days"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "observation cards are kept for 70 days"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**fixed: FAIL**

[1] ## Fictional retention
At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

[2] ## Fictional retention
At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "listening cards are kept for 45 days"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "observation cards are kept for 70 days"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**section: FAIL**

[1] ## Fictional retention
At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

[2] ## Fictional retention
At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "listening cards are kept for 45 days"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "observation cards are kept for 70 days"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**paired_fixed: FAIL**

[1] ## Fictional retention
At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

[2] ## Fictional retention
At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "listening cards are kept for 45 days"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "observation cards are kept for 70 days"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**paired_section: FAIL**

[1] ## Fictional retention
At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

[2] ## Fictional retention
At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "listening cards are kept for 45 days"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "observation cards are kept for 70 days"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

## X02 — Separate lexical Comparison

Compare retention of observation cards at Nerith Sky Workshop and imaging cards at Caldrin Rock Imaging Room, including each open-review exception.

**baseline: FAIL**

[1] ## Fictional retention
At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

[2] ## Fictional retention
At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "observation cards are kept for 70 days"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "imaging cards are kept for 55 days"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**fixed: FAIL**

[1] ## Fictional retention
At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

[2] ## Fictional retention
At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "observation cards are kept for 70 days"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "imaging cards are kept for 55 days"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**section: FAIL**

[1] ## Fictional retention
At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

[2] ## Fictional retention
At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "observation cards are kept for 70 days"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "imaging cards are kept for 55 days"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**paired_fixed: FAIL**

[1] ## Fictional retention
At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

[2] ## Fictional retention
At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "observation cards are kept for 70 days"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "imaging cards are kept for 55 days"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**paired_section: FAIL**

[1] ## Fictional retention
At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

[2] ## Fictional retention
At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Source: 02_Victoria__Australia_.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Nerith Sky Workshop, observation cards are kept for 70 days. If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "observation cards are kept for 70 days"
      ]
    },
    {
      "filename": "02_Victoria__Australia_.md",
      "alternatives": [
        "If a coordinate review is open, retain the affected cards until the review is closed, even after the 70-day period"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "imaging cards are kept for 55 days"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

## X03 — Separate lexical Comparison

Compare retention of imaging cards at Caldrin Rock Imaging Room and conservation cards at Soravin Specimen Studio, including each open-review exception.

**baseline: FAIL**

[1] ## Fictional retention
At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

[2] ## Fictional retention
At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "imaging cards are kept for 55 days"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "conservation cards are kept for 80 days"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**fixed: FAIL**

[1] ## Fictional retention
At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

[2] ## Fictional retention
At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "imaging cards are kept for 55 days"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "conservation cards are kept for 80 days"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**section: FAIL**

[1] ## Fictional retention
At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

[2] ## Fictional retention
At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "imaging cards are kept for 55 days"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "conservation cards are kept for 80 days"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**paired_fixed: FAIL**

[1] ## Fictional retention
At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

[2] ## Fictional retention
At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "imaging cards are kept for 55 days"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "conservation cards are kept for 80 days"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**paired_section: FAIL**

[1] ## Fictional retention
At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

[2] ## Fictional retention
At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Source: 03_Geology.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Caldrin Rock Imaging Room, imaging cards are kept for 55 days. If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "imaging cards are kept for 55 days"
      ]
    },
    {
      "filename": "03_Geology.md",
      "alternatives": [
        "If a sample review is open, retain the affected cards until the review is closed, even after the 55-day period"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "conservation cards are kept for 80 days"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

## X04 — Separate lexical Comparison

Compare retention of conservation cards at Soravin Specimen Studio and listening cards at Velora Audio Archive, including each open-review exception.

**baseline: FAIL**

[1] ## Fictional retention
At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

[2] ## Fictional retention
At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "conservation cards are kept for 80 days"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "listening cards are kept for 45 days"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**fixed: FAIL**

[1] ## Fictional retention
At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

[2] ## Fictional retention
At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "conservation cards are kept for 80 days"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "listening cards are kept for 45 days"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**section: FAIL**

[1] ## Fictional retention
At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

[2] ## Fictional retention
At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "conservation cards are kept for 80 days"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "listening cards are kept for 45 days"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**paired_fixed: FAIL**

[1] ## Fictional retention
At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

[2] ## Fictional retention
At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "conservation cards are kept for 80 days"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "listening cards are kept for 45 days"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

**paired_section: FAIL**

[1] ## Fictional retention
At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

[2] ## Fictional retention
At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Source: 04_Packet_switching.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Soravin Specimen Studio, conservation cards are kept for 80 days. If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period.

Source: 01_Huguenot.md; provenance PASS; paragraph proxy FAIL; requested span FAIL.

> ## Fictional retention
> At Velora Audio Archive, listening cards are kept for 45 days. If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period.

Frozen required groups / matches:
```json
{
  "required": [
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "conservation cards are kept for 80 days"
      ]
    },
    {
      "filename": "04_Packet_switching.md",
      "alternatives": [
        "If a treatment review is open, retain the affected cards until the review is closed, even after the 80-day period"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "listening cards are kept for 45 days"
      ]
    },
    {
      "filename": "01_Huguenot.md",
      "alternatives": [
        "If a correction review is open, retain the affected cards until the review is closed, even after the 45-day period"
      ]
    }
  ],
  "matched": [
    false,
    false,
    false,
    false
  ]
}
```

## U01 — Actual MiniLM Hybrid

What is the exact database password used by Velora Audio Archive?

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

## U02 — Actual MiniLM Hybrid

What is the bank account number associated with Nerith Sky Workshop?

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

## U03 — Actual MiniLM Hybrid

What is the date of birth of the fictional coordinator Pelrin Voss at Caldrin Rock Imaging Room?

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

## U04 — Actual MiniLM Hybrid

What is the current Bitcoin price in AED in the Soravin Specimen Studio records?

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
