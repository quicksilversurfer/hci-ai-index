"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import SectionHeader from "./SectionHeader";
import ResearchPaperCard from "@/components/ResearchPaperCard";

export default function StrategicTrends({ trends }) {
  const items = useMemo(
    () =>
      (trends || []).map((t) => ({
        headline: t.headline || t.name,
        narrative: t.narrative || t.description,
        papers: t.paper_ids || t.papers || [],
      })),
    [trends]
  );

  const [index, setIndex] = useState(0);
  const [contentReady, setContentReady] = useState(true);

  const current = items[index] || null;

  const stackItems = useMemo(() => {
    if (!items.length) return [];
    const visibleCount = Math.min(items.length, 3);
    return Array.from({ length: visibleCount }, (_, offset) => {
      const itemIndex = (index + offset) % items.length;
      return { ...items[itemIndex], stackOffset: offset, itemIndex };
    });
  }, [index, items]);

  if (!current) return null;

  const goTo = useCallback(
    (idx) => {
      setIndex((idx + items.length) % items.length);
    },
    [items.length]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const [expandedKey, setExpandedKey] = useState(null);

  useEffect(() => {
    setContentReady(false);
    const frame = requestAnimationFrame(() => setContentReady(true));
    return () => cancelAnimationFrame(frame);
  }, [index]);

  useEffect(() => {
    setExpandedKey(null);
  }, [index]);

  const handleKeyNavigation = useCallback(
    (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        prev();
      }
    },
    [next, prev]
  );

  return (
    <section id="strategic-trends" className="space-y-rhythm-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeader label="STRATEGIC TRENDS" />
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-altSans text-ui uppercase tracking-wide text-flexoki-base-600 dark:text-flexoki-base-400">
            {index + 1}/{items.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-flexoki-base-200 bg-flexoki-base-50 text-flexoki-base-800 shadow-sm transition hover:-translate-y-[1px] hover:border-flexoki-base-400 hover:bg-flexoki-base-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flexoki-base-700 dark:border-flexoki-base-700 dark:bg-flexoki-base-900 dark:text-flexoki-base-100 dark:hover:border-flexoki-base-600 dark:hover:bg-flexoki-base-850"
              aria-label="Previous trend"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-flexoki-base-200 bg-flexoki-base-50 text-flexoki-base-800 shadow-sm transition hover:-translate-y-[1px] hover:border-flexoki-base-400 hover:bg-flexoki-base-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flexoki-base-700 dark:border-flexoki-base-700 dark:bg-flexoki-base-900 dark:text-flexoki-base-100 dark:hover:border-flexoki-base-600 dark:hover:bg-flexoki-base-850"
              aria-label="Next trend"
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
      </div>

      <p className="font-altSans text-base leading-relaxed">
        {items.map((item, idx) => {
          const isActive = idx === index;
          return (
            <Fragment key={`${item.headline}-${idx}`}>
              {idx > 0 ? (
                <span className="px-1 text-flexoki-base-400 dark:text-flexoki-base-600">
                  ·
                </span>
              ) : null}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goTo(idx);
                }}
                className={clsx(
                  "inline text-left transition-colors",
                  isActive
                    ? "font-semibold text-flexoki-base-900 dark:text-flexoki-base-50"
                    : "text-flexoki-base-500 hover:text-flexoki-base-800 dark:text-flexoki-base-500 dark:hover:text-flexoki-base-200"
                )}
              >
                {item.headline}
              </a>
              {idx < items.length - 1 ? (
                <span className="px-[2px]" aria-hidden="true" />
              ) : null}
            </Fragment>
          );
        })}
      </p>

      <div
        className="relative mt-12 min-h-[520px]"
        role="region"
        aria-label="Strategic trends carousel"
        tabIndex={0}
        onKeyDown={handleKeyNavigation}
      >
        <div className="relative h-full min-h-[360px] overflow-visible">
          {stackItems.map((item) => {
            const active = item.stackOffset === 0;
            const offset = item.stackOffset;
            const translateY = offset * 10;
            const scale = active ? 1 : 0.98;
            const paperCount = item.papers?.length || 0;
            const relatedPapers = item.papers || [];
            const itemKey = `${item.headline}-${item.itemIndex}`;
            const showAllPapers = expandedKey === itemKey;
            const visiblePapers = showAllPapers
              ? relatedPapers
              : relatedPapers.slice(0, 4);
            const moreCount = Math.max(
              relatedPapers.length - visiblePapers.length,
              0
            );
            const paperContainerClasses = clsx(
              "flex gap-4 rounded-md border border-flexoki-base-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm dark:border-flexoki-base-700 dark:bg-flexoki-base-900/50 lg:pt-12",
              showAllPapers
                ? "flex-wrap overflow-visible"
                : "flex-nowrap overflow-x-auto",
              "lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none"
            );
            return (
              <article
                key={`${item.headline}-${item.itemIndex}`}
                className={clsx(
                  "absolute transition duration-500",
                  active
                    ? contentReady
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                    : "opacity-0"
                )}
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  zIndex: 10 - offset,
                  pointerEvents: active ? "auto" : "none",
                }}
                aria-hidden={!active}
              >
                <div className="grid h-full gap-12 lg:grid-cols-[0.85fr_1.25fr] lg:items-start">
                  <div className="space-y-6">
                    <div className="mb-6 flex items-center gap-3 text-xs font-altSans">
                      <span className="inline-flex items-center rounded-full bg-flexoki-base-100 px-3 py-1 font-semibold text-flexoki-base-700 ring-1 ring-flexoki-base-200 dark:bg-flexoki-base-900 dark:text-flexoki-base-200 dark:ring-flexoki-base-700">
                        Trend {item.itemIndex + 1}
                      </span>
                      <span className="text-flexoki-base-500 dark:text-flexoki-base-400">
                        {paperCount} paper{paperCount === 1 ? "" : "s"}
                      </span>
                    </div>
                    <h3 className="font-altSans text-display-3 font-semibold leading-tight text-flexoki-base-900 dark:text-flexoki-base-50">
                      {item.headline}
                    </h3>
                    <p className="font-altSans text-body-md leading-relaxed text-flexoki-base-800 dark:text-flexoki-base-200">
                      {item.narrative}
                    </p>
                  </div>

                  <div className={paperContainerClasses}>
                    {relatedPapers.length > 0 ? (
                      <>
                        {visiblePapers.map((paper, paperIdx) => {
                          const url =
                            paper.url ||
                            paper.pdf_url ||
                            (paper.id
                              ? `https://arxiv.org/abs/${paper.id}`
                              : "#");
                          return (
                            <ResearchPaperCard
                              key={paper.id || paper.title || paperIdx}
                              className="min-w-[220px] flex-1"
                              variant="standard"
                              arxivId={paper.id}
                              url={url}
                              title={paper.title || "Untitled paper"}
                            />
                          );
                        })}
                        {moreCount > 0 && !showAllPapers ? (
                          <button
                            type="button"
                            onClick={() => setExpandedKey(itemKey)}
                            className="min-w-[140px] flex-shrink-0 self-stretch rounded-md border border-dashed border-flexoki-base-300 px-4 py-3 text-left text-sm font-semibold text-flexoki-base-700 transition hover:border-flexoki-base-500 hover:bg-flexoki-base-50 dark:border-flexoki-base-700 dark:text-flexoki-base-200 dark:hover:border-flexoki-base-500 dark:hover:bg-flexoki-base-900"
                          >
                            +{moreCount} more paper{moreCount === 1 ? "" : "s"}
                          </button>
                        ) : null}
                        {showAllPapers && moreCount > 0 ? (
                          <button
                            type="button"
                            onClick={() => setExpandedKey(null)}
                            className="min-w-[140px] flex-shrink-0 rounded-md border border-flexoki-base-200 px-3 py-2 text-sm font-medium text-flexoki-base-700 transition hover:-translate-y-[1px] hover:border-flexoki-base-400 hover:bg-flexoki-base-50 dark:border-flexoki-base-700 dark:text-flexoki-base-200 dark:hover:border-flexoki-base-500 dark:hover:bg-flexoki-base-900"
                          >
                            Show less
                          </button>
                        ) : null}
                      </>
                    ) : (
                      <p className="text-sm text-flexoki-base-500 dark:text-flexoki-base-400">
                        No linked papers yet.
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

StrategicTrends.propTypes = {
  trends: PropTypes.arrayOf(PropTypes.object).isRequired,
};
