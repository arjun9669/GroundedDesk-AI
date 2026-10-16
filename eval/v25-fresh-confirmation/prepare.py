from pathlib import Path
import json,hashlib
r=Path.cwd();root=r/'eval/v25-fresh-confirmation';sources=root/'source_docs';sources.mkdir();assert not (root/'fixed-answer-key.json').exists()
names=['01_Rillpoint_Lightstation.txt','02_Tavren_Ceramics.txt','03_Rossell_Seed_Library.txt','04_Lenwick_Canal_Transit.txt']
paragraphs=[[
'Rillpoint Lightstation transferred to North Spit in 1859. Its first restoration was completed in 1913. A second restoration was completed in 1962. The proposed demolition in 1987 was canceled and never took place.',
'Winter monthly means at Rillpoint Lightstation range from 6 to 9 degrees Celsius. Its highest monthly mean temperature is 23 degrees Celsius in August. Its highest recorded daily temperature is 34 degrees Celsius.',
'Edda binds nine charts per week. Soren checks three beacons per night. Edda washes two lanterns per week.',
'Rillpoint Lightstation observation journals are retained for 11 years, unless a heritage inquiry requires longer retention.'
],[
'The Tavren Ceramics kiln was commissioned in 1978. Its rebuild took place in 2009. The planned transfer in 2020 did not occur.',
'Tavren Ceramics storage room winter average temperature is 12 degrees Celsius. Its absolute minimum winter temperature is 3 degrees Celsius. Its highest monthly mean temperature is 24 degrees Celsius in July.',
'Lubricate the Tavren Ceramics press after every 84 operating hours in a clean bay. In a dusty bay, use a 42-hour lubrication interval. Inspection remains every 21 operating hours in both bays.',
'Purchases above 6500 credits at Tavren Ceramics need written approval from the Finance Steward and Workshop Lead. The purchasing packet contains a supplier quotation, inspection report, purchase order, and budget code.',
'Tavren Ceramics maintenance records are retained for 4 years, unless an unresolved warranty claim requires longer retention.'
],[
'Rossell Seed Library opened its public desk in 1996. Its warehouse relocation took place in 2011. An opening ceremony for a separate annex occurred in 2018.',
'Nalin sorts six seed trays per day. Vera labels four seed packets per day. Nalin labels two storage boxes per day.',
'Requests released before 11:45 are shipped the same working day. At or after 11:45, departure is the next working day, unless a seed inspection hold is still active.',
'Rossell Seed Library winter average temperatures range from 8 to 10 degrees Celsius. The winter log contains monthly averages rather than individual extreme readings.',
'Rossell Seed Library accession records are retained for 7 years, unless a quarantine investigation requires longer retention.'
],[
'Lenwick Canal Transit relocated in 1882. The depot renovation occurred in 1931. Another depot renovation occurred in 1974. A proposed tunnel closure in 1999 was rejected; the tunnel did not close.',
'Lenwick Canal Transit winter average temperatures exceed 4 degrees Celsius. Its highest recorded daily temperature is 36 degrees Celsius. Its highest monthly mean temperature is 22 degrees Celsius.',
'Pavel inspects eight lock gates per shift. Rena greases three winches per shift. Pavel greases one hinge per shift.',
'The Lenwick Canal Transit departure packet must contain a route card, tide forecast, cargo manifest, and release authorization.',
'Lenwick Canal Transit voyage logs are retained for 3 years, unless a navigation inquiry requires longer retention.'
]]
for n,pars in zip(names,paragraphs):(sources/n).write_bytes(('\n\n'.join(pars)+'\n').encode())
cases=[]
def add(q,d,p,groups,category='supported',workflow='hybrid',other=None):
 expected=[{'filename':names[d],'context':paragraphs[d][p],'groups':[[g] for g in groups]}]
 if other:
  e,j,gs=other;expected.append({'filename':names[e],'context':paragraphs[e][j],'groups':[[g] for g in gs]})
 cases.append({'id':f'B{len(cases)+1:02}','question':q,'workflow':workflow,'category':category,'unsupported':False,'expected_documents':[x['filename'] for x in expected],'expected_sources':expected})
