from pathlib import Path
import json, hashlib, datetime
repo=Path.cwd(); root=repo/'eval/v24-fresh-confirmation'; sources=root/'source_docs'
sources.mkdir(); assert not (root/'fixed-answer-key.json').exists()
paragraphs=[
 ['The Cedar Observatory relocation took place in 1874. Its restoration took place in 1926. A proposed closure in 1941 did not occur.',
  'Cedar Observatory winter average temperatures exceed 11 degrees Celsius. Its highest monthly mean temperature is 29 degrees Celsius in August. Its highest recorded daily temperature is 42 degrees Celsius.',
  'Mira catalogs seven plates per shift. Oren cleans four lenses per shift. Mira checks two clocks per shift.',
  'Cedar Observatory observation records are retained for 14 months, unless an investigation hold requires longer retention.'],
 ['The Harbor Cartography archive relocation took place in 1889. Its restoration took place in 1938. The archive did not close in 1952.',
  'Harbor Cartography archive winter average temperatures exceed 9 degrees Celsius. Its highest monthly mean temperature is 26 degrees Celsius in July. Its highest recorded daily temperature is 39 degrees Celsius.',
  'Orders released before 14:20 depart the same operating day. Orders released at or after 14:20 depart the next operating day, unless a customs hold prevents departure.',
  'Harbor Cartography shipping records are retained for 22 months, unless a customs investigation requires longer retention.'],
 ['The Juniper Workshop relocation took place in 1907. Its first restoration took place in 1946. Its second restoration took place in 1979. The proposed demolition in 1988 never occurred.',
  'Juniper Workshop winter average temperatures exceed 13 degrees Celsius. Its highest monthly mean temperature is 31 degrees Celsius in September. Its highest recorded daily temperature is 45 degrees Celsius.',
  'Lubricate the Juniper press every 72 operating hours. In a dusty bay, lubricate it every 36 operating hours. Inspect the press every 18 operating hours in either environment.',
  'Juniper Workshop maintenance records are retained for 17 months, unless a warranty dispute requires longer retention.'],
 ['The Willow Conservatory relocation took place in 1863. Its restoration took place in 1917. Its inventory took place in 1917. The canceled expansion in 1930 did not occur.',
  'Willow Conservatory winter average temperatures exceed 16 degrees Celsius. Its highest monthly mean temperature is 33 degrees Celsius in June. Its highest recorded daily temperature is 47 degrees Celsius.',
  'Purchases above 5300 credits require written approval from the Curator and Finance Manager. The purchase evidence packet contains a supplier quote, budget code, inspection checklist, and signed approval.',
  'Willow Conservatory purchase records are retained for 26 months, unless a contract dispute requires longer retention.']]
names=['01_Cedar_Observatory.txt','02_Harbor_Cartography.txt','03_Juniper_Workshop.txt','04_Willow_Conservatory.txt']
for name,pars in zip(names,paragraphs): (sources/name).write_bytes(('\n\n'.join(pars)+'\n').encode())
cases=[]
def add(q,doc,para,groups,category='supported',workflow='hybrid',other=None):
 expected=[{'filename':names[doc],'context':paragraphs[doc][para],'groups':[[g] for g in groups]}]
 if other:
  d,p,gs=other;expected.append({'filename':names[d],'context':paragraphs[d][p],'groups':[[g] for g in gs]})
 cases.append({'id':f'C{len(cases)+1:02}','question':q,'workflow':workflow,'category':category,'unsupported':False,'expected_documents':[e['filename'] for e in expected],'expected_sources':expected})
