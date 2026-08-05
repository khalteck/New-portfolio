import { vi } from "vitest";

export const defaultMatchMedia = (query: string): MediaQueryList =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn()
  }) as MediaQueryList;

export const matchMediaMock = vi.fn(defaultMatchMedia);

let animationFrameId = 0;
export const requestAnimationFrameMock = vi.fn((callback: FrameRequestCallback): number => {
  void callback;
  animationFrameId += 1;
  return animationFrameId;
});
export const cancelAnimationFrameMock = vi.fn((handle: number): void => {
  void handle;
});
