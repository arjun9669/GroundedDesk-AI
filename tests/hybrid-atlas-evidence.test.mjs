import test from "node:test";
import assert from "node:assert/strict";
import { buildIndex, tokenize, answerFromCandidates, answerQuestion } from "../retrieval.mjs";
import { hybridRank } from "../hybrid.mjs";
import { verifyEvidenceResult } from "../quality.mjs";

// Regression scenarios from the original Atlas r16 Windows Chrome scorecard.
// These are synthetic excerpts with deterministic mock vectors, NOT actual MiniLM
// inference. Actual Chrome/real model acceptance is a separate release gate.
const docs = [
  {id:"g",name:"01_Atlas_AI_Governance_Policy.pdf",text:[
    "G-01 Release authority High-risk releases require written approval from both the AI Release Council and the Security Officer before deployment.",
    "G-02 Required evidence package Before a release review, the Model Owner assembles a model card, a risk register, a test results log, a data-flow diagram, and a rollback plan.",
    "For this simulated policy, pilot teams must not use patient records, private bank statements, or employer-confidential files.",
    "G-05 Pre-release evaluation gate The Model Owner runs a forty-question pilot: thirty supported questions and ten deliberately unsupported questions.",
    "At least 95 percent of displayed citations must match the original source text.",
    "The source-selection target is at least 90 percent on the supported questions."
  ].join(" ")},
  {id:"i",name:"02_Atlas_Incident_Response_Runbook.pdf",text:[
    "R-02 Acknowledgement deadlines The on-call responder must acknowledge P1 alerts within 15 minutes of detection.",
    "R-03 Internal containment targets For P1 incidents, the Incident Commander must direct initial containment within 30 minutes of confirmation.",
    "R-05 Evidence handling Exported evidence packets are retained for 90 days in the simulated audit store, unless a longer legal hold is issued."
  ].join(" ")},
  {id:"v",name:"03_Atlas_Vendor_AI_Assessment.pdf",text:[
    "V-01 Review trigger Local-only processing that sends no document content to a supplier may receive an abbreviated review, subject to Security Officer approval.",
    "V-03 Risk scoring bands Scores from 0 through 25 are Low, 26 through 60 are Medium, and 61 through 100 are High.",
    "A High vendor risk requires written acceptance by both Legal Counsel and the Security Officer.",
    "V-07 Human review of generated claims A correct citation number does not establish factual entailment."
  ].join(" ")}
];
const index=buildIndex(docs);
function mockedHybrid(q) {
  const ranked=hybridRank(q,index,[1,0],index.chunks.map(()=>[1,0]));
  assert.ok(ranked.some(x=>x.semanticScore!==null),"mock-vector RRF path required");
  return answerFromCandidates(q,ranked,3,"Mock-vector Hybrid");
}
function rankedFragment(doc, content, question) {
  assert.ok(doc.text.includes(content),"fragment must really be in source");
  const tf=new Map();
  for (const term of tokenize(content))tf.set(term,(tf.get(term)||0)+1);
  return [{
    id:doc.id+":manual",documentId:doc.id,filename:doc.name,
    content,sourceText:doc.text,start:doc.text.indexOf(content),
    tf,score:0.04,lexicalScore:0.1,semanticScore:0.72
  }];
}
test("D03: Hybrid extracts the literal 95-percent pilot provenance target from the full source",()=>{
  const q="What is the citation provenance target for the fictional pilot?";
  const gov=docs[0];
  const fragment="For this simulated policy, pilot teams must not use patient records, private bank statements, or employer-confidential files.";
  const out=answerFromCandidates(q,rankedFragment(gov,fragment,q),3,"Hybrid mock");
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/At least 95 percent of displayed citations/i);
  assert.ok(gov.text.includes(out.sources[0].quote));
  assert.equal(verifyEvidenceResult(out,docs).ok,true);
});
test("D06: Hybrid restores complete retention sentence including legal hold even from a broken chunk",()=>{
  const q="How long are exported incident evidence packets retained?";
  const doc=docs[1];
  const chunk="Exported evidence packets are retained for 90 days in the simulated audit store, unless";
  const out=answerFromCandidates(q,rankedFragment(doc,chunk,q),3,"Hybrid mock");
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/90 days.*unless a longer legal hold is issued/i);
  assert.ok(doc.text.includes(out.sources[0].quote));
  assert.equal(verifyEvidenceResult(out,docs).ok,true);
});
test("D08: Hybrid selects written Legal and Security acceptance, not unrelated abbreviated review",()=>{
  const q="What approvals are needed to accept a High-risk supplier?";
  const doc=docs[2];
  const chunk="Local-only processing that sends no document content to a supplier may receive an abbreviated review, subject to Security Officer approval.";
  const out=answerFromCandidates(q,rankedFragment(doc,chunk,q),3,"Hybrid mock");
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/written acceptance by both Legal Counsel and the Security Officer/i);
  assert.doesNotMatch(out.sources[0].quote,/abbreviated review/i);
  assert.equal(verifyEvidenceResult(out,docs).ok,true);
});
test("Multi-PDF Hybrid citation precision: preserve strong release evidence and prune irrelevant docs",()=>{
  const q="What two approvals are needed for a high-risk AI release?";
  const out=mockedHybrid(q);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/AI Release Council and the Security Officer/i);
  assert.equal(out.sources.length,1,"Unrelated vendor approval and runbook references are not supporting release approvals");
  assert.equal(verifyEvidenceResult(out,docs).ok,true);
});
test("D07 Hybrid avoids extra unrelated governance citation",()=>{
  const out=mockedHybrid("Which supplier scores qualify as High risk?");
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/61 through 100 are High/i);
  assert.equal(out.sources.length,1);
  assert.equal(verifyEvidenceResult(out,docs).ok,true);
});
test("Hybrid absence refusals N13 N14 N15 remain zero-citation responses",()=>{
  for (const q of [
    "What is the CEO of Atlas Research Group's date of birth?",
    "What is the current price of Bitcoin in AED?",
    "What is the exact database password used by Atlas Research Group?"
  ]) {
    const out=mockedHybrid(q);
    assert.equal(out.answered,false,q);
    assert.deepEqual(out.sources,[],q);
  }
});
test("Keyword r16 behavior still selects direct Atlas evidence",()=>{
  const q="What is the citation provenance target for the fictional pilot?";
  const out=answerQuestion(q,index);
  assert.match(out.sources[0]?.quote||"",/At least 95 percent of displayed citations/i);
});
test("Semantic-only Hybrid paraphrase still uses local excerpt when there is no lexical evidence",()=>{
  const d=[{id:"roof",name:"roof.txt",text:"Vapor management under the roof prevents moisture accumulation in the attic."}];
  const idx=buildIndex(d);
  const q="How is condensation handled above the house?";
  const ranked=hybridRank(q,idx,[1,0],idx.chunks.map(()=>[1,0]));
  const out=answerFromCandidates(q,ranked,3,"Hybrid mock");
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/Vapor management under the roof/i);
  assert.equal(verifyEvidenceResult(out,d).ok,true);
});
