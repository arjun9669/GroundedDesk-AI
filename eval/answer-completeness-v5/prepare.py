"""Verify unchanged known inputs; freeze this attempt without printing answers."""
from pathlib import Path
import hashlib,json,subprocess,datetime
repo=Path.cwd();outputs=repo.parent.parent/'outputs'
out=outputs/'coverage-v5-inputs';out.mkdir(exist_ok=False)
digest=lambda b:hashlib.sha256(b).hexdigest()
original=outputs/'coverage-v3-inputs/run-config.json'
config=json.loads(original.read_bytes())
checked=[]
for pack in config['packs']:
    for f in pack['files']:
        assert digest(Path(f['path']).read_bytes())==f['sha256'],f['name']
        checked.append({'path':f['path'],'sha256':f['sha256'],'verified':True})
for folder in [outputs/'coverage-v2-inputs/Lantern32',outputs/'coverage-v2-inputs/Aster32',outputs/'r18-independent',repo/'docs/evidence/r29/cobalt16',repo/'eval/retrieval-quality',repo/'eval/answer-completeness-v2/external24',repo/'eval/answer-completeness-v3/fresh32']:
    manifest=json.loads((folder/'freeze-manifest.json').read_bytes())
    entries=manifest.get('sha256_files',manifest.get('files'))
    items=list(entries.items()) if isinstance(entries,dict) else [(f['path'],f['sha256']) for f in entries]
    for name,expected in items:
        assert digest((folder/name).read_bytes())==expected,name
        checked.append({'path':str(folder/name),'sha256':expected,'verified':True})
candidate=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
config['candidate_commit']=candidate
config['classification']='Stage 1 in-sample regression; previous FreshMixed32 is now exposed'
config['previous_config_sha256']=digest(original.read_bytes())
target=out/'run-config.json';target.write_bytes(json.dumps(config,indent=2,ensure_ascii=False).encode())
(out/'input-integrity.json').write_bytes(json.dumps({'checks':checked,'atlas_limitation':'Current owner original-PDF hashes verified; original historical hash manifest unavailable.'},indent=2).encode())
root=repo/'eval/answer-completeness-v5'
files=['PROTOCOL.md','coverage.mjs']
(root/'freeze-manifest.json').write_bytes(json.dumps({'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'candidate_commit':candidate,'private_config_sha256':digest(target.read_bytes()),'prior_private_config_sha256':digest(original.read_bytes()),'files':[{'path':f,'sha256':digest((root/f).read_bytes())} for f in files]},indent=2).encode())
assert sum(len(p['cases']) for p in config['packs'])==203
print('Frozen 203 unchanged in-sample cases; source/key hash checks:',len(checked))
