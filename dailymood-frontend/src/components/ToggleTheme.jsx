import { useEffect, useState } from "react";

function ToggleTheme() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      style={{
        backgroundColor: "transparent",
        color: "var(--text-color)",
        border: "1px solid var(--text-color)",
        borderRadius: "5px",
        padding: "5px 10px",
        cursor: "pointer",
        transition: "all 0.3s ease"
      }}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

export default ToggleTheme;