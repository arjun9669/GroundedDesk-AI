import { RETRIEVAL_BUILD, buildIndex, answerQuestion, answerFromCandidates } from "./retrieval.mjs?v=20261013-r41";
import { hybridRank } from "./hybrid.mjs?v=20261013-r41";
import { loadBrowserEmbedder, embedText, embedChunks, MAX_SEMANTIC_CHUNKS } from "./semantic.mjs?v=20261010-r13";
import { createEvidenceReport } from "./report.mjs?v=20261013-r41";
import { loadLocalGenerator, generateCitedAnswer, isWebGPUAvailable } from "./generation.mjs?v=20261010-r13";
import { buildResearchResult, buildPolicyResearchResult, compareDocuments, formatResearchMarkdown } from "./research.mjs?v=20261013-r41";
import { buildPolicyChecklist, formatPolicyChecklistMarkdown } from "./policy-synthesis.mjs?v=20261013-r41";
import { evaluateKeywordFixture, verifyEvidenceResult } from "./quality.mjs?v=20261013-r41";
import { selectBenchmarkQuestions, benchmarkKeywordQuestions } from "./benchmark.mjs?v=20261013-r41";
import { attachLocations, attachWorkflowLocations, verifyWorkflowEvidence, locationLabel } from "./provenance.mjs?v=20261013-r41";
import { closePDFPreview, openPDFPreview } from "./pdf-preview.mjs?v=20261013-r41";
import { readPDFFile, pdfWarnings } from "./pdf-ingest.mjs?v=20261013-r41";
import { initWorkspaceUI, showWorkspace } from "./workspace-ui.mjs?v=20261013-r41";
import { createSearchScope, assertSearchScope } from "./search-scope.mjs?v=20261013-r41";

const MAX_BYTES = 5 * 1024 * 1024;
const MAX_CHARS = 180000;
const MAX_DOCUMENTS = 15;
const $ = id => document.getElementById(id);
const documents = [];
let indexed = buildIndex([]);
let currentAnswer = null;
let visibleQuestion = "";
let indexVersion = 0;
let semanticVectors = null;
let semanticExtractor = null;
let semanticVersion = -1;
let modelBusy = false;
let searchBusy = false;
let evalBusy = false;
let localGenerator = null;
let generationLoading = false;
let generationTestBusy = false;
let recentTurns = [];
let selectedTurn = null;
let selectedAskFiles = null;
let scopeVersion = 0;
let currentResearch = null;
let latestQualityReport = null;
let uploadBusy = false;
let uploadEpoch = 0;
let replacementId = null;

function setGenerationStatus(message, isError = false) {
  const status = $("generation-status");
  if (!status) return;
  status.textContent = message;
  status.style.color = isError ? "#a2462a" : "";
}

function updateGenerationControls() {
  const mode = $("answer-mode");
  if (!mode) return;
  mode.querySelector('option[value="generative"]').disabled = !localGenerator;
  if (!localGenerator) mode.value = "extractive";
  $("enable-generation").disabled = Boolean(localGenerator) || generationLoading || searchBusy;
  $("evaluate-generation").disabled = !localGenerator || generationTestBusy || searchBusy ||
    documents.length !== sampleFiles.length ||
    !sampleFiles.every(([, name]) => documents.some(d => d.sample && d.name === name));
  $("enable-generation").textContent = localGenerator ? "Local Qwen model ready" :
    generationLoading ? "Loading model…" : "Load free local Qwen model (WebGPU)";
}

function resetConversation() {
  recentTurns = [];
  selectedTurn = null;
  $("history-filter").value = "";
  renderHistory();
}

function addTurn(question, result) {
  const turn = { question, result, files: (result.searchedFiles || documents).map(doc => doc.name) };
  recentTurns.push(turn);
  selectedTurn = turn;
  if (recentTurns.length > 8) recentTurns.shift();
  renderHistory();
}

function renderHistory() {
  const list = $("history-list");
  list.replaceChildren();
  const filter = $("history-filter").value.trim().toLocaleLowerCase();
  const matching = [...recentTurns].reverse().filter(turn =>
    !filter || [turn.question, ...(turn.result.sources?.length
      ? turn.result.sources.map(source => source.filename) : turn.files)]
      .some(text => text.toLocaleLowerCase().includes(filter)));
  for (const turn of matching) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "history-entry";
    if (turn === selectedTurn) button.setAttribute("aria-current", "true");
    const meta = make("span", "history-meta");
    meta.append(make("span", "history-status", turn.result.answered ? "Evidence found" : "No supporting evidence"));
    const mode = turn.result.mode === "Evidence integrity guard" ? "Verification failed"
      : turn.result.mode?.includes("MiniLM") ? "Local AI search" : "Fast search";
    meta.append(make("span", "history-mode", turn.result.generated ? `${mode} · AI draft` : mode));
    if (turn === selectedTurn) meta.append(make("span", "history-current", "Open now"));
    button.append(meta, make("span", "history-question", turn.question));
    const filenames = [...new Set((turn.result.sources || []).map(source => source.filename))];
    button.append(make("span", "history-files", filenames.length
      ? `Sources: ${filenames.join(" · ")}`
      : `Searched: ${turn.files.join(" · ")}`));
    button.addEventListener("click", () => {
      renderResult(turn.question, turn.result);
      selectedTurn = turn;
      renderHistory();
      const heading = $("answer-result").querySelector(".question-text");
      heading.setAttribute("tabindex", "-1");
      heading.focus();
    });
    li.append(button);
    list.append(li);
  }
  $("history-count").textContent = String(recentTurns.length);
  $("history-empty").hidden = recentTurns.length > 0;
  $("history-search").hidden = recentTurns.length === 0;
  $("history-clear-filter").disabled = !$("history-filter").value;
  const status = $("history-search-status");
  status.hidden = !filter || recentTurns.length === 0;
  status.textContent = matching.length ? `Showing ${matching.length} of ${recentTurns.length} recent questions.`
    : "No recent questions match. Try another word or clear the search.";
}

$("history-filter").addEventListener("input", renderHistory);
$("history-clear-filter").addEventListener("click", () => {
  $("history-filter").value = "";
  renderHistory();
  $("history-filter").focus();
});

function reportFeedback(id, message = "", isError = false) {
  const status = $(id);
  status.textContent = message;
  status.hidden = !message;
  status.classList.toggle("is-error", isError);
}

