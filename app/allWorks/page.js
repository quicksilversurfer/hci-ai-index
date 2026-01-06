import { getAllPapersDetails } from "@/app/lib/data";

import PaperDetails from "@/components/papers/PaperDetails";

export default async function PaperList() {
  const papers = await getAllPapersDetails();
  return (
    <main className="flex flex-col w-full grow pb-content-y">
      <header className="page-header pb-rhythm-6 content-shell px-4 lg:px-6 mt-8">
        <h1 className="font-display text-display-1 tracking-tight text-base-950 dark:text-base-50">
          all works
        </h1>
        <p className="font-altSans text-display-4 font-light text-pretty max-w-4xl text-base-700 dark:text-base-300">
          a complete archive of papers featured in our collections — sourced from our database
        </p>
      </header>
      <div className="space-y-4 mt-12 columns-1 md:columns-2 2xl:columns-3 gap-12 content-shell px-4 lg:px-6">
        {" "}
        {papers &&
          papers.length > 0 &&
          papers.map((paper) => (
            <PaperDetails
              key={paper.uuid}
              title={paper.title}
              authors={paper.author}
              link={paper.link}
              date={paper.date}
            />
          ))}
      </div>
    </main>
  );
}
