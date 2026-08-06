import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from "react";

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
        <main className="not-found" id="main-content">
          <p className="eyebrow">Unexpected error</p>
          <h1 tabIndex={-1}>This page could not be loaded.</h1>
          <p>Reload the page or return to the portfolio.</p>
          <a className="magnetic-link magnetic-link--primary" href="/">
            <span>Return home</span>
          </a>
        </main>
      );
    }
    return this.props.children;
  }
}
