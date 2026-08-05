import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

export async function expectNoSeriousAccessibilityViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  const seriousViolations = results.violations.filter(
    ({ impact }) => impact === "serious" || impact === "critical"
  );

  expect(
    seriousViolations,
    seriousViolations
      .map(
        ({ help, id, nodes }) =>
          `${id}: ${help}\n${nodes.map(({ target }) => `  ${target.join(" ")}`).join("\n")}`
      )
      .join("\n\n")
  ).toEqual([]);
}
