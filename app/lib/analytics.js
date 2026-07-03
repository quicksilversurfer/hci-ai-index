"use client";

import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const fallbackDistinctIdKey = "hci_index_distinct_id";

function getDistinctId() {
  const sdkDistinctId =
    window.posthog?.get_distinct_id?.() || posthog.get_distinct_id?.();

  if (sdkDistinctId) return sdkDistinctId;

  const existingDistinctId = window.localStorage.getItem(fallbackDistinctIdKey);
  if (existingDistinctId) return existingDistinctId;

  const nextDistinctId = window.crypto?.randomUUID?.() || `${Date.now()}`;
  window.localStorage.setItem(fallbackDistinctIdKey, nextDistinctId);
  return nextDistinctId;
}

export function captureAnalyticsEvent(eventName, properties = {}) {
  if (typeof window === "undefined") {
    return;
  }

  if (!posthogKey) return;

  const eventProperties = {
    site: "hci_index",
    app_env: process.env.NODE_ENV,
    current_path: window.location.pathname,
    current_url: window.location.href,
    host: window.location.host,
    distinct_id: getDistinctId(),
    ...properties,
  };
  const payload = JSON.stringify({
    api_key: posthogKey,
    event: eventName,
    properties: eventProperties,
  });
  const captureUrl = `${posthogHost.replace(/\/$/, "")}/capture/`;

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      captureUrl,
      new Blob([payload], { type: "application/json" }),
    );
    return;
  }

  fetch(captureUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}
