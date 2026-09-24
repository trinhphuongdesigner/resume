"use client";

import LightHome from "@/components/light/LightHome";
import DarkHome from "@/components/dark/DarkHome";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { theme } = useTheme();

  if (theme === null) return null;

  return theme === "dark" ? <DarkHome /> : <LightHome />;
}
