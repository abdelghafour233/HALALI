import React from 'react';
import { Truck, ShieldCheck, BadgeDollarSign } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-zinc-50 rounded-2xl flex flex-col items-center text-center border border-zinc-100 hover:border-green-200 transition-colors">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
               <Truck className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-black">توصيل سريع ومجاني</h3>
            <p className="text-zinc-600 text-sm">نصلك أينما كنت في المغرب خلال 24-48 ساعة.</p>
          </div>
          <div className="p-6 bg-zinc-50 rounded-2xl flex flex-col items-center text-center border border-zinc-100 hover:border-green-200 transition-colors">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-black">ضمان الجودة</h3>
            <p className="text-zinc-600 text-sm">منتجاتنا أصلية ومكفولة لضمان رضاكم التام.</p>
          </div>
          <div className="p-6 bg-zinc-50 rounded-2xl flex flex-col items-center text-center border border-zinc-100 hover:border-green-200 transition-colors">
             <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                <BadgeDollarSign className="w-8 h-8 text-green-500" />
             </div>
            <h3 className="font-bold text-xl mb-2 text-black">الدفع عند الاستلام</h3>
            <p className="text-zinc-600 text-sm">عاين منتجك أولاً ثم ادفع بكل طمأنينة.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;