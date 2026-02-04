import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="mb-2 font-semibold">متجر المغرب للتجارة الإلكترونية</p>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} جميع الحقوق محفوظة.
        </p>
        <div className="mt-4 flex justify-center gap-4 text-xs">
          <a href="#" className="hover:text-white">سياسة الخصوصية</a>
          <a href="#" className="hover:text-white">الشروط والأحكام</a>
          <a href="#" className="hover:text-white">سياسة الاسترجاع</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;