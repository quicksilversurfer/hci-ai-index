/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

import AllCollections from "@/components/collection/AllCollections";
import AllCollectionsSkeleton from "@/components/collection/AllCollectionsSkeleton";
import Sparkles from "@/components/Sparkles";

import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col px-4 2xl:px-0 grow max-w-screen-2xl mx-auto">
      <h1 className="font-display text-8xl mr-4 sm:mr-0 mb-8 mt-24">
        hci index
      </h1>
      <h2 className="font-display text-3xl text-pretty max-w-[55ch] text-base-600 dark:text-base-500">
        a practiotioner's guide to hci literature — organized to enhance
        understanding and spark curiosity — made using ai{" "}
        <span aria-label="Please vist the disclaimer page through a link in the footer">
          *
        </span>
      </h2>
      <h3 className="text-3xl text-pretty font-display max-w-[55ch] text-base-600 dark:text-base-500 mt-4">
        browse through the collections below or{" "}
        <Sparkles>
          <Link href="/create" className="text-base-300 link-style">
            generate your own
          </Link>
        </Sparkles>
      </h3>
      <Suspense fallback={<AllCollectionsSkeleton />}>
        <AllCollections />
      </Suspense>
    </main>
  );
}