function renderAskScope() {
  if (selectedAskFiles !== null) selectedAskFiles = new Set([...selectedAskFiles].filter(id => documents.some(doc => doc.id === id)));
  const options = $("ask-scope-options");
  options.replaceChildren();
  const add = (name, checked, change, id) => {
    const label = make("label", "");
    const input = make("input", "");
    input.type = "checkbox"; input.checked = checked; input.dataset.scopeId = id;
    input.addEventListener("change", () => {
      change(input.checked); scopeVersion++; closePDFPreview({ restoreFocus: false }); clearResult(); selectedTurn = null; renderHistory(); renderAskScope();
      [...options.querySelectorAll("input")].find(item => item.dataset.scopeId === id)?.focus();
    });
    label.append(input, make("span", "", name)); options.append(label);
  };
  add("All files", selectedAskFiles === null, checked => { selectedAskFiles = checked ? null : new Set(); }, "all");
  for (const doc of documents) add(doc.name, selectedAskFiles === null || selectedAskFiles.has(doc.id), checked => {
    if (selectedAskFiles === null) selectedAskFiles = new Set(documents.map(file => file.id));
    if (checked) selectedAskFiles.add(doc.id); else selectedAskFiles.delete(doc.id);
  }, doc.id);
  $("ask-scope-summary").textContent = selectedAskFiles === null ? "Search in: All files"
    : selectedAskFiles.size ? `Search in: ${selectedAskFiles.size} selected file${selectedAskFiles.size === 1 ? "" : "s"}` : "Search in: Choose at least one file";
}

function semanticReady() {
  return Boolean(semanticVectors && semanticExtractor && semanticVersion === indexVersion
    && semanticVectors.length === indexed.chunks.length);
}

function setSemanticStatus(message, isError = false) {
  const status = $("semantic-status");
  if (status) {
    status.textContent = message;
    status.style.color = isError ? "#a2462a" : "";
  }
}

function updateSemanticControls() {
  const mode = $("retrieval-mode");
  if (!mode) return;
  mode.querySelector('option[value="hybrid"]').disabled = !semanticReady();
  if (!semanticReady()) mode.value = "keyword";
  $("enable-semantic").disabled = modelBusy || searchBusy || !indexed.chunks.length || indexed.chunks.length > MAX_SEMANTIC_CHUNKS;
  $("evaluate-modes").disabled = !semanticReady() || evalBusy || searchBusy ||
    documents.length !== sampleFiles.length ||
    !sampleFiles.every(([, name]) => documents.some(d => d.sample && d.name === name));
}
const sampleFiles = [
  ["samples/ai-governance.txt", "AI Governance Playbook"],
  ["samples/cloud-architecture.txt", "Cloud Architecture Guide"],
  ["samples/sustainability.txt", "Sustainability Operations Brief"],
];

function notify(message, isError = false) {
  const el = $("alert");
  el.textContent = message;
  el.style.color = isError ? "#b45336" : "#228477";
}

function rebuildIndex() {
  closePDFPreview({ restoreFocus: false });
  indexed = buildIndex(documents);
  indexVersion++;
  renderAskScope();
  resetConversation();
  if (document.getElementById("answer-result")) clearResult();
  if (document.getElementById("quality-output")) clearQuality();
  if (document.getElementById("research-results")) {
    clearResearch();
    updateResearchControls();
  }
  semanticVectors = null;
  semanticVersion = -1;
  if ($("semantic-status")) {
    setSemanticStatus(indexed.chunks.length > MAX_SEMANTIC_CHUNKS
      ? `Keyword mode active. Semantic mode supports up to ${MAX_SEMANTIC_CHUNKS} passages. Remove some documents to enable it.`
      : "Keyword mode active. Enable local embeddings to use hybrid retrieval.");
    updateSemanticControls();
  }
  updateGenerationControls();
  $("doc-count").textContent = String(documents.length);
  renderDocuments();
}

function make(tag, className, content = "") {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (content !== "") el.textContent = String(content);
  return el;
}

function renderDocuments() {
  const examples = document.getElementById("sample-questions");
  if (examples) examples.hidden = !documents.some(doc => doc.sample);
  const list = $("document-list");
  const filter = $("document-filter").value.trim().toLowerCase();
  list.replaceChildren();
  const matches = documents.filter(doc => doc.name.toLowerCase().includes(filter));
  if (!matches.length) {
    const empty = make("li", "library-note",
      documents.length ? "No files match this search." : "No documents loaded yet. Choose files or restore the sample documents by reloading.");
    list.append(empty);
    return;
  }
  for (const doc of matches) {
    const item = make("li", "document-card");
    item.dataset.documentId = doc.id;
    const fileIcon = make("span", "doc-icon", doc.type === "pdf" ? "PDF" : /\.(md|markdown)$/i.test(doc.name) ? "MD" : "TXT");
    const details = make("div", "doc-details");
    const filename = make("strong", "", doc.name);
    filename.title = doc.name;
    const pages = doc.pdfDiagnostics?.pageCount;
    details.append(filename, make("small", "", `${pages ? `${pages} page${pages === 1 ? "" : "s"} · ` : ""}${doc.text.length.toLocaleString()} characters · ${doc.sample ? "Example" : "Your file"}`));
    for (const warning of pdfWarnings(doc.pdfDiagnostics)) details.append(make("small", "pdf-notice", warning));
    const actions = make("div", "document-actions");
    const replace = make("button", "text-button replace-doc", "Replace file");
    replace.type = "button";
    replace.disabled = uploadBusy;
    replace.setAttribute("aria-label", `Replace ${doc.name}`);
    replace.addEventListener("click", () => {
      replacementId = doc.id;
      notify(`Choose a replacement for ${doc.name}. The existing file is kept until the new file is ready.`);
      $("replace-file-input").click();
    });
    const remove = make("button", "remove-doc", "Remove");
    remove.type = "button";
    remove.title = `Remove ${doc.name}`;
    remove.setAttribute("aria-label", `Remove ${doc.name}`);
    remove.addEventListener("click", () => {
      const i = documents.findIndex(d => d.id === doc.id);
      if (i < 0) return;
      documents.splice(i, 1);
      rebuildIndex();
      clearResult();
      notify(`Removed ${doc.name}.`);
    });
    item.append(fileIcon, details, actions);
    if (doc.type === "pdf" && doc.originalFile) {
      const preview = make("button", "text-button", "View PDF");
      preview.type = "button";
      preview.setAttribute("aria-label", `View original PDF ${doc.name}`);
      preview.addEventListener("click", () => openPDFPreview(doc.originalFile, doc.name, 1));
      actions.append(preview);
    }
    actions.append(replace, remove);
    list.append(item);
  }
}

function clearResult() {
  reportFeedback("answer-report-status");
  currentAnswer = null;
  $("initial-state").hidden = false;
  $("answer-result").hidden = true;
  $("answer-result").replaceChildren();
}

function addDocument({ name, text, type = "txt", sample = false, pdfPageTexts, pdfDiagnostics, originalFile }, replaceId = null) {
  const position = replaceId ? documents.findIndex(doc => doc.id === replaceId) : -1;
  if (replaceId && position < 0) throw new Error("The original document was removed. Add this file again if you still need it.");
  if (!replaceId && documents.length >= MAX_DOCUMENTS) throw new Error("Maximum of 15 documents per session.");
  const clean = String(text).trim();
  if (!clean) throw new Error(`${name} has no extractable text.`);
  if (clean.length > MAX_CHARS) throw new Error(`${name} exceeds the 180,000-character limit.`);
  const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `file-${Date.now()}-${documents.length}`;
  const document = { id, name, text: clean, sample, type, pdfPageTexts, pdfDiagnostics, originalFile };
  if (replaceId) documents.splice(position, 1, document);
  else documents.push(document);
  rebuildIndex();
  return id;
}

