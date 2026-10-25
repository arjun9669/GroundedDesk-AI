// Package3 is isolated; previous candidates and production imports are unchanged.
import {answerWithCoverage as previousAnswer,compareWithCoverage as previousCompare} from '../answer-completeness-v48/coverage.mjs';
import {planRelationRequest,answerRelationPlan} from '../answer-completeness-v45/relation-contract.mjs';
import {planComparisonRequest,compareRelationPlan} from './comparison.mjs';
export * from '../answer-completeness-v48/coverage.mjs';
export {planComparisonRequest} from './comparison.mjs';
export const CANDIDATE_ID='coverage-v49-comparison-events';
export function answerWithCoverage(question,candidates,maxSources=3,mode,options={}){
 const plan=planRelationRequest(question);
 return plan.kind==='ordinal_event'?answerRelationPlan(plan,options.bodyEvidenceCandidates,maxSources,mode):previousAnswer(question,candidates,maxSources,mode,options);
}
export function compareWithCoverage(a,b,question){
 const plan=planComparisonRequest(question);
 return plan.status==='outside_scope'?previousCompare(a,b,question):compareRelationPlan(a,b,question,plan);
}
