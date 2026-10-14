"""Conditional prospective freeze. Never print newly selected questions before capture."""
from pathlib import Path
import json,hashlib,datetime,re
repo=Path.cwd();base=repo.parent.parent/'outputs';root=repo/'eval/answer-completeness-v14'
assert json.loads((base/'coverage-v14-final/decision.json').read_bytes())['development_gate']=='PASS'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
frozen=json.loads((root/'freeze-manifest.json').read_bytes())
for f in frozen['files']:assert sha(repo/f['path'])==f['sha256']
dataset=base/'coverage-v2-inputs/squad-dev-v1.1.json'
assert sha(dataset)==json.loads((repo/'eval/answer-completeness-v2/external24/freeze-manifest.json').read_bytes())['dataset_sha256']
excluded=set()
for folder in ['eval/answer-completeness-v2/external24','eval/answer-completeness-v3/fresh32','eval/answer-completeness-v7/fresh32','eval/answer-completeness-v9/fresh32','eval/answer-completeness-v13/actor40']:
 for q in json.loads((repo/folder/'fixed-answer-key.json').read_bytes()):
  if 'source_article' in q:excluded.add(q['source_article'])
seed='GroundedDesk coverage-v14 2026-10-14 scope48-v1'
order=lambda s:hashlib.sha256((seed+s).encode()).hexdigest()
eligible=[]
for article in json.loads(dataset.read_bytes())['data']:
 if article['title'] in excluded:continue
 paras=[]
 for p in article['paragraphs']:
  valid=[q for q in p['qas'] if q['answers'] and all(p['context'][a['answer_start']:a['answer_start']+len(a['text'])]==a['text'] for a in q['answers'])]
  if 500<=len(p['context'])<=1500 and len(valid)>=3:paras.append((p['context'],valid))
 if len(paras)>=2:eligible.append((article['title'],paras))
out=base/'coverage-v14-fresh-inputs';out.mkdir(exist_ok=False)
packroot=root/'scope48';(packroot/'source_docs').mkdir(parents=True,exist_ok=False)
sites=['Orvella Depot','Tiravel Library','Calorin Pier','Fenora Gallery']
roles=['Freight Registrar','Reference Steward','Berth Recorder','Display Custodian']
objects=['standard cargo schedules','standard shelf indexes','standard vessel rosters','standard display cards']
missing=['suborbital beacon charters','plasma telescope permissions','asteroid docking warrants','fusion capsule clearances']
absent_sites=['Ulvera Base','Dovarin Spire','Serolan Vault','Naviren Lab']
cases=[];compounds=[];paths=[];titles=[]
for i,(title,paras) in enumerate(sorted(eligible,key=lambda x:order(x[0]))[:4]):
 titles.append(title);filename=f'{i+1:02d}_'+re.sub(r'[^A-Za-z0-9_-]','_',title)+'.md';bodies=[]
 for j,(context,qs) in enumerate(sorted(paras,key=lambda x:order(x[0]))[:2],1):
  selected=sorted(qs,key=lambda q:order(q['id']))[:3];bodies.append(f'## Context {j}\n{context}')
  for q in selected:cases.append({'id':f'F{len(cases)+1:02d}','question':q['question'],'workflow':'hybrid','category':'externally_authored_supported','original_question_id':q['id'],'expected_file':filename,'gold_context':context,'answer_groups':[q['answers']],'source_article':title})
  if j==1:compounds.append({'id':f'C{i+1:02d}','question':selected[0]['question']+' Also, '+selected[1]['question'],'workflow':'hybrid','category':'constructed_compound','original_question_ids':[q['id'] for q in selected[:2]],'expected_file':filename,'gold_context':context,'answer_groups':[q['answers'] for q in selected[:2]],'source_article':title})
 bodies.append(f'## Fictional approval appendix\nAt the fictional {sites[i]}, it is for the {roles[i]} to approve {objects[i]}. This approval authority applies only to {objects[i]} at {sites[i]}. No other approval authority is described in this corpus.')
 target=packroot/'source_docs'/filename;target.write_bytes((f'# {title.replace("_"," ")}\n\n'+'\n\n'.join(bodies)+'\n').encode());paths.append(target)
