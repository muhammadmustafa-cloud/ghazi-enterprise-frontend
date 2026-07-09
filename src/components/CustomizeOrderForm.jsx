import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { plyOptions } from '../data/products';
import { Check } from 'lucide-react';
import clsx from 'clsx';

export default function CustomizeOrderForm({ product }) {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [selectedPly, setSelectedPly] = useState(product.ply !== 'N/A' ? product.ply : plyOptions[0]);
  const [hasPrinting, setHasPrinting] = useState(false);
  const [quantity, setQuantity] = useState(500); // Default bulk qty
  const [isSubmitted, setIsSubmitted] = useState(false);

  const addToCart = useCartStore(state => state.addToCart);

  const handleSubmit = (e) => {
    e.preventDefault();
    const customItem = {
      id: `${product.id}-custom-${Date.now()}`,
      name: `Custom: ${product.name}`,
      price: 0, // Pending quote
      dimensions: `${length}x${width}x${height} inch`,
      ply: selectedPly,
      material: product.material,
      condition: product.condition,
      images: product.images,
      quantity: Number(quantity),
      isCustom: true,
      hasPrinting,
    };
    
    addToCart(customItem);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setLength(''); setWidth(''); setHeight(''); setHasPrinting(false);
    }, 3000);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-8">
      <h3 className="font-heading font-bold text-xl text-text-main mb-2">Request Custom Quote</h3>
      <p className="text-sm text-text-muted mb-6">Need specific dimensions or logo printing? Submit your requirements below.</p>

      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="font-bold text-lg mb-1">Request Added to Cart!</h4>
          <p className="text-sm">We will review your requirements and provide a quote.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Dimensions */}
          <div>
            <label className="block text-sm font-semibold text-text-main mb-2">Custom Dimensions (Inches)</label>
            <div className="flex items-center gap-2">
              <input type="number" required placeholder="L" value={length} onChange={e => setLength(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary" />
              <span className="text-gray-400 font-bold text-sm">x</span>
              <input type="number" required placeholder="W" value={width} onChange={e => setWidth(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary" />
              <span className="text-gray-400 font-bold text-sm">x</span>
              <input type="number" required placeholder="H" value={height} onChange={e => setHeight(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary" />
            </div>
          </div>

          {/* Ply */}
          {product.category !== 'tape' && (
            <div>
              <label className="block text-sm font-semibold text-text-main mb-2">Wall Strength (Ply)</label>
              <div className="grid grid-cols-3 gap-3">
                {plyOptions.map(ply => (
                  <button
                    key={ply}
                    type="button"
                    onClick={() => setSelectedPly(ply)}
                    className={clsx(
                      "py-2 text-sm rounded-md border font-medium transition-colors",
                      selectedPly === ply ? "bg-primary/10 border-primary text-primary" : "border-gray-300 bg-white text-text-muted hover:bg-gray-50"
                    )}
                  >
                    {ply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Printing */}
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="printing"
              checked={hasPrinting}
              onChange={e => setHasPrinting(e.target.checked)}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="printing" className="text-sm font-semibold text-text-main cursor-pointer">
              Add custom logo printing
            </label>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-text-main mb-2">Estimated Quantity</label>
            <input 
              type="number" 
              required 
              min="100"
              value={quantity} 
              onChange={e => setQuantity(e.target.value)} 
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary" 
            />
            <p className="text-xs text-gray-500 mt-1">Minimum order quantity for custom items is usually 100.</p>
          </div>

          <button 
            type="submit"
            className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded-md transition-colors"
          >
            Add Quote Request to Cart
          </button>
        </form>
      )}
    </div>
  );
}
