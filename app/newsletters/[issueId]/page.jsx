import { notFound } from "next/navigation";

import { getNewsletterById } from "@/app/lib/server-data";
import IssueHeader from "@/components/newsletter/IssueHeader";
import Synthesis from "@/components/newsletter/Synthesis";
import FeaturedPapers from "@/components/newsletter/FeaturedPapers";
import StrategicTrends from "@/components/newsletter/StrategicTrends";
import CounterIntuitiveFindings from "@/components/newsletter/CounterIntuitiveFindings";
import TopicOverview from "@/components/newsletter/TopicOverview";
import Toolbox from "@/components/newsletter/Toolbox";
import FurtherReading from "@/components/newsletter/FurtherReading";
import ReflectionPrompt from "@/components/newsletter/ReflectionPrompt";

export default async function NewsletterPage({ params }) {
  const { issueId } = params;
  const newsletter = await getNewsletterById(issueId);

  if (!newsletter) {
    notFound();
  }

  return (
    <main className="flex flex-col w-full grow min-h-screen pb-content-y">
      <div className="space-y-rhythm-5 pt-content-y">
        <div className="max-w-content mx-auto space-y-rhythm-2">
          <IssueHeader
            issueId={newsletter.issue_id}
            title={newsletter.headline?.title}
            subtitle={newsletter.headline?.subtitle}
          />
        </div>

        <div className="space-y-rhythm-5 overflow-hidden">
          <Synthesis id="synthesis" content={newsletter.synthesis?.content} />

          <FeaturedPapers
            id="featured-papers"
            papers={newsletter.featured_papers || []}
          />

          <StrategicTrends
            id="strategic-trends"
            trends={newsletter.insights?.strategic_trends || []}
          />

          <CounterIntuitiveFindings
            id="counter-intuitive-findings"
            findings={newsletter.insights?.counter_intuitive_findings || []}
          />

          <TopicOverview
            id="topic-overview"
            summary={newsletter.topic_overview?.summary}
            totalPapers={newsletter.topic_overview?.total_papers_reviewed}
            topics={newsletter.topic_overview?.topic_distribution || []}
          />

          <Toolbox
            id="toolbox"
            resources={newsletter.toolbox?.resources || []}
          />

          <FurtherReading
            id="further-reading"
            items={newsletter.further_reading || []}
          />

          <ReflectionPrompt
            id="reflection"
            title={newsletter.reflection_prompt?.title}
            description={newsletter.reflection_prompt?.description}
            considerations={newsletter.reflection_prompt?.considerations || []}
          />
        </div>
      </div>
    </main>
  );
}
