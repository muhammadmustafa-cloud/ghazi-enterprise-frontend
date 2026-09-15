import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ArrowRight, PackageOpen } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import { categories, plyOptions } from '../data/products';

export default function Shop() {
  const { categoryId } = useParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products, fetchProducts, loading } = useProductStore();

  // Fetch from API on mount
  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState(categoryId && categoryId !== 'all' ? categoryId : 'all');
  const [selectedPly, setSelectedPly] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Update selected category when URL changes
  useEffect(() => {
    if (categoryId && categoryId !== 'all') {
      setSelectedCategory(categoryId);
    } else {
      setSelectedCategory('all');
    }
  }, [categoryId]);

  // Apply filters
  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (selectedPly !== 'all') {
      result = result.filter(p => p.ply === selectedPly);
    }
    if (selectedCondition !== 'all') {
      result = result.filter(p => p.condition.includes(selectedCondition));
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, selectedPly, selectedCondition, sortBy]);

  const categoryName = categoryId && categoryId !== 'all' 
    ? categories.find(c => c.id === categoryId)?.name || 'All Products'
    : 'All Products';

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12 border-b border-gray-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-black text-secondary tracking-tight mb-2">
              {categoryName}
            </h1>
            <p className="text-lg font-medium text-text-muted">
              {filteredProducts.length} product{filteredProducts.length !== 1 && 's'} available
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm font-bold text-secondary"
            >
              <Filter className="h-5 w-5" /> Filters
            </button>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-secondary font-bold text-sm rounded-xl px-5 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              
              {/* Category Filter */}
              <div>
                <h3 className="font-heading font-black text-lg text-secondary mb-4 uppercase tracking-wider">Categories</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={selectedCategory === 'all'} 
                      onChange={() => setSelectedCategory('all')}
                      className="w-5 h-5 text-primary border-gray-300 focus:ring-primary rounded-full cursor-pointer" 
                    />
                    <span className="text-gray-700 font-medium group-hover:text-primary transition-colors">All Products</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === cat.id} 
                        onChange={() => setSelectedCategory(cat.id)}
                        className="w-5 h-5 text-primary border-gray-300 focus:ring-primary rounded-full cursor-pointer" 
                      />
                      <span className="text-gray-700 font-medium group-hover:text-primary transition-colors">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Condition Filter */}
              <div>
                <h3 className="font-heading font-black text-lg text-secondary mb-4 uppercase tracking-wider">Condition</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="condition" 
                      checked={selectedCondition === 'all'} 
                      onChange={() => setSelectedCondition('all')}
                      className="w-5 h-5 text-primary border-gray-300 focus:ring-primary rounded-full cursor-pointer" 
                    />
                    <span className="text-gray-700 font-medium group-hover:text-primary transition-colors">Any Condition</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="condition" 
                      checked={selectedCondition === 'New'} 
                      onChange={() => setSelectedCondition('New')}
                      className="w-5 h-5 text-primary border-gray-300 focus:ring-primary rounded-full cursor-pointer" 
                    />
                    <span className="text-gray-700 font-medium group-hover:text-primary transition-colors">Brand New</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="condition" 
                      checked={selectedCondition === 'Used'} 
                      onChange={() => setSelectedCondition('Used')}
                      className="w-5 h-5 text-primary border-gray-300 focus:ring-primary rounded-full cursor-pointer" 
                    />
                    <span className="text-gray-700 font-medium group-hover:text-primary transition-colors">Used / Recycled</span>
                  </label>
                </div>
              </div>

              {/* Ply Filter (Only relevant for boxes) */}
              {(selectedCategory === 'all' || selectedCategory.includes('box')) && (
                <div>
                  <h3 className="font-heading font-black text-lg text-secondary mb-4 uppercase tracking-wider">Wall Strength (Ply)</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="ply" 
                        checked={selectedPly === 'all'} 
                        onChange={() => setSelectedPly('all')}
                        className="w-5 h-5 text-primary border-gray-300 focus:ring-primary rounded-full cursor-pointer" 
                      />
                      <span className="text-gray-700 font-medium group-hover:text-primary transition-colors">Any Strength</span>
                    </label>
                    {plyOptions.map(ply => (
                      <label key={ply} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="ply" 
                          checked={selectedPly === ply} 
                          onChange={() => setSelectedPly(ply)}
                          className="w-5 h-5 text-primary border-gray-300 focus:ring-primary rounded-full cursor-pointer" 
                        />
                        <span className="text-gray-700 font-medium group-hover:text-primary transition-colors">{ply}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 min-h-[400px] flex items-center justify-center">
                <p className="text-lg text-text-muted font-bold">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <PackageOpen className="h-12 w-12 text-gray-300" />
                </div>
                <h3 className="text-3xl font-heading font-black text-secondary mb-4">No products found</h3>
                <p className="text-lg text-text-muted font-medium mb-8">Try adjusting your filters or browsing a different category.</p>
                <button 
                  onClick={() => { setSelectedCategory('all'); setSelectedPly('all'); setSelectedCondition('all'); }}
                  className="px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-primary/50 transition-all hover:-translate-y-1"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={product.id} 
                      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col group"
                    >
                      <Link to={`/product/${product.id}`} className="relative h-64 overflow-hidden block bg-gray-50">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                        />
                        {product.condition === 'New' && (
                          <span className="absolute top-4 left-4 bg-secondary text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-md">New</span>
                        )}
                      </Link>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="text-xs text-primary mb-2 font-bold uppercase tracking-widest">{product.category.replace('-', ' ')}</div>
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
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl z-50 overflow-y-auto lg:hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-heading font-black text-secondary">Filters</h2>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-secondary hover:bg-gray-200 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-10 flex-grow">
                {/* Mobile Filters Content (Same as desktop) */}
                {/* Category Filter */}
                <div>
                  <h3 className="font-heading font-black text-lg text-secondary mb-4 uppercase tracking-wider">Categories</h3>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" name="mobile-category" 
                        checked={selectedCategory === 'all'} onChange={() => setSelectedCategory('all')}
                        className="w-6 h-6 text-primary border-gray-300 focus:ring-primary rounded-full" 
                      />
                      <span className="text-gray-800 font-bold text-lg">All Products</span>
                    </label>
                    {categories.map(cat => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="radio" name="mobile-category" 
                          checked={selectedCategory === cat.id} onChange={() => setSelectedCategory(cat.id)}
                          className="w-6 h-6 text-primary border-gray-300 focus:ring-primary rounded-full" 
                        />
                        <span className="text-gray-800 font-bold text-lg">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Condition Filter */}
                <div>
                  <h3 className="font-heading font-black text-lg text-secondary mb-4 uppercase tracking-wider">Condition</h3>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="mobile-condition" checked={selectedCondition === 'all'} onChange={() => setSelectedCondition('all')} className="w-6 h-6 text-primary border-gray-300 focus:ring-primary rounded-full" />
                      <span className="text-gray-800 font-bold text-lg">Any</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="mobile-condition" checked={selectedCondition === 'New'} onChange={() => setSelectedCondition('New')} className="w-6 h-6 text-primary border-gray-300 focus:ring-primary rounded-full" />
                      <span className="text-gray-800 font-bold text-lg">New</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="mobile-condition" checked={selectedCondition === 'Used'} onChange={() => setSelectedCondition('Used')} className="w-6 h-6 text-primary border-gray-300 focus:ring-primary rounded-full" />
                      <span className="text-gray-800 font-bold text-lg">Used</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-100 sticky bottom-0 bg-white">
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full py-4 bg-primary text-white font-bold text-lg rounded-2xl shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                >
                  View {filteredProducts.length} Products
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
