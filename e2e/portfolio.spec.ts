import { expect, test, type Locator, type Page } from "@playwright/test";
import { expectNoSeriousAccessibilityViolations } from "./support/accessibility";

const preloaderSessionKeys = ["khalid-portfolio-preloader-seen", "portfolio-preloader-seen"];

async function bypassReturningVisitorPreloader(page: Page) {
  await page.addInitScript((keys) => {
    for (const key of keys) sessionStorage.setItem(key, "true");
  }, preloaderSessionKeys);
}

async function expectInsideViewport(locator: Locator) {
  const box = await locator.boundingBox();
  const viewport = locator.page().viewportSize();

  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();

  if (box && viewport) {
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
  }
}

test.describe("portfolio routes", () => {
  test.beforeEach(async ({ page }) => {
    await bypassReturningVisitorPreloader(page);
  });

  test("@smoke presents the complete homepage narrative in order", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: /fullstack saas\s*\/\s*engineer/i })
    ).toBeVisible();
    await expect(page.locator(".availability-line")).toContainText(/open to opportunities/i);
    await expect(page.locator(".hero-metrics")).toContainText(/6\+\s*years of experience/i);
    await expect(page.locator(".hero-metrics")).toContainText(/3\s*international remote teams/i);

    const sectionOrder = await page
      .locator("#main-content > section, #contact")
      .evaluateAll((elements) => elements.map((element) => element.id || "hero"));
    expect(sectionOrder).toEqual(["top", "about", "stack", "experience", "work", "contact"]);

    await expect(page.locator("#contact")).toContainText(/discuss the work/i);
  });

  test("incoming project slots are explicitly labelled and never become links", async ({
    page
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.locator("#work").scrollIntoViewIfNeeded();

    for (const projectNumber of ["03", "04", "05", "06"]) {
      const slot = page
        .locator(".project-row--incoming")
        .filter({ hasText: `Project ${projectNumber} | In progress` });
      await slot.scrollIntoViewIfNeeded();
      await expect(slot).toBeVisible();
      await expect(slot).toHaveAttribute(
        "aria-label",
        `Project ${projectNumber} | In progress, incoming`
      );
      await expect(slot).toContainText(`Project ${projectNumber} | In progress`);
      await expect(slot.getByRole("link")).toHaveCount(0);
      await expect(slot.getByRole("button")).toHaveCount(0);
    }
  });

  test("@smoke supports keyboard navigation into the featured case study", async ({ page }) => {
    await page.goto("/");
    await page.locator("#work").scrollIntoViewIfNeeded();

    const relayOpsLink = page.locator('a[aria-label="View RelayOps case study"]');
    await relayOpsLink.scrollIntoViewIfNeeded();
    await expect(relayOpsLink).toBeVisible();
    await relayOpsLink.focus();
    await expect(relayOpsLink).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/\/projects\/relayops$/);
    const caseStudyHeading = page.getByRole("heading", { level: 1, name: /relayops/i });
    await expect(caseStudyHeading).toBeVisible();
    await expect(caseStudyHeading).toBeFocused();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
  });

  test("fixed navigation scrolls to sections without the route transition", async ({ page }) => {
    await page.goto("/projects/relayops");
    await page
      .getByRole("navigation", { name: "Portfolio sections" })
      .getByRole("link", {
        name: "About"
      })
      .click();

    await expect(page).toHaveURL(/\/#about$/);
    await expect(page.locator("#about-title")).toBeFocused();
    await expect(page.locator(".page-transition")).toHaveCSS("visibility", "hidden");

    await page
      .getByRole("navigation", { name: "Portfolio sections" })
      .getByRole("link", {
        name: "Home"
      })
      .click();
    await expect(page).toHaveURL(/\/#top$/);
    await expect(page.locator("#hero-title")).toBeFocused();
    await expect(page.locator(".page-transition")).toHaveCSS("visibility", "hidden");
  });

  test("@smoke renders both published case studies from direct links", async ({ page }) => {
    await page.goto("/projects/relayops");

    await expect(page.getByRole("heading", { level: 1, name: /relayops/i })).toBeVisible();
    await expect(page.getByText(/one workflow for incident ownership/i)).toBeVisible();
    await expect(
      page.getByRole("link", { name: /live (?:application|product|project|site)/i })
    ).toHaveAttribute("href", "https://relayops-frontend.onrender.com/");
    await expect(page.getByRole("link", { name: "Source code" })).toHaveAttribute(
      "href",
      "https://github.com/khalteck/RelayOps"
    );

    await page.goto("/projects/tci-podcast");
    await expect(
      page.getByRole("heading", { level: 1, name: /tci(?:pod| podcast)/i })
    ).toBeVisible();
    await expect(page.getByText(/redux toolkit/i).first()).toBeVisible();
    await expect(page.getByText(/firebase/i).first()).toBeVisible();
    await expect(
      page.getByRole("main").locator('a[href="https://github.com/khalteck/RelayOps"]')
    ).toHaveCount(0);
    await expect(
      page.getByRole("main").locator('a[href="https://relayops-frontend.onrender.com/"]')
    ).toHaveCount(0);
    await expect(page.locator(".case-hero__actions")).toHaveCount(0);
  });

  test("browser history and the branded 404 remain useful", async ({ page }) => {
    await page.goto("/");
    const relayOpsLink = page.locator('a[href="/projects/relayops"]').first();
    await relayOpsLink.scrollIntoViewIfNeeded();
    await relayOpsLink.click();
    await expect(page).toHaveURL(/\/projects\/relayops$/);

    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1, name: /fullstack saas/i })).toBeVisible();

    await page.goForward();
    await expect(page).toHaveURL(/\/projects\/relayops$/);

    await page.goto("/projects/not-a-real-project");
    await expect(page.getByText("404 · Page not found")).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: "This page is not available." })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/");

    await page.goto("/not-a-real-page");
    await expect(page.getByText("404 · Page not found")).toBeVisible();
  });

  test("the homepage and case study have no serious axe violations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });

    await page.goto("/");
    await expectNoSeriousAccessibilityViolations(page);

    await page.goto("/projects/relayops");
    await expectNoSeriousAccessibilityViolations(page);
  });
});

