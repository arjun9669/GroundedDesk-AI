from pathlib import Path
import json,hashlib,subprocess,datetime
r=Path.cwd();b=r.parent.parent/'outputs';root=r/'eval/answer-completeness-v37';out=b/'coverage-v37-inputs';out.mkdir()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();load=lambda p:json.loads(p.read_text(encoding='utf-8'))
for n in ['answer-completeness-v36','v36-fresh-confirmation']:
 for f in load(r/'eval'/n/'freeze-manifest.json')['files']:assert sha(r/f['path'])==f['sha256'],f['path']
pre=load(b/'coverage-v37-init-diagnostic/result.json');assert pre['passed'] and pre['browser']=='155.0.8059.80'
config=load(b/'coverage-v36-inputs/run-config.json');assert len(config['packs'])==21
config['packs'].append(load(r/'eval/v36-fresh-confirmation/run-config.json')['packs'][0]);assert len(config['packs'])==22
config['candidate_commit']=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip();config['classification']='739 exposed in-sample v37 regressions; Prism32 first29/0/3 FAIL and all earlier firsts unchanged. Not independent accuracy.';config['total_questions']=sum(len(p['cases']) for p in config['packs']);assert config['total_questions']==739
assert sum(c.get('workflow','hybrid').lower()=='comparison' for p in config['packs'] for c in p['cases'])==56
checks=load(b/'coverage-v36-inputs/input-integrity.json')['checks'];seen={str(Path(x['path']).resolve()) for x in checks}
for n in ['PROTOCOL.md','fixed-answer-key.json','FROZEN_RUBRIC.md','score.mjs','freeze-manifest.json','run-config.json']:
 p=r/'eval/v36-fresh-confirmation'/n
 if str(p.resolve()) not in seen:checks.append({'path':str(p.resolve()),'sha256':sha(p)});seen.add(str(p.resolve()))
for pack in config['packs']:
 for file in pack['files']:
  p=Path(file['path']);assert sha(p)==file['sha256'],p
  if str(p.resolve()) not in seen:checks.append({'path':str(p.resolve()),'sha256':sha(p)});seen.add(str(p.resolve()))
for x in checks:assert sha(Path(x['path']))==x['sha256'],x['path']
spec=lambda p:{'path':'/'+p,'sha256':sha(r/p)}
dependencies=[p.relative_to(r).as_posix() for p in (r/'eval').glob('answer-completeness*/coverage.mjs') if 'v37' not in str(p)]+['retrieval.mjs','hybrid.mjs','semantic.mjs','research.mjs','eval/retrieval-quality/section-index.mjs','eval/retrieval-quality/grade.mjs']
config['module_identity']={'candidate':{**spec('eval/answer-completeness-v37/coverage.mjs'),'id':'coverage-v37-scoped-policy-forms'},'paired':spec('eval/answer-completeness-v36/coverage.mjs'),'helper':spec('tests/fixtures/module-identity.mjs'),'dependencies':[spec(p) for p in dependencies]}
for name,data in [('run-config.json',config),('input-integrity.json',{'checks':checks}),('manual-adjudication.json',{})]:(out/name).write_text(json.dumps(data,indent=2),encoding='utf-8',newline='\n')
files=[p.relative_to(r).as_posix() for p in root.iterdir() if p.is_file() and p.name!='freeze-manifest.json']+dependencies+['tests/browser-coverage-v37.mjs','tests/coverage-v37.test.mjs','tests/fixtures/runner-evidence.mjs','tests/fixtures/module-identity.mjs','tests/fixtures/workspace-ui.mjs','app.mjs','index.html','styles.css','pdf-preview.mjs','pdf-highlight.mjs']
files+=['docs/evidence/coverage-v34-r44/post-seal-engineering-probe.json','docs/evidence/coverage-v35-r44/engineering-review.json','docs/evidence/coverage-v35-r44/engineering-probe.json']
for setroot in ['v35-fresh-confirmation','v36-fresh-confirmation']:
 files+=['eval/'+setroot+'/'+n for n in ['PROTOCOL.md','fixed-answer-key.json','FROZEN_RUBRIC.md','score.mjs','freeze-manifest.json']]
files+=['eval/v32-fresh-confirmation/'+n for n in ['PROTOCOL.md','fixed-answer-key.json','score.mjs','freeze-manifest.json']]
freeze={'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'candidate_commit':config['candidate_commit'],'browser':pre['browser'],'preflight_sha256':sha(b/'coverage-v37-init-diagnostic/result.json'),'private_config_sha256':sha(out/'run-config.json'),'questions':739,'hybrid':683,'lexical_comparison':56,'files':[{'path':n,'sha256':sha(r/n)} for n in sorted(set(files))]}
(root/'freeze-manifest.json').write_text(json.dumps(freeze,indent=2),encoding='utf-8',newline='\n');print(f"739 questions frozen; {len(checks)} original input hashes; {len(freeze['files'])} code/rubric/helper hashes")
