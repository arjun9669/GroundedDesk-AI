import test from "node:test";
import assert from "node:assert/strict";
import {buildIndex} from "../retrieval.mjs";
import {buildSectionIndex} from "../eval/retrieval-quality/section-index.mjs";
test('experimental chunks preserve literal source offsets and never cross a heading',()=>{
  const doc={id:'a',name:'guide.md',text:'# Guide\r\n\r\n## Delivery\r\nDelivery starts early.\r\n\r\n## Storage\r\nStorage stays dry.'};
  const index=buildSectionIndex([doc]);assert.equal(index.chunks.length,3);
  for(const c of index.chunks){assert.equal(c.sourceText.slice(c.start,c.start+c.content.length),c.content);assert.ok((c.content.match(/^## /gm)||[]).length<=1);}
  assert.equal(index.df.get('delivery'),1);assert.equal(index.avgLength,index.chunks.reduce((n,c)=>n+c.tokens.length,0)/3);
});
test('unsectioned documents retain production index and long sections stay bounded',()=>{
  const doc={id:'a',name:'notes.txt',text:'A clear sentence about deliveries.'};assert.deepEqual(buildSectionIndex([doc]),buildIndex([doc]));
  const long={...doc,text:'## Tasks\n'+('The daily task is to inspect the packages. '.repeat(80))+'\n## Finish\nFinish safely.'};
  const i=buildSectionIndex([long]);assert.ok(i.chunks.length>3);for(const c of i.chunks){assert.ok(c.content.length<=760);assert.equal(c.sourceText.slice(c.start,c.start+c.content.length),c.content);}
});
