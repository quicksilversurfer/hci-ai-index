import { getAllNewslettersMetadata } from "@/app/lib/server-data";

export default async function sitemap() {
    const baseUrl = "https://hciindex.com";
    const lastModified = new Date();

    const staticPages = [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/disclaimer`,
            lastModified,
            changeFrequency: "yearly",
            priority: 0.5,
        },
    ];

    try {
        const newsletters = await getAllNewslettersMetadata();

        const newsletterPages = newsletters.map((newsletter) => ({
            url: `${baseUrl}/newsletters/${newsletter.issue_id}`,
            lastModified: newsletter.run_date_utc
                ? new Date(newsletter.run_date_utc)
                : lastModified,
            changeFrequency: "monthly",
            priority: 0.7,
        }));

        return [...staticPages, ...newsletterPages];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return staticPages;
    }
}