async function loadFiles(files, replaceId = null) {
  if (uploadBusy) { notify("Please wait for the current files to finish.", true); return; }
  const accepted = Array.from(files);
  if (!accepted.length) return;
  uploadBusy = true;
  const epoch = ++uploadEpoch;
  $("file-input").disabled = true;
  $("dropzone").setAttribute("aria-disabled", "true");
  $("upload-activity").hidden = false;
  $("upload-activity").open = true;
  $("upload-list").replaceChildren();
  renderDocuments();
  const jobs = accepted.map(file => {
    const row = make("li", "upload-item");
    const status = make("span", "upload-item-status", "Waiting…");
    const progress = make("progress", "upload-progress");
    progress.setAttribute("aria-label", `Reading ${file.name}`);
    progress.hidden = true;
    row.append(make("strong", "", file.name), status, progress);
    row.dataset.state = "queued";
    $("upload-list").append(row);
    return { file, row, status, progress };
  });
  let added = 0;
  let replacementFocusId = replaceId;
  const errors = [];
  for (const { file, row, status, progress } of jobs) {
    if (epoch !== uploadEpoch) { row.dataset.state = "cancelled"; status.textContent = "Cancelled — library cleared."; continue; }
    row.dataset.state = "reading";
    status.textContent = "Checking file…";
    const fail = message => {
      errors.push(`${file.name}: ${message}`);
      row.dataset.state = "error";
      status.textContent = message + (replaceId ? documents.some(doc => doc.id === replaceId) ? " Existing file kept." : " Replacement not applied." : "");
      progress.hidden = true;
    };
    const ext = file.name.split(".").pop().toLowerCase();
    if (!["txt", "md", "markdown", "pdf"].includes(ext)) {
      fail("Unsupported file type. Choose PDF, TXT or Markdown.");
      continue;
    }
    if (file.size > MAX_BYTES) { fail("File exceeds 5 MB."); continue; }
    try {
      status.textContent = ext === "pdf" ? "Opening PDF…" : "Reading text…";
      progress.hidden = false;
      const extracted = ext === "pdf" ? await readPDFFile(file, { onProgress: (page, total) => {
        if (epoch !== uploadEpoch) return;
        progress.max = total; progress.value = page;
        status.textContent = `Reading PDF page ${page} of ${total}…`;
      } }) : { text: await file.text() };
      if (epoch !== uploadEpoch) { row.dataset.state = "cancelled"; status.textContent = "Cancelled — library cleared."; progress.hidden = true; continue; }
      const id = addDocument({ name: file.name, ...extracted, type: ext === "pdf" ? "pdf" : "txt", originalFile: ext === "pdf" ? file : undefined }, replaceId);
      if (replaceId) replacementFocusId = id;
      added++;
      row.dataset.state = "ready";
      status.textContent = replaceId ? "Replaced — ready to search." : "Added — ready to search.";
      progress.hidden = true;
    } catch (error) { fail(error instanceof Error ? error.message : "Could not read file."); }
  }
  uploadBusy = false;
  $("file-input").disabled = false;
  $("dropzone").removeAttribute("aria-disabled");
  renderDocuments();
  if (replaceId && epoch === uploadEpoch) {
    const card = [...$("document-list").children].find(item => item.dataset.documentId === replacementFocusId);
    (card?.querySelector(".replace-doc") || $("document-filter")).focus({ preventScroll: true });
  }
  if (added) clearResult();
  const message = epoch !== uploadEpoch ? "Upload cancelled. Cleared files were not restored." : `${added} file(s) ${replaceId ? "replaced" : "added"}.${errors.length ? " Issues: " + errors.join("; ") : ""}`;
  $("upload-status").textContent = message;
  $("upload-status").classList.toggle("pdf-notice", errors.length > 0);
  notify(message, errors.length > 0);
}

function highlightDocument(id) {
  const filter = $("document-filter");
  filter.value = "";
  renderDocuments();
  const target = [...$("document-list").children].find(item => item.dataset.documentId === id);
  if (target) {
    target.classList.add("source-highlight");
    target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setTimeout(() => target.classList.remove("source-highlight"), 2000);
  }
}