add('In which year did Rillpoint Lightstation move to North Spit?',0,0,['transferred to North Spit in 1859'])
add('What year did the first Rillpoint Lightstation restoration take place?',0,0,['first restoration was completed in 1913'])
add('What is the Rillpoint Lightstation highest monthly mean temperature?',0,1,['highest monthly mean temperature is 23 degrees Celsius in August'])
add('How many charts does Edda bind per week?',0,2,['Edda binds nine charts per week'])
add('What is the normal retention period for Rillpoint observation journals, and which exception overrides it?',0,3,['11 years','unless a heritage inquiry requires longer retention'])
add('Which year was the Tavren Ceramics kiln commissioned?',1,0,['kiln was commissioned in 1978'])
add('In the Tavren Ceramics store, what is the lowest recorded winter temperature?',1,1,['absolute minimum winter temperature is 3 degrees Celsius'])
add('How often does the Tavren Ceramics press need lubrication in clean and dusty bays, and does inspection frequency change?',1,2,['every 84 operating hours in a clean bay','42-hour lubrication interval','every 21 operating hours in both bays'])
add('Whose written permission is needed for a Tavren Ceramics purchase above 6500 credits?',1,3,['written approval from the Finance Steward and Workshop Lead'])
add('List everything that belongs in the Tavren Ceramics purchasing packet.',1,3,['supplier quotation','inspection report','purchase order','budget code'])
add('Which year was the Rossell Seed Library public desk opened?',2,0,['opened its public desk in 1996'])
add('What year did the Rossell Seed Library relocation take place?',2,0,['warehouse relocation took place in 2011'])
add('How many seed trays are sorted daily by Nalin?',2,1,['Nalin sorts six seed trays per day'])
add('For a Rossell request released exactly at 11:45, which working day is departure, and what hold can prevent it?',2,2,['At or after 11:45, departure is the next working day','unless a seed inspection hold is still active'])
add('How long are Rossell accession records kept normally, and when must they be kept longer?',2,4,['7 years','unless a quarantine investigation requires longer retention'])
add('In what year did Lenwick Canal Transit move?',3,0,['Lenwick Canal Transit relocated in 1882'])
add('What is the Lenwick Canal Transit highest recorded daily temperature?',3,1,['highest recorded daily temperature is 36 degrees Celsius'])
add('How many lock gates does Pavel inspect per shift?',3,2,['Pavel inspects eight lock gates per shift'])
add('What four items must accompany a Lenwick Canal Transit departure?',3,3,['route card','tide forecast','cargo manifest','release authorization'])
add('In which year did Rillpoint Lightstation move to North Spit? Also, in which year was the Tavren Ceramics kiln commissioned?',0,0,['transferred to North Spit in 1859'],category='compound',other=(1,0,['kiln was commissioned in 1978']))
unsupported=[
('When was Rillpoint Lightstation restored?','Two completed restorations,1913 and1962; require clarification or explicit refusal with zero citations.'),
('What year did the Rillpoint Lightstation demolition take place?','Proposed demolition was canceled and never took place; no affirmative event date.'),
('Which year did the planned Tavren Ceramics transfer happen?','Planned transfer did not occur; no affirmative transfer date.'),
('What was the coldest individual winter reading at Rillpoint Lightstation?','Winter monthly means do not determine the minimum individual reading.'),
('What is the absolute minimum winter temperature at Rossell Seed Library?','Only winter averages are recorded; no absolute minimum.'),
('What year did the Lenwick Canal Transit renovation take place?','Two distinct depot renovations1931 and1974; require clarification/refusal with zero citations.'),
('How many seed packets does Nalin label per day?','Vera labels seed packets; Nalin labels storage boxes. Requested actor/action/object tuple absent.'),
('How hot does the Stoneford Depot get during its hottest month?','Stoneford Depot absent from all sources; other sites cannot supply its statistic.')]
for q,note in unsupported:cases.append({'id':f'B{len(cases)+1:02}','question':q,'workflow':'hybrid','category':'unsupported','unsupported':True,'expected_documents':[],'expected_sources':[],'scoring_notes':note})
comparisons=[
('Compare journal and maintenance record retention, including hold exceptions, at Rillpoint Lightstation and Tavren Ceramics.',0,1),
('How do the retention periods and exceptions differ for Tavren Ceramics and Rossell Seed Library?',1,2),
('Contrast how long Rossell Seed Library and Lenwick Canal Transit keep records and what requires keeping them longer.',2,3),
('Compare retention durations and overrides at Lenwick Canal Transit and Rillpoint Lightstation.',3,0)]
ps=[3,4,4,4];durations=['11 years','4 years','7 years','3 years'];exceptions=['unless a heritage inquiry requires longer retention','unless an unresolved warranty claim requires longer retention','unless a quarantine investigation requires longer retention','unless a navigation inquiry requires longer retention']
for q,d,e in comparisons:add(q,d,ps[d],[durations[d],exceptions[d]],category='comparison',workflow='comparison',other=(e,ps[e],[durations[e],exceptions[e]]))
assert len(cases)==32 and sum(x['workflow']=='comparison' for x in cases)==4
assert all('Stoneford Depot' not in p for pars in paragraphs for p in pars)
(root/'fixed-answer-key.json').write_bytes(json.dumps(cases,indent=2).encode())
old=json.loads((r.parent.parent/'outputs/coverage-v25-inputs/run-config.json').read_bytes());sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
config={'candidate_commit':'unchanged v25 from 9b0dfc62bcf6bd996939939c4e81865d705f54b1','classification':'Bracken32 prospective author-created confirmation of unchanged v25; not external independent accuracy','total_questions':32,'module_identity':old['module_identity'],'packs':[{'name':'Bracken32','files':[{'name':n,'path':str((sources/n).resolve()),'sha256':sha(sources/n)} for n in names],'cases':cases,'integrity':'Four new fictional sources and32 fixed questions/key frozen before first answers'}]}
(root/'run-config.json').write_bytes(json.dumps(config,indent=2).encode());print('Prepared32 cases:28 Hybrid and4 lexical Comparison; no answers observed.')
