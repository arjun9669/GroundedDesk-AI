/**
 * GroundedDesk 5.2: rule-based release-control inventory.
 * This is a deterministic candidate extractor, NOT semantic entailment,
 * legal advice, compliance certification, or an autonomous LLM.
 */
import { planResearch, hasInstructionRisk, numberedPolicySections } from "./research.mjs?v=20261010-r14";

const MAX_SECTIONS = 64;
const MAX_ITEMS = 24;
const PER_SECTION = 5;
const RELEASE_TOPIC = /\b(releas\w*|deploy\w*|launch\w*|readiness|approval\w*|pre-release|rollout)\b/i;
const RULES = [
  { label:"Release ownership and approval", phase:"gate",
    match:/every\s+ai\s+release\s+has|(?:written\s+)?approval|cannot\s+substitute|must\s+be\s+approved|sign[- ]off/i },
  { label:"Required review evidence", phase:"gate",
    match:/before\s+a\s+release\s+review|model\s+card|risk\s+register|test\s+results\s+log|data-flow\s+diagram|rollback\s+plan/i },
  { label:"Pre-release evaluation", phase:"gate",
    match:/pre-release\s+evaluat|question\s+pilot|supported\s+questions|percent\s+of\s+displayed\s+citations|source-selection\s+target|refusal\s+target/i },
  { label:"Human evidence verification", phase:"gate",
    match:/valid\s+source\s+citation\s+must|human\s+reviewers\s+must|factual\s+support\s+before/i },
  { label:"Privacy and security controls", phase:"gate",
    match:/may\s+upload\s+only|must\s+not\s+use\s+patient|access\s+controls|sensitive\s+records|processing\s+boundary|prohibited\s+(?:information|data)/i },
  { label:"Rollback and incident escalation", phase:"conditional",
    match:/unsupported\s+answers\s+exceed|pauses\s+the\s+rollout|rollback\s+review|security\s+incidents\s+must|report\w*\s+within/i },
  { label:"Scheduled and vendor oversight", phase:"ongoing",
    match:/quarterly\s+governance\s+review|separate\s+vendor\s+review\s+is\s+required|evaluations\s+should\s+include/i },
];
// Rule patterns deliberately narrow: non-matching requirements are a false-negative risk.
const FALLBACK = /\b(must|shall|required|requires|prohibited|may\s+only)\b/i;
const normalize = value => String(value).replace(/\r\n?/g,"\n").replace(/[ \t]+/g," ").trim();
const isValidDocument = d => Boolean(d && typeof d.id==="string" && d.id &&
  typeof d.name==="string" && d.name && typeof d.text==="string" && d.text.length<=180000);
