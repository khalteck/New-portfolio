import { publishedProjects } from "@/data/portfolio";
import type { RouteMetadata } from "@/types/portfolio";

export const SITE_URL = "https://khalidoyeneye.dev";

const homeMetadata: RouteMetadata = {
  title: "Khalid Oyeneye — Senior Frontend Engineer",
  description:
    "Senior Frontend Engineer in Lagos building accessible, high-performance product experiences for international teams and clients.",
  canonicalPath: "/",
  image: "/images/og/khalid-oyeneye-portfolio.png",
  type: "website",
  robots: "index, follow"
};

export const getRouteMetadata = (pathname: string): RouteMetadata => {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

  if (normalizedPath === "/") return homeMetadata;

  const project = publishedProjects.find(
    (candidate) => `/projects/${candidate.slug}` === normalizedPath
  );

  if (project) {
    return {
      title: `${project.title} — Khalid Oyeneye`,
      description: project.shortDescription,
      canonicalPath: `/projects/${project.slug}`,
      image:
        project.slug === "relayops"
          ? "/images/projects/relayops/social-preview.png"
          : "/images/projects/tci-podcast/tci-podcast-1440.webp",
      type: "article",
      robots: "index, follow"
    };
  }

  return {
    title: "Page not found — Khalid Oyeneye",
    description: "The requested portfolio page could not be found.",
    canonicalPath: normalizedPath,
    image: homeMetadata.image,
    type: "website",
    robots: "noindex, nofollow"
  };
};

export const absoluteUrl = (path: string): string => new URL(path, SITE_URL).toString();
