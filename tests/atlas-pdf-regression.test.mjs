import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { RETRIEVAL_BUILD, buildIndex, answerQuestion, answerFromCandidates } from "../retrieval.mjs";
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
  assert.match(markdown,/\*\*Retrieval mode:\*\*/);
  assert.match(markdown,/\*\*Retrieval build:\*\*/);
  assert.ok(markdown.includes(RETRIEVAL_BUILD));
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

test("actual user question returns only the clearly relevant Model Owner evidence, not incidental vendor and incident matches",()=>{
  // Flattened excerpts resemble what PDF.js showed in the user's copied report.
  const library=[
    {id:"gov",name:"01_Atlas_AI_Governance_Policy.pdf",text:
      "G-01 Release authority Every AI release has a Model Owner, a Product Sponsor, and a named Security Officer. " +
      "High-risk releases require written approval from both the AI Release Council and the Security Officer before deployment. " +
      "G-02 Required evidence package Before a release review, the Model Owner assembles a model card, a risk register, " +
      "a test results log, a data-flow diagram, and a rollback plan. " +
      "The Security Officer checks access controls and sensitive information."},
    {id:"vendor",name:"03_Atlas_Vendor_AI_Assessment.pdf",text:
      "Local-only processing that sends no document content to a supplier may receive an abbreviated review, " +
      "subject to Security Officer approval. V-02 Required vendor disclosures Every vendor questionnaire must " +
      "describe the data-flow diagram, hosting region, subprocessors and retention schedule."},
    {id:"incident",name:"02_Atlas_Incident_Response_Runbook.pdf",text:
      "R-06 Vendor escalation If a hosted model supplier or document-processing vendor might be involved, " +
      "the Incident Commander alerts the Vendor Review Lead. Internal P1 containment remains due within 30 minutes. " +
      "The runbook describes an incident review and release coordination."},
  ];
  const question="What documents must the Model Owner prepare before an AI release review?";
  const result=answerQuestion(question,buildIndex(library));
  assert.equal(result.answered,true);
  assert.equal(result.sources.length,1,"only the strong supporting policy should be cited");
  assert.equal(result.sources[0].filename,"01_Atlas_AI_Governance_Policy.pdf");
  assert.match(result.sources[0].quote,/model card, a risk register, a test results log, a data-flow diagram, and a rollback plan/);
  assert.equal(verifyEvidenceResult(result,library).ok,true);
  const markdown=createEvidenceReport(question,result);
  assert.doesNotMatch(markdown,/### \\[2\\]/);
  assert.doesNotMatch(markdown,/Vendor\\_AI\\_Assessment|Incident\\_Response\\_Runbook/);
});

test("low ranking keyword candidates are pruned but genuine close-score documents survive",()=>{
  const query="Which document covers release review requirements?";
  const fixture=[
    {id:"top:1",documentId:"top",filename:"top.txt",content:"Release review requirements include verified approvals.",
      tf:new Map([["release",1],["review",1],["requirements",1]]),score:8},
    {id:"other:1",documentId:"other",filename:"other.txt",content:"Quarterly policy review for vendor onboarding.",
      tf:new Map([["review",1]]),score:1.7},
    {id:"also:1",documentId:"also",filename:"also.txt",content:"Release review requirements include a rollback plan.",
      tf:new Map([["release",1],["review",1],["requirements",1]]),score:4},
  ];
  // Lexical candidates passed into extraction are pre-ranked.
  const ranking=[fixture[0],fixture[2],fixture[1]];
  const single=answerFromCandidates(query,ranking,3);
  assert.deepEqual(single.sources.map(x=>x.filename),["top.txt","also.txt"]);
  const compare=answerFromCandidates("Compare release review requirements across both teams",ranking,3);
  assert.equal(compare.sources.length,3,"multi-document intent must not discard weaker sources");
  const mockHybrid=answerFromCandidates(query,ranking.map(x=>({...x,lexicalScore:x.score})),3,"Mock hybrid fusion");
  assert.equal(mockHybrid.sources.length,3,"hybrid fusion scores are not comparable to BM25 thresholds");
});

test("Cache-busted entry and module imports advertise the current retrieval build",()=>{
  const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
  const html=readFileSync(resolve(root,"index.html"),"utf8");
  const app=readFileSync(resolve(root,"app.mjs"),"utf8");
  const retrieval=readFileSync(resolve(root,"retrieval.mjs"),"utf8");
  assert.match(html,/src="\.\/app\.mjs\?v=20261010-r10"/);
  assert.match(html,/id="retrieval-build"/);
  assert.match(app,/from "\.\/retrieval\.mjs\?v=20261010-r10"/);
  assert.match(app,/Loaded retrieval build:/);
  assert.match(retrieval,/const RETRIEVAL_BUILD = "2026-10-10-r10"/);
});

test("user-reported Atlas CEO salary query refuses instead of citing organization names in PDF headers",()=>{
  // Actual failure: all PDFs repeat the company name on their cover pages,
  // but none contains a CEO, salary or financial compensation evidence.
  const atlas=[
    {id:"g",name:"01_Atlas_AI_Governance_Policy.pdf",
      text:"GROUNDEDDESK AI | SYNTHETIC BENCHMARK MATERIAL | OCT 2026 Page 1 PRACTICE DOCUMENT / AGP-01 AI Governance and Release Policy Atlas Research Group. Every AI release has a Model Owner, a Product Sponsor and a named Security Officer."},
    {id:"i",name:"02_Atlas_Incident_Response_Runbook.pdf",
      text:"GROUNDEDDESK AI | SYNTHETIC BENCHMARK MATERIAL | OCT 2026 Page 1 PRACTICE DOCUMENT / IRR-02 Document AI Incident Response Runbook Atlas Research Group. The Incident Commander responds to priority incidents."},
    {id:"v",name:"03_Atlas_Vendor_AI_Assessment.pdf",
      text:"GROUNDEDDESK AI | SYNTHETIC BENCHMARK MATERIAL | OCT 2026 Page 1 PRACTICE DOCUMENT / VRA-03 External AI Vendor Assessment Guide Atlas Research Group. A Vendor Review is mandatory before outside document processing."},
  ];
  const index=buildIndex(atlas);
  const question="What is the annual salary of the CEO of Atlas Research Group?";
  const result=answerQuestion(question,index);
  assert.equal(result.answered,false);
  assert.deepEqual(result.sources,[]);
  assert.match(result.answer,/can't find this/i);
  assert.equal(verifyEvidenceResult(result,atlas).ok,true);
  assert.match(createEvidenceReport(question,result),/NO|can't find this/i);
  assert.equal(answerQuestion("Who is the CEO of Atlas Research Group?",index).answered,false);
  assert.equal(answerQuestion("What is the operating budget of Atlas Research Group?",index).answered,false);
});

test("attribute refusal remains a general lexical condition, not a blacklist of CEO/salary words",()=>{
  const withFact=[{id:"hr",name:"staff-records.txt",
    text:"Atlas Research Group executive disclosure: The CEO's annual salary is AED 510,000. Annual operating budget is AED 2 million."}];
  const index=buildIndex(withFact);
  const result=answerQuestion("What is the annual salary of the CEO of Atlas Research Group?",index);
  assert.equal(result.answered,true);
  assert.match(result.sources[0].quote,/annual salary/i);
  assert.equal(verifyEvidenceResult(result,withFact).ok,true);
  assert.equal(answerQuestion("What is the operating budget of Atlas Research Group?",index).answered,true);
});

test("vendor disclosure question retrieves V-02 list, not V-01 trigger or PDF cover",()=>{
  const vendor=[
    "GROUNDEDDESK AI | SYNTHETIC BENCHMARK MATERIAL | OCT 2026 Page 1 PRACTICE DOCUMENT / VRA-03 External AI Vendor Assessment Guide Atlas Research Group | v1.1 | Simulated supplier evaluation",
    "SYNTHETIC TEST CONTENT - NOT AN ACTUAL COMPANY POLICY OR AN OFFICIAL GOVERNMENT PUBLICATION.",
    "This fictional procurement guide covers external providers of language models, hosted vector storage, and document parsing.",
    "It distinguishes obligations of a supplier from those of the internal Incident Response Team.",
    "V-01 Review trigger A Vendor Review is mandatory before allowing an external supplier to receive document text, query prompts containing customer records, or generated answer logs.",
    "Local-only processing that sends no document content to a supplier may receive an abbreviated review, subject to Security Officer approval.",
    "V-02 Required vendor disclosures Every vendor questionnaire must describe the data-flow diagram, hosting region, subprocessors, retention schedule, model-training use of customer data, incident contact, access logs, and deletion procedures.",
    "A marketing statement that an AI service is private is insufficient evidence.",
    "V-03 Risk scoring bands The supplier score ranges from 0 to 100. Scores from 0 through 25 are Low, 26 through 60 are Medium, and 61 through 100 are High."
  ].join(" ");
  const docs=[
    {id:"v",name:"03_Atlas_Vendor_AI_Assessment.pdf",text:vendor},
    {id:"g",name:"01_Atlas_AI_Governance_Policy.pdf",text:"G-01 Release authority Every AI release has a Model Owner, Product Sponsor and Security Officer. High-risk releases require written approval from the AI Release Council and Security Officer before deployment."},
    {id:"i",name:"02_Atlas_Incident_Response_Runbook.pdf",text:"R-07 Closing an incident Two reviewers, the Incident Commander and the Security Officer, sign off on P1 closure."}
  ];
  const question="What information must an external AI vendor disclose in the Vendor AI Assessment?";
  const result=answerQuestion(question,buildIndex(docs));
  assert.equal(result.answered,true);
  assert.equal(result.sources[0].filename,"03_Atlas_Vendor_AI_Assessment.pdf");
  assert.match(result.sources[0].quote,/data-flow diagram, hosting region, subprocessors, retention schedule/i);
  assert.match(result.sources[0].quote,/deletion procedures/i);
  assert.doesNotMatch(result.sources[0].quote,/V-01 Review trigger/i);
  assert.equal(verifyEvidenceResult(result,docs).ok,true);
  assert.match(createEvidenceReport(question,result),/hosting region/);
});

test("disclosure vocabulary alternatives do not invent evidence in unrelated documents",()=>{
  const docs=[{id:"a",name:"entity.txt",text:"Atlas Research Group holds a quarterly vendor review."}];
  const result=answerQuestion("What information must an external supplier disclose?",buildIndex(docs));
  assert.equal(result.answered,false);
});
