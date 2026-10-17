from pathlib import Path
import json,hashlib,zipfile,datetime,subprocess
r=Path.cwd();b=r.parent.parent/'outputs';root=r/'eval/answer-completeness-v37';raw=b/'coverage-v37-first-run';out=b/'coverage-v37-final';out.mkdir()
read=lambda p:json.loads(p.read_text(encoding='utf-8'));sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert not (raw/'run-status.json').exists();freeze=read(root/'freeze-manifest.json');failure=read(raw/'run-failure.json')
for x in freeze['files']:assert sha(r/x['path'])==x['sha256'],x['path']
partial=read(raw/'capture-partial.json') if (raw/'capture-partial.json').exists() else None
record={'status':'BLOCKED','classification':'First once-only739 exposed regression interrupted; no accuracy grades assigned','failure':failure,'partial_candidate_cases':len(partial['cases']) if partial else 0,'accuracy_summary':None,'question_retries':0,'integration_review':'STOPPED','production_change':'NONE'}
with (out/'BLOCKED_FIRST_RUN.json').open('x',encoding='utf-8') as f:json.dump(record,f,indent=2)
paths=[(p,p.relative_to(b).as_posix()) for d in [raw,out,b/'coverage-v37-init-diagnostic',b/'coverage-v37-inputs'] for p in sorted(d.rglob('*')) if p.is_file()]
paths += [(r/x['path'],'frozen-repository/'+x['path']) for x in freeze['files']]+[(root/'freeze-manifest.json','frozen-repository/eval/answer-completeness-v37/freeze-manifest.json')]
for n in ['coverage-v37-browser.log','coverage-v37-unit-tests.log','coverage-v37-offline-checks.log','coverage-v37-served-preflight.json']:paths.append((b/n,n))
archive=b/'GroundedDesk-coverage-v37-first-BLOCKED-evidence.zip'
with zipfile.ZipFile(archive,'x',zipfile.ZIP_DEFLATED) as z:
 for p,n in paths:z.write(p,n)
with zipfile.ZipFile(archive) as z:
 assert len(z.namelist())==len(set(z.namelist())) and z.testzip() is None
 for p,n in paths:assert z.read(n)==p.read_bytes(),n
seal={'archive':archive.name,'sha256':sha(archive),'verified_members':len(paths),'sealed_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Original interrupted run before diagnosis, no accuracy grades or retry','freeze_commit':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()}
with (out/'archive-integrity.json').open('x',encoding='utf-8') as f:json.dump(seal,f,indent=2)
print(json.dumps(seal,indent=2))
