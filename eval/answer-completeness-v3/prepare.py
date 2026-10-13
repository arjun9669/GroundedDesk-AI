"""Generate fresh frozen sample without printing its question/answer strings."""
from pathlib import Path
import json, hashlib, datetime, re, subprocess
repo=Path.cwd()
outputs=repo.parent.parent/'outputs'
out=outputs/'coverage-v3-inputs';out.mkdir(exist_ok=False)
digest=lambda b:hashlib.sha256(b).hexdigest()
candidate=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
config=json.loads((outputs/'coverage-v2-inputs/run-config.json').read_bytes())
for pack in config['packs']:
    for f in pack['files']:assert digest(Path(f['path']).read_bytes())==f['sha256']
dataset_path=outputs/'coverage-v2-inputs/squad-dev-v1.1.json'
raw=dataset_path.read_bytes()
old_manifest=json.loads((repo/'eval/answer-completeness-v2/external24/freeze-manifest.json').read_bytes())
assert digest(raw)==old_manifest['dataset_sha256']
old_cases=json.loads((repo/'eval/answer-completeness-v2/external24/fixed-answer-key.json').read_bytes())
excluded={c['source_article'] for c in old_cases}
seed='GroundedDesk coverage-v3 2026-10-13 external32-v1'
order=lambda s:digest((seed+s).encode())
eligible=[]
for article in json.loads(raw)['data']:
    if article['title'] in excluded:continue
    paras=[]
    for p in article['paragraphs']:
        valid=[q for q in p['qas'] if q['answers'] and all(p['context'][a['answer_start']:a['answer_start']+len(a['text'])]==a['text'] for a in q['answers'])]
        if 500<=len(p['context'])<=1500 and len(valid)>=3:paras.append((p['context'],valid))
    if len(paras)>=2:eligible.append((article['title'],paras))
external=repo/'eval/answer-completeness-v3/fresh32';(external/'source_docs').mkdir(parents=True,exist_ok=False)
cases=[];files=[];compounds=[]
for i,(title,paras) in enumerate(sorted(eligible,key=lambda x:order(x[0]))[:4],1):
    filename=f'{i:02d}_'+re.sub(r'[^A-Za-z0-9_-]','_',title)+'.md'
    bodies=[]
    for j,(context,qs) in enumerate(sorted(paras,key=lambda x:order(x[0]))[:2],1):
        selected=sorted(qs,key=lambda q:order(q['id']))[:3]
        bodies.append(f'## Context {j}\n{context}')
        for q in selected:
            cases.append({'id':f'F{len(cases)+1:02d}','question':q['question'],'workflow':'hybrid','category':'externally_authored_supported','original_question_id':q['id'],'expected_file':filename,'gold_context':context,'answer_groups':[q['answers']],'source_article':title})
        if j==1:
            compounds.append({'id':f'C{i:02d}','question':selected[0]['question']+' Also, '+selected[1]['question'],'workflow':'hybrid','category':'constructed_compound','original_question_ids':[q['id'] for q in selected[:2]],'expected_file':filename,'gold_context':context,'answer_groups':[q['answers'] for q in selected[:2]],'source_article':title})
    target=external/'source_docs'/filename
    target.write_bytes((f'# {title.replace("_"," ")}\n\n'+'\n\n'.join(bodies)+'\n').encode())
    files.append(target)
cases+=compounds
queries=['What is the exact database password used by {title}?','What is the bank account number associated with {title}?','What is the date of birth of the fictional coordinator Neris Quill for {title}?','What is the current Bitcoin price in AED in the {title} documents?']
bodies='\n'.join(f.read_text() for f in files)
for i,(q,f) in enumerate(zip(queries,files),1):
    title=f.stem[3:].replace('_',' ')
    audit=['database password','bank account','Neris Quill','Bitcoin'][i-1]
    assert audit.lower() not in bodies.lower(),audit
    cases.append({'id':f'U{i:02d}','question':q.format(title=title),'workflow':'hybrid','category':'constructed_unsupported','unsupported':True,'answer_groups':[],'absence_audit':{'absent_phrase':audit,'scope':'all four complete source documents'}})
assert len(cases)==32
key=external/'fixed-answer-key.json';key.write_bytes(json.dumps(cases,indent=2,ensure_ascii=False).encode())
attr=external/'ATTRIBUTION.md'
attr.write_bytes(('''# FreshMixed32 attribution

24 original supported questions and unchanged Wikipedia context paragraphs from SQuAD v1.1 dev: https://rajpurkar.github.io/SQuAD-explorer/dataset/dev-v1.1.json . Rajpurkar, Zhang, Lopyrev and Liang (2016): https://arxiv.org/abs/1606.05250 . Project: https://rajpurkar.github.io/SQuAD-explorer/ . CC BY-SA 4.0: https://creativecommons.org/licenses/by-sa/4.0/ . This adapted sample is under the same license. Added titles/context headings; four joined two-question controls and four newly authored unsupported controls are identified in the key. Original gold spans retained. Public prospective confirmation, not sealed independent accuracy or official SQuAD EM/F1; prior public model exposure cannot be excluded.

Wikipedia source articles and revision histories:
'''+''.join(f'- https://en.wikipedia.org/wiki/{c["source_article"]} ; https://en.wikipedia.org/w/index.php?title={c["source_article"]}&action=history\n' for c in compounds)).encode())
manifest={'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'candidate_commit':candidate,'seed':seed,'excluded_articles':sorted(excluded),'dataset_sha256':digest(raw),'sampling':'Protocol SHA-256 title/context/question ordering; no resampling','files':[{'path':f.relative_to(external).as_posix(),'sha256':digest(f.read_bytes())} for f in files+[key,attr]]}
(external/'freeze-manifest.json').write_bytes(json.dumps(manifest,indent=2).encode())
config['packs'].append({'name':'FreshMixed32','files':[{'name':f.name,'path':str(f),'sha256':digest(f.read_bytes())} for f in files],'cases':cases,'integrity':'All six frozen sample hashes verified; old articles excluded; unsupported source-absence audit frozen','criteria':(repo/'eval/answer-completeness-v3/PROTOCOL.md').read_text()})
config['candidate_commit']=candidate
(out/'run-config.json').write_bytes(json.dumps(config,indent=2,ensure_ascii=False).encode())
protocol=repo/'eval/answer-completeness-v3/PROTOCOL.md'
(repo/'eval/answer-completeness-v3/freeze-manifest.json').write_bytes(json.dumps({'protocol_sha256':digest(protocol.read_bytes()),'candidate_commit':candidate,'fresh_manifest_sha256':digest((external/'freeze-manifest.json').read_bytes())},indent=2).encode())
print('Frozen all previous 171 cases and fresh 32, without printing new questions or gold answers.')
