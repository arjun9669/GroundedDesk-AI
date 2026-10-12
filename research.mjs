/**
 * GroundedDesk 4.0: scripted, auditable document research.
 * Offline/no LLM/no external search. Does not obey instructions inside documents.
 * Its "agent" is a deterministic retrieve -> cross-check -> report workflow,
 * not an autonomous AI agent or a fact-entailment verifier.
 */
import { buildIndex, keywordRank, answerFromCandidates, tokenize, bestSourceSentence } from "./retrieval.mjs?v=20261012-r32";
import { assertWorkflowExport, locationLabel } from "./provenance.mjs?v=20261012-r32";
import { pdfWarnings } from "./pdf-ingest.mjs?v=20261012-r32";

const MAX_QUERY = 600;
const FLAG_PATTERNS = [
  /ignore\s+(?:all\s+)?(?:previous|prior|above)\s+instructions/i,
  /(?:system|developer)\s*:\s*(?:ignore|override|reveal|send)/i,
  /(?:send|upload|exfiltrate)\s+(?:the\s+)?(?:document|file|secrets?|api\s*keys?)\s+to\b/i,
  /(?:disregard|override)\s+(?:the\s+)?(?:safety|system|developer)\s+(?:rules|instructions|prompt)/i,
];

export function hasInstructionRisk(value) {
  return FLAG_PATTERNS.some(pattern => pattern.test(String(value)));
}

export function planResearch(question) {
  const query = String(question ?? "").trim().replace(/\s+/g, " ");
  if (!query || query.length > MAX_QUERY) throw new Error("Research question must be 1–600 characters.");
  return {
    query,
    steps: [
      { id:"retrieve", title:"Retrieve", detail:"Rank matching passages from the loaded documents" },
      { id:"cross-check", title:"Cross-check", detail:"Inspect distinct documents and highlight source coverage" },
      { id:"report", title:"Report", detail:"Quote verified excerpts, flag suspicious instructions, and identify evidence gaps" },
    ],
  };
}

function assertSources(sources, documents) {
  const byId = new Map(documents.map(d => [d.id, d]));
  // The shared chunker normalizes repeated spaces/tabs before retrieval.
  // Check provenance against that *normalized* original text rather than
  // treating whitespace normalization as an invented passage.
  for (const source of sources) {
    const document = byId.get(source.documentId);
    if (!document || document.name !== source.filename ||
        !document.text.replace(/\r\n?/g,"\n").replace(/[ \t]+/g," ").trim().includes(source.excerpt) ||
        !source.excerpt.includes(source.quote)) {
      throw new Error("Source provenance verification failed");
    }
  }
}

function safeExcerpt(candidate, query) {
  const picked = answerFromCandidates(query, [candidate], 1);
  return picked.sources[0] || null;
}

export function buildResearchResult(question, documents, index = buildIndex(documents), ranked = keywordRank(question, index)) {
  const plan = planResearch(question);
  if (!Array.isArray(documents) || !Array.isArray(ranked)) throw new TypeError("Invalid research input");
  const candidates = [];
  const seen = new Set();
  // Include one distinct best-matching passage per document. Limit to 6 so
  // browser reports stay legible and avoid exposing excessive private content.
  for (const candidate of ranked) {
    if (!seen.has(candidate.documentId)) {
      const doc = documents.find(d => d.id === candidate.documentId);
      if (!doc || doc.name !== candidate.filename) throw new Error("Document index is out of sync");
      seen.add(candidate.documentId);
      candidates.push(candidate);
    }
    if (candidates.length === 6) break;
  }
  const sources = candidates.map((candidate, i) => {
    const extracted = safeExcerpt(candidate, plan.query);
    if (!extracted) throw new Error("Unable to construct cited excerpt");
    return { ...extracted, citation: i + 1, warning: hasInstructionRisk(candidate.content) };
  });
  assertSources(sources, documents);
  const uncovered = documents.filter(d => !seen.has(d.id)).map(d => d.name);
  return {
    kind: "research", plan, question:plan.query,
    sources, matchedDocuments: sources.length,
    availableDocuments: documents.length, uncovered,
    flaggedSources: sources.filter(s => s.warning).length,
    answered: sources.length > 0,
    mode: "Scripted extractive multi-document research — no autonomous agent or factuality guarantee",
  };
}


