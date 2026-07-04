import { getAllNewslettersMetadata } from "@/app/lib/server-data";
import { absoluteUrl } from "@/app/lib/seo";

function getValidDate(value, fallback) {
    const date = value ? new Date(value) : null;
    return date && !Number.isNaN(date.getTime()) ? date : fallback;
}

function getLatestDate(dates, fallback) {
    return dates.reduce((latest, date) => {
        if (!date || Number.isNaN(date.getTime())) return latest;
        return date > latest ? date : latest;
    }, fallback);
}

export default async function sitemap() {
    const fallbackLastModified = new Date();

    try {
        const newsletters = await getAllNewslettersMetadata();
        const issueDates = newsletters.map((newsletter) =>
            getValidDate(newsletter.run_date_utc, fallbackLastModified)
        );
        const latestIssueDate = getLatestDate(issueDates, fallbackLastModified);

        const staticPages = [
            {
                url: absoluteUrl("/"),
                lastModified: latestIssueDate,
                changeFrequency: "weekly",
                priority: 1,
            },
            {
                url: absoluteUrl("/about"),
                lastModified: latestIssueDate,
                changeFrequency: "monthly",
                priority: 0.9,
            },
            {
                url: absoluteUrl("/newsletters"),
                lastModified: latestIssueDate,
                changeFrequency: "weekly",
                priority: 0.8,
            },
        ];

        const feedPages = ["/rss.xml", "/atom.xml", "/feed.json"].map((path) => ({
            url: absoluteUrl(path),
            lastModified: latestIssueDate,
            changeFrequency: "weekly",
            priority: 0.3,
        }));

        const newsletterPages = newsletters.map((newsletter) => ({
            url: absoluteUrl(`/newsletters/${newsletter.issue_id}`),
            lastModified: getValidDate(newsletter.run_date_utc, latestIssueDate),
            changeFrequency: "monthly",
            priority: 0.7,
        }));

        return [...staticPages, ...feedPages, ...newsletterPages];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return [
            {
                url: absoluteUrl("/"),
                lastModified: fallbackLastModified,
                changeFrequency: "weekly",
                priority: 1,
            },
            {
                url: absoluteUrl("/about"),
                lastModified: fallbackLastModified,
                changeFrequency: "monthly",
                priority: 0.9,
            },
            {
                url: absoluteUrl("/newsletters"),
                lastModified: fallbackLastModified,
                changeFrequency: "weekly",
                priority: 0.8,
            },
        ];
    }
}
