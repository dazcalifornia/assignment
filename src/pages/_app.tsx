import "@/styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "@/styles/theme";
import { useThemeState } from "@/components/useThemeState";

export default function App({ Component, pageProps }: AppProps) {
  const { theme, toggleTheme } = useThemeState();

  const bodyClass = theme === "light" ? "light-body" : "dark-body";

  useEffect(() => {
    document.body.className = bodyClass;
  }, [theme, bodyClass]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
