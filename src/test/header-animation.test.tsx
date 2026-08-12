import { useRef } from "react";
import { act, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HeaderAnimation } from "@/components/navigation/header-animation";
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

function bounds(left: number, top: number, width: number, height: number): DOMRect {
  return {
    x: left,
    y: top,
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    toJSON: () => ({})
  };
}

function HeaderFixture({ active = true }: { active?: boolean }) {
  const header = useRef<HTMLElement>(null);
  const resumeTarget = useRef<HTMLSpanElement>(null);

  return (
    <>
      <header ref={header} data-test-bounds="header">
        <HeaderAnimation active={active} headerRef={header} resumeTargetRef={resumeTarget} />
        <span ref={resumeTarget} data-test-bounds="resume">
          R
        </span>
      </header>
      <section id="work" />
    </>
  );
}

const renderFixture = (active = true) =>
  render(
    <MemoryRouter>
      <HeaderFixture active={active} />
    </MemoryRouter>
  );

beforeEach(() => {
  setScrollPosition(0);
  requestAnimationFrameMock.mockReset();
  cancelAnimationFrameMock.mockClear();
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function mockBounds(
    this: Element
  ) {
    const element = this as HTMLElement;
    if (element.dataset.testBounds === "header") return bounds(0, 0, 1440, 60);
    if (element.dataset.testBounds === "resume") return bounds(1380, 24, 7, 12);
    if (element.dataset.ui === "scroll-morph-mark") return bounds(24, 18, 32, 24);
    if (element.id === "work") return bounds(0, 3200 - window.scrollY, 1440, 900);
    return bounds(0, 0, 0, 0);
  });
});

afterEach(() => {
  setScrollPosition(0);
  vi.useRealTimers();
});

describe("header animation", () => {
  it("coalesces scroll rendering and advances the KO and character journey", () => {
    const callbacks: FrameRequestCallback[] = [];
    requestAnimationFrameMock.mockImplementation((callback) => {
      callbacks.push(callback);
      return callbacks.length;
    });
    const { container } = renderFixture();
    const mark = container.querySelector<HTMLElement>('[data-ui="scroll-morph-mark"]');
    const stage = container.querySelector<HTMLElement>('[data-ui="header-animation"]');
    const man = container.querySelector<HTMLElement>('[data-ui="header-man"]');
    const dog = container.querySelector<HTMLElement>('[data-ui="header-dog"]');

    expect(mark).toHaveAttribute("data-mark", "ko");
    expect(stage).toHaveAttribute("data-state", "merged");
    expect(man).toHaveAttribute("data-profile", "side");
    expect(dog).toHaveAttribute("data-animal", "dog");
    expect(man?.querySelector('[data-part="near-forearm"]')).toBeInTheDocument();
    expect(man?.querySelector('[data-part="near-knee"]')).toBeInTheDocument();
    expect(man?.querySelector('[data-part="hair"]')).not.toBeInTheDocument();
    expect(dog?.querySelector('[data-part="near-hind-hock"]')).toBeInTheDocument();
    expect(dog?.querySelector('[data-part="dog-seated-hind"]')).toBeInTheDocument();

    setScrollPosition(240);
    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("scroll"));
    expect(callbacks).toHaveLength(1);
    act(() => callbacks.shift()?.(0));

    expect(mark).toHaveAttribute("data-mark", "orbit");
    expect(stage).toHaveAttribute("data-state", "running");
    expect(stage).toHaveAttribute("data-moving", "true");
    expect(Number(man?.dataset.x)).toBeGreaterThan(60);
    expect(Number(stage?.style.getPropertyValue("--man-near-elbow"))).toBeLessThan(-50);
    expect(Number(stage?.style.getPropertyValue("--dog-near-hind-hock"))).toBeLessThan(0);

    setScrollPosition(520);
    window.dispatchEvent(new Event("scroll"));
    act(() => callbacks.shift()?.(0));
    expect(mark).toHaveAttribute("data-mark", "spark");
  });

  it("settles when scrolling stops and keeps running for reduced-motion media", async () => {
    const callbacks: FrameRequestCallback[] = [];
    requestAnimationFrameMock.mockImplementation((callback) => {
      callbacks.push(callback);
      return callbacks.length;
    });
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
    const { container } = renderFixture();
    const stage = container.querySelector<HTMLElement>('[data-ui="header-animation"]');

    setScrollPosition(800);
    window.dispatchEvent(new Event("scroll"));
    act(() => callbacks.shift()?.(0));
    expect(stage).toHaveAttribute("data-state", "running");
    expect(stage).toHaveAttribute("data-moving", "true");

    await act(() => new Promise((resolve) => window.setTimeout(resolve, 120)));
    expect(stage).toHaveAttribute("data-moving", "false");
    act(() => callbacks.shift()?.(0));
    expect(Number(stage?.style.getPropertyValue("--man-near-knee"))).toBe(14);
    expect(Number(stage?.style.getPropertyValue("--dog-spine-scale"))).toBe(1);
    expect(Number(stage?.style.getPropertyValue("--dog-tail"))).toBe(58);
  });

  it("faces left while seated and keeps the dangle animation below the knee", () => {
    const callbacks: FrameRequestCallback[] = [];
    requestAnimationFrameMock.mockImplementation((callback) => {
      callbacks.push(callback);
      return callbacks.length;
    });
    const { container } = renderFixture();
    const stage = container.querySelector<HTMLElement>('[data-ui="header-animation"]');
    const man = container.querySelector<HTMLElement>('[data-ui="header-man"]');

    setScrollPosition(3400);
    window.dispatchEvent(new Event("scroll"));
    act(() => callbacks.shift()?.(0));

    expect(stage).toHaveAttribute("data-state", "seated");
    expect(stage).toHaveAttribute("data-facing", "left");
    expect(man?.style.transform).toContain("scale(-1.000, 1.000)");
    expect(stage?.style.getPropertyValue("--man-near-hip")).toBe("-88.0000");
    expect(stage?.style.getPropertyValue("--man-near-knee")).toBe("88.0000");
    expect(stage?.style.getPropertyValue("--dog-tail")).toBe("0.0000");
    expect(stage?.style.getPropertyValue("--dog-tail-y")).toBe("9.4000");
    expect(
      man?.querySelector('[data-part="near-thigh"] [data-part="near-dangle"]')
    ).toBeInTheDocument();
  });

  it("keeps project routes static and cleans active listeners and frames", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const callbacks: FrameRequestCallback[] = [];
    requestAnimationFrameMock.mockImplementation((callback) => {
      callbacks.push(callback);
      return 91;
    });
    setScrollPosition(900);
    const { container, rerender, unmount } = renderFixture(false);
    const mark = container.querySelector<HTMLElement>('[data-ui="scroll-morph-mark"]');
    const stage = container.querySelector<HTMLElement>('[data-ui="header-animation"]');
    expect(mark).toHaveAttribute("data-mark", "ko");
    expect(stage).toHaveAttribute("data-state", "merged");

    rerender(
      <MemoryRouter>
        <HeaderFixture active />
      </MemoryRouter>
    );
    window.dispatchEvent(new Event("scroll"));
    unmount();

    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(cancelAnimationFrameMock).toHaveBeenCalledWith(91);
  });
});
