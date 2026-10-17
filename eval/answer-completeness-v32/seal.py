from pathlib import Path
import json,hashlib,math,re,subprocess,datetime,zipfile,shutil,collections
r=Path.cwd();b=r.parent.parent/'outputs';raw=b/'coverage-v32-first-run';f=b/'coverage-v32-final';pub=r/'docs/evidence/coverage-v32-r44'
read=lambda p:json.loads(p.read_text(encoding='utf-8'));sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,data):
 with p.open('x',encoding='utf-8') as stream:json.dump(data,stream,indent=2,ensure_ascii=False)
cfg=read(b/'coverage-v32-inputs/run-config.json');freeze=read(r/'eval/answer-completeness-v32/freeze-manifest.json')
assert read(raw/'run-status.json')['status']=='COMPLETE'
assert sha(b/'coverage-v32-inputs/run-config.json')==freeze['private_config_sha256']
for x in freeze['files']:assert sha(r/x['path'])==x['sha256'],x['path']
inputs=read(b/'coverage-v32-inputs/input-integrity.json')['checks']
for x in inputs:assert sha(Path(x['path']))==x['sha256'],x['path']
workflow_counts=collections.Counter(c.get('workflow','hybrid').lower() for p in cfg['packs'] for c in p['cases'])
assert workflow_counts=={'hybrid':599,'comparison':44}
captured_counts=collections.Counter(row['workflow'] for p in cfg['packs'] for row in read(raw/p['name']/'capture.json')['cases'])
assert captured_counts==workflow_counts
cards=[]
for p in cfg['packs']:
 name=p['name']
 if name=='Binding64':card=read(b/'coverage-v32-binding64-final/scorecard.json')
 elif name in ['Cedar32','Bracken32','Flint32','Morrow32']:
  card=read(b/('coverage-v32-'+name.lower()+'-final/automated-scorecard.json'));card={'name':name,**card,**card['variants']}
 else:card=read(f/(name+'-scorecard.json'))
 cards.append(card)
