import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundView() {
  return (
    <main className="not-found" id="main-content">
      <p className="eyebrow">404 · Off route</p>
      <h1 tabIndex={-1}>This page left no forwarding address.</h1>
      <p>The requested route is not part of Khalid’s published portfolio.</p>
      <Link className="magnetic-link magnetic-link--primary" to="/">
        <span>
          <ArrowLeft aria-hidden="true" /> Return home
        </span>
      </Link>
    </main>
  );
}
