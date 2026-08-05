import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ListeningNow } from "@/modules/home/components/listening-now";

describe("listening now", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("shows the active track and opens service links in a labelled dialog", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            title: "Oklahoma Smokeshow",
            artist: "Zach Bryan",
            albumArtUrl: "https://i.scdn.co/image/example"
          })
      })
    );
    const user = userEvent.setup();
    render(<ListeningNow />);

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /Oklahoma Smokeshow/i })).toBeInTheDocument()
    );
    await user.click(screen.getByRole("button", { name: /Oklahoma Smokeshow/i }));

    const dialog = screen.getByRole("dialog", { name: "Oklahoma Smokeshow" });
    expect(dialog).toHaveAttribute("open");
    expect(screen.getByRole("heading", { name: "Oklahoma Smokeshow" })).toBeInTheDocument();
    expect(screen.getAllByText("Zach Bryan")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "YouTube Music" })).toHaveAttribute(
      "href",
      "https://music.youtube.com/search?q=Oklahoma%20Smokeshow%20Zach%20Bryan"
    );
    expect(screen.getByRole("link", { name: "Spotify" })).toHaveAttribute(
      "href",
      "https://open.spotify.com/search/Oklahoma%20Smokeshow%20Zach%20Bryan"
    );
    expect(screen.getByRole("link", { name: "Apple Music" })).toHaveAttribute(
      "href",
      "https://music.apple.com/search?term=Oklahoma%20Smokeshow%20Zach%20Bryan"
    );
  });
});
