import React from "react";
import "./Header.css";

function Header({ darkMode, toggleDarkMode, onRetry }) {
  return (
    <header className={`app-header ${darkMode ? "dark" : ""}`}>
      {onRetry && (
        <button className="header-btn left" onClick={onRetry} title="Try Again">
          ⟳
        </button>
      )}

      <div className="logo center">
        <span className="logo-text">Catchy</span>
      </div>

      <button
        className="header-btn right"
        onClick={toggleDarkMode}
        title="Toggle Theme"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}

export default Header;
