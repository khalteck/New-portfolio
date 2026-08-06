import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";

const root = process.cwd();
const dist = path.resolve(root, "dist");
const serverEntry = path.resolve(root, ".prerender/entry-server.js");
const { getPrerenderRoutes } = await import(pathToFileURL(serverEntry).href);
if (typeof getPrerenderRoutes !== "function")
  throw new Error("SSR bundle does not export getPrerenderRoutes().");

const canonicalOrigin = "https://khalidoyeneye.dev";
const routes = getPrerenderRoutes();
const required = [
  ...routes.map(({ output }) => output),
  "khalid-oyeneye-resume.pdf",
  "robots.txt",
  "sitemap.xml",
  "manifest.webmanifest"
];

const resolveDist = (relative) => {
  const target = path.resolve(dist, relative);
  if (!target.startsWith(`${dist}${path.sep}`) && target !== dist) {
    throw new Error(`Path escaped dist: ${relative}`);
  }
  return target;
};

await Promise.all(required.map((file) => access(resolveDist(file))));

const documents = await Promise.all(
  required
    .filter((file) => file.endsWith(".html"))
    .map(async (file) => [file, await readFile(resolveDist(file), "utf8")])
);

for (const [file, html] of documents) {
  const route = routes.find(({ output }) => output === file);
  if (!route) throw new Error(`${file} does not have a prerender route.`);

  if (!html.includes('id="root">')) {
    throw new Error(`${file} is missing prerendered content.`);
  }
  const expectedCanonical = new URL(route.url, canonicalOrigin).toString();
  const canonicals = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/gi)].map(
    (match) => match[1]
  );
  if (canonicals.length !== 1 || canonicals[0] !== expectedCanonical) {
    throw new Error(
      `${file} must contain exactly one canonical URL for ${expectedCanonical}; found ${canonicals.join(", ") || "none"}.`
    );
  }
  for (const name of ["description", "author"]) {
    const matches = [...html.matchAll(new RegExp(`<meta\\s+name="${name}"`, "gi"))];
    if (matches.length !== 1) {
      throw new Error(`${file} must contain exactly one ${name} meta tag.`);
    }
  }
  const robotsTags = [...html.matchAll(/<meta\s+name="robots"\s+content="([^"]+)"\s*\/?>/gi)].map(
    (match) => match[1]
  );
  if (robotsTags.length !== 1) {
    throw new Error(`${file} must contain exactly one robots meta tag.`);
  }
  if (file !== "404.html" && !html.includes("application/ld+json")) {
    throw new Error(`${file} is missing structured data.`);
  }
  if (file === "404.html" && !html.includes('name="robots" content="noindex, nofollow"')) {
    throw new Error("404.html must not be indexable.");
  }
}

const home = documents.find(([file]) => file === "index.html")?.[1] ?? "";
const fetchedTags = [...home.matchAll(/<(?:script|link|img)\b[^>]*>/gi)].map((match) => match[0]);
const initialReferences = fetchedTags.flatMap((tag) => {
  if (tag.startsWith("<img") && /loading="lazy"/i.test(tag)) return [];
  const reference = tag.match(/(?:src|href)="(\/[^"]+)"/i)?.[1];
  return reference ? [reference] : [];
});
const pendingReferences = [...new Set(initialReferences)];
const inspectedReferences = new Set();
const compressibleExtensions = new Set([".css", ".html", ".js", ".json", ".svg", ".xml"]);
const transferBytes = (file, content) =>
  compressibleExtensions.has(path.extname(file))
    ? gzipSync(content).byteLength
    : content.byteLength;

let initialTransfer = gzipSync(home).byteLength;
let initialJavaScript = 0;

while (pendingReferences.length) {
  const reference = pendingReferences.shift();
  if (!reference || inspectedReferences.has(reference)) continue;
  inspectedReferences.add(reference);

  const file = resolveDist(reference.slice(1));
  const content = await readFile(file);
  const transferred = transferBytes(file, content);
  initialTransfer += transferred;
  if (reference.endsWith(".js")) initialJavaScript += transferred;

  if (reference.endsWith(".css")) {
    const css = content.toString("utf8");
    for (const match of css.matchAll(/url\(["']?(\/[^"')]+)["']?\)/g)) {
      const dependency = match[1];
      if (dependency && !inspectedReferences.has(dependency)) pendingReferences.push(dependency);
    }
  }
}

const imageRoot = resolveDist("images/projects");
const collectFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const target = path.join(directory, entry.name);
      return entry.isDirectory() ? collectFiles(target) : [target];
    })
  );
  return nested.flat();
};

for (const image of await collectFiles(imageRoot)) {
  const size = (await stat(image)).size;
  if (size > 250 * 1024) throw new Error(`${path.relative(dist, image)} exceeds 250 KiB.`);
}

if (initialJavaScript > 250 * 1024) {
  throw new Error(`Initial JavaScript is ${(initialJavaScript / 1024).toFixed(1)} KiB gzip.`);
}
if (initialTransfer > 1.5 * 1024 * 1024) {
  throw new Error(`Initial transfer is ${(initialTransfer / 1024 / 1024).toFixed(2)} MiB gzip.`);
}

const sitemap = await readFile(resolveDist("sitemap.xml"), "utf8");
if (sitemap.includes("incoming")) throw new Error("Sitemap contains an incoming-project route.");
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  if (!match[1].startsWith(`${canonicalOrigin}/`)) {
    throw new Error(`Sitemap contains a non-canonical origin: ${match[1]}`);
  }
}

const robots = await readFile(resolveDist("robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`)) {
  throw new Error("robots.txt does not advertise the canonical sitemap URL.");
}

console.log(
  `Static validation passed: ${(initialJavaScript / 1024).toFixed(1)} KiB initial JS gzip, ${(initialTransfer / 1024).toFixed(1)} KiB initial transfer.`
);
