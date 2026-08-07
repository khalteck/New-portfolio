import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { getAnalyticsMeasurementId, OPEN_ANALYTICS_PREFERENCES_EVENT } from "@/helpers/analytics";
import { getRouteMetadata } from "@/helpers/route-metadata";

type AnalyticsConsent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_STORAGE_KEY = "khalid-portfolio-analytics-consent";

const readConsent = (): AnalyticsConsent | undefined => {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : undefined;
  } catch {
    return undefined;
  }
};

const storeConsent = (value: AnalyticsConsent) => {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Consent still applies to the current page when storage is unavailable.
  }
};

const ensureCommandQueue = () => {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });
};

const updateGoogleConsent = (consent: AnalyticsConsent) => {
  ensureCommandQueue();
  window.gtag?.("consent", "update", {
    analytics_storage: consent,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });
};

export function GoogleAnalytics() {
  const location = useLocation();
  const measurementId = getAnalyticsMeasurementId();
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<AnalyticsConsent | undefined>(() =>
    typeof window === "undefined" ? undefined : readConsent()
  );
  const [noticeOpen, setNoticeOpen] = useState(() => !consent);
  const initialized = useRef(false);
  const lastPageView = useRef("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const openPreferences = () => setNoticeOpen(true);
    window.addEventListener(OPEN_ANALYTICS_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_ANALYTICS_PREFERENCES_EVENT, openPreferences);
  }, []);

  useEffect(() => {
    if (!noticeOpen || consent === "granted") return;

    // Continuing to use the site (scrolling, clicking, typing) counts as accepting the notice.
    const acceptByStaying = () => {
      storeConsent("granted");
      setConsent("granted");
      setNoticeOpen(false);
    };

    window.addEventListener("pointerdown", acceptByStaying);
    window.addEventListener("keydown", acceptByStaying);
    window.addEventListener("scroll", acceptByStaying, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", acceptByStaying);
      window.removeEventListener("keydown", acceptByStaying);
      window.removeEventListener("scroll", acceptByStaying);
    };
  }, [noticeOpen, consent]);

  useEffect(() => {
    if (!measurementId || consent !== "granted") return;

    ensureCommandQueue();
    updateGoogleConsent("granted");

    if (!initialized.current) {
      if (!document.head.querySelector('script[data-portfolio-analytics="true"]')) {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
        script.dataset.portfolioAnalytics = "true";
        document.head.append(script);
      }
      window.gtag?.("js", new Date());
      window.gtag?.("config", measurementId, { send_page_view: false });
      initialized.current = true;
    }

    const pageKey = `${location.pathname}${location.search}`;
    if (lastPageView.current === pageKey) return;
    lastPageView.current = pageKey;
    const metadata = getRouteMetadata(location.pathname);
    window.gtag?.("event", "page_view", {
      page_title: metadata.title,
      page_location: `${window.location.origin}${pageKey}`,
      page_path: pageKey
    });
  }, [consent, location.pathname, location.search, measurementId]);

  useEffect(() => {
    if (!measurementId || consent !== "granted") return;

    const trackClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const tracked = target?.closest<HTMLElement>("[data-analytics-event]");
      const eventName = tracked?.dataset.analyticsEvent;
      if (!eventName) return;
      window.gtag?.("event", eventName, {
        item_name: tracked.dataset.analyticsLabel,
        page_path: `${window.location.pathname}${window.location.search}`
      });
    };

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, [consent, measurementId]);

  if (!mounted || !measurementId || !noticeOpen) return null;

  const dismissNotice = () => {
    storeConsent("granted");
    setConsent("granted");
    setNoticeOpen(false);
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[400] flex items-center justify-center gap-3 border-t border-line-bright bg-[rgb(24_28_23/92%)] px-4 py-2.5 text-[0.72rem] text-muted backdrop-blur-[20px] backdrop-saturate-150 max-md:pb-[calc(0.65rem+env(safe-area-inset-bottom))]"
      role="status"
    >
      <p className="m-0">
        By staying on this site, you accept our privacy policy and use of analytics.
      </p>
      <button
        className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-full border border-line-bright bg-transparent text-copy [&_svg]:w-3.5"
        type="button"
        aria-label="Dismiss privacy notice"
        onClick={dismissNotice}
      >
        <X aria-hidden="true" />
      </button>
    </div>
  );
}
