# v52 frozen Chrome regressions

The isolated v52 candidate was tested in installed Windows Chrome with actual MiniLM q8/WASM and Qwen off. Both development-exposed packs retained their original inputs and native rubric. Each pack ran 56 Hybrid questions per index and eight lexical comparisons captured once. Raw evidence was sealed before scoring. The deployed application was outside scope.

| Pack | Index | PASS | PARTIAL | FAIL | Prior passes lost | False acceptances | False refusals | Relevant citations | Literal provenance | Audit findings |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| NextConfirm64 | fixed | 64 | 0 | 0 | 0 | 0 | 0 | 48/48 | 48/48 | 0 |
| NextConfirm64 | section | 64 | 0 | 0 | 0 | 0 | 0 | 48/48 | 48/48 | 0 |
| Switchyard64 | fixed | 63 | 0 | 1 | 0 | 1 | 0 | 48/50 | 50/50 | 0 |
| Switchyard64 | section | 63 | 0 | 1 | 0 | 1 | 0 | 48/50 | 50/50 | 0 |

## NextConfirm64

| ID | Workflow | v51 fixed | v52 fixed | v51 section | v52 section |
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
| NC21 | hybrid | PASS | PASS | PASS | PASS |
| NC22 | hybrid | PASS | PASS | PASS | PASS |
| NC23 | hybrid | PASS | PASS | PASS | PASS |
| NC24 | hybrid | PASS | PASS | PASS | PASS |
| NC25 | hybrid | PASS | PASS | PASS | PASS |
| NC26 | hybrid | PASS | PASS | PASS | PASS |
| NC27 | hybrid | PASS | PASS | PASS | PASS |
| NC28 | hybrid | PASS | PASS | PASS | PASS |
| NC29 | hybrid | PASS | PASS | PASS | PASS |
| NC30 | hybrid | PASS | PASS | PASS | PASS |
| NC31 | hybrid | PASS | PASS | PASS | PASS |
| NC32 | hybrid | PASS | PASS | PASS | PASS |
| NC33 | hybrid | PASS | PASS | PASS | PASS |
| NC34 | hybrid | PASS | PASS | PASS | PASS |
| NC35 | hybrid | PASS | PASS | PASS | PASS |
| NC36 | hybrid | PASS | PASS | PASS | PASS |
| NC37 | hybrid | PASS | PASS | PASS | PASS |
| NC38 | hybrid | PASS | PASS | PASS | PASS |
| NC39 | hybrid | PASS | PASS | PASS | PASS |
| NC40 | hybrid | PASS | PASS | PASS | PASS |
| NC41 | hybrid | PASS | PASS | PASS | PASS |
| NC42 | hybrid | PASS | PASS | PASS | PASS |
| NC43 | hybrid | PASS | PASS | PASS | PASS |
| NC44 | hybrid | PASS | PASS | PASS | PASS |
| NC45 | hybrid | PASS | PASS | PASS | PASS |
| NC46 | hybrid | PASS | PASS | PASS | PASS |
| NC47 | hybrid | PASS | PASS | PASS | PASS |
| NC48 | hybrid | PASS | PASS | PASS | PASS |
| NC49 | hybrid | PASS | PASS | PASS | PASS |
| NC50 | hybrid | PASS | PASS | PASS | PASS |
| NC51 | hybrid | PASS | PASS | PASS | PASS |
| NC52 | hybrid | PASS | PASS | PASS | PASS |
| NC53 | hybrid | PASS | PASS | PASS | PASS |
| NC54 | hybrid | PASS | PASS | PASS | PASS |
| NC55 | hybrid | PASS | PASS | PASS | PASS |
| NC56 | hybrid | PASS | PASS | PASS | PASS |
| NC57 | comparison | PASS | PASS | PASS | PASS |
| NC58 | comparison | PASS | PASS | PASS | PASS |
| NC59 | comparison | PASS | PASS | PASS | PASS |
| NC60 | comparison | PASS | PASS | PASS | PASS |
| NC61 | comparison | PASS | PASS | PASS | PASS |
| NC62 | comparison | PASS | PASS | PASS | PASS |
| NC63 | comparison | PASS | PASS | PASS | PASS |
| NC64 | comparison | PASS | PASS | PASS | PASS |

**Fixed prior PASS losses** — none
**Fixed repaired cases** — none

**Section prior PASS losses** — none
**Section repaired cases** — none

## Switchyard64

