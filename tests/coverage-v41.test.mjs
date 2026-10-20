// Synthetic contract fixtures only: no model inference or saved-vector replay.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as current from '../eval/answer-completeness-v41/coverage.mjs';
import * as previous from '../eval/answer-completeness-v38/coverage.mjs';
import * as frozen39 from '../eval/answer-completeness-v39/coverage.mjs';
import {requestFrame} from '../eval/answer-completeness-v33/coverage.mjs';

const file = '01_Elm_Depot.txt';
const before = 'Dispatch requests released before 13:40 leave on the current operating day.';
const after = 'At 13:40 or later, departure is the next operating day, unless a storm hold is open.';
const rules = before + '\n\n' + after;
const refused = {answered: false, sources: [], answer: "I can't find this in the provided documents."};
const body = (text, filename = file, id = 'elm') => ({id: id + '-body', documentId: id,
  filename, content: text, sourceText: text, start: 0, actualCosine: .43});
const ask = (time = '13:40', tail = 'When does it leave?') => `An Elm Depot dispatch request is cleared at ${time}. ${tail}`;
function options(question, text = rules, rows = [body(text)]) {
  const plan = current.planClockRequest(question);
  return {productionAnchor: refused, bodyCandidates: [], bodyEvidenceCandidates: rows,
    clockFacetEvidence: plan.facets.map((facet, i) => ({question: facet.question,
      bodyEvidenceCandidates: rows.map(row => ({...row, actualCosine: .43 + i / 100}))}))};
}
const answer = (question, text = rules) => current.answerWithCoverage(question, [], 3, undefined, options(question, text));
function isRefusal(result) {
  assert.equal(result.answered, false);
  assert.deepEqual(result.sources, []);
  assert.equal(result.answer, refused.answer);
  assert.equal(result.generated, undefined);
}

test('v41 is isolated and keeps the exact lexical Comparison export', () => {
  assert.equal(current.CANDIDATE_ID, 'coverage-v41-order-collection');
  assert.equal(current.compareWithCoverage, previous.compareWithCoverage);
  assert.equal(current.bindFacetSource, previous.bindFacetSource);
  for (const name of ['app.mjs', 'retrieval.mjs', 'hybrid.mjs', 'semantic.mjs']) {
    assert.ok(!fs.readFileSync(new URL('../' + name, import.meta.url), 'utf8').includes('answer-completeness-v41'));
  }
});

test('outside-scope refusal and supported retention remain identical to v38', () => {
  for (const question of ['What is the capital of Mars?', 'How long are Elm Depot completed carriage records kept?']) {
    const text = 'Completed carriage records are kept for 9 months, unless an unresolved fare dispute requires longer retention.';
    const opts = options(question, text);
    assert.equal(current.planClockRequest(question).status, 'outside_scope');
    assert.deepEqual(current.answerWithCoverage(question, [], 3, undefined, opts), previous.answerWithCoverage(question, [], 3, undefined, opts));
  }
});

test('ownership covers legacy clock frames, including unresolved and invalid contexts', () => {
  for (const question of [ask(), 'Who approves an Elm Depot dispatch at 13:39?', ask('25:40'),
    ask('13:39', 'When does it leave, and why is its route special?'), 'What release is scheduled at 13:39?']) {
    assert.equal(requestFrame(question).kind, 'clock');
    assert.notEqual(current.planClockRequest(question).status, 'outside_scope');
  }
  assert.equal(current.planClockRequest(ask('25:40')).status, 'unresolved');
});

test('before, equality and after requests choose the correct complete literal rule', () => {
  for (const [time, expected] of [['00:00', before], ['13:39', before], ['13:40', after], ['13:41', after], ['23:59', after]]) {
    const result = answer(ask(time));
    assert.equal(result.answered, true, time);
    assert.equal(result.answer, '[1] ' + expected);
    assert.equal(result.sources[0].actualCosine, .43);
    assert.equal(result.sources[0].cosineAnchor.actualCosine, .43);
    assert.equal(result.sources[0].excerpt, expected);
    assert.equal(rules.slice(result.sources[0].start, result.sources[0].end), expected);
  }
});

