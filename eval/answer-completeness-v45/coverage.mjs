// Stage B is isolated; original Stage A, clock and lexical Comparison remain intact.
import {answerWithCoverage as previous} from '../answer-completeness-v44/coverage.mjs';
import {planRelationRequest,answerRelationPlan} from './relation-contract.mjs';
export * from '../answer-completeness-v44/coverage.mjs';
export {planRelationRequest} from './relation-contract.mjs';
export const CANDIDATE_ID='coverage-v45-supported-relations';
export function answerWithCoverage(question,candidates,maxSources=3,mode,options={}){
 const plan=planRelationRequest(question);
 if(plan.status==='outside_scope')return previous(question,candidates,maxSources,mode,options);
 return answerRelationPlan(plan,options.bodyEvidenceCandidates,maxSources,mode);
}
