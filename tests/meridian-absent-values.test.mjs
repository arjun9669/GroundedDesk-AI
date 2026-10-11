import test from "node:test";
import assert from "node:assert/strict";
import { buildIndex, answerQuestion, answerFromCandidates } from "../retrieval.mjs";
import { hybridRank } from "../hybrid.mjs";
import { verifyEvidenceResult } from "../quality.mjs";

// First independently frozen Meridian24 Chrome failures (I23/I24).
// Fictional generic reproductions: vectors below are deterministic mock
// values. These tests must NOT be reported as an actual MiniLM retest.
function retrieve(question, documents, mode="Hybrid") {
  const index=buildIndex(documents);
  if (mode==="Keyword") return answerQuestion(question,index);
  const rankings=hybridRank(question,index,[1,0],index.chunks.map(()=>[1,0]));
  assert.ok(rankings.some(x=>x.semanticScore!==null),"exercise RRF with simulated vectors");
  return answerFromCandidates(question,rankings,3,"Mock Hybrid RRF");
}
function refused(result,documents) {
  assert.equal(result.answered,false,result.answer);
  assert.deepEqual(result.sources,[]);
  assert.match(result.answer,/can't find this in the provided documents/i);
  assert.equal(verifyEvidenceResult(result,documents).ok,true);
}
const procurement=[
  {id:"buy",name:"procurement.txt",text:"MERIDIAN FIELD SERVICES - FICTIONAL PURCHASING GUIDE. Supplier invoices are filed after acceptance. Bank account handling requires dual verification. Procurement records are kept 18 months."},
  {id:"ops",name:"operations.txt",text:"Maintenance schedules include monthly belt inspections."}
];
for(const mode of ["Hybrid","Keyword"]) {
  test("5.4 I23: "+mode+" refuses bank account number absent from procurement text",()=>{
    refused(retrieve("What is the exact bank account number used to pay suppliers?",procurement,mode),procurement);
  });
  test("5.4 I24: "+mode+" refuses numerical torque absent from a maintenance tool list",()=>{
    const docs=[{id:"m",name:"maintenance.txt",text:
      "The technician brings a belt gauge, a torque marker, a cleaning brush, and an inspection card to a planned conveyor inspection. Inspect every 180 operating hours or 21 calendar days."}];
    refused(retrieve("What torque in newton-metres is required for the conveyor belt bolts?",docs,mode),docs);
  });
}
test("5.4 supports a genuinely printed account number",()=>{
  const docs=[{id:"pay",name:"payment.txt",
    text:"Supplier payments are made to bank account number 0123456789. Confirm the bank number before settlement."}];
  const out=retrieve("What is the bank account number used for supplier payments?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/bank account number 0123456789/i);
  assert.equal(verifyEvidenceResult(out,docs).ok,true);
});
test("5.4 supports a genuinely printed IBAN after an IBAN label",()=>{
  const docs=[{id:"pay",name:"payment.txt",
    text:"The bank account IBAN is AE070331234567890123456. The team reconciles the ledger monthly."}];
  const out=retrieve("What is the exact bank account number?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/IBAN is AE070331234567890123456/);
});
test("5.4 supports a genuinely printed numerical bolt torque with N m units",()=>{
  const docs=[{id:"fix",name:"workshop.txt",
    text:"The specified conveyor belt bolt torque is 28 N·m after inspection. Mark each bolt after tightening."}];
  const out=retrieve("What torque in newton-metres is required for the conveyor belt bolts?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/torque is 28 N·m/);
  assert.equal(verifyEvidenceResult(out,docs).ok,true);
});
test("5.4 legitimate handling guidance is not interpreted as a request to disclose bank account digits",()=>{
  const docs=[{id:"bank",name:"policy.txt",text:
    "Bank account handling requires two people to verify supplier settlement details before disbursement."}];
  const out=retrieve("How should bank account handling be verified?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/two people/i);
});
test("5.4 maintenance torque tool guidance remains answerable without a numeric setting",()=>{
  const docs=[{id:"fix",name:"maintenance.txt",text:
    "The technician marks the conveyor belt bolts with a torque marker after inspection."}];
  const out=retrieve("How is the torque marker used?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/torque marker/i);
});
