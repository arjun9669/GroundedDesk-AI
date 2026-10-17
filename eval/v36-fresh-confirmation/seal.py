from pathlib import Path
import json,hashlib,math,datetime,zipfile,subprocess,re
r=Path.cwd();b=r.parent.parent/'outputs';root=r/'eval/v36-fresh-confirmation';raw=b/'prism32-v36-first-run';out=b/'prism32-v36-final';out.mkdir(exist_ok=True)
read=lambda p:json.loads(p.read_text(encoding='utf-8'));sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,d):
 with p.open('x',encoding='utf-8') as f:json.dump(d,f,indent=2)
freeze=read(root/'freeze-manifest.json');cfg=read(root/'run-config.json')
for f in freeze['files']:assert sha(r/f['path'])==f['sha256'],f['path']
complete=(raw/'run-status.json').exists() and read(raw/'run-status.json')['status']=='COMPLETE'
if complete:
 card=read(out/'automated-scorecard.json');capture=read(raw/'Prism32/capture.json');ext=read(raw/'Prism32/source-extraction.json');assert len(capture['cases'])==32
 events=[json.loads(s) for s in (raw/'run-events.jsonl').read_text(encoding='utf-8').splitlines()]
 assert [e['id'] for e in events if e['type']=='case_captured']==[c['id'] for c in cfg['packs'][0]['cases']]
 assert len([e for e in events if e['type']=='submission_started'])==28
 vectors=list(ext['sentence_vectors']);citation_checks=0;literal=0;paired_errors=[]
 for row,key in zip(capture['cases'],cfg['packs'][0]['cases']):
  assert row['id']==key['id'] and row['question']==key['question']
  if row['workflow']=='hybrid':
   pre=read(raw/'Prism32'/(row['id']+'-pre-candidate.json'));assert pre['query_vector']==row['query_vector'] and pre['facet_query_vectors']==row['facet_query_vectors'];vectors += [row['query_vector']]+row['facet_query_vectors']
  for v in ['baseline','fixed','section','paired_fixed','paired_section']:
   a=row['pairedPrevious'][v[7:]] if v.startswith('paired_') else row[v]
   if a.get('execution_status')=='ERROR':paired_errors.append({'id':row['id'],'variant':v,'error':a['error']});continue
   assert [int(x) for x in re.findall(r'\[(\d+)\]',a['answer'])]==[s['citation'] for s in a['sources']];citation_checks+=1
   for s in a['sources']:
    text=next(d['text'] for d in ext['documents'] if d['name']==s['filename']);norm=lambda t:' '.join(t.split());assert s['quote'] and norm(s['quote']) in norm(text);literal+=1
 for vec in vectors:assert len(vec)==384 and all(math.isfinite(n) for n in vec) and abs(sum(n*n for n in vec)-1)<.01
 status={'status':'COMPLETE','cases_once':32,'hybrid':28,'lexical_comparison':4,'source_vectors':len(ext['sentence_vectors']),'query_vectors':28,'facet_vectors':len(vectors)-len(ext['sentence_vectors'])-28,'finite_unit384':True,'citation_checks':citation_checks,'literal_citation_checks':literal,'paired_errors':paired_errors,'native_gate':card['gate']}
else:
 assert not (out/'automated-scorecard.json').exists();failure=read(raw/'run-failure.json');partial=read(raw/'capture-partial.json') if (raw/'capture-partial.json').exists() else {'cases':[]}
 status={'status':'BLOCKED','failure':failure,'captured_candidate_cases':len(partial['cases']),'native_grades_assigned':False,'accuracy_summary':None,'integration_review':'STOPPED'};write(out/'BLOCKED_FIRST_RUN.json',status)
runtime=['app.mjs','retrieval.mjs','hybrid.mjs','semantic.mjs','research.mjs','index.html','styles.css','pdf-preview.mjs','pdf-highlight.mjs']
assert subprocess.check_output(['git','diff','bba4e2479f16baa98c4cc5d41293213fef7ddd2f','--',*runtime,'eval/answer-completeness-v36','eval/answer-completeness-v35'])==b''
archives=read(b/'coverage-v36-final/integrity-audit.json')['immutable_archives']+[read(b/'coverage-v36-final/archive-integrity.json')]
for a in archives:assert sha(b/a['archive'])==a['sha256']
write(out/'integrity-audit.json',{'capture':status,'frozen_files':len(freeze['files']),'source_hashes':[{'name':f['name'],'sha256':sha(Path(f['path']))} for f in cfg['packs'][0]['files']],'runtime_unchanged':runtime,'candidate_and_paired_unchanged':True,'prior_first_archives_unchanged':archives})
paths=[(p,p.relative_to(b).as_posix()) for d in [raw,out,b/'prism32-v36-init-diagnostic'] for p in sorted(d.rglob('*')) if p.is_file()]
paths += [(root/'freeze-manifest.json','frozen-repository/eval/v36-fresh-confirmation/freeze-manifest.json')]+[(r/x['path'],'frozen-repository/'+x['path']) for x in freeze['files']]
for n in ['prism32-v36-served-preflight.json','prism32-v36-browser.log','prism32-v36-unit-tests.log','prism32-v36-offline-checks.log','prepare-prism32-v36-inputs.py']:
 if (b/n).exists():paths.append((b/n,n))
archive=b/('GroundedDesk-Prism32-v36-first-'+('evidence' if complete else 'BLOCKED-evidence')+'.zip')
with zipfile.ZipFile(archive,'x',zipfile.ZIP_DEFLATED) as z:
 for p,n in paths:z.write(p,n)
with zipfile.ZipFile(archive) as z:
 assert len(z.namelist())==len(set(z.namelist())) and z.testzip() is None
 for p,n in paths:assert z.read(n)==p.read_bytes(),n
record={'archive':archive.name,'sha256':sha(archive),'verified_members':len(paths),'sealed_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'freeze_commit':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'scope':'First once-only captures and initial native grades before diagnosis; interrupted captures ungraded. Later assistant review separate.'}
write(out/'archive-integrity.json',record);print(json.dumps({'capture':status,'archive':record},indent=2))
