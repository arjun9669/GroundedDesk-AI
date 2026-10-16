from pathlib import Path
import json,hashlib
r=Path.cwd();root=r/'eval/v30-fresh-confirmation';sources=root/'source_docs';sources.mkdir();assert not (root/'fixed-answer-key.json').exists()
names=['01_Ashmere_Funicular.txt','02_Selwick_Textile_Archive.txt','03_Pelden_Acoustic_Station.txt','04_Noryn_Print_Cooperative.txt']
blocks=[[
'Ashmere Funicular opened its upper platform to passengers in 1918. The first track overhaul took place in 1964; the second track overhaul took place in 1997.',
'F-01. Release ticket orders before 13:35 for departure on the same service day. Ticket orders released at or after 13:35 depart on the next service day, unless a wind-suspension hold remains active.',
'F-02. Quinn checks six brake assemblies per day. Wes checks two haul cables per day. Quinn labels three tool drawers per day.',
'F-03. Ashmere Funicular winter monthly mean temperatures range from 5 to 7 degrees Celsius. Individual winter extremes are not listed.',
'F-04. Ticket transaction slips are kept for 18 months. If an incident review is open, retain the affected slips until that review closes.',
'F-05. Acknowledge ticket requests within one service day. This acknowledgement does not guarantee a reserved seat.'
],[
'The Selwick Textile Archive catalogue room relocation took place in 1947. Its restoration took place in 1988. A proposal to close the reading desk in 2015 was canceled; the desk stayed open.',
'S-01. The winter average temperature in the Selwick Textile Archive store is 12 degrees Celsius. Its absolute minimum winter temperature is 1 degree Celsius. The highest monthly mean temperature is 24 degrees Celsius, in August.',
'S-02. Access registers are retained for 9 years. If a loan claim is open, keep the affected registers until the claim is settled.',
'S-03. The custody packet contains a custody slip, condition photograph, access log, and return authorization.'
],[
'At Pelden Acoustic Station, the calibration tower was rebuilt in 2005. The boathouse was painted in 2019.',
'Pelden Acoustic Station has a highest monthly mean temperature of 22 degrees Celsius in July; its highest recorded daily temperature is 35 degrees Celsius.',
'Arel records four calibration tones per shift. Liva records seven ambient clips per shift. Arel labels two microphone cases per shift.',
'After each 68 hours of use in a normal hut, lubricate the Pelden Acoustic Station scanner. Use a 34-hour lubrication interval in a dusty hut. Inspect the scanner every 17 operating hours in either type of hut.'
],[
'P-01. Noryn Print Cooperative acknowledges a print request within three business hours. This acknowledgement is not a guarantee that the order will be dispatched within three hours.',
'P-02. The dispatch packet includes a job ticket, proof sheet, packing list, collection receipt, and release signature.',
'P-03. Purchases above 4700 credits need written approval from the Finance Delegate and Production Lead.',
'P-04. Lubricate the Noryn Print Cooperative press every 110 operating hours under normal conditions. In a dusty room, lubricate it every 55 operating hours. Inspect the press every 22 operating hours in either room.',
'P-05. Completed job records are retained for 5 months, unless an unresolved invoice query requires longer retention.'
]]
# Policy blocks deliberately share single newlines; headings are separate source lines.
texts=[blocks[0][0]+'\n\n## Visitor operations\n'+'\n'.join(blocks[0][1:])+'\n',blocks[1][0]+'\n\n## Store and records\n'+'\n'.join(blocks[1][1:])+'\n','\n\n'.join(blocks[2])+'\n','## Cooperative policies\n'+'\n'.join(blocks[3])+'\n']
for n,text in zip(names,texts):(sources/n).write_bytes(text.encode('utf-8'))
cases=[]
def add(q,d,p,groups,category='supported',workflow='hybrid',other=None):
 expected=[{'filename':names[d],'context':blocks[d][p],'groups':[[g] for g in groups]}]
 if other:
  e,j,gs=other;expected.append({'filename':names[e],'context':blocks[e][j],'groups':[[g] for g in gs]})
 cases.append({'id':f'M{len(cases)+1:02}','question':q,'workflow':workflow,'category':category,'unsupported':False,'expected_documents':[x['filename'] for x in expected],'expected_sources':expected})