function renderResult(question, result) {
  reportFeedback("answer-report-status");
  closePDFPreview({ restoreFocus: false });
  result = attachLocations(result, documents);
  // Never display a fabricated or stale excerpt as verified evidence.
  const provenance = verifyEvidenceResult(result, documents);
  try { assertSearchScope(result, documents); } catch (error) { provenance.ok = false; provenance.reason = error.message; }
  if (!provenance.ok) {
    result = { answered:false, sources:[], mode:"Evidence integrity guard", answer:"Source verification failed. This answer was withheld; please re-run the search." };
    notify("Evidence verification failed: " + provenance.reason, true);
  }
  currentAnswer = result;
  visibleQuestion = question;
  showWorkspace("ask");
  $("initial-state").hidden = true;
  const view = $("answer-result");
  view.hidden = false;
  view.replaceChildren();
  view.append(make("span", "question-label", "YOUR QUESTION"));
  view.append(make("h4", "question-text", question));
  if (result.searchedFiles) view.append(make("p", "answer-scope", `Searched ${result.searchScope === "All files" ? "all files" : "selected files"}: ${result.searchedFiles.map(file => file.name).join(" · ")}`));

  const heading = make("div", "result-heading");
  heading.append(make("span", "", result.answered
    ? `${result.sources.length} CITED SOURCE(S)`
    : "NO SUPPORTING EVIDENCE"));

  const actions = make("div", "report-actions");
  const copy = make("button", "copy-button", "Copy report");
  copy.type = "button";
  copy.setAttribute("aria-label", "Copy answer and evidence report");
  copy.addEventListener("click", async () => {
    copy.disabled = true;
    reportFeedback("answer-report-status", "Copying the answer and source evidence…");
    try {
      await navigator.clipboard.writeText(createEvidenceReport(question, result, documents));
      if (currentAnswer === result) reportFeedback("answer-report-status", "Copied — the answer and source evidence are on your clipboard.");
    } catch (error) {
      if (currentAnswer === result) reportFeedback("answer-report-status", error instanceof Error && error.message.startsWith("Evidence check")
        ? error.message : "Could not copy. Check clipboard permission, or use Save report.", true);
    } finally {
      copy.disabled = false;
    }
  });

  const download = make("button", "copy-button", "Save report");
  download.type = "button";
  download.setAttribute("aria-label", "Download local Markdown evidence report");
  download.addEventListener("click", () => {
    let blobUrl;
    try {
      const report = createEvidenceReport(question, result, documents);
      const blob = new Blob([report], { type: "text/markdown;charset=utf-8" });
      blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = "groundeddesk-evidence.md";
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      reportFeedback("answer-report-status", "Download requested: groundeddesk-evidence.md. Check your browser’s downloads.");
    } catch (error) {
      reportFeedback("answer-report-status", error instanceof Error ? error.message : "Could not prepare the report. Try again.", true);
    } finally {
      if (blobUrl) setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    }
  });
  actions.append(copy, download);
  heading.append(actions);
  const answerBox = make("div", result.answered ? "answer-box" : "answer-box is-refusal");
  if (result.generated) {
    answerBox.append(make("p", "generation-disclaimer",
      "EXPERIMENTAL · On-device generated draft. Source IDs checked; factual accuracy NOT guaranteed."));
    const paragraph = make("p", "generated-answer");
    for (const piece of result.answer.split(/(\[\d+\])/g)) {
      const match = piece.match(/^\[(\d+)\]$/);
      if (!match) { paragraph.append(document.createTextNode(piece)); continue; }
      const n = Number(match[1]);
      const source = result.sources.find(x => x.citation === n);
      if (!source) { paragraph.append(document.createTextNode(piece)); continue; }
      const button = make("button", "inline-citation", piece);
      button.type = "button";
      button.setAttribute("aria-label", `Jump to source ${n}: ${source.filename}`);
      button.addEventListener("click", () => {
        const card = $(`source-${n}`);
        if (!card) return;
        card.setAttribute("tabindex", "-1");
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.focus({ preventScroll: true });
      });
      paragraph.append(button);
    }
    answerBox.append(paragraph);
  } else
  if (result.answered) {
    for (const source of result.sources) {
      const paragraph = make("p", "cited-answer-paragraph");
      const jump = make("button", "inline-citation", `[${source.citation}]`);
      jump.type = "button";
      jump.setAttribute("aria-label", `Jump to source ${source.citation}: ${source.filename}`);
      jump.addEventListener("click", () => {
        const card = $(`source-${source.citation}`);
        if (!card) return;
        card.setAttribute("tabindex", "-1");
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.focus({ preventScroll: true });
        card.classList.add("source-highlight");
        setTimeout(() => card.classList.remove("source-highlight"), 2000);
      });
      paragraph.append(jump, document.createTextNode(" " + source.quote));
      answerBox.append(paragraph);
    }
  } else {
    answerBox.textContent = result.answer;
  }
  view.append(make("h5", "answer-title", result.generated ? "Local AI draft"
    : result.answered ? "Quoted answer" : "No supporting answer"), heading, answerBox);

  if (result.answered) {
    view.append(make("h5", "evidence-heading", "SOURCE EVIDENCE"));
    for (const source of result.sources) {
      const card = make("article", "source-card");
      card.id = `source-${source.citation}`;
      const header = make("div", "source-top");
      header.append(make("span", "source-number", `[${source.citation}]`),
        make("strong", "", source.filename));
      card.append(header, make("p", "source-location", locationLabel(source.location)), make("p", "source-excerpt", source.excerpt));
      for (const warning of pdfWarnings(documents.find(doc => doc.id === source.documentId)?.pdfDiagnostics, source.location?.pages)) card.append(make("p", "pdf-notice", warning));
      if (source.location.status === "verified" && source.location.kind === "pdf") {
        const open = make("button", "open-pdf-page", "Open cited PDF page ↗");
        open.type = "button";
        open.addEventListener("click", () => {
          const original = documents.find(doc => doc.id === source.documentId);
          if (original?.originalFile) openPDFPreview(original.originalFile, original.name, source.location.pages[0], source.quote);
        });
        card.append(open);
      }
      const jump = make("button", "", "Locate in library ↗");
      jump.type = "button";
      jump.addEventListener("click", () => highlightDocument(source.documentId));
      card.append(jump);
      const metadata = make("details", "source-metadata");
      metadata.append(make("summary", "", "Search details"), make("small", "", `Relevance rank: ${source.score.toFixed(2)}. This is a ranking signal, not a confidence score.`));
      card.append(metadata);
      view.append(card);
    }
    view.append(make("p", "result-footnote",
      result.generated
        ? "Local Qwen may produce unsupported claims despite valid citation IDs. Check every statement against the displayed excerpts. No cloud inference was used."
        : "Scores are uncalibrated relevance ranks, not confidence percentages. All quoted passages originate in your loaded text. Keyword retrieval may miss paraphrases."));
  } else {
    view.append(make("p", "result-footnote", "Try a different question or add a document containing relevant information. No answer was invented."));
  }
  return result; // return the *guarded* result for recent history and status.
}

async function ask(question) {
  const value = String(question || "").trim();
  if (!value) { notify("Enter a question about the documents.", true); return; }
  if (!documents.length) { notify("Add a document before asking a question.", true); return; }
  if (searchBusy || evalBusy || generationTestBusy) { notify("Wait for the current retrieval to finish.", true); return; }
  const scope = createSearchScope(documents, indexed, selectedAskFiles, semanticReady() ? semanticVectors : null);
  if (!scope.files.length) { notify("Choose at least one file to search.", true); $("ask-file-scope").open = true; return; }
  const startedScope = scopeVersion;
  const changed = () => indexVersion !== startedAt || scopeVersion !== startedScope;
  const cancelChanged = () => {
    if (semanticReady()) setSemanticStatus("Hybrid mode ready. Search selection changed; ask again.");
    notify("Files or search selection changed. Ask again with the current selection.");
  };
  searchBusy = true;
  $("ask-button").disabled = true;
  $("ask-button").textContent = "Finding evidence…";
  const startedAt = indexVersion;
  try {
    let result;
    if ($("retrieval-mode").value === "hybrid" && semanticReady()) {
      setSemanticStatus("Computing this question's embedding locally…");
      const vector = await embedText(semanticExtractor, value);
      if (changed()) {
        cancelChanged();
        return;
      } else if (!semanticReady()) {
        result = answerQuestion(value, scope.index);
        setSemanticStatus("Semantic index unavailable; used keyword search within the selected files.");
      } else {
        const ranking = hybridRank(value, scope.index, vector, scope.vectors);
        result = answerFromCandidates(value, ranking, 3, "Local MiniLM + BM25-style reciprocal-rank fusion (extractive; no generative LLM)");
        setSemanticStatus("Hybrid mode ready: semantic model remains in this browser session.");
      }
    } else {
      result = answerQuestion(value, scope.index);
    }
    if (result.answered && $("answer-mode").value === "generative" && localGenerator &&
        startedAt === indexVersion) {
      try {
        setGenerationStatus("Generating a short cited draft on this device's GPU…");
        const validation = await generateCitedAnswer(localGenerator, value, result.sources);
        if (changed()) {
          result = answerQuestion(value, scope.index);
          setGenerationStatus("Documents changed during inference; model draft discarded.");
        } else if (validation.ok) {
          result = { ...result, answer: validation.text, generated: true };
          setGenerationStatus("Local AI draft complete. Verify claims against the source excerpts.");
        } else {
          setGenerationStatus("Draft failed source-ID checks (" + validation.reason + "); showing exact source excerpts.", true);
        }
      } catch (error) {
        setGenerationStatus("Local generation failed. Showing source excerpts instead. " +
          (error instanceof Error ? error.message : ""), true);
      }
    }
    if (changed()) { cancelChanged(); return; }
    result = { ...result, searchedFiles: scope.files, searchScope: scope.kind };
    result = renderResult(value, result);
    addTurn(value, result);
    if (result.mode === "Evidence integrity guard") {
      notify("Answer withheld because a source citation could not be verified.", true);
    } else {
      notify(result.answered ? "Evidence retrieved locally." : "No matching evidence in this session.");
    }
  } catch (error) {
    if (changed()) { cancelChanged(); return; }
    // Fail safe: preserve answer availability and don't mislabel lexical as semantic.
    $("retrieval-mode").value = "keyword";
    const fallback = { ...answerQuestion(value, scope.index), searchedFiles: scope.files, searchScope: scope.kind };
    const guardedFallback = renderResult(value, fallback);
    addTurn(value, guardedFallback);
    setSemanticStatus("Hybrid retrieval could not complete; returned to working keyword search.", true);
    notify("Semantic query failed, so keyword fallback was used. " + (error instanceof Error ? error.message : ""), true);
  } finally {
    searchBusy = false;
    $("ask-button").disabled = false;
    $("ask-button").textContent = "Find an answer";
    updateSemanticControls();
    updateGenerationControls();
  }
}

