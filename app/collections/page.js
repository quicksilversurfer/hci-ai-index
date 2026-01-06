import Sparkles from "@/components/Sparkles";
import Link from "next/link";
import { Suspense } from "react";

import AllCollections from "@/components/collection/AllCollections";
import AllCollectionsSkeleton from "@/components/collection/AllCollectionsSkeleton";

export default function CollectionsPage() {
  return (
    <main className="flex flex-col w-full grow pb-content-y">
      <header className="page-header pb-rhythm-6 content-shell px-4 lg:px-6 mt-8">
        <h1 className="font-display text-display-1 tracking-tight text-base-950 dark:text-base-50">
          collections
        </h1>
        <p className="font-altSans text-display-4 font-light text-pretty max-w-4xl text-base-700 dark:text-base-300">
          a practitioner&apos;s guide to hci literature — organized to enhance
          understanding and spark curiosity — made using ai. browse the
          collections below, see the{" "}
          <Link href="/allWorks" className="link-style">
            full archive
          </Link>
          , or{" "}
          <Link href="/generate" className="link-style">
            <Sparkles>generate your own</Sparkles>
          </Link>
          .
        </p>
      </header>


      <div className="content-shell px-4 lg:px-6">
        <Suspense fallback={<AllCollectionsSkeleton />}>
          <AllCollections />
        </Suspense>
      </div>
    </main>
  );
}
