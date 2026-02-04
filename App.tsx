import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductHero from './components/ProductHero';
import Features from './components/Features';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import ProductGrid from './components/ProductGrid';
import { PRODUCTS } from './constants';
import { Product } from './types';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Toggle Dark Mode Class on HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('order-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    scrollToForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col font-sans transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="flex-grow">
        <ProductHero 
          product={selectedProduct} 
          onOrderClick={scrollToForm}
        />
        
        <Features />

        <ProductGrid 
            products={PRODUCTS} 
            currentProductId={selectedProduct.id}
            onProductSelect={handleProductSelect}
        />
        
        <section id="order-form-section" className="py-20 bg-emerald-50 dark:bg-zinc-900 relative overflow-hidden transition-colors duration-300">
           {/* Dark background for form section */}
           <div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-green-900/20 dark:via-zinc-900 dark:to-zinc-900 pointer-events-none transition-colors duration-300"></div>

          <div className="max-w-xl mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">جاهز للطلب؟</h2>
              <p className="text-gray-600 dark:text-zinc-400">أدخل معلوماتك وسيصلك المنتج أينما كنت في المغرب</p>
            </div>
            
            <OrderForm 
              selectedProduct={selectedProduct}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;