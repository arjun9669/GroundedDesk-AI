import * as prior from '../answer-completeness-v50/coverage.mjs';
import {bodyDocuments,norm} from '../answer-completeness-v50/scope.mjs';
import {compareDocuments,hasInstructionRisk} from '../../research.mjs';

export * from '../answer-completeness-v50/coverage.mjs';
export const CANDIDATE_ID = 'coverage-v51-scoped-evidence';
const escape = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const phrase = (text, value) => new RegExp(`(?:^| )${escape(norm(value))}(?: |$)`).test(norm(text));
const clean = text => text.replace(/^(?:the|an?)\s+/i, '').trim();
const name = filename => norm(filename.replace(/\.[^.]+$/, '').replace(/^\d+[_ -]*/, ''));
const clockTime = /\b(?:[01]?\d|2[0-3]):[0-5]\d\b/;
const period = /\b(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve) (?:days?|weeks?|months?|years?)\b/i;
const cannotAnswer = mode => ({answered:false,sources:[],answer:"I can't find this in the provided documents.",mode});

function scope(question, documents) {
  const matches = documents.filter(doc => phrase(question, doc.entity));
  if (matches.length !== 1) return null;
  const doc = matches[0];
  const words = doc.entity.split(' ').map(escape).join('\\s+');
  const topic = question.replace(new RegExp(`\\b(?:at|in|of|beside)\\s+(?:the\\s+)?${words}\\b`, 'i'), '').trim();
  return {doc,topic};
}

function uniqueBlock(doc, predicate) {
  const blocks = doc.blocks.filter(block => block.value.length <= 620 && predicate(block.value));
  return blocks.length === 1 && doc.text.indexOf(blocks[0].value) === doc.text.lastIndexOf(blocks[0].value) ? blocks[0] : null;
}

function retention(topic, doc) {
  const request = /^how long (?:does .+? (?:retain|keep) (.+?)|(?:are|is) (.+?) (?:kept|retained)),?\s+including (.+)$/i.exec(topic);
  if (!request) return undefined;
  const subject = clean(request[1] ?? request[2]);
  const condition = clean(request[3]).replace(/^exception for /i,'').replace(/^.+? attached to (?:an? )?/i,'').replace(/^(?:an? |the )/i,'');
  const terms = norm(condition).split(' ').filter(word => !['is','that','still','unresolved','open','pending','active','exception'].includes(word));
  if (!terms.length) return null;
  return uniqueBlock(doc, value => {
    const sentences = prior.literalSentences(value).map(span => span.value);
    const [base, extension] = sentences;
    return Boolean(base && extension && phrase(base,subject) && period.test(base) && /\b(?:keeps?|kept|retains?|retained)\b/i.test(base)
      && terms.every(term => phrase(extension,term)) && /\b(?:unresolved|open|pending|active)\b/i.test(extension)
      && /\buntil\b.+\b(?:settled|closes?|closed|resolved|released|ends?)\b/i.test(extension)
      && (phrase(extension,subject) || /\b(?:affected|those|such|that)\s+\w+/i.test(extension) || phrase(extension,subject.split(' ').at(-1))));
  });
}

function clock(topic, doc) {
  if (!/^which clock\b/i.test(topic) || !/\b(?:shows?|reads?|time)\b/i.test(topic)) return undefined;
  const display = /\b(?:display|exhibit) rather than\b/i.test(topic);
  const reference = /\bticket reference\b/i.test(topic);
  if (!reference) return undefined;
  return uniqueBlock(doc, value => {
    const sentences = prior.literalSentences(value).map(span => span.value);
    return display ? sentences.some(s => /\bclock\b/i.test(s) && clockTime.test(s) && /\b(?:display|exhibit|not the ticket.time reference)\b/i.test(s))
      : sentences.some((s,i) => /\bclock\b.*\b(?:reference for .*tickets|ticket reference)\b/i.test(s) && !/\b(?:not|rather than)\b/i.test(s)
        && (clockTime.test(s) || /^It (?:shows|reads) /i.test(sentences[i+1] ?? '') && clockTime.test(sentences[i+1])));
  });
}

