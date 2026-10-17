import test from 'node:test';import assert from 'node:assert/strict';
import * as current from '../eval/answer-completeness-v36/coverage.mjs';
import * as prior from '../eval/answer-completeness-v35/coverage.mjs';
import fs from 'node:fs';
const q='Compare normal and exception lubrication plus inspection intervals for Elm and Pine equipment.';
const normal='The Elm press needs lubrication every 96 operating hours under normal conditions.';
const exception='In a humid room, lubricate it every 48 operating hours.';
const inspection='Inspect the press every 24 operating hours regardless of room.';
const complete=[normal,exception,inspection].join(' ');
test('original immutable v34 probe retains the already complete selection',()=>{
 const probe=JSON.parse(fs.readFileSync(new URL('../docs/evidence/coverage-v34-r44/post-seal-engineering-probe.json',import.meta.url),'utf8'));
 assert.equal(probe.outcome,'FAIL');
 assert.equal(current.maintenancePrecisionQuote(probe.selected_quote,probe.source,probe.question),probe.expected_preserved);
 assert.equal(current.maintenancePrecisionQuote(probe.source,probe.source,probe.question),probe.expected_preserved);
});
test('synthetic engineering boundary controls are not model accuracy',()=>{
 assert.equal(current.CANDIDATE_ID,'coverage-v36-literal-boundaries-renewal');
 assert.equal(current.localMaintenanceComplete,prior.localMaintenanceComplete);
 for(const note of ['The cabinet was painted in 1806.','Staff eat lunch at noon.','A ledger was replaced in 1991.']){
  const source=complete+' '+note;
  assert.equal(current.maintenancePrecisionQuote(source,source,q),complete);
  assert.equal(current.maintenancePrecisionQuote(complete,source,q),complete);
  const prefixed=note+' '+complete+' '+note;
  assert.equal(current.maintenancePrecisionQuote(prefixed,prefixed,q),complete);
 }
});
test('complete quote preserved and partial evidence never assembled or expanded',()=>{
 assert.equal(current.maintenancePrecisionQuote(complete,complete,q),complete);
 assert.equal(current.maintenancePrecisionQuote(normal,complete,q),null);
 const gap=normal+' An unrelated alarm sounds. '+exception+' '+inspection;
 assert.equal(current.maintenancePrecisionQuote(gap,gap,q),null);
});
test('equipment mismatch negation extra maintenance and multiple intervals stay unmodified',()=>{
 for(const text of [complete.replace('Inspect the press','Inspect the lathe'),complete.replace('lubricate it','do not lubricate it'),complete+' Inspect the lathe every 9 hours.',complete+' '+complete,complete.replace('48 operating hours','48 operating hours or every 6 operating hours')])assert.equal(current.maintenancePrecisionQuote(text,text,q),null,text);
});
test('unique literal bounds and policy boundaries are enforced',()=>{
 assert.equal(current.maintenancePrecisionQuote(complete,complete+'\n\n'+complete,q),null);
 assert.equal(current.maintenancePrecisionQuote(complete.replace('96','97'),complete,q),null);
 const long=complete+' '+('A note. '.repeat(100));assert.equal(current.maintenancePrecisionQuote(long,long,q),null);
 const crossed=normal+'\nP-02. '+exception+' '+inspection;assert.equal(current.maintenancePrecisionQuote(crossed,crossed,q),null);
 for(const question of ['Compare costs.','What is normal lubrication?','How often should we inspect?'])assert.equal(current.maintenancePrecisionQuote(complete,complete,question),null);
});
test('varied equipment conditions and units retain exact contiguous offsets',()=>{
 for(const [equipment,condition,unit] of [['roller','cold chamber','service hours'],['hinge','windy bay','cycles']]){
  const text=`Lubricate the ${equipment} every 80 ${unit} under normal conditions. In a ${condition}, lubricate it every 40 ${unit}. Inspect the ${equipment} every 20 ${unit} in either bay.`;
  const source='A clock was installed. '+text+' A locker was moved.';
  assert.equal(current.maintenancePrecisionQuote(source,source,q),text);
 }
});
const packet='Each delivery packet must contain:\n- a receipt\n- a packing card\n- a release seal';
const pq='Compare every item in each delivery packet and field packet.';
test('bullet quotation stops after complete contiguous inventory before next policy',()=>{
 for(const tail of ['\nP-02.','\nP-02. Keep receipts for 8 months.','\nThe cabinet was painted.']){
  const source=packet+tail;assert.equal(current.packetPrecisionQuote(source,source,pq),packet);
 }
 assert.equal(current.packetPrecisionQuote(packet,packet,pq),packet);
});
test('interrupted second inventory duplicate nonliteral and oversized bullet anchors reject',()=>{
 for(const source of [packet+'\nNote\n- another requested item',packet+'\nThe field packet includes a map, card, and pen.',packet+'\n\n'+packet,packet.replace('must contain','must not contain'),packet+'\n'+('a'.repeat(700))])assert.equal(current.packetPrecisionQuote(source,source,pq),null);
 assert.equal(current.packetPrecisionQuote(packet,packet+'\n'+packet,pq),null);
 assert.equal(current.packetPrecisionQuote(packet+'!',packet,pq),null);
 assert.equal(current.packetPrecisionQuote(packet,packet,'Compare retention.'),null);
});
const dates='The first dome renewal was completed in 1842; the second dome renewal was completed in 1917.';
const sources=text=>[{filename:'01_Elm_Hall.txt',quote:text}];
test('same-object completed renewal dates require uncited ambiguity handling',()=>{
 assert.equal(current.renewalAmbiguous('When was the Elm Hall dome renewed?',sources(dates)),true);
 assert.equal(current.renewalAmbiguous('What year was the dome renewal completed?',sources(dates)),true);
 assert.equal(current.renewalAmbiguous('When was the Elm dome renewed?',sources(dates)),true);
});
test('ordinal all-date unrelated object entity and event families are preserved',()=>{
 for(const question of ['When was the second Elm Hall dome renewal completed?','What years were the Elm Hall dome renewals completed?','When were both dome renewals completed?','When was the Elm Hall door renewed?','When was the Pine Hall dome renewed?','When was Elm Hall restored?','What is a dome renewal?'])assert.equal(current.renewalAmbiguous(question,sources(dates)),false,question);
});
test('negative proposals one year and foreign event objects cannot create ambiguity',()=>{
 for(const text of [dates.replace('the second dome','the second door'),dates.replace('was completed in 1917','was proposed in 1917'),dates.replace('was completed in 1917','was not completed in 1917'),dates.replace('1917','1842'),dates.split(';')[0]+'.'])assert.equal(current.renewalAmbiguous('When was the Elm Hall dome renewed?',sources(text)),false,text);
});
