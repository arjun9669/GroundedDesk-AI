# Cobalt16 controls — answer coverage experiment

Cobalt16 known browser-module regression control; not independent or production main-UI accuracy

16 PASS / 0 PARTIAL / 0 FAIL. 12 actual-MiniLM Hybrid browser-module cases and four unchanged separate lexical Comparison cases. All source outputs match the paired production baseline. All 12 Hybrid answer strings match the preserved r41 answers after whitespace normalization.
The initial combined runner timed out before any Cobalt question. This separate recovery run retained the original failure log and did not repeat or replace RQ28 answers. This is an infrastructure retry qualification, not an undisclosed first-run success.
Required fact phrases all appear directly in the literal outputs. Manual review confirms roles, durations, exceptions and document associations. Expanded Hybrid context is not credited. H05 retains its original anaphoric "there" limitation under the unchanged rubric.

## H01 — PASS

How many visitors can attend one planetarium session?

[1] Each planetarium session admits at most 48 visitors.

01_Cobalt_Planetarium.txt

> Each planetarium session admits at most 48 visitors.

## H02 — PASS

When does the projection technician start the alignment check, and when must it be repeated?

[1] The projection technician begins the alignment check 25 minutes before doors open. The check is repeated after any projector replacement.

01_Cobalt_Planetarium.txt

> The projection technician begins the alignment check 25 minutes before doors open. The check is repeated after any projector replacement.

## H03 — PASS

How long are session attendance registers retained, including the exception?

[1] Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.

01_Cobalt_Planetarium.txt

> Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.

## H04 — PASS

Who must sign off a replacement projector before public use, and in what form?

[1] A replacement projector must receive written sign-off from the Projection Technician and Programme Coordinator before public use.

01_Cobalt_Planetarium.txt

> A replacement projector must receive written sign-off from the Projection Technician and Programme Coordinator before public use.

## H05 — PASS

What happens to framed prints arriving with visible condensation?

[1] Prints arriving with visible condensation remain there until the Collection Curator confirms they are dry.

02_Cobalt_Gallery.txt

> Prints arriving with visible condensation remain there until the Collection Curator confirms they are dry.

## H06 — PASS

How long do seed envelopes dry, and what happens if they remain damp?

[1] Seed envelopes air-dry for 18 hours before shelving. Envelopes that remain damp are isolated until the Seed Librarian records a dry inspection.

03_Cobalt_Seed_Library.txt

> Seed envelopes air-dry for 18 hours before shelving. Envelopes that remain damp are isolated until the Seed Librarian records a dry inspection.

## H07 — PASS

What is the seed packet limit per visitor, including the donor exception?

[1] Each visitor may collect up to three seed packets per visit, unless a donor restriction limits that seed variety to one packet.

03_Cobalt_Seed_Library.txt

> Each visitor may collect up to three seed packets per visit, unless a donor restriction limits that seed variety to one packet.

## H08 — PASS

Whose written acceptance is needed before donated seed batches can be distributed?

[1] A donated seed batch must receive written acceptance from the Seed Librarian and Conservation Coordinator before distribution.

03_Cobalt_Seed_Library.txt

> A donated seed batch must receive written acceptance from the Seed Librarian and Conservation Coordinator before distribution.

## H09 — PASS

What is the exact PIN code for the Cobalt planetarium door?

I can't find this in the provided documents.

## H10 — PASS

What is the current price of gold?

I can't find this in the provided documents.

## H11 — PASS

What is the Cobalt Gallery director's date of birth?

I can't find this in the provided documents.

## H12 — PASS

What is the exact projector lamp wattage?

I can't find this in the provided documents.

## C13 — PASS

Compare the visitor capacities of planetarium and guided gallery sessions.

[1] Each planetarium session admits at most 48 visitors.

[2] Each guided gallery session admits at most 32 visitors.

01_Cobalt_Planetarium.txt

> Each planetarium session admits at most 48 visitors.

02_Cobalt_Gallery.txt

> Each guided gallery session admits at most 32 visitors.

## C14 — PASS

Compare planetarium attendance-register retention with seed accession-register retention, including exceptions.

[1] Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.

[2] Seed accession registers are retained for five years, unless an active conservation hold requires longer retention.

01_Cobalt_Planetarium.txt

> Session attendance registers are kept for two years, unless an active safeguarding review requires longer retention.

03_Cobalt_Seed_Library.txt

> Seed accession registers are retained for five years, unless an active conservation hold requires longer retention.

## C15 — PASS

Compare the written approvals for accepting gallery loans and donated seed batches.

[1] A gallery loan may be accepted only with written approval from the Collection Curator and Registrar.

[2] A donated seed batch must receive written acceptance from the Seed Librarian and Conservation Coordinator before distribution.

02_Cobalt_Gallery.txt

> A gallery loan may be accepted only with written approval from the Collection Curator and Registrar.

03_Cobalt_Seed_Library.txt

> A donated seed batch must receive written acceptance from the Seed Librarian and Conservation Coordinator before distribution.

## C16 — PASS

Compare the initial holding times and dampness exceptions for framed prints and seed envelopes.

[1] Newly arrived framed prints must remain in the acclimatisation room for 36 hours. Prints arriving with visible condensation remain there until the Collection Curator confirms they are dry.

[2] Seed envelopes air-dry for 18 hours before shelving. Envelopes that remain damp are isolated until the Seed Librarian records a dry inspection.

02_Cobalt_Gallery.txt

> Newly arrived framed prints must remain in the acclimatisation room for 36 hours. Prints arriving with visible condensation remain there until the Collection Curator confirms they are dry.

03_Cobalt_Seed_Library.txt

> Seed envelopes air-dry for 18 hours before shelving. Envelopes that remain damp are isolated until the Seed Librarian records a dry inspection.
