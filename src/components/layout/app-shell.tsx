import { CustomCursor } from "@/components/cursor/custom-cursor";
import { PageTransition } from "@/components/motion/page-transition";
import { ParticleField } from "@/components/motion/particle-field";
import { Preloader } from "@/components/motion/preloader";
import { ScrollProgressIndicator } from "@/components/motion/scroll-progress-indicator";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { SiteNavigation } from "@/components/navigation/site-navigation";
import { AppRoutes } from "@/routes/app-routes";
import { HashScroller } from "./hash-scroller";
import { GoogleAnalytics } from "./google-analytics";
import { RouteAnnouncer } from "./route-announcer";
import { RouteHead } from "./route-head";
import { SkipLink } from "./skip-link";
import { StickyContact } from "./sticky-contact";
import { SectionNavigation } from "../navigation/section-navigation";

export function AppShell() {
  return (
    <SmoothScrollProvider>
      <RouteHead />
      <GoogleAnalytics />
      <HashScroller />
      <RouteAnnouncer />
      <SkipLink />
      <Preloader />
      <ParticleField />
      <PageTransition />
      <CustomCursor />
      <ScrollProgressIndicator />
      <StickyContact />
      <SiteNavigation />
      <SectionNavigation />
      <AppRoutes />
    </SmoothScrollProvider>
  );
}
