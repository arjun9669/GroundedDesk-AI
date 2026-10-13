import test from "node:test";
import assert from "node:assert/strict";
import { documentReadiness } from "../document-readiness.mjs";
import { buildIndex, answerQuestion } from "../retrieval.mjs";
const pdf = { id:"p",name:"notes.pdf",type:"pdf",text:"First.\n\n\n\nFinal.",pdfPageTexts:["First.","","Final."],pdfDiagnostics:{pageCount:3,searchablePages:2,emptyPages:[2],separatedRowsPages:[]} };
test("TXT and Markdown readiness reports loaded text, never PDF pages or confidence",()=>{
  for(const name of ['notes.txt','notes.md']){
    const r=documentReadiness({name,type:'txt',text:'Loaded text.'});
    assert.equal(r.state,'ready');assert.equal(r.label,'Text available');assert.deepEqual(r.warnings,[]);assert.doesNotMatch(r.detail,/page|confidence|accurac/i);
  }
});
test("partial PDF uses actual searchable-page count and does not diagnose blank pages as scanned",()=>{
  const r=documentReadiness(pdf);assert.equal(r.state,'limited');assert.equal(r.label,'Partial text coverage');assert.equal(r.detail,'2 of 3 PDF pages contain searchable text.');
  assert.match(r.warnings[0],/pages 2.*blank or scanned/);assert.match(r.guidance,/OCR on your device/);
});
test("fully searchable PDF and layout-limited PDF have distinct honest states",()=>{
  const full={...pdf,text:'First.\n\nFinal.',pdfPageTexts:['First.','Final.'],pdfDiagnostics:{pageCount:2,searchablePages:2,emptyPages:[],separatedRowsPages:[]}};
  assert.equal(documentReadiness(full).state,'ready');assert.match(documentReadiness(full).guidance,/does not verify/);
  const layout={...full,pdfDiagnostics:{...full.pdfDiagnostics,separatedRowsPages:[1]}};
  assert.equal(documentReadiness(layout).label,'Review layout');assert.match(documentReadiness(layout).warnings[0],/not reconstructed/);
});
test("missing, stale and contradictory PDF metadata cannot claim checked coverage",()=>{
  for(const doc of [{...pdf,pdfPageTexts:undefined},{...pdf,text:'Different text.'},{...pdf,pdfDiagnostics:{...pdf.pdfDiagnostics,pageCount:4}},
    {...pdf,pdfDiagnostics:{...pdf.pdfDiagnostics,searchablePages:3}},{...pdf,pdfDiagnostics:{...pdf.pdfDiagnostics,emptyPages:[1]}},
    {...pdf,pdfDiagnostics:{...pdf.pdfDiagnostics,separatedRowsPages:[4]}}]) assert.equal(documentReadiness(doc).state,'unknown');
  assert.equal(documentReadiness({...pdf,text:' '}).state,'unavailable');
});
test("readiness is presentation-only: no document mutation or changed indexing/answer",()=>{
  const before=structuredClone(pdf);const index=buildIndex([pdf]);const answer=answerQuestion('What is final?',index);
  documentReadiness(pdf);assert.deepEqual(pdf,before);assert.deepEqual(buildIndex([pdf]),index);assert.deepEqual(answerQuestion('What is final?',buildIndex([pdf])),answer);
});