test('prefix inclusive, exclusive after and varied entity/cutoff forms stay literal', () => {
  for (const [prefix, time, supported] of [['At or after', '13:40', true], ['At and after', '13:40', true],
    ['On or after', '13:40', true], ['After', '13:40', false], ['After', '13:41', true], ['Before', '13:39', true]]) {
    const text = `${prefix} 13:40, departure is the next operating day.`;
    const result = answer(ask(time), text);
    assert.equal(result.answered, supported, prefix + '/' + time);
    if (supported) assert.equal(result.sources[0].quote, text);
    else isRefusal(result);
  }
  for (const [entity, cutoff] of [['Pine Harbor', '09:05'], ['Elm and Oak Depot', '21:12']]) {
    const question = ask(cutoff).replace('Elm Depot', entity);
    const text = after.replace('13:40', cutoff);
    const rows = [body(text, '02_' + entity.replaceAll(' ', '_') + '.txt', 'other')];
    const result = current.answerWithCoverage(question, [], 3, undefined, options(question, text, rows));
    assert.equal(result.answer, '[1] ' + text);
    assert.equal(current.planClockRequest(question).facets.length, 1);
  }
});

test('departure/hold paraphrases and For context retain every requested facet', () => {
  for (const question of [ask('13:40', 'When will it depart, and which hold can block departure?'),
    ask('13:40', 'Which operating day does it ship and what hold applies?'),
    'For an Elm Depot dispatch request cleared at 13:40, when does it leave?']) {
    const result = answer(question);
    assert.equal(result.answer, '[1] ' + after);
    assert.equal(result.request_contract.facets.length, current.planClockRequest(question).facets.length);
    assert.equal(result.sources.length, 1);
  }
  isRefusal(answer(ask('13:39', 'When does it leave and what hold applies?')));
});

test('full wrapper blocks unsupported approvers, attributes and vehicles on every time branch', () => {
  for (const time of ['13:39', '13:40', '13:41']) {
    for (const question of [`Who approves an Elm Depot dispatch at ${time}?`,
      `What is the Elm Depot dispatch password at ${time}?`,
      `Which vehicle leaves the Elm Depot dispatch yard at ${time}?`]) isRefusal(answer(question));
  }
});

test('legacy before-cutoff repair is actually activated in the negative control', () => {
  const question = 'Who approves an Elm Depot dispatch at 13:39?';
  const opts = options(question);
  const old = previous.answerWithCoverage(question, [], 3, undefined, opts);
  assert.equal(old.answered, true, 'Control must exercise the inherited answered path');
  assert.equal(old.sources[0].quote, before);
  isRefusal(current.answerWithCoverage(question, [], 3, undefined, opts));
});

test('mixed unsupported requests cannot escape through and, another sentence or Also', () => {
  for (const time of ['13:39', '13:40', '13:41']) {
    for (const tail of ['When will it leave, and what is its password?',
      'When will it leave? What is its password?', 'When will it leave? Also, what is its password?',
      'When will it leave, and who approves it?', 'When will it leave and which vehicle is used?']) isRefusal(answer(ask(time, tail)));
  }
});

test('explicit positive approval and arbitrary attribute relations are not blacklisted', () => {
  for (const [question, text] of [
    ['Who approves an Elm Depot dispatch at 13:39?', 'Elm Depot dispatches are approved by the Route Steward.'],
    ['Who approves an Elm Depot dispatch at 13:39?', 'The Route Steward approves Elm Depot dispatch requests.'],
    ['What is the Elm Depot dispatch password at 13:39?', 'The Elm Depot dispatch password is the fictional word LANTERN.'],
    ['What is the Elm Depot dispatch route code at 13:39?', 'The Elm Depot dispatch route code is the fictional label SUNRISE.'],
    ['Which vehicle leaves the Elm Depot dispatch yard at 13:39?', 'The Elm Depot dispatch vehicle is the blue cart.']
  ]) assert.equal(answer(question, text).answer, '[1] ' + text);
});

