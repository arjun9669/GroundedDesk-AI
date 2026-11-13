from pathlib import Path
import hashlib,json
old=Path('outputs/nextconfirm64-solo/v51-regression')
root=old.parent/'v51-firstlook'
pack=root/'eval/switchyard64'
(pack/'source_docs').mkdir(parents=True)
def put(p,data):
    p.write_bytes((json.dumps(data,ensure_ascii=False,indent=2)+'\n').encode())
def sha(b): return hashlib.sha256(b).hexdigest()
docs=[]; cases=[]; keys=[]; notes={}
def doc(name, paragraphs):
    index=len(docs)+1
    filename=f'{index:02d}_{name.replace(" ","_")}.txt'
    path=pack/'source_docs'/filename
    raw=('\n\n'.join(paragraphs)+'\n').encode()
    path.write_bytes(raw)
    docs.append(dict(id=f'D{index:02d}',name=filename,path=path.relative_to(root).as_posix(),bytes=len(raw),sha256=sha(raw)))
    return paragraphs
def evidence(i,context,*groups):
    return dict(filename=docs[i-1]['name'],context=context,groups=[[g] if isinstance(g,str) else g for g in groups])
def add(q,category,*sources,pair=None,reason=None):
    id=f'SW{len(cases)+1:02d}'
    assert bool(sources)!=bool(reason)
    row=dict(id=id,question=q,workflow='comparison' if pair else 'hybrid',category=category,selected_documents=[f'D{i:02d}' for i in (pair or range(1,9))])
    cases.append(row)
    keys.append(dict(**row,unsupported=not sources,expected_documents=[s['filename'] for s in sources],expected_sources=list(sources)))
    if reason: notes[id]=reason

a=doc('Orchid Weir Station',[
'The Orchid Weir Station uses a green depth wand for the visitor basin. Staff park the wand upright in the rubber sleeve beneath the eastern rail. The yellow measuring pole stays in a separate pump locker.',
'The visitor basin has a public capacity of 18 people, including the guide. Staff count observers standing inside the boundary.',
'Orchid Weir Station fitted the first bronze flow gate on 18 March 2011. The gate diagram was circulated on 9 June 2014.',
'The basin sampling slips are retained for 14 months. Slips attached to an unresolved algae claim are retained until that claim is settled.',
'At Orchid Weir Station, the rectangular dial above the launch hatch supplies the boarding reference and shows 08:14. A circular exhibit dial beside the model canal reads 08:09.',
'Orchid Weir Station retains repair invoices for three years. That schedule applies only to invoices.',
'At the Orchid Weir Station instrument room, the highest monthly mean temperature was 26 degrees Celsius in August.',
'The Orchid Weir Station passenger skiff has a 08:40 ticket cutoff. A passenger skiff departing before the cutoff must remain at the lower pier until 08:40.',
'Orchid Weir Station commissioned its second flood gate on 12 April 2016. The second visitor gate opened the following year.'])
add('At Orchid Weir Station, where should staff look for the green depth wand?','location',evidence(1,a[0],'green depth wand','rubber sleeve','eastern rail'))
add('Does the guide count toward the visitor basin limit at Orchid Weir Station, and what is the limit?','capacity',evidence(1,a[1],'18 people','including the guide'))
add('On which date did Orchid Weir Station fit its first bronze flow gate?','event',evidence(1,a[2],'first bronze flow gate','18 March 2011'))
add('At Orchid Weir Station, for how long are basin sampling slips kept, and what changes if an algae claim remains unresolved?','retention',evidence(1,a[3],'14 months','unresolved algae claim','until that claim is settled'))
add('Which dial gives the boarding time at Orchid Weir Station, and what does it read?','clock_role',evidence(1,a[4],'rectangular dial','boarding reference','08:14'))
add('Which shelf in the pump locker holds the green depth wand at Orchid Weir Station?','wrong_location',reason='The green wand is under the eastern rail. The pump locker holds the yellow pole.')
add('At Orchid Weir Station, how long do they keep the records?','ambiguous',reason='Slips and invoices have different periods; no record type is named.')

