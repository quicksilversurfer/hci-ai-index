import FeedContainer from "@/components/newsletter-feed/FeedContainer";
import { getIssueSummaries } from "@/app/lib/feed-data";

export default async function NewsletterFeed() {
  const issues = await getIssueSummaries();

  return (
    <main className="flex flex-col w-full grow pb-content-y">
      <header className="page-header pb-rhythm-6 content-shell px-4 lg:px-6 mt-8">
        <h1 className="font-display text-display-1 tracking-tight text-base-950 dark:text-base-50">
          hci index
        </h1>
        <p className="font-altSans text-display-4 font-light text-pretty max-w-4xl text-base-700 dark:text-base-300">
          curated weekly summaries of the latest HCI papers from arXiv — concise
          synopses, actionable insights, and critical takeaways to keep
          researchers, designers, and practitioners informed
        </p>
      </header>

      <FeedContainer issues={issues} />
    </main>
  );
}
