# Cobalt16 — r29 first-look report

**15 PASS / 0 PARTIAL / 1 FAIL.** Small self-authored first-look corpus, separate from all earlier benchmarks. This is not external validation or a representative accuracy estimate.

Three fictional TXT documents, 16 questions and rubric were frozen and hashed before browser outputs. All inputs were hash-verified, then all cases executed once before grading. Only the sources were uploaded. Actual installed Google Chrome 154.0.8037.98 ran local Xenova/all-MiniLM-L6-v2 in WASM with Hybrid Q&A (12 cases) and Qwen off. Four cases used separate lexical Comparison. No mock embeddings. Build: Loaded retrieval build: 2026-10-12-r29.

12/12 supported cases PASS. 3/4 unsupported cases explicitly refused with zero citations. **False acceptance: 1; false refusals: 0.** All 17 displayed source excerpts trace to the frozen source text after whitespace normalization; 16/17 citations are relevant. Mechanical provenance did not prevent the H09 refusal failure. H05 says “there”; its frozen required facts pass, but naming the acclimatisation room would make the answer clearer.

Historical Atlas, Meridian, Lantern and Aster scores remain unchanged. Cobalt16 is a different and much smaller test set; its score cannot be treated as a like-for-like improvement. No application changes were made after Cobalt16 outputs were observed.

| Case | Workflow | Outcome | Reason |
|---|---|---|---|
| H01 | hybrid | PASS | All frozen required facts are displayed; expected documents only; excerpts trace to frozen sources. |
| H02 | hybrid | PASS | All frozen required facts are displayed; expected documents only; excerpts trace to frozen sources. |
| H03 | hybrid | PASS | All frozen required facts are displayed; expected documents only; excerpts trace to frozen sources. |
| H04 | hybrid | PASS | All frozen required facts are displayed; expected documents only; excerpts trace to frozen sources. |
| H05 | hybrid | PASS | All frozen required facts are displayed; expected documents only; excerpts trace to frozen sources. |
| H06 | hybrid | PASS | All frozen required facts are displayed; expected documents only; excerpts trace to frozen sources. |
| H07 | hybrid | PASS | All frozen required facts are displayed; expected documents only; excerpts trace to frozen sources. |
| H08 | hybrid | PASS | All frozen required facts are displayed; expected documents only; excerpts trace to frozen sources. |
| H09 | hybrid | FAIL | False acceptance: returned the planetarium document title with one irrelevant citation instead of refusing the unknown PIN. No PIN value was fabricated. |
| H10 | hybrid | PASS | Explicit refusal with zero citations. |
| H11 | hybrid | PASS | Explicit refusal with zero citations. |
| H12 | hybrid | PASS | Explicit refusal with zero citations. |
| C13 | comparison | PASS | All frozen required facts are displayed; expected documents only; excerpts trace to frozen sources. |
| C14 | comparison | PASS | All frozen required facts are displayed; expected documents only; excerpts trace to frozen sources. |
| C15 | comparison | PASS | All frozen required facts are displayed; expected documents only; excerpts trace to frozen sources. |
| C16 | comparison | PASS | All frozen required facts are displayed; expected documents only; excerpts trace to frozen sources. |

## Exact captured answers and sources

### H01 — PASS

How many visitors can attend one planetarium session?

```text
[1] Each planetarium session admits at most 48 visitors.
```

**01_Cobalt_Planetarium.txt** · Text line 2 (normalized extraction) · provenance PASS · relevance PASS

```text
Cobalt Community Centre — Fictional Planetarium Guide
P-01. Each planetarium session admits at most 48 visitors. The number counts seated visitors, not staff.
P-02. The projection technician begins the alignment check 25 minutes before doors open. The check is repeated after any projector replacement.
P-03. Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.
P-04. A replacement projector must receive written sign-off from the Projection Technician and Programme Coordinator before public use.
```

### H02 — PASS

When does the projection technician start the alignment check, and when must it be repeated?

```text
[1] The projection technician begins the alignment check 25 minutes before doors open. The check is repeated after any projector replacement.
```

**01_Cobalt_Planetarium.txt** · Text line 3 (normalized extraction) · provenance PASS · relevance PASS

```text
Cobalt Community Centre — Fictional Planetarium Guide
P-01. Each planetarium session admits at most 48 visitors. The number counts seated visitors, not staff.
P-02. The projection technician begins the alignment check 25 minutes before doors open. The check is repeated after any projector replacement.
P-03. Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.
P-04. A replacement projector must receive written sign-off from the Projection Technician and Programme Coordinator before public use.
```

### H03 — PASS

How long are session attendance registers retained, including the exception?

```text
[1] Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.
```

**01_Cobalt_Planetarium.txt** · Text line 4 (normalized extraction) · provenance PASS · relevance PASS

