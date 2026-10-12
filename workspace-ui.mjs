// Presentation only. Do not change documents, retrieval, answers or report data.
import { closePDFPreview } from "./pdf-preview.mjs?v=20261012-r34";
export function showWorkspace(name, { result = false } = {}) {
  const tab = document.querySelector(`[data-view="${name}"]`);
  if (!tab) return;
  if (tab.getAttribute("aria-selected") !== "true") closePDFPreview({ restoreFocus: false });
  for (const button of document.querySelectorAll('[role="tab"][data-view]')) {
    const selected = button === tab;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  }
  for (const panel of document.querySelectorAll("[data-workspace]")) panel.hidden = panel.dataset.workspace !== name;
  if (result && name !== "ask") {
    document.querySelector(`#workspace-${name}`).append(document.querySelector("#research-results"));
  }
}

export function initWorkspaceUI() {
  const tabs = [...document.querySelectorAll('[role="tab"][data-view]')];
  const documentsToggle = document.querySelector("#toggle-documents");
  const library = document.querySelector("#library-content");
  const setLibrary = expanded => {
    library.hidden = !expanded;
    documentsToggle.setAttribute("aria-expanded", String(expanded));
    documentsToggle.textContent = expanded ? "Hide files" : "Show files";
  };
  documentsToggle.addEventListener("click", () => setLibrary(library.hidden));
  matchMedia("(max-width: 800px)").addEventListener("change", event => { if (!event.matches) setLibrary(true); });
  for (const tab of tabs) {
    tab.addEventListener("click", () => showWorkspace(tab.dataset.view));
    tab.addEventListener("keydown", event => {
      const index = tabs.indexOf(tab);
      const next = event.key === "ArrowRight" ? (index + 1) % tabs.length :
        event.key === "ArrowLeft" ? (index + tabs.length - 1) % tabs.length :
          event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : -1;
      if (next < 0) return;
      event.preventDefault();
      showWorkspace(tabs[next].dataset.view);
      tabs[next].focus();
    });
  }
  const badge = document.querySelector("#search-mode-badge");
  const mode = document.querySelector("#retrieval-mode");
  const sync = () => { badge.textContent = mode.value === "hybrid" ? "Local AI search" : "Fast search"; };
  mode.addEventListener("change", sync);
  new MutationObserver(sync).observe(document.querySelector("#semantic-status"), { childList: true, subtree: true });
  document.querySelector('a[href="#about"]').addEventListener("click", () => { document.querySelector("#help-details").open = true; });
  sync();
}
