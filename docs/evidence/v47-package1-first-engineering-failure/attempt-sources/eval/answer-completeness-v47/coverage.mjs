// Package1 only. No live imports; old candidates and their first evidence stay immutable.
import {answerWithCoverage as previous,planClockRequest} from '../answer-completeness-v43/coverage.mjs';
import {planRetentionRequest,answerRetentionPlan} from './retention-contract.mjs';
export * from '../answer-completeness-v43/coverage.mjs';
export {planRetentionRequest} from './retention-contract.mjs';
export const CANDIDATE_ID='coverage-v47-scope-retention';
export function answerWithCoverage(question,candidates,maxSources=3,mode,options={}){
 if(planClockRequest(question).status!=='outside_scope')return previous(question,candidates,maxSources,mode,options);
 const plan=planRetentionRequest(question);
 if(plan.status==='outside_scope')return previous(question,candidates,maxSources,mode,options);
 return answerRetentionPlan(plan,options.bodyEvidenceCandidates,maxSources,mode,()=>previous(question,candidates,maxSources,mode,options));
}
