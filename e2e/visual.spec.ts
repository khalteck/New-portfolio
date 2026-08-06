import { expect, test, type Page } from "@playwright/test";

async function prepareStableVisual(page: Page) {
  await page.addInitScript(() => {
    sessionStorage.setItem("khalid-portfolio-preloader-seen", "true");
  });
}

async function settlePage(page: Page) {
  await page.addStyleTag({
    content: `
      [data-ui="particle-field"],
      [data-ui="custom-cursor"] { display: none !important; }
      [data-ui="reveal"] { opacity: 1 !important; visibility: visible !important; transform: none !important; }
    `
  });
  await expect(page.getByRole("main")).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForTimeout(100);
}

test.describe("visual regression", () => {
  test.beforeEach(async ({ browserName, page }) => {
    test.skip(
      browserName !== "chromium",
      "One rendering engine owns the canonical visual baselines."
    );
    await prepareStableVisual(page);
  });

  test("homepage desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    await settlePage(page);

    await expect(page).toHaveScreenshot("homepage-desktop.png", {
      fullPage: true
    });
  });

  test("RelayOps desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/projects/relayops");
    await settlePage(page);

    await expect(page).toHaveScreenshot("relayops-desktop.png", {
      fullPage: true
    });
  });

  test("homepage mobile with reduced motion", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await settlePage(page);

    await expect(page).toHaveScreenshot("homepage-mobile-reduced.png", {
      fullPage: true
    });
  });

  test("RelayOps mobile with reduced motion", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/projects/relayops");
    await settlePage(page);

    await expect(page).toHaveScreenshot("relayops-mobile-reduced.png", {
      fullPage: true
    });
  });
});
