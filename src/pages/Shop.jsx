import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { products, categories, plyOptions } from '../data/products';
import clsx from 'clsx';

export default function Shop() {
  const { category } = useParams();
  
  // State for filters
  const [activeCategory, setActiveCategory] = useState(category || 'all');
  const [selectedPly, setSelectedPly] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  // Toggle mobile filters
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory && activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    if (selectedPly) {
      result = result.filter(p => p.ply === selectedPly);
    }

    if (selectedCondition) {
      result = result.filter(p => p.condition.includes(selectedCondition));
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      // 'newest' could be default order in array for this mock
      default:
        break;
    }

    return result;
  }, [activeCategory, selectedPly, selectedCondition, sortBy, products]);

  const conditions = ['New', 'Used - Good'];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-main">
              {activeCategory === 'all' ? 'All Products' : categories.find(c => c.id === activeCategory)?.name || 'Shop'}
            </h1>
            <p className="text-text-muted mt-2">Showing {filteredProducts.length} products</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <button 
              className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white font-medium text-sm text-text-main"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <Filter className="h-4 w-4" /> Filters
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted hidden sm:inline">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-primary focus:border-primary outline-none bg-white"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={clsx(
            "md:w-64 flex-shrink-0 bg-white p-6 rounded-xl border border-gray-200 h-fit",
            isFiltersOpen ? "block" : "hidden md:block"
          )}>
            <div className="flex items-center gap-2 font-heading font-bold text-lg mb-6 pb-4 border-b border-gray-100">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              Filters
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-text-main mb-3 text-sm uppercase tracking-wider">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={clsx(
                    "block w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                    activeCategory === 'all' ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-gray-50 hover:text-text-main"
                  )}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={clsx(
                      "block w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                      activeCategory === cat.id ? "bg-primary/10 text-primary font-semibold" : "text-text-muted hover:bg-gray-50 hover:text-text-main"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Ply Filter */}
            {activeCategory !== 'tape' && (
              <div className="mb-6">
                <h3 className="font-semibold text-text-main mb-3 text-sm uppercase tracking-wider">Strength (Ply)</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="ply" 
                      value=""
                      checked={selectedPly === ''}
                      onChange={(e) => setSelectedPly(e.target.value)}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300" 
                    />
                    <span className="text-sm text-text-muted">Any</span>
                  </label>
                  {plyOptions.map(ply => (
                    <label key={ply} className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="ply" 
                        value={ply}
                        checked={selectedPly === ply}
                        onChange={(e) => setSelectedPly(e.target.value)}
                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300" 
                      />
                      <span className="text-sm text-text-muted">{ply}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Condition Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-text-main mb-3 text-sm uppercase tracking-wider">Condition</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="condition" 
                    value=""
                    checked={selectedCondition === ''}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300" 
                  />
                  <span className="text-sm text-text-muted">Any</span>
                </label>
                {conditions.map(cond => (
                  <label key={cond} className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="condition" 
                      value={cond}
                      checked={selectedCondition === cond}
                      onChange={(e) => setSelectedCondition(e.target.value)}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300" 
                    />
                    <span className="text-sm text-text-muted">{cond}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button 
              onClick={() => {
                setActiveCategory('all');
                setSelectedPly('');
                setSelectedCondition('');
                setSortBy('newest');
              }}
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-semibold text-text-main hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-text-main mb-2">No products found</h3>
                <p className="text-text-muted">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={() => {
                    setActiveCategory('all');
                    setSelectedPly('');
                    setSelectedCondition('');
                  }}
                  className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col group">
                    <Link to={`/product/${product.id}`} className="relative h-60 overflow-hidden">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      {product.condition === 'New' && (
                        <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">New</span>
                      )}
                    </Link>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="text-xs text-text-muted mb-2 font-semibold uppercase tracking-wider">{product.category.replace('-', ' ')}</div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                      </Link>
                      <p className="text-sm text-text-muted mb-4">{product.dimensions} • {product.ply}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="font-bold text-xl text-text-main">₨ {product.price}</div>
                        <Link 
                          to={`/product/${product.id}`}
                          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-text-main group-hover:bg-primary group-hover:text-white transition-colors"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