hist=read(f/'decision.json');binding=next(c for c in cards if c['name']=='Binding64');cedar=next(c for c in cards if c['name']=='Cedar32');bracken=next(c for c in cards if c['name']=='Bracken32')
events=[json.loads(x) for x in (raw/'run-events.jsonl').read_text(encoding='utf-8').splitlines()]
expected=[(p['name'],c['id']) for p in cfg['packs'] for c in p['cases']]
assert [(e['pack'],e['id']) for e in events if e['type']=='case_captured']==expected and len(expected)==643
assert len([e for e in events if e['type']=='submission_started'])==599
proof=read(raw/'module-proof.json');assert proof['candidate']['id']=='coverage-v32-event-only-location'
assert proof['paired']['sha256']==cfg['module_identity']['paired']['sha256']
changed=[];regressions=[];new_fa=[];new_ff=[];citation_checks=[];vectors=[];paired_checks=0
for pack,card in zip(cfg['packs'],cards):
 name=pack['name'];capture=read(raw/name/'capture.json');ext=read(raw/name/'source-extraction.json')
 if name=='Morrow32':old=read(b/'coverage-v31-morrow32-final/automated-scorecard.json')['variants']
 elif name=='Flint32':old=read(b/'coverage-v31-flint32-final/automated-scorecard.json')['variants']
 elif name=='Bracken32':old=read(b/'coverage-v31-bracken32-final/automated-scorecard.json')['variants']
 elif name=='Cedar32':old=read(b/'coverage-v31-cedar32-final/automated-scorecard.json')['variants']
 elif name=='Binding64':old=read(b/'coverage-v31-binding64-final/scorecard.json')
 else:old=read(b/'coverage-v31-final'/(name+'-scorecard.json'))
 assert len(ext['sentence_index'])==len(ext['sentence_vectors'])
 for v in ext['sentence_vectors']:assert len(v)==384 and all(math.isfinite(n) for n in v)
 facets=0
 for i,row in enumerate(capture['cases']):
  assert row['id']==pack['cases'][i]['id'] and row['question']==pack['cases'][i]['question']
  if row['workflow']=='hybrid':
   assert len(row['query_vector'])==384 and all(math.isfinite(n) for n in row['query_vector'])
   for v in row.get('facet_query_vectors',[]):assert len(v)==384 and all(math.isfinite(n) for n in v);facets+=1
  literal=lambda a:[(s['filename'],s['quote']) for s in a['sources']]
  for variant in ['fixed','section']:
   g=card[variant][i];prior=row['pairedPrevious'][variant];o=old[variant][i]
   assert prior['answer']==o['answer'] and literal(prior)==literal(o),(name,row['id'],variant,'paired drift')
   paired_checks+=1
   change=row[variant]['answer']!=prior['answer'] or literal(row[variant])!=literal(prior)
   # V32 intentionally repairs temporal cutoff preservation without changing event and lexical packet behavior; all changes retained below.
   if change:changed.append({'pack':name,'id':row['id'],'variant':variant,'question':row['question'],'prior_outcome':o['outcome'],'outcome':g['outcome'],'prior_answer':prior['answer'],'answer':g['answer'],'sources':g['sources'],'false_acceptance':g.get('false_acceptance',False),'false_refusal':g.get('false_refusal',False)})
   if o['outcome']=='PASS' and g['outcome']!='PASS':regressions.append({'pack':name,'id':row['id'],'variant':variant,'outcome':g['outcome']})
   if g.get('false_acceptance') and not o.get('false_acceptance'):new_fa.append({'pack':name,'id':row['id'],'variant':variant})
   if g.get('false_refusal') and not o.get('false_refusal'):new_ff.append({'pack':name,'id':row['id'],'variant':variant})
  for variant in ['baseline','fixed','section','paired_fixed','paired_section']:
   a=row['pairedPrevious'][variant[7:]] if variant.startswith('paired_') else row[variant]
   nums=[s['citation'] for s in a['sources']]
   assert [int(n) for n in re.findall(r'\[(\d+)\]',a['answer'])]==nums and len(nums)==len(set(nums))
   citation_checks.append({'pack':name,'id':row['id'],'variant':variant,'passed':True})
 vectors.append({'pack':name,'source_vectors':len(ext['sentence_vectors']),'facet_vectors':facets,'finite384':True,'browser':capture['browser'],'model':capture['model']})
