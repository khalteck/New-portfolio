# Khalid Oyeneye Premium Portfolio — Frontend Project Creator Prompt

Use this file as the master prompt for building Khalid Oyeneye's production-ready portfolio as a
frontend-only React and Vite application. It preserves the engineering discipline and staged
delivery structure of the supplied RelayOps prompt while focusing entirely on the public portfolio
experience.

```txt
PROJECT_NAME=Khalid Oyeneye Portfolio
PROJECT_DESCRIPTION=Build a premium, motion-led portfolio for Khalid Oyeneye, a senior frontend-focused full-stack engineer based in Lagos, Nigeria. The site must quickly communicate his 6+ years of frontend experience, product ownership, technical leadership, React expertise, and ability to deliver polished full-stack products for international teams and clients. It must present his profile, engineering approach, stack, work experience, selected projects, measurable outcomes, resume, social links, availability, and contact path through one cohesive editorial experience. The primary conversion goals are to get Khalid shortlisted for strong remote frontend/full-stack roles and contacted for well-scoped paid product work. Use verified content from the existing repository, current portfolio, and resume as the source of truth; never invent employers, dates, metrics, testimonials, or client claims.
STYLE_GUIDE=Create a high-fidelity, original React/Vite interpretation of the premium feel and interaction choreography of https://www.tajmirul.site/: near-black charcoal canvas, warm off-white typography, electric green accent, oversized condensed display headings, restrained grotesk body copy, generous editorial whitespace, fine dividers, asymmetrical desktop composition, and smooth cinematic motion. Preserve the same broad section order and interaction categories—full-viewport hero, statement/about, categorized stack, experience, selected projects, case-study routes, and contact footer—plus a preloader, slide-out navigation, custom desktop cursor, subtle particle field, scroll progress indicator, sticky contact affordance, text reveals, project-image hover previews, magnetic/arrow micro-interactions, and layered page wipes. Rebuild all code and content for Khalid's identity; do not copy Tajmirul's name, copy, images, logo, or personal data. If implementation substantially follows the open-source reference, retain appropriate attribution to Tajmirul Islam and the MIT-licensed source in the README and a discreet site credit.
```

## Prompt

You are my senior product designer, motion designer, frontend architect, accessibility specialist,
testing engineer, performance engineer, and deployment IDE agent. Build a production-ready,
frontend-only React/Vite application named `Khalid Oyeneye Portfolio`.

The product description is:

```txt
Build a premium, motion-led portfolio for Khalid Oyeneye, a senior frontend-focused full-stack
engineer based in Lagos, Nigeria. The site must quickly communicate his 6+ years of frontend
experience, product ownership, technical leadership, React expertise, and ability to deliver
polished full-stack products for international teams and clients.

The site must present his profile, engineering approach, stack, work experience, selected projects,
measurable outcomes, resume, social links, availability, and contact path through one cohesive
editorial experience. Its primary conversion goals are:

1. Get Khalid shortlisted for strong remote frontend or full-stack engineering roles.
2. Generate enquiries for well-scoped, fixed-rate or hourly paid product work.
3. Give recruiters and technical decision-makers fast evidence of craft, ownership, leadership,
   product thinking, and delivery depth.

Use verified content from the existing repository, Khalid's current portfolio, and his resume as the
source of truth. Never invent employers, dates, metrics, testimonials, awards, or client claims.
When information is missing, create an explicit typed content placeholder and document it instead of
publishing fabricated content.
```

Use this style guide for visual direction:

