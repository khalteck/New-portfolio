import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { SectionNavigation } from "@/components/navigation/section-navigation";
import { requestAnimationFrameMock } from "./browser-mocks";

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

  it("smoothly scrolls Home even when its hash is already current", async () => {
    const user = userEvent.setup();
    const scrollIntoViewSpy = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    render(
      <MemoryRouter initialEntries={["/#top"]}>
        <div id="top" />
        <SectionNavigation />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("link", { name: "Home" }));
    expect(scrollIntoViewSpy).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start"
    });
  });

  it("highlights the section crossing the viewport activation line", () => {
    vi.spyOn(window, "scrollY", "get").mockReturnValue(900);
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(1000);
    vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(5000);
    vi.spyOn(document.body, "scrollHeight", "get").mockReturnValue(5000);

    render(
      <MemoryRouter>
        {[
          ["top", -900],
          ["about", -300],
          ["stack", 200],
          ["experience", 900],
          ["work", 1700],
          ["contact", 2400]
        ].map(([id]) => (
          <section id={String(id)} key={String(id)} />
        ))}
        <SectionNavigation />
      </MemoryRouter>
    );

    for (const [id, top] of [
      ["top", -900],
      ["about", -300],
      ["stack", 200],
      ["experience", 900],
      ["work", 1700],
      ["contact", 2400]
    ] as const) {
      vi.spyOn(document.getElementById(id)!, "getBoundingClientRect").mockReturnValue({
        top,
        bottom: top + 700,
        left: 0,
        right: 1000,
        width: 1000,
        height: 700,
        x: 0,
        y: top,
        toJSON: () => ({})
      });
    }

    requestAnimationFrameMock.mockImplementationOnce((callback) => {
      callback(0);
      return 1;
    });
    void act(() => window.dispatchEvent(new Event("scroll")));

    expect(screen.getByRole("link", { name: "Stack" })).toHaveAttribute("aria-current", "location");
  });
});
