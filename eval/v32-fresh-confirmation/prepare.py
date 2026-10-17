from pathlib import Path
import json,hashlib
r=Path.cwd();root=r/'eval/v32-fresh-confirmation';sources=root/'source_docs';sources.mkdir();assert not (root/'fixed-answer-key.json').exists()
names=['01_Veylan_Seed_Conservatory.txt','02_Ostren_Instrument_Library.txt','03_Caldra_Tide_Station.txt','04_Tessarin_Repair_Cafe.txt']
blocks=[[
'Veylan Seed Conservatory opened its public gallery to visitors in 1962. The first glass-roof overhaul took place in 1987; the second glass-roof overhaul took place in 2014.',
'V-01. Orders released before 14:10 leave on the same collection day. At or after 14:10, departure is the next collection day, unless a seed-health hold remains active.',
'V-02. Mira checks five germination trays per day. Tobin checks three irrigation valves per day. Mira labels two storage bins per week.',
'V-03. Veylan Seed Conservatory winter monthly mean temperatures range from 6 to 8 degrees Celsius. Individual winter extremes are not listed.',
'V-04. Collection slips are retained for 16 months. If a seed-health review is unresolved, keep the affected slips until clearance is recorded.',
'V-05. Acknowledge collection requests within two collection days. This acknowledgement does not guarantee stock availability.'
],[
'The Ostren Instrument Library rehearsal room relocation occurred in 1936. Its restoration was completed in 1974. A proposal to close the annex in 2009 was abandoned; the annex stayed open.',
'L-01. The winter average temperature in the Ostren Instrument Library store is 13 degrees Celsius. Its absolute minimum winter temperature is 3 degrees Celsius. The highest monthly mean temperature is 25 degrees Celsius, in August.',
'L-02. Signed loan records are retained for 8 years. If an ownership dispute is open, keep the affected records until the dispute is settled.',
'L-03. The custody packet contains:\n- a loan agreement\n- a condition checklist\n- an accessory inventory\n- a return receipt'
],[
'At Caldra Tide Station, the gauge tower was rebuilt in 1993. The equipment shed was painted in 2016.',
'The highest monthly mean temperature at Caldra Tide Station is 21 degrees Celsius in September. Its highest recorded daily temperature is 34 degrees Celsius.',
'Ruan records six water level readings per watch. Sena records four salinity samples per watch. Ruan tags two anchor markers per week.',
'The Caldra Tide Station winch needs lubrication every 84 operating hours under normal conditions. In a salt-spray bay, lubricate it every 42 operating hours. Inspect the winch every 21 operating hours regardless of bay.'
],[
'R-01. Tessarin Repair Cafe acknowledges repair requests within four business hours. An acknowledgement is not a promise that the repair will finish within four hours.',
'R-02. The dispatch packet includes a job card, parts log, safety checklist, collection notice, and release signature.',
'R-03. Purchases above 5200 credits need written approval from the Treasury Coordinator and Workshop Lead.',
'R-04. Lubricate the Tessarin Repair Cafe bench drill every 104 operating hours under normal conditions. In a dusty workroom, lubricate it every 52 operating hours. Inspect the drill every 26 operating hours in either room.',
'R-05. Completed repair records are retained for 7 months, unless an unresolved warranty claim requires longer retention.'
]]
texts=[blocks[0][0]+'\n\n## Collection operations\n'+'\n'.join(blocks[0][1:])+'\n',blocks[1][0]+'\n\n## Store and loan records\n'+'\n'.join(blocks[1][1:])+'\n','\n\n'.join(blocks[2])+'\n','## Workshop policies\n'+'\n'.join(blocks[3])+'\n']
for n,t in zip(names,texts):(sources/n).write_bytes(t.encode('utf-8'))
cases=[]
def add(q,d,p,groups,category='supported',workflow='hybrid',other=None):
 expected=[{'filename':names[d],'context':blocks[d][p],'groups':[[g] for g in groups]}]
 if other:
  e,j,gs=other;expected.append({'filename':names[e],'context':blocks[e][j],'groups':[[g] for g in gs]})
 cases.append({'id':f'H{len(cases)+1:02}','question':q,'workflow':workflow,'category':category,'unsupported':False,'expected_documents':[x['filename'] for x in expected],'expected_sources':expected})
