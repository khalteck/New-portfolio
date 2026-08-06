# ADR 0003: Build-time route prerendering with client hydration on Netlify

- Status: Accepted
- Date: 2026-08-05

## Context

The portfolio is a React/Vite frontend with five stable public routes. Case studies need shareable
direct URLs, route-specific metadata, useful initial markup, browser navigation, and static hosting.
Adding a runtime server or adopting a different meta-framework would conflict with the requested
architecture and increase operational scope.

The existing release model targets Netlify and the canonical domain `khalidoyeneye.dev`.

## Decision

- Keep React Router as the client route owner.
- Build the normal Vite client bundle plus a temporary SSR bundle used only by a prerender script.
- Generate static HTML for `/`, `/projects/relayops`, `/projects/tci-podcast`,
  `/projects/afrogrids`, and `/projects/greencity-financial` at build time, then hydrate with the
  client entry in browsers.
- Keep the route allowlist explicit. Incoming projects and 404 variants do not generate public
  static pages or sitemap entries.
- Deploy only `dist` to Netlify; do not run Node/Express in production.
- Use a non-forced `/* → /index.html` 200 fallback so existing prerendered files win and unknown
  client routes can render the branded 404.
- Cache hashed `/assets/*` immutably, keep HTML update-safe, and apply CSP, permissions, referrer,
  content-type, and framing headers through `netlify.toml`.
- Treat `khalidoyeneye.dev` as the canonical target, while requiring post-deploy DNS, TLS, route,
  metadata, and header verification before declaring v2 live.

## Alternatives considered

- **Pure SPA without prerendering:** direct routes can work through rewrites, but route-specific
  initial metadata and useful no/slow-JavaScript markup are weaker.
- **Runtime SSR:** unnecessary for static content and adds a server, operational cost, and failure
  surface.
- **Next.js/Astro/another meta-framework:** capable, but violates the explicit React/Vite constraint
  and creates an avoidable migration.
- **Separate HTML entrypoints maintained by hand:** duplicates route markup/metadata and risks drift
  from the typed content source.

## Consequences

- A new published slug must be added consistently to content, route metadata, prerendering, sitemap,
  and tests.
- Browser-only APIs must be guarded so build-time rendering remains deterministic.
- Static output validation and direct-route tests are release gates.
- Netlify configuration can prove intent, not external DNS or live deployment state; production
  verification remains an explicit manual step in `docs/deployment.md`.