b=doc('Basalt Print Studio',[
'Basalt Print Studio stores the carved maple block on the middle shelf of the west drying cabinet. The maple handle stays in the drawer beneath the press.',
'The stencil demonstration runs for 34 minutes, including a five-minute ink rest. Cleaning is scheduled after the demonstration.',
'The guide to relief printing at Basalt Print Studio was written by Leena Dove and published on 7 February 2018. A trial leaflet dated 2016 was not the guide.',
'Basalt Print Studio purchases above 12,600 credits require written authorization from the Studio Keeper and the Ledger Clerk. Exactly 12,600 credits is outside this rule.',
'The inking bench has a red rubber mat because wet roller handles can slide on bare wood.',
'The instrument room at Basalt Print Studio reached its highest monthly mean temperature of 21 degrees Celsius in July.',
'Basalt Print Studio commissioned its second etching press on 9 September 2019. An older display press was donated in January.'])
add('Where in Basalt Print Studio is the carved maple block kept?','location',evidence(2,b[0],'carved maple block','middle shelf','west drying cabinet'))
add('How much time should a visitor allow for the full Basalt Print Studio stencil demonstration, including the ink rest?','duration',evidence(2,b[1],'34 minutes','five-minute ink rest'))
add('Who authored the Basalt Print Studio relief printing guide, and when did it come out?','publication',evidence(2,b[2],'Leena Dove','7 February 2018'))
add('Whose written authorization is required above 12,600 credits at Basalt Print Studio?','approval',evidence(2,b[3],'written authorization','Studio Keeper','Ledger Clerk'))
add('Why does the Basalt Print Studio inking bench have a red rubber mat?','causal',evidence(2,b[4],'wet roller handles','slide on bare wood'))
add('Who approves a purchase costing exactly 12,600 credits at Basalt Print Studio?','policy_boundary',reason='The sole rule expressly excludes equality.')
add('What wood species is the handle of the ink roller at Basalt Print Studio?','missing_property',reason='Maple applies to a block and separate handle; no material is assigned to the roller handle.')

c=doc('Cinder Kite School',[
'The lime tow strap at Cinder Kite School sits in a mesh sleeve beside the instructor stand. The spare orange strap is on the north rack.',
'Kite classes at Cinder Kite School admit 16 learners per group. The instructor and observer do not count toward the learner limit.',
'Cinder Kite School opened the indoor practice lane on 2 May 2015. The outdoor launch area opened on 12 July 2017.',
'Cinder Kite School keeps equipment issue logs for 19 months. If a loss claim is still open, retain the affected log until the claim closes.',
'Cinder Kite School uses a weighted corner on its field markers because the afternoon wind can fold loose corners over the lane numbers.',
'The practice hall at Cinder Kite School recorded its highest monthly mean temperature of 24 degrees Celsius. The log did not record a month.',
'Cinder Kite School commissioned its second wind gauge on 14 October 2016. The third practice lane was opened in May.'])
add('Where can an instructor retrieve the lime tow strap at Cinder Kite School?','location',evidence(3,c[0],'lime tow strap','mesh sleeve','instructor stand'))
add('How many learners can join one group at Cinder Kite School, and do the instructor and observer count?','capacity',evidence(3,c[1],'16 learners','instructor and observer do not count'))
add('What is the opening date for the outdoor launch area at Cinder Kite School?','event',evidence(3,c[2],'outdoor launch area','12 July 2017'))
add('What is the ordinary life of the Cinder Kite School equipment issue logs and when can a log held for an open loss claim be cleared?','retention',evidence(3,c[3],'19 months','loss claim is still open','until the claim closes'))
add('What problem do the weighted corners on Cinder Kite School field markers prevent?','causal',evidence(3,c[4],'afternoon wind','fold loose corners over the lane numbers'))
add('On which date did the launch facilities at Cinder Kite School open?','ambiguous',reason='The indoor practice lane and outdoor launch area have distinct dates; the collective phrase selects neither.')
add('Which north rack compartment contains the lime tow strap at Cinder Kite School?','wrong_location',reason='The lime strap is in the mesh sleeve; the north rack holds the orange strap.')