add('When did Ashmere Funicular start welcoming passengers to its upper platform?',0,0,['opened its upper platform to passengers in 1918'])
add('When did the second track overhaul at Ashmere Funicular take place?',0,0,['second track overhaul took place in 1997'])
add('Whose written approval is needed for a Noryn Print Cooperative purchase above 4700 credits?',3,2,['written approval from the Finance Delegate and Production Lead'])
add('An Ashmere Funicular ticket order is released exactly at 13:35. When does it depart, and what can hold it back?',0,1,['at or after 13:35 depart on the next service day','unless a wind-suspension hold remains active'])
add('How many brake assemblies does Quinn check per day?',0,2,['Quinn checks six brake assemblies per day'])
add('What year did the Selwick Textile Archive catalogue room restoration take place?',1,0,['Its restoration took place in 1988'])
add('How long are Selwick Textile Archive access registers retained, and what happens if a loan claim is still open?',1,2,['9 years','If a loan claim is open, keep the affected registers until the claim is settled'])
add('What is the absolute minimum winter temperature in the Selwick Textile Archive store?',1,1,['absolute minimum winter temperature is 1 degree Celsius'])
add('What is the Selwick Textile Archive highest monthly mean temperature, including the month?',1,1,['highest monthly mean temperature is 24 degrees Celsius, in August'])
add('List every item in the Selwick Textile Archive custody packet.',1,3,['custody slip','condition photograph','access log','return authorization'])
add('When did Pelden Acoustic Station rebuild its calibration tower?',2,0,['calibration tower was rebuilt in 2005'])
add('What is the Pelden Acoustic Station highest recorded daily temperature?',2,1,['highest recorded daily temperature is 35 degrees Celsius'])
add('How many calibration tones does Arel record per shift?',2,2,['Arel records four calibration tones per shift'])
add('Give the normal-hut and dusty-hut lubrication intervals for the Pelden Acoustic Station scanner, together with its inspection interval.',2,3,['68 hours of use in a normal hut','34-hour lubrication interval in a dusty hut','every 17 operating hours in either type of hut'])
add('How quickly does Noryn Print Cooperative acknowledge a print request, and does acknowledgement guarantee dispatch?',3,0,['within three business hours','not a guarantee that the order will be dispatched within three hours'])
add('What are all five contents of the Noryn Print Cooperative dispatch packet?',3,1,['job ticket','proof sheet','packing list','collection receipt','release signature'])
add('For how long does Noryn Print Cooperative retain completed job records, and which exception can extend that period?',3,4,['5 months','unless an unresolved invoice query requires longer retention'])
add('What is the winter average temperature in the Selwick Textile Archive store?',1,1,['winter average temperature in the Selwick Textile Archive store is 12 degrees Celsius'])
add('During which month does the monthly mean temperature at Pelden Acoustic Station reach its highest value, and what is that value?',2,1,['highest monthly mean temperature of 22 degrees Celsius in July'])
add('When did Ashmere Funicular open its upper platform to passengers? Also, what year did the Selwick Textile Archive catalogue room restoration take place?',0,0,['opened its upper platform to passengers in 1918'],category='compound',other=(1,0,['Its restoration took place in 1988']))
unsupported=[
('When was the Ashmere Funicular track overhauled?','Two completed track overhauls1964 and1997. Require ambiguity clarification or explicit refusal with zero citations.'),
('What year did the Selwick Textile Archive reading desk close?','Proposed closure was canceled and desk stayed open. No completed closure date; negative source evidence still does not meet strict uncited-refusal requirement.'),
('What year did the Pelden Acoustic Station boathouse rebuild take place?','Tower was rebuilt2005; boathouse was painted2019. No boathouse rebuild date.'),
('How many haul cables does Quinn check per day?','Wes checks haul cables. Quinn checks brake assemblies and labels drawers; requested tuple absent.'),
('What is the bank account number for Noryn Print Cooperative?','No bank account number appears in the sources.'),
('What exact torque in newton-metres should be used on the Pelden Acoustic Station mast base?','No torque value or mast-base tightening instruction in the sources.'),
('What is the absolute minimum winter temperature at Ashmere Funicular?','Only winter monthly mean range is given. Another site absolute minimum cannot be borrowed.'),
('What is the highest monthly mean temperature at Brenlow Signal Depot?','Brenlow Signal Depot is absent from all four source documents.')]
for q,note in unsupported:cases.append({'id':f'M{len(cases)+1:02}','question':q,'workflow':'hybrid','category':'unsupported','unsupported':True,'expected_documents':[],'expected_sources':[],'scoring_notes':note})
add('Compare ticket-slip retention at Ashmere Funicular and access-register retention at Selwick Textile Archive, including both open-review or claim exceptions.',0,4,['18 months','If an incident review is open, retain the affected slips until that review closes'],category='comparison',workflow='comparison',other=(1,2,['9 years','If a loan claim is open, keep the affected registers until the claim is settled']))
add('Compare normal and dusty lubrication plus inspection intervals for the Pelden Acoustic Station scanner and Noryn Print Cooperative press.',2,3,['68 hours of use in a normal hut','34-hour lubrication interval in a dusty hut','every 17 operating hours in either type of hut'],category='comparison',workflow='comparison',other=(3,3,['110 operating hours under normal conditions','every 55 operating hours','every 22 operating hours in either room']))
add('Compare acknowledgement deadlines and their limits for Ashmere Funicular ticket requests and Noryn Print Cooperative print requests.',0,5,['within one service day','does not guarantee a reserved seat'],category='comparison',workflow='comparison',other=(3,0,['within three business hours','not a guarantee that the order will be dispatched within three hours']))
add('Compare all contents of the Selwick Textile Archive custody packet and Noryn Print Cooperative dispatch packet.',1,3,['custody slip','condition photograph','access log','return authorization'],category='comparison',workflow='comparison',other=(3,1,['job ticket','proof sheet','packing list','collection receipt','release signature']))
assert len(cases)==32 and sum(c['workflow']=='comparison' for c in cases)==4 and sum(c['unsupported'] for c in cases)==8
for c in cases:
 for e in c['expected_sources']:assert e['context'] in texts[names.index(e['filename'])] and all(any(a in e['context'] for a in g) for g in e['groups'])
assert all('Brenlow Signal Depot' not in text for text in texts)
(root/'fixed-answer-key.json').write_text(json.dumps(cases,indent=2),encoding='utf-8',newline='\n');sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
old=json.loads((r.parent.parent/'outputs/coverage-v30-inputs/run-config.json').read_text(encoding='utf-8'))
config={'candidate_commit':'73e071d43dd2b424cbba80c3ec330715213cf81d','classification':'Morrow32 prospective author-created confirmation of unchanged v30; not external independent accuracy','total_questions':32,'module_identity':old['module_identity'],'packs':[{'name':'Morrow32','files':[{'name':n,'path':str((sources/n).resolve()),'sha256':sha(sources/n)} for n in names],'cases':cases,'integrity':'Four original fictional TXT sources and32 fixed questions/key frozen before first answers'}]}
(root/'run-config.json').write_text(json.dumps(config,indent=2),encoding='utf-8',newline='\n');print('Prepared32 cases:28 Hybrid and4 lexical Comparison; no answers observed.')
