import type { PropsWithChildren } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RouteAnnouncer } from "@/components/layout/route-announcer";
import { RouteHead } from "@/components/layout/route-head";
import { AppRoutes } from "@/routes/app-routes";
import { RouteErrorBoundary } from "@/routes/route-error-boundary";
import { requestAnimationFrameMock } from "./browser-mocks";

vi.mock("@/components/motion/reveal", () => ({
  Reveal: ({ children }: PropsWithChildren) => <>{children}</>
}));

const renderRoute = (pathname: string) =>
  render(
    <MemoryRouter initialEntries={[pathname]}>
      <AppRoutes />
    </MemoryRouter>
  );

describe("application routes", () => {
  it("renders the homepage at the canonical root", () => {
    renderRoute("/");
    expect(
      screen.getByRole("heading", { level: 1, name: /Senior Frontend\s*\/\s*Engineer/i })
    ).toBeInTheDocument();
  });

  it("renders the evidence-led RelayOps case study", async () => {
    const { container } = renderRoute("/projects/relayops");

    expect(await screen.findByRole("heading", { level: 1, name: "RelayOps" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Live product/ })).toHaveAttribute(
      "href",
      "https://relayops-frontend.onrender.com/"
    );
    expect(screen.getByRole("link", { name: /Source code/ })).toHaveAttribute(
      "href",
      "https://github.com/khalteck/RelayOps"
    );
    expect(screen.getByRole("heading", { name: "Engineering challenges" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Delivered evidence" })).toBeInTheDocument();
    expect(screen.getByLabelText("RelayOps gallery")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders TCI Podcast without invented year or public-project actions", async () => {
    renderRoute("/projects/tci-podcast");

    await screen.findByRole("heading", { level: 1, name: "TCI Podcast" });
    const main = screen.getByRole("main");
    expect(within(main).queryByText("Year not published")).not.toBeInTheDocument();
    expect(
      within(main).queryByRole("link", { name: /Live product|Source code/ })
    ).not.toBeInTheDocument();
    expect(within(main).getByText(/create, read, update, and delete/i)).toBeInTheDocument();
  });

  it.each(["/projects/incoming-03", "/projects/not-a-project", "/unknown-route"])(
    "renders the accessible branded 404 for %s",
    async (pathname) => {
      renderRoute(pathname);

      expect(await screen.findByText("404 · Off route")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 1, name: "This page left no forwarding address." })
      ).toHaveAttribute("tabindex", "-1");
      expect(screen.getByRole("link", { name: /Return home/ })).toHaveAttribute("href", "/");
    }
  );
});

describe("route error boundary", () => {
  afterEach(() => vi.restoreAllMocks());

  it("renders its useful recovery state when route content throws", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const BrokenRoute = () => {
      throw new Error("route failed");
    };

    render(
      <RouteErrorBoundary>
        <BrokenRoute />
      </RouteErrorBoundary>
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "The page hit an unexpected boundary." })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/");
  });

  it("renders children while no error has been raised", () => {
    render(
      <RouteErrorBoundary>
        <p>Healthy route</p>
      </RouteErrorBoundary>
    );
    expect(screen.getByText("Healthy route")).toBeInTheDocument();
  });
});

describe("route metadata and announcement components", () => {
  it("announces navigation and moves programmatic focus to the route heading", async () => {
    let queuedFrame: FrameRequestCallback | undefined;
    requestAnimationFrameMock.mockImplementationOnce((callback) => {
      queuedFrame = callback;
      return 1;
    });

    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RouteAnnouncer />
        <Link to="/projects/relayops">Open case study</Link>
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <h1 tabIndex={-1}>Home</h1>
              </main>
            }
          />
          <Route
            path="/projects/relayops"
            element={
              <main>
                <h1 tabIndex={-1}>RelayOps</h1>
              </main>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText(/Navigated to/)).not.toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: "Open case study" }));
    expect(await screen.findByText("Navigated to RelayOps — Khalid Oyeneye")).toHaveAttribute(
      "aria-live",
      "polite"
    );
    queuedFrame?.(0);
    expect(screen.getByRole("heading", { level: 1 })).toHaveFocus();
  });

  it("writes canonical metadata and excludes placeholders from structured data", async () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={["/projects/relayops"]}>
        <RouteHead />
      </MemoryRouter>
    );

    await waitFor(() => expect(document.title).toBe("RelayOps — Khalid Oyeneye"));
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://khalidoyeneye.dev/projects/relayops"
    );
    const projectData = JSON.parse(
      document.head.querySelector<HTMLScriptElement>("#portfolio-structured-data")?.text ?? "{}"
    ) as Record<string, unknown>;
    expect(projectData).toMatchObject({
      "@type": "SoftwareApplication",
      name: "RelayOps",
      codeRepository: "https://github.com/khalteck/RelayOps"
    });
    expect(JSON.stringify(projectData)).not.toContain("incoming-03");

    unmount();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RouteHead />
      </MemoryRouter>
    );
    await waitFor(() => expect(document.title).toContain("Senior Frontend Engineer"));
    const personData = JSON.parse(
      document.head.querySelector<HTMLScriptElement>("#portfolio-structured-data")?.text ?? "{}"
    ) as Record<string, unknown>;
    expect(personData).toMatchObject({ "@type": "Person", name: "Khalid Oyeneye" });
  });
});
