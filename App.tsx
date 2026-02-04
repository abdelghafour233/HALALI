import React, { useState } from 'react';
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
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        {/* We display the selected product in the Hero, allowing user to change what they see at top by clicking grid items? 
            Actually, let's keep the Hero static for the Featured item (first item), 
            OR make the Hero dynamic based on selection. Dynamic is cooler. 
        */}
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
        
        <section id="order-form-section" className="py-20 bg-zinc-900 relative overflow-hidden">
           {/* Dark background for form section */}
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-900/20 via-zinc-900 to-zinc-900 pointer-events-none"></div>

          <div className="max-w-xl mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">جاهز للطلب؟</h2>
              <p className="text-zinc-400">أدخل معلوماتك وسيصلك المنتج أينما كنت في المغرب</p>
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