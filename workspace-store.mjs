// One explicit, local snapshot. No questions, answers, vectors or model settings.
export const WORKSPACE_DB = "groundeddesk-workspace-v1";
const STORE = "snapshots", KEY = "current";
const invalid = () => { throw new Error("The saved workspace is invalid or from an unsupported version. Current files were kept."); };

export function validateWorkspaceSnapshot(value) {
  if (!value || value.version !== 1 || !Number.isFinite(value.savedAt) || value.savedAt <= 0
      || !Array.isArray(value.files) || !value.files.length || value.files.length > 15) invalid();
  const ids = new Set();
  const files = value.files.map(file => {
    if (!file || typeof file.id !== "string" || !file.id || file.id.length > 200 || ids.has(file.id)
        || typeof file.name !== "string" || !file.name.trim() || file.name.length > 1024
        || !["txt", "pdf"].includes(file.type) || typeof file.sample !== "boolean") invalid();
    ids.add(file.id);
    if (file.type === "pdf") {
      if (!(file.originalFile instanceof Blob) || !file.originalFile.size || file.originalFile.size > 5 * 1024 * 1024) invalid();
      return { id:file.id, name:file.name, type:"pdf", sample:file.sample, originalFile:file.originalFile };
    }
    if (typeof file.text !== "string" || !file.text.trim() || file.text.length > 180000) invalid();
    return { id:file.id, name:file.name, type:"txt", sample:file.sample, text:file.text };
  });
  if (value.selectedIds !== null && (!Array.isArray(value.selectedIds)
      || value.selectedIds.some(id => typeof id !== "string" || !ids.has(id))
      || new Set(value.selectedIds).size !== value.selectedIds.length)) invalid();
  return { version:1, savedAt:value.savedAt, files, selectedIds:value.selectedIds === null ? null : [...value.selectedIds] };
}

export function createWorkspaceSnapshot(documents, selectedIds = null, savedAt = Date.now()) {
  return validateWorkspaceSnapshot({ version:1, savedAt, files:documents,
    selectedIds:selectedIds === null ? null : [...selectedIds] });
}

async function transact(mode, operation) {
  if (!globalThis.indexedDB) throw new Error("Local workspace storage is unavailable in this browser.");
  const db = await new Promise((resolve, reject) => {
    const request = indexedDB.open(WORKSPACE_DB, 1);
    let settled = false;
    const timer = setTimeout(() => { settled = true; reject(new Error("Local workspace storage did not respond. Try again.")); }, 10000);
    const fail = message => { settled = true; clearTimeout(timer); reject(new Error(message)); };
    request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE); };
    request.onblocked = () => fail("Local workspace storage is busy in another tab. Close it and try again.");
    request.onerror = () => fail("Could not open local workspace storage. Your current files were kept.");
    request.onsuccess = () => { clearTimeout(timer); if (settled) request.result.close(); else { settled = true; resolve(request.result); } };
  });
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      const request = operation(tx.objectStore(STORE));
      tx.oncomplete = () => resolve(request.result);
      tx.onabort = () => reject(new Error("Could not update local workspace storage. Storage may be blocked or full; current files were kept."));
      tx.onerror = () => {}; // Abort reports failure; success requires transaction completion.
    });
  } finally { db.close(); }
}

export async function readSavedWorkspace() {
  const saved = await transact("readonly", store => store.get(KEY));
  return saved === undefined ? null : validateWorkspaceSnapshot(saved);
}
export async function writeSavedWorkspace(snapshot) {
  await transact("readwrite", store => store.put(validateWorkspaceSnapshot(snapshot), KEY));
}
export async function clearSavedWorkspace() { await transact("readwrite", store => store.delete(KEY)); }
