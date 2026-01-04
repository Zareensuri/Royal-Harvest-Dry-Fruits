
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            <i className="fas fa-star text-[10px]"></i>
            Freshly Packed in Edmonton
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-amber-950 mb-6 leading-[1.1]">
            Premium Dry Fruits <span className="text-amber-700 italic font-serif">& Nuts</span>
          </h1>
          <p className="text-lg text-amber-800/80 mb-8 max-w-lg leading-relaxed">
            100% natural, premium-quality dry fruits delivered fresh to your door across Edmonton & Alberta. Healthy living starts with pure ingredients.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#shop" 
              className="px-8 py-4 bg-amber-800 text-white font-bold rounded-lg hover:bg-amber-900 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
            >
              Shop Now
              <i className="fas fa-arrow-right text-sm"></i>
            </a>
            <a 
              href="https://wa.me/your-number" 
              target="_blank"
              className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
            >
              <i className="fab fa-whatsapp"></i>
              Order on WhatsApp
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-200 rounded-full blur-3xl opacity-50 -z-10"></div>
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50 -z-10"></div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&q=80&w=1200" 
              alt="Premium Assorted Dry Fruits" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
