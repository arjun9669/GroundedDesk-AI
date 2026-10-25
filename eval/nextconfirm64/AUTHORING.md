# NextConfirm64 first input draft

Date: **25 October 2026**. Design: [published input protocol](PROTOCOL.md).
Status: **DRAFT PREPARED; independent review PENDING; input freeze ABSENT;
execution NOT READY / NOT RUN; Phase 2 HOLD**.

## Prepared inputs

Eight original fictional English TXT documents, D01–D08, contain 65 paragraphs
and 14,261 raw UTF-8 bytes. All eight belong to the shared Hybrid corpus; each
Comparison's exact selected pair and order are fixed in cases.json. Source file
identity, raw size and SHA-256 are recorded in sources.json. No personal documents,
web downloads or paid inference API are involved.

| Input | Purpose |
| --- | --- |
| [sources.json](sources.json) / source_docs/ | Eight original source IDs, filenames, paths, authorship, raw lengths and hashes |
| [cases.json](cases.json) | NC01–NC64 exact questions, workflow/category and original selected-document order |
| [answer-key.json](answer-key.json) | 44 supported and 20 unsupported author labels; exact native filename/context/group requirements |
| [author-notes.json](author-notes.json) | Author rationale, including each missing/ambiguous facet; not independent review |
| [authorship.json](authorship.json) | Codex source/question/key authorship and access to earlier candidate/results; no blinded-authorship claim |
| [input-review.json](input-review.json) | Eight source and 64 case review rows, all OPEN with no reviewer or sign-off |
| [author-findings.json](author-findings.json) | One preserved pre-freeze author clarification, NC-A01; independent recheck pending |

Inventory matches the published design: 40 supported/16 unsupported Hybrid and
4 supported/4 unsupported lexical Comparisons, 64 unique questions. Planned capture
is 112 actual Hybrid outputs across fixed/section plus eight shared lexical outputs,
120 unique captured outputs. No output has been generated for this pack. Authoring
with knowledge of earlier failures does not establish independent validation or
representative accuracy; a new name or reviewer placeholder does not make it so.

## Static engineering and author correction

[Static validator](validate-draft.mjs) checks raw sizes/hashes, UTF-8 and source
limits; exact case/key/category/order and selected membership; literal complete
paragraph contexts and gold alternatives; pending-review record identities and
question/key/source hashes. It rejects invented review completion/exposure/freeze
states. It imports only Node builtins, and never imports or calls candidates,
planners, native scoring, embeddings or browsers. Static PASS does not prove
semantic sufficiency, absence across all sources or independent review.

Run the safe static audit from the official checkout with Node 22+:

```sh
node eval/nextconfirm64/validate-draft.mjs
```

This validator audits the current unreviewed draft, not a completed final input
freeze. Future independent review and final input-freeze validation are separate
requirements. Its normalized-body check is descriptive; raw bytes remain intact.

17/17 unrelated synthetic validator tests PASS; 1083/1083 full unit tests PASS;
28/28 strict Keyword checks PASS. No MiniLM/Qwen quality measurement or new browser
preflight was performed. [Logs/static checks](../../docs/evidence/nextconfirm64-draft-preparation/).
Exact whole-paragraph overlap check found zero matches against 64 older repository
source_docs TXT files; it is not a semantic originality certification.

Author self-review identified an ambiguity in NC54: the first wording could be
read as asking normal retention rather than an undocumented customs-appeal
extension. Clarified the question to ask explicitly for the extension beyond the
normal two years. No source, supported/unsupported label, category/count, candidate
or threshold changed. Preserved the complete first draft's source inventory,
cases/key/notes/authorship/review and first static result in the
[correction archive](../../docs/evidence/nextconfirm64-author-correction-01/manifest.json).
The finding records old/new hashes and remains pending independent recheck.
Current static validation passes after this correction; original logs are retained.
The unit tests use unrelated fixtures, and source/validator code stayed unchanged.

## Independent review and publication boundary

No distinct reviewer is assigned. input-review.json contains placeholders, not
completed checks. The [review checklist](INPUT_REVIEW.md) must be completed for
every source and question/key by an actual distinct reviewer before an input
freeze. Gold groups and author absence rationales can still contain substantive
errors; do not use a static PASS to approve them. Any pre-freeze correction must
preserve attempted bytes and finding history, then update exact reviewed hashes.

[draft-manifest.json](draft-manifest.json) seals this first draft publication and
its engineering evidence only. It is deliberately not input-freeze-manifest.json
or an executable study config. It cannot authorize submission of these questions.
No input or execution freeze, model study, successful confirmation, acceptance
policy revision or live candidate adoption is claimed.

Original FC61/native FAIL, v50 Fresh64 63 PASS/1 FAIL per variant and failed old
64/64 gate remain unchanged. Phase 2/integration HOLD, live 5.6/r44, 103 missing
originals/full 771 NOT RUN and Windows/device/release gates persist. Next complete
independent pre-output input/key review; then prepare a reviewed input freeze and
separate measured execution readiness. Phase closure also needs the explicit
prospective legacy-gate acceptance-policy decision in the
[parent plan](../../docs/PHASE2_ACCEPTANCE_PLAN.md).
