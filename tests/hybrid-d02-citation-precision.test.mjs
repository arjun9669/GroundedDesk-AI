import test from "node:test";
import assert from "node:assert/strict";
import { buildIndex, answerFromCandidates } from "../retrieval.mjs";
import { hybridRank } from "../hybrid.mjs";
import { verifyEvidenceResult } from "../quality.mjs";

// r17 Chrome D02: the first source correctly listed all five release items,
// but two source-literal passages did not support the question. These
// compact reproductions use synthetic excerpts and MOCK vectors, not MiniLM.
const docs = [
  { id:"g",name:"01_Atlas_AI_Governance_Policy.pdf",
    text:"G-02 Required evidence package Before a release review, the Model Owner assembles a model card, a risk register, a test results log, a data-flow diagram, and a rollback plan." },
  { id:"i",name:"02_Atlas_Incident_Response_Runbook.pdf",
    text:"The Model Owner verifies whether source citations or draft answers must be withdrawn." },
  { id:"v",name:"03_Atlas_Vendor_AI_Assessment.pdf",
    text:"The procuring team must record human validation examples before approving sensitive use cases." }
];
const index = buildIndex(docs);
function mockedHybrid(question, sourceIndex=index){
  const rankings=hybridRank(question,sourceIndex,[1,0],sourceIndex.chunks.map(()=>[1,0]));
  assert.ok(rankings.some(c=>c.semanticScore!==null),"The test must execute RRF with mock semantic vectors");
  return { rankings, answer:answerFromCandidates(question,rankings,3,"Hybrid mock vectors") };
}
test("r17 D02 precision: Hybrid cites only the matching evidence package, not generic must-statements",()=>{
  const question="What must be included in the pre-release evidence package?";
  const {rankings,answer}=mockedHybrid(question);
  assert.ok(rankings.some(c=>c.documentId==="g"));
  assert.ok(rankings.some(c=>c.documentId==="i"));
  assert.ok(rankings.some(c=>c.documentId==="v"));
  assert.equal(answer.answered,true);
  assert.equal(answer.sources.length,1,"Remove both irrelevant cross-document quotations");
  assert.equal(answer.sources[0].documentId,"g");
  assert.match(answer.sources[0].quote,/model card, a risk register, a test results log, a data-flow diagram, and a rollback plan/i);
  assert.equal(answer.sources[0].citation,1);
  assert.equal(verifyEvidenceResult(answer,docs).ok,true);
});
test("r18 keeps multi-document intent even when one quotation has weaker word overlap",()=>{
  const question="Compare the required evidence package with vendor human-validation records.";
  const {answer}=mockedHybrid(question);
  assert.equal(answer.answered,true);
  assert.ok(answer.sources.length>=2,"Comparison intent must not collapse distinct cited documents");
  assert.ok(answer.sources.some(s=>s.documentId==="g"));
  assert.ok(answer.sources.some(s=>s.documentId==="v"));
  assert.equal(verifyEvidenceResult(answer,docs).ok,true);
});
test("r18 does not discard secondary semantic-only paraphrase evidence",()=>{
  const files=[
    {id:"a",name:"roof.txt",text:"Vapor management under the roof prevents moisture accumulation in the attic."},
    {id:"b",name:"walls.txt",text:"Ventilation improves air exchange and limits mold on walls."}
  ];
  const question="How can humidity be avoided indoors?";
  const {rankings,answer}=mockedHybrid(question,buildIndex(files));
  assert.ok(rankings.every(c=>c.semanticScore!==null));
  assert.equal(answer.answered,true);
  assert.equal(answer.sources.length,2,"Without strong lexical coverage keep the semantic-only candidates");
  assert.equal(verifyEvidenceResult(answer,files).ok,true);
});
