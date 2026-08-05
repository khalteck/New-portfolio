import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Preloader } from "@/components/motion/preloader";
import { matchMediaMock } from "./browser-mocks";

const sessionKey = "khalid-portfolio-preloader-seen";

const mockReducedMotion = (matches: boolean) => {
  matchMediaMock.mockImplementation(
    (query) =>
      ({
        matches: query === "(prefers-reduced-motion: reduce)" ? matches : false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn()
      }) as MediaQueryList
  );
};

describe("session preloader", () => {
  afterEach(() => vi.useRealTimers());

  it("runs once, records the session, and is strictly time bounded", () => {
    vi.useFakeTimers();
    render(<Preloader />);

    expect(screen.getByTestId("preloader")).toHaveTextContent("KHALID");
    expect(sessionStorage.getItem(sessionKey)).toBe("true");

    void act(() => vi.advanceTimersByTime(1_449));
    expect(screen.getByTestId("preloader")).toBeInTheDocument();

    void act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByTestId("preloader")).not.toBeInTheDocument();
  });

  it("does not render again for a returning visitor", () => {
    sessionStorage.setItem(sessionKey, "true");
    render(<Preloader />);
    expect(screen.queryByTestId("preloader")).not.toBeInTheDocument();
  });

  it("skips the delay entirely when reduced motion is requested", () => {
    mockReducedMotion(true);
    render(<Preloader />);

    expect(screen.queryByTestId("preloader")).not.toBeInTheDocument();
    expect(sessionStorage.getItem(sessionKey)).toBeNull();
  });

  it("clears its pending timer when unmounted", () => {
    vi.useFakeTimers();
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");
    const { unmount } = render(<Preloader />);
    const timerCount = vi.getTimerCount();
    expect(timerCount).toBeGreaterThan(0);

    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(vi.getTimerCount()).toBeLessThan(timerCount);
  });
});
