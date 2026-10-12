# Cobalt16 — r32 workspace UI regression

**16 PASS / 0 PARTIAL / 0 FAIL.** In-sample regression of the unchanged r29 Cobalt16 pack. This is not a new independent evaluation. The first-look remains 15 PASS / 0 PARTIAL / 1 FAIL; r30 remains 16 PASS / 0 PARTIAL / 0 FAIL.

Twelve actual local MiniLM Hybrid cases, Qwen off, and four separate lexical Comparison cases ran in installed headless Chrome 154.0.8037.98 against the r32 UI candidate. Original source/key/rubric hashes were verified. Only the three original TXT sources were uploaded. All outputs were captured before scoring. Grading uses the same required facts, relevance, provenance and refusal rules. Answer-only text was read directly from the displayed answer box, because the report button now says Save report. This changes capture boundaries, not scoring thresholds.

Four zero-citation refusals; zero false acceptances and false refusals; 16/16 citations relevant and source-literal. Source records match r30 exactly. All sixteen copied reports are identical to r30 after substituting only the retrieval build identifier. Rankings, quoted answers and retrieval algorithms are unchanged. H05 still uses the unclear anaphor “there”; its frozen required facts pass.

| Case | Workflow | Result |
|---|---|---|
| H01 | hybrid | PASS |
| H02 | hybrid | PASS |
| H03 | hybrid | PASS |
| H04 | hybrid | PASS |
| H05 | hybrid | PASS |
| H06 | hybrid | PASS |
| H07 | hybrid | PASS |
| H08 | hybrid | PASS |
| H09 | hybrid | PASS |
| H10 | hybrid | PASS |
| H11 | hybrid | PASS |
| H12 | hybrid | PASS |
| C13 | comparison | PASS |
| C14 | comparison | PASS |
| C15 | comparison | PASS |
| C16 | comparison | PASS |

## Exact displayed answers and source passages

### H01

How many visitors can attend one planetarium session?

```text
[1] Each planetarium session admits at most 48 visitors.
```

**01_Cobalt_Planetarium.txt** · Text line 2 (normalized extraction)

```text
Cobalt Community Centre — Fictional Planetarium Guide
P-01. Each planetarium session admits at most 48 visitors. The number counts seated visitors, not staff.
P-02. The projection technician begins the alignment check 25 minutes before doors open. The check is repeated after any projector replacement.
P-03. Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.
P-04. A replacement projector must receive written sign-off from the Projection Technician and Programme Coordinator before public use.
```

### H02

When does the projection technician start the alignment check, and when must it be repeated?

```text
[1] The projection technician begins the alignment check 25 minutes before doors open. The check is repeated after any projector replacement.
```

**01_Cobalt_Planetarium.txt** · Text line 3 (normalized extraction)

```text
Cobalt Community Centre — Fictional Planetarium Guide
P-01. Each planetarium session admits at most 48 visitors. The number counts seated visitors, not staff.
P-02. The projection technician begins the alignment check 25 minutes before doors open. The check is repeated after any projector replacement.
P-03. Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.
P-04. A replacement projector must receive written sign-off from the Projection Technician and Programme Coordinator before public use.
```

### H03

How long are session attendance registers retained, including the exception?

```text
[1] Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.
```

**01_Cobalt_Planetarium.txt** · Text line 4 (normalized extraction)

```text
ts at most 48 visitors. The number counts seated visitors, not staff.
P-02. The projection technician begins the alignment check 25 minutes before doors open. The check is repeated after any projector replacement.
P-03. Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.
P-04. A replacement projector must receive written sign-off from the Projection Technician and Programme Coordinator before public use.
```

### H04

Who must sign off a replacement projector before public use, and in what form?

```text
[1] A replacement projector must receive written sign-off from the Projection Technician and Programme Coordinator before public use.
```

**01_Cobalt_Planetarium.txt** · Text line 5 (normalized extraction)

```text
check 25 minutes before doors open. The check is repeated after any projector replacement.
P-03. Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.
P-04. A replacement projector must receive written sign-off from the Projection Technician and Programme Coordinator before public use.
```

### H05

What happens to framed prints arriving with visible condensation?

```text
[1] Prints arriving with visible condensation remain there until the Collection Curator confirms they are dry.
```

**02_Cobalt_Gallery.txt** · Text line 4 (normalized extraction)

