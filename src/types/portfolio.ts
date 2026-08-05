export type SocialPlatform = "GitHub" | "LinkedIn";

export interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  summary: string;
  availability: string;
  resumeUrl: string;
}

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
}

export interface Metric {
  value: string;
  label: string;
  basis: string;
  visible: boolean;
}

export interface Capability {
  title: string;
  description: string;
}

export interface TechnologyGroup {
  title: string;
  icon: "code" | "state" | "server" | "quality";
  technologies: readonly string[];
}

export interface Experience {
  company: string;
  location: string;
  title: string;
  start: string;
  end: string;
  summary: string;
  achievements: readonly string[];
  technologies: readonly string[];
  companyUrl?: string;
}

export interface ProjectImage {
  src: string;
  webpSrc: string;
  width: number;
  height: number;
  alt: string;
  sizes?: string;
  avifSrcSet?: string;
  webpSrcSet?: string;
  caption?: string;
}

export interface PublishedProject {
  status: "published";
  number: string;
  slug: string;
  title: string;
  year?: string;
  role: string;
  shortDescription: string;
  overview: string;
  technologies: readonly string[];
  preview: ProjectImage;
  gallery: readonly ProjectImage[];
  problem: readonly string[];
  solution: readonly string[];
  responsibilities: readonly string[];
  challenges: readonly string[];
  outcomes: readonly string[];
  liveUrl?: string;
  sourceUrl?: string;
  sourceNote: string;
}

export interface IncomingProject {
  status: "incoming";
  number: string;
  id: string;
  title: string;
  shortDescription: string;
  previewLabel: string;
}

export type PortfolioProject = PublishedProject | IncomingProject;

export interface PortfolioContent {
  profile: Profile;
  socialLinks: readonly SocialLink[];
  metrics: readonly Metric[];
  philosophy: string;
  about: readonly string[];
  capabilities: readonly Capability[];
  technologyGroups: readonly TechnologyGroup[];
  experiences: readonly Experience[];
  projects: readonly PortfolioProject[];
}

export interface RouteMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  image: string;
  type: "website" | "article";
  robots: "index, follow" | "noindex, nofollow";
}
