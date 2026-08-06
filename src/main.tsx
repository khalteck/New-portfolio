import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { PUBLISHED_PROJECT_PATHS } from "./helpers/route-metadata";
import "./styles/index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Portfolio root element was not found.");

const application = (
  <StrictMode>
    <App />
  </StrictMode>
);

const normalizedPath = window.location.pathname.replace(/\/$/, "") || "/";
const prerenderedRoutes = new Set(["/", ...PUBLISHED_PROJECT_PATHS]);

if (root.hasChildNodes() && prerenderedRoutes.has(normalizedPath)) {
  hydrateRoot(root, application);
} else {
  // Netlify's SPA fallback serves home markup for unknown paths. Clear that
  // snapshot before rendering the branded 404 to avoid a hydration mismatch.
  root.replaceChildren();
  createRoot(root).render(application);
}
