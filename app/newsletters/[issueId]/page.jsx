import { notFound } from "next/navigation";

import {
  getNewsletterById,
  getAllNewslettersMetadata,
} from "@/app/lib/server-data";
import IssueHeader from "@/components/newsletter/IssueHeader";
import AgentAttribution from "@/components/newsletter/AgentAttribution";
import Synthesis from "@/components/newsletter/Synthesis";
import FeaturedPapers from "@/components/newsletter/FeaturedPapers";
import StrategicTrends from "@/components/newsletter/StrategicTrends";
import CounterIntuitiveFindings from "@/components/newsletter/CounterIntuitiveFindings";
import TopicOverview from "@/components/newsletter/TopicOverview";
import Toolbox from "@/components/newsletter/Toolbox";
import FurtherReading from "@/components/newsletter/FurtherReading";
import ReflectionPrompt from "@/components/newsletter/ReflectionPrompt";
import NewsletterNavigation from "@/components/newsletter/NewsletterNavigation";

export async function generateMetadata({ params }) {
  const { issueId } = await params;
  const newsletter = await getNewsletterById(issueId);

  if (!newsletter) {
    return {
      title: "Newsletter Not Found",
    };
  }

  const title = newsletter.headline?.title || `Issue ${issueId}`;
  const description =
    newsletter.headline?.subtitle ||
    newsletter.synthesis?.content?.slice(0, 160) ||
    "HCI Index Newsletter";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://hciindex.com/newsletters/${issueId}`,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image.png"],
    },
  };
}

export default async function NewsletterPage({ params }) {
  const { issueId } = await params;
  const newsletter = await getNewsletterById(issueId);
  const allNewsletters = await getAllNewslettersMetadata();

  if (!newsletter) {
    notFound();
  }

  // Find adjacent issues
  // List is sorted DESC by date (Newest [0] ... Oldest [N])
  const currentIndex = allNewsletters.findIndex((n) => n.issue_id === issueId);
  const nextIssue =
    currentIndex > 0 ? allNewsletters[currentIndex - 1] : null; // Newer
  const prevIssue =
    currentIndex < allNewsletters.length - 1
      ? allNewsletters[currentIndex + 1]
      : null; // Older

  return (
    <main className="space-y-12">
      <div className="newsletter-card grain-subtle space-y-rhythm-8 py-12 md:py-16">
        <div className="space-y-12 px-4 sm:px-8 md:px-12">
          <IssueHeader
            issueId={newsletter.issue_id}
            title={newsletter.headline?.title}
            subtitle={newsletter.headline?.subtitle}
          />

          <AgentAttribution
            paperCount={newsletter.topic_overview?.total_papers_reviewed || 0}
            modelName={newsletter.curation_meta?.models?.narrative}
          />

          <Synthesis
            id="synthesis"
            content={newsletter.synthesis?.content}
          />
        </div>

        <div className="px-4 sm:px-8 md:px-12">
          <FeaturedPapers
            id="featured-papers"
            papers={newsletter.featured_papers || []}
          />
        </div>

        <div className="px-4 sm:px-8 md:px-12">
          <StrategicTrends
            id="strategic-trends"
            trends={newsletter.insights?.strategic_trends || []}
          />
        </div>

        <div className="px-4 sm:px-8 md:px-12">
          <CounterIntuitiveFindings
            id="counter-intuitive-findings"
            findings={newsletter.insights?.counter_intuitive_findings || []}
          />
        </div>

        <div className="px-4 sm:px-8 md:px-12">
          <Toolbox id="toolbox" resources={newsletter.toolbox?.resources || []} />
        </div>

        <div className="px-4 sm:px-8 md:px-12">
          <FurtherReading
            id="further-reading"
            items={newsletter.further_reading || []}
          />
        </div>

        <div className="px-4 sm:px-8 md:px-12">
          <ReflectionPrompt
            id="reflection"
            title={newsletter.reflection_prompt?.title}
            description={newsletter.reflection_prompt?.description}
            considerations={newsletter.reflection_prompt?.considerations || []}
          />
        </div>
      </div>

      <NewsletterNavigation previous={prevIssue} next={nextIssue} />

      <TopicOverview
        id="topic-overview"
        summary={newsletter.topic_overview?.summary}
        totalPapers={newsletter.topic_overview?.total_papers_reviewed}
        topics={newsletter.topic_overview?.topic_distribution || []}
        curationStats={newsletter.curation_meta}
        diversityMetrics={newsletter.topic_overview?.diversity_metrics}
      />
    </main>
  );
}
