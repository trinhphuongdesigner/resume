"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  if (theme === null) return null;

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed top-6 right-6 z-[60] flex items-center justify-center w-11 h-11 rounded-full
        bg-white/70 dark:bg-white/10 backdrop-blur-md border border-black/10
        shadow-lg hover:scale-105 transition-transform"
      style={{
        backgroundColor: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.75)",
        borderColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
      }}
    >
      <FontAwesomeIcon
        icon={theme === "dark" ? faMoon : faSun}
        className="w-4 h-4"
        style={{ color: theme === "dark" ? "#64FFDA" : "#FA5252" }}
      />
    </button>
  );
}
