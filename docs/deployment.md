# Netlify deployment and release gate

## Deployment model

The portfolio is a static Vite application. The build creates static HTML for `/` and every
published project in `src/data/portfolio.ts`, then the React client hydrates those documents. There
is no production Node/Express server, database, CMS, or runtime secret.

The target host is Netlify and the canonical origin is `https://khalidoyeneye.dev`. The repository
configuration declares `dist` as the publish directory, Node 24, pnpm 10.32.1, an SPA fallback,
immutable caching for hashed assets, and static security headers.

This document is a procedure, not a claim that v2 is deployed. At the time of the rebuild, v2 lives
on `revamp/v2`; the old site is preserved on `archive/v1` and tag `v1.0.0`.

## 1. Pre-release source checks

1. Confirm the checkout is the intended `revamp/v2` release commit and the worktree contains no
   unexplained changes.
2. Confirm `archive/v1` and `v1.0.0` still point to the preserved legacy site.
3. Review the diff for secrets, private screenshots, confidential product data, analytics IDs, and
   unverified claims.
4. Confirm `src/data/portfolio.ts`, route metadata, sitemap, and robots policy agree on exactly these
   public routes. Client hydration, SSR, prerender, and static validation derive project paths from
   the published collection automatically:
   - `/`
   - `/projects/relayops`
   - `/projects/tci-podcast`
   - `/projects/afrogrids`
   - `/projects/greencity-financial`
5. Verify the résumé file and public contact/social links. TCI Podcast must still omit its unreliable
   live/source links. Incoming projects must remain non-routable.
6. Verify RelayOps URLs and preserve the scope/verification date of its technical claims.

## 2. Environment and dependency gate

```bash
node --version
corepack --version
pnpm --version
pnpm install --frozen-lockfile
```

Expected major versions are Node 24 and pnpm 10. GA4 is optional: set
`VITE_GA_MEASUREMENT_ID` in Netlify to the public `G-...` measurement ID to enable consent-gated
route views and portfolio conversion events. Do not configure a secret with `VITE_`, because Vite
exposes those values to the browser.

Before enabling GA4, approve the privacy notice and consent approach for every audience the site
serves. The measurement ID is public, but the related Google account access must remain private.

## 3. Local quality gate

Run each command against the release commit and save the actual exit status in the pull request or
release record:

```bash
pnpm verify
pnpm e2e
pnpm lighthouse
pnpm build:analyze
```

`pnpm verify` covers format checks, lint, strict types, configured coverage, production build,
prerender, and static-output validation. Playwright and Lighthouse remain explicit gates; do not
describe them as passed because `pnpm verify` passed.

Review the bundle report against these budgets:

- initial JavaScript ≤250 KiB gzip;
- initial homepage transfer ≤1.5 MiB;
- critical preview image ≤250 KiB;
- CLS ≤0.1; and
- LCP ≤2.5 seconds under the configured audit profile.

If the audit environment cannot run a browser or reach required local services, record the exact
constraint and leave that gate unverified. Do not replace a missing result with an estimate.

## 4. Production-output inspection

Start the built site locally:

```bash
pnpm preview --host 127.0.0.1
```

Inspect `dist` without editing it manually:

- each real route has route-specific static HTML, title, description, canonical, and social image;
- unknown routes return the branded client 404 through the SPA fallback;
- the sitemap contains only real routes and uses `https://khalidoyeneye.dev`;
- `robots.txt`, manifest, favicon, social image, résumé, and responsive project images are present;
- no incoming placeholder has generated metadata, JSON-LD, sitemap entry, or route HTML; and
- source maps, secrets, legacy files, and full-resolution non-critical galleries are not exposed by
  accident.

Smoke-test direct loads and refreshes at:

```text
/
/projects/relayops
/projects/tci-podcast
/projects/afrogrids
/projects/greencity-financial
/projects/not-a-real-project
```

Also test browser back/forward, hash links from a case study to home sections, email, résumé, GitHub,
LinkedIn, RelayOps live/source links, reduced motion, touch layout, and keyboard-only use.

## 5. Netlify configuration review

Before promotion, verify the Netlify site is connected to the repository's intended default branch
and that its settings do not override `netlify.toml` unexpectedly.

Expected settings:

| Setting            | Value                                                             |
| ------------------ | ----------------------------------------------------------------- |
| Build command      | `corepack enable && pnpm install --frozen-lockfile && pnpm build` |
| Publish directory  | `dist`                                                            |
| Node               | `24`                                                              |
| pnpm               | `10.32.1`                                                         |
| GA4 measurement ID | Public `G-...` value in `VITE_GA_MEASUREMENT_ID` when approved    |

