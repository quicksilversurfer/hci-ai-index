"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import ArrowButton from "./ArrowButton";

function formatConsideration(text) {
  if (!text) return null;

  // Find the index of the last question mark
  const lastQuestionMarkIndex = text.lastIndexOf("?");

  if (lastQuestionMarkIndex === -1) {
    return text;
  }

  // Find the start of the sentence ending with that question mark
  // We look backwards from the question mark for the nearest sentence terminator (. ! ?)
  // or the start of the string
  let startIndex = 0;
  const terminators = ['.', '!', '?'];

  for (let i = lastQuestionMarkIndex - 1; i >= 0; i--) {
    if (terminators.includes(text[i])) {
      startIndex = i + 1;
      break;
    }
  }

  const before = text.substring(0, startIndex);
  const question = text.substring(startIndex, lastQuestionMarkIndex + 1);
  const after = text.substring(lastQuestionMarkIndex + 1);

  return (
    <>
      {before}
      <span className="text-flexoki-red-600 dark:text-flexoki-red-400">
        {question}
      </span>
      {after}
    </>
  );
}

export default function ReflectionPrompt({
  title,
  description,
  considerations,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % considerations.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + considerations.length) % considerations.length
    );
  };

  const hasConsiderations = considerations && considerations.length > 0;

  return (
    <section id="reflection" className="space-y-rhythm-4">
      <div className="flex items-center justify-between gap-4 h-11">
        <SectionHeader label="REFLECTION" count={considerations.length} />
        {hasConsiderations && considerations.length > 1 && (
          <div className="flex items-center gap-2">
            <ArrowButton direction="left" onClick={prev} />
            <ArrowButton direction="right" onClick={next} />
          </div>
        )}
      </div>
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Left Column (Approx 40%) */}
        <div className="space-y-6 lg:col-span-5">
          <h3 className="font-altSans text-2xl leading-relaxed type-body-strong text-pretty">
            {title}
          </h3>
          <p className="font-altSans text-body-md leading-relaxed type-body-smooth text-pretty">
            {description}
          </p>
        </div>

        {/* Right Column (Approx 60%) - Rotating Considerations */}
        {hasConsiderations && (
          <div className="flex flex-col justify-between items-start lg:items-center lg:col-span-7 min-h-[320px] mt-4 lg:mt-0">
            <div className="relative w-full max-w-2xl text-left lg:text-center flex items-center justify-start lg:justify-center flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="font-serif text-xl md:text-2xl font-normal leading-relaxed type-body-smooth"
                >
                  {formatConsideration(considerations[currentIndex])}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Custom Indicator */}
            <div className="mt-8 flex justify-start lg:justify-center w-full">
              <span className="type-label !font-medium opacity-80">
                {currentIndex + 1} / {considerations.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

ReflectionPrompt.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  considerations: PropTypes.arrayOf(PropTypes.string).isRequired,
};
