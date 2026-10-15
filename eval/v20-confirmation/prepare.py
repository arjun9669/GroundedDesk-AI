"""Prepare once, before first answers; never print sampled questions."""
from pathlib import Path
import json,hashlib,re,datetime,subprocess
repo=Path.cwd();base=repo.parent.parent/'outputs';root=repo/'eval/v20-confirmation'
read=lambda p:json.loads(p.read_bytes());sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert read(base/'coverage-v20-final/decision.json')['development_gate']=='PASS'
oldfreeze=read(repo/'eval/answer-completeness-v20/freeze-manifest.json')
for row in oldfreeze['files']:assert sha(repo/row['path'])==row['sha256']
checks=read(base/'coverage-v20-inputs/input-integrity.json')['checks'];assert len(checks)==118
for row in checks:assert sha(Path(row['path']))==row['sha256']
dataset=base/'coverage-v2-inputs/squad-dev-v1.1.json'
assert sha(dataset)==read(repo/'eval/answer-completeness-v2/external24/freeze-manifest.json')['dataset_sha256']
excluded=set()
for folder in ['answer-completeness-v2/external24','answer-completeness-v3/fresh32','answer-completeness-v7/fresh32','answer-completeness-v9/fresh32','answer-completeness-v13/actor40','answer-completeness-v15/scope48','answer-completeness-v17/confirmation48','answer-completeness-v18/precision48']:
 for q in read(repo/'eval'/folder/'fixed-answer-key.json'):
  if 'source_article' in q:excluded.add(q['source_article'])
assert len(excluded)==32
seed='GroundedDesk v20 2026-10-15 Binding64-first-v1';order=lambda s:hashlib.sha256((seed+s).encode()).hexdigest()
eligible=[]
for article in read(dataset)['data']:
 if article['title'] in excluded:continue
 paras=[]
 for p in article['paragraphs']:
  valid=[q for q in p['qas'] if q['answers'] and all(p['context'][a['answer_start']:a['answer_start']+len(a['text'])]==a['text'] for a in q['answers'])]
  if 500<=len(p['context'])<=1500 and len(valid)>=3:paras.append((p['context'],valid))
 if len(paras)>=2:eligible.append((article['title'],paras))
# All fictional wording/values fixed in code before sampling or app answers.
fixtures=[
 {'site':'Velora Audio Archive','a':'Mira Solven','b':'Taro Ilven','noun':'segments','singular':'segment','verb':'label','gerund':'labeling','other':'mounted','third':'inspected','n':27,'m':34,'k':19,'cards':'listening cards','days':45,'cutoff':'14:00','hold':'a correction review','release':'rights review'},
 {'site':'Nerith Sky Workshop','a':'Lena Corven','b':'Ivo Darven','noun':'plates','singular':'plate','verb':'number','gerund':'numbering','other':'polished','third':'photographed','n':38,'m':52,'k':16,'cards':'observation cards','days':70,'cutoff':'15:30','hold':'a coordinate review','release':'publication review'},
 {'site':'Caldrin Rock Imaging Room','a':'Nira Telven','b':'Olan Merven','noun':'frames','singular':'frame','verb':'mark','gerund':'marking','other':'printed','third':'checked','n':43,'m':26,'k':31,'cards':'imaging cards','days':55,'cutoff':'13:00','hold':'a sample review','release':'ownership review'},
 {'site':'Soravin Specimen Studio','a':'Vera Linven','b':'Eran Morven','noun':'trays','singular':'tray','verb':'tag','gerund':'tagging','other':'cleaned','third':'weighed','n':24,'m':41,'k':18,'cards':'conservation cards','days':80,'cutoff':'16:00','hold':'a treatment review','release':'custody review'}]
