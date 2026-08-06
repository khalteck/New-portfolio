import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HashScroller } from "../components/layout/hash-scroller";
import { matchMediaMock, requestAnimationFrameMock } from "./browser-mocks";

describe("HashScroller", () => {
  beforeEach(() => {
    requestAnimationFrameMock.mockImplementationOnce((callback) => {
      callback(0);
      return 1;
    });
  });

  test("smoothly scrolls to the Home target and focuses its heading", () => {
    const scrollIntoViewSpy = vi.spyOn(HTMLElement.prototype, "scrollIntoView");

    render(
      <MemoryRouter initialEntries={["/#top"]}>
        <HashScroller />
        <section id="top">
          <h1 tabIndex={-1}>Home</h1>
        </section>
      </MemoryRouter>
    );

    const heading = document.querySelector("h1");
    expect(scrollIntoViewSpy).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start"
    });
    expect(heading).toHaveFocus();
  });

  test("uses immediate scrolling when reduced motion is requested", () => {
    const scrollIntoViewSpy = vi.spyOn(HTMLElement.prototype, "scrollIntoView");
    matchMediaMock.mockReturnValueOnce({
      ...window.matchMedia("(prefers-reduced-motion: reduce)"),
      matches: true
    });

    render(
      <MemoryRouter initialEntries={["/#about"]}>
        <HashScroller />
        <section id="about">
          <h2 tabIndex={-1}>About</h2>
        </section>
      </MemoryRouter>
    );

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({
      behavior: "auto",
      block: "start"
    });
  });
});
