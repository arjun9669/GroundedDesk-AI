from pathlib import Path
import json,hashlib,math,datetime,zipfile,subprocess,collections,re
r=Path.cwd();b=r.parent.parent/'outputs';raw=b/'coverage-v35-first-run';out=b/'coverage-v35-final'
read=lambda p:json.loads(p.read_text(encoding='utf-8'));sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,d):
 with p.open('x',encoding='utf-8') as f:json.dump(d,f,indent=2,ensure_ascii=False)
cfg=read(b/'coverage-v35-inputs/run-config.json');freeze=read(r/'eval/answer-completeness-v35/freeze-manifest.json');inputs=read(b/'coverage-v35-inputs/input-integrity.json')['checks']
assert read(raw/'run-status.json')['status']=='COMPLETE'
for x in freeze['files']:assert sha(r/x['path'])==x['sha256'],x['path']
for x in inputs:assert sha(Path(x['path']))==x['sha256'],x['path']
assert sha(b/'coverage-v35-inputs/run-config.json')==freeze['private_config_sha256']
expected=[(p['name'],c['id']) for p in cfg['packs'] for c in p['cases']]
events=[json.loads(s) for s in (raw/'run-events.jsonl').read_text(encoding='utf-8').splitlines()]
assert [(e['pack'],e['id']) for e in events if e['type']=='case_captured']==expected and len(expected)==675
assert len([e for e in events if e['type']=='submission_started'])==627
workflows=collections.Counter();vectors=[];paired_errors=[];changes=[];literal_checks=0;citation_checks=0;paired_parity=0
for pack in cfg['packs']:
 capture=read(raw/pack['name']/'capture.json');ext=read(raw/pack['name']/'source-extraction.json');docs=ext['documents'];qv=[];facets=[]
 assert len(capture['cases'])==len(pack['cases'])
 for i,row in enumerate(capture['cases']):
  assert row['id']==pack['cases'][i]['id'] and row['question']==pack['cases'][i]['question'];workflows[row['workflow']]+=1
  if row['workflow']=='hybrid':
   pre=read(raw/pack['name']/(row['id']+'-pre-candidate.json'));assert pre['query_vector']==row['query_vector'] and pre['facet_query_vectors']==row['facet_query_vectors'];qv.append(row['query_vector']);facets+=row['facet_query_vectors']
  for variant in ['baseline','fixed','section','paired_fixed','paired_section']:
   a=row['pairedPrevious'][variant[7:]] if variant.startswith('paired_') else row[variant]
   if a.get('execution_status')=='ERROR':paired_errors.append({'pack':pack['name'],'id':row['id'],'variant':variant,'error':a['error']});continue
   assert [int(x) for x in re.findall(r'\[(\d+)\]',a['answer'])]==[s['citation'] for s in a['sources']];citation_checks+=1
   for s in a['sources']:
    text=next(d['text'] for d in docs if d['name']==s['filename']);norm=lambda t:' '.join(t.split());assert s['quote'] and norm(s['quote']) in norm(text);literal_checks+=1
  for v in ['fixed','section']:
   prior=row['pairedPrevious'][v];new=row[v]
   if prior.get('execution_status')=='ERROR' or new['answer']!=prior['answer'] or [(s['filename'],s['quote']) for s in new['sources']]!=[(s['filename'],s['quote']) for s in prior.get('sources',[])]:changes.append({'pack':pack['name'],'id':row['id'],'variant':v,'question':row['question'],'prior':prior,'observed':new})
  if True:
   old=read(b/'coverage-v34-first-run'/pack['name']/(row['id']+'-candidate.json'))
   for v in ['fixed','section']:
    assert row['pairedPrevious'][v]['answer']==old[v]['answer'] and [(s['filename'],s['quote']) for s in row['pairedPrevious'][v]['sources']]==[(s['filename'],s['quote']) for s in old[v]['sources']],(pack['name'],row['id'],v);paired_parity+=1
 for vec in ext['sentence_vectors']+qv+facets:assert len(vec)==384 and all(math.isfinite(n) for n in vec) and abs(sum(n*n for n in vec)-1)<.01
 vectors.append({'pack':pack['name'],'source':len(ext['sentence_vectors']),'query':len(qv),'facet':len(facets),'finite_unit384':True})
assert workflows=={'hybrid':627,'comparison':48}
runtime=['app.mjs','retrieval.mjs','hybrid.mjs','semantic.mjs','research.mjs','index.html','styles.css','pdf-preview.mjs','pdf-highlight.mjs']
assert subprocess.check_output(['git','diff','81a5db788c1be81e42565a3799f2d1d9c3795c36','--',*runtime])==b''
archive_rows=read(b/'coverage-v34-final/integrity-audit.json')['immutable_archives']
for x in archive_rows:assert sha(b/x['archive'])==x['sha256']
x=read(b/'coverage-v34-final/archive-integrity.json');assert sha(b/x['archive'])==x['sha256'];archive_rows.append(x)
write(out/'integrity-audit.json',{'cases_once':675,'workflows':dict(workflows),'input_hashes':len(inputs),'frozen_files':len(freeze['files']),'vectors':vectors,'citation_number_checks':citation_checks,'literal_citations':literal_checks,'paired_v34_historical_exact_checks':paired_parity,'paired_execution_errors':paired_errors,'runtime_unchanged':runtime,'immutable_archives':archive_rows})
write(out/'changed-outputs.json',changes)
paths=[]
for folder in [p for p in b.glob('coverage-v35-*') if p.is_dir()]:paths += [(p,p.relative_to(b).as_posix()) for p in folder.rglob('*') if p.is_file()]
for x in freeze['files']:paths.append((r/x['path'],'code/'+x['path']))
paths.append((r/'eval/answer-completeness-v35/freeze-manifest.json','code/eval/answer-completeness-v35/freeze-manifest.json'))
for i,x in enumerate(inputs):paths.append((Path(x['path']),f"original-inputs/{i:03d}-{Path(x['path']).name}"))
for n in ['coverage-v35-browser.log','coverage-v35-unit-tests.log','coverage-v35-offline-checks.log','coverage-v35-served-preflight.json']:paths.append((b/n,n))
archive=b/'GroundedDesk-coverage-v35-first-evidence.zip'
with zipfile.ZipFile(archive,'x',zipfile.ZIP_DEFLATED) as z:
 for p,n in paths:z.write(p,n)
with zipfile.ZipFile(archive) as z:
 assert len(z.namelist())==len(set(z.namelist())) and z.testzip() is None
 for p,n in paths:assert z.read(n)==p.read_bytes()
write(out/'archive-integrity.json',{'archive':archive.name,'sha256':sha(archive),'verified_members':len(paths),'sealed_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'First once-only captures, initial native grades, frozen code and original inputs; subsequent review separate'})
print(json.dumps({'decision':read(out/'combined-decision.json'),'changed_outputs':len(changes),'paired_errors':len(paired_errors),'archive':sha(archive)},indent=2))
