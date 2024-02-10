import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";

function LightIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  );
}

function DarkIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#d0a215"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  );
}

export default function ThemeSelector(props) {
  let { theme, setTheme } = useTheme("dark");
  let [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div />;
  }

  const handleThemeChange = (newTheme) => {
    if (newTheme === "dark" || newTheme === "system") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const getIcon = (themeValue) => {
    switch (themeValue) {
      case "light":
        return <LightIcon />;
      case "dark":
        return <DarkIcon />;
      default:
        return <DarkIcon />;
    }
  };

  return (
    <button
      key={theme}
      className={clsx("flex items-center justify-center h-6 w-6 rounded-full", {
        "text-[#072ac8]": theme === "light" && theme === theme,
        "text-[#d0a215]": theme === "dark" && theme === theme,
      })}
      onClick={() => handleThemeChange(theme)}
      aria-label={theme === "light" ? "Light theme" : "Dark theme"}
      title={theme === "light" ? "Light theme" : "Dark theme"}
    >
      {getIcon(theme)}
    </button>
  );
}