out=base/'v20-binding64-inputs';out.mkdir(exist_ok=False)
packroot=root/'binding64';(packroot/'source_docs').mkdir(parents=True,exist_ok=False)
cases=[];compounds=[];paths=[];titles=[];contexts=[];public_contexts=[]
for i,(title,paras) in enumerate(sorted(eligible,key=lambda x:order(x[0]))[:4]):
 titles.append(title);f=fixtures[i];filename=f'{i+1:02d}_'+re.sub(r'[^A-Za-z0-9_-]','_',title)+'.md';parts=[]
 for j,(context,qs) in enumerate(sorted(paras,key=lambda x:order(x[0]))[:2],1):
  selected=sorted(qs,key=lambda q:order(q['id']))[:3];parts.append(f'## Public context {j}\n{context}');public_contexts.append(context)
  for q in selected:cases.append({'id':f'F{len(cases)+1:02d}','question':q['question'],'workflow':'hybrid','category':'public_supported','original_question_id':q['id'],'source_article':title,'expected_sources':[{'filename':filename,'context':context,'groups':[[a['text'] for a in q['answers']]]}]})
  if j==1:compounds.append({'id':f'C{i+1:02d}','question':selected[0]['question']+' Also, '+selected[1]['question'],'workflow':'hybrid','category':'public_compound','source_article':title,'expected_sources':[{'filename':filename,'context':context,'groups':[[a['text'] for a in q['answers']] for q in selected[:2]]}]})
 count=f"At the fictional {f['site']}, {f['a']} completed a {f['n']}-{f['singular']} {f['gerund']} run. {f['b']} {f['other']} {f['m']} {f['noun']}. {f['a']} {f['third']} {f['k']} {f['noun']}. These are separate completed tasks, not interchangeable totals. No count is recorded for other actor and action combinations."
 retain=f"At {f['site']}, {f['cards']} are kept for {f['days']} days. If {f['hold']} is open, retain the affected cards until the review is closed, even after the {f['days']}-day period."
 dispatch=f"At {f['site']}, a public copy request received before {f['cutoff']} is sent the same operating day. At or after {f['cutoff']}, send it on the next operating day. If the {f['release']} is unresolved, do not send the copy until that review closes."
 parts.extend([f'## Fictional completed tasks\n{count}',f'## Fictional retention\n{retain}',f'## Fictional copy requests\n{dispatch}'])
 target=packroot/'source_docs'/filename;target.write_bytes((f'# {title.replace("_"," ")}\n\n'+'\n\n'.join(parts)+'\n').encode());paths.append(target);contexts.append({'count':count,'retain':retain,'dispatch':dispatch})
assert len(cases)==24
cases+=compounds
for i,f in enumerate(fixtures):
 c=contexts[i];filename=paths[i].name
 def add(id,q,cat,context,groups):cases.append({'id':id,'question':q,'workflow':'hybrid','category':cat,'expected_sources':[{'filename':filename,'context':context,'groups':[[g] for g in groups]}]})
 add(f'T{i+1}A',f"How many {f['noun']} did {f['a']} {f['verb']} at {f['site']}?",'count_supported',c['count'],[f"{f['a']} completed a {f['n']}-{f['singular']} {f['gerund']} run"])
 add(f'T{i+1}B',f"How many {f['noun']} did {f['b']} {f['other'].removesuffix('ed')} at {f['site']}?",'count_supported',c['count'],[f"{f['b']} {f['other']} {f['m']} {f['noun']}"])
 # Natural verb forms are fixed explicitly rather than stemming question text.
 cases[-1]['question']=f"How many {f['noun']} did {f['b']} {['mount','polish','print','clean'][i]} at {f['site']}?"
 add(f'T{i+1}C',f"What was the number of {f['noun']} {f['third']} by {f['a']} at {f['site']}?",'count_supported',c['count'],[f"{f['a']} {f['third']} {f['k']} {f['noun']}"])
 add(f'E{i+1}A',f"How long are {f['cards']} retained at {f['site']}, including the open-review exception?",'conditional_supported',c['retain'],[f"{f['cards']} are kept for {f['days']} days",f"If {f['hold']} is open, retain the affected cards until the review is closed, even after the {f['days']}-day period"])
 add(f'E{i+1}B',f"A public copy request reaches {f['site']} at {f['cutoff']}. When is it sent, and what happens if the {f['release']} is unresolved?",'conditional_supported',c['dispatch'],[f"At or after {f['cutoff']}, send it on the next operating day",f"If the {f['release']} is unresolved, do not send the copy until that review closes"])
 for j,(actor,action) in enumerate([(f['a'],['mount','polish','print','clean'][i]),(f['b'],f['verb'])],1):
  cases.append({'id':f'N{i+1}{j}','question':f"How many {f['noun']} did {actor} {action} at {f['site']}?",'workflow':'hybrid','category':'unsupported_actor_action','unsupported':True,'expected_sources':[],'absence_audit':{'actor':actor,'action':action,'noun':f['noun'],'site':f['site'],'scope':'all four complete documents','reason':'Names/actions exist separately but requested actor/action count is not provided'}})
for i,f in enumerate(fixtures):
 j=(i+1)%4;g=fixtures[j]
 cases.append({'id':f'X{i+1:02d}','question':f"Compare retention of {f['cards']} at {f['site']} and {g['cards']} at {g['site']}, including each open-review exception.",'workflow':'comparison','category':'lexical_comparison','expected_files':[paths[i].name,paths[j].name],'expected_sources':[{'filename':paths[k].name,'context':contexts[k]['retain'],'groups':[[f"{fixtures[k]['cards']} are kept for {fixtures[k]['days']} days"],[f"If {fixtures[k]['hold']} is open, retain the affected cards until the review is closed, even after the {fixtures[k]['days']}-day period"]]} for k in [i,j]]})
