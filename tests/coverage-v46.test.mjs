import test from 'node:test';
import assert from 'node:assert/strict';
import * as current from '../eval/answer-completeness-v46/coverage.mjs';
import * as previous from '../eval/answer-completeness-v45/coverage.mjs';
const a=text=>({id:'river',name:'01_River_Hall.txt',text});
const b=text=>({id:'hill',name:'02_Hill_Hall.txt',text});
const eventQ='Compare warehouse relocation years for River Hall and Hill Hall.';
const monthlyQ='Compare the highest monthly mean temperatures and months for River Hall and Hill Hall.';
const clockQ='Compare departure cutoffs, departure days and holds for River Hall and Hill Hall.';
const eventA='The River Hall warehouse was moved in 1947.';
const eventB='The Hill Hall warehouse was relocated in 2012.';
const monthlyA='The highest monthly mean temperature is 26 degrees Celsius in June.';
const monthlyB='The Hill Hall highest monthly mean temperature is in August at 28 degrees Celsius.';
const clock=(t='14:35')=>`Before ${t}, departure is the same operating day, unless a wind hold is active. At or after ${t}, departure is the next operating day, unless a rain hold remains active.`;
function supported(result,docs){
 assert.equal(result.answered,true);assert.equal(result.comparison_contract.status,'supported');assert.equal(result.kind,'comparison');assert.equal(result.sources.length,2);
 result.sources.forEach((s,i)=>{
  const doc=docs[i],text=doc.text.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
  assert.equal(s.citation,i+1);assert.equal(s.documentId,doc.id);assert.equal(s.filename,doc.name);assert.equal(s.supported,true);
  assert.equal(text.slice(s.start,s.end),s.quote);assert.equal(s.quote,s.excerpt);assert.ok(s.quote.length<=620);
  assert.equal('actualCosine' in s,false);assert.equal('cosineAnchor' in s,false);
 });return result;
}
function refused(result){assert.equal(result.answered,false);assert.deepEqual(result.sources,[]);assert.equal(result.comparison_contract.status,'incomplete');}
test('Ask, clock, Stage A/B and body helpers stay exact v45 exports',()=>{
 assert.equal(current.CANDIDATE_ID,'coverage-v46-comparison-relations');
 for(const name of ['answerWithCoverage','planClockRequest','planSafetyRequest','planRelationRequest','bindFacetSource','buildBodyIndex'])assert.equal(current[name],previous[name],name);
});
test('event object/date selected independently on both sides ahead of lexical distractors',()=>{
 const left=a('The dispatch counter moved in 1838. '+eventA),right=b('The dispatch counter moved in 1869. '+eventB);
 const r=supported(current.compareWithCoverage(left,right,eventQ),[left,right]);assert.equal(r.sources[0].quote,eventA);assert.equal(r.sources[1].quote,eventB);
});
test('one-sided event absence wrong object and different event all refuse',()=>{
 for(const text of ['The dispatch counter was moved in 1947.','The warehouse restoration was completed in 1947.','The warehouse has a large door.',''])refused(current.compareWithCoverage(a(eventA),b(text),eventQ));
});
test('event negation proposals qualifiers and conflicting years refuse',()=>{
 for(const text of [eventB.replace('was relocated','was not relocated'),eventB.replace('was relocated','was proposed to be relocated'),eventB.replace('2012','2012 or 2013'),eventB+' The Hill Hall warehouse was moved in 1988.'])refused(current.compareWithCoverage(a(eventA),b(text),eventQ));
});
test('foreign named event cannot satisfy the selected filename',()=>{
 refused(current.compareWithCoverage(a(eventA),b(eventA),eventQ));
});
test('explicit pair must match both selected entities without aliases',()=>{
 for(const q of [eventQ.replace('Hill Hall','Mist Hall'),eventQ.replace('River Hall','River'),eventQ.replace('Hill Hall','River Hall'),eventQ.replace('Hill Hall','Hill Hall and permit costs')])refused(current.compareWithCoverage(a(eventA),b(eventB),q));
});
test('input pair and citation order are preserved even if question lists names in reverse',()=>{
 const left=b(eventB),right=a(eventA);supported(current.compareWithCoverage(left,right,eventQ),[left,right]);
});
test('bounded ordinal and completion-noun event grammar binds correct date',()=>{
 const q='Compare second roof restoration dates for River Hall and Hill Hall.';
 const left=a('The first roof restoration was completed in 1908. The second roof restoration was completed in 1983.');
 const right=b('The second roof restoration was completed in 2009.');
 const r=supported(current.compareWithCoverage(left,right,q),[left,right]);assert.match(r.sources[0].quote,/1983/);assert.doesNotMatch(r.sources[0].quote,/1908/);
 refused(current.compareWithCoverage(left,b('The first roof restoration was completed in 2009.'),q));
});
test('nonordinal multiple event dates refuse without inferring most recent',()=>{
 refused(current.compareWithCoverage(a(eventA+' The warehouse moved in 1981.'),b(eventB),eventQ));
});
test('monthly metric and month bind on each side without winter/daily substitution',()=>{
 const left=a('The winter average temperature is 9 degrees Celsius. '+monthlyA),right=b('The highest recorded daily temperature is 41 degrees Celsius. '+monthlyB);
 const r=supported(current.compareWithCoverage(left,right,monthlyQ),[left,right]);assert.equal(r.sources[0].quote,monthlyA);assert.equal(r.sources[1].quote,monthlyB);
});
test('monthly missing month wrong metric negation foreign entity and extra value refuse',()=>{
 for(const text of [monthlyB.replace(' in August',''),monthlyB.replace('monthly mean','winter average'),monthlyB.replace(' is ',' is not '),monthlyB.replace('Hill Hall','River Hall'),monthlyB+' '+monthlyB.replace('28','29')])refused(current.compareWithCoverage(a(monthlyA),b(text),monthlyQ));
});
test('mean and average labels remain distinct rather than accepting metric overlap',()=>{
 refused(current.compareWithCoverage(a(monthlyA),b(monthlyB.replace('mean','average')),monthlyQ));
 const q=monthlyQ.replace('mean','average'),left=a(monthlyA.replace('mean','average')),right=b(monthlyB.replace('mean','average'));supported(current.compareWithCoverage(left,right,q),[left,right]);
});
test('signed monthly values and Fahrenheit remain literal',()=>{
 const left=a(monthlyA.replace('26 degrees Celsius','minus 3 degrees Fahrenheit')),right=b(monthlyB.replace('28 degrees Celsius','−2.5 °C'));
 supported(current.compareWithCoverage(left,right,monthlyQ),[left,right]);
});
test('cutoff same-day next-day and complete hold branches remain contiguous',()=>{
 const left=a(clock()),right=b(clock('09:45'));const r=supported(current.compareWithCoverage(left,right,clockQ),[left,right]);assert.equal(r.sources[0].quote,clock());assert.match(r.sources[1].quote,/09:45/);
});
test('alternate inclusive cutoff wording preserves equality semantics',()=>{
 const left=a(clock()),right=b(clock('09:45').replace('At or after 09:45','At 09:45 or later'));supported(current.compareWithCoverage(left,right,clockQ),[left,right]);
});
test('missing hold or missing day branch cannot earn complete comparison',()=>{
 for(const text of [clock().split('. ')[0]+'.',clock().replace(', unless a rain hold remains active',''),clock().replace('next operating day','three hours'),clock().replace('is active','is not active')])refused(current.compareWithCoverage(a(clock()),b(text),clockQ));
});
test('cutoff mismatch strict-above rule and day-unit mismatch refuse',()=>{
 for(const text of [clock().replace('At or after 14:35','At or after 14:36'),clock().replace('At or after','After'),clock().replace('next operating day','next service day')])refused(current.compareWithCoverage(a(clock()),b(text),clockQ));
});
test('clock branches cannot cross paragraph headings or policy labels',()=>{
 for(const gap of ['\n\n','\n## Other policy\n','\nP-02. '])refused(current.compareWithCoverage(a(clock()),b(clock().replace('. At','. '+gap+'At')),clockQ));
});
test('a duplicate or competing cutoff rule refuses rather than cherry-picking',()=>{
 for(const text of [clock()+' '+clock(),clock()+' Before 14:30, departure is the same operating day, unless a storm hold is active.'])refused(current.compareWithCoverage(a(clock()),b(text),clockQ));
});
test('owned incomplete questions and additional facets refuse instead of dropping facets',()=>{
 for(const q of [monthlyQ.replace(' and months',''),monthlyQ.replace(' and months',' and months and winter minima'),clockQ.replace(' and holds',''),eventQ.replace(' years',' years and approvers'),eventQ.replace(' for River Hall and Hill Hall','')])refused(current.compareWithCoverage(a(eventA),b(eventB),q));
});
test('duplicate quote locations and long event spans cannot establish bounded support',()=>{
 refused(current.compareWithCoverage(a(eventA),b(eventB+'\n\n'+eventB),eventQ));
 const long=clock().replace('wind hold',('x'.repeat(600))+' hold');
 assert.ok(long.length>620);refused(current.compareWithCoverage(a(clock()),b(long),clockQ));
});
test('normalized CRLF whitespace and policy labels have exact normalized offsets',()=>{
 const left=a('## History\r\nP-01. The  River Hall warehouse was moved in 1947.\r\nP-02. A room was painted.'),right=b(eventB);
 supported(current.compareWithCoverage(left,right,eventQ),[left,right]);
});
test('invalid identity text metadata and oversized bodies remain engineering errors',()=>{
 for(const [left,right] of [[a(eventA),{...b(eventB),id:'river'}],[a(eventA),{...b(eventB),text:null}],[a(eventA),{...b(eventB),name:''}],[a(eventA),{...b(eventB),text:'x'.repeat(180001)}],[a(eventA),{...b(eventB),name:'02_River_Hall.txt'}]])assert.throws(()=>current.compareWithCoverage(left,right,eventQ),/document|identit|Comparison/i);
 assert.throws(()=>current.planComparisonRequest(null),/text/);
});
test('preserved retention maintenance acknowledgement packet capacity and unknown paths',()=>{
 const left=a('River Hall logs are kept for 8 months, unless a legal hold applies. The packet contains a card and seal.'),right=b('Hill Hall logs are kept for 9 months, unless a review is open. The packet contains a slip and tag.');
 for(const q of ['Compare retention durations and disposal exceptions.','Compare normal and dusty lubrication and inspection intervals.','Compare acknowledgement deadlines and limits.','Compare packet contents.','Compare seating capacities.','Compare costs.','']){
  assert.equal(current.planComparisonRequest(q).status,'outside_scope');assert.deepEqual(current.compareWithCoverage(left,right,q),previous.compareWithCoverage(left,right,q));
 }
});
