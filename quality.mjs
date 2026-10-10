/**
 * GroundedDesk AI 5.0 — reusable, zero-dependency evaluation and provenance
 * guardrails. Deliberately checks exact source integrity, NOT semantic truth.
 */
import { buildIndex, answerQuestion } from "./retrieval.mjs?v=20261010-r18";

const normalizedText = text => String(text).replace(/\r\n?/g, "\n").replace(/[ \t]+/g, " ").trim();
const validName = name => typeof name === "string" && name.length > 0;

export function verifyEvidenceResult(result, documents) {
  if (!result || !Array.isArray(result.sources) || !Array.isArray(documents)) {
    return { ok:false, reason:"Malformed answer or document collection" };
  }
  if (!result.answered) return result.sources.length === 0
    ? { ok:true, reason:"Unsupported answer returned without citations" }
    : { ok:false, reason:"Unsupported answer included sources" };
  if (!result.sources.length || result.sources.length > 6) {
    return { ok:false, reason:"Answered response needs 1–6 cited sources" };
  }
  const byId = new Map(documents.map(doc => [doc.id, doc]));
  const seenIds = new Set();
  for (let i = 0; i < result.sources.length; i++) {
    const source = result.sources[i];
    if (!source || source.citation !== i + 1 || seenIds.has(source.documentId)) {
      return { ok:false, reason:"Incorrect numbering or duplicated source" };
    }
    seenIds.add(source.documentId);
    const original = byId.get(source.documentId);
    if (!original || !validName(original.name) || original.name !== source.filename) {
      return { ok:false, reason:"Missing or mismatched originating document" };
    }
    if (typeof source.excerpt !== "string" || !source.excerpt ||
        typeof source.quote !== "string" || !source.quote ||
        !source.excerpt.includes(source.quote)) {
      return { ok:false, reason:"Citation quote is not present in retrieved excerpt" };
    }
    if (!normalizedText(original.text).includes(source.excerpt)) {
      return { ok:false, reason:"Retrieved excerpt cannot be verified in source document" };
    }
  }
  return { ok:true, reason:"All cited excerpts and quotations matched loaded documents" };
}

const percentile = (sorted, p) => sorted.length
  ? Number(sorted[Math.max(0, Math.ceil(p * sorted.length) - 1)].toFixed(3))
  : 0;
const rate = (part, total) => total ? Number((part / total).toFixed(4)) : null;

export function evaluateKeywordFixture(fixture, documents, now = () => performance.now()) {
  if (!fixture || !Array.isArray(fixture.cases) || fixture.cases.length < 2 ||
      fixture.cases.length > 300 || !Array.isArray(documents) || !documents.length) {
    throw new Error("Invalid evaluation fixture or missing documents");
  }
  const existingNames = new Set(documents.map(d => d.name));
  if (existingNames.size !== documents.length) {
    throw new Error("Evaluation needs uniquely named documents");
  }
  const seenCases = new Set();
  let supported = 0, unsupported = 0, top1Correct = 0, answered = 0;
  let refusals = 0, falseAccepts = 0, provenanceErrors = 0;
  const durations = [];
  const index = buildIndex(documents);
  const cases = fixture.cases.map(testCase => {
    if (!testCase || typeof testCase.id !== "string" || !testCase.id ||
        seenCases.has(testCase.id) || typeof testCase.question !== "string" ||
        !testCase.question.trim() || testCase.question.length > 600 ||
        !(testCase.expected_source === null || (validName(testCase.expected_source) &&
          existingNames.has(testCase.expected_source)))) {
      throw new Error("Invalid, duplicate or ungrounded test case label");
    }
    seenCases.add(testCase.id);
    const start = now();
    const response = answerQuestion(testCase.question, index);
    const duration = Math.max(0, now() - start);
    if (!Number.isFinite(duration)) throw new Error("Invalid clock reading");
    durations.push(duration);
    const integrity = verifyEvidenceResult(response, documents);
    if (!integrity.ok) provenanceErrors++;
    const relevant = testCase.expected_source !== null;
    const correctSource = Boolean(response.answered &&
      response.sources[0]?.filename === testCase.expected_source);
    if (relevant) {
      supported++;
      if (response.answered) answered++;
      if (correctSource) top1Correct++;
    } else {
      unsupported++;
      if (!response.answered) refusals++;
      else falseAccepts++;
    }
    return { id:testCase.id, question:testCase.question,
      expected_source:testCase.expected_source, top_source:response.sources[0]?.filename ?? null,
      answered:response.answered, passed:integrity.ok && (relevant ? correctSource : !response.answered),
      provenance_ok:integrity.ok,
      one_shot_clock_ms:duration < 0.001 ? null : Number(duration.toFixed(3)) };
  });
  durations.sort((a,b) => a-b);
  return {
    kind:"keyword", description:"Actual deterministic keyword retrieval on bundled fictional samples; not a real-world model benchmark.",
    corpus_documents:documents.length, corpus_chunks:index.chunks.length,
    test_count:cases.length, supported_questions:supported, out_of_domain_questions:unsupported,
    top1_source_accuracy_on_supported:rate(top1Correct,supported),
    supported_question_answer_rate:rate(answered,supported),
    out_of_domain_refusal_rate:rate(refusals,unsupported),
    false_accept_count:falseAccepts, citation_provenance_errors:provenanceErrors,
    one_shot_clock_diagnostic: {
      median_ms: percentile(durations,0.5) || null,
      p95_ms: percentile(durations,0.95) || null,
      trustworthy_for_fast_queries: false,
      note: "A single query can appear as 0ms due to browser timer quantization; use repeated_benchmark instead.",
    },
    cases,
  };
}
