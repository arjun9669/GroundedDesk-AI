import test from "node:test";
import assert from "node:assert/strict";
import {buildIndex, answerQuestion, bestSourceSentence} from "../retrieval.mjs";
import {compareDocuments, buildPolicyResearchResult} from "../research.mjs";
import {verifyEvidenceResult} from "../quality.mjs";

// Compact synthetic reproductions of the independently reviewed Atlas
// source passages. The original user-supplied PDFs are NOT committed.
// These 15 tests detect regressions, not independent model accuracy.
const library=[
{id:"g",name:"01_Atlas_AI_Governance_Policy.pdf",text:[
"PRACTICE DOCUMENT / AGP-01 AI Governance and Release Policy Atlas Research Group SYNTHETIC BENCHMARK MATERIAL.",
"G-01 Release authority Every AI release has a Model Owner, a Product Sponsor, and a named Security Officer.",
"High-risk releases require written approval from both the AI Release Council and the Security Officer before deployment.",
"G-02 Required evidence package Before a release review, the Model Owner assembles a model card, a risk register, a test results log, a data-flow diagram, and a rollback plan.",
"G-04 Citation and factual support A valid source citation must identify the correct document and contain a quotation that occurs in its source excerpt.",
"Source-number validation is a structural check only; it does not prove that an AI-generated sentence is factually supported.",
"G-05 Pre-release evaluation gate The Model Owner runs a forty-question pilot: thirty supported questions and ten deliberately unsupported questions.",
"At least 95 percent of displayed citations must match the original source text.",
"The source-selection target is at least 90 percent on the supported questions, and the unsupported-question refusal target is at least 90 percent.",
"G-07 Scheduled reviews The AI Release Council performs a quarterly governance review."
].join(" ")},
{id:"i",name:"02_Atlas_Incident_Response_Runbook.pdf",text:[
"PRACTICE DOCUMENT / IRR-02 Document AI Incident Response Runbook Atlas Research Group SYNTHETIC BENCHMARK MATERIAL.",
"R-02 Acknowledgement deadlines The on-call responder must acknowledge P1 alerts within 15 minutes of detection.",
"P2 alerts must be acknowledged within 60 minutes.",
"R-03 Internal containment targets For P1 incidents, the Incident Commander must direct initial containment within 30 minutes of confirmation.",
"R-05 Evidence handling An incident packet records the alert time, classification, affected document identifiers, and redacted logs.",
"Exported evidence packets are retained for 90 days in the simulated audit store, unless a longer legal hold is issued.",
"R-06 Vendor escalation If a hosted model supplier or document-processing vendor might be involved, the Incident Commander alerts the Vendor Review Lead.",
"Internal P1 containment remains due within 30 minutes; the vendor contract separately requires supplier notification within two hours of a confirmed P1 service incident."
].join(" ")},
{id:"v",name:"03_Atlas_Vendor_AI_Assessment.pdf",text:[
"PRACTICE DOCUMENT / VRA-03 External AI Vendor Assessment Guide Atlas Research Group SYNTHETIC BENCHMARK MATERIAL.",
"V-01 Review trigger A Vendor Review is mandatory before allowing an external supplier to receive document text.",
"Local-only processing that sends no document content to a supplier may receive an abbreviated review, subject to Security Officer approval.",
"V-03 Risk scoring bands The supplier score ranges from 0 to 100.",
"Scores from 0 through 25 are Low, 26 through 60 are Medium, and 61 through 100 are High.",
"A High vendor risk requires written acceptance by both Legal Counsel and the Security Officer.",
"V-04 External incident notification Supplier contracts must require notification to Atlas within two hours of a confirmed Priority 1 service incident involving customer documents.",
"This is the vendor notification deadline and does not replace the internal 30-minute P1 containment target in the Incident Response Runbook.",
"V-05 Data retention and deletion Where customer document copies are permitted, contracts must require deletion within 30 days after the contract ends unless a lawful preservation obligation applies.",
"V-06 Testing and ongoing monitoring High-risk AI vendors require a quarterly red-team exercise and a monthly access-log review.",
"V-07 Human review of generated claims A correct citation number does not establish factual entailment."
].join(" ")}
];
const index=buildIndex(library);
const direct=[
["D01","What two approvals are needed for a high-risk AI release?",/AI Release Council and the Security Officer before deployment/i,"g"],
["D02","What must be included in the pre-release evidence package?",/model card, a risk register, a test results log, a data-flow diagram, and a rollback plan/i,"g"],
["D03","What is the citation provenance target for the fictional pilot?",/At least 95 percent of displayed citations/i,"g"],
["D04","How quickly must on-call staff acknowledge a P1 alert?",/acknowledge P1 alerts within 15 minutes/i,"i"],
["D05","Who directs initial P1 containment, and what is the target?",/Incident Commander must direct initial containment within 30 minutes/i,"i"],
["D06","How long are exported incident evidence packets retained?",/retained for 90 days/i,"i"],
["D07","Which supplier scores qualify as High risk?",/61 through 100 are High/i,"v"],
["D08","What approvals are needed to accept a High-risk supplier?",/written acceptance by both Legal Counsel and the Security Officer/i,"v"]
];
for(const [id,question,expected,docId] of direct){
  test("Atlas 15 "+id+" selects an actually supporting displayed sentence",()=>{
    const out=answerQuestion(question,index);
    assert.equal(out.answered,true);
    assert.equal(out.sources[0]?.documentId,docId);
    assert.match(out.sources[0].quote,expected);
    assert.equal(verifyEvidenceResult(out,library).ok,true);
    if(id==="D07") assert.equal(out.sources.length,1,"Do not append unrelated governance citations");
  });
}
const comparisons=[
["C09","Compare the internal Priority 1 containment deadline with the vendor notification deadline.","i","v",/30 minutes/i,/within two hours/i],
["C10","Compare the retention periods for incident evidence and supplier document copies after contract end.","i","v",/retained for 90 days/i,/deletion within 30 days after the contract ends/i],
["C11","Compare internal quarterly governance review with the high-risk vendor review exercise.","g","v",/quarterly governance review/i,/quarterly red-team exercise/i],
["C12","How do the governance policy and vendor guide treat citation numbers versus factual correctness?","g","v",/structural check only|does not prove/i,/does not establish factual entailment/i]
];
for(const [id,question,a,b,expectedA,expectedB] of comparisons){
  test("Atlas 15 "+id+" shows evidence from both sides of comparison",()=>{
    const x=library.find(d=>d.id===a),y=library.find(d=>d.id===b);
    const out=compareDocuments(x,y,question);
    assert.equal(out.sources.length,2);
    assert.deepEqual(out.sources.map(s=>s.supported),[true,true]);
    assert.match(out.sources[0].excerpt,expectedA);
    assert.match(out.sources[1].excerpt,expectedB);
    assert.ok(x.text.includes(out.sources[0].excerpt));
    assert.ok(y.text.includes(out.sources[1].excerpt));
  });
}
const refusals=[
["N13","What is the CEO of Atlas Research Group's date of birth?"],
["N14","What is the current price of Bitcoin in AED?"],
["N15","What is the exact database password used by Atlas Research Group?"]
];
for(const [id,q] of refusals){
  test("Atlas 15 "+id+" refuses absent information without fabricated support",()=>{
    const r=answerQuestion(q,index);
    assert.equal(r.answered,false);
    assert.deepEqual(r.sources,[]);
    assert.equal(verifyEvidenceResult(r,library).ok,true);
  });
}
test("5.3 does not confuse a password handling policy with an actual credential value",()=>{
 const docs=[{id:"a",name:"Acme Rules.txt",text:"The Acme database password policy requires every password to be rotated monthly. Never publish credentials in tickets."}];
 const question="What is the exact database password used by Acme?";
 const result=answerQuestion(question,buildIndex(docs));
 assert.equal(result.answered,false);
 assert.equal(result.sources.length,0);
});
test("5.3 allows ordinary, legitimate credential-rotation guidance",()=>{
 const docs=[{id:"a",name:"Acme Rules.txt",text:"The database password must be rotated monthly. Every credential owner records the rotation."}];
 const result=answerQuestion("How often must the database password be rotated?",buildIndex(docs));
 assert.equal(result.answered,true);
 assert.match(result.sources[0].quote,/rotated monthly/i);
});
test("5.3 quoted evidence remains source-literal and bounded outside the Atlas fixture",()=>{
 const doc={id:"x",name:"independent.txt",text:"Vendor response time is unrelated to staff salary. Incident responders must acknowledge a Priority 2 alert within 75 minutes. The model audit requires new citations."};
 const q="How quickly must responders acknowledge a Priority 2 alert?";
 const quote=bestSourceSentence(q,doc.text);
 assert.ok(doc.text.includes(quote));
 assert.match(quote,/75 minutes/);
 assert.ok(quote.length<=420);
 const unsupported=answerQuestion("What is the CEO salary of the company?",buildIndex([doc]));
 assert.equal(unsupported.answered,false);
});
test("5.3 keeps source-only legacy 5.1 policy scan available",()=>{
 const out=buildPolicyResearchResult("What does a release require?",library[0]);
 assert.equal(out.kind,"policy-research");
 assert.ok(out.sources.some(s=>s.sectionId==="G-01"));
});
