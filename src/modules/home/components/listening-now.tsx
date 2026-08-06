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
      <button
        className="group grid w-full cursor-pointer grid-cols-[2.5rem_minmax(0,1fr)] gap-3.5 border-0 border-y border-line bg-transparent py-3.5 text-left text-copy"
        type="button"
        onClick={openDialog}
        data-cursor="action"
      >
        <span
          className="grid size-10 place-items-center border border-line-bright text-accent transition-colors group-hover:border-accent group-hover:bg-accent/10 group-focus-visible:border-accent group-focus-visible:bg-accent/10 [&_svg]:w-4"
          aria-hidden="true"
        >
          <Music2 />
        </span>
        <span className="grid min-w-0 gap-0.5">
          <span className="text-[0.62rem] font-extrabold tracking-[0.1em] text-faint uppercase">
            I&apos;m currently listening to
          </span>
          <strong className="overflow-hidden text-[0.82rem] text-ellipsis whitespace-nowrap">
            {dialogTrack.title}
          </strong>
          <small className="overflow-hidden text-[0.72rem] text-ellipsis whitespace-nowrap text-muted">
            {dialogTrack.artist}
          </small>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="m-auto w-[min(calc(100%-2rem),34rem)] border border-line-bright bg-surface p-[clamp(1.25rem,4vw,2.5rem)] text-copy shadow-[0_2rem_7rem_rgb(0_0_0/55%)] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
        aria-labelledby={titleId}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line pb-5">
          <p className="m-0 text-[0.62rem] font-extrabold tracking-[0.1em] text-faint uppercase">
            I&apos;m currently listening to
          </p>
          <button
            className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-line-bright bg-surface text-copy [&_svg]:w-4"
            type="button"
            onClick={closeDialog}
            aria-label="Close listening details"
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-5 py-8 [&>img]:aspect-square [&>img]:w-[5.5rem] [&>img]:object-cover [&>svg]:aspect-square [&>svg]:w-[5.5rem] [&>svg]:border [&>svg]:border-line [&>svg]:p-6 [&>svg]:text-accent">
          {track?.albumArtUrl ? (
            <img src={track.albumArtUrl} alt="" />
          ) : (
            <Music2 aria-hidden="true" />
          )}
          <div>
            <h2
              className="m-0 font-display text-[clamp(2.4rem,8vw,4rem)] leading-[0.85] font-bold uppercase"
              id={titleId}
            >
              {dialogTrack.title}
            </h2>
            <p className="mt-2 mb-0 text-muted">{dialogTrack.artist}</p>
          </div>
        </div>
        {track ? (
          <nav className="grid border-t border-line" aria-label="Listen on a music service">
            {musicLinks(track).map((link) => (
              <a
                className="flex min-h-[3.2rem] items-center justify-between border-b border-line text-[0.72rem] font-extrabold tracking-[0.08em] uppercase no-underline [&_svg]:w-3.5 [&_svg]:text-accent"
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
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
