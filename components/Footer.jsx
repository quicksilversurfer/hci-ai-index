"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import clsx from "clsx";

function HeartIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
    </svg>
  );
}



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
          <div className="flex flex-row items-center gap-1 text-sm sm:text-lg">
            <span>by</span>
            <a
              href="https://www.prateeksolanki.com/"
              className={clsx("link-style", linkColor)}
            >
              prateek solanki
            </a>
            <HeartIcon className="mx-1 inline-block w-4 h-4 text-flexoki-red-600 dark:text-flexoki-red-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}
