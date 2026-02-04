import React from 'react';
import { ShoppingBag, Phone } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-emerald-700">
          <ShoppingBag className="w-6 h-6" />
          <h1 className="text-xl font-bold">متجر المغرب</h1>
        </div>
        <a 
          href="#order-form" 
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>اتصل بنا</span>
        </a>
      </div>
    </header>
  );
};

export default Header;