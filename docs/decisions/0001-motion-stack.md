# ADR 0001: GSAP, ScrollTrigger, Lenis, CSS, and requestAnimationFrame motion ownership

- Status: Accepted
- Date: 2026-08-05

## Context

The portfolio needs coordinated editorial reveals, route layers, a modal navigation sequence,
pointer-follow previews, a custom cursor, ambient particles, and smooth scrolling. Those effects must
coexist with React 19 Strict Mode, server-prerendered content, browser history, touch input,
visibility changes, and a complete reduced-motion mode.

One animation library should not own every interaction. CSS is better for simple state transitions;
continuous pointer/canvas work is naturally frame-based; coordinated timelines and scroll triggers
need explicit scoping and cleanup.

## Decision

- Use GSAP 3 and `@gsap/react` for coordinated timelines, with ScrollTrigger for section reveals.
- Use a single Lenis instance in `SmoothScrollProvider`, connected to GSAP's ticker and destroyed on
  unmount. Do not use Lenis for reduced-motion users.
- Use CSS transitions/keyframes for preloader presentation and simple hover/focus/underline states.
- Use `requestAnimationFrame` for cursor interpolation, project-preview tracking, progress, and the
  small particle canvas.
- Scope GSAP selectors through refs/contexts and revert on cleanup. Explicitly remove frames,
  timeouts, tickers, and DOM listeners from non-GSAP effects.
- Render semantic final content before JavaScript. Motion layers are `aria-hidden`, pointer-inert,
  and supplementary.
- Treat `prefers-reduced-motion: reduce`, coarse pointers, constrained widths, and hidden documents
  as lifecycle inputs rather than CSS-only afterthoughts. The homepage header character journey is
  the sole deliberate reduced-motion exception: it stays scroll-linked, decorative, and
  pointer-inert, while its autonomous seated details pause with the hidden document.

## Alternatives considered

- **CSS only:** insufficient for coordinated timelines, scroll-trigger lifecycle, and imperative
  pointer tracking.
- **A second React motion framework:** adds bundle/lifecycle overlap without a requirement GSAP and
  CSS cannot cover.
- **Native smooth scrolling only:** useful as fallback, but does not provide the requested desktop
  cinematic behavior or a single ScrollTrigger integration point.
- **Always-on canvas/cursor effects:** rejected because they add cost and reduce usability on touch,
  constrained devices, hidden tabs, and reduced-motion configurations.

## Consequences

- Motion code has explicit owners and no interaction should be animated by competing systems.
- Developers must test cleanup in Strict Mode and across route/preference changes.
- GSAP and Lenis contribute to initial JavaScript and are subject to the 250 KiB gzip budget.
- Reduced-motion layouts are intentionally less animated except for the documented homepage header
  journey; touch layouts retain the same header sequence and identical content and actions.
- Named behaviors and their fallbacks must remain synchronized with `docs/motion-system.md`.
