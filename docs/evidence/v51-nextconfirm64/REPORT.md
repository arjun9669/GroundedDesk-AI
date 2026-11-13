# v51 NextConfirm64 Chrome regression

The isolated v51 scoped-evidence candidate ran all 64 exposed NextConfirm64 questions in Windows Google Chrome 157 with actual local `Xenova/all-MiniLM-L6-v2` q8/WASM and Qwen off. There were 56 Hybrid questions per index and eight shared lexical comparisons, for 120 measured outputs. The raw answers, source spans and screenshots were sealed before grading. The live r44 UI was outside scope. The v50 result remains 41 PASS, 3 PARTIAL and 20 FAIL per index.

| Index | PASS | PARTIAL | FAIL | Prior PASS lost | Repaired | False acceptance | False refusal | Relevant quotes | Provenance | Audit failures |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| fixed | 64 | 0 | 0 | 0 | 23 | 0 | 0 | 48/48 | 48/48 | 0 |
| section | 64 | 0 | 0 | 0 | 23 | 0 | 0 | 48/48 | 48/48 | 0 |

This is an in-sample engineering result because the pack and a saved-evidence diagnostic informed candidate development. Performance on unseen inputs remains unmeasured. Fresh64 FC61 and the independent 6.0 release hold remain on record.

| Case | Workflow | v50 fixed | v51 fixed | v50 section | v51 section |
|---|---|---|---|---|---|
| NC01 | hybrid | PASS | PASS | PASS | PASS |
| NC02 | hybrid | PASS | PASS | PASS | PASS |
| NC03 | hybrid | PASS | PASS | PASS | PASS |
| NC04 | hybrid | PASS | PASS | PASS | PASS |
| NC05 | hybrid | PASS | PASS | PASS | PASS |
| NC06 | hybrid | PASS | PASS | PASS | PASS |
| NC07 | hybrid | PASS | PASS | PASS | PASS |
| NC08 | hybrid | PASS | PASS | PASS | PASS |
| NC09 | hybrid | PASS | PASS | PASS | PASS |
| NC10 | hybrid | PASS | PASS | PASS | PASS |
| NC11 | hybrid | PASS | PASS | PASS | PASS |
| NC12 | hybrid | PASS | PASS | PASS | PASS |
| NC13 | hybrid | PASS | PASS | PASS | PASS |
| NC14 | hybrid | PASS | PASS | PASS | PASS |
| NC15 | hybrid | PASS | PASS | PASS | PASS |
| NC16 | hybrid | PASS | PASS | PASS | PASS |
| NC17 | hybrid | PASS | PASS | PASS | PASS |
| NC18 | hybrid | PASS | PASS | PASS | PASS |
| NC19 | hybrid | PASS | PASS | PASS | PASS |
| NC20 | hybrid | PASS | PASS | PASS | PASS |
| NC21 | hybrid | FAIL | PASS | FAIL | PASS |
| NC22 | hybrid | PASS | PASS | PASS | PASS |
| NC23 | hybrid | PARTIAL | PASS | PARTIAL | PASS |
| NC24 | hybrid | PASS | PASS | PASS | PASS |
| NC25 | hybrid | PASS | PASS | PASS | PASS |
| NC26 | hybrid | FAIL | PASS | FAIL | PASS |
| NC27 | hybrid | PASS | PASS | PASS | PASS |
| NC28 | hybrid | PASS | PASS | PASS | PASS |
| NC29 | hybrid | PARTIAL | PASS | PARTIAL | PASS |
| NC30 | hybrid | PASS | PASS | PASS | PASS |
| NC31 | hybrid | FAIL | PASS | FAIL | PASS |
| NC32 | hybrid | PASS | PASS | PASS | PASS |
| NC33 | hybrid | PASS | PASS | PASS | PASS |
| NC34 | hybrid | FAIL | PASS | FAIL | PASS |
| NC35 | hybrid | PASS | PASS | PASS | PASS |
| NC36 | hybrid | PASS | PASS | PASS | PASS |
| NC37 | hybrid | PASS | PASS | PASS | PASS |
| NC38 | hybrid | PASS | PASS | PASS | PASS |
| NC39 | hybrid | PASS | PASS | PASS | PASS |
| NC40 | hybrid | PASS | PASS | PASS | PASS |
| NC41 | hybrid | FAIL | PASS | FAIL | PASS |
| NC42 | hybrid | FAIL | PASS | FAIL | PASS |
| NC43 | hybrid | FAIL | PASS | FAIL | PASS |
| NC44 | hybrid | FAIL | PASS | FAIL | PASS |
| NC45 | hybrid | FAIL | PASS | FAIL | PASS |
| NC46 | hybrid | FAIL | PASS | FAIL | PASS |
| NC47 | hybrid | FAIL | PASS | FAIL | PASS |
| NC48 | hybrid | FAIL | PASS | FAIL | PASS |
| NC49 | hybrid | PASS | PASS | PASS | PASS |
| NC50 | hybrid | FAIL | PASS | FAIL | PASS |
| NC51 | hybrid | PASS | PASS | PASS | PASS |
| NC52 | hybrid | FAIL | PASS | FAIL | PASS |
| NC53 | hybrid | PASS | PASS | PASS | PASS |
| NC54 | hybrid | FAIL | PASS | FAIL | PASS |
| NC55 | hybrid | FAIL | PASS | FAIL | PASS |
| NC56 | hybrid | PASS | PASS | PASS | PASS |
| NC57 | comparison | FAIL | PASS | FAIL | PASS |
| NC58 | comparison | FAIL | PASS | FAIL | PASS |
| NC59 | comparison | PARTIAL | PASS | PARTIAL | PASS |
| NC60 | comparison | PASS | PASS | PASS | PASS |
| NC61 | comparison | PASS | PASS | PASS | PASS |
| NC62 | comparison | PASS | PASS | PASS | PASS |
| NC63 | comparison | FAIL | PASS | FAIL | PASS |
| NC64 | comparison | FAIL | PASS | FAIL | PASS |

The scorecard contains every exact answer, quotation, relevance decision and provenance check. The raw evidence includes screenshots and model asset receipts.
