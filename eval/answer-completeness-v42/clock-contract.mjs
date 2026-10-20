// Bounded experimental dispatch relations. Finite metadata is a caller contract,
// not evidence that a unit fixture was produced by a real embedding model.
import {literalSentences, bindFacetSource} from '../answer-completeness-v38/coverage.mjs';

const TIME = '(?:[01]?\\d|2[0-3]):[0-5]\\d';
const DAY = '(?:the )?(?:current|next|same|following) (?:service|operating|business|working|collection) day';
const HOLD = '(, (?:unless|except when) [\\p{L} -]+ hold (?:is (?:open|(?:still )?active)|remains active))?';
const topic = /\b(?:depart\w*|ship\w*|dispatch\w*|releas\w*|leav\w*)\b/i;
const clock = /\d{1,2}:\d{2}/;
const negative = /\b(?:not|never|no|without|cancelled|canceled|proposed|planned|rejected|unknown|unavailable|unspecified|undocumented|missing)\b/i;
const conditional = /\b(?:but|however|if|when|unless|except)\b/i;
const norm = s => String(s).normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const minutes = t => t.split(':').map(Number).reduce((h, m) => h * 60 + m);
const fileEntity = filename => norm(filename.replace(/\.[^.]+$/, '').replace(/^\d+[_ -]*/, ''));
const trimQuestion = s => s.trim().replace(/[?.]$/, '').trim();

function fieldName(value) {
  return /^[\p{L}]+(?:[ -][\p{L}]+){0,3}$/u.test(value)
    && !/\b(?:and|or|who|what|which|when|if|unless|except)\b/i.test(value);
}

function contextAndTail(part) {
  const forms = [
    new RegExp(`^(?:An?|The) (.+?) (?:dispatch|shipping|departure) (?:request|order) is (?:cleared|released) (?:exactly )?at (${TIME})\\.\\s+(.+)$`, 'iu'),
    new RegExp(`^For an? (.+?) (?:dispatch|shipping|departure) (?:request|order) (?:cleared|released) (?:exactly )?at (${TIME}),\\s+(.+)$`, 'iu')
  ];
  for (const pattern of forms) {
    const match = pattern.exec(part);
    if (match) return {context: {entity: match[1], time: match[2]}, tail: match[3]};
  }
  // Keep operational type outside the entity; preserve the competing bare-name
  // interpretation for an explicit ambiguity veto before evidence is selected.
  const ticket = new RegExp(`^(?:An?|The) (.+?) ticket order is (?:cleared|released) (?:exactly )?at (${TIME})\\.\\s+(.+)$`, 'iu').exec(part);
  if (ticket) return {context: {entity: ticket[1], time: ticket[2], bareOrder: true,
    orderType: 'ticket', alternativeEntity: ticket[1] + ' ticket',
    rawContext: part.slice(0, part.length - ticket[3].length).trimEnd()}, tail: ticket[3]};
  // Bare orders enter only a bounded departure/hold contract. Other order
  // questions remain unresolved; matching source identity and policy are required.
  const bare = new RegExp(`^(?:An?|The) (.+?) order is (?:cleared|released) (?:exactly )?at (${TIME})\\.\\s+(.+)$`, 'iu').exec(part);
  if (bare) return {context: {entity: bare[1], time: bare[2], bareOrder: true}, tail: bare[3]};
  return null;
}

