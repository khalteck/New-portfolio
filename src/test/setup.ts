import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";
import { afterEach, expect, vi } from "vitest";
import {
  cancelAnimationFrameMock,
  defaultMatchMedia,
  matchMediaMock,
  requestAnimationFrameMock
} from "./browser-mocks";

expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup();
  sessionStorage.clear();
  vi.restoreAllMocks();
  matchMediaMock.mockClear().mockImplementation(defaultMatchMedia);
});

Object.defineProperty(window, "matchMedia", {
  configurable: true,
  writable: true,
  value: matchMediaMock
});

class ResizeObserverMock implements ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

Object.defineProperty(window, "ResizeObserver", {
  configurable: true,
  value: ResizeObserverMock
});
Object.defineProperty(window, "IntersectionObserver", {
  configurable: true,
  value: IntersectionObserverMock
});
Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
  configurable: true,
  value: vi.fn()
});
Object.defineProperty(window, "scrollTo", {
  configurable: true,
  value: vi.fn()
});
Object.defineProperty(window, "requestAnimationFrame", {
  configurable: true,
  writable: true,
  value: requestAnimationFrameMock
});
Object.defineProperty(window, "cancelAnimationFrame", {
  configurable: true,
  writable: true,
  value: cancelAnimationFrameMock
});

Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
  configurable: true,
  value: function showModal(this: HTMLDialogElement) {
    this.setAttribute("open", "");
  }
});
Object.defineProperty(HTMLDialogElement.prototype, "close", {
  configurable: true,
  value: function close(this: HTMLDialogElement) {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  }
});
