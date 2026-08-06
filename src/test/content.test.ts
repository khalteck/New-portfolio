import { describe, expect, it } from "vitest";
import { portfolio, publishedProjects } from "@/data/portfolio";
import { cn } from "@/helpers/cn";
import { externalLinkProps } from "@/helpers/external-link";
import {
  absoluteUrl,
  getRouteMetadata,
  PUBLISHED_PROJECT_PATHS,
  SITE_URL
} from "@/helpers/route-metadata";
import {
  getAdjacentProjects,
  getPublishedProject,
  hasOnlySafeIncomingProjects
} from "@/modules/projects/operations/projects";

describe("portfolio content", () => {
  it("keeps identity, availability, public channels, and verified metrics centralized", () => {
    expect(portfolio.profile).toMatchObject({
      name: "Khalid Oyeneye",
      role: "Fullstack SaaS Engineer",
      location: "Lagos, Nigeria",
      availability: "Open to opportunities.",
      resumeUrl: "/khalid-oyeneye-resume.pdf"
    });
    expect(portfolio.profile.email).toMatch(/@/);
    expect(portfolio.socialLinks.map(({ platform }) => platform)).toEqual(["GitHub", "LinkedIn"]);
    expect(portfolio.metrics.filter(({ visible }) => visible)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: "6+", label: "Years of experience" }),
        expect.objectContaining({ value: "Global", label: "Product delivery" })
      ])
    );
  });

  it("keeps resume-backed experience claims with their matching employers", () => {
    expect(portfolio.experiences.map(({ company }) => company)).toEqual([
      "1840 & Company",
      "Atop Web Technologies",
      "Iroko Events International",
      "Agrofeed Integrated Services"
    ]);

    const iroko = portfolio.experiences.find(
      ({ company }) => company === "Iroko Events International"
    );
    const agrofeed = portfolio.experiences.find(
      ({ company }) => company === "Agrofeed Integrated Services"
    );
    const otherClaims = portfolio.experiences
      .filter(
        ({ company }) =>
          !["Iroko Events International", "Agrofeed Integrated Services"].includes(company)
      )
      .flatMap(({ achievements }) => achievements);

    expect(iroko?.achievements.join(" ")).toMatch(/50%.*70%.*95%/);
    expect(iroko).toMatchObject({ title: "Fullstack Web Developer" });
    expect(agrofeed?.achievements.join(" ")).toMatch(/20%.*100%/);
    expect(agrofeed).toMatchObject({ title: "Fullstack Web Developer" });
    expect(agrofeed?.technologies).toContain("Firebase");
    expect(otherClaims.join(" ")).not.toMatch(/50%|70%|95%|20%|100%/);
  });

  it("publishes four case studies while keeping two placeholders inert", () => {
    expect(publishedProjects.map(({ slug }) => slug)).toEqual([
      "relayops",
      "tci-podcast",
      "afrogrids",
      "greencity-financial"
    ]);

    const incoming = portfolio.projects.filter((project) => project.status === "incoming");
    expect(incoming.map(({ number }) => number)).toEqual(["05", "06"]);
    expect(incoming.every(({ title }) => title.endsWith("| In progress"))).toBe(true);
    expect(hasOnlySafeIncomingProjects()).toBe(true);

    for (const project of incoming) {
      expect(project).not.toHaveProperty("slug");
      expect(project).not.toHaveProperty("liveUrl");
      expect(project).not.toHaveProperty("sourceUrl");
      expect(project).not.toHaveProperty("outcomes");
    }
  });

  it("rejects an incoming slot if a publish-only field is introduced", () => {
    const incoming = portfolio.projects.find((project) => project.status === "incoming");
    expect(incoming).toBeDefined();
    if (!incoming) return;

    const mutableIncoming = incoming as unknown as Record<string, unknown>;
    mutableIncoming.slug = "should-not-publish";
    expect(hasOnlySafeIncomingProjects()).toBe(false);
    delete mutableIncoming.slug;
    expect(hasOnlySafeIncomingProjects()).toBe(true);
  });

  it("keeps published claims and links within the permitted evidence", () => {
    const relayOps = getPublishedProject("relayops");
    const tciPodcast = getPublishedProject("tci-podcast");

    expect(relayOps).toMatchObject({
      year: "2026",
      liveUrl: "https://relayops-frontend.onrender.com/",
      sourceUrl: "https://github.com/khalteck/RelayOps"
    });
    expect(relayOps?.outcomes.join(" ")).toMatch(/frontend and backend services/i);
    expect(relayOps?.outcomes.join(" ")).not.toMatch(/adoption|revenue|customers/i);

    expect(tciPodcast?.technologies).toEqual(
      expect.arrayContaining(["React", "Redux Toolkit", "Firebase"])
    );
    expect(tciPodcast).not.toHaveProperty("year");
    expect(tciPodcast).not.toHaveProperty("liveUrl");
    expect(tciPodcast).not.toHaveProperty("sourceUrl");
    const afrogrids = getPublishedProject("afrogrids");
    const greenCity = getPublishedProject("greencity-financial");
    expect(afrogrids).toMatchObject({ liveUrl: "https://afrogrids.com", number: "03" });
    expect(afrogrids).not.toHaveProperty("sourceUrl");
    expect(greenCity).toMatchObject({ liveUrl: "https://greencityfin.com", number: "04" });
    expect(greenCity).not.toHaveProperty("sourceUrl");
    expect(getPublishedProject("incoming-05")).toBeUndefined();
    expect(getPublishedProject(undefined)).toBeUndefined();
  });

  it("assigns one icon to every technology without duplicating tools", () => {
    const technologies = portfolio.technologyGroups.flatMap((group) => group.technologies);
    expect(technologies.every(({ name, iconKey }) => Boolean(name && iconKey))).toBe(true);
    expect(new Set(technologies.map(({ name }) => name)).size).toBe(technologies.length);
  });

  it("provides cyclic previous and next navigation for real projects only", () => {
    expect(getAdjacentProjects("relayops")).toMatchObject({
      previous: { slug: "greencity-financial" },
      next: { slug: "tci-podcast" }
    });
    expect(getAdjacentProjects("tci-podcast")).toMatchObject({
      previous: { slug: "relayops" },
      next: { slug: "afrogrids" }
    });
    expect(getAdjacentProjects("afrogrids")).toMatchObject({
      previous: { slug: "tci-podcast" },
      next: { slug: "greencity-financial" }
    });
    expect(getAdjacentProjects("greencity-financial")).toMatchObject({
      previous: { slug: "afrogrids" },
      next: { slug: "relayops" }
    });
    expect(getAdjacentProjects("not-published")).toBeUndefined();
  });
});

