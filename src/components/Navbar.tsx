import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, ClipboardList, BarChart3, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  
  // Navigation links
  const navLinks = [
    { to: '/', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { to: '/inventory', label: 'Inventory', icon: <Package className="w-5 h-5" /> },
    { to: '/cart', label: 'Cart', icon: <ShoppingBag className="w-5 h-5" /> },
    { to: '/bills', label: 'Bills', icon: <ClipboardList className="w-5 h-5" /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-orange-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ShoppingBag className="w-8 h-8 mr-2" />
              <span className="font-bold text-xl">FoodStock</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
              >
                {link.icon}
                <span className="ml-1">{link.label}</span>
                {link.to === '/cart' && getItemCount() > 0 && (
                  <span className="ml-1 px-2 py-1 text-xs bg-white text-orange-600 rounded-full">
                    {getItemCount()}
                  </span>
                )}
              </Link>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-orange-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-orange-600">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-orange-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
                {link.to === '/cart' && getItemCount() > 0 && (
                  <span className="ml-2 px-2 py-1 text-xs bg-white text-orange-600 rounded-full">
                    {getItemCount()}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;