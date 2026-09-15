import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, Package } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'New Boxes', path: '/shop/new-box' },
    { name: 'Used Boxes', path: '/shop/old-box' },
    { name: 'Pizza & Cake', path: '/shop/pizza-cake' },
    { name: 'Tape', path: '/shop/tape' },
    { name: 'Shrink Roll', path: '/shop/shrink-roll' },
    { name: 'Bubble Wrap', path: '/shop/bubble-wrap' },
  ];

  return (
    <header className={clsx(
      'fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out',
      scrolled ? 'py-2' : 'py-0'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className={clsx(
          'relative flex items-center justify-between rounded-2xl px-6 py-4 transition-all duration-500',
          scrolled ? 'glass shadow-lg border border-white/20' : 'bg-transparent border border-transparent'
        )}>
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group z-50">
            <div className="bg-primary p-2.5 rounded-xl text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] group-hover:scale-105 transition-transform duration-300">
              <Package className="h-6 w-6" strokeWidth={2.5} />
            </div>
            <span className={clsx(
              "font-heading font-extrabold text-2xl tracking-tight transition-colors duration-500",
              scrolled ? "text-secondary" : "text-white"
            )}>
              GHAZI<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => clsx(
                  'relative px-5 py-2.5 font-sans text-sm font-bold transition-all duration-300 rounded-full group overflow-hidden whitespace-nowrap',
                  isActive ? (scrolled ? 'text-primary' : 'text-white') : (scrolled ? 'text-text-muted hover:text-secondary' : 'text-gray-300 hover:text-white')
                )}
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10 drop-shadow-sm">{link.name}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="navbar-indicator"
                        className={clsx(
                          "absolute inset-0 rounded-full z-0",
                          scrolled ? "bg-primary/10" : "bg-white/20 backdrop-blur-sm"
                        )}
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Action Section (Cart + Contact) */}
          <div className="hidden lg:flex items-center space-x-6 z-50">
            <a 
              href="https://wa.me/923220258575" 
              target="_blank" 
              rel="noopener noreferrer"
              className={clsx(
                "flex items-center gap-2 text-sm font-bold transition-all duration-300 hover:scale-105",
                scrolled ? "text-secondary hover:text-primary" : "text-white hover:text-primary"
              )}
            >
              <Phone className="h-4 w-4" />
              <span className="drop-shadow-sm">Support</span>
            </a>
            
            <Link to="/cart" className="relative p-2 group transition-transform duration-300 hover:scale-110">
              <div className={clsx(
                "p-2.5 rounded-full transition-all duration-300",
                scrolled ? "bg-gray-100 group-hover:bg-primary/10 text-secondary group-hover:text-primary" : "bg-white/10 group-hover:bg-primary/90 text-white backdrop-blur-md shadow-lg"
              )}>
                <ShoppingCart className="h-5 w-5" />
              </div>
              <AnimatePresence>
                {cartItemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)] border-2 border-white"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-4 z-50">
            <Link to="/cart" className={clsx("relative p-2 transition-colors duration-300", scrolled ? "text-secondary" : "text-white")}>
              <ShoppingCart className="h-6 w-6 drop-shadow-md" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full border-2 border-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              className={clsx(
                "inline-flex items-center justify-center p-2.5 rounded-full focus:outline-none transition-all duration-300",
                scrolled ? "text-secondary bg-gray-100 hover:bg-gray-200" : "text-white bg-white/10 hover:bg-white/20 backdrop-blur-md shadow-lg"
              )}
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
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-4 right-4 mt-2 p-4 glass rounded-2xl shadow-xl border border-white/20 origin-top"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    clsx(
                      'px-4 py-3 rounded-xl text-base font-bold transition-colors',
                      isActive ? 'bg-primary/10 text-primary' : 'text-text-main hover:bg-gray-50'
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <a 
                href="https://wa.me/923000000000" 
                className="flex items-center justify-center gap-2 px-4 py-3 mt-4 rounded-xl text-base font-bold bg-primary text-white hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Phone className="h-5 w-5" />
                Contact Support
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
