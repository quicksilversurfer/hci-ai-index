/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
export default async function About() {
  return (
    <main className="flex flex-col w-full grow pb-content-y">
      <header className="page-header pb-rhythm-6 content-shell px-4 lg:px-6 mt-8">
        <h1 className="font-display text-display-1 tracking-tight text-base-950 dark:text-base-50">
          about
        </h1>
        <p className="font-altSans text-display-4 font-light text-pretty max-w-4xl text-base-700 dark:text-base-300">
          a personal project synthesizing HCI research into accessible insights
        </p>
      </header>
      <section className="grid grid-cols-12 mt-12 gap-6 sm:gap-12 content-shell px-4 lg:px-6">
        <div className="col-span-12 lg:col-span-6">
          <Image
            src="/about/alto.jpeg"
            width={1000}
            height={500}
            alt="Children using the Alto personal computer, ca. 1979. Courtesy of PARC."
            className="w-full rounded-sm"
          />
          <p className="font-mono font-extralight text-base-700 dark:text-base-500 text-xs w-full mt-3">
            Children using the Alto personal computer, ca. 1979. Courtesy
            of PARC.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <p className="text-base font-sans font-light text-pretty mb-8">
            HCI Index is a weekly newsletter that synthesizes recent human-computer interaction
            research into accessible insights. Each week, the pipeline processes 60-100 new
            papers and distills them into a curated selection surfacing key findings,
            surprising results, and emerging patterns across the field.
          </p>

          <h2 className="font-mono mb-4 uppercase text-sm">Why This Exists</h2>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            I've long been drawn to the academic foundations of HCI. Papers offer a depth that
            fuels my work in ways that blog posts and trend pieces rarely match. But academic
            literature isn't always accessible. It can be dense, technical, and overwhelming
            in volume. For designers who've arrived in this field through non-traditional
            paths, even knowing where to start can be a barrier.
          </p>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            With AI reshaping how we design and build products, keeping up with HCI research
            feels more urgent than ever. As Susanne Bødker notes, "we need to keep reminding
            ourselves of how and why our everyday technology came into being. In order to be
            better at pointing to the future, it needs to be aware of its history too." The
            newsletter is my attempt to follow along with that evolving history in real time
            and share the journey.
          </p>

          <h2 className="font-mono mt-8 mb-4 uppercase text-sm">How It Works</h2>

          <p className="mt-4 text-base font-sans font-light text-pretty">
            Every week, the pipeline ingests metadata and abstracts from hundreds of new preprints from arXiv's Human-Computer
            Interaction category. Each paper passes through multiple stages: scored on practitioner
            relevance, research rigor, and strategic significance, then clustered by theme to reveal
            what's drawing collective attention. Selection balances high-scoring work against
            papers that might otherwise slip through, enforces topic diversity, and deliberately
            surfaces contrarian findings that cut against prevailing assumptions.
          </p>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            The final stage reads the curated set together, looking for tensions and through lines
            across the week's research. The goal isn't to impose a narrative where none exists, but
            to find the honest shape of what the field is working on and make it legible.
          </p>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            The system runs on AWS serverless infrastructure with Claude models handling scoring,
            clustering, and synthesis. It's a pipeline I designed and built to engage with research
            at a scale that wouldn't be possible otherwise.
          </p>

          <div className="border-t border-base-200 dark:border-base-800 mt-12">
            <h2 className="font-mono mb-4 uppercase text-sm mt-12">Origins & Evolution</h2>
            <p className="mt-4 text-base font-sans font-light text-pretty">
              This project started differently. The original version focused on{" "}
              <Link href="/collections" className="link-style">
                historical collections
              </Link>{" "}
              synthesizing seminal papers that form the bedrock of HCI thinking. Those
              collections, along with an experimental semantic search feature, remain
              accessible but are no longer actively maintained.
            </p>
            <p className="mt-4 text-base font-sans font-light text-pretty">
              The shift to a weekly newsletter came from wanting to follow the field as it
              moves, not just document where it's been. The long-term vision still includes
              curated collections and semantic search for building reading lists around
              specific topics, but for now, the focus is on the weekly synthesis.
            </p>
            <p className="mt-4 text-base font-sans font-light text-pretty">
              If any of this sparks your own curiosity about HCI research, that's more than
              enough.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
