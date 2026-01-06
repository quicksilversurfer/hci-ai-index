"use client";

import clsx from "clsx";
import PropTypes from "prop-types";
import { useLongHover } from "@/hooks/useLongHover";
import { useAnnotation } from "@/contexts/AnnotationContext";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function PlusIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function AddButton({ onAdd, className }) {
  const [added, setAdded] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "p-1.5 rounded-full transition-all duration-200",
        "text-base-400 dark:text-base-500", // Subtle default
        "hover:text-base-900 dark:hover:text-base-100", // Brighter on hover
        "hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.06)]", // Subtle background on hover
        added && "!text-emerald-600 dark:!text-emerald-500 !bg-emerald-50 dark:!bg-emerald-900/20",
        className
      )}
      title="Add as snippet"
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.div
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <CheckIcon className="w-5 h-5 stroke-2" />
          </motion.div>
        ) : (
          <motion.div
            key="plus"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <PlusIcon className="w-5 h-5 stroke-2" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-4 w-4 text-base-500 dark:text-flexoki-base-400"
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
    <div className="mb-1 font-altSans text-ui uppercase tracking-widest text-flexoki-base-500">
      {label}
    </div>
  );
}

// Simplified variant mapping
const VARIANT_STYLES = {
  summary: "compact",
  compact: "compact",
  standard: "medium",
  medium: "medium",
  detailed: "full",
  full: "full",
  pill: "id-only",
  "id-only": "id-only",
};

const BASE_CARD_CLASSES = clsx(
  "rounded-[10px] border border-[rgba(34,34,34,0.18)]",
  "bg-[linear-gradient(180deg,_#ffffff_0%,_#f5f5f5_100%)]",
  "shadow-paper-soft",
  "dark:border-[rgba(255,255,255,0.12)]",
  "dark:bg-[linear-gradient(180deg,_#1c1b1a_0%,_#11100f_100%)]",
  "dark:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.35)]",
  "group-hover:border-[rgba(34,34,34,0.45)] group-hover:dark:border-[rgba(255,255,255,0.25)]"
);

