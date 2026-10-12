# Real Chrome benchmark history

All scores below use displayed answer quotations/direct lexical Comparison excerpts. MiniLM Hybrid and Comparison are separate workflows; Qwen remained off. Historical first-look results are immutable.

| Corpus | Build | Classification | PASS | PARTIAL | FAIL |
|---|---|---|---:|---:|---:|
| Lantern32 | r22 | Independent first-look | 16 | 12 | 4 |
| Lantern32 | r23 | In-sample regression | 20 | 12 | 0 |
| Lantern32 | r24 | In-sample regression | 32 | 0 | 0 |
| Aster32 | r24 | Independent first-look | 26 | 5 | 1 |
| Aster32 | r25 | In-sample regression | 32 | 0 | 0 |
| Lantern32 | r25 | In-sample regression | 32 | 0 | 0 |

## r25 actual-model capture

Tested 12 October 2026 in installed Google Chrome launched by Python Playwright channel=chrome, headless, against exact PR head `20e1954f8f6da0ccbd19d55a0dc2cec469c6a381`, locally served over HTTP. Each corpus used four original SHA-verified TXT files, 26 Hybrid questions and six dedicated lexical Comparison questions. MiniLM `Xenova/all-MiniLM-L6-v2` indexed 18 Aster passages and 16 Lantern passages; extractive mode stayed active. No key/rubric/manifest was uploaded.

Both corpora: 34/34 original-source quotation matches, 22/22 Hybrid quote-in-excerpt matches, 34/34 relevant citations, four explicit zero-citation refusals, zero false acceptances/refusals and zero regressions. Aster repairs H01, H08, H10, H15, H18 and X28; all 26 earlier passes remain PASS. Lantern preserves all 32 r24 passes.

### Capture qualification

The supplied runner's initial Aster H01 wait failed because JavaScript `q` was undefined. No initial answer was saved or scored. A runner-only predicate correction to `(q) => ...` allowed a full capture. Aster H01 was therefore attempted twice overall; its first output is unavailable. All other 63 cases were attempted once. No observed wrong answer was replaced. Do not omit this exception when quoting the 32/32 Aster result.

The original frozen packs, raw outputs, 64 screenshots, reports, result locks and runner diagnostic are retained in the owner's evaluation workspace. They are not committed here because frozen keys and source test packs must not become runtime inputs or public regression fixtures. This summary records measured results, not a claim that the private evidence bundle is hosted in this repository.

CI at the exact head passed validation and browser smoke. Local LF checkout passed 213/213 tests; Windows CRLF checkout passed 212/213 because one test checked normalized excerpts against raw CRLF strings. A follow-up test assertion normalizes line endings consistently with production provenance checks; retrieval logic is unchanged.

## Interpretation

These small fictional corpora are not representative production accuracy. The Aster first-look 81.25% showed that Lantern's exposed 100% did not generalize to every new question. Later 100% figures measure regression recovery, not new held-out performance. Future independent accuracy requires a separately frozen unseen corpus after code freeze.
