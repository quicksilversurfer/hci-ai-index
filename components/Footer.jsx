"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { captureAnalyticsEvent } from "@/app/lib/analytics";

function ArrowUpRightIcon(props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      {...props}
    >
      <path
        d="M6 14L14 6M8 6h6v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5"
      {...props}
    >
      <path
        d="M5.5 5.5l9 9M14.5 5.5l-9 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Footer() {
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const feedLinks = [
    {
      label: "RSS",
      href: "/rss.xml",
      format: "rss",
      type: "application/rss+xml",
      description: "Use with feed readers such as NetNewsWire, Feedly, or Reeder.",
    },
    {
      label: "Atom",
      href: "/atom.xml",
      format: "atom",
      type: "application/atom+xml",
      description: "Use when your reader or publishing tool prefers Atom.",
    },
    {
      label: "JSON Feed",
      href: "/feed.json",
      format: "json_feed",
      type: "application/feed+json",
      description: "Use for apps, automations, and modern feed clients.",
    },
  ];

  const openFeedModal = () => {
    setIsFeedModalOpen(true);
    captureAnalyticsEvent("feed_modal_opened", {
      link_context: "footer",
    });
  };

  const closeFeedModal = (closeMethod) => {
    setIsFeedModalOpen(false);
    captureAnalyticsEvent("feed_modal_closed", {
      link_context: "footer_modal",
      close_method: closeMethod,
    });
  };

  useEffect(() => {
    if (!isFeedModalOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeFeedModal("escape_key");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFeedModalOpen]);

  const trackFeedClick = (feed) => {
    captureAnalyticsEvent("feed_link_clicked", {
      feed_label: feed.label,
      feed_href: feed.href,
      feed_format: feed.format,
      feed_type: feed.type,
      link_context: "footer_modal",
    });
  };

  return (
    <footer className="w-full mt-24 font-supreme text-lg tracking-wide text-base-500 dark:text-base-400">
      <div className="border-t border-t-base-200 dark:border-t-base-800 bg-background dark:bg-base-950/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 2xl:px-0 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/about" className="link-style">
              about
            </Link>
            <Link href="/newsletters" className="link-style">
              archive
            </Link>
            <button
              type="button"
              className="link-style"
              onClick={openFeedModal}
            >
              feeds
            </button>
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

      {isFeedModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-base-black/30 px-4 py-6 backdrop-blur-sm sm:items-center"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeFeedModal("backdrop");
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="w-full max-w-lg border border-base-200 bg-base-paper p-5 text-base-900 shadow-2xl dark:border-base-800 dark:bg-base-950 dark:text-base-100"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-2">
                <h2
                  id={titleId}
                  className="font-supreme text-xl tracking-wide text-base-950 dark:text-base-50"
                >
                  feeds
                </h2>
                <p
                  id={descriptionId}
                  className="font-altSans text-sm leading-6 text-base-600 dark:text-base-400"
                >
                  subscribe to HCI Index updates in the format your reader or
                  app supports.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base-500 transition-colors hover:bg-base-100 hover:text-base-950 dark:text-base-400 dark:hover:bg-base-900 dark:hover:text-base-50"
                onClick={() => closeFeedModal("close_button")}
                aria-label="Close feeds"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mt-6 border-t border-base-200 dark:border-base-800">
              {feedLinks.map((feed, index) => (
                <a
                  key={feed.href}
                  href={feed.href}
                  type={feed.type}
                  className={[
                    "group flex items-start justify-between gap-5 py-4 transition-colors hover:text-base-950 dark:hover:text-base-50",
                    index > 0
                      ? "border-t border-base-200 dark:border-base-800"
                      : "",
                  ].join(" ")}
                  onClick={() => trackFeedClick(feed)}
                  aria-label={`Open ${feed.label} feed`}
                >
                  <span className="min-w-0">
                    <span className="block font-supreme text-base tracking-wide text-base-900 dark:text-base-100">
                      {feed.label}
                    </span>
                    <span className="mt-1 block font-altSans text-sm leading-6 text-base-600 dark:text-base-400">
                      {feed.description}
                    </span>
                  </span>
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base-500 transition-colors group-hover:bg-base-100 group-hover:text-base-950 dark:text-base-400 dark:group-hover:bg-base-900 dark:group-hover:text-base-50">
                    <ArrowUpRightIcon />
                  </span>
                </a>
              ))}
            </div>
          </section>
        </div>
      )}
    </footer>
  );
}
