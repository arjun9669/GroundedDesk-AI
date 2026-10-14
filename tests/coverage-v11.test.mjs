import test from 'node:test';
import assert from 'node:assert/strict';
import {isBodyQuote,expandNarrative,deduplicateSources,buildBodyIndex} from '../eval/answer-completeness-v11/coverage.mjs';
test('structural headings do not count as body evidence',()=>{
 assert.equal(isBodyQuote('# Navigation'),false);assert.equal(isBodyQuote('## Topic\n### Detail'),false);
 assert.equal(isBodyQuote('P-01 Inspection'),false);assert.equal(isBodyQuote('The operator inspects equipment.'),true);
});
test('expanded duplicates and contained quotes are removed before numbering',()=>{
 const sources=[{documentId:'a',quote:'The ferry arrived.'},{documentId:'a',quote:'The ferry arrived. The crew unloaded.'},{documentId:'a',quote:'The ferry arrived. The crew unloaded.'},{documentId:'b',quote:'The ferry arrived.'}];
 assert.deepEqual(deduplicateSources(sources).map(s=>[s.documentId,s.citation]),[['a',1],['b',2]]);
});
test('long paragraphs prioritize successor facts within literal quote limit',()=>{
 const source='## Journey\n'+'The old archive contained '+ 'maps '.repeat(130)+'and charts. '+'The expedition arrived. The crew unloaded. The ferry departed. The curator locked the door.';
 const r=expandNarrative(source,'The expedition arrived.');
 assert.equal(r.quote,'The expedition arrived. The crew unloaded. The ferry departed.');assert.ok(source.includes(r.quote));
});
test('body index retains original offsets and rejects fabricated spans',()=>{
 const docs=[{id:'a',name:'journal.txt',text:'The ferry arrived.'}];
 const e={documentId:'a',start:0,end:18,value:'The ferry arrived.'};
 const i=buildBodyIndex(docs,[e]);assert.equal(i.chunks[0].sourceText,docs[0].text);assert.equal(i.df.get('ferry'),1);
 assert.throws(()=>buildBodyIndex(docs,[{...e,value:'The ferry vanished.'}]),/exact original span/);
});
