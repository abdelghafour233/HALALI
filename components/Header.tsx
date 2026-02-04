import React from 'react';
import { ShoppingBag, Phone, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  bannerText?: string;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme, bannerText }) => {
  return (
    <>
      {bannerText && (
        <div className="bg-green-600 text-white text-center py-2 px-4 text-sm font-bold animate-pulse">
          {bannerText}
        </div>
      )}
      <header className="bg-white dark:bg-black shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-green-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
            <ShoppingBag className="w-6 h-6" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-wide font-sans">
              STORE<span className="text-green-600 dark:text-green-500">HALAL</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <a 
              href="#order-form" 
              className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">اتصل بنا</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;