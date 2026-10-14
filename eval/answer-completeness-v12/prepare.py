from pathlib import Path
import json,hashlib,subprocess,datetime
repo=Path.cwd();base=repo.parent.parent/'outputs';out=base/'coverage-v12-inputs';out.mkdir(exist_ok=False)
digest=lambda b:hashlib.sha256(b).hexdigest()
config=json.loads((base/'coverage-v9-inputs/run-config.json').read_bytes())
extra=json.loads((base/'coverage-v9-fresh-inputs/run-config.json').read_bytes())['packs'][0]
extra['name']='V9Exposed32';config['packs'].append(extra)
config['candidate_commit']=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
config['classification']='267 exposed in-sample regressions, including qualified V9 F06 rerun; historical first attempt ungraded'
checks=[]
for pack in config['packs']:
 for f in pack['files']:
  assert digest(Path(f['path']).read_bytes())==f['sha256'];checks.append({'path':f['path'],'sha256':f['sha256']})
folders=[base/'coverage-v2-inputs/Lantern32',base/'coverage-v2-inputs/Aster32',base/'r18-independent',repo/'docs/evidence/r29/cobalt16',repo/'eval/retrieval-quality',repo/'eval/answer-completeness-v2/external24',repo/'eval/answer-completeness-v3/fresh32',repo/'eval/answer-completeness-v7/fresh32',repo/'eval/answer-completeness-v9/fresh32']
for folder in folders:
 manifest=json.loads((folder/'freeze-manifest.json').read_bytes());entries=manifest.get('sha256_files',manifest.get('files'));items=list(entries.items()) if isinstance(entries,dict) else [(f['path'],f['sha256']) for f in entries]
 for name,h in items:
  assert digest((folder/name).read_bytes())==h;checks.append({'path':str(folder/name),'sha256':h})
assert sum(len(p['cases']) for p in config['packs'])==267
target=out/'run-config.json';target.write_bytes(json.dumps(config,indent=2,ensure_ascii=False).encode())
(out/'input-integrity.json').write_bytes(json.dumps({'checks':checks,'atlas_limitation':'Original current PDFs verified; historical Atlas hash manifest unavailable'},indent=2).encode())
files=['eval/answer-completeness-v12/PROTOCOL.md','eval/answer-completeness-v12/coverage.mjs','tests/browser-coverage-v12.mjs','eval/answer-completeness-v12/prepare.py','tests/fixtures/runner-evidence.mjs']
freeze={'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'candidate_commit':config['candidate_commit'],'private_config_sha256':digest(target.read_bytes()),'files':[{'path':f,'sha256':digest((repo/f).read_bytes())} for f in files]}
(repo/'eval/answer-completeness-v12/freeze-manifest.json').write_bytes(json.dumps(freeze,indent=2).encode())
print('267 unchanged exposed cases frozen; checks',len(checks))
