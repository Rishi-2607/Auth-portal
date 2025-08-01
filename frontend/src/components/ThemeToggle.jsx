import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    
    <div className="absolute top-6 right-6 z-50">
      <button
        onClick={() => setIsDarkMode(prev => !prev)}
        className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white shadow hover:scale-105 transition-transform duration-200"
      >
        {isDarkMode ? "🌙 " : "☀️ "}
      </button>
    </div>
  );
};

export default ThemeToggle;