d=doc('Flax Loom Annex',[
'Flax Loom Annex keeps its ivory reed comb on a peg inside the side cupboard. The brass threading hook lies on the cutting bench.',
'The weaving clinic lasts 42 minutes, which includes a seven-minute loom reset. Visitors can watch the reset from the side aisle.',
'The first spring shuttle at Flax Loom Annex was fitted by Eris Vale on 13 November 2014. The display label was printed in May 2016.',
'Flax Loom Annex loans above 38 sample panels need written approval from the Textile Lead and the Floor Manager. The rule does not cover tool loans.',
'Blue felt lines the shuttle tray because a hard tray can chip the lacquered tips during sorting.',
'The Flax Loom Annex practice hall recorded a highest monthly mean of 20 degrees Celsius in June.',
'Flax Loom Annex commissioned its second yarn winder on 20 May 2020. The only automatic warping frame entered service in 2012.'])
add('Where is the ivory reed comb stored at Flax Loom Annex?','location',evidence(4,d[0],'ivory reed comb','peg','side cupboard'))
add('What is the total clinic duration at Flax Loom Annex, and how much of it is the loom reset?','duration',evidence(4,d[1],'42 minutes','seven-minute loom reset'))
add('Who fitted the first spring shuttle at Flax Loom Annex and on what date?','event',evidence(4,d[2],'Eris Vale','13 November 2014'))
add('Which two people must provide written approval for a 40-panel loan at Flax Loom Annex?','approval',evidence(4,d[3],'written approval','Textile Lead','Floor Manager'))
add('Why is there blue felt in the Flax Loom Annex shuttle tray?','causal',evidence(4,d[4],'chip the lacquered tips','during sorting'))
add('Which two people approve borrowing 40 threading hooks from Flax Loom Annex?','wrong_subject',reason='The rule is for sample panels and explicitly excludes tool loans.')
add('How long does it take Flax Loom Annex to reset the automatic warping frame?','wrong_subject',reason='The seven-minute reset is for the clinic loom; no reset duration is given for the frame.')

e=doc('Juniper Tram Shed',[
'Juniper Tram Shed keeps the amber service token in a cork tray inside the dispatch hatch. The metal tray in the visitor alcove holds blank reproductions.',
'The public inspection platform at Juniper Tram Shed admits up to 25 visitors. Staff stay outside the counted area.',
'Juniper Tram Shed uses a square clock on the dispatch wall for passenger ticket reference. It shows 11:03. The exhibition clock below the line map reads 11:01.',
'Juniper Tram Shed retains dispatch journals for 22 months. When a transfer appeal remains open, keep the affected journal until the appeal closes.',
'Juniper Tram Shed mounted its first side lantern on 2 September 2009. A photograph of the lamp appeared in the annual leaflet in 2012.',
'The Juniper Tram Shed passenger tram has a 11:28 ticket cutoff. A passenger tram leaving before the cutoff must hold at the covered stop until 11:28.',
'The Juniper Tram Shed maintenance trolley has a 13:10 ticket cutoff. A maintenance trolley leaving before cutoff must wait at the service ramp until 13:10.'])
add('Where is the amber service token kept inside Juniper Tram Shed?','location',evidence(5,e[0],'amber service token','cork tray','dispatch hatch'))
add('What is the visitor capacity of the inspection platform at Juniper Tram Shed?','capacity',evidence(5,e[1],'25 visitors'))
add('Which timepiece sets passenger ticket time at Juniper Tram Shed, and what is the reading?','clock_role',evidence(5,e[2],'square clock','11:03'))
add('What is the Juniper Tram Shed rule for keeping dispatch journals, both normally and during an open transfer appeal?','retention',evidence(5,e[3],'22 months','transfer appeal remains open','until the appeal closes'))
add('When was the first side lantern mounted at Juniper Tram Shed?','event',evidence(5,e[4],'2 September 2009'))
add('At Juniper Tram Shed, what time is on the clock?','ambiguous',reason='Dispatch and exhibition clocks have different readings.')
add('Which tray in the visitor alcove contains the amber service token at Juniper Tram Shed?','wrong_location',reason='The visitor tray contains blank reproductions. The token is at dispatch.')

