import Link from "next/link";

import AllCollections from "@/components/collection/AllCollections";

export default function Home() {
  return (
    <main className="flex flex-col px-4 2xl:px-0">
      <h1 className="font-display text-8xl mr-4 sm:mr-0 mb-8 mt-24">
        hci index
      </h1>
      <h2 className="font-display text-3xl text-pretty max-w-[55ch] text-base-600">
        an experimental reference guide to hci literature — organized to enhance
        understanding and spark curiosity — built using ai
      </h2>
      <h3 className="text-3xl text-pretty font-display max-w-[55ch] text-base-600 mt-4">
        browse through the collections below or{" "}
        <Link href="/create">create your own</Link>
      </h3>
      <AllCollections />
    </main>
  );
}