```txt
Create a high-fidelity, original React/Vite interpretation of the premium feel and interaction
choreography of https://www.tajmirul.site/.

Visual foundation:
- A near-black charcoal canvas rather than pure black, with one slightly lighter charcoal surface.
- Warm off-white primary text, muted cool-gray secondary text, and a vivid electric green accent.
- Oversized, condensed, uppercase display typography for hero and project titles.
- A clean variable grotesk/sans-serif for body copy, labels, navigation, metadata, and buttons.
- Generous editorial whitespace, thin rules, disciplined alignment, and asymmetric desktop layouts.
- Almost no conventional cards, gradients, glassmorphism, rounded dashboard panels, or decorative
  glow. Hierarchy comes from scale, spacing, contrast, rhythm, and motion.

Reference composition and order:
1. Full-viewport hero/banner with a two-line role statement, concise introduction, primary contact
   CTA, current availability, and a restrained column of verified career metrics.
2. A large personal/engineering philosophy statement revealed on scroll.
3. A more intimate about block with a short label, personal introduction, and focused biography.
4. Categorized technical stack with icon-led items and subtle hover feedback.
5. Experience section with company, title, dates, and role detail in a clean editorial timeline/list.
6. Selected projects as large numbered rows with project name and technology tags.
7. Contact-led footer with a large email treatment and minimal social/credit information.
8. Dedicated project case-study routes with back navigation, title, year, stack, description,
   responsibilities, outcomes, imagery, live link, and source link when permitted.

Signature interaction language:
- A branded first-load preloader that reveals KHALID letter by letter, runs once per session, and
  hands off cleanly into the hero. It must never trap the page if JavaScript, fonts, or assets lag.
- A sticky minimal navigation trigger opening a right-side panel over a dim overlay. The panel uses
  a large circular/curved charcoal reveal, staggered menu labels, social links, and direct contact.
- Smooth scrolling through Lenis, integrated safely with GSAP ScrollTrigger and disabled when the
  user prefers reduced motion.
- Split-line or masked text entrances, staggered hero reveals, and scroll-triggered transforms that
  feel weighted and deliberate rather than bouncy.
- A small desktop-only SVG custom cursor that follows with slight easing and changes state over
  links, project rows, and magnetic buttons. Never replace the native cursor on touch/coarse-pointer
  devices, and never impair clicking or focus.
- A narrow fixed vertical scroll-progress rail on desktop with a green fill linked to document
  progress; provide a non-obstructive mobile treatment or omit it on narrow screens.
- A very subtle, low-density particle/line background confined to ambience. It must preserve text
  contrast, pause when the tab is hidden, and disappear under reduced motion or constrained devices.
- Project rows that reveal the matching project image near the pointer on hover, move it with eased
  tracking, animate outlined/filled title treatment, shift metadata, and remain fully usable by
  keyboard. On touch, use an intentional inline thumbnail or tap state instead of hover emulation.
- CTA and navigation arrows with small directional transforms, underline sweeps, or magnetic
  response. Motion should communicate affordance, not decorate every element.
- Layered route/page wipes using the charcoal surface and green accent when entering or leaving a
  case study. Browser back/forward navigation, deep links, and reduced motion must remain correct.
- A sticky vertical email/contact affordance on wide screens only.

Motion character:
- Use GSAP timelines and ScrollTrigger for coordinated sequences; use CSS transitions for simple
  hover/focus states. Do not create competing animation systems for the same element.
- Prefer `power2.out`, `power3.out`, and restrained custom cubic-bezier curves; avoid springy motion.
- Typical micro-interactions: 150–350ms. Menu and page transitions: roughly 600–800ms. Scroll
  reveals: roughly 700–1100ms with small, controlled staggers.
- Animate transforms and opacity whenever possible. Avoid layout-thrashing properties.
- Every non-essential animation must have a meaningful reduced-motion equivalent.

Originality and attribution:
- Rebuild the system from scratch in React/Vite for Khalid's brand and content.
- Do not copy Tajmirul's personal copy, name treatment, images, SVG cursor path, logo, or project data.
- Do not reproduce source code verbatim. Create original components and animation timelines.
- The reference repository is MIT licensed and its author explicitly requests credit when reused.
  If the implementation substantially follows it, credit Tajmirul Islam and link to
  https://www.tajmirul.site/ and https://github.com/Tajmirul/portfolio-2.0 in the README and a
  discreet footer credit.
```

## Operating Mandate

Deliver a complete portfolio, not a loose collection of animated sections.

- Inspect the repository before editing. Preserve existing content, assets, analytics, metadata,
  and deployment behavior unless they conflict with this brief.
- Derive the repository slug, package name, metadata, content schema, routes, component names,
  image variants, and brand tokens from the supplied inputs and existing content.
- Use Khalid's real domain language: `experience`, `projects`, `caseStudies`, `capabilities`,
  `outcomes`, and `technologies`. Avoid generic `Item`, `Card`, or `Data` names where a precise name
  is available.
- Centralize editable portfolio content. Do not bury biography, links, experience, projects, or SEO
  copy inside presentation components.
- Do not add a backend, database, authentication system, CMS, API, server runtime, or admin area.
- Do not silently substitute Next.js, Remix, Astro, Gatsby, or another framework. This is a React
  SPA built with Vite.
