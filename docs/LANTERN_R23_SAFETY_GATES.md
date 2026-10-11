# GroundedDesk AI r23 — conditional applicability and unsupported-value safety gates

**Status:** Candidate implementation. **Actual Chrome on-device MiniLM r23 accuracy NOT YET MEASURED.** Automated tests use deterministic mock vectors for Hybrid scoring; passing them does not establish real browser correctness.

## Why this change exists

The [immutable Lantern32 r22 first-look benchmark](LANTERN32_R22_FIRSTLOOK_RESULTS.md) is **16 PASS / 12 PARTIAL / 4 FAIL out of 32**. This is a newly frozen, once-unseen synthetic museum-policy domain and **must not** be overwritten by any r23 retest. Distinct from Meridian's r22 **23/24 in-sample regression**. Lantern failure modes:

- **H06:** a cancellation **18 hours before** a booking was given the **72+ hours full-refund** clause, rather than the applicable nonrefundable lower band.
- **H21:** a **post-cutoff** instructor cancellation was given the **pre-cutoff** replacement clause instead of the next-day notice deadline.
- **H18:** a failed nightly operation's retry and escalation question was answered only with its printed section heading.
- **H24:** a request for a named person's missing personal mobile number was answered with a true but **irrelevant approval sentence**, not a zero-citation refusal.

The first-look also exposed **11 Hybrid PARTIAL** answers missing adjacent source requirements and **one lexical Comparison PARTIAL**. These remain open and are not claimed fixed by r23.

## Candidate mechanisms

1. **Concrete personal mobile/contact value verification.** Requests for a mobile, cell, telephone or phone number require a source-literal contact label **and plausible printed phone digits in the displayed quote**. A quote merely mentioning the named role or an unrelated numeric approval cannot answer the request. For a question explicitly naming the holder after `of/for`, the same quote must contain the holder's name/title. Phone-number *handling* instructions continue to be answerable as operational policy questions.
2. **Relative cancellation interval selection.** For questions specifying `N hours/days before` booking/cancellation, select only an exact original sentence with a numerical applicable interval, respecting strict `less than`/`more than` versus inclusive `at least`/`or more`/`at most`. When printed temporal branches exist but none matches the requested numeric condition, refuse rather than cite the neighboring wrong band.
3. **Clock-time `before`/`after` conditions.** Compare the stated direction and clock threshold with an original source rule, requiring at least two meaningful overlapping question terms; do not answer an `after` query with a `before` clause. If a printed temporal branch exists but no applicable rule can be found, decline to cite it.
4. **Failed-retry escalation.** For explicitly failed/retried operations, optionally quote **two immediately consecutive, same-section original sentences** where one states the retry time and the next states the response after another retry failure. No inferred deadline, missing source fact or cross-section stitching is permitted.
5. **No heading-only answers.** If selected evidence consists solely of a numbered source-section title, return a no-evidence refusal with zero citations rather than manufacturing the appearance of factual support.

These are **narrow lexical constraints**, not a calibrated semantic entailment verifier or an assurance that any phone label belongs to an intended person unless the holder is explicitly mentioned. Some legitimate paraphrases and unsupported syntaxes may still fail; that must be measured, not assumed away.

## Regression gates

`tests/r23-applicable-clauses.test.mjs` exercises distinct synthetic source facts **not copied from the frozen Lantern32 documents**, positive and negative controls for:

- different refund/cancellation intervals including lower, upper and exact boundary;
- different cutoff times and `before` versus `after` directions;
- missing applicable branch → refusal;
- actual labeled contact number, no printed number, someone else's actual number, and operational policy questions about phones;
- source-exact failed-retry plus escalation; heading-only refusal;
- prior r20 purchase approval thresholds and dispatch times.

The existing Atlas, Meridian, Lantern freeze documentation, keyword, Hybrid-mock, refusal, citation relevance/provenance and comparison regressions must remain passing. Source/key contents from the Lantern32 frozen benchmark are **not imported into CI**. Browser module fingerprint is `2026-10-11-r23`.

## Mandatory actual browser gate

After successful CI and deployment, a tester must open `https://arjun9669.github.io/GroundedDesk-AI/?build=20261011-r23`, verify loaded build, load exactly the **four previously frozen Lantern32 TXT sources** with recorded hashes, activate actual `Xenova/all-MiniLM-L6-v2`, enable Hybrid, keep Qwen off, and rerun the **unchanged 26 Hybrid Q&A and six separate lexical Comparison** cases using the original answer key. Capture **all 32** raw outputs and evaluate completeness, relevance, literal provenance and zero-citation refusal. Inspect H06/H18/H21/H24 and regressions among the 16 old passes, plus all previously partial cases, but **do not change original questions or rubric**.

**The next Lantern32 run is necessarily an IN-SAMPLE REGRESSION**, not another independent first-look, because r23 was designed after studying Lantern32's results. Preserve the original **16/32 first-look** permanently. A *new* independently frozen and previously unseen benchmark is required for any subsequent generalization claim. The Meridian r18 original **16/24 first-unseen**, r22 **23/24 post-tuning** and Lantern r22 **16/32 first-unseen** scores remain separate.

**No r23 score or production-readiness claim can be made from CI alone.**
