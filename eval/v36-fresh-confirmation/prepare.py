from pathlib import Path
import json,hashlib
r=Path.cwd();root=r/'eval/v36-fresh-confirmation';sources=root/'source_docs';sources.mkdir()
names=['01_Liraven_Planetarium.txt','02_Osvik_Puppet_Theatre.txt','03_Tavren_Ferry_Workshop.txt','04_Yalara_Grain_Exchange.txt']
blocks=[[
'Liraven Planetarium began public dome shows in 1967. The first projector lens renewal was completed in 1992; the second projector lens renewal was completed in 2015.',
'D-01. Dispatch requests cleared before 16:20 leave on the current service day. At 16:20 or later, departure is the next service day, unless an optical-safety hold is open.',
'D-02. Eris checks five projector filters per morning. Nalo checks three door hinges per morning. Eris labels two transport cases per week.',
'D-03. Winter monthly mean temperatures in the dome store range from 5 to 7 degrees Celsius. Individual winter extremes are not recorded.',
'D-04. Keep movement slips for 19 months. While an export-review hold is open, retain the affected slips until the hold is released.',
'D-05. Acknowledge dome-booking requests within two business days. An acknowledgement is not a guarantee that seats remain available.'
],[
'The Osvik Puppet Theatre rehearsal room moved in 1939. Its restoration was completed in 1986. A plan to close the prop annex in 2017 was rejected; the annex remains open.',
'T-01. The winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 27 degrees Celsius in September.',
'T-02. Signed touring records are retained for 5 years. An unresolved ownership claim extends retention of the affected records until the claim is settled.',
'T-03. The touring packet must contain:\n- a puppet inventory\n- a condition sheet\n- a transport permit\n- a return record',
'T-04. The stage clock was replaced in 2023.'
],[
'At Tavren Ferry Workshop, the cable tower was rebuilt in 1994. The ramp shelter was repainted in 2012.',
'The highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August. Its highest recorded daily temperature is 38 degrees Celsius.',
'Varen records seven cable-tension readings per shift. Tesi records five ramp tests per shift. Varen tags two lifting hooks per month.',
'The Tavren Ferry Workshop loading winch needs lubrication every 90 operating hours under normal conditions. In a salt-spray shelter, lubricate it every 45 operating hours. Inspect the loading winch every 15 operating hours regardless of shelter.'
],[
'GX-01. A loading request at Yalara Grain Exchange is acknowledged within six working hours. This acknowledgement does not guarantee a loading slot.',
'GX-02. The dispatch packet includes a weighing slip, batch register, moisture checklist, loading permit, and release receipt.',
'GX-03. Purchases exceeding 7400 credits require written approval from the Budget Steward and Exchange Supervisor.',
'GX-04. Completed loading records are kept for 8 months, unless an unresolved weighing dispute requires longer retention.',
'Grease the Yalara Grain Exchange conveyor every 132 service hours under normal conditions. In a dust-heavy bay, grease it every 66 service hours. Inspect the conveyor every 33 service hours in either bay.'
]]
texts=[blocks[0][0]+'\n\n## Dome dispatch and visitors\n'+'\n'.join(blocks[0][1:])+'\n',blocks[1][0]+'\n\n## Prop store and touring\n'+'\n'.join(blocks[1][1:])+'\n','## Workshop operating notes\n'+'\n\n'.join(blocks[2][:-1])+'\n\n'+blocks[2][-1]+' The office cabinet was painted in 2021.\n','## Exchange working rules\n'+'\n'.join(blocks[3][:-1])+'\n\nThe office bell was installed in 1980. '+blocks[3][-1]+'\n']
for n,t in zip(names,texts):(sources/n).write_bytes(t.encode('utf-8'))
cases=[]
def add(q,d,p,groups,category='supported',workflow='hybrid',other=None):
 es=[{'filename':names[d],'context':blocks[d][p],'groups':[[g] for g in groups]}]
 if other:
  e,j,gs=other;es.append({'filename':names[e],'context':blocks[e][j],'groups':[[g] for g in gs]})
 cases.append({'id':f'P{len(cases)+1:02}','question':q,'workflow':workflow,'category':category,'unsupported':False,'expected_documents':[e['filename'] for e in es],'expected_sources':es})