add('What year did the Cedar Observatory relocation take place?',0,0,['relocation took place in 1874'])
add('What year did the Cedar Observatory restoration take place?',0,0,['restoration took place in 1926'])
add('What is the Cedar Observatory highest monthly mean temperature?',0,1,['highest monthly mean temperature is 29 degrees Celsius in August'])
add('What does Cedar Observatory report about winter average temperatures?',0,1,['winter average temperatures exceed 11 degrees Celsius'])
add('How many plates does Mira catalog per shift?',0,2,['Mira catalogs seven plates per shift'])
add('What year did the Harbor Cartography archive relocation take place?',1,0,['relocation took place in 1889'])
add('What year did the Harbor Cartography archive restoration take place?',1,0,['restoration took place in 1938'])
add('What is the Harbor Cartography archive highest recorded daily temperature?',1,1,['highest recorded daily temperature is 39 degrees Celsius'])
add('When does an order released at 14:20 depart, and what exception applies?',1,2,['at or after 14:20 depart the next operating day','unless a customs hold prevents departure'])
add('How long are Harbor Cartography shipping records retained, and what exception applies?',1,3,['22 months','unless a customs investigation requires longer retention'])
add('What year did the Juniper Workshop relocation take place?',2,0,['relocation took place in 1907'])
add('What year did the first Juniper Workshop restoration take place?',2,0,['first restoration took place in 1946'])
add('What year did the second Juniper Workshop restoration take place?',2,0,['second restoration took place in 1979'])
add('What are the normal and dusty-bay lubrication intervals for the Juniper press, and does its inspection interval change?',2,2,['every 72 operating hours','every 36 operating hours','every 18 operating hours in either environment'])
add('What is the Juniper Workshop highest monthly mean temperature?',2,1,['highest monthly mean temperature is 31 degrees Celsius in September'])
add('What year did the Willow Conservatory relocation take place?',3,0,['relocation took place in 1863'])
add('What year did the Willow Conservatory inventory take place?',3,0,['inventory took place in 1917'])
add('What approvals are required for purchases above 5300 credits?',3,2,['written approval from the Curator and Finance Manager'])
add('What must the Willow Conservatory purchase evidence packet contain?',3,2,['supplier quote','budget code','inspection checklist','signed approval'])
add('What year did the Cedar Observatory relocation take place? Also, what year did the Harbor Cartography archive restoration take place?',0,0,['relocation took place in 1874'],category='compound',other=(1,0,['restoration took place in 1938']))
unsupported=[('What year did the Juniper Workshop restoration take place?','Ambiguous first and second restoration; require clarification or refusal, zero citations.'),('What year did the Cedar Observatory closure take place?','Closure explicitly did not occur; cannot assert a date.'),('What year did the Juniper Workshop demolition take place?','Demolition never occurred; cannot assert a date.'),('What is the absolute minimum winter temperature at Cedar Observatory?','Average lower bound cannot establish absolute minimum.'),('How many lenses does Mira clean per shift?','Oren cleans lenses; Mira tuple absent.'),('What is the Willow Conservatory bank account number?','No account number in any source.'),('What is the database password for Harbor Cartography?','No password in any source.'),('What is the highest monthly mean temperature at Pine Museum?','No Pine Museum document; other sites cannot supply its value.')]
for q,note in unsupported:cases.append({'id':f'C{len(cases)+1:02}','question':q,'workflow':'hybrid','category':'unsupported','unsupported':True,'expected_sources':[],'expected_documents':[],'scoring_notes':note})
for d in range(4):
 e=(d+1)%4
 duration=['14 months','22 months','17 months','26 months'];exceptions=['unless an investigation hold requires longer retention','unless a customs investigation requires longer retention','unless a warranty dispute requires longer retention','unless a contract dispute requires longer retention']
 add(f'Compare record retention periods and exceptions for {names[d][3:-4].replace("_"," ")} and {names[e][3:-4].replace("_"," ")}.',d,3,[duration[d],exceptions[d]],category='comparison',workflow='comparison',other=(e,3,[duration[e],exceptions[e]]))
assert len(cases)==32 and sum(c['workflow']=='comparison' for c in cases)==4
(root/'fixed-answer-key.json').write_bytes(json.dumps(cases,indent=2).encode())
old=json.loads((repo.parent.parent/'outputs/coverage-v24-inputs/run-config.json').read_bytes())
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
config={'candidate_commit':'unchanged v24 from 0d16a53e95b4f1494e88f2a932b3f3adfc797f4a','classification':'Prospective author-created Cedar32 confirmation; not independent third-party accuracy','total_questions':32,'module_identity':old['module_identity'],'packs':[{'name':'Cedar32','files':[{'name':n,'path':str((sources/n).resolve()),'sha256':sha(sources/n)} for n in names],'cases':cases,'integrity':'Four sources and fixed key frozen before first answer'}]}
(root/'run-config.json').write_bytes(json.dumps(config,indent=2).encode())
print('Prepared exactly 32 fixed cases; no answers observed. Freeze separately before execution.')
