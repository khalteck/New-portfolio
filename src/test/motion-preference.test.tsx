import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { matchMediaMock } from "./browser-mocks";

describe("reduced-motion preference", () => {
  it("reflects preference changes and removes its media-query listener on cleanup", () => {
    let matches = false;
    const listeners = new Set<EventListener>();

    matchMediaMock.mockImplementation(
      (query) =>
        ({
          matches,
          media: query,
          onchange: null,
          addEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
            if (typeof listener === "function") listeners.add(listener);
          },
          removeEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
            if (typeof listener === "function") listeners.delete(listener);
          },
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn()
        }) as MediaQueryList
    );

    const { result, unmount } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
    expect(listeners.size).toBe(1);

    matches = true;
    act(() => listeners.forEach((listener) => listener(new Event("change"))));
    expect(result.current).toBe(true);

    unmount();
    expect(listeners.size).toBe(0);
  });
});
