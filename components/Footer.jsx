"use client";

import Link from "next/link";
import { captureAnalyticsEvent } from "@/app/lib/analytics";

export default function Footer() {
  return (
    <footer className="w-full mt-24 font-supreme text-lg tracking-wide text-base-500 dark:text-base-400">
      <div className="border-t border-t-base-200 dark:border-t-base-800 bg-background dark:bg-base-950/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 2xl:px-0 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-8">
          <div>
            <Link href="/about" className="link-style">
              about
            </Link>
          </div>
          <div className="flex flex-row items-center gap-1">
            <span>by</span>
            <a
              href="https://www.prateeksolanki.com/"
              className="link-style"
              onClick={() => {
                captureAnalyticsEvent("outbound_link_clicked", {
                  link_label: "prateek solanki",
                  link_destination: "https://www.prateeksolanki.com/",
                  link_context: "footer",
                });
              }}
            >
              prateek solanki
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