test('supported mixed clauses require aligned separately scored facet evidence', () => {
  const text = rules + '\n\nThe Elm Depot dispatch password is the fictional word LANTERN.';
  for (const separator of [', and ', '? ', '? Also, ']) {
    const question = ask('13:39', 'When will it leave' + separator + 'what is its password?');
    const result = answer(question, text);
    assert.equal(result.answered, true);
    assert.equal(result.sources.length, 2);
    assert.deepEqual(result.sources.map(s => s.citation), [1, 2]);
    assert.deepEqual(result.request_contract.facets.map(f => f.actualCosine), [.43, .44]);
    assert.ok(result.answer.includes(before));
    assert.ok(result.answer.includes('fictional word LANTERN'));
  }
  const question = ask('13:40', 'When does it leave and who approves it?');
  const textWithApproval = rules + '\n\nElm Depot dispatches are approved by the Route Steward.';
  const approved = answer(question, textWithApproval);
  assert.equal(approved.answered, true);
  assert.equal(approved.sources.length, 2);
  assert.deepEqual(approved.request_contract.facets.map(f => f.kind), ['departure', 'approver']);
});

test('whole-query scores cannot silently stand in for multi-facet scores', () => {
  const question = ask('13:40', 'When does it leave and what hold applies?');
  const opts = options(question);
  delete opts.clockFacetEvidence;
  assert.throws(() => current.answerWithCoverage(question, [], 3, undefined, opts), /separately scored/);
  for (const mutate of [o => {o.clockFacetEvidence[1] = null;},
    o => {o.clockFacetEvidence[1].question = question;},
    o => {o.clockFacetEvidence[1].bodyEvidenceCandidates = [body(after, '02_Pine_Depot.txt', 'pine')];}]) {
    const changed = options(question); mutate(changed);
    assert.throws(() => current.answerWithCoverage(question, [], 3, undefined, changed), /alignment|identity/);
  }
});

test('unknown requested text, negated context and excess facets are terminal refusals', () => {
  for (const question of [ask('25:40'), ask().replace(' is cleared', ' is not cleared'),
    ask().replace(' is cleared', ' might be cleared'), ask('13:39', 'When does it leave and why is it urgent?'),
    ask('13:39', 'When does it leave? Explain everything.'),
    ask('13:39', 'What is its password and route code?'),
    ask('13:40', 'When does it leave and what hold applies and who approves it and what is its password?')]) {
    assert.equal(current.planClockRequest(question).status, 'unresolved', question);
    isRefusal(answer(question));
  }
});

test('nonmatching, repeated, conflicting and oversized source relations cannot answer', () => {
  for (const text of [before.replace('Dispatch', 'Pine Depot dispatch'), before + '\n\n' + before,
    before + '\n\n' + before.replace('current', 'next'), after.replace('departure is', 'departure is not'),
    after.replace('departure is', 'a proposed departure is'), after.replace('13:40', '25:40'),
    'The Elm Depot dispatch password is ' + 'x'.repeat(650) + '.']) {
    const question = text.includes('password') ? 'What is the Elm Depot dispatch password at 13:39?'
      : ask(text.startsWith('At ') ? '13:40' : '13:39');
    isRefusal(answer(question, text));
  }
  const question = ask('13:39');
  for (const rows of [[body(rules, '02_Pine_Depot.txt', 'pine')], [body(rules), body(rules, file, 'duplicate')]]) {
    isRefusal(current.answerWithCoverage(question, [], 3, undefined, options(question, rules, rows)));
  }
});

test('unrelated or conditional approvals and unknown attribute values are not support', () => {
  for (const text of ['Pine Depot dispatches are approved by the Route Steward.',
    'Elm Depot purchases are approved by the Route Steward.',
    'Elm Depot dispatches are approved by the Route Steward if the bell rings.',
    'Elm Depot dispatches are not approved by the Route Steward.']) {
    isRefusal(answer('Who approves an Elm Depot dispatch at 13:39?', text));
  }
  isRefusal(answer('What is the Elm Depot dispatch password at 13:39?', 'The Elm Depot dispatch password is unspecified.'));
});

