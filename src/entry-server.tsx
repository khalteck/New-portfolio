import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { App } from "./App";
import { portfolio, publishedProjects } from "./data/portfolio";
import { absoluteUrl, getRouteMetadata } from "./helpers/route-metadata";

const escapeAttribute = (value: string): string =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

const structuredDataFor = (pathname: string) => {
  const project = publishedProjects.find((candidate) => `/projects/${candidate.slug}` === pathname);
  if (project) {
    return {
      "@context": "https://schema.org",
      "@type": project.slug === "relayops" ? "SoftwareApplication" : "CreativeWork",
      name: project.title,
      description: project.shortDescription,
      creator: { "@type": "Person", name: portfolio.profile.name },
      dateCreated: project.year,
      url: project.liveUrl,
      codeRepository: project.sourceUrl,
      programmingLanguage: project.technologies
    };
  }
  if (pathname !== "/") return null;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.profile.name,
    jobTitle: portfolio.profile.role,
    email: `mailto:${portfolio.profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
    sameAs: portfolio.socialLinks.map((social) => social.href),
    url: absoluteUrl("/")
  };
};

const renderHead = (pathname: string): string => {
  const metadata = getRouteMetadata(pathname);
  const canonical = absoluteUrl(metadata.canonicalPath);
  const image = absoluteUrl(metadata.image);
  const structuredData = structuredDataFor(metadata.canonicalPath);
  const jsonLd = structuredData
    ? JSON.stringify(structuredData).replaceAll("<", "\\u003c")
    : undefined;
  return [
    `<title>${escapeAttribute(metadata.title)}</title>`,
    `<meta name="description" content="${escapeAttribute(metadata.description)}">`,
    `<meta name="robots" content="${metadata.robots}">`,
    `<link rel="canonical" href="${escapeAttribute(canonical)}">`,
    `<meta property="og:title" content="${escapeAttribute(metadata.title)}">`,
    `<meta property="og:description" content="${escapeAttribute(metadata.description)}">`,
    `<meta property="og:type" content="${metadata.type}">`,
    `<meta property="og:url" content="${escapeAttribute(canonical)}">`,
    `<meta property="og:image" content="${escapeAttribute(image)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    jsonLd
      ? `<script id="portfolio-structured-data" type="application/ld+json">${jsonLd}</script>`
      : ""
  ]
    .filter(Boolean)
    .join("\n    ");
};

export const render = async (url: string): Promise<{ html: string; head: string }> => {
  const pathname = new URL(url, "https://khalidoyeneye.dev").pathname;
  const html = await new Promise<string>((resolve, reject) => {
    let didError = false;
    const output = new PassThrough();
    let content = "";
    output.setEncoding("utf8");
    output.on("data", (chunk: string) => {
      content += chunk;
    });
    output.on("end", () => (didError ? reject(new Error("SSR render failed.")) : resolve(content)));

    const stream = renderToPipeableStream(<App staticLocation={pathname} />, {
      onAllReady() {
        stream.pipe(output);
      },
      onShellError(error) {
        reject(error instanceof Error ? error : new Error(String(error)));
      },
      onError(error) {
        didError = true;
        console.error(error);
      }
    });
  });

  return { html, head: renderHead(pathname) };
};
