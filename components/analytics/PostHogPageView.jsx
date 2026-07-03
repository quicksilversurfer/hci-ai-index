"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { captureAnalyticsEvent } from "@/app/lib/analytics";

function PageViewCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const queryString = searchParams?.toString();
    const pathWithQuery = queryString ? `${pathname}?${queryString}` : pathname;

    captureAnalyticsEvent("$pageview", {
      page_type: pathname.startsWith("/newsletters/")
        ? "newsletter_issue"
        : pathname === "/"
          ? "newsletter_feed"
          : pathname.replace(/^\//, "") || "home",
      path_with_query: pathWithQuery,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PageViewCapture />
    </Suspense>
  );
}
