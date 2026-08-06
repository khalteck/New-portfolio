/* global URL, window */

const canonicalOrigin = "https://khalidoyeneye.dev";

if (window.location.hostname.endsWith(".github.io")) {
  const routeSegments = window.location.pathname.split("/").filter(Boolean).slice(1);
  const target = new URL(`/${routeSegments.join("/")}`, canonicalOrigin);
  target.search = window.location.search;
  target.hash = window.location.hash;
  window.location.replace(target.href);
}
