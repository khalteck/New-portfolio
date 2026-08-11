import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ScrollMorphMark } from "@/components/navigation/scroll-morph-mark";
import {
  cancelAnimationFrameMock,
  matchMediaMock,
  requestAnimationFrameMock
} from "./browser-mocks";

const setScrollPosition = (value: number) => {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value
  });
};

afterEach(() => setScrollPosition(0));

describe("scroll morph mark", () => {
  it("moves through illustrations with scroll position and returns to KO at the top", () => {
    const callbacks: FrameRequestCallback[] = [];
    requestAnimationFrameMock.mockImplementation((callback) => {
      callbacks.push(callback);
      return callbacks.length;
    });
    setScrollPosition(0);

    const { container } = render(<ScrollMorphMark active />);
    const mark = container.querySelector<HTMLElement>('[data-ui="scroll-morph-mark"]');
    expect(mark).toHaveAttribute("data-mark", "ko");

    setScrollPosition(240);
    window.dispatchEvent(new Event("scroll"));
    act(() => callbacks.shift()?.(0));
    expect(mark).toHaveAttribute("data-mark", "orbit");

    const frameCountAtRest = requestAnimationFrameMock.mock.calls.length;
    expect(mark).toHaveAttribute("data-progress", "240");
    expect(requestAnimationFrameMock).toHaveBeenCalledTimes(frameCountAtRest);

    setScrollPosition(520);
    window.dispatchEvent(new Event("scroll"));
    act(() => callbacks.shift()?.(0));
    expect(mark).toHaveAttribute("data-mark", "spark");

    setScrollPosition(0);
    window.dispatchEvent(new Event("scroll"));
    act(() => callbacks.shift()?.(0));
    expect(mark).toHaveAttribute("data-mark", "ko");
    expect(mark).toHaveAttribute("data-progress", "0");
  });

  it("keeps KO static when inactive or reduced motion is requested", () => {
    setScrollPosition(900);
    matchMediaMock.mockImplementation(
      (query) =>
        ({
          matches: query.includes("prefers-reduced-motion"),
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn()
        }) as MediaQueryList
    );

    const { container, rerender } = render(<ScrollMorphMark active={false} />);
    const mark = container.querySelector<HTMLElement>('[data-ui="scroll-morph-mark"]');
    expect(mark).toHaveAttribute("data-mark", "ko");

    rerender(<ScrollMorphMark active />);
    expect(mark).toHaveAttribute("data-mark", "ko");
    expect(mark).toHaveAttribute("data-progress", "0");
  });

  it("removes listeners and cancels pending scroll work on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    requestAnimationFrameMock.mockReturnValueOnce(91);
    const { unmount } = render(<ScrollMorphMark active />);

    window.dispatchEvent(new Event("scroll"));
    unmount();

    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(cancelAnimationFrameMock).toHaveBeenCalledWith(91);
  });
});
