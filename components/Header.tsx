
import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAssistant: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onOpenAssistant }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#fdfbf7]/90 backdrop-blur-sm border-b border-amber-100 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center text-white">
            <i className="fas fa-leaf"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-amber-900 tracking-tight">Royal Harvest</h1>
            <p className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold -mt-1">Dry Fruits Edmonton</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-amber-900">
          <a href="#" className="hover:text-amber-600 transition-colors">Home</a>
          <a href="#shop" className="hover:text-amber-600 transition-colors">Shop</a>
          <a href="#about" className="hover:text-amber-600 transition-colors">About</a>
          <button 
            onClick={onOpenAssistant}
            className="px-4 py-2 bg-amber-100 text-amber-900 rounded-full hover:bg-amber-200 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-magic text-amber-600"></i>
            Assistant
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-amber-900 hover:text-amber-600 transition-colors"
          >
            <i className="fas fa-shopping-basket text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2 text-amber-900">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
