import test from "node:test";
import assert from "node:assert/strict";
import { buildIndex, answerQuestion } from "../retrieval.mjs";
import { verifyEvidenceResult } from "../quality.mjs";
import { createEvidenceReport } from "../report.mjs";

// Faithful, whitespace-flattened passages from the user's synthetic Atlas
// PDF validation materials. This regression isolates *answer relevance*;
// the actual PDF.js upload on iPhone was already confirmed separately.
const documents = [
  { id:"g", name:"01_Atlas_AI_Governance_Policy.pdf", text:
    "GROUNDEDDESK AI | SYNTHETIC BENCHMARK MATERIAL | OCT 2026 Page 1 PRACTICE DOCUMENT / AGP-01 AI Governance and Release Policy Atlas Research Group | v1.4 | 02 October 2026 | Simulated internal guidance SYNTHETIC TEST CONTENT - NOT AN ACTUAL COMPANY POLICY OR AN OFFICIAL GOVERNMENT PUBLICATION This fictional organization runs small document intelligence prototypes, including retrieval-based question answering. The policy is a self-contained test of release controls, traceable evidence, and risk ownership. G-01 Release authority Every AI release has a Model Owner, a Product Sponsor, and a named Security Officer. High-risk releases require written approval from both the AI Release Council and the Security Officer before deployment. The Product Sponsor cannot substitute for either approval. G-02 Required evidence package Before a release review, the Model Owner assembles a model card, a risk register, a test results log, a data-flow diagram, and a rollback plan." },
  { id:"i", name:"02_Atlas_Incident_Response_Runbook.pdf", text:
    "The incident response policy defines internal procedures, governance review and release communication. The next governance review tracks recurring patterns. R-08 Drill and escalation check Each quarter the Incident Response Team rehearses a scenario in which a retrieval assistant displays a fabricated source quotation." },
  { id:"v", name:"03_Atlas_Vendor_AI_Assessment.pdf", text:
    "The External AI Vendor Assessment Guide reviews new AI systems before suppliers receive internal documents. V-06 Testing and ongoing monitoring High-risk AI vendors require a quarterly red-team exercise and a monthly access-log review." },
];

test("real Atlas user-question regression: answer is an approval clause, not PDF title boilerplate",()=>{
  const question="What does the AI Governance Policy require before an AI system can be released?";
  const result=answerQuestion(question,buildIndex(documents));
  assert.equal(result.answered,true);
  assert.equal(result.sources.length,1,"explicitly named policy should not cite vendor or incident runbooks");
  assert.equal(result.sources[0].filename,"01_Atlas_AI_Governance_Policy.pdf");
  assert.match(result.sources[0].quote,/High-risk releases require written approval from both the AI Release Council and the Security Officer before deployment/i);
  assert.doesNotMatch(result.sources[0].quote,/SYNTHETIC BENCHMARK MATERIAL|PRACTICE DOCUMENT/i);
  assert.equal(verifyEvidenceResult(result,documents).ok,true);
  const markdown=createEvidenceReport(question,result);
  assert.match(markdown,/High-risk releases require written approval/);
  assert.doesNotMatch(markdown,/### \[2\] 02_/);
});

test("questions about policy evidence are allowed to quote other relevant clauses",()=>{
  const query="What evidence package does the AI Governance Policy require before a release review?";
  const result=answerQuestion(query,buildIndex(documents));
  assert.equal(result.answered,true);
  assert.equal(result.sources[0].documentId,"g");
  assert.match(result.sources[0].quote,/model card|risk register|rollback plan/i);
  assert.equal(verifyEvidenceResult(result,documents).ok,true);
});

test("multiple explicitly named document requests retain cross-document retrieval",()=>{
  const q="Compare the AI Governance Policy and Incident Response Runbook governance review requirements";
  const result=answerQuestion(q,buildIndex(documents));
  assert.equal(result.answered,true);
  const ids=new Set(result.sources.map(s=>s.documentId));
  assert.ok(ids.has("g"));
  assert.ok(ids.has("i"));
  assert.ok(result.sources.every(s=>s.excerpt.includes(s.quote)));
});

test("ordinary unsupported questions still refuse and do not fabricate a source",()=>{
  const result=answerQuestion("Who won the tennis championship on Neptune?",buildIndex(documents));
  assert.equal(result.answered,false);
  assert.deepEqual(result.sources,[]);
});

test("long quotation remains an exact substring after the sentence scoring change",()=>{
  const docs=[{id:"long",name:"policy.pdf",
    text:"Background context ".repeat(45) +
      "A release requires written approval before deployment under the incident policy. " +
      "More context ".repeat(24)}];
  const result=answerQuestion("What requires approval before deployment?",buildIndex(docs));
  assert.equal(result.answered,true);
  assert.ok(result.sources[0].quote.length<=420);
  assert.ok(result.sources[0].excerpt.includes(result.sources[0].quote));
  assert.equal(verifyEvidenceResult(result,docs).ok,true);
});
