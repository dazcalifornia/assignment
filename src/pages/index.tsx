import { useState, useEffect } from "react";

import { useThemeState } from "@/components/useThemeState";
import HomePage from "./components/Home";
import Layout from "../components/ui/Layout";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  const { theme, toggleTheme } = useThemeState();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expirationDate");
    setSelectedTheme(localStorage.getItem("theme") || "light");
    if (!token) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, []);

  const handleThemeChange = (event: any) => {
    const newTheme = event.target.value;
    setSelectedTheme(newTheme);
    toggleTheme(newTheme);
    //refresh the page
    window.location.reload();
  };

  return (
    <div>
      {loggedIn ? (
        <Layout loggedIn={loggedIn}>
          <HomePage />
        </Layout>
      ) : (
        <Layout loggedIn={loggedIn}>
          <label>Choose Theme:</label>
          <select value={selectedTheme} onChange={handleThemeChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <p>Current Theme: {selectedTheme}</p>
          <p>hello world</p>
        </Layout>
      )}
    </div>
  );
}
