# GroundedDesk AI — engineering case study (v5.0)

**Project:** [GroundedDesk AI](https://github.com/arjun9669/GroundedDesk-AI) · **Live:** [GitHub Pages](https://arjun9669.github.io/GroundedDesk-AI/)  
**Scope:** Browser-only educational document Q&A and research prototype; no hosted inference or paid API.

## Problem and goal

Document search demos can appear persuasive while hiding where the answer came from, whether the system refused unsupported questions, and whether reported metrics are actual measurements. GroundedDesk makes each evidence passage inspectable and demonstrates optional local semantic retrieval and generative drafts without hiding their technical limitations.

The final portfolio milestone emphasizes **testable behavior over adding another model**. A free static website is used for deployment; TXT/Markdown files and selectable-text PDFs are parsed on-device. The three bundled documents are fictional, not employer data.

## Architecture and flow

```text
Browser upload / included example files
             |
Local text/PDF extraction (PDF.js downloaded from CDN for PDFs)
             |
In-memory whitespace-normalized chunks + token frequencies
             |
        BM25-style ranking --------------------+
             |                                |
Optional on-device MiniLM vectors (WASM)       |
             |                                |
    Reciprocal-rank hybrid retrieval ---------+
             |
Verbatim excerpts, quoted source passages, provenance guard
             |
       +-----+---------------+----------------+
       |                     |                |
Extractive Q&A       Optional Qwen     Scripted multi-document
(default)            WebGPU draft      retrieval/comparison
       |                     |                |
Cited Markdown export / source inspection / safety disclaimer

Separate 5.0 quality workbench:
28 labeled questions -> actual keyword retrieval -> measured verdicts,
per-case source, refusal behavior, provenance errors & latency
```

The default path runs without model weights or subscriptions. The optional MiniLM and Qwen pipelines download public dependencies and execute in supported browsers; the first download is not offline. Neither models nor model output quality are benchmarked by the 28 keyword evaluation cases. Qwen's numerical source citations are checked for structure, *not* whether its claims logically follow from the documents.

## Five milestones

1. **1.0 — Citation-first retrieval:** deterministic keyword chunks, source excerpts, copied Markdown evidence reports, unsupported-query refusal.
2. **2.0 — Hybrid retrieval:** optional in-browser MiniLM embeddings, cosine scoring, reciprocal-rank fusion, source-evaluation scaffolding.
3. **3.0 — Optional local generation:** opt-in small Qwen WebGPU model, user-facing source links, invalid-citation fallback, ephemeral history.
4. **4.0 — Multi-document research:** explainable retrieve/cross-check/report process, comparison of literal source excerpts, coverage gaps, heuristic injection-content warnings.
5. **5.0 — Quality and delivery:** browser-run keyword evaluation dashboard, reusable provenance guardrail, guarded display of answers, automated regression tests, dedicated repository and independent GitHub Pages hosting.

## What the evaluation measures

The `eval/queries.json` fixture contains **18 supported** and **10 intentionally unrelated** questions manually written for the **three included fictional documents**. On the website, the user explicitly chooses **Run local evaluation**. The application performs *real BM25-style* searches on the current original sample document set, times each query with the device clock, and reports:

| Metric | Calculation | What it does NOT establish |
| --- | --- | --- |
| Top-1 source match | First cited filename matches the label ÷ 18 supported cases | Semantic correctness, generated-answer truth |
| Supported-question answer rate | Non-refusals ÷ 18 supported | Claim factuality |
| Out-of-domain refusal rate | Refusals ÷ 10 unsupported | Exhaustive robustness against irrelevant queries |
| False accepts | Unsupported items for which search returned evidence | Malicious prompt safety |
| Citation provenance | Whether excerpt and quote match the document ID/name/text and citation numbering | Whether a passage actually supports a claim |
| Median and p95 latency | Wall-clock time of the 28 keyword-search calls on the device | Network, download, WASM or WebGPU model speed |

The keyword evaluation is reproducible using `node eval/run.mjs --json` and `node eval/run.mjs --strict`. The CLI and browser use the same integrity verifier; the browser has its own concise per-case verdict display. CI executes `node --test tests/*.test.mjs` with no npm install or paid API.

**Caveat:** the cases were curated to align with the sample documents, so high scores are expected. There is no held-out corpus, production telemetry, cross-lingual benchmark, ground-truth claim entailment, security audit, or independent review.

## Reliability and user experience

- A response with a missing document, an excerpt not in the normalized original, a mismatched filename, bad numbering, or duplicate document citations is **not displayed as verified evidence**.
- Adding/removing uploaded documents clears displayed Q&A and quality-evaluation results; in-flight optional model inference checks the index version before using its output.
- Recent question history is session-only. Indexed document content and evaluated labels remain in browser memory, not persisted through this app's backend (there is no backend).
- Side-by-side comparisons do **not** generate claims of logical agreement/contradiction. Prompt-injection-looking source text can be highlighted but the heuristic detector is incomplete.
- The quality dashboard clearly distinguishes actual keyword measurements from model-specific evaluation controls and avoids hard-coded scores.

## Reproduce locally

```bash
git clone https://github.com/arjun9669/GroundedDesk-AI.git
cd GroundedDesk-AI
python -m http.server 8765
# in a second terminal (Node 22+)
node --test tests/*.test.mjs
node eval/run.mjs --strict
node eval/run.mjs --json > evaluation.json
```

Open `http://localhost:8765/` to test the interface. For CI logs and published deployment evidence, see [Actions](https://github.com/arjun9669/GroundedDesk-AI/actions).

## Engineering trade-offs and next steps

**Why static first?** GitHub Pages removes hosting fees, deployment friction, and secret management. Browser-only files reduce server-side document exposure. This is nevertheless *not an air-gapped offline product* because the HTML/CSS/JS is hosted publicly and optional model/PDF dependencies are fetched from third-party CDNs.

**Why lexical as default?** It is reproducible and works on low-memory phones. It is weaker on paraphrases; hybrid is explicitly opt-in because it needs a large downloaded embedding model.

**Why cite and check?** Exact quote provenance is easy to test. It makes invented references less likely to pass unnoticed; it cannot prevent plausible but unsupported generative claims.

**If productionizing:** Add authenticated data isolation, threat-modelled uploads, controlled dependency delivery, rigorous prompt-injection hardening, longitudinal evaluation on user-permitted corpora, real entailment checks, and production monitoring. Do not advertise the present prototype as an audited, autonomous, medical, financial or enterprise-grade AI system.