- Do not request more input unless the missing decision would materially change the visual identity
  or publish unverified personal/professional information. Use typed placeholders for non-blocking
  missing content.
- Preserve the reference's premium interaction density, section order, and broad composition while
  making the result unmistakably Khalid's.

## Product Goal

The first viewport must immediately answer:

- Who is Khalid?
- What level and type of engineer is he?
- What does he build particularly well?
- Is he available for the viewer's kind of opportunity?
- Where can the viewer see proof or contact him?

The complete visit must let a recruiter or client:

- Understand Khalid's positioning in under 15 seconds.
- Scan his experience, strongest technologies, and selected project evidence.
- Open detailed, shareable case-study URLs.
- View or download his resume.
- Reach his email, LinkedIn, GitHub, or primary contact channel without hunting.
- Use the whole experience with keyboard, touch, reduced motion, and common assistive technology.

## Required Stack

Use current compatible patch releases within these major versions unless the repository lockfile
already establishes exact versions.

### Runtime and tooling

- Node.js 24, Corepack, and pnpm 10.
- React 19 and React DOM 19.
- Vite 7 with `@vitejs/plugin-react`.
- TypeScript 5 in strict mode.
- Tailwind CSS 4 through `@tailwindcss/vite`, supplemented by semantic CSS custom properties.
- ESLint 9 with typescript-eslint, React Hooks, React Refresh, JSX accessibility rules, and zero
  warnings.
- Prettier 3, Husky 9, and lint-staged.

### UI, navigation, and motion

- React Router 7 with lazy case-study routes, a route-owned error boundary, and a useful 404 route.
- GSAP 3, `@gsap/react`, and ScrollTrigger for coordinated entrance, scroll, menu, cursor, project
  preview, and page-transition timelines.
- Lenis for smooth scrolling, with correct cleanup and reduced-motion fallback.
- Lucide React for ordinary interface icons; use small original inline SVG only when brand-specific.
- `clsx` and `tailwind-merge` for predictable class composition.
- Do not add Ant Design, Material UI, a headless component suite, Zustand, TanStack Query, React Hook
  Form, or another large dependency unless a verified requirement genuinely needs it.

### Testing and analysis

- Vitest with V8 coverage.
- React Testing Library, user-event, jsdom, jest-dom, and jest-axe.
- Playwright across Chromium, Firefox, and WebKit with responsive, keyboard, reduced-motion, and axe
  assertions.
- Rollup Visualizer for a production bundle report.
- Lighthouse CI or an equivalent repeatable performance/accessibility/SEO audit.

## Expected Repository Shape

Use the same internal organization as the original master prompt's frontend directory, but make it
the root of this frontend-only repository:

