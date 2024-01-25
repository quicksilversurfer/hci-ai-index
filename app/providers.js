"use client";
import React from "react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      suppressHydrationWarning="true"
    >
      {children}
    </ThemeProvider>
  );
}