runtime=['app.mjs','retrieval.mjs','hybrid.mjs','semantic.mjs','research.mjs','index.html','styles.css','pdf-preview.mjs','pdf-highlight.mjs']
assert subprocess.check_output(['git','diff','81a5db788c1be81e42565a3799f2d1d9c3795c36','--',*runtime])==b''
decision=read(f/'combined-decision.json')
assert [c['name'] for c in cards]==[c['name'] for c in read(f/'ALL_SCORECARDS.json')]
audit={'cases_once':643,'Hybrid':workflow_counts['hybrid'],'lexical_Comparison':workflow_counts['comparison'],'paired_v31_exact_answer_quote_checks':paired_checks,'input_hashes_verified':len(inputs),'frozen_code_files_verified':len(freeze['files']),'citation_number_checks':len(citation_checks),'vectors':vectors,'module_identity':proof,'runtime_files_unchanged':runtime,'history':read(b/'coverage-v32-history-audit.json'),'screenshot_identity':'New runner and lab panels correctly identify V32. Pre-question module hashes establish v32 candidate and unchanged v31 paired execution; actual r44 UI captures are separate.'}
write(f/'integrity-audit.json',audit);write(f/'changed-answer-review.json',{'changed_outputs':changed,'method':'Exact displayed-answer/quote comparison against same-session unchanged v30; all changed evidence retained for assistant review. Frozen per-pack grading unchanged.'});write(f/'EVALUATION_SCORECARD.json',{'decision':decision,'audit':audit,'scorecards':cards})
lines=['# V32 — real Chrome/MiniLM in-sample regression','',f"**Frozen regression gate: {decision['overall_gate']}. Live retrieval build remains 2026-10-13-r44.**",'',
'643 previously exposed questions were submitted once:599 Hybrid and44 separate lexical Comparison. Actual installed headless Chrome155.0.8059.80 with local Xenova/all-MiniLM-L6-v2 q8 WASM; Qwen disabled. Original production UI evidence precedes isolated v32 fixed/section outputs. This is not an attached visible-tab test or a deployed-candidate test. No saved-vector replay, mock-vector accuracy or post-answer candidate tuning. V32 restricts the v31 location-prefix guard to event frames. Non-event clock cutoffs retain their original content; v31 lexical packet selection and the location parser remain unchanged. Prequestion module hashes and V32 lab panels establish execution; exact displayed outputs and unchanged native rubrics determine grades. Different pack rubrics must not be pooled as one accuracy figure.','',
'V31 first combined FAIL and Bracken32 31/0/1 are preserved, including its original sealed audit scalar40 and explicit44-Comparison erratum. Morrow32 first v30 confirmation 30/0/2 and its first failed gate remain immutable. V30 exposed611 regression gate PASS and v29 first failed gate also remain unchanged. Flint32 first26/3/3 in v28 and v28 exposed579 gate PASS also remain immutable. Bracken32 first21/1/10 and Cedar32 first24/2/6 remain unchanged. V26 first failed gate, Bracken32 31/0/1 and Cedar32 31/0/1 remain sealed; v25 exposed Cedar32 32/0/0 also remains preserved. V27 first Bracken32 32/0/0, Cedar32 30/0/2 and its combined FAIL are unchanged. All earlier first-look scores, failed attempts and source/key qualifications remain intact.','',
'## Per-pack scores','', '| Set | Fixed PASS / PARTIAL / FAIL | Section PASS / PARTIAL / FAIL |','|---|---|---|']
for c in cards:
 triple=lambda v:' / '.join(str(c['summary'][v][k]) for k in ['PASS','PARTIAL','FAIL'])
 lines.append(f"| {c['name']} | {triple('fixed')} | {triple('section')} |")
lines+=['','## Gate and regressions','','```json',json.dumps(decision,indent=2),'```','',
'## Evidence and limitations','',f"Verified {len(inputs)} original input hashes, {len(freeze['files'])} frozen code files, {paired_checks} same-session v31 answer/quote parity checks and {len(citation_checks)} citation-number checks. All source/query/facet vectors are finite384-dimensional. Original Atlas historical hash manifest remains unavailable; current PDF hashes and independent text provenance remain checked.",'',
audit['screenshot_identity'],'',
'Quotation provenance means literal source containment. Paragraph precision and gold-span presence follow each unchanged pack rubric; neither proves general entailment. Binding64 retains the monthly-maximum/since-WWII, winter-average/absolute-minimum and deictic-occupation wording limits documented in prior reports. Public source exposure and author-created controls remain qualifications. No performance, memory, citation-navigation or export integration qualification is claimed.','',
'## Changed outputs versus unchanged v30','']
for x in changed:lines += [f"### {x['pack']} / {x['id']} / {x['variant']} — {x['prior_outcome']} → {x['outcome']}",'',x['question'],'','Before:', '', x['prior_answer'],'','Observed:', '', x['answer'],'']
lines+=['## Every exact answer and displayed quotation','']
for c in cards:
 for i,g in enumerate(c['fixed']):
  lines += [f"### {c['name']} / {g['id']} — {g['question']}",'']
  for variant in ['baseline','fixed','section']:
   a=c[variant][i];lines += [f"**{variant}: {a['outcome']}**",'',a['answer'],'']
   for j,s in enumerate(a['sources']):
    provenance=a.get('citation_provenance',a.get('provenance',[]));relevance=a.get('citation_relevance',a.get('gold_paragraph_precision',[]))
    lines += [f"Source: {s['filename']}; literal: {provenance[j] if j<len(provenance) else 'see native scorecard'}; rubric relevance/precision: {relevance[j] if j<len(relevance) else 'see native scorecard'}.",'','> '+s['quote'].replace('\n','\n> '),'']
