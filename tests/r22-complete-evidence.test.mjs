import test from "node:test";
import assert from "node:assert/strict";
import { buildIndex, answerFromCandidates, bestSourceSentence } from "../retrieval.mjs";
import { hybridRank } from "../hybrid.mjs";
import { verifyEvidenceResult } from "../quality.mjs";
import { compareDocuments } from "../research.mjs";

// Synthetic and deliberately different sources: NOT the frozen Meridian files.
// Mock vectors exercise the Hybrid RRF code path but are NOT MiniLM inference.
function hybrid(question,docs) {
  const ix=buildIndex(docs);
  const results=hybridRank(question,ix,[1,0],ix.chunks.map(()=>[1,0]));
  assert.ok(results.some(r=>r.semanticScore!==null));
  const out=answerFromCandidates(question,results,3,"Mock RRF");
  assert.equal(verifyEvidenceResult(out,docs).ok,true,"exact quote in original and excerpt");
  return out;
}

test("r22 I15: includes baseline, changed interval and unchanged inspection after a leading baseline",()=>{
  const docs=[{id:"m",name:"maintenance.txt",text:[
    "M-05 Lubrication exception The normal lubrication interval is 60 operating hours.",
    "For machines in the sandy test bay, this lubrication interval is reduced to 30 operating hours.",
    "The routine inspection schedule remains unchanged."
  ].join(" ")}];
  const out=hybrid("How does the sandy test bay change the lubrication interval?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/normal lubrication interval is 60 operating hours/i);
  assert.match(out.sources[0].quote,/reduced to 30 operating hours/i);
  assert.match(out.sources[0].quote,/inspection schedule remains unchanged/i);
  assert.ok(out.sources[0].quote.length<=620);
});

test("r22 I15: accepts an equivalent inspection-is-not-altered qualifier",()=>{
  const docs=[{id:"m",name:"maintenance.txt",text:[
    "The standard cleaning interval is 90 operating hours.",
    "In a powder-coated workroom the cleaning interval is shortened to 45 operating hours.",
    "The cleaning exception does not alter the inspection schedule."
  ].join(" ")}];
  const out=hybrid("How does the powder-coated workroom change the cleaning interval?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/90 operating hours/);
  assert.match(out.sources[0].quote,/45 operating hours/);
  assert.match(out.sources[0].quote,/does not alter the inspection schedule/i);
});

test("r22 I15: never crosses a different numbered section even if neighbor mentions inspection",()=>{
  const docs=[{id:"m",name:"maint.txt",text:[
    "M-05 Lubrication The standard lubrication interval is 60 operating hours.",
    "In dusty facilities the lubrication interval is reduced to 30 operating hours.",
    "M-06 Inspection The inspection schedule remains unchanged."
  ].join(" ")}];
  const out=hybrid("How does a dusty facility change the lubrication interval?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/reduced to 30 operating hours/i);
  assert.doesNotMatch(out.sources[0].quote,/M-06 Inspection/);
});

test("r22 I15: does not bridge unrelated sentences to reach a distant qualifier",()=>{
  const docs=[{id:"m",name:"maint.txt",text:[
    "The standard lubrication interval is 60 operating hours.",
    "For dusty factories the interval is reduced to 30 operating hours.",
    "Technicians store cleaning chemicals in a sealed box.",
    "The inspection interval remains unchanged."
  ].join(" ")}];
  const out=hybrid("How does a dusty factory change the lubrication interval?",docs);
  assert.equal(out.answered,true);
  assert.doesNotMatch(out.sources[0].quote,/Technicians store|inspection interval remains unchanged/i);
});

test("r22 I20: comparison extracts list of required order packet items rather than retention",()=>{
  const logistics={id:"l",name:"dispatch.txt",text:[
    "L-02 Shipping packet The dispatch coordinator prepares a packing list, a route sheet, a seal record, and a delivery contact card for every shipment.",
    "Shipping packets are retained for ten years."
  ].join(" ")};
  const purchasing={id:"p",name:"orders.txt",text:[
    "P-03 Order packet Before placing an order, the buyer prepares a requisition, a quote table, an authorization memo, and a delivery date.",
    "P-05 Record retention Purchase order packets are retained for 18 months after closure, unless there is a billing dispute."
  ].join(" ")};
  const question="Compare the shipping packet with the purchase order packet contents.";
  const result=compareDocuments(logistics,purchasing,question);
  assert.equal(result.answered,true);
  assert.equal(result.sources.length,2);
  assert.match(result.sources[0].excerpt,/packing list, a route sheet, a seal record, and a delivery contact card/i);
  assert.match(result.sources[1].excerpt,/requisition, a quote table, an authorization memo, and a delivery date/i);
  assert.doesNotMatch(result.sources[1].excerpt,/retained for 18 months|P-05/);
  for (const [i,doc] of [logistics,purchasing].entries()) {
    assert.ok(doc.text.includes(result.sources[i].excerpt));
  }
});

test("r22 I20: another buying document's packet contents can outrank unrelated retention with reordered clauses",()=>{
  const left={id:"a",name:"cargo.txt",text:"A shipment packet includes a manifest, an airway bill, a carrier ticket, and a delivery slip."};
  const right={id:"b",name:"buying.txt",text:[
    "Purchase order packet records are retained for 24 months after settlement.",
    "The buyer prepares a procurement request, a price comparison, an approval signature, and a shipping plan for every order."
  ].join(" ")};
  const out=compareDocuments(left,right,"Compare shipment packet contents with purchase order packet contents.");
  assert.match(out.sources[1].excerpt,/price comparison, an approval signature, and a shipping plan/);
  assert.doesNotMatch(out.sources[1].excerpt,/retained for 24 months/);
});

test("r22: comparison asking about packet RETENTION still cites retention (not contents)",()=>{
  const a={id:"a",name:"shipping.txt",text:[
    "Shipment packets include a bill, a manifest, a receipt, and a checklist.",
    "Shipment packets are retained for 3 years after arrival."
  ].join(" ")};
  const b={id:"b",name:"purchasing.txt",text:[
    "Buyers prepare a request, a quote, an approval, and a schedule.",
    "Purchase order packets are retained for 18 months after closure."
  ].join(" ")};
  const out=compareDocuments(a,b,"Compare shipment packet retention with purchase order packet retention.");
  assert.match(out.sources[0].excerpt,/retained for 3 years/);
  assert.match(out.sources[1].excerpt,/retained for 18 months/);
});

test("r22 I18: comparison includes adjacent unresolved equipment investigation hold",()=>{
  const shipping={id:"l",name:"delivery.txt",text:
    "L-05 Records Signed delivery receipts are retained for 75 days after delivery, unless a pending cargo claim requires retention until the claim is closed."};
  const maintenance={id:"m",name:"maintenance.txt",text:[
    "M-04 Records Completed inspection cards are retained for 240 days after service.",
    "When an equipment investigation is unresolved, the inspection cards are kept until the investigation closes."
  ].join(" ")};
  const out=compareDocuments(shipping,maintenance,"Compare retention of signed delivery receipts with completed inspection cards, including exceptions.");
  assert.match(out.sources[0].excerpt,/75 days/);
  assert.match(out.sources[0].excerpt,/pending cargo claim/);
  assert.match(out.sources[1].excerpt,/retained for 240 days/);
  assert.match(out.sources[1].excerpt,/kept until the investigation closes/);
  assert.ok(maintenance.text.includes(out.sources[1].excerpt));
});

test("r22 I18: supports alternative same-section retention exception language",()=>{
  const a={id:"a",name:"files.txt",text:"Invoice receipts are retained for 40 days."};
  const b={id:"b",name:"incident.txt",text:[
    "Equipment records must be retained for 365 days after service.",
    "If a review remains pending, records must be held until the review is resolved."
  ].join(" ")};
  const out=compareDocuments(a,b,"Compare retention of invoice receipts and equipment records, including exceptions.");
  assert.match(out.sources[1].excerpt,/365 days/);
  assert.match(out.sources[1].excerpt,/review is resolved/);
});

test("r22 I18: exception expansion never absorbs a neighboring numbered section",()=>{
  const a={id:"a",name:"invoices.txt",text:"Receipts must be retained for 90 days."};
  const b={id:"b",name:"inspection.txt",text:[
    "M-04 Storage Completed inspection cards are retained for 240 days after service.",
    "M-05 Review An unresolved equipment investigation must be held until the case closes."
  ].join(" ")};
  const out=compareDocuments(a,b,"Compare retention of receipts with inspection cards, including exceptions.");
  assert.match(out.sources[1].excerpt,/retained for 240 days/);
  assert.doesNotMatch(out.sources[1].excerpt,/M-05 Review/);
});

test("r22: comparison without explicit exceptions preserves brief relevant quotations",()=>{
  const a={id:"a",name:"ship.txt",text:"Signed receipts are retained for 75 days. A claim is held until closure."};
  const b={id:"b",name:"maint.txt",text:"Inspection cards are retained for 240 days. A case is held until closure."};
  const out=compareDocuments(a,b,"Compare retention durations of signed receipts and inspection cards.");
  assert.doesNotMatch(out.sources[0].excerpt,/claim is held/);
  assert.doesNotMatch(out.sources[1].excerpt,/case is held/);
});

test("r22: general plain question source selection remains unchanged",()=>{
  const source="The evacuation coordinator must call the response team within five minutes.";
  const q="Who must call the response team?";
  assert.equal(bestSourceSentence(q,source),source);
});
