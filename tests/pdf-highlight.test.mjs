import test from "node:test";
import assert from "node:assert/strict";
import { quotationRegions, highlightMessage } from "../pdf-highlight.mjs";
const item = (str, y = 80) => ({ str, transform: [12,0,0,12,10,y], width: 50, height: 12, fontName: "f" });
const viewport = { width: 200, height: 200, convertToViewportPoint: (x,y) => [x,200-y] };
const match = (items, quote) => quotationRegions({ items, styles: { f: { ascent: .8, descent: -.2 } } }, quote, viewport);
test("unique exact quotation maps complete text runs, including wrapped whitespace", () => {
  const result = match([item("First line."),item("Second line.",60)],"First\nline. Second line.");
  assert.equal(result.status,"matched"); assert.equal(result.regions.length,2);
  assert.deepEqual(result.regions[0],{x:10,y:110.4,width:50,height:12});
});
test("no quotation is an ordinary original-page view", () => { assert.equal(match([item("Text")],"").status,"none"); });
test("missing or case-changed quotation does not use fuzzy matching", () => {
  assert.equal(match([item("Text")],"text").status,"not-found");
  assert.equal(match([item("Text")],"Other").regions.length,0);
});
test("repeated quotation never chooses an arbitrary occurrence", () => {
  assert.deepEqual(match([item("Text"),item("Text",60)],"Text"),{status:"ambiguous",regions:[]});
});
test("partial text-run boundaries do not paint irrelevant text", () => {
  assert.deepEqual(match([item("First sentence. Second sentence.")],"Second sentence."),{status:"partial-run",regions:[]});
});
test("invalid or unsupported geometry rejects the entire match", () => {
  for (const bad of [{width:NaN},{height:0},{transform:[0,12,-12,0,10,80]},{transform:[12,0,0,12,-10,80]},{dir:"ttb"}]) {
    assert.deepEqual(match([item("Good"),{...item("Bad",60),...bad}],"Good Bad"),{status:"geometry",regions:[]});
  }
});
test("fallback messages distinguish repeated matches from reliable bounds", () => {
  assert.match(highlightMessage("matched"),/approximate/);
  assert.match(highlightMessage("ambiguous"),/more than once/);
  assert.match(highlightMessage("geometry"),/No highlight/);
});
