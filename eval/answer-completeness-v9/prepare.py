from pathlib import Path
import json,hashlib,subprocess,datetime
repo=Path.cwd();outputs=repo.parent.parent/'outputs';out=outputs/'coverage-v9-inputs';out.mkdir(exist_ok=False)
digest=lambda b:hashlib.sha256(b).hexdigest()
config=json.loads((outputs/'coverage-v7-inputs/run-config.json').read_bytes())
fresh=json.loads((outputs/'coverage-v7-fresh-inputs/run-config.json').read_bytes())
config['packs']+=fresh['packs'];config['candidate_commit']=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
config['classification']='235 exposed unchanged in-sample regressions, including prior v7 public confirmation'
checked=[]
for pack in config['packs']:
 for f in pack['files']:
  assert digest(Path(f['path']).read_bytes())==f['sha256'];checked.append({'filename':f['name'],'sha256':f['sha256'],'verified':True})
for folder in [outputs/'coverage-v2-inputs/Lantern32',outputs/'coverage-v2-inputs/Aster32',outputs/'r18-independent',repo/'docs/evidence/r29/cobalt16',repo/'eval/retrieval-quality',repo/'eval/answer-completeness-v2/external24',repo/'eval/answer-completeness-v3/fresh32',repo/'eval/answer-completeness-v7/fresh32']:
 manifest=json.loads((folder/'freeze-manifest.json').read_bytes());entries=manifest.get('sha256_files',manifest.get('files'));items=list(entries.items()) if isinstance(entries,dict) else [(f['path'],f['sha256']) for f in entries]
 for name,h in items:
  assert digest((folder/name).read_bytes())==h;checked.append({'filename':name,'sha256':h,'verified':True})
assert sum(len(p['cases']) for p in config['packs'])==235
target=out/'run-config.json';target.write_bytes(json.dumps(config,indent=2,ensure_ascii=False).encode())
(out/'input-integrity.json').write_bytes(json.dumps({'checks':checked,'atlas_limitation':'Current owner original PDF hashes verified; historical manifest unavailable'},indent=2).encode())
root=repo/'eval/answer-completeness-v9';files=['PROTOCOL.md','coverage.mjs']
(root/'freeze-manifest.json').write_bytes(json.dumps({'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'candidate_commit':config['candidate_commit'],'private_config_sha256':digest(target.read_bytes()),'files':[{'path':f,'sha256':digest((root/f).read_bytes())} for f in files]},indent=2).encode())
print('235 unchanged exposed cases frozen; hash checks',len(checked))
