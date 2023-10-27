import { useState, useEffect, useMemo } from "react";

type ThemeState = {
  theme: string;
  toggleTheme: (theme: string) => void;
};

export const useThemeState = (): ThemeState => {
  const [theme, setTheme] = useState<string>("light");

  // Define the allowed themes using useMemo
  const allowedThemes = useMemo(() => ["light", "dark"], []);

  // Load the theme preference from local storage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && allowedThemes.includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, [allowedThemes]); // Include allowedThemes in the dependency array

  // Update the theme preference and local storage when the theme is changed
  const toggleTheme = (newTheme: string) => {
    if (allowedThemes.includes(newTheme)) {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  return { theme, toggleTheme };
};
