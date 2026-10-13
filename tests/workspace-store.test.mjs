import assert from "node:assert/strict";
import test from "node:test";
import { createWorkspaceSnapshot, validateWorkspaceSnapshot } from "../workspace-store.mjs";
const doc = { id:"one", name:"notes.md", type:"txt", sample:false, text:"Safe fictional notes.", question:"not saved", answer:"not saved", pdfDiagnostics:{stale:true} };
test("snapshot keeps only documents and selection, with no conversation or derived metadata", () => {
  const snap = createWorkspaceSnapshot([doc], new Set(["one"]), 100);
  assert.deepEqual(snap, { version:1,savedAt:100,files:[{id:"one",name:"notes.md",type:"txt",sample:false,text:doc.text}],selectedIds:["one"] });
  snap.selectedIds.push("two"); assert.equal(doc.id,"one");
});
test("all files and empty explicit selections remain distinct", () => {
  assert.equal(createWorkspaceSnapshot([doc]).selectedIds,null);
  assert.deepEqual(createWorkspaceSnapshot([doc],new Set()).selectedIds,[]);
});
test("PDF snapshot preserves original bytes and discards stored extraction", async () => {
  const file = new Blob(["%PDF-fixture"],{type:"application/pdf"});
  const snap = createWorkspaceSnapshot([{...doc,type:"pdf",originalFile:file,pdfPageTexts:["stale"]}]);
  assert.equal(await snap.files[0].originalFile.text(),"%PDF-fixture");
  assert.equal(snap.files[0].text,undefined); assert.equal(snap.files[0].pdfPageTexts,undefined);
});
test("invalid schema, stale selections, duplicate IDs and exceeded limits are rejected", () => {
  const valid=createWorkspaceSnapshot([doc]);
  for(const value of [null,{...valid,version:2},{...valid,savedAt:NaN},{...valid,files:[]},
    {...valid,selectedIds:["missing"]},{...valid,selectedIds:["one","one"]},{...valid,files:[doc,doc]},
    {...valid,files:[{...doc,text:" "}]},{...valid,files:[{...doc,text:"x".repeat(180001)}]},
    {...valid,files:[{...doc,type:"pdf",originalFile:new Blob([])}]},
    {...valid,files:[{...doc,type:"pdf",originalFile:new Blob([new Uint8Array(5*1024*1024+1)])}]},
    {...valid,files:Array.from({length:16},(_,i)=>({...doc,id:String(i)}))}])
    assert.throws(()=>validateWorkspaceSnapshot(value),/invalid/);
});
