// Visual aid only: exact whitespace-normalized text matching, conservative geometry.
// Never infer a location from retrieval rank, fuzzy text or estimated character widths.
const normalize = text => String(text || "").replace(/\s+/g, " ").trim();

export function quotationRegions(content, quote, viewport) {
  const target = normalize(quote);
  if (!target) return { status: "none", regions: [] };
  const runs = [];
  let text = "";
  for (const item of content.items || []) {
    const value = normalize(item.str);
    if (!value) continue;
    if (text) text += " ";
    runs.push({ start: text.length, end: text.length + value.length, item });
    text += value;
  }
  const start = text.indexOf(target);
  if (start < 0) return { status: "not-found", regions: [] };
  if (text.indexOf(target, start + 1) >= 0) return { status: "ambiguous", regions: [] };
  const end = start + target.length;
  const selected = runs.filter(run => run.end > start && run.start < end);
  // A PDF item can include several sentences. Do not paint the entire item for
  // a smaller quotation, and do not guess proportional glyph positions.
  if (selected.some(run => run.start < start || run.end > end)) return { status: "partial-run", regions: [] };
  const regions = [];
  for (const { item } of selected) {
    const t = item.transform;
    if (!Array.isArray(t) || t.length !== 6 || !t.every(Number.isFinite) ||
        t[0] <= 0 || t[3] <= 0 || Math.abs(t[1]) > .001 || Math.abs(t[2]) > .001 ||
        !Number.isFinite(item.width) || !Number.isFinite(item.height) || item.width <= 0 || item.height <= 0 || item.dir === "ttb") {
      return { status: "geometry", regions: [] };
    }
    const style = content.styles?.[item.fontName];
    // Font ascent/descent give approximate text-run bounds, not exact ink bounds.
    const ascent = Number.isFinite(style?.ascent) ? style.ascent : .8;
    const descent = Number.isFinite(style?.descent) ? style.descent : -.2;
    const [x1, y1] = viewport.convertToViewportPoint(t[4], t[5] + item.height * ascent);
    const [x2, y2] = viewport.convertToViewportPoint(t[4] + item.width, t[5] + item.height * descent);
    const box = { x: Math.min(x1, x2), y: Math.min(y1, y2), width: Math.abs(x2-x1), height: Math.abs(y2-y1) };
    if (!Object.values(box).every(Number.isFinite) || box.width <= 0 || box.height <= 0 ||
        box.x < 0 || box.y < 0 || box.x + box.width > viewport.width || box.y + box.height > viewport.height) {
      return { status: "geometry", regions: [] };
    }
    regions.push(box);
  }
  return { status: "matched", regions };
}

export function highlightMessage(status) {
  if (status === "matched") return "Quotation matched on this page. Yellow regions mark approximate text-run bounds; verify the original text.";
  if (status === "none") return "Original page view. Open a cited page from source evidence to locate its quotation.";
  if (status === "ambiguous") return "Quotation appears more than once on this page. No highlight is shown; review the source quotation manually.";
  return "Quotation could not be highlighted reliably on this page. No highlight is shown; review the source quotation manually. It may span pages, occupy part of a text run or use an unsupported layout.";
}