```text
visitors, not guides.
G-02. Gallery loan registers are retained for 12 years, unless the loan agreement specifies a longer period.
G-03. Newly arrived framed prints must remain in the acclimatisation room for 36 hours. Prints arriving with visible condensation remain there until the Collection Curator confirms they are dry.
G-04. A gallery loan may be accepted only with written approval from the Collection Curator and Registrar.
```

### H06

How long do seed envelopes dry, and what happens if they remain damp?

```text
[1] Seed envelopes air-dry for 18 hours before shelving. Envelopes that remain damp are isolated until the Seed Librarian records a dry inspection.
```

**03_Cobalt_Seed_Library.txt** · Text line 2 (normalized extraction)

```text
Cobalt Community Centre — Fictional Seed Library Guide
S-01. Seed envelopes air-dry for 18 hours before shelving. Envelopes that remain damp are isolated until the Seed Librarian records a dry inspection.
S-02. Seed accession registers are retained for five years, unless an active conservation hold requires longer retention.
S-03. Each visitor may collect up to three seed packets per visit, unless a donor restriction limits that seed variety to one packet.
S-04. A donated seed ba
```

### H07

What is the seed packet limit per visitor, including the donor exception?

```text
[1] Each visitor may collect up to three seed packets per visit, unless a donor restriction limits that seed variety to one packet.
```

**03_Cobalt_Seed_Library.txt** · Text line 4 (normalized extraction)

```text
Envelopes that remain damp are isolated until the Seed Librarian records a dry inspection.
S-02. Seed accession registers are retained for five years, unless an active conservation hold requires longer retention.
S-03. Each visitor may collect up to three seed packets per visit, unless a donor restriction limits that seed variety to one packet.
S-04. A donated seed batch must receive written acceptance from the Seed Librarian and Conservation Coordinator before distribution.
```

### H08

Whose written acceptance is needed before donated seed batches can be distributed?

```text
[1] A donated seed batch must receive written acceptance from the Seed Librarian and Conservation Coordinator before distribution.
```

**03_Cobalt_Seed_Library.txt** · Text line 5 (normalized extraction)

```text
d for five years, unless an active conservation hold requires longer retention.
S-03. Each visitor may collect up to three seed packets per visit, unless a donor restriction limits that seed variety to one packet.
S-04. A donated seed batch must receive written acceptance from the Seed Librarian and Conservation Coordinator before distribution.
```

### H09

What is the exact PIN code for the Cobalt planetarium door?

```text
I can't find this in the provided documents.
```

Zero citations.

### H10

What is the current price of gold?

```text
I can't find this in the provided documents.
```

Zero citations.

### H11

What is the Cobalt Gallery director's date of birth?

```text
I can't find this in the provided documents.
```

Zero citations.

### H12

What is the exact projector lamp wattage?

```text
I can't find this in the provided documents.
```

Zero citations.

### C13

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

**01_Cobalt_Planetarium.txt** · Text line 2 (normalized extraction)

```text
Each planetarium session admits at most 48 visitors.
```

**02_Cobalt_Gallery.txt** · Text line 2 (normalized extraction)

```text
Each guided gallery session admits at most 32 visitors.
```

### C14

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

**01_Cobalt_Planetarium.txt** · Text line 4 (normalized extraction)

```text
Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.
```

**03_Cobalt_Seed_Library.txt** · Text line 3 (normalized extraction)

```text
Seed accession registers are retained for five years, unless an active conservation hold requires longer retention.
```

### C15

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

**02_Cobalt_Gallery.txt** · Text line 5 (normalized extraction)

```text
A gallery loan may be accepted only with written approval from the Collection Curator and Registrar.
```

**03_Cobalt_Seed_Library.txt** · Text line 5 (normalized extraction)

```text
A donated seed batch must receive written acceptance from the Seed Librarian and Conservation Coordinator before distribution.
```

### C16

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

**02_Cobalt_Gallery.txt** · Text line 4 (normalized extraction)

```text
Newly arrived framed prints must remain in the acclimatisation room for 36 hours. Prints arriving with visible condensation remain there until the Collection Curator confirms they are dry.
```

**03_Cobalt_Seed_Library.txt** · Text line 2 (normalized extraction)

```text
Seed envelopes air-dry for 18 hours before shelving. Envelopes that remain damp are isolated until the Seed Librarian records a dry inspection.
```

[JSON scorecard](scorecard.json) · [Raw browser observations](browser-observations.json). Exact per-case screenshots and Markdown exports are preserved in the local evidence bundle. Original source/key/rubric and first-look outputs remain in the r29 pack.
