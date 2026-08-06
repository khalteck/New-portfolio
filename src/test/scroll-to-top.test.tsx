import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ScrollToTop } from "@/components/navigation/scroll-to-top";
import { matchMediaMock } from "./browser-mocks";

describe("scroll to top", () => {
  it("stays outside the tab order near the top", () => {
    vi.spyOn(window, "scrollY", "get").mockReturnValue(0);
    render(<ScrollToTop />);

    const button = document.querySelector<HTMLButtonElement>(".scroll-to-top");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-hidden", "true");
    expect(button).toHaveAttribute("tabindex", "-1");
  });

  it("appears after a viewport and smoothly returns the current page to the top", async () => {
    vi.spyOn(window, "scrollY", "get").mockReturnValue(900);
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(700);
    const scrollToSpy = vi.spyOn(window, "scrollTo");
    const user = userEvent.setup();
    render(<ScrollToTop />);

    const button = screen.getByRole("button", { name: "Scroll to top" });
    expect(button).toHaveAttribute("data-visible", "true");
    await user.click(button);
    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });

  it("uses immediate scrolling for reduced motion", async () => {
    vi.spyOn(window, "scrollY", "get").mockReturnValue(900);
    const scrollToSpy = vi.spyOn(window, "scrollTo");
    matchMediaMock.mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));
    const user = userEvent.setup();
    render(<ScrollToTop />);

    await user.click(screen.getByRole("button", { name: "Scroll to top" }));
    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "auto"
    });
  });
});
