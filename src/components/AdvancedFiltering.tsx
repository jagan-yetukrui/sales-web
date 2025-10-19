import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';

interface FilterState {
  category: string[];
  brand: string[];
  priceRange: [number, number];
  features: string[];
}

const AdvancedFiltering: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    brand: [],
    priceRange: [0, 100000],
    features: []
  });

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, []);

  const brands = useMemo(() => {
    return Array.from(new Set(products.map(p => p.brand)));
  }, []);

  const features = useMemo(() => {
    const allFeatures = products.flatMap(p => 
      Object.values(p.specs || {}).flat()
    );
    return Array.from(new Set(allFeatures));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false;
      }

      // Brand filter
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) {
        return false;
      }

      // Price range filter
      if (product.basePrice < filters.priceRange[0] || product.basePrice > filters.priceRange[1]) {
        return false;
      }

      // Features filter
      if (filters.features.length > 0) {
        const productFeatures = Object.values(product.specs || {}).flat();
        const hasMatchingFeature = filters.features.some(feature => 
          productFeatures.some(pf => pf.toLowerCase().includes(feature.toLowerCase()))
        );
        if (!hasMatchingFeature) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'category' | 'brand' | 'features', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      brand: [],
      priceRange: [0, 100000],
      features: []
    });
  };

  const hasActiveFilters = 
    filters.category.length > 0 || 
    filters.brand.length > 0 || 
    filters.features.length > 0 ||
    filters.priceRange[0] !== 0 || 
    filters.priceRange[1] !== 100000;

  return (
    <>
      {/* Filter Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-component bg-gradient-to-r from-orange-500 to-red-600 text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={`Filter Products (${filteredProducts.length})`}
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        {hasActiveFilters && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-white text-orange-600 text-xs rounded-full flex items-center justify-center font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {filters.category.length + filters.brand.length + filters.features.length}
          </motion.div>
        )}
      </motion.button>

      {/* Filter Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            
            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] glass-card rounded-3xl p-8 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-neutral-900">Advanced Filters</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-8 max-h-96 overflow-y-auto">
                {/* Category Filter */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        onClick={() => toggleArrayFilter('category', category)}
                        className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                          filters.category.includes(category)
                            ? 'bg-primary-500 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Brand</h3>
                  <div className="flex flex-wrap gap-2">
                    {brands.map((brand) => (
                      <motion.button
                        key={brand}
                        onClick={() => toggleArrayFilter('brand', brand)}
                        className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                          filters.brand.includes(brand)
                            ? 'bg-primary-500 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {brand}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={filters.priceRange[0]}
                        onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                        className="flex-1"
                      />
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={filters.priceRange[1]}
                        onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-neutral-600">
                      <span>${filters.priceRange[0].toLocaleString()}</span>
                      <span>${filters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Features Filter */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {features.slice(0, 10).map((feature) => (
                      <motion.button
                        key={feature}
                        onClick={() => toggleArrayFilter('features', feature)}
                        className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                          filters.features.includes(feature)
                            ? 'bg-accent-500 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {feature}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results and Actions */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-200">
                <div className="text-sm text-neutral-600">
                  {filteredProducts.length} products found
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-xl hover:bg-neutral-200 transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdvancedFiltering;
