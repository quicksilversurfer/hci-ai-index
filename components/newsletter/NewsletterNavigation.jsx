import Link from "next/link";
import clsx from "clsx";
import { ChevronLeftIcon, ChevronRightIcon } from "./ArrowButton";

const navButtonStyles = clsx(
    "inline-flex items-center rounded-[10px] border border-[rgba(34,34,34,0.18)]",
    "bg-[linear-gradient(180deg,_#ffffff_0%,_#f5f5f5_100%)]",
    "shadow-paper-soft",
    "transition-all duration-200",
    "hover:border-[rgba(34,34,34,0.45)] hover:bg-[linear-gradient(180deg,_#f7f7f7_0%,_#ebebeb_100%)]",
    "dark:border-[rgba(255,255,255,0.12)]",
    "dark:bg-[linear-gradient(180deg,_#262524_0%,_#161513_100%)]",
    "dark:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.35)]",
    "dark:hover:border-[rgba(0,0,0,0.3)] dark:hover:bg-[linear-gradient(180deg,_#1f1e1d_0%,_#141312_100%)]",
    "px-4 py-4 gap-4"
);

function dateFromIssueId(issueId) {
    if (!issueId) return null;
    const match = issueId.match(/(\d{4})-?W?(\d{1,2})/i);
    if (!match) return null;
    const year = Number(match[1]);
    const week = Number(match[2]);
    return new Date(year, 0, 1 + (week - 1) * 7);
}

function NavButton({ issue, align = "left" }) {
    if (!issue) return <div className="hidden md:block" />;

    const weekNumber = issue.issue_id.split("-").at(-1).replace("W", "");
    const date = dateFromIssueId(issue.issue_id);
    const monthName = date?.toLocaleString("en-US", { month: "long" }) || "";
    const year = date?.getFullYear() || "";

    return (
        <Link
            href={`/newsletters/${issue.issue_id}`}
            className="group block outline-none no-underline"
        >
            <article className={navButtonStyles}>
                {align === "left" && (
                    <ChevronLeftIcon
                        className="h-4 w-4 text-base-500 dark:text-flexoki-base-400 group-hover:text-base-800 dark:group-hover:text-flexoki-base-200 transition-colors"
                        strokeWidth={2}
                    />
                )}

                <div className={clsx("flex flex-col", align === "right" ? "items-end text-right" : "items-start text-left")}>
                    <span className="font-altSans text-body-md leading-tight font-medium text-hci-primary dark:text-flexoki-base-50">
                        Week {weekNumber}
                    </span>
                    <span className="font-altSans text-body-xs uppercase tracking-wider text-base-500 dark:text-flexoki-base-400">
                        {monthName} {year}
                    </span>
                </div>

                {align === "right" && (
                    <ChevronRightIcon
                        className="h-4 w-4 text-base-500 dark:text-flexoki-base-400 group-hover:text-base-800 dark:group-hover:text-flexoki-base-200 transition-colors"
                        strokeWidth={2}
                    />
                )}
            </article>
        </Link>
    );
}

export default function NewsletterNavigation({ previous, next }) {
    if (!previous && !next) return null;

    return (
        <section className="">
            <div className="max-w-content mx-auto px-4 lg:px-0 py-6 md:py-12">
                <div className="flex justify-between items-center gap-4">
                    {/* Previous (Older) */}
                    {previous ? (
                        <NavButton issue={previous} align="left" />
                    ) : <div />}

                    {/* Next (Newer) */}
                    {next ? (
                        <NavButton issue={next} align="right" />
                    ) : <div />}
                </div>
            </div>
        </section>
    );
}
