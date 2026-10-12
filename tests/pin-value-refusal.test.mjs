import test from "node:test";
import assert from "node:assert/strict";
import {buildIndex,answerFromCandidates} from "../retrieval.mjs";
// Synthetic candidate scores exercise the shared answer guard, not model accuracy.
const answer = (question,text) => {
  const index=buildIndex([{id:"demo",name:"fictional-door.txt",text}]);
  return answerFromCandidates(question,index.chunks.map(c=>({...c,score:1,lexicalScore:1,semanticScore:.1})),1,"Synthetic ranked candidate guard unit test");
};
test("an unknown door PIN cannot be answered by a matching document title",()=>{
  const out=answer("What is the exact PIN code for the fictional dome door?","Fictional Dome Guide. Each dome session admits 40 visitors.");
  assert.equal(out.answered,false); assert.deepEqual(out.sources,[]);
});
test("PIN policy text and neighboring times are insufficient numerical values",()=>{
  for(const text of ["The dome PIN code policy requires daily review. The dome opens at 0830.","The dome PIN code changes every 1200 hours."]){
    const out=answer("What is the dome PIN code?",text);
    assert.equal(out.answered,false); assert.equal(out.sources.length,0);
  }
});
test("a fictional explicitly labeled PIN is still answerable without blanket refusal",()=>{
  const out=answer("What is the fictional dome PIN code?","The fictional dome PIN code is 0482.");
  assert.equal(out.answered,true); assert.match(out.answer,/0482/);
});
test("access-code wording requires an actual labeled value",()=>{
  const out=answer("Provide the exact door code.","The door code policy is reviewed every 12 days.");
  assert.equal(out.answered,false); assert.deepEqual(out.sources,[]);
  assert.equal(answer("What is the fictional door code?","The fictional door code: 6824.").answered,true);
});
test("operational PIN policy and rotation questions remain answerable",()=>{
  const out=answer("When must the dome PIN code be rotated?","The dome PIN code must be rotated every seven days.");
  assert.equal(out.answered,true); assert.match(out.answer,/seven days/);
});
test("a physical retaining pin question does not require a numeric credential",()=>{
  const out=answer("Which retaining pin is required for the fictional clamp?","The fictional clamp requires a brass retaining pin.");
  assert.equal(out.answered,true); assert.match(out.answer,/brass/);
});
