import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductHeroProps {
  product: Product;
  onOrderClick: () => void;
}

const ProductHero: React.FC<ProductHeroProps> = ({ product, onOrderClick }) => {
  const discountPercentage = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <section className="py-12 bg-zinc-950 text-white relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
         <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-600 rounded-full blur-3xl"></div>
         <div className="absolute top-1/2 left-0 w-64 h-64 bg-green-800 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          
          {/* Image Container */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-green-900/20 border-2 border-zinc-800 aspect-square group">
              {discountPercentage > 0 && (
                <div className="absolute top-4 right-4 bg-green-600 text-white font-bold px-4 py-1 rounded-full shadow-lg z-10">
                  خصم {discountPercentage}%
                </div>
              )}
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-right">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-green-500 fill-green-500" />
              ))}
              <span className="text-zinc-400 text-sm mr-2">(تقييم عالي)</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {product.name}
            </h1>
            
            <p className="text-zinc-300 text-lg mb-8 leading-relaxed max-w-lg">
              {product.shortDescription}
            </p>

            <div className="flex flex-col w-full gap-6">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <span className="text-5xl font-bold text-green-500">
                  {product.price} <span className="text-2xl">درهم</span>
                </span>
                {product.oldPrice && (
                  <span className="text-2xl text-zinc-500 line-through">
                    {product.oldPrice}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {product.features.slice(0, 3).map((f, i) => (
                      <span key={i} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-300 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-500" /> {f}
                      </span>
                  ))}
              </div>

              <button 
                onClick={onOrderClick}
                className="w-full md:w-auto bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-12 rounded-xl shadow-lg shadow-green-900/30 transition-all transform hover:-translate-y-1"
              >
                اشترِ الآن - الدفع عند الاستلام
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;