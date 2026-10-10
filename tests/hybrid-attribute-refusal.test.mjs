import test from "node:test";
import assert from "node:assert/strict";
import { buildIndex, answerQuestion, answerFromCandidates } from "../retrieval.mjs";
import { hybridRank } from "../hybrid.mjs";
import { verifyEvidenceResult } from "../quality.mjs";

// Regression from the user's 2026-10-10 laptop Chrome report: MiniLM + BM25
// RRF displayed three real Atlas *cover headings* as support for an absent
// "exact database password". Model similarity and literal source provenance
// must never be presented as proof of a requested attribute.
const atlasTitles=[
 {id:"gov",name:"01_Atlas_AI_Governance_Policy.pdf",
   text:"GROUNDEDDESK AI | SYNTHETIC BENCHMARK MATERIAL | OCT 2026 Page 1 PRACTICE DOCUMENT / AGP-01 AI Governance and Release Policy Atlas Research Group. This fictional organization runs small document intelligence prototypes, including retrieval-based question answering. High-risk releases require Council approval."},
 {id:"inc",name:"02_Atlas_Incident_Response_Runbook.pdf",
   text:"GROUNDEDDESK AI | SYNTHETIC BENCHMARK MATERIAL | OCT 2026 Page 1 PRACTICE DOCUMENT / IRR-02 Document AI Incident Response Runbook Atlas Research Group. The simulated Incident Response Team triages document-exposure risks and service disruptions."},
 {id:"vendor",name:"03_Atlas_Vendor_AI_Assessment.pdf",
   text:"GROUNDEDDESK AI | SYNTHETIC BENCHMARK MATERIAL | OCT 2026 Page 1 PRACTICE DOCUMENT / VRA-03 External AI Vendor Assessment Guide Atlas Research Group. This fictional procurement guide covers external language models, hosted vector storage, and document parsing."}
];
const ix=buildIndex(atlasTitles);
const vectors=ix.chunks.map(()=>[1,0,0]);
function simulatedHybrid(question) {
 const rankings=hybridRank(question,ix,[1,0,0],vectors);
 assert.ok(rankings.some(c=>c.semanticScore!==null),"Test must exercise semantic RRF candidates");
 return answerFromCandidates(question,rankings,3,
   "Local MiniLM + BM25-style reciprocal-rank fusion (extractive; no generative LLM)");
}
for(const [id,question] of [
 ["N13","What is the CEO of Atlas Research Group's date of birth?"],
 ["N14","What is the current price of Bitcoin in AED?"],
 ["N15","What is the exact database password used by Atlas Research Group?"]
]) {
 test("5.3.1 Hybrid "+id+" rejects metadata overlap with no attribute fact",()=>{
   const result=simulatedHybrid(question);
   assert.equal(result.answered,false);
   assert.deepEqual(result.sources,[]);
   assert.match(result.answer,/can't find this in the provided documents/i);
   assert.equal(verifyEvidenceResult(result,atlasTitles).ok,true);
   assert.match(result.mode,/MiniLM/);
 });
}
test("5.3.1 Keyword N15 remains a refusal, with no cited metadata",()=>{
 const result=answerQuestion("What is the exact database password used by Atlas Research Group?",ix);
 assert.equal(result.answered,false);
 assert.deepEqual(result.sources,[]);
});
test("5.3.1 Hybrid does not treat credential-handling guidance as a password value",()=>{
 const docs=[{id:"a",name:"rules.txt",
   text:"Acme's database password policy requires rotating the password every month. The IT team reviews credential handling quarterly."}];
 const index=buildIndex(docs);
 const ranks=hybridRank("What is the exact database password used by Acme?",
   index,[1,0],index.chunks.map(()=>[1,0]));
 const out=answerFromCandidates("What is the exact database password used by Acme?",
   ranks,3,"Test hybrid");
 assert.equal(out.answered,false);
 assert.deepEqual(out.sources,[]);
});
test("5.3.1 Hybrid still answers legitimate password-rotation guidance",()=>{
 const docs=[{id:"a",name:"rules.txt",
   text:"A service database password must be rotated monthly. Every credential owner records the rotation."}];
 const index=buildIndex(docs);
 const q="How often must the service database password be rotated?";
 const ranks=hybridRank(q,index,[1,0],index.chunks.map(()=>[1,0]));
 const out=answerFromCandidates(q,ranks,3,"Test hybrid");
 assert.equal(out.answered,true);
 assert.match(out.sources[0].quote,/rotated monthly/i);
 assert.equal(verifyEvidenceResult(out,docs).ok,true);
});
test("5.3.1 Hybrid retains genuine semantic-only paraphrase support",()=>{
 const docs=[{id:"a",name:"roof.txt",
   text:"Vapor management under the roof prevents moisture accumulation in the attic."}];
 const index=buildIndex(docs);
 const q="How is condensation handled above the house?";
 const ranks=hybridRank(q,index,[1,0],index.chunks.map(()=>[1,0]));
 const out=answerFromCandidates(q,ranks,3,"Test hybrid");
 assert.equal(out.answered,true);
 assert.match(out.sources[0].quote,/Vapor management under the roof/i);
 assert.equal(verifyEvidenceResult(out,docs).ok,true);
});
