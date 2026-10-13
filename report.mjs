import { validateDraft } from "./generation.mjs?v=20261010-r13";
import { locateEvidence, locationLabel } from "./provenance.mjs?v=20261012-r32";
import { pdfWarnings } from "./pdf-ingest.mjs?v=20261012-r32";
import { assertSearchScope } from "./search-scope.mjs?v=20261013-r43";

/**
 * Portable evidence reports for the browser-only document Q&A demo.
 * No external libraries, requests or persistence; every quote is verified.
 */

function clean(value) {
  return String(value ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
    .trim();
}

function blockquote(value) {
  return clean(value).split("\n").map(line => "> " + line).join("\n");
}

function inline(value) {
  return clean(value).replace(/([\\\x60*_{}\[\]()#+.!>|-])/g, "\\$1").replace(/\n/g, " ");
}

/**
 * A self-contained Markdown evidence report. Refuses to create one if any
 * displayed quotation is not an actual substring of the cited excerpt.
 */
export function createEvidenceReport(question, result, documents = []) {
  if (!result || typeof result !== "object" || !Array.isArray(result.sources)) {
    throw new TypeError("Invalid retrieval result");
  }
  const sources = result.sources;
  assertSearchScope(result, documents);
  if (result.answered && !sources.length) throw new Error("Answered result has no cited sources");
  if (result.generated) {
    const validation = validateDraft(result.answer, sources);
    if (!validation.ok) throw new Error("Generated draft failed citation checks: " + validation.reason);
  }

  const sections = [
    "# GroundedDesk — evidence report",
    "",
    "## Question",
    "",
    blockquote(question),
    "",
    "**Retrieval mode:** " + inline(result.mode || "Not recorded"),
    "",
    "**Retrieval build:** `" + (String(result.retrievalBuild || "unknown").replace(/[^A-Za-z0-9._-]/g, "").slice(0, 80) || "unknown") + "`",
    "",
    ...(result.searchedFiles ? ["**Searched files:** " + result.searchedFiles.map(file => inline(file.name)).join(" · "), ""] : []),
    "## Answer",
    "",
    result.answered ? "" : blockquote(result.answer || "No supporting evidence found."),
  ];

  if (result.answered) {
    if (result.generated) {
      sections.push("**Locally AI-generated draft — citation IDs verified, not fact-checked:**", "");
      sections.push(blockquote(result.answer), "");
      sections.push("**Exact source excerpts supporting the draft (verify manually):**", "");
    }
    for (const [index, source] of sources.entries()) {
      if (source.citation !== index + 1) throw new Error("Invalid citation numbering");
      if (typeof source.excerpt !== "string" || typeof source.quote !== "string"
          || !source.quote || !source.excerpt.includes(source.quote)) {
        throw new Error("Evidence check failed: quotation not present in cited excerpt");
      }
      sections.push(blockquote("[" + source.citation + "] " + source.quote), "");
    }
    sections.push("## Source evidence", "");
    for (const source of sources) {
      const warnings = pdfWarnings(documents.find(doc => doc.id === source.documentId)?.pdfDiagnostics, source.location?.pages);
      if (source.location) {
        const doc = documents.find(doc => doc.id === source.documentId);
        if (JSON.stringify(locateEvidence(doc, source)) !== JSON.stringify(source.location)) {
          throw new Error("Source location could not be verified against loaded documents");
        }
      }
      sections.push(
        "### [" + source.citation + "] " + inline(source.filename),
        "",
        "**File:** " + inline(source.filename),
        "",
        "**Source location:** " + inline(locationLabel(source.location)),
        "",
        "**Retrieval rank score (BM25-style for keyword, RRF for hybrid):** " + (Number.isFinite(source.score) ? source.score.toFixed(4) : "not recorded"),
        "",
        "**Quoted sentence / passage:**",
        "",
        blockquote(source.quote),
        "",
        "**Retrieved excerpt:**",
        "",
        blockquote(source.excerpt),
        "",
      );
      for (const warning of warnings) sections.push("**PDF extraction notice:** " + inline(warning), "");
    }
  }

  sections.push(
    "---",
    "",
    "*Locally generated browser report: source passages are verbatim extracts. When an optional Qwen-generated draft appears, only citation ID syntax is verified; factual support is NOT guaranteed. Review all claims against excerpts. Ranking scores are uncalibrated. Do not distribute confidential uploaded documents.*",
    "",
  );
  return sections.join("\n");
}
