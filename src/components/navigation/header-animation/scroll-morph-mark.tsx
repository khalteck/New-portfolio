import type { RefCallback, RefObject } from "react";

export type MarkElement = HTMLSpanElement | SVGGElement;

interface ScrollMorphMarkProps {
  rootRef: RefObject<HTMLSpanElement | null>;
  setMarkRef: (index: number) => RefCallback<MarkElement>;
}

export function ScrollMorphMark({ rootRef, setMarkRef }: ScrollMorphMarkProps) {
  return (
    <span
      ref={rootRef}
      className="relative block h-6 w-8 shrink-0 text-current"
      aria-hidden="true"
      data-mark="ko"
      data-progress="0"
      data-ui="scroll-morph-mark"
    >
      <span
        ref={setMarkRef(0)}
        className="absolute inset-0 flex origin-center items-center justify-center font-display text-base font-bold tracking-[0.12em] uppercase will-change-[opacity,transform] max-md:text-[0.92rem]"
      >
        KO
      </span>
      <svg
        className="absolute inset-0 h-full w-full overflow-visible fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round]"
        viewBox="0 0 32 24"
        focusable="false"
      >
        <g
          ref={setMarkRef(1)}
          className="origin-center opacity-0 will-change-[opacity,transform]"
          strokeWidth="1.35"
        >
          <ellipse cx="16" cy="12" rx="10.5" ry="4.5" transform="rotate(-18 16 12)" />
          <circle className="fill-current stroke-none" cx="7" cy="15" r="1.55" />
          <circle className="fill-current stroke-none" cx="24" cy="7.5" r="1.1" />
        </g>
        <g
          ref={setMarkRef(2)}
          className="origin-center opacity-0 will-change-[opacity,transform]"
          strokeWidth="1.45"
        >
          <path d="M16 3.5 18.2 9.8 24.5 12l-6.3 2.2L16 20.5l-2.2-6.3L7.5 12l6.3-2.2L16 3.5Z" />
          <path d="M5 5.5h3M6.5 4v3M24 18.5h3M25.5 17v3" strokeWidth="1.1" />
        </g>
        <g
          ref={setMarkRef(3)}
          className="origin-center opacity-0 will-change-[opacity,transform]"
          strokeWidth="1.25"
        >
          <path d="m6 16 6-8 6 6 8-7" />
          <circle className="fill-current stroke-none" cx="6" cy="16" r="1.6" />
          <circle className="fill-current stroke-none" cx="12" cy="8" r="1.35" />
          <circle className="fill-current stroke-none" cx="18" cy="14" r="1.6" />
          <circle className="fill-current stroke-none" cx="26" cy="7" r="1.35" />
        </g>
        <g
          ref={setMarkRef(4)}
          className="origin-center opacity-0 will-change-[opacity,transform]"
          strokeWidth="1.25"
        >
          <rect x="11" y="7" width="10" height="10" rx="1.5" />
          <path d="M11 10H6V6M11 14H6v4M21 10h5V6M21 14h5v4M14 7V3M18 7V3M14 17v4M18 17v4" />
          <circle className="fill-current stroke-none" cx="16" cy="12" r="1.7" />
        </g>
        <g
          ref={setMarkRef(5)}
          className="origin-center opacity-0 will-change-[opacity,transform]"
          strokeWidth="1.35"
        >
          <path d="M6 5h6M6 5v6M26 5h-6M26 5v6M6 19h6M6 19v-6M26 19h-6M26 19v-6" />
          <path d="m12 12 4-4 4 4-4 4-4-4Z" />
        </g>
      </svg>
    </span>
  );
}
