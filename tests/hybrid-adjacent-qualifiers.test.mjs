import test from "node:test";
import assert from "node:assert/strict";
import {buildIndex,answerFromCandidates,answerQuestion} from "../retrieval.mjs";
import {hybridRank} from "../hybrid.mjs";
import {verifyEvidenceResult} from "../quality.mjs";

// Synthetic generalizations of Meridian I09 and I15; semantic vectors here
// are mocked. Only a separate actual Chrome run can establish MiniLM behavior.
function hybrid(question,docs) {
  const index=buildIndex(docs);
  const ranked=hybridRank(question,index,[1,0],index.chunks.map(()=>[1,0]));
  assert.ok(ranked.some(c=>c.semanticScore!==null),"test real RRF code using mock vectors");
  const result=answerFromCandidates(question,ranked,3,"Mock-vector Hybrid");
  assert.equal(verifyEvidenceResult(result,docs).ok,true,"verbatim quote and displayed excerpt");
  return result;
}
const purchase=[{id:"p",name:"purchase-policy.txt",text:[
  "P-04 Supplier acknowledgement Suppliers must acknowledge a purchase order within six business hours of receipt.",
  "The acknowledgement is not a guarantee of delivery."
].join(" ")}];
test("r21 I09: Hybrid includes adjacent acknowledgement-is-not-delivery-guarantee qualifier",()=>{
  const out=hybrid("How soon must suppliers acknowledge a purchase order?",purchase);
  assert.equal(out.answered,true);
  assert.equal(out.sources.length,1);
  assert.match(out.sources[0].quote,/six business hours of receipt/);
  assert.match(out.sources[0].quote,/acknowledgement is not a guarantee of delivery/i);
  assert.equal(out.sources[0].excerpt.includes(out.sources[0].quote),true);
});
const maintenance=[{id:"m",name:"maintenance-policy.txt",text:[
  "M-05 Lubrication intervals The standard lubrication interval is 60 operating hours.",
  "For a conveyor running in the dusty demonstration bay, the interval is reduced to 30 operating hours.",
  "The planned inspection interval remains unchanged."
].join(" ")}];
test("r21 I15: Hybrid quotes standard, changed and unchanged intervals from same section",()=>{
  const out=hybrid("How does the dusty demonstration bay change the lubrication interval?",maintenance);
  assert.equal(out.answered,true);
  assert.equal(out.sources.length,1);
  assert.match(out.sources[0].quote,/standard lubrication interval is 60 operating hours/i);
  assert.match(out.sources[0].quote,/dusty demonstration bay, the interval is reduced to 30 operating hours/i);
  assert.match(out.sources[0].quote,/inspection interval remains unchanged/i);
  assert.ok(out.sources[0].quote.length<=620);
});
test("r21: generalizes to different acknowledgement clocks and delivery promise wording",()=>{
  const docs=[{id:"d",name:"supplier-terms.txt",text:[
    "Supplier confirmation Suppliers must acknowledge a reservation within 48 hours of receipt.",
    "This acknowledgement does not promise delivery on a particular date."
  ].join(" ")}];
  const out=hybrid("How soon must suppliers acknowledge a reservation?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/within 48 hours/);
  assert.match(out.sources[0].quote,/does not promise delivery/);
});
test("r21: generalizes to other baseline and exception intervals",()=>{
  const docs=[{id:"d",name:"workshop.txt",text:[
    "The standard cleaning interval is 90 operating hours.",
    "In a high-dust workshop the cleaning interval is reduced to 45 operating hours.",
    "The inspection interval remains unchanged."
  ].join(" ")}];
  const out=hybrid("How does the high-dust workshop change the cleaning interval?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/standard cleaning interval is 90 operating hours/i);
  assert.match(out.sources[0].quote,/cleaning interval is reduced to 45 operating hours/i);
  assert.match(out.sources[0].quote,/inspection interval remains unchanged/i);
});
test("r21: does not add an unrelated adjacent delivery truck sentence",()=>{
  const docs=[{id:"d",name:"purchase.txt",text:[
    "The supplier must acknowledge a purchase order within six business hours of receipt.",
    "Delivery trucks are parked in a guarded warehouse."
  ].join(" ")}];
  const out=hybrid("How soon must suppliers acknowledge a purchase order?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/six business hours/);
  assert.doesNotMatch(out.sources[0].quote,/Delivery trucks are parked/);
});
test("r21: does not cross from one numbered source section into another",()=>{
  const docs=[{id:"d",name:"policy.txt",text:[
    "P-04 Supplier acknowledgement Suppliers must acknowledge a purchase order within six business hours of receipt.",
    "P-05 Shipping disclaimers An acknowledgement is not a guarantee of delivery."
  ].join(" ")}];
  const out=hybrid("How soon must suppliers acknowledge a purchase order?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/six business hours/);
  assert.doesNotMatch(out.sources[0].quote,/P-05 Shipping disclaimers/);
});
test("r21: does not absorb multiple unrelated neighbor sentences or exceed quote limit",()=>{
  const docs=[{id:"d",name:"maintenance.txt",text:[
    "The standard lubrication interval is 60 operating hours.",
    "For a conveyor running in the dusty demonstration bay, the interval is reduced to 30 operating hours.",
    "Maintenance staff must sign the inventory report after work.",
    "The planned inspection interval remains unchanged."
  ].join(" ")}];
  const out=hybrid("How does the dusty demonstration bay change the lubrication interval?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/dusty demonstration bay/);
  assert.doesNotMatch(out.sources[0].quote,/inventory report|inspection interval remains unchanged/i);
});
test("r21: preserve r20 numeric approval rule and avoid irrelevant neighbor appends",()=>{
  const docs=[{id:"p",name:"approvals.txt",text:[
    "Purchases above 800 and up to 4000 credits require Budget Manager approval.",
    "Purchases above 4000 credits require written approval from both the Finance Lead and the Operations Director."
  ].join(" ")}];
  const out=hybrid("Who must approve a purchase above 4000 credits?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/Finance Lead and the Operations Director/);
  assert.doesNotMatch(out.sources[0].quote,/Budget Manager/);
});
test("r21: preserve keyword one-sentence output, limiting changes to Hybrid",()=>{
  const ix=buildIndex(purchase);
  const out=answerQuestion("How soon must suppliers acknowledge a purchase order?",ix);
  assert.equal(out.answered,true);
  assert.doesNotMatch(out.sources[0].quote,/not a guarantee of delivery/i);
});
test("r21: preserve unsupported phone-number refusal under Hybrid",()=>{
  const out=hybrid("What is the supplier's personal mobile phone number?",purchase);
  assert.equal(out.answered,false);
  assert.deepEqual(out.sources,[]);
});
