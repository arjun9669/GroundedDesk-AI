from pathlib import Path
import json,hashlib,subprocess,datetime
r=Path.cwd();root=r/'eval/v28-fresh-confirmation';sources=root/'source_docs';sources.mkdir();assert not (root/'fixed-answer-key.json').exists()
names=['01_Flintmere_Reservoir.txt','02_Orren_Horology_Collection.txt','03_Velric_Instrument_Workshop.txt','04_Sable_Travelling_Books.txt']
paragraphs=[[
'Flintmere Reservoir opened to visitors in 1906. The first spillway overhaul was completed in 1961; the second spillway overhaul was completed in 1994. A proposal to close the visitor path in 2019 was rejected, and the path remained open.',
'The winter monthly mean temperatures at Flintmere Reservoir lie between 5 and 8 degrees Celsius. The highest monthly mean is 19 degrees Celsius, in September. The highest recorded daily temperature is 32 degrees Celsius.',
'Iona collects seven water samples per fortnight. Tevan checks four level gauges per morning. Iona checks two signboards per morning.',
'Keep Flintmere Reservoir visitor permits for 8 years. An active access dispute suspends disposal until the dispute is resolved.'
],[
'The Orren Horology Collection gallery relocation took place in 1934. Its restoration took place in 1986. A separate storehouse was inspected in 2001.',
'The Orren Horology Collection winter average temperature is 14 degrees Celsius; the absolute minimum winter temperature is 2 degrees Celsius. The highest monthly mean is 21 degrees Celsius.',
'For the Orren Horology Collection winding rig, lubricate after every 96 operating hours in normal conditions. In a dusty room the lubrication interval is 48 operating hours. The inspection interval stays at 24 operating hours in either room.',
'Orren Horology Collection loan receipts are retained for 6 years, except that an open ownership claim requires retention until the claim is settled.'
],[
'Velric Instrument Workshop was founded in 1981. The tuning bench was rebuilt in 2017, while the display cabinet was restored in 2022.',
'Velric Instrument Workshop purchases above 3800 credits require written approval from both the Finance Custodian and the Workshop Director. The purchasing packet consists of a supplier quote, cost sheet, purchase order, safety checklist, and funding code.',
'Velric Instrument Workshop acknowledges service requests within four business hours. This acknowledgement is not a promise that the repair will be completed within four hours.',
'Velric Instrument Workshop has a highest monthly mean temperature of 27 degrees Celsius and a highest recorded daily temperature of 39 degrees Celsius.',
'For the Velric Instrument Workshop drill, lubrication is due every 70 operating hours in normal conditions and every 35 operating hours in a dusty room. Inspection remains every 14 operating hours in both conditions.',
'Daro tunes three violins per week. Sela polishes five flutes per week. Daro polishes one display stand per week.'
],[
'Sable Travelling Books moved its packing office in 2012. Its loading ramp was rebuilt in 2021. The public reading desk opened in 2007.',
'Mina sorts five return bins per day. Jules labels eight book bundles per day. Mina labels three route envelopes per day.',
'At Sable Travelling Books, orders released before 14:20 depart on the same service day. Orders released at or after 14:20 depart on the following service day, unless a road-closure hold is in effect.',
'Sable Travelling Books dispatch packets contain a route sheet, parcel list, driver authorization, and delivery slip. Keep dispatch receipts for 10 months, unless an unresolved loss claim requires longer retention.',
'Sable Travelling Books acknowledges reservation requests within two service days. An acknowledgement does not guarantee that a reserved book will be available.'
]]
for n,ps in zip(names,paragraphs):(sources/n).write_bytes(('\n\n'.join(ps)+'\n').encode())
cases=[]
def add(q,d,p,groups,category='supported',workflow='hybrid',other=None):
 expected=[{'filename':names[d],'context':paragraphs[d][p],'groups':[[g] for g in groups]}]
 if other:
  e,j,gs=other;expected.append({'filename':names[e],'context':paragraphs[e][j],'groups':[[g] for g in gs]})
 cases.append({'id':f'F{len(cases)+1:02}','question':q,'workflow':workflow,'category':category,'unsupported':False,'expected_documents':[x['filename'] for x in expected],'expected_sources':expected})
