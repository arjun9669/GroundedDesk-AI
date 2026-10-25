import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {verifyAuditCoverage as previous} from '../v49-regression-execution/requirements.mjs';
export async function verifyAuditCoverage(){
 const proof=await previous();
 const requirements=JSON.parse(await fs.readFile('eval/v50-regression-study/audit-requirements.json'));
 assert.equal(requirements.protocol_id,'V50-REGRESSION-732-20261025');
 for(const ref of [requirements.historical_reference_only,requirements.expanded_quote_contract])assert.equal(createHash('sha256').update(await fs.readFile(ref.path)).digest('hex'),ref.sha256,'Exact inherited prospective audit contract');
 return {protocol_id:requirements.protocol_id,inherited_controls:proof.controls.length,expanded_contract_verified:true};
}
