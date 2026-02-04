import React from 'react';
import { Truck, ShieldCheck, BadgeDollarSign } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 dark:bg-zinc-950 rounded-2xl flex flex-col items-center text-center border border-gray-100 dark:border-zinc-800 hover:border-green-200 dark:hover:border-green-900 transition-colors">
            <div className="w-16 h-16 bg-white dark:bg-black rounded-full flex items-center justify-center mb-4 shadow-sm dark:shadow-none">
               <Truck className="w-8 h-8 text-green-600 dark:text-green-500" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">توصيل سريع ومجاني</h3>
            <p className="text-gray-600 dark:text-zinc-400 text-sm">نصلك أينما كنت في المغرب خلال 24-48 ساعة.</p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-zinc-950 rounded-2xl flex flex-col items-center text-center border border-gray-100 dark:border-zinc-800 hover:border-green-200 dark:hover:border-green-900 transition-colors">
            <div className="w-16 h-16 bg-white dark:bg-black rounded-full flex items-center justify-center mb-4 shadow-sm dark:shadow-none">
                <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-500" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">ضمان الجودة</h3>
            <p className="text-gray-600 dark:text-zinc-400 text-sm">منتجاتنا أصلية ومكفولة لضمان رضاكم التام.</p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-zinc-950 rounded-2xl flex flex-col items-center text-center border border-gray-100 dark:border-zinc-800 hover:border-green-200 dark:hover:border-green-900 transition-colors">
             <div className="w-16 h-16 bg-white dark:bg-black rounded-full flex items-center justify-center mb-4 shadow-sm dark:shadow-none">
                <BadgeDollarSign className="w-8 h-8 text-green-600 dark:text-green-500" />
             </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">الدفع عند الاستلام</h3>
            <p className="text-gray-600 dark:text-zinc-400 text-sm">عاين منتجك أولاً ثم ادفع بكل طمأنينة.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;