```txt
khalid-oyeneye-portfolio/
├── public/
│   ├── fonts/
│   ├── images/
│   │   ├── projects/
│   │   └── profile/
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   ├── robots.txt
│   ├── sitemap.xml
│   └── khalid-oyeneye-resume.pdf
├── src/
│   ├── components/
│   │   ├── cursor/
│   │   ├── layout/
│   │   ├── motion/
│   │   ├── navigation/
│   │   └── ui/
│   ├── helpers/
│   ├── hooks/
│   ├── modules/
│   │   ├── home/
│   │   │   ├── components/
│   │   │   ├── operations/
│   │   │   ├── views/
│   │   │   └── index.ts
│   │   └── projects/
│   │       ├── components/
│   │       ├── operations/
│   │       ├── views/
│   │       └── index.ts
│   ├── routes/
│   ├── services/
│   ├── stores/
│   ├── styles/
│   ├── test/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── e2e/
│   ├── fixtures/
│   ├── support/
│   └── portfolio.spec.ts
├── docs/
│   ├── decisions/
│   ├── accessibility.md
│   ├── content-model.md
│   ├── motion-system.md
│   └── deployment.md
├── scripts/
├── .github/workflows/ci.yml
├── .env.example
├── eslint.config.js
├── index.html
├── package.json
├── playwright.config.ts
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

Module-owned UI belongs in `components`, animation orchestration and section behavior belong in
`operations`, and lazy route components belong in `views`. Each module exposes only its intended
public surface through `index.ts`.

`stores/` may remain empty or be omitted. Do not introduce a global state library for simple menu,
cursor, preloader, or route-transition state; prefer local state, context, URL state, and small
hooks.

## Architecture Invariants

- All public content is defined in typed data modules such as `src/data/portfolio.ts` or equivalent.
- Presentation components never own verified professional facts.
- Route state owns the active case-study URL. Section navigation uses stable IDs and progressive
  enhancement.
- GSAP contexts are scoped to components and reverted on cleanup. ScrollTriggers are killed or
  refreshed correctly after route changes, font loading, and responsive layout changes.
- Lenis has one owner, one lifecycle, and one integration point with GSAP's ticker.
- Each animated component renders meaningful final content before JavaScript runs.
- The preloader is session-aware, time-bounded, and never blocks accessibility or navigation.
- The custom cursor is `pointer-events: none`, desktop/coarse-pointer aware, and never becomes the
  only affordance.
- Project images use responsive sources, explicit dimensions/aspect ratios, modern formats, and
  lazy loading below the fold.
- No client-side secret enters Vite environment variables. Only public configuration may use the
  `VITE_` prefix.
- External links use safe `rel` values when opening new tabs.
- Contact actions are plain accessible `mailto:`, phone/WhatsApp, or verified external links. There
  is no fake form submission without a real delivery service.

## Content Model

Create strict TypeScript types and one central content source for:

- `profile`: name, role, location, summary, availability, email, resume URL, portrait/monogram.
- `socialLinks`: GitHub, LinkedIn, X, and any other verified channel.
- `metrics`: label, display value, precise supporting basis, and visibility flag.
- `philosophy`: one strong statement about user-centred, scalable, high-performing product work.
- `about`: concise personal introduction and a deeper career/product narrative.
- `capabilities`: frontend architecture, design-system execution, product engineering, technical
  leadership, API/integration work, and delivery/CI where verified.
- `technologyGroups`: frontend, backend, database/cloud, tooling, and testing.
- `experiences`: company, title, employment type, start/end, summary, achievements, technologies,
  and optional company URL.
- `projects`: slug, title, short description, year, role, technologies, featured status, thumbnails,
  gallery, problem, solution, responsibilities, challenges, outcomes, live URL, source URL, and
  confidentiality rules.

Seed the selected-project content from verified work already associated with Khalid, prioritizing
the strongest evidence and visual assets. Likely candidates include 1840 Global Talent Cloud,
Link-able, First Market, TCI Podcast, Afrogrids, Rooms, Scorebox, House No. 5, Aashiikii,
TailorMaid, MFBI, and GreenCity Finance. Select approximately six for the homepage and keep the rest
available for future expansion. Do not publish confidential screenshots, internal analytics, client
names, or numbers unless already public and approved.

## Routes and Section Requirements

### `/` — Home

Use this exact broad sequence:

1. `HeroSection`
2. `PhilosophyStatement`
3. `AboutSection`
4. `TechnologyStackSection`
5. `ExperienceSection`
6. `SelectedProjectsSection`
7. `ContactFooter`

The hero must contain:

- A large two-line role such as `FRONTEND / ENGINEER` or `PRODUCT / ENGINEER`, chosen from verified
  positioning and sized as the dominant page element.
- A concise introduction naming Khalid and the value he delivers.
- A primary `Let's talk` or `Start a conversation` action.
- A verified availability statement.
- Two or three truthful metrics, for example years of experience, shipped products, or leadership
  scope. Do not use decorative counters with unsupported values.

The experience section should reveal rows progressively and support quick scanning. The selected
projects section must use numbered rows, large titles, compact technology tags, keyboard focus,
desktop hover previews, and an intentional mobile layout.

### `/projects/:slug` — Project case study

Each valid case study must include:

- Back navigation that respects history but always has a safe home fallback.
- Large project title, year, role, technologies, and a concise overview.
- Problem/context, contribution, implementation highlights, and verified outcomes.
- Optimized gallery imagery with useful alt text or marked decorative treatment.
- Live-project and source links only when public and permitted.
- Previous/next project navigation.
- The same global footer and route-transition language as the home page.

An unknown slug must render the portfolio 404 state, not an empty project shell.

### `*` — Not found

Create an on-brand, concise 404 view with a clear route back home. It must not require animation to
be understandable.

## Global Experience Components

Implement and verify:

- `Preloader`
- `SiteNavigation`
- `NavigationDrawer`
- `PageTransition`
- `SmoothScrollProvider`
- `CustomCursor`
- `ParticleField`
- `ScrollProgressIndicator`
- `StickyContact`
- `SectionTitle`
- `MagneticLink` or a similarly restrained interactive CTA primitive
- `ProjectPreviewPortal`
- `SkipLink`
- `RouteAnnouncer`

