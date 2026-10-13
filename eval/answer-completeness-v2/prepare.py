"""Freeze originals and a deterministic public SQuAD sample; never print QA text."""
from pathlib import Path
import hashlib, json, re, shutil, urllib.request, zipfile, datetime

repo=Path.cwd()
out=repo.parent.parent/'outputs'/'coverage-v2-inputs'
out.mkdir(exist_ok=False)
digest=lambda data: hashlib.sha256(data).hexdigest()
packs=[]
def save_pack(name,folder,files,cases,integrity,criteria=None):
    folder=Path(folder)
    pack={'name':name,'folder':str(folder),'files':[{'name':f.name,'path':str(f),'sha256':digest(f.read_bytes())} for f in files],
          'cases':cases,'integrity':integrity,'criteria':criteria}
    packs.append(pack)

for name,zipname,root in [('Lantern32','Lantern32-r22-FROZEN-firstlook.zip','LANTERN32_firstlook'),('Aster32','Aster32-r25-FROZEN-firstlook.zip','ASTER32_firstlook')]:
    dest=out/name;dest.mkdir()
    with zipfile.ZipFile(Path('C:/Users/arjun/Downloads')/zipname) as z:
        manifest=json.loads(z.read(root+'/freeze-manifest.json'))
        for file,expected in manifest['sha256_files'].items():
            data=z.read(root+'/'+file);assert digest(data)==expected,file
            target=dest/file;target.parent.mkdir(exist_ok=True);target.write_bytes(data)
        (dest/'freeze-manifest.json').write_bytes(z.read(root+'/freeze-manifest.json'))
    key=json.loads((dest/'frozen-answer-key.json').read_bytes())
    save_pack(name,dest,sorted((dest/'source_docs').glob('*.txt')),key['cases'],'All six original ZIP manifest hashes verified',(dest/'FROZEN_RUBRIC.md').read_text(encoding='utf-8'))

meridian=repo.parent.parent/'outputs/r18-independent'
mf=json.loads((meridian/'freeze-manifest.json').read_bytes())
for name,expected in mf['files'].items():assert digest((meridian/name).read_bytes())==expected,name
key=json.loads((meridian/'fixed-answer-key.json').read_bytes())
save_pack('Meridian24',meridian,sorted(meridian.glob('0*.txt')),key['cases'],'All four original manifest hashes verified',key['criteria'])

cobalt=repo/'docs/evidence/r29/cobalt16'
mf=json.loads((cobalt/'freeze-manifest.json').read_bytes())
for f in mf['files']:assert digest((cobalt/f['path']).read_bytes())==f['sha256'],f['path']
save_pack('Cobalt16',cobalt,sorted((cobalt/'source_docs').glob('*.txt')),json.loads((cobalt/'fixed-answer-key.json').read_bytes()),'All original manifest hashes verified',(cobalt/'FROZEN_RUBRIC.md').read_text(encoding='utf-8'))

atlas=Path('C:/Users/arjun/Downloads/GroundedDesk_Atlas_3_Test_PDFs')
atlasfiles=sorted(atlas.glob('0*.pdf'));assert len(atlasfiles)==3
names={k:f.name for k,f in zip(['g','i','v'],atlasfiles)}
test=(repo/'tests/atlas15-accuracy.test.mjs').read_text(encoding='utf-8')
qs={m[0]:m[1] for m in re.findall(r'\["([DCN]\d{2})","([^"]+)"',test)}
assert len(qs)==15
facts=[['AI Release Council','Security Officer','written'],['model card','risk register','test results log','data-flow diagram','rollback plan'],['95'],['15 minutes'],['Incident Commander','30 minutes'],['90 days','legal hold'],['61','100'],['Legal Counsel','Security Officer','written'],['30 minutes','two hours'],['90 days','30 days','legal hold','preservation'],['quarterly','red-team'],['structural','does not','factual'],[],[],[]]
filegroups=[['g'],['g'],['g'],['i'],['i'],['i'],['v'],['v'],['i','v'],['i','v'],['g','v'],['g','v'],[],[],[]]
cases=[{'id':id,'question':q,'workflow':'comparison' if id.startswith('C') else 'hybrid','expected_files':[names[k] for k in filegroups[i]],'required_facts':facts[i],'unsupported':id.startswith('N')} for i,(id,q) in enumerate(qs.items())]
save_pack('Atlas15',atlas,atlasfiles,cases,'Current original-PDF SHA-256 recorded; no original historical manifest supplied. Questions are unchanged strings in tests/atlas15-accuracy.test.mjs; evidence concepts match user-provided original key.','User-provided original 15 key: complete supported facts, relevant literal citations, explicit zero-citation unsupported refusals. Exceptions retained. Semantic equivalents permitted.')

