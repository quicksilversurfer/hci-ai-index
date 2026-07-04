import { getIssueSummaries } from "@/app/lib/feed-data";
import {
  absoluteUrl,
  getFeedIssueDate,
  getFeedIssueUrl,
  getIssueSummaryDescription,
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/app/lib/seo";

export async function GET() {
  const issues = await getIssueSummaries();

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: SITE_NAME,
    home_page_url: absoluteUrl("/"),
    feed_url: absoluteUrl("/feed.json"),
    description: SITE_DESCRIPTION,
    language: "en-US",
    authors: [
      {
        name: SITE_AUTHOR.name,
        url: SITE_AUTHOR.url,
      },
    ],
    items: issues.map((issue) => {
      const url = getFeedIssueUrl(issue);

      return {
        id: url,
        url,
        title: issue.title,
        summary: getIssueSummaryDescription(issue),
        content_text: getIssueSummaryDescription(issue),
        date_published: getFeedIssueDate(issue).toISOString(),
      };
    }),
  };

  return Response.json(feed, {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
