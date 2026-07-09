import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { CheckCircle2, PackageCheck } from 'lucide-react';
import clsx from 'clsx';

export default function Checkout() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');

  const subtotal = getSubtotal();
  const deliveryCharges = subtotal > 0 ? (deliveryMethod === 'express' ? 1000 : 500) : 0;
  const total = subtotal + deliveryCharges;
  const customItems = items.filter(i => i.isCustom);
  const standardItems = items.filter(i => !i.isCustom);

  if (items.length === 0 && !isOrderPlaced) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsOrderPlaced(true);
    // In a real app, send data to backend here.
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  if (isOrderPlaced) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-text-main mb-4 text-center">Order Confirmed!</h1>
        <p className="text-text-muted text-center max-w-lg mb-4">
          Thank you for choosing Ghazi Enterprise. Your order #GZ-{Math.floor(Math.random() * 100000)} has been placed successfully.
        </p>
        {customItems.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center max-w-lg mb-8">
            <h3 className="font-bold text-yellow-800 mb-1">Custom Quote Requested</h3>
            <p className="text-sm text-yellow-700">Our sales team will review your custom requirements and contact you within 24 hours with a detailed quotation.</p>
          </div>
        )}
        <div className="mt-4">
          <Link to="/" className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-md transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-heading font-bold text-text-main mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-10">
          
          <div className="flex-1 space-y-8">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-heading font-bold mb-6">Contact & Delivery Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-text-main">First Name *</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-text-main">Last Name *</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-semibold text-text-main">Company Name (Optional)</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-semibold text-text-main">Phone / WhatsApp *</label>
                  <input required type="tel" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-semibold text-text-main">Delivery Address *</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-text-main">City *</label>
                  <input required type="text" defaultValue="Karachi" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-text-main">Postal Code</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-heading font-bold mb-6">Delivery Method</h2>
              <div className="space-y-3">
                <label className={clsx(
                  "flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors",
                  deliveryMethod === 'standard' ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                )}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" name="delivery" value="standard" 
                      checked={deliveryMethod === 'standard'} onChange={() => setDeliveryMethod('standard')}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="block font-bold text-text-main">Standard Delivery</span>
                      <span className="text-xs text-text-muted">2-3 Business Days</span>
                    </div>
                  </div>
                  <span className="font-bold">₨ 500</span>
                </label>
                <label className={clsx(
                  "flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors",
                  deliveryMethod === 'express' ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                )}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" name="delivery" value="express" 
                      checked={deliveryMethod === 'express'} onChange={() => setDeliveryMethod('express')}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="block font-bold text-text-main">Express Delivery</span>
                      <span className="text-xs text-text-muted">Same Day (Karachi Only)</span>
                    </div>
                  </div>
                  <span className="font-bold">₨ 1000</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-heading font-bold mb-6">Payment Method</h2>
              <div className="space-y-3">
                <label className={clsx(
                  "flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors",
                  paymentMethod === 'cod' ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                )}>
                  <input 
                    type="radio" name="payment" value="cod" 
                    checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="font-bold text-text-main">Cash on Delivery (COD)</span>
                </label>
                <label className={clsx(
                  "flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors",
                  paymentMethod === 'bank' ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                )}>
                  <input 
                    type="radio" name="payment" value="bank" 
                    checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="font-bold text-text-main">Direct Bank Transfer</span>
                </label>
              </div>
              {paymentMethod === 'bank' && (
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md text-sm text-text-muted">
                  Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 sticky top-28">
              <h3 className="font-heading font-bold text-xl mb-6 flex items-center gap-2">
                <PackageCheck className="h-5 w-5 text-primary" /> Order Summary
              </h3>

              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.cartItemId} className="flex justify-between items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div>
                      <h4 className="text-sm font-bold text-text-main line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-text-muted">Qty: {item.quantity}</p>
                      {item.isCustom && <span className="text-xs font-bold text-secondary">Quote Pending</span>}
                    </div>
                    {!item.isCustom && (
                      <span className="text-sm font-bold text-text-main">₨ {item.price * item.quantity}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm mb-6 pb-6 border-t pt-4 border-gray-200">
                <div className="flex justify-between">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="font-bold text-text-main">₨ {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Delivery</span>
                  <span className="font-bold text-text-main">₨ {deliveryCharges}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-heading font-bold text-lg">Total</span>
                <span className="font-bold text-3xl text-primary">₨ {total}</span>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 px-4 rounded-md transition-colors shadow-lg shadow-primary/20"
              >
                Place Order Now
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