function parseRequest(text, inherited) {
  const q = trimQuestion(text);
  const actor = new RegExp(`^Who approves (?:an? |the )?(.+?) (?:dispatch|shipping|departure)(?: request| order)? at (${TIME})$`, 'iu').exec(q);
  if (actor) return {kind: 'approver', entity: actor[1], time: actor[2]};
  const attribute = new RegExp(`^What is (?:the )?(.+?) (?:dispatch|shipping|departure) ([\\p{L} -]+) at (${TIME})$`, 'iu').exec(q);
  if (attribute && fieldName(attribute[2])) return {kind: 'attribute', entity: attribute[1], attribute: attribute[2], time: attribute[3]};
  const vehicle = new RegExp(`^Which ([\\p{L} -]+) (?:leaves|departs|ships) (?:the )?(.+?) (?:dispatch|shipping|departure)(?: yard)? at (${TIME})$`, 'iu').exec(q);
  if (vehicle && fieldName(vehicle[1])) return {kind: 'attribute', attribute: vehicle[1], entity: vehicle[2], time: vehicle[3]};
  if (!inherited) return null;
  if (/^(?:when (?:does|will|should) it (?:leave|depart|ship)|(?:on )?(?:what|which) (?:(?:service|operating|business|working|collection) )?day (?:does|will|should) it (?:leave|depart|ship))$/i.test(q)) return {...inherited, kind: 'departure', ...(/\bcollection day\b/i.test(q) ? {dayUnit: 'collection'} : {})};
  if (/^(?:on )?(?:what|which) collection day is departure$/i.test(q)) return {...inherited, kind: 'departure', dayUnit: 'collection'};
  if (/^what can hold it back$/i.test(q)) return {...inherited, kind: 'hold', holdIdiom: true};
  if (/^(?:what|which) (?:hold|exception) (?:applies|can (?:prevent|block|delay) (?:departure|it))$/i.test(q)) return {...inherited, kind: 'hold'};
  if (/^who approves (?:it|this (?:dispatch|request|order))$/i.test(q)) return {...inherited, kind: 'approver'};
  const property = /^what is (?:its|the dispatch|the shipping|the departure) ([\p{L} -]+)$/iu.exec(q);
  if (property && fieldName(property[1])) return {...inherited, kind: 'attribute', attribute: property[1]};
  const used = /^which ([\p{L} -]+) is used$/iu.exec(q);
  if (used && fieldName(used[1])) return {...inherited, kind: 'attribute', attribute: used[1]};
  return null;
}

/** A null parse within clock ownership is unresolved, never an older fallback. */
export function planClockRequest(question) {
  if (typeof question !== 'string') throw new TypeError('Question text required');
  if (!topic.test(question) || !clock.test(question)) return {status: 'outside_scope', facets: []};
  const unresolved = reason => ({status: 'unresolved', reason, facets: []});
  if (!question.trim() || question.length > 600) return unresolved('Question outside bounded contract');
  const facets = [];
  let context = null, cursor = 0;
  for (const part of question.split(/\s+Also,\s+/i)) {
    const contextual = contextAndTail(part.trim());
    if (contextual) context = contextual.context;
    const tail = contextual?.tail ?? part;
    const requests = tail.split(/(?:,?\s+and\s+|[?.]\s+)(?=(?:when|who|what|which|on\s+(?:what|which))\b)/iu);
    for (const text of requests) {
      const request = parseRequest(text, context);
      if (!request || (context?.bareOrder && !['departure', 'hold'].includes(request.kind))) return unresolved('Unaccounted requested clause or unsupported context');
      if (request.holdIdiom && !facets.some(f => f.kind === 'departure' && f.entity === request.entity && f.time === request.time && f.orderType === request.orderType)) return unresolved('Hold idiom requires an accounted departure facet');
      context = {entity: request.entity, time: request.time, ...(request.bareOrder ? {bareOrder: true} : {}),
        ...(request.orderType ? {orderType: request.orderType, alternativeEntity: request.alternativeEntity, rawContext: request.rawContext} : {})};
      const literal = text.trim();
      const start = question.indexOf(literal, cursor);
      if (start < 0) return unresolved('Request span could not be located');
      cursor = start + literal.length;
      facets.push({...request, span: {start, end: cursor}, text: literal,
        question: `${request.entity} ${request.orderType === 'ticket' ? 'ticket order' : 'dispatch'} at ${request.time}. ${trimQuestion(literal)}?`});
      if (facets.length > 3) return unresolved('More than three requested facets');
    }
  }
  return facets.length ? {status: 'planned', facets} : unresolved('No complete requested facet');
}

function validateBodies(bodies) {
  if (!Array.isArray(bodies) || !bodies.length) throw new Error('Actual body evidence required');
  const documents = new Map();
  for (const body of bodies) {
    if (!Number.isFinite(body.actualCosine)) throw new Error('Finite actual body cosine required');
    if (typeof body.id !== 'string' || !body.id || typeof body.documentId !== 'string' || !body.documentId || typeof body.filename !== 'string'
        || !body.filename || typeof body.sourceText !== 'string' || body.sourceText.length > 180000
        || typeof body.content !== 'string' || !body.content || !Number.isInteger(body.start) || body.start < 0
        || body.sourceText.slice(body.start, body.start + body.content.length) !== body.content) {
      throw new Error('Corresponding literal body identity and bounds required');
    }
    const prior = documents.get(body.documentId);
    if (prior && (prior.filename !== body.filename || prior.text !== body.sourceText)) throw new Error('Inconsistent body document identity');
    documents.set(body.documentId, {id: body.documentId, filename: body.filename, text: body.sourceText});
  }
  return documents;
}

