import { useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAnalyticsMeasurementId, OPEN_ANALYTICS_PREFERENCES_EVENT } from "@/helpers/analytics";
import { getRouteMetadata } from "@/helpers/route-metadata";
import { eyebrowClass } from "@/styles/classes";

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
  const titleId = useId();
  const measurementId = getAnalyticsMeasurementId();
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<AnalyticsConsent | undefined>(() =>
    typeof window === "undefined" ? undefined : readConsent()
  );
  const [preferencesOpen, setPreferencesOpen] = useState(() => !consent);
  const initialized = useRef(false);
  const lastPageView = useRef("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const openPreferences = () => setPreferencesOpen(true);
    window.addEventListener(OPEN_ANALYTICS_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_ANALYTICS_PREFERENCES_EVENT, openPreferences);
  }, []);

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

  if (!mounted || !measurementId || !preferencesOpen) return null;

  const chooseConsent = (nextConsent: AnalyticsConsent) => {
    storeConsent(nextConsent);
    setConsent(nextConsent);
    setPreferencesOpen(false);
    if (nextConsent === "denied" && initialized.current) updateGoogleConsent("denied");
  };

  return (
    <aside
      className="fixed right-4 bottom-4 z-[400] grid w-[min(calc(100%-2rem),27rem)] gap-5 rounded-[1.25rem] border border-white/15 bg-[linear-gradient(145deg,rgb(255_255_255/10%),transparent_42%),rgb(24_28_23/84%)] p-5 shadow-[0_1.5rem_5rem_rgb(0_0_0/38%)] backdrop-blur-[24px] backdrop-saturate-150 max-md:right-3 max-md:bottom-[calc(5.5rem+env(safe-area-inset-bottom))] max-md:w-[calc(100%-1.5rem)]"
      aria-labelledby={titleId}
    >
      <div>
        <p className={eyebrowClass}>Optional analytics</p>
        <h2 className="mt-2 mb-1 font-display text-[2rem] leading-none uppercase" id={titleId}>
          Your privacy choice
        </h2>
        <p className="mb-0 text-[0.82rem] text-muted">
          Allow anonymous usage data to help improve this portfolio.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <button
          className="min-h-11 cursor-pointer rounded-full border border-line-bright bg-transparent text-[0.68rem] font-extrabold tracking-[0.08em] text-copy uppercase"
          type="button"
          onClick={() => chooseConsent("denied")}
        >
          Decline
        </button>
        <button
          className="min-h-11 cursor-pointer rounded-full border border-accent bg-accent text-[0.68rem] font-extrabold tracking-[0.08em] text-on-accent uppercase"
          type="button"
          onClick={() => chooseConsent("granted")}
        >
          Allow
        </button>
      </div>
    </aside>
  );
}
