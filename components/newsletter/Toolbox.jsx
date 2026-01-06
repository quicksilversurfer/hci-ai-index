"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import SectionHeader from "./SectionHeader";
import ResearchPaperCard from "../ResearchPaperCard";

const typeStyles = {
  Tool: {
    text: "text-flexoki-blue-600 dark:text-flexoki-blue-500",
    bg: "bg-flexoki-blue-50 dark:bg-flexoki-blue-900/30",
  },
  Dataset: {
    text: "text-flexoki-purple-600 dark:text-flexoki-purple-500",
    bg: "bg-flexoki-purple-50 dark:bg-flexoki-purple-900/30",
  },
  Framework: {
    text: "text-flexoki-red-600 dark:text-flexoki-red-500",
    bg: "bg-flexoki-red-50 dark:bg-flexoki-red-900/30",
  },
  Method: {
    text: "text-flexoki-green-600 dark:text-flexoki-green-500",
    bg: "bg-flexoki-green-50 dark:bg-flexoki-green-900/30",
  },
  default: {
    text: "text-base-600 dark:text-base-400",
    bg: "bg-base-50 dark:bg-base-900/30",
  },
};

export default function Toolbox({ resources }) {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!resources?.length) return null;

  const INITIAL_COUNT = 3;
  const shouldTruncate = isMobile && !showAll;
  const visibleResources = shouldTruncate ? resources.slice(0, INITIAL_COUNT) : resources;
  const hasMore = isMobile && resources.length > INITIAL_COUNT;

  return (
    <section id="toolbox" className="space-y-rhythm-4">
      <div className="flex items-center justify-between gap-4 h-11">
        <SectionHeader label="TOOLBOX" count={resources.length} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleResources.map((resource) => {
          const styles = typeStyles[resource.type] || typeStyles.default;
          const link = resource.html_url || resource.url;

          return (
            <article
              key={resource.name}
              className="relative flex flex-col border-t border-base-200 dark:border-base-800 duration-300"
            >
              <div className="pt-3 space-y-3">
                {/* Header Row: Title and Type */}
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-altSans text-body-md font-semibold leading-snug type-body-strong">
                    {resource.name}
                  </h3>
                  <span
                    className={`font-altSans text-[11px] font-bold uppercase tracking-wider shrink-0 px-2 py-0.5 rounded-full ${styles.text} ${styles.bg}`}
                  >
                    {resource.type || "Resource"}
                  </span>
                </div>

                <p className="font-altSans text-body-intermediate leading-relaxed font-light type-body-smooth line-clamp-4">
                  {resource.tech_spec ||
                    resource.techSpec ||
                    resource.description}
                </p>

                {(resource.paper_id || resource.arxivId) && (
                  <div className="mt-auto pt-2">
                    <ResearchPaperCard
                      variant="id-only"
                      arxivId={resource.paper_id || resource.arxivId}
                      url={resource.html_url || resource.url}
                      title={resource.name}
                    />
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-flexoki-base-850 border border-flexoki-base-200 dark:border-flexoki-base-800 text-body-sm font-medium text-hci-secondary dark:text-flexoki-base-200 hover:border-hci-primary dark:hover:border-flexoki-base-500 transition-colors shadow-sm"
          >
            {showAll ? "Show less" : `Show ${resources.length - INITIAL_COUNT} more`}
          </button>
        </div>
      )}
    </section>
  );
}

Toolbox.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
};
