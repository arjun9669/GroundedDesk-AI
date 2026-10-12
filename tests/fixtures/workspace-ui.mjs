// Reveal controls through the same tabs/disclosures a user would operate.
export async function revealControl(page, selector) {
  const path = await page.locator(selector).evaluate(el => {
    const details = [];
    for (let parent = el.parentElement; parent; parent = parent.parentElement) {
      if (parent.tagName === "DETAILS" && !parent.open) details.unshift(parent.id);
    }
    return { workspace: el.closest("[data-workspace]")?.dataset.workspace, details };
  });
  if (path.workspace) await page.locator(`#tab-${path.workspace}`).click();
  for (const id of path.details) await page.locator(`#${id} > summary`).click();
}
