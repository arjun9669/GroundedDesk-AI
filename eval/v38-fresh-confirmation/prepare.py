from pathlib import Path
import json,hashlib,subprocess
r=Path.cwd();root=r/'eval/v38-fresh-confirmation';sources=root/'source_docs';sources.mkdir()
names=['01_Serevin_Seed_Library.txt','02_Avrel_Bell_Workshop.txt','03_Relmont_Canal_Garden.txt','04_Korven_Instrument_Coop.txt']
blocks=[[
'Serevin Seed Library began public seed lending in 1958. The first ventilation fan renewal was completed in 1984; the second ventilation fan renewal was completed in 2011.',
'SL-01. Dispatch requests released before 14:35 leave on the current service day. At 14:35 or later, departure is the next service day, unless a phytosanitary hold is open.',
'SL-02. Beren checks four seed lots per week. Olan checks six storage trays per week. Beren labels two transport boxes per month.',
'SL-03. Winter monthly mean temperatures in the seed store range from 4 to 6 degrees Celsius. Individual winter extremes are not recorded.',
'SL-04. Keep movement slips for 17 months. While a seed-quarantine hold is open, retain affected slips until the hold is released.',
'SL-05. Acknowledge seed-reservation requests within three business days. An acknowledgement is not a guarantee that seeds remain available.'
],[
'The Avrel Bell Workshop casting hall moved in 1912. Its restoration was completed in 1983. A plan to close the mould annex in 2016 was rejected; the annex remains open.',
'BW-01. The winter average temperature in the Avrel Bell Workshop alloy store is 10 degrees Celsius. Its absolute minimum winter temperature is -2 degrees Celsius. The highest monthly mean temperature is 26 degrees Celsius in July.',
'BW-02. Signed calibration records are retained for 4 years. An unresolved material claim extends retention of affected records until the claim is settled.',
'BW-03. The calibration packet must contain:\n- a clapper inventory\n- an alloy certificate\n- a tuning chart\n- an inspection log\n- a return tag',
'BW-04. The tower clock was replaced in 2007.',
'Grease the Avrel Bell Workshop striker every 360 cycles under normal conditions. In a humid chamber, grease it every 180 cycles. Inspect the striker every 90 cycles regardless of chamber.'
],[
'At Relmont Canal Garden, the watergate was rebuilt in 1979. The tool shelter was repainted in 2008.',
'The highest monthly mean temperature at Relmont Canal Garden is 23 degrees Celsius in June. Its highest recorded daily temperature is 39 degrees Celsius.',
'Balen records six flow readings per shift. Aven records three filter tests per shift. Balen tags two pump valves per month.'
],[
'IC-01. A rental request at Korven Instrument Coop is acknowledged within seven working hours. This acknowledgement does not guarantee an instrument reservation.',
'IC-02. The shipping packet includes a loan form, serial register, condition checklist, collection permit, and release receipt.',
'IC-03. Purchases exceeding 6200 credits require written approval from the Collection Steward and Workshop Treasurer.',
'IC-04. Completed loan records are kept for 11 months, unless an unresolved damage claim requires longer retention.',
'Grease the Korven Instrument Coop reed trimmer every 114 operating hours under normal conditions. In a dusty room, grease it every 57 operating hours. Inspect the reed trimmer every 19 operating hours in either room.'
]]
texts=[blocks[0][0]+'\n\n## Seed release and lending\n'+'\n'.join(blocks[0][1:])+'\n',blocks[1][0]+'\n\n## Calibration records and transport\n'+'\n'.join(blocks[1][1:5])+'\n\nA cabinet was repainted in 1947. '+blocks[1][5]+' The storeroom bell was replaced in 1993.\n','## Garden operating notes\n'+'\n\n'.join(blocks[2])+'\n','## Instrument lending rules\n'+'\n'.join(blocks[3][:-1])+'\n\nThe workshop sign was installed in 1981. '+blocks[3][-1]+'\n']
for name,text in zip(names,texts):(sources/name).write_bytes(text.encode('utf-8'))
cases=[]
def add(q,d,p,groups,category='supported',workflow='hybrid',other=None):
 es=[{'filename':names[d],'context':blocks[d][p],'groups':[[g] for g in groups]}]
 if other:
  e,j,gs=other;es.append({'filename':names[e],'context':blocks[e][j],'groups':[[g] for g in gs]})
 cases.append({'id':f'V{len(cases)+1:02}','question':q,'workflow':workflow,'category':category,'unsupported':False,'expected_documents':[e['filename'] for e in es],'expected_sources':es})