f=doc('Larch Rope Centre',[
'Larch Rope Centre puts the blue tension ring in a felt pocket on the east frame. The aluminium hoop is hung from the west frame.',
'The rope handling session at Larch Rope Centre takes 53 minutes with an eight-minute inspection break. The break is part of the session.',
'Larch Rope Centre issued its first illustrated knot handbook on 11 January 2017. It was written by Nera Quill.',
'Larch Rope Centre purchase orders above 9,300 credits require written authorization from both the Safety Coordinator and the Cash Custodian. No policy is stated for lower amounts.',
'The racks have wide hooks so that heavy ropes do not develop sharply bent fibres during storage.',
'Larch Rope Centre commissioned its second capstan on 3 October 2018. The first anchor winch was commissioned in June 2019. There is one winch in the inventory.'])
add('In which pocket is the blue tension ring stored at Larch Rope Centre?','location',evidence(6,f[0],'felt pocket','east frame'))
add('How long is the Larch Rope Centre handling session and the inspection break within it?','duration',evidence(6,f[1],'53 minutes','eight-minute inspection break'))
add('Who wrote the first illustrated knot handbook at Larch Rope Centre, and when was it issued?','publication',evidence(6,f[2],'Nera Quill','11 January 2017'))
add('Which officials sign off in writing for Larch Rope Centre purchase orders over 9,300 credits?','approval',evidence(6,f[3],'written authorization','Safety Coordinator','Cash Custodian'))
add('Why are the rope rack hooks wide at Larch Rope Centre?','causal',evidence(6,f[4],'sharply bent fibres','during storage'))
add('What approval does Larch Rope Centre require for a purchase order worth 9,000 credits?','policy_boundary',reason='Above-9,300 rule does not cover 9,000.')
add('What is the breaking strength of the blue tension ring at Larch Rope Centre?','missing_property',reason='Storage is the only documented ring property other than colour.')

g=doc('Mica Glass Workshop',[
'The pink calibration bead at Mica Glass Workshop sits in the first tray of the annealing cabinet. Clear demonstration beads are displayed at the entrance.',
'Mica Glass Workshop admits 12 participants to a casting lesson. Two staff demonstrators are additional to the participant limit.',
'At Mica Glass Workshop, Orin Fern mounted the first heat shield on 7 August 2010. The third heat shield was fitted on 8 October 2019.',
'Mica Glass Workshop retains furnace checklists for 29 months. If a temperature dispute is open, retain the affected checklist until the dispute is resolved.',
'The workshop uses a narrow hood over the scoring table because upward reflections can obscure the etched marks on the glass.',
'Mica Glass Workshop recorded its highest monthly mean temperature as 28 degrees Celsius in September. The log identifies no room or cabinet.',
'The Mica Glass Workshop dispatch cart has a 10:55 ticket cutoff. A dispatch cart departing before that cutoff must wait beside the scale until 10:55.'])
add('Where in Mica Glass Workshop should staff find the pink calibration bead?','location',evidence(7,g[0],'first tray','annealing cabinet'))
add('How many participants may attend Mica Glass Workshop casting lessons, and are staff counted in that cap?','capacity',evidence(7,g[1],'12 participants','additional to the participant limit'))
add('Who mounted the original heat shield at Mica Glass Workshop, and on what date?','event',evidence(7,g[2],'Orin Fern','first heat shield','7 August 2010'))
add('How long does Mica Glass Workshop retain furnace checklists, including the rule for an open temperature dispute?','retention',evidence(7,g[3],'29 months','temperature dispute is open','until the dispute is resolved'))
add('Why is the hood fitted above the scoring table at Mica Glass Workshop?','causal',evidence(7,g[4],'upward reflections','obscure the etched marks'))
add('Where at the entrance to Mica Glass Workshop is the pink calibration bead displayed?','wrong_location',reason='The pink bead is in the annealing cabinet. Clear demonstration beads are at the entrance.')
add('What furnace temperature caused the most recent dispute at Mica Glass Workshop?','missing_property',reason='Only a retention rule and unrelated monthly log appear; no incident temperature or most recent dispute is documented.')

