import { getIssueSummaries } from "@/app/lib/feed-data";
import {
  absoluteUrl,
  escapeXml,
  getFeedIssueDate,
  getFeedIssueUrl,
  getIssueSummaryDescription,
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/app/lib/seo";

export async function GET() {
  const issues = await getIssueSummaries();
  const updated = issues[0]?.date ? new Date(issues[0].date) : new Date();

  const items = issues
    .map((issue) => {
      const url = getFeedIssueUrl(issue);
      const date = getFeedIssueDate(issue);

      return `
        <item>
          <title>${escapeXml(issue.title)}</title>
          <link>${escapeXml(url)}</link>
          <guid isPermaLink="true">${escapeXml(url)}</guid>
          <description>${escapeXml(getIssueSummaryDescription(issue))}</description>
          <pubDate>${date.toUTCString()}</pubDate>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${escapeXml(SITE_NAME)}</title>
        <link>${escapeXml(absoluteUrl("/"))}</link>
        <description>${escapeXml(SITE_DESCRIPTION)}</description>
        <language>en-US</language>
        <lastBuildDate>${updated.toUTCString()}</lastBuildDate>
        <managingEditor>${escapeXml(SITE_AUTHOR.name)}</managingEditor>
        <webMaster>${escapeXml(SITE_AUTHOR.name)}</webMaster>
        <atom:link href="${escapeXml(
          absoluteUrl("/rss.xml")
        )}" rel="self" type="application/rss+xml" />
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