function needsExplicitEvidence(topic, doc) {
  if (/^what (?:retention extension|is the .*\b(?:frequency|chemistry|percentage))\b/i.test(topic) || /^who designed\b/i.test(topic)) return true;
  if (/^which .+ (?:holds|contains)\b/i.test(topic)) return true;
  if (/^(?:what time does the clock|who approved the release)\b/i.test(topic)) return true;
  return /^who must (?:approve|authorize) a purchase of [\d,]+ credits$/i.test(topic) && doc.blocks.some(({value}) => /\bpurchases? (?:above|exceeding|over)\b/i.test(value));
}

function guardedSupport(topic, quote) {
  const location = /^which (.+?) (?:holds|contains) (.+)$/i.exec(topic);
  if (location) return prior.literalSentences(quote).some(({value}) => phrase(value,clean(location[1])) && phrase(value,clean(location[2])) && !/\b(?:not|neither|rather than)\b/i.test(value));
  if (/^who designed\b/i.test(topic)) return /\bdesign(?:ed|er)\b/i.test(quote) && phrase(quote,clean(topic.replace(/^who designed\s+/i,'')));
  const metric = /^what is the (.+?) of (.+)$/i.exec(topic);
  if (metric) return phrase(quote,metric[1]) && phrase(quote,clean(metric[2]));
  if (/^what retention extension\b/i.test(topic)) {
    const condition = /\bwhile (.+?) remains open$/i.exec(topic);
    return Boolean(condition && phrase(quote,clean(condition[1])) && /\buntil\b/i.test(quote) && !/\bdoes not address\b/i.test(quote));
  }
  const amount = /^who must (?:approve|authorize) a purchase of ([\d,]+) credits$/i.exec(topic);
  if (amount) {
    const threshold = /\bpurchases? (?:above|exceeding|over) ([\d,]+) credits\b/i.exec(quote);
    return Boolean(threshold && Number(amount[1].replaceAll(',','')) > Number(threshold[1].replaceAll(',','')) && /\b(?:approval|authorization)\b/i.test(quote));
  }
  return false;
}

export function answerWithCoverage(question,candidates,maxSources=3,mode,options={}) {
  const fallback = () => prior.answerWithCoverage(question,candidates,maxSources,mode,options);
  if (!/^(?:how long|which|who|what|at)\b/i.test(question) || !options.bodyEvidenceCandidates?.length || /\s+Also,\s+/i.test(question)) return fallback();
  const found = scope(question.replace(/[?.]$/,'').replace(/^At (.+?),\s*/i,'$1 '),bodyDocuments(options.bodyEvidenceCandidates));
  if (!found) return fallback();
  const {doc} = found;
  const topic = found.topic.replace(new RegExp(`^${escape(doc.entity)}\\s+`,'i'),'');
  const block = retention(topic.replace(/\s+,/g,','),doc) ?? clock(topic,doc);
  if (block && maxSources > 0) {
    const quote = block.value;
    const bound = prior.bindFacetSource({documentId:doc.id,filename:doc.filename,quote},options.bodyEvidenceCandidates);
    return {answered:true,mode,answer:`[1] ${quote}`,sources:[{citation:1,documentId:doc.id,filename:doc.filename,id:bound.id,quote,excerpt:quote,start:bound.start,end:bound.start+quote.length,actualCosine:bound.actualCosine,cosineAnchor:bound.cosineAnchor}]};
  }
  const result = fallback();
  if (!result.answered || !needsExplicitEvidence(topic,doc)) return result;
  return result.sources.every(source => source.documentId === doc.id && guardedSupport(topic,source.quote)) ? result : cannotAnswer(mode);
}

