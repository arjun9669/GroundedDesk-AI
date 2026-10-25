// Static reads only: never imports or invokes the candidate/planner.
import fs from 'node:fs/promises';
import path from 'node:path';
import {moduleGraph} from '../v49-regression-execution/module-graph.mjs';
import {base,candidate,grader,protocol,inputs,records,toolchain,write} from './integrity.mjs';
const root=process.cwd();await inputs(root);
const paths=new Set((await moduleGraph(root,[candidate,grader,base+'/capture.mjs',base+'/score.mjs',base+'/prepare.mjs'])).map(f=>f.path.slice(1)));
async function add(dir){for(const e of await fs.readdir(path.join(root,dir),{withFileTypes:true})){const p=dir+'/'+e.name;if(e.isDirectory())await add(p);else if(e.name!=='freeze-manifest.json')paths.add(p);}}
await add(base);await add('docs/evidence/location-scope12-preparation');
for(const p of ['docs/LOCATION_SCOPE_DECISION.md','docs/LOCATION_SCOPE12_PREPARATION.md','tests/location-scope12.test.mjs','eval/phase2-fresh64/source_docs/05_Brindale_Music_Library.txt','eval/phase2-fresh64/source_docs/06_Tarrow_Glass_Laboratory.txt','eval/phase2-fresh64/fixed-answer-key.json','docs/V50_REGRESSION_RESULTS.md','docs/evidence/v50-regression-732-mac/score/native-scorecards.json','docs/evidence/v50-regression-732-mac/score-manifest.json','docs/evidence/v50-regression-732-mac/raw-manifest.json','docs/evidence/v50-regression-732-mac/review/manifest.json','docs/evidence/v50-regression-732-mac/review/publication-review.json'])paths.add(p);
const freeze={protocol,classification:'Author-aware targeted lexical contract follow-up; not unseen confirmation',created:new Date().toISOString(),candidate:{path:candidate,id:'coverage-v50-versioned-retention'},native_grader:grader,node:await toolchain(),files:await records(root,[...paths])};
await write(path.join(root,base,'freeze-manifest.json'),freeze);console.log(JSON.stringify({protocol,files:freeze.files.length,node:freeze.node}));