add('When did Flintmere Reservoir first admit visitors?',0,0,['opened to visitors in 1906'])
add('In which year was the second Flintmere Reservoir spillway overhaul completed?',0,0,['second spillway overhaul was completed in 1994'])
add('What is the highest monthly mean temperature at Flintmere Reservoir, and in which month?',0,1,['highest monthly mean is 19 degrees Celsius, in September'])
add('How many water samples does Iona collect per fortnight?',0,2,['Iona collects seven water samples per fortnight'])
add('How long should Flintmere Reservoir visitor permits be kept, and what prevents disposal?',0,3,['8 years','active access dispute suspends disposal until the dispute is resolved'])
add('What year did the Orren Horology Collection gallery restoration take place?',1,0,['Its restoration took place in 1986'])
add('What year did the Orren Horology Collection gallery relocation take place?',1,0,['gallery relocation took place in 1934'])
add('What is the Orren Horology Collection absolute minimum winter temperature?',1,1,['absolute minimum winter temperature is 2 degrees Celsius'])
add('Give the normal and dusty-room lubrication intervals for the Orren Horology Collection winding rig, and say whether its inspection interval changes.',1,2,['96 operating hours','48 operating hours','24 operating hours in either room'])
add('For a Velric Instrument Workshop purchase above 3800 credits, who must give written approval?',2,1,['written approval from both the Finance Custodian and the Workshop Director'])
add('What are all five contents of the Velric Instrument Workshop purchasing packet?',2,1,['supplier quote','cost sheet','purchase order','safety checklist','funding code'])
add('In which year did Sable Travelling Books move its packing office?',3,0,['moved its packing office in 2012'])
add('How many return bins does Mina sort per day?',3,1,['Mina sorts five return bins per day'])
add('When does a Sable Travelling Books order released exactly at 14:20 depart, and which hold overrides departure?',3,2,['at or after 14:20 depart on the following service day','unless a road-closure hold is in effect'])
add('What is the Sable Travelling Books dispatch-receipt retention period, including the exception?',3,3,['10 months','unless an unresolved loss claim requires longer retention'])
add('When was Velric Instrument Workshop founded?',2,0,['founded in 1981'])
add('How soon does Velric Instrument Workshop acknowledge a service request, and does that deadline promise repair completion?',2,2,['within four business hours','acknowledgement is not a promise that the repair will be completed within four hours'])
add('What is the Velric Instrument Workshop highest monthly mean temperature?',2,3,['highest monthly mean temperature of 27 degrees Celsius'])
add('List the contents of a Sable Travelling Books dispatch packet.',3,3,['route sheet','parcel list','driver authorization','delivery slip'])
add('What year did the Orren Horology Collection gallery restoration take place? Also, when did Flintmere Reservoir open to visitors?',1,0,['Its restoration took place in 1986'],category='compound',other=(0,0,['opened to visitors in 1906']))
unsupported=[
('What year was the Flintmere Reservoir spillway overhauled?','Two spillway overhauls are dated1961 and1994. Clarification or no-evidence refusal with zero citations required.'),
('In what year did the Flintmere Reservoir visitor path close?','Proposed closure was rejected; no actual closure date. Even true negative evidence is not an explicit uncited refusal under this strict rubric.'),
('What year did the Orren Horology Collection storehouse restoration take place?','Only the gallery restoration is dated; storehouse has an inspection, not a restoration.'),
('How many flutes does Daro polish per week?','Sela polishes flutes; Daro polishes a display stand. Requested tuple absent.'),
('What is the bank account number for Velric Instrument Workshop?','No bank account number in any source.'),
('What exact torque in newton-metres should be used on the Velric Instrument Workshop drill spindle?', 'No torque value is specified. Lubrication and inspection hours are not torque.'),
('What is the absolute minimum winter temperature at Flintmere Reservoir?','Monthly means do not determine an absolute minimum reading.'),
('What is the highest monthly mean temperature at Dunvale Ferry Station?','Dunvale Ferry Station is absent from all four sources.')]
for q,note in unsupported:cases.append({'id':f'F{len(cases)+1:02}','question':q,'workflow':'hybrid','category':'unsupported','unsupported':True,'expected_documents':[],'expected_sources':[],'scoring_notes':note})
add('Compare how long Flintmere Reservoir keeps visitor permits and Orren Horology Collection keeps loan receipts, including both disposal exceptions.',0,3,['8 years','active access dispute suspends disposal until the dispute is resolved'],category='comparison',workflow='comparison',other=(1,3,['6 years','open ownership claim requires retention until the claim is settled']))
add('Compare normal lubrication, dusty-room lubrication and inspection intervals for the Orren Horology Collection winding rig and Velric Instrument Workshop drill.',1,2,['96 operating hours','48 operating hours','24 operating hours'],category='comparison',workflow='comparison',other=(2,4,['70 operating hours','35 operating hours','14 operating hours']))
add('Compare all packet contents for Velric Instrument Workshop purchasing and Sable Travelling Books dispatch.',2,1,['supplier quote','cost sheet','purchase order','safety checklist','funding code'],category='comparison',workflow='comparison',other=(3,3,['route sheet','parcel list','driver authorization','delivery slip']))
add('Compare acknowledgement deadlines and their limits for Velric Instrument Workshop service requests and Sable Travelling Books reservations.',2,2,['four business hours','not a promise that the repair will be completed within four hours'],category='comparison',workflow='comparison',other=(3,4,['two service days','does not guarantee that a reserved book will be available']))
assert len(cases)==32 and sum(x['workflow']=='comparison' for x in cases)==4 and sum(x['unsupported'] for x in cases)==8
for c in cases:
 for e in c['expected_sources']:
  assert all(any(a in e['context'] for a in g) for g in e['groups'])
(root/'fixed-answer-key.json').write_text(json.dumps(cases,indent=2),encoding='utf-8',newline='\n')
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
old=json.loads((r.parent.parent/'outputs/coverage-v28-inputs/run-config.json').read_text(encoding='utf-8'))
config={'candidate_commit':'bffc465f0ad35522d47f5cfdec4e9b5cfd21af4a','classification':'Flint32 prospective author-created confirmation of unchanged v28; not external independent accuracy','total_questions':32,'module_identity':old['module_identity'],'packs':[{'name':'Flint32','files':[{'name':n,'path':str((sources/n).resolve()),'sha256':sha(sources/n)} for n in names],'cases':cases,'integrity':'Four original fictional TXT sources and32 questions/key frozen before first answers'}]}
(root/'run-config.json').write_text(json.dumps(config,indent=2),encoding='utf-8',newline='\n')
print('Prepared32 cases:28 Hybrid and4 lexical Comparison; no answers observed.')