describe("route metadata and shared helpers", () => {
  it("returns route-specific metadata only for published routes", () => {
    expect(PUBLISHED_PROJECT_PATHS).toEqual([
      "/projects/relayops",
      "/projects/tci-podcast",
      "/projects/afrogrids",
      "/projects/greencity-financial"
    ]);
    expect(getRouteMetadata("/")).toMatchObject({
      title: "Khalid Oyeneye | Fullstack SaaS Web and Mobile Engineer",
      canonicalPath: "/",
      type: "website"
    });
    expect(getRouteMetadata("/projects/relayops/")).toMatchObject({
      title: "RelayOps | Khalid Oyeneye",
      canonicalPath: "/projects/relayops",
      image: "/images/projects/relayops/social-preview.webp",
      type: "article"
    });
    expect(getRouteMetadata("/projects/tci-podcast")).toMatchObject({
      title: "TCI Podcast | Khalid Oyeneye",
      canonicalPath: "/projects/tci-podcast",
      image: "/images/projects/tci-podcast/tci-podcast.webp",
      type: "article"
    });
    expect(getRouteMetadata("/projects/afrogrids")).toMatchObject({
      image: "/images/projects/afrogrids/social-preview.webp",
      canonicalPath: "/projects/afrogrids"
    });
    expect(getRouteMetadata("/projects/greencity-financial")).toMatchObject({
      image: "/images/projects/greencity-financial/social-preview.webp",
      canonicalPath: "/projects/greencity-financial"
    });
    expect(getRouteMetadata("/projects/incoming-05")).toMatchObject({
      title: "Page not found | Khalid Oyeneye",
      canonicalPath: "/projects/incoming-05",
      type: "website"
    });
  });

  it("builds canonical URLs and safe external-link attributes", () => {
    expect(SITE_URL).toBe("https://khalidoyeneye.dev");
    expect(absoluteUrl("/projects/relayops")).toBe("https://khalidoyeneye.dev/projects/relayops");
    expect(externalLinkProps).toEqual({ target: "_blank", rel: "noreferrer noopener" });
  });

  it("merges conditional Tailwind classes predictably", () => {
    const includeHidden = false;
    expect(cn("px-2", includeHidden ? "hidden" : undefined, ["text-white"], "px-4")).toBe(
      "text-white px-4"
    );
  });
});
