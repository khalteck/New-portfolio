import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GoogleAnalytics } from "@/components/layout/google-analytics";

describe("Google Analytics consent", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-TEST123");
    window.localStorage.clear();
    delete window.gtag;
    delete window.dataLayer;
  });

  afterEach(() => {
    document.head.querySelector('script[data-portfolio-analytics="true"]')?.remove();
    vi.unstubAllEnvs();
  });

  it("does not load Google Analytics before the visitor allows it", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <GoogleAnalytics />
      </MemoryRouter>
    );

    expect(await screen.findByRole("heading", { name: "Your privacy choice" })).toBeInTheDocument();
    expect(document.head.querySelector('script[data-portfolio-analytics="true"]')).toBeNull();

    await user.click(screen.getByRole("button", { name: "Decline" }));
    expect(window.localStorage.getItem("khalid-portfolio-analytics-consent")).toBe("denied");
    expect(document.head.querySelector('script[data-portfolio-analytics="true"]')).toBeNull();
  });

  it("loads the tag and queues one route view after consent", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <GoogleAnalytics />
      </MemoryRouter>
    );

    await user.click(await screen.findByRole("button", { name: "Allow" }));

    await waitFor(() =>
      expect(document.head.querySelector('script[data-portfolio-analytics="true"]')).not.toBeNull()
    );
    expect(window.localStorage.getItem("khalid-portfolio-analytics-consent")).toBe("granted");
    expect(window.dataLayer).toEqual(
      expect.arrayContaining([
        expect.arrayContaining(["consent", "default"]),
        expect.arrayContaining(["consent", "update"]),
        expect.arrayContaining(["event", "page_view"])
      ])
    );
  });
});
