import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-text-main mb-4">Contact Us</h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Have a question about bulk pricing, custom orders, or anything else? Our team is ready to help you find the perfect packaging solution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-heading font-bold text-xl mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main">Office Address</h4>
                    <p className="text-sm text-text-muted mt-1">Plot 42, Industrial Area, Sector 7, Karachi, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main">Phone & WhatsApp</h4>
                    <p className="text-sm text-text-muted mt-1">+92 300 0000000</p>
                    <p className="text-sm text-text-muted">+92 21 3000000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main">Email Support</h4>
                    <p className="text-sm text-text-muted mt-1">sales@ghazienterprise.com</p>
                    <p className="text-sm text-text-muted">info@ghazienterprise.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main">Business Hours</h4>
                    <p className="text-sm text-text-muted mt-1">Mon - Sat: 9:00 AM - 6:00 PM</p>
                    <p className="text-sm text-text-muted">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 h-full">
              <h3 className="font-heading font-bold text-2xl mb-6">Send us a Message</h3>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-main">Full Name *</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-main">Company (Optional)</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Your Business Ltd." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-main">Email Address *</label>
                    <input required type="email" className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-main">Phone Number *</label>
                    <input required type="tel" className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="+92 300 0000000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-main">Subject *</label>
                  <select required className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white">
                    <option value="">Select a subject...</option>
                    <option value="bulk">Bulk Order Inquiry</option>
                    <option value="custom">Custom Packaging Quote</option>
                    <option value="support">General Support</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-main">Message *</label>
                  <textarea required rows="5" className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none" placeholder="How can we help you?"></textarea>
                </div>

                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-md transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 bg-gray-200 rounded-xl h-96 w-full flex items-center justify-center border border-gray-300">
          <div className="text-center text-gray-500">
            <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="font-semibold">Interactive Map Embed Goes Here</p>
          </div>
        </div>

      </div>
    </div>
  );
}
