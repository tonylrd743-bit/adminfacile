"use client";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

type TrackingEvent = Record<string, string | number | boolean | undefined>;

const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export function trackEvent(eventName: string, params: TrackingEvent = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: eventName, ...params });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export function trackSignup() {
  trackEvent("sign_up");
  trackGoogleConversion(process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_SIGNUP);
}

export function trackCheckoutStarted(plan: string) {
  trackEvent("begin_checkout", { plan });
  trackGoogleConversion(process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_CHECKOUT);
}

export function trackPurchase(plan: string, value: number) {
  trackEvent("purchase", { plan, value, currency: "EUR" });
  trackGoogleConversion(process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_PURCHASE, value);
}

export function trackClickTryFree() {
  trackEvent("click_try_free");
}

export function trackLandingCta(page: string) {
  trackEvent("landing_cta_click", { page });
}

export function trackContactClick(source: string) {
  trackEvent("contact_click", { source });
}

function trackGoogleConversion(label: string | undefined, value?: number) {
  if (!adsId || !label || typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", "conversion", {
    send_to: `${adsId}/${label}`,
    value,
    currency: value ? "EUR" : undefined
  });
}
