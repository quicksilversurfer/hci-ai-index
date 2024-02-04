"use client";
import React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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

export default function Header() {
  let [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const pathname = usePathname();
  const isIndexPage = pathname === "/";

  return (
    <header
      className={clsx(
        "w-full sticky top-0 left-0 z-50 flex flex-wrap justify-between px-4 sm:px-8 2xl:px-0 py-10 bg-base-paper dark:bg-base-black transition duration-500 dark:shadow-none",
        isScrolled
          ? "bg-base-paper/95 backdrop-blur-sm [@supports(backdrop-filter:blur(0))]:bg-base-paper/5 dark:bg-base-black/5 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-base-black/5"
          : "bg-transparent dark:bg-transparent"
      )}
    >
      <nav
        className={clsx(
          "flex font-light font-sans max-w-screen-2xl mx-auto w-full h-6",
          isIndexPage ? "justify-end" : "justify-between"
        )}
      >
        {!isIndexPage && (
          <Link
            href="/"
            className={clsx(
              "text-[#072ac8] transition-all scale-1 duration-300",
              isScrolled ? "scale-0" : "dark:text-[#d0a215]"
            )}
          >
            <span className="sr-only">Go back to homepage</span>
            <BackArrowIcon />
          </Link>
        )}
        <div className="relative left-0 top-0">
          <ThemeSelector
            className={clsx("absolute top-0 left-0", !isScrolled && "hidden")}
          />
          <a
            href="#top"
            className={clsx(
              "rounded-full w-8 h-8 bg-base-950 absolute top-0 left-0 transition-all scale-1 duration-300 flex justify-center",
              !isScrolled && "scale-0"
            )}
          >
            <TopArrowIcon className="w-5 h-5 text-base-200 dark:text-base-300 mt-1.5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