test('a positive source relation cannot hide a competing denial or condition', () => {
  isRefusal(answer(ask('13:40'), rules + '\n\n' + after.replace('departure is', 'departure is not')));
  const approval = 'Elm Depot dispatches are approved by the Route Steward.';
  const question = 'Who approves an Elm Depot dispatch at 13:39?';
  for (const competing of [approval.replace('are approved', 'are not approved'),
    approval.replace('.', ' if the bell rings.'), 'Elm Depot dispatches are approved by an unknown steward.']) {
    isRefusal(answer(question, approval + '\n\n' + competing));
  }
  const property = 'The Elm Depot dispatch password is the fictional word LANTERN.';
  isRefusal(answer('What is the Elm Depot dispatch password at 13:39?',
    property + '\n\nThe Elm Depot dispatch password is unspecified.'));
});

test('invalid evidence remains an error and cannot produce an inherited fallback', () => {
  const question = ask('13:39');
  for (const row of [{...body(rules), actualCosine: NaN}, {...body(rules), actualCosine: Infinity},
    {...body(rules), id: ''}, {...body(rules), start: -1}, {...body(rules), content: 'altered'}]) {
    const opts = options(question, rules, [row]);
    assert.throws(() => current.answerWithCoverage(question, [], 3, undefined, opts), /Finite|identity|bounds/);
  }
  assert.throws(() => current.answerWithCoverage(question, [], 3, undefined, {}), /Actual body/);
  const text = before + '\n\nAn unrelated sentence.';
  const row = {...body(text), content: 'An unrelated sentence.', start: text.indexOf('An unrelated sentence.')};
  assert.throws(() => current.answerWithCoverage(question, [], 3, undefined, options(question, text, [row])), /corresponding/);
});

test('citation caps and previously answered/generated anchors cannot leak partial results', () => {
  const question = ask('13:39', 'When does it leave and what is its password?');
  const text = rules + '\n\nThe Elm Depot dispatch password is the fictional word LANTERN.';
  const opts = options(question, text);
  opts.productionAnchor = {answered: true, generated: true, answer: 'Unrelated stale generated answer', sources: [{quote: 'unrelated'}]};
  isRefusal(current.answerWithCoverage(question, [], 1, undefined, opts));
  isRefusal(current.answerWithCoverage(ask(), [], 0, undefined, options(ask())));
  assert.equal(current.answerWithCoverage(question, [], 2, undefined, opts).sources.length, 2);
  const unsupported = ask('13:39', 'When does it leave and what is its unknown access phrase?');
  const bad = options(unsupported);
  bad.productionAnchor = opts.productionAnchor;
  isRefusal(current.answerWithCoverage(unsupported, [], 3, undefined, bad));
});

test('original exposed Vela failure questions refuse under synthetic literal-body controls', () => {
  const key = JSON.parse(fs.readFileSync(new URL('../eval/v38-fresh-confirmation/fixed-answer-key.json', import.meta.url), 'utf8'));
  const text = 'Dispatch requests released before 14:35 leave on the current service day.\n\nAt 14:35 or later, departure is the next service day, unless a phytosanitary hold is open.';
  for (const item of key.filter(c => ['V23', 'V27'].includes(c.id))) {
    assert.equal(item.unsupported, true);
    const rows = [body(text, '01_Serevin_Seed_Library.txt', 'seed')];
    isRefusal(current.answerWithCoverage(item.question, [], 3, undefined, options(item.question, text, rows)));
  }
  const first = JSON.parse(fs.readFileSync(new URL('../docs/evidence/vela32-v38/automated-scorecard.json', import.meta.url), 'utf8'));
  assert.equal(first.gate, 'FAIL');
  assert.deepEqual(first.variants.fixed.filter(c => c.outcome === 'FAIL').map(c => c.id), ['V23', 'V27']);
});

