"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import ResearchPaperCard from "@/components/ResearchPaperCard";
import SectionHeader from "./SectionHeader";
import ArrowButton from "./ArrowButton";

export default function FeaturedPapers({ papers }) {
  const CARD_RATIO = 11 / 8; // Taller aspect ratio
  const CARD_BASE_WIDTH = 900;
  const CARD_HEIGHT = Math.round(CARD_BASE_WIDTH * CARD_RATIO);
  const CONTAINER_HEIGHT = CARD_HEIGHT + 120;
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const count = papers.length;
  const showArrows = count > 1;

  // Detect mobile/tablet viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toUrl = (paper) =>
    paper.assets?.pdf || `https://arxiv.org/abs/${paper.id}`;

  const toSections = (paper) => {
    const sections = [];
    if (paper.breakthrough || paper.design_consideration) {
      sections.push({
        label: "Method",
        text: paper.breakthrough || paper.design_consideration,
      });
    }
    if (paper.caveat) {
      sections.push({ label: "Caveats", text: paper.caveat });
    }
    if (paper.questions_opened?.length || paper.questionsOpened?.length) {
      sections.push({
        label: "Reflections",
        text: (paper.questions_opened || paper.questionsOpened).join(" · "),
      });
    }
    return sections;
  };

  useEffect(() => {
    setIndex(0);
  }, [count]);

  const paginate = useCallback(
    (newDirection) => {
      if (!count) return;
      setIndex((prevIndex) => {
        let nextIndex = prevIndex + newDirection;
        if (nextIndex < 0) nextIndex = count - 1;
        if (nextIndex >= count) nextIndex = 0;
        return nextIndex;
      });
    },
    [count]
  );

  const next = useCallback(() => paginate(1), [paginate]);
  const prev = useCallback(() => paginate(-1), [paginate]);

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

  // Stack calculation (Desktop Only)
  const visibleItems = [];
  if (!isMobile) {
    for (let i = 0; i < Math.min(count, 3); i++) {
      const itemIndex = (index + i) % count;
      visibleItems.push({
        paper: papers[itemIndex],
        offset: i, // 0 is top, 1 is under, 2 is bottom
        key: papers[itemIndex].id || itemIndex,
      });
    }
  }

  const mobileScrollRef = useRef(null);

  // Track if we are programmatically scrolling
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Sync scroll position when index changes (e.g. via arrows)
  useEffect(() => {
    if (isMobile && mobileScrollRef.current) {
      const container = mobileScrollRef.current;
      const cardWidth = container.clientWidth;
      const targetScroll = index * cardWidth;

      // Calculate distance to determine if we need to scroll
      if (Math.abs(container.scrollLeft - targetScroll) > 5) {
        // Mark as scrolling programmatically
        isScrollingRef.current = true;

        container.scrollTo({
          left: targetScroll,
          behavior: "smooth",
        });

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Reset scrolling flag after animation finishes
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 500); // Wait long enough for smooth scroll to complete
      }
    }
  }, [index, isMobile]);

  const handleMobileScroll = () => {
    // Ignore scroll events triggered by our own programmatic scroll
    if (isScrollingRef.current) return;

    if (mobileScrollRef.current) {
      const container = mobileScrollRef.current;
      const cardWidth = container.clientWidth;
      const newIndex = Math.round(container.scrollLeft / cardWidth);

      // Only update state if index actually changed to avoid loop
      if (newIndex !== index && newIndex >= 0 && newIndex < count) {
        setIndex(newIndex);
      }
    }
  };

  return (
    <section id="featured-papers" className="space-y-rhythm-4">
      <div className="flex items-center justify-between gap-4">
        <SectionHeader
          label="Featured"
          count={`${index + 1}/${count}`}
        />

        {/* Mobile Header Controls */}
        {isMobile && count > 1 && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <ArrowButton
                direction="left"
                onClick={prev}
                disabled={index === 0}
              />
              <ArrowButton
                direction="right"
                onClick={next}
                disabled={index === count - 1}
              />
            </div>
          </div>
        )}

        {/* Desktop Controls */}
        {showArrows && !isMobile ? (
          <div className="flex items-center gap-2">
            <ArrowButton
              direction="left"
              onClick={prev}
              disabled={!showArrows}
            />
            <ArrowButton
              direction="right"
              onClick={next}
              disabled={!showArrows}
            />
          </div>
        ) : null}
      </div>

      <div
        className={clsx(
          "relative flex flex-col items-center justify-center outline-none",
          isMobile ? "w-full" : "overflow-visible"
        )}
        style={!isMobile ? { height: CONTAINER_HEIGHT } : {}}
        tabIndex={0}
        role="region"
        aria-label="Featured papers carousel"
        onKeyDown={handleKeyNavigation}
      >
        {/* Glow Effects (Shared) */}
        {!isMobile && (
          <>
            <div
              className="absolute inset-x-8 top-8 bottom-28 rounded-[48px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 140% 100% at 50% 50%, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.06) 40%, rgba(0,0,0,0) 70%)",
                filter: "blur(60px)",
                opacity: 0.7,
              }}
            />
            <div
              className="absolute inset-x-12 top-12 bottom-32 rounded-[40px] pointer-events-none dark:hidden"
              style={{
                background:
                  "radial-gradient(ellipse 120% 80% at 50% 45%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 50%, rgba(0,0,0,0) 85%)",
                filter: "blur(40px)",
                opacity: 0.8,
              }}
            />
            <div
              className="absolute inset-x-12 top-12 bottom-32 rounded-[40px] pointer-events-none dark:block hidden"
              style={{
                background:
                  "radial-gradient(ellipse 120% 80% at 50% 45%, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0,0,0,0) 85%)",
                filter: "blur(40px)",
                opacity: 0.9,
              }}
            />
          </>
        )}

        <div
          className={clsx(
            "relative w-full max-w-5xl h-full flex items-center justify-center",
            !isMobile && "px-4"
          )}
        >
          {isMobile ? (
            /* MOBILE VIEW (Native Scroll Snap) */
            <div
              ref={mobileScrollRef}
              className="w-full overflow-x-auto snap-x snap-mandatory flex gap-4 scrollbar-hide py-4 px-1"
              onScroll={handleMobileScroll}
              style={{ scrollBehavior: 'smooth' }}
            >
              {papers.map((paper, idx) => (
                <div key={paper.id || idx} className="w-full flex-shrink-0 snap-center">
                  <ResearchPaperCard
                    variant="detailed"
                    className="w-full shadow-xl border border-flexoki-base-200/20 dark:border-flexoki-base-800/30 rounded-[10px] bg-white dark:bg-black"
                    arxivId={paper.id}
                    url={toUrl(paper)}
                    title={paper.title}
                    authors={paper.authors || []}
                    description={paper.spark || paper.finding || ""}
                    highlight={paper.impact || paper.why_it_matters || ""}
                    sections={toSections(paper)}
                    section="Featured Papers"
                    meta={
                      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 font-altSans text-ui text-flexoki-base-600 dark:text-flexoki-base-300">
                        <span className="font-medium">{paper.status}</span>
                        <span className="opacity-40">·</span>
                        <span className="font-medium">{paper.published}</span>
                      </div>
                    }
                  >
                    {(paper.tags?.length ?? 0) > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2 font-altSans">
                        {paper.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-flexoki-base-100/60 backdrop-blur-sm px-3 py-1.5 text-ui font-semibold text-flexoki-base-800 border border-flexoki-base-200/40 shadow-sm dark:bg-flexoki-base-850/60 dark:text-flexoki-base-100 dark:border-flexoki-base-700/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </ResearchPaperCard>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence key="desktop-presence" initial={false} mode="sync">
              {/* DESKTOP VIEW (Stack) */}
              {visibleItems.map((item) => {
                const { paper, offset, key } = item;
                // offset 0 = active
                // offset 1 = behind
                // offset 2 = further behind

                // Fan out configuration
                // We rotate alternatingly to create a "messy stack" or "hand of cards" feel
                const rotate = offset === 0 ? 0 : (offset % 2 === 0 ? 3 : -3) * offset;
                const translateY = offset * 12; // Less vertical spacing since we fan out
                const translateX = offset === 0 ? 0 : (offset % 2 === 0 ? 15 : -15) * offset; // Slight horizontal shift

                return (
                  <motion.div
                    key={`desktop-${key}`}
                    className="absolute"
                    style={{
                      width: "100%",
                      maxWidth: CARD_BASE_WIDTH,
                      height: CARD_HEIGHT,
                      zIndex: 30 - offset, // 30, 29, 28
                      transformOrigin: "50% 100%", // Rotate from bottom center
                    }}
                    initial={{
                      scale: 0.9,
                      y: 50,
                      opacity: 0,
                      rotate: 0,
                    }}
                    animate={{
                      scale: 1 - offset * 0.05, // 1, 0.95, 0.90
                      y: translateY,
                      x: translateX,
                      rotate: rotate,
                      opacity: 1 - offset * 0.1, // Fade out less so they are visible
                      filter: `blur(${offset * 1}px)`, // Less blur to see details
                    }}
                    exit={{
                      scale: 1.05, // Pop out slightly before leaving
                      opacity: 0,
                      filter: "blur(10px)",
                      transition: { duration: 0.4 },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    <ResearchPaperCard
                      variant="detailed"
                      className="w-full h-full overflow-hidden [&_a]:h-full [&_a]:w-full [&_a]:max-w-none [&_article]:h-full [&_article]:overflow-hidden shadow-2xl border border-flexoki-base-200/20 dark:border-flexoki-base-800/30 rounded-[10px] backdrop-blur-sm bg-white/50 dark:bg-black/50"
                      arxivId={paper.id}
                      url={toUrl(paper)}
                      title={paper.title}
                      authors={paper.authors || []}
                      description={paper.spark || paper.finding || ""}
                      highlight={paper.impact || paper.why_it_matters || ""}
                      sections={toSections(paper)}
                      section="Featured Papers"
                      meta={
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 font-altSans text-ui text-flexoki-base-600 dark:text-flexoki-base-300">
                          <span className="font-medium">{paper.status}</span>
                          <span className="opacity-40">·</span>
                          <span className="font-medium">{paper.published}</span>
                        </div>
                      }
                    >
                      {(paper.tags?.length ?? 0) > 0 ? (
                        <div className="mt-4 flex flex-wrap justify-center gap-2 font-altSans">
                          {paper.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-flexoki-base-100/60 backdrop-blur-sm px-3 py-1.5 text-ui font-semibold text-flexoki-base-800 border border-flexoki-base-200/40 shadow-sm dark:bg-flexoki-base-850/60 dark:text-flexoki-base-100 dark:border-flexoki-base-700/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </ResearchPaperCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {/* Controls - Show at bottom for Desktop Only */}
        {!isMobile && showArrows ? (
          <div className="absolute inset-x-0 -bottom-16 z-40 flex items-center justify-center gap-4">
            <ArrowButton
              direction="left"
              onClick={prev}
              disabled={!showArrows}
            />
            <div className="flex items-center gap-3 rounded-full bg-flexoki-base-900/95 text-flexoki-base-50 px-4 py-2.5 text-ui font-altSans shadow-xl backdrop-blur-md border border-flexoki-base-700/30 dark:bg-flexoki-base-50/95 dark:text-flexoki-base-900 dark:border-flexoki-base-200/30">
              <span className="text-ui font-medium tracking-wide">
                {index + 1} / {count}
              </span>
              <div className="w-px h-4 bg-flexoki-base-300 dark:bg-flexoki-base-600"></div>
              <span className="text-ui font-medium text-flexoki-base-200 dark:text-flexoki-base-700">
                Featured
              </span>
            </div>
            <ArrowButton
              direction="right"
              onClick={next}
              disabled={!showArrows}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

FeaturedPapers.propTypes = {
  papers: PropTypes.arrayOf(PropTypes.object).isRequired,
};
