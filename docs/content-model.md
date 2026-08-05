# Content model and evidence policy

## Purpose

All public professional facts live in `src/data/portfolio.ts` and conform to the interfaces in
`src/types/portfolio.ts`. Components may format this data but must not introduce employers, dates,
metrics, projects, technologies, or external URLs of their own.

This separation makes content review possible without auditing animation or presentation code. It
also prevents editorial placeholders from accidentally acquiring case-study routes or professional
claims.

## Sources and claim strength

Use the narrowest available source and preserve its limitations.

| Content                              | Approved source                                                                | Publication rule                                                                                          |
| ------------------------------------ | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Identity, email, location, education | `Resume.pdf` retained in the repository                                        | Match the résumé; the public UI intentionally omits the phone number                                      |
| Employment, dates, role achievements | `Resume.pdf`                                                                   | Keep figures with their matching employer and label reported figures as résumé-reported where appropriate |
| GitHub and LinkedIn                  | Links embedded in the résumé/current portfolio                                 | Publish only these verified social channels                                                               |
| RelayOps architecture and links      | Public RelayOps repository, tracked docs/reports, and checked Render endpoints | Date the verification; distinguish scoped artifacts from whole-product or current-CI claims               |
| TCI Podcast work                     | Resume, retained portfolio copy, and retained screenshot                       | No year, live/source URL, or quantitative outcome until re-verified                                       |
| Incoming projects                    | No evidence supplied yet                                                       | Publish only an explicit inert placeholder                                                                |
| Visual-reference attribution         | Tajmirul Islam's public site and MIT repository                                | Credit inspiration; do not copy identity, copy, media, logo, cursor artwork, or source                    |

The current résumé-backed facts are:

- Khalid Oyeneye, Senior Frontend Engineer, Lagos, Nigeria;
- `khalidoyeneye@gmail.com`;
- 1840 & Company — Senior Frontend Engineer, June 2024–present, Kansas/United States remote;
- Atop Web Technologies — Frontend Engineer, April 2023–January 2024, Stockholm/Sweden remote;
- Iroko Events International — Frontend Developer, February 2022–January 2023, Budapest/Hungary
  remote;
- Agrofeed Integrated Services — Frontend Developer, November 2019–January 2022, Lagos/Nigeria;
- University of Ilorin — BEng Electrical & Electronics Engineering, August 2024; and
- TCI Podcast client application and admin CMS built with React, Redux Toolkit, and Firebase,
  including episode CRUD, pagination, and audio playback.

The résumé attributes 50% increased voter participation, 70% reduced admin effort, and 95% fewer
voting errors to Iroko. It attributes 20% increased sales and 100% improved search ranking to
Agrofeed. Do not move or generalize those figures.

## Root content

`PortfolioContent` contains the following fields.

### `profile`

| Field          | Type     | Rule                                                                         |
| -------------- | -------- | ---------------------------------------------------------------------------- |
| `name`         | `string` | Verified public name                                                         |
| `role`         | `string` | Current positioning; presently `Senior Frontend Engineer`                    |
| `location`     | `string` | City and country only                                                        |
| `email`        | `string` | Valid verified address; rendered through `mailto:`                           |
| `summary`      | `string` | Concise positioning, not an unsupported outcome claim                        |
| `availability` | `string` | Current publication-approved availability                                    |
| `resumeUrl`    | `string` | Root-relative path to the public PDF; presently `/khalid-oyeneye-resume.pdf` |

The public profile intentionally has no portrait, monogram, phone, WhatsApp, X, Instagram, or
contact-form endpoint.

### `socialLinks`

Each item has `platform` (`GitHub` or `LinkedIn`) and an absolute HTTPS `href`. A new platform
requires both type expansion and link verification. External links open with
`rel="noreferrer noopener"`.

### `metrics`

Each metric has:

- `value`: the short visible value;
- `label`: a human-readable label;
- `basis`: the exact supporting rationale; and
- `visible`: an editorial publication flag.

The current metrics are `6+` years, based on professional experience beginning in November 2019,
and `3` international remote teams, based on résumé-listed roles in the United States, Sweden, and
Hungary. Changing a display value requires updating its basis and source evidence together.

### Narrative and capabilities

- `philosophy` is one evidence-safe engineering statement.
- `about` is an ordered array of biography paragraphs.
- `capabilities[]` contains a `title` and `description`; a capability must be supported by the
  résumé or a published project.
- `technologyGroups[]` contains `title`, an approved icon key (`code`, `state`, `server`, or
  `quality`), and a non-empty `technologies` list. Technologies must be evidenced by the résumé or
  published-project implementation, not added for keyword coverage.

### `experiences`

Each experience contains:

