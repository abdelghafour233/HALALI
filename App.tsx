import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductHero from './components/ProductHero';
import Features from './components/Features';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import ProductGrid from './components/ProductGrid';
import AdminDashboard from './components/AdminDashboard';
import { PRODUCTS } from './constants';
import { Product, SiteSettings, Order, OrderFormData } from './types';

function App() {
  // Application State
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [settings, setSettings] = useState<SiteSettings>({
    facebookPixelId: '',
    googleSheetUrl: '',
    eventBannerText: 'عرض خاص: توصيل مجاني للطلبات فوق 300 درهم!',
    isBannerActive: false
  });
  
  // Dummy orders for demonstration
  const [orders, setOrders] = useState<Order[]>([
    {
        id: '101',
        customerName: 'أحمد العلمي',
        phone: '0612345678',
        city: 'الدار البيضاء',
        productName: 'ساعة الفخامة السوداء',
        price: 499,
        status: 'new',
        date: '2024-03-10'
    },
    {
        id: '102',
        customerName: 'فاطمة الزهراء',
        phone: '0698765432',
        city: 'مراكش',
        productName: 'نظارات شمسية كلاسيك',
        price: 199,
        status: 'shipped',
        date: '2024-03-09'
    }
  ]);
  
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync selectedProduct if product list changes
  useEffect(() => {
    const current = products.find(p => p.id === selectedProduct.id);
    if (current) {
      setSelectedProduct(current);
    } else if (products.length > 0) {
      setSelectedProduct(products[0]);
    }
  }, [products]);

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

  const handleOrderSubmit = (formData: OrderFormData) => {
    const newOrder: Order = {
        id: Date.now().toString(),
        customerName: formData.fullName,
        city: formData.city,
        phone: formData.phone,
        productName: selectedProduct.name,
        price: selectedProduct.price,
        status: 'new',
        date: new Date().toISOString().split('T')[0]
    };
    setOrders([...orders, newOrder]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col font-sans transition-colors duration-300">
      
      {isAdminOpen ? (
        <AdminDashboard 
          products={products}
          settings={settings}
          orders={orders}
          onUpdateProducts={setProducts}
          onUpdateSettings={setSettings}
          onUpdateOrders={setOrders}
          onClose={() => setIsAdminOpen(false)}
        />
      ) : (
        <>
          <Header 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme}
            bannerText={settings.isBannerActive ? settings.eventBannerText : undefined}
          />
          
          <main className="flex-grow">
            {products.length > 0 ? (
              <>
                <ProductHero 
                  product={selectedProduct} 
                  onOrderClick={scrollToForm}
                />
                
                <Features />

                <ProductGrid 
                    products={products} 
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
                      onSubmit={handleOrderSubmit}
                    />
                  </div>
                </section>
              </>
            ) : (
              <div className="flex items-center justify-center h-screen text-gray-500">
                <p>لا توجد منتجات لعرضها. يرجى إضافتها من لوحة التحكم.</p>
              </div>
            )}
          </main>

          <Footer onAdminClick={() => setIsAdminOpen(true)} />
        </>
      )}
    </div>
  );
}

export default App;