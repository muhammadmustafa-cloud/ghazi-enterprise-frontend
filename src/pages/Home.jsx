import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, ShieldCheck, Tag, ThumbsUp, MessageCircle } from 'lucide-react';
import { products, categories } from '../data/products';

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
      <Icon className="h-8 w-8 text-primary" />
    </div>
    <h3 className="font-heading font-bold text-xl mb-2">{title}</h3>
    <p className="text-text-muted text-sm">{desc}</p>
  </div>
);

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=80')" }}
        ></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-start">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold max-w-3xl leading-tight mb-6"
          >
            Industrial-Grade Packaging Solutions for Your Business.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10"
          >
            Premium new & recycled carton boxes, heavy-duty tapes, and custom branding tailored to your supply chain needs.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to="/shop/new-box" className="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-md transition-colors text-center shadow-lg shadow-primary/30">
              Shop New Boxes
            </Link>
            <Link to="/shop/tape" className="px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 font-bold rounded-md transition-colors text-center">
              Shop Tape
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-main mb-4">Browse by Category</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Explore our wide range of packaging products categorized for your convenience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, index) => (
              <Link key={cat.id} to={`/shop/${cat.id}`} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-80 flex items-end">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ 
                    backgroundImage: `url(${
                      cat.id === 'new-box' ? '/new-boxes.png' : 
                      cat.id === 'old-box' ? '/used-boxes.png' : 
                      '/tape.png'
                    })` 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative p-8 w-full">
                  <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <div className="flex items-center text-white text-sm font-semibold">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={Truck} title="Fast Delivery" desc="Same-day dispatch for all standard in-stock items across the city." />
            <FeatureCard icon={ShieldCheck} title="Quality Assured" desc="Every box is strength-tested to meet industrial standards." />
            <FeatureCard icon={Tag} title="Bulk Discounts" desc="Tiered wholesale pricing for factories and large businesses." />
            <FeatureCard icon={ThumbsUp} title="Trusted by 500+" desc="Partnered with top logistics and e-commerce companies." />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-main mb-4">Best Sellers</h2>
              <p className="text-text-muted">Our most popular packaging supplies.</p>
            </div>
            <Link to="/shop/new-box" className="hidden md:flex items-center text-primary font-bold hover:text-primary-hover">
              View All <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col">
                <Link to={`/product/${product.id}`} className="relative h-64 overflow-hidden group">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {product.condition === 'New' && (
                    <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">New</span>
                  )}
                </Link>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-xs text-text-muted mb-2 font-semibold uppercase tracking-wider">{product.category.replace('-', ' ')}</div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-heading font-bold text-lg mb-2 hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-text-muted mb-4">{product.dimensions} • {product.ply}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="font-bold text-xl text-text-main">₨ {product.price}</div>
                    <Link 
                      to={`/product/${product.id}`}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-text-main hover:bg-primary hover:text-white transition-colors"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/shop/new-box" className="inline-flex items-center text-primary font-bold hover:text-primary-hover border-b-2 border-primary pb-1">
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23000000\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Need a Custom Packaging Solution?</h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            Can't find the exact size? We manufacture custom boxes with your specific dimensions, ply, and logo printing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/product/nb-001" className="px-8 py-4 bg-white text-secondary font-bold rounded-md hover:bg-gray-100 transition-colors shadow-lg">
              Customize Online
            </Link>
            <a 
              href="https://wa.me/923000000000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
