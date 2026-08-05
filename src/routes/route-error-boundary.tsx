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
          <p className="eyebrow">Something went wrong</p>
          <h1 tabIndex={-1}>The page hit an unexpected boundary.</h1>
          <p>Reload the page or return to the portfolio home.</p>
          <a className="magnetic-link magnetic-link--primary" href="/">
            <span>Return home</span>
          </a>
        </main>
      );
    }
    return this.props.children;
  }
}
