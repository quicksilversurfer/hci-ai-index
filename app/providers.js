"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
import { AnnotationProvider } from "@/contexts/AnnotationContext";

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      suppressHydrationWarning="true"
    >
      <AnnotationProvider>
        {children}
      </AnnotationProvider>
    </ThemeProvider>
  );
}