const dayUnit = value => value.match(/(service|operating|business|working|collection) day$/i)?.[1].toLowerCase();

function timeRule(value, entity) {
  if (negative.test(value)) return null;
  // Declarative and imperative ticket policies share the same relation fields.
  const ticketSchemas = [
    new RegExp(`^(?:${esc(entity)} )?Ticket orders (?:cleared|released) (before|after|at or after|at and after|on or after) (${TIME}) (?:leave|depart|ship) on (${DAY})${HOLD}\\.?$`, 'iu'),
    new RegExp(`^Release ticket orders (before|after|at or after|at and after|on or after) (${TIME}) for departure on (${DAY})${HOLD}\\.?$`, 'iu')
  ];
  for (const schema of ticketSchemas) {
    const m = schema.exec(value);
    if (m) return {orderType: 'ticket', operator: m[1].toLowerCase(), time: m[2], hold: Boolean(m[4]), dayUnit: dayUnit(m[3])};
  }
  const requests = new RegExp(`^(?:${esc(entity)} )?(?:Dispatch requests|Orders) (?:cleared|released) (before|after|at or after|at and after|on or after) (${TIME}) (?:leave|depart|ship) on (${DAY})${HOLD}\\.?$`, 'iu').exec(value);
  if (requests) return {operator: requests[1].toLowerCase(), time: requests[2], hold: Boolean(requests[4]), dayUnit: dayUnit(requests[3])};
  const prefix = new RegExp(`^(Before|After|At or after|At and after|On or after) (${TIME}), departure (?:is|moves to) (${DAY})${HOLD}\\.?$`, 'iu').exec(value);
  if (prefix) return {operator: prefix[1].toLowerCase(), time: prefix[2], hold: Boolean(prefix[4]), dayUnit: dayUnit(prefix[3])};
  const suffix = new RegExp(`^At (${TIME}) or later, departure (?:is|moves to) (${DAY})${HOLD}\\.?$`, 'iu').exec(value);
  return suffix ? {operator: 'at or after', time: suffix[1], hold: Boolean(suffix[3]), dayUnit: dayUnit(suffix[2])} : null;
}

function relationShape(facet, value) {
  const entity = esc(facet.entity);
  if (facet.kind === 'approver') {
    return new RegExp(`^(?:The )?${entity} (?:dispatches|dispatch requests|shipping requests|departure requests) are approved by [\\p{L}][\\p{L} '\\-]*\\.?$`, 'iu').test(value)
      || new RegExp(`^[\\p{L}][\\p{L} '\\-]* approves (?:the )?${entity} (?:dispatches|dispatch requests|shipping requests|departure requests)\\.?$`, 'iu').test(value);
  }
  return new RegExp(`^(?:The )?${entity} (?:dispatch|shipping|departure) ${esc(facet.attribute)} is [^.!?]+\\.?$`, 'iu').test(value);
}

function supports(facet, value) {
  if (negative.test(value)) return false;
  if (facet.kind === 'departure' || facet.kind === 'hold') {
    const rule = timeRule(value, facet.entity);
    if (!rule || (rule.orderType ?? null) !== (facet.orderType ?? null) || (facet.dayUnit && facet.dayUnit !== rule.dayUnit) || (facet.kind === 'hold' && !rule.hold)) return false;
    const t = minutes(facet.time), boundary = minutes(rule.time);
    return rule.operator === 'before' ? t < boundary : rule.operator === 'after' ? t > boundary : t >= boundary;
  }
  return !conditional.test(value) && relationShape(facet, value);
}

function refusal(reason, mode) {
  return {answered: false, sources: [], answer: "I can't find this in the provided documents.", mode,
    experiment: 'V42 isolated final dispatch contract; production unchanged',
    request_contract: {status: 'refused', reason}};
}

