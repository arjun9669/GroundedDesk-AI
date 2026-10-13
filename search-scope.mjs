import { buildIndex } from "./retrieval.mjs?v=20261013-r44";

// Recompute lexical statistics for the selected corpus, and align real cached
// embeddings by stable chunk ID. Selection never changes the full model index.
export function createSearchScope(documents, index, selectedIds = null, vectors = null) {
  const files = selectedIds === null ? documents : documents.filter(doc => selectedIds.has(doc.id));
  const scopedIndex = selectedIds === null ? index : buildIndex(files);
  let scopedVectors = null;
  if (vectors !== null) {
    if (!Array.isArray(vectors) || vectors.length !== index.chunks.length) throw new Error("Semantic index is missing or stale");
    const byId = new Map(index.chunks.map((chunk, i) => [chunk.id, vectors[i]]));
    scopedVectors = scopedIndex.chunks.map(chunk => {
      if (!byId.has(chunk.id)) throw new Error("Selected passage has no embedding");
      return byId.get(chunk.id);
    });
  }
  return { index: scopedIndex, vectors: scopedVectors, kind: selectedIds === null ? "All files" : "Selected files",
    files: files.map(doc => ({ id: doc.id, name: doc.name })) };
}

export function assertSearchScope(result, documents) {
  if (result.searchedFiles === undefined) return; // Historical results predate scopes.
  if (!Array.isArray(result.searchedFiles) || !result.searchedFiles.length) throw new Error("Search scope is empty or invalid");
  const ids = new Set();
  for (const file of result.searchedFiles) {
    if (!file || ids.has(file.id) || !documents.some(doc => doc.id === file.id && doc.name === file.name)) throw new Error("Search scope no longer matches loaded files");
    ids.add(file.id);
  }
  if (result.sources.some(source => !ids.has(source.documentId))) throw new Error("Citation is outside the searched files");
}