/**
 * GroundedDesk AI 5.1 Phase 1 — bounded, deterministic policy-section scan.
 * Runs separately from the default keyword answer path. Every returned quote
 * is a literal substring of the selected, whitespace-normalized document.
 * Section matching is lexical, never a claim that all obligations are covered.
 */
const POLICY_SECTION_LIMIT = 8;
const POLICY_QUOTE_LIMIT = 560;
const GENERIC_POLICY_TERMS = new Set([
  "ai", "policy", "policies", "governance", "system", "systems", "according",
  "document", "documents", "about", "explain", "summarize", "summary",
  "list", "all", "every", "which", "what", "requirement", "requirements"
]);
const normalizedSource = value => String(value).replace(/\r\n?/g,"\n").replace(/[ \t]+/g," ").trim();

function policyTerm(word) {
  if (word.endsWith("ies") && word.length > 5) return word.slice(0,-3)+"y";
  if (word.endsWith("ed") && word.length > 5) {
    const noD=word.slice(0,-1);
    return noD.endsWith("e") ? noD : word.slice(0,-2);
  }
  if (word.endsWith("es") && word.length > 5) {
    const noS=word.slice(0,-1);
    return noS.endsWith("e") ? noS : word.slice(0,-2);
  }
  if (word.endsWith("s") && word.length > 4 && !word.endsWith("ss")) return word.slice(0,-1);
  return word;
}

function policySections(text) {
  // Match printed clause markers such as G-01, G-02 and R-07. Document-cover
  // identifiers (e.g. AGP-01) are excluded by selecting the dominant prefix.
  const markers = [...text.matchAll(/\b([A-Z]{1,4})-(\d{2,3})\s+([A-Z][A-Za-z-]+)/g)];
  if (!markers.length) return [];
  const counts = new Map();
  for (const m of markers) counts.set(m[1],(counts.get(m[1])||0)+1);
  const prefix = [...counts].sort((a,b)=>b[1]-a[1]||a[0].length-b[0].length)[0][0];
  const selected = markers.filter(m=>m[1]===prefix);
  return selected.map((m,i)=>{
    const next=selected[i+1]?.index ?? text.length;
    return { sectionId:m[1]+"-"+m[2], position:m.index,
      passage:text.slice(m.index,next).trim() };
  }).filter(section=>section.passage.length>section.sectionId.length+5);
}

// Shared read-only parser for the opt-in 5.2 checklist; 5.1 scoring is unchanged.
export function numberedPolicySections(text) {
  return policySections(normalizedSource(text));
}

function boundedPolicyQuote(passage) {
  const ends = [...passage.matchAll(/[.!?](?=\s|$)/g)];
  const preferred = ends.length>=3 ? ends[2].index+1 :
    ends.length ? ends[ends.length-1].index+1 : passage.length;
  const hardEnd = Math.min(preferred,POLICY_QUOTE_LIMIT);
  let quote=passage.slice(0,hardEnd).trimEnd();
  if (hardEnd<passage.length && hardEnd===POLICY_QUOTE_LIMIT) {
    const cut=quote.lastIndexOf(" ");
    if (cut>POLICY_QUOTE_LIMIT/2) quote=quote.slice(0,cut);
  }
  return { quote, truncated:quote.length<passage.length };
}

export function buildPolicyResearchResult(question, document) {
  const plan = planResearch(question);
  if (!document || typeof document.id!=="string" || !document.id ||
      typeof document.name!=="string" || !document.name ||
      typeof document.text!=="string" || document.text.length>180000) {
    throw new Error("Choose a valid loaded policy document.");
  }
  const full=normalizedSource(document.text);
  const sections=policySections(full);
  const terms=new Set(tokenize(plan.query).filter(w=>!GENERIC_POLICY_TERMS.has(w)).map(policyTerm));
  const ranked=sections.map(section=>{
    const found=new Set(tokenize(section.passage).map(policyTerm));
    return { ...section, matches:[...terms].filter(term=>found.has(term)).length };
  });
  // At least one meaningful question term must occur in the actual section.
  // Empty/irrelevant questions never trigger a whole-document evidence dump.
  const relevant=ranked.filter(section=>section.matches>0);
  // Pick higher-overlap sections first, then restore document order in reports.
  const selected=relevant.sort((a,b)=>b.matches-a.matches||a.position-b.position)
    .slice(0,POLICY_SECTION_LIMIT).sort((a,b)=>a.position-b.position);
  const sources=selected.map((section,i)=>{
    const picked=boundedPolicyQuote(section.passage);
    return { citation:i+1,documentId:document.id,filename:document.name,
      sectionId:section.sectionId,excerpt:section.passage,quote:picked.quote,
      truncated:picked.truncated,warning:hasInstructionRisk(section.passage) };
  });
  for (const source of sources) {
    if (!full.includes(source.excerpt) || !source.excerpt.includes(source.quote))
      throw new Error("Policy section provenance verification failed.");
  }
  return {
    kind:"policy-research",question:plan.query,documentId:document.id,
    filename:document.name,mode:"Deterministic multi-section policy research (no LLM)",
    sources,answered:sources.length>0,sectionCount:sections.length,
    matchingSectionCount:relevant.length,omittedMatchingSections:Math.max(0,relevant.length-sources.length),
    flaggedSources:sources.filter(source=>source.warning).length,
    limit:POLICY_SECTION_LIMIT,
    note:"A bounded lexical scan of numbered sections, not a complete policy audit or proof of requirements."
  };
}

