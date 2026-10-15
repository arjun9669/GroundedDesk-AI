from pathlib import Path
import json,hashlib,subprocess,datetime
repo=Path.cwd();base=repo.parent.parent/'outputs';out=base/'coverage-v21-inputs';out.mkdir(exist_ok=True);assert not list(out.iterdir())
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
config=json.loads((base/'coverage-v20-inputs/run-config.json').read_bytes())
config['packs'].append(json.loads((base/'v20-binding64-inputs/run-config.json').read_bytes())['packs'][0])
config['candidate_commit']=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
config['classification']='515 exposed in-sample regressions: 451 historical plus unchanged Binding64; all first scores immutable'
checks=json.loads((base/'coverage-v20-inputs/input-integrity.json').read_bytes())['checks']
binding=repo/'eval/v20-confirmation/binding64'
for row in json.loads((binding/'freeze-manifest.json').read_bytes())['files']:
 checks.append({'path':str(binding/row['path']),'sha256':row['sha256']})
for row in checks:assert sha(Path(row['path']))==row['sha256']
for pack in config['packs']:
 for f in pack['files']:assert sha(Path(f['path']))==f['sha256']
assert len(checks)==124 and sum(len(p['cases']) for p in config['packs'])==515
assert sum(c.get('workflow','hybrid').lower()=='comparison' for p in config['packs'] for c in p['cases'])==28
spec=lambda p:{'path':'/'+p,'sha256':sha(repo/p)}
dependencies=[p.relative_to(repo).as_posix() for p in (repo/'eval').glob('answer-completeness*/coverage.mjs') if 'v21' not in str(p)]+['retrieval.mjs','hybrid.mjs','semantic.mjs','research.mjs','eval/retrieval-quality/section-index.mjs']
config['module_identity']={'candidate':{**spec('eval/answer-completeness-v21/coverage.mjs'),'id':'coverage-v21-clause-relation-guards'},'paired':spec('eval/answer-completeness-v20/coverage.mjs'),'helper':spec('tests/fixtures/module-identity.mjs'),'dependencies':[spec(p) for p in dependencies]}
target=out/'run-config.json';target.write_bytes(json.dumps(config,indent=2,ensure_ascii=False).encode())
(out/'input-integrity.json').write_bytes(json.dumps({'checks':checks,'atlas_limitation':'Current PDFs verified; historical Atlas hash manifest unavailable'},indent=2).encode())
files=['eval/answer-completeness-v21/'+f for f in ['PROTOCOL.md','coverage.mjs','prepare.py','score.mjs','score-binding64.mjs','review.mjs']]+['tests/browser-coverage-v21.mjs','tests/coverage-v21.test.mjs','tests/fixtures/runner-evidence.mjs','tests/fixtures/module-identity.mjs']+dependencies
freeze={'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'candidate_commit':config['candidate_commit'],'private_config_sha256':sha(target),'files':[{'path':f,'sha256':sha(repo/f)} for f in sorted(set(files))]}
(repo/'eval/answer-completeness-v21/freeze-manifest.json').write_bytes(json.dumps(freeze,indent=2).encode())
print('515 unchanged regressions frozen;124 original input hashes verified.')
