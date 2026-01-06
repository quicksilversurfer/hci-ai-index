export const MONTH_BG_CLASS: Record<string, string> = {
  DECEMBER: "bg-month-december",
  NOVEMBER: "bg-month-november",
  OCTOBER: "bg-month-october",
  SEPTEMBER: "bg-month-september",
  AUGUST: "bg-month-august",
  JULY: "bg-month-july",
  JUNE: "bg-month-june",
  MAY: "bg-month-may",
  APRIL: "bg-month-april",
  MARCH: "bg-month-march",
  FEBRUARY: "bg-month-february",
  JANUARY: "bg-month-january",
};

export const MONTH_TEXT_CLASS: Record<string, string> = {
  DECEMBER: "text-base-900 dark:text-base-50",
  NOVEMBER: "text-base-900 dark:text-base-50",
  OCTOBER: "text-base-900 dark:text-base-50",
  SEPTEMBER: "text-base-900 dark:text-base-50",
  AUGUST: "text-base-900 dark:text-base-50",
  JULY: "text-base-900 dark:text-base-50",
  JUNE: "text-base-900 dark:text-base-50",
  MAY: "text-base-900 dark:text-base-50",
  APRIL: "text-base-900 dark:text-base-50",
  MARCH: "text-base-900 dark:text-base-50",
  FEBRUARY: "text-base-900 dark:text-base-50",
  JANUARY: "text-base-900 dark:text-base-50",
};

export const MONTH_ORDER = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

export const MONTH_TITLE_CLASS: Record<string, string> = {
  DECEMBER: "text-flexoki-blue-700 dark:text-flexoki-blue-300",
  NOVEMBER: "text-flexoki-cyan-700 dark:text-flexoki-cyan-300",
  OCTOBER: "text-flexoki-green-700 dark:text-flexoki-green-300",
  SEPTEMBER: "text-flexoki-yellow-700 dark:text-flexoki-yellow-300",
  AUGUST: "text-flexoki-orange-700 dark:text-flexoki-orange-300",
  JULY: "text-flexoki-red-700 dark:text-flexoki-red-300",
  JUNE: "text-flexoki-purple-700 dark:text-flexoki-purple-300",
  MAY: "text-flexoki-green-700 dark:text-flexoki-green-300",
  APRIL: "text-flexoki-cyan-700 dark:text-flexoki-cyan-300",
  MARCH: "text-flexoki-cyan-700 dark:text-flexoki-cyan-300",
  FEBRUARY: "text-flexoki-magenta-700 dark:text-flexoki-magenta-300",
  JANUARY: "text-flexoki-blue-700 dark:text-flexoki-blue-300",
};

// Desaturated / Soft "Book Spine" Colors from reference (Left -> Right)
// Subtle, Multi-stop Gradients: Mostly White/Neutral -> Hint of Color
// Structure: [Stop1, Stop2, Stop3, Stop4] for smooth "complex" transition
export const MONTH_GRADIENTS: Record<string, { light: string[]; dark: string[] }> = {
  // Winter: White -> Soft Blue (Subtle Ice)
  JANUARY: {
    light: ["#FFFFFF", "#F6FAFF", "#E6F0FF", "#CCE0FF"],
    dark: ["#1e3c72", "#1e3c72", "#2a5298"]
  },
  FEBRUARY: {
    light: ["#FFFFFF", "#F5FCFF", "#E0F7FA", "#B2EBF2"],
    dark: ["#141E30", "#141E30", "#243B55"]
  },
  DECEMBER: {
    light: ["#FFFFFF", "#F8F9FA", "#E9ECEF", "#DEE2E6"], // Cool Grey/White
    dark: ["#20002c", "#20002c", "#cbb4d4"]
  },

  // Spring: White -> Soft Green/Yellow (Fresh)
  MARCH: {
    light: ["#FFFFFF", "#FAFFF5", "#EDF7E0", "#D8EED0"],
    dark: ["#0f0c29", "#0f0c29", "#302b63"]
  },
  APRIL: {
    light: ["#FFFFFF", "#FFFEF5", "#FFFBE6", "#FFE6A0"], // The "April" look: White -> Cream -> Soft Yellow
    dark: ["#232526", "#232526", "#414345"]
  },
  MAY: {
    light: ["#FFFFFF", "#F5FFFA", "#E0F2F1", "#B2DFDB"], // Mint
    dark: ["#1A2980", "#1A2980", "#26D0CE"]
  },

  // Summer: White -> Warm Peach/Pink (Sunny)
  JUNE: {
    light: ["#FFFFFF", "#FFFBF7", "#FFEFE0", "#FFE0B2"],
    dark: ["#f12711", "#f12711", "#f5af19"]
  },
  JULY: {
    light: ["#FFFFFF", "#FFF5F5", "#FFEBEE", "#FFCDD2"], // Soft Red/Pink
    dark: ["#2b5876", "#2b5876", "#4e4376"]
  },
  AUGUST: {
    light: ["#FFFFFF", "#FFFAF0", "#FFF3E0", "#FFE0B2"], // Gold
    dark: ["#4ca1af", "#4ca1af", "#c4e0e5"]
  },

  // Fall: White -> Soft Lavender/Beige (Muted)
  SEPTEMBER: {
    light: ["#FFFFFF", "#FCF7FF", "#F3E5F5", "#E1BEE7"], // Lavender
    dark: ["#3E5151", "#3E5151", "#DECBA4"]
  },
  OCTOBER: {
    light: ["#FFFFFF", "#FFFAF9", "#FBE9E7", "#FFCCBC"], // Deep Orange tint
    dark: ["#190A05", "#190A05", "#870000"]
  },
  NOVEMBER: {
    light: ["#FFFFFF", "#F5F5F5", "#EEEEEE", "#E0E0E0"], // Grey
    dark: ["#16222A", "#16222A", "#3A6073"]
  },
};

export const MONTH_DESC_CLASS: Record<string, string> = {
  DECEMBER: "text-flexoki-blue-500 dark:text-flexoki-blue-200",
  NOVEMBER: "text-flexoki-cyan-500 dark:text-flexoki-cyan-200",
  OCTOBER: "text-flexoki-green-500 dark:text-flexoki-green-200",
  SEPTEMBER: "text-flexoki-yellow-600 dark:text-flexoki-yellow-200", // Yellow 500 might be too light on white
  AUGUST: "text-flexoki-orange-500 dark:text-flexoki-orange-200",
  JULY: "text-flexoki-red-500 dark:text-flexoki-red-200",
  JUNE: "text-flexoki-purple-500 dark:text-flexoki-purple-200",
  MAY: "text-flexoki-green-500 dark:text-flexoki-green-200",
  APRIL: "text-flexoki-cyan-500 dark:text-flexoki-cyan-200",
  MARCH: "text-flexoki-cyan-500 dark:text-flexoki-cyan-200",
  FEBRUARY: "text-flexoki-magenta-500 dark:text-flexoki-magenta-200",
  JANUARY: "text-flexoki-blue-500 dark:text-flexoki-blue-200",
};

export const MONTH_HEX_COLORS: Record<string, string> = {
  JANUARY: "#CBE1F6",
  FEBRUARY: "#A0D1C4",
  MARCH: "#97C465",
  APRIL: "#CAD73F",
  MAY: "#F3E220",
  JUNE: "#EFAD00",
  JULY: "#EFAD00",
  AUGUST: "#D85A13",
  SEPTEMBER: "#EA7677",
  OCTOBER: "#ED9BC3",
  NOVEMBER: "#D4BBDB",
  DECEMBER: "#B4A1CE",
};
