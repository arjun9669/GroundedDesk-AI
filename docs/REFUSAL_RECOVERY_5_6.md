# GroundedDesk 5.6 r42 — Refusal recovery validation

Build: `2026-10-13-r42`. This is a UI/feature regression, not an independent accuracy benchmark.

Unanswered questions now offer Choose files, Rephrase question and Add a file. Actions focus the existing controls without submitting another query, changing selection or downloading a model. Rephrase preserves an unfinished draft; when the composer is empty it restores the original question for editing. Add a file reveals the mobile library without opening a file picker automatically.

Original refusal text, zero source citations and copied evidence reports remain unchanged. Recovery controls are separate from quoted output and are not exported. The existing searched-file list remains visible. Retrieval and generation algorithms are unchanged; Qwen remains off by default.

## Validation

- 259/259 unit tests passed.
- Strict offline toy evaluation passed; not real-model accuracy.
- Installed Google Chrome 154.0.8037.98 desktop/mobile workspace regression passed: focus, draft preservation, no automatic searches, unchanged history/selection/mode/refusal/export, zero source cards and citation buttons, mobile library reveal and no horizontal overflow.
- Actual local `Xenova/all-MiniLM-L6-v2` WASM Hybrid file-scope controls passed alongside Keyword controls, including excluded-fact refusal and selection changes during actual inference. Qwen off. No mock embeddings used in these browser controls.
- First workspace check passed without evidence capture because the output environment variable was incorrect; rerun captured supporting files and also passed.

These fictional feature fixtures do not establish general refusal reliability. No new frozen accuracy benchmark was run. All historical first-look and in-sample scores remain unchanged.

Raw observations and exact reports are in `docs/evidence/r42/`; screenshots are in the supporting evidence ZIP.