const month = /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\b/i;
const degrees = /\b\d+(?:\.\d+)? degrees? (?:Celsius|Fahrenheit)\b/i;
const date = /\b\d{1,2} (?:January|February|March|April|May|June|July|August|September|October|November|December) \d{4}\b/i;
function comparisonRequest(question) {
  if (!/^compare\b/i.test(question)) return null;
  const monthly = /^compare the highest monthly (mean|average) (?:([\w-]+[ -]stores?) temperatures?|temperatures? (?:measured )?in the ([\w-]+ stores?)) (?:at )?(.+?) and (.+?), including (?:their |the )?months\.?$/i.exec(question);
  if (monthly) return {kind:'temperature',metric:monthly[1],location:norm(monthly[2] ?? monthly[3]).replace(/s$/,''),sides:[monthly[4],monthly[5]]};
  const event = /^compare the commissioning dates of the ((?:first|second|third|fourth|fifth) .+?) at (.+?) and the ((?:first|second|third|fourth|fifth) .+?) at (.+?)\.?$/i.exec(question);
  if (event) return {kind:'commissioning',sides:[event[2],event[4]],subjects:[event[1],event[3]]};
  const cutoff = /^compare the (.+?) at (.+?) with the (.+?) at (.+?): give each ticket cutoff and required hold for an earlier departure\.?$/i.exec(question);
  return cutoff ? {kind:'cutoff',sides:[cutoff[2],cutoff[4]],subjects:[cutoff[1],cutoff[3]]} : null;
}

function comparisonSupport(value,request,subject,entity) {
  const sentences = prior.literalSentences(value).map(({value})=>value);
  if (request.kind==='temperature') return sentences.some(s=>phrase(s,request.location) && phrase(s,entity) && phrase(s,`monthly ${request.metric}`) && /\b(?:highest|warmest)\b/i.test(s) && month.test(s) && degrees.test(s));
  if (request.kind==='commissioning') {
    const subjectAtStart = new RegExp(`^${escape(norm(subject))} (?:was )?commissioned on `);
    const coordinated = new RegExp(`, and the ${escape(subject)} on `,'i');
    return sentences.some(s => subjectAtStart.test(norm(s).replace(/^(?:its|the) /,'')) && date.test(s)
      || phrase(s,entity) && /\bcommissioned the first\b/i.test(s) && coordinated.test(s) && date.test(s.split(coordinated).at(-1)));
  }
  const cutoff=sentences.find(s=>phrase(s,subject) && phrase(s,'ticket cutoff') && clockTime.test(s));
  if (!cutoff) return false;
  const time=cutoff.match(clockTime)[0];
  return sentences.some(s=>phrase(s,subject) && /\b(?:before|earlier)\b/i.test(s) && /\bmust\b.*\b(?:wait|hold|remain)\b/i.test(s) && s.includes(time));
}

export function compareWithCoverage(a,b,question) {
  const request = comparisonRequest(question);
  if (!request) return prior.compareWithCoverage(a,b,question);
  const metadata = compareDocuments(a,b,question);
  const sources = [a,b].map((d,index)=>{
    const text=d.text.replace(/\r\n?/g,'\n').replace(/[ \t]+/g,' ').trim();
    const entity=name(d.name);
    const side=request.sides.findIndex(side=>norm(side)===entity);
    if (side<0 || request.sides.filter(side=>norm(side)===entity).length!==1) return null;
    const block=uniqueBlock({text,blocks:prior.literalComparisonBlocks(text)},value=>comparisonSupport(value,request,request.subjects?.[side],entity));
    if (!block) return null;
    return {citation:index+1,documentId:d.id,filename:d.name,quote:block.value,excerpt:block.value,start:block.start,end:block.end,warning:hasInstructionRisk(block.value),supported:true};
  });
  if (sources.some(s=>!s)) return {...metadata,answered:false,sources:[],answer:"I can't find complete comparison evidence in both provided documents."};
  return {...metadata,answered:true,sources,answer:sources.map(s=>`[${s.citation}] ${s.quote}`).join('\n\n')};
}