```text
ts at most 48 visitors. The number counts seated visitors, not staff.
P-02. The projection technician begins the alignment check 25 minutes before doors open. The check is repeated after any projector replacement.
P-03. Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.
P-04. A replacement projector must receive written sign-off from the Projection Technician and Programme Coordinator before public use.
```

### H04 — PASS

Who must sign off a replacement projector before public use, and in what form?

```text
[1] A replacement projector must receive written sign-off from the Projection Technician and Programme Coordinator before public use.
```

**01_Cobalt_Planetarium.txt** · Text line 5 (normalized extraction) · provenance PASS · relevance PASS

```text
check 25 minutes before doors open. The check is repeated after any projector replacement.
P-03. Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.
P-04. A replacement projector must receive written sign-off from the Projection Technician and Programme Coordinator before public use.
```

### H05 — PASS

What happens to framed prints arriving with visible condensation?

```text
[1] Prints arriving with visible condensation remain there until the Collection Curator confirms they are dry.
```

**02_Cobalt_Gallery.txt** · Text line 4 (normalized extraction) · provenance PASS · relevance PASS

```text
visitors, not guides.
G-02. Gallery loan registers are retained for 12 years, unless the loan agreement specifies a longer period.
G-03. Newly arrived framed prints must remain in the acclimatisation room for 36 hours. Prints arriving with visible condensation remain there until the Collection Curator confirms they are dry.
G-04. A gallery loan may be accepted only with written approval from the Collection Curator and Registrar.
```

### H06 — PASS

How long do seed envelopes dry, and what happens if they remain damp?

```text
[1] Seed envelopes air-dry for 18 hours before shelving. Envelopes that remain damp are isolated until the Seed Librarian records a dry inspection.
```

**03_Cobalt_Seed_Library.txt** · Text line 2 (normalized extraction) · provenance PASS · relevance PASS

```text
Cobalt Community Centre — Fictional Seed Library Guide
S-01. Seed envelopes air-dry for 18 hours before shelving. Envelopes that remain damp are isolated until the Seed Librarian records a dry inspection.
S-02. Seed accession registers are retained for five years, unless an active conservation hold requires longer retention.
S-03. Each visitor may collect up to three seed packets per visit, unless a donor restriction limits that seed variety to one packet.
S-04. A donated seed ba
```

### H07 — PASS

What is the seed packet limit per visitor, including the donor exception?

```text
[1] Each visitor may collect up to three seed packets per visit, unless a donor restriction limits that seed variety to one packet.
```

**03_Cobalt_Seed_Library.txt** · Text line 4 (normalized extraction) · provenance PASS · relevance PASS

```text
Envelopes that remain damp are isolated until the Seed Librarian records a dry inspection.
S-02. Seed accession registers are retained for five years, unless an active conservation hold requires longer retention.
S-03. Each visitor may collect up to three seed packets per visit, unless a donor restriction limits that seed variety to one packet.
S-04. A donated seed batch must receive written acceptance from the Seed Librarian and Conservation Coordinator before distribution.
```

### H08 — PASS

Whose written acceptance is needed before donated seed batches can be distributed?

```text
[1] A donated seed batch must receive written acceptance from the Seed Librarian and Conservation Coordinator before distribution.
```

**03_Cobalt_Seed_Library.txt** · Text line 5 (normalized extraction) · provenance PASS · relevance PASS

```text
d for five years, unless an active conservation hold requires longer retention.
S-03. Each visitor may collect up to three seed packets per visit, unless a donor restriction limits that seed variety to one packet.
S-04. A donated seed batch must receive written acceptance from the Seed Librarian and Conservation Coordinator before distribution.
```

### H09 — FAIL

What is the exact PIN code for the Cobalt planetarium door?

```text
[1] Cobalt Community Centre — Fictional Planetarium Guide
```

**01_Cobalt_Planetarium.txt** · Text line 1 (normalized extraction) · provenance PASS · relevance FAIL

```text
Cobalt Community Centre — Fictional Planetarium Guide
P-01. Each planetarium session admits at most 48 visitors. The number counts seated visitors, not staff.
P-02. The projection technician begins the alignment check 25 minutes before doors open. The check is repeated after any projector replacement.
P-03. Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.
P-04. A replacement projector must receive written sign-off from the Projection Technician and Programme Coordinator before public use.
```

### H10 — PASS

What is the current price of gold?

```text
I can't find this in the provided documents.

Try a different question or add a document containing relevant information. No answer was invented.
```

Zero citations.

### H11 — PASS

What is the Cobalt Gallery director's date of birth?

```text
I can't find this in the provided documents.

Try a different question or add a document containing relevant information. No answer was invented.
```

Zero citations.

### H12 — PASS

What is the exact projector lamp wattage?

```text
I can't find this in the provided documents.

Try a different question or add a document containing relevant information. No answer was invented.
```

