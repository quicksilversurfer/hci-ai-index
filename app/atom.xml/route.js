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

  const entries = issues
    .map((issue) => {
      const url = getFeedIssueUrl(issue);
      const date = getFeedIssueDate(issue);

      return `
        <entry>
          <title>${escapeXml(issue.title)}</title>
          <link href="${escapeXml(url)}" />
          <id>${escapeXml(url)}</id>
          <updated>${date.toISOString()}</updated>
          <published>${date.toISOString()}</published>
          <summary>${escapeXml(getIssueSummaryDescription(issue))}</summary>
        </entry>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>${escapeXml(SITE_NAME)}</title>
      <subtitle>${escapeXml(SITE_DESCRIPTION)}</subtitle>
      <link href="${escapeXml(absoluteUrl("/"))}" />
      <link href="${escapeXml(
        absoluteUrl("/atom.xml")
      )}" rel="self" type="application/atom+xml" />
      <id>${escapeXml(absoluteUrl("/"))}</id>
      <updated>${updated.toISOString()}</updated>
      <author>
        <name>${escapeXml(SITE_AUTHOR.name)}</name>
        <uri>${escapeXml(SITE_AUTHOR.url)}</uri>
      </author>
      ${entries}
    </feed>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
