import NewsletterRow from "@/components/newsletter-feed/NewsletterRow";

import { MONTH_HEX_COLORS } from "@/utils/monthColors";


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
