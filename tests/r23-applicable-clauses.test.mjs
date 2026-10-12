import test from "node:test";
import assert from "node:assert/strict";
import {buildIndex,answerFromCandidates,answerQuestion,RETRIEVAL_BUILD} from "../retrieval.mjs";
import {hybridRank} from "../hybrid.mjs";
import {verifyEvidenceResult} from "../quality.mjs";

// These documents/questions are synthetic generalizations. They are NOT
// the frozen Lantern32 pack. Hybrid runs use mocked semantic vectors;
// automated Node success is not an actual Chrome MiniLM acceptance test.
function ask(question,docs,hybrid=true) {
  const ix=buildIndex(docs);
  const candidates=hybrid
    ?hybridRank(question,ix,[1,0],ix.chunks.map(()=>[1,0]))
    :null;
  const result=hybrid?answerFromCandidates(question,candidates,3,"Mock Hybrid RRF")
    :answerQuestion(question,ix);
  assert.equal(verifyEvidenceResult(result,docs).ok,true);
  return result;
}
function refuse(result){
  assert.equal(result.answered,false,result.answer);
  assert.deepEqual(result.sources,[]);
  assert.match(result.answer,/can't find this in the provided documents/i);
}
const bookings=[{id:"v",name:"booking-terms.txt",text:[
  "B-01 Booking cancellations Membership reservations cancelled 60 hours or more before arrival earn a full credit.",
  "Reservations cancelled at least 20 hours but less than 60 hours before arrival earn a 35 percent credit.",
  "Cancellations less than 20 hours before arrival are not eligible for credit.",
  "The venue may cancel an event when the building is unsafe."
].join(" ")}];
for(const mode of ["Hybrid","Keyword"]){
  const hybrid=mode==="Hybrid";
  test("r23 "+mode+" chooses applicable relative-time cancellation lower band",()=>{
    const out=ask("What credit applies if a reservation is cancelled 12 hours before arrival?",bookings,hybrid);
    assert.equal(out.answered,true);
    assert.match(out.sources[0].quote,/less than 20 hours before arrival are not eligible for credit/i);
    assert.doesNotMatch(out.answer,/full credit|35 percent/);
  });
  test("r23 "+mode+" preserves upper band without reversing the boundary",()=>{
    const out=ask("What credit applies if a reservation is cancelled 85 hours before arrival?",bookings,hybrid);
    assert.equal(out.answered,true);
    assert.match(out.sources[0].quote,/60 hours or more before arrival earn a full credit/i);
  });
  test("r23 "+mode+" preserves interior and exact lower boundary",()=>{
    const out=ask("What credit applies if a reservation is cancelled 20 hours before arrival?",bookings,hybrid);
    assert.equal(out.answered,true);
    assert.match(out.sources[0].quote,/at least 20 hours but less than 60 hours/i);
  });
  test("r23 "+mode+" refuses to cite an inapplicable printed time branch",()=>{
    const docs=[{id:"b",name:"cancellation.txt",text:
      "Tickets canceled 60 hours or more before arrival receive a refund."}];
    refuse(ask("What refund applies if a ticket is canceled 12 hours before arrival?",docs,hybrid));
  });
}
const staff=[{id:"s",name:"venue-staff.txt",text:[
  "S-02 Facilitator absences If a tutor withdraws before 19:30 on the previous business day, the venue appoints a standby tutor within 45 minutes.",
  "A withdrawal received after 19:30 requires a rescheduling email before 09:45 on the next business day."
].join(" ")}];
for(const mode of ["Hybrid","Keyword"]){
  const hybrid=mode==="Hybrid";
  test("r23 "+mode+" selects the AFTER clock condition",()=>{
    const out=ask("A tutor withdraws after 19:30. When is the rescheduling email due?",staff,hybrid);
    assert.equal(out.answered,true);
    assert.match(out.sources[0].quote,/after 19:30 requires a rescheduling email before 09:45/i);
    assert.doesNotMatch(out.sources[0].quote,/before 19:30/);
  });
  test("r23 "+mode+" selects the BEFORE clock condition",()=>{
    const out=ask("A tutor withdraws before 19:30. When is a standby tutor appointed?",staff,hybrid);
    assert.equal(out.answered,true);
    assert.match(out.sources[0].quote,/before 19:30.+standby tutor within 45 minutes/i);
  });
  test("r23 "+mode+" refuses if the source contains only opposite clock branch",()=>{
    const docs=[{id:"s",name:"hours.txt",text:
      "When an instructor cancels before 19:30, the manager finds a replacement in an hour."}];
    refuse(ask("When does an instructor get a notice if they cancel after 19:30?",docs,hybrid));
  });
}
test("r23 Hybrid extracts adjacent retry and subsequent-failure escalation",()=>{
  const docs=[{id:"a",name:"jobs.txt",text:[
    "R-07 Nightly transfer The scheduled transfer begins at 01:20.",
    "A failed transfer is retried at 02:55.",
    "If the retry fails, the on-call operator opens a ticket before 03:30.",
    "R-08 Release records Archives are retained for three months."
  ].join(" ")}];
  const out=ask("When is a failed nightly transfer retried, and what happens if the retry also fails?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/retried at 02:55/);
  assert.match(out.sources[0].quote,/on-call operator opens a ticket before 03:30/);
  assert.doesNotMatch(out.sources[0].quote,/Archives are retained/);
});
for (const mode of ["Hybrid","Keyword"]) {
  test("r23 "+mode+" refuses a numbered source heading without an operative clause",()=>{
    const docs=[{id:"a",name:"headings.txt",text:"R-07 Nightly transfer"}];
    refuse(ask("When is the nightly transfer performed?",docs,mode==="Hybrid"));
  });
}
for(const mode of ["Hybrid","Keyword"]){
  const hybrid=mode==="Hybrid";
  test("r23 "+mode+" refuses an absent PERSONAL MOBILE NUMBER despite a person and numeric approval",()=>{
    const docs=[{id:"d",name:"supervisor-approvals.txt",text:
      "The Chief Registrar approves transactions above 4000 credits and coordinates the planning team."}];
    refuse(ask("What is the personal mobile number of the Chief Registrar?",docs,hybrid));
  });
  test("r23 "+mode+" answers only when a labeled actual contact number appears",()=>{
    const docs=[{id:"c",name:"contacts.txt",text:
      "The Chief Registrar's mobile number is +971 50 234 5678. The finance coordinator reviews requests."}];
    const out=ask("What is the mobile number of the Chief Registrar?",docs,hybrid);
    assert.equal(out.answered,true);
    assert.match(out.sources[0].quote,/mobile number is \+971 50 234 5678/i);
  });
}
test("r23 ordinary operational questions do not trigger unsupported-contact false refusals",()=>{
  const docs=[{id:"c",name:"policy.txt",text:
    "Staff must never post a supervisor's mobile phone number on a public notice board."}];
  const out=ask("How should mobile phone numbers be handled on public notice boards?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/never post/);
});
test("r23 keeps preceding r20 approval and dispatch applicability behavior",()=>{
  const docs=[{id:"p",name:"approvals.txt",text:[
    "Purchases above 800 and up to 4000 credits require Budget Manager approval.",
    "Purchases above 4000 credits require written approval by both Finance Lead and Operations Director.",
    "Orders must be released by 14:20 for same-day dispatch.",
    "Orders released after 14:20 leave on the next operating day."
  ].join(" ")}];
  const out=ask("Who must approve purchases above 4000 credits?",docs);
  assert.equal(out.answered,true);
  assert.match(out.sources[0].quote,/Finance Lead and Operations Director/);
  const next=ask("An outbound order is released at 15:00. When does it leave?",docs);
  assert.equal(next.answered,true);
  assert.match(next.sources[0].quote,/next operating day/);
});
test("current build explicitly identifies changed browser code",()=>{
  assert.equal(RETRIEVAL_BUILD,"2026-10-12-r34");
});

test("r23 refuses a differently named person's labeled phone number",()=>{
  const docs=[{id:"people",name:"team.txt",text:[
    "The Chief Registrar approves records for the archive.",
    "The Visitor Steward's mobile number is +971 55 234 9876."
  ].join(" ")}];
  refuse(ask("What is the mobile number of the Chief Registrar?",docs));
});