The navigation drawer must lock background scrolling, trap focus, close on Escape and overlay
click, restore focus to its trigger, expose the active section, and move to home sections correctly
from both home and case-study routes.

## Motion Specification

Document every named animation in `docs/motion-system.md` with trigger, duration range, easing,
affected properties, cleanup, responsive behavior, and reduced-motion result.

At minimum define:

- Preloader letter sequence and exit.
- Initial page wipe and hero reveal.
- Hero line masks and staggered supporting content.
- Navigation drawer panel/curved backdrop/menu stagger.
- Philosophy text reveal.
- About copy and media reveal.
- Technology item entrances and hover state.
- Experience row reveal.
- Project-row title, metadata, underline, and image-follow hover interaction.
- Magnetic CTA/arrow motion.
- Route exit and entry wipes.
- Scroll progress update.
- Custom cursor follow and contextual states.

Avoid globally selecting broad element types inside timelines. Use refs, scoped selectors, and data
attributes with clear names. Prevent duplicate timelines under React Strict Mode.

## Premium Style-Synthesis Process

Before styling components:

1. Record the reference principles: typography contrast, charcoal/off-white/green palette, section
   rhythm, asymmetric grid, thin dividers, low card density, cursor behavior, hover previews,
   transition layers, and restrained motion.
2. Write a visual thesis for Khalid: an experienced product engineer whose portfolio feels precise,
   fast, assured, and technically authored.
3. Build semantic tokens for canvas, raised canvas, primary/muted text, border, accent, on-accent,
   focus, success, warning, and danger.
4. Create the motion tokens: `micro`, `short`, `medium`, `long`, shared easings, distance scale, and
   reduced-motion rules.
5. Establish desktop, tablet, and mobile composition before adding detailed animation.
6. Run an originality audit against the reference. Keep the interaction categories and premium
   pacing, but remove copied personal identity, copy, imagery, and exact ornamental shapes.

The finished site must not contain:

- Gradient blobs, aurora effects, glowing orbs, or generic AI artwork.
- Glass cards, bento-grid filler, excessive pills, or rounded containers around every paragraph.
- Fake browser frames, fake dashboards, fake testimonials, or fake client logos.
- Decorative animation that delays access to content.
- A theme toggle added by habit. The art direction is intentionally dark-first; add an alternate
  theme only if it is fully designed and strengthens the identity.

## Responsive Requirements

Design explicitly for:

- Mobile: 320–767 CSS pixels.
- Tablet: 768–1023 CSS pixels.
- Desktop: 1024–1439 CSS pixels.
- Wide desktop: 1440 CSS pixels and above with a controlled maximum content width.

On mobile:

- Preserve the section order and typographic drama without clipped display text.
- Replace pointer-follow project previews with inline, swipe-safe imagery.
- Disable the custom cursor and heavy particle effects.
- Keep all interactive targets at least 44 by 44 CSS pixels where practical.
- Ensure drawer, project metadata, footer email, and long technology names do not overflow.

Use fluid type and spacing with `clamp()` where appropriate. Verify landscape mobile, 200% zoom,
short laptop viewports, and touch laptops.

## Accessibility Requirements

Target WCAG 2.2 AA:

- Semantic landmarks, one logical `h1` per route, correct heading order, skip link, descriptive link
  names, and useful alt text.
- Full keyboard access to navigation, menu, project rows, case-study links, and every CTA.
- Strong visible focus treatment that complements the green accent and is never removed for
  keyboard users.
- Focus trapping/restoration for the drawer and route-focus management after navigation.
- `aria-current` for route/section context and a polite route announcer for SPA navigation.
- No information or affordance communicated through hover, color, cursor state, or motion alone.
- Contrast testing for text, muted text, rules, tags, focus rings, and accent-on-charcoal states.
- Usability at 200% zoom and 320 CSS pixels without horizontal page scrolling.
- A complete `prefers-reduced-motion` experience: no smooth scrolling, preloader delay, pointer
  tracking, particles, parallax, magnetic movement, or long wipes; use immediate or short opacity
  changes only where needed for orientation.
- Automated jest-axe and Playwright axe coverage plus a documented manual VoiceOver/Safari and
  NVDA/Firefox checklist.

## Performance and SEO Requirements

