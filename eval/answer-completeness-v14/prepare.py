from pathlib import Path
import json,hashlib,subprocess,datetime
repo=Path.cwd();base=repo.parent.parent/'outputs';out=base/'coverage-v14-inputs';out.mkdir(exist_ok=False)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
config=json.loads((base/'coverage-v13-inputs/run-config.json').read_bytes())
actor=json.loads((base/'coverage-v13-fresh-inputs/run-config.json').read_bytes())['packs'][0];config['packs'].append(actor)
config['candidate_commit']=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
config['classification']='307 exposed in-sample regressions; Actor40 first28/2/10 unchanged; V9 F06 original first attempt ungraded'
checks=json.loads((base/'coverage-v13-inputs/input-integrity.json').read_bytes())['checks']
for row in checks:assert sha(Path(row['path']))==row['sha256']
packroot=repo/'eval/answer-completeness-v13/actor40'
for row in json.loads((packroot/'freeze-manifest.json').read_bytes())['files']:
 p=packroot/row['path'];assert sha(p)==row['sha256'];checks.append({'path':str(p),'sha256':row['sha256']})
for pack in config['packs']:
 for f in pack['files']:assert sha(Path(f['path']))==f['sha256']
assert len(checks)==94 and sum(len(p['cases']) for p in config['packs'])==307
target=out/'run-config.json';target.write_bytes(json.dumps(config,indent=2,ensure_ascii=False).encode())
(out/'input-integrity.json').write_bytes(json.dumps({'checks':checks,'atlas_limitation':'Current PDFs verified; historical Atlas hash manifest unavailable'},indent=2).encode())
files=['eval/answer-completeness-v14/'+f for f in ['PROTOCOL.md','coverage.mjs','prepare.py','prepare-fresh.py','score.mjs','score-fresh.mjs','review.mjs']]+['tests/browser-coverage-v14.mjs','tests/coverage-v14.test.mjs','tests/fixtures/runner-evidence.mjs']
freeze={'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'candidate_commit':config['candidate_commit'],'private_config_sha256':sha(target),'files':[{'path':f,'sha256':sha(repo/f)} for f in files]}
(repo/'eval/answer-completeness-v14/freeze-manifest.json').write_bytes(json.dumps(freeze,indent=2).encode())
print('307 unchanged regressions frozen;94 input hashes verified.')
