import { getAllNewsletters } from "@/app/lib/server-data";

export interface IssueSummary {
  id: string;
  week_label: string;
  title: string;
  summary: string;
  date: string;
  month: string;
  year: string;
  total_papers_reviewed: number;
}

function pickDate(value?: string) {
  const candidate = value || "";
  const parsed = new Date(candidate);
  if (!Number.isNaN(parsed.getTime())) return parsed;

  // Fallback to "today" to avoid breaking grouping if missing
  return new Date();
}

function dateFromIssueId(issueId?: string) {
  if (!issueId) return null;
  const match = issueId.match(/(\d{4})-?w?(\d{1,2})/i);
  if (!match) return null;
  const year = Number(match[1]);
  const week = Number(match[2]);
  if (Number.isNaN(year) || Number.isNaN(week)) return null;
  return new Date(year, 0, 1 + (week - 1) * 7);
}

function toSummary(newsletter: any): IssueSummary {
  const weekDate =
    dateFromIssueId(newsletter.issue_id) ||
    pickDate(
      newsletter.run_date_utc || newsletter.generated_at || newsletter.published
    );
  const month = weekDate.toLocaleString("en-US", { month: "long" });
  const year = weekDate.getFullYear().toString();
  const weekLabel = newsletter.issue_id?.split("-").at(-1) || "W?";

  return {
    id: newsletter.issue_id,
    week_label: weekLabel,
    title: newsletter.headline?.title || "Untitled issue",
    summary:
      newsletter.headline?.subtitle ||
      newsletter.synthesis?.content?.slice(0, 140) ||
      "",
    date: weekDate.toISOString(),
    month,
    year,
    total_papers_reviewed:
      newsletter.topic_overview?.total_papers_reviewed ||
      newsletter.total_papers_reviewed ||
      0,
  };
}

export async function getIssueSummaries(): Promise<IssueSummary[]> {
  const newsletters = await getAllNewsletters();
  const summaries = newsletters.map(toSummary);

  return summaries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
