import { useEffect, useId, useRef, useState } from "react";
import { ExternalLink, Music2, X } from "lucide-react";

interface ListeningTrack {
  title: string;
  artist: string;
  albumArtUrl?: string;
}

type ListeningState = ListeningTrack | null;

const musicLinks = (track: ListeningTrack) => {
  const query = encodeURIComponent(`${track.title} ${track.artist}`);
  return [
    { label: "YouTube Music", href: `https://music.youtube.com/search?q=${query}` },
    { label: "Spotify", href: `https://open.spotify.com/search/${query}` },
    { label: "Apple Music", href: `https://music.apple.com/search?term=${query}` }
  ];
};

export function ListeningNow() {
  const [track, setTrack] = useState<ListeningState>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (typeof fetch !== "function") return;
    const controller = new AbortController();

    fetch("/api/listening", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) return null;
        return (await response.json()) as ListeningTrack | null;
      })
      .then((nextTrack) => setTrack(nextTrack))
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setTrack(null);
      });

    return () => controller.abort();
  }, []);

  const closeDialog = () => dialogRef.current?.close();
  const openDialog = () => dialogRef.current?.showModal();
  const dialogTrack = track ?? { title: "No track playing", artist: "Check back soon" };

  return (
    <>
      <button className="listening-now" type="button" onClick={openDialog} data-cursor="action">
        <span className="listening-now__icon" aria-hidden="true">
          <Music2 />
        </span>
        <span className="listening-now__content">
          <span>I&apos;m currently listening to</span>
          <strong>{dialogTrack.title}</strong>
          <small>{dialogTrack.artist}</small>
        </span>
      </button>

      <dialog ref={dialogRef} className="listening-dialog" aria-labelledby={titleId}>
        <div className="listening-dialog__header">
          <p>I&apos;m currently listening to</p>
          <button
            className="icon-button"
            type="button"
            onClick={closeDialog}
            aria-label="Close listening details"
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <div className="listening-dialog__track">
          {track?.albumArtUrl ? (
            <img src={track.albumArtUrl} alt="" />
          ) : (
            <Music2 aria-hidden="true" />
          )}
          <div>
            <h2 id={titleId}>{dialogTrack.title}</h2>
            <p>{dialogTrack.artist}</p>
          </div>
        </div>
        {track ? (
          <nav className="listening-dialog__links" aria-label="Listen on a music service">
            {musicLinks(track).map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
                <ExternalLink aria-hidden="true" />
              </a>
            ))}
          </nav>
        ) : null}
      </dialog>
    </>
  );
}