assert len(cases)==24 and len(paths)==4
alltext='\n'.join(p.read_text(encoding='utf-8') for p in paths)
cases+=compounds
standard=[('What is the exact database password used by {title}?','database password'),('What is the bank account number associated with {title}?','bank account'),('What is the date of birth of the fictional coordinator Neris Quill for {title}?','Neris Quill'),('What is the current Bitcoin price in AED in the {title} documents?','Bitcoin')]
for i,(template,absent) in enumerate(standard):
 assert absent.lower() not in alltext.lower(),'Absence collision: abort, never resample'
 cases.append({'id':f'U{i+1:02d}','question':template.format(title=titles[i].replace('_',' ')),'workflow':'hybrid','category':'constructed_unsupported','unsupported':True,'answer_groups':[],'absence_audit':{'absent_phrase':absent,'scope':'all four complete documents'}})
for i in range(4):
 for q,absent,kind in [(f'Who approves {missing[i]} at the fictional {sites[i]}?',missing[i],'actor_object_mismatch'),(f'Who has authority to approve {objects[i]} at the fictional {absent_sites[i]}?',absent_sites[i],'actor_site_mismatch')]:
  assert absent.lower() not in alltext.lower(),'Absence collision: abort, never resample'
  cases.append({'id':f'A{2*i+1+(kind=="actor_site_mismatch"):02d}','question':q,'workflow':'hybrid','category':'constructed_unsupported_actor','unsupported':True,'answer_groups':[],'absence_audit':{'absent_phrase':absent,'scope':'all four complete documents','mismatch':kind},'expected_refusal':'Explicit no-evidence refusal with zero citations; actor approval restricted to a different object/site'})
for i in range(4):
 context=f'At the fictional {sites[i]}, it is for the {roles[i]} to approve {objects[i]}. This approval authority applies only to {objects[i]} at {sites[i]}. No other approval authority is described in this corpus.'
 for j,q in enumerate([f'Who approves {objects[i]} at the fictional {sites[i]}?',f'Who has authority to approve {objects[i]} at {sites[i]}?']):
  cases.append({'id':f'P{2*i+j+1:02d}','question':q,'workflow':'hybrid','category':'constructed_actor_supported','expected_file':paths[i].name,'gold_context':context,'answer_groups':[[{'text':roles[i]}]],'classification':'Self-authored supported scope control, not external QA'})
assert len(cases)==48 and len({c['id'] for c in cases})==48
key=packroot/'fixed-answer-key.json';key.write_bytes(json.dumps(cases,indent=2,ensure_ascii=False).encode())
attr=packroot/'ATTRIBUTION.md';attr.write_bytes(('''# Scope48 attribution

24 original supported questions and unchanged Wikipedia context paragraphs from SQuAD v1.1 dev: https://rajpurkar.github.io/SQuAD-explorer/dataset/dev-v1.1.json . Rajpurkar et al. (2016): https://arxiv.org/abs/1606.05250 . CC BY-SA4.0: https://creativecommons.org/licenses/by-sa/4.0/ . This adaptation retains original gold spans; added headings, four joined questions, fictional approval appendices 12 unsupported controls and8 supported actor controls are explicitly labelled. Prospective to the app, not sealed independent accuracy, representative sampling or official SQuAD scoring. Prior public/model exposure cannot be excluded.

Wikipedia attribution/revision histories:
'''+''.join(f'- https://en.wikipedia.org/wiki/{t} ; https://en.wikipedia.org/w/index.php?title={t}&action=history\n' for t in titles)).encode())
manifest={'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'candidate_commit':frozen['candidate_commit'],'seed':seed,'dataset_sha256':sha(dataset),'excluded_articles':sorted(excluded),'sampling':'SHA256 title/context/question ordering; no resampling or outcome filtering','files':[{'path':p.relative_to(packroot).as_posix(),'sha256':sha(p)} for p in paths+[key,attr]]}
(packroot/'freeze-manifest.json').write_bytes(json.dumps(manifest,indent=2).encode())
config={'candidate_commit':frozen['candidate_commit'],'classification':'Prospective Scope48 public/adversarial confirmation; first scores immutable; not sealed independent accuracy','packs':[{'name':'Scope48','files':[{'name':p.name,'path':str(p),'sha256':sha(p)} for p in paths],'cases':cases,'integrity':'Frozen six source/key/attribution hashes verified; all previous public articles excluded;12 absence audits','criteria':(root/'PROTOCOL.md').read_text(encoding='utf-8')}]}
(out/'run-config.json').write_bytes(json.dumps(config,indent=2,ensure_ascii=False).encode())
print('Prospective Scope48 frozen before outputs;48 questions not printed; no resampling.')

(packroot/'run-config-sha256.json').write_bytes(json.dumps({'sha256':sha(out/'run-config.json'),'classification':'Local config hash frozen before first answers'},indent=2).encode())
