from pathlib import Path
import json,hashlib,subprocess,datetime
repo=Path.cwd();base=repo.parent.parent/'outputs';out=base/'coverage-v24-inputs';out.mkdir(exist_ok=True);assert not list(out.iterdir())
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(base/'GroundedDesk-coverage-v23-full-evidence.zip')=='eef417f0ab5936899a1beb0197c0c3880635fa8248cd773b360876ab0e71bde0'
for f in json.loads((repo/'eval/answer-completeness-v23/freeze-manifest.json').read_bytes())['files']:assert sha(repo/f['path'])==f['sha256']
config=json.loads((base/'coverage-v23-inputs/run-config.json').read_bytes())
config['candidate_commit']=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
config['classification']='515 exposed in-sample regressions: 451 historical plus unchanged Binding64; all first scores immutable'
checks=json.loads((base/'coverage-v23-inputs/input-integrity.json').read_bytes())['checks']
for row in checks:assert sha(Path(row['path']))==row['sha256']
for pack in config['packs']:
 for f in pack['files']:assert sha(Path(f['path']))==f['sha256']
assert len(checks)==124 and sum(len(p['cases']) for p in config['packs'])==515
assert sum(c.get('workflow','hybrid').lower()=='comparison' for p in config['packs'] for c in p['cases'])==28
spec=lambda p:{'path':'/'+p,'sha256':sha(repo/p)}
dependencies=[p.relative_to(repo).as_posix() for p in (repo/'eval').glob('answer-completeness*/coverage.mjs') if 'v24' not in str(p)]+['retrieval.mjs','hybrid.mjs','semantic.mjs','research.mjs','eval/retrieval-quality/section-index.mjs']
config['module_identity']={'candidate':{**spec('eval/answer-completeness-v24/coverage.mjs'),'id':'coverage-v24-unique-literal-date'},'paired':spec('eval/answer-completeness-v23/coverage.mjs'),'helper':spec('tests/fixtures/module-identity.mjs'),'dependencies':[spec(p) for p in dependencies]}
target=out/'run-config.json';target.write_bytes(json.dumps(config,indent=2,ensure_ascii=False).encode())
(out/'input-integrity.json').write_bytes(json.dumps({'checks':checks,'atlas_limitation':'Current PDFs verified; historical Atlas hash manifest unavailable'},indent=2).encode())
files=['eval/answer-completeness-v24/'+f for f in ['PROTOCOL.md','coverage.mjs','prepare.py','score.mjs','score-binding64.mjs','review.mjs']]+['tests/browser-coverage-v24.mjs','tests/coverage-v24.test.mjs','tests/fixtures/runner-evidence.mjs','tests/fixtures/module-identity.mjs']+dependencies
freeze={'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'candidate_commit':config['candidate_commit'],'private_config_sha256':sha(target),'files':[{'path':f,'sha256':sha(repo/f)} for f in sorted(set(files))]}
(repo/'eval/answer-completeness-v24/freeze-manifest.json').write_bytes(json.dumps(freeze,indent=2).encode())
print('515 unchanged regressions frozen;124 original input hashes verified.')
