"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
import { AnnotationProvider } from "@/contexts/AnnotationContext";
import PostHogPageView from "@/components/analytics/PostHogPageView";

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      suppressHydrationWarning="true"
    >
      <AnnotationProvider>
        <PostHogPageView />
        {children}
      </AnnotationProvider>
    </ThemeProvider>
  );
}
