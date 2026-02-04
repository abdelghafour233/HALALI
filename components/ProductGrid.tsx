import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  currentProductId: string;
  onProductSelect: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, currentProductId, onProductSelect }) => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">منتجات أخرى قد تعجبك</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className={`group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border transition-all duration-300 ${
                currentProductId === product.id 
                  ? 'border-green-500 ring-2 ring-green-500/20 shadow-xl scale-[1.02]' 
                  : 'border-gray-200 dark:border-zinc-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg'
              }`}
            >
              <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-zinc-800">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.oldPrice && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        تخفيض
                    </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 truncate">{product.name}</h3>
                <p className="text-gray-500 dark:text-zinc-400 text-sm mb-4 line-clamp-2">{product.shortDescription}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="font-bold text-xl text-green-600 dark:text-green-500">{product.price} DH</span>
                    {product.oldPrice && (
                        <span className="text-xs text-gray-400 dark:text-zinc-500 line-through">{product.oldPrice} DH</span>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => onProductSelect(product)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors ${
                         currentProductId === product.id
                         ? 'bg-black dark:bg-white text-white dark:text-black cursor-default'
                         : 'bg-green-50 dark:bg-zinc-800 text-green-700 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white'
                    }`}
                  >
                    {currentProductId === product.id ? (
                        <>
                           <Eye className="w-4 h-4" />
                           <span>مختار</span>
                        </>
                    ) : (
                        <>
                           <ShoppingCart className="w-4 h-4" />
                           <span>طلب</span>
                        </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;