/** Pairs exact source quotations. These are not inferred agreements or contradictions. */
export function compareDocuments(documentA, documentB, question = "") {
  if (!documentA || !documentB || documentA.id === documentB.id) {
    throw new Error("Choose two distinct documents.");
  }
  if (typeof documentA.text !== "string" || typeof documentB.text !== "string") {
    throw new Error("Both documents must contain text.");
  }
  const topic = String(question ?? "").trim();
  if (topic.length > MAX_QUERY) throw new Error("Comparison topic exceeds 600 characters.");
  const docs = [documentA, documentB];
  const sources = docs.map((doc, i) => {
    let excerpt = "";
    if (topic) {
      // The two selected documents are already fixed by the user. Search
      // complete source sentences within EACH document instead of applying
      // general-Q&A chunk eligibility to a long comparison question.
      // A nonempty result is a literal quotation, not a proven comparison.
      excerpt = bestSourceSentence(topic, doc.text, {comparison:true});
    } else {
      // Overview mode picks literal opening text. Never invent an interpretation.
      const plain = doc.text.trim();
      excerpt = plain.slice(0, 360);
    }
    if (excerpt && !doc.text.replace(/\r\n?/g,"\n").replace(/[ \t]+/g," ").trim().includes(excerpt)) throw new Error("Comparison evidence is not from source");
    return { citation:i+1, documentId:doc.id, filename:doc.name,
      excerpt, warning:hasInstructionRisk(excerpt), supported:Boolean(excerpt) };
  });
  const left = new Set(tokenize(documentA.text).filter(x => x.length > 3));
  const right = new Set(tokenize(documentB.text).filter(x => x.length > 3));
  // Shared words do not imply semantically shared claims.
  const sharedTerms = [...left].filter(term => right.has(term)).sort().slice(0, 12);
  const result = {
    kind: "comparison", question:topic, sources, sharedTerms,
    answered:sources.some(s => s.supported),
    note:"Shared terms indicate word overlap only. These excerpts do not establish agreement, contradiction, or missing facts.",
  };
  return result;
}

