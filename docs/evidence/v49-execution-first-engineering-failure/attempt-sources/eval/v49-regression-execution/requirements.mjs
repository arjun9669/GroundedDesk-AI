import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
export async function verifyAuditCoverage(){
 const read=async p=>JSON.parse(await fs.readFile(p));
 const required=await read('eval/v49-regression-study/audit-requirements.json');
 const evidence=await read('docs/evidence/v49-execution-engineering/audit-controls.json');
 assert.equal(required.protocol_id,evidence.protocol_id);assert.equal(evidence.status,'PASS');
 assert.deepEqual(evidence.controls.map(c=>c.id).sort(),required.required_controls.map(c=>c.id).sort());
 assert.ok(evidence.controls.every(c=>c.verified===true));
 const log=await fs.readFile('docs/evidence/v49-execution-engineering/targeted.log','utf8');
 for(const c of required.required_controls)assert.ok(log.includes('✔ '+c.id+' '),'Passing targeted control absent: '+c.id);
 assert.match(log,/ℹ fail 0(?:\r?\n|$)/);
 return evidence;
}
