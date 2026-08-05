export const OPEN_ANALYTICS_PREFERENCES_EVENT = "portfolio:open-analytics-preferences";

export const getAnalyticsMeasurementId = () => {
  const value = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
  return value && /^G-[A-Z0-9]+$/i.test(value) ? value : undefined;
};

export const isAnalyticsConfigured = () => Boolean(getAnalyticsMeasurementId());

export const openAnalyticsPreferences = () => {
  window.dispatchEvent(new Event(OPEN_ANALYTICS_PREFERENCES_EVENT));
};
