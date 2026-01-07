"use client";

import NewsletterRow from "@/components/newsletter-feed/NewsletterRow";

import { MONTH_HEX_COLORS } from "@/utils/monthColors";


// Helper to convert hex to HSL and boost saturation
function getBoostedGradient(hexColor) {
  // Remove # if present
  const hex = hexColor.replace("#", "");

  // Parse hex
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Convert to degrees/percent
  h = Math.round(h * 360);
  l = Math.round(l * 100);

  // Boost saturation (increase by 20%, clamp at 100%)
  let sPercent = Math.round(s * 100);
  sPercent = Math.min(100, sPercent + 20);

  // Scrim gradient stops (mapping lightness 50->91 from example to alpha 1->0)
  // Stops: 0%, 7%, 14%, 21%, 28%, 35%, 41%, 48%, 54%, 60%, 66%, 71%, 76%, 80%, 84%, 87%, 90%, 93%, 95%, 96%, 97%, 98%, 99%, 100%
  // L values from example: 50, 53, 55, 57, 59, 61, 63, 65, 66, 68, 70, 72, 73, 75, 77, 79, 80, 82, 83, 85, 86, 87, 89, 90, 91
  // We map these L values to Alpha: Alpha = 1 - ((L - 50) / (91 - 50))

  const referenceL = [50, 53, 55, 57, 59, 61, 63, 65, 66, 68, 70, 72, 73, 75, 77, 79, 80, 82, 83, 85, 86, 87, 89, 90, 91];
  const stopsPercent = [0, 7, 14, 21, 28, 35, 41, 48, 54, 60, 66, 71, 76, 80, 84, 87, 90, 93, 95, 96, 97, 98, 99, 100];
}

export default function MonthGroup({ month, issues, papersReviewed }) {
  // Generate a deterministic "random" configuration based on the month string
  const getBlobConfig = (monthStr) => {
    // Simple hashing to pick a variant
    const charCodeSum = monthStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const variant = charCodeSum % 3; // 3 distinct layouts

    const baseColor = MONTH_HEX_COLORS[monthStr] || "#CBE1F6";
    // We can boost saturation/lightness here if needed, similar to before
    // For now, let's use the base color but maybe varying opacities

    switch (variant) {
      // case 0:
      //   return (
      //     <>
      //       <div className="absolute -top-[30%] -right-[20%] w-[40%] h-[80%] rounded-full opacity-20 blur-[10px]" style={{ backgroundColor: baseColor }} />
      //       <div className="absolute top-[40%] -left-[10%] w-[40%] h-[80%] rounded-full opacity-15 blur-[12px]" style={{ backgroundColor: baseColor }} />
      //     </>
      //   );
      // case 1:
      //   return (
      //     <>
      //       <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[60%] rounded-full opacity-20 blur-[12px]" style={{ backgroundColor: baseColor, transform: 'translate(20%, -20%)' }} />
      //       <div className="absolute bottom-0 left-0 w-[50%] h-[60%] rounded-full opacity-15 blur-[10px]" style={{ backgroundColor: baseColor, transform: 'translate(-20%, 30%)' }} />
      //     </>
      //   );
      // case 2:
      default:
        return (
          <div
            className="absolute -top-[120px] -left-[10%] w-[120%] h-[300px] rounded-[100%] opacity-30 dark:opacity-10 blur-[60px]"
            style={{
              backgroundColor: baseColor,
              transform: 'translate3d(0,0,0)' // Force GPU acceleration
            }}
          />
        );
    }
  };

  return (
    <div className="w-full relative overflow-hidden">
      {/* 1. Background Layer: Organic Blurred Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {getBlobConfig(month)}
        {/* Add a global ambient wash to ensure it's not too white */}
        <div className="absolute inset-0 opacity-10" />
      </div>

      {/* 3. Noise Layer: Texture on top (Subtle: 5% opacity) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="noise-overlay opacity-5 mix-blend-soft-light" />
      </div>

      <div className="relative z-10">
        <div className="content-shell px-4 lg:px-6 flex items-baseline justify-between py-4">
          <div className="flex items-baseline gap-3">
            <span className="text-body-md font-altSans font-medium text-base-900 dark:text-base-50 shrink-0">
              {month.toUpperCase()}
            </span>
            <span className="text-body-sm font-altSans opacity-60 text-base-900 dark:text-base-50">
              ({papersReviewed} papers)
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          {issues.map((issue) => (
            <NewsletterRow key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
    </div>
  );
}
