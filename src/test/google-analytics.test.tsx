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

  it("does not load Google Analytics before the visitor accepts the notice", async () => {
    render(
      <MemoryRouter>
        <GoogleAnalytics />
      </MemoryRouter>
    );

    expect(await screen.findByText(/by staying on this site, you accept/i)).toBeInTheDocument();
    expect(document.head.querySelector('script[data-portfolio-analytics="true"]')).toBeNull();
  });

  it("loads the tag and queues one route view once the visitor accepts", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <GoogleAnalytics />
      </MemoryRouter>
    );

    await user.click(await screen.findByRole("button", { name: "Dismiss privacy notice" }));

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

  it("accepts consent when the visitor keeps interacting with the site instead of closing the notice", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <GoogleAnalytics />
      </MemoryRouter>
    );

    await screen.findByText(/by staying on this site, you accept/i);
    await user.keyboard("{Tab}");

    await waitFor(() =>
      expect(window.localStorage.getItem("khalid-portfolio-analytics-consent")).toBe("granted")
    );
  });
});
