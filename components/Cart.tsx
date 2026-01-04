
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string, size: string) => void;
  onUpdateQty: (id: string, size: string, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQty }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        <div className="p-6 border-b border-amber-50 flex items-center justify-between">
          <h3 className="text-xl font-bold text-amber-950">Your Basket</h3>
          <button onClick={onClose} className="p-2 hover:bg-amber-100 rounded-full text-amber-900 transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-200 text-3xl">
                <i className="fas fa-shopping-basket"></i>
              </div>
              <p className="text-amber-900/50 font-medium">Your basket is empty</p>
              <button onClick={onClose} className="mt-4 text-amber-800 font-bold hover:underline">
                Start Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-amber-50">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-amber-950 truncate">{item.name}</h4>
                    <button 
                      onClick={() => onRemove(item.id, item.selectedSize)}
                      className="text-amber-200 hover:text-red-500 transition-colors"
                    >
                      <i className="fas fa-trash-alt text-xs"></i>
                    </button>
                  </div>
                  <p className="text-xs text-amber-600 mb-2">{item.selectedSize}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-amber-50 rounded-lg p-1">
                      <button 
                        onClick={() => onUpdateQty(item.id, item.selectedSize, -1)}
                        className="w-6 h-6 flex items-center justify-center text-amber-900 hover:bg-amber-100 rounded"
                      >
                        <i className="fas fa-minus text-[10px]"></i>
                      </button>
                      <span className="text-xs font-bold text-amber-950">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, item.selectedSize, 1)}
                        className="w-6 h-6 flex items-center justify-center text-amber-900 hover:bg-amber-100 rounded"
                      >
                        <i className="fas fa-plus text-[10px]"></i>
                      </button>
                    </div>
                    <p className="font-bold text-amber-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-amber-50 bg-amber-50/30">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-amber-900/60">Subtotal</span>
                <span className="text-amber-950 font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-amber-900/60">GST (5%)</span>
                <span className="text-amber-950 font-medium">${gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-amber-200 pt-2 mt-2">
                <span className="text-amber-950">Total</span>
                <span className="text-amber-900">${total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              className="w-full py-4 bg-amber-800 text-white font-bold rounded-xl hover:bg-amber-900 transition-all shadow-lg active:scale-95"
              onClick={() => {
                const message = encodeURIComponent(`Hi Royal Harvest! I'd like to place an order:\n\n${items.map(i => `- ${i.name} (${i.selectedSize}) x${i.quantity}`).join('\n')}\n\nTotal: $${total.toFixed(2)}`);
                window.open(`https://wa.me/your-number?text=${message}`, '_blank');
              }}
            >
              Order via WhatsApp
            </button>
            <p className="text-[10px] text-center text-amber-400 mt-4 uppercase tracking-widest font-bold">
              Secure Local Checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
