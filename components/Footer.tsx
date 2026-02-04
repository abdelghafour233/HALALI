import React from 'react';
import { Lock } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="mb-2 font-semibold">STOREHALAL للتجارة الإلكترونية</p>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} جميع الحقوق محفوظة.
        </p>
        <div className="mt-4 flex justify-center gap-4 text-xs">
          <a href="#" className="hover:text-white">سياسة الخصوصية</a>
          <a href="#" className="hover:text-white">الشروط والأحكام</a>
          <a href="#" className="hover:text-white">سياسة الاسترجاع</a>
        </div>
        
        {onAdminClick && (
          <div className="mt-8 pt-4 border-t border-gray-700">
            <button 
              onClick={onAdminClick}
              className="flex items-center justify-center gap-1 mx-auto text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>إدارة المتجر</span>
            </button>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;