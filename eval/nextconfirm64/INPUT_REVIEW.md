# NextConfirm64 source and answer-key review checklist

Checklist ID: **NEXTCONFIRM64-REVIEW-20261025**. Date: **25 October 2026**.
Applies to [NEXTCONFIRM64-INPUT-20261025](PROTOCOL.md).
Status: **Specification only; no reviewer assigned, no reviewed corpus/key,
no completed review or sign-off**.

## Reviewer identity and access

A reviewer distinct from the candidate/input author must read all eight complete
sources and all 64 questions/keys before candidate outputs exist. Record actual
identity/role, source and key authors, dates, reviewed commit/file SHA-256 identities,
and access to candidate code, earlier results, this category design and the keys.
Declare any conflict or shared authorship. A separate chat or renamed author is
not independence. Codex self-review or static hash checking cannot fulfill this
requirement. Record only actual completed work; never fill a sign-off from an
empty template. Contacting another person still requires messaging authorization.

Record whether these exact inputs were ever submitted to any candidate/planner/
model. Any such output makes them exposed; disclose it and stop treating the pack
as unseen confirmation. Do not run models or ask a candidate to help review.

## Eight-document checklist

Complete a separate row for each D01–D08, with the exact filename and raw SHA-256.

- Read the whole document, including headings, caveats, exceptions and distractors.
- Verify original fictional authorship, distinct facts and coherent source text;
  check against earlier benchmark material for recycling or name substitution.
- Check all referenced entities, objects, locations, dates, measurements, units,
  policy periods, roles and conditions. List contradictions and ambiguous aliases.
- Confirm no personal/sensitive data, credentials, key annotations or test cues.
- Verify UTF-8 source identity, preserved raw bytes, unique IDs/names and declared
  length limits. Normalization is an offset contract, not permission to edit bytes.
- Record every finding and its disposition, including reviewed correction hashes.

## All 64 case checklist

Complete one row for every NC01–NC64; do not sign off a sample instead of the pack.

- Match exact question, ID, category and workflow to frozen inventory order.
- Verify selected corpus/pair IDs, original filename attribution and input order.
- Parse every requested facet in plain language. Name entity, object, location,
  time/event/ordinal, role, quantity/sign/unit, metric, condition or exception.
- Judge meaning from sources without candidate behavior. Do not equate filename
  identity with proof of store, room, actor or policy scope.
- For supported cases, point to exact original literal contexts and every required
  gold group on its own expected filename. Check that groups cannot be satisfied
  by a different value, actor, object, month or nearby unrelated statement.
- Check full holds/exceptions and boundaries: above versus equal, before versus
  at, business versus calendar days, role versus addressee, monthly versus daily,
  mean versus average, material store versus another room, and signed units.
- For a local antecedent, identify its explicit same-document/same-block scope;
  do not cross paragraphs, conflicting rooms or unrelated statements.
- For Comparison, prove every requested facet independently on both selected
  sides; keep input/citation order distinct from question-side name order.
- For unsupported cases, search the complete selected corpus/pair, not just an
  intended paragraph. Identify the absent, ambiguous, conflicting or false-premise
  facet; confirm another paragraph/document cannot legitimately answer it.
- Check natural wording, source-supported answerability label and unique question
  text. A candidate's unsupported grammar does not justify relabelling a supported
  question or replacing it with an easier one.
- Confirm literal alternatives preserve the full requirement and do not smuggle
  in unit conversion, omitted conditions, assumed scope or relaxed target counts.
- Record finding IDs and final reviewed case/key/source hashes. Sign off only
  when every required facet and answerability decision is resolved.

## Required per-case review record

The future input-review.json must contain these fields for every row. This table
specifies a schema; it is not a completed review or an actual study case.

| Field | Required evidence |
| --- | --- |
| id / question_sha256 / key_file_sha256 / key_index | Exact ID; SHA-256 of exact UTF-8 question without an added newline; raw full key-file SHA-256; zero-based key record index |
| selected_documents | Ordered original source IDs/names and raw file hashes |
| answerability | supported or unsupported; reviewer rationale from complete sources |
| requested_facets | Each facet, owning source/context and literal evidence, or missing/ambiguous reason |
| expected_sources_review | Context/group literal checks plus semantic entity/object/location/time/metric/condition binding |
| absence_review | For unsupported cases: all selected documents checked, search/read evidence, unresolved competing facts if any |
| findings | Finding IDs, severity, affected files/records and current disposition |
| reviewer / reviewed_at | Actual distinct reviewer identity and completion time |
| outcome | OPEN, NEEDS_CORRECTION or VERIFIED; only VERIFIED may enter the final input freeze |

For supported rows, absence_review may be not_applicable; for unsupported rows,
expected_sources_review must confirm the empty native expected_sources and explain
why a refusal is required. Never invent a supported answer for an absent facet.

## Findings, corrections and pack sign-off

Maintain an append-only finding register: finding ID, discoverer/date, exact old
file or record hash, source-grounded issue, proposed correction, corrected hash,
reviewer recheck and disposition. Preserve pre-freeze attempted bytes for every
correction; do not erase contradictory original annotations. Genuine source/key
errors can be fixed before input freeze, independently rechecked and documented.
Changes to counts, categories or intended scope require a published protocol
revision before any outputs. No case is removed because the model might fail it.

The reviewer signs off the exact final file set only after all of these hold:

- Eight complete source reviews and 64 VERIFIED case rows; no OPEN or
  NEEDS_CORRECTION rows and no unresolved findings.
- Exact 40/16 Hybrid and 4/4 Comparison inventory, question uniqueness, selected
  identity/order and all literal-context/group checks verified.
- All supported facets proven and all unsupported labels checked against the
  complete selected corpus/pair, including apparently helpful distractors.
- Original Fresh64 failure, author knowledge, review independence and any exposure
  disclosed honestly. No claim of blinded or representative external validation.
- Native grader/candidate identity and prospective thresholds fixed; review
  outcome is input readiness, never candidate PASS or Phase 2 acceptance.

Record signed-off commit, raw source/case/key/protocol/checklist/review file hashes,
reviewer identity/date and correction-history references. Future static tooling
must validate completeness and hashes without candidate/planner calls, then seal
and publish this exact reviewed set. Publication cannot substitute for this review.

If a required independent review cannot be obtained, report that unmet gate and
continue only unblocked preparation. Do not certify a self-review as independent,
weaken the requirement or start the confirmation study. Separate legacy-gate
acceptance policy and complete execution readiness remain necessary afterward.
