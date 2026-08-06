import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { SectionNavigation } from "@/components/navigation/section-navigation";
import { requestAnimationFrameMock } from "./browser-mocks";

const observedSections = [
  ["top", -900],
  ["about", -300],
  ["stack", 200],
  ["experience", 900],
  ["work", 1700],
  ["contact", 2400]
] as const;

describe("section navigation", () => {
  it("links the four grouped portfolio categories from the homepage", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SectionNavigation />
      </MemoryRouter>
    );

    expect(screen.getByRole("navigation", { name: "Portfolio sections" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/#top");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/#about");
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/#work");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/#contact");
    expect(screen.getAllByRole("link")).toHaveLength(4);
    expect(screen.queryByRole("link", { name: "Stack" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Experience" })).not.toBeInTheDocument();
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

  it("groups Stack under About when Stack crosses the viewport activation line", () => {
    vi.spyOn(window, "scrollY", "get").mockReturnValue(900);
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(1000);
    vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(5000);
    vi.spyOn(document.body, "scrollHeight", "get").mockReturnValue(5000);

    render(
      <MemoryRouter>
        {observedSections.map(([id]) => (
          <section id={String(id)} key={String(id)} />
        ))}
        <SectionNavigation />
      </MemoryRouter>
    );

    for (const [id, top] of observedSections) {
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

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "location");
  });

  it("groups Experience under About when Experience crosses the activation line", () => {
    vi.spyOn(window, "scrollY", "get").mockReturnValue(1600);
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(1000);
    vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(5000);
    vi.spyOn(document.body, "scrollHeight", "get").mockReturnValue(5000);

    render(
      <MemoryRouter>
        {observedSections.map(([id]) => (
          <section id={id} key={id} />
        ))}
        <SectionNavigation />
      </MemoryRouter>
    );

    for (const [id, top] of observedSections) {
      vi.spyOn(document.getElementById(id)!, "getBoundingClientRect").mockReturnValue({
        top: top - 700,
        bottom: top,
        left: 0,
        right: 1000,
        width: 1000,
        height: 700,
        x: 0,
        y: top - 700,
        toJSON: () => ({})
      });
    }

    requestAnimationFrameMock.mockImplementationOnce((callback) => {
      callback(0);
      return 1;
    });
    void act(() => window.dispatchEvent(new Event("scroll")));

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "location");
  });
});
