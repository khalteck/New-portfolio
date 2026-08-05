import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const distRoot = path.resolve(projectRoot, "dist");
const serverEntry = path.resolve(projectRoot, ".prerender/entry-server.js");
const templatePath = path.join(distRoot, "index.html");

const routes = [
  { url: "/", output: "index.html" },
  { url: "/projects/relayops", output: "projects/relayops/index.html" },
  { url: "/projects/tci-podcast", output: "projects/tci-podcast/index.html" },
  { url: "/not-found", output: "404.html" }
];

const isInsideDist = (target) => target === distRoot || target.startsWith(`${distRoot}${path.sep}`);

const template = await readFile(templatePath, "utf8");
const { render } = await import(pathToFileURL(serverEntry).href);

if (typeof render !== "function") throw new Error("SSR bundle does not export render(url).");
if (!template.includes('id="root"')) throw new Error("Client template is missing #root.");
if (!template.includes("<!--app-head-->"))
  throw new Error("Client template is missing app-head marker.");

for (const route of routes) {
  const target = path.resolve(distRoot, route.output);
  if (!isInsideDist(target)) throw new Error(`Unsafe prerender output: ${target}`);

  const result = await render(route.url);
  const document = template
    .replace(/\s*<title>.*?<\/title>/s, "")
    .replace(/\s*<link rel="canonical"[^>]*>/s, "")
    .replace("<!--app-head-->", result.head)
    .replace('<div id="root"></div>', `<div id="root">${result.html}</div>`);

  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, document, "utf8");
}

console.log(`Prerendered ${routes.length} static documents.`);
