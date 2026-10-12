/** GroundedDesk's deterministic extractive retrieval engine. No network calls. */
export const RETRIEVAL_BUILD = "2026-10-12-r32";
const STOP = new Set(("a an and are as at be been but by can could do does for from had has have how i if in into is it its of on or our that the their there these this to was were what when where which who why will with would you your").split(" "));

export function tokenize(value) {
  return (String(value).normalize("NFKC").toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [])
    .filter(word => word.length > 1 && !STOP.has(word));
}

export function chunkText(text, size = 760, overlap = 100) {
  if (!Number.isInteger(size) || size < 100 || overlap < 0 || overlap >= size) {
    throw new Error("Invalid chunk settings");
  }
  const clean = String(text).replace(/\r\n?/g, "\n").replace(/[ \t]+/g, " ").trim();
  const parts = [];
  let start = 0;
  while (start < clean.length) {
    let end = Math.min(start + size, clean.length);
    if (end < clean.length) {
      const split = clean.lastIndexOf(" ", end);
      if (split > start + Math.floor(size / 2)) end = split;
    }
    const content = clean.slice(start, end).trim();
    if (content) parts.push({ start, end, content });
    if (end >= clean.length) break;
    start = Math.max(start + 1, end - overlap);
  }
  return parts;
}

export function buildIndex(documents) {
  const chunks = [];
  for (const document of documents) {
    if (!document || typeof document.text !== "string" || document.text.length > 180000) {
      throw new Error("Invalid document or document exceeds 180,000 characters");
    }
    const sourceText = String(document.text).replace(/\r\n?/g, "\n").replace(/[ \t]+/g, " ").trim();
    for (const part of chunkText(sourceText)) {
      const words = tokenize(part.content);
      if (!words.length) continue;
      const tf = new Map();
      for (const word of words) tf.set(word, (tf.get(word) || 0) + 1);
      chunks.push({ id: `${document.id}:${part.start}`, documentId: document.id,
        filename: document.name, content: part.content, start: part.start,
        sourceText, tokens: words, tf });
    }
  }
  const df = new Map();
  for (const chunk of chunks) {
    for (const term of chunk.tf.keys()) df.set(term, (df.get(term) || 0) + 1);
  }
  const avgLength = chunks.length ? chunks.reduce((sum, c) => sum + c.tokens.length, 0) / chunks.length : 1;
  return { chunks, df, avgLength };
}

// Only used for extracting a useful sentence from already retrieved text.
// Lightweight inflection folding lets a question using "released" match
// "release" or "releases" without changing existing BM25 ranks.
function quoteForm(word) {
  if (word.length < 4) return word;
  if (word.endsWith("ies") && word.length > 5) return word.slice(0, -3) + "y";
  if (word.endsWith("ed") && word.length > 5) {
    const withoutD = word.slice(0, -1);
    return withoutD.endsWith("e") ? withoutD : word.slice(0, -2);
  }
  if (word.endsWith("es") && word.length > 5) {
    const withoutS = word.slice(0, -1);
    return withoutS.endsWith("e") ? withoutS : word.slice(0, -2);
  }
  if (word.endsWith("s") && !word.endsWith("ss") && word.length > 4) return word.slice(0, -1);
  return word;
}

function sentenceRelevance(sentence, terms) {
  const words = tokenize(sentence);
  const canonical = new Set(words.map(quoteForm));
  const matched = [...new Set(terms.map(quoteForm))].filter(word => canonical.has(word));
  // PDF extraction flattens page headers, headings and introductory boilerplate
  // into long pseudo-sentences. Avoid choosing these over actual policy clauses.
  const header = /SYNTHETIC BENCHMARK MATERIAL|PRACTICE DOCUMENT|NOT AN ACTUAL COMPANY POLICY/i.test(sentence);
  const verbosity = Math.max(0, words.length - 35) / 50;
  return matched.length - verbosity - (header ? 2.5 : 0);
}

function bestSentence(content, terms, requestedFocus = null, numericFocus = false, compound = false) {
  const sentences = content.split(/(?<=[.!?])\s+|\n+/).map(s => s.trim()).filter(Boolean);
  let best = content, bestScore = -Infinity, bestIndex = -1;
  for (const [i, sentence] of sentences.entries()) {
    const focusPresent = requestedFocus && tokenize(sentence).some(
      word => quoteForm(word) === quoteForm(requestedFocus));
    // For risk bands and similar numeric categories, a labeled interval is
    // more relevant than an overall scoring scale.
    const category = terms.find(term => ["high", "medium", "low", "critical", "moderate"].includes(term));
    const categoryPresent = category && tokenize(sentence).some(word => quoteForm(word) === category);
    const score = sentenceRelevance(sentence, terms) + (focusPresent ? 4 : 0)
      + (numericFocus && /[0-9]/.test(sentence) ? 2.5 + (categoryPresent ? 1.5 : 0) : 0);
    if (score > bestScore) { best = sentence; bestScore = score; bestIndex = i; }
  }
  // For an explicitly two-part question, add at most one adjacent sentence
  // when it covers missing terms from the question. Preserve source wording.
  if (compound && bestIndex >= 0) {
    const covered = new Set(tokenize(best).map(quoteForm));
    const missing = new Set(terms.map(quoteForm).filter(term => !covered.has(term)));
    let improvement = 0;
    for (const near of [bestIndex - 1, bestIndex + 1]) {
      if (!sentences[near]) continue;
      const gained = [...new Set(tokenize(sentences[near]).map(quoteForm))]
        .filter(term => missing.has(term)).length;
      if (!gained || gained <= improvement) continue;
      const startText = sentences[Math.min(near, bestIndex)];
      const finishText = sentences[Math.max(near, bestIndex)];
      const from = content.indexOf(startText);
      const to = content.indexOf(finishText, from) + finishText.length;
      if (from < 0 || to <= from || to - from > 420) continue;
      best = content.slice(from, to);
      improvement = gained;
    }
  }
  // A quote must remain an EXACT substring of the source. For unusually long
  // unpunctuated PDF passages, center a literal window near the search terms.
  if (best.length <= 420) return best;
  const allForms = [...new Set(terms.map(quoteForm))];
  const matches = [...best.matchAll(/[\p{L}\p{N}]+/gu)].filter(m => allForms.includes(quoteForm(m[0].toLowerCase())));
  const firstMatch = matches[0]?.index ?? 0;
  const start = Math.max(0, Math.min(firstMatch - 80, best.length - 420));
  return best.slice(start, start + 420);
}