add('In what year did public dome shows begin at Liraven Planetarium?',0,0,['began public dome shows in 1967'])
add('What year was the second projector lens renewal at Liraven Planetarium completed?',0,0,['second projector lens renewal was completed in 2015'])
add('Who must approve in writing a Yalara Grain Exchange purchase above 7400 credits?',3,2,['written approval from the Budget Steward and Exchange Supervisor'])
add('A Liraven Planetarium dispatch request is cleared exactly at 16:20. When does it leave, and what hold can prevent departure?',0,1,['At 16:20 or later, departure is the next service day','unless an optical-safety hold is open'])
add('How many projector filters does Eris check per morning?',0,2,['Eris checks five projector filters per morning'])
add('When was the Osvik Puppet Theatre rehearsal room restoration completed?',1,0,['Its restoration was completed in 1986'])
add('How long are Osvik Puppet Theatre signed touring records kept, including the exception for an unresolved ownership claim?',1,2,['5 years','An unresolved ownership claim extends retention of the affected records until the claim is settled'])
add('What is the absolute minimum winter temperature in the Osvik Puppet Theatre prop store?',1,1,['absolute minimum winter temperature is 1 degree Celsius'])
add('Give the highest monthly mean temperature in the Osvik Puppet Theatre prop store and the month it occurs.',1,1,['highest monthly mean temperature is 27 degrees Celsius in September'])
add('Which documents belong in the Osvik Puppet Theatre touring packet?',1,3,['puppet inventory','condition sheet','transport permit','return record'])
add('When was the Tavren Ferry Workshop cable tower rebuilt?',2,0,['cable tower was rebuilt in 1994'])
add('What is the highest recorded daily temperature at Tavren Ferry Workshop?',2,1,['highest recorded daily temperature is 38 degrees Celsius'])
add('How many cable-tension readings does Varen record per shift?',2,2,['Varen records seven cable-tension readings per shift'])
add('Give the Tavren Ferry Workshop loading winch lubrication intervals under normal and salt-spray conditions, together with its inspection interval.',2,3,['90 operating hours under normal conditions','In a salt-spray shelter, lubricate it every 45 operating hours','Inspect the loading winch every 15 operating hours regardless of shelter'])
add('How soon is a Yalara Grain Exchange loading request acknowledged, and does acknowledgement guarantee a loading slot?',3,0,['within six working hours','does not guarantee a loading slot'])
add('List every item in the Yalara Grain Exchange dispatch packet.',3,1,['weighing slip','batch register','moisture checklist','loading permit','release receipt'])
add('How long are Yalara Grain Exchange completed loading records kept, and what dispute can extend that time?',3,3,['8 months','unless an unresolved weighing dispute requires longer retention'])
add('What is the winter average temperature in the Osvik Puppet Theatre prop store?',1,1,['winter average temperature in the Osvik Puppet Theatre prop store is 11 degrees Celsius'])
add('Which month has the highest monthly mean temperature at Tavren Ferry Workshop, and what is that mean?',2,1,['highest monthly mean temperature at Tavren Ferry Workshop is 24 degrees Celsius in August'])
add('In what year did public dome shows begin at Liraven Planetarium? Also, when was the Osvik Puppet Theatre rehearsal room restoration completed?',0,0,['began public dome shows in 1967'],category='compound',other=(1,0,['Its restoration was completed in 1986']))
unsupported=[('When was the Liraven Planetarium projector lens renewed?','Two completed lens renewals1992 and2015; strict uncited refusal or ambiguity clarification required.'),('What year did the Osvik Puppet Theatre prop annex close?','Rejected2017 plan; no completed closure date. Literal negative evidence still fails strict uncited refusal criterion.'),('When was the Tavren Ferry Workshop ramp shelter rebuilt?','Cable tower rebuilt1994, ramp shelter repainted2012; no ramp-shelter rebuild date.'),('How many door hinges does Eris check per morning?','Nalo checks hinges; Eris checks projector filters and labels cases. Requested actor/action/object absent.'),('What is the bank account number of Yalara Grain Exchange?','No bank account number provided.'),('What exact torque in newton-metres is specified for Tavren Ferry Workshop winch bolts?','No winch-bolt torque specification.'),('What is the absolute minimum winter temperature in the Liraven Planetarium dome store?','Only monthly means5–7 provided, not an absolute minimum; do not borrow theatre statistic.'),('What is the highest monthly mean temperature at Neskar Mirror Depot?','Entity absent from every source.')]
for q,note in unsupported:cases.append({'id':f'P{len(cases)+1:02}','question':q,'workflow':'hybrid','category':'unsupported','unsupported':True,'expected_documents':[],'expected_sources':[],'scoring_notes':note})
add('Compare movement-slip retention at Liraven Planetarium and signed-touring-record retention at Osvik Puppet Theatre, including both hold and claim exceptions.',0,4,['19 months','While an export-review hold is open, retain the affected slips until the hold is released'],category='comparison',workflow='comparison',other=(1,2,['5 years','An unresolved ownership claim extends retention of the affected records until the claim is settled']))
add('Compare normal and exception lubrication or greasing plus inspection intervals for the Tavren Ferry Workshop salt-spray loading winch and Yalara Grain Exchange dust-heavy conveyor.',2,3,['90 operating hours under normal conditions','In a salt-spray shelter, lubricate it every 45 operating hours','Inspect the loading winch every 15 operating hours regardless of shelter'],category='comparison',workflow='comparison',other=(3,4,['132 service hours under normal conditions','In a dust-heavy bay, grease it every 66 service hours','Inspect the conveyor every 33 service hours in either bay']))
add('Compare acknowledgement deadlines and their limits for Liraven Planetarium dome-booking requests and Yalara Grain Exchange loading requests.',0,5,['within two business days','not a guarantee that seats remain available'],category='comparison',workflow='comparison',other=(3,0,['within six working hours','does not guarantee a loading slot']))
add('Compare all contents of the Osvik Puppet Theatre touring packet and Yalara Grain Exchange dispatch packet.',1,3,['puppet inventory','condition sheet','transport permit','return record'],category='comparison',workflow='comparison',other=(3,1,['weighing slip','batch register','moisture checklist','loading permit','release receipt']))
assert len(cases)==32 and sum(c['unsupported'] for c in cases)==8 and sum(c['workflow']=='comparison' for c in cases)==4
for c in cases:
 for e in c['expected_sources']:assert e['context'] in texts[names.index(e['filename'])] and all(any(a in e['context'] for a in g) for g in e['groups'])
assert all('Neskar Mirror Depot' not in t for t in texts)
(root/'fixed-answer-key.json').write_text(json.dumps(cases,indent=2),encoding='utf-8',newline='\n')
identity=json.loads((r.parent.parent/'outputs/coverage-v36-inputs/run-config.json').read_text(encoding='utf-8'))['module_identity'];sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
cfg={'candidate_commit':'bba4e2479f16baa98c4cc5d41293213fef7ddd2f','classification':'Prism32 first prospective author-created confirmation of unchanged v36; not externally blinded independent accuracy','total_questions':32,'module_identity':identity,'packs':[{'name':'Prism32','files':[{'name':n,'path':str((sources/n).resolve()),'sha256':sha(sources/n)} for n in names],'cases':cases,'integrity':'Four newly authored fictional source documents and32 exact questions/key frozen before first answers; no outcome filtering or dry runs'}]}
(root/'run-config.json').write_text(json.dumps(cfg,indent=2),encoding='utf-8',newline='\n');print('Prism32 sources and fixed key prepared; no answers observed')