- Set a performance budget for initial JS, total page weight, LCP image size, and animation work.
- Lazy-load case-study routes and non-critical project galleries.
- Preload only the display/body fonts and true hero-critical assets; self-host licensed font files.
- Use `font-display: swap`, subset fonts where licensing allows, and provide strong system fallbacks.
- Serve AVIF/WebP with responsive `srcset`, explicit dimensions, and predictable aspect ratios.
- Avoid eager-loading all six hover-preview originals; use optimized thumbnails and prefetch the
  active/focused preview carefully.
- Pause GSAP tickers, cursor work, and particle rendering when the document is hidden.
- Keep the main thread responsive on mid-range mobile hardware.
- Provide unique title, description, canonical URL, Open Graph/Twitter metadata, and social image
  for the homepage and every case study.
- Add Person and CreativeWork/SoftwareApplication JSON-LD where facts are verified.
- Generate or maintain `robots.txt`, `sitemap.xml`, icons, web manifest, and a useful no-JavaScript
  fallback message.
- Do not publish email addresses, analytics IDs, or contact details different from the verified
  content source.

## Analytics and Privacy

If the existing site already uses analytics, preserve it only after documenting the provider,
events, consent implications, and environment configuration. Otherwise do not add analytics by
default.

If analytics are included, track only useful conversion events such as resume open/download,
project open, live-project click, GitHub/LinkedIn click, and contact click. Do not collect sensitive
data or keystrokes, and do not let analytics failures affect navigation.

## Three-Stage Implementation Process

### Stage 1 — Foundation and representative vertical slice

1. Inspect the repository, current content, resume, assets, and deployment configuration.
2. Write a compact content model, section map, route map, design thesis, and motion inventory.
3. Scaffold or align pnpm, Vite, strict TypeScript, Tailwind, ESLint, Prettier, Vitest, Playwright,
   and CI without discarding existing work.
4. Create semantic color/type/spacing/motion tokens, font loading, global resets, focus styles, and
   responsive container primitives.
5. Create typed content data and validation for profile, links, metrics, experience, technology
   groups, and projects. Mark missing verified content explicitly.
6. Build routing, app shell, global providers, navigation drawer, smooth scrolling, skip link,
   route announcer, 404, and error boundary.
7. Complete the hero plus one selected-project row and one project-detail route as the visual and
   motion quality bar.
8. Verify formatting, lint, types, tests, production build, and the representative desktop/mobile
   flows before Stage 2.

### Stage 2 — Complete portfolio experience

1. Complete philosophy, about, stack, experience, selected projects, and footer in the required
   order.
2. Complete all selected project case studies from verified data and assets.
3. Implement preloader, page wipes, drawer choreography, scroll reveals, custom cursor, scroll
   progress, particles, project preview portal, magnetic CTAs, and reduced-motion equivalents.
4. Add resume, social, availability, sticky contact, project navigation, and contact conversion
   paths.
5. Finish responsive compositions for mobile, tablet, desktop, wide desktop, landscape mobile, and
   short laptop viewports.
6. Add meaningful loading/failure handling for lazy routes and images; broken optional media must
   not collapse a case study.
7. Finish metadata, structured data, sitemap, robots, social previews, and favicon/manifest assets.
8. Add unit/component tests for content rendering, menu behavior, keyboard behavior, route errors,
   session preloader, reduced motion, and animation cleanup.

### Stage 3 — Production readiness

1. Add Playwright coverage for homepage navigation, project hover/focus/touch behavior, case-study
   routes, back/forward navigation, drawer focus, resume/contact links, 404, responsive overflow,
   reduced motion, and axe scans.
2. Add screenshot-based visual review for the home page and one case study at representative
   desktop/mobile sizes with normal and reduced motion.
3. Generate and review the production bundle report. Remove unused dependencies and prevent
   accidental eager loading of full project galleries.
4. Run Lighthouse or equivalent audits and fix material accessibility, performance, best-practice,
   and SEO failures. Prefer evidence over a vanity score.
5. Configure GitHub Actions for formatting, lint, types, tests, coverage, build, bundle validation,
   and browser tests with one required aggregate success gate.
6. Configure the actual static host used by the repository—Firebase Hosting, Render Static Site,
   Netlify, Vercel static output, or Cloudflare Pages—without adding a server. Add SPA fallback,
   immutable hashed-asset caching, sensible security headers, and preview/production environments.
7. Finish README, content model, motion guide, accessibility checklist, deployment guide, attribution
   where applicable, and environment examples.
