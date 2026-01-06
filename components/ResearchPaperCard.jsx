import clsx from "clsx";
import PropTypes from "prop-types";

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-4 w-4 text-flexoki-base-400 transition-transform duration-150 group-hover:-translate-y-[1px] group-hover:translate-x-[1px]"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );
}

function FrameLabel({ label }) {
  return (
    <div className="mb-1 text-[10px] uppercase tracking-[0.16em] text-flexoki-base-500">
      {label}
    </div>
  );
}

function ArxivPill({ arxivId }) {
  return (
    <div className="inline-flex items-center rounded-full border border-flexoki-base-600/60 bg-flexoki-base-900/80 px-3 py-1 text-[14px] leading-4 font-medium text-flexoki-base-50">
      {arxivId}
    </div>
  );
}

const variantMap = {
  detailed: "full",
  full: "full",
  standard: "medium",
  medium: "medium",
  summary: "compact",
  compact: "compact",
  pill: "id-only",
  "id-only": "id-only",
};

export default function ResearchPaperCard({
  arxivId,
  url,
  title,
  variant = "summary",
  description = "",
  authors = [],
  highlight = "",
  sections = [],
  titleTag = "h3",
  showFrameLabel = false,
  frameLabel = "",
  className = "",
  showExternalLinkIcon = true,
  meta = null,
  children,
}) {
  const resolvedVariant = variantMap[variant] || "compact";
  const HeadingTag = titleTag;
  const headerClass = clsx(
    "mb-2 flex h-4 items-center justify-between gap-3",
    resolvedVariant === "full" &&
      "-mx-4 px-2 sm:-mx-6 sm:px-3 md:-mx-12 md:px-4"
  );
  const renderHeader = (withIcon, usePill = true) => (
    <div className={headerClass}>
      {usePill ? (
        <ArxivPill arxivId={arxivId} />
      ) : (
        <span className="text-[14px] leading-4 font-altSans font-medium text-flexoki-base-400">
          {arxivId}
        </span>
      )}
      {withIcon && showExternalLinkIcon ? <ExternalLinkIcon /> : null}
    </div>
  );

  if (resolvedVariant === "id-only") {
    return (
      <div className={className}>
        {showFrameLabel ? <FrameLabel label={frameLabel} /> : null}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full border border-flexoki-base-600/60 bg-flexoki-base-900/80 px-3 py-1 text-xs font-medium text-flexoki-base-50 transition-colors duration-150 hover:border-flexoki-base-400 hover:bg-flexoki-base-800 hover:text-flexoki-base-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flexoki-base-400"
          aria-label={`Open arXiv paper ${arxivId} in new tab`}
        >
          {arxivId}
        </a>
      </div>
    );
  }

  const baseLink = clsx(
    "group block transition-colors transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flexoki-base-400",
    className
  );

  const renderMeta = meta ? (
    <div className="mt-1 flex justify-center text-center">{meta}</div>
  ) : null;

  if (resolvedVariant === "compact") {
    return (
      <div>
        {showFrameLabel ? <FrameLabel label={frameLabel} /> : null}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className={clsx(baseLink, "w-full max-w-sm")}
          aria-label={`Open paper ${title} in new tab`}
        >
          <article className="rounded-sm bg-flexoki-base-900 p-[10px] shadow-md shadow-black/30 font-altSans transition-transform transition-shadow duration-150 group-hover:-translate-y-[1px] group-hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flexoki-base-400">
            {renderHeader(true, true)}
            <HeadingTag className="font-altSans mt-2 text-[16px] leading-5 font-semibold text-flexoki-base-50 line-clamp-3">
              {title}
            </HeadingTag>
            {renderMeta}
            {description ? (
              <p className="mt-2 text-[14px] leading-[18px] font-altSans font-light text-flexoki-base-300 line-clamp-3">
                {description}
              </p>
            ) : null}
            {children}
          </article>
        </a>
      </div>
    );
  }

  if (resolvedVariant === "medium") {
    return (
      <div>
        {showFrameLabel ? <FrameLabel label={frameLabel} /> : null}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className={clsx(baseLink, "w-full max-w-2xl h-full")}
          aria-label={`Open paper ${title} in new tab`}
        >
          <article className="rounded-sm bg-flexoki-base-900 p-[16px] shadow-md shadow-black/30 font-altSans transition-transform transition-shadow duration-150 group-hover:-translate-y-[2px] group-hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flexoki-base-400 flex h-full flex-col">
            {renderHeader(true, false)}
            <HeadingTag className="font-altSans mt-2 text-[16px] leading-6 font-semibold text-flexoki-base-50 line-clamp-3">
              {title}
            </HeadingTag>
            {renderMeta}
            {description ? (
              <p className="mt-2 text-[14px] leading-[20px] font-altSans font-light text-flexoki-base-300 line-clamp-5 flex-1">
                {description}
              </p>
            ) : null}
            {children}
          </article>
        </a>
      </div>
    );
  }

  return (
    <div className="h-full">
      {showFrameLabel ? <FrameLabel label={frameLabel} /> : null}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={clsx(baseLink, "w-full max-w-3xl h-full")}
        aria-label={`Open paper ${title} in new tab`}
      >
        <article className="rounded-sm border border-flexoki-base-800 bg-flexoki-base-900 p-[10px] shadow-lg shadow-black/40 font-altSans transition-transform transition-shadow transition-colors duration-150 group-hover:-translate-y-[1px] group-hover:border-flexoki-base-600 group-hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flexoki-base-400 md:px-12 md:pb-12 md:pt-6 flex h-full flex-col">
          {renderHeader(true, false)}
          <HeadingTag className="font-altDisplay mt-14 text-center text-xl font-semibold leading-snug text-flexoki-base-50 md:text-2xl">
            {title}
          </HeadingTag>
          {authors.length ? (
            <p className="mt-4 text-center text-xs text-flexoki-base-300 md:text-sm">
              {authors.join(", ")}
            </p>
          ) : null}
          {renderMeta}
          {highlight ? (
            <p className="font-serif mx-auto mt-6 max-w-2xl text-center text-sm font-medium leading-relaxed text-flexoki-red-300 md:text-base">
              {highlight}
            </p>
          ) : null}
          <div className="mt-6 flex-1 space-y-4 text-sm leading-relaxed text-flexoki-base-200 md:text-[15px] max-w-3xl w-full mx-auto">
            {description ? <p>{description}</p> : null}
            {sections.map((section) => (
              <p key={section.label}>
                <span className="font-semibold text-flexoki-base-100">
                  {section.label}:
                </span>{" "}
                {section.text}
              </p>
            ))}
            {children}
          </div>
        </article>
      </a>
    </div>
  );
}

ResearchPaperCard.propTypes = {
  arxivId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    "summary",
    "compact",
    "standard",
    "medium",
    "detailed",
    "full",
    "pill",
    "id-only",
  ]),
  description: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.string),
  highlight: PropTypes.string,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  titleTag: PropTypes.oneOf(["h2", "h3", "h4"]),
  showFrameLabel: PropTypes.bool,
  frameLabel: PropTypes.string,
  className: PropTypes.string,
  showExternalLinkIcon: PropTypes.bool,
  meta: PropTypes.node,
  children: PropTypes.node,
};
