
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import NutriAssistant from './components/NutriAssistant';
import Cart from './components/Cart';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleAddToCart = (product: Product, size: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id: string, size: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: string, size: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] selection:bg-amber-100 selection:text-amber-900">
      <Header 
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />
      
      <main>
        <Hero />

        {/* Why Choose Us */}
        <section className="bg-white py-20 border-y border-amber-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-amber-950 mb-4">Pure Ingredients, Royal Taste</h2>
              <p className="text-amber-800/70">We believe healthy living starts with pure ingredients. That’s why we carefully select, pack, and deliver only the best dry fruits to our customers in Canada.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: 'fa-gem', title: 'Premium Sourced', desc: 'Imported & locally sourced for top quality.' },
                { icon: 'fa-shield-heart', title: 'Hygienic Packing', desc: 'Freshness guarantee with airtight seal.' },
                { icon: 'fa-truck-fast', title: 'Edmonton Delivery', desc: 'Fast local delivery across Alberta.' },
                { icon: 'fa-gift', title: 'Custom Gifting', desc: 'Perfect for health-conscious gifts.' },
              ].map((feature, idx) => (
                <div key={idx} className="text-center p-6 rounded-2xl hover:bg-amber-50 transition-colors">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-800 mx-auto mb-4">
                    <i className={`fas ${feature.icon} text-lg`}></i>
                  </div>
                  <h3 className="font-bold text-amber-950 mb-2">{feature.title}</h3>
                  <p className="text-sm text-amber-800/60 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shop Section */}
        <section id="shop" className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-amber-950 mb-2">Our Collection</h2>
                <p className="text-amber-800/60">Discover nature's finest treasures.</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      selectedCategory === cat 
                        ? 'bg-amber-800 text-white shadow-md' 
                        : 'bg-white border border-amber-100 text-amber-900 hover:border-amber-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="container mx-auto px-4 pb-24">
          <div className="bg-amber-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <i className="fas fa-leaf text-[200px] -rotate-45"></i>
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Want something custom or for an event?</h2>
              <p className="text-amber-200/80 mb-8">We provide bulk pricing for weddings, corporate gifts, and special occasions across Edmonton.</p>
              <button 
                onClick={() => setIsAssistantOpen(true)}
                className="px-10 py-4 bg-white text-amber-900 font-bold rounded-xl hover:bg-amber-50 transition-all shadow-xl active:scale-95"
              >
                Chat with Assistant
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-amber-50 pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-amber-800 rounded-full flex items-center justify-center text-white text-sm">
                  <i className="fas fa-leaf"></i>
                </div>
                <h1 className="text-lg font-bold text-amber-900">Royal Harvest</h1>
              </div>
              <p className="text-sm text-amber-800/70 leading-relaxed mb-6">
                Premium Dry Fruits & Nuts delivered fresh across Edmonton and Alberta. Healthy snacking, simplified.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-amber-800 shadow-sm hover:text-white hover:bg-amber-800 transition-all"><i className="fab fa-instagram"></i></a>
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-amber-800 shadow-sm hover:text-white hover:bg-amber-800 transition-all"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-amber-800 shadow-sm hover:text-white hover:bg-amber-800 transition-all"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-amber-950 mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm text-amber-800/70">
                <li><a href="#" className="hover:text-amber-900">Shop All</a></li>
                <li><a href="#" className="hover:text-amber-900">Gift Boxes</a></li>
                <li><a href="#" className="hover:text-amber-900">Health Benefits</a></li>
                <li><a href="#" className="hover:text-amber-900">Wholesale</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-amber-950 mb-6">Support</h4>
              <ul className="space-y-3 text-sm text-amber-800/70">
                <li><a href="#" className="hover:text-amber-900">Contact Us</a></li>
                <li><a href="#" className="hover:text-amber-900">Delivery Areas</a></li>
                <li><a href="#" className="hover:text-amber-900">Return Policy</a></li>
                <li><a href="#" className="hover:text-amber-900">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-amber-950 mb-6">Local Presence</h4>
              <p className="text-sm text-amber-800/70 mb-4">
                Based in Edmonton, AB<br />
                Available for local pickup & doorstep delivery.
              </p>
              <p className="text-xs font-bold text-amber-900">
                <i className="fas fa-envelope mr-2"></i>hello@royalharvest.ca
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-amber-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
              © 2024 Royal Harvest Dry Fruits. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4 grayscale opacity-50">
              <i className="fab fa-cc-visa text-2xl"></i>
              <i className="fab fa-cc-mastercard text-2xl"></i>
              <i className="fab fa-apple-pay text-2xl"></i>
              <i className="fab fa-google-pay text-2xl"></i>
            </div>
          </div>
        </div>
      </footer>

      <NutriAssistant 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
      />
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQty={handleUpdateQty}
      />

      {/* Floating Assistant Button for Mobile */}
      <button 
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-30 w-14 h-14 bg-amber-800 text-white rounded-full shadow-2xl flex items-center justify-center lg:hidden active:scale-90 transition-transform"
      >
        <i className="fas fa-magic text-xl"></i>
      </button>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
