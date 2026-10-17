from pathlib import Path
import json,hashlib,datetime,subprocess
r=Path.cwd();root=r/'eval/v38-fresh-confirmation';b=r.parent.parent/'outputs'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();read=lambda p:json.loads(p.read_text(encoding='utf-8'))
assert not (root/'freeze-manifest.json').exists()
for f in read(r/'eval/answer-completeness-v38/freeze-manifest.json')['files']:assert sha(r/f['path'])==f['sha256'],f['path']
pre=read(b/'vela32-v38-init-diagnostic/result.json');assert pre['passed'] and pre['browser']=='155.0.8059.80'
cfg=read(root/'run-config.json');specs=cfg['module_identity'];dependencies=[x['path'].lstrip('/') for x in specs['dependencies']]+[specs[k]['path'].lstrip('/') for k in ['candidate','paired','helper']]
for x in specs['dependencies']+[specs[k] for k in ['candidate','paired','helper']]:assert sha(r/x['path'].lstrip('/'))==x['sha256']
files=[p.relative_to(r).as_posix() for p in root.rglob('*') if p.is_file() and '__pycache__' not in p.parts]+dependencies+['tests/browser-vela32-v38.mjs','tests/browser-init-diagnostic.mjs','tests/fixtures/workspace-ui.mjs','tests/fixtures/runner-evidence.mjs','app.mjs','index.html','styles.css','pdf-preview.mjs','pdf-ingest.mjs','pdf-highlight.mjs','generation.mjs','workspace-ui.mjs']
record={'classification':cfg['classification'],'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'protocol_commit':'98f5bca','preparation_head':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'candidate_commit':cfg['candidate_commit'],'browser':pre['browser'],'preflight_sha256':sha(b/'vela32-v38-init-diagnostic/result.json'),'questions':32,'hybrid':28,'supported_hybrid':20,'unsupported_hybrid':8,'lexical_comparison':4,'files':[{'path':n,'sha256':sha(r/n)} for n in sorted(set(files))]}
(root/'freeze-manifest.json').write_text(json.dumps(record,indent=2),encoding='utf-8',newline='\n')
print('Frozen',len(record['files']),'files; no answers observed.')
