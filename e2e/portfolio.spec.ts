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

    await expect(page.getByRole("heading", { level: 1, name: /software engineer/i })).toBeVisible();
    await expect(page.locator('[data-ui="availability"]')).toHaveCount(0);
    await expect(page.getByRole("button", { name: /currently listening/i })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /start a conversation/i })).toHaveAttribute(
      "data-variant",
      "secondary"
    );

    const sectionOrder = await page
      .locator("#main-content > section, #contact")
      .evaluateAll((elements) => elements.map((element) => element.id || "hero"));
    expect(sectionOrder).toEqual(["top", "about", "stack", "experience", "work", "contact"]);

    await expect(page.locator("#contact")).toContainText(/discuss the work/i);
  });

  test("production omits development-only incoming project slots", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.locator("#work").scrollIntoViewIfNeeded();

    await expect(page.locator('[data-ui="incoming-project"]')).toHaveCount(0);
    await expect(page.locator("#work")).not.toContainText(/Project 06/i);
    await expect(
      page.getByRole("link", { name: "View Marriage & Family Bible Institute case study" })
    ).toBeVisible();
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
    await expect(page.locator('[data-ui="page-transition"]')).toHaveCSS("visibility", "hidden");

    await page
      .getByRole("navigation", { name: "Portfolio sections" })
      .getByRole("link", {
        name: "Home"
      })
      .click();
    await expect(page).toHaveURL(/\/#top$/);
    await expect(page.locator("#hero-title")).toBeFocused();
    await expect(page.locator('[data-ui="page-transition"]')).toHaveCSS("visibility", "hidden");

    await page.locator("#stack").scrollIntoViewIfNeeded();
    await expect(
      page
        .getByRole("navigation", { name: "Portfolio sections" })
        .getByRole("link", { name: "About" })
    ).toHaveAttribute("aria-current", "location");
  });

  test("the header characters run, rest at Résumé, and reverse into KO", async ({ page }) => {
    await page.goto("/");
    const mark = page.locator('[data-ui="scroll-morph-mark"]');
    const stage = page.locator('[data-ui="header-animation"]');
    const man = page.locator('[data-ui="header-man"]');
    const dog = page.locator('[data-ui="header-dog"]');
    await expect(mark).toHaveAttribute("data-mark", "ko");
    await expect(stage).toHaveAttribute("data-state", "merged");

    await page.evaluate(() => window.scrollTo(0, 90));
    await expect(stage).toHaveAttribute("data-state", "launching");

    await page.evaluate(() => window.scrollTo(0, 520));
    await expect(mark).toHaveAttribute("data-mark", "spark");
    await expect(stage).toHaveAttribute("data-state", "running");
    const [runningManX, runningDogX] = await Promise.all([
      man.getAttribute("data-x"),
      dog.getAttribute("data-x")
    ]);
    expect(Number(runningManX) - Number(runningDogX)).toBeGreaterThan(32);
    const restingState = await stage.evaluate((element) => ({
      state: element.getAttribute("data-state"),
      progress: element.getAttribute("data-scroll"),
      manX: element.querySelector('[data-ui="header-man"]')?.getAttribute("data-x")
    }));

    await page.waitForTimeout(220);
    await expect(stage).toHaveAttribute("data-moving", "false");
    await expect
      .poll(() =>
        stage.evaluate((element) => ({
          state: element.getAttribute("data-state"),
          progress: element.getAttribute("data-scroll"),
          manX: element.querySelector('[data-ui="header-man"]')?.getAttribute("data-x")
        }))
      )
      .toEqual(restingState);

    const workStart = await page.evaluate(() => {
      const work = document.getElementById("work");
      if (!work) throw new Error("Work section is missing");
      return window.scrollY + work.getBoundingClientRect().top - window.innerHeight * 0.3;
    });
    const climbDistance = Math.min(
      144,
      Math.max(96, (await page.evaluate(() => innerHeight)) * 0.14)
    );
    await page.evaluate(
      ([target, climb]) => window.scrollTo(0, target + climb + 2),
      [workStart, climbDistance]
    );
    await expect(stage).toHaveAttribute("data-state", "seated");
    await expect(stage).toHaveAttribute("data-facing", "left");
    await page.waitForTimeout(180);

    const [manBox, dogBox, resumeBox] = await Promise.all([
      man.boundingBox(),
      dog.boundingBox(),
      page.locator('[data-ui="resume-initial"]').boundingBox()
    ]);
    expect(manBox).not.toBeNull();
    expect(dogBox).not.toBeNull();
    expect(resumeBox).not.toBeNull();
    if (manBox && dogBox && resumeBox) {
      expect(Math.abs(manBox.x - resumeBox.x)).toBeLessThan(24);
      expect(dogBox.x + dogBox.width).toBeLessThan(resumeBox.x + 2);
    }

    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(stage).toHaveAttribute("data-state", "seated");

    await page.evaluate((target) => window.scrollTo(0, target - 240), workStart);
    await expect(stage).toHaveAttribute("data-state", "running");
    await expect(stage).toHaveAttribute("data-direction", "reverse");
    const [reverseManX, reverseDogX] = await Promise.all([
      man.getAttribute("data-x"),
      dog.getAttribute("data-x")
    ]);
    expect(Number(reverseDogX)).toBeLessThan(Number(reverseManX));

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(mark).toHaveAttribute("data-mark", "ko");
    await expect(mark).toHaveAttribute("data-progress", "0");
    await expect(stage).toHaveAttribute("data-state", "merged");
  });

  test("@smoke renders all published case studies from direct links", async ({ page }) => {
    test.setTimeout(60_000);
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
    await expect(page.locator('[data-ui="case-actions"]')).toHaveCount(0);

    await page.goto("/projects/afrogrids");
    await expect(page.getByRole("heading", { level: 1, name: "Afro-Grids" })).toBeVisible();
    await expect(page.getByRole("link", { name: /live product/i })).toHaveAttribute(
      "href",
      "https://afrogrids.com"
    );

    await page.goto("/projects/greencity-financial");
    await expect(
      page.getByRole("heading", { level: 1, name: "GreenCity Financial Limited" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /live product/i })).toHaveAttribute(
      "href",
      "https://greencityfin.com"
    );
    await expect(page.getByRole("link", { name: /source code/i })).toHaveCount(0);

    await page.goto("/projects/mfbi");
    await expect(
      page.getByRole("heading", { level: 1, name: "Marriage & Family Bible Institute" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /live product/i })).toHaveAttribute(
      "href",
      "https://mfbinstitute.org/"
    );
    await expect(page.getByRole("heading", { name: "Engineering challenges" })).toBeVisible();
    await expect(
      page.locator('[aria-label="Marriage & Family Bible Institute gallery"]')
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /source code/i })).toHaveCount(0);
  });

  test("browser history and the branded 404 remain useful", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/");
    const relayOpsLink = page.locator('a[href="/projects/relayops"]').first();
    await relayOpsLink.scrollIntoViewIfNeeded();
    await relayOpsLink.click();
    await expect(page).toHaveURL(/\/projects\/relayops$/);

    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1, name: /software engineer/i })).toBeVisible();

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
    test.setTimeout(60_000);
    await page.emulateMedia({ reducedMotion: "reduce" });

    await page.goto("/");
    await expectNoSeriousAccessibilityViolations(page);

    await page.goto("/projects/relayops");
    await expectNoSeriousAccessibilityViolations(page);

    await page.goto("/projects/mfbi");
    await expectNoSeriousAccessibilityViolations(page);
  });

  test("scroll-to-top appears away from the top and returns the current route", async ({
    page
  }) => {
    await page.goto("/projects/greencity-financial");
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));

    const scrollToTop = page.getByRole("button", { name: "Scroll to top" });
    await expect(scrollToTop).toBeVisible();
    await scrollToTop.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
    await expect(page).toHaveURL(/\/projects\/greencity-financial$/);
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

    await page.evaluate(() => window.scrollTo(0, 240));
    const mobileHeaderAnimation = page.locator('[data-ui="header-animation"]');
    await expect(mobileHeaderAnimation).toHaveAttribute("data-state", "running");
    const [mobileManBox, mobileHeaderBox] = await Promise.all([
      page.locator('[data-ui="header-man"]').boundingBox(),
      page.locator('[data-ui="site-navigation"]').boundingBox()
    ]);
    expect(mobileManBox).not.toBeNull();
    expect(mobileHeaderBox).not.toBeNull();
    if (mobileManBox && mobileHeaderBox) {
      expect(mobileManBox.y).toBeGreaterThanOrEqual(mobileHeaderBox.y);
      expect(mobileManBox.y + mobileManBox.height).toBeLessThanOrEqual(
        mobileHeaderBox.y + mobileHeaderBox.height + 1
      );
    }

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

  test("mobile dock tracks the visible section and clears the scroll-to-top control", async ({
    page
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.locator("#experience").scrollIntoViewIfNeeded();

    const dock = page.getByRole("navigation", { name: "Portfolio sections" });
    await expect(dock.getByRole("link")).toHaveCount(4);
    await expect(dock.getByRole("link", { name: "About" })).toHaveAttribute(
      "aria-current",
      "location"
    );
    const scrollToTop = page.getByRole("button", { name: "Scroll to top" });
    await expect(scrollToTop).toBeVisible();

    const [dockBox, buttonBox] = await Promise.all([dock.boundingBox(), scrollToTop.boundingBox()]);
    expect(dockBox).not.toBeNull();
    expect(buttonBox).not.toBeNull();
    if (dockBox && buttonBox) expect(buttonBox.y + buttonBox.height).toBeLessThan(dockBox.y);
  });

  test("experience timeline fills as its entries move through the viewport", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");

    const progress = page.locator('[data-ui="experience-timeline-progress"]');
    const scaleY = () =>
      progress.evaluate(
        (element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m22
      );

    await expect.poll(scaleY).toBeLessThan(0.05);
    await page.locator("#work").scrollIntoViewIfNeeded();
    await expect.poll(scaleY).toBeGreaterThan(0.95);
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
    await expect(page.locator('[data-ui="custom-cursor"]')).toHaveCount(0);
    await expect(page.locator('[data-ui="particle-field"]')).toHaveCount(1);
    await expect(page.locator("html")).not.toHaveClass(/has-custom-cursor/);
    await expect
      .poll(() =>
        page
          .locator('[data-ui="experience-timeline-progress"]')
          .evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m22)
      )
      .toBe(1);
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior))
      .not.toBe("smooth");
    await expect
      .poll(() => page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches))
      .toBe(true);

    await page.evaluate(() => window.scrollTo(0, 240));
    await expect(page.locator('[data-ui="header-animation"]')).toHaveAttribute(
      "data-state",
      "running"
    );
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
