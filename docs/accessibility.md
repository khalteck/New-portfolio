# Accessibility guide

## Target and boundaries

The portfolio targets WCAG 2.2 AA for the three published routes. Accessibility is treated as a
product requirement across semantics, keyboard operation, focus, motion, responsive layout, media,
and content accuracy.

Automated tools can find common regressions but cannot certify conformance. No audit result should
be marked passed until it has run against the exact release commit and production-equivalent build.

## Implemented design contract

- A skip link moves directly to the primary content.
- Each route has semantic landmarks and one route-owned `h1`; section headings follow a logical
  order.
- SPA navigation updates the document title/metadata and a polite route announcer.
- Project rows remain normal links for published work. Incoming rows are non-interactive and state
  their placeholder status in text.
- External links have descriptive names and safe new-tab attributes. Email and résumé actions are
  plain links that work without application state.
- A labelled fixed section navigator remains available on every route. It uses normal links and
  moves focus to the destination heading after navigation.
- Visible focus is never removed and uses a high-contrast accent treatment that does not depend on
  color alone.
- Product images have intrinsic dimensions and useful alt text. Decorative ambience and transition
  layers are hidden from assistive technology.
- Route content is meaningful without animation. Reduced motion removes the preloader delay,
  smooth scrolling, pointer tracking, magnetic movement, and long wipes. Particles remain visible
  as a static background.
- Mobile/touch layouts use inline project images instead of hover emulation. Pointer-only cursor
  state is supplementary.
- The layout is designed for 320 CSS pixels, 200% zoom, landscape mobile, and keyboard use without
  horizontal page scrolling.

## Keyboard map

| Context               | Key/input      | Expected behavior                                                         |
| --------------------- | -------------- | ------------------------------------------------------------------------- |
| Page                  | `Tab`          | Moves through visible interactive elements in DOM/reading order           |
| Page                  | `Shift+Tab`    | Moves backward without entering hidden transition or ambience layers      |
| Skip link             | `Enter`        | Moves focus to primary content                                            |
| Section dock link     | `Enter`        | Moves to the target home section from any route and focuses its heading   |
| Published project     | `Tab`, `Enter` | Shows a focus-associated preview where supported and opens its case study |
| Incoming project      | None           | Receives no focus because it is intentionally not an action               |
| Case-study back       | `Enter`        | Returns through useful browser history with a safe home fallback          |
| External/contact link | `Enter`        | Opens the verified target; purpose is discernible from accessible text    |

The custom cursor, particle canvas, progress rail, and page-transition layers must never become
focusable.

## Automated coverage

### Unit and component tests

Vitest, React Testing Library, user-event, jest-dom, and jest-axe cover or are intended to cover:

- content constraints and employer-bound claims;
- valid/invalid route rendering and route announcements;
- drawer open/close, Escape behavior, modal focus, and trigger restoration;
- session-aware preloader behavior;
- reduced-motion media-query changes;
- keyboard project access and incoming-project inertness;
- route error/404 behavior; and
- animation/listener cleanup.

Run:

```bash
pnpm test
pnpm test:coverage
```

Configured coverage thresholds for the selected application surfaces are 80% lines, functions, and
statements, and 75% branches. They do not represent whole-repository coverage unless the coverage
include set covers the entire repository.

### Browser tests

Playwright targets Chromium, Firefox, and WebKit and exercises:

- direct loads for `/`, RelayOps, and TCI Podcast;
- browser back/forward and branded 404 behavior;
- drawer focus containment, Escape closing, and focus restoration;
- keyboard entry to a case study;
- email and résumé link semantics;
- incoming-project inertness;
- 320 px layout width and touch-size layouts;
- reduced motion; and
- serious axe violations on representative routes.

Run:

```bash
pnpm e2e
```

Failure screenshots, traces, or reports are evidence for debugging, not assets to commit as proof of
conformance. Visual snapshots do not replace semantics or assistive-technology checks.

## Manual release checklist

### Structure and content

- [ ] Confirm exactly one useful `h1` per route and a logical heading outline.
- [ ] Navigate by landmarks and confirm the skip link lands on main content.
- [ ] Check link names without surrounding visual context, especially project, résumé, social, back,
      previous, and next links.
- [ ] Confirm the 404 is useful before any animation runs.
- [ ] Confirm image alt text describes relevant content without duplicating adjacent captions.

### Keyboard and focus

- [ ] Complete every route using only keyboard input.
- [ ] Verify focus is always visible against charcoal, off-white, images, and the green accent.
- [ ] Open the drawer from each route; test forward/reverse focus movement, Escape, backdrop close,
      route selection, scroll lock, and focus restoration.
- [ ] Confirm route changes place focus predictably and the polite announcement is not duplicated.
- [ ] Confirm incoming placeholders do not enter the tab order.

### Reflow and input

- [ ] Test 320 × 800, 390 × 844, tablet, short laptop, desktop, and landscape mobile layouts.
- [ ] Zoom browser content to 200%; verify no two-dimensional page scrolling or clipped email,
      technology, metadata, navigation, or heading content.
- [ ] Test touch/coarse-pointer mode: inline project imagery should replace the hover portal, and no
      custom cursor should appear.
- [ ] Verify practical targets are at least 44 × 44 CSS pixels.

### Motion and sensory characteristics

- [ ] Enable operating-system reduced motion before loading each route.
- [ ] Confirm content appears immediately with native scrolling and without the preloader, custom
      cursor, particles, image tracking, magnetic movement, or long route wipes.
- [ ] Confirm hover, focus, color, cursor shape, and movement never provide unique information.
- [ ] Check muted text, rules, accent text, focus rings, and accent-on-charcoal contrast with a
      contrast analyzer.

### Assistive technology

- [ ] VoiceOver + Safari on macOS/iOS: landmarks, headings, menu dialog, route announcement, project
      links, gallery alt text, and contact/footer.
- [ ] NVDA + Firefox on Windows: the same path, including direct case-study loads and 404.
- [ ] Where available, TalkBack + Chrome or VoiceOver + iOS Safari for the touch layout and drawer.
- [ ] Confirm the preloader and decorative layers are never announced.

## Known boundaries

- Automated axe scans cover representative pages, not every browser/assistive-technology pairing.
- A native `dialog` still requires cross-browser manual verification, especially on older embedded
  browsers.
- Animated text and pointer-preview behavior require human review even when automated tests pass.
- External content, PDF viewer behavior, and the RelayOps live application are outside this site's
  accessibility boundary; link purpose and handoff remain this site's responsibility.
- WCAG 2.2 AA is a target. Record real audit results and unresolved defects in the release handoff;
  do not infer conformance from the existence of this checklist.
