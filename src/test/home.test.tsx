import type { PropsWithChildren } from "react";
import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { HomeView } from "@/modules/home/views/home.view";

vi.mock("@/components/motion/reveal", () => ({
  Reveal: ({ children }: PropsWithChildren) => <>{children}</>
}));

const renderHome = () =>
  render(
    <MemoryRouter>
      <HomeView />
    </MemoryRouter>
  );

describe("homepage", () => {
  it("renders the required editorial sequence and primary positioning", () => {
    renderHome();

    expect(
      screen.getByRole("heading", { level: 1, name: "Software Engineer" })
    ).toBeInTheDocument();
    expect(document.querySelector('[data-ui="availability"]')).not.toBeInTheDocument();
    const conversationLink = screen.getByRole("link", { name: /Start a conversation/i });
    expect(conversationLink).toHaveAttribute("href", expect.stringMatching(/^mailto:/));
    expect(conversationLink).toHaveAttribute("data-variant", "secondary");
    expect(screen.getByRole("link", { name: /View resume/i })).toHaveAttribute(
      "href",
      "/khalid-oyeneye-resume.pdf"
    );
    expect(screen.queryByRole("button", { name: /currently listening/i })).not.toBeInTheDocument();

    const main = screen.getByRole("main");
    expect(
      Array.from(main.children).map((element) => element.id || element.tagName.toLowerCase())
    ).toEqual(["top", "about", "stack", "experience", "work"]);
    expect(screen.getByRole("heading", { name: "Experience across borders." })).toBeInTheDocument();
    expect(document.querySelector('[data-ui="experience-timeline"]')).toHaveAttribute(
      "aria-hidden",
      "true"
    );
    expect(document.querySelectorAll('[data-ui="experience-node"]')).toHaveLength(4);
    expect(screen.getByRole("contentinfo")).toHaveAttribute("id", "contact");

    const stack = screen.getByRole("region", { name: "Production tools and practices." });
    expect(
      within(stack)
        .getAllByRole("listitem")
        .every((item) => item.querySelector("svg"))
    ).toBe(true);
  });

  it("provides functional paths only for the four published projects", () => {
    renderHome();

    expect(screen.getByRole("link", { name: "View RelayOps case study" })).toHaveAttribute(
      "href",
      "/projects/relayops"
    );
    expect(screen.getByRole("link", { name: "View TCI Podcast case study" })).toHaveAttribute(
      "href",
      "/projects/tci-podcast"
    );
    expect(screen.getByRole("link", { name: "View Afro-Grids case study" })).toHaveAttribute(
      "href",
      "/projects/afrogrids"
    );
    expect(
      screen.getByRole("link", { name: "View GreenCity Financial Limited case study" })
    ).toHaveAttribute("href", "/projects/greencity-financial");

    for (const number of ["05", "06"]) {
      const slot = screen.getByRole("article", {
        name: `Project ${number} | In progress, incoming`
      });
      expect(within(slot).queryByRole("link")).not.toBeInTheDocument();
      expect(within(slot).queryByRole("button")).not.toBeInTheDocument();
      expect(slot).toHaveTextContent(`Incoming / ${number}`);
    }
  });

  it("keeps project images accessible without relying on hover previews", () => {
    renderHome();

    expect(
      screen.getByRole("img", {
        name: /RelayOps product preview reading Incident coordination/i
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /The Chronicles of an Immigrant podcast website/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Afro-Grids landing page/i })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /GreenCity Financial landing page/i })
    ).toBeInTheDocument();
  });

  it("has no automated accessibility violations in its static content state", async () => {
    const { container } = renderHome();
    expect(await axe(container)).toHaveNoViolations();
  });
});
