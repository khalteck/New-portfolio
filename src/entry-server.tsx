import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { App } from "./App";
import {
  absoluteUrl,
  getRouteMetadata,
  getStructuredData,
  PUBLISHED_PROJECT_PATHS,
  SITE_NAME
} from "./helpers/route-metadata";

export const getPrerenderRoutes = (): Array<{ url: string; output: string }> => [
  { url: "/", output: "index.html" },
  ...PUBLISHED_PROJECT_PATHS.map((url) => ({ url, output: `${url.slice(1)}/index.html` })),
  { url: "/not-found", output: "404.html" }
];

const escapeAttribute = (value: string): string =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

const renderHead = (pathname: string): string => {
  const metadata = getRouteMetadata(pathname);
  const canonical = absoluteUrl(metadata.canonicalPath);
  const image = absoluteUrl(metadata.image);
  const structuredData = getStructuredData(metadata.canonicalPath);
  const jsonLd = structuredData
    ? JSON.stringify(structuredData).replaceAll("<", "\\u003c")
    : undefined;
  return [
    `<title>${escapeAttribute(metadata.title)}</title>`,
    `<meta name="description" content="${escapeAttribute(metadata.description)}">`,
    `<meta name="author" content="${SITE_NAME}">`,
    `<meta name="robots" content="${metadata.robots}">`,
    `<link rel="canonical" href="${escapeAttribute(canonical)}">`,
    `<meta property="og:title" content="${escapeAttribute(metadata.title)}">`,
    `<meta property="og:description" content="${escapeAttribute(metadata.description)}">`,
    `<meta property="og:type" content="${metadata.type}">`,
    `<meta property="og:url" content="${escapeAttribute(canonical)}">`,
    `<meta property="og:image" content="${escapeAttribute(image)}">`,
    `<meta property="og:image:alt" content="${escapeAttribute(metadata.imageAlt)}">`,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    '<meta property="og:locale" content="en_NG">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escapeAttribute(metadata.title)}">`,
    `<meta name="twitter:description" content="${escapeAttribute(metadata.description)}">`,
    `<meta name="twitter:image" content="${escapeAttribute(image)}">`,
    `<meta name="twitter:image:alt" content="${escapeAttribute(metadata.imageAlt)}">`,
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
