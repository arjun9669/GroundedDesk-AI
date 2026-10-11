import test from "node:test";
import assert from "node:assert/strict";
import {buildIndex,answerFromCandidates,answerQuestion} from "../retrieval.mjs";
import {hybridRank} from "../hybrid.mjs";
import {verifyEvidenceResult} from "../quality.mjs";

// Generalized synthetic counterparts of frozen Meridian I07 and I10.
// Actual Chrome r19 outcomes remain 18/24. These tests use mock vectors
// (not real MiniLM), and cannot establish r20 browser accuracy.
const rules=[
  {id:"proc",name:"purchase-rules.txt",text:[
    "R-01 Approval bands Purchases up to and including 800 credits require Team Coordinator approval.",
    "Purchases above 800 and up to 4000 credits require Budget Manager approval.",
    "Purchases above 4000 credits require written approval by both the Finance Lead and the Operations Director."
  ].join(" ")},
  {id:"log",name:"dispatch-rules.txt",text:[
    "L-01 Dispatch cutoff Standard outbound orders must be released by 14:20 local depot time for same-day dispatch.",
    "Orders released after the standard cutoff leave the depot on the next operating day."
  ].join(" ")}
];
function query(q,docs=rules,hybrid=true){
  const idx=buildIndex(docs);
  if(!hybrid) return answerQuestion(q,idx);
  const ranked=hybridRank(q,idx,[1,0],idx.chunks.map(()=>[1,0]));
  assert.ok(ranked.some(c=>c.semanticScore!==null),"must test RRF candidate path, not real MiniLM");
  return answerFromCandidates(q,ranked,3,"Mock-vector Hybrid");
}
for(const mode of ["Hybrid","Keyword"]){
  const hybrid=mode==="Hybrid";
  test("5.4 r20 "+mode+" selects written approvals for a purchase ABOVE the upper band",()=>{
    const out=query("Who must approve a purchase above 4000 credits?",rules,hybrid);
    assert.equal(out.answered,true);
    assert.equal(out.sources[0].documentId,"proc");
    assert.match(out.sources[0].quote,/above 4000 credits require written approval by both the Finance Lead and the Operations Director/i);
    assert.doesNotMatch(out.answer,/Budget Manager/);
    assert.equal(verifyEvidenceResult(out,rules).ok,true);
  });
  test("5.4 r20 "+mode+" preserves an EXACT lower threshold approval rule",()=>{
    const out=query("Who approves a purchase costing exactly 800 credits?",rules,hybrid);
    assert.equal(out.answered,true);
    assert.match(out.sources[0].quote,/up to and including 800 credits require Team Coordinator/i);
    assert.doesNotMatch(out.sources[0].quote,/Budget Manager/);
  });
  test("5.4 r20 "+mode+" selects the actual post-cutoff departure outcome",()=>{
    const out=query("An outbound order is released at 15:00. When does it leave the depot?",rules,hybrid);
    assert.equal(out.answered,true);
    assert.equal(out.sources[0].documentId,"log");
    assert.match(out.sources[0].quote,/next operating day/i);
    assert.equal(verifyEvidenceResult(out,rules).ok,true);
  });
}
test("5.4 r20 supports a different numerical currency threshold, not Meridian-specific rules",()=>{
  const docs=[{id:"spend",name:"expenses.txt",text:[
    "Expenses of up to 250 units need a Team Lead signature.",
    "Expenses over 250 units must be authorized by the Finance Controller."
  ].join(" ")}];
  const out=query("Who must authorize spending over 250 units?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/over 250 units must be authorized by the Finance Controller/i);
});
test("5.4 r20 supports another dispatch time, not hard-coded to 14:20 or 15:00",()=>{
  const docs=[{id:"ship",name:"shipping.txt",text:[
    "Shipments released before the 16:30 dispatch cutoff go out the same day.",
    "Orders released after the cutoff leave on the following working day."
  ].join(" ")}];
  const out=query("An outbound order is released at 17:10. When does it leave the depot?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/following working day/i);
});
test("5.4 r20 avoids claiming a next-day outcome when source states only a cutoff",()=>{
  const docs=[{id:"d",name:"cutoff.txt",text:"Orders must be released by 14:20 for same-day dispatch. No other scheduling rule is specified."}];
  const out=query("An outbound order is released at 15:00. When does it leave the depot?",docs);
  // Verbatim, incomplete cutoff context is not a next-day answer.
  assert.doesNotMatch(out.answer,/next operating day/);
  assert.equal(verifyEvidenceResult(out,docs).ok,true);
});
test("5.4 r20 does not rewrite legitimate general approval and arrival questions",()=>{
  const docs=[{id:"p",name:"approvals.txt",text:"The Quality Officer must approve all safety audits before closure."}];
  const out=query("Who must approve safety audits?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/Quality Officer must approve/i);
});