h=doc('Saffron Signal Pier',[
'Saffron Signal Pier keeps the white message paddle in a wooden rack beside the pilot stairs. The blue paddle is stored in the booking office.',
'The signal briefing at Saffron Signal Pier lasts 31 minutes, including a four-minute lantern check.',
'The first storm lamp at Saffron Signal Pier was restored by Tessa Glen on 16 June 2015. The leaflet was published a year later.',
'Saffron Signal Pier retains passenger tallies for 15 months. Tallies cited in an unresolved landing claim remain on file until the claim is settled.',
'The Saffron Signal Pier passenger punt has a 12:15 ticket cutoff. A passenger punt departing before cutoff must stay at the outer landing until 12:15.',
'The Saffron Signal Pier cargo punt has a 14:25 ticket cutoff and a planned departure at 14:10. Its notice is silent about early-departure holds.',
'The cargo store at Saffron Signal Pier reached its highest monthly mean temperature of 19 degrees Celsius in November. The outdoor quay has a separate log.'])
add('Where would a pilot look for the white message paddle at Saffron Signal Pier?','location',evidence(8,h[0],'wooden rack','pilot stairs'))
add('What is the full briefing length at Saffron Signal Pier, including the time for the lantern check?','duration',evidence(8,h[1],'31 minutes','four-minute lantern check'))
add('Who restored the first storm lamp at Saffron Signal Pier and when?','event',evidence(8,h[2],'Tessa Glen','16 June 2015'))
add('How long are Saffron Signal Pier passenger tallies kept when there is no claim, and what happens if a landing claim is unresolved?','retention',evidence(8,h[3],'15 months','unresolved landing claim','until the claim is settled'))
add('For a passenger punt leaving early at Saffron Signal Pier, where is it held and until what time?','departure',evidence(8,h[4],'outer landing','until 12:15'))
add('Where does the cargo punt wait when it departs early from Saffron Signal Pier?','wrong_subject',reason='Only the passenger punt has an explicit hold; cargo notice is silent.')
add('What is the emergency channel on the Saffron Signal Pier handheld radio?','missing_property',reason='No handheld radio or emergency channel is documented in the selected corpus.')

add('For the instrument rooms at Orchid Weir Station and Basalt Print Studio, what was each peak monthly mean temperature and in which month?','monthly_comparison',evidence(1,a[6],'instrument room','26 degrees Celsius','August'),evidence(2,b[5],'instrument room','21 degrees Celsius','July'),pair=(1,2))
add('When did Orchid Weir Station commission its second flood gate, and when did Basalt Print Studio commission its second etching press?','event_comparison',evidence(1,a[8],'second flood gate','12 April 2016'),evidence(2,b[6],'second etching press','9 September 2019'),pair=(1,2))
add('Compare passenger ticket cutoffs and required early holds for the skiff at Orchid Weir Station and the tram at Juniper Tram Shed.','hold_comparison',evidence(1,a[7],'08:40 ticket cutoff','lower pier until 08:40'),evidence(5,e[5],'11:28 ticket cutoff','covered stop until 11:28'),pair=(1,5))
add('Compare how long Juniper Tram Shed keeps dispatch journals and Saffron Signal Pier keeps passenger tallies, including both extension rules.','retention_comparison',evidence(5,e[3],'22 months','transfer appeal remains open','until the appeal closes'),evidence(8,h[3],'15 months','unresolved landing claim','until the claim is settled'),pair=(5,8))
add('Which months saw the highest monthly mean temperatures in the practice halls at Cinder Kite School and Flax Loom Annex, and what were the values?','missing_month',pair=(3,4),reason='Flax gives June and 20 Celsius. Cinder gives 24 Celsius without a month.')
add('Give the month and value of each highest monthly mean temperature in the instrument rooms at Orchid Weir Station and Mica Glass Workshop.','missing_location',pair=(1,7),reason='Orchid identifies the room. Mica supplies a peak and month without attributing them to any room.')
add('Compare the dates when Cinder Kite School commissioned its second wind gauge and Larch Rope Centre commissioned its second anchor winch.','missing_ordinal',pair=(3,6),reason='Cinder has the second gauge date. Larch documents only one anchor winch.')
add('Compare the ticket cutoff and mandatory early-departure hold for the maintenance trolley at Juniper Tram Shed and the cargo punt at Saffron Signal Pier.','missing_hold',pair=(5,8),reason='Both cutoffs are stated. Only Juniper documents a hold for the specified vehicle.')

