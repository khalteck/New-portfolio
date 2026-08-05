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
      screen.getByRole("heading", { level: 1, name: /Senior Frontend\s*\/\s*Engineer/i })
    ).toBeInTheDocument();
    expect(document.querySelector(".availability-line")).toHaveTextContent(
      /Open to strong remote frontend roles/i
    );
    expect(screen.getByRole("link", { name: /Start a conversation/i })).toHaveAttribute(
      "href",
      expect.stringMatching(/^mailto:/)
    );
    expect(screen.getByRole("link", { name: /View resume/i })).toHaveAttribute(
      "href",
      "/khalid-oyeneye-resume.pdf"
    );

    const main = screen.getByRole("main");
    expect(
      Array.from(main.children).map((element) => element.id || element.tagName.toLowerCase())
    ).toEqual(["section", "philosophy", "about", "stack", "experience", "work"]);
    expect(screen.getByRole("contentinfo")).toHaveAttribute("id", "contact");
  });

  it("provides functional paths only for the two published projects", () => {
    renderHome();

    expect(screen.getByRole("link", { name: "View RelayOps case study" })).toHaveAttribute(
      "href",
      "/projects/relayops"
    );
    expect(screen.getByRole("link", { name: "View TCI Podcast case study" })).toHaveAttribute(
      "href",
      "/projects/tci-podcast"
    );

    for (const number of ["03", "04", "05", "06"]) {
      const slot = screen.getByRole("article", {
        name: `Project ${number} — Incoming, incoming`
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
  });

  it("has no automated accessibility violations in its static content state", async () => {
    const { container } = renderHome();
    expect(await axe(container)).toHaveNoViolations();
  });
});