// New bounded grammar controls; finite values below are constructed fixtures.
const lumenKey = JSON.parse(fs.readFileSync(new URL('../eval/v35-fresh-confirmation/fixed-answer-key.json', import.meta.url)));
const l04 = lumenKey.find(c => c.id === 'L04');
const lumenText = fs.readFileSync(new URL('../eval/v35-fresh-confirmation/source_docs/01_Oridel_Map_Archive.txt', import.meta.url), 'utf8').trim();
function scopedAnswer(question, text, entity = 'Oridel Map Archive', mutate = () => {}, limit = 3) {
  const rows = [body(text, '01_' + entity.replaceAll(' ', '_') + '.txt', 'scoped')];
  const opts = options(question, text, rows); mutate(opts);
  return current.answerWithCoverage(question, [], limit, undefined, opts);
}

test('v41 original L04 public entry repairs the full request and literal source grammar together', () => {
  const result = scopedAnswer(l04.question, lumenText);
  assert.equal(result.answered, true);
  assert.equal(result.sources.length, 1);
  assert.equal(result.sources[0].quote, 'At or after 12:40, departure moves to the following service day, unless a conservation hold is still active.');
  assert.deepEqual(result.request_contract.facets.map(f => f.kind), ['departure', 'hold']);
  assert.deepEqual(result.request_contract.facets.map(f => f.actualCosine), [.43, .44]);
  const s = result.sources[0]; assert.equal(lumenText.slice(s.start, s.end), s.quote);
});

test('v41 independent and composed source vocabulary changes preserve literal output', () => {
  for (const verb of ['is', 'moves to']) for (const day of ['next', 'following']) {
    for (const hold of ['open', 'active', 'still active']) for (const modal of ['does', 'will', 'should']) {
      const text = `At or after 12:40, departure ${verb} the ${day} service day, unless a conservation hold is ${hold}.`;
      const q = `An Oridel Map Archive dispatch request is released at 12:40. When ${modal} it depart and which hold can prevent departure?`;
      assert.equal(scopedAnswer(q, text).answer, '[1] ' + text);
    }
  }
  for (const day of ['service', 'operating', 'business', 'working']) {
    const q = `An Oridel Map Archive dispatch request is released at 12:40. Which ${day} day should it ship?`;
    const text = `At 12:40 or later, departure moves to the following ${day} day.`;
    assert.equal(scopedAnswer(q, text).answer, '[1] ' + text);
  }
});

test('v41 varied names, cutoffs and equality retain the applicable literal rule and hold', () => {
  for (const [entity, cutoff, earlier, later] of [['Pine Harbor', '09:05', '09:04', '09:06'], ['Elm and Oak Depot', '21:12', '21:11', '21:13']]) {
    const before = `Dispatch requests released before ${cutoff} leave on the current service day.`;
    const after = `At or after ${cutoff}, departure moves to the following service day, unless a weather hold is active.`;
    const text = before + '\n\n' + after;
    for (const [time, expected] of [[earlier, before], [cutoff, after], [later, after]]) {
      const q = `An ${entity} dispatch request is released at ${time}. When should it depart?`;
      assert.equal(scopedAnswer(q, text, entity).answer, '[1] ' + expected);
    }
    const equality = `An ${entity} dispatch request is released at ${cutoff}. When should it depart?`;
    isRefusal(scopedAnswer(equality, after.replace('At or after', 'After'), entity));
    isRefusal(scopedAnswer(equality.replace('When should it depart?', 'When should it depart and what hold applies?'), after.replace(', unless a weather hold is active', ''), entity));
  }
});

