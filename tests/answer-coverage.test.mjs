import test from 'node:test';
import assert from 'node:assert/strict';
import {buildIndex,answerFromCandidates} from '../retrieval.mjs';
import {answerWithCoverage,completeLocalQuote} from '../eval/answer-completeness/coverage.mjs';

test('clock rules select the unique printed applicable branch at equality and either side',()=>{
  const text='## Release\n\nParcels released before 12:30 leave today. Parcels released at or after 12:30 leave tomorrow.\nNote: Check parcel labels.\n';
  const primary='Parcels released before 12:30 leave today.';
  for(const time of ['12:30','13:15'])assert.equal(completeLocalQuote(`Parcels are released at ${time}. When do they leave?`,text,primary),'Parcels released at or after 12:30 leave tomorrow.');
  assert.equal(completeLocalQuote('Parcels are released at 11:45. When do they leave?',text,primary),primary);
});

test('sensor replacement selects the printed restart requirement without inferring one',()=>{
  const text='## Service\nValve sensors are calibrated every 17 days. Following a sensor replacement, calibration is required before restarting the machine.';
  assert.equal(completeLocalQuote('After replacing a valve sensor, when is calibration required?',text,'Valve sensors are calibrated every 17 days.'),'Following a sensor replacement, calibration is required before restarting the machine.');
});

test('compound expansion preserves one literal span and includes requested adjacent exceptions',()=>{
  const first='Pump records are retained for 6 weeks.';
  const second='Records under an unresolved repair claim are kept until it closes.';
  const text=`## Records\n${first} ${second}\n## Pricing\nRepair rates are reviewed annually.`;
  const quote=completeLocalQuote('What is the pump record retention including exceptions?',text,first);
  assert.equal(quote,first+' '+second);
  assert.ok(text.includes(quote));
  assert.equal(completeLocalQuote('What is the pump record retention?',text,first),first);
});

test('headings, blank paragraphs and labeled commentary prevent unrelated expansions',()=>{
  const first='Pump records are retained for 6 weeks.';
  for(const separator of ['\n## Exceptions\n','\n\n','\nCommentary: ']){
    const text=`## Records\n${first}${separator}Records subject to a legal hold remain until it expires.`;
    assert.equal(completeLocalQuote('How long are pump records kept including legal holds?',text,first),first);
  }
  assert.equal(completeLocalQuote('including exceptions','## Facts\nAn authentic fact.','Invented fact.'),'Invented fact.');
});

test('unsectioned and existing refusal results retain the original behavior',()=>{
  const docs=[{id:'fixture',name:'Valve.md',text:'Valve sensors are inspected weekly.'}];
  const candidates=buildIndex(docs).chunks.map(c=>({...c,score:1,semanticScore:.7,lexicalScore:2}));
  const question='What is the exact valve database password?';
  assert.deepEqual(answerWithCoverage(question,candidates),answerFromCandidates(question,candidates,3,'Experimental local answer coverage'));
  assert.equal(completeLocalQuote('including exceptions',docs[0].text,docs[0].text),docs[0].text);
});

test('explicit two-document coverage stays within ranked documents and current versions',()=>{
  const docs=[
    {id:'a',name:'Amber_Current.md',text:'## Records\nAmber records are retained for 8 weeks.'},
    {id:'old',name:'Amber_Archived.md',text:'## Records\nAmber records are retained for 2 weeks.'},
    {id:'b',name:'Violet_Current.md',text:'## Records\nViolet records are retained for 3 weeks.'}
  ];
  const candidates=buildIndex(docs).chunks.map(c=>({...c,score:.04,semanticScore:.8,lexicalScore:2}));
  const answer=answerWithCoverage('What are the current Amber and Violet record retention periods?',candidates);
  assert.deepEqual(answer.sources.map(s=>s.documentId),['a','b']);
  assert.deepEqual(answer.sources.map(s=>s.citation),[1,2]);
  for(const s of answer.sources)assert.ok(docs.find(d=>d.id===s.documentId).text.includes(s.quote));
});