| ID | Workflow | v51 fixed | v52 fixed | v51 section | v52 section |
|---|---|---|---|---|---|
| SW01 | hybrid | PASS | PASS | PASS | PASS |
| SW02 | hybrid | FAIL | PASS | FAIL | PASS |
| SW03 | hybrid | PASS | PASS | PASS | PASS |
| SW04 | hybrid | PASS | PASS | PASS | PASS |
| SW05 | hybrid | PASS | PASS | PASS | PASS |
| SW06 | hybrid | PASS | PASS | PASS | PASS |
| SW07 | hybrid | FAIL | PASS | FAIL | PASS |
| SW08 | hybrid | PASS | PASS | PASS | PASS |
| SW09 | hybrid | PASS | PASS | PASS | PASS |
| SW10 | hybrid | PASS | PASS | PASS | PASS |
| SW11 | hybrid | PASS | PASS | PASS | PASS |
| SW12 | hybrid | PASS | PASS | PASS | PASS |
| SW13 | hybrid | PASS | PASS | PASS | PASS |
| SW14 | hybrid | FAIL | PASS | FAIL | PASS |
| SW15 | hybrid | PASS | PASS | PASS | PASS |
| SW16 | hybrid | PASS | PASS | PASS | PASS |
| SW17 | hybrid | PASS | PASS | PASS | PASS |
| SW18 | hybrid | PARTIAL | PASS | PARTIAL | PASS |
| SW19 | hybrid | PASS | PASS | PASS | PASS |
| SW20 | hybrid | FAIL | PASS | FAIL | PASS |
| SW21 | hybrid | PASS | PASS | PASS | PASS |
| SW22 | hybrid | PASS | PASS | PASS | PASS |
| SW23 | hybrid | FAIL | PASS | FAIL | PASS |
| SW24 | hybrid | PASS | PASS | PASS | PASS |
| SW25 | hybrid | PASS | PASS | PASS | PASS |
| SW26 | hybrid | PASS | PASS | PASS | PASS |
| SW27 | hybrid | FAIL | PASS | FAIL | PASS |
| SW28 | hybrid | FAIL | PASS | FAIL | PASS |
| SW29 | hybrid | PASS | PASS | PASS | PASS |
| SW30 | hybrid | PASS | PASS | PASS | PASS |
| SW31 | hybrid | PARTIAL | PASS | PARTIAL | PASS |
| SW32 | hybrid | PASS | PASS | PASS | PASS |
| SW33 | hybrid | PASS | PASS | PASS | PASS |
| SW34 | hybrid | FAIL | PASS | FAIL | PASS |
| SW35 | hybrid | PASS | PASS | PASS | PASS |
| SW36 | hybrid | PASS | PASS | PASS | PASS |
| SW37 | hybrid | PASS | PASS | PASS | PASS |
| SW38 | hybrid | PASS | PASS | PASS | PASS |
| SW39 | hybrid | PASS | PASS | PASS | PASS |
| SW40 | hybrid | PASS | PASS | PASS | PASS |
| SW41 | hybrid | FAIL | PASS | FAIL | PASS |
| SW42 | hybrid | FAIL | PASS | FAIL | PASS |
| SW43 | hybrid | PASS | PASS | PASS | PASS |
| SW44 | hybrid | PASS | PASS | PASS | PASS |
| SW45 | hybrid | PASS | PASS | PASS | PASS |
| SW46 | hybrid | PARTIAL | PASS | PARTIAL | PASS |
| SW47 | hybrid | PASS | PASS | PASS | PASS |
| SW48 | hybrid | FAIL | PASS | FAIL | PASS |
| SW49 | hybrid | FAIL | PASS | FAIL | PASS |
| SW50 | hybrid | PASS | PASS | PASS | PASS |
| SW51 | hybrid | PASS | PASS | PASS | PASS |
| SW52 | hybrid | PASS | PASS | PASS | PASS |
| SW53 | hybrid | FAIL | PASS | FAIL | PASS |
| SW54 | hybrid | FAIL | PASS | FAIL | PASS |
| SW55 | hybrid | FAIL | PASS | FAIL | PASS |
| SW56 | hybrid | FAIL | PASS | FAIL | PASS |
| SW57 | comparison | PASS | PASS | PASS | PASS |
| SW58 | comparison | PASS | PASS | PASS | PASS |
| SW59 | comparison | PARTIAL | PASS | PARTIAL | PASS |
| SW60 | comparison | FAIL | PASS | FAIL | PASS |
| SW61 | comparison | FAIL | PASS | FAIL | PASS |
| SW62 | comparison | FAIL | FAIL | FAIL | FAIL |
| SW63 | comparison | FAIL | PASS | FAIL | PASS |
| SW64 | comparison | FAIL | PASS | FAIL | PASS |

**Fixed prior PASS losses** — none
**Fixed repaired cases** — SW02, SW07, SW14, SW18, SW20, SW23, SW27, SW28, SW31, SW34, SW41, SW42, SW46, SW48, SW49, SW53, SW54, SW55, SW56, SW59, SW60, SW61, SW63, SW64

### SW62 · fixed · FAIL

Give the month and value of each highest monthly mean temperature in the instrument rooms at Orchid Weir Station and Mica Glass Workshop.

[1] At the Orchid Weir Station instrument room, the highest monthly mean temperature was 26 degrees Celsius in August.

[2] Mica Glass Workshop recorded its highest monthly mean temperature as 28 degrees Celsius in September.

- 01_Orchid_Weir_Station.txt · At the Orchid Weir Station instrument room, the highest monthly mean temperature was 26 degrees Celsius in August.
- 07_Mica_Glass_Workshop.txt · Mica Glass Workshop recorded its highest monthly mean temperature as 28 degrees Celsius in September.

**Section prior PASS losses** — none
**Section repaired cases** — SW02, SW07, SW14, SW18, SW20, SW23, SW27, SW28, SW31, SW34, SW41, SW42, SW46, SW48, SW49, SW53, SW54, SW55, SW56, SW59, SW60, SW61, SW63, SW64

### SW62 · section · FAIL

Give the month and value of each highest monthly mean temperature in the instrument rooms at Orchid Weir Station and Mica Glass Workshop.

[1] At the Orchid Weir Station instrument room, the highest monthly mean temperature was 26 degrees Celsius in August.

[2] Mica Glass Workshop recorded its highest monthly mean temperature as 28 degrees Celsius in September.

- 01_Orchid_Weir_Station.txt · At the Orchid Weir Station instrument room, the highest monthly mean temperature was 26 degrees Celsius in August.
- 07_Mica_Glass_Workshop.txt · Mica Glass Workshop recorded its highest monthly mean temperature as 28 degrees Celsius in September.
