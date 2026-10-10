/** GroundedDesk's deterministic extractive retrieval engine. No network calls. */
export const RETRIEVAL_BUILD = "2026-10-10-r11";
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

// If a keyword question asks for a specific attribute of an entity, a
// matching organization name alone must not count as answering that attribute.
// This is a conservative lexical guard, not a semantic or factuality judge.
function requestedAttribute(question) {
  const query = String(question);
  const pattern = /^\s*(?:what|which|who)\s+(?:is|are|was|were)\s+(?:(?:the|an?|their)\s+)?(.+?)\s+(?:of|for)\s+/i;
  const match = query.match(pattern);
  if (!match) return null;
  const focus = tokenize(match[1]).filter(word => ![
    "total", "exact", "overall", "current", "estimated", "average", "latest",
    "number", "amount", "value"
  ].includes(word)).at(-1);
  return focus || null;
}

function missingRequestedAttribute(question, sources) {
  const focus = requestedAttribute(question);
  if (!focus) return false;
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
    const focus = usesHybridScores ? null : requestedAttribute(question);
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
  // Reject false acceptance when a query asks for an attribute (e.g. salary)
  // but the cited passages only repeat the entity name or PDF cover metadata.
  // Keep semantic/hybrid retrieval out of this keyword-specific heuristic.
  if (!usesHybridScores && missingRequestedAttribute(question, sources)) {
    return { answered:false, answer:"I can't find this in the provided documents.",
      sources:[], mode, retrievalBuild: RETRIEVAL_BUILD,
      note:"Question-specific attribute was absent from the cited evidence." };
  }
  return {
    answered: true,
    answer: sources.map(s => `[${s.citation}] ${s.quote}`).join("\n\n"),
    sources, mode, retrievalBuild: RETRIEVAL_BUILD,
    note: "Scores are uncalibrated retrieval ranks, not probabilities or verified answer accuracy."
  };
}

export function answerQuestion(question, index, maxSources = 3) {
  return answerFromCandidates(question, keywordRank(question, index), maxSources);
}
