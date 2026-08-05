import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { portfolio, publishedProjects } from "@/data/portfolio";
import { absoluteUrl, getRouteMetadata } from "@/helpers/route-metadata";

const setMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.append(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
};

export function RouteHead() {
  const location = useLocation();

  useEffect(() => {
    const metadata = getRouteMetadata(location.pathname);
    const canonicalUrl = absoluteUrl(metadata.canonicalPath);
    const imageUrl = absoluteUrl(metadata.image);
    document.title = metadata.title;

    setMeta('meta[name="description"]', { name: "description", content: metadata.description });
    setMeta('meta[name="robots"]', { name: "robots", content: metadata.robots });
    setMeta('meta[property="og:title"]', { property: "og:title", content: metadata.title });
    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: metadata.description
    });
    setMeta('meta[property="og:type"]', { property: "og:type", content: metadata.type });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    setMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;

    const project = publishedProjects.find(
      (candidate) => `/projects/${candidate.slug}` === metadata.canonicalPath
    );
    const structuredData = project
      ? {
          "@context": "https://schema.org",
          "@type": project.slug === "relayops" ? "SoftwareApplication" : "CreativeWork",
          name: project.title,
          description: project.shortDescription,
          creator: { "@type": "Person", name: portfolio.profile.name },
          dateCreated: project.year,
          url: project.liveUrl,
          codeRepository: project.sourceUrl,
          programmingLanguage: project.technologies
        }
      : metadata.canonicalPath === "/"
        ? {
            "@context": "https://schema.org",
            "@type": "Person",
            name: portfolio.profile.name,
            jobTitle: portfolio.profile.role,
            email: `mailto:${portfolio.profile.email}`,
            address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
            sameAs: portfolio.socialLinks.map((social) => social.href),
            url: absoluteUrl("/")
          }
        : undefined;

    let script = document.head.querySelector<HTMLScriptElement>("#portfolio-structured-data");
    if (!structuredData) {
      script?.remove();
      return;
    }
    if (!script) {
      script = document.createElement("script");
      script.id = "portfolio-structured-data";
      script.type = "application/ld+json";
      document.head.append(script);
    }
    script.text = JSON.stringify(structuredData);
  }, [location.pathname]);

  return null;
}