test('v41 new forms keep negative, proposed, conditional, repeated and scoped vetoes', () => {
  const good = 'At or after 12:40, departure moves to the following service day, unless a conservation hold is still active.';
  for (const bad of [good.replace('moves to', 'does not move to'), good.replace('departure', 'proposed departure'),
    good.replace('.', ' if the bell rings.'), good, good.replace('following', 'current')]) {
    isRefusal(scopedAnswer(l04.question, good + '\n\n' + bad));
  }
  isRefusal(scopedAnswer(l04.question, good, 'Other Archive'));
  for (const tail of ['When should not it depart?', "When shouldn't it depart?", 'When should it depart and what is its password?',
    'When should it depart and who approves it?', 'When should it depart and which vehicle is used?', 'When should it depart and why?']) {
    isRefusal(scopedAnswer('An Oridel Map Archive dispatch request is released at 12:40. ' + tail, good));
  }
  isRefusal(scopedAnswer(l04.question, good, 'Oridel Map Archive', () => {}, 0));
});

test('v41 new should facets still reject missing, nonfinite or misaligned evidence', () => {
  for (const mutate of [o => {delete o.clockFacetEvidence;}, o => {o.clockFacetEvidence[1].question = l04.question;},
    o => {o.clockFacetEvidence[1].bodyEvidenceCandidates[0].actualCosine = NaN;}]) {
    assert.throws(() => scopedAnswer(l04.question, lumenText, 'Oridel Map Archive', mutate), /separately scored|alignment|Finite/);
  }
});

test('v41 retains exact v39 outside-scope and Comparison behavior while v39 L04 remains unresolved', () => {
  assert.equal(current.compareWithCoverage, frozen39.compareWithCoverage);
  const q = 'How long are Elm Depot completed carriage records kept?';
  const opts = options(q, rules);
  assert.deepEqual(current.answerWithCoverage(q, [], 3, undefined, opts), frozen39.answerWithCoverage(q, [], 3, undefined, opts));
  assert.equal(frozen39.planClockRequest(l04.question).status, 'unresolved');
  isRefusal(frozen39.answerWithCoverage(l04.question, [], 3, undefined, {}));
});

// Constructed engineering fixtures; no model inference or replay of model vectors.
import * as frozen40 from '../eval/answer-completeness-v40/coverage.mjs';
const hearthKey = JSON.parse(fs.readFileSync(new URL('../eval/v32-fresh-confirmation/fixed-answer-key.json', import.meta.url)));
const h04 = hearthKey.find(c => c.id === 'H04');
const hearthText = fs.readFileSync(new URL('../eval/v32-fresh-confirmation/source_docs/01_Veylan_Seed_Conservatory.txt', import.meta.url), 'utf8').trim();
const collectionRule = 'At or after 14:10, departure is the next collection day, unless a seed-health hold remains active.';
const orderAsk = (entity = 'Veylan Seed Conservatory', time = '14:10', tail = 'Which collection day is departure, and what hold can prevent it?') => `A ${entity} order is released exactly at ${time}. ${tail}`;

test('v41 original H04 repairs context, requested unit and literal hold together; v40 remains unresolved', () => {
  const result = scopedAnswer(h04.question, hearthText, 'Veylan Seed Conservatory');
  assert.equal(result.answer, '[1] ' + collectionRule);
  assert.deepEqual(result.request_contract.facets.map(f => f.kind), ['departure', 'hold']);
  assert.deepEqual(result.request_contract.facets.map(f => f.actualCosine), [.43, .44]);
  assert.equal(result.sources[0].start, 268);assert.equal(result.sources[0].end, 366);
  assert.equal(frozen40.planClockRequest(h04.question).status, 'unresolved');
  assert.equal(current.compareWithCoverage, frozen40.compareWithCoverage);
});

