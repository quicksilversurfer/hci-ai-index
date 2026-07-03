"use client";

import { useEffect } from "react";

import { captureAnalyticsEvent } from "@/app/lib/analytics";

export default function NewsletterIssueAnalytics({
  issueId,
  title,
  totalPapers,
  modelName,
}) {
  useEffect(() => {
    captureAnalyticsEvent("newsletter_issue_viewed", {
      issue_id: issueId,
      issue_title: title,
      total_papers_reviewed: totalPapers,
      model_name: modelName,
    });
  }, [issueId, title, totalPapers, modelName]);

  return null;
}
