from pathlib import Path
import json,hashlib
r=Path.cwd();root=r/'eval/v35-fresh-confirmation';sources=root/'source_docs';sources.mkdir()
names=['01_Oridel_Map_Archive.txt','02_Perrin_Community_Kiln.txt','03_Ruvane_Canal_Lock.txt','04_Neris_Kite_Club.txt']
blocks=[[
'Oridel Map Archive was founded in 1859. It opened its public map room in 1971. The first roof renewal was completed in 1988; the second roof renewal was completed in 2018.',
'A-01. Dispatch requests released before 12:40 leave on the current service day. At or after 12:40, departure moves to the following service day, unless a conservation hold is still active.',
'A-02. Jori checks seven map drawers per morning. Veda checks four humidity sensors per morning. Jori seals three transport cases per week.',
'A-03. Winter monthly mean temperatures in the map store range from 7 to 9 degrees Celsius. No individual winter extreme is recorded here.',
'A-04. Transport slips are retained for 14 months. If a provenance review is unresolved, keep the affected slips until the review is cleared.',
'A-05. Acknowledge map-copy requests within three service days. Acknowledgement does not guarantee that a reproduction is available.'
],[
'The Perrin Community Kiln pottery hall was relocated in 1946. Its restoration was completed in 2007. A proposal to close the drying annex in 2019 was rejected; the annex remains open.',
'K-01. The winter average temperature in the Perrin Community Kiln material store is 12 degrees Celsius. The absolute minimum winter temperature is 2 degrees Celsius. The highest monthly mean temperature is 26 degrees Celsius in July.',
'K-02. Signed firing records are retained for 6 years. If a compensation claim is open, retain the affected records until that claim is settled.',
'K-03. Each firing handover packet must contain:\n- a batch ticket\n- a glaze inventory\n- a safety checklist\n- a collection receipt',
'K-04. Purchases above 6800 credits require written approval from the Accounts Steward and Kiln Manager.'
],[
'At Ruvane Canal Lock, the lifting bridge was rebuilt in 1998. The ticket shelter was repainted in 2013.',
'The highest monthly mean temperature at Ruvane Canal Lock is 22 degrees Celsius in June. The highest recorded daily temperature is 35 degrees Celsius.',
'Lena records eight gate-position readings per shift. Oren records five water-depth readings per shift. Lena labels two service crates per week.',
'The Ruvane Canal Lock chain hoist requires lubrication every 110 operating hours under normal conditions. In a misty chamber, lubricate it every 55 operating hours. Inspect the chain hoist every 22 operating hours regardless of chamber.'
],[
'N-01. Neris Kite Club acknowledges equipment requests within five business hours. An acknowledgement does not promise that equipment will be ready within five hours.',
'N-02. The field issue packet includes a booking form, tether log, weather checklist, flight permit, and return signature.',
'N-03. Completed flight records are retained for 9 months, unless an unresolved damage claim requires longer retention.',
'N-04. Lubricate the Neris Kite Club winding reel every 66 operating hours under normal conditions. In a sandy enclosure, lubricate it every 33 operating hours. Inspect the winding reel every 11 operating hours in either enclosure.'
]]
texts=[blocks[0][0]+'\n\n## Archive service rules\n'+'\n'.join(blocks[0][1:])+'\n',blocks[1][0]+'\n\n## Material store and firing records\n'+'\n'.join(blocks[1][1:])+'\n','## Ruvane operations record\n'+'\n\n'.join(blocks[2][:-1])+'\n\n'+blocks[2][-1]+' The ticket shelter noticeboard was replaced in 2022.\n','## Club equipment rules\n'+'\n'.join(blocks[3])+'\n']
for n,t in zip(names,texts):(sources/n).write_bytes(t.encode('utf-8'))
cases=[]
def add(q,d,p,groups,category='supported',workflow='hybrid',other=None):
 es=[{'filename':names[d],'context':blocks[d][p],'groups':[[g] for g in groups]}]
 if other:
  e,j,gs=other;es.append({'filename':names[e],'context':blocks[e][j],'groups':[[g] for g in gs]})
 cases.append({'id':f'L{len(cases)+1:02}','question':q,'workflow':workflow,'category':category,'unsupported':False,'expected_documents':[e['filename'] for e in es],'expected_sources':es})
