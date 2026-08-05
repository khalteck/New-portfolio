import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { SiteNavigation } from "@/components/navigation/site-navigation";

const renderNavigation = () =>
  render(
    <MemoryRouter>
      <SiteNavigation />
    </MemoryRouter>
  );

describe("navigation drawer", () => {
  it("opens as a labelled modal and closes through its close button", async () => {
    const user = userEvent.setup();
    renderNavigation();

    const trigger = screen.getByRole("button", { name: "Menu" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-controls", "site-menu");
    expect(document.getElementById("site-menu")).toBeInstanceOf(HTMLDialogElement);

    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Navigate" });
    expect(dialog).toHaveAttribute("open");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(document.documentElement).toHaveClass("drawer-open");

    const restoreFocus = vi.spyOn(trigger, "focus");
    await user.click(screen.getByRole("button", { name: "Close menu" }));
    expect(dialog).not.toHaveAttribute("open");
    fireEvent(dialog, new Event("close"));
    expect(restoreFocus).toHaveBeenCalled();
    expect(document.documentElement).not.toHaveClass("drawer-open");
  });

  it("handles the native Escape cancellation path and restores trigger focus", async () => {
    const user = userEvent.setup();
    renderNavigation();

    const trigger = screen.getByRole("button", { name: "Menu" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Navigate" });
    screen.getByRole("link", { name: /About/ }).focus();
    const restoreFocus = vi.spyOn(trigger, "focus");

    const cancel = new Event("cancel", { bubbles: false, cancelable: true });
    fireEvent(dialog, cancel);

    expect(cancel.defaultPrevented).toBe(true);
    expect(dialog).not.toHaveAttribute("open");
    fireEvent(dialog, new Event("close"));
    expect(restoreFocus).toHaveBeenCalled();
  });

  it("closes when the backdrop itself is activated, but not for panel clicks", async () => {
    const user = userEvent.setup();
    renderNavigation();

    const trigger = screen.getByRole("button", { name: "Menu" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Navigate" });

    fireEvent.click(dialog.querySelector(".navigation-drawer__panel") as HTMLElement);
    expect(dialog).toHaveAttribute("open");

    fireEvent.click(dialog);
    expect(dialog).not.toHaveAttribute("open");
    expect(trigger).toHaveFocus();
  });

  it("removes listeners and scroll locking when unmounted", async () => {
    const user = userEvent.setup();
    const closeSpy = vi.spyOn(HTMLDialogElement.prototype, "close");
    const { unmount } = renderNavigation();

    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(document.documentElement).toHaveClass("drawer-open");
    unmount();

    expect(document.documentElement).not.toHaveClass("drawer-open");
    expect(closeSpy).not.toHaveBeenCalled();
    closeSpy.mockRestore();
  });

  it("has no detectable accessibility violations when open", async () => {
    const user = userEvent.setup();
    const { container } = renderNavigation();

    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
