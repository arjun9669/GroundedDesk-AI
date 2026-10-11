/**
 * Honest, opt-in repeated-query timing for the *keyword* engine only.
 *
 * Why batches? Browser performance.now() may be rounded to 1 ms or more.
 * Timing one very fast query can incorrectly display 0.000 ms. Warm up each
 * question and time batches long enough to exceed clock granularity.
 *
 * Median/p95 refer to per-question batch-AVERAGE latencies, not request-tail
 * p95, and do not include model downloads, PDF parsing, or UI rendering.
 */
import { buildIndex, answerQuestion } from "./retrieval.mjs?v=20261011-r22";

const median = (sorted, fraction) => sorted[Math.max(0, Math.ceil(fraction * sorted.length) - 1)];
const round = value => Number(value.toFixed(3));

export function selectBenchmarkQuestions(cases) {
  if (!Array.isArray(cases)) throw new TypeError("Expected labeled questions");
  const supported = new Map();
  const unrelated = [];
  for (const item of cases) {
    if (!item || typeof item.question !== "string" || !item.question.trim()) continue;
    if (item.expected_source === null) {
      if (unrelated.length < 4) unrelated.push(item.question);
    } else if (typeof item.expected_source === "string") {
      const list = supported.get(item.expected_source) || [];
      if (list.length < 2) list.push(item.question);
      supported.set(item.expected_source, list);
    }
  }
  return [...supported.values()].flat().concat(unrelated).slice(0, 12);
}

/**
 * Return null measurements when a timer is too coarse, rather than making up
 * a duration or displaying a rounded zero. options.now is injectable in tests.
 */
export function benchmarkKeywordQuestions(questions, documents, options = {}) {
  if (!Array.isArray(questions) || questions.length < 1 || questions.length > 24 ||
      questions.some(q => typeof q !== "string" || !q.trim() || q.length > 600) ||
      !Array.isArray(documents) || !documents.length) {
    throw new Error("Invalid keyword benchmark input");
  }
  const now = options.now ?? (() => performance.now());
  const minBatchMs = options.minBatchMs ?? 40;
  const maxIterations = options.maxIterations ?? 131072;
  if (typeof now !== "function" || !Number.isFinite(minBatchMs) || minBatchMs < 1 ||
      minBatchMs > 200 || !Number.isInteger(maxIterations) || maxIterations < 1 ||
      maxIterations > 131072) {
    throw new Error("Invalid benchmark timing configuration");
  }
  const index = buildIndex(documents);
  const samples = [];
  for (const question of questions) {
    // Avoid measuring initial JIT/compiler warm-up as steady-state retrieval.
    for (let warmup = 0; warmup < 5; warmup++) answerQuestion(question, index);
    let iterations = 1, elapsedMs = 0;
    while (true) {
      const start = now();
      for (let i = 0; i < iterations; i++) answerQuestion(question, index);
      elapsedMs = now() - start;
      if (!Number.isFinite(elapsedMs) || elapsedMs < 0) {
        throw new Error("Benchmark clock returned an invalid duration");
      }
      if (elapsedMs >= minBatchMs || iterations >= maxIterations) break;
      // Scale quickly when timer precision is poor, but cap memory/CPU cost.
      const factor = elapsedMs > 0 ? Math.max(2, Math.min(8, Math.ceil(minBatchMs / elapsedMs))) : 8;
      iterations = Math.min(maxIterations, Math.max(iterations + 1, iterations * factor));
    }
    samples.push({
      question, iterations, elapsed_ms:round(elapsedMs),
      mean_per_query_us: elapsedMs >= minBatchMs ? round((elapsedMs * 1000) / iterations) : null,
    });
  }
  const measured = samples.map(s => s.mean_per_query_us).filter(v => v !== null && v > 0).sort((a,b) => a-b);
  const complete = measured.length === samples.length;
  return {
    kind:"repeated-keyword-timing",
    explanation:"Batch-average CPU retrieval timing after five warm-up calls per sampled question; no PDF parsing, models, UI or network.",
    interpretation:"Median/p95 across sampled question batch MEANS; not individual-request tail latency.",
    min_batch_ms:minBatchMs,
    sample_questions:samples.length,
    measured_questions:measured.length,
    status:complete ? "measured" : "insufficient_timer_resolution",
    median_batch_mean_us:complete ? round(median(measured,0.5)) : null,
    p95_batch_mean_us:complete ? round(median(measured,0.95)) : null,
    samples,
  };
}