test('v41 order/day/hold extensions work independently and composed across boundaries and identities', () => {
  for (const entity of ['Elm Depot', 'Pine and Oak Harbor']) for (const [cutoff, earlier, later] of [['09:05', '09:04', '09:06'], ['21:12', '21:11', '21:13']]) {
    const before = `Orders released before ${cutoff} leave on the same collection day.`;
    const after = `At or after ${cutoff}, departure is the next collection day, unless a weather hold remains active.`;
    const text = before + '\n\n' + after;
    for (const [time, expected] of [[earlier, before], [cutoff, after], [later, after]]) {
      assert.equal(scopedAnswer(orderAsk(entity, time, 'Which collection day is departure?'), text, entity).answer, '[1] ' + expected);
    }
    assert.equal(scopedAnswer(orderAsk(entity, cutoff), text, entity).answer, '[1] ' + after);
    isRefusal(scopedAnswer(orderAsk(entity, cutoff), after.replace('At or after', 'After'), entity));
  }
  for (const context of ['order', 'dispatch request']) for (const day of ['service', 'collection']) {
    for (const hold of ['is open', 'is active', 'remains active']) {
      const q = `An Elm Depot ${context} is cleared at 13:40. Which ${day} day should it depart and what hold applies?`;
      const text = `At 13:40 or later, departure is the next ${day} day, unless a storm hold ${hold}.`;
      assert.equal(scopedAnswer(q, text, 'Elm Depot').answer, '[1] ' + text);
    }
  }
});

test('v41 collection-day question never substitutes service-day evidence or invents an exception', () => {
  isRefusal(scopedAnswer(h04.question, collectionRule.replace('collection', 'service'), 'Veylan Seed Conservatory'));
  isRefusal(scopedAnswer(h04.question, collectionRule.replace(', unless a seed-health hold remains active', ''), 'Veylan Seed Conservatory'));
  isRefusal(scopedAnswer(orderAsk('Veylan Seed Conservatory', '14:09'), hearthText, 'Veylan Seed Conservatory'));
});

test('v41 bare-order scope excludes purchase/payment/invoice and unknown or mixed order facets', () => {
  for (const q of [h04.question.replace(' order ', ' purchase order '),h04.question.replace(' order ', ' invoice '),
    h04.question.replace('is released', 'is paid'),h04.question.replace('is released', 'is not released'),
    h04.question.replace('is released', 'might be released'),h04.question.replace('14:10', '25:10'),
    orderAsk(undefined, undefined, 'Who approves it?'),orderAsk(undefined, undefined, 'What is its password?'),
    orderAsk(undefined, undefined, 'Which collection day is departure and what is its password?'),
    orderAsk(undefined, undefined, 'Which collection day is departure and which vehicle is used?'),
    orderAsk(undefined, undefined, 'Which collection day is departure? What is its payment date?'),
    orderAsk(undefined, undefined, 'Which collection day is departure? Also, who approves it?'),
    orderAsk(undefined, undefined, 'Which collection day is not departure?')]) {
    isRefusal(scopedAnswer(q, hearthText, 'Veylan Seed Conservatory'));
  }
  isRefusal(scopedAnswer(h04.question, 'The order payment is due the next collection day.', 'Veylan Seed Conservatory'));
});

test('v41 expanded source grammar still vetoes conflicts, denials, conditions, repetition and wrong identity', () => {
  for (const bad of [collectionRule,collectionRule.replace('next', 'current'),collectionRule.replace('departure is', 'departure is not'),
    collectionRule.replace('departure is', 'proposed departure is'),collectionRule.replace('.', ' if the bell rings.')]) {
    isRefusal(scopedAnswer(h04.question, collectionRule + '\n\n' + bad, 'Veylan Seed Conservatory'));
  }
  isRefusal(scopedAnswer(h04.question, collectionRule, 'Wrong Conservatory'));
  isRefusal(scopedAnswer(h04.question, collectionRule, 'Veylan Seed Conservatory', () => {}, 0));
});

test('v41 new bare-order facets require actual aligned evidence rather than old whole-query metadata', () => {
  for (const mutate of [o => {delete o.clockFacetEvidence;},o => {o.clockFacetEvidence[1].question = h04.question;},
    o => {o.clockFacetEvidence[1].bodyEvidenceCandidates[0].actualCosine = Infinity;},
    o => {o.clockFacetEvidence[1].bodyEvidenceCandidates[0].documentId = 'other';}]) {
    assert.throws(() => scopedAnswer(h04.question, hearthText, 'Veylan Seed Conservatory', mutate), /separately scored|alignment|Finite|identity/);
  }
});
