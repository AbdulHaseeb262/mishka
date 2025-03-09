"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: true,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: "theme-storage",
      getStorage: () => localStorage, // Ensure localStorage is used
    }
  )
);
// The useThemeStore hook is a custom hook that returns the store's state and actions. The store uses the persist middleware to save the state to localStorage. The store has two properties:
