import "server-only";

export const SITE_URL = "https://hciindex.com";
export const SITE_NAME = "HCI Index";
export const SITE_DESCRIPTION =
  "A curated weekly synthesis of Human-Computer Interaction literature.";
export const SITE_AUTHOR = {
  name: "Prateek Solanki",
  url: "https://prateeksolanki.com",
};

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function issueUrl(issueId) {
  return absoluteUrl(`/newsletters/${issueId}`);
}

export function issueOgImageUrl(issueId) {
  return absoluteUrl(`/newsletters/${issueId}/opengraph-image`);
}

export function getIssueTitle(newsletter, issueId) {
  return newsletter?.headline?.title || `HCI Index Issue ${issueId}`;
}

export function getIssueDescription(newsletter) {
  const description =
    newsletter?.headline?.subtitle ||
    newsletter?.synthesis?.content ||
    SITE_DESCRIPTION;

  return description.replace(/\s+/g, " ").trim().slice(0, 220);
}

export function getIssueSummaryDescription(issue) {
  return (issue?.summary || SITE_DESCRIPTION).replace(/\s+/g, " ").trim();
}

export function getIssueDate(newsletter) {
  const value =
    newsletter?.run_date_utc ||
    newsletter?.generated_at ||
    newsletter?.published ||
    newsletter?.date;
  const date = value ? new Date(value) : null;

  return date && !Number.isNaN(date.getTime()) ? date.toISOString() : undefined;
}

export function issueIdToDate(issueId) {
  const match = issueId?.match(/^(\d{4})-W(\d{1,2})$/);
  if (!match) return undefined;

  const year = Number(match[1]);
  const week = Number(match[2]);
  if (!Number.isFinite(year) || !Number.isFinite(week)) return undefined;

  return new Date(Date.UTC(year, 0, 1 + (week - 1) * 7)).toISOString();
}

function getPaperUrl(paper) {
  if (paper?.url) return paper.url;
  if (paper?.assets?.pdf) return paper.assets.pdf;
  if (paper?.id) return `https://arxiv.org/abs/${paper.id}`;
  return undefined;
}

function getPaperSchema(paper) {
  return {
    "@type": "ScholarlyArticle",
    name: paper.title,
    url: getPaperUrl(paper),
    identifier: paper.id,
    description: paper.short_desc || paper.shortDesc || paper.abstract,
  };
}

export function buildIssueJsonLd(newsletter) {
  const issueId = newsletter.issue_id;
  const title = getIssueTitle(newsletter, issueId);
  const description = getIssueDescription(newsletter);
  const url = issueUrl(issueId);
  const published = getIssueDate(newsletter) || issueIdToDate(issueId);
  const papers = [
    ...(newsletter.featured_papers || []),
    ...(newsletter.further_reading || []),
  ].filter((paper) => paper?.title || paper?.id);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: title,
        description,
        url,
        mainEntityOfPage: url,
        image: issueOgImageUrl(issueId),
        datePublished: published,
        dateModified: published,
        isPartOf: {
          "@id": `${SITE_URL}/#newsletter`,
        },
        author: {
          "@type": "Person",
          name: SITE_AUTHOR.name,
          url: SITE_AUTHOR.url,
        },
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        about: [
          "Human-Computer Interaction",
          "Human-AI Interaction",
          "User Experience Research",
        ],
        mentions: papers.slice(0, 12).map(getPaperSchema),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: SITE_NAME,
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Newsletters",
            item: absoluteUrl("/newsletters"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: issueId,
            item: url,
          },
        ],
      },
      {
        "@type": "Periodical",
        "@id": `${SITE_URL}/#newsletter`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        founder: {
          "@type": "Person",
          name: SITE_AUTHOR.name,
          url: SITE_AUTHOR.url,
        },
      },
    ],
  };
}

export function buildSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: absoluteUrl("/"),
        description: SITE_DESCRIPTION,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "Periodical",
        "@id": `${SITE_URL}/#newsletter`,
        name: SITE_NAME,
        url: absoluteUrl("/"),
        description: SITE_DESCRIPTION,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: absoluteUrl("/"),
        founder: {
          "@type": "Person",
          name: SITE_AUTHOR.name,
          url: SITE_AUTHOR.url,
        },
      },
    ],
  };
}

export function jsonLdScriptProps(data) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    },
  };
}

export function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function getFeedIssueUrl(issue) {
  return absoluteUrl(`/newsletters/${issue.id}`);
}

export function getFeedIssueDate(issue) {
  const date = new Date(issue.date);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}