async function enableGeneration() {
  if (localGenerator || generationLoading) return;
  if (!isWebGPUAvailable()) {
    setGenerationStatus("WebGPU unavailable on this browser. Extractive retrieval still works.", true);
    return;
  }
  generationLoading = true;
  updateGenerationControls();
  try {
    const generator = await loadLocalGenerator(setGenerationStatus);
    localGenerator = generator;
    $("answer-mode").value = "generative";
    setGenerationStatus("Local Qwen WebGPU model ready. Treat generated text as a draft; verify sources.");
    notify("Experimental on-device answer generation enabled. No paid inference API.");
  } catch (error) {
    setGenerationStatus(error instanceof Error ? error.message : "Local model unavailable.", true);
    notify("Local generator could not load; extractive search still works.", true);
  } finally {
    generationLoading = false;
    updateGenerationControls();
  }
}

async function evaluateGeneration() {
  if (!localGenerator || generationTestBusy || searchBusy) return;
  const expectedSampleNames = sampleFiles.map(([,name]) => name);
  if (documents.length !== expectedSampleNames.length ||
      !expectedSampleNames.every(name => documents.some(doc => doc.sample && doc.name === name))) {
    setGenerationStatus("Model checking uses only the original three example documents.", true);
    return;
  }
  const cases = [
    ["Who should review an AI deployment before launch?", "AI Governance Playbook"],
    ["Where should document metadata be stored?", "Cloud Architecture Guide"],
    ["How can office lighting conserve electricity?", "Sustainability Operations Brief"],
  ];
  generationTestBusy = true;
  updateGenerationControls();
  const baseline = indexVersion;
  const panel = $("generation-evaluation");
  panel.hidden = false;
  const started = performance.now();
  let structurallyCited = 0;
  let retrieved = 0;
  const outputs = [];
  try {
    for (const [i,[question, expected]] of cases.entries()) {
      if (baseline !== indexVersion) throw new Error("Documents changed; evaluation cancelled.");
      panel.textContent = `Testing actual on-device Qwen model: ${i + 1}/${cases.length}…`;
      const evidence = answerQuestion(question, indexed);
      const retrievedCorrectly = evidence.answered && evidence.sources[0]?.filename === expected;
      if (retrievedCorrectly) retrieved++;
      let citationOk = false;
      if (evidence.answered) {
        const response = await generateCitedAnswer(localGenerator, question, evidence.sources);
        citationOk = response.ok;
      }
      if (citationOk) structurallyCited++;
      outputs.push(`${i + 1}. ${question} — expected source match: ${retrievedCorrectly ? "yes" : "no"}; citations accepted: ${citationOk ? "yes" : "no"}`);
    }
    const seconds = ((performance.now()-started)/1000).toFixed(1);
    panel.textContent = [
      "ACTUAL LOCAL-GENERATION TEST (not a factual-accuracy benchmark)",
      `Qwen drafts passing citation-format checks: ${structurallyCited}/${cases.length}`,
      `Expected first-source matches from keyword retrieval: ${retrieved}/${cases.length}`,
      `Elapsed time on this device: ${seconds}s (model already loaded)`,
      ...outputs,
      "WARNING: Citation IDs can be valid even if the generated claim is false.",
      "This is a three-question, fictional in-sample smoke test, NOT measured factual accuracy."
    ].join("\n");
  } catch (error) {
    panel.textContent = "Local generation evaluation stopped: " + (error instanceof Error ? error.message : "unknown error");
  } finally {
    generationTestBusy = false;
    updateGenerationControls();
  }
}
$("evaluate-generation").addEventListener("click", evaluateGeneration);
$("enable-generation").addEventListener("click", enableGeneration);
$("answer-mode").addEventListener("change", () => {
  if ($("answer-mode").value === "generative" && !localGenerator) {
    $("answer-mode").value = "extractive";
    setGenerationStatus("Load the local model first.", true);
  }
});
$("clear-conversation").addEventListener("click", () => {
  resetConversation();
  clearResult();
  notify("Conversation cleared from this browser session.");
});

async function enableSemantic() {
  if (modelBusy || semanticReady()) return;
  if (!indexed.chunks.length || indexed.chunks.length > MAX_SEMANTIC_CHUNKS) {
    setSemanticStatus(`Need 1–${MAX_SEMANTIC_CHUNKS} indexed passages for the optional local model.`, true);
    return;
  }
  modelBusy = true;
  const version = indexVersion;
  updateSemanticControls();
  try {
    setSemanticStatus("Loading free MiniLM model. The first download may take time and use significant mobile data…");
    const model = await loadBrowserEmbedder(setSemanticStatus);
    const vectors = await embedChunks(model, indexed.chunks, setSemanticStatus);
    if (version !== indexVersion) {
      setSemanticStatus("Documents changed during model setup. Enable again to re-index the current documents.", true);
      return;
    }
    semanticExtractor = model;
    semanticVectors = vectors;
    semanticVersion = version;
    $("retrieval-mode").value = "hybrid";
    notify("On-device semantic embeddings are ready. Hybrid retrieval enabled.");
    setSemanticStatus(`Hybrid ready: indexed ${vectors.length} passages locally using Xenova/all-MiniLM-L6-v2. No document inference API calls.`);
  } catch (error) {
    semanticVectors = null;
    semanticVersion = -1;
    setSemanticStatus(error instanceof Error ? error.message : "Semantic setup failed. Keyword mode remains available.", true);
    notify("Semantic mode unavailable — keyword mode still works.", true);
  } finally {
    modelBusy = false;
    updateSemanticControls();
  }
}