const labelEscape = s => String(s).replace(/\\/g,"\\\\").replace(/[\x60*_{}\[\]()#+.!>|-]/g,"\\$&")
  .replace(/[\r\n]/g," ").trim();
const escapeQuote = s => String(s).replace(/[\r\n]+/g," ").trim();

function splitSentences(passage) {
  // Only split at sentence stops followed by uppercase starts, not at arbitrary
  // decimal points. The returned quotation remains an exact substring.
  return [...passage.matchAll(/[^.!?]+(?:[.!?]+(?=\s|$)|$)/g)]
    .map(m=>m[0].trim()).filter(Boolean);
}

function emptyResult(question, doc, sectionCount, checked, flagged, reason) {
  return { kind:"policy-checklist", question, filename:doc.name, documentId:doc.id,
    answered:false, sources:[], sectionCount, sectionsInspected:checked,
    sectionsWithCandidates:0, omittedSections:Math.max(0,sectionCount-checked),
    omittedCandidates:0, flaggedSections:flagged, maxItems:MAX_ITEMS,
    reason, mode:"Rule-based literal source extraction; no LLM" };
}

export function buildPolicyChecklist(question, document) {
  const query=planResearch(question).query;
  if (!isValidDocument(document)) throw new Error("Choose a valid loaded policy document.");
  const full=normalize(document.text);
  const sections=numberedPolicySections(full);
  if (!RELEASE_TOPIC.test(query)) return emptyResult(query,document,sections.length,0,0,
    "Question is outside this release-readiness inventory's supported scope.");
  if (!sections.length) return emptyResult(query,document,0,0,0,
    "No recognizable numbered policy clauses were detected.");
  const scanned=sections.slice(0,MAX_SECTIONS);
  const candidates=[];
  let flagged=0;
  let matchedSections=0;
  for (const section of scanned) {
    // Do not show imperative/prompt-injection-like text as a release task.
    if (hasInstructionRisk(section.passage)) { flagged++; continue; }
    let fromSection=0;
    for (const raw of splitSentences(section.passage)) {
      if (fromSection===PER_SECTION) break;
      const sentence=raw.trim();
      // Exclude meta-text and false positive claims of documented capability.
      if (/\b(?:fictional\s+release\s+requirements|not\s+observed\s+project\s+results|not\s+a\s+complete\s+policy)\b/i.test(sentence)) continue;
      const rule=RULES.find(r=>r.match.test(sentence));
      if (!rule && !FALLBACK.test(sentence)) continue;
      const item={sectionId:section.sectionId, documentId:document.id, filename:document.name,
        quote:sentence, excerpt:section.passage, label:rule?.label||"Other rule-shaped passage",
        phase:rule?.phase||"unclassified", warning:false};
      if (!full.includes(item.excerpt) || !item.excerpt.includes(item.quote))
        throw new Error("Policy checklist source verification failed.");
      candidates.push(item);
      fromSection++;
    }
    if (fromSection) matchedSections++;
  }
  const chosen=candidates.slice(0,MAX_ITEMS).map((source,i)=>({...source,citation:i+1}));
  return { kind:"policy-checklist",question:query,filename:document.name,documentId:document.id,
    sources:chosen,answered:chosen.length>0,sectionCount:sections.length,
    sectionsInspected:scanned.length,sectionsWithCandidates:matchedSections,
    omittedSections:Math.max(0,sections.length-scanned.length),
    omittedCandidates:Math.max(0,candidates.length-chosen.length),
    flaggedSections:flagged,maxItems:MAX_ITEMS,
    mode:"Rule-based literal source extraction; no LLM",
    reason:chosen.length?"":"No rule-shaped release controls found in scanned sections." };
}

export function formatPolicyChecklistMarkdown(result) {
  if (!result || result.kind!=="policy-checklist" || !Array.isArray(result.sources)) throw new TypeError("Invalid policy checklist");
  const lines=["# GroundedDesk AI 5.2 — candidate release-control inventory","",
    "**Method:** Deterministic rule-matched source sentences (no LLM or semantic entailment).",
    "**Question:** "+labelEscape(result.question),
    "**Document:** "+labelEscape(result.filename),
    "**Status:** "+(result.answered?"Candidate controls found; human verification required.":"No supported candidate inventory."),
    "**Coverage:** "+result.sectionsInspected+"/"+result.sectionCount+" numbered sections inspected; "+
      result.sectionsWithCandidates+" with matching rule-shaped passages; "+result.sources.length+
      " quotes displayed (limit "+result.maxItems+").","",""];
  if (!result.answered) lines.push(result.reason||"No matching controls found.","");
  for (const [phase,title] of [["gate","Potential release-gate controls"],["conditional","Conditional / incident-response controls"],
    ["ongoing","Ongoing or related reviews"],["unclassified","Unclassified rule-shaped passages"]]) {
    const items=result.sources.filter(source=>source.phase===phase);
    if (!items.length) continue;
    lines.push("## "+title,"");
    for (const source of items) {
      lines.push("### ["+source.citation+"] "+labelEscape(source.sectionId)+" — "+labelEscape(source.label),
        "","> "+escapeQuote(source.quote),"",
        "*Source: "+labelEscape(source.filename)+" · "+labelEscape(source.sectionId)+". Rule-based category, not verified legal interpretation.*","");
    }
  }
  lines.push("## Coverage and verification limits","",
    result.omittedSections+" numbered sections were not scanned due to the "+MAX_SECTIONS+"-section scan limit.",
    result.omittedCandidates+" candidate sentences were omitted by the "+result.maxItems+"-item output cap or per-section cap.",
    result.flaggedSections+" inspected sections were withheld from checklist generation due to recognizable instruction-shaped text.",
    "Regex rules can miss genuine obligations, misclassify conditions or quote exceptions without context. Items can include advisory or post-release controls, and some important controls may be absent.",
    "Read each complete section and the whole original document before interpreting obligations. This is NOT a complete release checklist, compliance decision, or verification that anything has been completed.","",
    "---","","*All displayed evidence is a literal substring of the normalized source section. No document instructions were executed.*","");
  return lines.join("\n");
}
