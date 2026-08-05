import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { portfolio } from "@/data/portfolio";
import { ProjectRow } from "@/modules/projects/components/project-row";

const relayOps = portfolio.projects[0];
const incoming = portfolio.projects[2];

describe("project row input equivalents", () => {
  it("opens and closes the published preview for keyboard focus", async () => {
    expect(relayOps?.status).toBe("published");
    if (!relayOps || relayOps.status !== "published") return;

    const user = userEvent.setup();
    const onPreview = vi.fn();
    render(
      <MemoryRouter>
        <ProjectRow project={relayOps} onPreview={onPreview} onPointerMove={vi.fn()} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "View RelayOps case study" });
    await user.tab();
    expect(link).toHaveFocus();
    expect(onPreview).toHaveBeenLastCalledWith(relayOps, link);

    await user.tab();
    expect(onPreview).toHaveBeenLastCalledWith(undefined);
  });

  it("keeps pointer preview movement supplementary to the real link", async () => {
    expect(relayOps?.status).toBe("published");
    if (!relayOps || relayOps.status !== "published") return;

    const user = userEvent.setup();
    const onPreview = vi.fn();
    const onPointerMove = vi.fn();
    render(
      <MemoryRouter>
        <ProjectRow project={relayOps} onPreview={onPreview} onPointerMove={onPointerMove} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "View RelayOps case study" });
    await user.pointer([
      { target: link },
      { target: link, coords: { clientX: 120, clientY: 240 } }
    ]);
    expect(onPreview).toHaveBeenCalledWith(relayOps, link);
    expect(onPointerMove).toHaveBeenCalled();

    await user.unhover(link);
    expect(onPreview).toHaveBeenLastCalledWith(undefined);
  });

  it("renders an incoming slot as information rather than an affordance", () => {
    expect(incoming?.status).toBe("incoming");
    if (!incoming || incoming.status !== "incoming") return;

    render(
      <MemoryRouter>
        <ProjectRow project={incoming} onPreview={vi.fn()} onPointerMove={vi.fn()} />
      </MemoryRouter>
    );

    const slot = screen.getByRole("article", { name: /Project 03 — Incoming, incoming/i });
    expect(slot).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
