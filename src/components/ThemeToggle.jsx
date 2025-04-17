import React, { useEffect, useState } from "react";
import "../styles/theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ThemeToggle = () => {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="theme-toggle-container" onClick={() => setDark(!dark)}>
      <div className={`toggle-switch ${dark ? "dark" : "light"}`}>
        <i className={`fas ${dark ? "fa-moon" : "fa-sun"}`} />
      </div>
    </div>
  );
};

export default ThemeToggle;
