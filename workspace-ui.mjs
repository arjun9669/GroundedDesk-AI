// Presentation only. Do not change documents, retrieval, answers or report data.
import { closePDFPreview } from "./pdf-preview.mjs?v=20261013-r43";
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
  document.addEventListener("keydown", event => {
    if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey
        || event.isComposing || event.repeat || event.defaultPrevented
        || document.querySelector("dialog[open]")) return;
    const editing = event.composedPath().some(node => node instanceof Element &&
      (node.matches('input, textarea, select, [role="textbox"], [role="searchbox"], [role="combobox"]')
        || node.isContentEditable));
    if (editing) return;
    event.preventDefault();
    showWorkspace("ask");
    document.querySelector("#query-input").focus();
  });
  initQuickGuide();
}

function initQuickGuide() {
  const key = "groundeddesk-guide-dismissed-v1";
  const invite = document.querySelector("#guide-invitation");
  const dialog = document.querySelector("#quick-guide");
  let step = 0;
  let returnFocus = null;
  const remember = () => { invite.hidden = true; try { localStorage.setItem(key, "1"); } catch { /* The guide still works when storage is unavailable. */ } };
  try { invite.hidden = localStorage.getItem(key) === "1"; } catch { /* Show the invitation without requiring storage. */ }
  const render = () => {
    for (const panel of dialog.querySelectorAll("[data-guide-step]")) panel.hidden = Number(panel.dataset.guideStep) !== step;
    document.querySelector("#guide-progress").textContent = `Step ${step + 1} of 4`;
    document.querySelector("#guide-back").disabled = step === 0;
    document.querySelector("#guide-next").textContent = step === 3 ? "Start exploring" : "Next";
  };
  const open = () => {
    returnFocus = document.activeElement;
    closePDFPreview({ restoreFocus: false });
    step = 0; render(); dialog.showModal();
    document.querySelector("#guide-title").focus();
  };
  const close = destination => {
    returnFocus = destination || returnFocus;
    dialog.close();
    remember();
    const target = returnFocus?.isConnected && returnFocus.getClientRects().length ? returnFocus : document.querySelector("#open-guide");
    target.focus({ preventScroll: true });
  };
  document.querySelector("#open-guide").addEventListener("click", open);
  document.querySelector("#start-guide").addEventListener("click", open);
  document.querySelector("#dismiss-guide").addEventListener("click", () => { remember(); document.querySelector("#open-guide").focus({ preventScroll: true }); });
  document.querySelector("#close-guide").addEventListener("click", () => close());
  document.querySelector("#guide-next").addEventListener("click", () => {
    if (step === 3) { close(document.querySelector("#open-guide")); return; }
    step++; render(); document.querySelector("#guide-title").focus();
  });
  document.querySelector("#guide-back").addEventListener("click", () => { step = Math.max(0, step - 1); render(); document.querySelector("#guide-title").focus(); });
  dialog.addEventListener("cancel", event => { event.preventDefault(); close(); });
  dialog.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const stops = [...dialog.querySelectorAll("button:not(:disabled)")].filter(el => el.getClientRects().length);
    const first = stops[0], last = stops.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement.id === "guide-title")) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  for (const button of dialog.querySelectorAll("[data-guide-action]")) button.addEventListener("click", () => {
    const action = button.dataset.guideAction;
    let target;
    if (action === "files") {
      if (document.querySelector("#library-content").hidden) document.querySelector("#toggle-documents").click();
      target = document.querySelector("#dropzone");
    } else if (action === "settings") {
      document.querySelector("#model-settings").open = true;
      target = document.querySelector("#retrieval-mode");
    } else {
      showWorkspace(action);
      target = document.querySelector(`#tab-${action}`);
    }
    close(target);
    target.scrollIntoView({ block: "center", behavior: "instant" });
  });
}