report='\n'.join(lines)
(f/'REPORT.md').write_text(report,encoding='utf-8');(r/'docs/COVERAGE_V32_R44_VALIDATION.md').write_text(report,encoding='utf-8')
pub.mkdir()
for n in ['combined-decision.json','integrity-audit.json','changed-answer-review.json','ALL_SCORECARDS.json']:shutil.copyfile(f/n,pub/n)
for n in ['module-proof.json','run-status.json','run-events.jsonl']:shutil.copyfile(raw/n,pub/n)
shutil.copyfile(r/'eval/answer-completeness-v32/freeze-manifest.json',pub/'freeze-manifest.json')
for pack in cfg['packs']:
 dest=pub/pack['name'];dest.mkdir();shutil.copyfile(raw/pack['name']/'model-ready.png',dest/'model-ready.png')
 write(dest/'capture-index.json',{'files':[{'path':p.relative_to(raw/pack['name']).as_posix(),'sha256':sha(p)} for p in sorted((raw/pack['name']).rglob('*')) if p.is_file()]})
 if pack['name']=='Bracken32':
  for id in ['B02','B08','B10','B11','B12','B14','B16','B21','B23','B24','B27','B28']:
   for suffix in ['-ui.png','-candidate-lab.png']:shutil.copyfile(raw/pack['name']/(id+suffix),dest/(id+suffix))
for pack,ids in {'Meridian24':['I10','I15'],'Atlas15':['D02'],'RetrievalQuality28':['RQ02','RQ13','RQ23'],'ExternalSQuAD24':['E11','E13'],'Cedar32':['C07','C14','C20'],'Flint32':['F03','F06','F08','F20','F21','F29','F30','F32'],'Morrow32':['M11','M21','M29','M30','M31','M32']}.items():
 for case in ids:
  for suffix in ['-ui.png','-candidate-lab.png']:shutil.copyfile(raw/pack/(case+suffix),pub/pack/(case+suffix))

paths=[]
for folder in ['coverage-v32-inputs','coverage-v32-first-run','coverage-v32-final','coverage-v32-binding64-final','coverage-v32-cedar32-final','coverage-v32-bracken32-final','coverage-v32-flint32-final','coverage-v32-morrow32-final','coverage-v32-init-diagnostic']:
 paths += [(p,p.relative_to(b).as_posix()) for p in sorted((b/folder).rglob('*')) if p.is_file()]
for x in freeze['files']:paths.append((r/x['path'],'code/'+x['path']))
paths.append((r/'eval/answer-completeness-v32/freeze-manifest.json','code/eval/answer-completeness-v32/freeze-manifest.json'))
for i,x in enumerate(inputs):paths.append((Path(x['path']),f"original-input-snapshots/{i:03d}-{Path(x['path']).name}"))
paths += [(r/n,'runtime/'+n) for n in runtime]
paths += [(b/n,n) for n in ['coverage-v32-unit-tests.log','coverage-v32-offline-checks.log','coverage-v32-history-audit.json','coverage-v32-browser.log','coverage-v32-served-preflight.json','finish-v32-evaluation.py']]
archive=b/'GroundedDesk-coverage-v32-first-evidence.zip'
with zipfile.ZipFile(archive,'x',zipfile.ZIP_DEFLATED) as z:
 for p,n in paths:z.write(p,n)
with zipfile.ZipFile(archive) as z:
 assert len(z.namelist())==len(set(z.namelist())) and z.testzip() is None
 for p,n in paths:assert z.read(n)==p.read_bytes(),n
seal={'archive':archive.name,'sha256':sha(archive),'verified_members':len(paths),'sealed_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'First once-only browser answers, initial grades, frozen code/config and unchanged source/key snapshots. Subsequent assistant review and publication kept separately.'}
write(f/'archive-integrity.json',seal);write(pub/'archive-integrity.json',seal)
print(json.dumps({'decision':decision,'archive':seal,'changed_outputs':len(changed)},indent=2))
