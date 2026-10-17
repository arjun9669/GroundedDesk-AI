from pathlib import Path
import json,hashlib,zipfile,datetime,subprocess
r=Path.cwd();b=r.parent.parent/'outputs';pack=r/'eval/v32-fresh-confirmation';raw=b/'hearth32-v32-first-run';final=b/'hearth32-v32-final'
read=lambda p:json.loads(p.read_text(encoding='utf-8'));sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert read(raw/'run-status.json')['status']=='COMPLETE'
freeze=read(pack/'freeze-manifest.json')
for f in freeze['files']:assert sha(r/f['path'])==f['sha256'],f['path']
assert len(read(raw/'Hearth32/capture.json')['cases'])==32
paths=[(p,p.relative_to(b).as_posix()) for d in [raw,final,b/'hearth32-v32-init-diagnostic'] for p in sorted(d.rglob('*')) if p.is_file()]
paths += [(pack/'freeze-manifest.json','frozen-repository/eval/v32-fresh-confirmation/freeze-manifest.json')]
paths += [(r/f['path'],'frozen-repository/'+f['path']) for f in freeze['files']]
paths += [(b/n,n) for n in ['hearth32-v32-served-preflight.json','hearth32-v32-browser.log','hearth32-v32-scoring.log','seal-hearth32-v32.py']]
archive=b/'GroundedDesk-Hearth32-v32-first-evidence.zip'
with zipfile.ZipFile(archive,'x',zipfile.ZIP_DEFLATED) as z:
 for p,n in paths:z.write(p,n)
with zipfile.ZipFile(archive) as z:
 assert len(z.namelist())==len(set(z.namelist())) and z.testzip() is None
 for p,n in paths:assert z.read(n)==p.read_bytes(),n
record={'archive':archive.name,'sha256':sha(archive),'verified_members':len(paths),'sealed_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'freeze_commit':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'scope':'Once-only first answers and frozen automated grades before assistant diagnosis; review and publication separate.'}
with (final/'archive-integrity.json').open('x',encoding='utf-8') as f:json.dump(record,f,indent=2)
print(json.dumps(record,indent=2))
print(json.dumps({k:v for k,v in read(final/'automated-scorecard.json').items() if k in ['summary','gate','regressions']},indent=2))
