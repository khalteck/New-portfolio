import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  actionLinkBase,
  actionLinkVariants,
  eyebrowClass,
  notFoundHeading,
  notFoundLayout
} from "@/styles/classes";

export function NotFoundView() {
  return (
    <main className={notFoundLayout} id="main-content">
      <p className={eyebrowClass}>404 · Page not found</p>
      <h1 className={notFoundHeading} tabIndex={-1}>
        This page is not available.
      </h1>
      <p className="text-muted">Check the address or return to the portfolio.</p>
      <Link className={`${actionLinkBase} ${actionLinkVariants.primary}`} to="/">
        <span>
          <ArrowLeft aria-hidden="true" /> Return home
        </span>
      </Link>
    </main>
  );
}
