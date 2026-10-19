// Synthetic contract fixtures only: no model inference or saved-vector replay.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as current from '../eval/answer-completeness-v39/coverage.mjs';
import * as previous from '../eval/answer-completeness-v38/coverage.mjs';
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

test('v39 is isolated and keeps the exact lexical Comparison export', () => {
  assert.equal(current.CANDIDATE_ID, 'coverage-v39-final-dispatch-contract');
  assert.equal(current.compareWithCoverage, previous.compareWithCoverage);
  assert.equal(current.bindFacetSource, previous.bindFacetSource);
  for (const name of ['app.mjs', 'retrieval.mjs', 'hybrid.mjs', 'semantic.mjs']) {
    assert.ok(!fs.readFileSync(new URL('../' + name, import.meta.url), 'utf8').includes('answer-completeness-v39'));
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
