import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomeView } from "@/modules/home";
import { NotFoundView } from "./not-found.view";
import { RouteErrorBoundary } from "./route-error-boundary";
import { notFoundLayout } from "@/styles/classes";

const ProjectCaseStudyView = lazy(
  async () => import("@/modules/projects/views/project-case-study.view")
);

export function AppRoutes() {
  const location = useLocation();

  return (
    <RouteErrorBoundary key={location.pathname}>
      <Suspense
        fallback={
          <main className={notFoundLayout} id="main-content" aria-live="polite">
            Loading project…
          </main>
        }
      >
        <Routes location={location}>
          <Route path="/" element={<HomeView />} />
          <Route path="/projects/:slug" element={<ProjectCaseStudyView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
    </RouteErrorBoundary>
  );
}
