import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, Package } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import clsx from 'clsx';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = useCartStore((state) => state.getTotalItems());

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'New Boxes', path: '/shop/new-box' },
    { name: 'Used Boxes', path: '/shop/old-box' },
    { name: 'Tape', path: '/shop/tape' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <Package className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="font-heading font-bold text-2xl tracking-tight text-text-main">
                GHAZI <span className="text-primary">ENTERPRISE</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  clsx(
                    'font-sans text-sm font-semibold transition-colors',
                    isActive ? 'text-primary' : 'text-text-muted hover:text-primary'
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Action Section (Cart + Contact) */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <a 
              href="https://wa.me/923000000000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
            
            <Link to="/cart" className="relative p-2 text-text-main hover:text-primary transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-4">
            <Link to="/cart" className="relative p-2 text-text-main hover:text-primary">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-text-muted hover:text-primary hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-background absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  clsx(
                    'block px-3 py-2 rounded-md text-base font-medium',
                    isActive ? 'bg-primary/10 text-primary' : 'text-text-muted hover:bg-gray-50 hover:text-primary'
                  )
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <a 
              href="https://wa.me/923000000000" 
              className="flex items-center gap-2 px-3 py-2 mt-4 rounded-md text-base font-medium bg-green-50 text-green-700 hover:bg-green-100"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Phone className="h-5 w-5" />
              Contact on WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
