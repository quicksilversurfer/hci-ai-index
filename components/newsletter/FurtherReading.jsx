"use client";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SectionHeader from "./SectionHeader";
import ResearchPaperCard from "@/components/ResearchPaperCard";

export default function FurtherReading({ items }) {
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

  if (!items?.length) return null;

  const INITIAL_COUNT = 3;
  const shouldTruncate = isMobile && !showAll;
  const visibleItems = shouldTruncate ? items.slice(0, INITIAL_COUNT) : items;
  const hasMore = isMobile && items.length > INITIAL_COUNT;

  return (
    <section id="further-reading" className="space-y-rhythm-4">
      <div className="flex items-center justify-between gap-4 h-11">
        <SectionHeader label="FURTHER READING" count={items.length} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleItems.map((item) => (
          <ResearchPaperCard
            key={item.id}
            variant="standard"
            className="h-full aspect-[3/4]"
            fillHeight
            arxivId={item.id}
            url={item.url}
            title={item.title}
            description={item.short_desc || item.shortDesc}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-flexoki-base-850 border border-flexoki-base-200 dark:border-flexoki-base-800 text-body-sm font-medium text-hci-secondary dark:text-flexoki-base-200 hover:border-hci-primary dark:hover:border-flexoki-base-500 transition-colors shadow-sm"
          >
            {showAll ? "Show less" : `Show ${items.length - INITIAL_COUNT} more`}
          </button>
        </div>
      )}
    </section>
  );
}

FurtherReading.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
