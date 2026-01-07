"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import clsx from "clsx";





export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const linkColor =
    mounted &&
    (theme === "light" ? "!text-[#072ac8]" : "!text-[#d0a215]");

  return (
    <footer className="w-full mt-24 font-supreme text-lg tracking-wide text-base-500 dark:text-base-400">
      <div className="border-t border-t-base-200 dark:border-t-base-800 bg-background dark:bg-base-950/50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 2xl:px-0 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-8">
          <div>
            <Link
              href="/about"
              className={clsx("link-style", linkColor)}
            >
              about
            </Link>
          </div>
          <div className="flex flex-row items-center gap-1">
            <span>by</span>
            <a
              href="https://www.prateeksolanki.com/"
              className={clsx("link-style", linkColor)}
            >
              prateek solanki
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}
