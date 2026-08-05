import { portfolio, publishedProjects } from "@/data/portfolio";
import type { PublishedProject } from "@/types/portfolio";

export const getPublishedProject = (slug: string | undefined): PublishedProject | undefined =>
  publishedProjects.find((project) => project.slug === slug);

export const getAdjacentProjects = (
  slug: string
): { previous: PublishedProject; next: PublishedProject } | undefined => {
  const index = publishedProjects.findIndex((project) => project.slug === slug);
  if (index < 0) return undefined;

  const previous =
    publishedProjects[(index - 1 + publishedProjects.length) % publishedProjects.length];
  const next = publishedProjects[(index + 1) % publishedProjects.length];

  return previous && next ? { previous, next } : undefined;
};

export const hasOnlySafeIncomingProjects = (): boolean =>
  portfolio.projects
    .filter((project) => project.status === "incoming")
    .every(
      (project) =>
        !("slug" in project) &&
        !("liveUrl" in project) &&
        !("sourceUrl" in project) &&
        !("outcomes" in project)
    );
