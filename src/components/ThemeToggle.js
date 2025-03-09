"use client";

import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-[#00ff88] to-[#00a3ff] text-white shadow-lg hover:shadow-[#00ff88]/20 transition-all duration-300 transform hover:scale-110 z-50"
      aria-label="Theme Toggle"
    >
      {isDark ? (
        <Sun className="h-6 w-6 animate-spin-slow" />
      ) : (
        <Moon className="h-6 w-6 animate-spin-slow" />
      )}
    </button>
  );
}
// Compare this snippet from src/components/ThemeToggle.js:
// "use client";