The catch-all rewrite must use status `200`, target `/index.html`, and not force over existing
prerendered files. Hashed `/assets/*` files should receive one-year immutable caching. HTML must
remain update-safe.

Verify these response headers on HTML and representative assets:

- `Content-Security-Policy`;
- `Permissions-Policy`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `X-Content-Type-Options: nosniff`;
- `X-Frame-Options: DENY`; and
- expected `Cache-Control` by file class.

The current CSP permits Google Tag Manager and Google Analytics only for consent-gated GA4
measurement. It otherwise blocks framing and objects and allows inline style needed by the
implemented styling and motion approach. Any other external service requires an explicit policy
review.

## Owner deployment checklist

Complete these items before the production promotion:

- [ ] Create or select the GA4 property and Web data stream for `khalidoyeneye.dev`.
- [ ] In the GA4 Web stream, disable automatic Page Views for both page loads and browser-history
      changes. The application sends its own initial and client-route `page_view` events.
- [ ] Add the public `G-...` ID to Netlify as `VITE_GA_MEASUREMENT_ID`. Decide whether deploy
      previews should use the production stream, a separate test stream, or no analytics.
- [ ] Review and approve the short analytics consent copy and any separate privacy notice required
      for the audiences you serve.
- [ ] After deployment, accept analytics once and confirm a single page view per route in GA4
      DebugView or Realtime. Also confirm `contact_click`, `resume_view`, `project_open`,
      `project_external`, `external_profile`, and `section_navigation` events.
- [ ] Add a Google Search Console Domain property and complete its DNS TXT verification.
- [ ] Submit `https://khalidoyeneye.dev/sitemap.xml`, inspect all five published URLs, and request
      indexing after the live checks pass.
- [ ] Run the deployed pages through Google's Rich Results Test and confirm the profile and project
      JSON-LD matches visible content without critical errors.
- [ ] Confirm the Netlify production domain, apex and `www` redirect, HTTPS certificate, and DNS are
      correct before requesting indexing.
- [ ] Recheck the production résumé, email, GitHub, LinkedIn, RelayOps live product, and source-code
      links.
- [ ] Open `/projects/relayops`, `/projects/tci-podcast`, `/projects/afrogrids`, and
      `/projects/greencity-financial` directly and confirm each case study, canonical URL, social
      preview, and external product link.
- [ ] On desktop and mobile, verify dock highlighting while scrolling, transition-free Home and
      section navigation, the mobile safe-area layout, and the scroll-to-top control on home,
      project, and not-found routes.
- [ ] Check Chromium, Firefox, and WebKit with motion enabled and reduced. Confirm the KO outline is
      visible immediately on a fresh session and the loader clears at two seconds.

## 6. Promotion and domain verification

1. Open and review the `revamp/v2` pull request against the Netlify-connected default branch.
2. Require the aggregate CI gate, including browser and Lighthouse jobs, for the exact head commit.
3. Review the Netlify deploy preview on desktop, mobile/touch, keyboard, and reduced motion.
4. Merge only after content, visual, accessibility, security-header, and performance review.
5. Allow Netlify to deploy the merged default branch. Do not manually alter DNS as part of the
   source merge.
6. Confirm Netlify's custom-domain settings list `khalidoyeneye.dev`, HTTPS is valid, and the chosen
   `www`/apex redirect is intentional.
7. Verify production URLs, not only the deploy preview:
   - final URL and HTTPS chain;
   - direct route loads and refreshes;
   - canonical and social-image absolute URLs;
   - sitemap and robots fetches;
   - security/cache headers;
   - résumé and all permitted external links; and
   - production console/network errors.
8. Record the deployed commit, time, smoke-test results, measured budgets, and any unresolved
   external configuration.

DNS and production status are external state. Never mark them complete solely because repository
configuration exists.

## 7. Rollback

Prefer Netlify's prior successful deploy rollback for a release-specific regression. If the v2
promotion itself must be backed out, create a normal revert commit on the default branch so history
remains reviewable. Do not delete or rewrite `archive/v1` or `v1.0.0`.

After rollback:

- verify the restored production URL and deep links;
- confirm headers and TLS still apply;
- record the affected deploy/commit and reason; and
- fix forward on `revamp/v2` or a focused repair branch before another reviewed promotion.
