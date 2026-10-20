// Engineering candidate only. The live application does not import this module.
import {answerWithCoverage as previous} from '../answer-completeness-v39/coverage.mjs';
import {planClockRequest, answerClockPlan} from './clock-contract.mjs';
export * from '../answer-completeness-v39/coverage.mjs';
export {planClockRequest} from './clock-contract.mjs';
export const CANDIDATE_ID = 'coverage-v40-dispatch-grammar';

export function answerWithCoverage(question, candidates, maxSources = 3, mode, options = {}) {
  const plan = planClockRequest(question);
  if (plan.status === 'outside_scope') return previous(question, candidates, maxSources, mode, options);
  // No prior-first call and no post-refusal fallback in the governed scope.
  return answerClockPlan(plan, options.bodyEvidenceCandidates, maxSources, mode,
    options.clockFacetEvidence);
}
