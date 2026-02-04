import React, { useState, useEffect } from 'react';
import { Send, Loader2, CheckCircle, ShoppingCart } from 'lucide-react';
import { MOROCCAN_CITIES } from '../constants';
import { OrderFormData, OrderStatus, Product } from '../types';

interface OrderFormProps {
  selectedProduct: Product;
  onSubmit: (data: OrderFormData) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ selectedProduct, onSubmit }) => {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    city: '',
    phone: ''
  });
  const [status, setStatus] = useState<OrderStatus>('idle');

  // Reset status when product changes
  useEffect(() => {
    setStatus('idle');
  }, [selectedProduct.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.city || !formData.phone) return;

    setStatus('submitting');

    // Simulate API call and then submit to parent
    setTimeout(() => {
      onSubmit(formData);
      setStatus('success');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (status === 'success') {
    return (
      <div id="order-form" className="bg-white dark:bg-zinc-900 border-2 border-green-600 rounded-3xl p-8 text-center shadow-2xl transform transition-all">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-500" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">شكراً لطلبك!</h3>
        <p className="text-gray-600 dark:text-zinc-400 mb-6">
          تم حجز <span className="text-green-600 dark:text-green-400 font-bold">{selectedProduct.name}</span> بنجاح.
          <br/>
          سنتصل بك على <span className="font-mono text-gray-800 dark:text-white" dir="ltr">{formData.phone}</span> للتأكيد.
        </p>
        <button 
          onClick={() => {
            setStatus('idle');
            setFormData({ fullName: '', city: '', phone: '' });
          }}
          className="text-green-600 dark:text-green-500 font-bold hover:text-green-700 dark:hover:text-green-400 hover:underline"
        >
          طلب منتج آخر
        </button>
      </div>
    );
  }

  return (
    <div id="order-form" className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-zinc-800">
      <div className="bg-green-600 dark:bg-black p-6 text-center border-b-4 border-green-700 dark:border-green-600">
        <h3 className="text-white font-bold text-2xl flex items-center justify-center gap-2">
          <ShoppingCart className="w-6 h-6 text-green-100 dark:text-green-500" />
          أكمل طلبك الآن
        </h3>
        <p className="text-green-100 dark:text-zinc-400 text-sm mt-2">يرجى ملء المعلومات لاستلام المنتج</p>
      </div>
      
      <div className="p-6 md:p-10">
        <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl flex items-center justify-between">
          <div>
             <span className="text-xs text-green-800 dark:text-green-400 font-bold uppercase tracking-wider">المنتج المختار</span>
             <h4 className="font-bold text-gray-900 dark:text-white">{selectedProduct.name}</h4>
          </div>
          <span className="font-bold text-xl text-green-700 dark:text-green-500">{selectedProduct.price} DH</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 dark:text-zinc-300 mb-2">
              الاسم الكامل
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="الاسم واللقب"
              className="w-full px-4 py-4 bg-gray-50 dark:bg-zinc-800 border-2 border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-0 focus:border-green-500 outline-none transition-all font-medium text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-gray-700 dark:text-zinc-300 mb-2">
              رقم الهاتف
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="06XXXXXXXX"
              dir="ltr"
              className="w-full px-4 py-4 bg-gray-50 dark:bg-zinc-800 border-2 border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-0 focus:border-green-500 outline-none transition-all text-right font-medium text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-bold text-gray-700 dark:text-zinc-300 mb-2">
              المدينة
            </label>
            <select
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-4 bg-gray-50 dark:bg-zinc-800 border-2 border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-0 focus:border-green-500 outline-none transition-all text-gray-900 dark:text-white"
            >
              <option value="" disabled>اختر مدينتك</option>
              {MOROCCAN_CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>جاري التأكيد...</span>
              </>
            ) : (
              <>
                <span>تأكيد الطلب (الدفع عند الاستلام)</span>
                <Send className="w-5 h-5 transform rotate-180" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;