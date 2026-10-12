import test from "node:test";
import assert from "node:assert/strict";
import {buildIndex,answerFromCandidates,RETRIEVAL_BUILD} from "../retrieval.mjs";
import {compareDocuments} from "../research.mjs";
import {verifyEvidenceResult} from "../quality.mjs";

// All fixtures below are new and unrelated to frozen Aster32 or Lantern32.
function hybrid(question,text) {
  const doc={id:"test",name:"synthetic.txt",text};
  const index=buildIndex([doc]);
  const ranked=index.chunks.map(c=>({...c,score:1,lexicalScore:1,semanticScore:0.1}));
  const result=answerFromCandidates(question,ranked,1,"Synthetic hybrid-ranked chunks");
  assert.equal(verifyEvidenceResult(result,[doc]).ok,true);
  return result;
}
test("r25 explicit subject contrast selects visitor arrival instead of staff attendance",()=>{
  const result=hybrid("At what time may regular guests enter the west wing, rather than staff clocking in?",
    "W-01 Access The west wing has staff check-in at 07:30. General guests may enter at 09:20.");
  assert.match(result.answer,/General guests may enter at 09:20/);
  assert.doesNotMatch(result.answer,/staff check-in at 07:30/);
});
test("r25 contrast is symmetric: employees rather than customers",()=>{
  const result=hybrid("When may employees enter the facility instead of customers?",
    "W-01 Hours Customers may enter the facility at 10:30. Employees may enter the facility at 07:20.");
  assert.match(result.answer,/Employees may enter the facility at 07:20/);
  assert.doesNotMatch(result.answer,/Customers may enter the facility at 10:30/);
});
test("r25 comparison-style schedule question retains baseline, change and unaffected calibration",()=>{
  const result=hybrid("Compare standard and salt-air storage bin checks and state whether recalibration changes.",
    "R-03 Inspections Standard storage bins are inspected every 65 operating hours. Bins near the salt-air vent are inspected every 32 operating hours. These checks do not change sensor recalibration, which stays on a 27-day cycle.");
  assert.match(result.answer,/65 operating hours/);
  assert.match(result.answer,/32 operating hours/);
  assert.match(result.answer,/27-day cycle/);
});
test("r25 follow-up decision before cleaning remains source-exact",()=>{
  const source="R-07 Cleanup Once equipment contamination is confirmed, the attendant closes the area and collects a swab. A supervisor decides whether to discard the affected material before sterilization begins.";
  const result=hybrid("What actions follow confirmed equipment contamination, including what must occur before sterilization?",source);
  assert.match(result.answer,/attendant closes the area/);
  assert.match(result.answer,/supervisor decides whether to discard/);
  assert.ok(source.includes(result.sources[0].quote));
});
test("r25 early-release qualifiers retain written permissions and approver",()=>{
  const result=hybrid("For how long is the image private, and under which conditions may it be released early?",
    "D-03 Embargo Restricted images remain private for 17 months after intake. The Rights Lead may authorize early release after written license notes and creator consent are logged.");
  assert.match(result.answer,/17 months after intake/);
  assert.match(result.answer,/Rights Lead may authorize early release/);
  assert.match(result.answer,/written license notes and creator consent/);
});
test("r25 permitted export fields and prohibited items both appear in displayed quote",()=>{
  const result=hybrid("List fields allowed in public export and both categories excluded.",
    "D-06 Exports An allowed export contains a record ID, title, and reuse status. Home addresses and restricted annotations are excluded.");
  assert.match(result.answer,/record ID, title, and reuse status/);
  assert.match(result.answer,/Home addresses and restricted annotations are excluded/);
});
test("r25 lexical Comparison cites both retention exceptions without paraphrasing",()=>{
  const left={id:"l",name:"facility.txt",text:"C-05 Device history Completed inspection sheets are kept for 140 days. Sheets under an unresolved incident inquiry are held until that inquiry closes."};
  const right={id:"r",name:"archive.txt",text:"D-09 Scratch files Temporary working files are deleted 30 days after sign-off. Files under an active court hold remain stored until the hold is released; deletion resumes thereafter."};
  const q="Compare how long inspection sheets and temporary working files remain, including inquiry or court-hold exceptions.";
  const r=compareDocuments(left,right,q);
  assert.match(r.sources[0].excerpt,/140 days/);
  assert.match(r.sources[0].excerpt,/inquiry closes/);
  assert.match(r.sources[1].excerpt,/30 days/);
  assert.match(r.sources[1].excerpt,/deletion resumes thereafter/);
  assert.ok(left.text.includes(r.sources[0].excerpt));
  assert.ok(right.text.includes(r.sources[1].excerpt));
});
test("r25 never crosses unrelated intervening sentence to complete a requested facet",()=>{
  const source="P-03 Duty checks The inspector confirms the room is safe. The cafeteria sells fresh rolls every noon. The manager authorizes a follow-up only after inspection.";
  const result=hybrid("Describe the inspector's duty and who authorizes a follow-up?",source);
  assert.ok(source.includes(result.sources[0].quote));
  assert.doesNotMatch(result.answer,/cafeteria sells/i);
});
test("r25 single-part value question does not grow to adjacent unrelated sentence",()=>{
  const result=hybrid("When does the regular delivery arrive?",
    "T-02 Hours The regular delivery arrives at 11:10. Finance reconciles monthly invoices each Friday.");
  assert.match(result.answer,/11:10/);
  assert.doesNotMatch(result.answer,/Finance reconciles/);
});
test("r25 keeps zero-citation refusal for absent personal phone number",()=>{
  const result=hybrid("What is the personal mobile number of the chief inspector?",
    "H-01 Equipment The chief inspector signs maintenance certificates for generators.");
  assert.equal(result.answered,false);
  assert.equal(result.sources.length,0);
});
test("r25 identifies updated retrieval build",()=>{
  assert.equal(RETRIEVAL_BUILD,"2026-10-12-r27");
});
