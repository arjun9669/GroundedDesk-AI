# GroundedDesk 5.6 r43 — Local workspace snapshots

Build: `2026-10-13-r43`. This is a storage/UI feature regression, not an independent accuracy benchmark.

## Behavior

Open Keep this workspace in the source library. Save on this device explicitly writes one snapshot in this origin’s IndexedDB (`groundeddesk-workspace-v1`). It stores loaded TXT/Markdown text, original PDF bytes, filenames/identifiers and the Ask file selection. Saved filenames, selection count and timestamp are visible. No auto-save or auto-restore occurs. Save again after changing files or selection; another save replaces the previous snapshot.

Restore saved workspace replaces current files only after every saved record validates and every PDF is successfully re-extracted with the existing pinned PDF.js parser and file/page/text limits. It rebuilds the index, clears old answers/research/history and composer text, and turns optional model instances off. Users can enable actual MiniLM again for a fresh embedding index. Explicit empty selections remain empty and never fall back to All files.

Clear saved workspace removes the saved snapshot while keeping current in-memory files. It does not clear model/dependency caches or the separate guide preference. The snapshot does not store questions, answers, drafts, generated outputs, embeddings or enabled AI settings.

## Limits

Storage is local to this browser profile and site origin, shared across its tabs, and is not encrypted by this app. Browser data clearing, private browsing restrictions, storage quota or eviction may remove/prevent snapshots. Avoid saving sensitive files on shared devices. This is one manual snapshot, not a backup or cloud sync service. PDF restore needs the existing PDF.js dependency to be available. Invalid data, blocked storage, failed/aborted writes and failed PDF parsing leave current files intact; restoration is also cancelled if live files/selection change while reading.

## Validation

- 263/263 unit tests passed, including snapshot schema/limits, allowed fields, original PDF bytes and distinct All/empty selections.
- Strict offline toy evaluation passed; it does not measure real MiniLM accuracy.
- Installed Google Chrome 154.0.8037.98: actual IndexedDB save/reload/restore/clear passed on fictional PDF, Markdown and TXT fixtures. Original stored PDF bytes matched the fixture exactly; PDF page-2 quotation and original-page rendering remained correct after re-extraction.
- Actual local `Xenova/all-MiniLM-L6-v2` WASM ran before saving and after restoring/re-enabling. The two Hybrid evidence reports matched exactly. Restore itself started in Keyword/extractive mode with Hybrid disabled until explicitly loaded. Qwen stayed off. No mock embeddings were substituted.
- Unsaved file removal did not change the saved snapshot. Explicit empty selection survived save/restore, and its attempted question produced no answer/history or full-library fallback. Clear preserved live files.
- Explicit malformed PDF/schema, real-transaction abort and blocked-storage simulations passed: failed restore was atomic, old committed snapshot survived aborted writes, corrupted snapshot could be cleared, and session Q&A remained available without storage.
- Desktop/mobile workspace interaction regression passed. At 390px there was no horizontal overflow.
- Initial storage run passed. Visual inspection found a low-contrast new sidebar heading, corrected before release; its screenshot/observations remain preserved. Final storage run added a heading-color assertion and damaged-PDF restore check and passed.

Historical benchmark scores and frozen inputs remain unchanged. No new independent or full frozen-corpus accuracy run was performed for this feature. Raw observations and exact report strings are preserved under docs/evidence/r43; supporting screenshots are in the evidence ZIP.