add('In what year did Oridel Map Archive open its public map room?',0,0,['opened its public map room in 1971'])
add('When was the second roof renewal at Oridel Map Archive completed?',0,0,['second roof renewal was completed in 2018'])
add('Who must give written approval for a Perrin Community Kiln purchase above 6800 credits?',1,4,['written approval from the Accounts Steward and Kiln Manager'])
add('An Oridel Map Archive dispatch request is released exactly at 12:40. When should it depart, and which hold can prevent departure?',0,1,['At or after 12:40, departure moves to the following service day','unless a conservation hold is still active'])
add('How many map drawers does Jori check per morning?',0,2,['Jori checks seven map drawers per morning'])
add('When was the Perrin Community Kiln pottery hall restoration completed?',1,0,['Its restoration was completed in 2007'])
add('How long must Perrin Community Kiln signed firing records be kept, including the exception for an open compensation claim?',1,2,['6 years','If a compensation claim is open, retain the affected records until that claim is settled'])
add('What is the absolute minimum winter temperature in the Perrin Community Kiln material store?',1,1,['absolute minimum winter temperature is 2 degrees Celsius'])
add('Give the highest monthly mean temperature in the Perrin Community Kiln material store and its month.',1,1,['highest monthly mean temperature is 26 degrees Celsius in July'])
add('List every item required in a Perrin Community Kiln firing handover packet.',1,3,['batch ticket','glaze inventory','safety checklist','collection receipt'])
add('In which year was the Ruvane Canal Lock lifting bridge rebuilt?',2,0,['lifting bridge was rebuilt in 1998'])
add('What is the highest recorded daily temperature at Ruvane Canal Lock?',2,1,['highest recorded daily temperature is 35 degrees Celsius'])
add('How many gate-position readings does Lena record per shift?',2,2,['Lena records eight gate-position readings per shift'])
add('State the Ruvane Canal Lock chain hoist lubrication intervals for normal and misty conditions, plus its inspection interval.',2,3,['110 operating hours under normal conditions','In a misty chamber, lubricate it every 55 operating hours','Inspect the chain hoist every 22 operating hours regardless of chamber'])
add('How soon does Neris Kite Club acknowledge equipment requests, and does that promise equipment readiness?',3,0,['within five business hours','does not promise that equipment will be ready within five hours'])
add('What are all five items in the Neris Kite Club field issue packet?',3,1,['booking form','tether log','weather checklist','flight permit','return signature'])
add('How long does Neris Kite Club keep completed flight records, and what may extend the retention period?',3,2,['9 months','unless an unresolved damage claim requires longer retention'])
add('What is the winter average temperature in the Perrin Community Kiln material store?',1,1,['winter average temperature in the Perrin Community Kiln material store is 12 degrees Celsius'])
add('Which month has the highest monthly mean temperature at Ruvane Canal Lock, and what is the temperature?',2,1,['highest monthly mean temperature at Ruvane Canal Lock is 22 degrees Celsius in June'])
add('In what year did Oridel Map Archive open its public map room? Also, when was the Perrin Community Kiln pottery hall restoration completed?',0,0,['opened its public map room in 1971'],category='compound',other=(1,0,['Its restoration was completed in 2007']))
unsupported=[('When was the Oridel Map Archive roof renewed?','Two completed renewals,1988 and2018; require uncited clarification or refusal.'),('What year did the Perrin Community Kiln drying annex close?','Rejected2019 closure proposal, not a completed closure; strict refusal/clarification with zero citations required.'),('When was the Ruvane Canal Lock ticket shelter rebuilt?','Bridge rebuilt1998; shelter repainted2013 and its noticeboard replaced2022. No shelter rebuilding date.'),('How many humidity sensors does Jori check per morning?','Veda checks humidity sensors; requested Jori/action/object tuple absent.'),('What is the bank account number of Neris Kite Club?','Bank account number absent.'),('What exact torque in newton-metres is specified for Ruvane Canal Lock hoist bolts?','No hoist-bolt torque instruction provided.'),('What is the absolute minimum winter temperature in the Oridel Map Archive map store?','Only monthly means7–9 given, not absolute minimum. Do not substitute another store statistic.'),('What is the highest monthly mean temperature at Velora Balloon Yard?','Entity absent from all documents.')]
for q,note in unsupported:cases.append({'id':f'L{len(cases)+1:02}','question':q,'workflow':'hybrid','category':'unsupported','unsupported':True,'expected_documents':[],'expected_sources':[],'scoring_notes':note})
add('Compare transport-slip retention at Oridel Map Archive with signed-firing-record retention at Perrin Community Kiln, including both review and claim exceptions.',0,4,['14 months','If a provenance review is unresolved, keep the affected slips until the review is cleared'],category='comparison',workflow='comparison',other=(1,2,['6 years','If a compensation claim is open, retain the affected records until that claim is settled']))
add('Compare normal and exception lubrication plus inspection intervals for the Ruvane Canal Lock misty-chamber chain hoist and Neris Kite Club sandy-enclosure winding reel.',2,3,['110 operating hours under normal conditions','In a misty chamber, lubricate it every 55 operating hours','Inspect the chain hoist every 22 operating hours regardless of chamber'],category='comparison',workflow='comparison',other=(3,3,['66 operating hours under normal conditions','In a sandy enclosure, lubricate it every 33 operating hours','Inspect the winding reel every 11 operating hours in either enclosure']))
add('Compare acknowledgement deadlines and their limits for Oridel Map Archive map-copy requests and Neris Kite Club equipment requests.',0,5,['within three service days','does not guarantee that a reproduction is available'],category='comparison',workflow='comparison',other=(3,0,['within five business hours','does not promise that equipment will be ready within five hours']))
add('Compare every item in the Perrin Community Kiln firing handover packet and Neris Kite Club field issue packet.',1,3,['batch ticket','glaze inventory','safety checklist','collection receipt'],category='comparison',workflow='comparison',other=(3,1,['booking form','tether log','weather checklist','flight permit','return signature']))
assert len(cases)==32 and sum(c['unsupported'] for c in cases)==8 and sum(c['workflow']=='comparison' for c in cases)==4
for c in cases:
 for e in c['expected_sources']:assert e['context'] in texts[names.index(e['filename'])] and all(any(a in e['context'] for a in g) for g in e['groups'])
assert all('Velora Balloon Yard' not in t for t in texts)
(root/'fixed-answer-key.json').write_text(json.dumps(cases,indent=2),encoding='utf-8',newline='\n')
old=json.loads((r/'eval/answer-completeness-v35/freeze-manifest.json').read_text(encoding='utf-8'))
identity=json.loads((r.parent.parent/'outputs/coverage-v35-inputs/run-config.json').read_text(encoding='utf-8'))['module_identity']
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
cfg={'candidate_commit':'9400da0bac80b13b3b2f889f89e5d140f493cc6f','classification':'Lumen32 prospective author-created confirmation of unchanged v35; not externally blinded independent accuracy','total_questions':32,'module_identity':identity,'packs':[{'name':'Lumen32','files':[{'name':n,'path':str((sources/n).resolve()),'sha256':sha(sources/n)} for n in names],'cases':cases,'integrity':'Four original fictional TXT sources and32 exact questions/key frozen before any first answers; no outcome filtering'}]}
(root/'run-config.json').write_text(json.dumps(cfg,indent=2),encoding='utf-8',newline='\n')
print('Prepared32 original questions and four documents; no answers observed')
