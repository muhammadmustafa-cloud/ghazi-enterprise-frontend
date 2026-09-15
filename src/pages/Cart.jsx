import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getSubtotal } = useCartStore();

  const standardItems = items.filter(item => !item.isCustom);
  const customItems = items.filter(item => item.isCustom);
  const subtotal = getSubtotal();
  const deliveryCharges = subtotal > 0 ? 500 : 0; // Flat 500 PKR delivery for standard items
  const total = subtotal + deliveryCharges;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-text-main mb-2">Your Cart is Empty</h2>
        <p className="text-text-muted mb-8 max-w-md text-center">Looks like you haven't added any products to your cart yet. Let's find you some high-quality packaging!</p>
        <Link to="/shop/new-box" className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-md transition-colors shadow-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  const CartItemRow = ({ item }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-gray-100 gap-4 sm:gap-6 group">
      <Link to={`/product/${item.id.replace(/-custom-\d+$/, '')}`} className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </Link>
      
      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.id.replace(/-custom-\d+$/, '')}`}>
          <h4 className="font-heading font-bold text-lg text-text-main hover:text-primary transition-colors truncate">{item.name}</h4>
        </Link>
        <div className="text-sm text-text-muted mt-1 space-y-1">
          <p>Dimensions: {item.dimensions}</p>
          <p>Ply: {item.ply}</p>
          {item.isCustom && item.hasPrinting && <p className="text-primary font-medium">Includes Custom Logo Printing</p>}
        </div>
      </div>

      <div className="flex items-center gap-6 sm:w-auto w-full justify-between sm:justify-end">
        {/* Quantity Editor */}
        <div className="flex items-center border border-gray-300 rounded-md bg-white">
          <button 
            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
            className="p-2 text-text-muted hover:text-primary transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
            className="p-2 text-text-muted hover:text-primary transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="text-right w-24">
          {item.isCustom ? (
            <span className="text-sm font-bold text-secondary uppercase tracking-wide">Pending Quote</span>
          ) : (
            <span className="font-bold text-lg text-text-main">₨ {item.price * item.quantity}</span>
          )}
        </div>

        <button 
          onClick={() => removeFromCart(item.cartItemId)}
          className="text-gray-400 hover:text-red-500 transition-colors p-2"
          title="Remove Item"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-main mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          
          <div className="flex-1 space-y-8">
            {/* Standard Items Section */}
            {standardItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                <h3 className="font-heading font-bold text-xl border-b border-gray-200 pb-4 mb-2">Standard Items</h3>
                <div className="flex flex-col">
                  {standardItems.map(item => <CartItemRow key={item.cartItemId} item={item} />)}
                </div>
              </div>
            )}

            {/* Custom Quote Items Section */}
            {customItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-secondary p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wide">
                  Quote Requests
                </div>
                <h3 className="font-heading font-bold text-xl border-b border-gray-200 pb-4 mb-2">Custom Quote Requests</h3>
                <p className="text-sm text-text-muted mb-4 mt-2">These items require a custom quote. Proceed with the checkout to submit your request to our sales team.</p>
                <div className="flex flex-col">
                  {customItems.map(item => <CartItemRow key={item.cartItemId} item={item} />)}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 sticky top-28">
              <h3 className="font-heading font-bold text-xl mb-6">Order Summary</h3>
              
              <div className="space-y-4 text-sm mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-text-muted">Subtotal ({standardItems.length} items)</span>
                  <span className="font-bold text-text-main">₨ {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Estimated Delivery</span>
                  <span className="font-bold text-text-main">₨ {deliveryCharges}</span>
                </div>
                {customItems.length > 0 && (
                  <div className="flex justify-between bg-yellow-50 p-3 rounded-md border border-yellow-200">
                    <span className="text-yellow-800 font-medium">Custom Quotes Pending</span>
                    <span className="font-bold text-secondary">TBD</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-heading font-bold text-lg">Total</span>
                <span className="font-bold text-3xl text-primary">₨ {total}</span>
              </div>

              {/* Promo Code UI */}
              <div className="mb-6 flex gap-2">
                <input type="text" placeholder="Promo Code" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-primary" />
                <button className="bg-gray-100 hover:bg-gray-200 text-text-main px-4 py-2 rounded-md text-sm font-bold transition-colors">Apply</button>
              </div>

              <Link to="/checkout" className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 px-4 rounded-md transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                Proceed to Checkout <ArrowRight className="h-5 w-5" />
              </Link>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-text-muted">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                Secure and encrypted checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
