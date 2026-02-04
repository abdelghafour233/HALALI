import React from 'react';
import { CheckCircle2, Truck, ShieldCheck, BadgeDollarSign } from 'lucide-react';
import { Product } from '../types';

interface FeaturesProps {
  product: Product;
}

const Features: React.FC<FeaturesProps> = ({ product }) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">لماذا تختار هذا المنتج؟</h2>
        
        {/* Main Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-emerald-50 rounded-xl flex flex-col items-center text-center border border-emerald-100">
            <Truck className="w-10 h-10 text-emerald-600 mb-3" />
            <h3 className="font-bold text-lg mb-2">توصيل سريع</h3>
            <p className="text-gray-600 text-sm">توصيل لجميع المدن المغربية خلال 24-48 ساعة.</p>
          </div>
          <div className="p-6 bg-emerald-50 rounded-xl flex flex-col items-center text-center border border-emerald-100">
            <ShieldCheck className="w-10 h-10 text-emerald-600 mb-3" />
            <h3 className="font-bold text-lg mb-2">ضمان الجودة</h3>
            <p className="text-gray-600 text-sm">منتج أصلي 100% مع ضمان استرجاع في حالة العطب.</p>
          </div>
          <div className="p-6 bg-emerald-50 rounded-xl flex flex-col items-center text-center border border-emerald-100">
            <BadgeDollarSign className="w-10 h-10 text-emerald-600 mb-3" />
            <h3 className="font-bold text-lg mb-2">الدفع عند الاستلام</h3>
            <p className="text-gray-600 text-sm">لا تدفع شيئاً حتى تستلم منتجك وتتأكد منه.</p>
          </div>
        </div>

        {/* Product Specific Features List */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <h3 className="font-bold text-lg mb-4 text-gray-800">مميزات المنتج:</h3>
          <ul className="space-y-3">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Features;