async function evaluateModels() {
  if (!semanticReady() || evalBusy) return;
  const modeVersion = indexVersion;
  evalBusy = true;
  updateSemanticControls();
  const panel = $("evaluation-output");
  panel.hidden = false;
  panel.textContent = "Starting REAL local-model evaluation against the included example documents…";
  try {
    const response = await fetch("./eval/queries.json");
    if (!response.ok) throw new Error("Labeled evaluation fixture was unavailable");
    const fixture = await response.json();
    const cases = fixture.cases;
    if (!Array.isArray(cases) || cases.length < 15) throw new Error("Invalid evaluation fixture");
    let kwHits = 0, hyHits = 0, kwRefusals = 0, hyRefusals = 0, related = 0, unrelated = 0;
    const start = performance.now();
    for (const [i, item] of cases.entries()) {
      if (indexVersion !== modeVersion || !semanticReady()) throw new Error("Documents changed; evaluation stopped.");
      panel.textContent = `Running actual on-device semantic model: ${i + 1}/${cases.length} questions…`;
      const kw = answerQuestion(item.question, indexed);
      const questionVector = await embedText(semanticExtractor, item.question);
      const hy = answerFromCandidates(item.question, hybridRank(item.question, indexed, questionVector, semanticVectors), 3,
        "Local MiniLM + keyword RRF (extractive)");
      if (item.expected_source === null) {
        unrelated++;
        if (!kw.answered) kwRefusals++;
        if (!hy.answered) hyRefusals++;
      } else {
        related++;
        if (kw.sources[0]?.filename === item.expected_source) kwHits++;
        if (hy.sources[0]?.filename === item.expected_source) hyHits++;
      }
      if (i % 3 === 2) await new Promise(resolve => setTimeout(resolve, 0));
    }
    const secs = ((performance.now() - start) / 1000).toFixed(2);
    panel.textContent = [
      "ACTUAL LOCAL MODEL COMPARISON (not a production benchmark)",
      `Document corpus: ${documents.length} fictional samples / ${indexed.chunks.length} chunks`,
      `Supported questions: ${related}, out-of-domain questions: ${unrelated}`,
      `First-source accuracy: keyword ${kwHits}/${related} vs hybrid ${hyHits}/${related}`,
      `Out-of-domain refusals: keyword ${kwRefusals}/${unrelated} vs hybrid ${hyRefusals}/${unrelated}`,
      `Total execution time: ${secs}s on this device (model was already loaded)`,
      "MiniLM uses real on-device embeddings. No frozen vectors or invented metrics.",
      "Curated toy questions are easy; scores are not independently validated accuracy.",
    ].join("\n");
  } catch (error) {
    panel.textContent = "Evaluation couldn't finish: " + (error instanceof Error ? error.message : "unknown error");
  } finally {
    evalBusy = false;
    updateSemanticControls();
  }
}

$("enable-semantic").addEventListener("click", enableSemantic);
$("retrieval-mode").addEventListener("change", () => {
  if ($("retrieval-mode").value === "hybrid" && !semanticReady()) {
    $("retrieval-mode").value = "keyword";
    setSemanticStatus("Hybrid mode isn't ready. Enable the on-device model first.", true);
  }
});
$("evaluate-modes").addEventListener("click", evaluateModels);

$("query-form").addEventListener("submit", event => {
  event.preventDefault();
  ask($("query-input").value);
});
$("query-input").addEventListener("keydown", event => {
  if (event.key === "Enter" && (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey
      && !event.isComposing && !event.repeat && !event.defaultPrevented
      && !document.querySelector("dialog[open]")) {
    event.preventDefault();
    if (!$("ask-button").disabled) $("query-form").requestSubmit($("ask-button"));
  }
});
document.querySelectorAll(".suggestion").forEach(button => button.addEventListener("click", () => {
  $("query-input").value = button.dataset.question;
  ask(button.dataset.question);
}));
$("document-filter").addEventListener("input", renderDocuments);
$("clear-docs").addEventListener("click", () => {
  uploadEpoch++;
  if (uploadBusy) {
    for (const item of $("upload-list").querySelectorAll('[data-state="queued"], [data-state="reading"]')) {
      item.dataset.state = "cancelled";
      item.querySelector(".upload-item-status").textContent = "Cancelled — library cleared.";
      item.querySelector("progress").hidden = true;
    }
  } else {
    $("upload-activity").hidden = true;
    $("upload-list").replaceChildren();
  }
  $("upload-status").textContent = "";
  $("upload-status").classList.remove("pdf-notice");
  documents.splice(0);
  rebuildIndex();
  clearResult();
  notify("All documents removed from this browser session.");
});
$("file-input").addEventListener("change", async event => {
  await loadFiles(event.target.files);
  event.target.value = "";
});
$("replace-file-input").addEventListener("change", async event => {
  const target = replacementId;
  replacementId = null;
  if (target) await loadFiles(event.target.files, target);
  event.target.value = "";
});
$("replace-file-input").addEventListener("cancel", () => { replacementId = null; notify("Replacement cancelled. Existing file kept."); });
const zone = $("dropzone");
zone.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    $("file-input").click();
  }
});
for (const eventName of ["dragover", "dragenter"]) {
  zone.addEventListener(eventName, event => { event.preventDefault(); zone.classList.add("dragging"); });
}
for (const eventName of ["dragleave", "drop"]) {
  zone.addEventListener(eventName, event => { event.preventDefault(); zone.classList.remove("dragging"); });
}
zone.addEventListener("drop", async event => {
  if (event.dataTransfer?.files) await loadFiles(event.dataTransfer.files);
});

function clearResearch() {
  reportFeedback("research-report-status");
  currentResearch = null;
  const panel = $("research-results");
  if (panel) {
    panel.hidden = true;
    $("research-result-body").replaceChildren();
  }
}

function updateResearchControls() {
  for (const selectId of ["compare-left", "compare-right", "policy-document", "checklist-document"]) {
    const select = $(selectId);
    if (!select) continue;
    const previous = select.value;
    select.replaceChildren();
    for (const doc of documents) {
      const option = document.createElement("option");
      option.value = doc.id;
      option.textContent = doc.name;
      select.append(option);
    }
    if (documents.some(doc => doc.id === previous)) select.value = previous;
  }
  if (documents.length > 1 && $("compare-left").value === $("compare-right").value) {
    $("compare-right").value = documents.find(doc => doc.id !== $("compare-left").value).id;
  }
  $("run-comparison").disabled = documents.length < 2;
  $("run-research").disabled = documents.length < 1;
  $("run-policy-research").disabled = documents.length < 1;
  $("run-policy-checklist").disabled = documents.length < 1;
}

function researchEl(tag, cls, text = "") {
  const element = document.createElement(tag);
  if (cls) element.className = cls;
  if (text) element.textContent = text;
  return element;
}

