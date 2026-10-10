import test from "node:test";
import assert from "node:assert/strict";
import {buildIndex, answerQuestion} from "../retrieval.mjs";
import {verifyEvidenceResult} from "../quality.mjs";

test("compound vendor risk question cites both score band and sign-off clause", () => {
  const docs = [{
    id: "vendor", name: "03_Atlas_Vendor_AI_Assessment.pdf",
    text: "V-03 Risk scoring bands The supplier score ranges from 0 to 100. Scores from 0 through 25 are Low, 26 through 60 are Medium, and 61 through 100 are High. A High vendor risk requires written acceptance by both Legal Counsel and the Security Officer. A Medium risk review follows separately."
  }];
  const q = "What vendor risk score is classified as High, and who must provide written acceptance?";
  const result = answerQuestion(q, buildIndex(docs));
  assert.equal(result.answered, true);
  assert.equal(result.sources.length, 1);
  assert.match(result.answer, /61 through 100 are High/);
  assert.match(result.answer, /Legal Counsel and the Security Officer/);
  assert.equal(verifyEvidenceResult(result, docs).ok, true);
});

test("unrelated salary attribute still refuses", () => {
  const docs = [{id:"vendor", name:"vendor.txt", text:"Atlas Research Group reviews vendor risk scores annually."}];
  const result = answerQuestion("What is the annual salary of the CEO of Atlas Research Group?",buildIndex(docs));
  assert.equal(result.answered, false);
  assert.deepEqual(result.sources, []);
});
