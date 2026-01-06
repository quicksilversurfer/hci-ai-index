import Link from "next/link";
import clsx from "clsx";


export default function NewsletterRow({
  issue,
  textClass,

}) {


  return (
    <Link
      href={`/newsletters/${issue.id}`}
      className={clsx(
        "group block transition-all duration-200",
        "border-t border-base-black/5 dark:border-base-paper/5",
        "border-l-2 border-l-transparent hover:border-l-base-600 dark:hover:border-l-base-300",
        "hover:bg-base-black/[0.03] dark:hover:bg-base-paper/[0.05]",
        textClass
      )}
    >
      <div className="content-shell px-4 lg:px-6 flex items-center justify-between gap-4 py-3">
        <div className="flex flex-col grow min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
            <span className="font-altSans text-body-intermediate opacity-60 text-base-900 dark:text-base-50">
              {issue.week_label}
            </span>
            <span className={clsx("text-body-md font-altSans font-medium text-base-900 dark:text-base-50")}>
              {issue.title}
            </span>

          </div>
          <span className={clsx(
            "text-body-intermediate font-altSans opacity-60 text-base-900 dark:text-base-50 mt-1",
            "line-clamp-2 sm:line-clamp-1"
          )}>
            {issue.summary}
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="hidden sm:block w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-base-900 dark:text-base-50 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0 -7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </Link>
  );
}
