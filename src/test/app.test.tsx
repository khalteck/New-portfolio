import type { PropsWithChildren } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { App } from "@/App";

vi.mock("@/components/motion/smooth-scroll-provider", () => ({
  SmoothScrollProvider: ({ children }: PropsWithChildren) => <>{children}</>
}));
vi.mock("@/components/motion/reveal", () => ({
  Reveal: ({ children }: PropsWithChildren) => <>{children}</>
}));
vi.mock("@/components/motion/page-transition", () => ({ PageTransition: () => null }));
vi.mock("@/components/motion/particle-field", () => ({ ParticleField: () => null }));
vi.mock("@/components/cursor/custom-cursor", () => ({ CustomCursor: () => null }));

describe("application shell", () => {
  it("renders a deep-linked static route with shared navigation and route metadata", async () => {
    sessionStorage.setItem("khalid-portfolio-preloader-seen", "true");
    const { container } = render(<App staticLocation="/projects/tci-podcast" />);

    expect(
      await screen.findByRole("heading", { level: 1, name: "TCI Podcast" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute(
      "href",
      "#main-content"
    );
    expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-haspopup", "dialog");
    const siteHeader = container.querySelector<HTMLElement>(".site-navigation");
    expect(siteHeader).not.toBeNull();
    if (siteHeader) {
      expect(within(siteHeader).getByRole("link", { name: "Résumé" })).toHaveAttribute(
        "href",
        "/khalid-oyeneye-resume.pdf"
      );
    }
    expect(screen.getAllByRole("main")).toHaveLength(1);

    await waitFor(() => expect(document.title).toBe("TCI Podcast — Khalid Oyeneye"));
    expect(await axe(container)).toHaveNoViolations();
  });

  it("uses the branded route state for an unknown static location", async () => {
    render(<App staticLocation="/unpublished" />);

    expect(await screen.findByText("404 · Off route")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Return home/ })).toHaveAttribute("href", "/");
  });
});
