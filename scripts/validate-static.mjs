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

const required = [
  ...getPrerenderRoutes().map(({ output }) => output),
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
  if (!html.includes('id="root">')) {
    throw new Error(`${file} is missing prerendered content.`);
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

console.log(
  `Static validation passed: ${(initialJavaScript / 1024).toFixed(1)} KiB initial JS gzip, ${(initialTransfer / 1024).toFixed(1)} KiB initial transfer.`
);
