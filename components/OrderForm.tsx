import React, { useState } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { MOROCCAN_CITIES } from '../constants';
import { OrderFormData, OrderStatus } from '../types';

interface OrderFormProps {
  productName: string;
  price: number;
}

const OrderForm: React.FC<OrderFormProps> = ({ productName, price }) => {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    city: '',
    phone: ''
  });
  const [status, setStatus] = useState<OrderStatus>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.city || !formData.phone) return;

    setStatus('submitting');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      // In a real app, you would send this data to a backend or Google Sheet here
      console.log('Order Submitted:', formData);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (status === 'success') {
    return (
      <div id="order-form" className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center shadow-lg transform transition-all">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-emerald-800 mb-2">شكراً لطلبك!</h3>
        <p className="text-emerald-700 mb-4">
          تم استلام طلبك بنجاح. سنقوم بالاتصال بك على الرقم 
          <span className="font-bold mx-1" dir="ltr">{formData.phone}</span>
          قريباً لتأكيد الطلب والعنوان.
        </p>
        <button 
          onClick={() => {
            setStatus('idle');
            setFormData({ fullName: '', city: '', phone: '' });
          }}
          className="text-emerald-600 underline hover:text-emerald-800"
        >
          طلب منتج آخر
        </button>
      </div>
    );
  }

  return (
    <div id="order-form" className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-emerald-600 p-4 text-center">
        <h3 className="text-white font-bold text-xl">املأ الاستمارة للطلب الآن</h3>
        <p className="text-emerald-100 text-sm mt-1">الدفع عند الاستلام - توصيل لجميع المدن</p>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm text-center">
          <span className="font-bold block text-lg mb-1">{price} درهم</span>
          {productName}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              الاسم الكامل <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="مثال: محمد العلوي"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              رقم الهاتف <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="مثال: 0612345678"
              dir="ltr"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-right"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              المدينة <span className="text-red-500">*</span>
            </label>
            <select
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
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
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>جاري الإرسال...</span>
              </>
            ) : (
              <>
                <span>تأكيد الطلب الآن</span>
                <Send className="w-5 h-5 transform rotate-180" />
              </>
            )}
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            نحترم خصوصيتك، معلوماتك تستخدم فقط لتوصيل الطلب.
          </p>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;