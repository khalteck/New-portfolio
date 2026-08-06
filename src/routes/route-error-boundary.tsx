import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from "react";
import {
  actionLinkBase,
  actionLinkVariants,
  eyebrowClass,
  notFoundHeading,
  notFoundLayout
} from "@/styles/classes";

interface RouteErrorBoundaryState {
  error?: Error;
}

export class RouteErrorBoundary extends Component<PropsWithChildren, RouteErrorBoundaryState> {
  state: RouteErrorBoundaryState = {};

  static getDerivedStateFromError(error: Error): RouteErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error("Portfolio route error", error, info);
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        <main className={notFoundLayout} id="main-content">
          <p className={eyebrowClass}>Unexpected error</p>
          <h1 className={notFoundHeading} tabIndex={-1}>
            This page could not be loaded.
          </h1>
          <p className="text-muted">Reload the page or return to the portfolio.</p>
          <a className={`${actionLinkBase} ${actionLinkVariants.primary}`} href="/">
            <span>Return home</span>
          </a>
        </main>
      );
    }
    return this.props.children;
  }
}