function ArxivPill({ arxivId }) {
  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full border border-[rgba(34,34,34,0.12)]",
        "bg-[rgba(1,1,1,0.06)] px-3 py-1 font-altSans text-body-sm leading-tight font-medium text-base-800",
        "shadow-sm",
        "dark:border-[rgba(255,255,255,0.16)] dark:bg-white/5 dark:text-flexoki-base-50 dark:shadow-md"
      )}
    >
      {arxivId}
    </div>
  );
}

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
  enlargeTitle = false,
  fillHeight = false,
  section = null, // New prop for section context
  children,
}) {
  const resolvedVariant = VARIANT_STYLES[variant] || "compact";
  const isTitleOnly = !description;
  const HeadingTag = titleTag;
  const headerClass = clsx(
    "mb-2 flex h-4 items-center justify-between gap-3",
    resolvedVariant === "full" &&
    "-mx-4 px-2 sm:-mx-6 sm:px-3 md:-mx-12 md:px-4"
  );
  const handleManualAdd = () => {
    addAnnotation({
      type: 'interest',
      content: title,
      title: title,
      paperTitle: title,
      sectionTitle: section, // Capture the section context
      url: url,
    });
  };

  const renderHeader = (withIcon, usePill = true) => (
    <div className={headerClass}>
      {usePill ? (
        <ArxivPill arxivId={arxivId} />
      ) : (
        <span className="font-altSans text-body-sm leading-tight font-medium text-base-500 dark:text-flexoki-base-400">
          {arxivId}
        </span>
      )}
      <div className="flex items-center gap-2">
        <AddButton onAdd={handleManualAdd} />
        {withIcon && showExternalLinkIcon ? <ExternalLinkIcon /> : null}
      </div>
    </div>
  );

  const { addAnnotation } = useAnnotation();
  const { onMouseEnter, onMouseLeave } = useLongHover(() => {
    addAnnotation({
      type: 'interest', // Distinct from 'highlight'
      content: title,
      title: title,
      paperTitle: title,
      sectionTitle: section,
      url: url,
    });
  }, 2000); // 2 seconds hover

  const baseLink = clsx(
    "group block transition-colors transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flexoki-base-400",
    className
  );

  if (resolvedVariant === "id-only") {
    return (
      <div className={className}>
        {showFrameLabel ? <FrameLabel label={frameLabel} /> : null}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className={clsx(baseLink, "w-full inline-block max-w-fit")}
          aria-label={`Open arXiv paper ${arxivId} in new tab`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <article
            className={clsx(
              BASE_CARD_CLASSES,
              "px-3 py-2 font-altSans transition-colors duration-150 flex items-center gap-2"
            )}
          >
            <span className="font-altSans text-body-sm leading-tight font-medium text-base-500 dark:text-flexoki-base-400">
              {arxivId}
            </span>
            <div className="flex items-center gap-1">
              <AddButton onAdd={handleManualAdd} className="!p-0.5 -my-1" />
              {showExternalLinkIcon ? <ExternalLinkIcon /> : null}
            </div>
          </article>
        </a>
      </div>
    );
  }

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
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <article
            className={clsx(
              BASE_CARD_CLASSES,
              "p-[10px] font-altSans transition-colors duration-150"
            )}
          >
            {renderHeader(true, true)}
            <HeadingTag className="font-altSans mt-2 text-body-md leading-snug font-semibold text-hci-primary dark:text-flexoki-base-50 line-clamp-3">
              {title}
            </HeadingTag>
            {renderMeta}
            {description ? (
              <p className="mt-2 font-altSans text-body-sm leading-relaxed font-light text-hci-secondary dark:text-flexoki-base-300 line-clamp-3">
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
      <div className={clsx(fillHeight && "h-full")}>
        {showFrameLabel ? <FrameLabel label={frameLabel} /> : null}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className={clsx(
            baseLink,
            fillHeight
              ? "h-full"
              : isTitleOnly
                ? "w-full max-w-[12rem] aspect-[176/256] min-h-[256px]"
                : "w-full max-w-2xl"
          )}
          aria-label={`Open paper ${title} in new tab`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <article
            className={clsx(
              BASE_CARD_CLASSES,
              "p-[16px] font-altSans transition-colors duration-150 flex min-h-[114px] flex-col",
              fillHeight && "h-full",
              isTitleOnly && "aspect-[176/256] min-h-[256px]"
            )}
          >
            {renderHeader(true, false)}
            <HeadingTag
              className={clsx(
                "font-altSans mt-2 font-semibold text-hci-primary dark:text-flexoki-base-50",
                enlargeTitle
                  ? "text-body-xl leading-tight"
                  : "text-body-md leading-snug",
                isTitleOnly && "line-clamp-6"
              )}
            >
              {title}
            </HeadingTag>
            {renderMeta}
            {description ? (
              <div className="mt-4 flex-1">
                <p className="font-altSans text-body-intermediate leading-relaxed font-light text-hci-secondary dark:text-flexoki-base-300 line-clamp-6">
                  {description}
                </p>
              </div>
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
        className={clsx(baseLink, "w-full h-full")}
        aria-label={`Open paper ${title} in new tab`}
      >
        <article
          className={clsx(
            BASE_CARD_CLASSES,
            "px-6 py-8 font-altSans transition-colors duration-150 md:px-12 md:pb-12 md:pt-6 flex h-full flex-col overflow-hidden"
          )}
        >
          {renderHeader(true, false)}
          <HeadingTag className="font-altDisplay mt-8 text-pretty text-center text-3xl font-semibold leading-tight text-hci-primary dark:text-flexoki-base-50 md:mt-14 md:text-display-3">
            {title}
          </HeadingTag>
          {authors.length ? (
            <p className="mt-4 text-center font-altSans text-body-sm text-hci-secondary dark:text-flexoki-base-300 md:text-body-intermediate">
              {authors.join(", ")}
            </p>
          ) : null}
          {renderMeta}
          {highlight ? (
            <p className="font-serif mx-auto mt-6 text-pretty max-w-2xl text-center text-body-md font-normal leading-relaxed text-flexoki-red-600 dark:text-flexoki-red-400">
              {highlight}
            </p>
          ) : null}
          <div className="mt-5 mx-auto flex-1 space-y-3 font-altSans text-body-sm leading-relaxed text-hci-secondary dark:text-flexoki-base-200 md:text-body-md max-w-3xl w-full overflow-hidden">
            {description ? <p>{description}</p> : null}
            {sections.map((section) => (
              <p key={section.label}>
                <span className="font-semibold text-hci-primary dark:text-flexoki-base-100">
                  {section.label}:
                </span>{" "}
                {section.text}
              </p>
            ))}
            {children ? <div className="pt-6">{children}</div> : null}
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
  enlargeTitle: PropTypes.bool,
  fillHeight: PropTypes.bool,
  children: PropTypes.node,
};
