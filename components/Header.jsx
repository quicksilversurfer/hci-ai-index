"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import clsx from "clsx";

import ThemeSelector from "@/components/ThemeSelector";

function BackArrowIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
}

function TopArrowIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const NAV_LINKS = [
  // Example for future use: { label: "Collections", href: "/collections" },
];

const LINK_FONT = "font-supreme text-lg tracking-wide";
const LINK_BASE =
  "inline-flex items-center rounded-full px-3 py-1 transition-colors duration-200";
const LINK_INACTIVE =
  "text-base-600 dark:text-base-400 hover:text-base-900 dark:hover:text-base-100 hover:bg-base-100 dark:hover:bg-base-900";
const LINK_ACTIVE =
  "bg-base-900 text-base-paper dark:bg-base-50 dark:text-base-950 shadow-sm";

function isActive(pathname, href) {
  if (href === "/") {
    return pathname === "/" || pathname?.startsWith("/newsletters");
  }

  return pathname === href || pathname?.startsWith(`${href}/`);
}

function buildBreadcrumb(pathname) {
  const parts = pathname?.split("/").filter(Boolean) || [];
  if (!parts.length) return null;

  // Newsletters detail: /newsletters/[issueId]
  if (parts[0] === "newsletters" && parts[1]) {
    const rawIssueId = decodeURIComponent(parts[1]);
    const match = rawIssueId.match(/(\d{4})-?w(\d{1,2})/i);
    const formattedIssueId =
      match && !Number.isNaN(Number(match[2]))
        ? `${match[1]}-W${String(Number(match[2])).padStart(2, "0")}`
        : rawIssueId.toUpperCase();

    return [
      { label: "hci index", href: "/" },
      { label: "newsletter", href: "/" },
      { label: formattedIssueId },
    ];
  }

  // Collections index: /collections
  if (parts[0] === "collections" && parts.length === 1) {
    return [
      { label: "hci index", href: "/" },
      { label: "collections" },
    ];
  }

  // Collection detail: /collections/[id]
  if (parts[0] === "collections" && parts[1]) {
    return [
      { label: "hci index", href: "/" },
      { label: "collections", href: "/collections" },
      { label: decodeURIComponent(parts.slice(1).join("/")) },
    ];
  }

  // Generate page: /generate
  if (parts[0] === "generate") {
    return [
      { label: "hci index", href: "/" },
      { label: "collections", href: "/collections" },
      { label: "generate" },
    ];
  }

  // About page: /about
  if (parts[0] === "about") {
    return [
      { label: "hci index", href: "/" },
      { label: "about" },
    ];
  }

  // All Works page: /allWorks
  if (parts[0] === "allWorks") {
    return [
      { label: "hci index", href: "/" },
      { label: "collections", href: "/collections" },
      { label: "all works" },
    ];
  }

  return null;
}

export default function Header() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const breadcrumb = buildBreadcrumb(pathname);
  const showBreadcrumb = !!breadcrumb;
  const isDetailView =
    (pathname?.startsWith("/newsletters/") ||
      pathname?.startsWith("/collections") ||
      pathname === "/about" ||
      pathname === "/generate") &&
    breadcrumb;

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "w-full sticky top-0 left-0 z-50 transition-all duration-300"
      )}
    >
      <div
        className={clsx(
          "absolute inset-0 -z-10 h-[150%] pointer-events-none transition-opacity duration-700 ease-out",
          isScrolled ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-b from-base-paper/80 to-transparent dark:from-base-950/80 dark:to-transparent"
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-[66.66%] left-0 right-0 h-px bg-base-200/20 dark:bg-base-800/20"
        />
      </div>

      <nav className="content-shell py-3 sm:py-4 flex items-center justify-between gap-6 px-5">
        <div className="flex flex-col justify-center min-w-0 h-[34px]">
          {!showBreadcrumb ? (
            <div className="flex items-center gap-4 flex-wrap">
              {pathname !== "/" && (
                <Link
                  href="/"
                  className={clsx(
                    LINK_FONT,
                    "text-base-900 dark:text-base-100 transition-colors duration-200 hover:text-base-600 dark:hover:text-base-300"
                  )}
                >
                  hci index
                </Link>
              )}
              {NAV_LINKS.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap tracking-[0.02em]">
                  {NAV_LINKS.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                          LINK_FONT,
                          LINK_BASE,
                          active ? LINK_ACTIVE : LINK_INACTIVE
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ) : isDetailView ? (
            <Link
              href={
                pathname?.startsWith("/collections/") || pathname === "/generate"
                  ? "/collections"
                  : "/"
              }
              className={clsx(
                "transition-transform hover:-translate-x-1 duration-200",
                mounted && {
                  "text-[#072ac8]": theme === "light",
                  "text-[#d0a215]": theme === "dark" || theme === "system",
                }
              )}
              aria-label="Back to home"
            >
              <BackArrowIcon />
            </Link>
          ) : (
            <div
              className={clsx(
                LINK_FONT,
                "flex items-center flex-wrap gap-2 text-[12px] leading-4 text-base-600 dark:text-base-400"
              )}
            >
              {breadcrumb.map((part, idx) => (
                <span
                  key={`${part.label}-${idx}`}
                  className="flex items-center gap-2"
                >
                  {part.href ? (
                    <Link
                      href={part.href}
                      className="hover:text-base-900 dark:hover:text-base-100 transition-colors underline-offset-4 hover:underline"
                    >
                      {part.label}
                    </Link>
                  ) : (
                    <span>{part.label}</span>
                  )}
                  {idx < breadcrumb.length - 1 && (
                    <span className="text-base-400 dark:text-base-600">/</span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <ThemeSelector />
        </div>
      </nav>
    </header>
  );
}
