from pathlib import Path
import json,hashlib,subprocess,datetime
repo=Path.cwd();base=repo.parent.parent/'outputs';out=base/'coverage-v17-inputs';out.mkdir(exist_ok=True);assert not list(out.iterdir())
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
config=json.loads((base/'coverage-v16-inputs/run-config.json').read_bytes())
config['candidate_commit']=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
config['classification']='355 exposed in-sample regressions; original Scope48 and v16 regression scores immutable; all prior first results unchanged'
checks=json.loads((base/'coverage-v16-inputs/input-integrity.json').read_bytes())['checks']
for row in checks:assert sha(Path(row['path']))==row['sha256']
for pack in config['packs']:
 for f in pack['files']:assert sha(Path(f['path']))==f['sha256']
assert len(checks)==102 and sum(len(p['cases']) for p in config['packs'])==355
assert sum(c.get('workflow','hybrid').lower()=='comparison' for p in config['packs'] for c in p['cases'])==24
spec=lambda p:{'path':'/'+p,'sha256':sha(repo/p)}
dependencies=[p.relative_to(repo).as_posix() for p in (repo/'eval').glob('answer-completeness*/coverage.mjs') if 'v17' not in str(p)]+['retrieval.mjs','hybrid.mjs','semantic.mjs','eval/retrieval-quality/section-index.mjs']
config['module_identity']={'candidate':{**spec('eval/answer-completeness-v17/coverage.mjs'),'id':'coverage-v17-budget-clause-preflight'},'paired':spec('eval/answer-completeness-v16/coverage.mjs'),'helper':spec('tests/fixtures/module-identity.mjs'),'dependencies':[spec(p) for p in dependencies]}
target=out/'run-config.json';target.write_bytes(json.dumps(config,indent=2,ensure_ascii=False).encode())
(out/'input-integrity.json').write_bytes(json.dumps({'checks':checks,'atlas_limitation':'Current PDFs verified; historical Atlas hash manifest unavailable'},indent=2).encode())
files=['eval/answer-completeness-v17/'+f for f in ['PROTOCOL.md','coverage.mjs','prepare.py','prepare-fresh.py','score.mjs','score-fresh.mjs','review.mjs']]+['tests/browser-coverage-v17.mjs','tests/coverage-v17.test.mjs','tests/fixtures/runner-evidence.mjs','tests/fixtures/module-identity.mjs']+dependencies
freeze={'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'candidate_commit':config['candidate_commit'],'private_config_sha256':sha(target),'files':[{'path':f,'sha256':sha(repo/f)} for f in sorted(set(files))]}
(repo/'eval/answer-completeness-v17/freeze-manifest.json').write_bytes(json.dumps(freeze,indent=2).encode())
print('355 unchanged regressions frozen;102 original input hashes verified.')
