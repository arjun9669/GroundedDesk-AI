# Fresh64 pre-question environment amendment — 24 October 2026

This dated amendment supersedes only the reference Chrome version stated in
EXECUTION_PLAN.md. It preserves that file, the original input protocol and the
509-file execution freeze byte-for-byte.

The successful redirect-aware neutral preflight actually reports Chrome
**155.0.8059.86**. The earlier diagnostic/reference was **155.0.8059.85**. An installed
Chrome patch update occurred between these observations. No fresh document or
question had been submitted in either environment. No model/candidate result is
being relabelled. The frozen run-config already records the correct **.86** version
and the SHA256 of its engine/executable; the runner rejects a subsequent change.

Actual capture environment: Chrome 155.0.8059.86, Node 24.22.1, macOS arm64,
Playwright 1.62.1, Transformers.js 3.0.0, MiniLM q8 WASM, Qwen off, live r44.
Node 24.22.1 and Playwright 1.62.1 were also declared before questions in the
execution plan. All six downloaded asset hashes were observed in the successful
.86 preflight. The original candidate, sources, questions, literal gold rubric,
thresholds and strict 64/64-per-variant acceptance target are unchanged.

This amendment and the original execution-freeze SHA are sealed together in
pre-question-amendment-freeze.json and published before the first capture.
This Mac run does not qualify Windows/Safari, PDF/Qwen or general product accuracy.