standard=[('What is the exact database password used by {site}?','database password'),('What is the bank account number associated with {site}?','bank account'),('What is the date of birth of the fictional coordinator Pelrin Voss at {site}?','Pelrin Voss'),('What is the current Bitcoin price in AED in the {site} records?','Bitcoin')]
alltext='\n'.join(p.read_text(encoding='utf-8') for p in paths)
for f in fixtures:
 for phrase in [f['site'],f['a'],f['b']]:assert phrase.lower() not in '\n'.join(public_contexts).lower(),'Fictional-name collision: abort; do not resample'
for i,(template,absent) in enumerate(standard):
 assert absent.lower() not in alltext.lower(),'Absence collision: abort; do not resample'
 cases.append({'id':f'U{i+1:02d}','question':template.format(site=fixtures[i]['site']),'workflow':'hybrid','category':'unsupported_standard','unsupported':True,'expected_sources':[],'absence_audit':{'absent_phrase':absent,'scope':'all four complete documents'}})
assert len(cases)==64 and len({c['id'] for c in cases})==64 and sum(c['workflow']=='comparison' for c in cases)==4
# Validate unsupported tuple absence explicitly against all fixed completed-task clauses.
for c in cases:
 if c['category']=='unsupported_actor_action':
  a=c['absence_audit'];f=next(f for f in fixtures if f['site']==a['site'])
  assert (a['actor'],a['action']) not in [(f['a'],f['verb']),(f['b'],['mount','polish','print','clean'][fixtures.index(f)]),(f['a'],['inspect','photograph','check','weigh'][fixtures.index(f)])]
key=packroot/'fixed-answer-key.json';key.write_bytes(json.dumps(cases,indent=2,ensure_ascii=False).encode())
attr=packroot/'ATTRIBUTION.md';attr.write_bytes(('''# Binding64 attribution

24 unchanged original public QA and context paragraphs: SQuADv1.1 dev, Rajpurkar et al.2016, https://rajpurkar.github.io/SQuAD-explorer/dataset/dev-v1.1.json ; https://arxiv.org/abs/1606.05250 ; CC BY-SA4.0 https://creativecommons.org/licenses/by-sa/4.0/ . Adaptations add headings, four joined questions and explicitly fictional operations appendices/questions. Constructed controls are author-created, not external validation. Public/model exposure cannot be excluded; not official SQuAD scoring or representative accuracy.

Wikipedia attribution/revision histories:
'''+''.join(f'- https://en.wikipedia.org/wiki/{t} ; https://en.wikipedia.org/w/index.php?title={t}&action=history\n' for t in titles)).encode())
commit=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
manifest={'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'preparation_commit':commit,'candidate_commit':oldfreeze['candidate_commit'],'seed':seed,'dataset_sha256':sha(dataset),'excluded_articles':sorted(excluded),'sampling':'SHA256 title/context/question ordering; no resampling/outcome filtering','files':[{'path':p.relative_to(packroot).as_posix(),'sha256':sha(p)} for p in paths+[key,attr]]}
(packroot/'freeze-manifest.json').write_bytes(json.dumps(manifest,indent=2).encode())
cfg={'candidate_commit':oldfreeze['candidate_commit'],'classification':'Binding64 prospective public/constructed confirmation; first score immutable; not sealed independent accuracy','module_identity':read(base/'coverage-v20-inputs/run-config.json')['module_identity'],'packs':[{'name':'Binding64','files':[{'name':p.name,'path':str(p),'sha256':sha(p)} for p in paths],'cases':cases,'integrity':'Four sources/key/attribution frozen before answers;32 article exclusions;12 unsupported absence/tuple audits','criteria':(root/'PROTOCOL.md').read_text(encoding='utf-8')}]}
(out/'run-config.json').write_bytes(json.dumps(cfg,indent=2,ensure_ascii=False).encode());(packroot/'run-config-sha256.json').write_bytes(json.dumps({'sha256':sha(out/'run-config.json')},indent=2).encode())
files=['eval/v20-confirmation/'+f for f in ['PROTOCOL.md','prepare.py','score.mjs']]+['tests/browser-coverage-v20.mjs','tests/fixtures/runner-evidence.mjs','tests/fixtures/module-identity.mjs']
(root/'code-freeze.json').write_bytes(json.dumps({'preparation_commit':commit,'files':[{'path':f,'sha256':sha(repo/f)} for f in files],'candidate_original_freeze_sha256':sha(repo/'eval/answer-completeness-v20/freeze-manifest.json'),'original_input_checks':118,'config_sha256':sha(out/'run-config.json')},indent=2).encode())
print('Binding64 frozen:64 questions,60 Hybrid+4 lexical Comparison;32 prior articles excluded; no sampled QA printed.')