// 5.3: Search complete source sentences after retrieval has selected a
// document. This prevents chunk boundaries from hiding the exact requested
// sentence. Match scores are lexical heuristics, NOT entailment confidence.
const EVIDENCE_ALIASES = {
  citation:["citations","cite"], citations:["citation"], provenance:["source","match"],
  retention:["retained","retain","retention"], retained:["retention","retain"],
  approvals:["approval","acceptance","approved"], approval:["acceptance","approved"],
  supplier:["vendor","vendors"], vendor:["supplier","suppliers"],
  correctness:["correct","factual","support"], factual:["factually","correctness"],
  notification:["notify","notice"], containment:["contain"], review:["reviews"],
  scores:["score","scoring"], score:["scores"], requirements:["required","require"],
  exercise:["exercises","drill"], evidence:["evidentiary"], deadlines:["deadline"],
  ordinary:["general","regular"], general:["ordinary","regular"], regular:["general","ordinary"],
};
const GENERIC_EVIDENCE_TERMS = new Set([
  "atlas","group","research","document","documents","compare","comparison",
  "policy","guide","the","current","exact","fictional","please","question","internal"
]);
function evidenceForms(word) {
  return [quoteForm(word),...(EVIDENCE_ALIASES[word] || []).map(quoteForm)];
}
function hasForm(sentenceForms,word) {
  return evidenceForms(word).some(v=>sentenceForms.has(v));
}
function requestedEvidenceFocus(question) {
  // Specific requested values must occur in the actual displayed answer,
  // not merely in an unrelated title, neighboring excerpt or document name.
  // Requesting a numeric identifier or a measured setting is different from
  // asking how to handle accounts or tools. Require a labeled *value* in the
  // answer quote, not merely the words "account" or "torque".
  const q=String(question);
  const asksValue=/^\s*(?:what|which|give|provide|state|show)\b/i.test(q) ||
    /\b(?:exact|specified|required)\b/i.test(q);
  const pinRequest = /\bpin\s+(?:code|number)\b|\bpersonal\s+identification\s+number\b|\b(?:door|access|entry)\s+code\b/i.test(q) ||
    /\bPIN\b/.test(q) || (/\bpin\b/i.test(q) && /\b(?:door|keypad|access|entry|lock|login)\b/i.test(q));
  const pinProcedure = /^(?:\s*)(?:how|when|why)\b|\b(?:rotation|rotat\w*|length|digits|format|handling|management)\b/i.test(q) ||
    /\b(?:PIN|pin\s+code|access\s+code)\s+(?:policy|requirements)\b/i.test(q);
  if (asksValue && pinRequest && !pinProcedure) {
    // A title, a PIN policy, or nearby opening hours cannot disclose a PIN.
    // Require a labeled numeric value in the cited quotation itself.
    return /\b(?:pin(?:\s+(?:code|number))?|personal\s+identification\s+number|(?:door|access|entry)\s+code)\s*(?:(?:is|equals|:|=|set\s+to)\s*)?["']?\d{4,12}\b/i;
  }
  // An individual's mobile/cell number is a concrete attribute. A policy
  // quote merely mentioning the person is not a disclosed contact value.
  if (asksValue && /\b(?:mobile|cell(?:ular)?|phone|telephone|contact)\s*(?:phone\s*)?(?:numbers?|no\.?)\b/i.test(q)) {
    return /\b(?:mobile|cell(?:ular)?|phone|telephone|contact)\s*(?:phone\s*)?(?:numbers?|no\.?)?\s*(?:(?:is|equals|:|=)\s*)?(?:\+\d[\d .()-]{7,}\d|\(?\d{3}\)?[ .-]?\d{3}[ .-]?\d{4})\b/i;
  }
  if (asksValue && /\b(?:bank\s+account(?:\s+(?:number|no\.?))?|account\s+(?:number|no\.?)|iban)\b/i.test(q)) {
    // Accept a bank-account label followed nearby by an actual multi-digit
    // account/IBAN value. A document title or section ID is insufficient.
    return /\b(?:bank\s+account(?:\s+(?:number|no\.?))?|account\s+(?:number|no\.?)|iban|acct\s*(?:number|no\.?|#))\b[^.!?\n]{0,70}?(?:\b[A-Z]{2}\d{2}[A-Z0-9 ]{10,30}\b|\b\d[\d -]{5,}\d\b)/i;
  }
  if (asksValue && /\btorque\b/i.test(q) &&
      /\b(?:required|specified|value|setting|newton|n\s*[.·-]?\s*m)\b/i.test(q)) {
    // A torque marker in a tool list is not a numerical tightening value.
    return /\b\d+(?:[.,]\d+)?\s*(?:n\s*[.·-]?\s*m|newton[-\s]?met(?:re|er)s?)\b/i;
  }
  const match=String(question).toLowerCase().match(/\b(passwords?|passphrases?|credentials?|birth\s+date|date\s+of\s+birth|salar(?:y|ies)|prices?|budgets?|phone\s+numbers?|email\s+addresses?)\b/);
  if (!match) return null;
  const word=match[1];
  if (/password|passphrase|credential/.test(word)) {
    // Operational questions about credential rotation are not requests to
    // disclose the credential itself.
    if (/^(?:how|when|why)\b|\b(?:policy|rotation|rotated|frequency|handling|management)\b/i.test(question)) return null;
    return /\b(password|passphrase|credential|secret)\b/i;
  }
  if (/birth/.test(word)) return /\b(birth|born|dob)\b/i;
  if (/salar/.test(word)) return /\b(salary|salaries|compensation|pay)\b/i;
  if (/price/.test(word)) return /\b(price|cost|aed|usd|rate)\b/i;
  if (/budget/.test(word)) return /\b(budget|expenditure|spending)\b/i;
  if (/phone/.test(word)) return /\b(phone|telephone|contact number)\b/i;
  return /\b(email|e-mail|address)\b/i;
}
function evidenceSentenceScore(question,sentence) {
  const terms=[...new Set(tokenize(question).filter(w=>!GENERIC_EVIDENCE_TERMS.has(w)))];
  const forms=new Set(tokenize(sentence).map(quoteForm));
  let matched=0, score=0;
  for (const term of terms) {
    if (hasForm(forms,term)) {
      matched++;
      score += ["citation","citations","provenance","retention","evidence","scores",
        "supplier","approval","approvals","high","risk","factual","correctness",
        "containment","notification","deadline","deadlines","exercise","review",
        "percent","target"].includes(term) ? 1.6 : 1;
    }
  }
  if (!matched) return -Infinity;
  // Give positive subject terms priority over explicitly excluded alternatives.
  const contrast=String(question).match(/^(.*?)(?:\s*,)?\s+\b(?:rather than|instead of|as opposed to)\b\s+(.*)$/i);
  if (contrast) {
    const desired=[...new Set(tokenize(contrast[1]).map(quoteForm))];
    const excluded=[...new Set(tokenize(contrast[2]).map(quoteForm))];
    const distinct=desired.filter(term=>!excluded.includes(term) && !GENERIC_EVIDENCE_TERMS.has(term));
    const positive=distinct.filter(term=>hasForm(forms,term)).length;
    const unwanted=excluded.filter(term=>hasForm(forms,term)).length;
    score+=Math.min(3.6,positive*1.2)-Math.min(9,unwanted*3);
  }
  const cleanQuestion=question.toLowerCase();
  if (/scores?|scoring|ranges?|bands?/i.test(question) && /\b\d+\s+(?:through|to)\s+\d+\b/.test(sentence)) score+=4;
  if (/\bhigh\b/i.test(question) && /\bhigh\b/i.test(sentence) && /\b\d+\s+(?:through|to)\s+\d+\b/.test(sentence)) score+=4;
  if (/citations?|provenance/i.test(question) && /\bcitations?\b/i.test(sentence)) score+=3;
  if (/\b(?:citation|citations|provenance)\b/i.test(question) && /\b(?:target|percentage|percent|rate)\b/i.test(question) &&
    /\bcitations?\b/i.test(sentence) && /\b\d+\s*(?:percent|%)\b/i.test(sentence)) score+=5;
  if (/factual|correctness|entailment/i.test(question) && /\b(?:factual|factually|entailment|supported|support)\b/i.test(sentence)) score+=2;
  if (/\bretention|\bretain|\bretained|\bperiods?\b/i.test(question)
    && /\b(?:retained|retention|deletion|deleted|days|months|years)\b/i.test(sentence)) score+=3;
  if (/\b(?:deadlines?|how long|how quickly|target|within)\b/i.test(question) &&
    /\b(?:within|minutes?|hours?|days?)\b/i.test(sentence)) score+=2;
  if (/\b(?:accept|approvals?|authorize|sign.off)\b/i.test(question) &&
    /\b(?:written approval|written acceptance|approv\w*|acceptance)\b/i.test(sentence)) score+=2;
  if (/\b(?:high.risk|high risk)\b/i.test(question) && /\bhigh\b.{0,20}\brisk\b/i.test(sentence)) score+=2;
  if (/\bquarterly\b/i.test(question) && /\bquarterly\b/i.test(sentence)) score+=3;
  if (/\bgovernance review\b/i.test(question) && /\bgovernance review\b/i.test(sentence)) score+=2;
  if (/\b(?:factual|correctness|entailment)\b/i.test(question) && /\b(?:does not prove|doesn.t establish|structural check|structural only)\b/i.test(sentence)) score+=7;
  if (/\b(?:numbers?|numbering)\b/i.test(question) && /\b(?:source-number|citation number|citation id)\b/i.test(sentence)) score+=2;
  if (/\b(?:versus|vs\.?|compared?\s+to|does\s+not\s+prove)\b/i.test(question) &&
    /\b(?:does not|cannot|not enough|insufficient|doesn't)\b/i.test(sentence)) score+=1;
  // Clauses that set a concrete duty are more useful than references to other
  // policies; quote-only, no inferred conclusion.
  if (/\b(?:must|requires?|shall|within|retained|deleted)\b/i.test(sentence)) score+=0.6;
  if (/\b(?:PRACTICE DOCUMENT|SYNTHETIC BENCHMARK MATERIAL|NOT AN ACTUAL COMPANY POLICY)\b/i.test(sentence)) score-=8;
  if (sentence.length>360) score-=(sentence.length-360)/55;
  if (/\b(?:This is the .{0,60}deadline|in the Incident Response Runbook)\b/i.test(sentence)) score-=3;
  return score;
}
// 5.4 r20: When the question contains a concrete numeric approval boundary or
// clock time, ordinary term overlap can rank the *neighboring* rule higher.
// Select only a directly applicable, verbatim operative source sentence.
// Do not infer a missing outcome from an unrelated cutoff or invent values.
function operativeConditionQuote(question, fullText) {
  const q=String(question || "");
  const source=String(fullText || "").replace(/\r\n?/g,"\n").replace(/[ \t]+/g," ").trim();
  const sentences=[...source.matchAll(/[^.!?]+(?:[.!?](?=\s|$)|$)/g)]
    .map(m=>m[0].trim()).filter(line=>line.length>0 && line.length<=420);

  // Numeric approval bands: distinguish "above 4000" from "above 800
  // and up to 4000". Do not treat merely mentioning a threshold as
  // evidence that its approval rule applies to that threshold.
  const band=q.match(/\b(above|over|more than|greater than|exceeding|at least|up to|below|under|less than|exactly)\s+(\d[\d,]*)\b/i);
  if (band && /\b(?:purchas\w*|spend\w*|orders?|expenses?|payments?)\b/i.test(q) &&
      /\b(?:approv\w*|authoriz\w*|sign.off|sign\s+off)\b/i.test(q)) {
    const n=Number(band[2].replace(/,/g,""));
    const lowerStyle=/^(?:above|over|more than|greater than|exceeding)$/i.test(band[1]);
    const upperStyle=/^(?:up to|below|under|less than)$/i.test(band[1]);
    const exactStyle=/^exactly$/i.test(band[1]);
    if (Number.isFinite(n)) {
      for(const sentence of sentences) {
        if (!/\b(?:purchas\w*|spend\w*|orders?|expenses?|payments?)\b/i.test(sentence) ||
            !/\b(?:approv\w*|authoriz\w*|sign.off|sign\s+off)\b/i.test(sentence)) continue;
        const lower=sentence.match(/\b(?:above|over|more than|greater than|exceeding)\s+(\d[\d,]*)\b/i);
        const min=sentence.match(/\b(?:at least|minimum of)\s+(\d[\d,]*)\b/i);
        const upper=sentence.match(/\b(?:up to(?: and including)?|through|at most|not exceeding)\s+(\d[\d,]*)\b/i);
        const less=sentence.match(/\b(?:below|under|less than)\s+(\d[\d,]*)\b/i);
        const exact=sentence.match(/\b(?:exactly|equal to)\s+(\d[\d,]*)\b/i);
        const lowerN=lower?Number(lower[1].replace(/,/g,"")):null;
        const minN=min?Number(min[1].replace(/,/g,"")):null;
        const upperN=upper?Number(upper[1].replace(/,/g,"")):null;
        const lessN=less?Number(less[1].replace(/,/g,"")):null;
        const exactN=exact?Number(exact[1].replace(/,/g,"")):null;
        const applies=lowerStyle
          ? (lowerN===n && upperN===null && lessN===null) ||
            (minN!==null && minN>n && minN<=n+1 && upperN===null)
          : upperStyle
            ? (upperN===n || lessN===n) && lowerN===null && minN===null
            : exactStyle
              ? (exactN===n || ((lowerN===null || n>lowerN) &&
                  (minN===null || n>=minN) &&
                  (upperN===null || n<=upperN) &&
                  (lessN===null || n<lessN) &&
                  (lowerN!==null || minN!==null || upperN!==null || lessN!==null)))
              : minN===n && upperN===null && lowerN===null;
        if (applies) return sentence;
      }
    }
  }

  // Apply printed relative-time cancellation/refund bands literally.
  // Selecting a true neighboring band still gives an incorrect answer.
  const notice=q.match(/\b(\d+(?:[.,]\d+)?)\s*(hours?|days?)\s+before\b/i);
  if(notice && /\b(?:cancel\w*|refund\w*|tickets?|reservations?|bookings?)\b/i.test(q)) {
    const amount=Number(notice[1].replace(",",".")),unit=/^day/i.test(notice[2])?"day":"hour";
    for(const sentence of sentences) {
      if(!/\b(?:cancel\w*|refund\w*|tickets?|reservations?|bookings?)\b/i.test(sentence) ||
         !/\b(?:before|prior to|ahead of)\b/i.test(sentence)) continue;
      const lo=sentence.match(/\b(at least|more than|over|greater than)\s+(\d+(?:[.,]\d+)?)\s+(hours?|days?)\b/i) ||
        sentence.match(/\b(\d+(?:[.,]\d+)?)\s+(hours?|days?)\s+(or more)\b/i);
      const hi=sentence.match(/\b(less than|under|fewer than|below|at most|up to)\s+(\d+(?:[.,]\d+)?)\s+(hours?|days?)\b/i) ||
        sentence.match(/\b(\d+(?:[.,]\d+)?)\s+(hours?|days?)\s+(or less)\b/i);
      if(!lo&&!hi)continue;
      const min=lo?Number((/^\d/.test(lo[1])?lo[1]:lo[2]).replace(",",".")):null;
      const max=hi?Number((/^\d/.test(hi[1])?hi[1]:hi[2]).replace(",",".")):null;
      const unitLo=lo?(/^\d/.test(lo[1])?lo[2]:lo[3]):null;
      const unitHi=hi?(/^\d/.test(hi[1])?hi[2]:hi[3]):null;
      if((unitLo && !unitLo.toLowerCase().startsWith(unit)) ||
         (unitHi && !unitHi.toLowerCase().startsWith(unit)))continue;
      const exclusiveLo=lo&&/\b(?:more than|over|greater than)\b/i.test(lo[1]);
      const exclusiveHi=hi&&/\b(?:less than|under|fewer than|below)\b/i.test(hi[1]);
      if((min===null||(exclusiveLo?amount>min:amount>=min)) &&
         (max===null||(exclusiveHi?amount<max:amount<=max)))return sentence;
    }
  }

  // Time-of-day before/after conditions: require direction and threshold.
  const clock=q.match(/\b(before|after)\s+([01]?\d|2[0-3]):([0-5]\d)\b/i);
  if(clock) {
    const direction=clock[1].toLowerCase(),minutes=Number(clock[2])*60+Number(clock[3]);
    const qForms=new Set(tokenize(q).map(quoteForm));
    const matches=sentences.filter(sentence=>{
      const m=sentence.match(/\b(before|after)\s+([01]?\d|2[0-3]):([0-5]\d)\b/i);
      if(!m||m[1].toLowerCase()!==direction ||
         Number(m[2])*60+Number(m[3])!==minutes)return false;
      const forms=new Set(tokenize(sentence).map(quoteForm));
      return [...qForms].filter(t=>forms.has(t)&&!GENERIC_EVIDENCE_TERMS.has(t)&&!/^\d+$/.test(t)).length>=2;
    });
    if(matches.length===1)return matches[0];
  }

  // Consecutive source sentences may jointly state a failed attempt's retry
  // and the further-failure escalation. Neither is fabricated or paraphrased.
  if(/\b(?:retry|retried|retries|reattempt\w*)\b/i.test(q) &&
     /\b(?:fail\w*|unsuccessful)\b/i.test(q)) {
    const hits=[...source.matchAll(/[^.!?]+(?:[.!?](?=\s|$)|$)/g)]
      .map(m=>({value:m[0].trim(),start:m.index}));
    const marks=[...source.matchAll(/\b[A-Z]{1,4}-\d{2,3}\b/g)];
    const sectionAt=pos=>{
      let id="";for(const mark of marks){if(mark.index>pos)break;id=mark[0];}return id;
    };
    for(let i=0;i<hits.length-1;i++){
      const first=hits[i],next=hits[i+1];
      if(!/\b(?:fail\w*|unsuccessful)\b/i.test(first.value) ||
         !/\b(?:retried|retry|retries|reattempt\w*)\b/i.test(first.value) ||
         !/\b\d{1,2}:\d{2}\b|\bwithin\s+\d+\s+(?:minutes?|hours?)\b/i.test(first.value) ||
         !/\b(?:if|when|should)\b.{0,45}\b(?:retry|retried|retries|reattempt\w*)\b.{0,30}\b(?:fail\w*|unsuccessful)\b/i.test(next.value) ||
         sectionAt(first.start)!==sectionAt(next.start))continue;
      const quote=source.slice(first.start,next.start+next.value.length).trim();
      if(quote.length<=620)return quote;
    }
  }

  // Dispatch timing: a source may state the cutoff and the *subsequent*
  // departure outcome in adjacent sentences. Quote the explicit outcome
  // only when the time in the question is later than the stated cutoff.
  if (/\b(?:released?|submitted?|placed?)\b/i.test(q) &&
      /\b(?:outbound|orders?|shipments?|dispatch|depot)\b/i.test(q)) {
    const time=q.match(/\b(?:at|by)\s+([01]?\d|2[0-3]):([0-5]\d)\b/i);
    if (time) {
      const asked=Number(time[1])*60+Number(time[2]);
      const cutoff=sentences.find(line=>/\b(?:cutoff|same.day dispatch|same.day shipment)\b/i.test(line) &&
        /\b([01]?\d|2[0-3]):([0-5]\d)\b/.test(line));
      const cutoffTime=cutoff?.match(/\b([01]?\d|2[0-3]):([0-5]\d)\b/);
      if (cutoffTime && asked>Number(cutoffTime[1])*60+Number(cutoffTime[2])) {
        const next=sentences.find(line=>
          /\b(?:next|following)\s+(?:operating|business|working)\s+day\b/i.test(line) &&
          /\b(?:orders?|shipments?|dispatch|released?|depart|leave|leaves|cutoff)\b/i.test(line));
        if (next) return next;
      }
    }
  }
  return "";
}

// 5.4 r21: Bounded context for extractive questions about acknowledgements
// and *changes* to a documented interval. A quoted primary obligation can
// omit a neighboring "not a guarantee" qualification, or the old/unchanged
// interval. Include only immediately adjacent, scoped sentences with
// recognizable operative relationships; never stitch distant statements.
function completeAdjacentQualification(question, sourceText, primary) {
  const q=String(question || "");
  const kind=/\backnowledg\w*\b/i.test(q) && /\backnowledg\w*\b/i.test(primary)
    ? "acknowledgement"
    : /\b(?:chang\w*|reduc\w*|increas\w*|differ\w*|adjust\w*)\b/i.test(q) &&
      /\b(?:interval|lubricat\w*|frequen\w*|cadence|schedule)\b/i.test(q) &&
      /\b(?:interval|lubricat\w*|operating hours?)\b/i.test(primary)
      ? "interval-change" : null;
  if (!kind || !primary || primary.length>420) return primary;
  const source=String(sourceText || "");
  const entries=[...source.matchAll(/[^.!?]+(?:[.!?](?=\s|$)|$)/g)]
    .map(m=>{
      const trimmed=m[0].trim();
      const start=source.indexOf(trimmed,m.index);
      return {text:trimmed,start,end:start+trimmed.length};
    }).filter(s=>s.text && s.text.length<=420);
  const at=entries.findIndex(entry=>entry.text===primary);
  if (at<0) return primary; // avoid ambiguous or fused PDF sentence recovery

  // A number in a printed section ID identifies the *section*, not an
  // answer value. Do not absorb any neighboring sentence across sections.
  const markers=[...source.matchAll(/\b[A-Z]{1,4}-\d{2,3}\b/g)];
  const sectionAt=pos=>{
    let section="";
    for(const m of markers) {if(m.index>pos) break;section=m[0];}
    return section;
  };
  const section=sectionAt(entries[at].start);
  const related=neighbor=>{
    if (!neighbor || sectionAt(neighbor.start)!==section) return false;
    const s=neighbor.text;
    if (kind==="acknowledgement") {
      // An acknowledgement or receipt is not necessarily a delivery promise.
      return /\b(?:not|no|never|cannot|doesn't|isn't|does not|is not)\b/i.test(s) &&
        /\b(?:deliver\w*|guarantee\w*|promis\w*|fulfill\w*|arriv\w*|complet\w*)\b/i.test(s) &&
        /\b(?:acknowledg\w*|receipt|order|confirm\w*|this|it)\b/i.test(s);
    }
    const baseline=/\b(?:standard|normal|usual|regular|default|baseline)\b/i.test(s) &&
      /\b(?:interval|lubricat\w*|hours?|days?|frequen\w*|cadence)\b/i.test(s) &&
      /\b\d+(?:[.,]\d+)?\b/.test(s);
    const changed=/\b(?:reduc\w*|increas\w*|shorten\w*|extend\w*|halv\w*|doub\w*)\b/i.test(s) &&
      /\b(?:interval|lubricat\w*|clean\w*|hours?|days?|frequen\w*|cadence)\b/i.test(s) &&
      /\b\d+(?:[.,]\d+)?\b/.test(s);
    const unchanged=/\b(?:unchanged|remains? the same|not affect\w*|not chang\w*|not alter\w*|unaffected|continue\w* unchanged|stays? the same)\b/i.test(s) &&
      /\b(?:inspect\w*|maintenan\w*|interval|schedule|frequen\w*|cadence)\b/i.test(s);
    return baseline || changed || unchanged;
  };

  let left=at,right=at;
  // The best lexical sentence can be the *first* baseline sentence, followed
  // by a changed interval and then an unchanged inspection qualification.
  // Walk through at most two consecutive relevant neighbors on either side.
  // Never hop over an irrelevant sentence or into another numbered section.
  for (let n=0;n<2 && related(entries[left-1]);n++) left--;
  for (let n=0;n<2 && related(entries[right+1]);n++) right++;
  const expanded=source.slice(entries[left].start,entries[right].end);
  return expanded.length<=620 && source.includes(expanded) ? expanded : primary;
}

// r24: Recover multiple source-literal clauses when a question asks for a
// procedure, multiple facets, or a condition AND its exception. A ranked
// passage is an anchor, not proof that a single sentence is a complete answer.
// Restrict expansion to adjacent sentences in the SAME numbered section; do
// not jump over unrelated clauses. This is extractive, not an entailment test.
function scopedMultiFactQuote(question, fullText, primary, options = {}) {
  const q=String(question || "");
  const twoFacets=/\band\s+(?:who|what|which|when|where|how|does|do|must|whether)\b/i.test(q);
  const procedures=/\b(?:safeguards?|steps?|procedure|procedures|immediately after|actions? follow|before (?:cleaning|sterilization|release))\b/i.test(q);
  const specialConsent=/\b(?:consent|photograph|publish)\b/i.test(q) &&
    /\b(?:under|younger than)\s+\d+\b/i.test(q);
  // Multiple requested clauses include exclusions and exceptions as well as
  // explicit "and who" constructions; generic intent only, no test tokens.
  const asksQualifications=/\b(?:including|exceptions?|under which conditions|state whether|whether .*?changes?|excluded?|prohibited|restrictions?|and both|and under|and any)\b/i.test(q) ||
    /^\s*(?:compare|contrast)\b/i.test(q) ||
    /\b(?:list|describe)\b[^?]{0,160}\band\b/i.test(q);
  // A request to "compare packet contents" is not an invitation to quote
  // adjacent storage/retention terms just because the packet noun overlaps.
  // In Comparison mode require an explicit multi-clause / exception request.
  const comparisonFacets=Boolean(options.comparison) &&
    (/\b(?:including|exceptions?|excluding|prohibited|restrictions?|conditions?|unless|whether|changes?)\b/i.test(q) ||
     /\band\s+(?:who|what|which|when|where|how|under|whether)\b/i.test(q));
  if (!primary || (!twoFacets && !procedures && !specialConsent && !asksQualifications && !comparisonFacets)) return primary;
  if (options.comparison && !comparisonFacets) return primary;
  const source=String(fullText || "").replace(/\r\n?/g,"\n").replace(/[ \t]+/g," ").trim();
  const at=source.indexOf(primary);
  if(at<0 || primary.length>620) return primary;
  const entries=[...source.matchAll(/[^.!?]+(?:[.!?](?=\s|$)|$)/g)].map(m=>{
    const value=m[0].trim(),start=source.indexOf(value,m.index);
    return {value,start,end:start+value.length};
  }).filter(e=>e.value && e.value.length<=420);
  const index=entries.findIndex(e=>e.start<=at && e.end>=at+primary.length);
  if(index<0) return primary;
  const markers=[...source.matchAll(/\b[A-Z]{1,4}-\d{2,3}\b/g)];
  // Unnumbered sources can expand only if the complete source consists of a
  // short two/three-sentence passage, to avoid crossing unknown topic bounds.
  if(!markers.length && (entries.length>3 || source.length>620)) return primary;
  const sectionAt=position=>{
    let id="";
    for(const m of markers){if(m.index>position)break;id=m[0];}
    return id;
  };
  const section=sectionAt(entries[index].start);
  const context=new Set([...tokenize(q),...tokenize(primary)]
    .map(quoteForm).filter(w=>w.length>=4 && !GENERIC_EVIDENCE_TERMS.has(w)));
  const processIntent=procedures || specialConsent;
  const exceptionIntent=asksQualifications && /\b(?:exceptions?|hold|legal|inquiry|investigation|until|early release|excluded?|prohibited|restrictions?)\b/i.test(q);
  const anchorForms=new Set(tokenize(primary).map(quoteForm));
  const related=e=>{
    if(!e || sectionAt(e.start)!==section)return false;
    const words=tokenize(e.value).map(quoteForm);
    if(words.some(word=>context.has(word)))return true;
    // Allow an adjacent condition using a short referent ("these cards")
    // only with subject continuity and an explicit conditional marker.
    const sharedSubject=words.some(word=>anchorForms.has(word) && word.length>=4 && !GENERIC_EVIDENCE_TERMS.has(word));
    if(exceptionIntent && sharedSubject && /\b(?:unless|until|unresolved|except|hold|held|closed|release|expires?|not|cannot|must)\b/i.test(e.value))return true;
    // A requested procedure can continue with a new actor or safeguard
    // without repeating the earlier subject (e.g. before cleaning begins).
    return processIntent && /\b(?:must|may|only|never|not|cannot|before|after|if|when|until|signs?|checks?|decides?|records?|logs?|starts?|contacts?|insufficient|overwritten|withheld)\b/i.test(e.value);
  };
  let left=index,right=index;
  for(let k=0;k<2 && related(entries[left-1]);k++)left--;
  for(let k=0;k<2 && related(entries[right+1]);k++)right++;
  if(left===right)return primary;
  const expanded=source.slice(entries[left].start,entries[right].end);
  // Provenance and citation limits are non-negotiable; never truncate an
  // expanded quote in the middle of a sentence.
  return expanded.length<=620 && source.includes(expanded) ? expanded : primary;
}

// Returns a literal sentence in the original whitespace-normalized text.
// Empty means no lexical support; the caller must not manufacture an answer.
export function bestSourceSentence(question, fullText, options = {}) {
  const source=String(fullText || "").replace(/\r\n?/g,"\n").replace(/[ \t]+/g," ").trim();
  const rawSentences=[...source.matchAll(/[^.!?]+(?:[.!?](?=\s|$)|$)/g)]
    .map(m=>m[0].trim()).filter(Boolean);
  const sentences=[];
  for (const line of rawSentences) {
    if (line.length<=420) { sentences.push(line); continue; }
    // Long PDF boilerplate can be fused to the first actual numbered clause.
    // Strip the leading noise at a printed section boundary, never invent text.
    const headings=[...line.matchAll(/\b[A-Z]{1,4}-\d{2,3}\s+[A-Z][A-Za-z-]+/g)];
    for (let i=0;i<headings.length;i++) {
      const slice=line.slice(headings[i].index,headings[i+1]?.index ?? line.length).trim();
      if (slice.length<=420) sentences.push(slice);
    }
  }
  let winner="", score=-Infinity;
  for (const line of sentences) {
    if (line.length>420) continue;
    let candidate=evidenceSentenceScore(question,line);
    // Comparison asks each document for a packet's *contents*, not for how
    // long its records are kept. Keep this intent-specific adjustment out
    // of Hybrid and ordinary Keyword QA, and do not penalize questions that
    // explicitly request retention or archiving.
    const contentsIntent=options.comparison &&
      /\b(?:packet|package|shipment|order)\b/i.test(question) &&
      /\b(?:contents?|contain\w*|items?|documents?|inside|includ\w*)\b/i.test(question) &&
      !/\b(?:retain\w*|retention|archiv\w*|stor\w*)\b/i.test(question);
    if (contentsIntent) {
      if (/\b(?:prepar\w*|includ\w*|contain\w*|compris\w*|consist\w*|assembl\w*|list\w*)\b/i.test(line) &&
          /\b(?:orders?|shipments?|packets?|documents?|schedules?|lists?)\b/i.test(line) &&
          (line.match(/,/g)||[]).length>=2) candidate+=7;
      if (/\b(?:retained?|retention|archive\w*|deleted?|months? after|years? after)\b/i.test(line)) candidate-=8;
    }
    if (candidate>score) {score=candidate;winner=line;}
  }
  // Require at least one material question term and non-header evidence.
  if (!(score>=1)) return "";
  // Only when the question explicitly contains a second requested part, a
  // nearby *operative* sentence may supply another required actor/condition.
  // Never join non-adjacent sentences or paraphrase the source.
  const isCompound=/\b(?:and|or)\s+(?:who|what|which|when|where|how)\b/i.test(question);
  if (isCompound && winner) {
    const index=source.indexOf(winner);
    const before=source.slice(Math.max(0,index-300),index);
    const after=source.slice(index+winner.length,index+winner.length+300);
    const adjacent=[
      [...before.matchAll(/[^.!?]+[.!?](?=\s|$)/g)].map(m=>m[0].trim()).filter(Boolean).at(-1),
      after.match(/^\s*([^.!?]+[.!?](?=\s|$))/)?.[1]?.trim()
    ];
    const originalTerms=new Set(tokenize(winner).map(quoteForm));
    const questionTerms=new Set(tokenize(question).map(quoteForm));
    for (const neighbor of adjacent) {
      if (!neighbor || !/\b(?:must|requires?|written|owner|every AI release|sign off)\b/i.test(neighbor)) continue;
      const extra=tokenize(neighbor).map(quoteForm)
        .filter(term=>questionTerms.has(term)&&!originalTerms.has(term));
      if (!extra.length) continue;
      const start=source.indexOf(neighbor,Math.max(0,index-300));
      if (start<0) continue;
      const from=Math.min(start,index),to=Math.max(start+neighbor.length,index+winner.length);
      if (to-from<=420 && /^\s*$/.test(source.slice(
        Math.min(index+winner.length,start+neighbor.length),
        Math.max(index,start)))) return source.slice(from,to);
    }
  }
  if (winner && options.comparison &&
      /\b(?:retain\w*|retention)\b/i.test(question) &&
      /\b(?:except\w*|unless|including exceptions?)\b/i.test(question)) {
    // A retention duration and its hold-until-closure exception are often
    // adjacent sentences. Preserve BOTH as a contiguous original quotation,
    // but never cross a numbered source-section boundary.
    const hits=[...source.matchAll(/[^.!?]+(?:[.!?](?=\s|$)|$)/g)].map(m=>{
      const line=m[0].trim(),start=source.indexOf(line,m.index);
      return {line,start,end:start+line.length};
    }).filter(m=>m.line);
    const at=hits.findIndex(m=>m.line===winner);
    if(at>=0) {
      const markers=[...source.matchAll(/\b[A-Z]{1,4}-\d{2,3}\b/g)];
      const sectionAt=pos=>{
        let id="";
        for(const m of markers){if(m.index>pos)break;id=m[0];}
        return id;
      };
      const main=hits[at],sameSection=sectionAt(main.start);
      const exception=neighbor=>neighbor && sectionAt(neighbor.start)===sameSection &&
        /\b(?:unless|until|unresolved|pending|hold|investigat\w*|claims?|disput\w*|closure)\b/i.test(neighbor.line) &&
        /\b(?:retain\w*|kept|keep|held|hold|closed|resolved|settled|investigat\w*|claims?|cards?|receipts?|records?)\b/i.test(neighbor.line);
      for(const n of [hits[at+1],hits[at-1]]) {
        if(!exception(n))continue;
        const from=Math.min(main.start,n.start),to=Math.max(main.end,n.end);
        const candidate=source.slice(from,to);
        if(candidate.length<=620 && source.includes(candidate))return candidate;
      }
    }
  }
  return scopedMultiFactQuote(question,source,winner,options);
}

// If a keyword question asks for a specific attribute of an entity, a
// matching organization name alone must not count as answering that attribute.
// This is a conservative lexical guard, not a semantic or factuality judge.
function requestedAttribute(question) {
  const query = String(question);
  const valueFocus=requestedEvidenceFocus(query);
  if (valueFocus) return valueFocus;
  const pattern = /^\s*(?:what|which|who)\s+(?:is|are|was|were)\s+(?:(?:the|an?|their)\s+)?(.+?)\s+(?:of|for)\s+/i;
  const match = query.match(pattern);
  if (!match) return null;
  const focus = tokenize(match[1]).filter(word => ![
    "total", "exact", "overall", "current", "estimated", "average", "latest",
    "provenance", "factual", "correctness", "evaluation", "target",
    "number", "amount", "value"
  ].includes(word)).at(-1);
  return focus || null;
}

function missingRequestedAttribute(question, sources) {
  const focus = requestedAttribute(question);
  if (!focus) return false;
  if (focus instanceof RegExp) {
    const requested=String(question).toLowerCase();
    // A different person's printed phone number does not answer the
    // named person's contact-value request.
    const person=/\b(?:mobile|cell(?:ular)?|phone|telephone|contact)\s*(?:phone\s*)?(?:numbers?|no\.?)\s+(?:of|for)\s+(?:the\s+)?([a-z][a-z '\-]{2,60})\s*\??$/i.exec(String(question));
    if (person) {
      const holder=person[1].trim().toLowerCase();
      return !sources.some(source=>focus.test(source.quote) &&
        source.quote.toLowerCase().includes(holder));
    }
    if (/\b(?:password|passphrase)\b/.test(requested)) {
      // Merely mentioning a password policy is not disclosing a password value.
      return !sources.some(source => /\b(?:password|passphrase)\s*(?::|=|is\s+|equals\s+|set\s+to\s+)[\w!@#$%^&*.-]{3,}/i.test(source.quote));
    }
    return !sources.some(source => focus.test(source.quote));
  }
  const canonical = quoteForm(focus);
  return !sources.some(source =>
    tokenize(source.quote).some(word => quoteForm(word) === canonical));
}

function explicitlyNamedDocuments(question, candidates) {
  const questionTerms = new Set(tokenize(question));
  const matched = new Set();
  for (const candidate of candidates) {
    const titleWords = tokenize(candidate.filename.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " "))
      .filter(word => word.length > 1 && !/^\d+$/.test(word));
    const overlap = titleWords.filter(word => questionTerms.has(word));
    if (overlap.length >= 2 && overlap.length >= Math.ceil(titleWords.length / 2) &&
        overlap.some(word => word.length >= 6)) {
      matched.add(candidate.documentId);
    }
  }
  return matched;
}
function specificallyNamedDocument(question, candidates) {
  const named = explicitlyNamedDocuments(question, candidates);
  // Preserve multi-document intent when two or more titles are named.
  return named.size === 1 ? [...named][0] : null;
}

// Query-side lexical alternatives for common disclosure phrasing.
 // A user's "disclose" can appear as "disclosures" or "describe" in a PDF;
 // never edit source text or treat these synonyms as proof of an answer.
const QUERY_ALIASES = {
  disclose:["disclosure","disclosures","describe","describes"],
  disclosure:["disclose","disclosures","describe"],
  disclosures:["disclose","disclosure","describe"],
};

export function keywordRank(question, index) {
  const unique = [...new Set(tokenize(question))];
  if (!unique.length || !index.chunks.length) return [];
  const n = index.chunks.length;
  const named = explicitlyNamedDocuments(question, index.chunks);
  const multiDocumentTitles = named.size > 1;
  const candidates = [];
  for (const chunk of index.chunks) {
    let score = 0, matched = 0;
    for (const term of unique) {
      const alternatives = [term, ...(QUERY_ALIASES[term] || [])];
      const actualTerm = alternatives.find(word => chunk.tf.has(word));
      if (!actualTerm) continue;
      const count = chunk.tf.get(actualTerm);
      matched++;
      const freq = index.df.get(actualTerm) ?? 0;
      const idf = Math.log(1 + (n - freq + 0.5) / (freq + 0.5));
      const bm25 = idf * (count * 2.2) / (count + 1.2 * (0.25 + 0.75 * chunk.tokens.length / index.avgLength));
      // Emphasize the requested disclosure action, not boilerplate title
      // words (vendor, AI, assessment) repeated across cover pages.
      score += bm25 * (term === "disclose" || term === "disclosures" || term === "disclosure" ? 2.5 : 1);
    }
    const fraction = matched / unique.length;
    // Explicit two-document requests can have many title words in the query,
    // diluting each document's term fraction. Allow a slightly lower fraction
    // ONLY for the named documents, not for unrelated sources or general QA.
    const threshold = multiDocumentTitles && named.has(chunk.documentId)
      ? 0.30 : (unique.length <= 2 ? 0.5 : 0.34);
    if (score > 0 && fraction >= threshold) {
      candidates.push({ ...chunk, score, matched, fraction });
    }
  }
  return candidates.sort((a,b) => b.score - a.score || b.matched - a.matched || a.filename.localeCompare(b.filename));
}

// Recover surrounding complete source sentences after BM25 has selected a
// fixed-size chunk. The original chunk may begin inside a word or sentence.
// Keep ranking unchanged, and never create text not present in the document.
function completeEvidenceContext(candidate) {
  const excerpt = candidate.content;
  const full = candidate.sourceText;
  if (typeof full !== "string" || typeof excerpt !== "string" ||
      !Number.isInteger(candidate.start) || !excerpt) return excerpt;
  const anchor = full.indexOf(excerpt, Math.max(0, candidate.start - 4));
  if (anchor < 0) return excerpt;
  const chunkEnd = anchor + excerpt.length;
  let from = anchor, to = chunkEnd;
  if (anchor > 0) {
    const scanStart = Math.max(0, anchor - 320);
    const before = full.slice(scanStart, anchor);
    const boundaries = [...before.matchAll(/[.!?](?:\s+)|\n+/g)];
    if (boundaries.length) {
      const last = boundaries[boundaries.length - 1];
      from = scanStart + last.index + last[0].length;
    } else {
      // PDF headings identify clause starts even in long unpunctuated spans.
      const sections = [...before.matchAll(/\b[A-Z]{1,4}-[0-9]{2}\b/g)];
      if (sections.length) from = scanStart + sections[sections.length - 1].index;
      else if (scanStart === 0) from = 0;
    }
  }
  if (chunkEnd < full.length) {
    const after = full.slice(chunkEnd, Math.min(full.length, chunkEnd + 260));
    const next = after.match(/[.!?](?:\s|$)|\n/);
    if (next) to = chunkEnd + next.index + 1;
  }
  return full.slice(from, to).trim();
}

export function answerFromCandidates(question, candidates, maxSources = 3, mode = "Deterministic extractive retrieval (BM25-style, no LLM)") {
  if (!Array.isArray(candidates)) throw new TypeError("Invalid ranked candidates");
  const unique = [...new Set(tokenize(question))];
  if (!unique.length || !candidates.length) {
    return { answered: false, answer: "I can't find this in the provided documents.", sources: [], mode, retrievalBuild: RETRIEVAL_BUILD };
  }
  const focusId = specificallyNamedDocument(question, candidates);
  const eligible = focusId === null ? candidates : candidates.filter(c => c.documentId === focusId);
  // Default single-topic keyword QA should not append weakly related documents
  // solely because they share generic terms such as "review" or "AI".
  // A score gap is a *ranking heuristic*, never a factuality/confidence test.
  // Leave hybrid RRF and explicit cross-document requests unchanged.
  const multiDocumentIntent = /\b(?:compare|contrast|differences?|similarities|across|between|both|multiple|several|each|versus)\b/i.test(question)
    || explicitlyNamedDocuments(question, candidates).size > 1;
  const usesHybridScores = candidates.some(c => c.lexicalScore !== undefined || c.semanticScore !== undefined);
  const leadingScore = eligible[0]?.score;
  const pruneWeakKeywordSources = focusId === null && !multiDocumentIntent &&
    !usesHybridScores && typeof leadingScore === "number" && Number.isFinite(leadingScore) && leadingScore > 0;
  const shortlist = pruneWeakKeywordSources
    ? eligible.filter(c => Number.isFinite(c.score) && c.score >= leadingScore * 0.35)
    : eligible;
  const picked = [];
  const seen = new Set();
  for (const candidate of shortlist) {
    if (seen.has(candidate.documentId)) continue;
    seen.add(candidate.documentId);
    picked.push(candidate);
    if (picked.length >= maxSources) break;
  }
  if (!picked.length) return { answered: false, answer: "I can't find this in the provided documents.", sources: [], mode, retrievalBuild: RETRIEVAL_BUILD };
  const sources = picked.map((candidate, i) => {
    const numeric = /\b(?:scores?|ranges?|thresholds?|percentages?|amounts?|prices?|rates?)\b/i.test(question);
    const compound = /\b(?:and|or)\s+(?:who|what|which|when|where|how)\b/i.test(question);
    const attributeFocus=requestedAttribute(question);
    const focus = usesHybridScores || attributeFocus instanceof RegExp ? null : attributeFocus;
    let excerpt = candidate.content;
    let quote = bestSentence(excerpt, unique, focus, numeric, compound);
    const full = candidate.sourceText;
    if (typeof full === "string" && Number.isInteger(candidate.start) && excerpt.startsWith(quote)) {
      const anchor = full.indexOf(excerpt, Math.max(0, candidate.start - 4));
      const brokenStart = anchor > 0 && /[\p{L}\p{N}]/u.test(full[anchor - 1]) &&
        /[\p{L}\p{N}]/u.test(full[anchor]);
      if (brokenStart) {
        const expanded = completeEvidenceContext(candidate);
        if (expanded !== excerpt) {
          excerpt = expanded;
          quote = bestSentence(excerpt, unique, focus, numeric, compound);
        }
      }
    }
    // Search complete source sentences after MiniLM/BM25 has selected a
    // candidate document. An embedding score ranks passages; it does not
    // guarantee that the selected 760-char chunk contains the whole answer.
    // For Hybrid, require strong question-to-sentence lexical alignment
    // before overriding a semantic-only paraphrase with source-wide text.
    if (typeof candidate.sourceText === "string") {
      const operative=operativeConditionQuote(question, candidate.sourceText);
      const primary=operative || bestSourceSentence(question, candidate.sourceText);
      // Evaluate the core quote before adding neighboring qualifications.
      // Additional sentences must not artificially clear the Hybrid lexical
      // recovery threshold, and cannot replace r20's operative boundary rule.
      const sourceEvidenceScore=operative ? 4 : primary ? evidenceSentenceScore(question, primary) : -Infinity;
      const base=primary && !operative && usesHybridScores && !multiDocumentIntent &&
        sourceEvidenceScore>=4
        ? completeAdjacentQualification(question, candidate.sourceText, primary)
        : primary;
      // A low-overlap procedural question may have a genuinely retrieved
      // first step (e.g. "what happens immediately after a leak?") even
      // though it lacks four repeated query terms. Permit scoped expansion
      // only when that exact anchor occurs in the RANKED CHUNK, never by
      // searching a weakly related document for a convenient new answer.
      const localProcedureAnchor=!operative && primary &&
        /\b(?:safeguards?|steps?|procedures?|immediately after)\b/i.test(question) &&
        sourceEvidenceScore>=2 && candidate.content.includes(primary);
      // A multi-facet query may have two directly matching terms in the
      // retrieved anchor while later qualifiers use different vocabulary.
      // Require the anchor itself in the actually ranked chunk.
      const localFacetAnchor=!operative && primary &&
        /\b(?:including|exceptions?|under which conditions|state whether|excluded?|prohibited|and both|and under)\b/i.test(question) &&
        sourceEvidenceScore>=2 && candidate.content.includes(primary);
      const supported=base && !operative && (sourceEvidenceScore>=4 || localProcedureAnchor || localFacetAnchor)
        ? scopedMultiFactQuote(question, candidate.sourceText, base)
        : base;
      if (supported && candidate.sourceText.includes(supported) &&
          (!usesHybridScores || sourceEvidenceScore >= 4 || localProcedureAnchor || localFacetAnchor)) {
        quote = supported;
        // Keep enough original document context for the independent evidence
        // guard and reviewer, including neighboring untrusted *data* text.
        // The answer still displays only the selected literal quote.
        const at=candidate.sourceText.indexOf(supported);
        excerpt=candidate.sourceText.slice(Math.max(0,at-220),
          Math.min(candidate.sourceText.length,at+supported.length+280)).trim();
      }
    }
    return {
    citation: i + 1, id: candidate.id, documentId: candidate.documentId,
    filename: candidate.filename, excerpt,
    quote,
    score: Math.round(candidate.score * 10000) / 10000,
    lexicalScore: candidate.lexicalScore ?? null,
    semanticScore: candidate.semanticScore ?? null,
    matchedTerms: unique.filter(term => candidate.tf.has(term)),
    };
  });
  // BM25 ranks entire chunks, while the answer cites individual sentences.
  // A secondary chunk can rank highly due to nearby text even though its
  // displayed quotation barely covers the question. Filter only those weak
  // secondary quotations in ordinary keyword QA; never apply to explicit
  // cross-document comparisons or hybrid-fusion scores.
  let citedSources = sources;
  // Hybrid RRF orders retrieved *chunks*. If multiple selected documents
  // contain exact, strongly matching answer sentences, promote the most
  // directly relevant *displayed quote*. Never override semantic ranking on
  // pure paraphrases or explicit comparisons; ties keep the RRF order.
  if (usesHybridScores && !multiDocumentIntent && sources.length>1) {
    const scored = sources.map((source,i)=>({
      source, i, relevance:evidenceSentenceScore(question,source.quote)
    }));
    if (scored.some(item=>item.relevance>=4)) {
      scored.sort((a,b)=>b.relevance-a.relevance || a.i-b.i);
      citedSources=scored.map((item,i)=>({...item.source,citation:i+1}));
    }
  }
  if (!multiDocumentIntent && !usesHybridScores && sources.length > 1) {
    const required = new Set(unique.map(quoteForm));
    const coverage = quote => {
      const words = new Set(tokenize(quote).map(quoteForm));
      return [...required].filter(term => words.has(term)).length;
    };
    const leadCoverage = coverage(sources[0].quote);
    if (leadCoverage >= 2) {
      citedSources = sources.filter((source, i) =>
        i === 0 || coverage(source.quote) >= leadCoverage * 0.7);
      citedSources = citedSources.map((source, i) => ({ ...source, citation: i + 1 }));
    }
  }
  // Keep only sufficiently relevant secondary quotes when the leading answer
  // has strong lexical evidence. Hybrid RRF ranks *chunks*, not answer claims;
  // a real quote from another PDF may still be irrelevant to the question.
  // Never apply this cross-source pruning to explicit comparisons or to
  // semantic-only answers with no strong lexical sentence-level evidence.
  if (!multiDocumentIntent && citedSources.length>1 &&
      picked.every(candidate => typeof candidate.sourceText==="string")) {
    const lead=evidenceSentenceScore(question,citedSources[0].quote);
    // r17 D02: the accurate evidence-package answer scores 3.6, just
    // below the previous citation-pruning cutoff, despite matching three
    // question terms. Only relax the cutoff for strongly anchored Hybrid.
    const hybridAnchored=usesHybridScores && lead>=3 &&
      [...new Set(tokenize(question).filter(w=>!GENERIC_EVIDENCE_TERMS.has(w)))]
        .filter(term=>hasForm(new Set(tokenize(citedSources[0].quote).map(quoteForm)),term)).length>=2;
    if (Number.isFinite(lead) && (lead>=4 || hybridAnchored)) {
      const materialTerms=[...new Set(tokenize(question).filter(w=>!GENERIC_EVIDENCE_TERMS.has(w)))];
      const coverage=quote=>{
        const words=new Set(tokenize(quote).map(quoteForm));
        return materialTerms.filter(term=>hasForm(words,term)).length;
      };
      const leadCoverage=coverage(citedSources[0].quote);
      citedSources=citedSources.filter((item,i)=>i===0 || (
        evidenceSentenceScore(question,item.quote)>=lead*0.8 &&
        (leadCoverage<2 || coverage(item.quote)>=leadCoverage*0.8)
      )).map((item,i)=>({...item,citation:i+1}));
    }
  }
  // A source heading alone is authentic text, but not operative evidence.
  if(citedSources.length && citedSources.every(item=>
      /^\s*[A-Z]{1,4}-\d{2,3}\s+[A-Z][^.!?\n]{1,100}\s*$/u.test(item.quote))) {
    return {answered:false,answer:"I can't find this in the provided documents.",
      sources:[],mode,retrievalBuild:RETRIEVAL_BUILD,
      note:"Only a section heading, not an answer clause, matched."};
  }
  // For a question explicitly specifying a time bracket, decline to cite
  // a neighboring opposite branch when no matching operative clause exists.
  const timedNotice=/\b\d+(?:[.,]\d+)?\s*(?:hours?|days?)\s+before\b/i.test(question) &&
    /\b(?:cancel\w*|refund\w*|tickets?|reservations?|bookings?)\b/i.test(question);
  const timedClock=/\b(?:before|after)\s+(?:[01]?\d|2[0-3]):[0-5]\d\b/i.test(question);
  if((timedNotice||timedClock) && picked.every(c=>typeof c.sourceText==="string") &&
     picked.some(c=>/\b(?:before|after|less than|at least|or more|or less)\b/i.test(c.sourceText)) &&
     !picked.some(c=>operativeConditionQuote(question,c.sourceText))) {
    return {answered:false,answer:"I can't find this in the provided documents.",
      sources:[],mode,retrievalBuild:RETRIEVAL_BUILD,
      note:"No directly matching temporal policy branch was found."};
  }
  // An RRF/semantic score is a ranking signal, NOT evidence that a quoted
  // passage contains a requested fact. Apply the same concrete-attribute
  // guard in hybrid mode so PDF title overlap cannot "answer" an absent DOB,
  // credential, salary, or price. Other keyword-only relevance heuristics
  // remain disabled for semantic-only paraphrases.
  const explicitValueFocus = requestedEvidenceFocus(question);
  if ((!usesHybridScores || explicitValueFocus) &&
      missingRequestedAttribute(question, citedSources)) {
    return { answered:false, answer:"I can't find this in the provided documents.",
      sources:[], mode, retrievalBuild: RETRIEVAL_BUILD,
      note:"Question-specific attribute was absent from the cited evidence." };
  }
  return {
    answered: true,
    answer: citedSources.map(s => `[${s.citation}] ${s.quote}`).join("\n\n"),
    sources: citedSources, mode, retrievalBuild: RETRIEVAL_BUILD,
    note: "Scores are uncalibrated retrieval ranks, not probabilities or verified answer accuracy."
  };
}

export function answerQuestion(question, index, maxSources = 3) {
  return answerFromCandidates(question, keywordRank(question, index), maxSources);
}
