import test from "node:test";
import assert from "node:assert/strict";
import {buildIndex, answerFromCandidates, answerQuestion, RETRIEVAL_BUILD} from "../retrieval.mjs";
import {hybridRank} from "../hybrid.mjs";
import {compareDocuments} from "../research.mjs";
import {verifyEvidenceResult} from "../quality.mjs";

// These are newly authored, unrelated synthetic fixtures. The frozen
// Lantern32 data and its answer key are deliberately never imported here.
function hybrid(question,docs) {
  const index=buildIndex(docs);
  const ranked=hybridRank(question,index,[1,0],index.chunks.map(()=>[1,0]));
  const out=answerFromCandidates(question,ranked,3,"Synthetic mock-vector Hybrid");
  assert.equal(verifyEvidenceResult(out,docs).ok,true);
  return out;
}
test("r24 trace: a multi-part procedure quotes every same-section action and the prohibition",()=>{
  const docs=[{id:"s",name:"camp-security.txt",text:[
    "P-03 Lost permit When a visitor misplaces a permit, the desk officer alerts the duty supervisor at once.",
    "The duty supervisor calls the recovery lead, who opens a tracing record.",
    "Employees must never post the visitor's full name on a public display.",
    "P-04 Elevator checks Lift doors are tested after each repair."
  ].join(" ")}];
  const out=hybrid("What should staff do when a visitor misplaces a permit, and what must they avoid publicly posting?",docs);
  assert.match(out.sources[0].quote,/alerts the duty supervisor/i);
  assert.match(out.sources[0].quote,/opens a tracing record/i);
  assert.match(out.sources[0].quote,/never post the visitor's full name/i);
  assert.doesNotMatch(out.sources[0].quote,/Elevator|Lift doors/i);
  assert.ok(out.sources[0].quote.length<=620);
});
test("r24 keeps a two-part routine and exception, not just the first sentence",()=>{
  const docs=[{id:"m",name:"storage.txt",text:[
    "S-04 Checks The cold-room seal is checked every twelve days or 70 opening cycles, whichever occurs earlier.",
    "An unscheduled emergency access does not restart either count.",
    "S-05 Personnel All guards wear identification badges."
  ].join(" ")}];
  const out=hybrid("How often are cold-room seals checked, and does an emergency access restart the count?",docs);
  assert.match(out.sources[0].quote,/twelve days or 70 opening cycles/i);
  assert.match(out.sources[0].quote,/emergency access does not restart either count/i);
  assert.doesNotMatch(out.sources[0].quote,/guards wear/i);
});
test("r24 captures the signatory after the intake matching condition",()=>{
  const docs=[{id:"a",name:"media-ingest.txt",text:[
    "R-01 Intake The ingest receipt and frame ledger must agree with the transferred asset manifest.",
    "The preservation officer signs the acceptance record.",
    "R-02 Backup Daily backups begin at midnight."
  ].join(" ")}];
  const out=hybrid("Which records must match the transferred asset manifest, and who signs the acceptance record?",docs);
  assert.match(out.sources[0].quote,/ingest receipt and frame ledger/i);
  assert.match(out.sources[0].quote,/preservation officer signs/i);
  assert.doesNotMatch(out.sources[0].quote,/Daily backups/i);
});
test("r24 safeguards retain a preceding no-overwrite clause",()=>{
  const docs=[{id:"o",name:"scanning.txt",text:[
    "T-02 Transcription Automatic reading suggestions are permitted, but the scanned master is never overwritten.",
    "Two independent reviewers approve any corrected name of a person or place."
  ].join(" ")}];
  const out=hybrid("What safeguards apply when transcription corrects a person's or place's name?",docs);
  assert.match(out.sources[0].quote,/scanned master is never overwritten/i);
  assert.match(out.sources[0].quote,/Two independent reviewers approve/i);
});
test("r24 age-linked publication consent includes the explicit insufficiency rule",()=>{
  const docs=[{id:"e",name:"academy.txt",text:[
    "E-06 Images Class photographs may be published only with signed permission for the specific event.",
    "For a student under 15, a parent must sign.",
    "Spoken approval alone is insufficient.",
    "E-07 Equipment Tablets are charged every Monday."
  ].join(" ")}];
  const out=hybrid("What consent is needed to publish class photographs of a student under 15?",docs);
  assert.match(out.sources[0].quote,/signed permission for the specific event/i);
  assert.match(out.sources[0].quote,/parent must sign/i);
  assert.match(out.sources[0].quote,/Spoken approval alone is insufficient/i);
  assert.doesNotMatch(out.sources[0].quote,/Tablets/i);
});
test("r24 generic procedural question includes successive actor's before-action decision",()=>{
  const docs=[{id:"d",name:"lab.txt",text:[
    "Q-09 Leak response When a leak is confirmed, the shift aide locks the affected room and records a photo.",
    "The engineer decides whether to isolate equipment before cleanup begins.",
    "Q-10 Supplies Cleaning soap is delivered on Fridays."
  ].join(" ")}];
  const out=hybrid("What happens immediately after a leak is confirmed?",docs);
  assert.match(out.sources[0].quote,/locks the affected room and records a photo/i);
  assert.match(out.sources[0].quote,/engineer decides whether to isolate equipment before cleanup/i);
  assert.doesNotMatch(out.sources[0].quote,/delivered on Fridays/i);
});
test("r24 comparison with two explicit facets includes schedules and exceptions from each source",()=>{
  const left={id:"l",name:"housing.txt",text:[
    "H-05 Inspections Standard tank seals are checked every 100 running hours.",
    "Seals beside the external vent are checked every 50 running hours.",
    "The increased checks do not change instrument recertification, which remains once per 25 days."
  ].join(" ")};
  const right={id:"r",name:"training.txt",text:[
    "T-08 Doors The room lead checks fire exits 20 minutes before a course.",
    "A blocked exit stops the class until the safety manager confirms clearance."
  ].join(" ")};
  const out=compareDocuments(left,right,"Compare tank seal checks beside the external vent with training-room fire exits, including scheduling and exceptions.");
  assert.match(out.sources[0].excerpt,/100 running hours/);
  assert.match(out.sources[0].excerpt,/50 running hours/);
  assert.match(out.sources[0].excerpt,/recertification.+25 days/);
  assert.match(out.sources[1].excerpt,/20 minutes before a course/);
  assert.match(out.sources[1].excerpt,/blocked exit stops the class until/i);
  assert.ok(left.text.includes(out.sources[0].excerpt));
  assert.ok(right.text.includes(out.sources[1].excerpt));
});
test("r24 normal single-fact question stays brief even when its section contains unrelated restrictions",()=>{
  const docs=[{id:"a",name:"entry.txt",text:[
    "V-01 Entry Ordinary visitors may enter at 09:40.",
    "Confirmed delivery groups enter at 08:30 with a porter."
  ].join(" ")}];
  const out=hybrid("When may ordinary visitors enter?",docs);
  assert.match(out.sources[0].quote,/09:40/);
  assert.doesNotMatch(out.sources[0].quote,/08:30/);
});
test("r24 unrelated same-section sentence does not become answer evidence",()=>{
  const docs=[{id:"a",name:"incident.txt",text:[
    "I-08 Response When the alarm sounds, the dispatcher calls the warden.",
    "The cafeteria sells sandwiches until 16:00.",
    "The warden opens the incident register before the next shift."
  ].join(" ")}];
  const out=hybrid("What happens when the alarm sounds, and who opens the incident register?",docs);
  assert.doesNotMatch(out.sources[0].quote,/cafeteria sells/i);
  assert.ok(docs[0].text.includes(out.sources[0].quote));
});
test("r24 unsupported personal number refuses without citations",()=>{
  const docs=[{id:"c",name:"contacts.txt",text:"The curator approves invoices over 400 credits."}];
  const out=hybrid("What is the personal mobile number of the curator?",docs);
  assert.equal(out.answered,false);
  assert.equal(out.sources.length,0);
});
test("r24 build identifier tracks the extraction revision",()=>{
  assert.equal(RETRIEVAL_BUILD,"2026-10-12-r30");
});