const cleanLine = value => String(value ?? "").replace(/\r\n?/g,"\n").replace(/[\u0000-\u001f]/g," ").trim();
const quote = text => cleanLine(text).split("\n").map(line => "> " + line).join("\n");
const safeTitle = text => cleanLine(text).replace(/[\\\x60*_{}\[\]()#+.!>|-]/g,"\\$&");

function formatPolicyResearchMarkdown(result, documents) {
  const lines = [
    "# GroundedDesk AI 5.1 — multi-section policy evidence",
    "",
    "**Method:** Local deterministic scan of numbered policy sections (no LLM).",
    "**Question:** " + safeTitle(result.question),
    "**Document:** " + safeTitle(result.filename),
    "**Scope:** " + result.sources.length + " quoted sections from " +
      result.matchingSectionCount + " lexically matched of " + result.sectionCount +
      " detected sections (maximum " + result.limit + ").",
    "",
    "## Section-by-section evidence", ""
  ];
  if (result.retrievalBuild) lines.push("**Retrieval build:** `" + String(result.retrievalBuild).replace(/[^A-Za-z0-9._-]/g, "").slice(0, 80) + "`", "");
  if (!result.answered) {
    lines.push("No matching numbered policy sections found. This is not proof that the policy lacks the requested information.", "");
  }
  for (const source of result.sources) {
    lines.push("### [" + source.citation + "] " + safeTitle(source.sectionId) +
      " — " + safeTitle(source.filename), "", quote(source.quote), "");
    if (source.location) lines.push("**Quotation location:** " + safeTitle(locationLabel(source.location)), "");
    for (const warning of pdfWarnings(documents?.find(doc => doc.id === source.documentId)?.pdfDiagnostics, source.location?.pages)) lines.push("**PDF extraction notice:** " + safeTitle(warning), "");
    if (source.truncated) lines.push("*Excerpt only; review the full section for additional conditions.*", "");
    if (source.warning) lines.push("**Review flag:** Instruction-shaped source content detected; treated as untrusted text.", "");
  }
  lines.push("## Coverage and limitations", "",
    result.omittedMatchingSections
      ? result.omittedMatchingSections + " additional keyword-matching sections omitted by the evidence cap."
      : "No additional keyword-matching numbered sections were omitted by the evidence cap.",
    "Other sections can contain relevant facts that keyword overlap missed. This is not an exhaustive policy summary or compliance determination.",
    "",
    "---", "",
    "*All quotations are exact substrings of the loaded document after whitespace normalization. Read the complete source before making decisions.*", "");
  return lines.join("\n");
}

export function formatResearchMarkdown(result, documents) {
  if (!result || !["research","comparison","policy-research"].includes(result.kind)) throw new TypeError("Invalid report");
  assertWorkflowExport(result, documents);
  if (result.kind === "policy-research") return formatPolicyResearchMarkdown(result, documents);
  const lines = ["# GroundedDesk AI 4.0 — evidence report", "",
    "**Method:** Local deterministic retrieval and source quotation. Not factual verification or autonomous web research.", ""];
  if (result.retrievalBuild) lines.push("**Retrieval build:** `" + String(result.retrievalBuild).replace(/[^A-Za-z0-9._-]/g, "").slice(0, 80) + "`", "");
  if (result.question) lines.push("**Question/topic:** " + safeTitle(result.question), "");
  if (result.kind === "research") {
    lines.push("## Research workflow", "");
    for (const step of result.plan.steps) lines.push("- " + step.title + ": " + step.detail);
    lines.push("", "## Cross-document evidence", "");
    if (!result.answered) lines.push("No matching source evidence found. Do not infer an answer.", "");
    for (const source of result.sources) {
      lines.push("### [" + source.citation + "] " + safeTitle(source.filename), "",
        quote(source.quote), "",
        source.warning ? "**Review flag:** Possible instruction-shaped content was detected; treated as untrusted document data." : "",
        "");
      if (source.location) lines.push("**Quotation location:** " + safeTitle(locationLabel(source.location)), "");
      for (const warning of pdfWarnings(documents?.find(doc => doc.id === source.documentId)?.pdfDiagnostics, source.location?.pages)) lines.push("**PDF extraction notice:** " + safeTitle(warning), "");
    }
    lines.push("## Coverage and gaps", "",
      result.matchedDocuments + " of " + result.availableDocuments + " loaded documents had keyword-matching evidence.", "");
    if (result.uncovered.length) lines.push("No keyword match found for: " + result.uncovered.map(safeTitle).join("; ") + ".", "");
  } else {
    lines.push("## Side-by-side excerpts", "");
    for (const source of result.sources) {
      lines.push("### [" + source.citation + "] " + safeTitle(source.filename), "",
        source.supported ? quote(source.excerpt) : "No matching passage was found using lexical retrieval for this topic.", "",
        source.warning ? "**Review flag:** Possible instruction-shaped content detected; treated as data." : "", "");
      if (source.location) lines.push("**Quotation location:** " + safeTitle(locationLabel(source.location)), "");
      for (const warning of pdfWarnings(documents?.find(doc => doc.id === source.documentId)?.pdfDiagnostics, source.location?.pages)) lines.push("**PDF extraction notice:** " + safeTitle(warning), "");
    }
    lines.push("## Shared vocabulary (not agreement)", "",
      result.sharedTerms.length ? result.sharedTerms.map(safeTitle).join(", ") : "No shared long terms in the selected documents.", "");
  }
  lines.push("---", "", "*For research assistance only. Keyword matches can miss paraphrases; absence of a match does not prove absence of a fact. Do not redistribute private document text without permission.*", "");
  return lines.join("\n");
}
