import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Minus, Plus, ShoppingCart, Truck, ShieldCheck, Ruler } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import { useCartStore } from '../store/useCartStore';
import CustomizeOrderForm from '../components/CustomizeOrderForm';
import clsx from 'clsx';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, fetchProducts } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const product = products.find((p) => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-heading font-black text-secondary mb-4">Product Not Found</h2>
        <p className="text-text-muted mb-8 text-lg">We couldn't find the product you're looking for.</p>
        <Link to="/shop/all" className="px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-primary/50 transition-all hover:-translate-y-1">
          Return to Shop
        </Link>
      </div>
    );
  }

  // Calculate current price based on tier
  const getCurrentPrice = () => {
    let currentPrice = product.price;
    if (product.bulkPricing) {
      // Sort tiers by minQty descending
      const sortedTiers = [...product.bulkPricing].sort((a, b) => b.minQty - a.minQty);
      for (const tier of sortedTiers) {
        if (quantity >= tier.minQty) {
          currentPrice = tier.price;
          break;
        }
      }
    }
    return currentPrice;
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      price: getCurrentPrice(),
      isCustom: false,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-background min-h-screen pt-24 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-100 py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={`/shop/${product.category}`} className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary transition-colors group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to {product.category.replace('-', ' ').toUpperCase()}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Product Layout: Overlapping Desktop Design */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Column: Image Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-32">
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 mb-6 relative aspect-square flex items-center justify-center p-8">
                {product.condition === 'New' && (
                  <span className="absolute top-6 left-6 z-10 bg-secondary text-white text-sm font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">New</span>
                )}
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImage}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={product.images[activeImage]} 
                    alt={product.name} 
                    className="w-full h-full object-contain"
                  />
                </AnimatePresence>
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setActiveImage(idx)}
                      className={clsx(
                        "relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all",
                        activeImage === idx ? "border-primary shadow-lg shadow-primary/20 scale-105" : "border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="w-full lg:w-1/2 lg:py-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              {product.category.replace('-', ' ')}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-heading font-black text-secondary tracking-tight mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-5xl font-black text-secondary">₨ {getCurrentPrice()}</span>
              <span className="text-lg text-text-muted font-medium">/ unit</span>
            </div>

            <p className="text-lg text-text-muted leading-relaxed font-medium mb-10 border-l-4 border-gray-200 pl-4">
              {product.description}
            </p>

            {/* Bulk Pricing Tier Display */}
            {product.bulkPricing && product.bulkPricing.length > 0 && (
              <div className="bg-secondary/5 rounded-3xl p-6 mb-10 border border-secondary/10">
                <h4 className="text-sm font-heading font-black text-secondary uppercase tracking-widest mb-4">Wholesale Tiers</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                    <div className="text-xs text-text-muted font-bold uppercase mb-1">1 - {product.bulkPricing[0].minQty - 1}</div>
                    <div className="font-black text-secondary text-lg">₨ {product.price}</div>
                  </div>
                  {product.bulkPricing.map((tier, idx) => (
                    <div key={idx} className={clsx(
                      "bg-white rounded-2xl p-4 text-center shadow-sm border transition-colors",
                      quantity >= tier.minQty ? "border-primary shadow-primary/10" : "border-gray-100"
                    )}>
                      <div className="text-xs text-text-muted font-bold uppercase mb-1">
                        {tier.minQty}{idx < product.bulkPricing.length - 1 ? ` - ${product.bulkPricing[idx+1].minQty - 1}` : '+'}
                      </div>
                      <div className={clsx("font-black text-lg", quantity >= tier.minQty ? "text-primary" : "text-secondary")}>
                        ₨ {tier.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Actions */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-10">
              <div className="flex flex-col sm:flex-row gap-6 items-end">
                <div className="w-full sm:w-1/3">
                  <label className="block text-sm font-heading font-black text-secondary uppercase tracking-widest mb-3">Quantity</label>
                  <div className="flex items-center justify-between border-2 border-gray-100 rounded-2xl p-2 bg-gray-50">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-secondary hover:bg-gray-200 rounded-xl transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-bold text-xl text-secondary select-none w-16 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-secondary hover:bg-gray-200 rounded-xl transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={clsx(
                    "w-full sm:w-2/3 h-16 flex items-center justify-center gap-3 font-bold text-lg rounded-2xl transition-all",
                    isAdded 
                      ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]" 
                      : "bg-primary text-white hover:bg-primary-hover shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:-translate-y-1"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isAdded ? (
                      <motion.div key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                        <Check className="h-6 w-6" /> Added to Cart
                      </motion.div>
                    ) : (
                      <motion.div key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                        <ShoppingCart className="h-6 w-6" /> Add to Cart
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {product.customizable && (
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-text-muted font-medium mb-3">Need this with your logo or custom dimensions?</p>
                  <button 
                    onClick={() => setShowCustomForm(!showCustomForm)}
                    className="text-primary font-bold hover:text-primary-hover underline underline-offset-4 decoration-2"
                  >
                    Request a Custom Quote for this product
                  </button>
                </div>
              )}
            </div>

            <AnimatePresence>
              {showCustomForm && product.customizable && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-10 overflow-hidden"
                >
                  <div className="bg-secondary text-white rounded-3xl p-1 shadow-2xl">
                    <CustomizeOrderForm product={product} onSuccess={() => setShowCustomForm(false)} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Specifications */}
            <div>
              <h3 className="font-heading font-black text-2xl text-secondary mb-6 flex items-center gap-2">
                <Ruler className="h-6 w-6 text-primary" /> Technical Specifications
              </h3>
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                  <div className="p-6">
                    <div className="text-sm text-text-muted font-bold uppercase tracking-widest mb-1">Dimensions</div>
                    <div className="text-lg font-medium text-secondary">{product.dimensions}</div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-text-muted font-bold uppercase tracking-widest mb-1">Material</div>
                    <div className="text-lg font-medium text-secondary">{product.material}</div>
                  </div>
                  <div className="p-6 border-t border-gray-100">
                    <div className="text-sm text-text-muted font-bold uppercase tracking-widest mb-1">Strength/Ply</div>
                    <div className="text-lg font-medium text-secondary">{product.ply}</div>
                  </div>
                  <div className="p-6 border-t border-gray-100">
                    <div className="text-sm text-text-muted font-bold uppercase tracking-widest mb-1">Availability</div>
                    <div className="text-lg font-medium text-green-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      In Stock ({product.stock})
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap gap-6 pt-12 border-t border-gray-200">
              <div className="flex items-center gap-3 text-text-muted">
                <ShieldCheck className="h-6 w-6 text-gray-400" />
                <span className="text-sm font-medium">Verified Quality</span>
              </div>
              <div className="flex items-center gap-3 text-text-muted">
                <Truck className="h-6 w-6 text-gray-400" />
                <span className="text-sm font-medium">Fast Dispatch</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
