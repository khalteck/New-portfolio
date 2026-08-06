import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SectionNavigation } from "@/components/navigation/section-navigation";

describe("section navigation", () => {
  it("links every portfolio section from the homepage", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SectionNavigation />
      </MemoryRouter>
    );

    expect(screen.getByRole("navigation", { name: "Portfolio sections" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/#top");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/#about");
    expect(screen.getByRole("link", { name: "Stack" })).toHaveAttribute("href", "/#stack");
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute(
      "href",
      "/#experience"
    );
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/#work");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/#contact");
  });

  it("remains available on project routes", () => {
    render(
      <MemoryRouter initialEntries={["/projects/relayops"]}>
        <SectionNavigation />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/#work");
  });
});
