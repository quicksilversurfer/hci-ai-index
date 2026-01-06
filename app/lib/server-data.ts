import { notFound } from "next/navigation";

import "server-only";

const CLOUDFRONT_BASE_URL = "https://d1ra9o23dseopo.cloudfront.net";

// Newsletter functions - server only

async function fetchJson<T>(url: string, tags: string[] = [], revalidate: number = 3600): Promise<T | null> {
  try {
    const res = await fetch(url, {
      // cache: 'no-store', // Removed to allow caching
      next: {
        revalidate, // Default 1 hour
        tags
      }
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

export async function getAllNewsletters() {
  // Try fetching from CloudFront first
  try {
    const index = await fetchJson<{
      issues: Array<{
        id: string;
        date: string;
        title: string;
        subtitle: string;
        summary: string;
        total_papers: number;
        path: string;
      }>
    }>(
      `${CLOUDFRONT_BASE_URL}/index.json?v=optimized`,
      ['newsletters-index']
    );

    if (index && Array.isArray(index.issues)) {
      // Map enriched index directly to expected format
      const issues = await Promise.all(index.issues.map(async (issue) => {
        // Optimization: Use enriched data if available
        if (issue.title && issue.summary) {
          return {
            issue_id: issue.id,
            headline: {
              title: issue.title,
              subtitle: issue.subtitle
            },
            synthesis: {
              content: issue.summary
            },
            topic_overview: {
              total_papers_reviewed: issue.total_papers
            },
            run_date_utc: issue.date,
          };
        }

        // Fallback: Fetch individual newsletter if index is stale
        console.warn(`Index entry ${issue.id} missing enriched fields, fetching full content...`);
        try {
          const fullIssue = await fetchJson<any>(
            `${CLOUDFRONT_BASE_URL}/${issue.path}`,
            [`newsletter-${issue.id}`]
          );
          if (fullIssue) {
            return {
              issue_id: fullIssue.issue_id,
              headline: fullIssue.headline,
              synthesis: fullIssue.synthesis,
              topic_overview: fullIssue.topic_overview,
              run_date_utc: fullIssue.run_date_utc || fullIssue.generated_at,
            };
          }
        } catch (err) {
          console.error(`Failed to fallback fetch for ${issue.id}`, err);
        }

        // Last resort: return skeleton
        return {
          issue_id: issue.id,
          headline: { title: "Untitled Issue", subtitle: "" },
          synthesis: { content: "" },
          topic_overview: { total_papers_reviewed: 0 },
          run_date_utc: issue.date
        };
      }));

      return issues;
    }
  } catch (error) {
    console.warn("CloudFront fetch failed", error);
    return [];
  }

  return [];
}

export async function getAllNewslettersMetadata() {
  // Reuse getAllNewsletters for consistency and caching
  // In a more optimized version, we might just use index.json if it had enough data
  const newsletters = await getAllNewsletters();

  return newsletters.map((data: any) => ({
    issue_id: data.issue_id,
    headline: data.headline,
    run_date_utc: data.run_date_utc,
  }));
}

export async function getNewsletterById(issueId: string) {
  // Try CloudFront first
  try {
    // Construct path: newsletters/{year}/{week}/newsletter.json
    // We assume issueId is formatted like "2025-W52" or "2025-W04"
    const match = issueId.match(/^(\d{4})-W(\d{1,2})$/);
    if (!match) {
      console.warn(`Invalid issueId format: ${issueId}`);
      return null;
    }
    const [_, year, week] = match;
    const formattedWeek = week.padStart(2, '0');

    const remoteNewsletter = await fetchJson(
      `${CLOUDFRONT_BASE_URL}/newsletters/${year}/${formattedWeek}/newsletter.json`,
      [`newsletter-${issueId}`]
    );

    if (remoteNewsletter) {
      return remoteNewsletter;
    }
  } catch (error) {
    console.warn(`CloudFront fetch for ${issueId} failed`, error);
    return null;
  }

  return null;
}
