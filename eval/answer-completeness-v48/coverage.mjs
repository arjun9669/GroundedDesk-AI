// Package2 successor: sealed v47 and all older candidates remain unchanged.
import {answerWithCoverage as previous,planClockRequest} from '../answer-completeness-v47/coverage.mjs';
import {planSafetyRequest,answerSafetyPlan} from '../answer-completeness-v44/safety-contract.mjs';
import {planMinimumRequest,answerMinimumPlan} from './minimum.mjs';
import {planApprovalRequest,answerApprovalPlan} from './approval.mjs';
export * from '../answer-completeness-v47/coverage.mjs';
export {planMinimumRequest} from './minimum.mjs';
export {planApprovalRequest} from './approval.mjs';
export const CANDIDATE_ID='coverage-v48-minimum-approval';
export function planPackage2Request(question){
 if(planClockRequest(question).status!=='outside_scope'||/\s+Also,\s+/i.test(question))return {status:'outside_scope'};
 const minimum=planMinimumRequest(question);if(minimum.status!=='outside_scope')return minimum;
 const approval=planApprovalRequest(question);if(approval.status!=='outside_scope')return approval;
 const safety=planSafetyRequest(question);
 return ['ticket_approver','publication'].includes(safety.kind)?{...safety,inherited:true}:{status:'outside_scope'};
}
export function answerWithCoverage(question,candidates,maxSources=3,mode,options={}){
 const plan=planPackage2Request(question);
 if(plan.status==='outside_scope')return previous(question,candidates,maxSources,mode,options);
 if(plan.inherited)return answerSafetyPlan(plan,options.bodyEvidenceCandidates,maxSources,mode);
 const answer=plan.kind==='minimum'?answerMinimumPlan:answerApprovalPlan;
 return answer(plan,options.bodyEvidenceCandidates,maxSources,mode,()=>previous(question,candidates,maxSources,mode,options));
}
