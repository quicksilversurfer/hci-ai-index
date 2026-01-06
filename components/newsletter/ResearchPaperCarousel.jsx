"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import ResearchPaperCard from "@/components/ResearchPaperCard";
import ArrowButton from "./ArrowButton";

export default function ResearchPaperCarousel({ papers, className, section }) {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = useCallback(() => {
        const el = scrollContainerRef.current;
        if (el) {
            const { scrollLeft, scrollWidth, clientWidth } = el;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
        }
    }, []);

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        checkScroll();

        // Check again after a frame to ensure layout is settled
        requestAnimationFrame(checkScroll);

        const observer = new ResizeObserver(checkScroll);
        observer.observe(el);

        el.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);

        return () => {
            observer.disconnect();
            el.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, [checkScroll, papers]);

    const scroll = (direction) => {
        const el = scrollContainerRef.current;
        if (el) {
            const scrollAmount = el.clientWidth * 0.75;
            el.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    if (!papers || papers.length === 0) return null;

    return (
        <div className={clsx("relative", className)}>
            {/* Navigation Arrows */}
            {canScrollLeft && (
                <div className="absolute left-0 top-1/2 z-20 -translate-y-1/2 -translate-x-1/2 transition-opacity duration-200">
                    <ArrowButton direction="left" onClick={() => scroll("left")} className="bg-white dark:bg-flexoki-base-900 shadow-xl" />
                </div>
            )}

            {canScrollRight && (
                <div className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1/2 transition-opacity duration-200">
                    <ArrowButton direction="right" onClick={() => scroll("right")} className="bg-white dark:bg-flexoki-base-900 shadow-xl" />
                </div>
            )}

            {/* Scrollable Container */}
            <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                style={{
                    maskImage: `linear-gradient(to right, ${canScrollLeft ? 'transparent' : 'black'} 0%, black 120px, black calc(100% - 120px), ${canScrollRight ? 'transparent' : 'black'} 100%)`,
                    WebkitMaskImage: `linear-gradient(to right, ${canScrollLeft ? 'transparent' : 'black'} 0%, black 120px, black calc(100% - 120px), ${canScrollRight ? 'transparent' : 'black'} 100%)`
                }}
            >
                {papers.map((paper, idx) => {
                    const arxivId = paper.id || paper.arxiv_id || "";
                    const url = paper.url || paper.pdf_url || (arxivId ? `https://arxiv.org/abs/${arxivId}` : "#");

                    return (
                        <div key={arxivId || idx} className="snap-start shrink-0 h-full">
                            <ResearchPaperCard
                                className="w-[220px]"
                                variant="standard"
                                arxivId={arxivId}
                                url={url}
                                title={paper.title || "Untitled paper"}
                                fillHeight
                                section={section}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

ResearchPaperCarousel.propTypes = {
    papers: PropTypes.array,
    className: PropTypes.string,
    section: PropTypes.string,
};