| Field          | Requirement                                                            |
| -------------- | ---------------------------------------------------------------------- |
| `company`      | Exact employer name                                                    |
| `location`     | Résumé location plus `Remote` when stated                              |
| `title`        | Résumé role title, normalized only for capitalization                  |
| `start`, `end` | Human-readable résumé dates; use `Present` only for the current role   |
| `summary`      | Concise responsibility summary with no unsupported result              |
| `achievements` | Employer-specific statements; figures may not be moved to another role |
| `technologies` | Tools evidenced for that employment context                            |
| `companyUrl`   | Optional absolute HTTPS URL, included only when verified               |

Experiences remain reverse chronological. A résumé-reported metric should retain wording that makes
its source clear rather than being presented as independently audited analytics.

## Project union

`PortfolioProject` is a discriminated union keyed by `status`.

### `PublishedProject`

A published project is routable and may appear in metadata, structured data, and the sitemap.

| Field              | Rule                                                                              |
| ------------------ | --------------------------------------------------------------------------------- |
| `status`           | Literal `published`                                                               |
| `number`           | Stable two-digit homepage order                                                   |
| `slug`             | Unique lowercase kebab-case segment; must match the route and prerender allowlist |
| `title`            | Verified public project name                                                      |
| `year`             | Optional; omit when unknown rather than estimating                                |
| `role`             | Khalid's defensible contribution, not a generic team claim                        |
| `shortDescription` | Evidence-safe index/metadata copy                                                 |
| `overview`         | Concise case-study introduction                                                   |
| `technologies`     | Non-empty verified technology list                                                |
| `preview`          | Responsive project image used by the homepage                                     |
| `gallery`          | Zero or more approved case-study images                                           |
| `problem`          | Verified product/engineering context paragraphs                                   |
| `solution`         | What was designed or implemented                                                  |
| `responsibilities` | Khalid's own contribution                                                         |
| `challenges`       | Technical/product constraints supported by the implementation                     |
| `outcomes`         | Evidence-backed delivery or impact statements with scope retained                 |
| `liveUrl`          | Optional absolute HTTPS URL; only when current, public, and permitted             |
| `sourceUrl`        | Optional absolute HTTPS URL; only when public and permitted                       |
| `sourceNote`       | Mandatory provenance and limitation note                                          |

Current publication constraints:

- **RelayOps:** `year: "2026"`; public Render application and GitHub source are permitted. Claims
  may cover two independently deployable services, public deployment, the documented test
  architecture, and the targeted coverage artifacts. Current data records 96.29% backend
  critical-rule lines, 86.36% frontend critical-state lines, and 100% shared-contract lines. These
  are not whole-repository figures. Do not claim adoption, customers, revenue, business impact,
  green CI, or currently passing browser tests.
- **TCI Podcast:** omit `year`, `liveUrl`, and `sourceUrl`. Its defensible scope is the React/Redux
  Toolkit/Firebase listener experience and admin CMS, episode CRUD, pagination, and audio playback.
  Do not invent metrics or imply the retained screenshot proves a currently available service.

Previous/next navigation is calculated only from published projects. An unknown slug and any
incoming-project identifier resolve to the 404 experience.

### `IncomingProject`

An incoming entry is deliberately unable to satisfy the published interface. It contains only:

- `status: "incoming"`;
- `number`;
- internal `id`;
- visible `title` ending in `— Incoming`;
- neutral `shortDescription`; and
- `previewLabel` that clearly communicates placeholder status.

It must not contain `slug`, `year`, client/employer attribution, technologies, role, case-study
copy, outcomes, gallery, `liveUrl`, or `sourceUrl`. It is rendered as a non-interactive editorial
preview and excluded from SEO and routing.

To promote a placeholder, gather approved evidence and imagery first, then replace the entire item
with a complete `PublishedProject`. Update the static route allowlist, sitemap, metadata, tests, and
image assets in the same change.

## Project images

`ProjectImage` requires:

- `src`: root-relative AVIF path;
- `webpSrc`: root-relative WebP fallback;
- intrinsic `width` and `height`;
- useful `alt` text describing relevant visible content;
- optional responsive `avifSrcSet`, `webpSrcSet`, and `sizes`; and
- optional `caption` for context that should remain visible.

Store assets under `public/images/projects/<slug>/`. Preserve aspect ratio, generate only useful
responsive widths, and keep the critical preview at or below 250 KiB. Below-fold gallery images
should lazy-load. A decorative image uses empty alt text; a product screenshot needs concise alt
text that does not repeat its caption.

Do not publish private dashboards, credentials, personal data, internal analytics, confidential
client material, or screenshots without permission. RelayOps media uses seeded demonstration data.
The TCI image is the retained, previously public composite; it does not authorize a source link or
performance claim.

## Editorial review checklist

Before merging a content change:

- confirm every new fact against the named source;
- keep metrics attached to their source and preserve qualifiers;
- check all public URLs and permissions;
- validate image ownership, confidentiality, dimensions, formats, and alt text;
- ensure incoming projects remain non-routable;
- update route metadata, static prerender routes, sitemap, and tests for any published slug;
- run `pnpm verify` and the relevant Playwright route tests; and
- record anything not independently verified in the release handoff rather than weakening this
  policy.