rq=repo/'eval/retrieval-quality';mf=json.loads((rq/'freeze-manifest.json').read_bytes())
for f in mf['files']:assert digest((rq/f['path']).read_bytes())==f['sha256']
save_pack('RetrievalQuality28',rq,sorted((rq/'source_docs').glob('*.md')),json.loads((rq/'fixed-cases.json').read_bytes()),'All original frozen hashes verified','Unchanged exact-sentence development rubric')

url='https://rajpurkar.github.io/SQuAD-explorer/dataset/dev-v1.1.json'
data=urllib.request.urlopen(url,timeout=60).read()
(out/'squad-dev-v1.1.json').write_bytes(data)
dataset=json.loads(data)
seed='GroundedDesk coverage-v2 2026-10-13 external24-v1'
sortkey=lambda s:digest((seed+s).encode('utf-8'))
eligible=[]
for article in dataset['data']:
    paras=[]
    for p in article['paragraphs']:
        valid=[qa for qa in p['qas'] if qa['answers'] and all(p['context'][a['answer_start']:a['answer_start']+len(a['text'])]==a['text'] for a in qa['answers'])]
        if 500<=len(p['context'])<=1500 and len(valid)>=3:paras.append((p['context'],valid))
    if len(paras)>=2:eligible.append((article['title'],paras))
selected=sorted(eligible,key=lambda a:sortkey(a[0]))[:4]
external=repo/'eval/answer-completeness-v2/external24';(external/'source_docs').mkdir(parents=True,exist_ok=False)
cases=[];sources=[]
for i,(title,paras) in enumerate(selected,1):
    filename=f'{i:02d}_'+re.sub(r'[^A-Za-z0-9_-]','_',title)+'.md'
    chunks=[]
    for j,(context,qas) in enumerate(sorted(paras,key=lambda p:sortkey(p[0]))[:2],1):
        chunks.append(f'## Context {j}\n{context}')
        for qa in sorted(qas,key=lambda q:sortkey(q['id']))[:3]:
            cases.append({'id':f'E{len(cases)+1:02d}','original_question_id':qa['id'],'question':qa['question'],'workflow':'hybrid','expected_file':filename,'gold_context':context,'answers':qa['answers'],'source_article':title,'context_number':j})
    f=external/'source_docs'/filename;f.write_bytes((f'# {title.replace("_"," ")}\n\n'+'\n\n'.join(chunks)+'\n').encode('utf-8'));sources.append(f)
assert len(cases)==24
(external/'fixed-answer-key.json').write_bytes(json.dumps(cases,indent=2,ensure_ascii=False).encode('utf-8'))
attribution='''# Public SQuAD24 adaptation — attribution and limitations

Original source: Stanford Question Answering Dataset v1.1 dev set, https://rajpurkar.github.io/SQuAD-explorer/dataset/dev-v1.1.json
Project: https://rajpurkar.github.io/SQuAD-explorer/ ; Rajpurkar, Zhang, Lopyrev and Liang (2016), SQuAD: 100,000+ Questions for Machine Comprehension of Text, https://arxiv.org/abs/1606.05250 .
Original crowdsourced questions, annotated answer spans and Wikipedia context paragraphs are redistributed under CC BY-SA 4.0: https://creativecommons.org/licenses/by-sa/4.0/ . The derivative sample is offered under the same license. Article titles and dataset question IDs are in the fixed key; source bodies are unchanged. Added document titles/Context headings are adapter formatting only.

Public externally authored prospective confirmation, not a sealed independent benchmark or official SQuAD EM/F1 score. Four deterministic articles, two paragraphs each, three original supported questions each. No unsupported or Comparison cases. The candidate was committed before the sample was generated or its question strings read. Existing public-data/model training exposure cannot be excluded. Future reruns are in-sample.
'''
(external/'ATTRIBUTION.md').write_bytes(attribution.encode())
files=sources+[external/'fixed-answer-key.json',external/'ATTRIBUTION.md']
freeze={'frozen_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'candidate_commit':'e314894','dataset_url':url,'dataset_sha256':digest(data),'seed':seed,'sampling':'SHA-256 ordering of titles, context strings and question IDs as predeclared; no content-based difficulty resampling','files':[{'path':f.relative_to(external).as_posix(),'sha256':digest(f.read_bytes())} for f in files]}
(external/'freeze-manifest.json').write_bytes(json.dumps(freeze,indent=2).encode())
save_pack('ExternalSQuAD24',external,sources,cases,'Frozen sampled external dataset and all six file hashes verified','Pre-frozen gold-span plus exact gold-context relevance criterion; not official EM/F1')
config={'candidate_commit':'e314894','packs':packs,'total_questions':sum(len(p['cases']) for p in packs)}
(out/'run-config.json').write_bytes(json.dumps(config,indent=2,ensure_ascii=False).encode('utf-8'))
with (repo/'.gitattributes').open('a',encoding='utf-8') as f:f.write('\neval/answer-completeness-v2/external24/** -text\n')
print('Frozen 119 original controls + 28 known development + 24 external supported questions; no question text printed.')
print('Config:',out/'run-config.json')
