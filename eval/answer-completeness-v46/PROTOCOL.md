# V46 Stage C — lexical Comparison engineering

Date: 24 October 2026. Candidate: `coverage-v46-comparison-relations`.
Scope: Stage C of the [published repair design](../../docs/FRESH64_REPAIR_DESIGN.md),
authorized by the user's “okay go ahead” after Stage B publication. This protocol
records implementation and synthetic engineering checks, not permission for a
model study, exposed replay, prospective confirmation or live adoption.

## Ownership and declared grammar

Questions begin with `Compare`, optionally `the`, and end with
`for ENTITY and ENTITY`, optional final punctuation. Both names must exactly match
the normalized filename entities of the two selected documents. Normalization is
case-independent NFKC word normalization, removing a numeric filename prefix and
extension. No first-word aliases or external entities are inferred. Citation order
follows the selected document pair, even if the question lists names in reverse.

The following complete request heads are supported:

- `[first/second/third/fourth/fifth] OBJECT relocation/restoration/renovation/opening/rebuilding years/dates`.
  The ordinal is optional. OBJECT is one to four word/hyphen tokens, with no
  conjunction/negation. A unique explicit event/date must match that object and
  optional ordinal. Relocation permits `was moved`, `was relocated`, `moved` or
  `relocated`; opening permits `was opened`/`opened`; rebuilding permits
  `was rebuilt`/`rebuilt`. Restoration/renovation require the corresponding noun
  followed by `was completed`. The date is `in/during YYYY` with no qualifier.
- `highest monthly mean/average temperature(s) and [their] month(s)`.
  Source requires the same exact mean/average label and either an explicit signed
  temperature/unit `in MONTH` or `in MONTH at VALUE UNIT`. The metric, quantity and
  month must be in the same literal sentence. Winter averages, daily highs and
  other metrics cannot substitute. Mean and average are conservatively distinct.
- `[departure] cutoff(s), [departure] day(s) and hold(s)`.
  Each document supplies adjacent `Before HH:MM, departure is the same DAY UNIT,
  unless HOLD is/remains active/in effect` and `At or after HH:MM` (or
  `At HH:MM or later`) with `next DAY UNIT` and its own complete hold condition.
  Times are valid 24-hour clocks and must have the same boundary; day units must
  match (operating/service/business/working). A hold has a bounded word phrase
  ending in `hold`. The two branches must be in one source policy block.

Sources permit bare document-scoped subject clauses, `The`, and an exact explicit
filename entity/possessive prefix for event/monthly statements. Foreign explicit
prefixes cannot match. Generic cutoff policies are scoped to their containing
selected document; no pronoun, heading or cross-document scope inference is added.

A recognized family with a missing pair, missing required facet, unparsed extra
facet, mismatched pair, ambiguity or incomplete source returns `answered:false`,
no citations, an explicit incomplete answer and `comparison_contract` diagnostics.
No old lexical filler survives a governed refusal. Outside these families, delegate
to the unchanged v45 Comparison implementation without claiming new verification.

## Evidence and public shape

Comparison stays lexical. No embeddings, cosine values, facet vectors, Qwen or
hidden model calls are produced. The unchanged raw `compareDocuments` supplies the
public metadata shape and shared word-overlap terms only; its excerpts are replaced,
never used to establish relation support. `kind`, `question`, `sources`, `sharedTerms`,
`answered` and `note` remain present. Success also has `answer`, `experiment`, and
`comparison_contract`; citations retain document identity, filename, warning and
`supported`, with exact quote/excerpt/start/end and sequential numbers 1 and 2.

Offsets refer to the inherited Comparison's normalized body (CRLF/CR to LF,
spaces/tabs collapsed, outer trim), not raw uploaded-byte offsets. Original files
and uploaded bytes are not edited. Quotes must be unique contiguous spans <=620
characters. Two sources are emitted only if both documents pass. No fragments are
joined across paragraph, heading or numbered-policy boundaries. Conflicting or
duplicate relevant records refuse. Named documents require distinct nonempty
string IDs/names, string bodies <=180,000 characters and distinct normalized entities;
invalid metadata throws an engineering error. Existing 600-character query limit
still applies. Ask, Stage A/B, clock and body helpers are exact v45 exports.

## Verification and limits

First targeted synthetic run: **24/24 PASS**, no fixes/retries after failure.
Full dependency-free Node v24.22.1 suite: **848/848 PASS**.
Strict bundled Keyword evaluation: **28/28 PASS**, zero false accepts or citation
provenance errors. These tests do not establish actual MiniLM quality.

The [engineering report](../../docs/V46_STAGE_C_ENGINEERING.md) and
[evidence manifest](../../docs/evidence/v46-stage-c-engineering/manifest.json) retain
passing logs and seal the implementation, tests and documentation. Original v45
failure, prior candidate sources, input freezes and Fresh64 evidence stay unchanged.

This grammar deliberately refuses many natural paraphrases, multi-object pairs,
nonadjacent policies and pronoun-based events. It does not promise generic relation
understanding or that any exposed failure is repaired. A/B/C now have isolated
bounded implementations; there is no 668-case preservation run, Fresh64 replay,
new prospective study or model score for v46. Those require a separately agreed,
frozen and published execution protocol. Original Fresh64 remains FAIL; phase 2
and integration remain on hold; live GroundedDesk remains 5.6/r44.
