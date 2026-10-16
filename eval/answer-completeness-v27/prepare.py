from pathlib import Path
import json,hashlib,subprocess,datetime
r=Path.cwd();b=r.parent.parent/'outputs';root=r/'eval/answer-completeness-v27';out=b/'coverage-v27-inputs';out.mkdir()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
load=lambda p:json.loads(p.read_text(encoding='utf-8'))
for n in ['answer-completeness-v25','answer-completeness-v26','v25-fresh-confirmation']:
 for f in load(r/'eval'/n/'freeze-manifest.json')['files']:assert sha(r/f['path'])==f['sha256'],f['path']
preflight=load(b/'coverage-v27-init-diagnostic/result.json');assert preflight['browser']=='155.0.8059.80' and preflight['passed']
config=load(b/'coverage-v26-inputs/run-config.json')
config['candidate_commit']=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
config['classification']='579 exposed in-sample v27 regressions; unchanged historical451, Binding64, Cedar32 and Bracken32. No independent accuracy.'
config['total_questions']=sum(len(p['cases']) for p in config['packs']);assert config['total_questions']==579
assert sum(c.get('workflow','hybrid').lower()=='comparison' for p in config['packs'] for c in p['cases'])==36
checks=load(b/'coverage-v26-inputs/input-integrity.json')['checks']
for f in checks:assert sha(Path(f['path']))==f['sha256'],f['path']
for p in config['packs']:
 for f in p['files']:assert sha(Path(f['path']))==f['sha256'],f['path']
spec=lambda p:{'path':'/'+p,'sha256':sha(r/p)}
dependencies=[p.relative_to(r).as_posix() for p in (r/'eval').glob('answer-completeness*/coverage.mjs') if 'v27' not in str(p)]+['retrieval.mjs','hybrid.mjs','semantic.mjs','research.mjs','eval/retrieval-quality/section-index.mjs','eval/retrieval-quality/grade.mjs']
config['module_identity']={'candidate':{**spec('eval/answer-completeness-v27/coverage.mjs'),'id':'coverage-v27-preserve-complete-evidence'},'paired':spec('eval/answer-completeness-v26/coverage.mjs'),'helper':spec('tests/fixtures/module-identity.mjs'),'dependencies':[spec(p) for p in dependencies]}
for name,data in [('run-config.json',config),('input-integrity.json',{'checks':checks}),('manual-adjudication.json',{})]:(out/name).write_text(json.dumps(data,indent=2),encoding='utf-8')
files=[p.relative_to(r).as_posix() for p in root.iterdir() if p.name!='freeze-manifest.json']+['tests/browser-coverage-v27.mjs','tests/coverage-v27.test.mjs','tests/fixtures/runner-evidence.mjs','tests/fixtures/module-identity.mjs','tests/fixtures/workspace-ui.mjs']+dependencies
files+=['eval/v25-fresh-confirmation/'+n for n in ['PROTOCOL.md','fixed-answer-key.json','freeze-manifest.json','score.mjs']]
freeze={'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'candidate_commit':config['candidate_commit'],'browser':preflight['browser'],'preflight_sha256':sha(b/'coverage-v27-init-diagnostic/result.json'),'private_config_sha256':sha(out/'run-config.json'),'files':[{'path':n,'sha256':sha(r/n)} for n in sorted(set(files))]}
(root/'freeze-manifest.json').write_text(json.dumps(freeze,indent=2),encoding='utf-8')
print(f"579 questions frozen, 543 Hybrid / 36 lexical Comparison, {len(checks)} original input hashes, {len(freeze['files'])} frozen code files.")
