import React from 'react';
import { ShoppingBag, Phone } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-black shadow-lg sticky top-0 z-50 border-b border-green-900">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-green-500">
          <ShoppingBag className="w-6 h-6" />
          <h1 className="text-xl font-bold text-white tracking-wide">متجر <span className="text-green-500">المغرب</span></h1>
        </div>
        <a 
          href="#order-form" 
          className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-green-400 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>اتصل بنا</span>
        </a>
      </div>
    </header>
  );
};

export default Header;