add('When did public seed lending begin at Serevin Seed Library?',0,0,['began public seed lending in 1958'])
add('In which year was the second ventilation fan renewal at Serevin Seed Library completed?',0,0,['second ventilation fan renewal was completed in 2011'])
add('Who must approve in writing a Korven Instrument Coop purchase above 6200 credits?',3,2,['written approval from the Collection Steward and Workshop Treasurer'])
add('A Serevin Seed Library dispatch request is released exactly at 14:35. When will it depart, and which hold can block departure?',0,1,['At 14:35 or later, departure is the next service day','unless a phytosanitary hold is open'])
add('How many seed lots does Beren check per week?',0,2,['Beren checks four seed lots per week'])
add('When was the Avrel Bell Workshop casting hall restoration completed?',1,0,['Its restoration was completed in 1983'])
add('How long are Avrel Bell Workshop signed calibration records kept, including the exception for an unresolved material claim?',1,2,['4 years','An unresolved material claim extends retention of affected records until the claim is settled'])
add('What is the lowest winter temperature in the Avrel Bell Workshop alloy store?',1,1,['absolute minimum winter temperature is -2 degrees Celsius'])
add('Give the highest monthly mean temperature in the Avrel Bell Workshop alloy store and its month.',1,1,['highest monthly mean temperature is 26 degrees Celsius in July'])
add('Which documents belong in the Avrel Bell Workshop calibration packet?',1,3,['clapper inventory','alloy certificate','tuning chart','inspection log','return tag'])
add('When was the Relmont Canal Garden watergate rebuilt?',2,0,['watergate was rebuilt in 1979'])
add('What is the highest recorded daily temperature at Relmont Canal Garden?',2,1,['highest recorded daily temperature is 39 degrees Celsius'])
add('How many flow readings does Balen record per shift?',2,2,['Balen records six flow readings per shift'])
add('Give the Avrel Bell Workshop striker greasing intervals under normal and humid conditions, together with its inspection interval.',1,5,['360 cycles under normal conditions','In a humid chamber, grease it every 180 cycles','Inspect the striker every 90 cycles regardless of chamber'])
add('How soon is a Korven Instrument Coop rental request acknowledged, and does acknowledgement guarantee an instrument reservation?',3,0,['within seven working hours','does not guarantee an instrument reservation'])
add('List every item in the Korven Instrument Coop shipping packet.',3,1,['loan form','serial register','condition checklist','collection permit','release receipt'])
add('How long are Korven Instrument Coop completed loan records kept, and what claim can extend that time?',3,3,['11 months','unless an unresolved damage claim requires longer retention'])
add('What is the winter average temperature in the Avrel Bell Workshop alloy store?',1,1,['winter average temperature in the Avrel Bell Workshop alloy store is 10 degrees Celsius'])
add('Which month has the highest monthly mean temperature at Relmont Canal Garden, and what is that mean?',2,1,['highest monthly mean temperature at Relmont Canal Garden is 23 degrees Celsius in June'])
add('When did public seed lending begin at Serevin Seed Library? Also, when was the Avrel Bell Workshop casting hall restoration completed?',0,0,['began public seed lending in 1958'],category='compound',other=(1,0,['Its restoration was completed in 1983']))
unsupported=[('When was the Serevin Seed Library ventilation fan renewed?','Two completed fan renewals1984/2011, no ordinal. Require uncited refusal or clarification.'),('What is the Serevin Seed Library dispatch password at 14:35?','At-boundary clock context does not supply a password.'),('Who approves a Serevin Seed Library dispatch at 14:34?','Before-cutoff timing is not an approver identity; no dispatch approver specified. Do not borrow Coop purchase approvals.'),('Which vehicle leaves the Serevin Seed Library dispatch yard at 16:00?','After-cutoff clock context does not specify a vehicle.'),('What is the bank account number of Korven Instrument Coop?','No bank account number present.'),('What exact torque in newton-metres is specified for Avrel Bell Workshop striker bolts?','No torque value present.'),('A Serevin Seed Library dispatch request is released at 14:34. When will it leave, and what is its password?','Mixed before-cutoff departure plus absent password; strict whole-question unsupported refusal required, zero citations.'),('What is the highest monthly mean temperature at Talven Quarry Archive?','Entity absent from every source.')]
for q,note in unsupported:cases.append({'id':f'V{len(cases)+1:02}','question':q,'workflow':'hybrid','category':'unsupported','unsupported':True,'expected_documents':[],'expected_sources':[],'scoring_notes':note})
add('Compare movement-slip retention at Serevin Seed Library and signed-calibration-record retention at Avrel Bell Workshop, including both hold and claim exceptions.',0,4,['17 months','While a seed-quarantine hold is open, retain affected slips until the hold is released'],category='comparison',workflow='comparison',other=(1,2,['4 years','An unresolved material claim extends retention of affected records until the claim is settled']))
add('Compare normal and exception greasing plus inspection intervals for the Avrel Bell Workshop humid-chamber striker and Korven Instrument Coop dusty-room reed trimmer.',1,5,['360 cycles under normal conditions','In a humid chamber, grease it every 180 cycles','Inspect the striker every 90 cycles regardless of chamber'],category='comparison',workflow='comparison',other=(3,4,['114 operating hours under normal conditions','In a dusty room, grease it every 57 operating hours','Inspect the reed trimmer every 19 operating hours in either room']))
add('Compare acknowledgement deadlines and their limits for Serevin Seed Library seed-reservation requests and Korven Instrument Coop rental requests.',0,5,['within three business days','not a guarantee that seeds remain available'],category='comparison',workflow='comparison',other=(3,0,['within seven working hours','does not guarantee an instrument reservation']))
add('Compare all contents of the Avrel Bell Workshop calibration packet and Korven Instrument Coop shipping packet.',1,3,['clapper inventory','alloy certificate','tuning chart','inspection log','return tag'],category='comparison',workflow='comparison',other=(3,1,['loan form','serial register','condition checklist','collection permit','release receipt']))
assert len(cases)==32 and sum(c['unsupported'] for c in cases)==8 and sum(c['workflow']=='comparison' for c in cases)==4
for c in cases:
 for e in c['expected_sources']:assert e['context'] in texts[names.index(e['filename'])] and all(any(a in e['context'] for a in g) for g in e['groups'])
assert all('Talven Quarry Archive' not in t for t in texts)
(root/'fixed-answer-key.json').write_text(json.dumps(cases,indent=2),encoding='utf-8',newline='\n')
identity=json.loads((r.parent.parent/'outputs/coverage-v38-inputs/run-config.json').read_text(encoding='utf-8'))['module_identity'];sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
cfg={'candidate_commit':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'classification':'Vela32 first prospective author-created stress confirmation of unchanged v38; known failure families, not externally blinded independent accuracy','total_questions':32,'module_identity':identity,'packs':[{'name':'Vela32','files':[{'name':n,'path':str((sources/n).resolve()),'sha256':sha(sources/n)} for n in names],'cases':cases,'integrity':'Four new fictional source documents and32 exact questions/key frozen before first answers. Varied cutoff equality/before/after and mixed unsupported intents; no model dry runs or outcome filtering.'}]}
(root/'run-config.json').write_text(json.dumps(cfg,indent=2),encoding='utf-8',newline='\n');print('Vela32 documents and fixed key prepared; no answers observed')