8. Run the full verification gate and report exact results and genuine external configuration still
   required.

## Root Scripts and Verification Gates

Provide scripts with these responsibilities:

```bash
pnpm dev
pnpm format
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:coverage
pnpm build
pnpm build:analyze
pnpm preview
pnpm e2e
pnpm e2e:smoke
pnpm lighthouse
pnpm verify
```

`pnpm verify` must run formatting checks, lint, types, coverage tests, production build, and any
static deployment/config validation available locally. Browser and Lighthouse suites may remain
separate locally, but CI must require them before its aggregate success gate passes.

If a command cannot run in the environment, state the precise constraint and what remains
unverified. Do not claim the site is complete because it compiles or opens once in one browser.

## Deployment Requirements

- Deploy as a static Vite SPA. Do not create an Express server solely to serve the build.
- Preserve the existing host when it is already intentional and functional.
- Add an SPA fallback so `/projects/:slug` works on direct load.
- Cache hashed assets immutably; keep HTML and route metadata update-safe.
- Add security headers appropriate to a static portfolio: content-type protection, referrer policy,
  permissions policy, frame restrictions, and an explicit CSP compatible with verified fonts,
  images, analytics, and external links.
- Keep deployment credentials and analytics IDs outside committed source.
- Document DNS/custom-domain steps without claiming they were completed when they were not.

## Documentation Requirements

Create and maintain:

- `README.md`: positioning, screenshots, live link, content editing, architecture, project map,
  motion system, accessibility, performance, testing, setup, deployment, attribution, and known
  limitations.
- `docs/content-model.md`: every editable field, validation rule, image requirement, confidentiality
  constraint, and the verified source for published claims.
- `docs/motion-system.md`: named timelines, triggers, durations, easings, cleanup, responsive
  behavior, and reduced-motion equivalents.
- `docs/accessibility.md`: automated coverage, keyboard map, manual review checklist, and known
  boundaries.
- `docs/deployment.md`: ordered production gate for environment values, build, preview, headers,
  SPA fallback, domain, analytics, sitemap, smoke tests, and final URL verification.
- ADRs for the animation stack, content architecture, and static hosting choice.

Documentation must describe what was actually built. Never publish placeholder URLs as real, fake
metrics, fake clients, fake availability, or tests marked as passed when they did not run.

## Acceptance Criteria

The project is complete only when:

- It is a frontend-only React 19/Vite application using the required root structure.
- The home page follows the required hero → philosophy → about → stack → experience → selected
  projects → contact sequence.
- Khalid's identity, positioning, experience, strongest evidence, availability, and contact path are
  clear and truthful.
- The charcoal/off-white/electric-green editorial system feels premium and consistent without
  generic AI-site styling.
- Preloader, navigation drawer, custom cursor, subtle particles, scroll indicator, sticky contact,
  text reveals, project-image hover previews, magnetic micro-interactions, and page wipes work as a
  coherent system.
- Every signature interaction has a keyboard/touch equivalent and a reduced-motion behavior.
- Case-study URLs support direct loads, refresh, sharing, browser back/forward, previous/next
  navigation, and unknown-slug handling.
- Content is centralized, typed, verified, and free of fabricated professional claims.
- Project images are optimized and the initial route does not eagerly load full galleries.
- The site works at 320 CSS pixels, 200% zoom, common mobile/tablet/desktop widths, and short laptop
  viewports without horizontal overflow.
- WCAG 2.2 AA targets, keyboard operation, focus management, semantic contrast, and route
  announcements are tested.
- SEO metadata, structured data, sitemap, robots, social previews, resume link, and safe external
  links are complete.
- Formatting, lint, strict types, unit/component coverage, production build, bundle review,
  cross-browser E2E, axe checks, and performance audits pass or exact blockers are documented.
- Static deployment configuration, CI, README, content guide, motion guide, accessibility guide,
  and attribution accurately match the implementation.

## Final Response Format

When finished, respond with:

- The portfolio experience and conversion paths completed.
- The routes, sections, content architecture, and major components added.
- The visual and motion direction implemented, including desktop, touch, and reduced-motion
  behavior.
- Accessibility, performance, SEO, testing, and deployment work delivered.
- Verification commands run with their actual results.
- Local and deployed URLs only when actually available.
- Missing verified content, assets, public links, DNS, analytics, or other external configuration
  Khalid still needs to supply.
- Any remaining risk or unverified item without disguising it as complete.
