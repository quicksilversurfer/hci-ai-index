"use client";

// Credit: https://www.joshwcomeau.com/react/animated-sparkles-in-react/

import React from "react";
import { useState } from "react";
import { useTheme } from "next-themes";

import { range } from "@/app/lib/utils/range";
import { useRandomInterval } from "@/app/lib/utils/useRandomInterval";

let DEFAULT_COLOR = "#FFC700";

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const generateSparkle = (color) => {
  const sparkle = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: random(0, 100) + "%",
      left: random(0, 100) + "%",
    },
  };
  return sparkle;
};

export default function Sparkles({
  color = DEFAULT_COLOR,
  children,
  ...delegated
}) {
  const { theme } = useTheme();
  DEFAULT_COLOR = theme === "dark" ? "#FFC700" : "#DA702C";
  const [sparkles, setSparkles] = useState(() => {
    return range(2).map(() => generateSparkle(color));
  });

  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color);
      const now = Date.now();
      const nextSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt;
        return delta < 1000;
      });
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    50,
    1000
  );

  return (
    <span {...delegated} className="inline-block relative">
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <span className="relative z-10">
        {children}
      </span>
    </span>
  );
}

const Sparkle = ({ size, color, style }) => {
  const path =
    "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";
  return (
    <span
      className="absolute block motion-safe:animate-come-in-out"
      style={style}
    >
      <svg
        className="block motion-safe:animate-sparkle-spin"
        width={size}
        height={size}
        viewBox="0 0 68 68"
        fill="none"
      >
        <path d={path} fill={color} />
      </svg>
    </span>
  );
};