function presentResearch(result) {
  reportFeedback("research-report-status");
  closePDFPreview({ restoreFocus: false });
  clearResearch();
  result = attachWorkflowLocations({ ...result, retrievalBuild: RETRIEVAL_BUILD }, documents);
  const integrity = verifyWorkflowEvidence(result, documents);
  if (!integrity.ok) throw new Error("Research evidence withheld: " + integrity.reason);
  currentResearch = result;
  showWorkspace(result.kind === "comparison" ? "compare" : "research", { result: true });
  const panel = $("research-results"), body = $("research-result-body");
  panel.hidden = false;
  body.replaceChildren();
  $("research-result-title").textContent = result.kind === "research"
    ? "Evidence across your documents" : result.kind === "policy-research"
      ? "Policy section evidence" : result.kind === "policy-checklist"
        ? "Policy review checklist" : "Side-by-side excerpts";

  if (result.kind === "research") {
    body.append(researchEl("p", "research-summary",
      result.matchedDocuments + "/" + result.availableDocuments +
      " documents returned matching evidence. This is keyword retrieval, not a factual conclusion."));
    const steps = researchEl("ol", "research-steps");
    for (const step of result.plan.steps) steps.append(researchEl("li", "", step.title + " — " + step.detail));
    body.append(steps);
  } else if (result.kind === "policy-research") {
    body.append(researchEl("p", "research-summary",
      `${result.sources.length} sections quoted from ${result.matchingSectionCount} keyword-matching sections (${result.sectionCount} numbered sections detected). Bounded evidence scan, not an exhaustive policy summary.`));
  } else if (result.kind === "policy-checklist") {
    body.append(researchEl("p", "research-summary",
      `${result.sources.length} literal candidate controls from ${result.sectionsWithCandidates} matching of ${result.sectionsInspected} inspected policy sections. Rule-based categories only; no verified compliance or complete coverage.`));
    if (result.reason) body.append(researchEl("p", "research-gaps", result.reason));
  } else {
    body.append(researchEl("p", "research-summary",
      "Shared vocabulary: " + (result.sharedTerms.join(", ") || "No shared long keywords.") +
      ". Shared terms do not establish factual agreement."));
  }

  const evidenceGrid = researchEl("div", "research-evidence-grid");
  for (const source of result.sources) {
    const card = researchEl("article", "research-evidence");
    card.append(researchEl("h4", "", "[" + source.citation + "] " +
      (source.sectionId ? source.sectionId + " · " : "") + source.filename));
    if (result.kind === "policy-checklist") card.append(researchEl("p", "research-summary",
      source.label + " · " + (source.phase === "gate" ? "Potential release gate" : source.phase === "conditional" ? "Conditional/incident" : source.phase === "ongoing" ? "Related/ongoing" : "Needs classification")));
    const excerpt = result.kind === "comparison" ? source.excerpt : source.quote;
    card.append(researchEl("p", "research-evidence-text",
      excerpt || "No matching passage found for this topic using keyword retrieval."));
    for (const warning of pdfWarnings(documents.find(doc => doc.id === source.documentId)?.pdfDiagnostics, source.location?.pages)) card.append(researchEl("p", "pdf-notice", warning));
    if (excerpt) {
      card.append(researchEl("p", "source-location", locationLabel(source.location)));
      if (source.location?.status === "verified" && source.location.kind === "pdf") {
        const open = researchEl("button", "open-pdf-page", "Open cited PDF page ↗");
        open.type = "button";
        open.setAttribute("aria-label", `Open ${source.filename}, PDF page ${source.location.pages[0]}`);
        open.addEventListener("click", () => {
          const original = documents.find(doc => doc.id === source.documentId);
          if (original?.originalFile) openPDFPreview(original.originalFile, original.name, source.location.pages[0], excerpt);
        });
        card.append(open);
      }
      const locate = researchEl("button", "", "Locate in library ↗");
      locate.type = "button";
      locate.addEventListener("click", () => highlightDocument(source.documentId));
      card.append(locate);
    }
    if (source.truncated) card.append(researchEl("p", "research-gaps",
      "Excerpt only. Review this section for additional conditions."));
    if (source.warning) card.append(researchEl("p", "research-risk",
      "Potential instruction-like content detected. Treated as untrusted source text, never an instruction."));
    evidenceGrid.append(card);
  }
  if (!result.sources.length) {
    body.append(researchEl("p", "research-empty", "No matching evidence found in the loaded documents."));
  } else {
    body.append(evidenceGrid);
  }
  if (result.kind === "policy-checklist") {
    body.append(researchEl("p", "research-gaps",
      `${result.omittedSections} sections outside scan cap; ${result.omittedCandidates} quoted candidates beyond output/per-section caps; ${result.flaggedSections} instruction-shaped sections excluded. This is not a complete policy audit. Verify full sections and exceptions.`));
  }
  if (result.kind === "policy-research") {
    body.append(researchEl("p", "research-gaps", result.omittedMatchingSections
      ? `${result.omittedMatchingSections} matching sections omitted by the section limit. This report can miss other relevant policy controls.`
      : "The scan may miss sections without overlapping terms. Review the complete policy before relying on it."));
  }
  if (result.kind === "research" && result.uncovered.length) {
    body.append(researchEl("p", "research-gaps",
      "No keyword match found in: " + result.uncovered.join("; ") + ". This does not prove the information is absent."));
  }
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getResearchMarkdown() {
  if (!currentResearch) throw new Error("Run research or comparison before exporting.");
  return currentResearch.kind === "policy-checklist"
    ? formatPolicyChecklistMarkdown(currentResearch, documents) : formatResearchMarkdown(currentResearch, documents);
}

$("research-form").addEventListener("submit", event => {
  event.preventDefault();
  try {
    if (!documents.length) throw new Error("Load at least one document first.");
    const result = buildResearchResult($("research-query").value, documents, indexed);
    presentResearch(result);
    notify(result.answered ? "Source-grounded multi-document report prepared." : "No evidence matched this research question.");
  } catch (error) {
    notify(error instanceof Error ? error.message : "Research failed.", true);
  }
});

$("policy-research-form").addEventListener("submit", event => {
  event.preventDefault();
  try {
    const selected = documents.find(doc => doc.id === $("policy-document").value);
    if (!selected) throw new Error("Select a loaded policy document.");
    const result = buildPolicyResearchResult($("policy-query").value, selected);
    presentResearch(result);
    notify(result.answered ? "Section-by-section policy evidence prepared." :
      "No matching numbered policy sections found; consider a narrower question or a text-search query.");
  } catch (error) {
    notify(error instanceof Error ? error.message : "Policy research failed.", true);
  }
});

$("policy-checklist-form").addEventListener("submit", event => {
  event.preventDefault();
  try {
    const selected = documents.find(doc => doc.id === $("checklist-document").value);
    if (!selected) throw new Error("Select a loaded policy document.");
    const result = buildPolicyChecklist($("checklist-query").value, selected);
    presentResearch(result);
    notify(result.answered ? "5.2 candidate release controls extracted. Review every cited section." :
      "No supported release-readiness controls identified. Check scope and document numbering.");
  } catch (error) {
    notify(error instanceof Error ? error.message : "Release-control inventory failed.", true);
  }
});

$("compare-form").addEventListener("submit", event => {
  event.preventDefault();
  try {
    const left = documents.find(doc => doc.id === $("compare-left").value);
    const right = documents.find(doc => doc.id === $("compare-right").value);
    const result = compareDocuments(left, right, $("compare-topic").value);
    presentResearch(result);
    notify("Comparison created using literal source passages.");
  } catch (error) {
    notify(error instanceof Error ? error.message : "Comparison failed.", true);
  }
});

$("research-copy").addEventListener("click", async () => {
  const report = currentResearch;
  const button = $("research-copy");
  button.disabled = true;
  reportFeedback("research-report-status", "Copying the report and source evidence…");
  try {
    await navigator.clipboard.writeText(getResearchMarkdown());
    if (currentResearch === report) reportFeedback("research-report-status", "Copied — the report and source evidence are on your clipboard.");
  } catch {
    if (currentResearch === report) reportFeedback("research-report-status", "Could not copy. Check clipboard permission, or use Save report.", true);
  } finally {
    button.disabled = false;
  }
});

$("research-download").addEventListener("click", () => {
  let url;
  try {
    url = URL.createObjectURL(new Blob([getResearchMarkdown()], { type:"text/markdown;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "groundeddesk-research-report.md";
    document.body.append(link);
    link.click();
    link.remove();
    reportFeedback("research-report-status", "Download requested: groundeddesk-research-report.md. Check your browser’s downloads.");
  } catch (error) {
    reportFeedback("research-report-status", error instanceof Error ? error.message : "Could not prepare the report. Try again.", true);
  } finally {
    if (url) setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
});

function clearQuality() {
  latestQualityReport = null;
  if ($("quality-output")) $("quality-output").hidden = true;
  if ($("quality-metrics")) $("quality-metrics").replaceChildren();
  if ($("quality-rows")) $("quality-rows").replaceChildren();
  if ($("export-quality")) $("export-quality").disabled = true;
  if ($("quality-status")) $("quality-status").textContent =
    "Document library changed; previous results cleared. Restore the three original samples to evaluate again.";
}

function qualitySamplesReady() {
  return documents.length === sampleFiles.length &&
    sampleFiles.every(([, name]) => documents.some(doc => doc.sample && doc.name === name));
}

function displayQuality(report) {
  const cards = $("quality-metrics");
  const rows = $("quality-rows");
  cards.replaceChildren();
  rows.replaceChildren();
  const pct = n => n == null ? "n/a" : (n * 100).toFixed(1) + "%";
  const metrics = [
    ["Top-1 source match", pct(report.top1_source_accuracy_on_supported)],
    ["Unsupported query refusals", pct(report.out_of_domain_refusal_rate)],
    ["Citation provenance errors", String(report.citation_provenance_errors)],
    ["False supported answers", String(report.false_accept_count)],
    ["Median keyword batch average", report.repeated_benchmark?.median_batch_mean_us == null
      ? "Timer too coarse" : report.repeated_benchmark.median_batch_mean_us.toFixed(3) + " µs"],
    ["P95 keyword batch average", report.repeated_benchmark?.p95_batch_mean_us == null
      ? "Timer too coarse" : report.repeated_benchmark.p95_batch_mean_us.toFixed(3) + " µs"],
  ];
  for (const [label,value] of metrics) {
    const box = make("div","quality-metric");
    box.append(make("strong","",value), make("span","",label));
    cards.append(box);
  }
  for (const item of report.cases) {
    const tr = document.createElement("tr");
    for (const value of [
      item.id, item.expected_source || "Unsupported / refuse",
      item.top_source || "No source", item.passed ? "Pass" : "Check",
    ]) tr.append(make("td","",value));
    if (!item.passed) tr.className = "quality-case-failure";
    rows.append(tr);
  }
  $("quality-output").hidden = false;
  $("export-quality").disabled = false;
  const timing = report.repeated_benchmark;
  $("quality-status").textContent =
    `Measured ${report.test_count} labeled keyword queries and repeatedly timed ${timing.sample_questions} selected questions on this device. ` +
    "Timing is the mean per query within warmed-up batches, with median/p95 across sampled questions—not individual request tail latency or Qwen inference.";
}

$("run-quality").addEventListener("click", async () => {
  $("run-quality").disabled = true;
  clearQuality();
  try {
    if (!qualitySamplesReady()) {
      throw new Error("This evaluation is only valid on the original three untouched samples. Reload this page to restore them.");
    }
    $("quality-status").textContent = "Evaluating deterministic keyword retrieval locally…";
    const response = await fetch("./eval/queries.json");
    if (!response.ok) throw new Error("Evaluation fixture could not be loaded.");
    const fixture = await response.json();
    if (!qualitySamplesReady()) throw new Error("Documents changed during fixture loading.");
    const indexAtStart = indexVersion;
    const report = evaluateKeywordFixture(fixture, documents);
    $("quality-status").textContent = "Accuracy and refusal checks complete. Warming up timed keyword batches (about 10 sampled questions)…";
    // Let the status render before a short, intentional synchronous benchmark.
    await new Promise(resolve => setTimeout(resolve, 0));
    if (indexVersion !== indexAtStart || !qualitySamplesReady()) {
      throw new Error("Documents changed during evaluation; results discarded.");
    }
    const repeated = benchmarkKeywordQuestions(selectBenchmarkQuestions(fixture.cases), documents);
    if (indexVersion !== indexAtStart || !qualitySamplesReady()) {
      throw new Error("Documents changed during timing; results discarded.");
    }
    report.repeated_benchmark = repeated;
    report.timing_interpretation =
      "Do not use single-query rounded millisecond timers for performance claims. Repeated microbenchmark reports batch mean in microseconds, with median/p95 across selected question means.";
    latestQualityReport = report;
    displayQuality(report);
    notify("Keyword evaluation complete. Inspect per-case results and evidence checks.");
  } catch (error) {
    $("quality-status").textContent = error instanceof Error ? error.message : "Evaluation unavailable.";
    notify("Evaluation could not complete.", true);
  } finally {
    $("run-quality").disabled = false;
  }
});

$("export-quality").addEventListener("click", () => {
  if (!latestQualityReport) return;
  let url;
  try {
    const json = JSON.stringify({
      ...latestQualityReport,
      note:"Device-local, labeled fictional corpus only. NOT an LLM or deployment quality benchmark.",
    }, null, 2);
    url = URL.createObjectURL(new Blob([json], { type:"application/json;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "groundeddesk-v5-keyword-evaluation.json";
    document.body.append(link);
    link.click();
    link.remove();
    notify("Measured evaluation JSON prepared for download.");
  } catch {
    notify("Could not prepare evaluation JSON.", true);
  } finally {
    if (url) setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
});

async function init() {
  const sampleEpoch = uploadEpoch;
  const build = $("retrieval-build");
  if (build) build.textContent = "Loaded retrieval build: " + RETRIEVAL_BUILD;
  for (const [path, name] of sampleFiles) {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error("missing sample");
      const text = await response.text();
      if (sampleEpoch !== uploadEpoch) break;
      addDocument({ name, text, sample: true });
    } catch {
      if (sampleEpoch !== uploadEpoch) break;
      notify("Some samples could not load. You can still upload your own files.", true);
    }
  }
  updateGenerationControls();
  if (!isWebGPUAvailable()) setGenerationStatus("WebGPU unavailable here. Extractive and semantic retrieval remain usable.", true);
  if (sampleEpoch !== uploadEpoch) return;
  if (documents.length) notify(`${documents.length} sample documents ready. Ask a question or upload your own text.`);
  else notify("No examples loaded. Please upload a TXT, Markdown or PDF document.", true);
}
initWorkspaceUI();
init();
