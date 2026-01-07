"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import ArrowButton from "./ArrowButton";
import ResearchPaperCarousel from "./ResearchPaperCarousel";

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
  const [isMobile, setIsMobile] = useState(false);
  // direction is kept but mostly unused for the vertical slide, 
  // unless we want to control exit direction. 
  // For "slide from bottom", we usually just always enter from bottom.
  const [contentReady, setContentReady] = useState(true);
  const [visited, setVisited] = useState(new Set([0]));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const current = items[index] || null;

  if (!current) return null;

  const goTo = useCallback(
    (idx) => {
      setIndex((idx + items.length) % items.length);
    },
    [items.length]
  );

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);



  useEffect(() => {
    setContentReady(false);
    const frame = requestAnimationFrame(() => setContentReady(true));
    return () => cancelAnimationFrame(frame);
  }, [index]);

  useEffect(() => {
    setVisited((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
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

  const containerVariants = {
    enter: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    initial: {
      y: 15,
      opacity: 0,
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      y: -10,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };



  return (
    <section id="strategic-trends" className="space-y-rhythm-4">
      <div className="flex items-center justify-between gap-4 h-11">
        <SectionHeader
          label="Findings"
          count={`${index + 1}/${items.length}`}
        />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <ArrowButton
              direction="left"
              onClick={prev}
              disabled={items.length <= 1}
            />
            <ArrowButton
              direction="right"
              onClick={next}
              disabled={items.length <= 1}
            />
          </div>
        </div>
      </div>

      <div className="font-altSans text-2xl leading-relaxed">
        {isMobile ? (
          // Mobile View: Show only current active headline
          <span className="interactive-link-active transition-colors">
            {current.headline}
          </span>
        ) : (
          // Desktop View: Show all headlines as clickable list
          items.map((item, idx) => {
            const isActive = idx === index;
            return (
              <Fragment key={`${item.headline}-${idx}`}>
                {idx > 0 ? (
                  <span className="px-2 type-body-smooth opacity-50">
                    ·
                  </span>
                ) : null}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(idx);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      goTo(idx);
                    }
                  }}
                  className={clsx(
                    "inline cursor-pointer whitespace-normal transition-colors outline-none focus-visible:underline",
                    isActive
                      ? "interactive-link-active"
                      : visited.has(idx)
                        ? "type-body-smooth opacity-30 hover:opacity-100 transition-opacity duration-200"
                        : "interactive-link-subtle"
                  )}
                >
                  {item.headline}
                </span>
                {idx < items.length - 1 ? (
                  <span className="px-[1px]" aria-hidden="true" />
                ) : null}
              </Fragment>
            );
          })
        )}
      </div>

      <div
        className="relative !mt-4 lg:!mt-8 min-h-[300px]"
        role="region"
        aria-label="Strategic trends carousel"
        tabIndex={0}
        onKeyDown={handleKeyNavigation}
      >
        <div className="relative h-full overflow-visible">
          <AnimatePresence initial={false} mode="wait">
            <motion.article
              key={index}
              variants={containerVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="grid h-full gap-6 lg:gap-12 lg:grid-cols-[0.85fr_1.25fr] lg:items-start"
            >
              <motion.div className="space-y-4" variants={itemVariants}>
                <p className="font-altSans text-body-md leading-relaxed type-body-smooth">
                  {current.narrative}
                </p>

              </motion.div>

              <motion.div variants={itemVariants} className="min-w-0">
                <ResearchPaperCarousel papers={current.papers} section="Strategic Findings" />
              </motion.div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

StrategicTrends.propTypes = {
  trends: PropTypes.arrayOf(PropTypes.object).isRequired,
};
