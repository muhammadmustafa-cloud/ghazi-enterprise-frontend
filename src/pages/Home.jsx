import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Truck, ShieldCheck, Tag, ThumbsUp, MessageCircle } from 'lucide-react';
import clsx from 'clsx';
import { products, categories } from '../data/products';

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -8 }}
    className="flex flex-col items-start p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all group"
  >
    <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-500">
      <Icon className="h-8 w-8 text-secondary group-hover:text-primary transition-colors duration-500" />
    </div>
    <h3 className="font-heading font-bold text-2xl mb-3">{title}</h3>
    <p className="text-text-muted leading-relaxed font-medium">{desc}</p>
  </motion.div>
);

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-secondary text-white overflow-hidden flex items-center pt-20">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/30"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-80"></div>
        
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 opacity-40"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=2000&q=80" alt="Warehouse Boxes" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div style={{ opacity: opacityHero }} className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-8 shadow-xl"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(249,115,22,1)]"></span>
              <span className="text-sm font-bold tracking-widest text-white uppercase drop-shadow-md">PREMIUM PACKAGING SOLUTIONS</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl text-white font-heading font-black leading-[1.1] tracking-tight mb-6 drop-shadow-lg"
            >
              Protect your products. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-yellow-400 drop-shadow-none">
                Elevate your brand.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-2xl text-gray-200 mb-10 font-medium leading-relaxed max-w-2xl drop-shadow-md"
            >
              Industrial-grade corrugated boxes, heavy-duty tapes, and custom-manufactured dimensions tailored precisely to your supply chain needs.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
            >
              <Link to="/shop/new-box" className="px-8 py-5 bg-primary hover:bg-primary-hover text-white font-bold text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(249,115,22,0.8)] hover:shadow-[0_0_60px_-10px_rgba(249,115,22,1)] hover:-translate-y-1 flex items-center justify-center gap-2 group">
                Shop Packaging
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/custom-quote" className="px-8 py-5 glass border-white/20 text-white hover:bg-white/20 font-bold text-lg rounded-2xl transition-all hover:-translate-y-1 flex items-center justify-center">
                Request Custom Quote
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Categories (Masonry Style Grid) */}
      <section className="py-32 bg-background relative z-20 -mt-10 rounded-t-[3rem] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-heading font-black text-secondary mb-4">Explore our catalog.</h2>
              <p className="text-xl text-text-muted font-medium">From custom printed cartons to high-adhesion industrial tapes.</p>
            </div>
            <Link to="/shop/all" className="hidden md:flex items-center text-primary font-bold text-lg hover:text-primary-hover transition-colors group">
              View Entire Catalog <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
            {categories.map((cat, index) => {
              // Custom span logic for masonry feel
              let spanClass = "md:col-span-4";
              if (index === 0) spanClass = "md:col-span-8 md:row-span-2";
              else if (index === 1) spanClass = "md:col-span-4 md:row-span-2";
              else if (index === 2) spanClass = "md:col-span-4";
              else if (index === 3) spanClass = "md:col-span-4";
              else if (index === 4) spanClass = "md:col-span-4";

              return (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={cat.id} 
                  className={clsx("group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all block", spanClass)}
                >
                  <Link to={`/shop/${cat.id}`} className="absolute inset-0 w-full h-full block">
                    <motion.div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                      style={{ backgroundImage: `url(${cat.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-3xl font-heading font-bold text-white mb-3">{cat.name}</h3>
                        <div className="flex items-center text-primary font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          Shop Category <ArrowRight className="ml-2 h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white border-y border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-heading font-black text-secondary">The Ghazi Standard</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard delay={0.1} icon={Truck} title="Fast Dispatch" desc="Robust supply chain allowing same-day dispatch for all standard in-stock inventory across the city." />
            <FeatureCard delay={0.2} icon={ShieldCheck} title="Quality Assured" desc="Rigorous drop-tests and burst-strength checks ensure every box meets strict industrial standards." />
            <FeatureCard delay={0.3} icon={Tag} title="B2B Pricing" desc="Aggressive, transparent tiered wholesale pricing designed for factories and large-scale businesses." />
            <FeatureCard delay={0.4} icon={ThumbsUp} title="Trusted by 500+" desc="The preferred packaging partner for top logistics and e-commerce companies nationwide." />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-secondary mb-4">Bestsellers.</h2>
              <p className="text-xl text-text-muted font-medium">Industry favorites, ready to ship.</p>
            </div>
            <Link to="/shop/new-box" className="hidden md:flex items-center text-primary font-bold text-lg hover:text-primary-hover group transition-colors">
              View All <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={product.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col group"
              >
                <Link to={`/product/${product.id}`} className="relative h-72 overflow-hidden block bg-gray-50">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  {product.condition === 'New' && (
                    <span className="absolute top-5 left-5 bg-secondary text-white text-xs font-black tracking-wider px-4 py-2 rounded-full uppercase shadow-md">New</span>
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-primary mb-3 font-bold uppercase tracking-widest">{product.category.replace('-', ' ')}</div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-heading font-bold text-2xl mb-2 text-secondary group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-text-muted mb-6 font-medium">{product.dimensions} • {product.ply !== 'N/A' ? product.ply : product.material}</p>
                  
                  <div className="mt-auto flex items-end justify-between pt-4 border-t border-gray-50">
                    <div>
                      <span className="text-sm text-text-muted font-medium block mb-1">Starting from</span>
                      <div className="font-bold text-2xl text-secondary">₨ {product.price}</div>
                    </div>
                    <Link 
                      to={`/product/${product.id}`}
                      className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:rotate-[-45deg] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                    >
                      <ArrowRight className="h-6 w-6" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center md:hidden">
            <Link to="/shop/all" className="inline-flex items-center text-primary font-bold text-lg hover:text-primary-hover border-b-2 border-primary pb-1">
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 md:p-20 shadow-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-6 tracking-tight">Need a Custom <br className="hidden md:block"/> Packaging Solution?</h2>
            <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Can't find the exact size? We manufacture custom boxes with specific dimensions, wall strength, and high-quality logo printing tailored to your brand.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/product/nb-001" className="px-8 py-5 bg-primary hover:bg-primary-hover text-white font-bold text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(249,115,22,0.8)] hover:shadow-[0_0_60px_-10px_rgba(249,115,22,1)] hover:-translate-y-1">
                Customize Online
              </Link>
              <a 
                href="https://wa.me/923000000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-5 bg-white text-secondary hover:bg-gray-100 font-bold text-lg rounded-2xl transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-6 w-6" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