test.describe("responsive and motion preferences", () => {
  test.beforeEach(async ({ page }) => {
    await bypassReturningVisitorPreloader(page);
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("@smoke keeps the portfolio usable at a 320px layout width", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/");

    await expectInsideViewport(page.getByRole("heading", { level: 1 }));
    await expectInsideViewport(page.getByRole("navigation", { name: "Portfolio sections" }));

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);

    const featuredProject = page.locator('a[aria-label="View RelayOps case study"]');
    await featuredProject.scrollIntoViewIfNeeded();
    const featuredImage = featuredProject.locator('img[alt*="RelayOps"]');
    await expect(featuredImage).toBeVisible();
  });

  test("contact and resume actions stay plain, verified links on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const email = page.locator('a[href^="mailto:"]').first();
    await expect(email).toHaveAttribute("href", /^mailto:/);
    await expect(page.getByRole("link", { name: /résumé|resume/i }).first()).toHaveAttribute(
      "href",
      /khalid-oyeneye-resume\.pdf$/
    );
  });

  test("remains free of horizontal overflow at a 200%-zoom equivalent width", async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 720 });
    await page.goto("/");

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  });

  test("reduced motion exposes content immediately and avoids smooth scrolling", async ({
    page
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByTestId("preloader")).toHaveCount(0);
    await expect(page.locator(".custom-cursor")).toHaveCount(0);
    await expect(page.locator(".particle-field")).toHaveCount(1);
    await expect(page.locator("html")).not.toHaveClass(/has-custom-cursor/);
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior))
      .not.toBe("smooth");
    await expect
      .poll(() => page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches))
      .toBe(true);
  });
});

test.describe("touch project presentation", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test("keeps a swipe-safe inline preview and tap navigation", async ({ page }) => {
    await bypassReturningVisitorPreloader(page);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const projectLink = page.locator('a[aria-label="View RelayOps case study"]');
    await projectLink.scrollIntoViewIfNeeded();
    await expect(projectLink.getByRole("img", { name: /relayops/i })).toBeVisible();
    await projectLink.tap();
    await expect(page).toHaveURL(/\/projects\/relayops$/);
  });
});
