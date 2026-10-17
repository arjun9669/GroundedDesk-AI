from pathlib import Path
import json,hashlib,subprocess,datetime
r=Path.cwd();b=r.parent.parent/'outputs';root=r/'eval/answer-completeness-v36';out=b/'coverage-v36-inputs';out.mkdir()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();load=lambda p:json.loads(p.read_text(encoding='utf-8'))
for n in ['answer-completeness-v25','answer-completeness-v26','answer-completeness-v27','answer-completeness-v28','answer-completeness-v30','answer-completeness-v31','answer-completeness-v32','answer-completeness-v33','answer-completeness-v34','answer-completeness-v29','answer-completeness-v35','v35-fresh-confirmation','v28-fresh-confirmation','v30-fresh-confirmation']:
 for f in load(r/'eval'/n/'freeze-manifest.json')['files']:assert sha(r/f['path'])==f['sha256'],f['path']
pre=load(b/'coverage-v36-init-diagnostic/result.json');assert pre['passed'] and pre['browser']=='155.0.8059.80'
config=load(b/'coverage-v35-inputs/run-config.json')
assert len(config['packs'])==20
config['packs'].append(load(r/'eval/v35-fresh-confirmation/run-config.json')['packs'][0])
assert len(config['packs'])==21
config['candidate_commit']=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip();config['classification']='707 exposed in-sample v36 regressions; Lumen32 first28/2/2 confirmation FAIL unchanged; all previous firsts/blocked attempts/errata preserved. Not independent accuracy.';config['total_questions']=sum(len(p['cases']) for p in config['packs']);assert config['total_questions']==707
assert sum(c.get('workflow','hybrid').lower()=='comparison' for p in config['packs'] for c in p['cases'])==52
checks=load(b/'coverage-v35-inputs/input-integrity.json')['checks'];seen={str(Path(x['path']).resolve()) for x in checks}
for n in ['PROTOCOL.md','fixed-answer-key.json','score.mjs','freeze-manifest.json','run-config.json']:
 p=r/'eval/v32-fresh-confirmation'/n
 if str(p.resolve()) not in seen:checks.append({'path':str(p.resolve()),'sha256':sha(p)});seen.add(str(p.resolve()))
for n in ['PROTOCOL.md','fixed-answer-key.json','FROZEN_RUBRIC.md','score.mjs','freeze-manifest.json','run-config.json']:
 p=r/'eval/v35-fresh-confirmation'/n
 if str(p.resolve()) not in seen:checks.append({'path':str(p.resolve()),'sha256':sha(p)});seen.add(str(p.resolve()))
for pack in config['packs']:
 for file in pack['files']:
  p=Path(file['path']);assert sha(p)==file['sha256'],p
  if str(p.resolve()) not in seen:checks.append({'path':str(p.resolve()),'sha256':sha(p)});seen.add(str(p.resolve()))
for x in checks:assert sha(Path(x['path']))==x['sha256'],x['path']
spec=lambda p:{'path':'/'+p,'sha256':sha(r/p)}
dependencies=[p.relative_to(r).as_posix() for p in (r/'eval').glob('answer-completeness*/coverage.mjs') if 'v36' not in str(p)]+['retrieval.mjs','hybrid.mjs','semantic.mjs','research.mjs','eval/retrieval-quality/section-index.mjs','eval/retrieval-quality/grade.mjs']
config['module_identity']={'candidate':{**spec('eval/answer-completeness-v36/coverage.mjs'),'id':'coverage-v36-literal-boundaries-renewal'},'paired':spec('eval/answer-completeness-v35/coverage.mjs'),'helper':spec('tests/fixtures/module-identity.mjs'),'dependencies':[spec(p) for p in dependencies]}
for name,data in [('run-config.json',config),('input-integrity.json',{'checks':checks}),('manual-adjudication.json',{})]:(out/name).write_text(json.dumps(data,indent=2),encoding='utf-8',newline='\n')
files=[p.relative_to(r).as_posix() for p in root.iterdir() if p.is_file() and p.name!='freeze-manifest.json']+dependencies+['tests/browser-coverage-v36.mjs','tests/coverage-v36.test.mjs','tests/fixtures/runner-evidence.mjs','tests/fixtures/module-identity.mjs','tests/fixtures/workspace-ui.mjs']
files+=['docs/evidence/coverage-v34-r44/post-seal-engineering-probe.json','docs/evidence/coverage-v35-r44/engineering-review.json','docs/evidence/coverage-v35-r44/engineering-probe.json']
files+=['eval/v35-fresh-confirmation/'+n for n in ['PROTOCOL.md','fixed-answer-key.json','FROZEN_RUBRIC.md','score.mjs','freeze-manifest.json']]
files+=['eval/v32-fresh-confirmation/'+n for n in ['PROTOCOL.md','fixed-answer-key.json','score.mjs','freeze-manifest.json']]
freeze={'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'candidate_commit':config['candidate_commit'],'browser':pre['browser'],'preflight_sha256':sha(b/'coverage-v36-init-diagnostic/result.json'),'private_config_sha256':sha(out/'run-config.json'),'questions':707,'hybrid':655,'lexical_comparison':52,'files':[{'path':n,'sha256':sha(r/n)} for n in sorted(set(files))]}
(root/'freeze-manifest.json').write_text(json.dumps(freeze,indent=2),encoding='utf-8',newline='\n');print(f"707 questions frozen; {len(checks)} original input hashes; {len(freeze['files'])} code/rubric/helper hashes")