assert len(docs)==8 and len(cases)==64 and len(notes)==20
assert len({row['question'] for row in cases})==64
for row in keys:
    for item in row['expected_sources']:
        source=next(d for d in docs if d['name']==item['filename'])
        assert source['id'] in row['selected_documents']
        assert (root/source['path']).read_text(encoding='utf-8').split('\n\n').count(item['context'])==1 or item['context']+'\n'==(root/source['path']).read_text(encoding='utf-8').split('\n\n')[-1]
        assert all(any(s in item['context'] for s in group) for group in item['groups'])
put(pack/'sources.json',docs);put(pack/'cases.json',cases);put(pack/'answer-key.json',keys);put(pack/'absence-rationales.json',notes)
paths=(old/'module-paths.txt').read_text().splitlines()
for name in paths+['preflight.json']:
    target=root/name
    target.parent.mkdir(parents=True,exist_ok=True)
    target.write_bytes((old/name).read_bytes())
(root/'module-paths.txt').write_bytes((old/'module-paths.txt').read_bytes())
runner=(old/'run.mjs').read_text().replace('eval/nextconfirm64','eval/switchyard64').replace('Author-aware exposed v51 regression','Author-aware v51 Switchyard64 first look')
(root/'run.mjs').write_bytes(runner.encode())
(root/'PROTOCOL.md').write_bytes(b'''# Switchyard64 author-aware first look

Candidate: unchanged coverage-v51-scoped-evidence, published at 1d6a69172a15cd05d1de167fd00d005148f92efe. The benchmark author had access to previous v51 results and code. Sources and questions are new, authored without candidate or model calls on the pack. This engineering result does not meet the independent release-review gate.

Freeze eight original fictional documents, exact case order, questions, selected files, key, absence rationales, runtime receipt and runner before capture. Run 56 Hybrid questions against both fixed and section indexes, plus eight separate lexical Comparison questions once, for 120 measured outputs. Use installed Windows Chrome, actual MiniLM q8/WASM and no Qwen. This runs the isolated candidate browser module, outside the live application UI.

Use unchanged native gradeAnswer and the v50 source and cosine audits. Score displayed quotes. Supported cases must match all key groups, source provenance and citation relevance. Unsupported cases need a recognized explicit refusal and zero citations. The engineering target is 64 native PASS per index, zero false acceptances and refusals and no unresolved integrity errors. Keep the exact outputs and screenshots once and seal them before scoring. Keep old results and 6.0 release gates on record.
''')
files=sorted(x for x in root.rglob('*') if x.is_file())
put(root/'execution-freeze.json',{'classification':'Author-aware first look','before_questions':True,'candidate_commit':'1d6a69172a15cd05d1de167fd00d005148f92efe','files':[{'file':x.relative_to(root).as_posix(),'sha256':sha(x.read_bytes())} for x in files]})
print(f'Frozen {len(files)} files. 64 cases, 44 supported and 20 unsupported.')
