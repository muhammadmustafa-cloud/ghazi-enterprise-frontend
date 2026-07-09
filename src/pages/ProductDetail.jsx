import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { products } from '../data/products';
import { ArrowLeft, Check, Minus, Plus, ShoppingCart, Truck, ShieldCheck, Box } from 'lucide-react';
import CustomizeOrderForm from '../components/CustomizeOrderForm';
import clsx from 'clsx';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const addToCart = useCartStore(state => state.addToCart);

  const [mainImage, setMainImage] = useState(product?.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (product) {
      setMainImage(product.images[0]);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/shop/new-box" className="text-primary hover:underline">Return to Shop</Link>
        </div>
      </div>
    );
  }

  // Calculate current price based on quantity tiers
  const currentPrice = (() => {
    if (!product.bulkPricing || product.bulkPricing.length === 0) return product.price;
    let price = product.price;
    // Sort tiers descending by minQty to find the highest applicable tier
    const tiers = [...product.bulkPricing].sort((a, b) => b.minQty - a.minQty);
    for (const tier of tiers) {
      if (quantity >= tier.minQty) {
        price = tier.price;
        break;
      }
    }
    return price;
  })();

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      price: currentPrice, // Store the price they got at checkout based on qty
      isCustom: false
    });
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="bg-white min-h-screen pb-16">
      
      {/* Toast Notification */}
      <div className={clsx(
        "fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 transition-all duration-300",
        showToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      )}>
        <Check className="h-5 w-5 text-green-400" />
        <span className="font-semibold text-sm">Added {quantity} items to cart</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to={`/shop/${product.category}`} className="inline-flex items-center text-sm font-semibold text-text-muted hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {product.category.replace('-', ' ')}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative group cursor-crosshair">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500 origin-center" 
              />
              {product.condition === 'New' && (
                <span className="absolute top-4 left-4 bg-primary text-white text-sm font-bold px-4 py-1 rounded-full">New</span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={clsx(
                      "w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                      mainImage === img ? "border-primary" : "border-transparent hover:border-gray-300"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-main mb-2">{product.name}</h1>
            <p className="text-lg text-text-muted mb-6">{product.description}</p>
            
            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-bold text-primary">₨ {currentPrice}</span>
              <span className="text-text-muted mb-1 font-semibold">/ unit</span>
              {currentPrice < product.price && (
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded font-bold mb-1 ml-2">
                  Bulk Discount Applied!
                </span>
              )}
            </div>

            {/* Bulk Pricing Info */}
            {product.bulkPricing && product.bulkPricing.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200">
                <h4 className="font-bold text-sm text-text-main mb-2 uppercase tracking-wide">Bulk Pricing Tiers</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">1 - {product.bulkPricing[0].minQty - 1} units:</span>
                    <span className="font-bold text-text-main">₨ {product.price} / unit</span>
                  </div>
                  {product.bulkPricing.map((tier, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-text-muted">
                        {tier.minQty}{idx < product.bulkPricing.length - 1 ? ` - ${product.bulkPricing[idx+1].minQty - 1}` : '+'} units:
                      </span>
                      <span className="font-bold text-primary">₨ {tier.price} / unit</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specs Table */}
            <div className="mb-8 border-t border-gray-100 pt-6">
              <h3 className="font-heading font-bold text-lg mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="text-text-muted font-medium">Dimensions</div>
                <div className="font-semibold text-text-main">{product.dimensions}</div>
                <div className="text-text-muted font-medium">Wall Strength</div>
                <div className="font-semibold text-text-main">{product.ply}</div>
                <div className="text-text-muted font-medium">Material</div>
                <div className="font-semibold text-text-main">{product.material}</div>
                <div className="text-text-muted font-medium">Condition</div>
                <div className="font-semibold text-text-main">{product.condition}</div>
                <div className="text-text-muted font-medium">Availability</div>
                <div className="font-semibold text-green-600">{product.stock} in stock</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-end gap-4 mb-8">
              <div className="w-1/3">
                <label className="block text-sm font-semibold text-text-muted mb-2">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-md bg-white">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 text-text-muted hover:text-primary transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full text-center font-bold text-lg outline-none appearance-none"
                  />
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 text-text-muted hover:text-primary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-4 px-6 rounded-md transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 py-4 border-t border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm font-medium text-text-muted">
                <Truck className="h-5 w-5 text-primary" /> Same-day dispatch
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-text-muted">
                <ShieldCheck className="h-5 w-5 text-primary" /> Quality checked
              </div>
            </div>

            {/* Custom Quote Request Form */}
            {product.customizable && (
              <CustomizeOrderForm product={product} />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