Zero citations.

### C13 — PASS

Compare the visitor capacities of planetarium and guided gallery sessions.

```text
Shared vocabulary: admits, centre, cobalt, community, counts, each, fictional, guide, longer, most, must, number. Shared terms do not establish factual agreement.

[1] 01_Cobalt_Planetarium.txt

Each planetarium session admits at most 48 visitors.

Text line 2 (normalized extraction)

Locate in library ↗
[2] 02_Cobalt_Gallery.txt

Each guided gallery session admits at most 32 visitors.

Text line 2 (normalized extraction)

Locate in library ↗
```

**01_Cobalt_Planetarium.txt** · Text line 2 (normalized extraction) · provenance PASS · relevance PASS

```text
Each planetarium session admits at most 48 visitors.
```

**02_Cobalt_Gallery.txt** · Text line 2 (normalized extraction) · provenance PASS · relevance PASS

```text
Each guided gallery session admits at most 32 visitors.
```

### C14 — PASS

Compare planetarium attendance-register retention with seed accession-register retention, including exceptions.

```text
Shared vocabulary: active, before, centre, cobalt, community, coordinator, each, fictional, guide, longer, must, receive. Shared terms do not establish factual agreement.

[1] 01_Cobalt_Planetarium.txt

Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.

Text line 4 (normalized extraction)

Locate in library ↗
[2] 03_Cobalt_Seed_Library.txt

Seed accession registers are retained for five years, unless an active conservation hold requires longer retention.

Text line 3 (normalized extraction)

Locate in library ↗
```

**01_Cobalt_Planetarium.txt** · Text line 4 (normalized extraction) · provenance PASS · relevance PASS

```text
Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.
```

**03_Cobalt_Seed_Library.txt** · Text line 3 (normalized extraction) · provenance PASS · relevance PASS

```text
Seed accession registers are retained for five years, unless an active conservation hold requires longer retention.
```

### C15 — PASS

Compare the written approvals for accepting gallery loans and donated seed batches.

```text
Shared vocabulary: centre, cobalt, community, each, fictional, guide, hours, longer, must, registers, remain, retained. Shared terms do not establish factual agreement.

[1] 02_Cobalt_Gallery.txt

A gallery loan may be accepted only with written approval from the Collection Curator and Registrar.

Text line 5 (normalized extraction)

Locate in library ↗
[2] 03_Cobalt_Seed_Library.txt

A donated seed batch must receive written acceptance from the Seed Librarian and Conservation Coordinator before distribution.

Text line 5 (normalized extraction)

Locate in library ↗
```

**02_Cobalt_Gallery.txt** · Text line 5 (normalized extraction) · provenance PASS · relevance PASS

```text
A gallery loan may be accepted only with written approval from the Collection Curator and Registrar.
```

**03_Cobalt_Seed_Library.txt** · Text line 5 (normalized extraction) · provenance PASS · relevance PASS

```text
A donated seed batch must receive written acceptance from the Seed Librarian and Conservation Coordinator before distribution.
```

### C16 — PASS

Compare the initial holding times and dampness exceptions for framed prints and seed envelopes.

```text
Shared vocabulary: centre, cobalt, community, each, fictional, guide, hours, longer, must, registers, remain, retained. Shared terms do not establish factual agreement.

[1] 02_Cobalt_Gallery.txt

Newly arrived framed prints must remain in the acclimatisation room for 36 hours. Prints arriving with visible condensation remain there until the Collection Curator confirms they are dry.

Text line 4 (normalized extraction)

Locate in library ↗
[2] 03_Cobalt_Seed_Library.txt

Seed envelopes air-dry for 18 hours before shelving. Envelopes that remain damp are isolated until the Seed Librarian records a dry inspection.

Text line 2 (normalized extraction)

Locate in library ↗
```

**02_Cobalt_Gallery.txt** · Text line 4 (normalized extraction) · provenance PASS · relevance PASS

```text
Newly arrived framed prints must remain in the acclimatisation room for 36 hours. Prints arriving with visible condensation remain there until the Collection Curator confirms they are dry.
```

**03_Cobalt_Seed_Library.txt** · Text line 2 (normalized extraction) · provenance PASS · relevance PASS

```text
Seed envelopes air-dry for 18 hours before shelving. Envelopes that remain damp are isolated until the Seed Librarian records a dry inspection.
```

## Evidence

[Freeze manifest](freeze-manifest.json) · [Fixed key](fixed-answer-key.json) · [Rubric](FROZEN_RUBRIC.md) · [Raw outputs and model request observations](browser-observations.json) · [JSON scorecard](scorecard.json). Per-case screenshots and copied exports are preserved beside these files.

Physical-phone, Safari/Firefox, OCR and complex PDF-layout accuracy were not tested by this TXT benchmark.
