import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { ParticleField } from "@/components/motion/particle-field";
import { ScrollProgressIndicator } from "@/components/motion/scroll-progress-indicator";
import { cancelAnimationFrameMock, matchMediaMock } from "./browser-mocks";

const mockMedia = ({ finePointer = false, reducedMotion = false } = {}) => {
  matchMediaMock.mockImplementation(
    (query) =>
      ({
        matches:
          (query.includes("prefers-reduced-motion") && reducedMotion) ||
          (query.includes("pointer: fine") && finePointer),
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

describe("ambient motion cleanup", () => {
  it("keeps static particles but omits the custom cursor for reduced-motion users", () => {
    mockMedia({ finePointer: true, reducedMotion: true });
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    const { container } = render(
      <>
        <CustomCursor />
        <ParticleField />
      </>
    );

    expect(container.querySelector('[data-ui="custom-cursor"]')).not.toBeInTheDocument();
    expect(container.querySelector('[data-ui="particle-field"]')).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass("has-custom-cursor");
  });

  it("removes cursor listeners, the cursor class, and its frame on unmount", () => {
    mockMedia({ finePointer: true });
    const windowRemoveSpy = vi.spyOn(window, "removeEventListener");
    const documentRemoveSpy = vi.spyOn(document, "removeEventListener");
    const rootRemoveSpy = vi.spyOn(document.documentElement, "removeEventListener");
    const { container, unmount } = render(<CustomCursor />);

    expect(container.querySelector('[data-ui="custom-cursor"]')).toBeInTheDocument();
    expect(document.documentElement).toHaveClass("has-custom-cursor");
    window.dispatchEvent(new MouseEvent("pointermove", { clientX: 100, clientY: 120 }));
    unmount();

    expect(document.documentElement).not.toHaveClass("has-custom-cursor");
    expect(cancelAnimationFrameMock).toHaveBeenCalled();
    expect(windowRemoveSpy).toHaveBeenCalledWith("pointermove", expect.any(Function));
    expect(documentRemoveSpy).toHaveBeenCalledWith("pointerover", expect.any(Function));
    expect(rootRemoveSpy).toHaveBeenCalledWith("mouseleave", expect.any(Function));
  });

  it("removes scroll and resize listeners and cancels queued progress work", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<ScrollProgressIndicator />);

    window.dispatchEvent(new Event("scroll"));
    unmount();

    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(cancelAnimationFrameMock).toHaveBeenCalled();
  });
});