add('When did Veylan Seed Conservatory first admit visitors to its public gallery?',0,0,['opened its public gallery to visitors in 1962'])
add('When did the second glass-roof overhaul at Veylan Seed Conservatory take place?',0,0,['second glass-roof overhaul took place in 2014'])
add('Whose written approval is needed for a Tessarin Repair Cafe purchase above 5200 credits?',3,2,['written approval from the Treasury Coordinator and Workshop Lead'])
add('A Veylan Seed Conservatory order is released exactly at 14:10. Which collection day is departure, and what hold can prevent it?',0,1,['At or after 14:10, departure is the next collection day','unless a seed-health hold remains active'])
add('How many germination trays does Mira check per day?',0,2,['Mira checks five germination trays per day'])
add('What year did the Ostren Instrument Library rehearsal room restoration take place?',1,0,['Its restoration was completed in 1974'])
add('How long are Ostren Instrument Library signed loan records retained, and what happens while an ownership dispute is open?',1,2,['8 years','If an ownership dispute is open, keep the affected records until the dispute is settled'])
add('What is the absolute minimum winter temperature in the Ostren Instrument Library store?',1,1,['absolute minimum winter temperature is 3 degrees Celsius'])
add('What is the Ostren Instrument Library highest monthly mean temperature, including the month?',1,1,['highest monthly mean temperature is 25 degrees Celsius, in August'])
add('List every item in the Ostren Instrument Library custody packet.',1,3,['loan agreement','condition checklist','accessory inventory','return receipt'])
add('When did Caldra Tide Station rebuild its gauge tower?',2,0,['gauge tower was rebuilt in 1993'])
add('What is the Caldra Tide Station highest recorded daily temperature?',2,1,['highest recorded daily temperature is 34 degrees Celsius'])
add('How many water level readings does Ruan record per watch?',2,2,['Ruan records six water level readings per watch'])
add('Give the normal-bay and salt-spray-bay lubrication intervals for the Caldra Tide Station winch, together with its inspection interval.',2,3,['84 operating hours under normal conditions','In a salt-spray bay, lubricate it every 42 operating hours','Inspect the winch every 21 operating hours regardless of bay'])
add('How quickly does Tessarin Repair Cafe acknowledge a repair request, and does acknowledgement promise completion?',3,0,['within four business hours','not a promise that the repair will finish within four hours'])
add('What are all five contents of the Tessarin Repair Cafe dispatch packet?',3,1,['job card','parts log','safety checklist','collection notice','release signature'])
add('For how long does Tessarin Repair Cafe retain completed repair records, and which exception can extend that period?',3,4,['7 months','unless an unresolved warranty claim requires longer retention'])
add('What is the winter average temperature in the Ostren Instrument Library store?',1,1,['winter average temperature in the Ostren Instrument Library store is 13 degrees Celsius'])
add('Which month is warmest on a monthly-mean basis at Caldra Tide Station, and what is that mean temperature?',2,1,['highest monthly mean temperature at Caldra Tide Station is 21 degrees Celsius in September'])
add('When did Veylan Seed Conservatory open its public gallery to visitors? Also, what year did the Ostren Instrument Library rehearsal room restoration take place?',0,0,['opened its public gallery to visitors in 1962'],category='compound',other=(1,0,['Its restoration was completed in 1974']))
unsupported=[
('When was the Veylan Seed Conservatory glass roof overhauled?','Two completed roof overhauls1987 and2014; require uncited ambiguity clarification or refusal.'),
('What year did the Ostren Instrument Library annex close?','The closure proposal was abandoned; no completed closure date. Under the unchanged strict rubric even literal negative evidence does not satisfy uncited refusal.'),
('What year did the Caldra Tide Station equipment shed rebuild take place?','Tower rebuilt1993; shed painted2016. No shed rebuild date.'),
('How many irrigation valves does Mira check per day?','Tobin checks irrigation valves. Mira checks germination trays and labels bins; requested actor/action/object tuple is absent.'),
('What is the bank account number for Tessarin Repair Cafe?','No bank account number in the sources.'),
('What exact torque in newton-metres should be used on the Caldra Tide Station anchor bolts?','No anchor-bolt torque or tightening instruction in the sources.'),
('What is the absolute minimum winter temperature at Veylan Seed Conservatory?','Only winter monthly mean range is supplied, not individual extreme; do not borrow instrument-store minimum.'),
('What is the highest monthly mean temperature at Norvik Fog Depot?','Norvik Fog Depot is absent from every source.')]
for q,note in unsupported:cases.append({'id':f'H{len(cases)+1:02}','question':q,'workflow':'hybrid','category':'unsupported','unsupported':True,'expected_documents':[],'expected_sources':[],'scoring_notes':note})
add('Compare collection-slip retention at Veylan Seed Conservatory and signed-loan-record retention at Ostren Instrument Library, including both review or dispute exceptions.',0,4,['16 months','If a seed-health review is unresolved, keep the affected slips until clearance is recorded'],category='comparison',workflow='comparison',other=(1,2,['8 years','If an ownership dispute is open, keep the affected records until the dispute is settled']))
add('Compare normal and exception lubrication plus inspection intervals for the Caldra Tide Station salt-spray winch and Tessarin Repair Cafe dusty-workroom bench drill.',2,3,['84 operating hours under normal conditions','In a salt-spray bay, lubricate it every 42 operating hours','Inspect the winch every 21 operating hours regardless of bay'],category='comparison',workflow='comparison',other=(3,3,['104 operating hours under normal conditions','In a dusty workroom, lubricate it every 52 operating hours','Inspect the drill every 26 operating hours in either room']))
add('Compare acknowledgement deadlines and their limits for Veylan Seed Conservatory collection requests and Tessarin Repair Cafe repair requests.',0,5,['within two collection days','does not guarantee stock availability'],category='comparison',workflow='comparison',other=(3,0,['within four business hours','not a promise that the repair will finish within four hours']))
add('Compare all contents of the Ostren Instrument Library custody packet and Tessarin Repair Cafe dispatch packet.',1,3,['loan agreement','condition checklist','accessory inventory','return receipt'],category='comparison',workflow='comparison',other=(3,1,['job card','parts log','safety checklist','collection notice','release signature']))
assert len(cases)==32 and sum(c['workflow']=='comparison' for c in cases)==4 and sum(c['unsupported'] for c in cases)==8
for c in cases:
 for e in c['expected_sources']:assert e['context'] in texts[names.index(e['filename'])] and all(any(a in e['context'] for a in g) for g in e['groups'])
assert all('Norvik Fog Depot' not in text for text in texts)
(root/'fixed-answer-key.json').write_text(json.dumps(cases,indent=2),encoding='utf-8',newline='\n')
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();old=json.loads((r.parent.parent/'outputs/coverage-v32-inputs/run-config.json').read_text(encoding='utf-8'))
config={'candidate_commit':'8313e74543e861a4bd1ca591f46d51d6e616cf29','classification':'Hearth32 prospective author-created confirmation of unchanged v32; not external independent accuracy','total_questions':32,'module_identity':old['module_identity'],'packs':[{'name':'Hearth32','files':[{'name':n,'path':str((sources/n).resolve()),'sha256':sha(sources/n)} for n in names],'cases':cases,'integrity':'Four original fictional TXT sources and32 fixed questions/key frozen before first answers'}]}
(root/'run-config.json').write_text(json.dumps(config,indent=2),encoding='utf-8',newline='\n');print('Prepared32 cases:28 Hybrid and4 lexical Comparison. No answers observed or dry runs.')
