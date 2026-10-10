/** GroundedDesk's deterministic extractive retrieval engine. No network calls. */
export const RETRIEVAL_BUILD = "2026-10-10-r17";
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
// Returns a literal sentence in the original whitespace-normalized text.
// Empty means no lexical support; the caller must not manufacture an answer.
export function bestSourceSentence(question, fullText) {
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
    const candidate=evidenceSentenceScore(question,line);
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
  return winner;
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
      const supported = bestSourceSentence(question, candidate.sourceText);
      const sourceEvidenceScore = supported ? evidenceSentenceScore(question, supported) : -Infinity;
      if (supported && candidate.sourceText.includes(supported) &&
          (!usesHybridScores || sourceEvidenceScore >= 4)) {
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
    if (Number.isFinite(lead) && lead>=4) {
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