// A projection can veto competing qualified/denied evidence, never authorize a
// quotation. Only unchanged original spans are eligible for displayed support.
function competingRelation(facet, value) {
  if (supports(facet, value) || (!negative.test(value) && !conditional.test(value))) return false;
  if (['approver', 'attribute'].includes(facet.kind) && negative.test(value) && relationShape(facet, value)) return true;
  // This bounded denial projection can only veto; it never supplies a quote.
  const projected = value.replace(/\bdo not (?=release|leave|depart|ship)\b/gi, '').replace(/\bdeparture does not move to\b/gi, 'departure moves to').replace(/\b(?:not|never|no|proposed|planned)\s+/gi, '')
    .replace(/\s+(?:if|when|unless|except|but|however)\b.*$/i, '').replace(/[.,;:]$/, '') + '.';
  return supports(facet, projected);
}

/** Build displayed support from supplied evidence; never trust an inherited answer. */
export function answerClockPlan(plan, bodies, maxSources = 3, mode = 'Experimental v42 dispatch contract', facetEvidence) {
  if (plan.status !== 'planned') return refusal(plan.reason ?? 'Unresolved request', mode);
  if (!Array.isArray(plan.facets) || !plan.facets.length || plan.facets.length > 3) throw new Error('Complete bounded request plan required');
  if (!Number.isInteger(maxSources) || maxSources < 0) throw new Error('Invalid citation limit');
  if (!maxSources) return refusal('No citations permitted', mode);
  const documents = validateBodies(bodies);
  const selected = [];
  for (const facet of plan.facets) {
    if (facet.alternativeEntity && [...documents.values()].some(doc => fileEntity(doc.filename) === norm(facet.alternativeEntity))) return refusal('Ambiguous typed-order versus bare entity', mode);
    const scoped = [...documents.values()].filter(doc => fileEntity(doc.filename) === norm(facet.entity));
    if (scoped.length !== 1) return refusal('Unique named document required', mode);
    const doc = scoped[0];
    const spans = literalSentences(doc.text);
    if (spans.some(span => competingRelation(facet, span.value))) return refusal('Competing qualified or denied relation', mode);
    const matches = spans.filter(span => span.value.length <= 620 && supports(facet, span.value));
    if (matches.length !== 1 || doc.text.indexOf(matches[0].value) !== doc.text.lastIndexOf(matches[0].value)) {
      return refusal('No unique complete relation for every requested facet', mode);
    }
    selected.push({facet, doc, quote: matches[0].value});
  }
  // No evidence is exposed before every facet has a supported relation.
  if (plan.facets.length > 1 && (!Array.isArray(facetEvidence) || facetEvidence.length !== plan.facets.length)) {
    throw new Error('Actual separately scored and aligned request-facet evidence required');
  }
  const sources = [], ledger = [];
  for (const [i, selection] of selected.entries()) {
    const {facet, doc, quote} = selection;
    const scored = plan.facets.length > 1 ? facetEvidence[i] : null;
    if (plan.facets.length > 1 && (!scored || scored.question !== facet.question)) throw new Error('Request-facet query alignment mismatch');
    const anchors = scored ? scored.bodyEvidenceCandidates : bodies;
    const facetDocuments = validateBodies(anchors);
    for (const item of facetDocuments.values()) {
      const original = documents.get(item.id);
      if (!original || item.filename !== original.filename || item.text !== original.text) throw new Error('Request-facet document identity mismatch');
    }
    const bound = bindFacetSource({documentId: doc.id, filename: doc.filename, quote}, anchors);
    let source = sources.find(s => s.documentId === doc.id && s.quote === quote);
    if (!source) {
      source = {citation: sources.length + 1, id: bound.id, documentId: doc.id, filename: doc.filename,
        quote, excerpt: quote, start: bound.start, end: bound.start + quote.length,
        actualCosine: bound.actualCosine, cosineAnchor: bound.cosineAnchor};
      sources.push(source);
    }
    ledger.push({kind: facet.kind, question: facet.question, citation: source.citation,
      actualCosine: bound.actualCosine, cosineAnchor: bound.cosineAnchor});
  }
  if (sources.length > Math.min(3, maxSources)) return refusal('Complete support exceeds citation limit', mode);
  return {answered: true, sources, answer: sources.map(s => `[${s.citation}] ${s.quote}`).join('\n\n'), mode,
    experiment: 'V42 isolated final dispatch contract; production unchanged',
    request_contract: {status: 'supported', facets: ledger}};
}
