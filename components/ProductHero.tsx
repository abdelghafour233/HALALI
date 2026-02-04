import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '../types';

interface ProductHeroProps {
  product: Product;
}

const ProductHero: React.FC<ProductHeroProps> = ({ product }) => {
  const discountPercentage = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
          
          {/* Image Container */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square border-4 border-white">
              {discountPercentage > 0 && (
                <div className="absolute top-4 right-4 bg-red-600 text-white font-bold px-3 py-1 rounded-full shadow-md z-10">
                  تخفيض {discountPercentage}%
                </div>
              )}
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-right">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {product.shortDescription}
            </p>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-full mb-8">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <span className="text-4xl font-bold text-emerald-700">
                  {product.price} <span className="text-2xl">درهم</span>
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through decoration-red-400 decoration-2">
                    {product.oldPrice} درهم
                  </span>
                )}
              </div>
              <p className="text-emerald-600 text-sm font-semibold mt-1">
                + توصيل مجاني لفترة محدودة
              </p>
            </div>

            <div className="hidden md:block w-full">
               <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                 {product.fullDescription}
               </p>
            </div>
            
            <a 
              href="#order-form"
              className="md:hidden w-full bg-emerald-600 text-white font-bold py-4 rounded-lg shadow-lg text-center animate-pulse"
            >
              اطلب الآن - {product.price} درهم
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;