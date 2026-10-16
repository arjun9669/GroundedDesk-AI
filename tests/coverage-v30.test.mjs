import test from 'node:test';import assert from 'node:assert/strict';
import * as current from '../eval/answer-completeness-v30/coverage.mjs';
import * as hybrid29 from '../eval/answer-completeness-v29/coverage.mjs';
import {compareWithCoverage as previous} from '../eval/answer-completeness-v28/coverage.mjs';
const q='Compare retention durations and disposal exceptions.',quote='Keep permits for 7 years.',full=quote+' An open review suspends disposal until resolution.';
test('Hybrid function implementations and data extraction are exactly unchanged v29 exports',()=>{
 for(const name of ['answerWithCoverage','selectEvidence','literalSentences','buildBodyIndex','clauseRecords'])assert.equal(current[name],hybrid29[name],name);
 assert.equal(current.CANDIDATE_ID,'coverage-v30-comparison-boundaries');
});
test('already-complete quote preserved without Markdown heading or neighboring policies',()=>{
 const complete='Logs are retained for four years, unless a review is open.';
 assert.equal(current.comparisonParagraph(complete,'## Records\n'+complete,q),complete);
 assert.equal(current.comparisonParagraph(complete,'P-01. Other rule.\nP-02. '+complete+'\nP-03. Unrelated approval.',q),complete);
});
test('separate-sentence retention exception added within original body block',()=>{
 assert.equal(current.comparisonParagraph(quote,full,q),full);
 assert.equal(current.comparisonParagraph(quote,'## Records\n'+full,q),full);
});
test('single-newline policy labels are excluded and next policy cannot be borrowed',()=>{
 const source='A guide title\nR-01. Capacity is 31.\nR-02. '+full+'\nR-03. Other records use a different rule.';
 assert.equal(current.comparisonParagraph(quote,source,q),full);
 for(const b of current.literalComparisonBlocks(source))assert.equal(source.slice(b.start,b.end),b.value);
 assert.equal(current.comparisonParagraph(quote,'R-01. '+quote+'\nR-02. An open review suspends disposal.',q),null);
});
test('numbered-policy continuation lines remain contiguous literal text',()=>{
 const block=quote+'\nAn open review suspends disposal until resolution.';
 assert.equal(current.comparisonParagraph(quote,'2. '+block+'\n3. Other policy.',q),block);
});
test('Markdown headings and blank lines prevent borrowing another exception',()=>{
 for(const boundary of ['\n\n','\n## Exceptions\n'])assert.equal(current.comparisonParagraph(quote,quote+boundary+'An open review suspends disposal.',q),null);
});
test('nonliteral and repeated anchors cannot be expanded or verified as complete',()=>{
 assert.equal(current.comparisonParagraph('Keep permits for 8 years.',full,q),null);
 assert.equal(current.comparisonParagraph(quote,full+'\n\n'+full,q),null);
 assert.equal(current.comparisonParagraph(full,full+'\n\n'+full,q),null);
});
test('length caps and incomplete blocks retain prior rather than new unrelated content',()=>{
 assert.equal(current.comparisonParagraph(quote,quote+' '+('extra '.repeat(120))+' An open review suspends disposal.',q),null);
 assert.equal(current.comparisonParagraph(quote,quote+' Records are archived in room six.',q),null);
});
test('maintenance expands missing requested categories and preserves complete quote',()=>{
 const first='Lubricate the rig every 82 operating hours.',body=first+' In a dusty room use 41 hours. Inspect it every 20 hours.',mq='Compare normal and dusty lubrication and inspection intervals.';
 assert.equal(current.comparisonParagraph(first,body,mq),body);assert.equal(current.comparisonParagraph(body,'## Maintenance\n'+body,mq),body);
 assert.equal(current.comparisonParagraph(first,first+'\n\nInspect it every 20 hours.',mq),null);
});
test('acknowledgement limitation completes only its own selected source block',()=>{
 const ack='Acknowledge reservations within three service days.',body=ack+' This does not guarantee availability.',aq='Compare acknowledgement deadlines and limits.';
 assert.equal(current.comparisonParagraph(ack,body,aq),body);assert.equal(current.comparisonParagraph(body,'## Service\n'+body,aq),body);
 assert.equal(current.comparisonParagraph(ack,ack+'\n## Limits\nThis does not guarantee availability.',aq),null);
});
test('packets, unknown topics and deadlines alone remain unmodified',()=>{
 for(const question of ['Compare packet contents.','Compare costs.','Compare acknowledgement deadlines.'])assert.equal(current.comparisonParagraph(quote,full,question),null);
 const a={id:'a',name:'01_Elm.txt',text:'The packet contains a card, order and permit.'},b={id:'b',name:'02_Pine.txt',text:'The packet contains a list, license and receipt.'};
 assert.deepEqual(current.compareWithCoverage(a,b,'Compare packet contents.'),previous(a,b,'Compare packet contents.'));
});
test('wrapper preserves selected filenames and exact offsets when completing a missing exception',()=>{
 const a={id:'a',name:'01_Elm.txt',text:'Elm permits are kept for 7 years. An open review suspends disposal.'},b={id:'b',name:'02_Pine.txt',text:'Pine logs are kept for 5 years, unless a legal hold applies.\n\nOther policy.'};
 const r=current.compareWithCoverage(a,b,'Compare Elm permit and Pine log retention including disposal exceptions.');assert.equal(r.sources.length,2);
 for(const s of r.sources){const d=[a,b].find(d=>d.id===s.documentId);assert.equal(s.filename,d.name);assert.ok(d.text.includes(s.quote));assert.doesNotMatch(s.quote,/## Retention|P-0[12]/);}
 assert.match(r.answer,/open review/);assert.match(r.answer,/legal hold/);
});

test('an empty legacy selected quotation is not replaced with invented anchor text',()=>{
 const a={id:'a',name:'01_Elm.txt',text:'Elm permits are kept for 7 years. An open review suspends disposal.'},b={id:'b',name:'02_Pine.txt',text:'P-01. Pine logs are kept for 5 years, unless a legal hold applies.\nP-02. Other policy.'};
 const question='Compare permit and log retention including disposal exceptions.',old=previous(a,b,question),result=current.compareWithCoverage(a,b,question);
 assert.equal(old.sources[1].quote,'');assert.deepEqual(result.sources[1],old.sources[1]);assert.equal(current.comparisonParagraph('',b.text,question),null);
});
