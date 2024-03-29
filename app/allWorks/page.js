import { getAllPapersDetails } from "@/app/lib/data";

import PaperDetails from "@/components/papers/PaperDetails";

export default async function PaperList() {
  const papers = await getAllPapersDetails();
  return (
    <main className="px-4 sm:px-8 2xl:px-0 grow">
      <h1 className="text-8xl font-display font-medium text-base-900 dark:text-base-paper mt-24 ">
        all works
      </h1>
      <div className="space-y-4 mt-12 columns-1 md:columns-2 2xl:columns-3 gap-12">
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
