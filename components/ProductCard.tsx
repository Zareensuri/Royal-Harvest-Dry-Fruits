
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-amber-50">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-amber-900 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-amber-950 mb-2">{product.name}</h3>
        <p className="text-sm text-amber-800/70 mb-4 line-clamp-2 h-10">
          {product.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {product.benefits.map((benefit, idx) => (
            <span key={idx} className="text-[10px] font-semibold text-green-700 flex items-center gap-1">
              <i className="fas fa-check-circle text-[8px]"></i>
              {benefit}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <p className="text-xs text-amber-700 font-medium">Select Size:</p>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md border transition-all ${
                    selectedSize === size 
                      ? 'bg-amber-800 border-amber-800 text-white' 
                      : 'border-amber-200 text-amber-800 hover:border-amber-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-amber-900">${product.price.toFixed(2)}</p>
            <p className="text-[10px] text-amber-500 font-medium">CAD + GST</p>
          </div>
        </div>

        <button 
          onClick={() => onAddToCart(product, selectedSize)}
          className="w-full py-3 bg-amber-50 text-amber-900 font-bold rounded-lg hover:bg-amber-800 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
        >
          <i className="fas fa-cart-plus group-hover/btn:scale-125 transition-transform"></i>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
