// Isolated Stage A only. The live app and all historical modules stay unchanged.
import {answerWithCoverage as previous} from '../answer-completeness-v43/coverage.mjs';
import {planSafetyRequest,answerSafetyPlan} from './safety-contract.mjs';
export * from '../answer-completeness-v43/coverage.mjs';
export {planSafetyRequest} from './safety-contract.mjs';
export const CANDIDATE_ID='coverage-v44-approval-reference-contracts';
export function answerWithCoverage(question,candidates,maxSources=3,mode,options={}){
 const plan=planSafetyRequest(question);
 if(plan.status==='outside_scope')return previous(question,candidates,maxSources,mode,options);
 return answerSafetyPlan(plan,options.bodyEvidenceCandidates,maxSources,mode);
}
