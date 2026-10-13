import test from "node:test";
import assert from "node:assert/strict";
import { buildIndex, answerQuestion } from "../retrieval.mjs";
import { createSearchScope, assertSearchScope } from "../search-scope.mjs";
import { createEvidenceReport } from "../report.mjs";
const docs = [{id:"a",name:"a.txt",text:"Crane hooks require inspection every eight shifts."},
  {id:"b",name:"b.txt",text:"Crane hooks require inspection every eleven shifts."}];
test("all-file scope preserves the original index and ranking",()=>{
  const index=buildIndex(docs),scope=createSearchScope(docs,index);
  assert.equal(scope.index,index);assert.deepEqual(answerQuestion("When are crane hooks inspected?",scope.index),answerQuestion("When are crane hooks inspected?",index));
});
test("selection rebuilds lexical statistics and maps cached vectors by stable ID",()=>{
  const index=buildIndex(docs);const markers=index.chunks.map((chunk,i)=>({unitAlignmentMarker:i}));
  const scope=createSearchScope(docs,index,new Set(["b"]),markers);
  assert.deepEqual(scope.index,buildIndex([docs[1]]));assert.equal(scope.vectors[0],markers[index.chunks.findIndex(c=>c.documentId==="b")]);
});
test("empty and removed selections never expand to all files",()=>{
  for(const ids of [new Set(),new Set(["removed"])])assert.equal(createSearchScope(docs,buildIndex(docs),ids).index.chunks.length,0);
});
test("stale cached vector lengths are rejected",()=>assert.throws(()=>createSearchScope(docs,buildIndex(docs),new Set(["a"]),[]),/stale/));
test("scope guard rejects outside citations, renamed files and duplicate IDs",()=>{
  const result={sources:[{documentId:"b"}],searchedFiles:[{id:"a",name:"a.txt"}]};assert.throws(()=>assertSearchScope(result,docs),/outside/);
  for(const files of [[{id:"a",name:"wrong"}],[{id:"a",name:"a.txt"},{id:"a",name:"a.txt"}],[]])assert.throws(()=>assertSearchScope({sources:[],searchedFiles:files},docs));
});
test("report exports searched filenames and rejects out-of-scope sources",()=>{
  const result={...answerQuestion("When are crane hooks inspected?",buildIndex([docs[0]])),searchedFiles:[{id:"a",name:"a.txt"}]};
  assert.match(createEvidenceReport("When are crane hooks inspected?",result,docs),/Searched files.*a/);
  assert.throws(()=>createEvidenceReport("When?",{...result,searchedFiles:[{id:"b",name:"b.txt"}]},docs),/outside/);
});
