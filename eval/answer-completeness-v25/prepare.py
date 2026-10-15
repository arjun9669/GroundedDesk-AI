from pathlib import Path
import json,hashlib,subprocess,datetime
r=Path.cwd();b=r.parent.parent/'outputs';root=r/'eval/answer-completeness-v25';out=b/'coverage-v25-inputs';out.mkdir();sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(b/'GroundedDesk-Cedar32-v24-first-evidence.zip')=='0d5c87b68289ea17d518ac1c8dfd5a08d2f3aaf866e4bf9c5d6cffb5eba0f2a5'
for n in ['answer-completeness-v24','v24-fresh-confirmation']:
 for f in json.loads((r/'eval'/n/'freeze-manifest.json').read_bytes())['files']:assert sha(r/f['path'])==f['sha256'],f['path']
config=json.loads((b/'coverage-v24-inputs/run-config.json').read_bytes())
cedar=json.loads((r/'eval/v24-fresh-confirmation/run-config.json').read_bytes())['packs'][0]
config['packs'].append(cedar);config['candidate_commit']=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip();config['classification']='547 exposed in-sample v25 regressions: historical451, Binding64 and Cedar32. No new independent accuracy.'
config['total_questions']=sum(len(p['cases']) for p in config['packs']);assert config['total_questions']==547
assert sum(c.get('workflow','hybrid').lower()=='comparison' for p in config['packs'] for c in p['cases'])==32
checks=json.loads((b/'coverage-v24-inputs/input-integrity.json').read_bytes())['checks']
for f in checks:assert sha(Path(f['path']))==f['sha256']
for pack in config['packs']:
 for f in pack['files']:assert sha(Path(f['path']))==f['sha256']
for p in list((r/'eval/v24-fresh-confirmation/source_docs').iterdir())+[r/'eval/v24-fresh-confirmation/fixed-answer-key.json',r/'eval/v24-fresh-confirmation/PROTOCOL.md',r/'eval/v24-fresh-confirmation/freeze-manifest.json']:checks.append({'path':str(p),'sha256':sha(p)})
spec=lambda p:{'path':'/'+p,'sha256':sha(r/p)}
dependencies=[p.relative_to(r).as_posix() for p in (r/'eval').glob('answer-completeness*/coverage.mjs') if 'v25' not in str(p)]+['retrieval.mjs','hybrid.mjs','semantic.mjs','research.mjs','eval/retrieval-quality/section-index.mjs']
config['module_identity']={'candidate':{**spec('eval/answer-completeness-v25/coverage.mjs'),'id':'coverage-v25-claim-support-guards'},'paired':spec('eval/answer-completeness-v24/coverage.mjs'),'helper':spec('tests/fixtures/module-identity.mjs'),'dependencies':[spec(p) for p in dependencies]}
(out/'run-config.json').write_bytes(json.dumps(config,indent=2).encode());(out/'input-integrity.json').write_bytes(json.dumps({'checks':checks},indent=2).encode())
files=['eval/answer-completeness-v25/'+n for n in ['PROTOCOL.md','coverage.mjs','prepare.py','score.mjs','score-binding64.mjs','score-cedar32.mjs','review.mjs']]+['tests/browser-coverage-v25.mjs','tests/coverage-v25.test.mjs','tests/fixtures/runner-evidence.mjs','tests/fixtures/module-identity.mjs','tests/fixtures/workspace-ui.mjs']+dependencies+['eval/v24-fresh-confirmation/'+n for n in ['PROTOCOL.md','fixed-answer-key.json','freeze-manifest.json','score.mjs']]
freeze={'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'candidate_commit':config['candidate_commit'],'private_config_sha256':sha(out/'run-config.json'),'files':[{'path':n,'sha256':sha(r/n)} for n in sorted(set(files))]}
(root/'freeze-manifest.json').write_bytes(json.dumps(freeze,indent=2).encode());print('547 cases frozen;131 original input checks;32 lexical Comparison and515 actual Hybrid.')
