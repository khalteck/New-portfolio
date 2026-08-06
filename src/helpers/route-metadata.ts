import { portfolio, publishedProjects } from "@/data/portfolio";
import type { RouteMetadata } from "@/types/portfolio";

export const SITE_URL = "https://khalidoyeneye.dev";
export const SITE_NAME = "Khalid Oyeneye";
export const PUBLISHED_PROJECT_PATHS = publishedProjects.map(
  (project) => `/projects/${project.slug}` as const
);

const homeMetadata: RouteMetadata = {
  title: "Khalid Oyeneye | Fullstack SaaS Web and Mobile Engineer",
  description:
    "Fullstack SaaS engineer building production web platforms and mobile applications for teams in Nigeria and worldwide.",
  canonicalPath: "/",
  image: "/images/og/khalid-oyeneye-portfolio.png",
  imageAlt: "Khalid Oyeneye, Fullstack SaaS Engineer portfolio",
  type: "website",
  robots: "index, follow, max-image-preview:large"
};

export const absoluteUrl = (path: string): string => new URL(path, SITE_URL).toString();

export const getRouteMetadata = (pathname: string): RouteMetadata => {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

  if (normalizedPath === "/") return homeMetadata;

  const project = publishedProjects.find(
    (candidate) => `/projects/${candidate.slug}` === normalizedPath
  );

  if (project) {
    return {
      title: `${project.title} | Khalid Oyeneye`,
      description: project.shortDescription,
      canonicalPath: `/projects/${project.slug}`,
      image: project.preview.webpSrc,
      imageAlt: `${project.title} project case study by Khalid Oyeneye`,
      type: "article",
      robots: "index, follow, max-image-preview:large"
    };
  }

  return {
    title: "Page not found | Khalid Oyeneye",
    description: "The requested portfolio page is not available.",
    canonicalPath: normalizedPath,
    image: homeMetadata.image,
    imageAlt: homeMetadata.imageAlt,
    type: "website",
    robots: "noindex, nofollow"
  };
};

export const getStructuredData = (pathname: string) => {
  const metadata = getRouteMetadata(pathname);
  const personId = `${absoluteUrl("/")}#person`;
  const websiteId = `${absoluteUrl("/")}#website`;
  const project = publishedProjects.find(
    (candidate) => `/projects/${candidate.slug}` === metadata.canonicalPath
  );

  if (project) {
    const projectUrl = absoluteUrl(metadata.canonicalPath);
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${projectUrl}#webpage`,
          url: projectUrl,
          name: metadata.title,
          description: metadata.description,
          isPartOf: { "@id": websiteId },
          about: { "@id": `${projectUrl}#project` }
        },
        {
          "@type": project.slug === "relayops" ? "SoftwareSourceCode" : "CreativeWork",
          "@id": `${projectUrl}#project`,
          name: project.title,
          description: project.shortDescription,
          creator: { "@id": personId },
          dateCreated: project.year,
          image: absoluteUrl(metadata.image),
          url: projectUrl,
          codeRepository: project.sourceUrl,
          programmingLanguage: project.technologies
        }
      ]
    };
  }

  if (metadata.canonicalPath !== "/") return undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        url: absoluteUrl("/"),
        inLanguage: "en-NG"
      },
      {
        "@type": "ProfilePage",
        "@id": `${absoluteUrl("/")}#profile`,
        url: absoluteUrl("/"),
        name: metadata.title,
        description: metadata.description,
        inLanguage: "en-NG",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId }
      },
      {
        "@type": "Person",
        "@id": personId,
        name: portfolio.profile.name,
        jobTitle: portfolio.profile.role,
        description: portfolio.profile.summary,
        email: `mailto:${portfolio.profile.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lagos",
          addressCountry: "NG"
        },
        areaServed: ["Nigeria", "Worldwide"],
        knowsAbout: [
          "SaaS development",
          "Fullstack development",
          "Web application development",
          "Mobile application development",
          "Frontend architecture",
          "React",
          "TypeScript"
        ],
        sameAs: portfolio.socialLinks.map((social) => social.href),
        url: absoluteUrl("/")
      }
    ]
  };
};
