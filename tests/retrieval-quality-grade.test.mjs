import test from 'node:test';
import assert from 'node:assert/strict';
import {gradeCase} from '../eval/retrieval-quality/grade.mjs';

const documents=[{name:'fixture.md',text:'Keep boxes dry. Inspect seals before loading.'}];
const item={id:'fixture',evidence:[{filename:'fixture.md',text:'Inspect seals before loading.'}]};
const source={filename:'fixture.md',quote:'Keep boxes dry.',excerpt:documents[0].text};

test('expanded context cannot satisfy displayed quotation completeness',()=>{
  const row=gradeCase(item,{answered:true,answer:'Keep boxes dry.',sources:[source]},documents);
  assert.equal(row.outcome,'FAIL');
  assert.deepEqual(row.citation_provenance,[true]);
  assert.deepEqual(row.matched_evidence,[false]);
  assert.equal(gradeCase(item,{answered:true,sources:[{...source,quote:item.evidence[0].text}]},documents).outcome,'PASS');
});

test('unsupported answers require explicit zero-citation refusal',()=>{
  const unsupported={id:'unsupported',evidence:[]};
  const refusal={answered:false,answer:"I can't find this in the provided documents.",sources:[]};
  assert.equal(gradeCase(unsupported,refusal,documents).outcome,'PASS');
  assert.equal(gradeCase(unsupported,{...refusal,sources:[source]},documents).false_acceptance,true);
  assert.equal(gradeCase(unsupported,{...refusal,answer:'Unknown'},documents).outcome,'FAIL');
});

test('unverifiable filename or altered excerpt fails provenance',()=>{
  for(const changed of [{...source,filename:'other.md'},{...source,excerpt:'Invented text.'}]){
    const row=gradeCase(item,{answered:true,sources:[changed]},documents);
    assert.equal(row.outcome,'FAIL');
    assert.deepEqual(row.citation_provenance,[false]);
  }
});
