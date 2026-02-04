import React from 'react';
import Header from './components/Header';
import ProductHero from './components/ProductHero';
import Features from './components/Features';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import { PRODUCT_DATA } from './constants';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        <ProductHero product={PRODUCT_DATA} />
        
        <Features product={PRODUCT_DATA} />
        
        <section className="py-12 bg-emerald-50 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-100 rounded-full opacity-50 blur-3xl"></div>

          <div className="max-w-xl mx-auto px-4 relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">اطلب منتجك الآن</h2>
              <p className="text-gray-600">الكمية محدودة - سارع بالطلب قبل انتهاء المخزون</p>
            </div>
            
            <OrderForm 
              productName={PRODUCT_DATA.name} 
              price={PRODUCT_DATA.price} 
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;