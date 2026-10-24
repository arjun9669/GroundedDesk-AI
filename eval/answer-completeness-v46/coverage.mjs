// Isolated Stage C. Ask and all other helpers remain exact v45 exports.
import {compareWithCoverage as previous} from '../answer-completeness-v45/coverage.mjs';
import {planComparisonRequest,compareRelationPlan} from './comparison-contract.mjs';
export * from '../answer-completeness-v45/coverage.mjs';
export {planComparisonRequest} from './comparison-contract.mjs';
export const CANDIDATE_ID='coverage-v46-comparison-relations';
export function compareWithCoverage(a,b,question){
 const plan=planComparisonRequest(question);
 return plan.status==='outside_scope'?previous(a,b,question):compareRelationPlan(a,b,question,plan);
}
