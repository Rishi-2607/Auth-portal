import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../components/Logo';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 text-black dark:text-white px-4 overflow-hidden">
      <div className="absolute top-6 left-6 z-50">
        <Logo />
      </div>

      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setIsDarkMode((prev) => !prev)}
          className="px-4 py-2 rounded-full bg-white/80 dark:bg-gray-700 text-black dark:text-white shadow hover:scale-105 transition-transform duration-200 backdrop-blur-md"
        >
          {isDarkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      <div className="absolute w-96 h-96 bg-indigo-300 dark:bg-indigo-700 rounded-full blur-3xl opacity-30 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>

      <div className="flex items-center justify-center min-h-screen z-10 relative">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-xl text-center transition-all duration-500 border border-white/30 dark:border-gray-700">
          <h1 className="text-5xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
            Auth<span className="text-gray-800 dark:text-white">Portal</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Your secure gateway to everything. Fast. Elegant. Reliable.
          </p>

          <div className="flex flex-col gap-4">
            <Link
              to="/login"
              className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-3 rounded-xl text-center transition duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
               Log In
            </Link>
            <Link
              to="/register"
              className="w-full border border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 py-3 rounded-xl hover:bg-indigo-100 dark:hover:bg-gray-700 transition duration-300 text-center shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
               Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}