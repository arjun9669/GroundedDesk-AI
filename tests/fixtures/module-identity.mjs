// Browser and Node share this check; a valid function alone is not a version proof.
export function requireCandidateIdentity(module,expected){
 if(module?.CANDIDATE_ID!==expected||typeof module?.answerWithCoverage!=='function')throw new Error(`Wrong candidate module: expected ${expected}, received ${module?.CANDIDATE_ID??'unidentified'}`);
 return module.CANDIDATE_ID;
}
