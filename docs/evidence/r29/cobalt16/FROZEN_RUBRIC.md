# Frozen Cobalt16 scoring rules

This is a small self-authored first-look test, separate from Atlas, Meridian, Lantern and Aster. It is not external validation or a representative accuracy estimate. No answers have been observed at freezing.

Run 12 Hybrid Q&A cases and four separate lexical Comparison cases exactly once. Use actual local MiniLM; keep Qwen off. Upload only the three source TXT files. Capture all outputs before grading. Do not change inputs or thresholds after observing answers.

PASS: all required facts appear in the displayed answer (Hybrid) or displayed Comparison excerpts, every cited document is relevant and expected, all expected documents are represented, and every displayed source excerpt is present in its original document after whitespace normalization. No expanded retrieval context can fill an omitted displayed answer fact.
PARTIAL: a supported answer contains at least one required fact but omits required facts or has an irrelevant citation, while making no unsupported factual claim. A complete answer with poor citation selection is also PARTIAL.
FAIL: false refusal of a supported question, an unsupported factual claim, untraceable quotation, or false acceptance of an unsupported question. Unsupported cases PASS only with an explicit refusal and zero citations. A browser/model blocker is BLOCKED, never PASS.

Report answer completeness, relevance, provenance and refusals separately. Preserve every initial result. Required fact phrases identify concepts; equivalent wording is acceptable. Numbers, durations, named roles and exceptions must match the key. Document hashes include UTF-8 bytes.
