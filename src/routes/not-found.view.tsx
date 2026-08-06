import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundView() {
  return (
    <main className="not-found" id="main-content">
      <p className="eyebrow">404 · Page not found</p>
      <h1 tabIndex={-1}>This page is not available.</h1>
      <p>Check the address or return to the portfolio.</p>
      <Link className="magnetic-link magnetic-link--primary" to="/">
        <span>
          <ArrowLeft aria-hidden="true" /> Return home
        </span>
      </Link>
    </main>
  );
}
