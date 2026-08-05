# ADR 0002: Central typed content with published/incoming project discrimination

- Status: Accepted
- Date: 2026-08-05

## Context

The portfolio publishes professional claims from several evidence sources: a résumé, an existing
portfolio, a public RelayOps repository and deployment, and a retained TCI Podcast screenshot. Four
future projects have not been supplied. Scattering facts through components would make claim review
difficult and could let placeholders acquire routes, links, or invented outcomes accidentally.

No backend or CMS is needed for this small, version-controlled content set.

## Decision

- Store all public facts in `src/data/portfolio.ts` and all content contracts in
  `src/types/portfolio.ts`.
- Keep presentation components fact-free; they receive typed content and decide only presentation.
- Model projects as a union discriminated by `status`:
  - `PublishedProject` has a unique slug, full case-study content, evidence note, media, and optional
    permitted URLs.
  - `IncomingProject` has only an internal id, number, explicit placeholder title/description, and
    preview label. It cannot express a slug, outcomes, media gallery, or external link.
- Derive published-project lookup and previous/next navigation from the narrowed published list.
- Generate routes, metadata, structured data, sitemap entries, and prerender output only for
  published projects.
- Keep source limitations in content: résumé-reported employer metrics remain attached to their
  employers; RelayOps coverage retains its targeted scope; TCI omits year/live/source/outcomes that
  are not verified.

## Alternatives considered

- **Unstructured objects colocated with components:** easy initially but weakens evidence review and
  permits shape drift.
- **Markdown/MDX case studies:** useful for a larger writing archive, but introduces a second content
  pipeline without solving evidence typing for profile, experience, and placeholders.
- **Headless CMS:** adds authentication, network/runtime failure, schema duplication, and operational
  overhead to a focused engineering portfolio.
- **One project type with many optional fields:** cannot prevent an incomplete placeholder from
  acquiring a route or partial professional claim.

## Consequences

- Content changes are reviewed as code and require a deployment.
- Publishing a new project is intentionally explicit: complete evidence and media, switch to the
  published type, and update the static route/SEO/test allowlists together.
- Type safety prevents several unsafe placeholder states, while tests and editorial review enforce
  cross-field evidence rules TypeScript cannot express.
- `docs/content-model.md` is the normative editing and provenance guide.
