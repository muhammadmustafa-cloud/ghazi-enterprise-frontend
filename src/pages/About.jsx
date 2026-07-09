import { ShieldCheck, Truck, Users, Package } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero */}
      <section className="bg-gray-900 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">About Ghazi Enterprise</h1>
          <p className="text-lg md:text-xl text-gray-300">
            Pakistan's leading supplier of premium industrial packaging solutions, built on trust, durability, and reliability.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold text-text-main mb-6">Our Story</h2>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                Founded with a mission to bridge the gap in the local packaging industry, Ghazi Enterprise started as a small supplier of corrugated boxes for local businesses in Karachi. Over the years, we've grown into a comprehensive packaging partner for hundreds of factories, e-commerce brands, and individuals nationwide.
              </p>
              <p>
                We understand that packaging is more than just a box—it's the first physical interaction a customer has with your brand, and it's the armor that protects your products during transit. That's why we obsess over quality, strength, and reliability.
              </p>
              <p>
                From heavy-duty 7-ply industrial cartons to cost-effective recycled boxes and high-adhesion tapes, our extensive catalog ensures that you find exactly what you need. And if you don't, our custom manufacturing unit is ready to build it for you.
              </p>
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1000&q=80" 
              alt="Warehouse with carton boxes" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-center text-text-main mb-12">Why Choose Us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Uncompromised Quality</h3>
              <p className="text-sm text-text-muted">Rigorous strength testing ensures every box meets industrial standards.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Custom Solutions</h3>
              <p className="text-sm text-text-muted">Tailor-made dimensions, ply strength, and high-quality logo printing.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Fast Delivery</h3>
              <p className="text-sm text-text-muted">Extensive ready-stock allows for same-day dispatch on standard items.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">B2B Partnerships</h3>
              <p className="text-sm text-text-muted">Dedicated account managers and competitive pricing for bulk buyers.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
