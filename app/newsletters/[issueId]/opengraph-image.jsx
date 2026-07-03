import { ImageResponse } from "next/og";

import { getNewsletterById } from "@/app/lib/server-data";
import {
  getIssueDescription,
  getIssueTitle,
  issueIdToDate,
  SITE_NAME,
} from "@/app/lib/seo";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function formatIssueDate(issueId, newsletter) {
  const date = new Date(
    newsletter?.run_date_utc || newsletter?.generated_at || issueIdToDate(issueId)
  );

  if (Number.isNaN(date.getTime())) return issueId;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function getTopicLabels(topicDistribution) {
  if (Array.isArray(topicDistribution)) {
    return topicDistribution
      .map((topic) => topic.topic || topic.name || topic.label)
      .filter(Boolean);
  }

  if (topicDistribution && typeof topicDistribution === "object") {
    return Object.entries(topicDistribution)
      .sort(([, a], [, b]) => Number(b) - Number(a))
      .map(([topic]) => topic);
  }

  return [];
}

export default async function Image({ params }) {
  const { issueId } = await params;
  const newsletter = await getNewsletterById(issueId);
  const title = getIssueTitle(newsletter, issueId);
  const description = getIssueDescription(newsletter);
  const paperCount =
    newsletter?.topic_overview?.total_papers_reviewed ||
    newsletter?.total_papers_reviewed ||
    0;
  const topics = getTopicLabels(
    newsletter?.topic_overview?.topic_distribution
  ).slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 68,
          color: "#1c1b1a",
          background:
            "linear-gradient(135deg, #f9f5e7 0%, #f3efe2 46%, #dfe9e5 100%)",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              letterSpacing: 0,
              color: "#4b5563",
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#60615e",
            }}
          >
            {formatIssueDate(issueId, newsletter)}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "block",
              maxWidth: 1040,
              fontSize: 74,
              lineHeight: 0.96,
              letterSpacing: 0,
              fontWeight: 700,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "block",
              maxWidth: 980,
              fontSize: 31,
              lineHeight: 1.25,
              color: "#41423f",
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 28,
            borderTop: "2px solid rgba(28, 27, 26, 0.18)",
            paddingTop: 28,
            color: "#373835",
          }}
        >
          <div style={{ display: "flex", fontSize: 24 }}>
            {paperCount ? `${paperCount} papers reviewed` : "Weekly HCI synthesis"}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {(topics.length ? topics : ["HCI", "AI", "Design Research"]).map(
              (topic) => (
                <div
                  key={topic}
                  style={{
                    display: "flex",
                    fontSize: 22,
                    padding: "10px 16px",
                    border: "1px solid rgba(28, 27, 26, 0.28)",
                    borderRadius: 999,
                  }}
                >
                  {topic}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    ),
    size
  );
}
