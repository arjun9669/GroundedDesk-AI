// Independent invented fixtures; synthetic metadata only, no frozen-case replay.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as current from '../eval/answer-completeness-v50/coverage.mjs';
import * as previous from '../eval/answer-completeness-v49/coverage.mjs';
const entity='Copperline Freight Hall';
const body=(text,name='01_Copperline_Freight_Hall_Current.md',id='current')=>({id:id+'-body',documentId:id,filename:name,sourceText:text,content:text,start:0,actualCosine:.59});
const policy=(days=137)=>`Copperline dispatch records are retained for ${days} days. Records under an unresolved carriage claim are kept until the claim closes.`;
const rows=()=>[body(policy()),body(policy(61),'02_Copperline_Freight_Hall_Archived.md','archived')];
const question=(name='current Copperline')=>`How long are ${name} dispatch records retained, including the unresolved-claim exception?`;
const run=(q,rs=rows())=>current.answerWithCoverage(q,[],3,undefined,{bodyEvidenceCandidates:rs});
function supported(r,rs,contains){assert.equal(r.answered,true);assert.equal(r.sources.length,1);const s=r.sources[0],b=rs.find(x=>x.documentId===s.documentId);assert.ok(b);assert.equal(b.filename,s.filename);assert.equal(s.citation,1);assert.equal(b.sourceText.slice(s.start,s.end),s.quote);assert.equal(r.answer,'[1] '+s.quote);assert.equal(s.actualCosine,b.actualCosine);assert.equal(s.cosineAnchor.actualCosine,b.actualCosine);assert.ok(s.quote.includes(contains));}
function refused(r){assert.equal(r.answered,false);assert.deepEqual(r.sources,[]);assert.equal(r.retention_contract.status,'unsupported');}
const reviewText=(base='37 days',tail='37-day')=>`At Verdant Instrument Archive, imprint cards are kept for ${base}. If a correction review is open, retain the affected cards until the review is closed, even after the ${tail} period.`;
const reviewQuestion='How long are imprint cards retained at Verdant Instrument Archive, including the open-review exception?';
const reviewRows=text=>[body(text,'01_Distant_Reference.md','review')];
test('v50 isolated routing retains exact Comparison, clock, minimum, approval and provenance helpers',()=>{
 assert.equal(current.CANDIDATE_ID,'coverage-v50-versioned-retention');
 for(const name of ['compareWithCoverage','planClockRequest','planMinimumRequest','planApprovalRequest','planComparisonRequest','bindFacetSource','buildBodyIndex'])assert.equal(current[name],previous[name]);
 for(const name of ['app.mjs','retrieval.mjs','hybrid.mjs','semantic.mjs'])assert.ok(!fs.readFileSync(new URL('../'+name,import.meta.url),'utf8').includes('answer-completeness-v50'));
});
test('current prefix resolves its own filename version without borrowing archived policy',()=>{const rs=rows();supported(run(question(),rs),rs,'137 days');});
test('archived prefix selects the archived owner while an unqualified alias stays ambiguous',()=>{const rs=rows();supported(run(question('archived Copperline'),rs),rs,'61 days');refused(run(question('Copperline'),rs));});
test('full entity and explicit at/in version positions retain exact record subtype',()=>{
 const rs=rows();for(const q of [question('current '+entity),`How long are dispatch records retained at current ${entity}, including the exception?`,`How long are dispatch records at current ${entity} retained, including the exception?`])supported(run(q,rs),rs,'137 days');
 refused(run(question('current Copperline visitor'),rs));
});
test('full canonical filename entity remains usable in question and source',()=>{
 const text=`${entity} Current dispatch records are retained for 137 days. Records under an unresolved carriage claim are kept until the claim closes.`,rs=[body(text)];supported(run(question(entity+' Current'),rs),rs,'137 days');
});
test('version labels need declared filename roles rather than generic recency guesses',()=>{
 const rs=[body(policy(),'01_Copperline_Freight_Hall.md')];refused(run(question(),rs));refused(run(question('latest Copperline'),rs));refused(run(question('old Copperline'),rs));
});
test('duplicate current owners and competing current namespaces refuse',()=>{
 refused(run(question(),[...rows(),body(policy(),'03_Copperline_Freight_Hall_Current.md','duplicate')]));
 refused(run(question(),[...rows(),body('Copperline dispatch records are retained for 88 days.','03_Copperline_Tool_Hall_Current.md','other')]));
});
test('a foreign exact entity cannot be replaced by a versioned prefix alias',()=>{
 const rs=[...rows(),body('Copperline dispatch records are retained for 88 days.','03_Copperline.md','foreign')];refused(run(question(),rs));
});
test('explicit archived source in a current file cannot confer current policy authority',()=>{
 const rs=[body('Archived Copperline dispatch records are retained for 137 days. Records under an unresolved carriage claim are kept until the claim closes.'),rows()[1]];refused(run(question(),rs));
});
test('contradictory current filename and archived title refuse',()=>{
 const rs=[body('# Copperline Freight Hall — Archived Guide\n\n'+policy()),rows()[1]];refused(run(question(),rs));
});
test('matching title corroborates version role without becoming an arbitrary entity alias',()=>{
 const rs=[body('# Copperline Freight Hall — Current Guide\n\n'+policy()),rows()[1]];supported(run(question(),rs),rs,'137 days');refused(run(question('current Guide'),rs));
});
test('body-declared root within a versioned filename remains bound to its own role',()=>{
 const cur='At Copperline Freight Hall, dispatch records are kept for 137 days. Records under an unresolved carriage claim are kept until the claim closes.',old=cur.replace('137','61');
 const rs=[body(cur),body(old,'02_Copperline_Freight_Hall_Archived.md','archived')];supported(run(question(),rs),rs,'137 days');supported(run(question('archived Copperline'),rs),rs,'61 days');
});
test('unrelated source introduction cannot donate a versioned filename scope',()=>{
 const rs=[body('At Marigold Tool Room, dispatch records are kept for 137 days. Records under an unresolved carriage claim are kept until the claim closes.'),rows()[1]];refused(run(question(),rs));
});
test('hyphenated review period retains full original condition and source bytes',()=>{
 const text=reviewText(),rs=reviewRows(text);supported(run(reviewQuestion,rs),rs,'even after the 37-day period.');assert.equal(run(reviewQuestion,rs).sources[0].quote,text);
});
test('Unicode hyphens and original space-separated descriptors have the same bounded meaning',()=>{
 for(const value of ['37‐day','37‑day','37 day']){const text=reviewText('37 days',value),rs=reviewRows(text);supported(run(reviewQuestion,rs),rs,value);}
});
test('month year week and number-word periods compare to their own base quantity/unit',()=>{
 for(const [base,tail] of [['six weeks','six-week'],['11 months','11-month'],['two years','two-year'],['3.5 days','3.5-day']]){const text=reviewText(base,tail),rs=reviewRows(text);supported(run(reviewQuestion,rs),rs,tail);}
});
test('mismatched amount unit or business-day qualifier refuses without conversions',()=>{
 for(const [base,tail] of [['37 days','38-day'],['37 days','37-week'],['37 business days','37-day'],['37 days','1.233-month']])refused(run(reviewQuestion,reviewRows(reviewText(base,tail))));
});
test('unparsed extra review tails and wrong reference nouns remain unsupported',()=>{
 for(const text of [reviewText().replace('period.','period and discard them.'),reviewText().replace('the review is closed','the claim is closed'),reviewText().replace('retain the affected cards','retain the affected logs'),reviewText().replace('review is open','review is not open')])refused(run(reviewQuestion,reviewRows(text)));
});
test('review condition cannot cross a paragraph or unrelated intervening statement',()=>{
 for(const gap of ['\n\n',' A cabinet is blue. '])refused(run(reviewQuestion,reviewRows(reviewText().replace('. If','.'+gap+'If'))));
});
test('conflicting and duplicate base periods cannot be resolved using matching suffix text',()=>{
 const text=reviewText()+'\n\n'+reviewText('38 days','38-day');refused(run(reviewQuestion,reviewRows(text)));
});
test('prior valid nonversioned retention output preserves its display and evidence',()=>{
 const text='Verdant Instrument Archive inventory slips are retained for 19 months, unless an unresolved access claim requires longer retention.',rs=reviewRows(text),q='How long are inventory slips retained at Verdant Instrument Archive, including the exception?';
 // Body declaration is needed when a filename is unrelated: preserve the previous result exactly.
 const opts={bodyEvidenceCandidates:rs};assert.deepEqual(current.answerWithCoverage(q,[],3,undefined,opts),previous.answerWithCoverage(q,[],3,undefined,opts));
});
test('compound and clock-owned requests preserve previous routing and guards',()=>{
 const q=`${question()} Also, what is its title?`;assert.throws(()=>run(q),/facet|evidence|query|body/i);
 const q2='A request is released exactly at 12:30. When does it depart?';const rs=rows(),opts={bodyEvidenceCandidates:rs};assert.deepEqual(current.answerWithCoverage(q2,[],3,undefined,opts),previous.answerWithCoverage(q2,[],3,undefined,opts));
});
test('monthly explicit store context supports each side; no store is invented from unqualified data',()=>{
 const left={id:'a',name:'01_Verdant_Hall.txt',text:'The highest monthly mean temperature in the Verdant Hall store is 24 degrees Celsius in May.'};
 const right={id:'b',name:'02_Marigold_Laboratory.txt',text:'The Marigold Laboratory winter average temperature is 13 degrees Celsius. Its highest monthly mean is 29 degrees Celsius in July.'};
 const q='Compare highest monthly mean store temperatures at Verdant Hall and Marigold Laboratory, including their months.';
 const r=current.compareWithCoverage(left,right,q);assert.equal(r.answered,false);assert.deepEqual(r.sources,[]);assert.deepEqual(r,previous.compareWithCoverage(left,right,q));
 const qualified={...right,text:right.text.replace('Laboratory winter','Laboratory store winter')};assert.equal(current.compareWithCoverage(left,qualified,q).answered,true);
});
test('unqualified monthly request can use facility data while a foreign explicit room cannot substitute',()=>{
 const left={id:'a',name:'01_Verdant_Hall.txt',text:'The Verdant Hall highest monthly mean temperature is 24 degrees Celsius in May.'},right={id:'b',name:'02_Marigold_Laboratory.txt',text:'The Marigold Laboratory highest monthly mean temperature is 29 degrees Celsius in July.'};
 assert.equal(current.compareWithCoverage(left,right,'Compare highest monthly mean temperatures and months for Verdant Hall and Marigold Laboratory.').answered,true);
 const q='Compare highest monthly mean store temperatures at Verdant Hall and Marigold Laboratory, including their months.';
 assert.equal(current.compareWithCoverage({...left,text:left.text.replace('Hall highest','Hall store highest')},{...right,text:right.text.replace('Laboratory highest','Laboratory room highest')},q).answered,false);
});
test('invalid evidence and zero citation limits preserve their established behavior',()=>{
 assert.throws(()=>run(question(),[{...rows()[0],actualCosine:NaN}]),/body/i);
 const opts={bodyEvidenceCandidates:rows()};refused(current.answerWithCoverage(question(),[],0,undefined,opts));
});
