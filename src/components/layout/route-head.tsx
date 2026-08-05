import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  absoluteUrl,
  getRouteMetadata,
  getStructuredData,
  SITE_NAME
} from "@/helpers/route-metadata";

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
    setMeta('meta[name="author"]', { name: "author", content: SITE_NAME });
    setMeta('meta[name="robots"]', { name: "robots", content: metadata.robots });
    setMeta('meta[property="og:title"]', { property: "og:title", content: metadata.title });
    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: metadata.description
    });
    setMeta('meta[property="og:type"]', { property: "og:type", content: metadata.type });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    setMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    setMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: metadata.imageAlt
    });
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    setMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_NG" });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: metadata.title });
    setMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: metadata.description
    });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });
    setMeta('meta[name="twitter:image:alt"]', {
      name: "twitter:image:alt",
      content: metadata.imageAlt
    });

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;

    const structuredData = getStructuredData(location.pathname);
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
